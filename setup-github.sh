#!/bin/bash

echo "🚀 GitHub仓库配置助手"
echo "========================"
echo ""

echo "📁 项目位置：/Users/lxx/Documents/medical-career-test-deploy/"
echo ""

# 检查Git状态
echo "🔍 检查Git状态..."
git status
echo ""

echo "📋 已提交的文件："
git ls-files
echo ""

echo "🎯 请按照以下步骤操作："
echo ""
echo "1. 访问 https://github.com"
echo "2. 登录你的账号"
echo "3. 点击右上角 '+' → 'New repository'"
echo "4. 填写信息："
echo "   - Repository name: medical-career-test"
echo "   - Description: 医护职业转型测试系统"
echo "   - 选择 'Public'"
echo "   - 不要勾选 'Initialize with README'"
echo "5. 点击 'Create repository'"
echo ""
echo "6. 创建成功后，复制HTTPS URL（类似这样）："
echo "   https://github.com/你的用户名/medical-career-test.git"
echo ""
read -p "7. 请输入你的GitHub用户名: " github_username
echo ""

if [ -z "$github_username" ]; then
    echo "❌ 用户名不能为空"
    exit 1
fi

echo "🔗 配置远程仓库..."
git remote add origin "https://github.com/$github_username/medical-career-test.git" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ 远程仓库已添加"
else
    echo "⚠️  远程仓库可能已存在，尝试更新..."
    git remote set-url origin "https://github.com/$github_username/medical-career-test.git"
fi

echo ""
echo "📤 推送代码到GitHub..."
echo "这可能需要输入GitHub用户名和密码/令牌"
echo ""

# 推送代码
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 代码推送成功！"
    echo ""
    echo "🌐 接下来启用GitHub Pages："
    echo "1. 访问 https://github.com/$github_username/medical-career-test"
    echo "2. 点击 'Settings'"
    echo "3. 左侧菜单点击 'Pages'"
    echo "4. 在 'Source' 选择 'main' 分支"
    echo "5. 点击 'Save'"
    echo ""
    echo "⏳ 等待1-2分钟部署完成"
    echo "🌍 你的网站地址：https://$github_username.github.io/medical-career-test/"
    echo ""
    echo "📋 也可以运行：./deploy.sh 选择其他部署选项"
else
    echo ""
    echo "❌ 推送失败，可能的原因："
    echo "1. 仓库不存在 - 请确认已创建仓库"
    echo "2. 权限不足 - 检查用户名/密码"
    echo "3. 网络问题 - 检查网络连接"
    echo ""
    echo "💡 手动配置命令："
    echo "cd \"/Users/lxx/Documents/medical-career-test-deploy\""
    echo "git remote add origin https://github.com/$github_username/medical-career-test.git"
    echo "git branch -M main"
    echo "git push -u origin main"
fi

echo ""
echo "📚 更多帮助："
echo "- 查看详细指南: open GITHUB_SETUP.md"
echo "- 运行部署助手: ./deploy.sh"
echo "- 本地测试: open test-local.html"
echo ""

read -p "按回车键打开GitHub创建页面..." key
open "https://github.com/new"

echo ""
echo "✅ 配置完成！按回车键退出..."
read