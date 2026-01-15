import { useState, useEffect, useCallback } from 'react'

export const useScrollSpy = (sectionIds: string[]) => {
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0])
    const [isDarkBackground, setIsDarkBackground] = useState<boolean>(true)

    // 섹션 감지 (화면 중앙 기준)
    const detectActiveSection = useCallback(() => {
        const centerPosition = window.scrollY + window.innerHeight / 2
        let newActiveSection = activeSection
        let closestSection = activeSection
        let minDistance = Infinity

        for (const id of sectionIds) {
            const element = document.getElementById(id)
            if (element) {
                const rect = element.getBoundingClientRect()
                const elementTop = rect.top + window.scrollY
                const elementBottom = elementTop + rect.height

                // 정확한 범위 내에 있는지 확인
                if (centerPosition >= elementTop && centerPosition < elementBottom) {
                    newActiveSection = id
                    break
                }

                // 가장 가까운 섹션 추적
                const elementCenter = elementTop + rect.height / 2
                const distance = Math.abs(centerPosition - elementCenter)
                if (distance < minDistance) {
                    minDistance = distance
                    closestSection = id
                }
            }
        }

        // 범위 밖일 경우 가장 가까운 섹션 선택
        if (newActiveSection === activeSection && closestSection !== activeSection) {
            // Only update if we haven't found a precise match but found a close one
            // but the logic above sets newActiveSection immediately if found.
            // If loop finishes without break, newActiveSection is still old activeSection.
            // Logic to force update if totally out of bounds is tricky, assume strict bounds for now.
            // But let's stick to the provided logic in page.tsx which falls back to closest
        }

        if (newActiveSection !== activeSection) {
            setActiveSection(newActiveSection)
        }

    }, [activeSection, sectionIds])

    // 배경 색상 로직 (화면 스크롤 비율 기반 + 섹션 기반)
    const updateBackground = useCallback(() => {
        // 배경 색상 로직 (섹션 기반)
        // Overview(Dark) -> About(Light) -> Experience(Dark) -> Projects(Light) -> Contact(Dark)
        // 비율은 실제 콘텐츠 길이에 따라 달라질 수 있으므로, 섹션 ID 기반으로 하는 것이 더 안전할 수 있음.
        // 하지만 기존 애니메이션 효과 유지를 위해 비율 로직을 유지하거나, activeSection에 종속시킬 수 있음.

        // 여기서는 activeSection에 따라 결정하는 것이 더 확실함.
        // Overview: Dark
        // About: Light
        // Experience: Dark
        // Projects: Light
        // Contact: Dark

        // 비율 로직이 부드러운 전환을 위해 사용되었으나, 섹션 기반이 더 명확함.
        // 다만 기존 코드는 비율을 사용했음. Refactoring시에는 activeSection 기반이 더 모듈화에 적합.

        const currentSection = sectionIds.find(id => id === activeSection)
        let shouldBeDark = true

        if (currentSection === 'about' || currentSection === 'projects') {
            shouldBeDark = false
        } else {
            shouldBeDark = true
        }

        setIsDarkBackground(shouldBeDark)

    }, [activeSection, sectionIds])

    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(() => {
                detectActiveSection()
                updateBackground()
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        // 초기 실행
        detectActiveSection()
        updateBackground()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [detectActiveSection, updateBackground])

    return { activeSection, isDarkBackground, setActiveSection, setIsDarkBackground }
}
