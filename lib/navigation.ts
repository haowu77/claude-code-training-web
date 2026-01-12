import { ContentSection } from './content'

/**
 * 导航工具函数库
 */

/**
 * 在章节树中按 ID 查找章节
 */
export function findSectionById(
  sections: ContentSection[],
  id: string
): ContentSection | null {
  for (const section of sections) {
    if (section.id === id) return section

    if (section.children && section.children.length > 0) {
      const found = findSectionById(section.children, id)
      if (found) return found
    }
  }
  return null
}

/**
 * 构建从根到目标章节的面包屑路径
 */
export function buildBreadcrumbTrail(
  sections: ContentSection[],
  targetId: string
): ContentSection[] {
  const path: ContentSection[] = []

  function search(items: ContentSection[], ancestors: ContentSection[]): boolean {
    for (const item of items) {
      const newPath = [...ancestors, item]

      if (item.id === targetId) {
        path.push(...newPath)
        return true
      }

      if (item.children && item.children.length > 0) {
        if (search(item.children, newPath)) {
          return true
        }
      }
    }
    return false
  }

  search(sections, [])
  return path
}

/**
 * 将嵌套的章节树扁平化为一维数组
 */
export function flattenSections(sections: ContentSection[]): ContentSection[] {
  const flat: ContentSection[] = []

  function flatten(items: ContentSection[]) {
    for (const item of items) {
      flat.push(item)
      if (item.children && item.children.length > 0) {
        flatten(item.children)
      }
    }
  }

  flatten(sections)
  return flat
}

/**
 * 获取相邻的前后章节（用于上一章/下一章导航）
 */
export function getAdjacentSections(
  sections: ContentSection[],
  currentId: string
): { prev: ContentSection | null; next: ContentSection | null } {
  const flat = flattenSections(sections)
  const index = flat.findIndex(s => s.id === currentId)

  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null
  }
}

/**
 * 获取章节的所有祖先ID（用于展开侧边栏路径）
 */
export function getAncestorIds(
  sections: ContentSection[],
  targetId: string
): string[] {
  const trail = buildBreadcrumbTrail(sections, targetId)
  return trail.map(section => section.id)
}
