import Link from 'next/link'

export default function LoginNow() {
  return (
    <div className="mt-8">
      <Link href='/login'>
      <button className="px-6 py-3 bg-[#3D3350] text-white rounded-lg hover:bg-[#5A4B70] transition-colors">
        Login Now
        </button>
      </Link>
    </div>
  )
}
