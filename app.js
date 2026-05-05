
        // 应用状态
        let currentSection = 'welcome';
        let currentQuestion = 0;
        const totalQuestions = 11; // 第0题:转型意向 + 第1-10题:能力评估
        let answers = [];
        let careerPreference = {
            otherCareer: null,          // 问题5: 转型意愿
            transitionReasons: [],      // 问题6: 转型起因（多选）
            category: null,              // 综合分类: away/uncertain/medical-no-clinical/medical-clinical
            transitionGoals: []          // 转型意向（能力评估第0题收集）
        };
        
        // 完整的评估问题（第0题是转型意向，第1-10题是能力评估）
        const questions = [
            {
                text: '请选择您感兴趣的转型方向（可多选）',
                type: 'multi-select',
                options: [
                    { value: 'management', label: '医疗管理' },
                    { value: 'education', label: '医学教育' },
                    { value: 'research', label: '医学研究' },
                    { value: 'industry', label: '医药产业' },
                    { value: 'public-health', label: '公共卫生' },
                    { value: 'digital-health', label: '数字医疗' }
                ]
            },
            {
                text: '您是否享受带领团队、制定工作计划和分配任务的过程？',
                options: [
                    '非常享受，这是我的强项',
                    '比较享受，有一定经验',
                    '一般，可以接受',
                    '不太喜欢，更愿意专注技术',
                    '完全不喜欢，避免管理职责'
                ]
            },
            {
                text: '您是否愿意将自己的专业知识传授给他人，包括培训新同事或学生？',
                options: [
                    '非常愿意，乐于分享知识',
                    '比较愿意，有一定教学经验',
                    '一般，偶尔可以',
                    '不太愿意，更专注临床',
                    '完全不愿意，不擅长教学'
                ]
            },
            {
                text: '您对参与医学研究、数据分析或撰写学术论文的兴趣如何？',
                options: [
                    '非常有兴趣，已有研究经验',
                    '比较有兴趣，愿意尝试',
                    '一般，可以参与',
                    '不太有兴趣，更关注临床',
                    '完全没兴趣，避免研究工作'
                ]
            },
            {
                text: '您对医疗技术创新、新产品开发或医疗创业的兴趣如何？',
                options: [
                    '非常有兴趣，关注行业创新',
                    '比较有兴趣，愿意了解',
                    '一般，保持关注',
                    '不太有兴趣，更关注传统医疗',
                    '完全没兴趣，不关注产业'
                ]
            },
            {
                text: '您在与患者、家属或跨部门同事沟通方面的自信程度如何？',
                options: [
                    '非常自信，擅长沟通协调',
                    '比较自信，沟通顺畅',
                    '一般，基本沟通没问题',
                    '不太自信，需要改进',
                    '很不自信，沟通是短板'
                ]
            },
            {
                text: '您对医疗信息化、数字医疗工具或人工智能在医疗中的应用兴趣如何？',
                options: [
                    '非常有兴趣，积极学习新技术',
                    '比较有兴趣，愿意尝试',
                    '一般，保持基本了解',
                    '不太有兴趣，更习惯传统方式',
                    '完全没兴趣，避免技术工具'
                ]
            },
            {
                text: '您在高压力、快节奏工作环境下的适应能力如何？',
                options: [
                    '非常适应，抗压能力强',
                    '比较适应，能有效应对',
                    '一般，需要时间调整',
                    '不太适应，容易感到压力',
                    '很不适应，避免高压环境'
                ]
            },
            {
                text: '您持续学习新知识、参加培训或获取新资质的意愿如何？',
                options: [
                    '非常积极，持续学习提升',
                    '比较积极，有计划学习',
                    '一般，按需学习',
                    '不太积极，满足现状',
                    '很不积极，避免额外学习'
                ]
            },
            {
                text: '您对医疗政策、公共卫生规划或医疗体系建设的兴趣如何？',
                options: [
                    '非常有兴趣，关注政策动向',
                    '比较有兴趣，愿意了解',
                    '一般，保持基本了解',
                    '不太有兴趣，更关注临床',
                    '完全没兴趣，不关注政策'
                ]
            },
            {
                text: '您对创业、商业运营或医疗项目管理的兴趣如何？',
                options: [
                    '非常有兴趣，有创业想法',
                    '比较有兴趣，愿意尝试',
                    '一般，可以参与',
                    '不太有兴趣，更关注专业',
                    '完全没兴趣，避免商业活动'
                ]
            }
        ];
        
        // 更新调试信息
        function updateDebugInfo() {
            document.getElementById('debug-current').textContent = currentQuestion + 1;
            let answered;
            if (currentQuestion === 0) {
                answered = careerPreference.transitionGoals && careerPreference.transitionGoals.length > 0;
            } else {
                answered = answers[currentQuestion] !== undefined;
            }
            document.getElementById('debug-answered').textContent = answered ? '是' : '否';
            
            const nextBtn = document.getElementById('next-question');
            if (nextBtn) {
                document.getElementById('debug-next-btn').textContent = 
                    nextBtn.disabled ? '禁用' : '可用';
            }
        }
        
        // 页面切换函数
        function showSection(sectionId) {
            console.log(`切换到页面: ${sectionId}`);
            
            // 隐藏所有部分
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // 显示目标部分
            const targetSection = document.getElementById(sectionId + '-section');
            if (targetSection) {
                targetSection.classList.add('active');
                currentSection = sectionId;
                
                // 如果是评估页面，显示第一个问题
                if (sectionId === 'assessment') {
                    showQuestion(0);
                }
                
                // 滚动到顶部
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            updateDebugInfo();
        }
        
        // 控制"其他"原因输入框显示
        function toggleOtherReason(checkbox) {
            const input = document.getElementById('other-reason-input');
            if (input) {
                input.style.display = checkbox.checked ? 'block' : 'none';
                if (!checkbox.checked) {
                    document.getElementById('other-reason-text').value = '';
                }
            }
        }
        
        // 根据问题5和问题6判断职业方向分类
        // 返回: 'away' 远离医疗远离临床 | 'uncertain' 不确定 | 'medical-no-clinical' 留在医疗但远离临床 | 'medical-clinical' 留在医疗留在临床
        function determineCareerCategory(otherCareer, transitionReasons) {
            // 问题5直接决定主分类
            if (otherCareer === 'away') {
                return 'away';
            }
            
            if (otherCareer === 'yes-definite') {
                return 'medical-clinical';
            }
            
            if (otherCareer === 'yes-tired') {
                return 'medical-no-clinical';
            }
            
            // uncertain 或 explore：根据Q6选项数量进一步判断
            const reasonCount = transitionReasons.length;
            if (otherCareer === 'uncertain' || otherCareer === 'explore') {
                if (reasonCount >= 4) {
                    // 选择了4个及以上原因，说明转型意愿较强
                    return 'medical-no-clinical';
                }
                return 'uncertain';
            }
            
            return 'uncertain';
        }
        
        // 提交个人信息
        function submitUserInfo() {
            console.log('提交个人信息表单');
            
            // 验证基本字段
            const currentRole = document.getElementById('current-role').value;
            const experience = document.getElementById('experience').value;
            const education = document.getElementById('education').value;
            const specialty = document.getElementById('specialty').value;
            
            if (!currentRole || !experience || !education || !specialty) {
                alert('请填写所有必填字段');
                return false;
            }
            
            // 获取问题5的答案
            const otherCareerRadios = document.getElementsByName('other-career');
            let otherCareerValue = null;
            for (let radio of otherCareerRadios) {
                if (radio.checked) {
                    otherCareerValue = radio.value;
                    break;
                }
            }
            
            if (!otherCareerValue) {
                alert('请回答问题五');
                return false;
            }
            
            // 获取问题6的答案（多选）
            const transitionReasons = [];
            document.querySelectorAll('input[name="transition-reasons"]:checked').forEach(checkbox => {
                if (checkbox.value === 'other') {
                    const otherText = document.getElementById('other-reason-text').value.trim();
                    if (otherText) {
                        transitionReasons.push('other:' + otherText);
                    } else {
                        transitionReasons.push('other');
                    }
                } else {
                    transitionReasons.push(checkbox.value);
                }
            });
            
            // 保存偏好
            careerPreference.otherCareer = otherCareerValue;
            careerPreference.transitionReasons = transitionReasons;
            
            // 根据问题5+6判断职业方向分类
            const category = determineCareerCategory(otherCareerValue, transitionReasons);
            careerPreference.category = category;
            console.log('职业偏好:', careerPreference);
            console.log('职业方向分类:', category);
            
            // 远离医疗远离临床 → 提示开发中
            if (category === 'away') {
                alert('感谢您的回答！\n\n根据您的职业发展意愿，该分支的测试题目正在开发中，敬请期待！');
                return false;
            }
            
            // 继续原有流程（转型意向将在能力评估第一题中收集）
            adjustQuestionsForPreference();
            showSection('assessment');
            return false;
        }
        
        // 根据职业偏好调整问题显示
        function adjustQuestionsForPreference() {
            // 更新评估说明
            const subtitle = document.getElementById('assessment-subtitle');
            if (subtitle) {
                const category = careerPreference.category;
                const hintMap = {
                    'medical-clinical': '根据您的临床转型意愿，请评估各项能力水平，我们将为您推荐最适合的临床相关转型方向',
                    'medical-no-clinical': '根据您希望远离临床的意愿，请评估各项能力水平，我们将为您推荐非临床方向的转型路径',
                    'uncertain': '请评估您的各项能力，我们将帮助您探索适合自己的发展方向',
                    'away': '请评估您的各项能力水平'
                };
                subtitle.textContent = hintMap[category] || '请评估您在以下各方面的能力水平';
            }
            
            console.log('职业方向分类:', careerPreference.category, '— 调整评估提示');
        }
        
        // 显示问题
        function showQuestion(questionIndex) {
            console.log(`显示问题 ${questionIndex + 1}`);
            currentQuestion = questionIndex;
            const questionContainer = document.getElementById('question-container');
            
            if (questionIndex < questions.length) {
                const question = questions[questionIndex];
                let optionsHtml = '';
                
                // 第0题是转型意向（多选checkbox）
                if (question.type === 'multi-select') {
                    const savedGoals = careerPreference.transitionGoals || [];
                    question.options.forEach((option) => {
                        const isChecked = savedGoals.includes(option.value);
                        optionsHtml += `
                            <div class="option ${isChecked ? 'selected' : ''}" onclick="toggleTransitionGoal(this, '${option.value}')">
                                <input type="checkbox" ${isChecked ? 'checked' : ''}>
                                <label class="option-label">${option.label}</label>
                            </div>
                        `;
                    });
                    
                    questionContainer.innerHTML = `
                        <div class="question-card">
                            <div class="question-text">${question.text}</div>
                            <div class="options">${optionsHtml}</div>
                        </div>
                    `;
                } else {
                    // 能力评估题（单选radio）
                    question.options.forEach((option, index) => {
                        const isSelected = answers[questionIndex] === index;
                        optionsHtml += `
                            <div class="option ${isSelected ? 'selected' : ''}" onclick="selectAnswer(${questionIndex}, ${index})">
                                <input type="radio" name="question-${questionIndex}" ${isSelected ? 'checked' : ''}>
                                <label class="option-label">${option}</label>
                            </div>
                        `;
                    });
                    
                    questionContainer.innerHTML = `
                        <div class="question-card">
                            <div class="question-text">${question.text}</div>
                            <div class="options">${optionsHtml}</div>
                        </div>
                    `;
                }
                
                // 更新进度
                updateProgress();
                // 更新按钮状态
                updateButtons();
            }
            
            updateDebugInfo();
        }
        
        // 转型意向多选切换
        function toggleTransitionGoal(element, value) {
            element.classList.toggle('selected');
            const checkbox = element.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            
            // 更新careerPreference
            const idx = careerPreference.transitionGoals.indexOf(value);
            if (idx >= 0) {
                careerPreference.transitionGoals.splice(idx, 1);
            } else {
                careerPreference.transitionGoals.push(value);
            }
            console.log('转型意向已更新:', careerPreference.transitionGoals);
            
            // 多选题至少选1个才能下一步
            updateButtons();
        }
        
        // 选择答案 - 修复版本
        function selectAnswer(questionIndex, answerIndex) {
            console.log(`选择答案: 问题${questionIndex + 1} -> 选项${answerIndex + 1}`);
            
            // 保存答案
            answers[questionIndex] = answerIndex;
            
            // 重新渲染当前问题以更新选中状态
            showQuestion(questionIndex);
            
            // 关键修复：强制启用下一题按钮
            const nextBtn = document.getElementById('next-question');
            if (nextBtn) {
                nextBtn.disabled = false;
                console.log('✅ 下一题按钮已启用');
            }
            
            updateDebugInfo();
        }
        
        // 更新进度
        function updateProgress() {
            const progress = ((currentQuestion + 1) / totalQuestions) * 100;
            const progressBar = document.getElementById('progress-bar');
            const progressText = document.getElementById('progress-text');
            
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (progressText) progressText.textContent = `${currentQuestion + 1}/${totalQuestions}`;
        }
        
        // 更新按钮状态 - 修复版本
        function updateButtons() {
            const prevBtn = document.getElementById('prev-question');
            const nextBtn = document.getElementById('next-question');
            const submitBtn = document.getElementById('submit-assessment');
            
            if (prevBtn) {
                prevBtn.disabled = currentQuestion === 0;
            }
            
            // 第0题（转型意向多选）：至少选1个才能下一步
            // 第1-10题（能力评估单选）：需要有答案
            if (nextBtn) {
                let hasAnswer;
                if (currentQuestion === 0) {
                    hasAnswer = careerPreference.transitionGoals && careerPreference.transitionGoals.length > 0;
                } else {
                    hasAnswer = answers[currentQuestion] !== undefined;
                }
                nextBtn.disabled = !hasAnswer;
                console.log(`下一题按钮: question=${currentQuestion}, hasAnswer=${hasAnswer}, disabled=${!hasAnswer}`);
            }
            
            // 如果是最后一题，显示提交按钮
            if (submitBtn) {
                const isLastQuestion = currentQuestion === totalQuestions - 1;
                submitBtn.style.display = isLastQuestion ? 'inline-flex' : 'none';
                if (nextBtn) {
                    nextBtn.style.display = isLastQuestion ? 'none' : 'inline-flex';
                }
            }
            
            updateDebugInfo();
        }
        
        // 上一题
        function prevQuestion() {
            console.log('点击上一题');
            if (currentQuestion > 0) {
                showQuestion(currentQuestion - 1);
            }
        }
        
        // 下一题 - 修复版本
        function nextQuestion() {
            console.log('点击下一题');
            
            // 第0题（转型意向多选）检查
            if (currentQuestion === 0) {
                if (!careerPreference.transitionGoals || careerPreference.transitionGoals.length === 0) {
                    alert('请至少选择一个转型方向');
                    return;
                }
                console.log('✅ 转型意向已选择:', careerPreference.transitionGoals);
            } else {
                // 能力评估题检查
                if (answers[currentQuestion] === undefined) {
                    console.log('❌ 错误：当前问题未回答');
                    alert('请先选择当前问题的答案');
                    return;
                }
            }
            
            console.log('✅ 当前问题已回答，可以切换到下一题');
            
            if (currentQuestion < totalQuestions - 1) {
                showQuestion(currentQuestion + 1);
            } else {
                // 如果是最后一题，提交评估
                submitAssessment();
            }
        }
        
        // 提交评估
        function submitAssessment() {
            console.log('提交评估');
            
            // 检查是否所有问题都已回答
            let allAnswered = true;
            // 第0题是转型意向多选
            if (!careerPreference.transitionGoals || careerPreference.transitionGoals.length === 0) {
                allAnswered = false;
                console.log('❌ 转型意向未选择');
            }
            // 第1-10题是能力评估
            for (let i = 1; i < totalQuestions; i++) {
                if (answers[i] === undefined) {
                    allAnswered = false;
                    console.log(`❌ 问题 ${i + 1} 未回答`);
                }
            }
            
            if (!allAnswered) {
                let unanswered = 0;
                if (!careerPreference.transitionGoals || careerPreference.transitionGoals.length === 0) unanswered++;
                for (let i = 1; i < totalQuestions; i++) {
                    if (answers[i] === undefined) unanswered++;
                }
                alert(`您还有 ${unanswered} 个问题未回答，请完成所有问题后再提交。`);
                return;
            }
            
            // 10项能力类别的映射（对应第1-10题）
            const abilityCategories = ['leadership', 'teaching', 'research', 'innovation', 'communication', 'tech', 'stress', 'learning', 'policy', 'entrepreneur'];
            
            // 计算分数（只计算第1-10题的能力分数）
            let totalScore = 0;
            const abilityScores = {};
            for (let i = 1; i < totalQuestions; i++) {
                const answer = answers[i];
                if (answer !== undefined) {
                    // 答案0-4对应分数5-1（反向计分）
                    const score = (4 - answer) + 1;
                    totalScore += score;
                    abilityScores[abilityCategories[i - 1]] = score;
                }
            }
            
            const maxScore = 10 * 5; // 10道能力评估题，每题最高5分
            const matchScore = Math.round((totalScore / maxScore) * 100);
            
            console.log(`得分: ${totalScore}/${maxScore} = ${matchScore}%`);
            console.log('能力得分:', abilityScores);
            
            // 更新结果页面
            document.getElementById('match-score').textContent = `${matchScore}%`;
            
            // 生成推荐内容
            generateRecommendations(matchScore);
            
            // 收集用户信息
            const currentRole = document.getElementById('current-role').value;
            const experience = document.getElementById('experience').value;
            const education = document.getElementById('education').value;
            const specialty = document.getElementById('specialty').value;
            const transitionGoals = careerPreference.transitionGoals || [];
            
            // 保存到localStorage供个性化报告使用
            const testResults = {
                scores: {
                    abilityScores: abilityScores
                },
                userInfo: {
                    currentRole: currentRole,
                    experience: experience,
                    education: education,
                    specialty: specialty,
                    transitionGoals: transitionGoals
                },
                careerPreference: {
                    otherCareer: careerPreference.otherCareer,
                    transitionReasons: careerPreference.transitionReasons,
                    category: careerPreference.category
                },
                reportMatch: {
                    matchScore: matchScore
                }
            };
            
            // 根据职业偏好确定分支类型
            function getBranchType() {
                const category = careerPreference.category;
                const categoryMap = {
                    'away': 'complete-transition',              // 完全转型型
                    'medical-no-clinical': 'medical-no-clinical', // 留在医疗但远离临床
                    'uncertain': 'exploring',                   // 探索中
                    'medical-clinical': 'clinical-focused'      // 临床坚守型
                };
                return categoryMap[category] || 'unknown';
            }
            
            try {
                localStorage.setItem('careerTestResults', JSON.stringify(testResults));
                console.log('测试结果已保存到 localStorage');
            } catch (err) {
                console.error('保存测试结果到 localStorage 失败:', err);
            }
            
            // 显示结果页面
            showSection('result');
        }
        
        // 生成推荐内容
        function generateRecommendations(score) {
            const recommendationList = document.getElementById('recommendation-list');
            const actionPlanContent = document.getElementById('action-plan-content');
            
            if (!recommendationList || !actionPlanContent) return;
            
            let recommendationsHtml = '';
            let actionPlanHtml = '';
            
            // 从localStorage获取分支类型
            let branchType = 'default';
            try {
                const storedResults = localStorage.getItem('careerTestResults');
                if (storedResults) {
                    const results = JSON.parse(storedResults);
                    branchType = results.careerPreference?.branchType || 'default';
                }
            } catch (err) {
                console.error('读取测试结果失败:', err);
            }
            
            if (branchType === 'clinical-focused') {
                // 留在医疗，留在临床：明确想转型到其他临床相关职业
                recommendationsHtml = `
                    <div class="recommendation-item">
                        <h4>1. 临床管理 (匹配度: ${score}%)</h4>
                        <p>科室管理、临床带教、医疗质量控制。您可以转型为临床管理者。</p>
                    </div>
                    <div class="recommendation-item">
                        <h4>2. 临床专家 (匹配度: ${Math.round(score * 0.9)}%)</h4>
                        <p>专科发展、亚专科建设。您可以在临床岗位上成为专家型人才。</p>
                    </div>
                    <div class="recommendation-item">
                        <h4>3. 临床教学 (匹配度: ${Math.round(score * 0.85)}%)</h4>
                        <p>住培带教、临床技能培训。将您的临床经验传授给年轻医生。</p>
                    </div>
                `;
                
                actionPlanHtml = `
                    <div class="action-item">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>管理能力</h4>
                            <p>建议提升领导力和沟通能力，向临床管理方向发展。</p>
                        </div>
                    </div>
                    <div class="action-item">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>专业深化</h4>
                            <p>可以选择一个亚专科方向，深入发展成为临床专家。</p>
                        </div>
                    </div>
                `;
            } else if (branchType === 'medical-no-clinical') {
                // 留在医疗但远离临床：医学相关可以但不想干临床了
                recommendationsHtml = `
                    <div class="recommendation-item">
                        <h4>1. 数字医疗 (匹配度: 92%)</h4>
                        <p>医疗信息化、健康科技、远程医疗。脱离临床一线，但仍在医疗行业发挥价值。</p>
                    </div>
                    <div class="recommendation-item">
                        <h4>2. 医药产业 (匹配度: 88%)</h4>
                        <p>医药企业、医疗器械、医学服务。发挥医学背景优势，脱离临床环境。</p>
                    </div>
                    <div class="recommendation-item">
                        <h4>3. 公共卫生 (匹配度: 85%)</h4>
                        <p>疾控、卫生管理、健康教育。从个体诊疗转向群体健康服务。</p>
                    </div>
                `;
                
                actionPlanHtml = `
                    <div class="action-item">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>技能转型</h4>
                            <p>建议学习医疗信息化、项目管理等非临床技能，开始向幕后岗位转型。</p>
                        </div>
                    </div>
                    <div class="action-item">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>行业探索</h4>
                            <p>可以通过实习、兼职或行业交流活动，了解非临床工作环境。</p>
                        </div>
                    </div>
                `;
            } else if (branchType === 'exploring') {
                // 不确定：纠结中或想了解可能性
                recommendationsHtml = `
                    <div class="recommendation-item">
                        <h4>1. 临床+副业 (匹配度: 88%)</h4>
                        <p>在临床工作基础上，探索医学科普、医学教育等副业可能性。</p>
                    </div>
                    <div class="recommendation-item">
                        <h4>2. 技能拓展 (匹配度: 82%)</h4>
                        <p>学习新技能，如医学研究、教学能力，为未来发展做准备。</p>
                    </div>
                    <div class="recommendation-item">
                        <h4>3. 跨界探索 (匹配度: 75%)</h4>
                        <p>了解医疗信息化、AI医疗等新领域，寻找适合自己的方向。</p>
                    </div>
                `;
                
                actionPlanHtml = `
                    <div class="action-item">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>拓宽视野</h4>
                            <p>建议参加行业论坛、研讨会，了解医疗行业的多元发展路径。</p>
                        </div>
                    </div>
                    <div class="action-item">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>尝试探索</h4>
                            <p>可以尝试参与一些非临床项目，找到自己的兴趣点。</p>
                        </div>
                    </div>
                `;
            } else if (branchType === 'complete-transition') {
                // 远离医疗远离临床（正常不会到这里，因为前端已拦截）
                recommendationsHtml = `
                    <div class="recommendation-item">
                        <h4>1. 数字医疗 (匹配度: 92%)</h4>
                        <p>医疗信息化、健康科技、远程医疗。您完全离开了临床，但仍在医疗行业。</p>
                    </div>
                    <div class="recommendation-item">
                        <h4>2. 医药产业 (匹配度: 88%)</h4>
                        <p>医药企业、医疗器械、医学服务。您可以发挥医学背景优势，但脱离临床环境。</p>
                    </div>
                    <div class="recommendation-item">
                        <h4>3. 医学培训 (匹配度: 85%)</h4>
                        <p>医学教育、企业培训、技能培训。将您的专业经验传授给他人。</p>
                    </div>
                `;
                
                actionPlanHtml = `
                    <div class="action-item">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>技能转型</h4>
                            <p>建议学习医疗信息化、项目管理等非临床技能，开始向幕后岗位转型。</p>
                        </div>
                    </div>
                    <div class="action-item">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>行业探索</h4>
                            <p>可以通过实习、兼职或行业交流活动，了解非临床工作环境。</p>
                        </div>
                    </div>
                `;
            } else {
                // 默认推荐（原有逻辑）
                recommendationsHtml = `
                    <div class="recommendation-item">
                        <h4>1. 医疗管理 (匹配度: ${score}%)</h4>
                        <p>医院管理、科室主任、医疗质量管控等。您的领导力和管理能力突出，适合向管理方向发展。</p>
                    </div>
                    <div class="recommendation-item">
                        <h4>2. 医学教育 (匹配度: ${Math.round(score * 0.85)}%)</h4>
                        <p>医学院教师、临床培训师、医学教育管理。您有较强的教学和沟通能力。</p>
                    </div>
                    <div class="recommendation-item">
                        <h4>3. 数字医疗 (匹配度: ${Math.round(score * 0.75)}%)</h4>
                        <p>医疗信息化、健康科技、远程医疗。您对新技术有较强兴趣。</p>
                    </div>
                `;
                
                actionPlanHtml = `
                    <div class="action-item">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>技能提升</h4>
                            <p>针对医疗管理方向，建议重点提升领导力、沟通能力、抗压能力等核心能力。</p>
                        </div>
                    </div>
                    <div class="action-item">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <h4>学习资源</h4>
                            <p>推荐参加医院管理培训课程、医疗质量改进研讨会，阅读管理类书籍。</p>
                        </div>
                    </div>
                `;
            }
            
            recommendationList.innerHTML = recommendationsHtml;
            actionPlanContent.innerHTML = actionPlanHtml;
        }
        
        // 重新测试
        function restartTest() {
            console.log('重新开始测试');
            
            // 重置状态
            currentSection = 'welcome';
            currentQuestion = 0;
            answers = [];
            
            // 重置表单
            document.getElementById('user-info-form').reset();
            
            // 显示欢迎页面
            showSection('welcome');
        }
        
        // 下载报告
        function downloadReport() {
            alert('报告下载功能正在开发中...\n\n您的评估结果已保存，稍后可通过邮件接收详细报告。');
        }
        
        // 查看个性化报告
        document.addEventListener('DOMContentLoaded', function() {
            const viewReportBtn = document.getElementById('view-personal-report');
            if (viewReportBtn) {
                viewReportBtn.addEventListener('click', function() {
                    window.location.href = 'personalized-report.html';
                });
            }
        });
        
        // 初始化：页面加载完成后执行
        document.addEventListener('DOMContentLoaded', function() {
            console.log('医护职业转型测试系统 - 修复版本已加载');
            
            // 显示欢迎页面
            showSection('welcome');
            
            // 添加控制台测试命令
            console.log('可用测试命令:');
            console.log('1. showSection("assessment") - 直接跳转到评估页面');
            console.log('2. selectAnswer(0, 0) - 选择第一个问题的第一个答案');
        });
    