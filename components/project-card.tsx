import Image from 'next/image'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
}

export function ProjectCard({
  title,
  description,
  tags,
  image,
}: ProjectCardProps) {
  return (
    <article className="group cursor-pointer flex flex-col bg-card/40 backdrop-blur-md rounded-2xl border border-white/10 dark:border-white/5 overflow-hidden hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 transition-all duration-300">
      <div className="overflow-hidden bg-card/50 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4 md:p-6 flex-1 flex flex-col">
        <h3 className="mb-3 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
          {title}
        </h3>
        <p className="mb-4 flex-1 text-balance text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="border border-white/10 dark:border-white/5 bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
