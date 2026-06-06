'use client'

import Image from 'next/image'
import styles from './Overview.module.scss'
import { BASE_PATH } from '../../data/config'
import { Language } from '@/app/page'
import ParticleCanvas from '../ParticleCanvas'

interface OverviewProps {
  onScrollDown: () => void
  greeting: string
  name: string
  role: string
  bio: string
  cta: string
  lang: Language
}

/**
 * Overview 섹션 컴포넌트.
 *
 * 원본 커밋(7707d9c) 구조를 기반으로 i18n props를 연결합니다.
 * - 좌측: 인사말(introLabel) → 이름(heroName) → 직함(display-large + heroTitle) → bio
 * - 우측: 프로필 카드(imageWrapper, fixed size 400×400) + 소셜 링크
 */
export default function Overview({ onScrollDown, greeting, name, role, bio, cta, lang }: OverviewProps) {
  const profileImagePath = `${BASE_PATH}/images/profile.webp`

  // 직함을 두 줄로 나누기: "AI Engineer & Full-Stack Developer" → ["AI ENGINEER", "FULL-STACK DEVELOPER"]
  const [rolePart1, rolePart2] = role.includes('&')
    ? role.split('&').map(s => s.trim().toUpperCase())
    : [role.toUpperCase(), '']

  return (
    <section id="overview" className={`${styles.overviewSection} section-padding`}>
      {/* 배경 파티클 네트워크 */}
      <ParticleCanvas />

      <div className={`container ${styles.overviewWrapper}`}>
        <div className={styles.overviewContent}>
        {/* Left side: Text Content */}
        <div className={styles.heroTextContent}>
          <p className={`${styles.introLabel} ${styles.heroEnter} ${styles.heroD1}`}>{greeting}</p>

          {/* 이름: 소형 캡션 스타일 (원본 구조 그대로) */}
          <h1 className={`${styles.heroName} ${styles.heroEnter} ${styles.heroD2}`}>{name.toUpperCase()}</h1>

          {/* 직함: display-large + text-gradient (원본 구조 그대로) */}
          <h2 className={`display-large ${styles.heroTitle} ${styles.heroEnter} ${styles.heroD3}`}>
            <span className={styles.heroTitleShimmer}>{rolePart1}</span>
            {rolePart2 && (
              <>
                {' '}&amp;{' '}<br />
                <span className={styles.heroTitleShimmer}>{rolePart2}</span>
              </>
            )}
          </h2>

          <p className={`body-large ${styles.heroDescription} ${styles.heroEnter} ${styles.heroD4}`}>{bio}</p>

          <div className={`${styles.ctaContainer} ${styles.heroEnter} ${styles.heroD5}`}>
            <button className={styles.primaryButton} onClick={onScrollDown}>
              {cta}
            </button>
          </div>
        </div>

        {/* Right side: Profile Card */}
        <div className={`${styles.profileCardContainer} ${styles.profileFloating}`}>
          {/* Glowing background shapes for premium aesthetics */}
          <div className={styles.glowBg} aria-hidden="true" />
          <div className={styles.glowingCircle1} aria-hidden="true" />
          <div className={styles.glowingCircle2} aria-hidden="true" />

          <div className={styles.profileCard}>
            {/* 원본: fixed width/height (fill 아님) + imageWrapper */}
            <div className={styles.imageWrapper}>
              <Image
                src={profileImagePath}
                alt={lang === 'ko' ? '김지환 프로필 사진' : 'JiHwan Kim'}
                width={400}
                height={400}
                className={styles.profileImage}
                priority
              />
            </div>

            {/* 소셜 링크 */}
            <div className={styles.socialLinks}>
              <a
                href="https://github.com/pileuszu"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/jihwan-kim-24b3973a6/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="mailto:pileuszu@gmail.com"
                className={styles.socialIcon}
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        </div>{/* /overviewContent */}
      </div>{/* /container overviewWrapper */}
    </section>
  )
}
