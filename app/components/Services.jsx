import React from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link';
export const Services = () => {
  const services=[
    {
      'title':"اختيار شريك الحياة",
      'slug':"أساعدك على حسن الاختيار",
      'img':"/shareek.jpg",
      'details':`
      يمكنك معرفة المعايير التي ستعتمد عليها عند اختيارك لشريك الحياة، وإذا ما كانت متوافقة معك ومناسبة لك، فمن حقك الحصول على علاقة آمنة وسعيدة. من الآن يمكنك رسم علاقتك المستقبلية.      `
    },
    {
      'title':"الخطوبة",
      'slug':"أساعدك على تأسيس زواج صحّي ",
      'img':"/khottbah.jpg",
      'details':`
      يمكنك استثمار هذه المرحلة لاكتشاف الشريك، وتأسيس قوانين العلاقة الصحيحة، وتعميق التواصل الحقيقي، فأنت على بُعد مسافات قصيرة من الزواج، من الآن يمكنك السعي لتخفيف وطأة المفاجآت المحتملة فيه. 
      `
    },
    {
      'title':"الحياة الزوجية",
      'slug':"أساعدك على التواصل الصحيح",
      'img':"/Marrage.jpg",
      'details':`
      يمكنك خوض تجربة اتصالية جديدة وسليمة في داخل العلاقة الزوجية، بعدما أصبح التواصل بينكما شائكاً ومُعقداً وتراجع معه الشعور بالثقة والأمان، لذا يمثل وجودك هنا العتبة الصحيحة لتنمية العلاقة وحمايتها من الانحدار أكثر.
      `
    }
  ];

 return (
  
<motion.section id="myServices" className="myServices py-5"

  initial={{y:25, opacity:0}}
  whileInView={{y:0, opacity:1}}
  transition={{duration:0.75}}




>
  <div className="container">
    
    
    <div className="row">
      <div className='sectionHeader'>
        <h2 className="sectionHeaderTitle ">الخدمات الإستشارية</h2>
        <p className="sectionHeaderDetails ">أقدمها للأشخاص في مرحلة</p>
      </div>
    </div>

    <div className="row p-4">

    {
  services.map( (element)=>

<motion.div
initial={{opacity:0,scale:0}}
whileInView={{opacity:1,scale:1}}
transition={{duration:0.75,type:"tween"}}

className="col-md-4 dflex-centerd{">
  
          <div className='dflex-centerd'>
              <div className="serviceImage">
              <img className="serviceImage" src={element.img} alt={element.slug}/>
              </div>
              <h3 className='serviceTitle sectionChildTitle'> {element.title} </h3>
              <h3 className='serviceTitle sectionChildTitle'> {element.slug} </h3>
              <p className='serviceDetails sectionChilddetails'>{element.details}</p>
            </div>
        </motion.div>
  )
}

      </div>


</div>

<div className='consutationTypes'>
  <div className="container">
    <div className="row p-4">
            <div className="col-md-12 text-center bg-color1 py-5">
            <i className="fa-solid fa-handshake-angle"></i>
              <h3 className=" headingh3 text-center">جلسات دعم جماعية للنساء</h3>
              <p className="womenSupprot" text-justify>تُقدم هذه الجلسات الدعم الجمعي للنساء في مجالات الحياة المختلفة (العاطفية، النفسية، الجسدية، المهنية، الزوجية، الوالدية) عبر حوار شفاف وعميق، يساعدهنّ على الوصول لأعمق نقطة في داخلهنّ، لتوسيع مساحات النموّ الحقيقي، وتعزيز قدرتهنّ على اتخاذ خيارات أكثر سعة وحكمة بشأن حياتهنّ الخاصة،
 في فضاء أنثوي يخبرهنّ أنهنّ
</p>
              <div className="reserveConsultation border-2 rounded-pill p-2">
                <Link className="consultationBtn " href="/Consultation">اقرأ المزيد</Link>
              </div> 
            </div>
            
          </div>
          </div>
      </div>
</motion.section>



  )
}
