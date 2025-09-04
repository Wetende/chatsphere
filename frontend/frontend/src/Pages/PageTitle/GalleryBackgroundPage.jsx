import React from 'react'

// Libraries
import { Link } from 'react-router-dom'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Keyboard } from "swiper/modules";
import { Link as ScrollTo } from "react-scroll"

// Components
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../../Components/Header/Header'
import SideButtons from "../../Components/SideButtons";

// Data
const SwiperImgData = [
  {
    img: "https://via.placeholder.com/1920x1200"
  },
  {
    img: "https://via.placeholder.com/1920x1200"
  },
  {
    img: "https://via.placeholder.com/1920x1200"
  }
]

const GalleryBackgroundPage = (props) => {
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
      <section className="relative h-[700px] md:h-[550px] sm:h-[350px]">
        <Container className="h-full">
          <Row className="items-center justify-center h-full">
            <Col md={10} xl={6} lg={7} className="relative text-center">
              <span className="block text-white opacity-60 mb-[5px] font-serif text-xmd font-light">we provide innovative solutions</span>
              <h1 className="font-serif text-white -tracking-[1px] text-[42px] leading-[49px] font-medium mb-0 sm:text-[30px] sm:leading-[40px] sm:-tracking-[1px]">Page title gallery background</h1>
            </Col>
            <ScrollTo to="about" offset={0} delay={0} spy={true} smooth={true} duration={800} className="absolute bottom-[50px] left-1/2 w-auto inline-block -translate-x-1/2 cursor-pointer">
              <i className="feather-arrow-down text-lg leading-[1] text-white bg-fastblue p-[15px] xs:p-[10px] rounded-full flex justify-center items-center"></i>
            </ScrollTo>
          </Row>
        </Container>
        <Swiper
          className="h-full top-0 z-[-2] absolute left-0 w-full"
          modules={[Autoplay, EffectFade, Keyboard]}
          effect="fade"
          loop={true}
          keyboard={{ enabled: true, onlyInViewport: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          slidesPerView="auto">
          {
            SwiperImgData.map((item, i) => {
              return (
                <SwiperSlide key={i} className="h-full cover-background" style={{ backgroundImage: `url(${item.img})` }}>
                  <div className="top-0 left-0 w-full h-full bg-darkgray opacity-75 absolute"></div>
                </SwiperSlide>)
            })
          }
        </Swiper>
      </section>
    </>
  )
}

export default GalleryBackgroundPage
