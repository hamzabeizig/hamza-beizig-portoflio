import Reveal from './Reveal'

/**
 * Renders a heading where the word(s) wrapped in *asterisks* become the
 * Instrument-Serif italic gradient accent, e.g. "What I do *best.*"
 */
export function AccentHeading({
  text,
  className = 'h2',
  tag = 'h2',
}: {
  text: string
  className?: string
  tag?: 'h1' | 'h2'
}) {
  const Tag = tag
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean)
  return (
    <Tag className={className}>
      {parts.map((p, i) =>
        p.startsWith('*') && p.endsWith('*') ? (
          <span key={i} className="font-serif-accent text-grad">
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </Tag>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  className = '',
  tone = 'light',
}: {
  eyebrow: string
  title: string
  className?: string
  tone?: 'light' | 'ink'
}) {
  return (
    <Reveal className={className}>
      <p className={`eyebrow mb-3 ${tone === 'ink' ? 'text-[var(--on-ink-dim)]' : ''}`}>{eyebrow}</p>
      <AccentHeading text={title} />
    </Reveal>
  )
}
