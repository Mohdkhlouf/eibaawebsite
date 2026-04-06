import React, { useRef } from 'react'
import { SocialMediaLinks } from './SocialMediaLinks'

export const HeaderContent = () => {
  const scrollRef = useRef(null);

  return (
    <section className="headerSection d-flex">
      <div className="container">
        <div className="headerContent text-end" ref={scrollRef}>
          <div className="content">
            <h2>
              هناك أوقات نتعثر فيها ونحتاج أن نجلب الشمس للعلاقة
            </h2>
            <h3>إذا كنت مستعداً فأنت في المكان الصحيح!</h3>
            <p>
              أ.إباء أبوطه مرشدة زواجية وأسرية، أساعد الأزواج على استكشاف ذواتهم بحب وقبول، وتحقيق الأهداف الزوجية بعلاقة صحية وسعيدة وفقاً لرغبتهم؛ عبر فلسفتي الخاصة (النموّ المتأنّي).
            </p>
            <p>
              من خلال تطوير مهارات التواصل مع الذات والآخر بشكل أفضل، ومهارات حل المشكلات، وفهم ديناميكية العلاقة، وأنماط السلوك المؤثرة فيها، وسيكلوجية الآخر.
            </p>
            <SocialMediaLinks />
          </div>
        </div>
      </div>
    </section>
  )
}
