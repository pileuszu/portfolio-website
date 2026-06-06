/**
 * i18n 데이터 로더
 *
 * - en/ : 모든 필드 포함 (단독 소스). 새 프로젝트/경력 추가 시 여기만 편집.
 * - ko/ : 번역 텍스트만 보유. 누락된 필드는 en 값으로 자동 폴백.
 *
 * 병합 규칙: { ...enItem, ...koItem }
 * → ko에 없는 필드(images, tech, links 등)는 en에서 가져옴.
 */

import type { I18nData, ProjectItem, ExperienceItem, AboutItem, ContactItem } from '@/types'

// ── EN (모든 필드 포함 — 단일 소스) ──────────────────────────────────────
import enOverview   from './en/overview.json'
import enAbout      from './en/about.json'
import enExperience from './en/experience.json'
import enProjects   from './en/projects.json'
import enContact    from './en/contact.json'

// ── KO (번역 텍스트만) ────────────────────────────────────────────────────
import koOverview   from './ko/overview.json'
import koAbout      from './ko/about.json'
import koExperience from './ko/experience.json'
import koProjects   from './ko/projects.json'
import koContact    from './ko/contact.json'

export type Language = 'en' | 'ko'

/** 배열 항목 수준 병합: ko 부분 오버라이드 → en 폴백 */
function mergeItems<T extends object>(enItems: T[], koItems: Partial<T>[]): T[] {
  return enItems.map((enItem, i) => ({ ...enItem, ...(koItems[i] ?? {}) }))
}



// ── Public API ────────────────────────────────────────────────────────────

/** 언어별 i18n 데이터 반환. ko는 en 기반으로 번역 필드만 오버라이드 */
export function getI18nData(lang: Language): I18nData {
  if (lang === 'en') {
    return {
      overview:   enOverview,
      about:      { title: enAbout.title, items: enAbout.items as AboutItem[], skills: enAbout.skills },
      experience: { title: enExperience.title, subtitle: enExperience.subtitle, items: enExperience.items as ExperienceItem[] },
      projects:   { title: enProjects.title,   subtitle: enProjects.subtitle,   items: enProjects.items as ProjectItem[] },
      contact:    { title: enContact.title,     items: enContact.items as ContactItem[] },
    }
  }

  // ko: en을 베이스로, ko 번역 필드 오버라이드
  // ko JSON에는 title/subtitle 없음 → en 값 폴백
  type PS<T> = { title?: string; subtitle?: string; items?: Partial<T>[] }
  const koA  = koAbout      as PS<AboutItem> & { skills?: string[] }
  const koE  = koExperience as PS<ExperienceItem>
  const koP  = koProjects as PS<ProjectItem>
  const koC  = koContact    as PS<ContactItem>

  return {
    overview: { ...enOverview, ...koOverview },
    about: {
      title: koA.title ?? enAbout.title,
      items: mergeItems(enAbout.items as AboutItem[], (koA.items ?? []) as Partial<AboutItem>[]),
      skills: koA.skills ?? enAbout.skills,
    },
    experience: {
      title:    koE.title    ?? enExperience.title,
      subtitle: koE.subtitle ?? enExperience.subtitle!,
      items:    mergeItems(enExperience.items as ExperienceItem[], (koE.items ?? []) as Partial<ExperienceItem>[]),
    },
    projects: {
      title:    koP.title    ?? enProjects.title,
      subtitle: koP.subtitle ?? enProjects.subtitle!,
      items:    mergeItems(enProjects.items as ProjectItem[], (koP.items ?? []) as Partial<ProjectItem>[]),
    },
    contact: {
      title: koC.title ?? enContact.title,
      items: mergeItems(enContact.items as ContactItem[], (koC.items ?? []) as Partial<ContactItem>[]),
    },
  }
}
