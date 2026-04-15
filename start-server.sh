#!/bin/bash

# 医护职业转型测试系统 - 本地服务器启动脚本
# 作者：医护职业发展互助项目
# 日期：2026年4月15日

echo "=========================================="
echo "医护职业转型测试系统 - 本地服务器"
echo "=========================================="
echo ""

# 检查Python版本
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "错误：未找到Python，请先安装Python"
    exit 1
fi

# 检查是否安装了http.server模块
$PYTHON_CMD -c "import http.server" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "错误：Python的http.server模块不可用"
    exit 1
fi

# 获取当前目录
CURRENT_DIR="$(pwd)"
echo "当前目录: $CURRENT_DIR"
echo ""

# 显示可用文件
echo "可用文件:"
echo "1. index-light-blue-enhanced.html - 增强版测试系统（推荐）"
echo "2. index-light-blue.html - 基础版测试系统"
echo "3. enhanced-report.html - 完整增强报告页面"
echo "4. demo-enhanced-report.html - 增强报告演示页面"
echo ""

# 启动服务器
echo "启动本地服务器..."
echo "服务器地址: http://localhost:8080"
echo "按 Ctrl+C 停止服务器"
echo ""

# 启动Python HTTP服务器
$PYTHON_CMD -m http.server 8080