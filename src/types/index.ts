export interface ProjectItem {
    title: string
    desc: string
    images: string[]
    details: string
    tech: string[]
    year: string
    type: 'team' | 'individual' | 'blog' | 'dacon' | 'personal'
    link?: string
}

export interface ExperienceItem {
    title: string
    company: string
    desc: string
    year: string
}

export interface AboutItem {
    desc: string
}

export interface CompetencyItem {
    category: string
    description: string
    examples: string[]
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
