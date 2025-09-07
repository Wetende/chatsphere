import React from "react";

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Keyboard } from "swiper/modules";
import { m } from "framer-motion";

// Components
import Header, {
  CollapsibleMenu,
  HamburgerMenu,
  HeaderNav,
} from "../../Components/Header/Header";
import PortfolioColorful from "../../Components/Portfolio/PortfolioColorful";
import Clients from "../../Components/Clients/Clients";
import Buttons from "../../Components/Button/Buttons";
import BlogMetro from "../../Components/Blogs/BlogMetro";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import FooterMenu, { Footer } from "../../Components/Footers/Footer";
import SideButtons from "../../Components/SideButtons";
import ReactCustomScrollbar from "../../Components/ReactCustomScrollbar";

// Animation
import { fadeIn } from "../../Functions/GlobalAnimations";

// Data
import { ClientData06 } from "../../Components/Clients/ClientsData";
import FooterData from "../../Components/Footers/FooterData";
import { blogData } from "../../Components/Blogs/BlogData";

const iconData = [
  {
    color: "#cc754c",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f",
  },
  {
    color: "#cc754c",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram",
  },
  {
    color: "#cc754c",
    link: "https://twitter.com/",
    icon: "fab fa-twitter",
  },
  {
    color: "#cc754c",
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble",
  },
];

const swiperData = [
  {
    img: "https://via.placeholder.com/1920x1160",
    firsttitle: "Browne",
    secondtitle: "coffee",
    link: "/portfolio/single-project-page-01",
  },
  {
    img: "https://via.placeholder.com/1920x1160",
    firsttitle: "Nature",
    secondtitle: "travel",
    link: "/portfolio/single-project-page-02",
  },
  {
    img: "https://via.placeholder.com/1920x1160",
    firsttitle: "Black",
    secondtitle: "shade",
    link: "/portfolio/single-project-page-03",
  },
];

const portfolioColorfulData = [
  {
    title: "Mongolish",
    img: "https://via.placeholder.com/1000x817",
    category: [""],
    subtitle: "Branding",
    link: "/portfolio/single-project-page-01",
    double_col: true,
  },
  {
    title: "Masscoating",
    img: "https://via.placeholder.com/800x653",
    category: [""],
    subtitle: "Photography",
    link: "/portfolio/single-project-page-02",
  },
  {
    title: "Cortifiel",
    img: "https://via.placeholder.com/800x653",
    category: [""],
    subtitle: "Brochure",
    link: "/portfolio/single-project-page-03",
  },
  {
    title: "Everyday",
    img: "https://via.placeholder.com/1000x817",
    category: [""],
    subtitle: "Brochure",
    link: "/portfolio/single-project-page-04",
    double_col: true,
  },
  {
    title: "Scandinavian",
    img: "https://via.placeholder.com/800x653",
    category: [""],
    subtitle: "Branding",
    link: "/portfolio/single-project-page-05",
  },
  {
    title: "The Simplest",
    img: "https://via.placeholder.com/800x653",
    category: [""],
    subtitle: "Website",
    link: "/portfolio/single-project-page-01",
  },
];

const TestimonialsCarouselData = [
  {
    content:
      "Absolutely amazing theme, flexible and awesome design with possibilities. It's so easy to use and to customize. Simply the great designs and best theme for WooCommerce.",
    firstname: "Lindsay",
    lastname: "swanson",
    post: "creative director",
  },
  {
    content:
      "I wanted to hire the best and after looking at several other companies, I knew Jacob was the perfect guy. I wanted to hire the best and after looking at several other companies.",
    firstname: "Jeremy",
    lastname: "dupont",
    post: "Creative director",
  },
  {
    content:
      "This theme has a wide variety of options and a really good customer support. Some of the customizations are limited but even so the theme still gives a lot of features while prioritizing web.",
    firstname: "Alexander",
    lastname: "harvard",
    post: "creative director",
  },
  {
    content:
      "I wanted to hire the best and after looking at several other companies, I knew Jacob was the perfect guy. I wanted to hire the best and after looking at several other companies.",
    firstname: "Herman",
    lastname: "miller",
    post: "creative director",
  },
];

// Filter the blog data category wise
const blogMetroData = blogData
  .filter((item) => item.blogType === "metro")
  .filter((item) => item.category.includes("creativeagency"));

const FooterMenuData = [FooterData[0], FooterData[3]];

const CreativeAgencyPage = (props) => {
  return (
    <div
      className="pl-[290px] md:pl-0 bg-[#101010] overflow-hidden"
      style={props.style}
    >
      <SideButtons />
      {/* Header Start */}
      <Header
        topSpace={{ md: true }}
        type="pos-left"
        className="w-[290px] h-[100vh] z-10 md:w-full md:h-auto"
      >
        <div className="flex justify-between flex-col h-full bg-[#101010] border-r border-[#ffffff1a] pt-20 px-8 overflow-hidden md:pt-40 md:hidden">
          <Col xs="auto" className="text-center leading-none">
            <Link
              aria-label="header logo"
              to="/"
              className="inline-block leading-none"
            >
              <Navbar.Brand className="inline-block p-0 m-0">
                <img
                  className="default-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-copper-red-white.webp"
                  data-rjs="/assets/img/webp/logo-copper-red-white.webp"
                  alt="logo"
                />
                <img
                  className="mobile-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-copper-red-black.webp"
                  data-rjs="/assets/img/webp/logo-copper-red-black.webp"
                  alt="logo"
                />
              </Navbar.Brand>
            </Link>
          </Col>
          <Col xs="auto" className="pl-[15px] max-h-[calc(100%-160px)]">
            <ReactCustomScrollbar
              className="!items-start"
              autoHide
              theme="light"
            >
              <div>
                <CollapsibleMenu
                  className="left-sidebar-menu w-full"
                  theme="light"
                />
              </div>
            </ReactCustomScrollbar>
          </Col>
          <Col xs="auto" className="mb-20">
            <div className="my-8">
              <SocialIcons
                theme="social-icon-style-01"
                className="justify-center"
                size="sm"
                iconColor="light"
                data={iconData}
              />
            </div>
            <span className="block text-center text-xs text-spanishgray">
              &copy; {new Date().getFullYear()} LITHO
            </span>
          </Col>
        </div>

        {/* Mobile menu start */}
        <HeaderNav
          className="hidden md:flex justify-between px-[30px] sm:pl-[15px] md:py-[15px]"
          bg="white"
          theme="light"
          containerClass="px-0"
        >
          <Link className="flex items-center justify-center" to="/">
            <Navbar.Brand className="inline-block p-0 m-0">
              <img
                src="/assets/img/webp/logo-copper-red-black@2x.webp"
                className="max-h-[36px]"
                alt="logo"
              />
            </Navbar.Brand>
          </Link>
          <HamburgerMenu
            theme="dark"
            position="left"
            className="w-[290px] flex flex-col justify-end !top-[var(--header-height)]"
            closeBtn={false}
          >
            <div
              className="bg-[#101010] px-8 pb-20"
              style={{ height: `calc(100vh - var(--header-height))` }}
            >
              <ReactCustomScrollbar
                autoHide
                className="pl-[15px] mt-[50px] !items-start"
              >
                <div>
                  <CollapsibleMenu
                    className="w-full left-sidebar-menu"
                    theme="light"
                  />
                  <div className="mt-[60px]">
                    <SocialIcons
                      theme="social-icon-style-01"
                      className="justify-center mb-8 text-center"
                      size="sm"
                      iconColor="light"
                      data={iconData}
                    />
                    <span className="block text-center text-xs mb-[165px] text-spanishgray">
                      &copy; {new Date().getFullYear()} LITHO
                    </span>
                  </div>
                </div>
              </ReactCustomScrollbar>
            </div>
          </HamburgerMenu>
        </HeaderNav>
        {/* Mobile menu end */}
      </Header>
      {/* Header End */}

      {/* Section Start */}
      <section className="p-0 overflow-hidden">
        <Swiper
          style={{ cursor: `url(/assets/img/webp/icon-move-light.webp)` }}
          modules={[Pagination, Keyboard, Autoplay]}
          slidesPerView={1}
          keyboard={{ enabled: true, onlyInViewport: true }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          direction="horizontal"
          breakpoints={{ 991: { direction: "vertical" } }}
          className="full-screen swiper-pagination-01 swiper-pagination-light swiper-pagination-medium landscape:md:h-[600px] vertical-white-move"
        >
          {swiperData.map((item, i) => {
            return (
              <SwiperSlide
                key={i}
                className="bg-no-repeat bg-cover relative overflow-hidden bg-center"
                style={{ backgroundImage: `url(${item.img})` }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-transparent-gradient-smoky-black bg-right opacity-1"></div>
                <Container className="h-full">
                  <Row className="flex flex-col justify-center h-full">
                    <Col
                      xs={10}
                      xl={7}
                      md={7}
                      sm={6}
                      lg={8}
                      className="relative flex flex-column justify-center text-start py-[7rem] h-[100vh] md:h-[60vh]"
                    >
                      <h1 className="font-serif font-light text-[130px] text-white leading-[120px] tracking-[-6px] lg:text-[110px] lg:leading-[100px] md:text-[90px] md:leading-[85px] sm:text-[50px] sm:leading-[50px] sm:-tracking-[.5px] xs:text-[60px] xs:leading-[65px]">
                        <span className="font-semibold block">
                          {item.firsttitle}
                        </span>
                        {item.secondtitle}
                      </h1>
                      <Link
                        aria-label="Watch projects"
                        to={item.link ? item.link : "#"}
                        className="left-[15px] bottom-[100px] z-[100] absolute md:bottom-[50px] sm:bottom-0"
                      >
                        <span className="flex items-center text-center hover:text-[#828282]">
                          <span className="w-[50px] h-[50px] text-lg relative flex justify-center items-center rounded-[50%] mr-[25px] border-[2px] border-[#cc754c4d]">
                            <i className="fas fa-arrow-right text-basecolor flex items-center justify-center text-xmd leading-normal ml-0"></i>
                          </span>
                          <span className="text-white font-medium text-xmd font-serif uppercase inline-block align-middle">
                            Watch projects
                          </span>
                        </span>
                      </Link>
                    </Col>
                  </Row>
                </Container>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      {/* Section End */}

      {/* About Section Start */}
      <section className="py-[200px] overflow-hidden lg:py-[160px] md:py-[110px] sm:py-[50px]">
        <Container>
          <Row>
            <Col md={5}>
              <span className="font-semibold text-basecolor text-xmd font-serif uppercase tracking-[1px] block sm:mb-[20px]">
                Award winning agency
              </span>
            </Col>
            <Col md={7}>
              <m.h2
                className="heading-5 leading-[50px] font-serif mb-[74px] w-[95%] sm:w-full md:mb-[45px] lg:leading-normal"
                {...fadeIn}
              >
                <span className="font-semibold text-[#fff]">
                  We believe very strongly{" "}
                </span>
                in making high caliber expertise available to our small business
                clients empowering them to achieve growth.
              </m.h2>
              <m.div
                className="row"
                {...{ ...fadeIn, transition: { delay: 0.5 } }}
              >
                <Col xl={5} md={6} className="sm:mb-[40px]">
                  <div className="h-[1px] bg-basecolor w-full inline-block mb-[49px] md:mb-[30px]"></div>
                  <span className="mb-[15px] font-medium text-white text-lg font-serif block md:text-xmd">
                    Branding
                  </span>
                  <p className="mb-0 w-[95%] leading-[30px] text-xmd">
                    Lorem ipsum dolor consectetur adipiscing eiusmod tempor.
                  </p>
                </Col>
                <Col xl={{ span: 5, offset: 2 }} md={6}>
                  <div className="h-[1px] bg-basecolor w-full inline-block mb-[49px] md:mb-[30px]"></div>
                  <span className="mb-[15px] font-medium text-white text-lg font-serif block md:text-xmd">
                    Digital
                  </span>
                  <p className="mb-0 w-[95%] leading-[30px] text-xmd">
                    Lorem ipsum dolor consectetur adipiscing eiusmod tempor.
                  </p>
                </Col>
              </m.div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* About Section End */}

      {/* Portfolio Section Start */}
      <section>
        <Container fluid className="px-0">
          <Row>
            <Col>
              <PortfolioColorful
                className="m-0"
                overlay="#d96f41e6"
                grid="grid grid-4col xl-grid-4col lg-grid-2col md-grid-2col sm-grid-2col xs-grid-1col text-center"
                data={portfolioColorfulData}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Portfolio Section End */}

      {/* Client Section Start */}
      <section className="py-[200px] lg:py-[160px] md:py-[110px] sm:py-[50px]">
        <Container>
          <m.div className="row" {...fadeIn}>
            <Col md={5} className="sm:mb-[20px]">
              <span className="font-semibold text-basecolor text-xmd font-serif uppercase block tracking-[1px]">
                Valuable clients
              </span>
            </Col>
            <Col md={7}>
              <h2 className="heading-5 w-[95%] leading-[50px] font-serif md:leading-normal md:w-[90%] md:mb-0">
                Your most
                <span className="font-semibold text-white">
                  {" "}
                  unhappy customers{" "}
                </span>
                are your greatest source of learning
              </h2>
            </Col>
          </m.div>
          <Row className="mt-[9.5rem] justify-center lg:mt-24">
            <Clients
              grid="row-cols-1 row-cols-sm-2 row-cols-md-4"
              theme="client-logo-style-06"
              data={ClientData06}
              animation={fadeIn}
            />
          </Row>
        </Container>
      </section>
      {/* Client Section End */}

      {/* Testimonial Section Start */}
      <section
        className="py-[200px] lg:py-[160px] md:py-[110px] sm:py-[50px] cover-background"
        style={{
          backgroundImage: `url(/assets/img/webp/home-creative-agency-testimonials-bg.webp)`,
        }}
      >
        <Container>
          <m.div className="row" {...fadeIn}>
            <Col md={5} className="md:mb-[20px]">
              <span className="font-semibold text-basecolor text-xmd font-serif uppercase block tracking-[1px]">
                Proud testimonials
              </span>
            </Col>
            <Col md={7}>
              <Swiper
                className="testimonial-carousel-style-05"
                loop={true}
                slidesPerView={1}
                modules={[Autoplay]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                {TestimonialsCarouselData.map((item, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="cursor-ew-resize">
                        {item.content && (
                          <h2 className="heading-6 w-[92%] mb-28 leading-[44px] font-serif sm:leading-[34px] sm:w-full sm:mb-16">
                            {item.content}
                          </h2>
                        )}
                        <h3 className="heading-6 font-light text-white mb-[5px] md:leading-normal">
                          <span
                            className="font-semibold"
                            contentEditable={false}
                          >
                            {item.firstname}
                          </span>{" "}
                          {item.lastname}
                        </h3>
                        {item.post && (
                          <span className="text-lg font-serif">
                            {item.post}
                          </span>
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Col>
          </m.div>
        </Container>
      </section>
      {/* Testimonial Section End */}

      {/* Blog Section Start */}
      <section className="pt-[200px] lg:pt-[160px] md:pt-[110px] sm:pt-[50px]">
        <Container>
          <Row className="mb-[108px] justify-between sm:flex-col sm:mb-[40px] xs:mb-[4.5rem]">
            <Col xs="auto" className="xs:mb-[20px]">
              <span className="font-semibold text-basecolor text-xmd tracking-[1px] font-serif uppercase inline-block">
                Latest blogs
              </span>
            </Col>
            <Col xs="auto">
              <Buttons
                ariaLabel="blog-metro"
                to="/blogs/blog-metro"
                className="font-medium font-serif uppercase btn-link after:h-[1px] sm:text-left md:mb-[15px] after:bg-spanishgray hover:text-spanishgray xs:mb-0"
                size="xl"
                color="#939393"
                title="Explore blog"
              />
            </Col>
          </Row>
        </Container>
        <Container fluid className="px-12 xs:px-0">
          <BlogMetro
            grid="grid grid-4col xl-grid-4col lg-grid-2col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
            data={blogMetroData}
          />
        </Container>
        <Container fluid>
          <Row>
            <Col xs={12} className="text-center my-[10.5rem] md:my-[7.5rem]">
              <h2 className="heading-5 font-serif font-light -tracking-[1px]">
                Are you ready to work with us?{" "}
                <Link
                  aria-label="start a project"
                  className="ml-[4px] relative font-semibold text-basecolor hover:text-white cursor-pointer -tracking-[1px] font-serif border-b-[1px] border-basecolor hover:border-white"
                  to="/page/contact-modern"
                >
                  start a project
                </Link>
              </h2>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Blog Section End */}

      {/* Footer Start */}
      <Footer
        parallax={{ desktop: false, md: false }}
        theme="dark"
        className="creative-footer border-t border-[#ffffff1a]"
      >
        <div className="pt-[9%] lg:py-[8%] md:py-[50px]">
          <Container>
            <Row className="justify-start md:text-start">
              <Col
                xl={{ span: 3, order: 0 }}
                md={6}
                sm={{ span: 6, order: 1 }}
                className="lg:mb-[50px] xs:mb-[25px]"
              >
                <Link aria-label="Follow" to="/" className="mb-[40px] block">
                  <img
                    src="/assets/img/webp/logo-copper-red.webp"
                    alt="logo"
                    width="45"
                    height="52"
                    className="max-h-min"
                  />
                </Link>
                <p className="font-serif font-light w-[85%] mb-0 md:w-[80%] sm:w-[85%] text-xlg leading-[36px] -tracking-[0.5px] xs:w-11/12 text-[#828282] lg:text-lg lg:leading-[26px]">
                  We create experiences for brands companies by using
                  creativity.
                </p>
              </Col>
              <FooterMenu
                data={FooterMenuData}
                xl={{ span: 2, order: 0, offset: 1 }}
                sm={{ span: 6, order: 3 }}
                titleClass="uppercase"
                className="xs:mb-[25px]"
              />
              <Col
                xs={11}
                xl={{ span: 2, offset: 1, order: 0 }}
                md={6}
                sm={{ span: 6, order: 2 }}
              >
                <span className="font-serif tracking-[2px] uppercase font-medium block text-white mb-[30px] text-left">
                  Follow us
                </span>
                <SocialIcons
                  theme="social-icon-style-01"
                  className="justify-start flex"
                  size="xs"
                  iconColor="light"
                  data={iconData}
                />
              </Col>
            </Row>
          </Container>
        </div>
        <div className="py-[8%] xs:pt-0 xs:px-0">
          <Container>
            <Row>
              <Col
                sm={{ span: 12, order: 2 }}
                md={{ span: 6, order: 1 }}
                xs={{ order: 2 }}
                className="text-start flex sm:justify-center md:text-end xs:justify-start"
              >
                <p className="text-xmd">
                  © {new Date().getFullYear()} Litho is Proudly Powered by{" "}
                  <a
                    aria-label="footer link"
                    href="https://www.themezaa.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-line-bottom text-xmd text-white"
                  >
                    ThemeZaa
                  </a>
                </p>
              </Col>
              <Col
                sm={{ span: 12, order: 1 }}
                md={{ span: 6, order: 2 }}
                xs={{ order: 1 }}
                className="sm:mb-[15px]"
              >
                <ul className="flex justify-end sm:justify-center xs:flex-col">
                  <li className="mr-[35px] md:mr-[20px] xl:mb-0 xs:mb-[7px]">
                    <Link
                      className="text-xmd leading-[34px]"
                      aria-label="Privacy policy"
                      to="#"
                    >
                      Privacy policy
                    </Link>
                  </li>
                  <li className="mr-[35px] md:mr-[20px] xl:mb-0 xs:mb-[7px]">
                    <Link
                      className="text-xmd leading-[34px]"
                      aria-label="Legal"
                      to="#"
                    >
                      Legal
                    </Link>
                  </li>
                  <li className="mr-[0px] xl:mb-0">
                    <Link
                      className="text-xmd leading-[34px]"
                      aria-label="Terms of service"
                      to="#"
                    >
                      Terms of service
                    </Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
      </Footer>
      {/* Footer End */}
    </div>
  );
};

export default CreativeAgencyPage;
