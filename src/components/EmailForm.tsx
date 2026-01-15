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
    <div className={`${styles.emailFormCard} glass`} onClick={(e) => e.stopPropagation()}>
      <button className={styles.formCloseBtn} onClick={onClose} aria-label="Close form">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Send a Message</h2>
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
            placeholder="What's your name?"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="from_email" className={styles.inputLabel}>Email</label>
          <input
            type="email"
            id="from_email"
            name="from_email"
            className={styles.formInput}
            value={formData.from_email}
            onChange={handleChange}
            required
            placeholder="where can I reach you?"
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
            placeholder="Tell me about your project..."
            rows={5}
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
              Send Message
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
