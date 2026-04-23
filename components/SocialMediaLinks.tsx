"use client"
import React from 'react'

type SocialLink = {
  href: string
  icon: string
}

const links: SocialLink[] = [
  { href: 'https://www.facebook.com/eibaa.abutaha', icon: 'fa-brands fa-facebook' },
  { href: 'https://www.instagram.com/eiba_abutaha', icon: 'fa-brands fa-instagram' },
  { href: 'https://t.me/eibaabutaha', icon: 'fa-brands fa-telegram' },
  { href: 'https://wa.me/+972598183137', icon: 'fa-brands fa-whatsapp' },
  { href: 'https://www.tiktok.com/@eiba_abutaha', icon: 'fa-brands fa-tiktok' },
  { href: 'https://open.spotify.com/show/7nDHB7lyMd1GBwz5pxapzy', icon: 'fa-brands fa-spotify' },
]

export const SocialMediaLinks: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      {links.map(({ href, icon }) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${href}`}>
          <i className={`${icon} rounded-full w-8 h-8 flex items-center justify-center bg-white text-[var(--mainColor)] text-sm leading-8 m-2 text-center`} aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}
