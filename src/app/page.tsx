'use client'

import styles from './page.module.scss'

// Data Imports
import projectsData from '@/data/projects.json'
import experienceData from '@/data/experience.json'
import aboutData from '@/data/aboutme.json'
import contactData from '@/data/contact.json'
import competenciesData from '@/data/competencies.json'

// Type Imports
import { ProjectItem, ExperienceItem, AboutItem, ContactItem, CompetencyItem } from '@/types'

// Component Imports
import Navigation from '@/components/Navigation'
import Overview from '@/components/sections/Overview'
import AboutMe from '@/components/sections/AboutMe'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'

// Hook Imports
import { useScrollSpy } from '@/hooks/useScrollSpy'

// Data Casting
const typedProjectsData = projectsData as ProjectItem[]
const typedExperienceData = experienceData as ExperienceItem[]
const typedAboutData = aboutData as AboutItem[]
const typedContactData = contactData as ContactItem[]
const typedCompetenciesData = competenciesData as CompetencyItem[]

export default function Home() {
  const sectionIds = ['overview', 'about', 'experience', 'projects', 'contact']
  const { activeSection, isDarkBackground, setActiveSection } = useScrollSpy(sectionIds)

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  return (
    <>
      <main className={styles.main}>
        <Navigation
          activeSection={activeSection}
          isDarkBackground={isDarkBackground}
          onNavClick={handleNavClick}
        />

        <Overview onScrollDown={() => handleNavClick('about')} />

        <AboutMe
          aboutData={typedAboutData}
          competencies={typedCompetenciesData}
        />

        <Experience data={typedExperienceData} />

        <Projects data={typedProjectsData} />

        <Contact
          data={typedContactData}
          onScrollUp={() => handleNavClick('overview')}
        />

        {/* Copyright */}
        {activeSection === 'overview' && (
          <div className={styles.copyright}>
            © 2026 JiHwan Kim. All rights reserved.
          </div>
        )}
      </main>
    </>
  )
}