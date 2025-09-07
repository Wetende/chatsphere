import React from "react";

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax } from "react-scroll-parallax";
import { m } from "framer-motion";

// Component
import Header, { HeaderNav, Menu } from "../../Components/Header/Header";
import Buttons from '../../Components/Button/Buttons'
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import IconWithText from '../../Components/IconWithText/IconWithText'
import InteractiveBanners03 from "../../Components/InteractiveBanners/InteractiveBanners03";
import Clients from '../../Components/Clients/Clients'
import BlogGrid from "../../Components/Blogs/BlogGrid";
import Team from "../../Components/Team/Team";
import Lists from "../../Components/Lists/Lists";
import ProgressBar from "../../Components/Progressbar/ProgressBar";
import { TextAnime } from '../../Components/FancyText/FancyText'
import FooterStyle02 from "../../Components/Footers/FooterStyle02";
import CustomModal from '../../Components/CustomModal'
import { fadeIn, fadeInLeft } from "../../Functions/GlobalAnimations";
import SideButtons from "../../Components/SideButtons";
import InViewPort from "../../Components/InViewPort";

// Data
import { InteractiveBannersData03 } from "../../Components/InteractiveBanners/InteractiveBannersData";
import { ProgressBarData02 } from "../../Components/Progressbar/ProgressBarData";
import { TeamData01 } from "../../Components/Team/TeamData";
import { IconWithTextData_07 } from "../../Components/IconWithText/IconWithTextData";
import { ListData01 } from "../../Components/Lists/ListsData";
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

const ClientData = [
  {
    img: 'https://via.placeholder.com/232x110',
    target: "_self",
    link: '#'
  },
  {
    img: 'https://via.placeholder.com/232x110',
    target: "_self",
    link: '#'
  },
  {
    img: 'https://via.placeholder.com/232x110',
    target: "_self",
    link: '#'
  },
  {
    img: 'https://via.placeholder.com/232x110',
    target: "_self",
    link: '#'
  }
]

const TestimonialsCarouselData = [
  {
    img: "https://via.placeholder.com/800x622",
    title: "Unlimited power customization",
    number: "01",
    content:
      "Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt elit.",
  },
  {
    img: "https://via.placeholder.com/800x622",
    title: "Powerful creatives designer",
    number: "02",
    content:
      "Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt elit.",
  },
  {
    img: "https://via.placeholder.com/800x622",
    title: "Advanced customization options",
    number: "03",
    content:
      "Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt elit.",
  },
];
const IconWithTextData = [
  {
    icon: "line-icon-Navigation-LeftWindow text-[#2ed47c] text-[40px]",
    title: "Amazing layouts",
    content: "Lorem ipsum is simply dummy text of the printing typesetting ipsum been text.",
  },
  {
    icon: "line-icon-Cursor-Click2 text-[#2ed47c] text-[40px]",
    title: "No coding required",
    content: "Lorem ipsum is simply dummy text of the printing typesetting ipsum been text.",
  },
  {
    icon: "line-icon-Gear-2 text-[#2ed47c] text-[40px]",
    title: "Easy to customize",
    content: "Lorem ipsum is simply dummy text of the printing typesetting ipsum been text.",
  },
];

const CorporatePage = (props) => {
  const swiperRef = React.useRef(null);
  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header Start*/}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav fluid="fluid" theme="dark" expand="lg" className="py-[0px] px-[35px] md:px-[15px] md:py-[20px] sm:px-0">
          <Col lg={2} sm={6} xs={"auto"} className="mr-auto ps-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-green-dark.webp' data-rjs='/assets/img/webp/logo-green-dark@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Navbar.Toggle className="order-last md:ml-[17px]">
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="justify-center col-auto col-lg-8">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col lg={2} xs={"auto"} className="justify-end pe-0 flex items-center">
            <SocialIcons
              theme="social-icon-style-01"
              size="xs"
              iconColor="light"
              data={SocialIconsData}
            />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header Start*/}
      {/* Section Start */}
      <m.section className="relative full-screen overflow-hidden landscape:md:h-[500px]" {...fadeIn}>
        <Parallax className="lg-no-parallax bg-cover cover-background absolute bg-top left-0 md:-top-[30px] w-full h-[100vh]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1080)` }}></Parallax>
        <div className="absolute h-full w-full opacity-30 top-0 left-0 bg-gradient-to-r from-[#040506] to-[#130e3e] rotate-[30px]"></div>
        <Container className="h-full text-center justify-center">
          <Row className="h-full justify-center">
            <Col
              xl={6}
              lg={7}
              md={10}
              className="justify-center flex-col relative flex text-center"
            >
              <span className="mb-[35px] font-light text-[#fff] text-lg md:text-xmd font-serif block xs:mb-[15px]">
                Unlimited power customization
              </span>
              <h2 className="font-semibold text-[#fff] text-shadow-large font-serif landscape:md:mb-[50px]">
                Hand crafted pixel perfect designs
              </h2>
              {/* Modal Component Start */}
              <CustomModal.Wrapper
                className="absolute bottom-[100px] inline-block w-auto -translate-x-1/2 left-1/2 justify-center"
                modalBtn={
                  <span className="inline-flex flex-row items-center justify-center">
                    <Buttons
                      ariaLabel="Video modal button"
                      type="submit"
                      className="btn-sonar border-0 mr-[15px] xs:!px-[32px] xs:!py-[12px]"
                      themeColor="#2ed47c"
                      color="#232323"
                      size="lg"
                      title={<i className="fas fa-play text-[20px]" />}
                    />
                    <span className="relative whitespace-nowrap font-medium text-[#fff] text-md font-serif uppercase inline-block align-middle border-b cursor-pointer border-indigo-50">
                      See how it works
                    </span>
                  </span>
                }
              >
                <div className="w-[1020px] max-w-full relative rounded mx-auto">
                  <div className="fit-video">
                    <iframe
                      width="100%"
                      height="100%"
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
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}
      {/* Section Start */}
      <m.section
        className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]"
        {...fadeIn}
      >
        <Container>
          <Row className="items-center justify-center md:items-start sm:text-center">
            <Col lg={4} md={6} className="md:mb-[50px]">
              <m.div className="inline-block text-center w-[300px] py-14 px-[15px] relative" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
                <div className="border-r-0 border-solid	border-[10px] border-basecolor h-full w-[67px] block absolute bottom-0 left-0"></div>
                <h1 className="text-[80px] leading-[72px] mb-0 mr-[15px] font-semibold tracking-[-5px] text-darkgray font-serif inline-block align-middle">
                  28
                </h1>
                <div className="w-[40%] leading-[20px] font-medium text-darkgray text-xmd font-serif text-left relative inline-block align-middle lg:w-[50%] sm:w-[35%]">
                  Years experience working
                </div>
                <div className="border-l-0 border-solid	border-[10px] border-basecolor h-full w-[67px] block absolute bottom-0 right-0"></div>
              </m.div>
            </Col>
            <Col lg={3} md={4}>
              <m.div {...{ ...fadeIn, transition: { delay: 0.4 } }}>
                <span className="mb-[20px] text-md font-serif uppercase block">
                  Since 1992
                </span>
                <span className="w-[85%] leading-[34px] font-medium text-darkgray text-xlg font-serif block lg:leading-0 lg:text-lg sm:w-full sm:mb-[15px]">
                  Trully corporate company based in United kingdom
                </span>
              </m.div>
            </Col>
            <Col lg={5} md={10}>
              <m.div {...{ ...fadeIn, transition: { delay: 0.6 } }}>
                <p className="w-[84%] mb-[25px] block lg:w-full">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit do
                  eiusmod tempor incididunt ut labore et dolore magna ut enim ad
                  minim veniam nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
                <Buttons
                  to="/page/about-us/"
                  className="font-medium font-serif uppercase btn-link text-md after:bg-black after:h-[1px] after:!-bottom-[5px] hover:text-darkgray md:text-md md:mb-[15px]"
                  color="#232323"
                  title="About company"
                  size="xl"
                />
              </m.div>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}
      
      <InViewPort>
        {/* Section Start */}
        <section className="bg-lightgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
          <Container>
            <Row className="justify-center">
              <Col lg={6} md={7} sm={8} className="text-center mb-24">
                <m.h2 className="heading-4 font-semibold -tracking-[1px] text-darkgray font-serif" {...fadeIn} >
                  Perfect powerful theme for corporate business
                </m.h2>
              </Col>
            </Row>
            <IconWithText
              grid="row-cols-1 row-cols-lg-3 row-cols-sm-2 justify-center"
              theme="icon-with-text-07"
              data={IconWithTextData_07}
              animation={fadeIn}
            />
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <m.section
          className="cover-background py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]"
          style={{
            backgroundImage:
              "url(/assets/img/webp/home-corporate-hand-crafted-bg.webp)",
          }}
          {...fadeIn}
        >
          <Container>
            <Row className="items-center justify-center">
              <Col xs={10} lg={6} className="relative">
                <div className="relative">
                  <Parallax className="lg-no-parallax w-[70%]" speed={0}>
                    <img width="" height="" alt="" src="https://via.placeholder.com/391x567" />
                  </Parallax>
                  <Parallax className="lg-no-parallax flex justify-center items-center w-1/2 bg-no-repeat absolute bottom-0 right-[15px] lg:!left-auto lg:!top-[150px] sm:!top-[100px]" speed={20}>
                    <img width="341.25px" height="349.78px" alt="" src="https://via.placeholder.com/318x386" />
                  </Parallax>
                </div>
              </Col>
              <Col xs={10} xl={{ span: 4 }} lg={{ span: 5, offset: 1 }} className="md:mt-[15%] xs:mt-[18%]">
                <m.h2 className="heading-4 mb-16 font-semibold -tracking-[1px] text-darkgray font-serif" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
                  Hand crafted pixel perfect design
                </m.h2>
                <m.span className="mb-[5px] font-serif text-darkgray font-medium block" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
                  Scientific website optimization
                </m.span>
                <m.p className="mb-0 w-[85%]" {...{ ...fadeIn, transition: { delay: 0.5 } }}>
                  Lorem ipsum dolor sit consectetur adipiscing elit sed do eiusmod
                  tempor incididunt.
                </m.p>
                <m.span className="h-[1px] my-12 bg-mediumgray w-full block sm:my-6" {...{ ...fadeIn, transition: { delay: 0.6 } }}></m.span>
                <m.span className="mb-[5px] font-serif text-darkgray font-medium block" {...{ ...fadeIn, transition: { delay: 0.7 } }}>
                  Generating increased revenue
                </m.span>
                <m.p className="mb-0 w-[85%]" {...{ ...fadeIn, transition: { delay: 0.8 } }}>
                  Lorem ipsum dolor sit consectetur adipiscing elit sed do eiusmod
                  tempor incididunt.
                </m.p>
                <m.div {...{ ...fadeIn, transition: { delay: 1 } }}>
                  <Buttons
                    className="font-medium font-serif uppercase hover:text-darkgray btn-expand mt-[56px]"
                    size="lg"
                    color="#232323"
                    themeColor="#2ed47c"
                    to="/"
                    title="Explore Features"
                  />
                </m.div>
              </Col>
            </Row>
          </Container>
        </m.section>
        {/* Section End */}

        {/* Section Start */}
        <section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:[50px]">
          <Container>
            <m.div className="row justify-center">
              <m.div className="col col-lg-6 cpl-md-8 col-sm-10 mb-24 text-center" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
                <h2 className="heading-4 font-semibold -tracking-[1px] text-darkgray font-serif">
                  Unlimited experience
                </h2>
                <p className="w-[80%] my-0 mx-auto xs:w-full">
                  Lorem ipsum dolor amet consectetur adipiscing elit eiusmod
                  tempor incididunt ut labore et dolore magna
                </p>
              </m.div>
            </m.div>
            <InteractiveBanners03
              grid="row-cols-1 gap-y-[15px]"
              overlay={["#2ed47ce6", "#e8a626e6"]}
              data={InteractiveBannersData03}
              animation={fadeIn}
            />
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
          <Container>
            <Row className="mb-36 md:mb-20 xs:mb-12">
              <m.div className="col col-xl-4 col-lg-5 col-md-6 xs:mb-8" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
                <h2 className="heading-4 mb-[30px] font-semibold -tracking-[1px] text-darkgray font-serif">
                  Highly expertise
                </h2>
                <p className="w-[85%] xs:mb-[15px] landscape:md:mb-[15px]">
                  Lorem ipsum dolor sit consectetur adipiscing elit do eiusmod
                  tempor incididunt ut labore et dolore magna ut enim ad minim.
                </p>
              </m.div>
              <Col lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 2 }} md={6} className="xs:mb-[30px]">
                <ProgressBar
                  trailColor="transparent"
                  theme="progressbar-style-02"
                  height="8px"
                  data={ProgressBarData02}
                  color={["#2ed47c", "#e8bf47"]}
                  animation={fadeIn}
                />
              </Col>
            </Row>
            <IconWithText
              grid="row-cols-1 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 gap-y-[30px] justify-center"
              theme="icon-with-text-01"
              data={IconWithTextData}
              animation={fadeIn}
              animationDelay={0.2}
            />
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <m.section
          className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] bg-lightgray overflow-hidden"
          {...fadeIn}
        >
          <Container>
            <Row className="items-center justify-center">
              <Col lg={6} md={9} className="p-0 md:mb-[30px]">
                <m.div className="relative" {...fadeIn}>
                  <div
                    onClick={() => swiperRef.current.swiper.slidePrev()}
                    className="btn-slider-prev bg-darkgray z-[11] text-[#fff] w-[50px] h-[50px] left-[15px] transition-default leading-[40px] m-0 right-auto absolute top-[47%] flex item-center justify-center hover:bg-white hover:text-darkgray  cursor-pointer"
                  >
                    <button className="text-xmd" aria-label="prev btn">
                      <i className="feather-arrow-left"></i>
                    </button>
                  </div>

                  <div
                    onClick={() => swiperRef.current.swiper.slideNext()}
                    className="btn-slider-next btn-slider-next bg-darkgray z-[11] text-[#fff] w-[50px] transition-default h-[50px] right-[15px] leading-[40px] m-0 left-auto absolute top-[47%] flex item-center justify-center hover:bg-white hover:text-darkgray  cursor-pointer"
                  >
                    <button className="text-xmd" aria-label="next btn">
                      <i className="feather-arrow-right"></i>
                    </button>
                  </div>
                  <Swiper
                    className="black-move swiper-pagination-medium h-full"
                    ref={swiperRef}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                  >
                    {TestimonialsCarouselData.map((item, i) => {
                      return (
                        <SwiperSlide key={i} className="p-[15px]">
                          <div className="h-full bg-[#fff] box-shadow">
                            <img className="w-full" src={item.img} alt="TestimonialsCarousel" width={555} height={432} />
                            <div className="items-center justify-center text-center flex px-[4.5rem] py-14 flex-row	xs:p-8">
                              <div className="grow-0 shrink-0 basis-auto flex-initial pr-[40px] xs:pr-[15px]">
                                <h2 className="heading-4 font-semibold text-darkgray font-serif mb-0">
                                  {item.number}
                                </h2>
                              </div>
                              <div className="overflow-hidden max-w-full pl-[40px] border-basecolor border-l-[2px] text-left xs:pl-[15px]">
                                <span className="mb-[5px] font-medium text-darkgray text-xmd font-serif block">
                                  {item.title}
                                </span>
                                <p className="mb-0">{item.content}</p>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </m.div>
              </Col>
              <m.div
                className="col-lg-5 col-md-9 offset-lg-1"
                {...fadeInLeft}
              >
                <h2 className="heading-4 mb-[40px] leading-[40px] font-semibold tracking-[-1px] text-darkgray font-serif xs:mb-[20px]">
                  <span className="p-0 block">Hand crafted pixel</span>
                  <TextAnime
                    duration={3000}
                    color="#232323"
                    className="font-semibold animated-text-black"
                    animation="slide"
                    data={["perfect design", "perfect layout", "perfect color"]}
                  />
                </h2>
                <p className="w-[90%] mb-[30px] xs:w-full">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit do
                  eiusmod tempor incididunt ut labore et dolore magna ut enim ad
                  minim veniam nostrud exercitation.
                </p>
                <m.div className="col w-[85%] xs:w-full">
                  <Lists
                    className="font-medium"
                    theme="list-style-01"
                    data={ListData01}
                  />
                </m.div>
              </m.div>
            </Row>
          </Container>
        </m.section>
        {/* Section End */}

        {/* Section Start */}
        <m.section
          className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]"
          {...fadeIn}
        >
          <Container>
            <Row className="justify-center">
              <Col lg={6} md={8} className="mb-20 text-center xs:mb-16">
                <h2 className="heading-4 font-semibold -tracking-[1px] text-darkgray font-serif">
                  Meet the people
                </h2>
                <p className="w-[80%] mb-0 my-0 mx-auto xs:w-full">
                  Lorem ipsum dolor amet consectetur adipiscing elit eiusmod
                  tempor incididunt ut labore et dolore magna
                </p>
              </Col>
            </Row>
            <Team
              themeColor="dark"
              theme="team-style-01"
              data={TeamData01}
              grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-10"
              animation={fadeIn}
              carousel={false}
              overlay={["#2ed47ce6", "#e8a626e6"]}
              animationDelay={0.3}
            />
          </Container>
        </m.section>
        {/* Section End */}

        {/* Section Start */}
        <m.section
          className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden"
          {...fadeIn}
        >
          <Container>
            <Row className="justify-center">
              <Col lg={6} md={8} className="text-center mb-20 xs:mb-12">
                <h2 className="heading-4 font-semibold -tracking-[1px] text-darkgray font-serif">
                  Interesting articles
                </h2>
                <p className="w-[80%] mb-0 my-0 mx-auto xs:w-full">
                  Lorem ipsum dolor amet consectetur adipiscing elit eiusmod
                  tempor incididunt ut labore et dolore magna
                </p>
              </Col>
            </Row>
          </Container>
          <Container className="xs:p-0">
            <BlogGrid
              pagination={false}
              grid="grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
              data={blogData.slice(1, 4)}
              overlay="#374162"
            />
            <Row>
              <Col className="text-center">
                <Buttons
                  to="/blogs/blog-masonry"
                  className="mt-[70px] font-medium font-serif uppercase btn-link md:mb-[15px] hover:text-darkgray after:border-b after:border-darkgray xs:mt-[20px] xs:mb-0"
                  color="#232323"
                  title="view all articles"
                  size="xl"
                />
              </Col>
            </Row>
          </Container>
        </m.section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[100px] md:py-[75px] sm:py-[50px]">
          <Container>
            <Clients
              grid="row-cols-1 row-cols-md-2 row-cols-sm-2 row-cols-lg-4"
              theme="client-logo-style-02"
              data={ClientData}
              animation={fadeIn}
            />
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <m.section className="relative" {...fadeIn}>
          <div style={{ backgroundImage: "url('https://via.placeholder.com/1920x1100')" }} className="mxl:bg-cover py-[100px] lg:py-[90px] md:py-[75px] sm:py-[50px] sm:px-[15px] bg-fixed lg:bg-cover lg:bg-local lg:bg-center" >
            <div className="left-0 top-0 h-full w-full absolute bg-darkslateblue opacity-75"></div>
            <Container className="relative">
              <Row className="justify-center items-center">
                <Col xl={7} md={8} sm={10} className="md:mb-[30px] sm:mb-[30px]">
                  <h2 className="heading-4 font-serif font-semibold text-white mb-0 sm:text-center">
                    Gearing your company through an Innovative strategy
                  </h2>
                </Col>
                <Col xl={5} md={4} className="md:flex md:justify-center text-end">
                  <Buttons
                    to="/"
                    className="font-medium font-serif uppercase rounded-none"
                    themeColor={["#2ed47c", "#e8a626"]}
                    size="lg"
                    color="#fff"
                    title="Download litho"
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </m.section>
        {/* Section End */}

        {/* Footer Start */}
        <FooterStyle02 theme="dark" className="bg-[#262b35] text-slateblue" />
        {/* Footer Start */}
      </InViewPort>
    </div>
  );
};

export default CorporatePage;
