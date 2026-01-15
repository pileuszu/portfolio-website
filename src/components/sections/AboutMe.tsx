'use client'

import styles from '@/app/page.module.scss'
import { AboutItem, CompetencyItem } from '@/types'

interface AboutMeProps {
    aboutData: AboutItem[]
    competencies: CompetencyItem[]
}

export default function AboutMe({ aboutData, competencies }: AboutMeProps) {
    return (
        <section id="about" className={`${styles.aboutSection} section-padding`}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className="section-title">
                        <span className="text-gradient">About Me</span>
                    </h2>
                </div>

                <div className={styles.aboutGrid}>
                    {/* Intro Narrative */}
                    <div className={styles.aboutNarrative}>
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

                    {/* Skill Map / Competencies */}
                    <div className={styles.skillMap}>
                        <div className={styles.competenciesGrid}>
                            {competencies.map((comp, index) => (
                                <div key={index} className={styles.competencyCard}>
                                    <h4 className={`card-title ${styles.competencyTitle}`}>{comp.category}</h4>
                                    <p className={`text-small ${styles.competencyDesc}`}>{comp.description}</p>
                                    <div className={styles.skillTags}>
                                        {comp.examples.map((ex, i) => (
                                            <span key={i} className={styles.skillTag}>{ex}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
