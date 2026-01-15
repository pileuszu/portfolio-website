import styles from '@/app/page.module.scss'
import { ExperienceItem } from '@/types'

interface ExperienceProps {
    data: ExperienceItem[]
}

export default function Experience({ data }: ExperienceProps) {
    return (
        <section id="experience" className={`${styles.experienceSection} section-padding`}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className="section-title">
                        <span className="text-gradient">Experience</span>
                    </h2>
                    <p className={`body-large ${styles.sectionSubtitle}`}>
                        A journey through engineering complex systems, from
                        cutting-edge AI research to production-scale full-stack development.
                    </p>
                </div>

                <div className={styles.timelineWrapper}>
                    <div className={styles.timelineLine}></div>

                    {data.map((item, index) => (
                        <div key={index} className={styles.timelineItem}>
                            <div className={styles.timelineYear}>
                                <span className={styles.yearText}>{item.year}</span>
                            </div>

                            <div className={styles.timelineDot}>
                                <div className={styles.dotInner}></div>
                            </div>

                            <div className={styles.timelineContent}>
                                <div className={styles.experienceCard}>
                                    <div className={styles.experienceHeader}>
                                        <h3 className={styles.roleTitle}>{item.title}</h3>
                                        <span className={styles.companyName}>@ {item.company}</span>
                                    </div>
                                    <div className={styles.experienceBody}>
                                        <div
                                            className={`${styles.experienceDesc} markdown-content`}
                                            dangerouslySetInnerHTML={{
                                                __html: item.desc
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                    .replace(/\n- (.*?)$/gm, '<li>$1</li>')
                                                    .replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>')
                                                    .replace(/<\/ul><ul>/g, '')
                                            }}
                                        />
                                    </div>
                                    <div className={styles.experienceFooter}>
                                        {/* Optional: Add tech used in each role if data supports it */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
