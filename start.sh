#!/bin/bash

# 医护职业转型测试系统 - 启动脚本

echo "========================================="
echo "  医护职业转型智能测试系统 v2.0"
echo "========================================="
echo ""

# 检查Python3是否可用
if command -v python3 &> /dev/null; then
    echo "✅ 检测到 Python3"
else
    echo "❌ 未检测到 Python3，请先安装 Python3"
    exit 1
fi

# 检查是否在项目目录
if [ ! -f "index.html" ]; then
    echo "❌ 请在项目目录中运行此脚本"
    exit 1
fi

echo ""
echo "请选择启动方式："
echo "1. 直接打开HTML文件（推荐）"
echo "2. 启动本地服务器（端口8000）"
echo "3. 查看系统信息"
echo "4. 退出"
echo ""

read -p "请输入选项 (1-4): " choice

case $choice in
    1)
        echo ""
        echo "正在打开系统..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open index.html
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open index.html
        else
            echo "请手动打开 index.html 文件"
        fi
        echo "✅ 系统已打开，请在浏览器中查看"
        ;;
    2)
        echo ""
        echo "启动本地服务器..."
        echo "访问地址: http://localhost:8000"
        echo "按 Ctrl+C 停止服务器"
        echo ""
        python3 -m http.server 8000
        ;;
    3)
        echo ""
        echo "系统信息："
        echo "----------------"
        echo "项目名称: 医护职业转型智能测试系统"
        echo "版本: 2.0.0"
        echo "开发日期: 2026-04-14"
        echo "文件数量: $(find . -type f -name "*.html" -o -name "*.css" -o -name "*.js" | wc -l) 个"
        echo "总代码行数: $(find . -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.md" \) -exec cat {} \; | wc -l) 行"
        echo ""
        echo "主要功能："
        echo "- 18个专业评估问题"
        echo "- 智能算法匹配"
        echo "- 个性化报告生成"
        echo "- 响应式界面设计"
        echo ""
        ;;
    4)
        echo "退出系统"
        exit 0
        ;;
    *)
        echo "无效选项，请重新运行脚本"
        exit 1
        ;;
esac

echo ""
echo "使用说明："
echo "1. 打开系统后，点击'开始智能测试'按钮"
echo "2. 按照提示完成18个评估问题"
echo "3. 查看个性化转型建议报告"
echo "4. 可下载或分享报告结果"
echo ""
echo "祝您使用愉快！"