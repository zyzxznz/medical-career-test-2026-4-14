/**
 * 医护职业转型测试 - 个性化报告匹配引擎
 */

// 根据10项能力得分匹配对应的报告类型
function matchReport(scores) {
  // 找出得分最高的能力项
  let maxScore = -1;
  let dominantAbility = 'leadership'; // 默认
  
  for (const [ability, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      dominantAbility = ability;
    }
  }
  
  // 根据主导能力匹配报告ID
  const reportId = abilityToReportMap[dominantAbility] || 'TYPE-001';
  
  // 查找对应的报告数据
  const report = reportData.find(r => r.id === reportId);
  
  return {
    reportId: reportId,
    report: report,
    dominantAbility: dominantAbility,
    dominantAbilityName: abilityNameMap[dominantAbility] || dominantAbility,
    maxScore: maxScore
  };
}

// 计算转型准备度
function calculateReadiness(economicPressure, riskTolerance, familySupport, learningWillingness) {
  let score = 50; // 基础分
  
  // 经济压力（压力越小分数越高，假设1-10分）
  score += (10 - Math.min(10, Math.max(1, economicPressure))) * 2;
  
  // 风险承受能力（1-10分）
  score += Math.min(10, Math.max(1, riskTolerance)) * 2;
  
  // 家庭支持（1-10分）
  score += Math.min(10, Math.max(1, familySupport)) * 2;
  
  // 学习意愿
  const learningMapping = {
    'no_study': 0,
    'part_time': 3,
    'intensive': 6,
    'long_term': 8,
    'full_time': 10
  };
  const learningScore = learningMapping[learningWillingness] || 5;
  score += learningScore;
  
  return Math.min(100, Math.max(0, Math.round(score)));
}

// 计算6个转型方向的得分
function calculateDirectionScores(abilityScores) {
  const scores = {};
  
  // 权重矩阵
  const weights = {
    leadership: { management: 1.5, industry: 0.5, education: 0, research: 0, publicHealth: 0, digitalHealth: 0 },
    teaching: { management: 0, industry: 0, education: 1.5, research: 0, publicHealth: 0.5, digitalHealth: 0 },
    research: { management: 0, industry: 0, education: 0, research: 1.5, publicHealth: 0.5, digitalHealth: 0 },
    innovation: { management: 0, industry: 1.2, education: 0, research: 0, publicHealth: 0, digitalHealth: 1.2 },
    communication: { management: 0.8, industry: 0.8, education: 0.8, research: 0.8, publicHealth: 0.8, digitalHealth: 0.8 },
    tech: { management: 0, industry: 0, education: 0, research: 0.5, publicHealth: 0, digitalHealth: 1.5 },
    stress: { management: 1.2, industry: 0.8, education: 0, research: 0, publicHealth: 0, digitalHealth: 0 },
    learning: { management: 0.7, industry: 0.7, education: 0.7, research: 0.7, publicHealth: 0.7, digitalHealth: 0.7 },
    policy: { management: 0.5, industry: 0, education: 0, research: 0, publicHealth: 1.5, digitalHealth: 0 },
    entrepreneur: { management: 0, industry: 1.5, education: 0, research: 0, publicHealth: 0, digitalHealth: 0.5 }
  };
  
  const directions = ['management', 'education', 'research', 'industry', 'publicHealth', 'digitalHealth'];
  
  // 初始化各方向分数
  directions.forEach(dir => { scores[dir] = 0; });
  
  // 计算分数
  for (const [ability, score] of Object.entries(abilityScores)) {
    if (weights[ability]) {
      for (const [direction, weight] of Object.entries(weights[ability])) {
        scores[direction] += score * weight;
      }
    }
  }
  
  // 计算匹配度百分比（归一化）
  const scoreValues = Object.values(scores);
  const maxScore = Math.max(...scoreValues);
  const minScore = Math.min(...scoreValues);
  const range = maxScore - minScore;
  
  const matchPercentages = {};
  for (const [dir, score] of Object.entries(scores)) {
    if (range > 0) {
      matchPercentages[dir] = Math.round(((score - minScore) / range) * 100);
    } else {
      matchPercentages[dir] = 50;
    }
  }
  
  return { scores, matchPercentages };
}

// 计算能力项得分（从10道题的答案）
function calculateAbilityScores(answers) {
  // 答案数组，每个值1-5
  const categories = ['leadership', 'teaching', 'research', 'innovation', 'communication', 'tech', 'stress', 'learning', 'policy', 'entrepreneur'];
  const scores = {};
  
  categories.forEach((cat, index) => {
    scores[cat] = answers[index] || 0;
  });
  
  return scores;
}

// 获取匹配度等级
function getMatchLevel(score) {
  if (score >= 90) return '极佳匹配';
  if (score >= 80) return '优秀匹配';
  if (score >= 70) return '良好匹配';
  if (score >= 60) return '一般匹配';
  return '较低匹配';
}

// 生成完整的报告展示数据
function generateReportData(scores, userInfo) {
  // 匹配报告类型
  const matchResult = matchReport(scores);
  
  // 计算转型方向得分
  const directionResults = calculateDirectionScores(scores);
  
  // 按匹配度排序
  const sortedDirections = Object.entries(directionResults.matchPercentages)
    .map(([key, value]) => ({
      key: key,
      name: directionNameMap[key] || key,
      score: value,
      rawScore: directionResults.scores[key]
    }))
    .sort((a, b) => b.score - a.score);
  
  // 计算转型准备度（使用默认值）
  const readiness = calculateReadiness(
    userInfo.economicPressure || 5,
    userInfo.riskTolerance || 5,
    userInfo.familySupport || 6,
    userInfo.learningWillingness || 'part_time'
  );
  
  // 获取转型方向得分排名
  const topDirections = sortedDirections.slice(0, 3);
  
  // 获取核心特征
  const report = matchResult.report;
  
  // 构建执行摘要数据
  const executiveSummary = {
    readiness: readiness,
    readinessLevel: getMatchLevel(readiness),
    topDirection: topDirections[0]?.name || '待评估',
    topDirectionScore: topDirections[0]?.score || 0,
    topDirectionLevel: getMatchLevel(topDirections[0]?.score || 0),
    coreTraitsSummary: report ? report.coreTraits.slice(0, 3) : [],
    reportName: report ? report.name : '',
    dominantAbility: abilityNameMap[matchResult.dominantAbility] || matchResult.dominantAbility
  };
  
  // 构建用户画像数据
  const userProfile = {
    coreTraits: report ? report.coreTraits : [],
    strengths: report ? report.uniqueAdvantages : [],
    developmentAreas: report ? report.challenges : [],
    description: report ? report.description : ''
  };
  
  // 构建方向分析数据
  const directionAnalysis = topDirections.map((dir, index) => {
    let extra = {};
    if (index === 0 && report) {
      extra = {
        strengths: report.primaryRecommendation.strengths,
        positions: report.primaryRecommendation.positions
      };
    } else if (index === 1 && report) {
      extra = {
        strengths: report.secondaryRecommendation.strengths,
        positions: report.secondaryRecommendation.positions
      };
    } else if (index === 2 && report && report.thirdRecommendation) {
      extra = {
        strengths: report.thirdRecommendation.strengths || [],
        positions: report.thirdRecommendation.positions || []
      };
    }
    
    return {
      rank: index + 1,
      name: dir.name,
      matchScore: dir.score,
      matchLevel: getMatchLevel(dir.score),
      ...extra
    };
  });
  
  return {
    executiveSummary,
    userProfile,
    directionAnalysis,
    matchResult,
    directionScores: directionResults.scores,
    directionPercentages: directionResults.matchPercentages,
    rawScores: scores
  };
}
