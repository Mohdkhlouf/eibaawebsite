import { iconMap } from '@/lib/socialIcons'

export const SocialMediaLinks = ({ links = [] }: { links?: { id: number; url: string; icon: string; name: string }[] }) => {  return (
    <div className="flex items-center justify-center gap-2">
      {links.map(({ id, url, icon, name }) => {
        const Icon = iconMap[icon]
        if (!Icon) return null
        return (
          <a key={id} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
            <span className="rounded-full w-8 h-8 flex items-center justify-center bg-white text-[var(--mainColor)] text-sm m-2">
              <Icon />
            </span>
          </a>
        )
      })}
    </div>
  )
}
