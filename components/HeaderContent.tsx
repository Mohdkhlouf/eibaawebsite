'use client'
import React, { useRef } from 'react'
import { SocialMediaLinks } from './SocialMediaLinks'

export const HeaderContent = () => {
  const scrollRef = useRef(null);

  return (
    <section className="flex items-center bg-[linear-gradient(to_right,rgba(61,51,80,0.85),rgba(124,107,138,0.5)),url(/background.png)] bg-cover bg-center bg-no-repeat min-h-[500px]">
      <div className="flex flex-col max-w-250 min-h-125 mx-auto w-full justify-center align-middle " >
        <div className="flex flex-col items-end text-white py-8" ref={scrollRef}>
          <div className="w-3/5  flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold leading-12 drop-shadow-lg text-center">
              هناك أوقات نتعثر فيها ونحتاج أن نجلب الشمس للعلاقة
            </h2>
            <h3 className="text-2xl font-semibold leading-12 drop-shadow-lg">إذا كنت مستعداً فأنت في المكان الصحيح!</h3>
            <p className="mt-5 text-xl text-justify drop-shadow-lg">
              أ.إباء أبوطه مرشدة زواجية وأسرية، أساعد الأزواج على استكشاف ذواتهم بحب وقبول، وتحقيق الأهداف الزوجية بعلاقة صحية وسعيدة وفقاً لرغبتهم؛ عبر فلسفتي الخاصة (النموّ المتأنّي).
            </p>
            <p className="mt-5 text-xl text-justify drop-shadow-lg">
              من خلال تطوير مهارات التواصل مع الذات والآخر بشكل أفضل، ومهارات حل المشكلات، وفهم ديناميكية العلاقة، وأنماط السلوك المؤثرة فيها، وسيكلوجية الآخر.
            </p>
            <SocialMediaLinks />
          </div>
        </div>
      </div>
    </section>
  )
}
