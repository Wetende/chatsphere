import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Parallax } from 'react-scroll-parallax'
import { Link as ScrollTo } from "react-scroll"

// Components
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../../Components/Header/Header';
import SideButtons from "../../Components/SideButtons";

const BigTypographyPage = (props) => {
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
      <div className="md:flex md:items-center overflow-hidden relative py-[80px] h-[650px] md:h-[550px] sm:h-[350px] landscape:md:h-[100vh]">
        <Parallax className="lg-no-parallax bg-cover cover-background md:bg-start absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] xxs:h-[50vh] xxs:-top-[80px] landscape:md:top-0" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
        <div className="absolute h-full w-full opacity-75 top-0 left-0 bg-darkgray"></div>
        <Container className="h-full">
          <Row className="items-center justify-center h-full">
            <Col md={10} xl={6} lg={7} className="relative text-center">
              <span className="block text-white opacity-60 mb-[15px] font-serif text-xmd tracking-tight">Page title big typography</span>
              <h2 className="font-serif text-white -tracking-[1px] text-[3.9rem] font-medium mb-0 sm:leading-[40px] sm:-tracking-[1px]">we are a creative design studio</h2>
            </Col>
            <ScrollTo to="about" offset={0} delay={0} spy={true} smooth={true} duration={800} className="absolute bottom-[50px] left-1/2 w-auto inline-block -translate-x-1/2 sm:bottom-7 cursor-pointer">
              <i className="feather-arrow-down text-lg leading-[1] text-white bg-black p-[15px] xs:p-[10px] rounded-full flex justify-center items-center"></i>
            </ScrollTo>
          </Row>
        </Container>
      </div>
      {/* Parallax section End */}
    </>
  )
}

export default BigTypographyPage
