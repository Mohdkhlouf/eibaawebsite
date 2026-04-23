import Image from "next/image";

export default function Logo() {
  return (
      <Image
        src="/logo.png"
        width={150}
        height={85}
        alt="Site logo"
        className="h-14 w-auto"
      />
  )
}
