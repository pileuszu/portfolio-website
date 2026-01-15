'use client'

import styles from '@/app/page.module.scss'
import { AboutItem } from '@/types'

interface AboutMeProps {
    aboutData: AboutItem[]
}

export default function AboutMe({ aboutData }: AboutMeProps) {
    return (
        <section id="about" className={`${styles.aboutSection} section-padding`}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className="section-title">
                        <span className="text-gradient">About Me</span>
                    </h2>
                </div>

                <div className={styles.aboutCenteredContent}>
                    <div className={styles.aboutNarrativeCentered}>
                        {aboutData.map((item, index) => (
                            <div
                                key={index}
                                className={`body-large ${styles.aboutDesc}`}
                                dangerouslySetInnerHTML={{
                                    __html: item.desc
                                        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        .replace(/\n\n/g, '<br/><br/>')
                                        .replace(/^- (.*$)/gm, '<li>$1</li>')
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
