import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import MainMenu from '@/components/ui/MainMenu'
import { LogOut } from './dashboard/LogOut'
import { getUser } from '@/lib/auth'


export default async function Header() {
  const loggedIn = await getUser()

  return (
    <header className="flex bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-5 py-3">
          <div className="flex items-center">
            <Link href="/" className="block">
              <Logo />
            </Link>
          </div>

            <MainMenu />

          <div className="flex items-center space-x-4">
            <button className="hidden md:block bg-[#60768e] text-amber-50 rounded-full px-4 py-2 font-semibold">
              <Link href="/Consultation">احجز استشارتك</Link>
            </button>
            {loggedIn? <LogOut /> : <Link href='/login'>Login</Link>}
          </div>
        </div>
      </div>
    </header>
  );
}
