'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function MobileMenuButton({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="md:hidden relative">
      <button
        onClick={toggleMenu}
        className="p-2 text-[#60768e] hover:bg-gray-100 rounded-lg transition"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 mt-0 min-w-48">
          <nav className="flex flex-col space-y-0">
            {children}
          </nav>
        </div>
      )}
    </div>
  )
}
