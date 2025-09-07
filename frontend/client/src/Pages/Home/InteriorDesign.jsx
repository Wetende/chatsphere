import React from "react";

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Keyboard } from "swiper/modules";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { m } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { Link } from "react-router-dom";

// Components
import Buttons from "../../Components/Button/Buttons";
import {
  fadeIn,
  fadeInDown,
  fadeInLeft,
} from "../../Functions/GlobalAnimations";
import Overlap from "../../Components/Overlap/Overlap";
import Header, { HeaderNav, Menu } from "../../Components/Header/Header";
import PortfolioColorful from "../../Components/Portfolio/PortfolioColorful";
import Counter from "../../Components/Counters/Counter";
import CustomModal from "../../Components/CustomModal";
import TestimonialsCarousel05 from "../../Components/TestimonialCarousel/TestimonialsCarousel05";
import BlogSimple from "../../Components/Blogs/BlogSimple";
import FooterStyle09 from "../../Components/Footers/FooterStyle09";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import FancyTextBox from "../../Components/FancyTextBox/FancyTextBox";
import SideButtons from "../../Components/SideButtons";

// Data
import { CounterData02 } from "../../Components/Counters/CounterData";
import { blogData } from "../../Components/Blogs/BlogData";
import { TestimonialsCarouselData5 } from "../../Components/TestimonialCarousel/TestimonialsCarouselData";

const IconWithTextData = [
  {
    title: "Interior design",
    content:
      "Lorem ipsum dolor sit consectetur adipiscing elit eiusmod incididunt",
    linkTitle: "READ MORE",
    link: "#",
  },
  {
    title: "Interior decoration",
    content:
      "Lorem ipsum dolor sit consectetur adipiscing elit eiusmod incididunt",
    linkTitle: "READ MORE",
    link: "#",
  },
  {
    title: "Lighting design",
    content:
      "Lorem ipsum dolor sit consectetur adipiscing elit eiusmod incididunt ",
    linkTitle: "READ MORE",
    link: "#",
  },
  {
    title: "Interior design",
    content:
      "Lorem ipsum dolor sit consectetur adipiscing elit eiusmod incididunt ",
    linkTitle: "READ MORE",
    link: "#",
  },
];

const SocialIconsData = [
  {
    color: "#828282",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f",
  },
  {
    color: "#828282",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram",
  },
  {
    color: "#828282",
    link: "https://twitter.com/",
    icon: "fab fa-twitter",
  },
];

const portfolioColorfulData = [
  {
    title: "Mongolish",
    img: "https://via.placeholder.com/415x530",
    category: ["Interior"],
    subtitle: "Interior",
    link: "/portfolio/single-project-page-01",
  },
  {
    title: "Geometry",
    img: "https://via.placeholder.com/650x530",
    category: ["Interior"],
    subtitle: "Interior",
    link: "/portfolio/single-project-page-02/",
  },
  {
    title: "Sphere",
    img: "https://via.placeholder.com/415x530",
    category: ["Interior"],
    subtitle: "Interior",
    link: "/portfolio/single-project-page-03/",
  },
  {
    title: "Bedroom",
    img: "https://via.placeholder.com/415x530",
    category: ["Interior"],
    subtitle: "Interior",
    link: "/portfolio/single-project-page-04/",
  },
  {
    title: "Mongolish",
    img: "https://via.placeholder.com/415x530",
    category: ["Interior"],
    subtitle: "Interior",
    link: "/portfolio/single-project-page-01",
  },
  {
    title: "Geometry",
    img: "https://via.placeholder.com/650x530",
    category: ["Interior"],
    subtitle: "Interior",
    link: "/portfolio/single-project-page-02/",
  },
  {
    title: "Sphere",
    img: "https://via.placeholder.com/415x530",
    category: ["Interior"],
    subtitle: "Interior",
    link: "/portfolio/single-project-page-03/",
  },
  {
    title: "Bedroom",
    img: "https://via.placeholder.com/415x530",
    category: ["Interior"],
    subtitle: "Interior",
    link: "/portfolio/single-project-page-04/",
  },
];

const fancyTextBox = [
  {
    title: "INTERIOR DESIGN IS A BUSINESS OF TRUST",
    description: "Lorem ipsum dolor consectetur adipiscing dolor incididunt.",
    hoverImg: "https://via.placeholder.com/1920x1000",
    link: "#",
  },
  {
    title: "WE BELIEVE IN THE POWER OF DESIGN",
    description: "Lorem ipsum dolor consectetur adipiscing dolor incididunt.",
    hoverImg: "https://via.placeholder.com/1920x1000",
    link: "#",
  },
  {
    title: "DESIGN IS A PROCESS OF DISCOVERY",
    description: "Lorem ipsum dolor consectetur adipiscing dolor incididunt.",
    hoverImg: "https://via.placeholder.com/1920x1000",
    link: "#",
  },
  {
    title: "WE WANT TO BRING INTERIOR DESIGN",
    description: "Lorem ipsum dolor consectetur adipiscing dolor incididunt.",
    hoverImg: "https://via.placeholder.com/1920x1000",
    link: "#",
  },
];

// Filter the simple blog data
const blogSimpleData = blogData.filter((item) => item.blogType === "simple");

const InteriorDesignPage = (props) => {
  const swiperRef = React.useRef(null);
  const swiperRef1 = React.useRef(null);

  return (
    <div className="interior-design" style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header topSpace={{ md: false }} type="reverse-scroll">
        <HeaderNav
          theme="dark"
          expand="lg"
          containerClass="sm:!px-0"
          className="interior-design-header py-[0px] px-[35px] md:pr-[15px] md:pl-0 md:py-[20px]"
          fluid="fluid"
        >
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img
                  className="default-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-white.webp"
                  data-rjs="/assets/img/webp/logo-white@2x.webp"
                  alt="logo"
                />
                <img
                  className="alt-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-yellow-ochre.webp"
                  data-rjs="/assets/img/webp/logo-yellow-ochre@2x.webp"
                  alt="logo"
                />
                <img
                  className="mobile-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-yellow-ochre-alt.webp"
                  data-rjs="/assets/img/webp/logo-yellow-ochre-alt@2x.webp"
                  alt="logo"
                />
              </Navbar.Brand>
            </Link>
          </Col>
          <Navbar.Toggle className="md:ml-[25px] sm:ml-[17px]">
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="justify-center interiordesign-header-menu col-auto col-lg-8 menu-order px-lg-0">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto col-lg-2 pe-0 md:!pl-[30px] xxs:!pl-[20px]">
            <SocialIcons
              theme="social-icon-style-01"
              size="xs"
              iconColor="light"
              className="justify-end"
              data={SocialIconsData}
            />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}

      {/* Section Start */}
      <section className="relative">
        <button
          aria-label="swiper next button"
          onClick={() => swiperRef1.current.swiper.slidePrev()}
          className="swiper-button-prev absolute top-[48%] z-[2] left-[40px] text-[40px] text-white w-[50px] leading-[50px] flex justify-center items-center right-inherit cursor-pointer after:hidden hover:opacity-50 transition-default"
        >
          <i className="line-icon-Arrow-OutLeft text-[40px]"></i>
        </button>
        <button
          aria-label="swiper prev button"
          onClick={() => swiperRef1.current.swiper.slideNext()}
          className="swiper-button-next absolute top-[48%] z-[2] right-[40px] text-[40px] text-white w-[50px] leading-[50px] flex justify-center items-center  right-inherit cursor-pointer after:hidden hover:opacity-50 transition-default"
        >
          <i className="line-icon-Arrow-OutRight text-[40px]"></i>
        </button>
        <Swiper
          pagination={{ clickable: true }}
          keyboard={true}
          ref={swiperRef1}
          loop={true}
          modules={[Navigation, Pagination, Keyboard, Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="full-screen landscape:md:h-[600px] swiper-pagination-02 interior-design-swiper swiper-pagination-light swiper-pagination-medium white-move swiper-default-nav-hidden"
        >
          <SwiperSlide
            className="relative overflow-hidden bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://via.placeholder.com/1920x1080)",
            }}
          >
            <div className="flex flex-col justify-end ml-auto w-[600px] h-full xl:w-[550px] sm:w-full">
              <div className="bg-white py-28 px-32 xl:py-20 xl:px-24 xs:p-10">
                <Col className="p-0 mb-[25px] md:inline-block items-center justify-center">
                  <span className="font-serif text-basecolor inline-block font-medium align-middle">
                    01
                  </span>
                  <span className="w-[35px] h-[1px] inline-block align-middle bg-mediumgray ml-[22px] mr-[15px] "></span>
                  <span className="inline-block font-serif text-basecolor uppercase font-medium align-middle">
                    Resident interior
                  </span>
                </Col>
                <Col className="col-12 p-0 font-serif justify-center mb-[10px]">
                  <div className="flex">
                    <h2 className="heading-3 m-0 self-center text-darkgray uppercase font-bold -tracking-[2px] w-[80%]">
                      Concrete pent house
                    </h2>
                    <span className="self-center text-center ml-[30px]">
                      <Link
                        aria-label="demo"
                        to="#"
                        className="inline-block leading-[65px] rounded-full bg-darkgray w-[60px] h-[60px]"
                      >
                        <i className="feather-arrow-right text-xlg text-white"></i>
                      </Link>
                    </span>
                  </div>
                </Col>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="relative overflow-hidden bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://via.placeholder.com/1920x1080)",
            }}
          >
            <div className="flex flex-col justify-end ml-auto w-[600px] h-full xl:w-[550px] sm:w-full">
              <div className="bg-white py-28 px-32 xl:py-20 xl:px-24 xs:p-10">
                <Col className="p-0 mb-[25px] md:inline-block items-center justify-center">
                  <span className="font-serif text-basecolor inline-block font-medium align-middle">
                    02
                  </span>
                  <span className="w-[35px] h-[1px] inline-block align-middle bg-mediumgray ml-[22px] mr-[15px] "></span>
                  <span className="inline-block font-serif text-basecolor uppercase font-medium align-middle">
                    Product design
                  </span>
                </Col>
                <Col className="col-12 p-0 font-serif justify-center mb-[10px]">
                  <div className="flex">
                    <h2 className="heading-3 m-0 self-center text-darkgray uppercase font-bold -tracking-[2px] w-[80%]">
                      Modernism table pots
                    </h2>
                    <span className="self-center text-center ml-[30px]">
                      <Link
                        aria-label="demo"
                        to="#"
                        className="inline-block leading-[65px] rounded-full bg-darkgray w-[60px] h-[60px]"
                      >
                        <i className="feather-arrow-right text-xlg text-white"></i>
                      </Link>
                    </span>
                  </div>
                </Col>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="relative overflow-hidden bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://via.placeholder.com/1920x1080)",
            }}
          >
            <div className="flex flex-col justify-end ml-auto w-[600px] h-full xl:w-[550px] sm:w-full">
              <div className="bg-white py-28 px-32 xl:py-20 xl:px-24 xs:p-10">
                <Col className="p-0 mb-[25px] md:inline-block items-center justify-center">
                  <span className="font-serif text-basecolor inline-block font-medium align-middle">
                    03
                  </span>
                  <span className="w-[35px] h-[1px] inline-block align-middle bg-mediumgray ml-[22px] mr-[15px] "></span>
                  <span className="inline-block font-serif text-basecolor uppercase font-medium align-middle">
                    Resident interior
                  </span>
                </Col>
                <Col className="col-12 p-0 font-serif justify-center mb-[10px]">
                  <div className="flex">
                    <h2 className="heading-3 m-0 self-center text-darkgray uppercase font-bold -tracking-[2px] w-[80%]">
                      Comfort seating
                    </h2>
                    <span className="self-center text-center ml-[30px]">
                      <Link
                        aria-label="demo"
                        to="#"
                        className="inline-block leading-[65px] rounded-full bg-darkgray w-[60px] h-[60px]"
                      >
                        <i className="feather-arrow-right text-xlg text-white"></i>
                      </Link>
                    </span>
                  </div>
                </Col>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="relative py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] sm:border-t border-[#dee2e6]">
        <Container>
          <Row className="items-start">
            <m.div
              className="col-lg-4 col-md-6 col-sm-7 flex flex-col sm:mb-20"
              {...{ ...fadeIn, transition: { delay: 0.2 } }}
            >
              <h1 className="heading-6 font-serif uppercase w-[75%] text-darkgray font-bold mb-[15px] lg:w-[90%] md:w-[75%] md:mb-[10px]">
                We are interior design team based on new york
              </h1>
              <div className="mt-20 w-[70%] mx:lg-0 md:mt-0 xs:w-1/2 xxs:w-[70%]">
                <a
                  aria-label="gmail"
                  href="mailto:hello@domain.com"
                  className="font-serif text-basecolor hover:text-darkgray underline underline-offset-4 font-medium"
                >
                  hello@domain.com
                </a>
                <Buttons
                  ariaLabel="About Company"
                  to="/page/about-us/"
                  className="mt-8 text-xxs btn-fancy tracking-[1px] rounded-none font-medium font-serif uppercase hover:text-white bg-[#fff]"
                  size="sm"
                  color="#232323"
                  themeColor="#232323"
                  title="About Company"
                />
              </div>
            </m.div>
            <m.div
              className="col-lg-4 col-md-6 md:mb-24 sm:mb-[50px]"
              {...{ ...fadeIn, transition: { delay: 0.4 } }}
            >
              <div className="font-serif uppercase text-xmd font-semibold text-darkgray mb-[25px] sm:mb-[15px]">
                New design trends 2020
              </div>
              <p className="w-[85%] xl:w-full mb-[25px]">
                Sed ut perspiciatis unde omnis natus error sit voluptam accu
                santium natus error omnis iste natus error sit volupta accu
                santium sed perspiciatis unde omnis iste natus.
              </p>
              <p className="w-[85%] xl:w-full">
                Perspiciatis unde omnis natus error natus voluptatem accu
                santium natus omnis iste natus error sit voluptatem accu
                santium.
              </p>
            </m.div>
            <m.div
              className="col-lg-4"
              {...{ ...fadeIn, transition: { delay: 0.6 } }}
            >
              <div className="outside-box-bottom relative mb-[-14vw] lg:mb-0">
                <img
                  width={360}
                  height={542}
                  className="relative z-[1] w-full"
                  src="https://via.placeholder.com/720x1084"
                  alt=""
                />
                {/* Modal Component Start */}
                <CustomModal.Wrapper
                  className="absolute bottom-0 right-0 z-[1] landscape:md:!-bottom-[25px]"
                  modalBtn={
                    <div className="relative flex items-center p-[35px] right-0 bg-[#f1edea] bottom-[-25px] z-[2] lg:p-[25px] lg:bottom-0 w-[76%] ml-auto cursor-pointer">
                      <Buttons
                        ariaLabel="modal btn"
                        type="submit"
                        className="relative btn-sonar border-0"
                        themeColor="#000"
                        color="#fff"
                        size="md"
                        title={<i className="icon-control-play" />}
                      />
                      <span className="flex-1 relative ml-3 video-icon-text font-serif text-darkgray text-md uppercase font-semibold">
                        company achievements
                      </span>
                    </div>
                  }
                >
                  <div className="w-[1020px] max-w-full relative rounded mx-auto">
                    <div className="fit-video">
                      <iframe
                        width="100%"
                        height="100%"
                        className="shadow-[0_0_8px_rgba(0,0,0,0.06)]"
                        controls
                        src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </CustomModal.Wrapper>
                {/* Modal Component End */}
              </div>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-[#f1edea] pb-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden xs:pt-[9%] xs:px-[15px]">
        <Container fluid>
          <m.div
            className="row overflow-hidden"
            {...{ ...fadeInDown, transition: { delay: 0.4, duration: 0.7 } }}
          >
            <Overlap
              value={40}
              className="overflow-hidden relative -left-[10px] px-0 text-start font-serif font-semibold text-[#fff] xl:block text-[154px] leading-[154px] -tracking-[8px] whitespace-nowrap lg:hidden"
            >
              achievements
            </Overlap>
          </m.div>
        </Container>
        <Container className="pt-[8%] lg:pt-0">
          <Row className="justify-center md:justify-start text-center font-serif mb-28 lg:mb-16 md:mb-12 xs:mb-20">
            <Col lg={6} sm={8} className="md:text-left xs:px-0">
              <span className="text-basecolor font-medium mb-[20px] block uppercase">
                Home decoration services
              </span>
              <h2 className="heading-5 font-serif font-bold -tracking-[1px] uppercase text-darkgray block md:text-start mb-0">
                Simple is good, we turn ideas into works of design art
              </h2>
            </Col>
          </Row>
          <Row className="items-center">
            <m.div
              className="relative md:mb-[20px] col-xl-3 col-lg-4 col-md-6 pt-[65px] md:pt-0 xs:p-0"
              {...fadeInLeft}
            >
              <span className="font-serif mb-[20px] block uppercase font-medium">
                Expert services
              </span>
              <h2 className="heading-6 font-serif uppercase text-darkgray font-bold mb-[40px] md:mb-[20px]">
                We like to make you feel more on your home
              </h2>
              <div className="flex">
                <div
                  onClick={() => swiperRef.current.swiper.slidePrev()}
                  className="btn-slider-next text-[40px] text-[#828282] hover:text-black transition-default leading-[40px] w-auto h-[40px] mr-[25px]"
                >
                  <button aria-label="swiper next" className="">
                    <i className="line-icon-Arrow-OutLeft"></i>
                  </button>
                </div>
                <div
                  onClick={() => swiperRef.current.swiper.slideNext()}
                  className="btn-slider-prev text-[40px] text-[#828282] hover:text-black transition-default leading-[40px] w-auto h-[40px]"
                >
                  <button aria-label="swiper prev" className="">
                    <i className="line-icon-Arrow-OutRight"></i>
                  </button>
                </div>
              </div>
            </m.div>
            <m.div className="col-lg-8 offset-xl-1" {...fadeInLeft}>
              <Swiper
                className="interiordesign-icon-with-text black-move swiper-pagination-medium h-full min-w-[1170px] md:min-w-full"
                ref={swiperRef}
                spaceBetween={30}
                slidesPerView={1}
                observer={true}
                observeParents={true}
                loop={true}
                modules={[Autoplay]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                keyboard={{
                  enabled: true,
                  onlyInViewport: true,
                }}
                breakpoints={{
                  992: { slidesPerView: 3 },
                  768: { slidesPerView: 2 },
                }}
              >
                <>
                  <Row className={`${props.grid} md:justify-center`}>
                    {IconWithTextData.map((item, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <m.div
                            className="feature-box-bg-white-hover border-[1px] border-[#0000001a] overflow-hidden"
                            {...{
                              ...props.animation,
                              transition: { delay: 0.2 * i },
                            }}
                          >
                            <div className="feature-box-move-bottom-top py-12 px-16 md:py-8 md:px-10 sm:py-12 sm:px-[4.5rem] xs:pt-16">
                              <h2 className="heading-4 font-serif font-medium text-[#c3964e] mb-[20px] -tracking-[2px]">{`${
                                i <= 9 ? "0" : ""
                              }${i + 1}`}</h2>
                              <div className="feature-box-content">
                                {item.title && (
                                  <span className="font-semibold text-darkgray title font-serif uppercase text-xmd mb-[10px] inline-block">
                                    {item.title}
                                  </span>
                                )}
                                {item.content && <p>{item.content}</p>}
                              </div>
                              <div className="move-bottom-top w-full flex justify-start mt-[15px] xs:mt-0">
                                {(item.linkTitle || item.link) && (
                                  <Buttons
                                    ariaLabel="swiper btn"
                                    className="font-medium font-serif uppercase btn-link after:h-[2px] md:text-md md:mb-[15px] after:bg-basecolor hover:text-basecolor text-[#c3964e]"
                                    to={item.link}
                                    title={item.linkTitle}
                                  />
                                )}
                              </div>
                            </div>
                          </m.div>
                        </SwiperSlide>
                      );
                    })}
                  </Row>
                </>
              </Swiper>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section
        className="cover-background py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] sm:pt-[100px]"
        style={{
          backgroundImage:
            "url(/assets/img/webp/home-interior-design-about-bg.webp)",
        }}
        {...fadeIn}
      >
        <Container className="relative">
          <Row className="items-center justify-center">
            <Col
              lg={6}
              md={10}
              className="relative lg:mt-[30px] md:mb-36 sm:mb-36 md:mt-0"
            >
              <Parallax
                className="lg-no-parallax relative w-1/2 md:w-[70%] z-[2] mt-[20%] lg:mt-0 lg:mr-auto"
                speed={0}
              >
                {" "}
                <m.img
                  width={278}
                  height={344}
                  src="https://via.placeholder.com/556x690"
                  alt=""
                  {...fadeIn}
                />{" "}
              </Parallax>
              <Parallax
                className="lg-no-parallax flex justify-center items-center w-[65%] bg-no-repeat absolute bottom-[-100px] right-[15px] lg:!left-auto lg:!right-0"
                speed={5}
              >
                <m.img
                  width={380}
                  height={554}
                  src="https://via.placeholder.com/780x1137 "
                  alt=""
                  {...fadeIn}
                />
              </Parallax>
            </Col>
            <m.div
              className="col-lg-5 offset-lg-1 col-md-10"
              {...{ ...fadeIn, transition: { delay: 0.4, duration: 1 } }}
            >
              <div className="font font-medium mb-[30px] flex">
                <span className="flex-shrink-0 w-[30px] h-[1px] bg-basecolor opacity-70 self-center mr-5"></span>
                <div className="flex-grow-1">
                  <span className="text-basecolor uppercase">
                    about interior design
                  </span>
                </div>
              </div>
              <h2 className="heading-5 font-serif uppercase text-darkgray font-bold w-[85%] mb-[30px] xl:w-full">
                we highly followed the new trends of interior designs
              </h2>
              <p className="w-[75%] xl:w-full mb-[25px]">
                Lorem ipsum dolor amet consectetur adipiscing do eiusmod tempor
                incididunt ut labore et dolore ut enim ad minim veniam nostrud
                exercitation laboris nisi ut aliquip ex ea commodo.
              </p>
              <Buttons
                ariaLabel="discover litho"
                href="/"
                className="btn-fill font-medium font-serif rounded-none tracking-[1px] uppercase md:mb-[15px] mt-[20px]"
                themeColor="#232323"
                color="#fff"
                size="lg"
                title="discover litho"
              />
            </m.div>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] relative border-t border-mediumgray overflow-hidden">
        <Container fluid className="px-0">
          <m.div
            className="row justify-center text-center mb-[98px] lg:mb-20 md:mb-16"
            {...fadeIn}
          >
            <Col
              xl={6}
              lg={7}
              md={8}
              sm={12}
              className="font-serif flex flex-col items-center text-center"
            >
              <span className="font-medium text-basecolor text-base uppercase block mb-[10px]">
                INTERIOR DESIGN
              </span>
              <h2 className="heading-5 font-bold -tracking-[1px] text-darkgray block uppercase mb-0">
                Latest Projects
              </h2>
            </Col>
          </m.div>
          <m.div className="row" {...{ ...fadeIn, transition: { delay: 0.5 } }}>
            <Col className="pl-40 lg:pl-24 md:pl-0">
              <PortfolioColorful
                grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
                overlay="#c3964ee6"
                data={portfolioColorfulData}
                carousel={true}
                carouselOption={{
                  spaceBetween: 30,
                  loop: true,
                  slidesPerView: "auto",
                  autoplay: { delay: 4000, disableOnInteraction: false },
                }}
                className="swiper-auto-slide"
              />
            </Col>
          </m.div>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section
        className="pb-[130px] lg:pb-[90px] md:pb-[75px] sm:pb-[50px]"
        {...fadeIn}
      >
        <Container>
          <Counter
            theme="counter-style-02"
            grid="row-cols-1 row-cols-md-4 row-cols-sm-2 gap-y-10 items-center justify-center text-center"
            className="text-black interiordesign-counter"
            data={CounterData02}
            duration={2}
          />
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section
        className="bg-darkgray cover-background overflow-hidden"
        style={{
          backgroundImage:
            "url(https://via.placeholder.com/1920x1000)",
        }}
        {...fadeIn}
      >
        <Container fluid className="px-0">
          <FancyTextBox
            grid="row row-cols-1 row-cols-xl-4 row-cols-sm-2 gx-0 px-0"
            themeColor=""
            className="justify-center"
            theme="fancy-text-box-05"
            data={fancyTextBox}
            animation={fadeIn}
          />
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px]  xs:py-[50px]">
        <Container>
          <Row className="items-center justify-center overflow-hidden">
            <m.div
              className="col-lg-4 col-sm-8 lg:text-start md:mb-20 md:text-center px-[15px]"
              {...fadeIn}
            >
              <span className="font-serif font-medium text-basecolor uppercase block mb-[15px]">
                Loved by our customers
              </span>
              <h2 className="heading-5 font-serif font-bold uppercase text-darkgray -tracking-[1px] m-0">
                What our clients are saying about our services
              </h2>
            </m.div>
            <m.div className="col-xl-7 col-lg-8 offset-xl-1" {...fadeInLeft}>
              <TestimonialsCarousel05
                data={TestimonialsCarouselData5}
                className="overflow-hidden"
                carouselOption={{
                  slidesPerView: 1,
                  loop: true,
                  navigation: false,
                  autoplay: { delay: 2500, disableOnInteraction: false },
                }}
              />
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px]  xs:py-[50px] relative bg-[#f1edea]">
        <Container fluid>
          <Row className="justify-center text-center font-serif">
            <Col
              xl={6}
              lg={7}
              md={8}
              sm={12}
              className="flex flex-col items-center text-center mb-24 lg:mb-16 md:mb-12 xs:mb-20"
            >
              <span className="font-medium text-basecolor text-base uppercase block m-[10px]">
                INTERIOR POSTS
              </span>
              <h2 className="heading-5 text-[32px] font-bold -tracking-[1px] text-darkgray block w-3/5 mb-0">
                LATEST BLOGS
              </h2>
            </Col>
          </Row>
        </Container>
        <Container fluid className="px-[6%]">
          <Row className="justify-center">
            <Col xl={12} lg={12} sm={10} className="interiordesign-blog">
              <BlogSimple
                overlay="#374162"
                pagination={false}
                grid="grid grid-3col xl-grid-2col lg-grid-2col md-grid-1col sm-grid-1col xs-grid-1col gutter-double-extra-large"
                data={blogSimpleData.slice(0, 3)}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section
        className="bg-cover relative bg-center bg-no-repeat realtive overflow-hidden py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]"
        style={{
          backgroundImage:
            "url(https://via.placeholder.com/1920x352)",
        }}
      >
        <div className="opacity-50 bg-darkgray absolute top-0 left-0 w-full h-full"></div>
        <Container>
          <Row className="items-center justify-center">
            <Col className="text-center relative">
              <h2 className="heading-6 font-serif text-xlg md:text-lg xs:text-lg font-semibold text-[#fff] uppercase mb-0">
                Are you ready to work with us? &nbsp;
                <a
                  aria-label="button"
                  href="/contact-us-modern"
                  className="font-semibold text-xlg pt-0 font-serif uppercase text-decoration-line-bottom md:text-lg md:leading-[26px] text-[#fff] hover:text-white"
                >
                  start a project
                </a>
              </h2>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Footer Start */}
      <FooterStyle09
        className="bg-darkgray"
        logo="/assets/img/webp/logo-yellow-ochre-light-alt.webp"
        theme="dark"
      />
      {/* Footer End */}
    </div>
  );
};

export default InteriorDesignPage;
