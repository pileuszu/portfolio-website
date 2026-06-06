/**
 * sanitizeHtml 유틸리티 단위 테스트
 */
import { sanitizeHtml } from '@/utils/sanitize'

describe('sanitizeHtml', () => {
  // 빈 입력
  it('빈 문자열을 반환해야 한다', () => {
    expect(sanitizeHtml('')).toBe('')
  })

  // 안전한 태그 허용
  it('허용된 태그(strong, em, br, ul, li, h3)는 유지해야 한다', () => {
    const input = '<strong>굵게</strong> <em>기울임</em> <br/>'
    const result = sanitizeHtml(input)
    expect(result).toContain('<strong>')
    expect(result).toContain('<em>')
    // sanitize는 self-closing <br/> 형태도 통과시킴
    expect(result).toMatch(/<br\/?>$/i)
  })

  // script 태그 제거
  it('<script> 태그를 완전히 제거해야 한다', () => {
    const xss = '<script>alert("XSS")</script>안전한 텍스트'
    const result = sanitizeHtml(xss)
    expect(result).not.toContain('<script>')
    expect(result).not.toContain('alert')
    expect(result).toContain('안전한 텍스트')
  })

  // iframe 제거
  it('<iframe> 태그를 제거해야 한다', () => {
    const input = '<iframe src="evil.com"></iframe>'
    const result = sanitizeHtml(input)
    expect(result).not.toContain('iframe')
  })

  // onclick 속성 제거
  it('onclick 이벤트 핸들러 속성을 제거해야 한다', () => {
    const input = '<div onclick="alert(1)">클릭</div>'
    const result = sanitizeHtml(input)
    expect(result).not.toContain('onclick')
  })

  // javascript: href 제거
  it('javascript: URL을 제거해야 한다', () => {
    const input = '<a href="javascript:void(0)">링크</a>'
    const result = sanitizeHtml(input)
    expect(result).not.toContain('javascript:')
  })

  // 일반 텍스트는 그대로
  it('HTML 태그 없는 일반 텍스트는 그대로 반환해야 한다', () => {
    const plain = 'Hello, World! 안녕하세요.'
    expect(sanitizeHtml(plain)).toBe(plain)
  })

  // 복합 케이스
  it('허용 태그와 금지 태그가 혼합된 경우 안전하게 처리해야 한다', () => {
    const mixed = '<strong>안전</strong><script>위험()</script><em>괜찮음</em>'
    const result = sanitizeHtml(mixed)
    expect(result).toContain('<strong>')
    expect(result).toContain('<em>')
    expect(result).not.toContain('위험()')
    expect(result).not.toContain('<script>')
  })
})
