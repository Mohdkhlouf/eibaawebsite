"use client"
import React from 'react'
import { FaFacebook, FaInstagram, FaTelegram, FaWhatsapp, FaTiktok} from 'react-icons/fa'
import { IconType } from 'react-icons'

type SocialLink = {
  href: string
  icon: IconType
}

const links: SocialLink[] = [
  { href: 'https://www.facebook.com/eibaa.abutaha', icon: FaFacebook },
  { href: 'https://www.instagram.com/eiba_abutaha', icon: FaInstagram },
  { href: 'https://t.me/eibaabutaha', icon: FaTelegram },
  { href: 'https://wa.me/+972598183137', icon: FaWhatsapp },
  { href: 'https://www.tiktok.com/@eiba_abutaha', icon: FaTiktok },
]

export const SocialMediaLinks: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      {links.map(({ href, icon: Icon }) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${href}`}>
          <span className="rounded-full w-8 h-8 flex items-center justify-center bg-white text-[var(--mainColor)] text-sm m-2">
            <Icon />
          </span>
        </a>
      ))}
    </div>
  )
}
