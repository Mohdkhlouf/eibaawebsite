"use client"

import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



export const Header2 = () => {
  return (
    <div className="navbarBox">
    <Navbar expand="lg" className="navbar bg-body-tertiary">
      <Container className="container">
        <Navbar.Brand href="/">
                <img
                src="/logo.png"
                width={150}
                height={85}
                alt="Picture of the author"
            />
        </Navbar.Brand>


        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className=".navba-link" href="/">الصفحة الرئيسية</Nav.Link>
            <Nav.Link className=".navba-link" href="/#myServices">الخدمات</Nav.Link>
            <Nav.Link className=".navba-link" href="/Articles">المقالات</Nav.Link>
            <Nav.Link className=".navba-link" href="/#podcastsection">بودكاست</Nav.Link>
            <Nav.Link className=".navba-link" href="/#instagramPosts">Stories</Nav.Link>
            <Nav.Link className=".navba-link" href="/#footer">تواصل معنا</Nav.Link>
            <div className="reserveConsultation border-2 rounded-pill p-2">
                <Nav.Link className="consultationBtn rounded-pill navba-link" href="/Consultation">احجز استشارتك </Nav.Link>
            </div>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

