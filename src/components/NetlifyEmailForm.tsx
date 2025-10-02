'use client'

import { useState } from 'react'
import styles from '../app/page.module.scss'

interface NetlifyEmailFormProps {
  onClose: () => void
}

export default function NetlifyEmailForm({ onClose }: NetlifyEmailFormProps) {
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Netlify Forms는 자동으로 처리됨
    setIsSuccess(true)
    setTimeout(() => {
      onClose()
    }, 2000)
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
      
      <h2>📧 Send Email</h2>
      
      <form 
        name="contact" 
        method="POST" 
        data-netlify="true" 
        data-netlify-honeypot="bot-field"
        className={styles.emailForm} 
        onSubmit={handleSubmit}
      >
        {/* Netlify Forms 필수 필드 */}
        <input type="hidden" name="form-name" value="contact" />
        <div style={{ display: 'none' }}>
          <input name="bot-field" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="John Doe"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="example@email.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="Hello! I'm interested in collaborating on a project..."
            rows={6}
          />
        </div>

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
            className={styles.submitButton}
          >
            Send Email
          </button>
        </div>
      </form>
    </div>
  )
}
