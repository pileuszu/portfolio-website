'use client'

import styles from '@/app/page.module.scss'
import { ExperienceItem } from '@/types'

interface ExperienceProps {
    data: ExperienceItem[]
}

export default function Experience({ data }: ExperienceProps) {
    return (
        <section id="experience" className={styles.experienceSection}>
            <div className={styles.portfolioLayout}>
                <div className={styles.portfolioLeft}>
                    <div className={styles.timelineContainer}>
                        <div className={styles.timeline}>
                            {data.map((item, index) => (
                                <div key={index} className={styles.timelineItem}>
                                    <div className={styles.timelineMarker}></div>
                                    <div className={styles.timelineContent}>
                                        <h4>{item.title}</h4>
                                        <p className={styles.company}>{item.company}</p>
                                        <p>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.portfolioRight}>
                    <h2 className={styles.portfolioTitle}>Professional Experience</h2>
                    <p className={styles.portfolioSubtitle}>
                        Years of experience building scalable applications and leading development teams.
                        Proven track record in delivering high-quality software solutions.
                    </p>
                </div>
            </div>
        </section>
    )
}
