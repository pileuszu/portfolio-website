'use client'

import styles from './Experience.module.scss'

import { ExperienceItem } from '@/types'
import { sanitizeHtml } from '@/utils/sanitize'
import { useInView } from '@/hooks/useInView'

interface ExperienceProps {
  /** 섹션 제목 (i18n) */
  title: string
  /** 섹션 부제목 (i18n) */
  subtitle: string
  /** 경력 타임라인 데이터 배열 */
  data: ExperienceItem[]
}

/** 타임라인 아이템 하나를 감싸는 서브 컴포넌트 — 개별 useInView 적용 */
function TimelineItemAnimated({
  item,
  index,
}: {
  item: ExperienceItem
  index: number
}) {
  const [ref, isVisible] = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`${styles.timelineItem} ${index % 2 === 0 ? styles.timelineItemOdd : styles.timelineItemEven} ${isVisible ? styles.visible : ''}`}
    >
      {/* 위쪽 영역 (홀수는 카드, 짝수는 연도) */}
      <div className={styles.topHalf}>
        {index % 2 === 0 ? (
          <div className={styles.experienceCard}>
            <div className={styles.experienceHeader}>
              <h3 className={styles.roleTitle}>{item.title}</h3>
              <span className={styles.companyName}>{item.period}</span>
            </div>
            <div className={styles.experienceBody}>
              <div
                className={`${styles.experienceDesc} markdown-content`}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(
                    item.desc
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n- (.*?)$/gm, '<li>$1</li>')
                      .replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>')
                      .replace(/<\/ul><ul>/g, ''),
                  ),
                }}
              />
            </div>
          </div>
        ) : (
          <div className={styles.timelineYear}>
            <span className={styles.yearText}>{item.period.split('.')[0]}</span>
          </div>
        )}
      </div>

      {/* 중앙 타임라인 도트 */}
      <div className={styles.timelineDot}>
        <div className={styles.dotInner}></div>
      </div>

      {/* 아래쪽 영역 (홀수는 연도, 짝수는 카드) */}
      <div className={styles.bottomHalf}>
        {index % 2 !== 0 ? (
          <div className={styles.experienceCard}>
            <div className={styles.experienceHeader}>
              <h3 className={styles.roleTitle}>{item.title}</h3>
              <span className={styles.companyName}>{item.period}</span>
            </div>
            <div className={styles.experienceBody}>
              <div
                className={`${styles.experienceDesc} markdown-content`}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(
                    item.desc
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n- (.*?)$/gm, '<li>$1</li>')
                      .replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>')
                      .replace(/<\/ul><ul>/g, ''),
                  ),
                }}
              />
            </div>
          </div>
        ) : (
          <div className={styles.timelineYear}>
            <span className={styles.yearText}>{item.period.split('.')[0]}</span>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Experience 섹션 컴포넌트.
 *
 * 경력 데이터를 좌우 교차 타임라인 레이아웃으로 표시합니다.
 * 스크롤 진입 시:
 * - 섹션 헤더 fade-up
 * - 타임라인 선 위→아래 grow
 * - 각 카드 교차 방향 slide-in (홀수=오른쪽, 짝수=왼쪽)
 * - 도트 bounce pop + 지속 glow pulse
 */
export default function Experience({ title, subtitle, data }: ExperienceProps) {
  const [headerRef, headerVisible] = useInView<HTMLDivElement>({ threshold: 0.3 })
  const [wrapperRef, wrapperVisible] = useInView<HTMLDivElement>({ threshold: 0.05 })

  return (
    <section id="experience" className={`${styles.experienceSection} section-padding`}>
      <div className="container">
        {/* 섹션 헤더 — fade-up */}
        <div
          ref={headerRef}
          className={`${styles.sectionHeader} ${styles.revealFadeUp} ${headerVisible ? styles.visible : ''}`}
        >
          <h2 className="section-title">
            <span className="text-gradient">{title}</span>
          </h2>
          <p className={`body-large ${styles.sectionSubtitle}`}>{subtitle}</p>
        </div>

        {/* 타임라인 wrapper — 선 draw 트리거 */}
        <div
          ref={wrapperRef}
          className={`${styles.timelineWrapper} ${wrapperVisible ? styles.timelineLineVisible : ''}`}
        >
          <div className={styles.timelineLine}></div>

          {data.map((item, index) => (
            <TimelineItemAnimated key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
