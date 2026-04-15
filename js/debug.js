// 调试脚本 - 确保所有按钮都能正常工作

document.addEventListener('DOMContentLoaded', function() {
    console.log('调试脚本已加载');
    
    // 检查所有按钮
    const buttonIds = [
        'start-test',
        'back-to-welcome',
        'prev-question',
        'next-question',
        'submit-assessment',
        'restart-test',
        'download-report'
    ];
    
    buttonIds.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            console.log(`✅ 找到按钮: #${id}`);
            
            // 添加点击事件监听器
            button.addEventListener('click', function() {
                console.log(`按钮被点击: #${id}`);
                
                // 根据按钮ID执行相应操作
                switch(id) {
                    case 'start-test':
                        console.log('切换到个人信息页面');
                        document.getElementById('welcome-section').classList.remove('active');
                        document.getElementById('info-section').classList.add('active');
                        break;
                        
                    case 'back-to-welcome':
                        console.log('返回欢迎页面');
                        document.getElementById('info-section').classList.remove('active');
                        document.getElementById('welcome-section').classList.add('active');
                        break;
                        
                    default:
                        console.log(`按钮 ${id} 被点击，但未定义具体操作`);
                }
            });
        } else {
            console.error(`❌ 未找到按钮: #${id}`);
        }
    });
    
    // 检查表单
    const form = document.getElementById('user-info-form');
    if (form) {
        console.log('✅ 找到表单: #user-info-form');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('表单提交');
            
            // 收集表单数据
            const currentRole = document.getElementById('current-role').value;
            const experience = document.getElementById('experience').value;
            const education = document.getElementById('education').value;
            const specialty = document.getElementById('specialty').value;
            
            console.log('表单数据:', {
                currentRole,
                experience,
                education,
                specialty
            });
            
            // 切换到评估页面
            document.getElementById('info-section').classList.remove('active');
            document.getElementById('assessment-section').classList.add('active');
            
            // 显示第一个问题
            showFirstQuestion();
        });
    } else {
        console.error('❌ 未找到表单: #user-info-form');
    }
    
    // 显示第一个问题的简单版本
    function showFirstQuestion() {
        const questionContainer = document.getElementById('question-container');
        if (questionContainer) {
            questionContainer.innerHTML = `
                <div class="question-card">
                    <div class="question-text">您是否享受带领团队、制定工作计划和分配任务的过程？</div>
                    <div class="options">
                        <div class="option" data-value="5">
                            <input type="radio" name="question-1" value="5" id="option-1">
                            <label class="option-label" for="option-1">非常享受，这是我的强项</label>
                        </div>
                        <div class="option" data-value="4">
                            <input type="radio" name="question-1" value="4" id="option-2">
                            <label class="option-label" for="option-2">比较享受，有一定经验</label>
                        </div>
                        <div class="option" data-value="3">
                            <input type="radio" name="question-1" value="3" id="option-3">
                            <label class="option-label" for="option-3">一般，可以接受</label>
                        </div>
                        <div class="option" data-value="2">
                            <input type="radio" name="question-1" value="2" id="option-4">
                            <label class="option-label" for="option-4">不太喜欢，更愿意专注技术</label>
                        </div>
                        <div class="option" data-value="1">
                            <input type="radio" name="question-1" value="1" id="option-5">
                            <label class="option-label" for="option-5">完全不喜欢，避免管理职责</label>
                        </div>
                    </div>
                </div>
            `;
            
            // 添加选项点击事件
            document.querySelectorAll('.option').forEach(option => {
                option.addEventListener('click', function() {
                    document.querySelectorAll('.option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    this.querySelector('input').checked = true;
                    
                    // 启用下一题按钮
                    document.getElementById('next-question').disabled = false;
                });
            });
        }
    }
    
    console.log('调试脚本初始化完成');
});