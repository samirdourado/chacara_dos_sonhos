import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  id?: string
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <p className="text-sm font-bold tracking-[0.18em] text-mata-600 uppercase">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-3xl font-semibold tracking-tight text-mata-900 text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </div>
  )
}
