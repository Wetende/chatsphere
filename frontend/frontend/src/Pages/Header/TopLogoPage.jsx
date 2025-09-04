
import React from "react";

// Libraries
import { Navbar, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";
import { m } from "framer-motion";
import { Link as ScrollTo } from "react-scroll"

// Component
import { fadeIn } from "../../Functions/GlobalAnimations";
import Buttons from '../../Components/Button/Buttons'
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import CustomIconWithText from '../../Components/CustomIconWithText/CustomIconWithText'
import FooterStyle01 from "../../Components/Footers/FooterStyle01";
import Team from "../../Components/Team/Team";
import Header, { HeaderCart, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import CustomModal from '../../Components/CustomModal'
import SideButtons from "../../Components/SideButtons";

// Data
import { TeamData02 } from "../../Components/Team/TeamData";
import { CustomIconWithTextData2 } from "../../Components/CustomIconWithText/CustomIconWithTextData";
const SocialIconData = [
  {
    color: "#828282",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "#828282",
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  },
  {
    color: "#828282",
    link: "https://www.pinterest.com/",
    icon: "fab fa-pinterest-p"
  },
  {
    color: "#828282",
    link: "https://www.linkedin.com/",
    icon: "fab fa-linkedin-in"
  },
]

const TopLogoPage = (props) => {

  return (
    <div>
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} className="toplogo-header absolute top-0 left-0 w-full z-10">
        <HeaderNav
          fluid="fluid"
          theme="light"
          bg="white"
          expand="lg"
          className="px-0 py-0"
          containerClass="flex-col sm:px-0"
        >
          <div className="border-b md:border-0 bg-white py-[8px] md:py-[9px] w-full">
            <Col className="col-12 col-sm-12 col-lg-8 lg:mx-auto text-center flex items-center justify-between mx-auto">
              <Col className="col header-social-icon text-start d-lg-flex d-none ms-0 me-auto me-lg-0 border-0 p-0">
                <div className="md:hidden">
                  <SocialIcons
                    theme="social-icon-style-01"
                    size="xs"
                    iconColor="dark"
                    className="justify-start"
                    data={SocialIconData}
                  />
                </div>
              </Col>
              <div className="col d-lg-none flex ms-0 me-auto border-0 p-0">
                <Navbar.Toggle>
                  <span className="navbar-toggler-line"></span>
                  <span className="navbar-toggler-line"></span>
                  <span className="navbar-toggler-line"></span>
                  <span className="navbar-toggler-line"></span>
                </Navbar.Toggle>
              </div>
              <Col className="col navbar-brand padding-15px-tb mx-auto px-0">
                <Link aria-label="header logo" className="flex justify-center" to="/">
                  <Navbar.Brand className="inline-block p-0 m-0">
                    <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                    <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                    <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                  </Navbar.Brand>
                </Link>
              </Col>
              <Col className="col flex items-center justify-end ms-auto p-0">
                <SearchBar className="py-[9px] sm:pl-[15px] text-black pl-0" />
                <HeaderCart className="py-[9px] sm:pl-[15px] text-black" style={{ "--base-color": "#0038e3" }} />
              </Col>
            </Col>
          </div>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-center">
            <Menu {...props} />
          </Navbar.Collapse>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <div className="full-screen relative overflow-hidden landscape:md:h-[600px]">
        <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[0px] left-0 w-full h-[100vh] md:top-[-35px] landscape:md:h-[600px]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1080)` }}></Parallax>
        <div className="absolute top-0 left-0 h-full w-full bg-darkgray opacity-30"></div>
        <Container className="h-full relative landscape:md:h-[600px]">
          <Row className="h-full items-center">
            <Col xl={6} lg={7} sm={8} xs={12} className="justify-center items-center my-0 mx-auto relative text-center flex flex-col lg:px-0">
              {/* Modal Component Start */}
              <CustomModal.Wrapper
                className="justify-center flex"
                modalBtn={
                  <Buttons ariaLabel="model btn" type="submit" size="lg" className="btn-sonar mx-auto mb-[40px]" themeColor={["#8600d4", "#0039e3"]} color="#fff" title={<i className="icon-control-play" />} />
                } >
                <div className="w-[1020px] max-w-full relative rounded mx-auto">
                  <div className="fit-video">
                    <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                  </div>
                </div>
              </CustomModal.Wrapper>
              {/* Modal Component End */}
              <h2 className="font-semibold text-white font-serif text-center mb-0">Hand crafted pixel perfect designs</h2>
            </Col>
            <ScrollTo to="about" offset={0} delay={0} spy={true} smooth={true} duration={800} className="absolute bottom-[50px] left-1/2 -translate-x-1/2 w-auto cursor-pointer">
              <i className="ti-mouse icon-small text-white up-down-ani  text-[28px] inline-block"></i>
            </ScrollTo>
          </Row>
        </Container>
      </div>
      {/* Section End */}

      {/* Section Start */}
      <section id="about" className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row className="items-center md:justify-center">
            <Col xs={12} lg={5} md={9} className="lg:text-start md:mb-28 md:mx-auto md:text-center">
              <span className="inline-block mb-[20px] font-medium text-base font-serif uppercase text-start text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] md:block">
                EXPERIENCE AGENCY
              </span>
              <h4 className="mb-[25px] font-semibold text-darkgray font-serif mx-0 w-[95%] text-start lg:mb-[15px]">
                We help our clients build value digital web solutions
              </h4>
              <p className="w-[80%] lg:w-[95%] mb-[25px] sm:mb-[15px] text-start">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
                printing typesetting.
              </p>
              <div className="text-start">
                <Buttons
                  ariaLabel="our-services"
                  to="/page/our-services"
                  className="font-medium font-serif mt-[15px] uppercase btn-fill rounded-[4px]"
                  themeColor="#232323"
                  color="#fff"
                  size="md"
                  title="Our Services"
                  icon="feather-arrow-right"
                  iconPosition="after"
                />
              </div>
            </Col>
            <Col lg={7} md={9} xs={12} className="px-[55px] md:py-0 md:px-0 md:pl-[5px] sm:pr-[50px]">
              <m.figure className="image-back-offset-shadow w-100">
                <m.img
                  width={582.5}
                  height={44.16}
                  className="rounded-[6px] w-auto h-auto"
                  src="https://via.placeholder.com/800x610"
                  alt=""
                  data-no-retina=""
                  initial={{ opacity: 0, x: "0", y: "0" }}
                  whileInView={{ opacity: 1, x: "10px", y: "-20px" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, easing: "linear" }}
                />
                <m.span
                  className="rounded-[6px]"
                  {...{ ...fadeIn, animate: { x: "35px", y: "5px" } }}
                ></m.span>
              </m.figure>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Custom Icon With Text Start */}
      <section className="bg-lightgray text-center grid-rows-3 grid-cols-2 py-[130px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <CustomIconWithText
            grid="row-cols-1 row-cols-lg-3 row-cols-sm-2 gap-y-[10px]"
            theme="custom-icon-with-text02"
            data={CustomIconWithTextData2}
            animation={fadeIn}
          />
        </Container>
      </section>
      {/* Custom Icon With Text End */}

      {/* Team Style 02 Start*/}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row>
            <Col xs={12} className="text-center">
              <span className="inline-block mb-[5px] font-medium text-[15px] text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] font-serif uppercase">
                MEET OUR PEOPLE
              </span>
              <h6 className="text-darkgray font-semibold text-[2.85rem] leading-[3.4rem] font-serif mb-24">
                Creative People
              </h6>
            </Col>
            <Col xs={12} >
              <Team
                themeColor="dark"
                overlay={[
                  "#b783fff2",
                  "#e37be0f2",
                  "#fa7cc1f2",
                  "#ff85a6f2",
                  "#ff9393f2",
                ]}
                theme="team-style-02"
                data={TeamData02}
                grid="row-cols-1 row-cols-sm-2 row-cols-md-3 justify-center gap-y-10"
                className="justify-center"
                animation={fadeIn}
                carousel={false}
                carouselOption={{
                  slidesPerView: 3,
                  spaceBetween: 30,
                  loop: true,
                  navigation: true,
                  autoplay: { delay: 3000, disableOnInteraction: false },
                  pagination: { dynamicBullets: true, clickable: true },
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Team Style 02 End */}

      {/* Footer Style 01 Start */}
      <FooterStyle01 theme="dark" className="bg-[#262b35] text-slateblue" />
      {/* Footer Style 01 End */}
    </div>
  );
};

export default TopLogoPage;