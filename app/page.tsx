'use client'

import Link from 'next/link'
import { Terminal, Cpu, Network, Rocket } from 'lucide-react'
import { ReactNode, useState } from 'react'

interface Module {
  id: number
  title: string
  description: string
  items: string[]
  icon: ReactNode
}

interface FAQItem {
  question: string
  answer: string
}

const modules: Module[] = [
  {
    id: 1,
    title: "Claude Code CLI 深度体感",
    description: "从资深开发者视角，分享如何将 CLI 变成身体的一部分，而非简单的工具。",
    icon: <Terminal className="w-6 h-6" />,
    items: [
      "/指令集熟练掌握：从常规操作到复杂组合技的实战体感",
      "上下文管理艺术：如何「喂」给 AI 最精准的代码片段",
      "交互式 Diff 审查：我如何把控 AI 对核心逻辑的每一处修改",
      "终端环境美化与效率优化：极致的开发仪式感"
    ]
  },
  {
    id: 2,
    title: "Claude 进阶用法与自动化闭环",
    description: "探索 MCP、Subagent、Hooks 等进阶机制，看 AI 如何自主思考并完成修复循环。",
    icon: <Network className="w-6 h-6" />,
    items: [
      "Agentic Loop 深度应用：感受「自动循环执行」带来的震撼",
      "MCP 协议实战：连接你的数据库、API 和私有文档库",
      "官方工具链 vs 第三方插件：我是如何做选型的",
      "闭环反馈流：让 AI 在执行、报错、修复中完成自主进化"
    ]
  },
  {
    id: 3,
    title: "AI-Native 开发范式重构",
    description: "分享我是如何从「写代码的人」转变为「指挥 AI 架构的人」。",
    icon: <Cpu className="w-6 h-6" />,
    items: [
      "Agentic Workflow：构建能自主完成任务的 AI 程序员",
      "大规模重构实战：一人完成原本需要一个小组的迁移任务",
      "避坑指南：哪些场景 Claude 会「翻车」，如何优雅绕过",
      "Prompt 到 Execution：如何定义高成功率的任务指令"
    ]
  },
  {
    id: 4,
    title: "结对陪跑与实际问题解决",
    description: "不是讲课，是陪你解决业务中的顽疾。直接在你的项目里见真章。",
    icon: <Rocket className="w-6 h-6" />,
    items: [
      "真实项目结对：针对你的业务代码进行现场重构与开发",
      "复杂 Bug 联合会诊：利用 Claude Code 的搜索与编辑能力快速破局",
      "工程化提效方案：为你的团队定制 AI 协作规范",
      "24/7 同行交流：分享最新的 AI 工具情报与技术趋势"
    ]
  }
]

const faqs: FAQItem[] = [
  {
    question: "这和网上的教程有什么区别？",
    answer: "我不是全职讲师，我是一名每天都在写代码的开发者。网上的教程多是功能介绍，我分享的是「体感」和「避坑指南」。我会告诉你哪些指令在复杂业务里没用，哪些组合技能让你效率翻倍。"
  },
  {
    question: "什么是「Agentic Loop」功能？",
    answer: "这是 Claude Code 的核心能力。它允许 AI 像人一样，运行代码、看报错、改代码、再运行，直到成功。这标志着从「对话式 AI」向「执行式 Agent」的跨越，我会带你深度玩转这个闭环。"
  },
  {
    question: "我的项目代码很旧/很乱，也能用吗？",
    answer: "这正是我最擅长的。我会分享如何利用 Claude 的分析能力，在不破坏现有业务的前提下，通过 MCP 接入文档，一步步把旧项目「微创手术式」地重构成现代架构。"
  }
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen selection:bg-amber-500 selection:text-black">
      {/* Header / Nav */}
      <nav className="fixed top-0 w-full z-50 glass-card px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-black">C</div>
          <span className="font-bold text-xl tracking-tight">ClaudeCode<span className="text-amber-500">Insights</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
          <a href="#curriculum" className="hover:text-amber-500 transition-colors">实战分享</a>
          <a href="#faq" className="hover:text-amber-500 transition-colors">常见问题</a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/docs"
            className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-zinc-200 transition-all transform hover:scale-105 active:scale-95"
          >
            开始学习
          </Link>
          <button className="bg-amber-500 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-amber-400 transition-all transform hover:scale-105 active:scale-95">
            邀约交流
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest">
          200+ 页教程 · 真实软件开发团队实战验证
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
          从资深开发者视角的<br />
          <span className="gradient-text">Claude Code </span>实战内参
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          不谈虚构的案例，只谈真实的工作流。从命令行熟练度到 <span className="text-white border-b border-amber-500">MCP 服务器</span>、<span className="text-white border-b border-amber-500">Subagent</span>、<span className="text-white border-b border-amber-500">Plugin</span> 等高级特性，分享我如何在真实业务中让生产力产生质变。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/docs"
            className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-zinc-200 transition-all inline-block"
          >
            开始学习教程
          </Link>
          <button className="glass-card px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-all">
            预约实战陪跑
          </button>
        </div>
      </section>

      {/* Why Vibe Coding Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest">
            行业趋势 · 2025
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">为什么企业需要拥抱 <span className="gradient-text">Vibe Coding</span></h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">AI 编程正在重塑软件开发行业，数据说明一切。</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="text-4xl font-black gradient-text mb-2">$1B+</div>
            <div className="text-zinc-400 text-sm">Claude Code 年化收入</div>
            <div className="text-zinc-600 text-xs mt-1">Anthropic 2025 财报</div>
          </div>
          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="text-4xl font-black gradient-text mb-2">50%+</div>
            <div className="text-zinc-400 text-sm">AI 编程市场份额</div>
            <div className="text-zinc-600 text-xs mt-1">超越 GitHub Copilot</div>
          </div>
          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="text-4xl font-black gradient-text mb-2">95%</div>
            <div className="text-zinc-400 text-sm">代码由 AI 生成</div>
            <div className="text-zinc-600 text-xs mt-1">Y Combinator 创业公司</div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl border-l-4 border-amber-500">
          <blockquote className="text-lg text-zinc-300 leading-relaxed mb-4">
            "我们看到越来越多的初创公司，只有少数几个工程师就能运营数百万美元的业务。AI 编程工具让小团队拥有了大公司的生产力。"
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-black text-sm">YC</div>
            <div>
              <div className="font-semibold text-white">Y Combinator</div>
              <div className="text-zinc-500 text-sm">2025 创业趋势报告</div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Outline */}
      <section id="curriculum" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">实战分享内容</h2>
            <p className="text-zinc-500">这是我近半年在多个复杂项目中使用 Claude 的心得结晶。</p>
          </div>
          <div className="hidden md:block h-px flex-1 mx-10 bg-zinc-800"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {modules.map((module) => (
            <div key={module.id} className="glass-card p-8 rounded-3xl hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                {module.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{module.title}</h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">{module.description}</p>
              <ul className="space-y-3">
                {module.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">关于分享的一些细节</h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl border-l-4 border-amber-500 cursor-pointer"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <h3 className="text-lg font-bold mb-3 flex items-center justify-between">
                {faq.question}
                <span className={`text-amber-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </h3>
              <div className={`text-zinc-400 leading-relaxed overflow-hidden transition-all ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest">
            真实案例
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">使用 Claude Code 构建的产品</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">这些都是真实上线的产品，从想法到发布，AI 辅助开发让一切变得更快。</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <a href="https://innovator.video" target="_blank" rel="noopener noreferrer" className="group">
            <div className="glass-card rounded-xl overflow-hidden hover:border-amber-500/50 transition-all">
              <img src="/cases/innovator-video.png" alt="Innovator Video" className="w-full aspect-video object-cover object-top" />
              <div className="p-3">
                <div className="text-sm font-semibold group-hover:text-amber-500 transition-colors">Innovator Video</div>
                <div className="text-xs text-zinc-500">AI 视频生成</div>
              </div>
            </div>
          </a>
          <a href="https://www.sidewalksocial.ai/" target="_blank" rel="noopener noreferrer" className="group">
            <div className="glass-card rounded-xl overflow-hidden hover:border-amber-500/50 transition-all">
              <img src="/cases/sidewalk-social.png" alt="Sidewalk Social" className="w-full aspect-video object-cover object-top" />
              <div className="p-3">
                <div className="text-sm font-semibold group-hover:text-amber-500 transition-colors">Sidewalk Social</div>
                <div className="text-xs text-zinc-500">社媒内容生成</div>
              </div>
            </div>
          </a>
          <a href="https://www.lingua-sync.app/" target="_blank" rel="noopener noreferrer" className="group">
            <div className="glass-card rounded-xl overflow-hidden hover:border-amber-500/50 transition-all">
              <img src="/cases/lingua-sync.png" alt="Lingua Sync" className="w-full aspect-video object-cover object-top" />
              <div className="p-3">
                <div className="text-sm font-semibold group-hover:text-amber-500 transition-colors">Lingua Sync</div>
                <div className="text-xs text-zinc-500">视频本地化</div>
              </div>
            </div>
          </a>
          <a href="https://decidemeal.vercel.app/" target="_blank" rel="noopener noreferrer" className="group">
            <div className="glass-card rounded-xl overflow-hidden hover:border-amber-500/50 transition-all">
              <img src="/cases/decidemeal.png" alt="Decide Meal" className="w-full aspect-video object-cover object-top" />
              <div className="p-3">
                <div className="text-sm font-semibold group-hover:text-amber-500 transition-colors">Decide Meal</div>
                <div className="text-xs text-zinc-500">AI 餐饮推荐</div>
              </div>
            </div>
          </a>
          <a href="https://wordrefiner.vercel.app/" target="_blank" rel="noopener noreferrer" className="group">
            <div className="glass-card rounded-xl overflow-hidden hover:border-amber-500/50 transition-all">
              <img src="/cases/wordrefiner.png" alt="Word Refiner" className="w-full aspect-video object-cover object-top" />
              <div className="p-3">
                <div className="text-sm font-semibold group-hover:text-amber-500 transition-colors">Say It Better</div>
                <div className="text-xs text-zinc-500">沟通助手</div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-20 px-6 text-center border-t border-zinc-900">
        <h2 className="text-4xl font-black mb-4 italic">"AI 不会写出完美的架构，但它能帮你更快地抵达。"</h2>
        <p className="text-zinc-500 mb-10 max-w-lg mx-auto">不论是个人开发者还是团队负责人，欢迎预约一次深度的实战分享。</p>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/docs"
              className="bg-white text-black px-12 py-5 rounded-2xl font-bold text-xl hover:bg-zinc-200 transition-all inline-block"
            >
              开始学习教程
            </Link>
            <button className="bg-amber-500 text-black px-12 py-5 rounded-2xl font-bold text-xl hover:bg-amber-400 transition-all shadow-2xl shadow-amber-500/30 active:scale-95">
              即刻邀约交流
            </button>
          </div>
        </div>
        <div className="mt-24 text-xs text-zinc-700 uppercase tracking-[0.2em]">
          <p>© 2025 CLAUDE CODE 实战培训. BY DEVELOPERS FOR DEVELOPERS.</p>
        </div>
      </footer>
    </div>
  )
}
