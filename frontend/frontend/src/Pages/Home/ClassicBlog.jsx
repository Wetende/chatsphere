import React, { useState } from "react";

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Pagination } from "swiper/modules";
import { m } from "framer-motion";

// Components
import { Header, HeaderNav, Menu } from "../../Components/Header/Header";
import BlogWidget from "../../Components/Blogs/BlogWidget";
import BlogClean from "../../Components/Blogs/BlogClean";
import BlogClassic from "../../Components/Blogs/BlogClassic";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import FooterStyle01 from "../../Components/Footers/FooterStyle01";
import SideButtons from "../../Components/SideButtons";

// Data
import { blogData } from "../../Components/Blogs/BlogData";

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

const swiperData = [
  {
    category: "Branding",
    title: "Be happy for this moment this moment is your life",
    link: "/blogs/blog-post-layout-01",
    author: "Jay benjamin",
    date: "22 October 2020",
    backgroundImage: "https://via.placeholder.com/1368x801",
  },
  {
    category: "Branding",
    title: "Make business easy with beautiful application",
    link: "/blogs/blog-post-layout-02",
    author: "Bill gardner",
    date: "18 October 2020",
    backgroundImage: "https://via.placeholder.com/1368x801",
  },
  {
    category: "Development",
    title: "Everything designed things are designed well",
    link: "/blogs/blog-post-layout-03",
    author: "Lindsey bucki",
    date: "15 October 2020",
    backgroundImage: "https://via.placeholder.com/1368x801",
  },
  {
    category: "Branding",
    title: "Be happy for this moment this moment is your life",
    link: "/blogs/blog-post-layout-01",
    author: "Jay benjamin",
    date: "22 October 2020",
    backgroundImage: "https://via.placeholder.com/1368x801",
  },
  {
    category: "Branding",
    title: "Make business easy with beautiful application",
    link: "/blogs/blog-post-layout-02",
    author: "Bill gardner",
    date: "18 October 2020",
    backgroundImage: "https://via.placeholder.com/1368x801",
  },
  {
    category: "Development",
    title: "Everything designed things are designed well",
    link: "/blogs/blog-post-layout-03",
    author: "Lindsey bucki",
    date: "15 October 2020",
    backgroundImage: "https://via.placeholder.com/1368x801",
  },
];

const blogWidgetData = blogData.filter((item) => item.blogType === "widget");

// Filter the blog data category wise
const blogMasonryData = blogData
  .filter((item) => item.blogType === "clean")
  .filter((item) => item.category.includes("classicblog"));

const ClassicBlogPage = (props) => {
  const swiperRef = React.useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div>
      <SideButtons />
      {/* Header Start */}
      <Header
        className="header-with-topbar"
        topSpace={{ desktop: true }}
        type="reverse-scroll"
      >
        <HeaderNav
          fluid="fluid"
          theme="light"
          bg="white"
          expand="lg"
          className="py-[0px] px-[35px] md:py-[20px] md:px-0"
        >
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0 sm:!pl-0">
            <Link aria-label="link for" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img
                  className="default-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-gradient-sky-blue-pink.webp"
                  data-rjs="/assets/img/webp/logo-gradient-sky-blue-pink@2x.webp"
                  alt="logo"
                />
                <img
                  className="alt-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-gradient-sky-blue-pink.webp"
                  data-rjs="/assets/img/webp/logo-gradient-sky-blue-pink@2x.webp"
                  alt="logo"
                />
                <img
                  className="mobile-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-gradient-sky-blue-pink.webp"
                  data-rjs="/assets/img/webp/logo-gradient-sky-blue-pink@2x.webp"
                  alt="logo"
                />
              </Navbar.Brand>
            </Link>
          </Col>
          <Navbar.Toggle className="order-last md:ml-[17px] md:pr-[30px] md:pl-[15px] sm:pr-0">
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="col-auto col-lg-8 justify-center menu-order px-lg-0">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto col-lg-2 text-end pe-0 font-size-0">
            <SocialIcons
              theme="social-icon-style-01"
              className="justify-end"
              size="xs"
              iconColor="dark"
              data={SocialIconsData}
            />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}

      {/* Section Start */}
      <section className="bg-[#fff]">
        <Swiper
          modules={[Pagination, Autoplay, Keyboard]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={true}
          keyboard={{ enable: true, onlyInViewport: true }}
          centeredSlides={true}
          ref={swiperRef}
          onSlideChange={(swiperCore) => {
            const { realIndex } = swiperCore;
            setActiveSlide(realIndex);
          }}
          spaceBetween={18}
          breakpoints={{
            991: { slidesPerView: 2 },
            767: { slidesPerView: 1 },
            effect: "slide",
          }}
          className="lifestyle-swiper h-[700px] lg:h-[600px] md:h-[550px] sm:h-[500px] xs:h-[450px] swiper-navigation-04 swiper-navigation-light black-move"
        >
          <div
            onClick={() => swiperRef.current.swiper.slidePrev()}
            className="btn-slider-next -translate-y-1/2 absolute top-1/2 left-[40px] bg-[#00000080] hover:bg-white text-[#fff] hover:text-black transition-default w-[50px] h-[50px] z-[2] rounded-[50%] flex justify-center items-center right-inherit cursor-pointer sm:h-[35px] sm:w-[35px] sm:left-[10px] xs:hidden"
          >
            <i className="feather-arrow-left text-[15px]"></i>
          </div>
          {swiperData.map((item, i) => {
            return (
              <SwiperSlide
                key={i}
                className={`bg-cover bg-no-repeat bg-center relative overflow-hidden transition-default flex items-end h-full${
                  activeSlide !== i && ` opacity-60`
                }`}
                style={{ backgroundImage: `url(${item.backgroundImage})` }}
              >
                <m.div
                  initial={{ opacity: 0, y: "30%" }}
                  animate={{
                    opacity: activeSlide === i ? 1 : 0,
                    y: activeSlide === i ? "0" : "30%",
                  }}
                  viewport={{ once: true }}
                  transition={{ ease: "circOut", duration: 0.8 }}
                  className="w-[60%] mx-auto text-center bg-white mb-[6.5rem] p-20 xl:px-[2rem] lg:w-[70%] lg:px-[2rem] sm:w-[75%] sm:px-[2rem]"
                >
                  <button
                    aria-label="swiper btn"
                    className="relative inline-flex items-center justify-center p-[2px] mb-[30px] overflow-hidden text-sm font-medium text-darkgray group bg-gradient-to-br from-[#556fff] to-[#ff798e]"
                  >
                    <span className="relative px-[16px] py-[4px] bg-white uppercase font-serif">
                      <Link
                        aria-label="link for"
                        to="/blogs/blog-grid"
                        className="tracking-[.5px] text-xs hover:text-darkgray"
                      >
                        {item.category}
                      </Link>
                    </span>
                  </button>
                  <h2 className="heading-5 mb-[30px] xs:mb-[15px]">
                    <Link
                      aria-label="link for"
                      to="/blogs/blog-grid"
                      className="text-darkgray hover:text-darkgray font-serif font-medium -tracking-[1px] mb-[30px]"
                    >
                      {item.title}
                    </Link>
                  </h2>
                  <div className="font-serif text-md uppercase flex justify-center xs:flex-col">
                    <span className="text-spanishgray block sm:inline-block">
                      {item.date}
                    </span>
                    <span className="mx-[10px] text-[20px] opacity-60 relative sm:inline-block xs:hidden">
                      •
                    </span>{" "}
                    <Link
                      aria-label="link for"
                      to={item.link}
                      className="text-spanishgray hover:text-spanishgray"
                    >
                      {item.author}
                    </Link>
                  </div>
                </m.div>
              </SwiperSlide>
            );
          })}
          <div
            onClick={() => swiperRef.current.swiper.slideNext()}
            className="btn-slider-prev  -translate-y-1/2 absolute top-1/2 right-[40px] bg-[#00000080] hover:bg-white text-[#fff] hover:text-black transition-default w-[50px] h-[50px] z-[2] rounded-[50%] flex justify-center items-center left-inherit cursor-pointer sm:h-[35px] sm:w-[35px] sm:rirght-[10px] xs:hidden"
          >
            <i className="feather-arrow-right text-[15px]"></i>
          </div>
        </Swiper>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="px-[11%] relative p-[130px] xl:px-[5%] lg:px-[2%] lg:p-[90px] md:pb-[75px] sm:py-[50px] xs:px-0">
        <Container>
          <Row className="justify-center">
            <Col lg={4} md={6} className="text-center mb-12 md:mb-16">
              <div className="flex flex-row items-center justify-center text-center mb-[5px]">
                <span className="w-[25px] h-[1px] bg-mediumgray"></span>
                <div className="font-serif text-xmd font-medium px-[10px] text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]">
                  attractive articles
                </div>
                <span className="w-[25px] h-[1px] bg-mediumgray"></span>
              </div>
              <h2 className="heading-5 font-serif font-semibold text-darkgray uppercase -tracking-[1px]">
                Popular stories
              </h2>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col className="home-classic-blog p-0">
              <BlogClean
                overlay="#232323"
                filter={false}
                grid="grid grid-5col xl-grid-5col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
                data={blogMasonryData}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="px-[11%] relative p-[130px] bg-lightgray lg:px-[2%] lg:p-[90px] md:pb-[75px] sm:py-[50px] xs:px-0">
        <Container>
          <Row className="justify-center">
            <Col lg={4} md={6} className="text-center mb-16 md:mb-16">
              <div className="flex flex-row items-center justify-center text-center mb-[5px]">
                <span className="w-[25px] h-[1px] bg-mediumgray"></span>
                <div className="font-serif text-xmd font-medium px-[10px] text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]">
                  updated daily
                </div>
                <span className="w-[25px] h-[1px] bg-mediumgray"></span>
              </div>
              <h2 className="heading-5 font-serif font-semibold text-darkgray uppercase -tracking-[1px]">
                READERS CHOICE
              </h2>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row className="justify-center">
            <Col xs={12} lg={12} sm={10} className="xs:px-0">
              <BlogWidget
                grid="grid grid-3col xl-grid-3col lg-grid-2col md-grid-1col sm-grid-1col xs-grid-1col gutter-double-extra-large"
                data={blogWidgetData.slice(-6)}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="relative px-[11%] py-[130px] xl:px-[2%] lg:py-[90px] md:py-[75px] sm:py-[50px] xs:px-0">
        <Container fluid className="xs:px-0">
          <BlogClassic
            grid="grid grid-5col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-double-extra-large"
            data={blogData.slice(12, 22)}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
      {/* Footer End */}
    </div>
  );
};

export default ClassicBlogPage;
