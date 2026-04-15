#!/bin/bash

echo "🔑 SSH一键配置脚本"
echo "=================="
echo ""

echo "🔍 检查SSH状态..."
echo "1. SSH密钥文件："
ls -la ~/.ssh/ 2>/dev/null || echo "没有.ssh目录"

echo ""
echo "2. 公钥内容："
cat ~/.ssh/id_ed25519.pub 2>/dev/null || echo "没有公钥文件"

echo ""
echo "3. 测试GitHub连接："
ssh -T git@github.com 2>&1 | head -5

echo ""
echo "🎯 步骤1：添加公钥到GitHub"
echo "你的公钥（复制下面所有内容）："
echo "========================================"
cat ~/.ssh/id_ed25519.pub 2>/dev/null
echo "========================================"
echo ""
echo "操作："
echo "1. 访问 https://github.com/settings/keys"
echo "2. 点击 'New SSH key'"
echo "3. 标题：MacBook SSH Key"
echo "4. 密钥类型：Authentication Key"
echo "5. 粘贴上面的公钥"
echo "6. 点击 'Add SSH key'"
echo ""

read -p "添加完成后按回车键继续..." key

echo ""
echo "🎯 步骤2：配置SSH代理"
# 启动SSH代理
eval "$(ssh-agent -s)" 2>/dev/null

# 添加私钥
ssh-add ~/.ssh/id_ed25519 2>/dev/null

echo "SSH代理状态："
ssh-add -l 2>/dev/null || echo "SSH代理未运行"

echo ""
echo "🎯 步骤3：配置SSH"
# 创建SSH配置
mkdir -p ~/.ssh
cat >> ~/.ssh/config << 'EOF'
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
EOF

echo "SSH配置已创建："
cat ~/.ssh/config 2>/dev/null | tail -5

echo ""
echo "🎯 步骤4：设置权限"
chmod 700 ~/.ssh 2>/dev/null
chmod 600 ~/.ssh/id_ed25519 2>/dev/null
chmod 644 ~/.ssh/id_ed25519.pub 2>/dev/null
chmod 644 ~/.ssh/config 2>/dev/null

echo ""
echo "🎯 步骤5：测试连接"
ssh -T git@github.com 2>&1

echo ""
echo "🎯 步骤6：配置Git使用SSH"
cd "/Users/lxx/Documents/medical-career-test-deploy"
git remote set-url origin git@github.com:zyzxznz/medical-career-test-2026-4-14.git

echo "远程仓库配置："
git remote -v

echo ""
echo "🎯 步骤7：尝试推送"
echo "当前分支和状态："
git status

echo ""
read -p "按回车键尝试强制推送..." key

git push -f origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SSH推送成功！"
    echo "✅ 本地更新已推送到GitHub"
    echo "🌍 仓库：https://github.com/zyzxznz/medical-career-test-2026-4-14"
else
    echo ""
    echo "❌ SSH推送失败"
    echo ""
    echo "💡 可能的原因："
    echo "1. 公钥未正确添加到GitHub"
    echo "2. SSH代理未运行"
    echo "3. 网络问题"
    echo ""
    echo "🔄 备用方案："
    echo "1. 使用GitHub网页上传"
    echo "2. 使用GitHub Desktop"
    echo "3. 使用其他部署平台"
fi

echo ""
read -p "按回车键退出..."