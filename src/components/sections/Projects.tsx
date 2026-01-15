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

    const getImagePath = (path: string) => {
        return `${BASE_PATH}${path}`
    }

    if (typeof document !== 'undefined') {
        document.body.style.overflow = selectedProject ? 'hidden' : 'unset'
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

                <div className={styles.projectsGallery}>
                    {data.map((project, index) => (
                        <div
                            key={index}
                            className={styles.projectCard}
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* Browser Mockup Style */}
                            <div className={styles.browserMockup}>
                                <div className={styles.browserHeader}>
                                    <div className={styles.browserDots}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div className={styles.browserUrl}>{project.title.toLowerCase().replace(/\s+/g, '-')}.ai</div>
                                </div>
                                <div className={styles.browserBody}>
                                    <Image
                                        src={getImagePath(project.images?.[0] || '/images/sample.png')}
                                        alt={project.title}
                                        width={800}
                                        height={500}
                                        className={styles.projectImage}
                                    />
                                </div>
                            </div>

                            <div className={styles.projectInfo}>
                                <div className={styles.projectMeta}>
                                    <span className={styles.projectYear}>{project.year}</span>
                                    <span className={styles.projectType}>{project.type === 'team' ? 'Team' : 'Individual'}</span>
                                </div>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.projectShortDesc}>{project.desc}</p>
                                <div className={styles.projectSkills}>
                                    {project.tech.slice(0, 3).map((tech, i) => (
                                        <span key={i} className={styles.skillBadge}>{tech}</span>
                                    ))}
                                    {project.tech.length > 3 && <span className={styles.skillBadge}>+{project.tech.length - 3}</span>}
                                </div>
                            </div>
                        </div>
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
                                <Image
                                    src={getImagePath(selectedProject.images?.[0] || '/images/sample.png')}
                                    alt={selectedProject.title}
                                    width={1000}
                                    height={600}
                                    className={styles.modalImage}
                                />
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
                                        <div dangerouslySetInnerHTML={{
                                            __html: selectedProject.details
                                                .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                .replace(/\n\n/g, '<br/><br/>')
                                                .replace(/^- (.*$)/gm, '<li>$1</li>')
                                        }} />
                                    </div>

                                    <div className={styles.modalSidebar}>
                                        <div className={styles.sidebarItem}>
                                            <h4>Year</h4>
                                            <p>{selectedProject.year}</p>
                                        </div>
                                        <div className={styles.sidebarItem}>
                                            <h4>Role</h4>
                                            <p>{selectedProject.type === 'team' ? 'Lead Developer' : 'Solo Architect'}</p>
                                        </div>
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
