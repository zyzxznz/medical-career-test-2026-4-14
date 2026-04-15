# 🌿 原始项目分支设置指南

## 目标
将原始项目文件夹作为 `original-project` 分支推送到GitHub仓库。

## 当前状态
- **本地原始项目**：`medical-career-test`（37个文件）
- **GitHub仓库**：`medical-career-test-2026-4-14`
- **主分支**：`main`（部署版，29个文件）
- **新分支**：`original-project`（完整版，37个文件）

## 🎯 推荐方案：GitHub网页操作

### 步骤1：在GitHub创建新分支
1. 访问：https://github.com/zyzxznz/medical-career-test-2026-4-14
2. 点击分支下拉菜单（显示"main"的地方）
3. 输入新分支名：`original-project`
4. 点击 "Create branch: original-project"

### 步骤2：切换到新分支
1. 点击分支下拉菜单
2. 选择 `original-project` 分支

### 步骤3：上传原始项目文件
1. 点击 "Add file" → "Upload files"
2. 拖拽 `medical-career-test` 文件夹内所有文件
3. 点击 "Commit changes"

## 🔧 命令行方案（如果认证已解决）

### 步骤1：进入原始项目文件夹
```bash
cd "/Users/lxx/documents/medical-career-test"
```

### 步骤2：创建并切换到新分支
```bash
git checkout -b original-project
```

### 步骤3：推送到GitHub
```bash
# 使用Token（推荐）
git push https://zyzxznz:你的Token@github.com/zyzxznz/medical-career-test-2026-4-14.git original-project

# 或使用SSH（如果配置好）
git push git@github.com:zyzxznz/medical-career-test-2026-4-14.git original-project
```

## 📊 分支对比

### `main` 分支（部署版）
```
29个文件
├── index.html              # 主页面（浅蓝色）
├── test-local.html         # 交互式指南
├── 8个部署脚本
├── 8个文档指南
├── css/样式文件
└── js/脚本文件
```

### `original-project` 分支（完整版）
```
37个文件
├── 9个HTML版本：
│   ├── index.html                 # 原始版本
│   ├── index-light-blue.html      # 浅蓝色主题
│   ├── index-with-intro.html      # 带介绍版本
│   ├── professional-version.html  # 专业版
│   └── 其他5个版本
├── 完整文档：
│   ├── README.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── FINAL_REPORT.md
│   ├── FINAL_DELIVERY.md
│   └── 其他文档
├── 数据文件：
│   ├── data/demo_users.json
│   └── data/sample-data.json
├── 样式和脚本
└── 启动脚本：start.sh
```

## 🛠️ 一键操作脚本

运行这个脚本选择推送方式：
```bash
cd "/Users/lxx/documents/medical-career-test"
./push-original-branch.sh
```

## 🌐 分支访问地址

推送成功后：
- **主分支（部署版）**：https://github.com/zyzxznz/medical-career-test-2026-4-14/tree/main
- **原始分支（完整版）**：https://github.com/zyzxznz/medical-career-test-2026-4-14/tree/original-project

## 🔄 分支管理

### 查看分支
```bash
# 查看所有分支
git branch -a

# 查看远程分支
git ls-remote origin
```

### 切换分支
```bash
# 切换到原始分支
git checkout original-project

# 切换回主分支
git checkout main
```

### 合并分支（如果需要）
```bash
# 切换到主分支
git checkout main

# 合并原始分支
git merge original-project
```

## 📞 需要帮助？

### 如果推送失败：
1. **使用网页操作**：最可靠
2. **生成新的Token**：https://github.com/settings/tokens
3. **使用GitHub Desktop**：图形界面更简单

### 运行诊断：
```bash
cd "/Users/lxx/documents/medical-career-test"
./push-original-branch.sh
```

## 🎉 完成后的好处
1. **完整备份**：原始项目安全存储
2. **版本管理**：部署版和完整版分离
3. **灵活使用**：需要时切换到完整版
4. **协作方便**：其他人可以查看完整历史

---

**现在开始，使用网页操作创建分支并上传原始项目吧！**