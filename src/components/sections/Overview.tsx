import Image from 'next/image'
import styles from '@/app/page.module.scss'
import { BASE_PATH } from '../../data/config'

interface OverviewProps {
    onScrollDown: () => void
}

export default function Overview({ onScrollDown }: OverviewProps) {
    const profileImagePath = `${BASE_PATH}/images/profile.jpg`

    return (
        <section id="overview" className={`${styles.overviewSection} section-padding`}>
            <div className={`container ${styles.overviewContent}`}>
                {/* Left side: Text Content */}
                <div className={styles.heroTextContent}>
                    <p className={styles.introLabel}>Hi, I am</p>
                    <h1 className={styles.heroName}>JIHWAN KIM</h1>
                    <h2 className={`display-large ${styles.heroTitle}`}>
                        <span className="text-gradient">AI ENGINEER</span> & <br />
                        FULL-STACK DEVELOPER
                    </h2>
                    <p className={`body-large ${styles.heroDescription}`}>
                        I specialize in bridging the gap between advanced AI research and production-ready web systems.
                        Building seamless, data-centric experiences is what I do best.
                    </p>

                    <div className={styles.ctaContainer}>
                        <button className={styles.primaryButton} onClick={onScrollDown}>
                            View My Work
                        </button>
                    </div>
                </div>

                {/* Right side: Profile Card */}
                <div className={styles.profileCardContainer}>
                    <div className={styles.profileCard}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={profileImagePath}
                                alt="JiHwan Kim"
                                width={400}
                                height={400}
                                className={styles.profileImage}
                                priority
                            />
                        </div>
                        <div className={styles.socialLinks}>
                            <a href="https://github.com/pileuszu" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>
                            <a href="https://www.linkedin.com/in/jihwan-kim-24b3973a6/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>
                            <a href="mailto:pileuszu@gmail.com" className={styles.socialIcon}>
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
