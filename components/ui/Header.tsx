import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import MainMenu from '@/components/ui/MainMenu'
import { LogOut } from '../dashboard/LogOut'
import { getUser } from '@/lib/auth'
export default async function Header() {
  const loggedIn = await getUser()
  return (
    <header className="flex bg-white sticky top-0 z-50 shadow-sm ">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between gap-5 py-3">
          <div className="flex items-center">
            <Link href="/" className="block">
              <Logo />
            </Link>
          </div>
            <MainMenu />
          {
}
          <div className="hidden md:flex space-x-6 items-center text-[#60768e] font-semibold">
            {
}
            {loggedIn? <LogOut /> : <Link href='/login'>Login</Link>}
          </div>
          {
}
          <div className="md:hidden">
            {loggedIn? <LogOut /> : <Link href='/login' className="text-sm font-semibold text-[#60768e]">Login</Link>}
          </div>
        </div>
      </div>
    </header>
  );
}
