'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './page.module.scss'

import { getI18nData } from '@/data/i18n/loader'
import type { Language } from '@/data/i18n/loader'
export type { Language } from '@/data/i18n/loader'
import { ProjectItem, ExperienceItem } from '@/types'

import Navigation from '@/components/Navigation'
import Overview from '@/components/sections/Overview'
import AboutMe from '@/components/sections/AboutMe'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { useScrollSpy } from '@/hooks/useScrollSpy'

const STORAGE_KEY = 'portfolio-lang'

export default function Home() {
  const [lang, setLang] = useState<Language>('en')
  const [isSwapping, setIsSwapping] = useState(false)

  // localStorage에서 언어 복원 (CSR hydration 후)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null
    if (stored === 'en' || stored === 'ko') {
      setLang(stored)
    }
  }, [])

  const toggleLang = useCallback(() => {
    setIsSwapping(true)
    setTimeout(() => {
      setLang(prev => {
        const next = prev === 'en' ? 'ko' : 'en'
        localStorage.setItem(STORAGE_KEY, next)
        return next
      })
      setTimeout(() => {
        setIsSwapping(false)
      }, 50)
    }, 200) // 페이드 아웃 딜레이에 맞춤
  }, [])

  // lang을 기반으로 i18n 로드
  const t = getI18nData(lang)
  const projects    = t.projects.items    as ProjectItem[]
  const experience  = t.experience.items  as ExperienceItem[]

  const sectionIds = ['overview', 'about', 'experience', 'projects', 'contact']
  const { activeSection, setActiveSection } = useScrollSpy(sectionIds)



  const handleNavClick = (sectionId: string) => {

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  return (
    <>
      <Navigation
        activeSection={activeSection}
        onNavClick={handleNavClick}
        lang={lang}
        onToggleLang={toggleLang}
      />
      <main className={`${styles.main} ${isSwapping ? styles.langSwapping : ''}`}>

        <ErrorBoundary sectionName="Overview">
        <Overview
          onScrollDown={() => handleNavClick('about')}
          greeting={t.overview.greeting}
          name={t.overview.name}
          role={t.overview.role}
          bio={t.overview.bio}
          cta={t.overview.cta}
          lang={lang}
        />
      </ErrorBoundary>

      <ErrorBoundary sectionName="About Me">
        <AboutMe title={t.about.title} aboutData={t.about.items} skills={t.about.skills} />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Experience">
        <Experience
          title={t.experience.title}
          subtitle={t.experience.subtitle}
          data={experience}
        />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Projects">
        <Projects
          title={t.projects.title}
          subtitle={t.projects.subtitle}
          data={projects}
          lang={lang}
        />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Contact">
        <Contact title={t.contact.title} subtitle={t.contact.subtitle} data={t.contact.items} />
      </ErrorBoundary>

      {activeSection === 'overview' && (
        <div className={styles.copyright}>
          © 2026 JiHwan Kim. All rights reserved.
        </div>
      )}
    </main>
    </>
  )
}