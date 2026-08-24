/**
 * 医护职业转型测试 - 个性化报告引擎 V2
 * 
 * 算法来源：
 *   - 方向权重/归一化：12.医护职业转型测试得分种类表.md
 *   - 方向→类型映射：00_索引与关键词.md
 *   - 方向名称：index_v2.html 结果页简称 → 标准名
 */

'use strict';

// ============================================================
// 1. 常量定义
// ============================================================

/** index_v2.html 结果页简称 → 标准方向名 */
const DIRECTION_NAME_MAP = {
  '管理':   '医疗管理',
  '教育':   '医学教育',
  '科研':   '医学研究',
  '产业':   '医药产业',
  '公卫':   '公共卫生',
  '数字':   '数字医疗',
};

/** 标准方向名 → 简称 */
const DIRECTION_ABBR_MAP = {
  '医疗管理':  '管理',
  '医学教育':  '教育',
  '医学研究':  '科研',
  '医药产业':  '产业',
  '公共卫生':  '公卫',
  '数字医疗':  '数字',
};

/**
 * 行业市场参数表（与 index_v2.html 保持一致，2025-2026 公开招聘数据校准）
 * demand     : 行业需求增长 1-5（5=爆发）
 * successRate: 医疗人转型成功率 1-5（5=高）
 * salary     : 薪资水平 1-5（5=高薪）
 * barrier    : 准入门槛 1-5（5=极高，需资历/学历/证书）
 */
const MARKET_DATA = {
  '管理': { demand: 3, successRate: 3, salary: 4, barrier: 4 },
  '教育': { demand: 3, successRate: 4, salary: 3, barrier: 3 },
  '科研': { demand: 4, successRate: 3, salary: 3, barrier: 5 },
  '产业': { demand: 4, successRate: 3, salary: 4, barrier: 3 },
  '公卫': { demand: 4, successRate: 4, salary: 2, barrier: 3 },
  '数字': { demand: 5, successRate: 3, salary: 4, barrier: 4 }
};

/** 计算方向的市场得分（0-100） */
function calcMarketScore(name) {
  const m = MARKET_DATA[name];
  if (!m) return 50;
  return Math.round((m.demand * 0.5 + m.successRate * 0.3 + m.salary * 0.2) * 20);
}

/** 市场校准：最终分 = 能力画像×0.7 + 市场×0.3（含门槛匹配） */
function applyMarketCalibration(directionScores, userProfile) {
  const _years = (userProfile && userProfile.A2) || '';
  const _edu = (userProfile && userProfile.A3) || '';
  const junior = (_years === '0-3' || _years === '3-5');
  const lowEdu = (_edu === 'college' || !_edu);
  const result = {};
  Object.keys(directionScores).forEach(n => {
    const market = calcMarketScore(n);
    let final = directionScores[n] * 0.7 + market * 0.3;
    const barrier = (MARKET_DATA[n] || {}).barrier || 3;
    if (barrier >= 4 && junior) final *= 0.9;
    if (barrier >= 5 && lowEdu) final *= 0.85;
    result[n] = Math.min(100, Math.max(0, Math.round(final)));
  });
  return result;
}

/** 方向英文代码 → 中文标准名 */
const DIRECTION_KEY_TO_NAME = {
  management:    '医疗管理',
  education:     '医学教育',
  research:      '医学研究',
  industry:      '医药产业',
  publicHealth:  '公共卫生',
  digitalHealth: '数字医疗',
};

/** 能力代码 → 中文名称 */
const ABILITY_NAME_MAP = {
  leadership:    '领导力',
  teaching:      '教学能力',
  research:      '研究能力',
  innovation:    '创新能力',
  communication: '沟通能力',
  tech:          '技术能力',
  stress:        '抗压能力',
  learning:      '学习能力',
  policy:        '政策理解',
  entrepreneur:   '创业思维',
};

/** 主导能力 → 报告类型映射（基于 00_索引与关键词.md） */
const ABILITY_TO_REPORT_MAP = {
  leadership:    'TYPE-001',  // T01 领导型
  teaching:      'TYPE-002',  // T02 教学型
  research:      'TYPE-003',  // T03 研究型
  innovation:    'TYPE-004',  // T04 创新型
  communication: 'TYPE-005',  // T05 沟通型
  tech:          'TYPE-006',  // T06 技术型
  stress:        'TYPE-007',  // T07 抗压型
  learning:      'TYPE-008',  // T08 学习型
  policy:        'TYPE-009',  // T09 政策型
  entrepreneur:   'TYPE-004',  // T04 创新型（创业思维归属于创新型）
};

/** 方向 → 推荐T类型列表（基于 00_索引与关键词.md）
 *  用于 strengths/positions 内容映射
 *  方向名使用标准中文名 */
const DIRECTION_TO_TYPES = {
  '医疗管理':  ['TYPE-001', 'TYPE-007'],  // T01 领导型、T07 抗压型
  '医学教育':  ['TYPE-002', 'TYPE-008'],  // T02 教学型、T08 学习型
  '医学研究':  ['TYPE-003', 'TYPE-006'],  // T03 研究型、T06 技术型
  '医药产业':  ['TYPE-001', 'TYPE-004', 'TYPE-005', 'TYPE-007', 'TYPE-009'], // T01/T04/T05/T07/T09
  '公共卫生':  ['TYPE-002', 'TYPE-009'],  // T02 教学型、T09 政策型
  '数字医疗':  ['TYPE-004', 'TYPE-006'],  // T04 创新型、T06 技术型
};

// ============================================================
// 2. 评分算法（来源：12.医护职业转型测试得分种类表.md）
// ============================================================

/**
 * 6个方向的简化权重矩阵
 * 每个方向取3项核心能力，按3:2:1加权
 * 最高分 = 5×3 + 5×2 + 5×1 = 60
 *
 * 来源：12.医护职业转型测试得分种类表.md 第二节
 */
const DIRECTION_WEIGHTS = {
  '医疗管理':  { leadership: 3, communication: 2, stress: 1 },
  '医学教育':  { teaching: 3, communication: 2, learning: 1 },
  '医学研究':  { research: 3, learning: 2, tech: 1 },
  '医药产业':  { innovation: 3, communication: 2, leadership: 1 },
  '公共卫生':  { policy: 3, stress: 2, learning: 1 },
  '数字医疗':  { tech: 3, innovation: 2, research: 1 },
};

/**
 * 各方向归一化范围（用于计算 matchPercentage）
 * 计算公式：((rawScore - min) / (max - min)) × 100
 * 其中 rawScore = Σ(abilityScore × weight)
 * 来源：12.医护职业转型测试得分种类表.md 第五节得分分布矩阵表
 */
// BARS 版本满分：每项最高5分，方向权重不变
// leadership×3 + communication×2 + stress×1 → max=5×6=30 (不变，但每项满分从10→5)
const DIRECTION_RANGE = {
  '医疗管理':  { min: 6, max: 30 },   // leadership×3 + communication×2 + stress×1
  '医学教育':  { min: 6, max: 30 },   // teaching×3 + communication×2 + learning×1
  '医学研究':  { min: 6, max: 30 },   // research×3 + learning×2 + tech×1
  '医药产业':  { min: 6, max: 30 },   // innovation×3 + communication×2 + leadership×1
  '公共卫生':  { min: 6, max: 30 },   // policy×3 + stress×2 + learning×1
  '数字医疗':  { min: 6, max: 30 },   // tech×3 + innovation×2 + research×1
};

/**
 * 计算原始方向得分
 * @param {Object} abilityScores - 10项能力得分 {leadership: 3, teaching: 4, ...}
 * @returns {Object} 各方向原始得分 {医疗管理: 18, 医学教育: 24, ...}
 */
function calcRawDirectionScores(abilityScores) {
  const rawScores = {};
  for (const [direction, weights] of Object.entries(DIRECTION_WEIGHTS)) {
    rawScores[direction] = Object.entries(weights).reduce((sum, [ability, w]) => {
      return sum + (abilityScores[ability] || 0) * w;
    }, 0);
  }
  return rawScores;
}

/**
 * 计算方向匹配百分比（归一化到0-100%）
 * @param {Object} rawScores - 各方向原始得分
 * @returns {Object} 各方向匹配百分比
 */
function calcMatchPercentages(rawScores) {
  const percentages = {};
  for (const [direction, raw] of Object.entries(rawScores)) {
    const { min, max } = DIRECTION_RANGE[direction] || { min: 6, max: 30 };
    const pct = ((raw - min) / (max - min)) * 100;
    percentages[direction] = Math.max(0, Math.min(100, Math.round(pct)));
  }
  return percentages;
}

/**
 * 计算10项能力得分（从答题答案）
 * BARS 版本：D1-D10 对应 10 项能力，每项 1-5 分
 */
function calcAbilityScores(answers) {
  const abilities = ['leadership','teaching','research','innovation',
                     'communication','tech','stress','learning','policy','entrepreneur'];
  const scores = {};
  abilities.forEach((ab, i) => {
    const qId = 'D' + (i + 1);
    scores[ab] = answers[qId] || 0;
  });
  return scores;
}

/**
 * 模拟一致性检测（fallback 模式，无法获取真实一致性数据）
 * 基于能力得分的标准差估算置信度
 * @param {Object} abilityScores
 * @returns {number} 置信度 0-100
 */
function calcFallbackConfidence(abilityScores) {
  const vals = Object.values(abilityScores);
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const variance = vals.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / vals.length;
  const stdDev = Math.sqrt(variance);
  // 标准差正常（>0.5）= 作答有区分度 → 置信度 80-90
  return stdDev >= 0.5 ? 85 : Math.round(50 + stdDev * 30);
}

/**
 * 找岆主导能力（得分最高的能力项）
 */
function findDominantAbility(abilityScores) {
  let maxVal = -1, dominant = 'leadership';
  for (const [ab, val] of Object.entries(abilityScores)) {
    if (val > maxVal) { maxVal = val; dominant = ab; }
  }
  return dominant;
}

/**
 * 转型准备度计算
 * 公式：50 + (10-经济压力)×2 + 风险承受×2 + 家庭支持×2 + 学习意愿
 */
function calcReadiness(userInfo) {
  if (!userInfo) return 50;
  const ep   = Math.min(10, Math.max(1, userInfo.economicPressure || 5));
  const rt   = Math.min(10, Math.max(1, userInfo.riskTolerance  || 5));
  const fs   = Math.min(10, Math.max(1, userInfo.familySupport  || 6));
  const lwMap = { no_study: 0, part_time: 3, intensive: 6, long_term: 8, full_time: 10 };
  const lw   = lwMap[userInfo.learningWillingness] ?? 5;
  return Math.max(0, Math.min(100, Math.round(50 + (10 - ep) * 2 + rt * 2 + fs * 2 + lw)));
}

/**
 * 匹配度等级文字
 */
function matchLevelLabel(score) {
  if (score >= 90) return '极佳匹配';
  if (score >= 80) return '优秀匹配';
  if (score >= 70) return '良好匹配';
  if (score >= 60) return '一般匹配';
  return '较低匹配';
}

// ============================================================
// 3. 内容匹配
// ============================================================

/**
 * 在 reportData 中查找指定 id 的报告
 */
function findReportById(id) {
  return reportData.find(r => r.id === id) || null;
}

/**
 * 查找某方向对应的 strengths 和 positions
 * 策略：
 *  1. 在主导类型的推荐中精确匹配方向名
 *  2. 在方向对应类型列表中查找
 *  3. 在所有报告中模糊匹配
 */
function findDirectionContent(dominantReport, directionName) {
  const target = DIRECTION_NAME_MAP[directionName] || directionName;
  const sections = ['primaryRecommendation','secondaryRecommendation','thirdRecommendation'];

  function searchIn(r) {
    if (!r) return null;
    for (const key of sections) {
      if (r[key] && r[key].name === target) {
        return r[key];
      }
    }
    return null;
  }

  // 优先在主导类型中查找
  const inMain = searchIn(dominantReport);
  if (inMain) return inMain;

  // 在方向对应类型列表中查找
  const typeList = DIRECTION_TO_TYPES[target] || [];
  for (const tid of typeList) {
    const r = findReportById(tid);
    const found = searchIn(r);
    if (found) return found;
  }

  // 全局回退：在所有报告中查找第一个匹配方向名
  for (const r of reportData) {
    const found = searchIn(r);
    if (found) return found;
  }
  return null;
}

// ============================================================
// 4. 核心报告生成
// ============================================================

/**
 * 生成完整报告数据
 *
 * @param {Object} abilityScores - 10项能力得分
 * @param {Object} userInfo      - 用户基本信息
 * @param {Object} testResults   - index_v2.html 完整测试结果（含 recommendations）
 * @returns {Object} 报告数据结构
 */
function generateReportData(abilityScores, userInfo, testResults) {
  // ---- 4a. 主导能力 + 主导类型 ----
  const dominantAbility = findDominantAbility(abilityScores);
  const dominantReportId = ABILITY_TO_REPORT_MAP[dominantAbility] || 'TYPE-001';
  const dominantReport  = findReportById(dominantReportId);

  // ---- 4b. 方向得分 ----
  const rawScores    = calcRawDirectionScores(abilityScores);
  const matchPcts    = calcMatchPercentages(rawScores);

  // ---- 4b1. 市场校准（P2：无存储推荐时，fallback 也应用市场校准） ----
  const hasStoredRecs = (testResults && testResults.recommendations && testResults.recommendations.length > 0);
  let calibratedPcts = matchPcts;
  if (!hasStoredRecs) {
    // 将标准名转为简称后应用市场校准（MARKET_DATA 用简称）
    const abbrPcts = {};
    Object.keys(matchPcts).forEach(stdName => {
      abbrPcts[DIRECTION_ABBR_MAP[stdName] || stdName] = matchPcts[stdName];
    });
    const calibrated = applyMarketCalibration(abbrPcts, userInfo || {});
    // 转回标准名
    calibratedPcts = {};
    Object.keys(calibrated).forEach(abbr => {
      calibratedPcts[DIRECTION_NAME_MAP[abbr] || abbr] = calibrated[abbr];
    });
  }

  // ---- 4b2. 置信度 ----
  const confidenceScore = (testResults && testResults.confidenceScore !== undefined)
    ? testResults.confidenceScore
    : calcFallbackConfidence(abilityScores);

  // 按 matchPercentage 降序排列
  const allDirections = Object.entries(calibratedPcts)
    .map(([name, pct]) => ({ name, pct, raw: rawScores[name] }))
    .sort((a, b) => b.pct - a.pct);

  // ---- 4c. 转型准备度 ----
  const readiness = (testResults && testResults.matchScore !== undefined)
    ? testResults.matchScore
    : calcReadiness(userInfo);

  // ---- 4d. 方向分析（前3名）----
  // 优先使用 index_v2.html 的 sorted 结果（已含 desc）
  const storedRecs = (testResults && testResults.recommendations && testResults.recommendations.length > 0)
    ? testResults.recommendations
    : null;

  let directionAnalysis;
  if (storedRecs) {
    // 用存储的推荐覆盖方向排序，matchPercentage 直接用存储值
    directionAnalysis = storedRecs.slice(0, 3).map((rec, i) => {
      const content = findDirectionContent(dominantReport, rec.name);
      return {
        rank:        i + 1,
        name:        rec.name,       // 简称
        nameStd:     DIRECTION_NAME_MAP[rec.name] || rec.name, // 标准名
        matchScore:  rec.matchPercentage !== undefined ? rec.matchPercentage : rec.score || 0, // 匹配 HTML: dir.matchScore
        pct:         rec.matchPercentage !== undefined ? rec.matchPercentage : rec.score || 0,
        matchLevel:  matchLevelLabel(rec.matchPercentage !== undefined ? rec.matchPercentage : (rec.score || 0)),
        desc:        rec.desc || '',
        strengths:   content ? content.strengths : [],
        positions:   content ? content.positions : [],
      };
    });
  } else {
    // 无存储数据时，用计算结果
    directionAnalysis = allDirections.slice(0, 3).map((d, i) => {
      const content = findDirectionContent(dominantReport, d.name);
      return {
        rank:        i + 1,
        name:        DIRECTION_ABBR_MAP[d.name] || d.name, // 转为简称
        nameStd:     d.name,
        matchScore:  d.pct,  // 匹配 HTML: dir.matchScore
        pct:         d.pct,
        matchLevel:  matchLevelLabel(d.pct),
        desc:        '',
        strengths:   content ? content.strengths : [],
        positions:   content ? content.positions : [],
      };
    });
  }

  // ---- 4e. 执行摘要 ----
  const top = directionAnalysis[0] || {};
  const executiveSummary = {
    readiness:          readiness,
    readinessLevel:     matchLevelLabel(readiness),
    confidenceScore:    confidenceScore,          // 一致性置信度 0-100
    topDirection:       top.nameStd || '待评估',
    topDirectionScore:  top.pct || 0,          // 匹配 HTML: exe.topDirectionScore
    topLevel:           top.level || '',
    topPositions:       top.positions || [],
    dominantAbility:    ABILITY_NAME_MAP[dominantAbility] || dominantAbility, // 匹配 HTML: exe.dominantAbility
    reportName:         dominantReport ? dominantReport.name : '',
    coreTraitsSummary:  dominantReport ? dominantReport.coreTraits.slice(0, 3) : [], // 匹配 HTML: exe.coreTraitsSummary
  };

  // ---- 4f. 用户画像 ----
  const userProfile = {
    description:     dominantReport ? dominantReport.description : '',
    coreTraits:      dominantReport ? dominantReport.coreTraits : [],
    strengths:       dominantReport ? dominantReport.uniqueAdvantages || [] : [], // 匹配 HTML: profile.strengths
    developmentAreas: dominantReport ? dominantReport.challenges || [] : [],      // 匹配 HTML: profile.developmentAreas
  };

  // ---- 4g. 技能差距 ----
  const skillGap = generateSkillGapData(abilityScores, dominantReport);

  // ---- 4h. 行动计划 ----
  const actionPlan = generateActionPlanData(top.nameStd || '医疗管理', dominantReport);

  // ---- 4i. 资源推荐 ----
  const resources = generateResourceData(top.nameStd || '医疗管理', dominantReport);

  return {
    executiveSummary,
    userProfile,
    directionAnalysis,
    skillGap,
    actionPlan,
    resources,
    // 供调试
    _rawScores:     rawScores,
    _matchPcts:     calibratedPcts,
    _allDirections: allDirections,
    _dominantAbility: dominantAbility,
    _dominantReportId: dominantReportId,
    _confidenceScore: confidenceScore,
  };
}

// ============================================================
// 5. 技能差距数据生成
// ============================================================
function generateSkillGapData(abilityScores, dominantReport) {
  const typicalScores = dominantReport && dominantReport.typicalScores
    ? dominantReport.typicalScores
    : {};
  const abilityNames = {
    leadership:    '领导力',
    teaching:      '教学能力',
    research:      '研究能力',
    innovation:    '创新能力',
    communication: '沟通能力',
    tech:          '技术能力',
    stress:        '抗压能力',
    learning:      '学习能力',
    policy:        '政策理解',
    entrepreneur:  '创业思维',
  };

  const gapItems = Object.keys(abilityNames).map(key => {
    const userScore = abilityScores[key] || 0;
    const typicalScore = typicalScores[key] || 3;
    const gap = userScore - typicalScore;
    return {
      key,
      name: abilityNames[key],
      userScore,
      typicalScore,
      gap,
      gapLabel: gap > 1 ? 'surplus' : gap >= 0 ? 'small' : gap >= -1 ? 'medium' : 'large',
    };
  });

  // Sort by gap ascending (biggest gap first = most urgent to improve)
  gapItems.sort((a, b) => a.gap - b.gap);

  const priorities = gapItems
    .filter(item => item.gap < 0)
    .slice(0, 5)
    .map(item => ({
      name: item.name,
      gap: item.gap,
      userScore: item.userScore,
      targetScore: item.typicalScore,
    }));

  return { gapItems, priorities };
}

// ============================================================
// 6. 行动计划数据生成
// ============================================================
function generateActionPlanData(topDirection, dominantReport) {
  const phaseMap = {
    '医疗管理': {
      phase1: { title: '探索期（1-3个月）', milestones: ['参加医院管理培训课程', '与现任管理者深入交流，了解日常工作', '阅读管理学基础书籍（3本）', '主动申请带教或项目协调角色'] },
      phase2: { title: '准备期（3-12个月）', milestones: ['完成医疗管理相关认证课程', '学习绩效管理、质量管理等专业模块', '建立管理领域人脉网络', '开始撰写个人转型规划'] },
      phase3: { title: '转型期（12-24个月）', milestones: ['寻找管理岗位机会（科室助理、专项管理岗）', '准备管理岗位面试', '逐步承担更多管理职责', '争取晋升或转型成功'] },
    },
    '医学教育': {
      phase1: { title: '探索期（1-3个月）', milestones: ['参加医学教育学培训或工作坊', '观察教学名师课堂，学习教学方法', '阅读教育心理学和课程设计书籍', '主动申请科内带教任务'] },
      phase2: { title: '准备期（3-12个月）', milestones: ['获取教师资格证或教育学认证', '设计并讲授1-2门课程', '参加教学技能比赛', '建立教学作品集（教案、课件）'] },
      phase3: { title: '转型期（12-24个月）', milestones: ['申请医学教育机构或培训公司岗位', '发表医学教育相关论文', '申请教学管理岗位（教学秘书、教研室主任）', '逐步从临床向教育方向转型'] },
    },
    '医学研究': {
      phase1: { title: '探索期（1-3个月）', milestones: ['了解科研方法论（统计学、文献检索）', '与实验室PI或资深研究员交流', '阅读领域内核心期刊（10篇）', '参加一次学术会议'] },
      phase2: { title: '准备期（3-12个月）', milestones: ['完成临床研究方法学课程', '参与导师或机构的科研项目', '撰写第一篇综述或小论文', '建立科研协作网络'] },
      phase3: { title: '转型期（12-24个月）', milestones: ['申请研究型岗位或博士后职位', '申请科研基金（国自然青年基金等）', '发表第一篇SCI论文', '逐步建立独立研究方向'] },
    },
    '医药产业': {
      phase1: { title: '探索期（1-3个月）', milestones: ['了解医药行业结构和产业链', '参加行业会议、药交会等活动', '阅读行业报告，了解岗位职责', '与医药从业者深入交流'] },
      phase2: { title: '准备期（3-12个月）', milestones: ['完成医学事务或市场相关培训', '准备简历和面试（STAR法则）', '考取相关证书（如临床研究证书）', '建立行业人脉（LinkedIn、行业社群）'] },
      phase3: { title: '转型期（12-24个月）', milestones: ['申请医学顾问/医学联络官等岗位', '准备行业面试（案例分析）', '成功入职医药企业', '完成试用期，建立行业口碑'] },
    },
    '公共卫生': {
      phase1: { title: '探索期（1-3个月）', milestones: ['了解公共卫生体系和政策框架', '参加公共卫生培训或讲座', '阅读疾病预防控制相关资料', '了解CDC、卫健委等机构运作'] },
      phase2: { title: '准备期（3-12个月）', milestones: ['学习流行病学、统计学方法', '考取公共卫生硕士（MPH）或相关认证', '参与公共卫生项目或志愿者活动', '建立政策研究能力'] },
      phase3: { title: '转型期（12-24个月）', milestones: ['申请CDC、卫生行政部门岗位', '申请公共卫生机构或NGO', '参与政策制定或项目管理', '逐步建立公共卫生职业路径'] },
    },
    '数字医疗': {
      phase1: { title: '探索期（1-3个月）', milestones: ['了解数字医疗行业生态', '体验主流数字医疗产品（3款以上）', '学习数据分析基础（Excel、BI）', '参加数字医疗行业会议'] },
      phase2: { title: '准备期（3-12个月）', milestones: ['学习Python或SQL基础', '完成数字医疗产品管理课程', '建立科技行业人脉', '准备产品经理或医学顾问面试'] },
      phase3: { title: '转型期（12-24个月）', milestones: ['申请医疗科技公司医学顾问岗位', '入职数字医疗企业', '学习AI/大数据在医疗中的应用', '逐步从医疗向科技跨界'] },
    },
  };

  const defaultPlan = {
    phase1: { title: '探索期（1-3个月）', milestones: ['深入了解各转型方向', '与目标领域从业者交流', '参加行业培训和活动', '评估自身兴趣与能力匹配度'] },
    phase2: { title: '准备期（3-12个月）', milestones: ['完成目标方向的基础课程', '建立行业人脉', '准备转型申请材料', '寻找实践机会'] },
    phase3: { title: '转型期（12-24个月）', milestones: ['申请目标岗位', '准备面试和案例分析', '成功入职', '持续学习和融入'] },
  };

  return phaseMap[topDirection] || defaultPlan;
}

// ============================================================
// 7. 资源推荐数据生成
// ============================================================
function generateResourceData(topDirection, dominantReport) {
  const resourceDB = {
    '医疗管理': {
      training: [
        { name: '医院管理MBA/EMBA课程', desc: '系统学习管理学、战略、财务等知识', tag: '长期系统学习' },
        { name: '美国医疗管理认证（CMQ）', desc: '国际认可的医疗质量管理认证', tag: '国际认证' },
        { name: '国家卫健委医院管理培训', desc: '官方背景，系统学习政策法规和实操', tag: '官方认证' },
      ],
      network: [
        { name: '中国医院协会', desc: '覆盖全国的医院管理者网络', tag: '行业组织' },
        { name: '华夏医管学会', desc: '医院管理专业学术组织', tag: '学术组织' },
        { name: 'MBA校友会医疗分会', desc: '链接各行业管理精英', tag: '跨界人脉' },
      ],
      cert: [
        { name: '卫生管理研究专业技术资格', desc: '人社部认证的专业技术职称', tag: '国家职称' },
        { name: '医院管理师（CHM）', desc: '中国医院协会颁发的专业能力证书', tag: '行业认证' },
        { name: '国家医疗数据中心认证', desc: '数据管理专业认证', tag: '专项认证' },
      ],
    },
    '医学教育': {
      training: [
        { name: '医学教育学师资培训', desc: '系统学习医学教育学理论和方法', tag: '专业培训' },
        { name: '高校教师资格证', desc: '从事高等医学教育的入门证书', tag: '必备证书' },
        { name: 'BOPPPS教学设计工作坊', desc: '互动式教学设计方法', tag: '实操技能' },
      ],
      network: [
        { name: '中华医学会医学教育分会', desc: '全国医学教育学术交流平台', tag: '学术组织' },
        { name: '医学教育者社群', desc: '同行交流和资源共享', tag: '同行社群' },
        { name: '在线医学教育平台', desc: '参与在线课程开发和录制', tag: '实践机会' },
      ],
      cert: [
        { name: '高等医学教育教师资格证', desc: '高等医学院校任教资格', tag: '必备证书' },
        { name: 'CME（继续医学教育）学分', desc: '持续教育学分证明', tag: '继续教育' },
        { name: '医学教育学硕士学位', desc: '系统提升教育理论水平', tag: '学位提升' },
      ],
    },
    '医学研究': {
      training: [
        { name: '临床研究方法学培训', desc: 'GCP、临床流行病学、循证医学', tag: '基础必备' },
        { name: 'SCI论文写作训练营', desc: '从选题到发表的完整指导', tag: '写作技能' },
        { name: 'R语言/SAS统计分析课程', desc: '数据分析的实用工具', tag: '技术技能' },
      ],
      network: [
        { name: '中国临床试验机构协作网络', desc: '链接各临床试验机构', tag: '机构网络' },
        { name: 'PubMed/Google Scholar学术追踪', desc: '追踪领域最新进展', tag: '学术资源' },
        { name: '学术期刊编委会', desc: '参与期刊审稿和编辑工作', tag: '学术影响' },
      ],
      cert: [
        { name: 'GCP（药物临床试验质量管理规范）证书', desc: '临床试验从业基本证书', tag: '必备证书' },
        { name: '执业医师资格证', desc: '临床执业的基本证书', tag: '执业资格' },
        { name: '实验动物从业人员资格证', desc: '动物实验相关从业证书', tag: '专项认证' },
      ],
    },
    '医药产业': {
      training: [
        { name: '医学事务（Medical Affairs）培训', desc: 'MSL、医学顾问核心技能', tag: '核心技能' },
        { name: '临床研究协调员（CRC）培训', desc: '临床试验实操培训', tag: '实操技能' },
        { name: '医药市场营销课程', desc: '了解产品生命周期和市场策略', tag: '商业技能' },
      ],
      network: [
        { name: 'RDPAC（研发制药协会）', desc: '跨国药企协会，网络强大', tag: '行业协会' },
        { name: '医药猎头和HR社群', desc: '直接对接招聘需求', tag: '招聘资源' },
        { name: '药学院校校友会', desc: '校友资源和内推机会', tag: '人脉资源' },
      ],
      cert: [
        { name: '注册临床研究专业证书', desc: '临床研究专业认证', tag: '专业认证' },
        { name: 'GCP证书', desc: '药物临床试验质量管理规范', tag: '行业准入' },
        { name: '医药营销师', desc: '医药行业营销认证', tag: '营销认证' },
      ],
    },
    '公共卫生': {
      training: [
        { name: 'MPH（公共卫生硕士）课程', desc: '系统学习公共卫生理论', tag: '学位课程' },
        { name: '流行病学与统计学方法培训', desc: '核心方法学技能', tag: '方法技能' },
        { name: '卫生政策分析课程', desc: '了解政策制定和分析框架', tag: '政策技能' },
      ],
      network: [
        { name: '中华预防医学会', desc: '公共卫生领域核心学术组织', tag: '学术组织' },
        { name: '地方CDC和卫生行政部门', desc: '直接对接政府部门', tag: '政府资源' },
        { name: 'WHO/UNICEF等国际组织', desc: '国际公共卫生平台', tag: '国际平台' },
      ],
      cert: [
        { name: '公共卫生硕士（MPH）学位', desc: '公卫领域核心学位', tag: '核心学位' },
        { name: '流行病学资质认证', desc: '流行病学专项能力证明', tag: '专项认证' },
        { name: '国家卫健委公共卫生专项培训', desc: '官方背景专业培训', tag: '官方认证' },
      ],
    },
    '数字医疗': {
      training: [
        { name: '医疗信息化管理培训', desc: 'HIS、电子病历等系统管理', tag: '行业知识' },
        { name: '产品经理（医疗方向）培训', desc: '产品设计、用户研究、数据分析', tag: '核心技能' },
        { name: 'AI与大数据医疗应用课程', desc: '了解AI在医疗领域的应用', tag: '前沿技术' },
      ],
      network: [
        { name: '中国数字医疗协会', desc: '数字医疗行业组织', tag: '行业协会' },
        { name: '医疗信息化厂商社群', desc: 'HIS、EMR等厂商用户社群', tag: '技术社群' },
        { name: '互联网医疗创业者社群', desc: '链接创业者和投资人', tag: '创业资源' },
      ],
      cert: [
        { name: '医疗信息化工程师认证', desc: '卫健委认证的信息化专业证书', tag: '行业认证' },
        { name: 'PMP项目管理认证', desc: '项目管理的国际标准认证', tag: '国际认证' },
        { name: '数据分析师认证', desc: '数据分析专项能力证明', tag: '数据技能' },
      ],
    },
  };

  const defaultResources = {
    training: [
      { name: '职业生涯规划课程', desc: '系统评估自身优势和转型方向', tag: '基础技能' },
      { name: '行业调研方法培训', desc: '深入了解目标行业的岗位和要求', tag: '调研技能' },
      { name: '转型面试技巧训练', desc: 'STAR法则和行为面试', tag: '求职技能' },
    ],
    network: [
      { name: '行业前辈和导师', desc: 'LinkedIn或行业论坛寻找导师', tag: '导师指导' },
      { name: '行业社群和论坛', desc: '加入目标行业社群', tag: '社群资源' },
      { name: '行业展会和峰会', desc: '参加行业活动拓展人脉', tag: '活动资源' },
    ],
    cert: [
      { name: '职业转型咨询认证', desc: '专业职业规划服务', tag: '咨询服务' },
      { name: '行业相关培训证书', desc: '积累目标行业的专业认证', tag: '专项认证' },
      { name: '技能认证（语言/工具）', desc: '提升通用技能', tag: '通用技能' },
    ],
  };

  return resourceDB[topDirection] || defaultResources;
}
