'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import styles from '@/components/sections/Projects.module.scss'
import { ProjectItem } from '@/types'
import { BASE_PATH } from '@/data/config'
import { sanitizeHtml } from '@/utils/sanitize'
import { Language } from '@/app/page'

interface ProjectModalProps {
  project: ProjectItem
  onClose: () => void
  lastFocusedElement: HTMLElement | null
  lang: Language
}

/**
 * 프로젝트 상세 모달 컴포넌트.
 *
 * - 포커스 트랩: Tab / Shift+Tab 키를 모달 내부에서만 순환
 * - Escape 키로 닫기
 * - body 스크롤 잠금 (열림 시) / 해제 (닫힘 시)
 * - 닫힐 때 이전 포커스 위치로 복귀
 * - ARIA: role="dialog", aria-modal, aria-labelledby
 */
export default function ProjectModal({ project, onClose, lastFocusedElement, lang }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const imageSrc = `${BASE_PATH}${project.images?.[0] || '/images/fallbacks/sample.png'}`

  const labels = lang === 'ko'
    ? { overview: '개요', problem: '문제 & 도전', role: '역할 & 기여', solution: '해결 방법', learnings: '배운 점', period: '연도', visitSite: '사이트 방문', closeLabel: '프로젝트 모달 닫기' }
    : { overview: 'Overview', problem: 'Problem & Challenge', role: 'Role & Contribution', solution: 'Solution', learnings: 'Learnings', period: 'Year', visitSite: 'Visit Site', closeLabel: 'Close project modal' }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => { closeBtnRef.current?.focus() })
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = useCallback(() => {
    onClose()
    lastFocusedElement?.focus()
  }, [onClose, lastFocusedElement])

  const handleModalKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !modalRef.current) return
    const sel = 'button:not([disabled]),a[href],input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'
    const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(sel))
    const first = focusable[0]; const last = focusable[focusable.length - 1]
    if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus() } }
    else { if (document.activeElement === last) { e.preventDefault(); first?.focus() } }
  }

  const renderMarkdown = (text: string) =>
    sanitizeHtml(text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>'))

  return (
    <div className={styles.modalOverlay} onClick={handleClose} role="presentation">
      <div
        ref={modalRef}
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleModalKeyDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button ref={closeBtnRef} className={styles.closeModal} onClick={handleClose} aria-label={labels.closeLabel}>×</button>

        <div className={styles.modalScrollArea}>
          <div className={styles.modalHero}>
            <div className={styles.modalImageWrapper} style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
              <Image src={imageSrc} alt={project.title ?? ''} fill className={styles.modalImage} style={{ objectFit: 'cover' }} />
            </div>
          </div>

          <div className={styles.modalInfo}>
            <div className={styles.modalHeader}>
              <h2 id="modal-title" className={styles.modalTitle}>{project.title}</h2>
              <div className={styles.modalTags}>
                {project.tech.map((tech, i) => <span key={i} className={styles.modalTag}>{tech}</span>)}
              </div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalMainText}>
                <div className={styles.projectSection}><h3>{labels.overview}</h3><p>{project.overview ?? ''}</p></div>
                <div className={styles.projectSection}><h3>{labels.problem}</h3><p>{project.problem ?? ''}</p></div>
                <div className={styles.projectSection}><h3>{labels.role}</h3><p>{project.role ?? ''}</p></div>
                <div className={styles.projectSection}>
                  <h3>{labels.solution}</h3>
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(project.solution ?? '') }} />
                </div>
                <div className={styles.projectSection}><h3>{labels.learnings}</h3><p>{project.learnings ?? ''}</p></div>
              </div>

              <div className={styles.modalSidebar}>
                <div className={styles.sidebarItem}><h4>{labels.period}</h4><p>{project.period}</p></div>

                {/* links 배열 렌더링 */}
                {(() => {
                  const linkList = project.links ?? []

                  return linkList.map((item, i) => {
                    const isGithub = item.type === 'github'
                    return (
                      <a
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.visitButton} ${isGithub ? styles.visitButtonGithub : ''}`}
                      >
                        {item.label}{' '}
                        {isGithub ? (
                          /* GitHub 아이콘 */
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                        ) : (
                          /* 외부 링크 아이콘 */
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        )}
                      </a>
                    )
                  })
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
