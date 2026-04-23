"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/logo'
import MainMenu from '@/components/ui/MainMenu'
import { LogOut } from './dashboard/LogOut'
export  const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <Link href="/" className="block">
              <Logo />
            </Link>
          </div>

<MainMenu />

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Link href="/Consultation" className="bg-[var(--secondColor)] text-[#60768e] px-4 py-2 rounded-full font-semibold">احجز استشارتك</Link>
            </div>

            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Toggle navigation"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <LogOut />
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="block px-3 py-2 text-[var(--mainColor)] font-medium">الصفحة الرئيسية</Link>
              <Link href="/#myServices" className="block px-3 py-2 text-[var(--mainColor)] font-medium">الخدمات</Link>
              <Link href="/Articles" className="block px-3 py-2 text-[var(--mainColor)] font-medium">المقالات</Link>
              <Link href="/#podcastsection" className="block px-3 py-2 text-[var(--mainColor)] font-medium">بودكاست</Link>
              <Link href="/#instagramPosts" className="block px-3 py-2 text-[var(--mainColor)] font-medium">Stories</Link>
              <Link href="/#footer" className="block px-3 py-2 text-[var(--mainColor)] font-medium">تواصل معنا</Link>
              <Link href="/Consultation" className="mt-2 inline-block px-4 py-2 bg-[var(--secondColor)] rounded-full text-black font-semibold text-center">احجز استشارتك</Link>
              <LogOut />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
