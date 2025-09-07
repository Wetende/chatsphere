import React, { lazy } from "react";

// Libraries
import { Row, Col, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";
import { m } from "framer-motion";
import { ReactTyped } from "react-typed";
import { Link as ScrollTo } from "react-scroll";

// Components
import Header, {
  HeaderNav,
  Menu,
  Topbar,
} from "../../Components/Header/Header";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import Buttons from "../../Components/Button/Buttons";
import Overlap from "../../Components/Overlap/Overlap";
import RotateBox from "../../Components/RotateBox/RotateBox";
import CustomModal from "../../Components/CustomModal";
import {
  fadeIn,
  fadeInBlur,
  zoomIn,
  fadeInLeft,
  rotateInLeft,
} from "../../Functions/GlobalAnimations";
import Accordions from "../../Components/Accordion/Accordion";
import InfoBannerStyle01 from "../../Components/InfoBanner/InfoBannerStyle01";
import Services from "../../Components/Services/Services";
import TestimonialsCarousel08 from "../../Components/TestimonialCarousel/TestimonialsCarousel08";
import MouseMove from "../../Components/MouseMove";
import SideButtons from "../../Components/SideButtons";

// Data
import { TestimonialsCarouselData8 } from "../../Components/TestimonialCarousel/TestimonialsCarouselData";
import { InfoBannerData01 } from "../../Components/InfoBanner/InfoBannerData";
import { serviceData6 } from "../../Components/Services/ServicesData";

const IconWithText = lazy(() =>
  import("../../Components/IconWithText/IconWithText")
);

const SocialIconsData = [
  {
    color: "#828282",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f",
  },
  {
    color: "#828282",
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble",
  },
  {
    color: "#828282",
    link: "https://twitter.com/",
    icon: "fab fa-twitter",
  },
  {
    color: "#828282",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram",
  },
];

const IconWithTextData = [
  {
    icon: "line-icon-Soup text-[#ea9d8d] text-[50px]",
    title: "Nutrition strategies",
    content:
      "Lorem ipsum dolor consectetur adipiscing tempor incididunt ut labore dolore magna.",
  },
  {
    icon: "line-icon-Idea-5 text-[#ea9d8d] text-[50px]",
    title: " Life coaching program ",
    content:
      "Lorem ipsum dolor consectetur adipiscing tempor incididunt ut labore dolore magna.",
  },
  {
    icon: "line-icon-Bell-2 text-[#ea9d8d] text-[50px]",
    title: "Religion program",
    content:
      "Lorem ipsum dolor consectetur adipiscing tempor incididunt ut labore dolore magna.",
  },
  {
    icon: "line-icon-Letter-Sent text-[#ea9d8d] text-[50px]",
    title: "Meditation and yoga",
    content:
      "Lorem ipsum dolor consectetur adipiscing tempor incididunt ut labore dolore magna.",
  },
];

const AccordionData = [
  {
    title: "Prevents cartilage and joint breakdown",
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing do eiusmod tempor incididunt ut labore et dolore ut enim ad minim veniam nostrud.",
  },
  {
    title: "Regulates your adrenal glands",
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing do eiusmod tempor incididunt ut labore et dolore ut enim ad minim veniam nostrud.",
  },
  {
    title: "Boosts your immune system functionality",
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing do eiusmod tempor incididunt ut labore et dolore ut enim ad minim veniam nostrud.",
  },
];

const RotateBoxData = [
  {
    img: "https://via.placeholder.com/720x828",
    title: "Meditation",
    subtitle: "Felling good",
    icon: "line-icon-Flick",
    btnLink: "#",
    btnTitle: "Discover possible",
    content:
      "Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt labore ut enim",
  },
  {
    img: "https://via.placeholder.com/720x828",
    title: "Sound Therapy",
    subtitle: "Present moment",
    icon: "line-icon-Bell-2",
    btnLink: "#",
    btnTitle: "Discover possible",
    content:
      "Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt labore ut enim",
  },
  {
    img: "https://via.placeholder.com/720x828",
    title: "Mindfullness",
    subtitle: "Relaxing mind",
    icon: "line-icon-Sun",
    btnLink: "#",
    btnTitle: "Discover possible",
    content:
      "Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt labore ut enim",
  },
];
const YogaMeditationPage = (props) => {
  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header
        topSpace={{ desktop: true }}
        type="reverse-scroll border-b border-[#ffffff1a] bg-white"
      >
        <Topbar className="header-with-topbar px-[50px] bg-lightgray md:px-[15px] sm:hidden">
          <Container fluid className="md:inline-block">
            <Row>
              <Col
                xs="auto"
                className="text-center text-sm-start me-auto ps-lg-0 flex items-center"
              >
                <p className="text-md m-0">
                  <span className="font-medium text-darkgray">About yoga:</span>{" "}
                  Yoga is the journey of the self through the self to the self.
                </p>
              </Col>
              <Col
                xs="auto"
                className="flex items-center text-end px-0 font-size-0"
              >
                <span className="top-bar-contact-list py-[9px] px-[18px] text-[13px] inline-block">
                  <i className="feather-phone-call text-darkgray mr-[4px] text-md relative top-[1px]"></i>{" "}
                  0222 8899900
                </span>
                <span className="py-[9px] pl-[18px] text-[13px] inline-block border-r-0 pr-0 md:hidden">
                  <i className="feather-map-pin text-darkgray mr-[6px] text-md relative top-[1px]"></i>{" "}
                  401 Broadway, 24th Floor, San Francisco
                </span>
              </Col>
            </Row>
          </Container>
        </Topbar>
        <HeaderNav
          theme="white"
          fluid="fluid"
          className="py-[0px] px-[35px] md:py-[15px] md:pr-[15px] sm:px-0 md:pl-0"
          containerClass="xs:pr-0"
        >
          <Col className="col-6 col-lg-2 me-auto ps-lg-0 xs:!p-0">
            <Link
              aria-label="header home link"
              className="flex items-center"
              to="/"
            >
              <Navbar.Brand className="inline-block p-0 m-0">
                <img
                  className="default-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-gradient-tan-geraldine.webp"
                  data-rjs="/assets/img/webp/logo-gradient-tan-geraldine@2x.webp"
                  alt="logo"
                />
                <img
                  className="alt-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-gradient-tan-geraldine.webp"
                  data-rjs="/assets/img/webp/logo-gradient-tan-geraldine@2x.webp"
                  alt="logo"
                />
                <img
                  className="mobile-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-gradient-tan-geraldine.webp"
                  data-rjs="/assets/img/webp/logo-gradient-tan-geraldine@2x.webp"
                  alt="logo"
                />
              </Navbar.Brand>
            </Link>
          </Col>
          <Navbar.Toggle className="order-last md:ml-[25px] sm:ml-[17px] xs:mr-[17px]">
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="justify-end col-auto menu-order px-lg-0">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto text-end pe-0 font-size-0 !pl-[22px] xs:hidden">
            <SocialIcons
              theme="social-icon-style-01 block text-end"
              iconColor="dark"
              size="xs"
              data={SocialIconsData.slice(0, 3)}
            />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}

      {/* Section Start */}
      <section
        className="full-screen cover-background relative lg:h-[700px]"
        style={{
          backgroundImage: `url(/assets/img/webp/home-yoga-meditation-slider-bg.webp)`,
        }}
      >
        {/* small Circle */}
        <div className="absolute block left-1/2 bottom-[-285px] lg:bottom-[-355px] md:bottom-0 -translate-x-1/2">
          <m.div
            {...{ ...zoomIn, transition: { duration: 1, ease: "easeInOut" } }}
            className="rounded-full bg-gradient from -[#ffa996] to-[#fea499] h-[750px] w-[750px] md:w-[400px] md:h-[400px]"
          ></m.div>
        </div>

        {/* Big Circle */}
        <div className="absolute block left-1/2 bottom-[-420px] lg:bottom-[-500px] md:bottom-[-80px] -translate-x-1/2">
          <m.div
            {...{ ...zoomIn, transition: { duration: 1, ease: "easeInOut" } }}
            className="rounded-full bg-gradient from-[#ffa996] to-[#fea499] h-[1000px] w-[1000px] md:h-[570px] md:w-[570px]"
          ></m.div>
        </div>

        <MouseMove
          speed={2}
          className="h-full w-full block top-[130px] md:top-0 left-0 absolute z-[3]"
        >
          <m.img
            {...{ ...fadeInBlur, transition: { delay: 1, ease: "easeInOut" } }}
            className="w-[800px] mx-auto absolute bottom-[-50px] left-1/2 -translate-x-1/2 block z-[3] lg:bottom-[-120px] md:bottom-[-10px] md:w-[550px] xs:w-[450px] xs:max-w-fit"
            src="https://via.placeholder.com/960x999"
            alt=""
          />
          <m.img
            {...{ ...fadeIn, transition: { delay: 1.2, ease: "easeInOut" } }}
            className="bg-no-repeat bg-center absolute bottom-[-100px] lg:bottom-0 left-1/2 -translate-x-1/2 flex justify-center items-center mx-auto xs:w-[420px] xs:max-w-fit"
            src="https://via.placeholder.com/1661x600"
            alt=""
          />
          <m.div
            {...{ ...fadeIn, transition: { delay: 2, ease: "easeInOut" } }}
            className="z-[1] absolute block left-1/2 top-[-70px] w-[740px] -translate-x-1/2 lg:w-[650px] md:w-[500px] md:top-[50px] xs:w-full"
          >
            <div className="font-light -tracking-[1px] text-[#fff] text-[20px] leading-[26px] md:text-center md:text-lg">
              Journey of the self
            </div>
            <div className="block relative h-[130px] lg:h-[80px]">
              <span className="upper-line absolute top-[35px] right-0 w-full h-[1px] bg-[#fff] block opacity-90 lg:top-[15px] md:top-[23px] xs:top-[26px]"></span>
              <ReactTyped
                className="inline-block text-[124px] font-bold whitespace-nowrap absolute left-1/2 -translate-x-1/2 w-[90%] lg:text-[110px] text-[#fff] font-serif -tracking-[7px] leading-none lg:leading-[80px] opacity-100 z-[3] text-shadow-small after:hidden md:text-[80px] md:w-[75%] xs:text-[55px] xs:-tracking-[3px] xs:mx-auto xs:block"
                strings={["relaxations", "meditation", "experience"]}
                typeSpeed={100}
                backSpeed={100}
                loop
              />
              <span className="lower-line upper-line absolute bottom-[25px] right-0 w-[760px] lg:w-[500px] h-[1px] bg-[#fff] block opacity-90 lg:bottom-[2px] md:w-full md:bottom-[10px] xs:bottom-[19px]"></span>
            </div>
          </m.div>
        </MouseMove>
      </section>
      {/* Section Start */}

      {/* Section Start */}
      <section className="pb-[400px] bg-[#faf6f3] pt-[0px] lg:pb-[120px] md:py-[95px] sm:py-[80px]">
        <Container>
          <Row className="md:mt-[100px] sm:mt-0">
            <Overlap className="relative z-10">
              <Col className="shadow-[0_0_20px_rgba(0,0,0,0.08)] bg-white rounded-[6px] py-12 px-16 lg:px-12 sm:px-4">
                <Row className="flex items-center justify-center">
                  <Col lg="auto" className="md:mb-[10px] md:text-center">
                    <m.span
                      {...fadeIn}
                      className="font-serif text-xlg font-semibold text-gradient bg-gradient-to-r from-[#ff9e78] via-[#ff9979] to-[#ff767e] uppercase md:text-lg"
                    >
                      Popular Classes
                    </m.span>
                  </Col>
                  <Col
                    lg="auto"
                    className="px-[20px] lg:px-[10px] flex items-center md:px-[15px] md:mb-[20px] md:justify-center xs:flex-col"
                  >
                    <m.div
                      {...fadeIn}
                      className="px-[32px] block sm:inline-block align-middle border-r border-mediumgray lg:px-[15px] xs:border-r-0 xs:mb-[10px]"
                    >
                      <span className="font-serif font-medium uppercase leading-[18px] block ">
                        Soothe body
                      </span>
                    </m.div>
                    <m.div
                      {...fadeIn}
                      className="px-[32px] block sm:inline-block align-middle border-r border-mediumgray lg:px-[15px] xs:border-r-0 xs:mb-[10px]"
                    >
                      <span className="font-serif font-medium uppercase leading-[18px] block ">
                        Relaxing your mind
                      </span>
                    </m.div>
                    <m.div
                      {...fadeIn}
                      className="px-[32px] block sm:inline-block align-middle lg:px-[15px]"
                    >
                      <span className="font-serif font-medium uppercase leading-[18px] block ">
                        Hatha beginner
                      </span>
                    </m.div>
                  </Col>
                  <Col lg="auto" className="text-center">
                    <ScrollTo
                      href="#"
                      to="classes"
                      offset={0}
                      delay={0}
                      spy={true}
                      smooth={true}
                      duration={800}
                    >
                      <Buttons
                        type="submit"
                        ariaLabel="link for Join classes"
                        className="font-medium btn-fancy font-serif uppercase rounded-[2px] lg:mb-[15px]"
                        themeColor={["#fe8182", "#f8a380"]}
                        size="xs"
                        color="#fff"
                        title="Join classes"
                      />
                    </ScrollTo>
                  </Col>
                </Row>
              </Col>
            </Overlap>
          </Row>
          <Row className="mt-32 md:mt-24">
            <m.div {...fadeIn} className="col-12 col-md-6">
              <h2 className="heading-5 font-serif font-medium leading-[46px] -tracking-[1px] w-[95%] text-[#333045] m-md-0 lg:w-full sm:leading-[32px]">
                True meditation is about being fully present with everything
                that is including discomfort
              </h2>
            </m.div>
            <m.div
              {...{ ...fadeIn, transition: { delay: 0.6 } }}
              className="col-12 col-lg-5 offset-lg-1 col-md-6"
            >
              <p className="leading-[32px] w-[95%] mb-[25px]">
                We must experience the truth in a direct, practical and real
                way. This is only possible in the stillness and silence of the
                mind and this is achieved by means of meditation.
              </p>
              <Buttons
                ariaLabel="link for about us"
                href="#"
                className="font-semibold font-serif uppercase btn-link after:h-[1px] md:text-md md:mb-[15px] after:bg-[#333045] hover:text-darkgray"
                size="xlg"
                color="#333045"
                title="Discover about us"
              />
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Overlap Section Start */}
      <section>
        <Container>
          <Row className="justify-center lg:mt-[200px] md:mt-0">
            <Overlap className="col-12 col-md-12 col-sm-8 md:mt-0 md:py-[95px] sm:py-[80px] xs:pb-0">
              <RotateBox
                animation={rotateInLeft}
                animationDelay={0.4}
                grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-10 justify-center"
                data={RotateBoxData}
              />
            </Overlap>
          </Row>
        </Container>
      </section>
      {/* Overlap Section End */}

      {/* Section Start */}
      <section className="yogameditation-iconwithtext py-[160px] lg:py-[120px] md:py-[95px] md:pt-0 sm:pb-[75px] xs:py-[50px]">
        <Container>
          <IconWithText
            grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-[40px]"
            theme="icon-with-text-03 lg:p-0"
            className="m-0"
            data={IconWithTextData}
            animation={fadeIn}
            animationDelay={0.2}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="yogameditation-accordion pb-[160px] lg:pb-[120px] mb:pb-[95px] sm:pb-[80px] xs:pb-[50px] overflow-hidden">
        <Container>
          <Row className="items-center justify-center">
            <m.div
              className="col-lg-5 md:mb-20 xs:mt-20"
              {...{ ...fadeIn, transition: { delay: 0.2 } }}
            >
              <span className="font-serif font-medium text-[#ea9d8d] uppercase block mb-[20px] md:mb-[10px]">
                Benefits of yoga
              </span>
              <h2 className="heading-5 font-serif font-medium text-[#333045] leading-[46px] mb-16 w-[85%] -tracking-[1px] lg:w-full md:mb-[10px] xs:leading-[30px]">
                Special health benefits of yoga in the morning
              </h2>
              <Accordions
                theme="accordion-style-02"
                className="w-[85%] lg:w-full"
                animation={fadeIn}
                themeColor="light"
                data={AccordionData}
              />
            </m.div>
            <m.div
              className="offset-lg-1 col-lg-6"
              {...{ ...fadeIn, transition: { delay: 0.4 } }}
            >
              <div className="-mr-[30vw] relative md:mr-0">
                <img
                  width="1000px"
                  height="715px"
                  src="https://via.placeholder.com/1000x715"
                  className="overflow-hidden rounded-[4px]"
                  alt=""
                />
                <div className="absolute top-0 h-full flex items-center justify-center -left-[50px] md:left-0 md:w-full">
                  {/* Modal Component Start */}
                  <CustomModal.Wrapper
                    modalBtn={
                      <Buttons
                        ariaLabel="modal link"
                        type="submit"
                        className="btn-sonar border-0 mx-auto shadow-[0_0_15px_rgba(0,0,0,0.1)] mb-0"
                        themeColor="#fff"
                        color="#ea9d8d"
                        size="xl"
                        title={<i className="fas fa-play text-[25px]" />}
                      />
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
              </div>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section
        id="classes"
        className="bg-[#faf6f3] py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]"
        {...fadeIn}
      >
        <Container>
          <Row className="items-end mb-24 md:text-center">
            <Col xl={6} lg={8}>
              <span className="font-serif font-medium text-[#ea9d8d] uppercase block mb-[20px] md:mb-[10px]">
                Popular classes
              </span>
              <h2 className="heading-5 font-serif font-medium text-[#333045] leading-[46px] mb-0 -tracking-[1px] inline-block md:leading-[36px] md:w-[70%] xs:w-full xs:!mb-[15px]">
                Yoga is the perfect opportunity to be curious about who you are
              </h2>
            </Col>
            <Col xl={6} lg={4} className="text-right md:text-center">
              <Buttons
                ariaLabel="link for Popular classes"
                href="#"
                className="font-serif font-semibold uppercase btn-link after:h-[1px] md:text-md md:mb-[15px] after:bg-[#333045] hover:text-darkgray"
                color="#333045"
                size="xl"
                title="Explore classes"
              />
            </Col>
          </Row>
          <InfoBannerStyle01
            grid="row row-cols-1 row-cols-lg-3 row-cols-sm-2 md:gap-y-10"
            className="justify-center"
            data={InfoBannerData01}
            animation={fadeIn}
          />
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="pb-[130px] lg:pb-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row>
            <Overlap>
              <Col className="text-center">
                <h2 className="heading-3 font-serif text-[#ea9d8d] text-[130px] leading-[120px] -tracking-[3px] font-bold mb-0 lg:text-[110px] lg:leading-[100px] md:text-[90px] md:leading-[85px] sm:text-[50px] sm:leading-[50px]">
                  mindfullness
                </h2>
              </Col>
            </Overlap>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="pb-[130px] pt-0 lg:pb-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center items-center text-center">
            <Col
              lg={10}
              className="px-40 sm:px-28 xs:px-24 relative items-center"
            >
              <TestimonialsCarousel08
                data={TestimonialsCarouselData8}
                animation={fadeIn}
                className="black-move font-sans"
                carouselOption={{
                  slidesPerView: 1,
                  loop: true,
                  navigation: true,
                  autoplay: { delay: 2500, disableOnInteraction: false },
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] border-t border-[#ededed] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="items-end mb-24 md:text-center sm:mb-20">
            <Col xl={6} lg={8}>
              <span className="font-serif font-medium text-[#ea9d8d] uppercase block mb-[20px] md:mb-[10px]">
                THE BEST FACILITY
              </span>
              <h2 className="heading-5 font-serif font-medium text-[#333045] leading-[46px] mb-0 -tracking-[1px] inline-block md:leading-[36px] md:w-[70%] xs:w-full">
                Why choose us? Because we provide the best facility
              </h2>
            </Col>
            <Col xl={6} lg={4} className="text-right md:text-center">
              <Buttons
                ariaLabel="link for FACILITY"
                href="#"
                className="font-serif font-semibold uppercase btn-link after:h-[1px] md:text-md md:mb-[15px] after:bg-[#333045] hover:text-darkgray"
                color="#333045"
                title="Get started now"
                size="xl"
              />
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={12} md={11} xs={12}>
              <Services
                grid="row row-cols-1 row-cols-lg-4 row-cols-sm-2 justify-center gap-y-[40px]"
                theme="service-style-06"
                data={serviceData6}
                animation={fadeIn}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <div className="py-[160px] md:flex md:items-center overflow-hidden relative lg:pb-[120px] md:py-[95px] sm:py-[80px]">
        <Parallax
          className="lg-no-parallax bg-cover absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] lg:bg-[right_-80px_top] md:bg-[right_-50px_top] md:h-[90vh] sm:-top-[40px]"
          translateY={[-40, 40]}
          style={{
            backgroundImage: `url(https://via.placeholder.com/1920x1103)`,
          }}
        ></Parallax>
        <div className="absolute h-full w-full opacity-80 top-0 left-0 bg-darkgray"></div>
        <Container>
          <Row className="justify-center">
            <m.div
              className="relative text-center col-xl-7 col-lg-8 col-md-10"
              {...{ ...zoomIn, transition: { duration: 0.7 } }}
            >
              <span className="font-serif font-medium text-white uppercase tracking-[2px] opacity-50 block mb-[30px] md:mb-[20px]">
                yoga enhances your life
              </span>
              <h2 className="font-serif font-medium text-white -tracking-[2px] mb-[50px] md:mb-[40px]">
                Yoga is the journey of the self through the self
              </h2>
              <Buttons
                ariaLabel="link for Discover classes"
                href="#"
                className="font-medium btn-fancy font-serif uppercase rounded-[2px] lg:mb-[15px]"
                themeColor={["#fe8182", "#f8a380"]}
                size="lg"
                color="#fff"
                title="Discover classes"
              />
            </m.div>
          </Row>
        </Container>
      </div>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[100px] md:py-[75px] sm:py-[50px] overflow-hidden">
        <Container>
          <Row className="justify-center">
            <Col xl={5} lg={4} className="md:mb-[50px] sm:mb-[30px]">
              <m.h2
                className="heading-5 font-serif font-medium text-[#333045] w-[70%] inline-block -tracking-[1px] m-0 lg:w-full md:w-[50%] xs:w-[70%]"
                {...{ ...fadeIn, transition: { delay: 0.2 } }}
              >
                Please feel free to get in touch with us
              </m.h2>
            </Col>
            <m.div
              className="col-xl-3 col-lg-4 col-sm-6 xs:mb-[30px]"
              {...{ ...fadeInLeft, transition: { delay: 0.4, duration: 1 } }}
            >
              <div className="flex justify-center">
                <div className="mr-[35px] mt-[5px]">
                  <i className="line-icon-Geo2-Love text-[32px] text-[#ea9d8d] block"></i>
                </div>
                <div className="max-w-full">
                  <span className="text-[#333045] uppercase text-md font-medium font-serif mb-[5px] block">
                    Litho meditation
                  </span>
                  <p className="m-0">
                    401 Broadway, 24th Floor, Orchard View, London
                  </p>
                </div>
              </div>
            </m.div>
            <m.div
              className="col-xl-3 col-lg-4 col-sm-6 offset-xl-1"
              {...{ ...fadeInLeft, transition: { delay: 0.6, duration: 1 } }}
            >
              <div className="flex">
                <div className="mr-[35px] mt-[5px]">
                  <i className="line-icon-Mail text-[32px] text-[#ea9d8d] block"></i>
                </div>
                <div className="max-w-full">
                  <span className="text-[#333045] uppercase text-md font-medium font-serif mb-[5px] block">
                    How can we help?
                  </span>
                  <p className="m-0">
                    <a
                      aria-label="mail"
                      href="mailto:info@yourdomain.com"
                      className="hover:text-[#ea9d8d]"
                    >
                      info@yourdomain.com
                    </a>
                    <br />
                    <a
                      aria-label="link for gmail"
                      href="mailto:hr@yourdomain.com"
                      className="hover:text-[#ea9d8d]"
                    >
                      hr@yourdomain.com
                    </a>
                  </p>
                </div>
              </div>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Footer Start */}
      <footer className="py-[50px] border-t border-mediumgray">
        <Container>
          <Row className="items-center">
            <Col
              md={3}
              className="text-center md:text-start sm:mb-[20px] flex sm:justify-center"
            >
              <Link
                aria-label="footer home link"
                to="/"
                className="flex justify-start"
              >
                <img
                  width={111}
                  height={36}
                  className="max-h-[36px]"
                  src="/assets/img/webp/logo-gradient-tan-geraldine.webp"
                  alt=""
                />
              </Link>
            </Col>
            <Col md={6} className="text-center md:text-end sm:mb-[20px]">
              <p>
                © {new Date().getFullYear()} Litho is Proudly Powered by{" "}
                <a
                  aria-label="footer themezaa link"
                  href="https://www.themezaa.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 font-medium text-[#000] hover:text-[#ea9d8d]"
                >
                  ThemeZaa
                </a>
              </p>
            </Col>
            <Col md={3}>
              <SocialIcons
                theme="social-icon-style-01"
                className="block text-right sm:text-center"
                iconColor="dark"
                size="xs"
                data={SocialIconsData}
              />
            </Col>
          </Row>
        </Container>
      </footer>
      {/* Footer End */}
    </div>
  );
};

export default YogaMeditationPage;
