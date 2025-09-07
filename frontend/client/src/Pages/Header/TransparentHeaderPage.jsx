import React from "react";

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { Parallax } from "react-scroll-parallax";

// Components
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import Buttons from '../../Components/Button/Buttons'
import IconWithText from '../../Components/IconWithText/IconWithText'
import PortfolioClassic from "../../Components/Portfolio/PortfolioClassic";
import Testimonials from "../../Components/Testimonials/Testimonials";
import BlogClassic from "../../Components/Blogs/BlogClassic";
import CustomModal from '../../Components/CustomModal'
import FooterStyle01 from "../../Components/Footers/FooterStyle01";
import SideButtons from "../../Components/SideButtons";

// Functions
import { fadeIn, zoomIn } from "../../Functions/GlobalAnimations";

// Data
import { TestimonialsData03 } from "../../Components/Testimonials/TestimonialsData";
import { portfolioClassicData } from "../../Components/Portfolio/PortfolioData";
import { blogData } from "../../Components/Blogs/BlogData";

const IconWithTextData = [
  {
    icon: "line-icon-Money-Bag text-[#b7b7b7] text-[40px]",
    title: "Effective strategy",
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  },
  {
    icon: "line-icon-Gear-2 text-[40px] text-[#b7b7b7]",
    title: "Powerfull customize",
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  },
  {
    icon: "line-icon-Talk-Man text-[40px] text-[#b7b7b7]",
    title: "Customer satisfaction",
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  },
  {
    icon: "line-icon-Cursor-Click2 text-[40px] text-[#b7b7b7]",
    title: "No coding required",
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  },
];

const TransparentHeaderPage = (props) => {
  return (
    <div style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav theme="dark" expand="lg" className="py-[0px] lg:px-[15px] md:px-0" containerClass="sm:px-0">
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
          <Col className="col-auto text-right pe-0">
            <SearchBar className="pr-0 xs:pl-[15px]" />
            <HeaderLanguage className="xs:pl-[15px]" />
            <HeaderCart className="xs:pl-[15px]" style={{ "--base-color": "#0038e3" }} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}

      <SideButtons />

      {/* Parallax Scrolling Start */}
      <div className="full-screen landscape:md:h-[600px] md:flex md:items-center overflow-hidden relative">
        <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1080)` }}></Parallax>
        <div className="absolute h-full w-full opacity-50 top-0 left-0 bg-darkgray"></div>
        <Container className="relative">
          <Row className="justify-center lg:justify-start md:justify-center sm:justify-start items-center h-[100vh] md:flex-row  md:h-[600px] md:flex">
            <Col xl={5} lg={6} md={7} sm={10}>
              <h2 className="font-serif font-medium leading-[65px] tracking-[-1px] text-white opacity-[1] mb-[65px] md:leading-[65px] xs:leading-[50px] md:mb-[25px]">We provide
                <span className="text-gradient bg-gradient-to-r from-[#b783ff] via-[#e05fc4] to-[#ff798e] font-semibold inline-block">reliable business</span>consulting help
              </h2>
              <div className="font-serif text-md font-medium tracking-[2px] uppercase flex items-center opacity-60">
                <span className="w-[40px] h-[1px] bg-white mr-[25px]"></span>
                <span className="text-white inline-block">Solution for your business</span>
              </div>
            </Col>
            <Col xl={{ span: 4, offset: 3 }} lg={4} md={5} className="text-center flex justify-center md:mt-[70px]" >
              {/* Modal Component Start */}
              <CustomModal.Wrapper
                modalBtn={
                  <span className="cursor-pointer">
                    <span className="w-[120px] h-[120px] text-[34px] flex justify-center items-center rounded-[50%] border-white border-[3px] sm:w-[80px] sm:h-[80px] sm:text-[28px]">
                      <i className="icon-control-play ml-[10px] text-white"></i>
                    </span>
                  </span>
                } >
                <div className="w-[1020px] max-w-full relative rounded mx-auto">
                  <div className="fit-video">
                    <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                  </div>
                </div>
              </CustomModal.Wrapper>
              {/* Modal Component End */}
            </Col>
          </Row>
        </Container>
      </div>
      {/* Parallax Scrolling End */}

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
                <Buttons ariaLabel="link for" to="/" className="btn-fill btn-fancy rounded-none mt-[82px] tracking-[1px] font-medium font-serif uppercase md:my-0" themeColor="#232323" color="#fff" size="sm" title="Discover litho" />
              </div>
            </m.div>
            <div className="col-xl-7 col-lg-8 offset-xl-2">
              <IconWithText grid="row-cols-1 row-cols-lg-2 row-cols-sm-2 gap-y-[60px] sm:gap-y-[30px] xs:gap-y-[40px]" theme="icon-with-text-01" data={IconWithTextData} animation={fadeIn} animationDelay={0.2} />
            </div>
          </Row>
        </Container>
      </section>
      {/* About End */}

      {/* Portfolio Start */}
      <m.section className="bg-[#f7f8fc] py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col xl={5} lg={6} md={8} className="font-serif text-center mb-[95px] md:mb-[75px]">
              <span className="text-md font-serif font-medium uppercase inline-block text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] mb-[15px]">recent portfolio</span>
              <h5 className="text-darkgray font-semibold font-serif -tracking-[1px] mb-0">Hand crafted pixel perfect designs for your projects</h5>
            </Col>
          </Row>
        </Container>
        <Container fluid className="px-[6rem] md:px-[2rem] sm:px-[8px] xs:px-0">
          <PortfolioClassic
            className="m-0"
            overlay={["#0039e3", "#4132e0", "#5e28dd", "#741bd9", "#8600d4"]}
            grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col xs:mb-[30px]"
            data={portfolioClassicData.slice(0, 8)}
          />
        </Container>
      </m.section>
      {/* Portfolio End */}

      {/* Info Banner Start */}
      <m.section className="relative bg-cover bg-center py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" style={{ backgroundImage: `url("https://via.placeholder.com/1920x1100")` }} {...fadeIn}>
        <div className="absolute top-0 left-0 w-full h-full opacity-60 bg-darkslateblue"></div>
        <Container className="relative">
          <Row className="justify-center text-center">
            <Col xl={7} lg={8} md={10}>
              <div className="font-serif text-white">
                <m.span className="inline-block" {...zoomIn}>
                  {/* Modal Component Start */}
                  <CustomModal.Wrapper
                    modalBtn={
                      <Buttons
                        ariaLabel="modal link "
                        type="submit"
                        className="btn-sonar border-0 mx-auto mb-14"
                        themeColor="#3452ff"
                        color="#fff"
                        size="lg"
                        title={<i className="icon-control-play" />}
                      />
                    } >
                    <div className="w-[1020px] max-w-full relative rounded mx-auto">
                      <div className="fit-video">
                        <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                      </div>
                    </div>
                  </CustomModal.Wrapper>
                  {/* Modal Component End */}
                </m.span>
                <m.h4 className="font-semibold mb-[45px]" {...fadeIn}>Beautifully simple handcrafted templates for your website</m.h4>
                <m.span className="uppercase tracking-[1px]" {...fadeIn}>unlimited power and customization</m.span>
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Info Banner End */}

      {/* Section Start */}
      <section className="bg-[#f7f8fc] py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col xl={5} lg={6} sm={8} className="text-center mb-20">
              <span className="text-center font-serif text-md inline-block font-medium text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] uppercase mb-[20px] sm:mb-[15px]"> What people are saying </span>
              <h5 className="font-serif text-[2.3rem] justify-center text-center text-darkgray font-semibold -tracking-[1px]"> What our valuable customer are saying about us? </h5>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col className="col-12 col-md-12 col-sm-8">
              <Testimonials grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-10 justify-center" theme="testimonials-style-03" data={TestimonialsData03} animation={fadeIn} animationDelay={0.2} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Blog Start */}
      <m.section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col xl={5} lg={6} md={8} className="mb-[95px] text-center sm:mb-[20px]" >
              <span className="font-serif font-medium text-md uppercase inline-block text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] mb-[15px]">get the latest insights</span>
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

      {/* footer Start*/}
      <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
      {/* footer End */}
    </div>
  );
};

export default TransparentHeaderPage;
