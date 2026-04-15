#!/bin/bash

echo "🔄 Git推送本地更新到GitHub"
echo "=========================="
echo ""

echo "📁 项目：medical-career-test-deploy"
echo "🌐 仓库：https://github.com/zyzxznz/medical-career-test-2026-4-14"
echo ""

echo "🔍 当前状态："
git status
echo ""

echo "📦 本地提交记录："
git log --oneline -5
echo ""

echo "⚠️  注意：你昨天通过网页上传，今天本地有更新"
echo "需要处理可能的冲突"
echo ""

echo "🎯 选择推送策略："
echo "1. 强制推送（覆盖远程，推荐）"
echo "2. 先拉取再推送（合并更改）"
echo "3. 创建新分支推送"
echo ""

read -p "请输入选项 (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🚀 强制推送（覆盖远程）"
        echo "使用本地版本完全覆盖远程仓库"
        echo ""
        echo "需要GitHub认证："
        echo "- 用户名：zyzxznz"
        echo "- 密码：使用Personal Access Token"
        echo ""
        read -p "按回车键开始强制推送..." key
        
        echo "🔄 推送中..."
        git push -f origin main
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "🎉 强制推送成功！"
            echo "远程仓库已被本地版本覆盖"
        else
            echo ""
            echo "❌ 推送失败"
            echo "可能需要使用Token："
            echo "git push -f https://zyzxznz:你的Token@github.com/zyzxznz/medical-career-test-2026-4-14.git main"
        fi
        ;;
    2)
        echo ""
        echo "🔄 先拉取再推送"
        echo "尝试合并远程和本地更改"
        echo ""
        echo "步骤1：拉取远程更改"
        read -p "按回车键拉取远程仓库..." key
        
        git pull origin main --allow-unrelated-histories
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ 拉取成功"
            echo "步骤2：解决冲突（如果有）"
            git status
            
            echo ""
            echo "步骤3：提交合并"
            git add .
            git commit -m "合并远程和本地更改"
            
            echo ""
            echo "步骤4：推送"
            git push origin main
        else
            echo ""
            echo "❌ 拉取失败，使用强制推送"
            echo "git push -f origin main"
        fi
        ;;
    3)
        echo ""
        echo "🌿 创建新分支推送"
        echo "避免影响主分支"
        echo ""
        
        # 创建新分支
        git checkout -b update-$(date +%Y%m%d)
        
        echo "✅ 创建新分支：update-$(date +%Y%m%d)"
        echo ""
        echo "推送新分支到GitHub："
        git push -u origin update-$(date +%Y%m%d)
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "🎉 新分支推送成功！"
            echo "可以在GitHub上查看和合并"
            echo "分支：update-$(date +%Y%m%d)"
        fi
        
        # 切换回主分支
        git checkout main
        ;;
    *)
        echo "无效选项"
        ;;
esac

echo ""
echo "📋 本地文件清单："
ls -la | grep -v ".git" | head -15
echo "..."

echo ""
echo "💡 如果推送失败，备用方案："
echo "1. 使用GitHub网页上传更新文件"
echo "2. 使用GitHub Desktop"
echo "3. 使用其他部署平台（Vercel/Netlify）"
echo ""

echo "🔗 GitHub仓库：https://github.com/zyzxznz/medical-career-test-2026-4-14"
echo ""

read -p "按回车键退出..."