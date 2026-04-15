# 🔄 最简单Git推送指南

## 你的情况
- 昨天：通过GitHub网页上传文件
- 今天：本地文件有更新
- 目标：推送本地更新到GitHub仓库

## 🎯 推荐方案：强制推送

### 步骤1：生成GitHub Token
1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选 **"repo"** 权限
4. 点击 "Generate token"
5. **立即复制Token**（只显示一次！）

### 步骤2：运行推送命令
```bash
cd "/Users/lxx/Documents/medical-career-test-deploy"

# 将 YOUR_TOKEN 替换为你的实际Token
git push -f https://zyzxznz:YOUR_TOKEN@github.com/zyzxznz/medical-career-test-2026-4-14.git main
```

### 步骤3：验证推送
访问：https://github.com/zyzxznz/medical-career-test-2026-4-14
查看文件是否更新

## 📋 命令解释
- `-f`：强制推送，覆盖远程仓库
- `https://zyzxznz:TOKEN@...`：使用Token认证
- `main`：推送到主分支

## 🔄 本地更新内容
你的本地文件夹有这些更新：
- 新增的部署脚本
- 更新的文档
- 推送工具
- 总共6次提交

## 🛠️ 如果强制推送失败

### 方案A：使用GitHub网页上传
1. 访问仓库：https://github.com/zyzxznz/medical-career-test-2026-4-14
2. 点击 "Add file" → "Upload files"
3. 上传所有更新文件
4. 提交更改

### 方案B：使用GitHub Desktop
1. 下载：https://desktop.github.com
2. 添加本地仓库
3. 提交更改
4. 推送

### 方案C：创建新仓库
如果冲突太多：
```bash
# 创建新仓库
git remote rename origin old-origin
git remote add origin https://github.com/zyzxznz/medical-career-test-NEW.git
git push -u origin main
```

## 📞 需要帮助？
运行这个脚本查看所有选项：
```bash
cd "/Users/lxx/Documents/medical-career-test-deploy"
./git-push-update.sh
```

## 🎪 最简单的操作
**复制这个命令，替换YOUR_TOKEN，运行：**
```bash
cd "/Users/lxx/Documents/medical-career-test-deploy" && git push -f https://zyzxznz:YOUR_TOKEN@github.com/zyzxznz/medical-career-test-2026-4-14.git main
```