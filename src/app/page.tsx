'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './page.module.scss'
import projectsData from '../data/projects.json'
import experienceData from '../data/experience.json'
import studyData from '../data/study.json'
import contactData from '../data/contact.json'

// 타입 단언
const typedProjectsData = projectsData as ProjectItem[]
const typedStudyData = studyData as BlogItem[]
const typedExperienceData = experienceData as { title: string; company: string; desc: string }[]
const typedContactData = contactData as { title: string; desc: string; details: string; action: string }[]

interface ProjectItem {
  title: string
  desc: string
  images: string[] // 여러 사진 지원
  details: string
  tech: string[]
  year: string
  type: 'team' | 'individual' | 'blog'
}

interface BlogItem {
  title: string
  desc: string
  images: string[]
  details: string
  tech: string[]
  year: string
  type: 'blog'
}

export default function Home() {
  const [showNameText, setShowNameText] = useState(false)
  const [showJobText, setShowJobText] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const [selectedProject, setSelectedProject] = useState<(ProjectItem | BlogItem) | null>(null)
  const [currentProjectPage, setCurrentProjectPage] = useState(0)
  const [currentStudyPage, setCurrentStudyPage] = useState(0)
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const [showEmailOverlay, setShowEmailOverlay] = useState(false)

  // 초기 애니메이션
  useEffect(() => {
    const timer1 = setTimeout(() => setShowNameText(true), 500)
    const timer2 = setTimeout(() => setShowJobText(true), 1000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])


  // 섹션 감지 (화면 중앙 기준)
  const detectActiveSection = useCallback(() => {
    const sections = ['overview', 'projects', 'experience', 'study', 'contact']
    const scrollPosition = window.scrollY + window.innerHeight / 2

    let newActiveSection = 'overview' // 기본값
    let closestSection = 'overview'
    let minDistance = Infinity

    for (let i = 0; i < sections.length; i++) {
      const element = document.getElementById(sections[i])
      if (element) {
        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY
        const elementBottom = elementTop + rect.height
        const elementCenter = elementTop + rect.height / 2

        // 정확한 범위 내에 있는지 확인
        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          newActiveSection = sections[i]
          break
        }

        // 가장 가까운 섹션도 추적 (범위를 벗어난 경우를 위해)
        const distance = Math.abs(scrollPosition - elementCenter)
        if (distance < minDistance) {
          minDistance = distance
          closestSection = sections[i]
        }
      }
    }

    // 범위 내에 섹션이 없으면 가장 가까운 섹션 사용
    if (newActiveSection === 'overview' && closestSection !== 'overview') {
      newActiveSection = closestSection
    }

    // 상태가 실제로 변경되었을 때만 업데이트
    if (newActiveSection !== activeSection) {
      setActiveSection(newActiveSection)
    }
  }, [activeSection])

  // 스크롤 이벤트 리스너 (requestAnimationFrame 사용)
  useEffect(() => {
    let animationId: number | null = null
    let isScrolling = false

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true
        animationId = requestAnimationFrame(() => {
          // 1. 섹션 감지 (화면 중앙 기준)
          detectActiveSection()

          isScrolling = false
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // 초기 로드 시에도 확인
    setTimeout(() => {
      detectActiveSection()
    }, 100)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [detectActiveSection])

  // 스크롤 이벤트로 네비게이션 배경 및 섹션 상태 관리
  useEffect(() => {
    let animationId: number | null = null

    const handleScrollUpdate = () => {
      const scrollPosition = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollRatio = scrollPosition / documentHeight // 전체 스크롤에 대한 비율 (0~1)

      // 스크롤 비율에 따라 네비게이션 배경 상태 결정
      let shouldBeDark = true // 기본값: 어두운 배경

      if (scrollRatio > 0.24 && scrollRatio <= 0.49) {
        // Projects 섹션 비율 (15%~45%)
        shouldBeDark = false // 밝은 배경
      } else if (scrollRatio > 0.49 && scrollRatio <= 0.74) {
        // Study 섹션 비율 (45%~65%)
        shouldBeDark = true // 어두운 배경
      } else if (scrollRatio > 0.74 && scrollRatio <= 0.99) {
        // Experience 섹션 비율 (65%~85%)
        shouldBeDark = false // 밝은 배경
      } else if (scrollRatio > 0.99) {
        // Contact 섹션 비율 (85% 이상)
        shouldBeDark = true // 어두운 배경
      } else {
        // Overview 섹션 비율 (0%~15%)
        shouldBeDark = true // 어두운 배경
      }

      // 현재 활성 섹션 찾기 (화면 중앙 기준)
      const sections = ['overview', 'projects', 'experience', 'study', 'contact']
      const centerPosition = window.scrollY + window.innerHeight / 2

      for (let i = 0; i < sections.length; i++) {
        const element = document.getElementById(sections[i])
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height

          if (centerPosition >= elementTop && centerPosition < elementBottom) {
            // 섹션과 배경 상태 업데이트
            setActiveSection(sections[i])
            setIsDarkBackground(shouldBeDark)
            break
          }
        }
      }
    }

    const handleScroll = () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      animationId = requestAnimationFrame(handleScrollUpdate)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [activeSection, isDarkBackground])

  // 네비게이션 클릭 핸들러
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })

      // 클릭한 섹션에 따라 네비게이션 배경 상태 결정
      const shouldBeDark = sectionId === 'overview' || sectionId === 'experience' || sectionId === 'contact'

      // 즉시 배경 상태 및 활성 섹션 업데이트
      setIsDarkBackground(shouldBeDark)
      setActiveSection(sectionId)
    }
  }

  // 프로젝트 선택 핸들러
  const handleProjectSelect = (project: ProjectItem | BlogItem) => {
    setSelectedProject(project)
  }


  const portfolioSections = [
    { id: 'overview', title: 'OVERVIEW' },
    { id: 'projects', title: 'PROJECTS' },
    { id: 'experience', title: 'EXPERIENCE' },
    { id: 'study', title: 'STUDY' },
    { id: 'contact', title: 'CONTACT' }
  ]


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getSectionContent = (sectionId: string): { title: string; subtitle: string; items: any[] } => {
    switch (sectionId) {
      case 'overview':
        return {
          title: 'Trusted to deliver stunning portfolios everywhere.',
          subtitle: 'With cutting-edge cloud-based infrastructure, you can be sure your clients are getting lightning fast performance, no matter where they are.',
          items: ['photographers', 'cinematographers', 'directors', 'artists', 'architects', 'agencies']
        }
      case 'projects':
        return {
          title: 'Featured Projects',
          subtitle: 'Building innovative solutions that make a difference. Each project represents a unique challenge solved with creativity and technical excellence.',
          items: typedProjectsData
        }
      case 'experience':
        return {
          title: 'Professional Experience',
          subtitle: 'Years of experience building scalable applications and leading development teams. Proven track record in delivering high-quality software solutions.',
          items: typedExperienceData
        }
      case 'study':
        return {
          title: 'Learning & Blog',
          subtitle: 'Sharing knowledge and insights from my journey as a software engineer. Continuous learning drives innovation.',
          items: typedStudyData
        }
      case 'contact':
        return {
          title: 'Get In Touch',
          subtitle: 'Let\'s collaborate and create something amazing together. I\'m always interested in new opportunities and exciting projects.',
          items: typedContactData
        }
      default:
        return { title: '', subtitle: '', items: [] }
    }
  }


  return (
    <>
    <main className={styles.main}>
        {/* 상단 네비게이션 - 투명한 레이어 */}
        <nav className={`${styles.topNavigation} ${!isDarkBackground ? styles.lightNav : ''}`}>
          <div className={styles.navItems}>
            {portfolioSections.map((section) => (
              <button
                key={section.id}
                className={`${styles.navItem} ${activeSection === section.id ? styles.active : ''}`}
                onClick={() => handleNavClick(section.id)}
              >
                {section.title}
              </button>
            ))}
          </div>
        </nav>
        

        {/* Overview 섹션 */}
        <section id="overview" className={styles.overviewSection}>
          {/* 이름과 직업 텍스트 */}
          {(showNameText || showJobText) && (
            <div className={styles.textContainer}>
      {showNameText && (
        <div className={styles.nameText}>
                  JIHWAN KIM
        </div>
      )}
      {showJobText && (
        <div className={styles.jobText}>
                  SOFTWARE ENGINEER
        </div>
      )}
        </div>
      )}

          {/* 섹션 이동 버튼 */}
          <div className={styles.scrollDownContainer}>
            <button
              className={styles.scrollDownButton}
              onClick={() => handleNavClick('projects')}
            >
              <svg width="100" height="100" viewBox="0 0 100 100">
                <path d="M15,33 L50,67 L85,33" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </section>

        {/* Projects 섹션 - 홀수번째: 왼쪽 좁음, 제목/설명 왼쪽, 그리드 오른쪽 */}
        <section id="projects" className={styles.projectsSection}>
          <div className={styles.portfolioLayout}>
            <div className={styles.portfolioLeft}>
              <h2 className={styles.portfolioTitle}>Featured Projects</h2>
              <p className={styles.portfolioSubtitle}>Building innovative solutions that make a difference. Each project represents a unique challenge solved with creativity and technical excellence.</p>
            </div>
            <div className={styles.portfolioRight}>
              <div className={styles.projectsGrid}>
                {currentProjectPage > 0 && (
                  <button 
                    className={styles.gridNavLeft}
                    onClick={() => setCurrentProjectPage(Math.max(0, currentProjectPage - 1))}
                  >
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <path d="M15,33 L50,67 L85,33" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                )}
                
                <div className={styles.gridContainer}>
                  {getSectionContent('projects').items.slice(currentProjectPage * 6, (currentProjectPage + 1) * 6).map((item: ProjectItem, index: number) => {
                    if (typeof item === 'string') return null
                    return (
            <div
              key={index}
                        className={styles.gridItem}
                        onClick={() => handleProjectSelect(item as ProjectItem)}
                      >
                        <div className={styles.gridImage}>
                          <img
                            src={item.images?.[0] || '/portfolio-website/images/sample.png'}
                            alt={item.title}
                            onError={(e) => {
                              e.currentTarget.src = '/portfolio-website/images/sample.png'
                            }}
                          />
                        </div>
                        <div className={styles.gridContent}>
                          <h4>{item.title}</h4>
                          <p>{item.desc}</p>
                          <div className={styles.gridTags}>
                            <span className={styles.gridYear}>{item.year}</span>
                            <span className={`${styles.projectType} ${item.type === 'team' ? styles.team : styles.individual}`}>
                              {item.type === 'team' ? 'Team Project' : 'Individual'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                {currentProjectPage < Math.ceil(getSectionContent('projects').items.length / 6) - 1 && (
                  <button 
                    className={styles.gridNavRight}
                    onClick={() => setCurrentProjectPage(Math.min(Math.ceil(getSectionContent('projects').items.length / 6) - 1, currentProjectPage + 1))}
                  >
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <path d="M15,33 L50,67 L85,33" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 섹션 이동 버튼 */}
          <div className={styles.scrollDownContainer}>
            <button
              className={styles.scrollDownButton}
              onClick={() => handleNavClick('experience')}
            >
              <svg width="100" height="100" viewBox="0 0 100 100">
                <path d="M15,33 L50,67 L85,33" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </section>

        {/* Experience 섹션 - 타임라인 형태 */}
        <section id="experience" className={styles.experienceSection}>
          <div className={styles.portfolioLayout}>
            <div className={styles.portfolioLeft}>
              <div className={styles.timelineContainer}>
                <div className={styles.timeline}>
                  {getSectionContent('experience').items.map((item: { title: string; company: string; desc: string }, index: number) => {
                  if (typeof item === 'string') return null
                  return (
                      <div key={index} className={styles.timelineItem}>
                        <div className={styles.timelineMarker}></div>
                        <div className={styles.timelineContent}>
                      <h4>{item.title}</h4>
                      {'company' in item && <p className={styles.company}>{item.company}</p>}
                      <p>{item.desc}</p>
                        </div>
                    </div>
                  )
                })}
                </div>
              </div>
            </div>
            <div className={styles.portfolioRight}>
              <h2 className={styles.portfolioTitle}>Professional Experience</h2>
              <p className={styles.portfolioSubtitle}>Years of experience building scalable applications and leading development teams. Proven track record in delivering high-quality software solutions.</p>
            </div>
          </div>

          {/* 섹션 이동 버튼 */}
          <div className={styles.scrollDownContainer}>
            <button
              className={styles.scrollDownButton}
              onClick={() => handleNavClick('study')}
            >
              <svg width="100" height="100" viewBox="0 0 100 100">
                <path d="M15,33 L50,67 L85,33" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </section>

        {/* Study 섹션 - 그리드 형태로 변경 */}
        <section id="study" className={styles.studySection}>
          <div className={styles.portfolioLayout}>
            <div className={styles.portfolioLeft}>
              <h2 className={styles.portfolioTitle}>Learning & Blog</h2>
              <p className={styles.portfolioSubtitle}>Sharing knowledge and insights from my journey as a software engineer. Continuous learning drives innovation.</p>
            </div>
            <div className={styles.portfolioRight}>
              <div className={styles.projectsGrid}>
                {currentStudyPage > 0 && (
                  <button
                    className={styles.gridNavLeft}
                    onClick={() => setCurrentStudyPage(Math.max(0, currentStudyPage - 1))}
                  >
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <path d="M15,33 L50,67 L85,33" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                )}

                <div className={styles.gridContainer}>
                  {getSectionContent('study').items.slice(currentStudyPage * 6, (currentStudyPage + 1) * 6).map((item: BlogItem, index: number) => {
                    if (typeof item === 'string') return null
                    return (
            <div
              key={index}
                        className={styles.gridItem}
                        onClick={() => handleProjectSelect(item as BlogItem)}
                      >
                        <div className={styles.gridImage}>
                          <img
                            src={item.images?.[0] || '/portfolio-website/images/sample.png'}
                            alt={item.title}
                            onError={(e) => {
                              e.currentTarget.src = '/portfolio-website/images/sample.png'
                            }}
                          />
                </div>
                        <div className={styles.gridContent}>
                          <h4>{item.title}</h4>
                          <p>{item.desc}</p>
                          <div className={styles.gridTags}>
                            <span className={styles.gridYear}>{item.year}</span>
                            <span className={`${styles.projectType} ${item.type === 'blog' ? styles.blog : ''}`}>
                              {item.type === 'blog' ? 'Blog Post' : item.type}
                            </span>
                </div>
                </div>
                </div>
                    )
                  })}
                </div>

                {currentStudyPage < Math.ceil(getSectionContent('study').items.length / 6) - 1 && (
                  <button
                    className={styles.gridNavRight}
                    onClick={() => setCurrentStudyPage(Math.min(Math.ceil(getSectionContent('study').items.length / 6) - 1, currentStudyPage + 1))}
                  >
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <path d="M15,33 L50,67 L85,33" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 섹션 이동 버튼 */}
          <div className={styles.scrollUpContainer}>
            <button
              className={styles.scrollUpButton}
              onClick={() => handleNavClick('overview')}
            >
              <svg width="100" height="100" viewBox="0 0 100 100">
                <path d="M15,67 L50,33 L85,67" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </section>

        {/* Contact 섹션 - 정적인 카드 표시 */}
        <section id="contact" className={styles.contactSection}>
          <div className={styles.portfolioLayout}>
            <div className={styles.portfolioLeft}>
              <div className={styles.contactCardGrid}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {getSectionContent('contact').items.slice(0, 2).map((item: any, index: number) => {
                  if (typeof item === 'string') return null
                  const handleClick = () => {
                    if (item.title === 'Email') {
                      setShowEmailOverlay(true);
                    } else if (item.title === 'LinkedIn') {
                      window.open(item.desc, '_blank');
                    } else if (item.title === 'GitHub') {
                      window.open(item.desc, '_blank');
                    } else if (item.title === 'Twitter') {
                      window.open(item.desc, '_blank');
                    }
                  };

                  return (
                    <div
                      key={index}
                      className={styles.contactCard}
                      onClick={handleClick}
                    >
                      <div className={styles.contactCardIcon}>
                        {item.title === 'Email' ? (
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                          </svg>
                        ) : (
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        )}
                      </div>
                      <h3 className={styles.contactCardTitle}>{item.title}</h3>
                      <p className={styles.contactCardDesc}>{item.desc}</p>
                      <div className={styles.contactCardDetails}>
                        <p>{item.details}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={styles.portfolioRight}>
              <h2 className={styles.portfolioTitle}>Get In Touch</h2>
              <p className={styles.portfolioSubtitle}>Select a contact method from the menu to view details.</p>
            </div>
          </div>
        </section>

        {/* 프로젝트 오버레이 */}
        {selectedProject && (
          <div className={styles.projectOverlay} onClick={() => setSelectedProject(null)}>
            <div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
              <button 
                className={styles.closeButton}
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>
              <div className={styles.overlayImage}>
                <img
                  src={selectedProject.images?.[0] || '/portfolio-website/images/sample.png'}
                  alt={selectedProject.title}
                  onError={(e) => {
                    e.currentTarget.src = '/portfolio-website/images/sample.png'
                  }}
                />
              </div>
              <div className={styles.overlayDetails}>
                <h2>{selectedProject.title}</h2>
                <p className={styles.overlayDesc}>{selectedProject.desc}</p>
                <p className={styles.overlayDetailsText}>{selectedProject.details}</p>
                <div className={styles.techStack}>
                  <h4>Technologies Used:</h4>
                  <div className={styles.techTags}>
                    {selectedProject.tech.map((tech: string, index: number) => (
                      <span key={index} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.projectYear}>
                  <span>Year: {selectedProject.year}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 이메일 오버레이 */}
        {showEmailOverlay && (
          <div className={styles.emailOverlay} onClick={() => setShowEmailOverlay(false)}>
            <div className={styles.emailOverlayContent} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.closeButton}
                onClick={() => setShowEmailOverlay(false)}
              >
                ×
              </button>
              <h2>Send Email</h2>
              <form className={styles.emailForm} onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const subject = formData.get('subject') as string;
                const body = formData.get('body') as string;
                const email = 'jihwan.kim@email.com'; // 실제 이메일 주소
                const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.open(mailtoLink, '_blank');
                setShowEmailOverlay(false);
              }}>
                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="Email subject"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="body">Message</label>
                  <textarea
                    id="body"
                    name="body"
                    required
                    placeholder="Your message here..."
                    rows={6}
                  ></textarea>
                </div>
                <div className={styles.formActions}>
                  <button type="button" onClick={() => setShowEmailOverlay(false)} className={styles.cancelButton}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.sendButton}>
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 저작권 표시 - Overview 섹션에서만 표시 */}
        {activeSection === 'overview' && (
        <div className={styles.copyright}>
          © 2025 JiHwan Kim. All rights reserved.
        </div>
        )}
    </main>
    </>
  )
}