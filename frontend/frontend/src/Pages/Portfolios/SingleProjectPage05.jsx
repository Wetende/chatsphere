import React, { useRef } from "react";

// Libraries
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Components
import Header, {
  HeaderCart,
  HeaderLanguage,
  HeaderNav,
  Menu,
  SearchBar,
} from "../../Components/Header/Header";
import { Parallax } from "react-scroll-parallax";
import ImageGallery from "../../Components/ImageGallery/ImageGallery";
import FooterStyle01 from "../../Components/Footers/FooterStyle01";
import {
  fadeIn,
  fadeInLeft,
  fadeInRight,
} from "../../Functions/GlobalAnimations";
import SideButtons from "../../Components/SideButtons";

// Data
import { imageGalleryData02 } from "../../Components/ImageGallery/ImageGalleryData";
const TestimonialsCarouselData = [
  {
    img: "https://via.placeholder.com/1215x860",
  },
  {
    img: "https://via.placeholder.com/1215x860",
  },
  {
    img: "https://via.placeholder.com/1215x860",
  },
  {
    img: "https://via.placeholder.com/1215x860",
  },
  {
    img: "https://via.placeholder.com/1215x860",
  },
  {
    img: "https://via.placeholder.com/1215x860",
  },
];

const SingleProjectPage05 = (props) => {
  const swiperRef = useRef(null);
  return (
    <div style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav
          fluid="fluid"
          theme="light"
          bg="white"
          menu="light"
          className="px-[35px] py-[0px] md:px-0"
          containerClass="sm:px-0"
        >
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img
                  className="default-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-black.webp"
                  data-rjs="/assets/img/webp/logo-black@2x.webp"
                  alt="logo"
                />
                <img
                  className="alt-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-black.webp"
                  data-rjs="/assets/img/webp/logo-black@2x.webp"
                  alt="logo"
                />
                <img
                  className="mobile-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-black.webp"
                  data-rjs="/assets/img/webp/logo-black@2x.webp"
                  alt="logo"
                />
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
            <SearchBar className="pr-0 xs:p-0" />
            <HeaderLanguage />
            <HeaderCart />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <section className="py-0 relative">
        <Swiper
          ref={swiperRef}
          slidesPerView="auto"
          speed={1000}
          pagination={{ clickable: true }}
          breakpoints={{
            992: {
              slidesPerView: "auto",
              spaceBetween: 0,
            },
          }}
          loop={true}
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          centeredSlides={true}
          className="SingleProjectPage05 relative black-move"
        >
          {TestimonialsCarouselData.map((item, i) => {
            return (
              <SwiperSlide key={i} className="w-[55%] md:w-full">
                <img height="" width="" src={item.img} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>
        {
          <>
            <div
              onClick={() => swiperRef.current.swiper.slidePrev()}
              className="absolute top-1/2 -translate-y-1/2 left-[40px] z-[1] cursor-pointer slider-navigation-style-07 swiper-button-previous-nav xs:left-[10px]"
            >
              <i className="feather-arrow-left text-[15px] text-black font-normal shadow-[0_0_30px_rgba(0,0,0,0.08)] bg-white flex justify-center items-center rounded-full h-[40px] w-[40px] text-center sm:h-[40px] sm:w-[40px]"></i>
            </div>
            <div
              onClick={() => swiperRef.current.swiper.slideNext()}
              className="absolute top-1/2 -translate-y-1/2 right-[40px] z-[1] cursor-pointer slider-navigation-style-07 swiper-button-next-nav xs:right-[10px]"
            >
              <i className="feather-arrow-right text-[15px] text-black font-normal shadow-[0_0_30px_rgba(0,0,0,0.08)] bg-white flex justify-center items-center rounded-full h-[40px] w-[40px] text-center sm:h-[40px] sm:w-[40px]"></i>
            </div>
          </>
        }
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="items-center justify-center">
            <m.div
              {...fadeIn}
              className="col-8 col-lg-3 offset-lg-1 col-md-5 col-sm-6 md:mb-[50px]"
            >
              <img
                height=""
                width=""
                src="https://via.placeholder.com/775x575"
                alt=""
              />
            </m.div>
            <m.div
              {...{ ...fadeIn, transition: { delay: 0.6 } }}
              className="col-12 col-lg-6 offset-lg-1 visible"
            >
              <h5 className="font-medium tracking-[-1px] text-darkgray font-serif mb-[25px] md:text-center lg:mb-[15px]">
                Early bird coffee identity
              </h5>
              <p className="mb-0 xl:text-start w-full md:w-[80%] lg:text-start lg:mx-auto md:text-center">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry. lorem ipsum has been the industrys standard dummy text
                ever since when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not
                only five centuries but also leap into typesetting.
              </p>
            </m.div>
            <m.div
              {...fadeIn}
              className="col-12 col-md-12 text-center flex my-[4rem] items-center flex-row"
            >
              <span className="h-[1px] bg-mediumgray w-full"></span>
              <img
                height=""
                width=""
                src="https://via.placeholder.com/115x115"
                alt=""
              />
              <span className="h-[1px] bg-mediumgray w-full"></span>
            </m.div>
            <Col className="col-12 font-serif uppercase text-sm font-medium leading-[12px]">
              <Row>
                <m.div
                  {...fadeIn}
                  className="col-12 col-md-3 col-sm-6 text-[13px] font-serif border-mediumgray visible border-r-[1px] text-center sm:mb-[20px]"
                >
                  <span className="text-darkgray inline-block md:mb-[10px] md:block">
                    {" "}
                    DATE:{" "}
                  </span>
                  <span> 08 JANUARY 2020</span>
                </m.div>
                <m.div
                  {...{ ...fadeIn, transition: { delay: 0.6 } }}
                  className="col-12 col-md-3 col-sm-6 text-[13px] font-serif border-mediumgray visible border-r-[1px] text-center sm:border-none sm:mb-[20px]"
                >
                  <span className="text-darkgray inline-block md:mb-[10px] md:block">
                    {" "}
                    CLIENT:{" "}
                  </span>
                  <span> EARLY BIRD COFFEE</span>
                </m.div>
                <m.div
                  {...{ ...fadeIn, transition: { delay: 0.8 } }}
                  className="col-12 col-md-3 col-sm-6 text-[13px] font-serif border-mediumgray visible border-r-[1px] text-center sm:mb-[20px]"
                >
                  <span className="text-darkgray inline-block md:mb-[10px] md:block">
                    {" "}
                    INDUSTRY:{" "}
                  </span>
                  <span> COFFEE</span>
                </m.div>
                <m.div
                  {...{ ...fadeIn, transition: { delay: 0.9 } }}
                  className="col-12 col-md-3 col-sm-6 text-[13px] font-serif text-center sm:mb-[20px]"
                >
                  <span className="text-darkgray inline-block md:mb-[10px] md:block">
                    {" "}
                    WEBSITE:{" "}
                  </span>
                  <a
                    aria-label="themezaa"
                    rel="noreferrer"
                    href="https://www.themezaa.com/"
                    target="_blank"
                  >
                    {" "}
                    WWW.THEMEZAA.COM
                  </a>
                </m.div>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section
        className="relative bg-cover overflow-hidden bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage:
            "url(/assets/img/webp/single-project-page-05-img-20.webp)",
        }}
      >
        <Container>
          <Row className="mb-24 sm:mb-20">
            <m.div {...fadeInRight} className="col-12 col-md-6 sm:mb-8">
              <img
                height=""
                width=""
                src="https://via.placeholder.com/800x846"
                alt=""
              />
            </m.div>
            <m.div {...fadeInLeft} className="col-12 col-md-6">
              <img
                height=""
                width=""
                src="https://via.placeholder.com/800x846"
                alt=""
              />
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Parallax Scrolling Start */}
      <div className="h-[700px] md:h-[550px] sm:h-[350px] bg-top overflow-hidden relative">
        <Parallax
          className="lg-no-parallax bg-cover cover-background absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh]"
          translateY={[-50, 50]}
          style={{
            backgroundImage: `url(https://via.placeholder.com/1920x1100)`,
          }}
        ></Parallax>
        <div className="tracking-[-3px] text-gradient-peacock-blue-crome-yellow left-0 bottom-[-35px] lg:bottom-[-25px] opacity-70 font-semibold text-[130px] leading-[120px] font-serif uppercase text-center w-full absolute lg:text-[110px] lg:leading-[100px] md:text-[90px] md:leading-[85px] sm:leading-[70px] sm:text-[50px] xs:bottom-[-15px]">
          Roasted coffee
        </div>
      </div>
      {/* Parallax Scrolling End */}

      {/* Section Start */}
      <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <m.div {...fadeIn} className="row">
            <Col md={12}>
              <img
                height=""
                width=""
                src="https://via.placeholder.com/1200x750"
                alt=""
                className="mb-16 sm:mb-8"
              />
              <img
                height=""
                width=""
                src="https://via.placeholder.com/1200x750"
                alt=""
                className="mb-16 sm:mb-8"
              />
              <img
                height=""
                width=""
                src="https://via.placeholder.com/1200x750"
                alt=""
              />
            </Col>
          </m.div>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section
        className="bg-no-repeat bg-cover overflow-hidden relative bg-center py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]"
        style={{
          backgroundImage:
            "url(https://via.placeholder.com/1920x735)",
        }}
      >
        <Container fluid>
          <Row className="justify-center">
            <Col md={8}>
              <Row lg={3} className="justify-center row-cols-1">
                <m.div {...fadeIn} className="col text-center md:mb-[20px]">
                  <img
                    height=""
                    width=""
                    src="https://via.placeholder.com/800x973"
                    alt=""
                  />
                  <span className="mt-[30px] font-medium text-darkgray text-md font-serif uppercase block">
                    {" "}
                    BLACK COFFEE{" "}
                  </span>
                </m.div>
                <m.div
                  {...{ ...fadeIn, transition: { delay: 0.6 } }}
                  className="col text-center md:mb-[20px]"
                >
                  <img
                    height=""
                    width=""
                    src="https://via.placeholder.com/800x973"
                    alt=""
                  />
                  <span className="mt-[30px] font-medium text-darkgray text-md font-serif uppercase block">
                    {" "}
                    TURKISH COFFEE{" "}
                  </span>
                </m.div>
                <m.div
                  {...{ ...fadeIn, transition: { delay: 0.8 } }}
                  className="col text-center"
                >
                  <img
                    height=""
                    width=""
                    src="https://via.placeholder.com/800x973"
                    alt=""
                  />
                  <span className="mt-[30px] font-medium text-darkgray text-md font-serif uppercase block">
                    {" "}
                    VACUUM COFFEE{" "}
                  </span>
                </m.div>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="pt-[130px] lg:pt-[90px] md:pt-[75px] sm:pt-[50px] overflow-hidden">
        <Container>
          <Row className="justify-center">
            <Col lg={4}>
              <h5 className="font-medium tracking-[-1px] text-darkgray font-serif">
                My birthstone is a coffee bean
              </h5>
            </Col>
            <Col lg={{ span: 6, offset: 1 }}>
              <p>
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry. lorem ipsum has been the industrys standard dummy text
                ever since when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not
                only five centuries but also leap into typesetting.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="px-[10rem] md:px-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container fluid>
          <Row>
            <Col className="sm:px-[5px] xs:px-0">
              <ImageGallery
                animation={fadeIn}
                theme="image-gallery-02"
                data={imageGalleryData02}
                overlay={[
                  "#36c1e1",
                  "#28ccc0",
                  "#74cf8e",
                  "#bac962",
                  "#feb95b",
                ]}
                grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large"
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section>
        <Container fluid className="px-0">
          <Row className="gx-0">
            <Col md={7} className="p-0">
              <img
                height=""
                width=""
                src="https://via.placeholder.com/1120x687"
                className="w-full"
                alt=""
              />
            </Col>
            <Col md={5} className="p-0">
              <img
                height=""
                width=""
                src="https://via.placeholder.com/800x687"
                className="w-full"
                alt=""
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="relative z-[1] bg-lightgray p-0 overflow-hidden">
        <Container fluid className="px-0">
          <Row sm={2} className="row-cols-1 justify-center xs:text-center gx-0">
            <Col className="relative">
              <Link
                to="/portfolio/single-project-page-04"
                className="portfolio_btn h-full px-28 py-16 justify-between items-center flex xl:p-12 md:inline-flex"
              >
                <div
                  className="portfolio_img absolute top-0 left-0 h-full w-full -z-[1] duration-150	bg-no-repeat bg-cover overflow-hidden bg-center"
                  style={{
                    backgroundImage:
                      "url(https://via.placeholder.com/955x185)",
                  }}
                ></div>
                <div className="btn_icon font-medium text-darkgray font-serif mr-uto uppercase">
                  <i className="line-icon-Arrow-OutLeft duration-100	text-[40px] inline-block mr-[20px] align-middle	"></i>
                  <span className="text-sm inline-block md:hidden">
                    Prev project
                  </span>
                </div>
                <span className="portfolio_disc font-medium text-darkgray text-xlg font-serif block lg:text-[18px] lg:leading-[26px] md:text-left">
                  Model photography
                </span>
              </Link>
            </Col>
            <Col className="relative md:flex md:justify-end xs:block">
              <Link
                to="/portfolio/single-project-page-01"
                className="portfolio_btn h-full px-28 py-16 justify-between items-center flex xl:p-12 md:inline-flex"
              >
                <span className="portfolio_disc font-medium text-darkgray text-xlg font-serif block lg:text-[18px] lg:leading-[26px] md:text-right">
                  Daimler financial
                </span>
                <div
                  className="portfolio_img absolute top-0 left-0 h-full w-full -z-[1] duration-150	bg-no-repeat bg-cover overflow-hidden bg-center"
                  style={{
                    backgroundImage:
                      "url(https://via.placeholder.com/955x185)",
                  }}
                ></div>
                <div className="btn_icon font-medium text-darkgray font-serif mr-uto uppercase">
                  <span className="text-sm inline-block md:hidden">
                    Next project{" "}
                  </span>
                  <i className="line-icon-Arrow-OutRight duration-100	text-[40px] inline-block ml-[20px] align-middle	"></i>
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
      {/* Footer End */}
    </div>
  );
};

export default SingleProjectPage05;
