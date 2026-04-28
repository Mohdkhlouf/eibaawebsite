import React from 'react'
import Image from 'next/image';

const imageStyle = {
  width: '100%',
  height: '100%',
}

const stories = [
  {
    slideId: '1',
    slideImages: [
      { src: '/img/slide/slide1.jpg' },
      { src: '/img/slide/slide2.jpg' },
      { src: '/img/slide/slide3.jpg' },
      { src: '/img/slide/slide4.jpg' },
      { src: '/img/slide/slide5.jpg' },
      { src: '/img/slide/slide6.jpg' },
      { src: '/img/slide/slide7.jpg' },
    ],
  },
  {
    slideId: '2',
    slideImages: [
      { src: '/img/slide2/slide1.jpg' },
      { src: '/img/slide2/slide2.jpg' },
      { src: '/img/slide2/slide3.jpg' },
      { src: '/img/slide2/slide4.jpg' },
      { src: '/img/slide2/slide5.jpg' },
      { src: '/img/slide2/slide6.jpg' },
    ],
  },
  {
    slideId: '3',
    slideImages: [
      { src: '/img/slide3/slide1.jpg' },
      { src: '/img/slide3/slide2.jpg' },
      { src: '/img/slide3/slide3.jpg' },
      { src: '/img/slide3/slide4.jpg' },
      { src: '/img/slide3/slide5.jpg' },
      { src: '/img/slide3/slide6.jpg' },
    ],
  },
];

export const InstagramPosts = () => {
  return (
    <section className="p-5" id="instagramPosts">
      <div className="max-w-[1000px] mx-auto w-full">
        <div className="">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[var(--mainColor)]">Stories</h2>
            <p className="text-lg font-family-tajawal leading-7 font-medium p-1.5">من وحي قلمي في انستاجرام</p>
          </div>
        </div>
        <div className="flex">
          {stories.map((ele) => (
            <div className="flex-1" key={ele.slideId}>
              <div className="relative">
                {ele.slideImages.map((image, idx) => (
                  <div className="" key={idx}>
                    <Image
                      src={image.src}
                      width={300}
                      height={300}
                      style={imageStyle}
                      alt={`story-${ele.slideId}-img-${idx}`}
                    />
                  </div>
                ))}
              </div>
              <div className="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
