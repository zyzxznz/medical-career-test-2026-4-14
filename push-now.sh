#!/bin/bash

echo "🚀 GitHub一键推送脚本"
echo "======================"
echo ""

echo "📁 项目位置：/Users/lxx/Documents/medical-career-test-deploy/"
echo "🌐 远程仓库：https://github.com/zyzxznz/medical-career-test-2026-4-14.git"
echo ""

# 检查Git状态
echo "🔍 检查Git状态..."
git status
echo ""

echo "📋 已提交的文件："
git ls-files | head -20
echo "..."

echo "🎯 选择推送方法："
echo "1. 尝试HTTPS推送（需要用户名/密码）"
echo "2. 使用GitHub CLI（如果已安装）"
echo "3. 生成推送命令"
echo "4. 查看详细指南"
echo "5. 使用Netlify拖拽（备用）"
echo ""
read -p "请输入选项 (1-5): " choice

case $choice in
    1)
        echo ""
        echo "🔑 尝试HTTPS推送..."
        echo "可能需要输入GitHub用户名和密码"
        echo "（密码可以使用Personal Access Token）"
        echo ""
        git push -u origin main
        ;;
    2)
        echo ""
        echo "🛠️ 使用GitHub CLI..."
        if command -v gh &> /dev/null; then
            echo "GitHub CLI已安装"
            gh auth status
            git push -u origin main
        else
            echo "GitHub CLI未安装"
            echo "安装方法：brew install gh 或访问 https://cli.github.com"
        fi
        ;;
    3)
        echo ""
        echo "📝 推送命令："
        echo ""
        echo "cd \"/Users/lxx/Documents/medical-career-test-deploy\""
        echo "git push -u origin main"
        echo ""
        echo "🔑 如果需要使用Token："
        echo "git push https://zyzxznz:你的Token@github.com/zyzxznz/medical-career-test-2026-4-14.git main"
        echo ""
        echo "💡 生成Token：https://github.com/settings/tokens"
        ;;
    4)
        echo ""
        echo "📚 打开详细指南..."
        open "PUSH_GUIDE.md"
        ;;
    5)
        echo ""
        echo "🌐 Netlify拖拽上传："
        echo "1. 访问 https://app.netlify.com/drop"
        echo "2. 打开Finder"
        echo "3. 拖拽这个文件夹：/Users/lxx/Documents/medical-career-test-deploy"
        echo "4. 等待几秒钟"
        echo "5. 获得免费网址"
        echo ""
        read -p "按回车键打开Netlify..." key
        open "https://app.netlify.com/drop"
        ;;
    *)
        echo "无效选项"
        ;;
esac

echo ""
echo "✅ 操作完成！"
echo ""
echo "🌍 推送成功后："
echo "1. 访问 https://github.com/zyzxznz/medical-career-test-2026-4-14"
echo "2. 点击 Settings → Pages"
echo "3. 选择 main 分支，/ (root) 文件夹"
echo "4. 点击 Save"
echo ""
echo "📱 网站地址：https://zyzxznz.github.io/medical-career-test-2026-4-14/"
echo ""

read -p "按回车键退出..."