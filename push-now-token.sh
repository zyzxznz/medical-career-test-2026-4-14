#!/bin/bash

echo "🔑 GitHub Token推送助手"
echo "========================"
echo ""

echo "📁 项目：medical-career-test-deploy"
echo "🌐 仓库：https://github.com/zyzxznz/medical-career-test-2026-4-14"
echo ""

echo "📦 等待推送：5次提交"
git log --oneline -5
echo ""

echo "🎯 步骤1：生成GitHub Token"
echo "1. 访问 https://github.com/settings/tokens"
echo "2. 点击 'Generate new token (classic)'"
echo "3. 勾选 'repo' 权限"
echo "4. 点击 'Generate token'"
echo "5. 立即复制Token（只显示一次！）"
echo ""

read -p "🎯 步骤2：粘贴你的Token（输入后按回车）：" token

if [ -z "$token" ]; then
    echo "❌ Token不能为空"
    exit 1
fi

echo ""
echo "🚀 步骤3：开始推送..."
echo "推送中..."

# 使用Token推送
git push https://zyzxznz:${token}@github.com/zyzxznz/medical-career-test-2026-4-14.git main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 推送成功！"
    echo ""
    echo "✅ 部署文件夹已上传到GitHub"
    echo "🌍 仓库：https://github.com/zyzxznz/medical-career-test-2026-4-14"
    echo ""
    echo "🎯 下一步：启用GitHub Pages"
    echo "1. 访问上面的仓库链接"
    echo "2. 点击 Settings → Pages"
    echo "3. Source: Deploy from a branch"
    echo "4. Branch: main, folder: / (root)"
    echo "5. 点击 Save"
    echo ""
    echo "🌐 网站地址：https://zyzxznz.github.io/medical-career-test-2026-4-14/"
    echo ""
    echo "📱 可以分享这个链接给他人"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "💡 可能的原因："
    echo "1. Token无效或过期"
    echo "2. 仓库不存在"
    echo "3. 网络问题"
    echo ""
    echo "🔄 备用方案："
    echo "1. 重新生成Token"
    echo "2. 使用GitHub Desktop"
    echo "3. 使用Netlify拖拽：https://app.netlify.com/drop"
fi

echo ""
read -p "按回车键退出..."