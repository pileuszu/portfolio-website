import { useState } from 'react'
import styles from '@/app/page.module.scss'
import { ContactItem } from '@/types'
import EmailForm from '../EmailForm'

interface ContactProps {
    data: ContactItem[]
    onScrollUp: () => void
}

export default function Contact({ data, onScrollUp }: ContactProps) {
    const [showEmailOverlay, setShowEmailOverlay] = useState(false)

    const handleAction = (item: ContactItem) => {
        if (item.title === 'Email') {
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
                        <span className="text-gradient">Get In Touch</span>
                    </h2>
                    <p className={`body-large ${styles.sectionSubtitle}`}>
                        I&apos;m always open to discussing new projects, creative
                        ideas, or opportunities to be part of your vision.
                    </p>
                </div>

                <div className={styles.contactGrid}>
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={styles.contactCard}
                            onClick={() => handleAction(item)}
                        >
                            <div className={styles.contactIconWrapper}>
                                {item.title === 'Email' ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                    </svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                    </svg>
                                )}
                            </div>
                            <h3 className={styles.contactTitle}>{item.title}</h3>
                            <p className={styles.contactDesc}>{item.desc}</p>
                            <span className={styles.contactAction}>{item.details}</span>
                        </div>
                    ))}
                </div>

                <footer className={styles.mainFooter}>
                    <div className={styles.footerBranding}>
                        <p>&copy; {new Date().getFullYear()} AI & Full-Stack Engineer Portfolio</p>
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
