'use client'

import React, { useState } from 'react'
import styles from '@/app/page.module.scss'
import { ProjectItem } from '@/types'
import { BASE_PATH } from '@/data/config'

interface ProjectsProps {
    data: ProjectItem[]
}

export default function Projects({ data }: ProjectsProps) {
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
    const [currentProjectPage, setCurrentProjectPage] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [projectAnimationClass, setProjectAnimationClass] = useState('')

    // Helper for image paths
    const getImagePath = (path: string) => {
        return `${BASE_PATH}${path}`
    }

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = getImagePath('/images/sample.png')
    }

    const handlePageChange = (newPage: number, direction: 'left' | 'right') => {
        if (isTransitioning) return

        setIsTransitioning(true)
        setProjectAnimationClass(direction === 'left' ? 'slideOutRight' : 'slideOutLeft')

        setTimeout(() => {
            setCurrentProjectPage(newPage)
            setProjectAnimationClass(direction === 'left' ? 'slideInLeft' : 'slideInRight')

            setTimeout(() => {
                setProjectAnimationClass('')
                setIsTransitioning(false)
            }, 500)
        }, 250)
    }

    const nextPage = () => {
        const totalPages = Math.ceil(data.length / 6)
        if (currentProjectPage < totalPages - 1) {
            handlePageChange(currentProjectPage + 1, 'right')
        }
    }

    const prevPage = () => {
        if (currentProjectPage > 0) {
            handlePageChange(currentProjectPage - 1, 'left')
        }
    }

    // Prevent background scroll when overlay is open
    if (typeof document !== 'undefined') {
        document.body.style.overflow = selectedProject ? 'hidden' : 'unset'
    }

    const currentItems = data.slice(currentProjectPage * 6, (currentProjectPage + 1) * 6)
    const placeholderCount = 6 - currentItems.length

    return (
        <section id="projects" className={styles.projectsSection}>
            <div className={styles.portfolioLayout}>
                <div className={styles.portfolioLeft}>
                    <h2 className={styles.portfolioTitle}>Featured Projects</h2>
                    <p className={styles.portfolioSubtitle}>
                        Building innovative solutions that make a difference. Each project represents
                        a unique challenge solved with creativity and technical excellence.
                    </p>
                </div>
                <div className={styles.portfolioRight}>
                    <div className={styles.projectsGrid}>
                        {currentProjectPage > 0 && (
                            <button
                                className={styles.gridNavLeft}
                                onClick={prevPage}
                                disabled={isTransitioning}
                            >
                                <svg width="100" height="100" viewBox="0 0 100 100">
                                    <path d="M67,85 L33,50 L67,15" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </button>
                        )}

                        <div className={`${styles.gridContainer} ${projectAnimationClass ? styles[projectAnimationClass] : ''}`}>
                            {currentItems.map((item, index) => (
                                <div
                                    key={`${currentProjectPage}-${index}`}
                                    className={styles.gridItem}
                                    onClick={() => setSelectedProject(item)}
                                >
                                    <div className={styles.gridImage}>
                                        <img
                                            src={getImagePath(item.images?.[0] || '/images/sample.png')}
                                            alt={item.title}
                                            onError={handleImageError}
                                        />
                                    </div>
                                    <div className={styles.gridContent}>
                                        <h4>{item.title}</h4>
                                        <p>{item.desc}</p>
                                        <div className={styles.gridTags}>
                                            <span className={styles.gridYear}>{item.year}</span>
                                            <span className={`${styles.projectType} ${item.type === 'team' ? styles.team : styles.individual}`}>
                                                {item.type === 'team' ? 'Team Project' : item.type === 'blog' ? 'Blog' : 'Individual'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Placeholders */}
                            {Array.from({ length: placeholderCount }).map((_, index) => (
                                <div
                                    key={`placeholder-${index}`}
                                    className={styles.gridItem}
                                    style={{ visibility: 'hidden', pointerEvents: 'none' }}
                                ></div>
                            ))}
                        </div>

                        {currentProjectPage < Math.ceil(data.length / 6) - 1 && (
                            <button
                                className={styles.gridNavRight}
                                onClick={nextPage}
                                disabled={isTransitioning}
                            >
                                <svg width="100" height="100" viewBox="0 0 100 100">
                                    <path d="M33,15 L67,50 L33,85" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Project Overlay */}
            {selectedProject && (
                <div className={styles.projectOverlay} onClick={() => setSelectedProject(null)}>
                    <div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.overlayImage}>
                            <img
                                src={getImagePath(selectedProject.images?.[0] || '/images/sample.png')}
                                alt={selectedProject.title}
                                onError={handleImageError}
                            />
                        </div>
                        <div className={styles.overlayDetails}>
                            <h2>{selectedProject.title}</h2>
                            <p className={styles.overlayDesc}>{selectedProject.desc}</p>
                            <div className={styles.overlayDetailsText}>
                                <div dangerouslySetInnerHTML={{
                                    __html: selectedProject.details
                                        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        .replace(/\n\n/g, '<br/>')
                                        .replace(/^- (.*$)/gm, '<li>$1</li>')
                                }} />
                            </div>
                            <div className={styles.techStack}>
                                <h4>Technologies Used:</h4>
                                <div className={styles.techTags}>
                                    {selectedProject.tech.map((tech, index) => (
                                        <span key={index} className={styles.techTag}>{tech}</span>
                                    ))}
                                </div>
                            </div>
                            {selectedProject.link && (
                                <div className={styles.projectLink}>
                                    <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        View Project
                                    </a>
                                </div>
                            )}
                            <div className={styles.projectYear}>
                                <span>Year: {selectedProject.year}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
