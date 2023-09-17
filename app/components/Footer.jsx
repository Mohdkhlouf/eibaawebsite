import React from 'react'
import { SocialMediaLinks } from './SocialMediaLinks'

export const Footer = () => {
  return (
/*Footer Start*/
<footer className="box mt-5 py-5" id="footer">
  <div className="container">
    
    <div className="row pt-5">
    <div className="footer-content">
      <div className="col-md-4">
        <img
        src="./personal.png"
        className='footerPersonal'
        />

        <h6 className='mt-3'>للتواصل معي من خلال</h6>

        <SocialMediaLinks />

        <h6 className='mt-2'>راسلني عبر</h6>
        <span>eiba.abutaha@gmail.com</span>
      
      </div>
      </div>
    </div>
  </div>
</footer>
/*Footer End*/
  )
}
