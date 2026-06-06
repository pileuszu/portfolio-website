'use client'

import styles from './AboutMe.module.scss'
import { AboutItem } from '@/types'
import { sanitizeHtml } from '@/utils/sanitize'
import SkillIcon from './SkillIcons'

interface AboutMeProps {
  /** 섹션 제목 (i18n) */
  title: string
  /** About Me 섹션의 문단 데이터 배열 */
  aboutData: AboutItem[]
  /** 기술 스택 목록 */
  skills?: string[]
}

/**
 * AboutMe 섹션 컴포넌트.
 *
 * JSON 데이터의 Markdown 문법(###, **, -)을 HTML로 변환하여 렌더링합니다.
 * 하단에 브랜드 아이콘 SVG가 탑재된 2열 무한 가로 롤링 배너(Marquee) 형태로 스킬들을 렌더링합니다.
 */
export default function AboutMe({ title, aboutData, skills }: AboutMeProps) {
  // 스킬 목록을 2개 행으로 나누어 서로 반대 방향으로 무한 롤링되게 함
  const row1Skills = skills ? skills.filter((_, idx) => idx % 2 === 0) : []
  const row2Skills = skills ? skills.filter((_, idx) => idx % 2 !== 0) : []

  // 무한 롤링이 끊김 없이 연결되려면 원본 배열을 2배 이상 복제하여 렌더링해야 합니다.
  const duplicatedRow1 = [...row1Skills, ...row1Skills, ...row1Skills]
  const duplicatedRow2 = [...row2Skills, ...row2Skills, ...row2Skills]

  return (
    <section id="about" className={`${styles.aboutSection} section-padding`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className="section-title">
            <span className="text-gradient">{title}</span>
          </h2>
        </div>

        <div className={styles.aboutCenteredContent}>
          <div className={styles.aboutNarrativeCentered}>
            {aboutData.map((item, index) => (
              <div
                key={index}
                className={`body-large ${styles.aboutDesc}`}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(
                    item.desc
                      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n\n/g, '<br/><br/>')
                      .replace(/^- (.*$)/gm, '<li>$1</li>')
                  ),
                }}
              />
            ))}
          </div>

          {skills && skills.length > 0 && (
            <div 
              className={styles.skillsMarqueeSection}
              role="region"
              aria-label="Tech Stacks"
            >
              {/* Row 1: Left Scroll */}
              <div className={styles.marqueeContainer}>
                <div 
                  className={`${styles.marqueeTrack} ${styles.marqueeLeft}`}
                  style={{ animationDuration: '30s' }}
                >
                  {duplicatedRow1.map((skill, idx) => (
                    <div key={`r1-${idx}`} className={styles.integrationChip}>
                      <span className={styles.chipIconWrapper}>
                        <SkillIcon name={skill} className={styles.chipIcon} />
                      </span>
                      <span className={styles.chipText}>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: Right Scroll */}
              <div className={styles.marqueeContainer}>
                <div 
                  className={`${styles.marqueeTrack} ${styles.marqueeRight}`}
                  style={{ animationDuration: '35s' }}
                >
                  {duplicatedRow2.map((skill, idx) => (
                    <div key={`r2-${idx}`} className={styles.integrationChip}>
                      <span className={styles.chipIconWrapper}>
                        <SkillIcon name={skill} className={styles.chipIcon} />
                      </span>
                      <span className={styles.chipText}>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

