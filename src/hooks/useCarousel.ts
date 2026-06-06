import { useState, useEffect } from 'react'

/** 반응형 캐러셀 뷰포트 기준 상수 */
const BREAKPOINT_MOBILE = 768
const BREAKPOINT_TABLET = 1200

interface UseCarouselOptions {
  /** 전체 아이템 수 */
  totalItems: number
}

interface UseCarouselReturn {
  currentIndex: number
  itemsPerView: number
  maxIndex: number
  setCurrentIndex: (index: number) => void
  nextSlide: () => void
  prevSlide: () => void
  /** 페이지네이션 dot에 사용할 인덱스 목록 */
  pagedIndices: number[]
}

/**
 * 반응형 캐러셀 상태 관리 훅.
 *
 * - 화면 크기에 따라 itemsPerView를 자동 조정 (모바일 1, 태블릿 2, 데스크탑 3)
 * - currentIndex가 maxIndex를 초과하면 자동 보정
 * - nextSlide / prevSlide 순환 슬라이드 지원
 */
export function useCarousel({ totalItems }: UseCarouselOptions): UseCarouselReturn {
  const [itemsPerView, setItemsPerView] = useState(3)
  const [currentIndex, setCurrentIndex] = useState(0)

  // 화면 크기에 따라 itemsPerView 동적 조정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= BREAKPOINT_MOBILE) setItemsPerView(1)
      else if (window.innerWidth <= BREAKPOINT_TABLET) setItemsPerView(2)
      else setItemsPerView(3)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, totalItems - itemsPerView)

  // 페이지네이션 dot 인덱스 계산
  const pagedIndices: number[] = []
  for (let i = 0; i < maxIndex; i += itemsPerView) {
    pagedIndices.push(i)
  }
  if (pagedIndices.length === 0 || pagedIndices[pagedIndices.length - 1] !== maxIndex) {
    pagedIndices.push(maxIndex)
  }

  // currentIndex가 maxIndex를 초과하지 않도록 보정
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [maxIndex, currentIndex])

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const nextIdx = pagedIndices.find((idx) => idx > prev)
      if (nextIdx !== undefined) return nextIdx
      return 0 // Wrap to start
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const lessThanPrev = pagedIndices.filter((idx) => idx < prev)
      if (lessThanPrev.length > 0) {
        return lessThanPrev[lessThanPrev.length - 1]
      }
      return pagedIndices[pagedIndices.length - 1] // Wrap to end
    })
  }

  return {
    currentIndex,
    itemsPerView,
    maxIndex,
    setCurrentIndex,
    nextSlide,
    prevSlide,
    pagedIndices,
  }
}
