#!/bin/bash

# 医护职业转型测试系统 - 部署脚本
# 作者：AI助手
# 日期：2026-04-15

echo "🚀 医护职业转型测试系统部署脚本"
echo "======================================"

# 检查必要工具
check_tools() {
    echo "🔍 检查必要工具..."
    
    if ! command -v git &> /dev/null; then
        echo "❌ Git未安装，请先安装Git"
        echo "   macOS: brew install git"
        echo "   Ubuntu: sudo apt install git"
        exit 1
    fi
    
    echo "✅ Git已安装"
}

# 显示部署选项
show_options() {
    echo ""
    echo "📋 请选择部署方式："
    echo "1. GitHub Pages（推荐，完全免费）"
    echo "2. Netlify（简单拖拽，免费）"
    echo "3. Vercel（快速部署，免费）"
    echo "4. 本地测试"
    echo "5. 查看部署指南"
    echo "0. 退出"
    echo ""
    
    read -p "请输入选项编号 (0-5): " choice
    echo ""
    
    case $choice in
        1)
            deploy_github
            ;;
        2)
            deploy_netlify
            ;;
        3)
            deploy_vercel
            ;;
        4)
            local_test
            ;;
        5)
            show_guide
            ;;
        0)
            echo "👋 再见！"
            exit 0
            ;;
        *)
            echo "❌ 无效选项，请重新选择"
            show_options
            ;;
    esac
}

# GitHub Pages部署
deploy_github() {
    echo "🌐 GitHub Pages部署"
    echo "----------------------"
    
    echo "📝 请按照以下步骤操作："
    echo ""
    echo "1. 访问 https://github.com"
    echo "2. 注册/登录账号"
    echo "3. 点击右上角 '+' → 'New repository'"
    echo "4. 填写仓库信息："
    echo "   - Repository name: medical-career-test"
    echo "   - Description: 医护职业转型测试系统"
    echo "   - 选择 'Public'"
    echo "   - 不要勾选 'Initialize this repository with a README'"
    echo "5. 点击 'Create repository'"
    echo ""
    echo "📤 创建仓库后，请执行以下命令："
    echo ""
    echo "cd /Users/lxx/Documents/medical-career-test-deploy"
    echo "git remote add origin https://github.com/你的用户名/medical-career-test.git"
    echo "git branch -M main"
    echo "git push -u origin main"
    echo ""
    echo "⚙️ 然后启用GitHub Pages："
    echo "1. 在仓库页面点击 'Settings'"
    echo "2. 左侧菜单点击 'Pages'"
    echo "3. 在 'Source' 选择 'main' 分支"
    echo "4. 点击 'Save'"
    echo ""
    echo "⏳ 等待1-2分钟部署完成"
    echo "🌍 你的网站地址：https://你的用户名.github.io/medical-career-test/"
    echo ""
    
    read -p "按回车键返回主菜单..." key
    show_options
}

# Netlify部署
deploy_netlify() {
    echo "🌐 Netlify部署"
    echo "----------------"
    
    echo "📝 最简单的方法：拖拽上传"
    echo ""
    echo "1. 访问 https://app.netlify.com/drop"
    echo "2. 将以下文件夹拖到上传区域："
    echo "   /Users/lxx/Documents/medical-career-test-deploy"
    echo "3. 等待上传完成"
    echo "4. 立即获得免费网址：https://随机名称.netlify.app"
    echo ""
    echo "📁 或者通过GitHub连接："
    echo "1. 访问 https://netlify.com"
    echo "2. 注册/登录"
    echo "3. 点击 'Add new site' → 'Import an existing project'"
    echo "4. 选择GitHub，授权后选择你的仓库"
    echo "5. 点击 'Deploy site'"
    echo ""
    
    read -p "按回车键返回主菜单..." key
    show_options
}

# Vercel部署
deploy_vercel() {
    echo "🌐 Vercel部署"
    echo "---------------"
    
    echo "📝 快速部署步骤："
    echo ""
    echo "1. 访问 https://vercel.com"
    echo "2. 注册/登录（推荐使用GitHub账号）"
    echo "3. 点击 'Add New...' → 'Project'"
    echo "4. 导入你的GitHub仓库 'medical-career-test'"
    echo "5. 点击 'Deploy'"
    echo "6. 立即获得免费网址：https://medical-career-test.vercel.app"
    echo ""
    echo "📤 或者使用Vercel CLI："
    echo "npm i -g vercel"
    echo "cd /Users/lxx/Documents/medical-career-test-deploy"
    echo "vercel"
    echo ""
    
    read -p "按回车键返回主菜单..." key
    show_options
}

# 本地测试
local_test() {
    echo "💻 本地测试"
    echo "------------"
    
    echo "📂 项目文件位置："
    echo "/Users/lxx/Documents/medical-career-test-deploy/"
    echo ""
    echo "🖥️ 打开以下文件测试："
    echo "1. index.html - 主页面"
    echo "2. test-local.html - 部署指南页面"
    echo ""
    echo "🔧 测试方法："
    echo "- 双击文件在浏览器中打开"
    echo "- 或使用命令：open index.html"
    echo ""
    echo "✅ 测试要点："
    echo "1. 页面加载是否正常"
    echo "2. 表单是否可以填写"
    echo "3. 测试问题是否可以回答"
    echo "4. 结果页面是否可以显示"
    echo "5. 移动端显示是否正常"
    echo ""
    
    read -p "按回车键打开测试页面，或按Ctrl+C取消..." key
    open "/Users/lxx/Documents/medical-career-test-deploy/test-local.html"
    
    read -p "按回车键返回主菜单..." key
    show_options
}

# 显示部署指南
show_guide() {
    echo "📚 部署指南"
    echo "------------"
    
    echo "📄 详细部署指南位于："
    echo "/Users/lxx/Documents/medical-career-test-deploy/DEPLOYMENT_GUIDE.md"
    echo ""
    echo "📋 文件清单："
    echo "1. index.html - 主页面（浅蓝色主题）"
    echo "2. css/style.css - 样式文件"
    echo "3. js/app.js - JavaScript逻辑"
    echo "4. README.md - 项目说明"
    echo "5. DEPLOYMENT_GUIDE.md - 详细部署指南"
    echo "6. test-local.html - 本地测试页面"
    echo ""
    echo "🌐 部署后链接格式："
    echo "- GitHub Pages: https://用户名.github.io/medical-career-test/"
    echo "- Netlify: https://网站名.netlify.app"
    echo "- Vercel: https://medical-career-test.vercel.app"
    echo ""
    
    read -p "按回车键查看详细指南，或按Ctrl+C取消..." key
    open "/Users/lxx/Documents/medical-career-test-deploy/DEPLOYMENT_GUIDE.md"
    
    read -p "按回车键返回主菜单..." key
    show_options
}

# 主函数
main() {
    clear
    echo "======================================"
    echo "  医护职业转型测试系统部署工具"
    echo "======================================"
    echo ""
    echo "📁 项目位置：/Users/lxx/Documents/medical-career-test-deploy/"
    echo ""
    
    check_tools
    show_options
}

# 运行主函数
main