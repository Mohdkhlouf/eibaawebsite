import React from 'react'

export const PodcastSection = () => {
  return (
    <section className="container mx-auto py-12  px-6">
      <h2 className="text-[#3D3350] text-3xl font-bold mb-8 text-center">Podcast موجة حب</h2>
          <div className="w-full">
            <iframe
              width="100%"
              height="350"
              scrolling="no"
              frameBorder="0"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/1176891079&amp;"
            />
          </div>
    </section>
  )
}
