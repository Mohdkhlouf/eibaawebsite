import React, { useRef } from 'react'
import { SocialMediaLinks } from './SocialMediaLinks'

export const HeaderContent = () => {
  const scrollRef = useRef(null);

  return (
    <section className="flex items-center bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'linear-gradient(to bottom, rgb(0 0 0 / 60%), rgb(0 0 0 / 60%)), url("../public/background.png")'}}>
      <div className="max-w-[1000px] mx-auto w-full">
        <div className="flex flex-col justify-center text-right text-white py-8" ref={scrollRef}>
          <div className="w-3/5 flex flex-col justify-center items-center">
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
