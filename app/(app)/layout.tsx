
import type { ReactNode } from 'react'
import { Tajawal } from 'next/font/google'
const tajawal = Tajawal({
  weight: ['400', '700'],
  subsets: ['arabic']
});

import { Footer } from '@/components/Footer'
import '../globals.css'
import { Inter } from 'next/font/google'
import { Header2 } from '@/components/Header2';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Eibaa Website',
  description: 'إباء أبو طه',
}

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {

  return (
    <html lang="ar">

      <body dir="rtl" className={tajawal.className}>
        <Header2 />


        {children}

        <Footer />
      </body>

    </html>
  )
}
