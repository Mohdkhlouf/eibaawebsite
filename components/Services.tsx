import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type ServiceItem = {
  title: string
  slug: string
  img: string
  details: string
}

const services: ServiceItem[] = [
  {
    title: "اختيار شريك الحياة",
    slug: "أساعدك على حسن الاختيار",
    img: "/shareek.jpg",
    details: `يمكنك معرفة المعايير التي ستعتمد عليها عند اختيارك لشريك الحياة، وإذا ما كانت متوافقة معك ومناسبة لك، فمن حقك الحصول على علاقة آمنة وسعيدة. من الآن يمكنك رسم علاقتك المستقبلية.`
  },
  {
    title: "الخطوبة",
    slug: "أساعدك على تأسيس زواج صحّي",
    img: "/khottbah.jpg",
    details: `يمكنك استثمار هذه المرحلة لاكتشاف الشريك، وتأسيس قوانين العلاقة الصحيحة، وتعميق التواصل الحقيقي، فأنت على بُعد مسافات قصيرة من الزواج، من الآن يمكنك السعي لتخفيف وطأة المفاجآت المحتملة فيه.`
  },
  {
    title: "الحياة الزوجية",
    slug: "أساعدك على التواصل الصحيح",
    img: "/Marrage.jpg",
    details: `يمكنك خوض تجربة اتصالية جديدة وسليمة في داخل العلاقة الزوجية، بعدما أصبح التواصل بينكما شائكاً ومُعقداً وتراجع معه الشعور بالثقة والأمان، لذا يمثل وجودك هنا العتبة الصحيحة لتنمية العلاقة وحمايتها من الانحدار أكثر.`
  },
]

export const Services: React.FC = () => {
  return (
    <section id="myServices" className="py-5">
      <div className="max-w-[1000px] mx-auto w-full flex flex-col">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[var(--mainColor)]">الخدمات الإستشارية</h2>
          <p className="text-lg font-family-tajawal leading-7 font-medium p-1.5">أقدمها للأشخاص في مرحلة</p>
        </div>

        <div className="flex p-4">
          {services.map((element) => (
            <div key={element.slug} className="flex-1 flex flex-col justify-center items-center">
              <div id={element.slug} className="flex flex-col justify-center items-center">
                <div className="w-56 h-56 rounded-full mb-2.5">
                  <Image
                    src={element.img}
                    alt={element.slug}
                    width={400}
                    height={300}
                    style={{ width: '100%', height: '100%' }}
                    priority={false}
                  />
                </div>
                <h3 className="text-[#60768e] font-family-tajawal text-xl font-semibold">{element.title}</h3>
                <h3 className="text-[#60768e] font-family-tajawal text-xl font-semibold">{element.slug}</h3>
                <p className="text-lg font-family-tajawal leading-7 font-normal p-1.5 text-center">{element.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[var(--secondColor)] bg-center bg-cover">
        <div className="max-w-[1000px] mx-auto w-full">
          <div className="flex p-4">
            <div className="w-full text-center bg-color1 py-5">
              <i className="fa-solid fa-handshake-angle" />
              <h3 className="text-2xl font-semibold leading-12 text-center">جلسات دعم جماعية للنساء</h3>
              <p className="text-justify">
                تُقدم هذه الجلسات الدعم الجمعي للنساء في مجالات الحياة المختلفة (العاطفية، النفسية، الجسدية، المهنية، الزوجية، الوالدية) عبر حوار شفاف وعميق، يساعدهنّ على الوصول لأعمق نقطة في داخلهنّ، لتوسيع مساحات النموّ الحقيقي، وتعزيز قدرتهنّ على اتخاذ خيارات أكثر سعة وحكمة بشأن حياتهنّ الخاصة، في فضاء أنثوي يخبرهنّ أنهنّ
              </p>
              <div className="border-2 rounded-full p-2">
                <Link className="no-underline text-black bg-[var(--secondColor)] text-base font-semibold px-7 py-1.2" href="/Consultation">اقرأ المزيد</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
