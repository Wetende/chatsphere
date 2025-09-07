import React, { lazy } from 'react'

// Libraries
import { Col, Container, Row, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom";
import { m } from "framer-motion";

// Components
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../Components/Header/Header';
import FooterStyle01 from '../Components/Footers/FooterStyle01';
import { flash, fadeIn, fadeInUp, fadeInBlur, fadeInRight, fadeInLeft, zoomIn, zoomOut, bounce, rotateInDown, fadeInDown, pulse, rubberBand } from '../Functions/GlobalAnimations'
const SideButtons = lazy(() => import("../Components/SideButtons"))

const AnimationPage = (props) => {
  return (
    <>
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav fluid="fluid" theme="light" bg="white" menu="light" className="px-[35px] py-[0px] md:px-0" containerClass="sm:px-0">
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
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
          <Col className="col-auto text-right pe-0">
            <SearchBar className="xs:pl-[15px] pr-0" />
            <HeaderLanguage className="xs:pl-[15px]" />
            <HeaderCart className="xs:pl-[15px]" style={{ "--base-color": "#0038e3" }} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Animations</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" className="hover:text-white">Features</Link></li>
                <li> Animations</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="overflow-hidden">
        <Container>
          <Row xs={1} className="justify-center divide-y divide-darkgray/20">
            <Col className="font-serif font-semibold text-darkgray text-center py-[11%]">
              <m.h4 className="mb-0" {...bounce}>bounce</m.h4>
            </Col>
            <Col className="font-serif font-semibold text-darkgray text-center py-[11%]">
              <m.h4 className="mb-0" {...flash}>flash</m.h4>
            </Col>
            <Col className="font-serif font-semibold text-darkgray text-center py-[11%]">
              <m.h4 className="mb-0" {...pulse}>pulse</m.h4>
            </Col>
            <Col className="font-serif font-semibold text-darkgray text-center py-[11%]">
              <m.h4 className="mb-0" {...rubberBand}>rubberBand</m.h4>
            </Col>
            <Col className="font-serif font-semibold text-darkgray text-center py-[11%]">
              <m.h4 className="mb-0"{...fadeIn}>fadeIn</m.h4>
            </Col>
            <Col className="font-serif font-semibold text-darkgray text-center py-[11%]">
              <m.h4 className="mb-0"{...fadeInUp}>fadeInUp</m.h4>
            </Col>
            <Col className="font-serif font-semibold text-darkgray text-center py-[11%]">
              <m.h4 className="mb-0"{...fadeInDown}>fadeInDown</m.h4>
            </Col>
            <Col className="font-serif font-semibold text-darkgray text-center py-[11%]">
              <m.h4 className="mb-0" {...fadeInBlur}>fadeInBlur</m.h4>
            </Col>
            <Col className="font-serif font-semibold text-darkgray text-center py-[11%]">
              <m.h4 className="mb-0" {...fadeInRight}>fadeInRight</m.h4>
            </Col>
            <Col className="font-serif font-semibold text-darkgray text-center py-[11%]">
              <m.h4 className="mb-0" {...fadeInLeft}>fadeInLeft</m.h4>
            </Col>
            <Col className="font-serif font-semibold text-darkgray text-center py-[11%]">
              <m.h4 className="mb-0" {...zoomIn}>zoomIn</m.h4>
            </Col>
            <Col className="font-serif font-semibold text-darkgray text-center py-[11%]">
              <m.h4 className="mb-0" {...zoomOut}>zoomOut</m.h4>
            </Col>
            <Col className="font-serif font-semibold text-darkgray text-center py-[11%]">
              <m.h4 className="mb-0" {...rotateInDown}>rotateInDown</m.h4>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section End */}

      {/* Footer start */}
      <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
      {/* Footer End */}
    </>
  )
}

export default AnimationPage
