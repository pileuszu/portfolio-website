'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import styles from '../app/page.module.scss'

interface EmailFormProps {
  onClose: () => void
}

export default function EmailForm({ onClose }: EmailFormProps) {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  // EmailJS 설정 (환경변수에서 가져오기)
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // EmailJS를 사용한 이메일 전송
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          message: formData.message,
          to_email: 'korltzeno@gmail.com' // 받는 사람 이메일
        },
        PUBLIC_KEY
      )

      if (result.status === 200) {
        setIsSuccess(true)
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    } catch (error) {
      console.error('Email sending failed:', error)
      setError('Failed to send email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={styles.emailOverlayContent}>
        <div className={styles.successMessage}>
          <h2>✅ Email sent successfully!</h2>
          <p>I'll get back to you as soon as possible.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.emailOverlayContent} onClick={(e) => e.stopPropagation()}>
      <button
        className={styles.closeButton}
        onClick={onClose}
      >
        ×
      </button>
      
      <h2>Send Email</h2>
      
      <form className={styles.emailForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="from_name">Name *</label>
          <input
            type="text"
            id="from_name"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="from_email">Email *</label>
          <input
            type="email"
            id="from_email"
            name="from_email"
            value={formData.from_email}
            onChange={handleChange}
            required
            placeholder="example@email.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Hello! I'm interested in collaborating on a project..."
            rows={6}
          />
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <div className={styles.formActions}>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </form>
    </div>
  )
}
