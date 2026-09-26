import { stats, profile, countryFlags } from '@/data/profile'
import Reveal from '@/components/kit/Reveal'
import SpectrumLine from '@/components/kit/SpectrumLine'
import type { CountryCode } from '@/data/profile'

export default function Stats() {
  return (
    <section className="relative z-20 mx-auto -mt-16 w-full max-w-[1200px] px-6 sm:-mt-20">
      <div className="grid grid-cols-2 gap-4 min-[961px]:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 60}>
            <div className="group card relative h-full overflow-hidden p-6 pb-10 transition-transform duration-300 hover:-translate-y-1">
              <span
                className="absolute inset-x-0 top-0 h-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'var(--grad)' }}
              />
              <div className="relative z-10">
                <div className="stat-num text-[42px] font-semibold leading-none tracking-tight">
                  {s.value}
                </div>
                <div className="mt-3 flex items-center gap-2 text-[14px] text-[var(--muted)]">
                  {s.label}
                </div>
                {s.countries && (
                  <div className="mt-3 flex gap-1.5">
                    {s.countries.map((c) => (
                      <span
                        key={c}
                        className="grid h-6 w-6 place-items-center rounded-full bg-[var(--page)] text-[13px] ring-1 ring-[var(--line)]"
                        title={c}
                      >
                        {countryFlags[c as CountryCode]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <SpectrumLine className="opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </Reveal>
        ))}

        <Reveal delay={stats.length * 60}>
          <div className="card-ink relative h-full overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1">
            <div
              className="halo"
              style={{ top: -40, right: -30, width: 160, height: 160, background: 'var(--violet)', opacity: 0.5 }}
            />
            <div className="relative z-10">
              <div className="flex flex-wrap gap-1.5">
                {profile.ai.map((a) => (
                  <span
                    key={a}
                    className="rounded-full bg-white/10 px-2.5 py-1 text-[12px] font-medium text-white"
                  >
                    {a}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[14px] leading-snug text-[var(--on-ink-muted)]">
                <span className="font-medium text-white">LLMs &amp; agents</span> integration across web apps.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
