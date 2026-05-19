import Link from "next/link";
import { prisma } from "@/lib/prisma"
import MobileMenuButton from "./MobileMenuButton";

export default async function MainMenu() {
  const dynamic_menu = await prisma.menuItem.findMany({
    orderBy: { order: 'asc' }
  })

  if(!dynamic_menu) {
    return null;
  }

  const menuItems = dynamic_menu.map(item => {
    const href = item.url || (item.pageId ? `/pages/${item.pageId}` : '#')
    return (
      <Link key={item.id} href={href}>{item.label}</Link>
    )
  })

  return (
    <>
      {/* Desktop Menu */}
      <nav className="hidden md:flex space-x-6 items-center text-[#60768e] font-semibold" aria-label="Main navigation">
        {menuItems}
      </nav>

      {/* Mobile Menu */}
      <MobileMenuButton>
        <div className="flex flex-col divide-y">
          {dynamic_menu.map(item => {
            const href = item.url || (item.pageId ? `/pages/${item.pageId}` : '#')
            return (
              <Link 
                key={item.id} 
                href={href}
                className="px-4 py-3 text-[#60768e] font-semibold hover:bg-gray-100 transition"
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </MobileMenuButton>
    </>
  )
}
