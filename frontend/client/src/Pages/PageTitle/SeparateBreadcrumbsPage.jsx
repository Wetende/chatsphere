import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Components
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../../Components/Header/Header'
import SideButtons from "../../Components/SideButtons";

const SeparateBreadcrumbsPage = (props) => {
  return (
    <>
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav theme="light" bg="white" menu="light" containerClass="sm:px-0" className="py-[0px] md:pr-[15px] md:pl-0">
          <Col className="col-5 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header home link" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Navbar.Toggle className="order-last md:ml-[25px] sm:ml-[15px]">
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="col-auto md-position-initial menu-order justify-end px-0">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto text-end hidden-xs pe-0 font-size-0 !pl-[12px]">
            <SearchBar className="xs:pl-[15px] pr-0" />
            <HeaderLanguage className="xs:pl-[15px]" />
            <HeaderCart className="xs:pl-[15px]" style={{ "--base-color": "#0038e3" }} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <section className="py-[130px] cover-background lg:py-[90px] md:py-[75px] sm:py-[50px]" style={{ backgroundImage: `url(https://via.placeholder.com/1920x800)` }}>
        <div className="absolute top-0 left-0 w-full h-full bg-darkgray opacity-75"></div>
        <Container>
          <Row className="items-center justify-center">
            <Col xl={6} lg={7} md={10} className="relative text-center font-serif">
              <span className="block text-white opacity-60 mb-[5px] xs:leading-[20px]">We provide innovative solutions to expand business</span>
              <h1 className="text-white font-medium text-[42px] leading-[49px] mb-0 sm:text-[30px] sm:leading-[40px]">Separate breadcrumbs</h1>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[15px] border-b border-[#ededed]">
        <Container>
          <Row className="items-center justify-center">
            <Col>
              <div className="breadcrumb font-serif mb-0 justify-start leading-none md:justify-center">
                <ul>
                  <li><Link aria-label="link for" to="/">Home</Link></li>
                  <li><Link aria-label="link for" to="#">Pages</Link></li>
                  <li>Breadcrumbs</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}
    </>
  )
}

export default SeparateBreadcrumbsPage
