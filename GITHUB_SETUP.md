# GitHub仓库配置指南

## 当前状态
✅ 本地Git仓库已初始化
✅ 所有文件已提交
❌ 远程GitHub仓库未配置

## 配置步骤

### 步骤1：创建GitHub仓库
1. 访问 https://github.com
2. 点击右上角 "+" → "New repository"
3. 填写信息：
   - Repository name: `medical-career-test`
   - Description: `医护职业转型测试系统 - 女性医护职业发展互助项目`
   - 选择 "Public"
   - **不要勾选** "Initialize this repository with a README"
4. 点击 "Create repository"

### 步骤2：获取远程仓库URL
创建成功后，你会看到这个页面：

![GitHub创建成功页面](https://docs.github.com/assets/cb-77734/mw-1440/images/help/repository/quick-setup.png)

复制HTTPS URL（类似这样）：
```
https://github.com/YOUR_USERNAME/medical-career-test.git
```

### 步骤3：配置远程仓库
在终端中执行（将YOUR_USERNAME替换为你的GitHub用户名）：

```bash
cd "/Users/lxx/Documents/medical-career-test-deploy"

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/medical-career-test.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤4：启用GitHub Pages
1. 在GitHub仓库页面，点击 "Settings"
2. 左侧菜单点击 "Pages"
3. 在 "Source" 部分：
   - 选择 "Deploy from a branch"
   - 选择 "main" 分支
   - 选择 "/ (root)" 文件夹
4. 点击 "Save"

### 步骤5：等待部署
等待1-2分钟，然后访问：
```
https://YOUR_USERNAME.github.io/medical-career-test/
```

## 一键配置脚本
你也可以运行这个脚本自动配置：

```bash
cd "/Users/lxx/Documents/medical-career-test-deploy"
./deploy.sh
```

然后选择选项1（GitHub Pages部署）。

## 文件清单
已提交的文件包括：

1. **主页面**：
   - `index.html` - 医护职业测试系统（浅蓝色主题）
   - `css/style.css` - 样式文件
   - `js/app.js` - JavaScript逻辑

2. **部署工具**：
   - `deploy.sh` - 一键部署脚本
   - `upload-helper.sh` - 上传助手
   - `test-local.html` - 本地测试页面

3. **文档**：
   - `README.md` - 项目说明
   - `DEPLOYMENT_GUIDE.md` - 详细部署指南
   - `QUICK_START.md` - 快速开始
   - `GITHUB_SETUP.md` - 本指南

## 验证配置
配置完成后，运行以下命令验证：

```bash
cd "/Users/lxx/Documents/medical-career-test-deploy"

# 检查远程仓库
git remote -v

# 检查状态
git status

# 查看提交历史
git log --oneline -5
```

## 后续更新
如果需要更新网站：

```bash
cd "/Users/lxx/Documents/medical-career-test-deploy"

# 修改文件后
git add .
git commit -m "更新描述"
git push origin main
```

GitHub Pages会自动重新部署。

## 问题排查
如果遇到问题：

1. **权限错误**：确保GitHub用户名和密码正确
2. **仓库不存在**：确认仓库名完全匹配
3. **推送失败**：尝试 `git push -f origin main`（强制推送）
4. **页面不显示**：等待5分钟，检查GitHub Pages设置

## 联系方式
如果需要帮助，可以：
1. 运行 `./deploy.sh` 选择帮助选项
2. 查看 `DEPLOYMENT_GUIDE.md` 详细指南
3. 打开 `test-local.html` 查看可视化指南