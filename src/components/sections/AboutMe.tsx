'use client'

import styles from '../../app/page.module.scss'
import { AboutItem, CompetencyItem } from '../../types'

interface AboutMeProps {
    aboutData: AboutItem[]
    competencies: CompetencyItem[]
}

export default function AboutMe({ aboutData, competencies }: AboutMeProps) {
    return (
        <section id="about" className={styles.aboutSection}>
            <div className={styles.portfolioLayout}>
                <div className={styles.portfolioLeft}>
                    <h2 className={styles.portfolioTitle}>About Me</h2>
                    {/* Intro Text */}
                    <div className={styles.aboutIntro}>
                        {aboutData.map((item, index) => (
                            <p key={index} className={styles.aboutDesc} style={{ whiteSpace: 'pre-wrap', marginBottom: '40px' }}>
                                {item.desc}
                            </p>
                        ))}
                    </div>
                </div>

                <div className={styles.portfolioRight}>
                    <div className={styles.aboutContent}>
                        {/* Core Competencies Grid */}
                        <div className={styles.competenciesGrid}>
                            {competencies.map((comp, index) => (
                                <div key={index} className={styles.competencyCard}>
                                    <h4 className={styles.competencyTitle}>{comp.category}</h4>
                                    <p className={styles.competencyDesc}>{comp.description}</p>
                                    <ul className={styles.competencyExamples}>
                                        {comp.examples.map((ex, i) => (
                                            <li key={i}>{ex}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
