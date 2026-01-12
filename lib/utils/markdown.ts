/**
 * Markdown 共享工具函数库
 * 用于统一处理标题提取、代码块过滤和 ID 生成
 */

/**
 * 生成统一的标题 ID
 * 确保 TOC 提取和渲染使用相同的 ID 格式
 */
export function generateHeadingId(text: string): string {
  return `heading-${text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]/g, '')}`
}

/**
 * 移除 Markdown 内容中的所有代码块
 * 保留行号结构（用空行替换代码块内容）
 *
 * @param content - 原始 Markdown 内容
 * @returns 移除代码块后的内容
 */
export function removeCodeBlocks(content: string): string {
  let inCodeBlock = false
  const lines = content.split('\n')
  const filtered: string[] = []

  for (const line of lines) {
    // 检测代码块边界（支持带语言标识的 ``` 和不带的 ```）
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock
      filtered.push('') // 用空行替换，保留行号
      continue
    }

    if (inCodeBlock) {
      filtered.push('') // 代码块内的行全部替换为空行
    } else {
      filtered.push(line) // 保留代码块外的行
    }
  }

  return filtered.join('\n')
}

/**
 * 验证标题是否有效（应该被包含在 TOC 中）
 *
 * @param text - 标题文本
 * @param level - 标题级别 (1-4)
 * @returns 是否为有效标题
 */
export function isValidHeading(text: string, level: number): boolean {
  // 过滤 "📋 目录" 标记（这是 Markdown 中的目录索引，不需要在侧边栏显示）
  if (text.includes('📋') && text.includes('目录')) {
    return false
  }

  // 过滤空白标题
  if (!text.trim()) {
    return false
  }

  return true
}
