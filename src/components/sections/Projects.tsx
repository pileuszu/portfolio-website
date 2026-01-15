import React, { useState } from 'react'
import Image from 'next/image'
import styles from '@/app/page.module.scss'
import { ProjectItem } from '@/types'
import { BASE_PATH } from '@/data/config'

interface ProjectsProps {
    data: ProjectItem[]
}

export default function Projects({ data }: ProjectsProps) {
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
    const totalItems = data.length
    const [itemsPerView, setItemsPerView] = useState(3)

    // Update itemsPerView based on window size
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) setItemsPerView(1)
            else if (window.innerWidth <= 1024) setItemsPerView(2)
            else setItemsPerView(3)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const maxIndex = Math.max(0, totalItems - itemsPerView)
    const [currentIndex, setCurrentIndex] = useState(0)

    // Ensure currentIndex doesn't exceed new maxIndex on resize
    React.useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex)
        }
    }, [maxIndex, currentIndex])

    const getImagePath = (path: string) => {
        return `${BASE_PATH}${path}`
    }

    if (typeof document !== 'undefined') {
        document.body.style.overflow = selectedProject ? 'hidden' : 'unset'
    }

    const nextSlide = () => {
        setCurrentIndex((prev) => {
            if (prev >= maxIndex) return 0
            return Math.min(prev + itemsPerView, maxIndex)
        })
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => {
            if (prev <= 0) return maxIndex
            return Math.max(prev - itemsPerView, 0)
        })
    }

    // Paged dots logic: 0, 3, 6, ... and finally maxIndex
    const pagedIndices: number[] = []
    for (let i = 0; i < maxIndex; i += itemsPerView) {
        pagedIndices.push(i)
    }
    if (pagedIndices[pagedIndices.length - 1] !== maxIndex) {
        pagedIndices.push(maxIndex)
    }

    return (
        <section id="projects" className={`${styles.projectsSection} section-padding`}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <h2 className="section-title">
                        <span className="text-gradient">Selected Projects</span>
                    </h2>
                    <p className={`body-large ${styles.sectionSubtitle}`}>
                        A collection of full-stack AI systems and web applications,
                        showcasing the synergy between model engineering and product delivery.
                    </p>
                </div>

                <div className={styles.projectsContainer}>
                    <button className={`${styles.pageNav} ${styles.prev}`} onClick={prevSlide} aria-label="Previous projects">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>

                    <div className={styles.carouselViewport}>
                        <div
                            className={styles.carouselTrack}
                            style={{
                                transform: `translateX(-${currentIndex * (100 / totalItems)}%)`,
                                width: `${(totalItems / itemsPerView) * 100}%`
                            }}
                        >
                            {data.map((project, index) => (
                                <div
                                    key={index}
                                    className={styles.carouselItem}
                                    style={{ width: `${100 / totalItems}%` }}
                                >
                                    <div
                                        className={styles.projectCard}
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        <div className={styles.projectImageWrapper}>
                                            <Image
                                                src={getImagePath(project.images?.[0] || '/images/sample.png')}
                                                alt={project.title}
                                                fill
                                                className={styles.projectImage}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>

                                        <div className={styles.projectInfo}>
                                            <div className={styles.projectMeta}>
                                                <span className={styles.projectYear}>{project.year}</span>
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
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className={`${styles.pageNav} ${styles.next}`} onClick={nextSlide} aria-label="Next projects">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
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

            {/* Project Details Modal */}
            {selectedProject && (
                <div className={styles.modalOverlay} onClick={() => setSelectedProject(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeModal} onClick={() => setSelectedProject(null)}>×</button>

                        <div className={styles.modalScrollArea}>
                            <div className={styles.modalHero}>
                                <div className={styles.modalImageWrapper} style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                                    <Image
                                        src={getImagePath(selectedProject.images?.[0] || '/images/sample.png')}
                                        alt={selectedProject.title}
                                        fill
                                        className={styles.modalImage}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>

                            <div className={styles.modalInfo}>
                                <div className={styles.modalHeader}>
                                    <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
                                    <div className={styles.modalTags}>
                                        {selectedProject.tech.map((tech, i) => (
                                            <span key={i} className={styles.modalTag}>{tech}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.modalBody}>
                                    <div className={styles.modalMainText}>
                                        <div className={styles.projectSection}>
                                            <h3>Overview</h3>
                                            <p>{selectedProject.overview}</p>
                                        </div>

                                        <div className={styles.projectSection}>
                                            <h3>Problem & Challenge</h3>
                                            <p>{selectedProject.problem}</p>
                                        </div>

                                        <div className={styles.projectSection}>
                                            <h3>Role & Contribution</h3>
                                            <p>{selectedProject.role}</p>
                                        </div>

                                        <div className={styles.projectSection}>
                                            <h3>Solution</h3>
                                            <div dangerouslySetInnerHTML={{
                                                __html: selectedProject.solution.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
                                            }} />
                                        </div>

                                        <div className={styles.projectSection}>
                                            <h3>Learnings</h3>
                                            <p>{selectedProject.learnings}</p>
                                        </div>
                                    </div>

                                    <div className={styles.modalSidebar}>
                                        <div className={styles.sidebarItem}>
                                            <h4>Year</h4>
                                            <p>{selectedProject.year}</p>
                                        </div>
                                        {/* Role item removed as requested */}
                                        {selectedProject.link && (
                                            <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className={styles.visitButton}>
                                                Visit Site <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
