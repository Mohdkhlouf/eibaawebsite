import BeholdWidget from "@behold/react"

export default function InstagramPosts() {
  return (
    <section className="container mx-auto py-12  px-6">
      <h2 className="text-[#3D3350] text-3xl font-bold mb-8 text-center">My Instagram</h2>
      <div className="">
        {<BeholdWidget feedId="EJTG3N2clZXWTcNwmgdC" />}
      </div>
    </section>
  )
}
