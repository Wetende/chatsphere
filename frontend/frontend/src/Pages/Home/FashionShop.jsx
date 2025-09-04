import React from "react";

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Keyboard, EffectFade } from "swiper/modules";
import { Col, Container, Row, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { Form, Formik } from "formik";
import * as Yup from "yup";

// Functions
import { resetForm, sendEmail } from "../../Functions/Utilities";

// Components
import {
  Header,
  HeaderCart,
  HeaderNav,
  Menu,
  SearchBar,
  Topbar,
} from "../../Components/Header/Header";
import Buttons from "../../Components/Button/Buttons";
import OnlyCategories from "../../Components/Products/OnlyCategories";
import ShopWide from "../../Components/Products/ShopWide";
import CountDown from "../../Components/Countdown/Countdown";
import BlogClassic from "../../Components/Blogs/BlogClassic";
import { fadeIn } from "../../Functions/GlobalAnimations";
import FooterStyle07 from "../../Components/Footers/FooterStyle07";
import { Input } from "../../Components/Form/Form";
import CustomModal from "../../Components/CustomModal";
import MessageBox from "../../Components/MessageBox/MessageBox";
import Overlap from "../../Components/Overlap/Overlap";
import SideButtons from "../../Components/SideButtons";

// Data
import {
  FashionShopData,
  filterData,
} from "../../Components/Products/ProductData";
import { blogData } from "../../Components/Blogs/BlogData";

const svgBlobPathOne = {
  start: {
    d: "M458,311Q461,372,407.5,401Q354,430,302,442.5Q250,455,193.5,450.5Q137,446,89,408Q41,370,21.5,310Q2,250,36.5,198.5Q71,147,99,92.5Q127,38,188.5,23.5Q250,9,304.5,35Q359,61,398,101.5Q437,142,446,196Q455,250,458,311Z",
  },
  end: {
    d: "M479.5,312Q465,374,416.5,414Q368,454,309,474.5Q250,495,189,478Q128,461,87.5,414Q47,367,28.5,308.5Q10,250,43,200Q76,150,106.5,102.5Q137,55,193.5,29Q250,3,311,21Q372,39,407,89Q442,139,468,194.5Q494,250,479.5,312Z",
  },
};
const svgBlobPathTwo = {
  start: {
    d: "M326,335Q240,430,155.5,335Q71,240,155.5,144.5Q240,49,326,144.5Q412,240,326,335Z",
  },
  end: {
    d: "M322.5,332.5Q240,425,129.5,332.5Q19,240,129.5,144Q240,48,322.5,144Q405,240,322.5,332.5Z",
  },
};

const swiperData = [
  {
    titleOne: "Summer",
    titleTwo: "collections",
    subTitle: "Dress up your style",
    img: "https://via.placeholder.com/749x898",
  },
  {
    titleOne: "Discover",
    titleTwo: "bestseller",
    subTitle: "Most unique style",
    img: "https://via.placeholder.com/749x898",
  },
  {
    titleOne: "Exclusive",
    titleTwo: "collections",
    subTitle: "Most exclusive brands",
    img: "https://via.placeholder.com/749x898",
  },
];

const shopCategoriesData = [
  {
    img: "https://via.placeholder.com/600x800",
    title: "Man Collections",
    link: "/shop/shop-wide",
  },
  {
    img: "https://via.placeholder.com/600x800",
    title: "Kids Collections",
    link: "/shop/shop-wide",
  },
  {
    img: "https://via.placeholder.com/600x800",
    link: "/shop/shop-wide",
  },
  {
    img: "https://via.placeholder.com/600x800",
    title: "Woman Collections",
    link: "/shop/shop-wide",
  },
];

const blogClassicData = blogData
  .filter((item) => item.blogType === "classic")
  .filter((item) => item.category.includes("fashionshop"));

const FashionShopPage = (props) => {
  const swiperRef = React.useRef(null);

  const handleClose = () => {
    let newsletter_modal = document.querySelector("#subscribe-popup"),
      newsletter_checkbox = newsletter_modal.querySelector("#newsletter-off");

    import("../../Functions/Utilities").then((module) => {
      if (module.getCookie("litho-promo-popup") !== "shown") {
        if (newsletter_checkbox.checked) {
          document.cookie = "litho-promo-popup=shown";
        }
      }
    });
  };

  const pagination = {
    clickable: true,
    el: ".custom-pagination",
    renderBullet: function (index, className) {
      return `<span class="${className}">0${index + 1}</span>`;
    },
  };

  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <Topbar className="bg-darkgray py-[8px] border-b border-[#0000001a] sm:hidden md:px-0">
          <Container
            fluid
            className="px-[50px] lg:pr-[65px] font-sans md:px-[30px]"
          >
            <Row>
              <Col
                sm="auto"
                className="text-center sm:text-start flex items-center"
              >
                <p className="text-md m-0">
                  <span className="font-medium text-white">Offer: </span>
                  Worldwide free shipping for all orders of $150
                </p>
              </Col>
              <Col className="sm:block text-end lg:px-0">
                <div>
                  <span className="mr-[25px] md:pr-0 text-sm md:mr-[15px]">
                    <i className="feather-phone-call text-md mr-[7px] text-white"></i>
                    0222 8899900
                  </span>
                  <span className="lg:inline-block md:hidden text-sm">
                    <i className="feather-map-pin text-md m-[10px] text-white"></i>
                    401 Broadway, 24th Floor, San Francisco
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </Topbar>
        <HeaderNav
          fluid="fluid"
          theme="light"
          bg="white"
          menu="light"
          className="px-[35px] py-[0px] md:pl-0 md:pr-[15px]"
          containerClass="pl-[15px] sm:px-0"
        >
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="link for" className="flex items-center" to="/">
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
          <Navbar.Toggle className="order-last md:ml-[17px] md:px-[15px] xs:px-0">
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="col-auto col-lg-8 justify-center menu-order px-lg-0 md:!px-0">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto col-lg-2 text-end pe-0 font-size-0">
            <SearchBar className="xs:pl-[15px]" />
            <HeaderCart className="xs:pl-[15px]" />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      {/* Section Start */}
      <section className="fashion-shop-swiper relative flex items-center justify-center overflow-hidden">
        <Swiper
          ref={swiperRef}
          pagination={pagination}
          keyboard={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          modules={[Pagination, Mousewheel, Keyboard, EffectFade]}
          className="fashion-shop-swiper h-[870px] swiper-pagination-fractional lg:h-[650px] md:h-[910px] xs:h-[600px] landscape:md:h-[500px]"
        >
          {swiperData.map((item, i) => {
            return (
              <SwiperSlide
                key={i}
                className="bg-mediumgray h-full overflow-hidden flex items-center md:items-end justify-center transition-default xs:items-start landscape:md:items-start"
              >
                {/* Big Circle End */}
                <m.svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="800"
                  width="800"
                  viewBox="0 0 400 400"
                  id="blobSvg"
                  className="absolute -right-[50px] bottom-0 lg:w-[600px] lg:h-[600px] md:-bottom-[30%] xs:w-[400px] xs:h-[400px]"
                  initial="start"
                  whileInView="end"
                  animate={{
                    x: [1, -6, -9, -9, -6, 6, 9, 9, 1],
                    y: [1, 6, 9, 9, -6, -9, -9, -6, 1],
                  }}
                  transition={{
                    times: [1, 6, 2, 2, 6, 2, 2, 6],
                    duration: 10,
                    ease: "easeOut",
                    repeat: Infinity,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="gradient-one"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "rgba(235, 60, 119, 1)" }}
                      ></stop>
                      <stop
                        offset="100%"
                        style={{ stopColor: "rgba(245, 147, 23, 1)" }}
                      ></stop>
                    </linearGradient>
                  </defs>
                  <m.path
                    variants={svgBlobPathOne}
                    transition={{
                      duration: 2,
                      yoyo: Infinity,
                      repeat: Infinity,
                    }}
                    fill="url(#gradient-one)"
                  ></m.path>
                </m.svg>
                {/* Big Circle End */}

                {/* Small Circle Start */}
                <m.svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="500"
                  width="500"
                  viewBox="0 0 400 400"
                  id="blobSvg"
                  className="absolute top-[0px] -right-[50px] opacity-80 lg:top-[-150px] md:left-[-180px] md:right-auto md:top-auto md:bottom-0 xs:h-[300px] xs:w-[300px]"
                  initial="start"
                  whileInView="end"
                  animate={{
                    x: [1, -6, -9, -9, -6, 6, 9, 9, 1],
                    y: [1, 6, 9, 9, -6, -9, -9, -6, 1],
                  }}
                  transition={{
                    times: [1, 6, 2, 2, 6, 2, 2, 6],
                    duration: 10,
                    ease: "easeOut",
                    repeat: Infinity,
                  }}
                >
                  <defs>
                    <linearGradient
                      id="gradient-two"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" style={{ stopColor: "#a23ff3" }}></stop>
                      <stop
                        offset="100%"
                        style={{ stopColor: "#9f2dfa" }}
                      ></stop>
                    </linearGradient>
                  </defs>
                  <m.path
                    variants={svgBlobPathTwo}
                    transition={{
                      duration: 2,
                      yoyo: Infinity,
                      repeat: Infinity,
                    }}
                    fill="url(#gradient-two)"
                  ></m.path>
                </m.svg>
                {/* Small Circle End */}

                <Container className="sm:relative">
                  <Row className="items-center font-serif sm:justify-center">
                    <Col
                      lg={6}
                      xs={12}
                      className="text-darkgray overflow-hidden md:text-center"
                    >
                      <span className="w-[25px] h-[1px] inline-block align-middle mr-[20px] md:hidden bg-gradient-to-r from-[#ff6557] via-[#ff6557] to-[#ff367c] font-medium"></span>
                      <m.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-lg -tracking-[1px] text-gradient mb-[45px] inline-block bg-gradient-to-r from-[#ff6557] to-[#ff367c] font-medium md:text-center md:text-sm md:mb-[15px] xs:tracking-0"
                      >
                        {item.subTitle}
                      </m.span>
                      <m.h2
                        className="heading-6 font-medium leading-[85px] -tracking-[4px] mb-[60px] text-[90px] lg:text-[80px] lg:leading-none md:text-[45px] sm:text-[44px] md:text-center md:mb-[30px]"
                        initial={{
                          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                        }}
                        whileInView={{
                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                        }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      >
                        <span className="block">{item.titleOne}</span>
                        {item.titleTwo}
                      </m.h2>
                      <m.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5,
                          ease: "easeOut",
                        }}
                      >
                        <Buttons
                          aria-label="link for"
                          to="/shop/shop-wide/"
                          className="font-medium font-serif uppercase rounded-none bg-white hover:text-black hover:bg-white md:relative md:mb-5"
                          size="md"
                          themeColor="#fff"
                          color="#000"
                          title="SHOP COLLECTION"
                        />
                      </m.div>
                    </Col>
                    <Col
                      lg={6}
                      xs={12}
                      className="p-0 m-0 md:h-[50vh] md:relative xs:h-[45vh]"
                    >
                      <m.img
                        alt="hero"
                        className="absolute bottom-[-10px] right-[170px] w-[800px] pointer-events-none mx-auto xl:w-[700px] xl:right-0 lg:bottom-[-80px] lg:w-[600px] md:w-[400px] md:bottom-[-70px] md:right-auto md:left-1/2 md:-translate-x-1/2 xs:w-[370px] xs:-bottom-[160px] landscape:md:bottom-auto"
                        src={item.img}
                        initial={{ opacity: 0 }}
                        animate={{
                          filter: "blur(4px)",
                          transitionEnd: {
                            filter: "blur(0px)",
                          },
                        }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.6,
                          ease: "easeOut",
                        }}
                      />
                    </Col>
                  </Row>
                </Container>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="custom-pagination absolute container !left-1/2 z-[1] -translate-x-1/2 md:flex md:justify-center"></div>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[6%] sm:py-[50px]">
        <Container>
          <Row lg={4} sm={2} xs={1} className="justify-center">
            <Col className="md:mb-[30px] xs:mb-[25px]">
              <div className="inline-flex items-center">
                <div className="inline-flex mr-[30px] leading-0 lg:mr-[25px]">
                  <i className="feather-truck text-[32px] font-medium text-[#b7b7b7]"></i>
                </div>
                <div className="feature-box-content leading-[22px]">
                  <div className="text-darkgray text-xmd font-medium leading-[20px] mb-[5px]">
                    Free delivery
                  </div>
                  <span>Contact support team</span>
                </div>
              </div>
            </Col>
            <Col className="md:mb-[30px] xs:mb-[25px]">
              <div className="inline-flex items-center">
                <div className="inline-flex mr-[30px] leading-0 lg:mr-[25px]">
                  <i className="feather-rotate-cw text-[32px] font-medium text-[#b7b7b7]"></i>
                </div>
                <div className="feature-box-content leading-[22px]">
                  <div className="text-darkgray text-xmd font-medium leading-[20px] mb-[5px]">
                    90 days return
                  </div>
                  <span>Safe and trustworthy</span>
                </div>
              </div>
            </Col>
            <Col className="xs:mb-[25px]">
              <div className="inline-flex items-center">
                <div className="inline-flex mr-[30px] leading-0 lg:mr-[25px]">
                  <i className="feather-check-square text-[32px] font-medium text-[#b7b7b7]"></i>
                </div>
                <div className="feature-box-content leading-[22px]">
                  <div className="text-darkgray text-xmd font-medium leading-[20px] mb-[5px]">
                    Secure payment
                  </div>
                  <span>Leading travel agency</span>
                </div>
              </div>
            </Col>
            <Col>
              <div className="inline-flex items-center">
                <div className="inline-flex mr-[30px] leading-0 lg:mr-[25px]">
                  <i className="feather-headphones text-[32px] font-medium text-[#b7b7b7]"></i>
                </div>
                <div className="feature-box-content leading-[22px]">
                  <div className="text-darkgray text-xmd font-medium leading-[20px] mb-[5px]">
                    Expert support
                  </div>
                  <span>Best price guarantee</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start*/}
      <section className="relative pt-0 lg:py-[90px] md:py-[75px] sm:py-[50px] px-[5.5rem] lg:px-8 sm:p-0 py-0">
        <Container fluid>
          <Row>
            <Col>
              <OnlyCategories
                overlay={["#f84e30cc", "#d76a57cc", "#fff"]}
                grid="grid grid-4col xl-grid-4col lg-grid-2col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
                data={shopCategoriesData}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section
        className="relative py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] xs:px-0 px-[4.5rem] lg:px-[1.5rem] sm:px-0"
        {...fadeIn}
      >
        <Container fluid>
          <Row>
            <Col className="text-center fashionshop-shopwide xs:px-0">
              <ShopWide
                filterData={filterData}
                grid="grid grid-5col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
                data={FashionShopData}
              />
              <Buttons
                aria-label="link for"
                href="/shop/left-sidebar/"
                className="mx-3 font-medium font-serif tracking-[0.5px] btn-fancy uppercase rounded-none md:mb-[15px] bg-[#fff]"
                color="#000"
                size="md"
                themeColor="#000"
                title="More Collection"
              />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row lg={2} xs={1} className="gap-y-10">
            <m.div className="col" {...fadeIn}>
              <div
                className="flex items-center cover-background h-full"
                style={{
                  backgroundImage:
                    "url(https://via.placeholder.com/1000x540)",
                }}
              >
                <div className="w-3/5 font-serif p-20 lg:px-12 md:w-2/5 md:py-28 sm:w-[70%] xs:w-4/5">
                  <span className="font-medium text-sm text-darkgray opacity-60 uppercase block mb-[15px]">
                    New fashion
                  </span>
                  <h2 className="heading-6 text-[30px] leading-[33px] mb-[24px] font-semibold text-darkgray xs:text-xlg xs:mb-[15px]">
                    Summer <span className="block">collection</span>
                  </h2>
                  <Buttons
                    aria-label="link for"
                    href="/shop/shop-wide/"
                    className="btn-fill btn-fancy uppercase rounded-none btn-shadow"
                    size="sm"
                    themeColor="#fff"
                    color="#000"
                    title="SHOP COLLECTION"
                  />
                </div>
              </div>
            </m.div>
            <m.div
              className="col"
              {...{ ...fadeIn, transition: { delay: 0.6 } }}
            >
              <div
                className="flex items-center cover-background h-full"
                style={{
                  backgroundImage:
                    "url(https://via.placeholder.com/1000x540)",
                }}
              >
                <div className="w-3/5 md:w-2/5 sm:w-[70%] p-20 lg:px-[3rem] md:py-[7rem]">
                  {/* Modal Component Start */}
                  <CustomModal.Wrapper
                    className="mb-10"
                    modalBtn={
                      <span className="inline-flex flex-row items-center justify-center">
                        <Buttons
                          aria-label="link for"
                          type="submit"
                          className="btn-sonar border-0 mr-[15px]"
                          themeColor="#fff"
                          color="#FD5762"
                          size="md"
                          title={
                            <i className="fas fa-play text-[15px] !ml-[5px]" />
                          }
                        />
                      </span>
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
                  <h2 className="heading-6 font-serif font-light text-white mb-0 leading-[34px] xs:text-xlg">
                    Fashion{" "}
                    <span className="text-[30px] font-semibold block xs:text-xlg">
                      Lookbook
                    </span>
                  </h2>
                </div>
              </div>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray pb-[130px] px-[4%] lg:pb-[90px] lg:px-[2%] md:pb-[75px] sm:pb-[50px]">
        <Container>
          <Row className="items-center justify-between gap-y-10 md:justify-center">
            <Col lg={3} className="col-lg-3 text-center lg:px-0">
              <m.h1
                className="heading-5 font-serif text-darkgray font-semibold tracking-[-1px] inline-block mb-0 w-[95%]"
                {...fadeIn}
              >
                Don't miss out on this deal
              </m.h1>
            </Col>
            <m.div
              className="col-auto"
              {...{ ...fadeIn, transition: { delay: 0.5 } }}
            >
              <CountDown
                theme="countdown-style-02 font-serif"
                className="text-darkgray justify-center"
                date="2025-04-29T15:02:03"
              />
            </m.div>
            <m.div
              className="col-xl-3 flex justify-end lg:justify-center"
              {...{ ...fadeIn, transition: { delay: 0.7 } }}
            >
              <Buttons
                aria-label="link for"
                href="/shop/shop-wide"
                className="btn-fill btn-fancy font-medium font-serif rounded-none uppercase md:mb-[15px]"
                themeColor="#232323"
                color="#fff"
                size="lg"
                title="Shop Collection"
              />
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:pt-[90px] md:pt-[75px] sm:py-[50px] sm:pb-0 relative bg-white">
        <Container>
          <Row className="justify-center mb-20 xs:mb-0">
            <div className="text-center mb-16 md:mb-12">
              <h2 className="heading-4 font-serif text-center font-semibold text-darkgray -tracking-[1px]">
                Love fashion story
              </h2>
            </div>
            <Col xs={12} className="md:px-0">
              <BlogClassic
                pagination={false}
                grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-double-extra-large xs:px-0"
                data={blogClassicData}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Modal Component Start */}
      <CustomModal.Wrapper
        closeBtnIn={true}
        closeBtnOuter={false}
        defaultOpen={true}
        className="subscribe-newsletter-modal"
      >
        <div
          className="text-left relative landscape:md:mt-[100px]"
          id="subscribe-popup"
        >
          <Container>
            <Row className="justify-center">
              <Col lg={11} md={10} className="relative">
                <div
                  onClick={handleClose}
                  className="absolute top-0 right-0 z-10"
                >
                  <CustomModal.Close className="close-btn text-white">
                    <button
                      title="Close (Esc)"
                      type="button"
                      className="border-none text-[30px] w-[44px] h-[44px]"
                    >
                      ×
                    </button>
                  </CustomModal.Close>
                </div>
                <Row className="justify-center">
                  <Col
                    className="p-24 lg:p-16 xs:p-[3rem] bg-white overflow-hidden"
                    sm={{ span: 7, order: 1 }}
                    xs={{ span: 12, order: 2 }}
                  >
                    <span className="text-xlg font-medium text-darkgray block mb-[10px]">
                      Subscribe to newsletter
                    </span>
                    <p className="mb-[30px] xs:mb-[20px]">
                      Subscribe to our newsletters and don't miss new arrivals
                      the latest updates and our latest promotions.
                    </p>
                    <Formik
                      initialValues={{ email: "" }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string()
                          .email("Invalid email.")
                          .required("Field is required."),
                      })}
                      onSubmit={async (values, actions) => {
                        actions.setSubmitting(true);
                        const response = await sendEmail(values);
                        if (response.status === "success") {
                          actions.resetForm();
                          actions.setStatus(true);
                          actions.setSubmitting(false);
                          setTimeout(() => actions.setStatus(false), 5000);
                        }
                      }}
                    >
                      {({ isSubmitting, status }) => (
                        <div className="relative subscribe-style-05">
                          <Form className="relative mb-[25px]">
                            <Input
                              showErrorMsg={false}
                              type="email"
                              name="email"
                              className="!pr-[70px] border-[1px] medium-input border-solid border-[#dfdfdf]"
                              placeholder="Enter your email address"
                            />
                            <button
                              aria-label="subscibe btn"
                              type="submit"
                              className={`!border-0 text-xs tracking-[1px] !px-[18px] uppercase xs:text-center${
                                isSubmitting ? " loading" : ""
                              }`}
                            >
                              <i className="far fa-envelope text-darkgray text-sm leading-none xs:mr-0"></i>
                            </button>
                            <AnimatePresence>
                              {status && (
                                <m.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                >
                                  <MessageBox
                                    className="absolute mt-[10px] py-[10px] !z-[1] text-md"
                                    theme="message-box01"
                                    variant="success"
                                    message="Your message has been sent successfully!"
                                  />
                                </m.div>
                              )}
                            </AnimatePresence>
                          </Form>
                        </div>
                      )}
                    </Formik>
                    <label
                      htmlFor="newsletter-off"
                      className="text-sm checkbox-with-label"
                    >
                      <input type="checkbox" id="newsletter-off" />
                      <span className="inline-block align-middle w-[15px] h-[15px] mr-[10px] border border-[#d9d9d9] rounded-none relative"></span>
                      Don't show this popup again
                    </label>
                  </Col>
                  <Col
                    sm={{ span: 5, order: 2 }}
                    xs={{ span: 12, order: 1 }}
                    className="bg-cover cover-background xs:h-[150px]"
                    style={{
                      backgroundImage: `url('https://via.placeholder.com/600x802')`,
                    }}
                  ></Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </CustomModal.Wrapper>
      {/* Modal Component End */}

      {/* Section Start */}
      <section className="bg-darkgray sm:bg-white">
        <Container className="sm:mb-[50px]">
          <m.div className="row sm:mx-0" {...fadeIn}>
            <Overlap className="sm:mt-0 mx-0 bg-gradient-to-t from-[#ff6557] via-[#ff4e68] to-[#ff367c] rounded-[6px] py-[60px] md:p-10 relative">
              <Row className="justify-center items-center">
                <Col lg={5} className="md:mb-[30px] xs:px-0">
                  <h2 className="heading-6 font-serif text-[2.3rem] leading-[40px] font-light text-white mb-0 text-start md:text-center w-11/12 xs:leading-[3rem] xs:w-full">
                    <span className="font-semibold">Join our newsletter</span>{" "}
                    and get 15% sale discount
                  </h2>
                </Col>
                <Col lg={5}>
                  <Formik
                    initialValues={{ email: "" }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .email("Invalid email.")
                        .required("Field is required."),
                    })}
                    onSubmit={async (values, actions) => {
                      actions.setSubmitting(true);
                      const response = await sendEmail(values);
                      response.status === "success" && resetForm(actions);
                    }}
                  >
                    {({ isSubmitting, status }) => (
                      <div className="relative subscribe-style-05 w-[90%] lg:w-full">
                        <Form className="relative">
                          <Input
                            showErrorMsg={false}
                            type="email"
                            name="email"
                            className="border-[1px] large-input border-solid border-transparent rounded"
                            placeholder="Enter your email address"
                          />
                          <button
                            aria-label="subscibe btn"
                            type="submit"
                            className={`text-lg tracking-[1px] !border-l-0 py-[12px] px-[28px] uppercase xs:text-center${
                              isSubmitting ? " loading" : ""
                            }`}
                          >
                            <i className="far fa-envelope text-neonorange text-lg leading-none"></i>
                          </button>
                        </Form>
                        <AnimatePresence>
                          {status && (
                            <m.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute top-[115%] left-0 w-full z-[2]"
                            >
                              <MessageBox
                                className="rounded-[4px] text-md py-[10px] px-[22px] !z-[1]"
                                theme="message-box01"
                                variant="success"
                                message="Your message has been sent successfully subscribed to our email list!"
                              />
                            </m.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Overlap>
          </m.div>
        </Container>

        {/* Footer Start */}
        <FooterStyle07
          className="fashionshop-footer text-[#828282] bg-darkgray"
          logo="/assets/img/webp/logo-white.webp"
          theme="dark"
        />
        {/* Footer End */}
      </section>
      {/* Section End */}
    </div>
  );
};

export default FashionShopPage;
