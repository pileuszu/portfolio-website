'use client'

import Image from 'next/image'
import { useRef } from 'react'
import styles from '@/components/sections/Projects.module.scss'
import { ProjectItem } from '@/types'
import { BASE_PATH } from '@/data/config'

/** 3D 틸트 강도 설정 */
const TILT_MAX_DEG = 12
const PERSPECTIVE = 800

interface ProjectCardProps {
  /** 표시할 프로젝트 데이터 */
  project: ProjectItem
  /** 카드 클릭 시 모달을 열기 위한 콜백 */
  onOpen: (project: ProjectItem) => void
}

/**
 * 프로젝트 캐러셀 카드 컴포넌트.
 *
 * 이미지, 연도/타입 메타, 제목, 기술 스택 배지를 표시합니다.
 * 클릭·Enter·Space 키로 모달을 열 수 있으며 접근성 속성이 적용되어 있습니다.
 *
 * 마우스 호버 시 cursor 위치에 따른 3D 틸트(rotateX/Y) 인터랙션이 적용됩니다.
 * prefers-reduced-motion 환경에서는 틸트를 비활성화합니다.
 */
export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const imageSrc = `${BASE_PATH}${project.images?.[0] || '/images/fallbacks/sample.png'}`
  const cardRef = useRef<HTMLDivElement>(null)

  /** prefers-reduced-motion 감지 */
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -TILT_MAX_DEG
    const rotY = ((x - cx) / cx) * TILT_MAX_DEG
    
    // Set custom properties for dynamic spotlight glare effect
    const px = (x / rect.width) * 100
    const py = (y / rect.height) * 100
    cardRef.current.style.setProperty('--mouse-x', `${px}%`)
    cardRef.current.style.setProperty('--mouse-y', `${py}%`)

    cardRef.current.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = ''
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onOpen(project)
    }
  }

  return (
    <div
      ref={cardRef}
      className={styles.projectCard}
      onClick={() => onOpen(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`${project.title ?? ''} 프로젝트 상세 보기`}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.projectImageWrapper}>
        <Image
          src={imageSrc}
          alt={project.title ?? ''}
          fill
          className={styles.projectImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className={styles.projectInfo}>
        <div className={styles.projectMeta}>
          <span className={styles.projectYear}>{project.period}</span>
          <span className={styles.projectType}>{project.type}</span>
        </div>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <div className={styles.projectSkills}>
          {project.tech.slice(0, 3).map((tech, i) => (
            <span key={i} className={styles.skillBadge}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
