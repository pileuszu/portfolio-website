'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import styles from './page.module.scss'

export default function NotFound() {
  // 페이지 제목 설정
  useEffect(() => {
    document.title = '404 - 페이지를 찾을 수 없습니다'
  }, [])

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        <div className={styles.notFoundNumber}>404</div>
        <h1 className={styles.notFoundTitle}>페이지를 찾을 수 없습니다</h1>
        <p className={styles.notFoundDescription}>
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <div className={styles.notFoundActions}>
          <Link href="/" className={styles.homeButton}>
            홈으로 돌아가기
          </Link>
          <button 
            className={styles.backButton}
            onClick={() => window.history.back()}
          >
            이전 페이지로
          </button>
        </div>
      </div>
      
      {/* 배경 애니메이션 */}
      <div className={styles.backgroundAnimation}>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
      </div>
    </div>
  )
}
