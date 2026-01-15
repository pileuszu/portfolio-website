'use client'

import { useState, useEffect } from 'react'
import styles from '../../app/page.module.scss'
import { BASE_PATH } from '../../data/config'

interface OverviewProps {
    onScrollDown: () => void
}

export default function Overview({ onScrollDown }: OverviewProps) {
    const [showNameText, setShowNameText] = useState(false)
    const [showJobText, setShowJobText] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const timer1 = setTimeout(() => setShowNameText(true), 500)
        const timer2 = setTimeout(() => setShowJobText(true), 1000)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [])

    useEffect(() => {
        const overviewSection = document.getElementById('overview')
        if (overviewSection) {
            overviewSection.style.backgroundImage = `url('${BASE_PATH}/images/profile.jpg')`
        }

        // MouseMove handler
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <section id="overview" className={styles.overviewSection}>
            <div className={styles.geometricPattern}>
                <div className={styles.patternDots}></div>
                <div className={styles.patternLines}></div>
            </div>

            <div
                className={styles.interactiveElement}
                style={{
                    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                }}
            ></div>

            {(showNameText || showJobText) && (
                <div className={styles.textContainer}>
                    {showNameText && <div className={styles.nameText}>JIHWAN KIM</div>}
                    {showJobText && <div className={styles.jobText}>SOFTWARE ENGINEER</div>}
                </div>
            )}

            <div className={styles.scrollDownContainer}>
                <button className={styles.scrollDownButton} onClick={onScrollDown}>
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <path d="M15,33 L50,67 L85,33" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </button>
            </div>
        </section>
    )
}
