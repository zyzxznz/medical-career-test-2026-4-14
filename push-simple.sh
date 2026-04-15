#!/bin/bash

echo "🚀 简单GitHub推送"
echo "================="

echo "📁 项目：medical-career-test-deploy"
echo "🌐 仓库：https://github.com/zyzxznz/medical-career-test-2026-4-14"
echo ""

echo "🔍 检查状态..."
git status
echo ""

echo "📦 提交记录："
git log --oneline -3
echo ""

echo "🎯 开始推送..."
echo "可能需要输入GitHub用户名和密码"
echo "（密码可以使用Personal Access Token）"
echo ""
echo "如果提示输入用户名，请输入：zyzxznz"
echo "如果提示输入密码，请使用GitHub Personal Access Token"
echo ""
echo "生成Token：https://github.com/settings/tokens"
echo ""

read -p "按回车键开始推送，或按Ctrl+C取消..." key

echo ""
echo "🔄 推送中..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 推送成功！"
    echo ""
    echo "✅ 下一步：启用GitHub Pages"
    echo "1. 访问 https://github.com/zyzxznz/medical-career-test-2026-4-14"
    echo "2. 点击 Settings → Pages"
    echo "3. Source: Deploy from a branch"
    echo "4. Branch: main, folder: / (root)"
    echo "5. 点击 Save"
    echo ""
    echo "🌍 网站地址：https://zyzxznz.github.io/medical-career-test-2026-4-14/"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "💡 尝试使用Token推送："
    echo "1. 生成Token：https://github.com/settings/tokens"
    echo "2. 运行：git push https://zyzxznz:你的Token@github.com/zyzxznz/medical-career-test-2026-4-14.git main"
    echo ""
    echo "🔄 或者使用备用方案："
    echo "1. 访问 https://app.netlify.com/drop"
    echo "2. 拖拽这个文件夹上传"
fi

echo ""
read -p "按回车键退出..."