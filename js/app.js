// 医护职业转型测试系统 - 主应用逻辑

document.addEventListener('DOMContentLoaded', function() {
    // 应用状态管理
    const appState = {
        currentSection: 'welcome',
        userInfo: {
            currentRole: '',
            experience: '',
            education: '',
            specialty: '',
            transitionGoals: []
        },
        assessment: {
            currentQuestion: 0,
            answers: [],
            scores: {
                management: 0,
                education: 0,
                research: 0,
                industry: 0,
                publicHealth: 0,
                digitalHealth: 0
            },
            abilityScores: {}
        },
        results: {
            matchScore: 0,
            recommendations: [],
            actionPlan: []
        }
    };

    // 能力评估问题库
    const assessmentQuestions = [
        {
            id: 1,
            category: 'leadership',
            text: '您是否享受带领团队、制定工作计划和分配任务的过程？',
            options: [
                { value: 5, label: '非常享受，这是我的强项' },
                { value: 4, label: '比较享受，有一定经验' },
                { value: 3, label: '一般，可以接受' },
                { value: 2, label: '不太喜欢，更愿意专注技术' },
                { value: 1, label: '完全不喜欢，避免管理职责' }
            ]
        },
        {
            id: 2,
            category: 'teaching',
            text: '您是否愿意将自己的专业知识传授给他人，包括培训新同事或学生？',
            options: [
                { value: 5, label: '非常愿意，乐于分享知识' },
                { value: 4, label: '比较愿意，有一定教学经验' },
                { value: 3, label: '一般，偶尔可以' },
                { value: 2, label: '不太愿意，更专注临床' },
                { value: 1, label: '完全不愿意，不擅长教学' }
            ]
        },
        {
            id: 3,
            category: 'research',
            text: '您对参与医学研究、数据分析或撰写学术论文的兴趣如何？',
            options: [
                { value: 5, label: '非常有兴趣，已有研究经验' },
                { value: 4, label: '比较有兴趣，愿意尝试' },
                { value: 3, label: '一般，可以参与' },
                { value: 2, label: '不太有兴趣，更关注临床' },
                { value: 1, label: '完全没兴趣，避免研究工作' }
            ]
        },
        {
            id: 4,
            category: 'innovation',
            text: '您对医疗技术创新、新产品开发或医疗创业的兴趣如何？',
            options: [
                { value: 5, label: '非常有兴趣，关注行业创新' },
                { value: 4, label: '比较有兴趣，愿意了解' },
                { value: 3, label: '一般，保持关注' },
                { value: 2, label: '不太有兴趣，更关注传统医疗' },
                { value: 1, label: '完全没兴趣，不关注产业' }
            ]
        },
        {
            id: 5,
            category: 'communication',
            text: '您在与患者、家属或跨部门同事沟通方面的自信程度如何？',
            options: [
                { value: 5, label: '非常自信，擅长沟通协调' },
                { value: 4, label: '比较自信，沟通顺畅' },
                { value: 3, label: '一般，基本沟通没问题' },
                { value: 2, label: '不太自信，需要改进' },
                { value: 1, label: '很不自信，沟通是短板' }
            ]
        },
        {
            id: 6,
            category: 'tech',
            text: '您对医疗信息化、数字医疗工具或人工智能在医疗中的应用兴趣如何？',
            options: [
                { value: 5, label: '非常有兴趣，积极学习新技术' },
                { value: 4, label: '比较有兴趣，愿意尝试' },
                { value: 3, label: '一般，保持基本了解' },
                { value: 2, label: '不太有兴趣，更习惯传统方式' },
                { value: 1, label: '完全没兴趣，避免技术工具' }
            ]
        },
        {
            id: 7,
            category: 'stress',
            text: '您在高压力、快节奏工作环境下的适应能力如何？',
            options: [
                { value: 5, label: '非常适应，抗压能力强' },
                { value: 4, label: '比较适应，能有效应对' },
                { value: 3, label: '一般，需要时间调整' },
                { value: 2, label: '不太适应，容易感到压力' },
                { value: 1, label: '很不适应，避免高压环境' }
            ]
        },
        {
            id: 8,
            category: 'learning',
            text: '您持续学习新知识、参加培训或获取新资质的意愿如何？',
            options: [
                { value: 5, label: '非常积极，持续学习提升' },
                { value: 4, label: '比较积极，有计划学习' },
                { value: 3, label: '一般，按需学习' },
                { value: 2, label: '不太积极，满足现状' },
                { value: 1, label: '很不积极，避免额外学习' }
            ]
        },
        {
            id: 9,
            category: 'policy',
            text: '您对医疗政策、公共卫生规划或医疗体系建设的兴趣如何？',
            options: [
                { value: 5, label: '非常有兴趣，关注政策动向' },
                { value: 4, label: '比较有兴趣，愿意了解' },
                { value: 3, label: '一般，保持基本了解' },
                { value: 2, label: '不太有兴趣，更关注临床' },
                { value: 1, label: '完全没兴趣，不关注政策' }
            ]
        },
        {
            id: 10,
            category: 'entrepreneur',
            text: '您对创业、商业运营或医疗项目管理的兴趣如何？',
            options: [
                { value: 5, label: '非常有兴趣，有创业想法' },
                { value: 4, label: '比较有兴趣，愿意尝试' },
                { value: 3, label: '一般，可以参与' },
                { value: 2, label: '不太有兴趣，更关注专业' },
                { value: 1, label: '完全没兴趣，避免商业活动' }
            ]
        }
    ];

    // 转型方向定义
    const transitionPaths = {
        management: {
            name: '医疗管理',
            description: '医院管理、科室主任、医疗质量管控等',
            requiredSkills: ['leadership', 'communication', 'stress'],
            weight: 1.2
        },
        education: {
            name: '医学教育',
            description: '医学院教师、临床培训师、医学教育管理',
            requiredSkills: ['teaching', 'communication', 'learning'],
            weight: 1.1
        },
        research: {
            name: '医学研究',
            description: '临床研究、基础医学研究、科研项目管理',
            requiredSkills: ['research', 'learning', 'tech'],
            weight: 1.0
        },
        industry: {
            name: '医药产业',
            description: '药企医学顾问、医疗器械、医疗市场营销',
            requiredSkills: ['communication', 'innovation', 'entrepreneur'],
            weight: 1.3
        },
        publicHealth: {
            name: '公共卫生',
            description: '疾控中心、卫生政策、公共卫生项目管理',
            requiredSkills: ['policy', 'communication', 'research'],
            weight: 1.0
        },
        digitalHealth: {
            name: '数字医疗',
            description: '医疗信息化、健康科技、远程医疗',
            requiredSkills: ['tech', 'innovation', 'learning'],
            weight: 1.4
        }
    };

    // 初始化DOM元素引用
    const sections = {
        welcome: document.getElementById('welcome-section'),
        info: document.getElementById('info-section'),
        assessment: document.getElementById('assessment-section'),
        result: document.getElementById('result-section')
    };

    const buttons = {
        startTest: document.getElementById('start-test'),
        backToWelcome: document.getElementById('back-to-welcome'),
        userInfoForm: document.getElementById('user-info-form'),
        prevQuestion: document.getElementById('prev-question'),
        nextQuestion: document.getElementById('next-question'),
        submitAssessment: document.getElementById('submit-assessment'),
        restartTest: document.getElementById('restart-test'),
        downloadReport: document.getElementById('download-report'),
        viewPersonalReport: document.getElementById('view-personal-report')
    };

    const progressElements = {
        bar: document.getElementById('progress-bar'),
        text: document.getElementById('progress-text')
    };

    const resultElements = {
        matchScore: document.getElementById('match-score'),
        recommendationList: document.getElementById('recommendation-list'),
        actionPlanContent: document.getElementById('action-plan-content')
    };

    // 页面切换函数
    function showSection(sectionId) {
        // 隐藏所有部分
        Object.values(sections).forEach(section => {
            section.classList.remove('active');
        });
        
        // 显示目标部分
        if (sections[sectionId]) {
            sections[sectionId].classList.add('active');
            appState.currentSection = sectionId;
            
            // 滚动到顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // 更新进度条
    function updateProgress() {
        const progress = ((appState.assessment.currentQuestion + 1) / assessmentQuestions.length) * 100;
        progressElements.bar.style.width = `${progress}%`;
        progressElements.text.textContent = `${appState.assessment.currentQuestion + 1}/${assessmentQuestions.length}`;
    }

    // 显示当前问题
    function showCurrentQuestion() {
        const questionContainer = document.getElementById('question-container');
        const currentQuestion = assessmentQuestions[appState.assessment.currentQuestion];
        
        if (!currentQuestion) return;
        
        // 构建问题HTML
        let optionsHtml = '';
        currentQuestion.options.forEach((option, index) => {
            const isSelected = appState.assessment.answers[appState.assessment.currentQuestion] === option.value;
            optionsHtml += `
                <div class="option ${isSelected ? 'selected' : ''}" data-value="${option.value}">
                    <input type="radio" 
                           name="question-${currentQuestion.id}" 
                           value="${option.value}" 
                           id="option-${index}"
                           ${isSelected ? 'checked' : ''}>
                    <label class="option-label" for="option-${index}">${option.label}</label>
                </div>
            `;
        });
        
        questionContainer.innerHTML = `
            <div class="question-card">
                <div class="question-text">${currentQuestion.text}</div>
                <div class="options">${optionsHtml}</div>
            </div>
        `;
        
        // 添加选项点击事件
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function() {
                const value = parseInt(this.getAttribute('data-value'));
                appState.assessment.answers[appState.assessment.currentQuestion] = value;
                
                // 更新UI
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                this.querySelector('input').checked = true;
                
                // 启用下一题按钮
                buttons.nextQuestion.disabled = false;
            });
        });
        
        // 更新按钮状态
        buttons.prevQuestion.disabled = appState.assessment.currentQuestion === 0;
        buttons.nextQuestion.disabled = !appState.assessment.answers[appState.assessment.currentQuestion];
        buttons.submitAssessment.style.display = 
            (appState.assessment.currentQuestion === assessmentQuestions.length - 1) ? 'inline-flex' : 'none';
        
        updateProgress();
    }

    // 计算评估结果
    function calculateResults() {
        // 重置分数
        Object.keys(appState.assessment.scores).forEach(key => {
            appState.assessment.scores[key] = 0;
        });
        
        // 计算10项能力的单项得分
        const abilityCategories = ['leadership', 'teaching', 'research', 'innovation', 'communication', 'tech', 'stress', 'learning', 'policy', 'entrepreneur'];
        appState.assessment.abilityScores = {};
        
        assessmentQuestions.forEach((question, index) => {
            const answer = appState.assessment.answers[index];
            if (!answer) return;
            
            // 保存单项能力得分
            appState.assessment.abilityScores[question.category] = answer;
            
            // 根据问题类别和答案计算转型方向分数
            switch (question.category) {
                case 'leadership':
                    appState.assessment.scores.management += answer * 1.5;
                    appState.assessment.scores.industry += answer * 0.5;
                    break;
                case 'teaching':
                    appState.assessment.scores.education += answer * 1.5;
                    appState.assessment.scores.publicHealth += answer * 0.5;
                    break;
                case 'research':
                    appState.assessment.scores.research += answer * 1.5;
                    appState.assessment.scores.publicHealth += answer * 0.5;
                    break;
                case 'innovation':
                    appState.assessment.scores.industry += answer * 1.2;
                    appState.assessment.scores.digitalHealth += answer * 1.2;
                    break;
                case 'communication':
                    Object.keys(appState.assessment.scores).forEach(key => {
                        appState.assessment.scores[key] += answer * 0.8;
                    });
                    break;
                case 'tech':
                    appState.assessment.scores.digitalHealth += answer * 1.5;
                    appState.assessment.scores.research += answer * 0.5;
                    break;
                case 'stress':
                    appState.assessment.scores.management += answer * 1.2;
                    appState.assessment.scores.industry += answer * 0.8;
                    break;
                case 'learning':
                    Object.keys(appState.assessment.scores).forEach(key => {
                        appState.assessment.scores[key] += answer * 0.7;
                    });
                    break;
                case 'policy':
                    appState.assessment.scores.publicHealth += answer * 1.5;
                    appState.assessment.scores.management += answer * 0.5;
                    break;
                case 'entrepreneur':
                    appState.assessment.scores.industry += answer * 1.5;
                    appState.assessment.scores.digitalHealth += answer * 0.5;
                    break;
            }
        });
        
        // 确保所有能力项都有值（即使某道题没回答）
        abilityCategories.forEach(cat => {
            if (appState.assessment.abilityScores[cat] === undefined) {
                appState.assessment.abilityScores[cat] = 0;
            }
        });
        
        // 考虑用户选择的转型意向
        appState.userInfo.transitionGoals.forEach(goal => {
            if (appState.assessment.scores[goal]) {
                appState.assessment.scores[goal] *= 1.3; // 加权
            }
        });
        
        // 计算匹配度并生成推荐
        generateRecommendations();
    }

    // 生成推荐结果
    function generateRecommendations() {
        const scores = appState.assessment.scores;
        const maxScore = Math.max(...Object.values(scores));
        const minScore = Math.min(...Object.values(scores));
        
        // 计算总体匹配度（归一化到0-100）
        appState.results.matchScore = Math.round((maxScore / (assessmentQuestions.length * 5 * 1.5)) * 100);
        
        // 生成推荐列表（按分数排序）
        appState.results.recommendations = Object.entries(scores)
            .map(([key, score]) => ({
                path: key,
                name: transitionPaths[key].name,
                description: transitionPaths[key].description,
                score: score,
                matchPercentage: Math.round((score - minScore) / (maxScore - minScore) * 100)
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3); // 取前三名
        
        // 生成行动计划
        generateActionPlan();
        
        // --- 保存数据到 localStorage，供个性化报告页面读取 ---
        const testResults = {
            scores: {
                abilityScores: appState.assessment.abilityScores,
                directionScores: appState.assessment.scores
            },
            userInfo: appState.userInfo,
            reportMatch: {
                matchScore: appState.results.matchScore,
                topRecommendation: appState.results.recommendations[0] || null
            }
        };
        
        try {
            localStorage.setItem('careerTestResults', JSON.stringify(testResults));
            console.log('测试结果已保存到 localStorage');
        } catch (err) {
            console.error('保存测试结果到 localStorage 失败:', err);
        }
    }

    // 生成行动计划
    function generateActionPlan() {
        const topRecommendation = appState.results.recommendations[0];
        if (!topRecommendation) return;
        
        const path = transitionPaths[topRecommendation.path];
        
        appState.results.actionPlan = [
            {
                title: '技能提升',
                description: `针对${path.name}方向，建议重点提升${path.requiredSkills.map(skill => {
                    switch(skill) {
                        case 'leadership': return '领导力';
                        case 'teaching': return '教学能力';
                        case 'research': return '研究能力';
                        case 'innovation': return '创新能力';
                        case 'communication': return '沟通能力';
                        case 'tech': return '技术能力';
                        case 'stress': return '抗压能力';
                        case 'learning': return '学习能力';
                        case 'policy': return '政策理解';
                        case 'entrepreneur': return '创业思维';
                        default: return skill;
                    }
                }).join('、')}等核心能力。`
            },
            {
                title: '学习资源',
                description: '推荐参加相关培训课程、行业会议，阅读专业书籍和期刊，建立专业知识体系。'
            },
            {
                title: '实践机会',
                description: '寻找相关项目参与机会，积累实践经验，建立行业人脉网络。'
            },
            {
                title: '职业规划',
                description: '制定3-5年职业发展计划，设定阶段性目标，定期评估进展。'
            }
        ];
    }

    // 显示结果
    function showResults() {
        // 更新匹配度
        resultElements.matchScore.textContent = `${appState.results.matchScore}%`;
        
        // 更新推荐列表
        let recommendationsHtml = '';
        appState.results.recommendations.forEach((rec, index) => {
            recommendationsHtml += `
                <div class="recommendation-item">
                    <h4>${index + 1}. ${rec.name} (匹配度: ${rec.matchPercentage}%)</h4>
                    <p>${rec.description}</p>
                </div>
            `;
        });
        resultElements.recommendationList.innerHTML = recommendationsHtml;
        
        // 更新行动计划
        let actionPlanHtml = '';
        appState.results.actionPlan.forEach((item, index) => {
            actionPlanHtml += `
                <div class="action-item">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>
                </div>
            `;
        });
        resultElements.actionPlanContent.innerHTML = actionPlanHtml;
        
        // 更新分数圆环
        const scoreCircle = document.querySelector('.score-circle');
        scoreCircle.style.background = `conic-gradient(#00d97e ${appState.results.matchScore}%, #e3ebf6 ${appState.results.matchScore}%)`;
    }

    // 事件监听器
    function setupEventListeners() {
        // 开始测试按钮
        if (buttons.startTest) {
            buttons.startTest.addEventListener('click', () => {
                console.log('开始测试按钮被点击');
                showSection('info');
            });
        } else {
            console.error('找不到开始测试按钮');
        }
        
        // 返回欢迎页面
        if (buttons.backToWelcome) {
            buttons.backToWelcome.addEventListener('click', () => {
                showSection('welcome');
            });
        }
        
        // 个人信息表单提交
        if (buttons.userInfoForm) {
            buttons.userInfoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // 收集表单数据
                appState.userInfo.currentRole = document.getElementById('current-role').value;
                appState.userInfo.experience = document.getElementById('experience').value;
                appState.userInfo.education = document.getElementById('education').value;
                appState.userInfo.specialty = document.getElementById('specialty').value;
                
                // 收集转型意向
                appState.userInfo.transitionGoals = [];
                document.querySelectorAll('input[name="transition-goals"]:checked').forEach(checkbox => {
                    appState.userInfo.transitionGoals.push(checkbox.value);
                });
                
                // 跳转到评估页面
                showSection('assessment');
                showCurrentQuestion();
            });
        }
        
        // 上一题按钮
        if (buttons.prevQuestion) {
            buttons.prevQuestion.addEventListener('click', () => {
                if (appState.assessment.currentQuestion > 0) {
                    appState.assessment.currentQuestion--;
                    showCurrentQuestion();
                }
            });
        }
        
        // 下一题按钮
        if (buttons.nextQuestion) {
            buttons.nextQuestion.addEventListener('click', () => {
                if (appState.assessment.currentQuestion < assessmentQuestions.length - 1) {
                    appState.assessment.currentQuestion++;
                    showCurrentQuestion();
                }
            });
        }
        
        // 提交评估按钮
        if (buttons.submitAssessment) {
            buttons.submitAssessment.addEventListener('click', () => {
                // 计算结果
                calculateResults();
                
                // 显示结果页面
                showSection('result');
                showResults();
            });
        }
        
        // 重新测试按钮
        if (buttons.restartTest) {
            buttons.restartTest.addEventListener('click', () => {
                // 重置状态
                appState.currentSection = 'welcome';
                appState.userInfo = {
                    currentRole: '',
                    experience: '',
                    education: '',
                    specialty: '',
                    transitionGoals: []
                };
                appState.assessment = {
                    currentQuestion: 0,
                    answers: [],
                    scores: {
                        management: 0,
                        education: 0,
                        research: 0,
                        industry: 0,
                        publicHealth: 0,
                        digitalHealth: 0
                    }
                };
                appState.results = {
                    matchScore: 0,
                    recommendations: [],
                    actionPlan: []
                };
                
                // 重置表单
                if (buttons.userInfoForm) {
                    buttons.userInfoForm.reset();
                }
                
                // 返回欢迎页面
                showSection('welcome');
            });
        }
        
        // 查看个性化报告按钮
        if (buttons.viewPersonalReport) {
            buttons.viewPersonalReport.addEventListener('click', () => {
                window.location.href = 'personalized-report.html';
            });
        }
        
        // 下载报告按钮
        if (buttons.downloadReport) {
            buttons.downloadReport.addEventListener('click', () => {
                alert('报告下载功能正在开发中...\n\n您的评估结果已保存，稍后可通过邮件接收详细报告。');
            });
        }
    }

    // 初始化应用
    function init() {
        console.log('医护职业转型测试系统初始化...');
        
        // 检查所有必要的DOM元素
        const requiredElements = [
            'welcome-section', 'info-section', 'assessment-section', 'result-section',
            'start-test', 'back-to-welcome', 'user-info-form',
            'prev-question', 'next-question', 'submit-assessment',
            'restart-test', 'download-report'
        ];
        
        let allElementsFound = true;
        requiredElements.forEach(id => {
            const element = document.getElementById(id);
            if (!element) {
                console.error(`找不到元素: #${id}`);
                allElementsFound = false;
            }
        });
        
        if (!allElementsFound) {
            console.error('部分DOM元素未找到，应用可能无法正常工作');
        }
        
        setupEventListeners();
        showSection('welcome');
        
        console.log('医护职业转型测试系统已启动');
        console.log('当前时间:', new Date().toLocaleString('zh-CN'));
    }

    // 启动应用
    init();
});