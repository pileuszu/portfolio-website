'use client'

import { useEffect, useRef } from 'react'
import styles from './ParticleCanvas.module.scss'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

const PARTICLE_COUNT = 70
const CONNECTION_DISTANCE = 140
const MOUSE_REPEL_RADIUS = 120
const MOUSE_REPEL_STRENGTH = 0.08

/**
 * Hero 섹션 배경용 인터랙티브 파티클 네트워크 (Constellation).
 *
 * - 70개 점이 천천히 떠다니며 가까운 점끼리 선으로 연결됨
 * - 마우스 커서 접근 시 파티클이 밀려남
 * - pointer-events: none → 클릭/인터랙션을 상위 콘텐츠에 그대로 전달
 * - prefers-reduced-motion: 정지 상태로 1회만 렌더링
 */
export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let animId: number
    const mouse = { x: -9999, y: -9999 }
    let particles: Particle[] = []

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.45 + 0.25,
      }))
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        if (!prefersReduced) {
          // 마우스 반발력
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_REPEL_RADIUS && dist > 0) {
            const force = (MOUSE_REPEL_RADIUS - dist) / MOUSE_REPEL_RADIUS
            p.vx += (dx / dist) * force * MOUSE_REPEL_STRENGTH
            p.vy += (dy / dist) * force * MOUSE_REPEL_STRENGTH
          }

          // 속도 제한 (감쇠)
          p.vx *= 0.99
          p.vy *= 0.99
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
          if (speed > 1.8) { p.vx = (p.vx / speed) * 1.8; p.vy = (p.vy / speed) * 1.8 }

          p.x += p.vx
          p.y += p.vy

          // 반대쪽에서 강하게 등장: wrap + 속도 부스트
          const WRAP_BOOST = 1.6
          if (p.x < 0) { p.x = width;  p.vx *= WRAP_BOOST }
          else if (p.x > width)  { p.x = 0;      p.vx *= WRAP_BOOST }
          if (p.y < 0) { p.y = height; p.vy *= WRAP_BOOST }
          else if (p.y > height) { p.y = 0;      p.vy *= WRAP_BOOST }
        }

        // 점 그리기
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`
        ctx.fill()
      }

      // 연결선 그리기
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.35
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      if (!prefersReduced) {
        animId = requestAnimationFrame(draw)
      }
    }

    const onResize = () => { resize(); initParticles() }

    resize()
    initParticles()
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', onResize)

    if (prefersReduced) {
      draw()
    } else {
      animId = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={styles.particleCanvas}
      aria-hidden="true"
    />
  )
}
