'use client'

import { useState } from 'react'

import styles from './Contact.module.scss'
import { ContactItem } from '@/types'
import EmailForm from '../EmailForm'
import { useInView } from '@/hooks/useInView'

interface ContactProps {
  /** 섹션 제목 (i18n) */
  title: string
  /** 섹션 부제목 (i18n) */
  subtitle?: string
  /** 연락 수단 카드 데이터 배열 (Email, LinkedIn, GitHub 등) */
  data: ContactItem[]
}

/**
 * Contact 섹션 컴포넌트.
 *
 * 이메일, LinkedIn, GitHub 등 연락 수단을 카드 그리드로 표시합니다.
 * 이메일 카드 클릭 시 EmailForm 모달 오버레이를 열고,
 * 그 외 카드는 새 탭으로 링크를 엽니다.
 * 화면 내 노출 시 카드들이 순차적으로 펼쳐지는(Fan-out) 연출을 포함합니다.
 */
export default function Contact({ title, subtitle, data }: ContactProps) {
    const [showEmailOverlay, setShowEmailOverlay] = useState(false)
    const [ref, isVisible] = useInView({ threshold: 0.1, triggerOnce: true })

    // 이메일 카드는 action이 'Send Email' | '이메일 보내기' 형태 — title로 판별
    const isEmailCard = (item: ContactItem) =>
      item.action === 'Send Email' || item.action === '이메일 보내기'

    const handleAction = (item: ContactItem) => {
        if (isEmailCard(item)) {
            setShowEmailOverlay(true)
        } else if (item.action) {
            window.open(item.action, '_blank')
        }
    }

    return (
        <section id="contact" className={`${styles.contactSection} section-padding`}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className="section-title">
                        <span className="text-gradient">{title}</span>
                    </h2>
                    {subtitle && (
                        <p className={`body-large ${styles.sectionSubtitle}`}>{subtitle}</p>
                    )}
                </div>

                <div 
                    ref={ref}
                    className={`${styles.contactGrid} ${isVisible ? styles.gridVisible : ''}`}
                >
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={styles.contactCard}
                            onClick={() => handleAction(item)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    handleAction(item)
                                }
                            }}
                        >
                            <div className={styles.contactIconWrapper}>
                                {isEmailCard(item) ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                    </svg>
                                ) : item.title === 'LinkedIn' ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                                    </svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                    </svg>
                                )}
                            </div>
                            <div className={styles.contactTextContent}>
                                <h3 className={styles.contactTitle}>{item.title}</h3>
                                <p className={styles.contactDesc}>{item.desc}</p>
                                <span className={styles.contactAction}>{item.details}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <footer className={styles.mainFooter}>
                    <div className={styles.footerBranding}>
                        <p>&copy; {new Date().getFullYear()} AI &amp; Full-Stack Engineer Portfolio</p>
                    </div>
                </footer>
            </div>

            {showEmailOverlay && (
                <div className={styles.modalBackdrop} onClick={() => setShowEmailOverlay(false)}>
                    <EmailForm onClose={() => setShowEmailOverlay(false)} />
                </div>
            )}
        </section>
    )
}

