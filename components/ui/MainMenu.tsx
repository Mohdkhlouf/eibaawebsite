import Link from "next/link";
import { prisma } from "@/lib/prisma"

export default async function MainMenu() {
  const dynamic_menu = await prisma.menuItem.findMany({
    orderBy: { order: 'asc' }
  })

  if(!dynamic_menu) {
    return null;
  }

  return (
    <nav className="hidden md:flex space-x-6 items-center text-[#60768e] font-semibold" aria-label="Main navigation">
      {dynamic_menu.map(item => {
        const href = item.url || (item.pageId ? `/pages/${item.pageId}` : '#')
        return (
          <Link key={item.id} href={href}>{item.label}</Link>
        )
      }
      )}
  </nav>
  )
}
