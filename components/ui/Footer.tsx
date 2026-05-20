import SocialMediaLinks from './SocialMediaLinks'
import Image from 'next/image'

type SocialLink = { id: number; url: string; icon: string; name: string }

export function Footer({ socialLinks }: { socialLinks: SocialLink[] }) {
  return (
    <footer className="bg-[#3D3350] text-[#FAF7F5] py-12">
      <div className="max-w-250 mx-auto w-full">
        <div className="pt-5">
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <Image
                src="/personal.png"
                className='w-full rounded-3xl shadow-lg'
                style={{ boxShadow: '10px 10px 5px var(--mainColor)' }}
                alt="personal"
                width={200}
                height={200}
              />
              <h6 className='mt-3'>للتواصل معي من خلال</h6>
              <SocialMediaLinks links={socialLinks} />
              <h6 className='mt-2'>راسلني عبر</h6>
              <a href="mailto:eiba.abutaha@gmail.com">eiba.abutaha@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
