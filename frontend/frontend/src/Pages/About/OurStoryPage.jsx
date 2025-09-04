import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { fadeIn } from '../../Functions/GlobalAnimations';
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'
import Atropos from "atropos/react";
import { Parallax } from 'react-scroll-parallax';

// Components
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import Overlap from '../../Components/Overlap/Overlap'
import ProcessStep from '../../Components/ProcessStep/ProcessStep';
import FancyTextBox from '../../Components/FancyTextBox/FancyTextBox';
import Services from '../../Components/Services/Services'
import Buttons from '../../Components/Button/Buttons'
import Clients from '../../Components/Clients/Clients';
import TestimonialsCarousel09 from '../../Components/TestimonialCarousel/TestimonialsCarousel09';
import FooterStyle01 from '../../Components/Footers/FooterStyle01';
import SideButtons from "../../Components/SideButtons";

// Data
import { ClientData01 } from '../../Components/Clients/ClientsData';
import { TestimonialsCarouselData9 } from '../../Components/TestimonialCarousel/TestimonialsCarouselData';

const fancyTextBox = [
  {
    icon: {
      text: "2010",
      class: "text-gradient bg-gradient-to-r from-[#ff6557] to-[#ff367c]"
    },
    title: "Litho founded",
    description: "Lorem ipsum is simply dummy text the printing typesetting.",
  },
  {
    icon: {
      text: "2012",
      class: "text-gradient bg-gradient-to-r from-[#ff6557] to-[#ff367c]"
    },
    title: "Build new office",
    description: "Lorem ipsum is simply dummy text the printing typesetting.",
  },
  {
    icon: {
      text: "2014",
      class: "text-gradient bg-gradient-to-r from-[#ff6557] to-[#ff367c]"
    },
    title: "Expand team",
    description: "Lorem ipsum is simply dummy text the printing typesetting.",
  },
  {
    icon: {
      text: "2018",
      class: "text-gradient bg-gradient-to-r from-[#ff6557] to-[#ff367c]"
    },
    title: "Winning award",
    description: "Lorem ipsum is simply dummy text the printing typesetting.",
  }
]

const serviceData = [
  {
    img: "https://via.placeholder.com/800x548",
    icon: "ti-arrow-right",
    title: "Professional liability",
    content: "Lorem ipsum dolor sit amet, adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna.",
    linkTitle: "More info",
    link: "/page/what-we-offer"
  },
  {
    img: "https://via.placeholder.com/800x548",
    icon: "ti-arrow-right",
    title: "Dedicated to our clients",
    content: "Lorem ipsum dolor sit amet, adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna.",
    linkTitle: "More info",
    link: "/page/what-we-offer"
  },
  {
    img: "https://via.placeholder.com/800x548",
    icon: "ti-arrow-right",
    title: "Outstanding services",
    content: "Lorem ipsum dolor sit amet, adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna.",
    linkTitle: "More info",
    link: "/page/what-we-offer"
  }
]

const ProcessStepData = [
  {
    title: "Start market research",
    content: "Lorem ipsum is simply text of the printing and typesetting industry lorem Ipsum has been standard dummy",
  },
  {
    title: "Discussion of the idea",
    content: "Lorem ipsum is simply text of the printing and typesetting industry lorem Ipsum has been standard dummy",
  },
  {
    title: "Production planning",
    content: "Lorem ipsum is simply text of the printing and typesetting industry lorem Ipsum has been standard dummy",
  }
]

const OurStoryPage = (props) => {
  return (
    <div className="our-story-page" style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav fluid="fluid" theme="light" bg="white" menu="light" className="px-[35px] py-[0px] border-b border-b-[#0000001a] md:pl-[15px] md:pr-0 sm:pl-0" containerClass="md:pl-0 sm:px-0">
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
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
            <SearchBar className="xs:pl-[15px] pr-0" />
            <HeaderLanguage className="xs:pl-[15px]" />
            <HeaderCart className="xs:pl-[15px]" style={{ "--base-color": "#0038e3" }} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Parallax Scrolling Start */}
      <div className="pt-[130px] pb-[632px] lg:pt-[95px] lg:pb-[600px] md:pt-[70px] md:pb-[400px] sm:pt-[50px] sm:py-[70px] overflow-hidden relative">
        <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[100px] left-0 md:-top-[30px] w-full h-[100vh]" translateY={[-40, 40]} style={{ backgroundImage: `url(/assets/img/webp/our-story-bg.webp)` }}></Parallax>
        <Container>
          <Row xs={1} className="justify-center">
            <Col xl={8} lg={10} className="text-center">
              <div className="w-[40px] h-[2px] bg-gradient-to-tr from-[#ff6557] to-[#ff367c] transform rotate-90 my-[30px] inline-block"></div>
              <h3 className="font-serif font-medium text-darkgray -tracking-[1px] relative mb-0">We focus on creative and <span className="text-gradient bg-gradient-to-tr from-[#ff6557] to-[#ff367c] font-semibold">strategically</span> driven <span className="text-gradient bg-gradient-to-tr from-[#ff6557] to-[#ff367c] font-semibold">innovative</span></h3>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Parallax Scrolling End */}

      {/* Section Start */}
      <section className="pb-[130px] lg:pb-[95px] md:pb-[70px] sm:py-[50px] bg-gradient-to-tr from-[#556fff] via-[#e05fc4] to-[#f767a6]">
        <Container className="md:mb-[70px] sm:mb-20">
          <Row className="justify-center">
            <Overlap value={70} className="row">
              <Col className="col-12 col-md-12 z-0 p-[0px] lg:p-[15px] md:p-[0px] text-center">
                <span className="mb-[-60px] relative uppercase text-[11rem] leading-[11rem] md:text-[9rem] sm:hidden font-serif text-center none md:block font-bold opacity-10 -z-[1]">our story</span>
                <Atropos
                  highlight={false}
                  stretchX={0}
                  stretchY={0}
                  rotateTouch={false}
                  className={`my-atropos -top-[7%] md:top-0 w-full`}
                >
                  <img loading="lazy" src="https://via.placeholder.com/1170x650" className="relative z-10 rounded-[6px]" alt="" data-no-retina="" />
                </Atropos>
              </Col>
            </Overlap>
          </Row>
        </Container>
        <Container>
          <Row className="justify-center">
            <Col md={12} sm={8}>
              <ProcessStep theme="process-step-style-05 md:px-0 sm:mb-8" className="our-story-process-step-style overflow-hidden sm:inline-block text-center text-[#fff]" data={ProcessStepData} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[130px] lg:py-[95px] md:py-[70px] sm:py-[50px] our-story-fancy-text-box">
        <Container>
          <Row className="text-center justify-center">
            <Col md={6} className="col-12 text-center mb-[4.5rem]">
              <span className="font-serif mb-[10px] block uppercase text-md font-medium">How to expand business</span>
              <h5 className="font-serif text-darkgray font-medium mb-[25px] -tracking-[1px] xs:mb-[15px]">Simple process cycle</h5>
            </Col>
          </Row>
          <FancyTextBox
            grid="row-cols-1 row-cols-lg-2 gap-y-10 lg:gap-y-[30px] xs:gap-y-[15px]"
            className="col-12 col-lg-6 col-md-9 col-sm-10"
            theme="fancy-text-box-03"
            data={fancyTextBox}
            animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[95px] md:py-[70px] sm:py-[50px] relative overflow-visible">
        <Container>
          <Row className="items-center">
            <m.div className="col-lg-6 relative mt-[70px] lg:mt-[30px] md:mb-[50px]" {...fadeIn}>
              <div className="relative">
                <Parallax className="lg-no-parallax w-[70%] rounded-[6px] lg:relative lg:!top-[-20px]" speed={0}>
                  <div className="absolute top-0 left-0 w-full h-full rounded-[6px] opacity-50 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <img loading="lazy" src="https://via.placeholder.com/800x945" className="rounded-[6px] w-full" width="394.8" height="466.34" alt="our-process" />
                </Parallax>
                <Parallax className="lg-no-parallax flex rounded-[6px] justify-center items-center w-[70%] bg-no-repeat absolute bottom-0 right-[15px] lg:!top-[20px] lg:ml-auto" speed={20}>
                  <img loading="lazy" src="https://via.placeholder.com/800x945" className="rounded-[6px]" width="394.8" height="466.34" alt="our-process" />
                </Parallax>
              </div>
            </m.div>
            <m.div className="col-lg-5 offset-lg-1" {...{ ...fadeIn, transition: { delay: 0.5 } }}>
              <div className="font-serif text-xmd font-medium mb-[30px]">
                <span className="w-[50px] h-[1px] bg-fastblue inline-block align-middle mr-[20px]"></span>
                <span className="text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] inline-block">Looking for interface expertise?</span></div>
              <h5 className="font-serif text-darkgray font-medium mb-[30px] w-full">We design brand, digital experience that engaged the right customers</h5>
              <p className="w-[95%] mb-[35px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud exercitation ullamco.</p>
              <div className="xs:flex">
                <Buttons to="/page/our-services/" className="mr-[20px] xs:mr-[10px] font-medium rounded-none font-serif uppercase hover:text-darkgray btn-slide-filling-right bg-gradient-to-r from-darkgray to-darkgray" size="md" color="#fff" themeColor="#fff" title="DISCOVER LITHO" />
                <Buttons to="/page/what-we-offer" className="font-medium rounded-none font-serif uppercase hover:text-white bg-transparent btn-slide-right" color="#232323" size="md" themeColor="#232323" title="READ MORE" />
              </div>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[95px] md:py-[70px] sm:py-[50px]py-[130px] sm:py-[50px] bg-lightgray">
        <Container>
          <Row className="justify-center">
            <Col md={6} className="col-12 text-center mb-[4.5rem]">
              <span className="font-serif mb-[10px] block uppercase text-md font-medium">WHAT WE OFFER SERVICES</span>
              <h5 className="font-serif text-darkgray font-medium -tracking-[1px] mb-[15px]">Amazing performance</h5>
            </Col>
          </Row>
          <Services grid="row-cols-1 row-cols-lg-3 row-cols-md-2 justify-center gap-y-10 sm:gap-y-[15px]" theme='service-style-02' className="" data={serviceData} animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[8%] xs:py-[50px] relative bg-cover overflow-hidden bg-fixed bg-no-repeat bg-center lg:bg-local" style={{ backgroundImage: "url(https://via.placeholder.com/1920x1120)" }}>
        <div className="absolute h-full w-full opacity-75 top-0 left-0 bg-gradient-to-tr from-[#0039e3] via-[#5e28dd] to-[#8600d4]"></div>
        <Container>
          <Row className="row justify-center">
            <Col xl={7} lg={8} md={10} className="relative text-center">
              <h3 className="font-serif text-white font-semibold mb-[35px]">Create your own website with a bundle of template</h3>
              <p className="text-white opacity-70 font-serif text-lg md:text-xmd md:leading-[22px] w-[80%] mx-auto leading-[32px] mb-[45px] sm:w-full">Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore.</p>
              <Buttons to="/page/contact-classic" className="btn-fill drop-shadow-md font-medium font-serif uppercase rounded-[50px] btn-shadow text-[15px] md:mb-[15px]" size="lg" themeColor="#fff" color="#000" title="Get Started Now" />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[100px] lg:py-[95px] md:py-[80px] sm:py-[50px] xs:py-[50px]">
        <Container>
          <Clients
            grid="row-cols-1 row-cols-lg-4 row-cols-md-2 row-cols-sm-2"
            theme="client-logo-style-01"
            data={ClientData01.slice(0, 4)}
            animation={fadeIn}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="bg-lightgray py-[130px] lg:py-[95px] md:py-[70px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col xl={6} lg={7} md={8} className="relative move-black">
              <TestimonialsCarousel09
                data={TestimonialsCarouselData9}
                className="our-story-testimonial"
                carouselOption={{
                  slidesPerView: 1,
                  loop: true,
                  navigation: true
                }}
              />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="bg-[#262b35] text-slateblue" />
      {/* Footer End */}
    </div>
  )
}

export default OurStoryPage