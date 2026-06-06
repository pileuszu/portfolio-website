/**
 * i18n 데이터 무결성 테스트
 *
 * team 타입 프로젝트는 어떤 언어 JSON에서도 role 필드가 반드시 존재해야 합니다.
 * - en/projects.json : 소스 데이터 (role 필드 필수)
 * - ko/projects.json : 번역 오버라이드 (team 항목에 role 없으면 en으로 폴백되므로
 *                      ko에도 role이 있다면 값이 올바른지 확인)
 *
 * 실패 시: 해당 프로젝트 title을 출력하여 어느 항목이 문제인지 바로 알 수 있습니다.
 */

import enProjects from './en/projects.json'
import koProjects from './ko/projects.json'

type ProjectItem = { title?: string; type?: string; role?: string }

// en은 단일 소스 — team 항목은 반드시 role 포함
describe('i18n 무결성: en/projects.json', () => {
  const teamItems = (enProjects.items as ProjectItem[]).filter(
    (item) => item.type === 'team',
  )

  it('team 타입 프로젝트가 최소 1개 이상 존재해야 한다', () => {
    expect(teamItems.length).toBeGreaterThan(0)
  })

  teamItems.forEach((item) => {
    it(`[en] "${item.title}" — role 필드가 존재하고 비어있지 않아야 한다`, () => {
      expect(item.role).toBeDefined()
      expect(item.role!.trim().length).toBeGreaterThan(0)
    })
  })
})

// ko에 role이 있다면 빈 값이 아니어야 함
describe('i18n 무결성: ko/projects.json', () => {
  const enItems = enProjects.items as ProjectItem[]
  const koItems = koProjects.items as ProjectItem[]

  enItems.forEach((enItem, idx) => {
    if (enItem.type !== 'team') return
    const koItem = koItems[idx]
    if (!koItem || koItem.role === undefined) return // ko에 role 없으면 en 폴백 — 정상

    it(`[ko] "${enItem.title}" — ko에 role이 있다면 비어있지 않아야 한다`, () => {
      expect(koItem.role!.trim().length).toBeGreaterThan(0)
    })
  })
})
