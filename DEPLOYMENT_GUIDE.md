# GitHub Pages 部署指南

## 步骤1：创建GitHub仓库

1. 访问 https://github.com
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - Repository name: `medical-career-test`
   - Description: `医护职业转型测试系统 - 女性医护职业发展互助项目`
   - 选择 "Public"（公开）
   - 不要勾选 "Initialize this repository with a README"
4. 点击 "Create repository"

## 步骤2：推送代码到GitHub

在终端中执行以下命令：

```bash
# 进入项目目录
cd /Users/lxx/Documents/medical-career-test-deploy

# 添加远程仓库（将 YOUR_USERNAME 替换为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/medical-career-test.git

# 推送代码到GitHub
git branch -M main
git push -u origin main
```

## 步骤3：启用GitHub Pages

1. 在GitHub仓库页面，点击 "Settings"（设置）
2. 在左侧菜单中找到 "Pages"（页面）
3. 在 "Source"（源）部分：
   - 选择 "Deploy from a branch"（从分支部署）
   - 选择 "main" 分支
   - 选择 "/ (root)" 文件夹
4. 点击 "Save"（保存）

## 步骤4：等待部署完成

GitHub Pages 部署通常需要1-2分钟。部署完成后，你会看到：
- 一个绿色的提示框显示 "Your site is published at ..."
- 你的网站地址：`https://YOUR_USERNAME.github.io/medical-career-test/`

## 步骤5：测试网站

1. 打开浏览器，访问你的网站地址
2. 测试所有功能：
   - 个人信息填写
   - 能力评估问题
   - 结果页面显示
   - 响应式设计（在手机和电脑上测试）

## 备用部署方案：Netlify

如果GitHub Pages有问题，可以使用Netlify（更简单）：

### 方案A：通过GitHub仓库部署
1. 访问 https://netlify.com
2. 注册/登录账号
3. 点击 "Add new site" → "Import an existing project"
4. 选择 "GitHub" 并授权
5. 选择你的 `medical-career-test` 仓库
6. 点击 "Deploy site"

### 方案B：直接上传文件
1. 访问 https://app.netlify.com/drop
2. 将 `/Users/lxx/Documents/medical-career-test-deploy` 文件夹拖到上传区域
3. 等待部署完成

## 部署后的文件结构

```
medical-career-test/
├── index.html          # 主页面
├── css/
│   ├── style.css      # 主要样式
│   └── professional.css # 专业版样式
├── js/
│   ├── app.js         # 主要JavaScript
│   └── debug.js       # 调试脚本
└── README.md          # 项目说明
```

## 自定义域名（可选）

如果你有自己的域名：

1. 在Netlify/GitHub Pages设置中添加自定义域名
2. 在域名注册商处配置DNS记录
3. 等待DNS传播（最多24小时）

## 注意事项

1. **GitHub Pages限制**：
   - 每个账户有1GB存储空间
   - 每月100GB带宽
   - 不支持服务器端代码（纯静态网站）

2. **Netlify优势**：
   - 自动HTTPS
   - 全球CDN
   - 表单处理功能
   - 更快的部署速度

3. **网站性能优化**：
   - 所有资源已本地化，无需外部依赖
   - 响应式设计，移动端友好
   - 轻量级，加载速度快

## 分享链接

部署成功后，你可以分享以下链接：

```
https://YOUR_USERNAME.github.io/medical-career-test/
```

或（如果使用Netlify）：

```
https://your-site-name.netlify.app
```

## 更新网站

如果需要更新网站：

```bash
# 修改文件后
cd /Users/lxx/Documents/medical-career-test-deploy
git add .
git commit -m "更新描述"
git push origin main
```

GitHub Pages/Netlify会自动重新部署。