/**
 * Markdown 解析工具
 */

import { generateHeadingId, removeCodeBlocks, isValidHeading } from './utils/markdown'

export interface HeadingNode {
  id: string
  text: string
  level: number
}

/**
 * 从 Markdown 内容中提取所有标题
 * @param content Markdown 内容
 * @returns 标题列表
 */
export function extractHeadings(content: string): HeadingNode[] {
  // 步骤 1：预处理 - 移除代码块
  const cleanContent = removeCodeBlocks(content)
  const headings: HeadingNode[] = []
  const lines = cleanContent.split('\n')

  for (const line of lines) {
    // 匹配 H1, H2, H3 标题
    const match = line.match(/^(#{1,3}) (.+)$/)

    if (match) {
      const level = match[1].length
      const text = match[2].trim()

      // 步骤 2：验证标题
      if (!isValidHeading(text, level)) continue

      // 步骤 3：使用统一的 ID 生成函数
      const id = generateHeadingId(text)

      headings.push({
        id,
        text,
        level,
      })
    }
  }

  return headings
}

/**
 * 生成标题的 slug（用于锚点）
 * @param text 标题文本
 * @returns slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-') // 保留中文字符
    .replace(/^-+|-+$/g, '')
}

/**
 * 为 Markdown 内容添加锚点 ID
 * @param content Markdown 内容
 * @returns 添加了锚点的内容
 */
export function addHeadingIds(content: string): string {
  let idCounter = 0

  return content.replace(/^(#{1,3}) (.+)$/gm, (match, hashes, text) => {
    const id = `heading-${idCounter++}`
    const slug = generateSlug(text)
    return `${hashes} <span id="${id}" data-slug="${slug}">${text}</span>`
  })
}

/**
 * 将 Markdown 内容分割成多个部分（按 H1 分割）
 * @param content Markdown 内容
 * @returns 内容部分数组
 */
export function splitContentBySections(content: string): Array<{
  id: string
  title: string
  content: string
}> {
  const sections: Array<{ id: string; title: string; content: string }> = []
  const lines = content.split('\n')

  let currentSection: { id: string; title: string; content: string } | null = null
  let idCounter = 0

  for (const line of lines) {
    const h1Match = line.match(/^# (.+)$/)

    if (h1Match) {
      // 保存上一个 section
      if (currentSection) {
        sections.push(currentSection)
      }

      // 创建新 section
      const title = h1Match[1].trim()
      currentSection = {
        id: `section-${idCounter++}`,
        title,
        content: line + '\n',
      }
    } else if (currentSection) {
      currentSection.content += line + '\n'
    }
  }

  // 保存最后一个 section
  if (currentSection) {
    sections.push(currentSection)
  }

  return sections
}
