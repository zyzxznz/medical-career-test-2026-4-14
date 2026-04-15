#!/bin/bash

echo "🌿 推送原始项目到GitHub分支"
echo "============================"
echo ""

echo "📁 原始项目：medical-career-test"
echo "🌐 仓库：https://github.com/zyzxznz/medical-career-test-2026-4-14"
echo "🌿 分支名：original-project"
echo ""

echo "🔍 当前状态："
git status
echo ""

echo "📦 提交记录："
git log --oneline -3
echo ""

echo "📋 文件清单（部分）："
ls -la | grep -E "\.(html|css|js|md|sh)$" | head -10
echo "..."

echo "🎯 推送方法选择："
echo "1. 使用GitHub网页创建分支（推荐）"
echo "2. 使用Personal Access Token推送"
echo "3. 使用GitHub Desktop"
echo ""

read -p "请输入选项 (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🌐 GitHub网页创建分支"
        echo "步骤："
        echo "1. 访问：https://github.com/zyzxznz/medical-career-test-2026-4-14"
        echo "2. 点击分支下拉菜单（main旁边）"
        echo "3. 输入新分支名：original-project"
        echo "4. 点击 'Create branch: original-project'"
        echo ""
        echo "5. 然后上传文件到新分支："
        echo "   - 切换到 original-project 分支"
        echo "   - 点击 'Add file' → 'Upload files'"
        echo "   - 上传这个文件夹的所有文件"
        echo ""
        read -p "按回车键打开GitHub仓库..." key
        open "https://github.com/zyzxznz/medical-career-test-2026-4-14"
        ;;
    2)
        echo ""
        echo "🔑 使用Personal Access Token"
        echo "1. 生成Token：https://github.com/settings/tokens"
        echo "2. 勾选 'repo' 权限"
        echo "3. 复制Token"
        echo ""
        read -p "粘贴你的Token: " token
        
        if [ -z "$token" ]; then
            echo "❌ Token不能为空"
            exit 1
        fi
        
        echo ""
        echo "🚀 推送中..."
        git push https://zyzxznz:${token}@github.com/zyzxznz/medical-career-test-2026-4-14.git original-project
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "🎉 推送成功！"
            echo "✅ 原始项目已推送到新分支"
            echo "🌿 分支：original-project"
            echo "🌍 查看：https://github.com/zyzxznz/medical-career-test-2026-4-14/tree/original-project"
        else
            echo ""
            echo "❌ 推送失败"
        fi
        ;;
    3)
        echo ""
        echo "🖥️ 使用GitHub Desktop"
        echo "1. 下载：https://desktop.github.com"
        echo "2. 添加这个文件夹：/Users/lxx/documents/medical-career-test"
        echo "3. 创建新分支：original-project"
        echo "4. 提交更改"
        echo "5. 推送到GitHub"
        echo ""
        read -p "按回车键打开下载页面..." key
        open "https://desktop.github.com"
        ;;
    *)
        echo "无效选项"
        ;;
esac

echo ""
echo "📊 原始项目信息："
echo "- 文件数：37个"
echo "- 包含：所有HTML版本、完整文档、数据文件"
echo "- 分支：original-project（完整版）"
echo "- 主分支：main（部署版）"
echo ""

echo "💡 分支用途："
echo "- original-project：完整原始项目（备份、参考）"
echo "- main：部署版本（精简、运行版）"
echo ""

read -p "按回车键退出..."