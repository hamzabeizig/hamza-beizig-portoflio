'use client'

export default function Marquee({ items }: { items: React.ReactNode[] }) {
  const row = [...items, ...items]
  return (
    <div className="marquee overflow-hidden">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span key={i} className="mx-8 inline-flex items-center opacity-70">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
