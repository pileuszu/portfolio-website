import React from 'react'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '@/components/ErrorBoundary'

/** 항상 에러를 던지는 테스트용 컴포넌트 */
const BrokenComponent = () => {
  throw new Error('테스트 렌더링 에러')
}

/** 정상 렌더링 컴포넌트 */
const WorkingComponent = () => <div>정상 컴포넌트</div>

// 테스트 중 콘솔 에러 출력 억제
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => {
  jest.restoreAllMocks()
})

describe('ErrorBoundary', () => {
  it('자식 컴포넌트가 정상일 때 그대로 렌더링해야 한다', () => {
    render(
      <ErrorBoundary sectionName="테스트">
        <WorkingComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('정상 컴포넌트')).toBeInTheDocument()
  })

  it('에러 발생 시 기본 fallback UI를 표시해야 한다', () => {
    render(
      <ErrorBoundary sectionName="Projects">
        <BrokenComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText(/Projects 섹션을 불러오는 중 문제가 발생했습니다/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '다시 시도' })).toBeInTheDocument()
  })

  it('커스텀 fallback prop을 렌더링해야 한다', () => {
    render(
      <ErrorBoundary fallback={<div>커스텀 에러 UI</div>}>
        <BrokenComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('커스텀 에러 UI')).toBeInTheDocument()
  })

  it('fallback UI에 role="alert"이 있어야 한다', () => {
    render(
      <ErrorBoundary sectionName="테스트">
        <BrokenComponent />
      </ErrorBoundary>
    )
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
