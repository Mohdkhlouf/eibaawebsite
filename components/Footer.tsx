import React from 'react'
import { SocialMediaLinks } from './SocialMediaLinks'
import Image from 'next/image'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--secondColor)] text-[var(--mainColor)] text-center mt-5 py-5" id="footer">
      <div className="max-w-[1000px] mx-auto w-full">

        <div className="pt-5">
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <Image
                src="/personal.png"
                className='w-full rounded-3xl shadow-lg'
                style={{boxShadow: '10px 10px 5px var(--mainColor)'}}
                alt="personal"
                width={200}
                height={200}
              />

              <h6 className='mt-3'>للتواصل معي من خلال</h6>

              <SocialMediaLinks />

              <h6 className='mt-2'>راسلني عبر</h6>
              <a href="mailto:eiba.abutaha@gmail.com">eiba.abutaha@gmail.com</a>

            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
