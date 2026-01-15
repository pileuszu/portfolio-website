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
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.from_name,
          from_email: formData.from_email,
          message: formData.message,
          to_email: 'korltzeno@gmail.com'
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
      <div className={styles.emailSuccessOverlay}>
        <div className={styles.successAnimation}>
          <svg viewBox="0 0 52 52" className={styles.checkmark}>
            <circle cx="26" cy="26" r="25" fill="none" className={styles.checkmarkCircle} />
            <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" className={styles.checkmarkCheck} />
          </svg>
          <h2 className={styles.successTitle}>Message Sent!</h2>
          <p className={styles.successDesc}>I&apos;ll get back to you shortly.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.emailFormCard} onClick={(e) => e.stopPropagation()}>
      <button className={styles.formCloseBtn} onClick={onClose} aria-label="Close form">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Get in Touch</h2>
        <p className={styles.formSubtitle}>Have a project in mind? Let&apos;s talk about it.</p>
      </div>

      <form className={styles.emailForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="from_name" className={styles.inputLabel}>Name</label>
          <input
            type="text"
            id="from_name"
            name="from_name"
            className={styles.formInput}
            value={formData.from_name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="from_email" className={styles.inputLabel}>Email Address</label>
          <input
            type="email"
            id="from_email"
            name="from_email"
            className={styles.formInput}
            value={formData.from_email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message" className={styles.inputLabel}>Message</label>
          <textarea
            id="message"
            name="message"
            className={styles.formTextarea}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Tell me more about your project goals and how I can help..."
            rows={4}
          />
        </div>

        {error && <p className={styles.formError}>{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className={`${styles.formSubmitBtn} ${isLoading ? styles.loading : ''}`}
        >
          {isLoading ? (
            <span className={styles.loader}></span>
          ) : (
            <>
              <span>Send Message</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
