# GitHub推送指南

## 当前状态
✅ 本地Git仓库已配置
✅ 远程仓库已设置：https://github.com/zyzxznz/medical-career-test-2026-4-14.git
✅ 所有文件已提交
❌ 需要GitHub认证才能推送

## 推送方法选择

### 方法1：使用GitHub CLI（最简单）
如果你已安装GitHub CLI：
```bash
gh auth login
cd "/Users/lxx/Documents/medical-career-test-deploy"
git push -u origin main
```

### 方法2：使用Personal Access Token（推荐）
1. 生成Token：https://github.com/settings/tokens
   - 选择 "Generate new token (classic)"
   - 勾选 "repo" 权限
   - 点击 "Generate token"
   - 复制Token（只显示一次）

2. 推送代码：
```bash
cd "/Users/lxx/Documents/medical-career-test-deploy"

# 使用Token作为密码
git push https://zyzxznz:你的Token@github.com/zyzxznz/medical-career-test-2026-4-14.git main
```

### 方法3：使用SSH密钥
1. 检查SSH密钥：
```bash
ls -la ~/.ssh/
```

2. 如果没有，生成SSH密钥：
```bash
ssh-keygen -t ed25519 -C "你的邮箱"
```

3. 添加公钥到GitHub：
```bash
cat ~/.ssh/id_ed25519.pub
```
复制到：https://github.com/settings/keys

4. 推送：
```bash
cd "/Users/lxx/Documents/medical-career-test-deploy"
git remote set-url origin git@github.com:zyzxznz/medical-career-test-2026-4-14.git
git push -u origin main
```

### 方法4：使用GitHub Desktop（可视化）
1. 下载：https://desktop.github.com
2. 打开GitHub Desktop
3. File → Add Local Repository
4. 选择：`/Users/lxx/Documents/medical-career-test-deploy`
5. 点击 "Publish repository"

### 方法5：网页上传（无需Git）
1. 访问：https://github.com/zyzxznz/medical-career-test-2026-4-14
2. 点击 "Add file" → "Upload files"
3. 上传 `medical-career-test-deploy` 文件夹内的所有文件

## 快速推送脚本
运行这个脚本尝试推送：

```bash
cd "/Users/lxx/Documents/medical-career-test-deploy"
./push-now.sh
```

## 验证推送
推送成功后，访问：
https://github.com/zyzxznz/medical-career-test-2026-4-14

你应该能看到所有文件。

## 启用GitHub Pages
推送成功后：
1. 访问仓库：https://github.com/zyzxznz/medical-career-test-2026-4-14
2. 点击 "Settings"
3. 左侧点击 "Pages"
4. Source: "Deploy from a branch"
5. Branch: "main", folder: "/ (root)"
6. 点击 "Save"

## 网站地址
启用Pages后，访问：
https://zyzxznz.github.io/medical-career-test-2026-4-14/

## 文件清单
需要推送的文件：
- index.html
- css/style.css
- js/app.js
- 所有.md文档
- 所有.sh脚本
- test-local.html

## 问题排查
如果推送失败：
1. **认证错误**：使用Personal Access Token
2. **权限不足**：确认仓库存在且有写入权限
3. **网络问题**：检查网络连接
4. **仓库不存在**：确认仓库名正确

## 备用方案：Netlify拖拽
如果GitHub推送太复杂：
1. 访问：https://app.netlify.com/drop
2. 拖拽 `medical-career-test-deploy` 文件夹
3. 立即获得免费网址