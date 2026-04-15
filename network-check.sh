#!/bin/bash

echo "🌐 网络连接诊断"
echo "================"
echo ""

echo "🔍 检查GitHub连接..."
echo "1. Ping测试："
ping -c 3 github.com 2>/dev/null || echo "Ping失败"

echo ""
echo "2. HTTPS连接测试："
curl -I --connect-timeout 10 https://github.com 2>/dev/null | head -5

echo ""
echo "3. SSH连接测试："
ssh -T git@github.com 2>&1 | head -5

echo ""
echo "4. 检查代理设置："
echo "HTTP代理: $http_proxy"
echo "HTTPS代理: $https_proxy"
echo "无代理: $no_proxy"

echo ""
echo "5. 检查DNS："
nslookup github.com 2>/dev/null | head -5

echo ""
echo "🎯 解决方案："
echo ""
echo "A. 使用Netlify拖拽（推荐）"
echo "   1. 访问 https://app.netlify.com/drop"
echo "   2. 拖拽这个文件夹上传"
echo "   3. 立即获得免费网址"
echo ""
echo "B. 切换到手机热点"
echo "   1. 关闭当前WiFi"
echo "   2. 开启手机热点"
echo "   3. 连接手机热点"
echo "   4. 重新尝试推送"
echo ""
echo "C. 使用GitHub Desktop"
echo "   1. 下载 https://desktop.github.com"
echo "   2. 添加本地仓库"
echo "   3. 使用GUI推送"
echo ""
echo "D. 等待网络恢复"
echo "   1. 重启路由器"
echo "   2. 等待5分钟"
echo "   3. 重新尝试"

echo ""
read -p "按回车键打开Netlify拖拽页面..." key
open "https://app.netlify.com/drop"

echo ""
echo "💡 Netlify优势："
echo "- 无需GitHub账号"
echo "- 无需网络认证"
echo "- 30秒完成部署"
echo "- 免费SSL证书"
echo "- 自动部署"
echo ""
echo "🌐 你的网站将类似：https://medical-career-test-xxxx.netlify.app"
echo ""

read -p "按回车键退出..."