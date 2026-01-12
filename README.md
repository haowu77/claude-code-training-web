# Claude Code 培训网站

> 一个 Neo-Brutalism 风格的静态文档网站，展示 Claude Code 完整培训教程

## 项目特点

- **Neo-Brutalism 设计风格** - 粗黑边框、硬阴影、大胆配色
- **单页滚动布局** - 所有内容在一个页面，流畅的阅读体验
- **全文搜索** - 使用 FlexSearch 实现快速的客户端搜索
- **深浅色主题** - 自动适配系统主题，支持手动切换
- **响应式设计** - 完美支持桌面端和移动端
- **静态导出** - 无需服务器，可部署到任何静态托管平台

## 技术栈

- **框架**: Next.js 14 (App Router) + Static Export
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **Markdown 渲染**: Marked.js
- **代码高亮**: Shiki
- **全文搜索**: FlexSearch
- **主题管理**: next-themes
- **图标库**: Lucide React
- **字体**: Inter + JetBrains Mono

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
npm run build
```

静态文件将生成在 `out/` 目录中。

## 项目结构

```
claude-code-training-web/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 主页（服务端组件）
│   ├── ClientPage.tsx       # 客户端页面组件
│   └── globals.css          # 全局样式 + Neo-Brutalism
├── components/              # React 组件
│   ├── Header.tsx          # 顶部导航栏
│   ├── Sidebar.tsx         # 左侧目录导航
│   ├── TableOfContents.tsx # 右侧锚点导航
│   ├── MarkdownContent.tsx # Markdown 渲染器
│   ├── CodeBlock.tsx       # 代码块高亮
│   ├── SearchBar.tsx       # 搜索组件
│   └── ThemeToggle.tsx     # 主题切换
├── lib/                     # 工具库
│   ├── content.ts          # 内容聚合
│   ├── markdown.ts         # Markdown 解析
│   └── search.ts           # 搜索引擎
├── content/                 # Markdown 内容文件
│   ├── Claude_Code_培训教程.md
│   ├── 最佳实践/
│   ├── 快速参考/
│   └── 示例配置/
├── public/                  # 静态资源
├── out/                     # 构建输出（生成）
├── next.config.js          # Next.js 配置
├── tailwind.config.ts      # Tailwind 配置
└── package.json            # 依赖配置
```

## 部署

查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取详细的部署指南。

### 快速部署到 Vercel

1. 推送代码到 GitHub
2. 在 [Vercel](https://vercel.com) 导入仓库
3. 自动部署完成

## 更新内容

要更新培训内容：

1. 编辑 `content/` 目录下的 Markdown 文件
2. 运行 `npm run build` 重新构建
3. 重新部署

## 设计系统

### 配色方案

**浅色主题（默认）：**
- 背景：#F5F0E8 (米白色)
- 卡片：#FFFFFF
- 主色：#F5A962 (橙黄色)
- 强调：#CC785C (深橙色)

**深色主题：**
- 背景：#1A1715
- 卡片：#2A2420
- 主色：#F5A962
- 强调：#FFCB9A

### Neo-Brutalism 特征

- 3-4px 粗黑边框
- 4px 硬阴影（无模糊）
- 扁平但有层次的设计
- 大胆的颜色对比

## 性能优化

- 静态 HTML 预渲染
- CSS 和 JavaScript 自动压缩
- 代码分割和懒加载
- 图片优化
- 字体优化
- 搜索索引在客户端构建

## 浏览器支持

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- 移动浏览器

## 开发工具

- **ESLint** - 代码质量检查
- **TypeScript** - 类型安全
- **Prettier** - 代码格式化（推荐）

## 许可证

Copyright © 2025. All rights reserved.

## 联系方式

如有问题或建议，欢迎提交 Issue。
