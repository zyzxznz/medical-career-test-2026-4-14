#!/bin/bash

echo "🚀 Netlify一键部署"
echo "=================="
echo ""

echo "📁 项目：医护职业转型测试系统"
echo "🎨 主题：浅蓝色版本"
echo "👥 项目介绍：女性医护职业发展互助"
echo ""

echo "🎯 Netlify优势："
echo "✅ 无需GitHub账号"
echo "✅ 无需网络认证"
echo "✅ 30秒完成部署"
echo "✅ 免费SSL证书"
echo "✅ 自动CDN加速"
echo "✅ 可自定义域名"
echo ""

echo "📋 部署文件："
ls -la | grep -E "\.(html|css|js|md|sh)$" | head -15
echo "..."

echo "🚀 部署步骤："
echo "1. 打开Netlify拖拽页面"
echo "2. 拖拽这个文件夹：/Users/lxx/Documents/medical-career-test-deploy"
echo "3. 等待上传完成"
echo "4. 获得免费网址"
echo ""

read -p "按回车键打开Netlify拖拽页面..." key

# 打开Netlify拖拽页面
open "https://app.netlify.com/drop"

echo ""
echo "🖱️ 操作指南："
echo "1. 在浏览器中，你会看到一个拖拽区域"
echo "2. 打开Finder，找到这个文件夹："
echo "   /Users/lxx/Documents/medical-career-test-deploy"
echo "3. 拖拽整个文件夹到浏览器中的拖拽区域"
echo "4. 等待上传进度条完成"
echo ""

echo "⏳ 上传完成后："
echo "1. Netlify会自动部署"
echo "2. 你会看到一个类似这样的网址："
echo "   https://medical-career-test-xxxx.netlify.app"
echo "3. 点击网址即可访问"
echo ""

echo "🔗 分享链接："
echo "将获得的Netlify链接分享给他人即可"
echo ""

echo "⚙️ 高级功能（可选）："
echo "1. 自定义域名：在Netlify设置中绑定自己的域名"
echo "2. 密码保护：添加访问密码"
echo "3. 表单处理：添加联系表单"
echo "4. 分析统计：查看访问数据"
echo ""

echo "📞 需要帮助？"
echo "1. 打开 test-local.html 查看交互式指南"
echo "2. 运行 deploy.sh 选择其他部署选项"
echo "3. 查看 DEPLOYMENT_GUIDE.md 详细指南"
echo ""

read -p "按回车键创建Netlify部署包..." key

# 创建ZIP包备用
echo "📦 创建部署包..."
zip -r medical-career-test-deploy.zip . -x "*.git*" "*.DS_Store" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ 部署包创建成功：medical-career-test-deploy.zip"
    echo "💡 你也可以上传这个ZIP文件到Netlify"
else
    echo "⚠️  ZIP创建失败，直接拖拽文件夹即可"
fi

echo ""
echo "🎉 现在去浏览器中拖拽文件夹吧！"
echo ""

read -p "部署完成后，按回车键退出..."