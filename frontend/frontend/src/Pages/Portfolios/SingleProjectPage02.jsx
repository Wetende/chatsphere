import React from "react";

//Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { m } from "framer-motion";

// Components
import Buttons from '../../Components/Button/Buttons'
import FooterStyle01 from "../../Components/Footers/FooterStyle01";
import ImageGallery from "../../Components/ImageGallery/ImageGallery";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar, } from "../../Components/Header/Header";
import CustomModal from '../../Components/CustomModal'
import SideButtons from "../../Components/SideButtons";

// Function
import { fadeIn, fadeInRight } from "../../Functions/GlobalAnimations";

// Data
import { imageGalleryData01 } from "../../Components/ImageGallery/ImageGalleryData";

const SocialIconsData = [
  {
    color: "#3b5998",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f",
  },
  {
    color: "#fe1f49",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram",
  },
  {
    color: "#ea4c89",
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble",
  },
  {
    color: "#1769ff",
    link: "https://www.behance.net/",
    icon: "fab fa-behance",
  },
];

const SingleProjectPage02 = (props) => {
  return (
    <div style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav fluid="fluid" theme="light" bg="white" menu="light" className="px-[35px] py-[0px] md:px-0 border-b border-b-[#0000001a]" containerClass="sm:px-0">
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
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
      <section
        className="h-[600px] bg-no-repeat bg-cover overflow-hidden relative bg-center items-center py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] lg:h-[400px] flex"
        style={{
          backgroundImage: "url(https://via.placeholder.com/1920x609)",
        }}
      >
        <Container>
          <Row className="items-center justify-center">
            <Col
              lg={4}
              sm={5}
              className="col-9 text-center xs:mb-[30px] xs:flex xs:justify-center"
            >
              <img height="" width="" className="mx-auto" src="https://via.placeholder.com/349x160" alt="" />
            </Col>
            <Col lg={8} sm={7} className="col-10 sm:p-0">
              <div className="relative text-right sm:text-end xs:text-center sm:mx-[15px]">
                <div className="h-[1px] w-[90%] right-0 top-[30px] z-0 bg-[#986248] block absolute sm:block sm:w-full sm:top-[25px] xs:hidden xs:w-[95%] xs:right-[15px]"></div>
                <Link
                  to="#"
                  className="px-[35px] py-[20px] bg-[#986248] leading-[20px] text-white text-xmd relative inline-block text-right sm:py-[15px] sm:px-[25px]"
                >
                  www.sixthsense.com
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}
      {/* Section Start */}
      <section className="bg-lightgray py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row>
            <Col xl={4} lg={5} className="md:mb-[30px] xl:pr-0">
              <span className="mb-[20px] text-sm uppercase block md:mb-[10px]">
                About the project information
              </span>
              <h6 className="w-[85%] lg:w-[80%] tracking-[-1px] text-darkgray font-serif mb-0 xs:w-full">
                I always feel great when I don't have clothes on.
              </h6>
            </Col>
            <Col lg={2} xl={{ offset: 1 }} md={4} className="sm:mb-[20px]">
              <span className="mb-[20px] text-sm uppercase block md:mb-[10px]">
                Awards
              </span>
              <span className="w-[85%] md:w-[75%] xs:w-full leading-[28px] text-darkgray text-xmd font-serif block">
                Best website design 2020
              </span>
            </Col>
            <Col lg={2} md={4} className="sm:mb-[20px]">
              <span className="mb-[20px] text-sm uppercase block md:mb-[10px]">
                Services
              </span>
              <span className="w-[85%] md:w-[60%] xs:w-full leading-[28px] text-darkgray text-xmd font-serif block">
                Web design and Branding{""}
              </span>
            </Col>
            <Col lg={3} md={4} className="">
              <span className="mb-[20px] text-sm uppercase block md:mb-[10px]">
                Client
              </span>
              <span className="w-[85%] md:w-[75%] xs:w-full leading-[28px] text-darkgray text-xmd font-serif block">
                Sixth sense fashion Indonesia{""}
              </span>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="overflow-visible px-[8%] relative py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] xl:px-[5%] lg:px-[3%] xs:px-[15px]">
        <Container fluid>
          <Row>
            <Col
              className="h-[800px] relative bg-cover overflow-hidden bg-center bg-no-repeat bg-fixed text-center xs:h-[300px] md:bg-scroll	md:h-[650px] sm:h-[500px]"
              style={{
                backgroundImage:
                  "url(https://via.placeholder.com/1920x1050)",
              }}
            ></Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="pb-[130px] overflow-hidden lg:pb-[90px] md:pb-[75px] sm:pb-[50px]">
        <Container>
          <Row>
            <m.div {...{ ...fadeIn }} className="col-12 col-lg-6 md:mb-[30px] xs:mb-[20px]">
              <h5 className="text-darkgray font-serif mb-0"> Fashion is a form of <span className="font-semibold">ugliness so intolerable</span> that we have to alter it every six months.</h5>
            </m.div>
            <m.div {...{ ...fadeIn, transition: { delay: 0.5 } }} className="col-12 col-lg-5 offset-lg-1">
              <p>
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry lorem Ipsum has been the industry's standard dummy text
                ever since when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </p>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="px-[8%] xl:px-[5%] lg:px-[3%] xs:px-0">
        <Container fluid>
          <Row className="justify-center">
            <Col
              className="h-[700px] bg-no-repeat bg-cover overflow-hidden relative bg-center md:h-[550px] sm:h-[350px]"
              style={{
                backgroundImage:
                  "url(https://via.placeholder.com/1570x700)",
              }}
            >
              <div className="font-serif text-white">
                <span className="inline-block">
                  {/* Modal Component Start */}
                  <CustomModal.Wrapper
                    className="flex absolute top-0 left-0 w-full h-full items-center justify-center"
                    modalBtn={<Buttons type="submit" className="btn-sonar border-0 mx-auto" themeColor="#986248" color="#fff" size="lg" title={<i className="icon-control-play" />} />} >
                    <div className="w-[1020px] max-w-full relative rounded mx-auto">
                      <div className="fit-video">
                        <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                      </div>
                    </div>
                  </CustomModal.Wrapper>
                  {/* Modal Component End */}
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row className="items-center">
            <m.div {...fadeInRight} className="col-12 col-xl-6 col-md-5 sm:mb-[30px]">
              <img height="" width="" src="https://via.placeholder.com/800x800" alt="" />
            </m.div>
            <Col xl={5} lg={{ span: 6, offset: 1 }} md={7}>
              <h5 className="text-darkgray font-serif">A woman carries her clothes but shoe <span className="font-medium">carries the woman</span></h5>
              <p className="mb-[4.5rem]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque ligula eros, sollicitudin sed orci ut, vehicula
                fringilla turpis. Quisque tincidunt nulla id suscipit sodales.
                Suspendisse potenti nam iaculis lectus id odio mollis porttitor.
              </p>
              <Row className="row-cols-1">
                <m.div {...fadeIn} className="col col-sm text-center xs:mb-[30px]">
                  <i className="line-icon-Blouse text-[40px] inline-block mb-[20px] text-[#986248] sm:mb-0"></i>
                  <span className="leading-[18px] font-medium text-sm font-serif uppercase block">
                    SMOOTH COTTON
                  </span>
                </m.div>
                <m.div {...{ ...fadeIn, transition: { delay: 0.5 } }} className="col col-sm offset-lg-1 text-center xs:mb-[30px]" >
                  <i className="line-icon-Leafs text-[40px] inline-block mb-[20px] text-[#986248] sm:mb-0"></i>
                  <span className="leading-[18px] font-medium text-sm font-serif uppercase block">
                    NATURAL FABRIC
                  </span>
                </m.div>
                <m.div {...{ ...fadeIn, transition: { delay: 0.6 } }} className="col col-sm offset-lg-1 text-center xs:mb-[30px]" >
                  <i className="line-icon-Polo-Shirt text-[40px] inline-block mb-[20px] text-[#986248] sm:mb-0"></i>
                  <span className="leading-[18px] font-medium text-sm font-serif uppercase block">
                    STRETCH FABRIC
                  </span>
                </m.div>
                <m.div {...{ ...fadeIn, transition: { delay: 0.7 } }} className="col col-sm offset-lg-1 text-center">
                  <i className="line-icon-Box-Open text-[40px] inline-block mb-[20px] text-[#986248] sm:mb-0"></i>
                  <span className="leading-[18px] font-medium text-sm font-serif uppercase block">
                    FABRIC PRINTING
                  </span>
                </m.div>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="px-[8%] py-0 overflow-hidden xl:px-[5%] lg:px-[3%] xs:px-[15px]">
        <Container fluid>
          <Row>
            <Col
              lg={3}
              sm={6}
              style={{
                backgroundImage:
                  "url(https://via.placeholder.com/800x1367)",
              }}
              className="h-[800px] bg-no-repeat bg-cover overflow-hidden relative bg-center lg:h-[450px] sm:h-[450px] xs:h-[650px] md:mb-[15px]"
            ></Col>
            <Col
              lg={3}
              sm={6}
              style={{
                backgroundImage:
                  "url(https://via.placeholder.com/800x1367)",
              }}
              className="h-[800px] bg-no-repeat bg-cover overflow-hidden relative bg-center lg:h-[450px] sm:h-[450px] xs:h-[650px] md:mb-[15px]"
            ></Col>
            <Col
              lg={6}
              style={{
                backgroundImage:
                  "url(https://via.placeholder.com/960x820)",
              }}
              className="h-[800px] bg-no-repeat bg-cover overflow-hidden relative bg-center lg:h-[450px]"
            ></Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="pt-[130px] lg:pt-[90px] md:pt-[75px] sm:pt-[50px]">
        <Container>
          <Row className="justify-center">
            <Col
              xl={6}
              lg={7}
              sm={8}
              className="mb-28 text-center px-[15px] md:mb-20"
            >
              <span className="mb-[15px] font-serif font-medium text-[#986248] text-md uppercase block">
                Stranger by his clothes
              </span>
              <h5 className="tracking-[-1px] text-darkgray font-serif mb-0">
                The fashionable woman wears clothes. The clothes don't wear her
              </h5>
            </Col>
          </Row>
          <Row lg={3} sm={2} className="row-cols-1 justify-center gap-y-[30px] xs:gap-y-[15px]">
            <m.div {...{ ...fadeInRight, transition: { duration: 0.8, delay: 0.6 } }}>
              <div className="bg-lightgray">
                <img height="" width=""
                  src="https://via.placeholder.com/800x651"
                  alt=""
                />
                <div className="p-14 md:p-[2.5rem] text-center relative">
                  <span className="mb-[10px] font-medium text-darkgray font-serif block">
                    Business card design
                  </span>
                  <p className="">
                    Lorem ipsum dolor amet consectetur adipiscing elit do
                    eiusmod tempor
                  </p>
                </div>
              </div>
            </m.div>
            <m.div {...{ ...fadeInRight, transition: { duration: 0.6, delay: 0.4 } }}>
              <div className="bg-lightgray">
                <img height="" width=""
                  src="https://via.placeholder.com/800x651"
                  alt=""
                />
                <div className="p-14 md:p-[2.5rem] text-center relative">
                  <span className="mb-[10px] font-medium text-darkgray font-serif block">
                    Folder and file design
                  </span>
                  <p className="">
                    Lorem ipsum dolor amet consectetur adipiscing elit do
                    eiusmod tempor
                  </p>
                </div>
              </div>
            </m.div>
            <m.div  {...{ ...fadeInRight, transition: { duration: 0.4, delay: 0.2 } }}>
              <div className="bg-lightgray">
                <img height="" width=""
                  src="https://via.placeholder.com/800x651"
                  alt=""
                />
                <div className="p-14 md:p-[2.5rem] text-center relative">
                  <span className="mb-[10px] font-medium text-darkgray font-serif block">
                    Brochure design
                  </span>
                  <p className="">
                    Lorem ipsum dolor amet consectetur adipiscing elit do
                    eiusmod tempor
                  </p>
                </div>
              </div>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container className="text-center">
          <span className="mb-[15px] font-medium text-darkgray text-sm font-serif uppercase inline-block">
            Share this project
          </span>
          <SocialIcons
            theme="social-icon-style-10"
            className="justify-center"
            data={SocialIconsData}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="px-[8%] xl:px-[5%] lg:px-[2%] xs:px-0">
        <Container fluid>
          <Row className="gx-0 !mx-[-15px]">
            <ImageGallery
              animation={fadeIn}
              theme="image-gallery-01"
              data={imageGalleryData01}
              overlay="#986248"
              className=""
              grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large text-center"
            />
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row>
            <Col className="text-center">
              <img height="" width="" src="https://via.placeholder.com/1570x497" alt="" />
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
                to="/portfolio/single-project-page-01"
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
                  <span className="text-sm inline-block md:hidden">Prev project</span>
                </div>
                <span className="portfolio_disc font-medium text-darkgray text-xlg font-serif block lg:text-[18px] lg:leading-[26px] md:text-left">
                  Model photography
                </span>
              </Link>
            </Col>
            <Col className="relative md:flex md:justify-end xs:block">
              <Link
                to="/portfolio/single-project-page-03"
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
                  <span className="text-sm inline-block md:hidden">Next project </span>
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
    </div >
  );
};

export default SingleProjectPage02;
