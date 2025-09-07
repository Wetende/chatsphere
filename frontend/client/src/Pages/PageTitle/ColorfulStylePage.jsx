import React from 'react'

// Libraries
import { Col, Container, Navbar } from 'react-bootstrap'
import { Link } from "react-router-dom";

// Components
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import SideButtons from "../../Components/SideButtons";

const ColorfulStylePage = (props) => {
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
      {/* Section Start */}
      <section className="colorful-page py-[80px] md:py-[40px]">
        <Container>
          <div className="flex sm:flex-col justify-end h-[300px] sm:h-[250px]">
            <div className="w-full md:w-1/2 sm:w-full self-end">
              <h1 className="relative font-serif text-white text-xmd font-light flex items-center mb-[30px] sm:mb-[20px]">
                <span className="h-[1px] text-xmd font-normal inline-block bg-white w-[70px] mr-[15px] sm:w-10">
                </span>Page title colorful style</h1>
            </div>
            <div className="w-full md:w-1/2 sm:w-full self-end">
              <h4 className="font-serif text-white font-medium mb-[30px]">We create brand new corporate identities</h4>
            </div>
          </div>
        </Container>
      </section>
      {/* Section End */}
    </>
  )
}

export default ColorfulStylePage
