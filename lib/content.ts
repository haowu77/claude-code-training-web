import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { generateHeadingId, removeCodeBlocks, isValidHeading } from './utils/markdown'

/**
 * 内容聚合器 - 读取并合并所有 Markdown 文件
 */

export interface ContentSection {
  id: string
  title: string
  content: string
  level: number // 1=H1, 2=H2, 3=H3, 4=H4
  children?: ContentSection[]
  parent?: string // 父章节 ID，用于面包屑导航
}

/**
 * 获取所有 Markdown 文件内容并按顺序合并
 */
export function getAllContent(): string {
  const contentDir = path.join(process.cwd(), 'content')

  // 定义读取顺序 - 只读取主教程文件
  const readOrder = [
    'Claude_Code_培训教程.md',
    // 移除目录遍历，所有内容已合并到主教程
    // '最佳实践',
    // '快速参考',
    // '示例配置',
  ]

  let allContent = ''

  for (const item of readOrder) {
    const itemPath = path.join(contentDir, item)

    if (fs.existsSync(itemPath)) {
      const stat = fs.statSync(itemPath)

      if (stat.isFile()) {
        // 读取文件
        try {
          const fileContent = fs.readFileSync(itemPath, 'utf-8')
          const { content } = matter(fileContent)
          allContent += content + '\n\n'
        } catch (error) {
          console.error(`Error reading file ${itemPath}:`, error)
        }
      } else if (stat.isDirectory()) {
        // 读取目录下所有 .md 文件
        const files = fs.readdirSync(itemPath)
          .filter(file => file.endsWith('.md'))
          .sort() // 按文件名排序

        for (const file of files) {
          const filePath = path.join(itemPath, file)
          try {
            const fileContent = fs.readFileSync(filePath, 'utf-8')
            const { content } = matter(fileContent)
            allContent += content + '\n\n'
          } catch (error) {
            console.error(`Error reading file ${filePath}:`, error)
          }
        }
      }
    }
  }

  return allContent
}

/**
 * 从内容中提取目录结构（支持 H1-H4 四级）
 * 改进版：移除代码块干扰，智能父节点查找
 */
export function extractTableOfContents(content: string): ContentSection[] {
  // 步骤 1：预处理 - 移除代码块，避免代码块中的 # 注释被误解析为标题
  const cleanContent = removeCodeBlocks(content)
  const lines = cleanContent.split('\n')

  const toc: ContentSection[] = []
  const stack: ContentSection[] = [] // 使用栈追踪当前层级

  // 辅助函数：创建章节对象
  const createSection = (title: string, level: number, parentId?: string): ContentSection => {
    const id = generateHeadingId(title) // 使用统一的 ID 生成函数
    return {
      id,
      title,
      content: '',
      level,
      children: [],
      parent: parentId,
    }
  }

  for (const line of lines) {
    // 步骤 2：使用统一的正则匹配 H1-H4
    const match = line.match(/^(#{1,4}) (.+)$/)
    if (!match) continue

    const level = match[1].length
    const title = match[2].trim()

    // 步骤 3：验证标题（过滤 "📋 目录" 等无效标题）
    if (!isValidHeading(title, level)) continue

    const section = createSection(title, level)

    if (level === 1) {
      // H1: 根节点
      toc.push(section)
      stack.length = 0
      stack.push(section)
    } else {
      // H2-H4: 智能父节点查找
      // 向后查找栈中最近的低层级标题作为父节点
      let parent: ContentSection | null = null
      let parentIndex = -1
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i] && stack[i].level < level) {
          parent = stack[i]
          parentIndex = i
          break
        }
      }

      if (parent) {
        // 找到父节点：添加为子节点
        section.parent = parent.id
        parent.children = parent.children || []
        parent.children.push(section)

        // 更新栈：保留到父节点位置，然后添加当前节点
        stack.length = parentIndex + 1
        stack.push(section)
      } else {
        // 未找到父节点：降级为根节点（理论上不应发生，除非文档从 H2 开始）
        console.warn(`No parent found for level ${level} heading: "${title}"`)
        toc.push(section)
        stack.length = 0
        stack.push(section)
      }
    }
  }

  return toc
}

/**
 * 为内容添加锚点 ID
 */
export function addAnchorIds(content: string): string {
  let idCounter = 0

  return content.replace(/^(#{1,2}) (.+)$/gm, (match, hashes, title) => {
    const id = `section-${idCounter++}`
    return `${hashes} <span id="${id}">${title}</span>`
  })
}
