'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ReCAPTCHA from 'react-google-recaptcha'
import { Mail, Phone, MapPin, Linkedin, ArrowUpRight, Loader2, Check } from 'lucide-react'
import { profile, contactTopics, mapEmbedUrl, navLinks } from '@/data/profile'
import { AccentHeading } from '@/components/kit/SectionHeading'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Tell me a bit more (10+ chars)'),
})
type FormValues = z.infer<typeof schema>

const info = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { icon: MapPin, label: 'Based in', value: profile.location },
  { icon: Linkedin, label: 'LinkedIn', value: 'hamza-beizig', href: profile.linkedin },
]

// A dark Google Maps styling passed to the embed via the legacy iframe is not
// configurable; we keep the existing embed and wrap it in a dark, rounded frame.

export default function Contact() {
  const [topic, setTopic] = useState(contactTopics[0])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [token, setToken] = useState<string | null>(null)
  const captchaRef = useRef<ReCAPTCHA>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    if (!token) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // topic added; subject kept for backward compatibility with the route
        body: JSON.stringify({ ...values, topic, subject: topic, recaptchaToken: token }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
      reset()
      captchaRef.current?.reset()
      setToken(null)
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section
      id="contact"
      className="on-ink relative isolate w-full overflow-hidden bg-[var(--ink)]"
    >
      {/* Top wave: light page descending into the dark section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] leading-[0]">
        <svg viewBox="0 0 1440 130" preserveAspectRatio="none" className="block h-[90px] w-full sm:h-[120px]">
          <path
            d="M0,0 L1440,0 L1440,72 C1230,20 1020,96 720,66 C420,36 240,96 0,64 Z"
            fill="var(--blue)"
            opacity="0.10"
          />
          <path
            d="M0,0 L1440,0 L1440,50 C1220,4 990,80 720,44 C460,10 260,74 0,42 Z"
            fill="var(--page)"
          />
        </svg>
      </div>

      <div
        className="halo"
        style={{ top: -60, right: '15%', width: 360, height: 360, background: 'var(--violet)', opacity: 0.3 }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 pt-32 sm:px-10 sm:pb-20 sm:pt-40">
        <div className="grid gap-10 min-[961px]:grid-cols-2">
          {/* Left */}
          <div>
            <p className="eyebrow mb-3 text-[var(--on-ink-dim)]">Contact</p>
            <AccentHeading text="Let's build something *smart.*" className="h2 text-white" />
            <p className="mt-5 max-w-[460px] text-[16px] leading-relaxed text-[var(--on-ink-muted)]">
              Have a role, a product idea, or an AI integration in mind? I&apos;m always happy to talk.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {info.map((it) => {
                const Icon = it.icon
                const inner = (
                  <div className="flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]">
                    <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-white/10 text-white">
                      <Icon size={17} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[10.5px] uppercase tracking-wider text-[var(--on-ink-dim)]">
                        {it.label}
                      </p>
                      <p className="truncate text-[13.5px] text-white">{it.value}</p>
                    </div>
                  </div>
                )
                return it.href ? (
                  <a key={it.label} href={it.href} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={it.label}>{inner}</div>
                )
              })}
            </div>

            {/* Map */}
            <div className="mt-6 overflow-hidden rounded-[20px] border border-white/10">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="240"
                style={{ border: 0, filter: 'grayscale(0.4) invert(0.9) hue-rotate(180deg)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Monastir, Tunisia"
              />
            </div>
          </div>

          {/* Right — form */}
          <div className="card p-7 text-[var(--text)] sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div>
                <p className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
                  I&apos;m reaching out about
                </p>
                <div className="flex flex-wrap gap-2">
                  {contactTopics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={cn(
                        'rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all',
                        topic === t
                          ? 'border-transparent bg-[var(--ink)] text-white'
                          : 'border-[var(--line)] text-[var(--muted)] hover:border-[var(--dim)]',
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <Field label="Name" error={errors.name?.message}>
                <input
                  {...register('name')}
                  placeholder="Your name"
                  className="input-field"
                  autoComplete="name"
                />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register('email')}
                  placeholder="you@email.com"
                  className="input-field"
                  autoComplete="email"
                />
              </Field>
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="A few words about what you need…"
                  className="input-field resize-none"
                />
              </Field>

              <ReCAPTCHA
                ref={captchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={(t) => setToken(t)}
              />

              <button
                type="submit"
                disabled={status === 'loading' || !token}
                className="btn btn-ink w-full justify-center disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </>
                ) : status === 'success' ? (
                  <>
                    Message sent <span className="bubble" aria-hidden><Check size={15} /></span>
                  </>
                ) : (
                  <>
                    Send message
                    <span className="bubble" aria-hidden>
                      <ArrowUpRight size={15} strokeWidth={2.25} />
                    </span>
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="text-[13px] font-medium text-[var(--mint)]">
                  Thanks! Your message has been sent.
                </p>
              )}
              {status === 'error' && (
                <p className="text-[13px] font-medium text-[#e5484d]">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold text-white"
              style={{ background: 'var(--grad)' }}
            >
              HB
            </span>
            <span className="text-[14px] font-medium text-white">Hamza Beizig</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-[13px] text-[var(--on-ink-muted)] hover:text-white">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-[12.5px] text-[var(--on-ink-dim)]">
            {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </section>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-[12px] text-[#e5484d]">{error}</span>}
    </label>
  )
}
