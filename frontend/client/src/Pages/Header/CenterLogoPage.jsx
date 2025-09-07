import React from "react";

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Parallax } from "react-scroll-parallax";
import { Link } from "react-router-dom";
import { m } from "framer-motion";

// Component
import { fadeIn } from "../../Functions/GlobalAnimations";
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar, Topbar } from "../../Components/Header/Header";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import Buttons from '../../Components/Button/Buttons'
import IconWithText from '../../Components/IconWithText/IconWithText'
import Tab01 from "../../Components/Tab/Tab01";
import Counter from '../../Components/Counters/Counter'
import BlogClassic from "../../Components/Blogs/BlogClassic";
import FooterStyle01 from "../../Components/Footers/FooterStyle01";
import SideButtons from "../../Components/SideButtons";

// Data
import { TabData01 } from "../../Components/Tab/TabData";
import HeaderData from "../../Components/Header/HeaderData";
import { blogData } from "../../Components/Blogs/BlogData";

const SocialIconsData01 = [
  {
    color: "#ffffff99",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "#ffffff99",
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  },
  {
    color: "#ffffff99",
    link: "https://www.linkedin.com/",
    icon: "fab fa-linkedin-in"
  },
  {
    color: "#ffffff99",
    link: "https://www.youtube.com/",
    icon: "fab fa-youtube",
  }
]

const CounterData = [
  {
    number: {
      text: "2530",
    },
    title: "",
    content: "WORKING HOURS",
  },
  {
    number: {
      text: "3200",
    },
    title: "",
    content: "PHOTO CAPTURE",
  },
  {
    number: {
      text: "2830",
    },
    title: "",
    content: "WORK COMPLETED",
  },
  {
    number: {
      text: "2060",
    },
    title: "",
    content: "TELEPHONIC TALK",
  },
]

const IconWithTextData = [
  {
    icon: "line-icon-Money-Bag text-[#b7b7b7] text-[40px]",
    title: "Effective strategy",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  },
  {
    icon: "line-icon-Gear-2 text-[#b7b7b7] text-[40px]",
    title: "Powerfull customize",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  },
  {
    icon: "line-icon-Talk-Man text-[#b7b7b7] text-[40px]",
    title: "Customer satisfaction",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  },
  {
    icon: "line-icon-Cursor-Click2 text-[#b7b7b7] text-[40px]",
    title: "No coding required",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  }
];

const CenterLogoPage = (props) => {
  return (
    <>
      {/* Header Start */}
      <Header className="header-with-topbar" topSpace={{ desktop: true }} type="reverse-scroll">
        <Topbar className="bg-black text-white sm:hidden md:px-[15px]">
          <Container fluid="lg">
            <Row className="items-center justify-center">
              <Col className="col-12 col-md-3 header-social-icon d-none d-md-inline-block border-0">
                <SocialIcons theme="social-icon-style-01" className="justify-start" size="xs" iconColor="light" data={SocialIconsData01} />
              </Col>
              <Col className="col-12 col-md-6 text-center px-md-0 sm-padding-5px-tb line-height-normal">
                <span className="text-sm font-serif inline-block">
                  Free delivery on orders over £120. Don't miss discount.
                </span>
              </Col>
              <Col className="col-auto col-md-3 text-right !pr-[30px] md:!pr-[15px]">
                <SearchBar className="py-[7px] pl-[20px] text-white" />
                <HeaderLanguage className="py-[7px] pl-[20px] text-white" />
                <HeaderCart className="py-[7px] pl-[20px] text-white" style={{ "--base-color": "#0038e3" }} />
              </Col>
            </Row>
          </Container>
        </Topbar>
        <HeaderNav bg="white" theme="light" containerClass="!px-0" className="py-[0px] md:py-[18px] md:px-[15px] sm:px-0">
          <Col lg={6} xs={"auto"} className="px-lg-0 position-absolute left-0 right-0 mx-lg-auto text-center md:!relative mr-auto">
            <Link aria-label="header logo" className="inline-block relative z-10" to="/">
              <Navbar.Brand className="inline-block p-0 m-0 align-middle">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Col className="md:flex md:justify-end md:px-[15px]">
            <Navbar.Toggle className="order-last md:ml-[17px]">
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
            </Navbar.Toggle>
            <div className="hidden md:block">
              <Navbar.Collapse className="col-auto justify-center">
                <Menu {...props} />
              </Navbar.Collapse>
            </div>
            <div className="flex justify-between md:hidden col-lg-9 col-xl-8 mx-auto !pl-[25px] !pr-[12px] lg:!pl-[15px] lg:!pr-0">
              <Menu data={HeaderData.slice(0, Math.floor(HeaderData.length / 2))} />
              <Menu data={HeaderData.slice(Math.floor(HeaderData.length / 2), (HeaderData.length - 1))} />
            </div>
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Parallax Section Start */}
      <div className="full-screen relative overflow-hidden landscape:md:h-[600px]">
        <Parallax className="lg-no-parallax bg-cover absolute top-[0px] left-0 w-full h-[100vh] md:top-[-10px] landscape:md:h-[600px]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1080)` }}></Parallax>
        <div className="absolute top-0 left-0 w-full h-full bg-darkgray opacity-30"></div>
        <Container className="relative h-full text-center landscape:md:h-[600px]">
          <Row className="center-logo h-full items-center justify-center">
            <Col xl={6} sm={7} className="justify-center items-center my-0 mx-auto">
              <span className="mb-[35px] font-medium tracking-[2px] text-white text-xmd font-serif uppercase block sm:text-[16px] sm:mb-[15px]">
                Created many creative concepts
              </span>
              <h1 className="mb-[45px] text-shadow-large font-extrabold text-white text-[100px] tracking-[-4px] leading-[95px] font-serif uppercase mx-auto text-shadow lg:text-[90px] lg:leading-[90px] md:text-[70px] md:leading-[65px] sm:text-[45px] sm:mb-[30px] sm:tracking-[-1px] sm:leading-[43px] xs:tracking-[-1px] xs:w-[80%]">
                Creative elements
              </h1>
              <Link aria-label="home link" to="/" className="center-logo-btn text-[13px] tracking-[1px] text-sm py-[13px] px-[32px] leading-[19px] bg-[#000] inline-block text-white rounded-none uppercase w-auto font-serif font-medium bg-transparent border-2 border-transparent self-center hover:text-white">
                Discover Tour
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Parallax Section End */}

      {/* About Start */}
      <section className="py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row className="justify-center">
            <m.div className="flex flex-col md:mb-24 col-xl-3 col-lg-4 col-sm-7" {...fadeIn}>
              <div className="mb-[20px] md:text-center sm:mb-[10px]">
                <span className="font-serif text-md uppercase font-medium text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]">About company</span>
              </div>
              <h5 className="alt-font text-darkgray font-semibold font-serif mb-[20px] md:text-center md:mb-[30px] xs:w-[90%] xs:mx-auto">We combine design, thinking and technical</h5>
              <div className="mt-auto mx-auto mx-lg-0">
                <Buttons ariaLabel="link for" to="/" className="btn-fill btn-fancy rounded-none mt-[75px] tracking-[1px] font-medium font-serif uppercase md:my-0" themeColor="#232323" color="#fff" size="md" title="Discover litho" />
              </div>
            </m.div>
            <div className="col-xl-7 col-lg-8 offset-xl-2">
              <IconWithText grid="row-cols-1 row-cols-lg-2 row-cols-sm-2 gap-y-[60px] sm:gap-y-[30px] xs:gap-y-[40px]" theme="icon-with-text-01" data={IconWithTextData} animation={fadeIn} animationDelay={0.2} />
            </div>
          </Row>
        </Container>
      </section>
      {/* About End */}

      {/* Section Start */}
      <section className="bg-[#f7f8fc] py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Tab01 data={TabData01} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[100px] lg:py-[90px] md:py-[75px]">
        <Container className="text-center">
          <Counter as="h4" theme="counter-style-02" grid="row-cols-1 row-cols-md-4 row-cols-sm-2 items-center justify-center gap-y-10" className="text-black text-[40px]" data={CounterData} duration={2} />
        </Container>
      </section>
      {/* Section End */}

      {/* Blog Start */}
      <m.section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px] border-t border-inherit" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col xl={5} lg={6} md={8} className="mb-[82px] text-center sm:mb-[20px]" >
              <span className="font-serif font-medium text-md uppercase inline-block text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] mb-[20px] sm:mb-[15px]">get the latest insights</span>
              <h5 className="font-serif font-semibold text-darkgray -tracking-[1px] mb-0">Stay updated with the latest trends and business news</h5>
            </Col>
          </Row>
          <Row>
            <Col className="px-0">
              <BlogClassic pagination={false} grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={blogData.slice(0, 4)} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Blog End */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="bg-[#262b35] text-slateblue" />
      {/* Footer End */}

    </>
  );
};

export default CenterLogoPage;
