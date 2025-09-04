import React from "react";

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Parallax } from "react-scroll-parallax";
import { Link } from "react-router-dom";
import { m } from "framer-motion"

// Components
import { fadeIn } from "../../Functions/GlobalAnimations";
import Buttons from '../../Components/Button/Buttons'
import { Header, HeaderNav, Menu } from "../../Components/Header/Header";
import IconWithText from '../../Components/IconWithText/IconWithText'
import PortfolioClassic from "../../Components/Portfolio/PortfolioClassic";
import CustomModal from "../../Components/CustomModal";
import FooterStyle01 from "../../Components/Footers/FooterStyle01";
import SideButtons from "../../Components/SideButtons";

// Data
import { portfolioClassicData } from "../../Components/Portfolio/PortfolioData";

const IconWithTextData = [
  {
    icon: "line-icon-Money-Bag text-basecolor text-[40px]",
    title: "Effective strategy",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  },
  {
    icon: "line-icon-Gear-2 text-basecolor text-[40px]",
    title: "Powerfull customize",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  },
  {
    icon: "line-icon-Talk-Man text-basecolor text-[40px]",
    title: "Customer satisfaction",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  },
  {
    icon: "line-icon-Cursor-Click2 text-basecolor text-[40px]",
    title: "No coding required",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  },
];

const CenterNavigationPage = (props) => {
  return (
    <>
      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll" theme="light" bg="light" menu="light" className="border-b border-[rgba(255,255,255,.1)]">
        <HeaderNav fluid="fluid" theme="dark" menu="light" expand="lg" containerClass="sm:px-0" className="py-[0px] px-[35px] md:py-[18px] md:px-0">
          <Col sm={6} lg={2} className="col-auto me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <div className="order-last px-[15px] hidden md:block">
            <Navbar.Toggle className="ml-[10px]">
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
            </Navbar.Toggle>
          </div>
          <Navbar.Collapse className="col-auto col-lg-8 justify-center">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto col-lg-2 text-end pe-0 sm:hidden">
            <Buttons ariaLabel="BUY NOW" target="_blank" href="https://1.envato.market/rQEmZd" className="font-medium font-serif uppercase rounded-[4px] header-btn btn-fill" themeColor="#fff" color="#232323" size="xs" title="BUY NOW" icon="fas fa-arrow-right" iconPosition="after" />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Parallax Scrolling Start */}
      <div className="full-screen landscape:md:h-[600px] md:flex md:items-center overflow-hidden relative">
        <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[1px] left-0 md:-top-[30px] w-full h-[100vh] landscape:md:h-[600px]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1080)` }}></Parallax>
        <Container className="relative h-full">
          <Row className="justify-center h-full">
            <Col lg={8} md={9} sm={10} xs={12} className="flex text-center flex-col justify-center py-32">
              <span className="font-serif tracking-[5px] text-white uppercase font-medium mb-[35px] block sm:text-">
                London based highly
              </span>
              <h1 className="font-serif font-bold text-[130px] text-white text-shadow-double-large uppercase mb-0 leading-[120px] tracking-[-4px]  lg:text-[110px] lg:leading-[100px] md:text-[90px] md:leading-[85px] sm:text-[50px] sm:leading-[50px] sm:tracking-[-0.5px]">
                <span className="text-border text-border-width-2px fill-transparent block">
                  creative
                </span>
                agency
              </h1>
            </Col>
          </Row>

          {/* Modal Component Start */}
          <CustomModal.Wrapper
            modalBtn={
              <div className="cursor-pointer text-center absolute bottom-[50px] left-1/2 -translate-x-1/2 flex justify-center sm:bottom-[30px]">
                <span className="w-[120px]  text-[34px] flex justify-center items-center">
                  <i className="line-icon-Video-5 text-[50px] text-white p-[15px] xs:p-[10px] rounded w-full bottom-[50px]"></i>
                </span>
              </div>
            } >
            <div className="w-[1020px] max-w-full relative rounded mx-auto">
              <div className="fit-video">
                <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
              </div>
            </div>
          </CustomModal.Wrapper>
          {/* Modal Component End */}
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
              <span className="text-md font-serif font-medium uppercase inline-block text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] mb-[20px]">recent portfolio</span>
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

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
      {/* Footer End */}
    </>
  );
};

export default CenterNavigationPage;
