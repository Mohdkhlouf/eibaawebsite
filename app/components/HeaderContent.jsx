import React from 'react'
import { SocialMediaLinks } from './SocialMediaLinks'
import { useScroll, motion } from 'framer-motion'
import { useRef } from 'react'

function FadeInWhenVisible({ children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 }
      }}
    >
      {children}
    </motion.div>
  );
}

export const HeaderContent = () => {
  const scrollRef = useRef(null);

  return (
    <motion.section className="headerSection d-flex"
    initial={{y:25, opacity:0}}
    whileInView={{y:0, opacity:1}}
    transition={{duration:0.75}}>
  <div className="container">

          <div className="headerContent text-end"  ref={scrollRef}>
            <div className="content">
          
        <motion.h2
            initial={{
              x:'50%',
              opacity: 0
            }}

            whileInView={{
              x:0,
              opacity: 100
            }}

            transition={{ ease: "easeIn",type:'tween', duration: 0.5 }}
            viewport={{ once:false, amount:0.25 }}
            

           

          >هناك أوقات نتعثر فيها ونحتاج أن نجلب الشمس للعلاقة </motion.h2>
              
              <FadeInWhenVisible>
              <motion.h2 
            initial={{
              x:'-50%',
              opacity: 0
            }}
            
            whileInView={{
              x:0,
              opacity: 1,
              
            }}
            transition={{ease: "easeIn",type:'tween', duration: 0.5, delay:0.5 }}
            viewport={{ once:false, amount:0.25 }}

            
            

            

           

          >إذا كنت مستعداً فأنت في المكان الصحيح!
          </motion.h2>
      
            
          </FadeInWhenVisible>
              
          <motion.p
            initial={{
              y:'400',
              opacity: 0
            }}

            animate={{
              y:0,
              opacity: 100,
            }}

            
            transition={{ ease: "linear",type:'tween', duration: 0.5, delay:1 }}

            

           

          >
أ.إباء أبوطه مرشدة زواجية وأسرية، أساعد الأزواج على استكشاف ذواتهم بحب وقبول، وتحقيق الأهداف الزوجية بعلاقة صحية وسعيدة وفقاً لرغبتهم؛ عبر فلسفتي الخاصة (النموّ المتأنّي). 
</motion.p>

          
          

              
              
              <motion.p
                initial={{
                  y:'400',
                  opacity: 0
                }}
    
                animate={{
                  y:0,
                  opacity: 100,
                }}
    
                
                transition={{ 
                  ease: "linear",
                  type:'tween',
                   duration: 0.5, 
                   delay:1.2 }}
    
                
    
               
    
              >
من خلال  تطوير مهارات التواصل مع الذات والآخر بشكل أفضل، ومهارات حل المشكلات، وفهم ديناميكية العلاقة، وأنماط السلوك المؤثرة فيها، وسيكلوجية الآخر.
</motion.p>


              
               
            
            <SocialMediaLinks />
            </div>
            </div>

          </div>  
               

  
  
</motion.section>
  )
}
