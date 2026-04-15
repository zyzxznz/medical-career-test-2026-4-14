#!/bin/bash

echo "📤 GitHub上传助手"
echo "======================"
echo ""
echo "这个脚本会帮你准备上传到GitHub的文件。"
echo ""

echo "📁 你的项目文件夹："
echo "/Users/lxx/Documents/medical-career-test-deploy/"
echo ""
echo "📋 包含以下文件："
ls -la "/Users/lxx/Documents/medical-career-test-deploy/"
echo ""

echo "🎯 选择上传方法："
echo "1. 使用GitHub网页上传（新手推荐）"
echo "2. 使用Git命令（需要安装Git）"
echo "3. 使用Netlify拖拽（最简单！）"
echo "4. 查看详细步骤"
echo ""
read -p "请输入选项 (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🌐 GitHub网页上传步骤："
        echo "1. 访问 https://github.com"
        echo "2. 点击 '+' → 'New repository'"
        echo "3. 仓库名: medical-career-test"
        echo "4. 不要勾选 'Initialize with README'"
        echo "5. 点击 'Create repository'"
        echo "6. 点击 'uploading an existing file'"
        echo "7. 上传以下文件（一次选择多个）："
        echo "   - index.html"
        echo "   - test-local.html"
        echo "   - deploy.sh"
        echo "   - DEPLOYMENT_GUIDE.md"
        echo "   - README.md"
        echo "   - QUICK_START.md"
        echo "8. 点击 'Commit changes'"
        echo "9. 点击 'Create new file'"
        echo "10. 输入 'css/style.css'"
        echo "11. 复制css/style.css内容"
        echo "12. 点击 'Commit new file'"
        echo "13. 重复9-12上传js/文件夹内容"
        echo ""
        ;;
    2)
        echo ""
        echo "💻 Git命令上传："
        echo "1. 确保已安装Git：git --version"
        echo "2. 执行以下命令："
        echo ""
        echo "cd /Users/lxx/Documents/medical-career-test-deploy"
        echo "git init"
        echo "git add ."
        echo "git commit -m '初始提交'"
        echo "git branch -M main"
        echo "git remote add origin https://github.com/你的用户名/medical-career-test.git"
        echo "git push -u origin main"
        echo ""
        ;;
    3)
        echo ""
        echo "🚀 Netlify拖拽上传（推荐！）："
        echo "1. 打开 https://app.netlify.com/drop"
        echo "2. 打开Finder，找到："
        echo "   /Users/lxx/Documents/medical-career-test-deploy"
        echo "3. 拖拽整个文件夹到Netlify页面"
        echo "4. 等待几秒钟"
        echo "5. 获得免费网址：https://xxxxxx.netlify.app"
        echo ""
        ;;
    4)
        echo ""
        echo "📚 详细步骤："
        echo "打开这个文件查看完整指南："
        echo "/Users/lxx/Documents/medical-career-test-deploy/DEPLOYMENT_GUIDE.md"
        echo ""
        open "/Users/lxx/Documents/medical-career-test-deploy/DEPLOYMENT_GUIDE.md"
        ;;
    *)
        echo "无效选项"
        ;;
esac

echo ""
echo "✅ 完成！按回车键退出..."
read