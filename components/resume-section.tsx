import { BookOpen, Briefcase, Code } from 'lucide-react'
import { resumeData } from '@/lib/portfolio-data'

interface ResumeSectionProps {
  data?: typeof resumeData
}

export function ResumeSection({ data = resumeData }: ResumeSectionProps) {
  return (
    <div className="space-y-8 md:space-y-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Resume</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      {/* Education */}
      <div>
        <div className="flex items-center gap-2 md:gap-3 mb-6">
          <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">Education</h3>
        </div>
        <div className="space-y-4">
          {data.education.map((item, index) => (
            <div key={index} className="relative pl-5 md:pl-6 pb-6 border-l-2 border-border last:pb-0">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />
              <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-xs md:text-sm text-accent mb-2">{item.period}</p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <div className="flex items-center gap-2 md:gap-3 mb-6">
          <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">Experience</h3>
        </div>
        <div className="space-y-4">
          {data.experience.map((item, index) => (
            <div key={index} className="relative pl-5 md:pl-6 pb-6 border-l-2 border-border last:pb-0">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                <h4 className="text-base md:text-lg font-semibold text-foreground">{item.title}</h4>
                <span className="text-xs md:text-sm text-accent">{item.period}</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">{item.company} · {item.location}</p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Skills */}
      <div>
        <div className="flex items-center gap-2 md:gap-3 mb-6">
          <Code className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">Technical Skills</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {data.skills.map((skillGroup, index) => (
            <div key={index} className="p-4 md:p-5 bg-secondary/40 backdrop-blur-md rounded-xl border border-white/10 dark:border-white/5 hover:border-accent hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <h4 className="text-sm md:text-base font-semibold text-accent mb-3">{skillGroup.category}</h4>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 md:px-4 md:py-1.5 bg-accent/10 text-accent text-xs md:text-sm font-medium rounded-lg hover:bg-accent/20 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      {data.softSkills && data.softSkills.length > 0 && (
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Soft Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {data.softSkills.map((skill, index) => (
              <div key={index} className="p-4 md:p-5 bg-secondary/40 backdrop-blur-md rounded-xl border border-white/10 dark:border-white/5 hover:border-accent hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Code className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">{skill.title}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
