import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { LogOut } from './dashboard/LogOut'


export const Header = () => {
  return (

    <div className="navbarBox">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light ">
          <a className="navbar-brand" href="/">

            <Image
              src="/logo.png"
              width={150}
              height={85}
              alt="Site logo"
            />


          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto d-flex">
              <li className="nav-item active">
                <Link className="nav-link m-1" href="/">الصفحة الرئيسية <span className="sr-only">(current)</span></Link>
              </li>

              <li className="nav-item m-1">
                <Link className="nav-link" href="#myServices">الخدمات</Link>
              </li>



              <li className="nav-item m-1">
                <Link className="nav-link" href="#podcastsection">بودكاست</Link>
              </li>

              <li className="nav-item m-1">
                <Link className="nav-link" href="#instagramPosts">Stories</Link>
              </li>

              <li className="nav-item m-1">
                <Link className="nav-link" href="#footer">تواصل معنا</Link>
              </li>
              <li className="nav-item m-1">

                <div className="reserveConsultation border-2 rounded-pill p-2">
                  <Link className="consultationBtn rounded-pill " href="/Consultation">احجز استشارتك</Link>

                </div>                  </li>
              <li>
                <LogOut />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>







  )
}
