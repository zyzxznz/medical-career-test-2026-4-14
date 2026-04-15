#!/bin/bash

echo "🚀 推送原始项目到GitHub"
echo "========================"
echo ""

echo "📁 项目：medical-career-test（原始项目）"
echo "🌐 仓库：https://github.com/zyzxznz/medical-career-test-2026-4-14"
echo ""

echo "🔍 检查状态..."
git status
echo ""

echo "📦 提交记录："
git log --oneline -3
echo ""

echo "📋 文件数量："
git ls-files | wc -l
echo "个文件"
echo ""

echo "🎯 开始推送..."
echo "需要GitHub认证"
echo ""
echo "💡 推荐使用Personal Access Token："
echo "1. 生成Token：https://github.com/settings/tokens"
echo "2. 勾选 'repo' 权限"
echo "3. 复制Token"
echo ""

echo "🔑 推送命令（使用Token）："
echo "git push https://zyzxznz:你的Token@github.com/zyzxznz/medical-career-test-2026-4-14.git main"
echo ""

read -p "按回车键尝试推送，或按Ctrl+C取消..." key

echo ""
echo "🔄 推送中..."
echo "如果提示输入用户名：zyzxznz"
echo "如果提示输入密码：使用Personal Access Token"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 推送成功！"
    echo ""
    echo "✅ 原始项目已上传到GitHub"
    echo "🌍 仓库地址：https://github.com/zyzxznz/medical-career-test-2026-4-14"
    echo ""
    echo "📁 包含文件："
    echo "- 所有HTML版本（index.html, index-light-blue.html等）"
    echo "- CSS样式文件"
    echo "- JavaScript文件"
    echo "- 数据文件"
    echo "- 所有文档（README.md, 部署指南等）"
    echo "- 启动脚本"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "💡 直接使用Token推送："
    echo "1. 生成Token：https://github.com/settings/tokens"
    echo "2. 运行以下命令："
    echo "   git push https://zyzxznz:你的Token@github.com/zyzxznz/medical-career-test-2026-4-14.git main"
    echo ""
    echo "🔄 或者使用GitHub Desktop："
    echo "1. 下载GitHub Desktop"
    echo "2. 添加这个文件夹：/Users/lxx/documents/medical-career-test"
    echo "3. 点击发布"
fi

echo ""
read -p "按回车键退出..."