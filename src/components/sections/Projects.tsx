'use client'

import { useState, useRef } from 'react'
import styles from './Projects.module.scss'
import { ProjectItem } from '@/types'
import { Language } from '@/app/page'
import { useCarousel } from '@/hooks/useCarousel'
import { useInView } from '@/hooks/useInView'
import ProjectCard from '@/components/ProjectCard'
import ProjectModal from '@/components/ProjectModal'

interface ProjectsProps {
  title: string
  subtitle: string
  data: ProjectItem[]
  lang: Language
}

/**
 * Projects 섹션 컴포넌트 (오케스트레이터).
 * useCarousel 훅으로 슬라이드 상태를 관리하고
 * ProjectCard / ProjectModal 컴포넌트를 조합합니다.
 *
 * 애니메이션:
 * - 섹션 헤더: scroll-reveal (revealFadeUp)
 * - 캐러셀 카드: stagger fade-up (carouselVisible 클래스)
 * - 개별 카드: 3D 틸트 (ProjectCard 내 마우스 이벤트)
 */
export default function Projects({ title, subtitle, data, lang }: ProjectsProps) {
  const totalItems = data.length
  const { currentIndex, itemsPerView, setCurrentIndex, nextSlide, prevSlide, pagedIndices } =
    useCarousel({ totalItems })

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  // Scroll reveal
  const [headerRef, headerVisible] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const [carouselRef, carouselVisible] = useInView<HTMLDivElement>({ threshold: 0.15 })

  const openModal = (project: ProjectItem) => {
    lastFocusedRef.current = document.activeElement as HTMLElement
    setSelectedProject(project)
  }
  const closeModal = () => setSelectedProject(null)

  return (
    <section id="projects" className={`${styles.projectsSection} section-padding`}>
      <div className="container">
        {/* 섹션 헤더 — scroll reveal */}
        <div
          ref={headerRef}
          className={`${styles.sectionHeader} ${styles.revealFadeUp} ${headerVisible ? styles.visible : ''}`}
        >
          <h2 className="section-title">
            <span className="text-gradient">{title}</span>
          </h2>
          <p className={`body-large ${styles.sectionSubtitle}`}>{subtitle}</p>
        </div>

        {/* 캐러셀 — carouselVisible 클래스로 stagger 트리거 */}
        <div
          ref={carouselRef}
          className={`${styles.projectsContainer} ${carouselVisible ? styles.carouselVisible : ''}`}
        >
          <button className={`${styles.pageNav} ${styles.prev}`} onClick={prevSlide} aria-label="Previous projects">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className={styles.carouselViewport}>
            <div
              className={styles.carouselTrack}
              style={{
                transform: `translateX(-${currentIndex * (100 / totalItems)}%)`,
                width: `${(totalItems / itemsPerView) * 100}%`,
              }}
            >
              {data.map((project, index) => (
                <div key={index} className={styles.carouselItem} style={{ width: `${100 / totalItems}%` }}>
                  <ProjectCard project={project} onOpen={openModal} />
                </div>
              ))}
            </div>
          </div>

          <button className={`${styles.pageNav} ${styles.next}`} onClick={nextSlide} aria-label="Next projects">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className={styles.paginationDots}>
          {pagedIndices.map((idx) => (
            <span
              key={idx}
              className={`${styles.dot} ${currentIndex === idx ? styles.active : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeModal}
          lastFocusedElement={lastFocusedRef.current}
          lang={lang}
        />
      )}
    </section>
  )
}
