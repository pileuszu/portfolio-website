'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  /** 에러 없을 때 렌더링할 자식 컴포넌트 */
  children: ReactNode
  /** 에러 발생 시 보여줄 fallback UI (선택). 미지정 시 기본 UI 사용 */
  fallback?: ReactNode
  /** 섹션 이름 — 에러 메시지에 표시 */
  sectionName?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * ErrorBoundary
 *
 * React 클래스 컴포넌트 기반 에러 경계.
 * 하위 트리에서 렌더링 에러가 발생해도 전체 앱이 크래시되지 않도록 격리합니다.
 *
 * 사용 예:
 * ```tsx
 * <ErrorBoundary sectionName="Projects">
 *   <Projects data={data} />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // 프로덕션 환경에서는 Sentry 등 에러 트래킹 서비스로 전송
    console.error(`[ErrorBoundary] ${this.props.sectionName ?? 'Unknown'} 섹션 에러:`, error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            padding: '40px 20px',
            textAlign: 'center',
            color: '#4B5563',
            gap: '16px',
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6366F1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#111827' }}>
            {this.props.sectionName
              ? `${this.props.sectionName} 섹션을 불러오는 중 문제가 발생했습니다.`
              : '콘텐츠를 불러오는 중 문제가 발생했습니다.'}
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '10px 24px',
              background: '#6366F1',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            다시 시도
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
