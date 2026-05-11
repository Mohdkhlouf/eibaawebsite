import Link from "next/link";


export default function MainMenu() {
  return (
  <nav className="hidden md:flex space-x-6 items-center text-[#60768e] font-semibold" aria-label="Main navigation">
    <Link href="/" >الصفحة الرئيسية</Link>
    <Link href="/services" >الخدمات</Link>
      <Link href="/blogs" >المقالات</Link>
      <Link href="/courses" >الدورات</Link>
      <Link href="/#footer" className=" font-semibold">تواصل معنا</Link>
  </nav>
  )
}
