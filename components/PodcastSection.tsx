import React from 'react'

export const PodcastSection = () => {
  return (
    <section className="mt-10" id="podcastsection">
      <div className="max-w-[1000px] mx-auto w-full">
        <div className="">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[var(--mainColor)]">Podcast موجة حب</h2>
            <p className="text-lg font-family-tajawal leading-7 font-medium p-1.5">موجات حب.. اليكم مباشرة</p>
          </div>
        </div>
        <div className="">
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
        </div>
      </div>
    </section>
  )
}
