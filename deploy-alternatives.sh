#!/bin/bash

echo "🚀 替代部署方案（无需GitHub）"
echo "============================="
echo ""

echo "📁 项目：医护职业转型测试系统"
echo "🔧 状态：GitHub连接失败，使用替代方案"
echo ""

echo "🎯 选择部署平台："
echo "1. Vercel（最快，推荐）"
echo "2. Cloudflare Pages"
echo "3. Netlify（备用）"
echo "4. 本地服务器 + ngrok（临时）"
echo "5. 打包文件分享"
echo "6. 检查网络问题"
echo ""

read -p "请输入选项 (1-6): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Vercel部署"
        echo "1. 访问 https://vercel.com/new"
        echo "2. 拖拽这个文件夹：/Users/lxx/Documents/medical-career-test-deploy"
        echo "3. 等待部署完成"
        echo "4. 获得网址：https://medical-career-test.vercel.app"
        echo ""
        read -p "按回车键打开Vercel..." key
        open "https://vercel.com/new"
        ;;
    2)
        echo ""
        echo "☁️ Cloudflare Pages"
        echo "1. 访问 https://pages.cloudflare.com"
        echo "2. 创建项目，拖拽文件夹"
        echo "3. 获得网址：https://medical-career-test.pages.dev"
        echo ""
        read -p "按回车键打开Cloudflare..." key
        open "https://pages.cloudflare.com"
        ;;
    3)
        echo ""
        echo "🌐 Netlify部署"
        echo "1. 访问 https://app.netlify.com/drop"
        echo "2. 拖拽文件夹"
        echo "3. 获得网址：https://medical-career-test-xxxx.netlify.app"
        echo ""
        read -p "按回车键打开Netlify..." key
        open "https://app.netlify.com/drop"
        ;;
    4)
        echo ""
        echo "💻 本地服务器 + ngrok（临时）"
        echo "需要安装：python3 和 ngrok"
        echo ""
        echo "步骤1：启动本地服务器"
        echo "cd \"/Users/lxx/Documents/medical-career-test-deploy\""
        echo "python3 -m http.server 8000"
        echo ""
        echo "步骤2：在另一个终端运行"
        echo "ngrok http 8000"
        echo ""
        echo "步骤3：获得临时网址（如 https://xxxx.ngrok.io）"
        echo "有效期：2小时"
        echo ""
        echo "💡 适合临时演示和测试"
        ;;
    5)
        echo ""
        echo "📦 打包文件分享"
        echo "创建ZIP包，通过微信/邮件分享："
        echo ""
        echo "cd \"/Users/lxx/Documents\""
        echo "zip -r medical-career-test.zip medical-career-test-deploy/"
        echo ""
        echo "✅ 打包完成：medical-career-test.zip"
        echo "大小：约 100KB"
        echo ""
        echo "📤 分享方式："
        echo "1. 微信文件传输"
        echo "2. 邮件附件"
        echo "3. 网盘分享"
        echo ""
        echo "📝 使用说明："
        echo "接收者解压后，双击 index.html 即可运行"
        ;;
    6)
        echo ""
        echo "🔧 网络诊断"
        echo "运行网络检查脚本："
        echo "./network-check.sh"
        echo ""
        echo "💡 常见解决方案："
        echo "1. 重启路由器"
        echo "2. 切换到手机热点"
        echo "3. 关闭VPN/代理"
        echo "4. 等待网络恢复"
        ;;
    *)
        echo "无效选项"
        ;;
esac

echo ""
echo "📋 项目信息："
echo "- 名称：医护职业转型测试系统"
echo "- 主题：浅蓝色"
echo "- 包含：测试页面、女性互助项目介绍"
echo "- 联系方式：微信ID：zyzxznz2021"
echo ""

echo "🎪 最简单推荐："
echo "1. 使用 Vercel（选项1）"
echo "2. 或 Netlify（选项3）"
echo "3. 30秒获得可分享链接"
echo ""

read -p "按回车键退出..."