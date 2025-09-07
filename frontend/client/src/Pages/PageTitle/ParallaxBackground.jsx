import React from 'react'

// Libraries
import { Link } from 'react-router-dom';
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Parallax } from 'react-scroll-parallax'

// Components
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../../Components/Header/Header';
import SideButtons from "../../Components/SideButtons";

const ParallaxBackground = (props) => {
  return (
    <>
      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav fluid="fluid" theme="dark" className="px-[35px] py-[0px] md:px-0" containerClass="md:pl-0 sm:px-0">
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <div className="col-auto hidden order-last md:block">
            <Navbar.Toggle className="md:ml-[10px] sm:ml-0">
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
            </Navbar.Toggle>
          </div>
          <Navbar.Collapse className="col-auto px-0 justify-end">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto text-right pe-0 !pl-[12px]">
            <SearchBar className="xs:pl-[15px] pr-0" />
            <HeaderLanguage className="xs:pl-[15px]" />
            <HeaderCart className="xs:pl-[15px]" style={{ "--base-color": "#0038e3" }} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Parallax section End */}
      <div className="md:flex md:items-center overflow-hidden relative py-[80px] landscape:md:h-[100vh]">
        <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] xxs:h-[53vh] xxs:-top-[80px] landscape:md:top-0" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1031)` }}></Parallax>
        <div className="absolute h-full w-full opacity-75 top-0 left-0 bg-darkgray"></div>
        <Container className="relative h-[400px] xs:h-[280px]">
          <Row className="justify-center h-full">
            <Col xl={6} lg={7} md={10} className="text-center flex justify-center flex-col font-serif">
              <div className="flex flex-col relative z-index-1 h-[400px] xs:h-[280px] landscape:md:h-[300px]">
                <div className="mt-auto">
                  <span className="block opacity-60 text-base mb-[5px] text-white">Unlimited power and customization possibilities</span>
                  <h1 className="text-white text-[42px] leading-[49px] sm:text-[30px] sm:leading-10 font-medium -tracking-[1px] mb-[10px]">Parallax background</h1>
                </div>
                <div className="mt-auto">
                  <ul className="breadcrumb justify-center text-sm font-serif bg-transparent m-0 md:justify-center">
                    <li><Link aria-label="link for" to="/" className="text-[#b7b7b7] hover:text-[#fff]">Home</Link></li>
                    <li><Link aria-label="link for" to="#" className="text-[#b7b7b7] hover:text-[#fff]">Pages</Link></li>
                    <li className="text-[#b7b7b7] opacity-100 hover:text-[#b7b7b7]">Breadcrumbs</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Parallax section End */}
    </>
  )

}

export default ParallaxBackground
