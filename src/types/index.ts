/** 프로젝트 링크 단위. type으로 아이콘/스타일 분기 */
export interface ProjectLink {
    /** 버튼에 표시할 텍스트 */
    label: string
    /** 이동할 URL */
    url: string
    /** 'github' | 'demo' | 'external' — 아이콘·스타일 분기용 */
    type?: 'github' | 'demo' | 'external'
}

export interface ProjectItem {
    // ── i18n이 덮어씌우는 텍스트 필드 (optional — projects.json에 없어도 됨) ──
    title?: string
    desc?: string
    overview?: string
    problem?: string
    role?: string
    solution?: string
    learnings?: string
    // ── 번역 불필요 필드 (projects.json에 항상 존재) ──────────────────────────
    images: string[]
    tech: string[]
    period: string
    type: 'team' | 'individual' | 'blog' | 'dacon' | 'personal'
    /** 모달 하단에 표시할 링크 버튼 목록. JSON에 추가/삭제만으로 버튼 수 조절 */
    links?: ProjectLink[]
}

export interface ExperienceItem {
    /** 역할/기관명 */
    title: string
    /** 기간 (예: "2025.09 - 2026.02") */
    period: string
    /** 설명 */
    desc: string
}

export interface AboutItem {
    desc: string
}

export interface ContactItem {
    title: string
    desc: string
    details: string
    action: string
}

export interface SectionContent<T> {
    title: string
    subtitle: string
    items: T[]
}

// ─── i18n 타입 ────────────────────────────────────────────────────────────────

/** i18n JSON 파일의 최상위 구조 */
export interface I18nData {
    overview: {
        greeting: string
        name: string
        role: string
        bio: string
        cta: string
    }
    about: {
        title: string
        items: AboutItem[]
        skills?: string[]
    }
    experience: {
        title: string
        subtitle: string
        items: ExperienceItem[]
    }
    projects: {
        title: string
        subtitle: string
        items: ProjectItem[]
    }
    contact: {
        title: string
        subtitle?: string
        items: ContactItem[]
    }
}
