
import type { ReactNode } from 'react'
import { Tajawal } from 'next/font/google'
import { Footer } from '@/components/Footer'
import '../globals.css'
import Header  from '@/components/Header';
import type { Metadata } from 'next'

const tajawal = Tajawal({
  weight: ['400', '700'],
  subsets: ['arabic']
});


export const metadata:Metadata = {
  title: 'Eibaa Abutaha Website',
  description: 'إباء أبو طه',
}

export default function RootLayout({ children }: { children: ReactNode }){

  return (
    <html lang="ar">

      <body dir="rtl" className={`${tajawal.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1 mx-auto w-full py-8">
          {children}
        </main>
        <Footer />
      </body>

    </html>
  )
}
