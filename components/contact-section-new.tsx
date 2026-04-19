'use client'

import { Mail, Phone, MapPin, Send, Calendar } from 'lucide-react'
import { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { contactData } from '@/lib/portfolio-data'

interface ContactSectionProps {
  data?: typeof contactData
}

export function ContactSection({ data = contactData }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!recaptchaToken) return

    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      })

      if (!res.ok) throw new Error('Failed to send message')

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      if (recaptchaRef.current) recaptchaRef.current.reset()
      setRecaptchaToken(null)
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error(error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Contact</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      <div className="w-full h-64 md:h-80 rounded-xl md:rounded-2xl overflow-hidden border border-border bg-secondary">
        <iframe
          src={data.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors group">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Birthday</h3>
            <p className="text-sm md:text-base text-foreground font-medium">{data.birthday}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors group">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
            <MapPin className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Address</h3>
            <p className="text-sm md:text-base text-foreground font-medium">{data.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors group">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
            <Phone className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          </div>
          <div>
            <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Phone</h3>
            <a
              href={`tel:${data.phone.replace(/\s/g, '')}`}
              className="text-sm md:text-base text-foreground hover:text-accent transition-colors font-medium"
            >
              {data.phone}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors group">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
            <Mail className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Email</h3>
            <a
              href={`mailto:${data.email}`}
              className="text-sm md:text-base text-foreground hover:text-accent transition-colors font-medium truncate block"
            >
              {data.email}
            </a>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all text-sm md:text-base"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all text-sm md:text-base"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all text-sm md:text-base"
            placeholder="What is this about?"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all resize-none text-sm md:text-base"
            placeholder="Write your message here..."
            required
          />
        </div>

        <div className="w-full overflow-hidden flex sm:justify-start">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            onChange={(token) => setRecaptchaToken(token)}
            theme="dark" // assuming the default aesthetic leans dark, but it will work either way
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            type="submit"
            disabled={status === 'loading' || !recaptchaToken}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 bg-accent text-accent-foreground rounded-xl font-medium hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 transition-all text-sm md:text-base disabled:opacity-70 disabled:pointer-events-none"
          >
            {status === 'loading' ? (
              <>
                <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                Sending...
              </>
            ) : status === 'success' ? (
              <>
                <Send className="w-4 h-4" />
                Message Sent!
              </>
            ) : (
              <>
                <Send className="w-4 h-4 relative -ml-1" />
                Send Message
              </>
            )}
          </button>

          {status === 'success' && (
            <p className="text-sm font-medium text-green-500 dark:text-green-400">
              Your message has been sent successfully!
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              Failed to send message. Please try again.
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
