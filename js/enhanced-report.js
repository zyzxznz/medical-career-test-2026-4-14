// 医护职业转型测试系统 - 增强的个性化报告生成
// 版本: 1.0
// 日期: 2026-04-15

// 专业数据中的转型方向属性（基于02-专业数据.md）
const DIRECTION_ATTRIBUTES = {
    '医疗科技': {
        requiredSkills: ['技术操作', '数据分析', '策划筹备'],
        riskLevel: '中',
        incomeLevel: '中',
        stability: '中',
        learningRequirement: '高',
        flexibility: '中',
        description: '医疗设备、软件、AI等科技公司'
    },
    '医药企业': {
        requiredSkills: ['沟通协调', '策划筹备', '团队领导'],
        riskLevel: '中',
        incomeLevel: '高',
        stability: '中',
        learningRequirement: '中',
        flexibility: '中',
        description: '制药、医疗器械、医药流通等企业'
    },
    '健康管理': {
        requiredSkills: ['沟通协调', '抗压恢复', '冲突解决'],
        riskLevel: '低',
        incomeLevel: '中',
        stability: '中',
        learningRequirement: '中',
        flexibility: '中高',
        description: '健康管理公司、体检中心、康养机构'
    },
    '教育培训': {
        requiredSkills: ['演讲表达', '写作表达', '沟通协调'],
        riskLevel: '低',
        incomeLevel: '中',
        stability: '中',
        learningRequirement: '中',
        flexibility: '中高',
        description: '医学院校、培训机构、在线教育'
    },
    '互联网医疗': {
        requiredSkills: ['数据分析', '技术操作', '策划筹备'],
        riskLevel: '中高',
        incomeLevel: '中高',
        stability: '中低',
        learningRequirement: '高',
        flexibility: '高',
        description: '互联网医疗平台、数字健康公司'
    },
    '政府/事业单位': {
        requiredSkills: ['沟通协调', '策划筹备', '抗压恢复'],
        riskLevel: '低',
        incomeLevel: '中',
        stability: '高',
        learningRequirement: '中',
        flexibility: '低',
        description: '卫健委、疾控中心、医保局等'
    },
    '深造研究': {
        requiredSkills: ['数据分析', '写作表达', '技术操作'],
        riskLevel: '中',
        incomeLevel: '中',
        stability: '中',
        learningRequirement: '高',
        flexibility: '低',
        description: '继续深造、科研机构、高校'
    },
    '自由职业': {
        requiredSkills: ['沟通协调', '团队领导', '抗压恢复'],
        riskLevel: '高',
        incomeLevel: '高',
        stability: '低',
        learningRequirement: '中',
        flexibility: '高',
        description: '自由执业、咨询顾问、个人工作室'
    }
};

// 技能映射：评估类别 -> 实际技能
const SKILL_MAPPING = {
    'leadership': '团队领导',
    'teaching': '沟通协调',
    'research': '数据分析',
    'innovation': '策划筹备',
    'communication': '沟通协调',
    'tech': '技术操作',
    'stress': '抗压恢复',
    'learning': '学习能力',
    'policy': '策划筹备',
    'entrepreneur': '创新思维'
};

// 风险等级映射
const RISK_LEVEL_MAPPING = {
    '低': 1,
    '中': 2,
    '高': 3,
    '中高': 2.5
};

// 收入等级映射
const INCOME_LEVEL_MAPPING = {
    '低': 1,
    '中': 2,
    '高': 3,
    '中高': 2.5
};

// 个性化分析生成器
class PersonalizedAnalysisGenerator {
    constructor(userInfo, assessmentScores) {
        this.userInfo = userInfo;
        this.assessmentScores = assessmentScores;
    }
    
    // 计算增强的匹配度
    calculateEnhancedMatchScore(direction) {
        const attributes = DIRECTION_ATTRIBUTES[direction];
        if (!attributes) return 0;
        
        let score = 0;
        
        // 1. 技能匹配度（40%权重）
        const skillMatch = this.calculateSkillMatch(attributes.requiredSkills);
        score += skillMatch * 0.4;
        
        // 2. 风险适配度（20%权重）- 假设用户风险承受能力中等
        const userRiskTolerance = this.getUserRiskTolerance();
        const riskMatch = this.calculateRiskMatch(userRiskTolerance, attributes.riskLevel);
        score += riskMatch * 0.2;
        
        // 3. 收入期望匹配度（15%权重）- 假设用户期望收入增长
        const userIncomeExpectation = 'increase_20'; // 默认期望增长20%
        const incomeMatch = this.calculateIncomeMatch(userIncomeExpectation, attributes.incomeLevel);
        score += incomeMatch * 0.15;
        
        // 4. 稳定性需求匹配度（15%权重）- 基于经济压力判断
        const stabilityNeed = this.userInfo.economicPressure >= 7 ? 1 : 2; // 1=高稳定性需求，2=中等
        const stabilityMatch = this.calculateStabilityMatch(stabilityNeed, attributes.stability);
        score += stabilityMatch * 0.15;
        
        // 5. 学习意愿匹配度（10%权重）
        const learningWillingness = this.userInfo.learningWillingness || 'medium';
        const learningMatch = this.calculateLearningMatch(learningWillingness, attributes.learningRequirement);
        score += learningMatch * 0.1;
        
        return Math.round(score * 100); // 转换为百分比
    }
    
    // 计算技能匹配度
    calculateSkillMatch(requiredSkills) {
        let totalScore = 0;
        let maxPossible = 0;
        
        requiredSkills.forEach(skill => {
            // 找到对应的评估类别
            const matchingCategory = Object.keys(SKILL_MAPPING).find(
                category => SKILL_MAPPING[category] === skill
            );
            
            if (matchingCategory && this.assessmentScores[matchingCategory]) {
                const skillScore = this.assessmentScores[matchingCategory] / 50; // 归一化到0-1
                totalScore += skillScore;
                maxPossible += 1;
            }
        });
        
        return maxPossible > 0 ? totalScore / maxPossible : 0;
    }
    
    // 获取用户风险承受能力
    getUserRiskTolerance() {
        // 从评估分数推断风险承受能力
        const stressScore = this.assessmentScores.stress || 5;
        const entrepreneurScore = this.assessmentScores.entrepreneur || 5;
        
        // 抗压能力强且创业意愿高 -> 高风险承受
        if (stressScore > 7 && entrepreneurScore > 7) return 3; // 高
        if (stressScore < 4 && entrepreneurScore < 4) return 1; // 低
        return 2; // 中
    }
    
    // 计算风险匹配度
    calculateRiskMatch(userRiskTolerance, directionRiskLevel) {
        const directionRiskValue = RISK_LEVEL_MAPPING[directionRiskLevel] || 2;
        const riskDifference = Math.abs(userRiskTolerance - directionRiskValue);
        
        // 差异越小匹配度越高
        return Math.max(0, 1 - (riskDifference / 3));
    }
    
    // 计算收入期望匹配度
    calculateIncomeMatch(userIncomeExpectation, directionIncomeLevel) {
        const incomeMapping = {
            'same': 1,          // 维持现状
            'increase_20': 2,   // 增长20%
            'increase_50': 2.5, // 增长50%
            'increase_100': 3,  // 增长100%
            'flexible': 2       // 灵活
        };
        
        const userIncomeValue = incomeMapping[userIncomeExpectation] || 2;
        const directionIncomeValue = INCOME_LEVEL_MAPPING[directionIncomeLevel] || 2;
        const incomeDifference = Math.abs(userIncomeValue - directionIncomeValue);
        
        return Math.max(0, 1 - (incomeDifference / 3));
    }
    
    // 计算稳定性匹配度
    calculateStabilityMatch(userStabilityNeed, directionStability) {
        const stabilityMapping = {
            '低': 1,
            '中低': 1.5,
            '中': 2,
            '中高': 2.5,
            '高': 3
        };
        
        const directionStabilityValue = stabilityMapping[directionStability] || 2;
        const stabilityDifference = Math.abs(userStabilityNeed - directionStabilityValue);
        
        return Math.max(0, 1 - (stabilityDifference / 3));
    }
    
    // 计算学习意愿匹配度
    calculateLearningMatch(userLearningWillingness, directionLearningRequirement) {
        const learningMapping = {
            'low': 1,       // 不愿学习
            'medium': 2,    // 中等意愿
            'high': 3,      // 高意愿
            'very_high': 4  // 非常高意愿
        };
        
        const requirementMapping = {
            '低': 1,
            '中': 2,
            '高': 3,
            '非常高': 4
        };
        
        const userLearningValue = learningMapping[userLearningWillingness] || 2;
        const directionRequirementValue = requirementMapping[directionLearningRequirement] || 2;
        const learningDifference = Math.abs(userLearningValue - directionRequirementValue);
        
        return Math.max(0, 1 - (learningDifference / 4));
    }
    
    // 生成用户画像分析
    generateUserProfileAnalysis() {
        const analysis = {
            professionalStrengths: [],
            developmentAreas: [],
            uniqueAdvantages: []
        };
        
        // 基于专业背景分析
        const role = this.userInfo.currentRole || 'doctor';
        if (role === 'doctor') {
            analysis.professionalStrengths.push('深厚的医学专业知识');
            analysis.professionalStrengths.push('丰富的临床经验');
            analysis.professionalStrengths.push('系统的医学思维训练');
            analysis.uniqueAdvantages.push('在医药企业、医疗科技方向有独特优势');
        } else if (role === 'nurse') {
            analysis.professionalStrengths.push('优秀的患者沟通能力');
            analysis.professionalStrengths.push('丰富的临床护理经验');
            analysis.professionalStrengths.push('细致的观察和照护能力');
            analysis.uniqueAdvantages.push('在健康管理、教育培训方向有独特优势');
        } else if (role === 'technician') {
            analysis.professionalStrengths.push('熟练的技术操作能力');
            analysis.professionalStrengths.push('精准的数据分析能力');
            analysis.professionalStrengths.push('设备维护和操作经验');
            analysis.uniqueAdvantages.push('在医疗科技、检验检测方向有独特优势');
        }
        
        // 基于能力评估结果分析
        if (this.assessmentScores.leadership > 7) {
            analysis.professionalStrengths.push('突出的领导能力');
        }
        
        if (this.assessmentScores.teaching > 7) {
            analysis.professionalStrengths.push('优秀的教学和表达能力');
        }
        
        if (this.assessmentScores.research > 7) {
            analysis.professionalStrengths.push('较强的研究和分析能力');
        }
        
        if (this.assessmentScores.tech > 7) {
            analysis.professionalStrengths.push('良好的技术适应能力');
        }
        
        // 发展领域
        if (this.assessmentScores.leadership < 5) {
            analysis.developmentAreas.push('领导能力有待提升');
        }
        
        if (this.assessmentScores.communication < 5) {
            analysis.developmentAreas.push('沟通协调能力需要加强');
        }
        
        if (this.assessmentScores.innovation < 5) {
            analysis.developmentAreas.push('创新思维需要培养');
        }
        
        return analysis;
    }
    
    // 生成方向详细分析
    generateDirectionAnalysis(direction, matchScore) {
        const attributes = DIRECTION_ATTRIBUTES[direction];
        const analysis = {
            direction: direction,
            matchScore: matchScore,
            matchLevel: this.getMatchLevel(matchScore),
            description: attributes?.description || '',
            strengths: [],
            challenges: [],
            opportunities: [],
            skillGaps: this.analyzeSkillGaps(direction),
            riskAnalysis: this.analyzeRisk(direction),
            specificRecommendations: []
        };
        
        // 优势分析
        const role = this.userInfo.currentRole || 'doctor';
        if (role === 'doctor' && direction === '医药企业') {
            analysis.strengths.push('您的临床经验对药企医学事务部门有重要价值');
            analysis.strengths.push('医学专业知识有助于理解产品特性和临床试验设计');
            analysis.strengths.push('医生背景在医药行业有较高的专业信誉');
        }
        
        if (role === 'nurse' && direction === '健康管理') {
            analysis.strengths.push('您的护理经验在健康管理领域有直接应用价值');
            analysis.strengths.push('患者沟通能力是健康管理的核心技能');
            analysis.strengths.push('临床观察能力有助于健康风险评估');
        }
        
        if (direction === '医疗科技' && this.assessmentScores.tech > 6) {
            analysis.strengths.push('您对医疗技术有浓厚兴趣，适合技术相关岗位');
            analysis.strengths.push('技术适应能力有助于快速掌握新工具和系统');
        }
        
        if (direction === '教育培训' && this.assessmentScores.teaching > 6) {
            analysis.strengths.push('您的教学能力适合教育培训方向');
            analysis.strengths.push('专业知识可以转化为教学资源');
        }
        
        // 挑战分析
        if (attributes?.riskLevel === '高') {
            analysis.challenges.push('该方向风险较高，需要较强的风险承受能力');
            analysis.challenges.push('收入可能不稳定，需要做好财务规划');
            analysis.challenges.push('市场竞争激烈，需要独特的竞争优势');
        }
        
        if (attributes?.riskLevel === '中高') {
            analysis.challenges.push('需要一定的风险承受能力和适应能力');
            analysis.challenges.push('职业发展路径可能不够清晰，需要主动规划');
        }
        
        if (attributes?.learningRequirement === '高') {
            analysis.challenges.push('需要较强的学习意愿和持续学习能力');
            analysis.challenges.push('可能需要投入较多时间和资源进行学习');
        }
        
        // 机会分析
        if (direction === '数字医疗' || direction === '互联网医疗') {
            analysis.opportunities.push('数字医疗是行业发展趋势，市场需求持续增长');
            analysis.opportunities.push('您的医疗背景在科技公司中有独特优势');
            analysis.opportunities.push('行业处于快速发展期，职业机会较多');
        }
        
        if (direction === '健康管理') {
            analysis.opportunities.push('随着老龄化加剧，健康管理需求快速增长');
            analysis.opportunities.push('政策支持健康产业发展，市场空间大');
            analysis.opportunities.push('您的临床经验在健康管理领域有重要价值');
        }
        
        if (direction === '医药企业') {
            analysis.opportunities.push('医药行业持续增长，职业发展空间大');
            analysis.opportunities.push('医疗背景在药企有较高的专业价值');
            analysis.opportunities.push('行业薪酬水平相对较高');
        }
        
        // 具体建议
        analysis.specificRecommendations.push(
            `建议参加${direction}相关的培训课程或认证考试`
        );
        analysis.specificRecommendations.push(
            `建立${direction}领域的人脉网络，了解行业动态`
        );
        analysis.specificRecommendations.push(
            `寻找实习或项目机会，积累${direction}相关经验`
        );
        
        if (attributes?.learningRequirement === '高') {
            analysis.specificRecommendations.push(
                '制定系统的学习计划，提升相关技能'
            );
        }
        
        if (attributes?.riskLevel === '高' || attributes?.riskLevel === '中高') {
            analysis.specificRecommendations.push(
                '制定风险管理计划，准备应急资金'
            );
        }
        
        return analysis;
    }
    
    // 分析技能差距
    analyzeSkillGaps(direction) {
        const requiredSkills = DIRECTION_ATTRIBUTES[direction]?.requiredSkills || [];
        const gaps = [];
        
        requiredSkills.forEach(skill => {
            const userSkillLevel = this.getUserSkillLevel(skill);
            const requiredLevel = 8; // 目标水平设为8/10
            
            if (userSkillLevel < requiredLevel) {
                gaps.push({
                    skill: skill,
                    currentLevel: userSkillLevel,
                    requiredLevel: requiredLevel,
                    gap: requiredLevel - userSkillLevel,
                    improvementSuggestions: this.getSkillImprovementSuggestions(skill)
                });
            }
        });
        
        return gaps;
    }
    
    // 分析风险
    analyzeRisk(direction) {
        const attributes = DIRECTION_ATTRIBUTES[direction];
        if (!attributes) return { level: '未知', factors: [], mitigations: [] };
        
        const riskAnalysis = {
            level: attributes.riskLevel,
            factors: [],
            mitigations: []
        };
        
        if (attributes.riskLevel === '高') {
            riskAnalysis.factors.push('市场竞争激烈，成功门槛较高');
            riskAnalysis.factors.push('收入波动大，初期可能面临经济压力');
            riskAnalysis.factors.push('工作稳定性较低，需要较强的适应能力');
            riskAnalysis.mitigations.push('建立应急资金，准备3-6个月的生活费');
            riskAnalysis.mitigations.push('制定详细的风险管理计划，分阶段实施');
            riskAnalysis.mitigations.push('寻找合作伙伴或导师，降低创业风险');
        } else if (attributes.riskLevel === '中高') {
            riskAnalysis.factors.push('需要一定的适应期和学习成本');
            riskAnalysis.factors.push('职业发展路径需要清晰规划');
            riskAnalysis.factors.push('可能面临行业波动影响');
            riskAnalysis.mitigations.push('参加相关培训，提升竞争力');
            riskAnalysis.mitigations.push('寻找导师或行业前辈指导');
            riskAnalysis.mitigations.push('制定备选方案，降低单一风险');
        } else if (attributes.riskLevel === '中') {
            riskAnalysis.factors.push('需要平衡学习成本和时间投入');
            riskAnalysis.factors.push('职业转换需要一定的过渡期');
            riskAnalysis.mitigations.push('制定渐进式的转型计划');
            riskAnalysis.mitigations.push('利用现有技能和经验平滑过渡');
        } else {
            riskAnalysis.factors.push('转型过程相对平稳');
            riskAnalysis.mitigations.push('按计划推进即可，风险较低');
        }
        
        return riskAnalysis;
    }
    
    // 获取匹配等级
    getMatchLevel(score) {
        if (score >= 90) return '极佳匹配';
        if (score >= 80) return '优秀匹配';
        if (score >= 70) return '良好匹配';
        if (score >= 60) return '一般匹配';
        return '较低匹配';
    }
    
    // 获取用户技能水平
    getUserSkillLevel(skill) {
        // 将技能映射到评估类别
        const matchingCategory = Object.keys(SKILL_MAPPING).find(
            category => SKILL_MAPPING[category] === skill
        );
        
        if (matchingCategory && this.assessmentScores[matchingCategory]) {
            // 将0-50的分数转换为1-10分
            return Math.round((this.assessmentScores[matchingCategory] / 50) * 10);
        }
        
        return 5; // 默认中等水平
    }
    
    // 获取技能提升建议
    getSkillImprovementSuggestions(skill) {
        const suggestions = {
            '团队领导': [
                '参加领导力培训课程（如情境领导、教练技术）',
                '主动承担项目管理职责，积累管理经验',
                '学习团队激励和冲突解决方法',
                '寻找 mentor 指导领导力发展'
            ],
            '沟通协调': [
                '参加沟通技巧培训（如非暴力沟通、高效沟通）',
                '练习公众演讲和表达，提升影响力',
                '学习跨部门协作和项目管理方法',
                '参与团队合作项目，锻炼协调能力'
            ],
            '数据分析': [
                '学习统计学基础知识和数据分析方法',
                '掌握Excel高级功能或SPSS/R/Python等分析工具',
                '参加数据分析实战培训或在线课程',
                '寻找数据分析项目实践机会'
            ],
            '技术操作': [
                '学习相关软件或设备操作，考取技术认证',
                '参加技术培训课程，掌握最新技术趋势',
                '寻找实践机会，积累技术操作经验',
                '加入技术社区，交流学习经验'
            ],
            '策划筹备': [
                '学习项目管理和活动策划方法',
                '参与实际项目策划，积累经验',
                '学习时间管理和资源调配技巧',
                '考取PMP等项目管理认证'
            ],
            '抗压恢复': [
                '学习压力管理和情绪调节技巧',
                '建立健康的工作生活平衡',
                '培养 resilience（心理弹性）',
                '寻找支持系统，分享压力'
            ],
            '演讲表达': [
                '参加演讲培训或加入Toastmasters俱乐部',
                '练习结构化表达和故事讲述',
                '录制自己的演讲视频，进行改进',
                '寻找公开演讲机会，积累经验'
            ],
            '写作表达': [
                '参加写作培训课程',
                '定期练习写作，建立写作习惯',
                '学习不同类型文档的写作规范',
                '寻找写作导师指导改进'
            ],
            '创新思维': [
                '学习设计思维和创新方法',
                '参与创新项目或创业活动',
                '培养跨领域思考能力',
                '建立创新思维习惯'
            ]
        };
        
        return suggestions[skill] || [
            '通过在线课程学习相关技能',
            '寻找实践机会积累经验',
            '向有经验的同事或导师学习',
            '定期反思和改进技能应用'
        ];
    }
}

// 报告导出功能
class ReportExporter {
    constructor(reportData) {
        this.reportData = reportData;
    }
    
    // 导出为文本格式
    exportToText() {
        let text = '';
        
        // 报告标题
        text += '医护职业转型个性化分析报告\n';
        text += '='.repeat(60) + '\n\n';
        
        // 报告信息
        text += `报告生成时间: ${new Date().toLocaleString('zh-CN')}\n`;
        text += `报告版本: 增强版 v1.0\n`;
        text += '='.repeat(60) + '\n\n';
        
        // 一、用户信息
        text += '一、用户信息\n';
        text += '-'.repeat(40) + '\n';
        const basicInfo = this.reportData.userProfile?.basicInfo || {};
        text += `当前职位: ${this.getRoleDisplayName(basicInfo.currentRole)}\n`;
        text += `工作年限: ${basicInfo.experience || '未填写'}\n`;
        text += `最高学历: ${this.getEducationDisplayName(basicInfo.education)}\n`;
        text += `专业领域: ${basicInfo.specialty || '未填写'}\n\n`;
        
        // 二、执行摘要
        text += '二、执行摘要\n';
        text += '-'.repeat(40) + '\n';
        const overall = this.reportData.overallRecommendations || {};
        text += `总体转型准备度: ${overall.readinessScore || 0}%\n`;
        
        const topRec = overall.topRecommendation;
        if (topRec) {
            text += `首选转型方向: ${topRec.direction || '未推荐'}\n`;
            text += `匹配度: ${topRec.matchScore || 0}%\n`;
            text += `匹配等级: ${topRec.matchLevel || '未知'}\n`;
        }
        
        text += '\n关键洞察:\n';
        const insights = this.generateKeyInsights();
        insights.forEach((insight, index) => {
            text += `${index + 1}. ${insight}\n`;
        });
        text += '\n';
        
        // 三、用户画像分析
        text += '三、用户画像分析\n';
        text += '-'.repeat(40) + '\n';
        const profile = this.reportData.userProfile?.professionalBackground;
        if (profile) {
            if (profile.professionalStrengths?.length > 0) {
                text += '专业优势:\n';
                profile.professionalStrengths.forEach((strength, index) => {
                    text += `${index + 1}. ${strength}\n`;
                });
                text += '\n';
            }
            
            if (profile.developmentAreas?.length > 0) {
                text += '发展领域:\n';
                profile.developmentAreas.forEach((area, index) => {
                    text += `${index + 1}. ${area}\n`;
                });
                text += '\n';
            }
            
            if (profile.uniqueAdvantages?.length > 0) {
                text += '独特优势:\n';
                profile.uniqueAdvantages.forEach((advantage, index) => {
                    text += `${index + 1}. ${advantage}\n`;
                });
                text += '\n';
            }
        }
        
        // 四、转型方向分析
        text += '四、转型方向分析\n';
        text += '-'.repeat(40) + '\n';
        const directions = this.reportData.directionAnalysis || [];
        directions.forEach((analysis, index) => {
            text += `${index + 1}. ${analysis.direction} (${analysis.matchScore}% 匹配)\n`;
            text += `   匹配等级: ${analysis.matchLevel}\n`;
            text += `   方向描述: ${analysis.description}\n`;
            
            if (analysis.strengths?.length > 0) {
                text += '   优势分析:\n';
                analysis.strengths.forEach(strength => {
                    text += `   • ${strength}\n`;
                });
            }
            
            if (analysis.challenges?.length > 0) {
                text += '   挑战分析:\n';
                analysis.challenges.forEach(challenge => {
                    text += `   • ${challenge}\n`;
                });
            }
            
            if (analysis.opportunities?.length > 0) {
                text += '   机会分析:\n';
                analysis.opportunities.forEach(opportunity => {
                    text += `   • ${opportunity}\n`;
                });
            }
            
            if (analysis.specificRecommendations?.length > 0) {
                text += '   具体建议:\n';
                analysis.specificRecommendations.forEach(recommendation => {
                    text += `   • ${recommendation}\n`;
                });
            }
            
            text += '\n';
        });
        
        // 五、技能差距分析（基于首选方向）
        text += '五、技能差距分析\n';
        text += '-'.repeat(40) + '\n';
        const topDirection = directions[0];
        if (topDirection?.skillGaps?.length > 0) {
            text += `基于首选方向"${topDirection.direction}"的技能差距分析:\n\n`;
            topDirection.skillGaps.forEach((gap, index) => {
                text += `${index + 1}. ${gap.skill}\n`;
                text += `   当前水平: ${gap.currentLevel}/10\n`;
                text += `   目标水平: ${gap.requiredLevel}/10\n`;
                text += `   差距: ${gap.gap}分\n`;
                
                if (gap.improvementSuggestions?.length > 0) {
                    text += '   提升建议:\n';
                    gap.improvementSuggestions.forEach(suggestion => {
                        text += `   • ${suggestion}\n`;
                    });
                }
                
                text += '\n';
            });
        } else {
            text += '暂无显著的技能差距。\n\n';
        }
        
        // 六、风险分析（基于首选方向）
        text += '六、风险分析\n';
        text += '-'.repeat(40) + '\n';
        if (topDirection?.riskAnalysis) {
            const risk = topDirection.riskAnalysis;
            text += `风险等级: ${risk.level}\n\n`;
            
            if (risk.factors?.length > 0) {
                text += '风险因素:\n';
                risk.factors.forEach((factor, index) => {
                    text += `${index + 1}. ${factor}\n`;
                });
                text += '\n';
            }
            
            if (risk.mitigations?.length > 0) {
                text += '应对策略:\n';
                risk.mitigations.forEach((mitigation, index) => {
                    text += `${index + 1}. ${mitigation}\n`;
                });
                text += '\n';
            }
        }
        
        // 七、行动计划
        text += '七、行动计划\n';
        text += '-'.repeat(40) + '\n';
        const actionPlan = this.reportData.actionPlan || {};
        
        text += '短期行动计划（1-3个月）:\n';
        if (actionPlan.shortTerm?.length > 0) {
            actionPlan.shortTerm.forEach((action, index) => {
                text += `${index + 1}. ${action}\n`;
            });
        } else {
            text += '1. 完成个人技能评估，明确优势与不足\n';
            text += '2. 收集目标方向的行业信息和岗位要求\n';
            text += '3. 制定详细的学习和发展计划\n';
        }
        text += '\n';
        
        text += '中期行动计划（3-12个月）:\n';
        if (actionPlan.mediumTerm?.length > 0) {
            actionPlan.mediumTerm.forEach((action, index) => {
                text += `${index + 1}. ${action}\n`;
            });
        } else {
            text += '1. 参加相关培训或考取资格证书\n';
            text += '2. 积累项目经验或实习经历\n';
            text += '3. 建立行业人脉网络\n';
        }
        text += '\n';
        
        text += '长期行动计划（1-2年）:\n';
        if (actionPlan.longTerm?.length > 0) {
            actionPlan.longTerm.forEach((action, index) => {
                text += `${index + 1}. ${action}\n`;
            });
        } else {
            text += '1. 实现职业转型，进入目标领域\n';
            text += '2. 在新岗位上建立专业声誉\n';
            text += '3. 持续学习和职业发展\n';
        }
        text += '\n';
        
        // 八、资源推荐
        text += '八、资源推荐\n';
        text += '-'.repeat(40) + '\n';
        const resources = this.reportData.resources || {};
        
        if (resources.training?.length > 0) {
            text += '培训资源:\n';
            resources.training.forEach((resource, index) => {
                text += `${index + 1}. ${resource}\n`;
            });
            text += '\n';
        }
        
        if (resources.networking?.length > 0) {
            text += '人脉网络:\n';
            resources.networking.forEach((resource, index) => {
                text += `${index + 1}. ${resource}\n`;
            });
            text += '\n';
        }
        
        if (resources.certification?.length > 0) {
            text += '认证考试:\n';
            resources.certification.forEach((resource, index) => {
                text += `${index + 1}. ${resource}\n`;
            });
            text += '\n';
        }
        
        // 报告尾部
        text += '='.repeat(60) + '\n';
        text += '免责声明:\n';
        text += '本报告基于您提供的信息和系统算法生成，仅供参考。\n';
        text += '职业转型决策请结合个人实际情况和专业人士建议。\n';
        text += '='.repeat(60) + '\n';
        text += '数据来源: 医护职业转型测试系统专业数据库 v2.0\n';
        text += '算法版本: 增强匹配算法 v1.0\n';
        text += '报告ID: ' + this.generateReportId() + '\n';
        
        return text;
    }
    
    // 生成关键洞察
    generateKeyInsights() {
        const insights = [];
        const directions = this.reportData.directionAnalysis || [];
        const topDirection = directions[0];
        
        if (topDirection) {
            insights.push(`您的首选转型方向是"${topDirection.direction}"，匹配度${topDirection.matchScore}%`);
            
            if (topDirection.matchScore >= 80) {
                insights.push('您与该方向有很高的匹配度，转型成功概率较大');
            } else if (topDirection.matchScore >= 60) {
                insights.push('您与该方向匹配度良好，通过适当准备可以成功转型');
            }
            
            if (topDirection.skillGaps?.length > 0) {
                insights.push(`需要重点关注${topDirection.skillGaps.length}项关键技能的提升`);
            }
            
            if (topDirection.riskAnalysis?.level === '高' || topDirection.riskAnalysis?.level === '中高') {
                insights.push('该方向风险较高，建议制定详细的风险管理计划');
            }
        }
        
        const profile = this.reportData.userProfile?.professionalBackground;
        if (profile?.professionalStrengths?.length > 0) {
            insights.push(`您有${profile.professionalStrengths.length}项突出的专业优势`);
        }
        
        if (profile?.developmentAreas?.length > 0) {
            insights.push(`建议关注${profile.developmentAreas.length}个发展领域的提升`);
        }
        
        return insights;
    }
    
    // 获取职位显示名称
    getRoleDisplayName(role) {
        const roleNames = {
            'doctor': '医生',
            'nurse': '护士',
            'pharmacist': '药剂师',
            'technician': '医技人员',
            'administrator': '医疗管理人员',
            'other': '其他'
        };
        return roleNames[role] || role || '未填写';
    }
    
    // 获取学历显示名称
    getEducationDisplayName(education) {
        const educationNames = {
            'bachelor': '本科',
            'master': '硕士',
            'doctor': '博士',
            'other': '其他'
        };
        return educationNames[education] || education || '未填写';
    }
    
    // 生成报告ID
    generateReportId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `REPORT-${timestamp}-${random}`.toUpperCase();
    }
    
    // 下载报告
    downloadReport() {
        const text = this.exportToText();
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        const dateStr = new Date().toISOString().split('T')[0];
        a.download = `医护职业转型分析报告_${dateStr}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// 与现有系统集成的函数
function integrateWithExistingSystem() {
    // 检查是否在正确的上下文中
    if (typeof appState === 'undefined') {
        console.warn('无法找到现有的appState，增强报告功能需要与现有系统集成');
        return;
    }
    
    console.log('开始集成增强报告功能...');
    
    // 保存原有的计算函数
    const originalCalculateResults = window.calculateResults;
    const originalShowResults = window.showResults;
    
    // 增强的计算结果函数
    window.calculateEnhancedResults = function() {
        console.log('执行增强的结果计算...');
        
        // 1. 执行原有的计算
        if (typeof originalCalculateResults === 'function') {
            originalCalculateResults();
        }
        
        // 2. 生成增强的报告
        generateEnhancedReport();
    };
    
    // 生成增强的报告
    function generateEnhancedReport() {
        console.log('生成增强的个性化报告...');
        
        // 创建分析生成器
        const analysisGenerator = new