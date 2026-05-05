#!/bin/bash

echo "🔐 GitHub认证修复工具"
echo "====================="
echo ""

echo "❌ 问题：密码认证不被支持"
echo "💡 GitHub要求：SSH密钥 或 Personal Access Token"
echo ""

echo "🎯 选择修复方案："
echo "1. 使用GitHub网页上传（推荐，无需认证）"
echo "2. 生成Personal Access Token"
echo "3. 修复SSH密钥"
echo "4. 使用GitHub Desktop"
echo ""

read -p "请输入选项 (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🌐 GitHub网页上传"
        echo "1. 访问：https://github.com/zyzxznz/medical-career-test-2026-4-14"
        echo "2. 点击 'Add file' → 'Upload files'"
        echo "3. 拖拽这个文件夹：/Users/lxx/Documents/medical-career-test-deploy"
        echo "4. 点击 'Commit changes'"
        echo ""
        echo "✅ 优势：无需命令行，无需认证"
        echo ""
        read -p "按回车键打开GitHub仓库..." key
        open "https://github.com/zyzxznz/medical-career-test-2026-4-14"
        ;;
    2)
        echo ""
        echo "🔑 生成Personal Access Token"
        echo "1. 访问：https://github.com/settings/tokens"
        echo "2. 点击 'Generate new token (classic)'"
        echo "3. 勾选 'repo' 权限"
        echo "4. 点击 'Generate token'"
        echo "5. 立即复制Token（只显示一次！）"
        echo ""
        echo "📝 使用Token推送："
        echo "cd \"/Users/lxx/Documents/medical-career-test-deploy\""
        echo "git push https://zyzxznz:你的Token@github.com/zyzxznz/medical-career-test-2026-4-14.git main"
        echo ""
        read -p "按回车键打开Token生成页面..." key
        open "https://github.com/settings/tokens"
        ;;
    3)
        echo ""
        echo "🔐 修复SSH密钥"
        echo "1. 生成新的SSH密钥（无密码）："
        echo "   ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_new -N \"\""
        echo ""
        echo "2. 查看新公钥："
        echo "   cat ~/.ssh/id_ed25519_new.pub"
        echo ""
        echo "3. 添加到GitHub："
        echo "   访问：https://github.com/settings/keys"
        echo "   添加新公钥"
        echo ""
        echo "4. 测试连接："
        echo "   ssh -T git@github.com"
        echo ""
        echo "5. 配置Git："
        echo "   cd \"/Users/lxx/Documents/medical-career-test-deploy\""
        echo "   git remote set-url origin git@github.com:zyzxznz/medical-career-test-2026-4-14.git"
        echo ""
        read -p "按回车键开始生成SSH密钥..." key
        
        # 生成新SSH密钥
        ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_new -N "" -C "github-$(date +%Y%m%d)"
        
        echo ""
        echo "✅ 新SSH密钥已生成"
        echo "公钥内容（复制全部）："
        echo "========================================"
        cat ~/.ssh/id_ed25519_new.pub
        echo "========================================"
        echo ""
        echo "请添加到GitHub：https://github.com/settings/keys"
        ;;
    4)
        echo ""
        echo "🖥️ 使用GitHub Desktop"
        echo "1. 下载：https://desktop.github.com"
        echo "2. 安装并打开"
        echo "3. 添加本地仓库：/Users/lxx/Documents/medical-career-test-deploy"
        echo "4. 提交更改"
        echo "5. 推送（GUI界面处理认证）"
        echo ""
        echo "✅ 优势：图形界面，认证更简单"
        echo ""
        read -p "按回车键打开下载页面..." key
        open "https://desktop.github.com"
        ;;
    *)
        echo "无效选项"
        ;;
esac

echo ""
echo "📋 当前项目状态："
echo "- 文件夹：medical-career-test-deploy"
echo "- 文件数：29个"
echo "- 提交：7次"
echo "- 仓库：https://github.com/zyzxznz/medical-career-test-2026-4-14"
echo ""

echo "🎯 最简单推荐："
echo "1. 使用网页上传（选项1）"
echo "2. 或使用GitHub Desktop（选项4）"
echo ""

read -p "按回车键退出..."