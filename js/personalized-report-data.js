/**
 * 医护职业转型测试 - 个性化报告数据
 * 包含10份个性化报告的完整数据
 */

const reportData = [
  {
    id: 'TYPE-001',
    name: '领导型',
    englishName: 'Leadership-Dominant',
    dominantAbility: 'leadership',
    description: '在团队管理、任务分配、计划制定方面表现突出，具备较强的抗压能力和沟通协调能力，通常已在工作中担任一定的管理职责或带教角色，对职业发展有清晰目标，倾向于影响力和决策权更大的岗位。',
    coreTraits: [
      '在团队管理、任务分配、计划制定方面表现突出',
      '具备较强的抗压能力和沟通协调能力',
      '通常已在工作中担任一定的管理职责或带教角色',
      '对职业发展有清晰目标，倾向于影响力和决策权更大的岗位'
    ],
    typicalScores: {
      leadership: 5,
      teaching: 3,
      research: 2,
      innovation: 4,
      communication: 4,
      tech: 2,
      stress: 5,
      learning: 3,
      policy: 3,
      entrepreneur: 4
    },
    primaryRecommendation: {
      name: '医药产业',
      matchScore: 89,
      strengths: [
        '领导力强，适合担任医学事务部门的管理岗位',
        '抗压能力突出，能适应医药行业快节奏、高目标的工作环境',
        '沟通能力佳，有助于与研发、市场、销售等多部门协作',
        '创业思维，理解商业逻辑，能从战略高度思考问题'
      ],
      positions: [
        '医学事务经理/总监',
        '医学顾问团队负责人',
        '临床研究项目经理',
        '医学策略总监',
        '医疗器械产品总监'
      ]
    },
    secondaryRecommendation: {
      name: '医疗管理',
      matchScore: 86,
      strengths: [
        '领导力强，天生的管理者特质，适合医院管理岗位',
        '抗压能力突出，医院管理压力大，此特质至关重要',
        '熟悉医疗环境，临床背景有助于理解医疗管理痛点',
        '沟通协调能力，管理工作需要跨科室、跨部门协调'
      ],
      positions: [
        '科室主任/副主任',
        '医务处/科教处管理岗位',
        '医院质量管理部门',
        '患者服务中心主任',
        '医联体协调管理岗位'
      ]
    },
    thirdRecommendation: {
      name: '数字医疗',
      matchScore: 65,
      strengths: [
        '创新思维活跃，能适应数字医疗的创新环境',
        '创业思维清晰，有助于理解数字医疗商业模式',
        '沟通能力强，有利于跨团队协作'
      ],
      positions: [
        '数字医疗产品运营经理',
        '医疗科技公司的医学顾问',
        '远程医疗项目协调员',
        '医疗信息化项目管理者'
      ]
    },
    challenges: [
      '技术能力偏弱，如涉及数字医疗产品，需补充相关技术知识',
      '研究能力一般，若进入研发型岗位，需加强科研方法论学习',
      '行业转型期，医药行业政策变化频繁，需保持政策敏感度'
    ],
    uniqueAdvantages: [
      '领导力与抗压力双强，是管理岗位的理想人选',
      '临床背景与商业思维兼备，在医药产业中有独特价值',
      '沟通协调能力强，适合跨部门协作的管理角色'
    ]
  },
  {
    id: 'TYPE-002',
    name: '教学型',
    englishName: 'Teaching-Dominant',
    dominantAbility: 'teaching',
    description: '在知识传授、培训指导方面表现突出，具备良好的沟通表达能力和学习能力，通常已担任临床带教、培训讲师等角色，热衷于分享知识、培养后辈，有教育情怀。',
    coreTraits: [
      '在知识传授、培训指导方面表现突出',
      '具备良好的沟通表达能力和学习能力',
      '通常已担任临床带教、培训讲师等角色',
      '热衷于分享知识、培养后辈，有教育情怀',
      '对医疗教育事业有持续热情'
    ],
    typicalScores: {
      leadership: 3,
      teaching: 5,
      research: 4,
      innovation: 3,
      communication: 4,
      tech: 3,
      stress: 3,
      learning: 4,
      policy: 4,
      entrepreneur: 2
    },
    primaryRecommendation: {
      name: '医学教育',
      matchScore: 92,
      strengths: [
        '教学能力突出，天生的教育者特质，知识传递和讲解能力强',
        '沟通能力良好，有助于与学员、同事建立有效沟通',
        '学习能力持续，能跟上医学教育领域的发展变化',
        '研究能力较强，可以开展教学研究和教育方法创新'
      ],
      positions: [
        '医学院校教师/讲师',
        '临床技能培训中心导师',
        '继续医学教育项目协调员',
        '医学教育管理岗位',
        '临床带教组长',
        '医学教育研究员'
      ]
    },
    secondaryRecommendation: {
      name: '公共卫生',
      matchScore: 85,
      strengths: [
        '教学能力强，适合从事公共卫生培训、健康教育推广',
        '研究能力较好，可开展流行病学调查、公共卫生研究',
        '政策理解力佳，有助于理解卫生政策和实施策略',
        '沟通能力突出，社区健康促进需要良好沟通'
      ],
      positions: [
        '疾控中心培训专员',
        '健康教育中心讲师',
        '公共卫生项目协调员',
        '社区健康管理师',
        '卫生政策研究员'
      ]
    },
    thirdRecommendation: {
      name: '医学研究',
      matchScore: 78,
      strengths: [
        '研究能力良好，能开展医学教育相关研究',
        '学习能力强，能快速掌握科研方法',
        '教学经验丰富，便于开展教育研究'
      ],
      positions: [
        '医学教育研究中心',
        '医学院教研部门',
        '临床技能中心研究岗',
        '教学质量评估中心'
      ]
    },
    challenges: [
      '领导力一般，若向教育管理发展，需提升领导力',
      '创业思维弱，教育创业或商业化方向需额外努力',
      '技术能力待提升，在线教育、数字化教学需技术支撑'
    ],
    uniqueAdvantages: [
      '教学与研究能力兼备，适合学术型教育岗位',
      '临床经验丰富，教学贴近实际，学员认可度高',
      '沟通表达能力强，能触及学员内心，教学效果好'
    ]
  },
  {
    id: 'TYPE-003',
    name: '研究型',
    englishName: 'Research-Dominant',
    dominantAbility: 'research',
    description: '在医学研究、数据分析、学术论文方面表现突出，具备较强的学习能力和创新思维，通常已有科研经历，发表过学术论文或参与过研究项目，对科学探索有持续热情。',
    coreTraits: [
      '在医学研究、数据分析、学术论文方面表现突出',
      '具备较强的学习能力和创新思维',
      '通常已有科研经历，发表过学术论文或参与过研究项目',
      '对科学探索有持续热情，享受发现和创新的过程',
      '倾向于深度工作而非广泛社交'
    ],
    typicalScores: {
      leadership: 2,
      teaching: 4,
      research: 5,
      innovation: 5,
      communication: 3,
      tech: 4,
      stress: 4,
      learning: 5,
      policy: 3,
      entrepreneur: 3
    },
    primaryRecommendation: {
      name: '医学研究',
      matchScore: 94,
      strengths: [
        '研究能力卓越，具备科研方法论基础，能独立开展研究',
        '学习能力突出，能快速掌握新知识、新技术、新方法',
        '创新思维活跃，善于发现问题、提出新观点、探索新方向',
        '技术能力良好，数据分析、实验技术、软件应用有一定基础'
      ],
      positions: [
        '医院科研处专职研究员',
        '临床研究中心项目主管',
        '医学院校科研岗位',
        '医药企业研发部门',
        '医学研究院/所研究员',
        'CRO公司项目经理'
      ]
    },
    secondaryRecommendation: {
      name: '数字医疗',
      matchScore: 88,
      strengths: [
        '学习能力极强，数字医疗需要快速学习新技术',
        '创新思维活跃，能提出创新的数字医疗解决方案',
        '研究能力支撑，能开展数字医疗相关研究验证',
        '技术能力达标，具备数据分析等技术基础'
      ],
      positions: [
        '医疗AI算法研究员',
        '数字医疗产品研究主管',
        '临床信息化研究员',
        '健康数据分析科学家',
        '医疗大数据研究工程师'
      ]
    },
    thirdRecommendation: {
      name: '医学教育',
      matchScore: 82,
      strengths: [
        '教学能力良好，能将研究成果融入教学',
        '研究能力极强，擅长教育研究和方法创新',
        '学习能力强，能不断更新教育理念'
      ],
      positions: [
        '医学教育研究中心研究员',
        '医学院教研部研究岗',
        '教学质量评估中心研究岗',
        '教育技术研究所'
      ]
    },
    challenges: [
      '领导力较弱，若想领导团队，需提升管理能力',
      '沟通能力一般，科研成果推广需要良好表达',
      '竞争激烈，学术岗位竞争压力大，需要持续产出',
      '周期长，研究成果产出周期长，需耐心积累'
    ],
    uniqueAdvantages: [
      '研究、学习、创新能力三位一体，是顶尖研究者的潜质',
      '临床背景为转化医学研究提供独特视角和资源',
      '技术与研究结合，适合医疗AI等交叉学科领域'
    ]
  },
  {
    id: 'TYPE-004',
    name: '创新型',
    englishName: 'Innovation-Dominant',
    dominantAbility: 'innovation',
    description: '在医疗技术创新、产品开发、商业模式探索方面表现突出，具备较强的学习能力、技术能力和创业思维，通常关注行业新趋势，有产品或服务的创新想法。',
    coreTraits: [
      '在医疗技术创新、产品开发、商业模式探索方面表现突出',
      '具备较强的学习能力、技术能力和创业思维',
      '通常关注行业新趋势，有产品或服务的创新想法',
      '对传统医疗模式有突破意愿，希望创造新价值',
      '愿意承担一定风险，追求高回报'
    ],
    typicalScores: {
      leadership: 4,
      teaching: 3,
      research: 4,
      innovation: 5,
      communication: 4,
      tech: 5,
      stress: 4,
      learning: 5,
      policy: 3,
      entrepreneur: 5
    },
    primaryRecommendation: {
      name: '数字医疗',
      matchScore: 96,
      strengths: [
        '创新能力卓越，能发现痛点、提出解决方案、推动产品创新',
        '技术能力突出，具备技术理解和应用能力，能与工程团队有效沟通',
        '学习能力极强，能快速掌握新技术、新趋势、新商业模式',
        '创业思维清晰，理解商业逻辑，有市场敏感度'
      ],
      positions: [
        '医疗AI产品经理',
        '数字医疗创业合伙人',
        '医疗科技创新研究员',
        '健康科技产品总监',
        '医疗SaaS解决方案专家',
        '数字健康业务发展总监'
      ]
    },
    secondaryRecommendation: {
      name: '医药产业',
      matchScore: 91,
      strengths: [
        '创新能力强，能为医药产品开发提供创新思路',
        '创业思维清晰，理解商业逻辑，有产品商业化意识',
        '学习能力强，能快速掌握医药行业知识'
      ],
      positions: [
        '创新药产品经理',
        '医疗器械产品总监',
        '商务拓展总监',
        '新产品战略规划经理',
        '医药投资分析师'
      ]
    },
    thirdRecommendation: {
      name: '医学研究',
      matchScore: 85,
      strengths: [
        '创新思维卓越，擅长转化医学和创新研究',
        '技术能力强，能开展医疗器械和创新技术研究',
        '学习能力强，能快速掌握前沿研究方法'
      ],
      positions: [
        '转化医学研究员',
        '医疗器械研发主管',
        '临床创新研究中心',
        '医学技术评估中心'
      ]
    },
    challenges: [
      '政策理解偏弱，数字医疗受政策影响大，需加强政策敏感性',
      '行业经验不足，需积累互联网医疗行业经验和人脉',
      '市场波动风险，科技行业变化快，需要持续学习和适应'
    ],
    uniqueAdvantages: [
      '创新、技术、创业思维三高，是医疗科技创业的理想人选',
      '临床背景与技术创新结合，能精准把握医疗痛点',
      '学习能力极强，能在快速变化的行业保持竞争力'
    ]
  },
  {
    id: 'TYPE-005',
    name: '沟通型',
    englishName: 'Communication-Dominant',
    dominantAbility: 'communication',
    description: '在人际沟通、关系协调、冲突解决方面表现突出，具备较强的同理心和情绪感知能力，通常担任医患沟通、部门协调等角色，善于倾听、表达、调解。',
    coreTraits: [
      '在人际沟通、关系协调、冲突解决方面表现突出',
      '具备较强的同理心和情绪感知能力',
      '通常担任医患沟通、部门协调等角色',
      '善于倾听、表达、调解，是团队的"润滑剂"',
      '在跨部门协作、患者关系管理中表现优异'
    ],
    typicalScores: {
      leadership: 3,
      teaching: 4,
      research: 2,
      innovation: 3,
      communication: 5,
      tech: 2,
      stress: 4,
      learning: 4,
      policy: 4,
      entrepreneur: 3
    },
    primaryRecommendation: {
      name: '医药产业',
      matchScore: 90,
      strengths: [
        '沟通能力卓越，能与各类利益相关方建立良好关系',
        '政策理解良好，有助于理解医药行业监管要求',
        '学习能力较强，能快速适应企业文化和工作方式',
        '抗压能力良好，能应对企业高强度工作'
      ],
      positions: [
        '医药企业医学顾问',
        '市场部客户经理',
        '医学事务沟通专员',
        '患者教育项目经理',
        '医患关系管理专员',
        '医学推广区域经理'
      ]
    },
    secondaryRecommendation: {
      name: '医疗管理',
      matchScore: 85,
      strengths: [
        '沟通能力卓越，医院管理需要大量跨科室协调',
        '政策理解良好，医院管理受政策影响大',
        '抗压能力良好，管理工作压力较大'
      ],
      positions: [
        '医患关系办公室主任',
        '医务处协调专员',
        '患者服务中心主管',
        '医院公关部门',
        '客户服务部经理'
      ]
    },
    thirdRecommendation: {
      name: '医学教育',
      matchScore: 82,
      strengths: [
        '沟通能力强，适合医患沟通培训等教育岗位',
        '教学能力良好，能将沟通技巧传授给他人',
        '学习能力强，能不断更新教育理念和方法'
      ],
      positions: [
        '医患沟通培训师',
        '患者教育项目主管',
        '健康传播研究员',
        '医学教育设计专家'
      ]
    },
    challenges: [
      '研究能力偏弱，需要提升数据分析、研究设计能力',
      '技术能力一般，在数字医疗等方向需要补强',
      '领导力中等，向管理岗位发展需进一步提升'
    ],
    uniqueAdvantages: [
      '沟通能力是各行各业都需要的核心软实力，转型面广',
      '同理心强，能理解各方需求，在协调岗位上有独特价值',
      '政策理解良好，在医药企业和医疗机构中都能发挥作用'
    ]
  },
  {
    id: 'TYPE-006',
    name: '技术型',
    englishName: 'Tech-Dominant',
    dominantAbility: 'tech',
    description: '在医疗信息化、数据分析、技术应用方面表现突出，对新技术、新工具有强烈兴趣和学习能力，通常已掌握一定的技术技能，关注数字化医疗发展。',
    coreTraits: [
      '在医疗信息化、数据分析、技术应用方面表现突出',
      '对新技术、新工具有强烈兴趣和学习能力',
      '通常已掌握一定的技术技能（数据分析、编程等）',
      '关注数字化医疗发展，有技术驱动的思维模式',
      '善于用技术解决实际问题'
    ],
    typicalScores: {
      leadership: 2,
      teaching: 3,
      research: 5,
      innovation: 5,
      communication: 3,
      tech: 5,
      stress: 3,
      learning: 5,
      policy: 3,
      entrepreneur: 4
    },
    primaryRecommendation: {
      name: '数字医疗',
      matchScore: 97,
      strengths: [
        '技术能力卓越，能理解和应用数字医疗技术',
        '创新能力突出，能提出创新解决方案',
        '学习能力极强，能快速掌握新技术新方法',
        '研究能力支撑，能开展技术相关研究验证'
      ],
      positions: [
        '医疗数据科学家',
        '医疗AI产品经理',
        '临床信息化专家',
        '数字医疗研究员',
        '健康数据分析顾问',
        '医疗技术解决方案架构师'
      ]
    },
    secondaryRecommendation: {
      name: '医学研究',
      matchScore: 89,
      strengths: [
        '技术能力突出，擅长医疗AI算法和数据挖掘研究',
        '研究能力卓越，能开展技术驱动的医学研究',
        '学习能力极强，能快速掌握前沿研究方法和工具'
      ],
      positions: [
        '医疗AI算法研究员',
        '医学影像分析研究员',
        '临床数据挖掘专家',
        '生物信息学研究员'
      ]
    },
    thirdRecommendation: {
      name: '医药产业',
      matchScore: 83,
      strengths: [
        '技术能力强，适合真实世界研究和数据分析岗位',
        '创新思维好，能推动医药产业数字化创新',
        '学习能力极强，能快速适应不同业务场景'
      ],
      positions: [
        '医药数据分析经理',
        '真实世界研究专家',
        '药物警戒数据科学家',
        '医学信息学专家'
      ]
    },
    challenges: [
      '技术更新快，需要持续学习和跟进前沿发展',
      '竞争压力大，科技行业人才密集',
      '沟通能力偏弱，需要提升技术表达和协作能力',
      '领导力较弱，向管理岗位发展需提升'
    ],
    uniqueAdvantages: [
      '医疗+技术双重背景，是数字医疗领域最稀缺的复合型人才',
      '技术和研究皆强，能独立完成从数据到成果的完整链条',
      '学习能力极强，在技术快速迭代的行业中保持领先'
    ]
  },
  {
    id: 'TYPE-007',
    name: '抗压型',
    englishName: 'Stress-Dominant',
    dominantAbility: 'stress',
    description: '在高压、快节奏工作环境下表现突出，具备极强的心理承受能力和情绪稳定性，通常在急诊、ICU、手术科室等工作，善于在危机中保持冷静、快速决策。',
    coreTraits: [
      '在高压、快节奏工作环境下表现突出',
      '具备极强的心理承受能力和情绪稳定性',
      '通常在急诊、ICU、手术科室等工作',
      '善于在危机中保持冷静，快速决策',
      '适应能力强，能应对多变的工作场景'
    ],
    typicalScores: {
      leadership: 4,
      teaching: 3,
      research: 3,
      innovation: 4,
      communication: 4,
      tech: 3,
      stress: 5,
      learning: 4,
      policy: 3,
      entrepreneur: 4
    },
    primaryRecommendation: {
      name: '医疗管理',
      matchScore: 93,
      strengths: [
        '抗压能力卓越，医院管理压力大，此特质至关重要',
        '领导力良好，适合向科室主任、部门主管发展',
        '沟通能力良好，跨科室协调需要良好沟通',
        '创新能力良好，能推动管理创新和流程优化'
      ],
      positions: [
        '科室副主任/主任',
        '医务处管理岗',
        '医疗质量管理岗',
        '急诊/ICU管理岗',
        '医院运营管理'
      ]
    },
    secondaryRecommendation: {
      name: '医药产业',
      matchScore: 88,
      strengths: [
        '抗压能力强，能适应医药行业高强度工作节奏',
        '领导力良好，适合团队管理岗位',
        '沟通能力良好，有利于跨部门协作',
        '创新能力良好，能推动业务创新'
      ],
      positions: [
        '医学事务经理',
        '区域销售总监',
        '市场部高级经理',
        '商务拓展总监'
      ]
    },
    thirdRecommendation: {
      name: '创业/自由职业',
      matchScore: 82,
      strengths: [
        '抗压能力强，创业需要强大的心理承受力',
        '领导力良好，能带领团队应对挑战',
        '执行力强，能在压力下保持高效'
      ],
      positions: [
        '医疗服务创业者',
        '医疗管理咨询师',
        '独立诊所运营者',
        '医疗项目管理者'
      ]
    },
    challenges: [
      '临床技能可能退化，需保持一定的临床工作',
      '管理经验不足，需通过培训和实践积累',
      '政策理解需加强，医疗管理受政策影响大',
      '创新思维需继续拓展，避免停留在传统模式'
    ],
    uniqueAdvantages: [
      '抗压能力是高端管理岗位最看重的素质之一',
      '急诊/ICU背景锻炼出的危机处理能力在管理中非常宝贵',
      '多维度能力均衡发展（领导力、沟通力、创新力），转型面广'
    ]
  },
  {
    id: 'TYPE-008',
    name: '学习型',
    englishName: 'Learning-Dominant',
    dominantAbility: 'learning',
    description: '在持续学习、知识更新、能力提升方面表现突出，具备极强的好奇心和自我驱动学习能力，通常正在或已完成额外学习，善于将新知识应用于实践。',
    coreTraits: [
      '在持续学习、知识更新、能力提升方面表现突出',
      '具备极强的好奇心和自我驱动学习能力',
      '通常正在或已完成额外学习（在职研究生、进修、考证等）',
      '善于将新知识应用于实践，适应变化能力强',
      '具有成长型思维，相信能力可以通过学习提升'
    ],
    typicalScores: {
      leadership: 3,
      teaching: 4,
      research: 4,
      innovation: 4,
      communication: 3,
      tech: 4,
      stress: 3,
      learning: 5,
      policy: 4,
      entrepreneur: 3
    },
    primaryRecommendation: {
      name: '医学研究',
      matchScore: 92,
      strengths: [
        '学习能力卓越，科研需要持续学习新方法新理论',
        '研究能力良好，具备开展研究的基础能力',
        '技术能力达标，能掌握研究工具和技术',
        '创新能力良好，能提出创新研究思路'
      ],
      positions: [
        '临床研究中心研究员',
        '医学科研院所',
        '医学院校科研岗位',
        '博士后流动站',
        '医药企业研发部门'
      ]
    },
    secondaryRecommendation: {
      name: '医学教育',
      matchScore: 87,
      strengths: [
        '学习能力强，能不断更新教育理念和方法',
        '教学能力良好，能将新知识有效传递给他人',
        '研究能力良好，能开展教育研究',
        '综合能力强，适合多方面发展的教育岗位'
      ],
      positions: [
        '医学院教师',
        '继续医学教育项目主管',
        '教学设计与开发',
        '医学培训师'
      ]
    },
    thirdRecommendation: {
      name: '数字医疗',
      matchScore: 85,
      strengths: [
        '学习能力极强，能快速掌握数字医疗新技术',
        '创新能力良好，能适应快速变化的技术环境',
        '技术能力达标，具备学习新技术的基础'
      ],
      positions: [
        '数字医疗产品设计',
        '医疗新技术应用研究',
        '数字健康产品运营'
      ]
    },
    challenges: [
      '研究产出周期长，科研工作需要耐心和持续投入',
      '学术竞争压力大，需要有差异化的研究定位',
      '收入可能下降，转型初期需要做好财务规划',
      '抗压能力需提升，科研压力和管理压力并存'
    ],
    uniqueAdvantages: [
      '学习能力是应对一切变化和挑战的元能力',
      '多维度能力均衡（教学、研究、创新、技术均良好），转型选择面广',
      '成长型思维使其在任何领域都能快速成长为专家'
    ]
  },
  {
    id: 'TYPE-009',
    name: '政策型',
    englishName: 'Policy-Dominant',
    dominantAbility: 'policy',
    description: '在医疗政策理解、公共卫生规划方面表现突出，具备宏观思维和系统分析能力，通常关注医改动态、卫生政策变化，理解医疗体系运作。',
    coreTraits: [
      '在医疗政策理解、公共卫生规划方面表现突出',
      '具备宏观思维和系统分析能力',
      '通常关注医改动态、卫生政策变化',
      '理解医疗体系运作，有全局视野',
      '适合从事需要政策敏感性的工作'
    ],
    typicalScores: {
      leadership: 4,
      teaching: 4,
      research: 5,
      innovation: 3,
      communication: 4,
      tech: 3,
      stress: 3,
      learning: 4,
      policy: 5,
      entrepreneur: 2
    },
    primaryRecommendation: {
      name: '公共卫生',
      matchScore: 95,
      strengths: [
        '政策理解卓越，公共卫生工作受政策影响大',
        '研究能力突出，能开展流行病学调查和政策研究',
        '沟通能力良好，能进行健康教育和政策解读',
        '学习能力良好，能跟上公共卫生发展变化'
      ],
      positions: [
        '疾控中心研究/管理岗',
        '卫健委政策研究岗',
        '公共卫生项目管理',
        '健康政策研究员',
        '社区卫生管理岗',
        '卫生监督机构'
      ]
    },
    secondaryRecommendation: {
      name: '医疗管理',
      matchScore: 88,
      strengths: [
        '政策理解力强，医院管理受政策影响大',
        '领导力良好，适合管理岗位',
        '研究能力突出，能开展管理相关研究',
        '沟通能力良好，有利于跨部门协调'
      ],
      positions: [
        '医务处管理岗',
        '医疗政策研究室',
        '医院发展规划部门',
        '医疗改革推进办公室'
      ]
    },
    thirdRecommendation: {
      name: '医学研究',
      matchScore: 82,
      strengths: [
        '研究能力突出，擅长卫生政策和体系研究',
        '政策理解力强，能开展政策评估研究',
        '学习能力强，能快速掌握研究方法'
      ],
      positions: [
        '卫生经济研究员',
        '医疗保险研究员',
        '卫生政策评估研究员',
        '卫生体系研究员'
      ]
    },
    challenges: [
      '岗位竞争激烈，公共卫生和政策研究岗位热度高',
      '收入可能下降，从临床转到公卫可能需要适应',
      '技术能力需提升，数据分析能力在公卫领域越来越重要',
      '创业思维较弱，不适合商业化方向'
    ],
    uniqueAdvantages: [
      '政策理解与研究能力双高，是卫生政策研究的理想人才',
      '临床背景+政策分析能力，能提供有深度的政策建议',
      '领导力和教学能力良好，在公卫管理岗位上有优势'
    ]
  },
  {
    id: 'TYPE-010',
    name: '创业型',
    englishName: 'Entrepreneur-Dominant',
    dominantAbility: 'entrepreneur',
    description: '在创业思维、商业运营、项目管理方面表现突出，具备强烈的事业心和风险承受能力，通常有创业想法或副业经验，对商业机会敏感。',
    coreTraits: [
      '在创业思维、商业运营、项目管理方面表现突出',
      '具备强烈的事业心和风险承受能力',
      '通常有创业想法或副业经验',
      '对商业机会敏感，有市场意识',
      '愿意承担风险追求高回报'
    ],
    typicalScores: {
      leadership: 5,
      teaching: 3,
      research: 3,
      innovation: 5,
      communication: 5,
      tech: 4,
      stress: 5,
      learning: 4,
      policy: 3,
      entrepreneur: 5
    },
    primaryRecommendation: {
      name: '医药产业',
      matchScore: 96,
      strengths: [
        '创业思维卓越，理解商业逻辑，有市场敏感度',
        '创新能力突出，能发现市场机会，提出创新方案',
        '领导力卓越，能带领团队实现商业目标',
        '抗压能力强，能承受创业和商业运营的压力'
      ],
      positions: [
        '医药企业创业者/合伙人',
        '商务拓展总监',
        '新业务发展经理',
        '创新项目负责人',
        '医疗投资顾问',
        '医疗项目孵化器运营'
      ]
    },
    secondaryRecommendation: {
      name: '数字医疗',
      matchScore: 92,
      strengths: [
        '创业思维强，适合数字医疗创业方向',
        '创新能力突出，能把握科技创业机会',
        '领导力和沟通力强，能带领创业团队',
        '抗压能力强，能承受创业不确定性'
      ],
      positions: [
        '数字医疗创业者',
        '医疗科技公司联合创始人',
        '健康科技产品总监',
        '医疗创新业务负责人'
      ]
    },
    thirdRecommendation: {
      name: '自由职业/独立执业',
      matchScore: 88,
      strengths: [
        '自主性强，适合独立开展工作',
        '抗风险能力高，能应对自由职业的不确定性',
        '商业运营能力好，能管理好个人品牌和业务'
      ],
      positions: [
        '独立诊所/门诊',
        '医疗咨询服务',
        '医疗培训讲师',
        '医疗自媒体',
        '医疗项目顾问'
      ]
    },
    challenges: [
      '创业失败风险高，需要有风险承受能力和备用方案',
      '资金压力大，创业初期可能面临现金流问题',
      '政策风险，医疗行业创业政策敏感度高',
      '家庭压力，创业需要家庭的理解和支持'
    ],
    uniqueAdvantages: [
      '领导力、创新力、沟通力、抗压力、创业思维五项全高，是顶尖创业者潜质',
      '临床背景+商业头脑，在医疗创业领域有独特优势',
      '综合能力突出，能独立应对创业中的各种挑战'
    ]
  }
];

// 能力项到报告类型的映射
const abilityToReportMap = {
  leadership: 'TYPE-001',
  teaching: 'TYPE-002',
  research: 'TYPE-003',
  innovation: 'TYPE-004',
  communication: 'TYPE-005',
  tech: 'TYPE-006',
  stress: 'TYPE-007',
  learning: 'TYPE-008',
  policy: 'TYPE-009',
  entrepreneur: 'TYPE-010'
};

// 能力项中文名映射
const abilityNameMap = {
  leadership: '领导力',
  teaching: '教学能力',
  research: '研究能力',
  innovation: '创新能力',
  communication: '沟通能力',
  tech: '技术能力',
  stress: '抗压能力',
  learning: '学习能力',
  policy: '政策理解',
  entrepreneur: '创业思维'
};

// 转型方向名称映射
const directionNameMap = {
  management: '医疗管理',
  education: '医学教育',
  research: '医学研究',
  industry: '医药产业',
  publicHealth: '公共卫生',
  digitalHealth: '数字医疗'
};
