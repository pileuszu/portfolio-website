/**
 * sanitize.ts
 *
 * 경량 HTML sanitizer 유틸리티.
 * dangerouslySetInnerHTML에 전달되는 HTML 문자열에서
 * XSS 공격에 사용될 수 있는 위험한 태그/속성을 제거합니다.
 *
 * 현재 데이터는 내부 JSON 파일에서만 오지만,
 * 향후 외부 API 연동 시에도 안전하게 사용할 수 있도록 적용합니다.
 *
 * 허용 태그: strong, em, br, ul, li, h3, p
 * 제거 태그: script, style, iframe, object, embed, form, input 등
 */

/** 허용할 인라인/블록 태그 목록 */
const ALLOWED_TAGS = new Set([
  'strong', 'em', 'b', 'i', 'u',
  'br', 'p',
  'ul', 'ol', 'li',
  'h3', 'h4',
  'span',
])

/** 위험한 속성 패턴 */
const DANGEROUS_ATTR_PATTERN = /\s(on\w+|href\s*=\s*["']?javascript:|src\s*=\s*["']?javascript:)[^>]*/gi

/** <script>, <style>, <iframe> 등 위험한 블록 태그 전체 제거 */
const DANGEROUS_TAG_PATTERN = /<(script|style|iframe|object|embed|form|input|button|link|meta|base)[^>]*>[\s\S]*?<\/\1>|<(script|style|iframe|object|embed|form|input|button|link|meta|base)[^>]*\/?>/gi

/** 허용 목록에 없는 태그의 속성 전체 제거 (태그 이름만 남김) */
const STRIP_ATTRS_PATTERN = /<(\w+)(\s[^>]*)?>/gi

/**
 * HTML 문자열에서 위험 요소를 제거하여 안전한 HTML 반환
 *
 * @param html - sanitize할 원본 HTML 문자열
 * @returns 안전하게 처리된 HTML 문자열
 *
 * @example
 * ```ts
 * sanitizeHtml('<strong>안전</strong><script>alert("xss")</script>')
 * // → '<strong>안전</strong>'
 * ```
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ''

  // 1. 위험한 블록 태그 전체 제거
  let safe = html.replace(DANGEROUS_TAG_PATTERN, '')

  // 2. 위험한 속성(onclick, onerror, javascript: href 등) 제거
  safe = safe.replace(DANGEROUS_ATTR_PATTERN, '')

  // 3. 허용 목록에 없는 태그는 속성을 제거하고 텍스트만 남김
  safe = safe.replace(STRIP_ATTRS_PATTERN, (match, tagName, _attrs) => {
    const lowerTag = tagName.toLowerCase()
    if (ALLOWED_TAGS.has(lowerTag)) {
      // 허용 태그는 태그 이름만 유지 (속성 제거)
      return `<${lowerTag}>`
    }
    // 허용되지 않는 태그는 완전 제거
    return ''
  })

  return safe
}
