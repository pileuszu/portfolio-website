'use client'

import { useState, useEffect } from 'react'
import styles from './Navigation.module.scss'
import { Language } from '@/app/page'

interface NavigationProps {
  activeSection: string
  onNavClick: (id: string) => void
  lang: Language
  onToggleLang: () => void
}

const navItems = [
  { id: 'overview', titleEn: 'OVERVIEW',  titleKo: '개요' },
  { id: 'about',    titleEn: 'ABOUT ME',  titleKo: '소개' },
  { id: 'experience', titleEn: 'EXPERIENCE', titleKo: '경력' },
  { id: 'projects', titleEn: 'PROJECTS',  titleKo: '프로젝트' },
  { id: 'contact',  titleEn: 'CONTACT',   titleKo: '연락처' },
]

/**
 * Navigation 컴포넌트.
 *
 * 상단 고정 글래스모피즘 네비게이션 바.
 * 현재 활성 섹션 하이라이트, 배경 밝기에 따른 색상 전환.
 * 우측에 EN / KR 언어 토글 버튼 포함.
 * 스크롤 진행률 표시바 탑재.
 */
export default function Navigation({
  activeSection, onNavClick, lang, onToggleLang,
}: NavigationProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // 1. Scroll Progress 계산
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (currentScrollY / totalHeight) * 100
        setScrollProgress(progress)
      }

      // 2. Scrolled Nav 판단 (최상단 20px 초과 시 컴팩트한 스타일)
      setIsScrolled(currentScrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // 초기 1회 실행하여 올바른 스크롤 진행 상황 복원
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`
      ${styles.topNavigation} 
      ${isScrolled ? styles.scrolledNav : ''}
    `}>


      <div 
        className={styles.scrollProgress} 
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
        aria-label="Scroll Progress Indicator"
      />

      <div className={styles.navItems}>
        {navItems.map((section) => (
          <button
            key={section.id}
            className={`${styles.navItem} ${activeSection === section.id ? styles.active : ''}`}
            onClick={() => onNavClick(section.id)}
          >
            {section.titleEn}
          </button>
        ))}
      </div>

      <button
        className={styles.langToggle}
        onClick={onToggleLang}
        aria-label={lang === 'ko' ? 'Switch to English' : '한국어로 전환'}
      >
        <span className={lang === 'en' ? styles.langActive : ''}>EN</span>
        <span className={styles.langDivider}>/</span>
        <span className={lang === 'ko' ? styles.langActive : ''}>KR</span>
      </button>
    </nav>
  )
}

