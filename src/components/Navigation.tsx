'use client'

import styles from '@/app/page.module.scss'

interface NavigationProps {
    activeSection: string
    isDarkBackground: boolean
    onNavClick: (id: string) => void
}

const navItems = [
    { id: 'overview', title: 'OVERVIEW' },
    { id: 'about', title: 'ABOUT ME' },
    { id: 'experience', title: 'EXPERIENCE' },
    { id: 'projects', title: 'PROJECTS' },
    { id: 'contact', title: 'CONTACT' }
]

export default function Navigation({ activeSection, isDarkBackground, onNavClick }: NavigationProps) {
    return (
        <nav className={`${styles.topNavigation} ${!isDarkBackground ? styles.lightNav : ''}`}>
            <div className={styles.navItems}>
                {navItems.map((section) => (
                    <button
                        key={section.id}
                        className={`${styles.navItem} ${activeSection === section.id ? styles.active : ''}`}
                        onClick={() => onNavClick(section.id)}
                    >
                        {section.title}
                    </button>
                ))}
            </div>
        </nav>
    )
}
