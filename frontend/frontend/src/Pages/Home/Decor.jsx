import React, { useState } from 'react'

// Libraries
import { Row, Col, Container, Dropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, EffectFade, Keyboard } from "swiper/modules";
import { Parallax } from "react-scroll-parallax";
import { m } from "framer-motion";
import { Link as ScrollTo } from "react-scroll"

// Components
import Header, { HeaderCart, HeaderNav, Menu, SearchBar, Topbar } from '../../Components/Header/Header';
import SocialIcons from '../../Components/SocialIcon/SocialIcons';
import Buttons from '../../Components/Button/Buttons'
import { fadeIn, fadeInRight, zoomIn } from "../../Functions/GlobalAnimations";
import Clients from '../../Components/Clients/Clients';
import InteractiveBanners12 from '../../Components/InteractiveBanners/InteractiveBanners12'
import InteractiveBanners13 from '../../Components/InteractiveBanners/InteractiveBanners13';
import PortfolioBordered from '../../Components/Portfolio/PortfolioBordered';
import InteractiveBanners01 from '../../Components/InteractiveBanners/InteractiveBanners01';
import BlogMasonry from '../../Components/Blogs/BlogMasonry';
import Instagram from '../../Components/Instagram/Instagram';
import FooterStyle01 from '../../Components/Footers/FooterStyle01'
import MouseMove from "../../Components/MouseMove";
import SideButtons from "../../Components/SideButtons";

// Data
import { blogData } from '../../Components/Blogs/BlogData';
const ClientData = [
  {
    img: 'https://via.placeholder.com/140x110',
    target: "_blank",
    link: '#'
  },
  {
    img: 'https://via.placeholder.com/140x110',
    target: "_blank",
    link: '#'
  },
  {
    img: 'https://via.placeholder.com/140x110',
    target: "_blank",
    link: '#'
  },
  {
    img: 'https://via.placeholder.com/140x110',
    target: "_blank",
    link: '#'
  }
]

const portfolioBorderedMasonryData = [
  {
    title: "Planters",
    img: "https://via.placeholder.com/800x1200",
    category: [""],
    subtitle: "Spiritual",
    link: "/portfolio/single-project-page-01"
  },
  {
    title: "Chandeliers",
    img: "https://via.placeholder.com/800x798",
    category: ["branding"],
    subtitle: "Seating",
    link: "/portfolio/single-project-page-02"
  },
  {
    title: "Lounge",
    img: "https://via.placeholder.com/800x1197",
    category: ["branding", "graphics"],
    subtitle: "Cabinetry",
    link: "/portfolio/single-project-page-03"
  },
  {
    title: "Natural",
    img: "https://via.placeholder.com/800x1197",
    category: ["graphics", "logos"],
    subtitle: "Garden",
    link: "/portfolio/single-project-page-04"
  },
  {
    title: "Ottomans",
    img: "https://via.placeholder.com/800x798",
    category: ["logos", "photography"],
    subtitle: "Seating",
    link: "/portfolio/single-project-page-05"
  },
  {
    title: "Gestalten",
    img: "https://via.placeholder.com/800x798",
    category: ["branding", "photography"],
    subtitle: "Seating",
    link: "/portfolio/single-project-page-01"
  }
]

const InteractiveBannersData = [
  {
    subtitle: "Furniture",
    title: "Four essential mome practices for every reason",
    btnLink: "/blogs/blog-post-layout-04",
    img: "https://via.placeholder.com/800x557",
    icon: "line-icon-Arrow-OutRight"
  },
  {
    subtitle: "Bedroom",
    title: "Simple wall decor inspiration style saturdays",
    btnLink: "/blogs/blog-post-layout-03",
    img: "https://via.placeholder.com/800x557",
    icon: "line-icon-Arrow-OutRight"
  },
  {
    subtitle: "Decor",
    title: "Are you looking for the planter based cleaners",
    btnLink: "/blogs/blog-post-layout-02",
    img: "https://via.placeholder.com/800x557",
    icon: "line-icon-Arrow-OutRight"
  },
  {
    subtitle: "Lighting",
    title: "I shine with love and light in every moment",
    btnLink: "/blogs/blog-post-layout-01",
    img: "https://via.placeholder.com/800x557",
    icon: "line-icon-Arrow-OutRight"
  }
]

const SocialIconsData = [
  {
    color: "#828282",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "#828282",
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  },
  {
    color: "#828282",
    link: "https://www.linkedin.com/",
    icon: "fab fa-linkedin-in"
  },
  {
    color: "#828282",
    link: "https://www.youtube.com/",
    icon: "fab fa-youtube"
  }
]

const blogMasonryData = blogData.filter((item) => item.blogType === "masonry").filter(item => item.category.includes("decor"));

const HomeDecorPage = (props) => {
  const [activeSlide, setActiveSlide] = useState(0)
  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header start */}
      <Header className="header-with-topbar decor-header" topSpace={{ desktop: true }} type="reverse-scroll">
        <Topbar className="bg-lightgray border-b border-[#0000001a] sm:hidden md:px-[15px]">
          <Container fluid className="px-[50px]">
            <Row>
              <Col className="col-12 col-sm-auto text-center items-center flex text-sm-start me-auto ps-lg-0 !pl-[15px]">
                <SocialIcons theme="social-icon-style-01" className="decor-social-icon" size="xs" iconColor="dark" data={SocialIconsData} />
              </Col>
              <Col className="col-auto flex xs:hidden text-right">
                <div className="top-bar-contact flex">
                  <span className="border-l border-[#0000001a] py-[13px] px-[18px] text-sm flex items-center">
                    <i className="far fa-envelope mr-[10px] text-md relative text-basecolor"></i>
                    <a aria-label="gmail for link" href="mailto:info@yourdomain.com" className="hover:text-darkgray">info@yourdomain.com</a>
                  </span>
                  <span className="border-l border-[#0000001a] py-[13px] px-[18px] md:pr-0 text-sm flex items-center sm:hidden">
                    <i className="far fa-clock mr-[10px] text-md relative text-basecolor"></i>
                    Mon - Fri: 10:00 - 22:00
                  </span>
                </div>
                <div className="header-language pl-0 text-[17px] align-middle inline-block md:hidden">
                  <Dropdown className="border-l border-r border-solid border-[#0000001a] h-full text-[#828282]">
                    <Dropdown.Toggle className="rounded-none uppercase w-auto h-full font-normal text-xs leading-[11px] border-[0px] m-0 dropdown-toggle after:none sm-w-100 items-center flex px-[18px] py-[12px] bg-transparent" id="dropdown-basic">
                      <span className="icon-country w-[16px] h-[16px] inline-block my-0 mr-[10px] ml-0"><img width="16px" height="16px" src="/assets/img/webp/usa.webp" alt="" /></span>EN <i className="fas fa-angle-down ml-[5px] align-middle relative after:content-[' ']"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className="dropdown-items bg-transparent hover:bg-transparent p-0 border-0 m-0 flex items-center justify-start" href="#/action-1">
                        <span className="icon-country w-[16px] h-[16px] inline-block my-0 mr-[10px] ml-[5px]"><img width="16px" height="16px" src="/assets/img/webp/usa.webp" alt="" /></span>English
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-items bg-transparent hover:bg-transparent p-0 border-0 m-0 flex items-center justify-start" href="#/action-2">
                        <span className="icon-country w-[16px] h-[16px] inline-block my-0 mr-[10px] ml-[5px]"><img width="16px" height="16px" src="/assets/img/webp/england.webp" alt="" /></span>England
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-items bg-transparent hover:bg-transparent p-0 border-0 m-0 flex items-center justify-start" href="#/action-3">
                        <span className="icon-country w-[16px] h-[16px] inline-block my-0 mr-[10px] ml-[5px]"><img width="16px" height="16px" src="/assets/img/webp/france.webp" alt="" /></span>France
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-items bg-transparent hover:bg-transparent p-0 border-0 m-0 flex items-center justify-start" href="#/action-4">
                        <span className="icon-country w-[16px] h-[16px] inline-block my-0 mr-[10px] ml-[5px]"><img width="16px" height="16px" src="/assets/img/webp/russian.webp" alt="" /></span>Russian
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-items bg-transparent hover:bg-transparent p-0 border-0 m-0 flex items-center justify-start" href="#/action-5">
                        <span className="icon-country w-[16px] h-[16px] inline-block my-0 mr-[10px] ml-[5px]"><img width="16px" height="16px" src="/assets/img/webp/spain.webp" alt="" /></span>Spain
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </Container>
        </Topbar>
        {/* Header Start */}
        <HeaderNav fluid="fluid" theme="light" bg="white" expand="lg" containerClass="sm:!px-0" className="py-[0px] px-[35px] md:pr-[15px] md:pl-0">
          <Col className="col-auto mr-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center -mr-[35px]" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-tussock.webp' data-rjs='/assets/img/webp/logo-tussock@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-tussock.webp' data-rjs='/assets/img/webp/logo-tussock@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-tussock.webp' data-rjs='/assets/img/webp/logo-tussock@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Navbar.Toggle className="order-last md:ml-[25px] sm:ml-[17px]">
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="col-auto justify-center">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto text-right !pr-0">
            <SearchBar />
            <HeaderCart />
          </Col>
        </HeaderNav>
        {/* Header End */}
      </Header>
      {/* Header End */}

      {/* Section Start */}
      <section className="home-decor flex items-center justify-center overflow-hidden relative">
        <Swiper
          pagination={{ el: ".custom-pagination", clickable: true }}
          keyboard={true}
          effect="fade"
          loop={true}
          fadeEffect={{ crossFade: true }}
          modules={[Pagination, EffectFade, Mousewheel, Keyboard]}
          className="font-serif overflow-hidden h-[800px] lg:h-[545px] sm:h-[400px] xs:full-screen"
          onSlideChange={(swiperCore) => {
            const { realIndex } = swiperCore;
            setActiveSlide(realIndex)
          }}
        >
          <SwiperSlide className="cover-background bg-[#faf6f3] z-20 flex items-center transition-default" style={{ backgroundImage: "url('/assets/img/webp/transparent.webp')" }}>
            <m.span
              initial={{ opacity: 0, x: -40 }}
              animate={activeSlide === 0 ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute top-0 left-[-110px] h-full flex items-center z-[1] text-[#fff] leading-none text-[310px] xl:hidden"
            >01</m.span>
            <Container fluid="md" className="relative h-full">
              <Row className="font-serif h-full xs:flex-col-reverse xs:flex-nowrap xs:gap-y-[10px]">
                <Col xl={6} lg={6} sm={6} xs={12} className="caption text-base overflow-hidden flex flex-col justify-center items-start relative lg:pl-5 xs:items-center xs:text-center xs:h-1/2">
                  <m.span
                    initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                    animate={{ clipPath: activeSlide === 0 ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="uppercase inline-block mb-[20px] text-left leading-[15px] text-basecolor font-medium sm:text-xs">CLASSICAL HOME DECOR
                  </m.span>
                  <m.h2 className="heading-6 text-[81px] leading-[86px] p-0 font-bold text-darkgray mb-[45px] lg:text-[60px] lg:leading-[55px] sm:text-[33px] sm:leading-[30px] sm:mb-[25px]"
                    initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                    animate={{ clipPath: activeSlide === 0 ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                    transition={{ delay: 1.2, duration: 0.6 }}>New decor collection
                  </m.h2>
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={activeSlide === 0 ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}>
                    <Buttons ariaLabel="view collections" href="/shop/shop-wide" className="font-semibold hover:text-darkgray flex items-center font-serif uppercase btn-expand rounded md:mb-[15px]" icon="line-icon-Arrow-OutRight text-[30px] inline-block" iconPosition="after" size="xl" color="#232323" themeColor="rgba(191,140,76,0.3)" to="/" title="view collections" />
                  </m.div>
                </Col>
                <Col sm={6} className="relative xs:h-1/2">
                  <m.div
                    className="circle w-[940px] h-[940px] bg-[#f0e6da] -z-[1] rounded-full absolute bottom-[-250px] left-[-50px] lg:w-[650px] lg:h-[650px] lg:-bottom-[30px] lg:left-[-99px] md:bottom-0 sm:w-[500px] sm:h-[500px] xs:w-[320px] xs:h-[320px] xs:top-[-50px] xs:right-[-50px] xs:left-auto"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={activeSlide === 0 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}>
                    <m.div className="element-one inline-block" animate={{ x: [1, -6, -9, -9, -6, 6, 9, 9, 1], y: [1, 6, 9, 9, -6, -9, -9, -6, 1] }} transition={{ times: [1, 6, 2, 2, 6, 2, 2, 6], duration: 10, repeat: Infinity, }} >
                    </m.div>
                  </m.div>
                  <MouseMove enableOnHover={true} speed={2} className="h-full w-full block absolute z-[3] bottom-[50px] lg:bottom-0 xs:left-0">
                    <div>
                      <m.img
                        height=""
                        width=""
                        alt="..."
                        initial={{ opacity: 0 }}
                        animate={activeSlide === 0 ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 1.7, duration: 1 }}
                        className="absolute top-[0] left-[155px] lg:w-[130px] lg:left-[70px] sm:w-[80px] xs:-translate-x-1/2 xs:left-1/2"
                        src="https://via.placeholder.com/218x250"
                      />
                      <m.img
                        height=""
                        width=""
                        alt="..."
                        initial={{ opacity: 0 }}
                        animate={activeSlide === 0 ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute bottom-[-55px] lg:w-[365px] lg:bottom-[-20px] lg:right-[190px] md:right-[60px] sm:w-[230px] sm:bottom-0 xs:right-auto xs:left-[calc(50%-50px)] xs:-translate-x-1/2"
                        src="https://via.placeholder.com/552x504"
                      />
                      <m.img
                        height=""
                        width=""
                        alt="..."
                        initial={{ opacity: 0 }}
                        animate={activeSlide === 0 ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 2.2, duration: 1 }}
                        className="absolute right-[-125px] bottom-[-32px] lg:w-[120px] lg:bottom-[20px] lg:right-[100px] md:right-0 sm:w-[80px] sm:bottom-0 xs:right-auto xs:left-[calc(50%+100px)] xs:-translate-x-1/2"
                        src="https://via.placeholder.com/193x495"
                      />
                    </div>
                  </MouseMove>
                </Col>
              </Row>
            </Container>
          </SwiperSlide>
          <SwiperSlide className="cover-background bg-[#faf6f3] z-20 flex items-center transition-default" style={{ backgroundImage: "url('/assets/img/webp/transparent.webp')" }}>
            <m.span
              initial={{ opacity: 0, x: -40 }}
              animate={activeSlide === 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute top-0 left-[-110px] h-full flex items-center z-[1] text-[#fff] leading-none text-[310px] xl:hidden"
            >02</m.span>
            <Container fluid="md" className="relative h-full">
              <Row className="font-serif h-full xs:flex-col-reverse xs:flex-nowrap xs:gap-y-[50px]">
                <Col xl={6} lg={6} sm={6} xs={12} className="caption text-base overflow-hidden flex flex-col justify-center items-start relative lg:pl-5 xs:items-center xs:text-center xs:h-1/2">
                  <m.span
                    initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                    animate={{ clipPath: activeSlide === 1 ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="uppercase inline-block mb-[20px] text-left leading-[15px] text-basecolor font-medium sm:text-xs">CLASSICAL HOME DECOR
                  </m.span>
                  <m.h2 className="heading-6 text-[81px] leading-[86px] p-0 font-bold text-darkgray mb-[45px] lg:text-[60px] lg:leading-[55px] sm:text-[33px] sm:leading-[30px] sm:mb-[25px]"
                    initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                    animate={{ clipPath: activeSlide === 1 ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                    transition={{ delay: 1.2, duration: 0.6 }}>New chair collection
                  </m.h2>
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={activeSlide === 1 ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}>
                    <Buttons ariaLabel="view collections" href="/shop/shop-wide" className="font-semibold hover:text-darkgray flex items-center font-serif uppercase btn-expand rounded md:mb-[15px]" icon="line-icon-Arrow-OutRight text-[30px] inline-block" iconPosition="after" size="xl" color="#232323" themeColor="rgba(191,140,76,0.3)" to="/" title="view collections" />
                  </m.div>
                </Col>
                <Col sm={6} className="relative xs:h-1/2">
                  <m.div
                    className="circle w-[940px] h-[940px] bg-[#f0e6da] -z-[1] rounded-full absolute bottom-[-250px] left-[-50px] lg:w-[650px] lg:h-[650px] lg:-bottom-[30px] lg:left-[-99px] md:bottom-0 sm:w-[500px] sm:h-[500px] xs:w-[320px] xs:h-[320px] xs:top-[-50px] xs:right-[-50px] xs:left-auto"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={activeSlide === 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}>
                    <m.div className="element-one inline-block" animate={{ x: [1, -6, -9, -9, -6, 6, 9, 9, 1], y: [1, 6, 9, 9, -6, -9, -9, -6, 1] }} transition={{ times: [1, 6, 2, 2, 6, 2, 2, 6], duration: 10, repeat: Infinity, }} >
                    </m.div>
                  </m.div>
                  <MouseMove speed={2} className="h-full w-full block absolute z-[3] bottom-[50px] lg:bottom-0 xs:left-0">
                    <div>
                      <m.img
                        height=""
                        width=""
                        alt="..."
                        initial={{ opacity: 0 }}
                        animate={activeSlide === 1 ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 1.7, duration: 1 }}
                        className="absolute top-[-20px] left-[415px] lg:w-[100px] lg:left-[150px] sm:w-[80px] xs:-translate-x-1/2 xs:left-1/2"
                        src="https://via.placeholder.com/134x287"
                      />
                      <m.img
                        height=""
                        width=""
                        alt="..."
                        initial={{ opacity: 0 }}
                        animate={activeSlide === 1 ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute w-[545px] bottom-[35px] right-[20px] lg:w-[365px] lg:bottom-[-20px] lg:right-[300px] md:right-[60px] sm:w-[230px] sm:right-[170px] sm:bottom-0 xs:bottom-[-50px] xs:left-[calc(50%-25px)] xs:-translate-x-1/2"
                        src="https://via.placeholder.com/514x498"
                      />
                      <m.img
                        height=""
                        width=""
                        alt="..."
                        initial={{ opacity: 0 }}
                        animate={activeSlide === 1 ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 2.2, duration: 1 }}
                        className="absolute w-[332px] right-[-225px] bottom-[55px] lg:w-[260px] lg:bottom-[20px] lg:right-[100px] md:right-[-120px] sm:w-[180px] sm:bottom-0 sm:right-[40px] xs:bottom-[-50px] xs:left-[calc(50%+115px)] xs:-translate-x-1/2"
                        src="https://via.placeholder.com/313x358"
                      />
                    </div>
                  </MouseMove>
                </Col>
              </Row>
            </Container>
          </SwiperSlide>
          <SwiperSlide className="cover-background bg-[#faf6f3] z-20 flex items-center transition-default" style={{ backgroundImage: "url('/assets/img/webp/transparent.webp')" }}>
            <m.span
              initial={{ opacity: 0, x: -40 }}
              animate={activeSlide === 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute top-0 left-[-110px] h-full flex items-center z-[1] text-[#fff] leading-none text-[310px] xl:hidden"
            >03</m.span>
            <Container fluid="md" className="relative h-full">
              <Row className="font-serif h-full xs:flex-col-reverse xs:flex-nowrap xs:gap-y-[10px]">
                <Col xl={6} lg={6} sm={6} xs={12} className="caption text-base overflow-hidden flex flex-col justify-center items-start relative lg:pl-5 xs:items-center xs:text-center xs:h-1/2">
                  <m.span
                    initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                    animate={{ clipPath: activeSlide === 2 ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="uppercase inline-block mb-[20px] text-left leading-[15px] text-basecolor font-medium sm:text-xs">CLASSICAL HOME DECOR
                  </m.span>
                  <m.h2 className="heading-6 text-[81px] leading-[86px] p-0 font-bold text-darkgray mb-[45px] lg:text-[60px] lg:leading-[55px] sm:text-[33px] sm:leading-[30px] sm:mb-[25px]"
                    initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                    animate={{ clipPath: activeSlide === 2 ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                    transition={{ delay: 1.2, duration: 0.6 }}>New chair collection
                  </m.h2>
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={activeSlide === 2 ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}>
                    <Buttons ariaLabel="view collections" href="/shop/shop-wide" className="font-semibold hover:text-darkgray flex items-center font-serif uppercase btn-expand rounded md:mb-[15px]" icon="line-icon-Arrow-OutRight text-[30px] inline-block" iconPosition="after" size="xl" color="#232323" themeColor="rgba(191,140,76,0.3)" to="/" title="view collections" />
                  </m.div>
                </Col>
                <Col sm={6} className="relative xs:h-1/2">
                  <m.div
                    className="circle w-[940px] h-[940px] bg-[#f0e6da] -z-[1] rounded-full absolute bottom-[-250px] left-[-50px] lg:w-[650px] lg:h-[650px] lg:-bottom-[30px] lg:left-[-99px] md:bottom-0 sm:w-[500px] sm:h-[500px] xs:w-[320px] xs:h-[320px] xs:top-[-50px] xs:right-[-50px] xs:left-auto"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={activeSlide === 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}>
                    <m.div className="element-one inline-block" animate={{ x: [1, -6, -9, -9, -6, 6, 9, 9, 1], y: [1, 6, 9, 9, -6, -9, -9, -6, 1] }} transition={{ times: [1, 6, 2, 2, 6, 2, 2, 6], duration: 10, repeat: Infinity, }} >
                    </m.div>
                  </m.div>
                  <MouseMove speed={2} className="h-full w-full block absolute z-[3] bottom-[50px] lg:bottom-0 xs:left-0">
                    <div>
                      <m.img
                        height=""
                        width=""
                        alt="..."
                        initial={{ opacity: 0 }}
                        animate={activeSlide === 2 ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 1.7, duration: 1 }}
                        className="absolute top-[0] left-[200px] lg:w-[130px] lg:left-[70px] sm:w-[80px] xs:-translate-x-1/2 xs:left-1/2"
                        src="https://via.placeholder.com/179x215"
                      />
                      <m.img
                        height=""
                        width=""
                        alt="..."
                        initial={{ opacity: 0 }}
                        animate={activeSlide === 2 ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute w-[410px] left-[40px] bottom-[100px] lg:w-[365px] lg:bottom-[-20px] lg:right-[200px] lg:left-auto md:right-[80px] sm:w-[230px] sm:right-[120px] sm:bottom-0 xs:left-[calc(50%-25px)] xs:-translate-x-1/2 xs:right-auto"
                        src="https://via.placeholder.com/385x436"
                      />
                      <m.img
                        height=""
                        width=""
                        alt="..."
                        initial={{ opacity: 0 }}
                        animate={activeSlide === 2 ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 2.2, duration: 1 }}
                        className="absolute w-[565px] right-[-265px] bottom-[15px] lg:w-[350px] lg:bottom-[0] lg:right-0 md:w-[350px] md:right-[-100px] sm:w-[250px] sm:right-[-30px] sm:bottom-0 xs:right-auto xs:left-[calc(50%+100px)] xs:-translate-x-1/2"
                        src="https://via.placeholder.com/534x529"
                      />
                    </div>
                  </MouseMove>
                </Col>
              </Row>
            </Container>
          </SwiperSlide>
        </Swiper>
        <div className="custom-pagination container xs:text-center"></div>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[90px] md:py-[75px] sm:py-[50px] border-b border-mediumgray">
        <Container>
          <Row className="row row-cols-1 row-cols-lg-4 row-cols-sm-2 justify-center gap-y-10">
            <Col>
              <m.div className="flex items-center" {...{ ...fadeIn, transition: { delay: 0.2, duration: 1.2 } }}>
                <i className="line-icon-Headset text-[35px] text-basecolor mr-[30px] lg:mr-[25px] inline-block"></i>
                <div> <div className="text-darkgray leading-none font-medium text-xmd mb-[5px]">Expert support</div> <span>Contact support team</span>
                </div>
              </m.div>
            </Col>
            <Col>
              <m.div className="flex items-center" {...{ ...fadeIn, transition: { delay: 0.4, duration: 1.2 } }}>
                <i className="line-icon-Like-2 text-[35px] text-basecolor mr-[30px] lg:mr-[25px] inline-block"></i>
                <div> <div className="text-darkgray leading-none font-medium text-xmd mb-[5px]">Perfect quality</div> <span>Perfect design quality</span> </div>
              </m.div>
            </Col>
            <Col>
              <m.div className="flex items-center" {...{ ...fadeIn, transition: { delay: 0.6, duration: 1.2 } }}>
                <i className="line-icon-Shield text-[35px] text-basecolor mr-[30px] lg:mr-[25px] inline-block"></i>
                <div> <div className="text-darkgray leading-none font-medium text-xmd mb-[5px]">Security checkout</div> <span>Safe and trustworthy</span> </div>
              </m.div>
            </Col>
            <Col>
              <m.div className="flex items-center" {...{ ...fadeIn, transition: { delay: 0.8, duration: 1.2 } }}>
                <i className="line-icon-Coin text-[35px] text-basecolor mr-[30px] lg:mr-[25px] inline-block"></i>
                <div>
                  <div className="text-darkgray leading-none font-medium text-xmd mb-[5px]">Instant discounts</div> <span>Use your coupon now</span> </div>
              </m.div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Parallax Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" style={{ backgroundImage: 'url(/assets/img/webp/home-decor-bg-img-02.webp)' }}>
        <Container>
          <Row className="justify-center items-center">
            <Col lg={6} md={10} className="relative mb-[20px] md:mb-32 sm:mb-40 xs:mb-0">
              <div className="relative">
                <Parallax className="lg-no-parallax w-[70%] mb-16" speed={0}> <img alt="" src="https://via.placeholder.com/700x1027" className="w-full" width="385.34" height="565.34" /> </Parallax>
                <Parallax className="lg-no-parallax flex justify-center items-center w-[55%] bg-no-repeat absolute bottom-0 right-[15px] lg:!ml-auto lg:!top-[145px]" speed={20}>
                  <img alt="" src="https://via.placeholder.com/317x477" width="317" height="477" />
                </Parallax>
              </div>
            </Col>
            <Col lg={{ span: 5, offset: 1 }} md={10}>
              <div className="font-serif text-md font-medium mb-[30px] flex">
                <span className="w-[40px] h-[1px] bg-basecolor opacity-70 self-center mr-[20px] shrink-0"></span>
                <div className="grow-[1]"> <span className="text-basecolor uppercase">About our company</span> </div>
              </div>
              <h1 className="heading-4 font-serif text-darkgray font-semibold w-[85%] mb-[35px] lg:w-full sm:mb-[25px]">Classic beautiful and modern decor presence of design</h1>
              <p className="mb-[25px] w-[80%] lg:w-full">Lorem ipsum dolor sit amet consectetur adipiscing do eiusmod tempor incididunt ut labore dolore magna enim veniam nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <ScrollTo href='#' to="specialization" offset={0} delay={0} spy={true} smooth={true} duration={800}>
                <Buttons type="submit" ariaLabel="Our services" className="btn-fill btn-fancy rounded-none font-medium font-serif uppercase hover:text-black mt-[20px]" themeColor="#232323" size="md" color="#fff" title="Our services" />
              </ScrollTo>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Parallax End */}

      {/* Section Start */}
      <section id="specialization" className="bg-[#f9f6f3] py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col md={6} className="text-center mb-[4.5rem] md:mb-12">
              <div className="flex flex-row items-center justify-center text-center mb-[10px]">
                <span className="w-[25px] h-[1px] bg-basecolor opacity-40"></span>
                <div className="font-serif text-xmd text-basecolor px-[10px]">our specialization</div>
                <span className="w-[25px] h-[1px] bg-basecolor opacity-40"></span>
              </div>
              <h2 className="heading-5 font-serif font-bold text-darkgray uppercase tracking-[-1px]">Distinctive Interiors</h2>
            </Col>
          </Row>
        </Container>
        <Container>
          <InteractiveBanners12 grid="gap-y-10 justify-center" animation={fadeIn} animationDelay={0.2} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col md={6} className="text-center mb-[77px] md:mb-12">
              <div className="flex flex-row items-center justify-center text-center mb-[10px]">
                <span className="w-[25px] h-[1px] bg-basecolor opacity-40"></span>
                <div className="font-serif text-xmd text-basecolor px-[10px]">stylish and simple</div>
                <span className="w-[25px] h-[1px] bg-basecolor opacity-40"></span>
              </div>
              <h2 className="heading-5 font-serif font-bold text-darkgray uppercase tracking-[-1px]">DECOR PRODUCTS</h2>
            </Col>
          </Row>
          <InteractiveBanners13 grid="row row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-10 items-center" animation={zoomIn} animationTransition="circOut" animationDuration={1} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray">
        <Container fluid>
          <Row>
            <m.div
              className="bg-cover bg-center md:h-[450px] xs:h-[300px] col-xl-6 col-lg-4"
              style={{ backgroundImage: `url("https://via.placeholder.com/1024x903")` }} {...fadeInRight} ></m.div>
            <Col xl={6} lg={8}>
              <Row>
                <m.div
                  className="bg-cover bg-center xs:h-[300px] order-1 col-sm-6 order-sm-1"
                  style={{ backgroundImage: `url("https://via.placeholder.com/700x617")` }} {...{ ...fadeIn, transition: { delay: 0.4 } }}></m.div>
                <m.div
                  className="px-28 py-32 xl:px-12 xl:py-16 md:py-24 bg-[#f9f6f3] bg-no-repeat bg-[right_5px_bottom_-25px] order-2 col-sm-6 order-sm-2"
                  style={{ backgroundImage: `url("https://via.placeholder.com/140x153")` }} {...{ ...fadeIn, transition: { delay: 0.5 } }} >
                  <span className="font-serif font-semibold text-darkgray text-lg mb-[20px] block"> Creativity ideas </span>
                  <p className="mb-[30px]"> Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore. </p>
                  <Buttons className="btn-fill font-medium font-serif uppercase rounded-none" themeColor="#bf8c4c" color="#fff" size="sm" title="View collection" />
                </m.div>
                <m.div
                  className="px-28 py-32 xl:px-12 xl:py-16 md:py-24 bg-[#f9f6f3] bg-no-repeat bg-[right_25px_bottom_-35px] order-4 col-sm-6 order-sm-3"
                  style={{ backgroundImage: `url("https://via.placeholder.com/168x172")`, }} {...{ ...fadeIn, transition: { delay: 0.8 } }} >
                  <span className="font-serif font-semibold text-darkgray text-lg mb-[20px] block"> Innovation concept </span>
                  <p className="mb-[30px]"> Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore. </p>
                  <Buttons className="btn-fill font-medium font-serif uppercase rounded-none" themeColor="#bf8c4c" color="#fff" size="sm" title="View collection" />
                </m.div>
                <m.div
                  className="bg-cover bg-center xs:h-[300px] order-3 col-sm-6 order-sm-4"
                  style={{ backgroundImage: `url("https://via.placeholder.com/700x617")` }} {...{ ...fadeIn, transition: { delay: 0.7 } }} ></m.div>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="border-b border-mediumgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Clients grid="row-cols-1 row-cols-md-4 row-cols-sm-2 row-cols-lg-4 gap-y-[40px]" theme="client-logo-style-02" data={ClientData} animation={fadeIn} animationDelay={0.1} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container fluid>
          <Row className="justify-center">
            <Col md={6} className="col-12 text-center mb-[4.5rem] md:mb-12">
              <div className="flex flex-row items-center justify-center text-center mb-[10px]">
                <span className="w-[25px] h-[1px] bg-basecolor opacity-40"></span>
                <div className="font-serif text-xmd text-basecolor px-[10px]">stylish and simple</div>
                <span className="w-[25px] h-[1px] bg-basecolor opacity-40"></span>
              </div>
              <h2 className="heading-5 font-serif font-bold text-darkgray uppercase tracking-[-1px]">LATEST PRODUCTS</h2>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col xl={9} lg={11}>
              <PortfolioBordered
                overlay={[" #828282", "#fff", "#f9f6f3", "#fff", "#828282"]}
                grid="grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large text-center"
                data={portfolioBorderedMasonryData} />
            </Col>
            <Col className="col-12 text-center mt-20">
              <Buttons ariaLabel="view all products" to="/portfolio/portfolio-bordered-masonry" className="mx-3 font-medium font-serif uppercase tracking-[1px] hover:text-white rounded-none md:mb-[15px] bg-[#fff]" color="#BF8C4C" size="lg" themeColor="#BF8C4C" title="view all products" />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="overflow-hidden">
        <Container fluid className="px-0">
          <InteractiveBanners01 grid="row-cols-1" data={InteractiveBannersData} animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-[#f9f6f3] py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col md={6} className="col-12 text-center mb-[4.5rem] md:mb-12">
              <div className="flex flex-row items-center justify-center text-center mb-[10px]">
                <span className="w-[25px] h-[1px] bg-basecolor opacity-40"></span>
                <div className="font-serif text-xmd text-basecolor px-[10px]">home decor idea</div>
                <span className="w-[25px] h-[1px] bg-basecolor opacity-40"></span>
              </div>
              <h2 className="heading-5 font-serif font-bold text-darkgray uppercase tracking-[-1px]">DECOR BLOGS</h2>
            </Col>
          </Row>
          <Row>
            <Col className="sm:px-0">
              <BlogMasonry filter={false} grid="grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={blogMasonryData} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col md={12}>
              <Instagram carousel={true}
                carouselOption={{
                  loop: true,
                  slidesPerView: 2,
                  spaceBetween: 15,
                  autoplay: { "delay": 3500, "disableOnInteraction": false },
                  keyboard: { "enabled": true, "onlyInViewport": true },
                  breakpoints: { 1200: { slidesPerView: 6 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 3 } }
                }}
                total_posts={8} title="#instagram decor" grid="" />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section Start */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="text-[#7F8082] bg-darkgray" />
      {/* Footer End */}

    </div>)
}

export default HomeDecorPage