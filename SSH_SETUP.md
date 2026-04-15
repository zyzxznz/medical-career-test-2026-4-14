# 🔑 SSH密钥配置指南

## 当前状态
✅ 本地有SSH密钥：`id_ed25519`
❌ SSH认证失败：公钥未添加到GitHub或配置有问题

## 🎯 解决方案

### 步骤1：添加公钥到GitHub
你的公钥是：
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHPEztEYNTGm41d9XNObleQMiDUPde3/czIZw6Bw1RFL 2969355212@qq.com
```

**添加步骤：**
1. 访问：https://github.com/settings/keys
2. 点击 "New SSH key"
3. 标题：`MacBook SSH Key`（任意）
4. 密钥类型：选择 "Authentication Key"
5. 粘贴上面的公钥
6. 点击 "Add SSH key"

### 步骤2：测试SSH连接
```bash
ssh -T git@github.com
```
应该看到：`Hi zyzxznz! You've successfully authenticated...`

### 步骤3：配置Git使用SSH
```bash
cd "/Users/lxx/Documents/medical-career-test-deploy"
git remote set-url origin git@github.com:zyzxznz/medical-career-test-2026-4-14.git
```

### 步骤4：强制推送
```bash
git push -f origin main
```

## 🔧 如果仍然失败

### 检查1：SSH代理
```bash
# 启动SSH代理
eval "$(ssh-agent -s)"

# 添加私钥
ssh-add ~/.ssh/id_ed25519
```

### 检查2：SSH配置
```bash
# 创建或编辑SSH配置
cat >> ~/.ssh/config << 'EOF'
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
EOF
```

### 检查3：权限
```bash
# 确保正确的权限
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```

## 🚀 一键SSH配置脚本
运行这个脚本自动配置：
```bash
cd "/Users/lxx/Documents/medical-career-test-deploy"
./setup-ssh.sh
```

## 📋 SSH vs HTTPS对比

| 方面 | SSH | HTTPS |
|------|-----|-------|
| 认证 | 密钥对 | 用户名+密码/Token |
| 速度 | 快 | 慢 |
| 网络要求 | 低 | 高 |
| 配置复杂度 | 中 | 低 |
| 安全性 | 高 | 中 |

## 🆘 紧急方案

如果SSH配置太复杂，使用**GitHub网页上传**：

1. 访问：https://github.com/zyzxznz/medical-career-test-2026-4-14
2. 点击 "Add file" → "Upload files"
3. 上传 `medical-career-test-deploy` 文件夹内所有文件
4. 覆盖现有文件

## 📞 需要帮助？
1. 运行：`./git-push-update.sh` 选择SSH选项
2. 查看：`test-local.html` 交互式指南
3. 打开：https://github.com/settings/keys 添加公钥