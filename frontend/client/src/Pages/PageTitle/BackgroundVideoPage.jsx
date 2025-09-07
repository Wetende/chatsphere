import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Components
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../../Components/Header/Header'
import Videos from '../../Components/Videos/Videos'
import SideButtons from "../../Components/SideButtons";

const BackgroundVideoPage = (props) => {
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
      {/* Background video section start */}
      <Videos
        className="py-[160px] pb-0 xl:py-[120px] md:py-[95px] sm:py-[80px] xs:py-0 h-[700px] md:h-[550px] sm:h-[350px]"
        src="/assets/video/video.mp4"
        loop={true}
        poster="https://via.placeholder.com/1920x1080"
        overlay={["#0039e3", "#4132e0", "#4132e0", "#741bd9", "#8600d4"]}
        opacity={0.8}>
        <Container className="h-full">
          <Row className="items-end justify-center h-full">
            <Col xl={6} lg={7} md={10} className="relative z-[2] text-center">
              <span className="mb-[5px] font-serif text-white opacity-60 block">Intuitive custom made shortcodes</span>
              <h1 className="text-white font-serif font-medium text-[42px] leading-[49px] mb-20 sm:mb-12 sm:text-[30px] sm:leading-[40px] xs:text-[20px]">Background video</h1>
              <span className="w-[1px] h-[80px] inline-block bg-white mb-20 sm:mb-12 sm:h-[50px]"></span>
            </Col>
          </Row>
        </Container>
      </Videos>
      {/* Background video section end */}
    </>
  )
}

export default BackgroundVideoPage
