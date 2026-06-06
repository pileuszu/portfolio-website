'use client'

import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  /** 얼마나 보여야 트리거되는지 (0~1). 기본값 0.15 */
  threshold?: number
  /** 한 번만 트리거할지 여부. 기본값 true */
  triggerOnce?: boolean
  /** 루트 마진 (CSS margin 형식). 기본값 '0px 0px -60px 0px' */
  rootMargin?: string
}

/**
 * Intersection Observer 기반 스크롤 진입 감지 훅.
 *
 * @example
 * const [ref, isVisible] = useInView()
 * <div ref={ref} className={isVisible ? styles.visible : ''} />
 */
export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.15,
  triggerOnce = true,
  rootMargin = '0px 0px -60px 0px',
}: UseInViewOptions = {}): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null) as React.RefObject<T>
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // prefers-reduced-motion: 즉시 visible 처리 (애니메이션 스킵)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) observer.unobserve(el)
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, triggerOnce, rootMargin])

  return [ref, isVisible]
}
