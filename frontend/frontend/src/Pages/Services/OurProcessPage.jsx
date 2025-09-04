import React, { lazy } from 'react'

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Parallax } from 'react-scroll-parallax';
import { m } from "framer-motion";

// Components
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import Overlap from '../../Components/Overlap/Overlap';
import Accordions from '../../Components/Accordion/Accordion';
import Buttons from '../../Components/Button/Buttons'
import CustomModal from '../../Components/CustomModal'
import Clients from '../../Components/Clients/Clients';
import Counter from '../../Components/Counters/Counter'
import ProcessStep from '../../Components/ProcessStep/ProcessStep';
import Testimonials from '../../Components/Testimonials/Testimonials';
import { fadeIn, fadeInRight } from '../../Functions/GlobalAnimations';
import FooterStyle01 from '../../Components/Footers/FooterStyle01';
import SideButtons from "../../Components/SideButtons";

// Data
import { ClientData03 } from '../../Components/Clients/ClientsData';
import { CounterData02 } from '../../Components/Counters/CounterData';
import { IconWithTextData_11 } from '../../Components/IconWithText/IconWithTextData';
import { ProcessStepData01 } from '../../Components/ProcessStep/ProcessStepData';
import { TestimonialsData02 } from '../../Components/Testimonials/TestimonialsData';

const IconWithText = lazy(() => import('../../Components/IconWithText/IconWithText'))

const CounterData = [
  {
    number: {
      text: "3650"
    }
  }
]

const AccordionData = [
  {
    title: "What do you mean by item and end product?",
    content: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever when an unknown printer took a galley. Lorem ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    title: "What are some examples of permitted end products?",
    content: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever when an unknown printer took a galley. Lorem ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    title: "Am i allowed to modify the item that i purchased?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor incididunt ut labore et dolore ut enim ad minim veniam, nostrud exercitation. Lorem ipsum dolor sit amet, consectetur eiusmod tempor incididunt ut labore et dolore."
  },
]

const OurProcessPage = (props) => {
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
      {/* Parallax Section Start */}
      <div className="h-[660px] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] overflow-hidden relative">
        <div className='absolute top-0 left-0 w-full h-full bg-darkgray opacity-30 z-[1]'></div>
        <Parallax className="lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[100vh] z-0 lg:-top-[70px] md:h-[600px] md:-top-[50px] xs:h-[450px]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
        <Container className="h-full relative z-[2]">
          <Row className="justify-center h-full">
            <Col xl={6} lg={7} md={8} className="relative font-serif text-center flex justify-center flex-col">
              <h1 className="text-white opacity-60 mb-[20px] text-xmd leading-[20px]">Our business process</h1>
              <h2 className="text-white font-medium -tracking-[1px] mb-0">we provide high quality services</h2>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Parallax Section End */}

      {/* Section Start */}
      <div className="pt-[130px] pb-[310px] overflow-hidden relative lg:pt-[95px] lg:pb-[275px] md:py-[75px] sm:py-[50px]">
        <Parallax className="lg-no-parallax bg-cover absolute left-0 w-full h-full" translateY={[-40, 40]} style={{ backgroundImage: `url(/assets/img/webp/our-process-bg-2.webp)` }}></Parallax>
        <div className="top-0 left-0 w-full h-full absolute opacity-75 bg-white"></div>
        <Container>
          <Row className="justify-center">
            <Col md={6} className="relative lg:mx-auto sm:mb-[30px]">
              <div className="flex items-center font-serif text-xmd font-medium mb-[30px]">
                <span className="flex-shrink-0 w-[30px] h-[1px] bg-fastblue mr-[20px]"></span>
                <div className="flex-grow-1 text-fastblue">Walking is the best possible exercise</div>
              </div>
              <h5 className="font-serif font-medium text-darkgray m-0">Litho specializes in strategy, creativity design and innovative technology build.</h5>
            </Col>
            <Col lg={5} md={6} className="lg:mx-auto relative">
              <p className="w-[90%] mb-[45px] md:mb-[50px] xs:mb-[30px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit do eiusmod tempor incididunt ut labore et dolore magna Ut enim ad minim veniam, nostrud exercitation.</p>
              <div className="flex justify-start items-center">
                {/* Modal Component Start */}
                <CustomModal.Wrapper
                  modalBtn={<div className="flex items-center cursor-pointer">
                    <Buttons type="submit" className="btn-sonar border-0" themeColor="#0038e3" color="#fff" size="sm" title={<i className="icon-control-play !ml-[4px]" />} />
                    <span className="font-medium font-serif text-md text-darkgray uppercase border-b border-solid border-darkgray no-underline ml-4 hover:text-darkgray">WATCH A PROJECTS</span>
                  </div>
                  } >
                  <div className="w-[1020px] max-w-full relative rounded mx-auto">
                    <div className="fit-video">
                      <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                    </div>
                  </div>
                </CustomModal.Wrapper>
                {/* Modal Component End */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Section Start */}

      {/* Section Start */}
      <m.section className="overflow-visible bg-lightgray pb-[130px] lg:pb-[95px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Overlap className="mb-32 sm:mb-28 md:mt-0">
            <Row className="justify-center">
              <Col md={12} sm={8}>
                <IconWithText
                  grid="row-cols-1 row-cols-lg-3 row-cols-md-2 gap-y-10"
                  theme="icon-with-text-11"
                  data={IconWithTextData_11}
                  animationDelay={0.2}
                  animation={fadeIn} />
              </Col>
            </Row>
          </Overlap>
        </Container>
        <Container>
          <Row className="justify-center">
            <Col md={4} lg={{ offset: 1 }} className="flex items-center sm:mb-[10px] sm:justify-center">
              <span className="w-[30%] h-[1px] bg-fastblue mr-[25px] md:inline-block sm:hidden"></span>
              <Counter
                theme="counter-style-02"
                grid="row-cols-1 gap-y-10"
                className="text-darkgray"
                data={CounterData}
                duration={2} />
            </Col>
            <Col lg={6} sm={8} className="lg:flex lg:justify-center">
              <h6 className="font-serif font-medium text-darkgray inline-block w-[90%] mb-0 md:w-full sm:text-center">We started this company 10 years ago out of a desire to design and things.</h6>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[130px] relative pb-0 overflow-visible lg:py-[95px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="items-center">
            <Col lg={6} className="relative mt-[70px] lg:mt-[30px] md:mb-[50px]">
              <div className="relative">
                <Parallax className="lg-no-parallax w-[70%] rounded-[6px] lg:relative lg:!top-[-20px]" speed={0}>
                  <div className="absolute top-0 left-0 w-full h-full rounded-[6px] opacity-50 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <img loading="lazy" src="https://via.placeholder.com/800x945" className="rounded-[6px] w-full" width="394.8" height="466.34" alt="our-process" />
                </Parallax>
                <Parallax className="lg-no-parallax flex rounded-[6px] justify-center items-center w-[70%] bg-no-repeat absolute bottom-0 right-[15px] lg:!top-0 lg:ml-auto" speed={20}>
                  <img loading="lazy" src="https://via.placeholder.com/800x945" className="rounded-[6px] w-full" width="394.8" height="466.34" alt="our-process" />
                </Parallax>
              </div>
            </Col>
            <Col lg={{ span: 5, offset: 1 }}>
              <div className="font-serif text-xmd font-medium mb-[30px]">
                <span className="w-[30px] h-[1px] bg-fastblue inline-block align-middle mr-[20px]"></span>
                <span className="text-fastblue inline-block">Looking for interface expertise?</span></div>
              <h5 className="font-serif text-darkgray font-medium mb-[30px] w-[95%]">We design brand, digital experience that engaged the right customers</h5>
              <p className="w-[95%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud exercitation ullamco.</p>
              <div className="mt-[30px] inline-block lg:mt-[40px] md:mt-[35px] sm:mt-[30px]">
                <Buttons to="/page/who-we-are" className="mr-[20px] xs:mr-[8px] font-medium rounded-none font-serif uppercase hover:text-darkgray btn-slide-filling-right bg-gradient-to-r from-darkgray to-darkgray" size="md" color="#fff" themeColor="#fff" title="Discover Litho" />
                <Buttons to="/page/about-us" className="font-medium rounded-none font-serif uppercase hover:text-white bg-transparent btn-slide-right" size="md" color="#232323" themeColor="#232323" title="Read more" />
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Counter
            as="h4"
            theme="counter-style-02"
            grid="row-cols-1 row-cols-md-4 row-cols-sm-2 gap-y-10 items-center justify-center text-center"
            className="text-black text-[70px]"
            data={CounterData02}
            duration={2} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] bg-lightgray lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden">
        <Container>
          <Row className="justify-center">
            <Col xl={5} sm={8} className="text-center mb-24 font-serif sm:mb-12">
              <span className="text-xmd mb-[20px] block text-fastblue font-medium">Simple work process</span>
              <h5 className="text-darkgray font-medium inline-block">We provide high quality and cost effective services</h5>
            </Col>
            <ProcessStep grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-10" theme='process-step-style-01' className="" data={ProcessStepData01} animation={fadeIn} />
          </Row>
          <Row>
            <Col className="text-center mt-24 lg:mt-16 md:mt-[35px] xs:mt-[60px]">
              <Buttons href="/page/contact-us-modern" className="btn-fill shadow-md font-medium font-serif uppercase rounded-none btn-shadow !tracking-[0px]" size="lg" themeColor="#fff" color="#232323" title="Get started now" />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden">
        <Container>
          <Row className="items-center">
            <Col lg={6} className="md:mb-[50px]">
              <div className="-ml-[30vw] md:ml-0">
                <m.img width="1140" height="684" alt="our-process" src="/assets/img/webp/our-process-03.webp" {...fadeInRight} />
              </div>
            </Col>
            <m.div className="col-lg-5 offset-lg-1" {...fadeIn}>
              <h5 className="font-serif font-medium text-darkgray mb-[50px] xs:mb-[30px]">We are expert in search engine and social media optimization</h5>
              <div className="font-serif font-medium inline-block text-xmd mb-[15px]">
                <span className="w-[30px] h-[1px] inline-block align-middle bg-fastblue mr-[15px]"></span>
                <span className="text-fastblue inline-block">Unique designs</span></div>
              <p className="w-[75%] lg:w-[95%] mb-[25px] xs:mb-[15px]">Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor incididunt labore et dolore ut enim ad minim veniam nostrud.</p>
              <div className="font-serif font-medium inline-block text-xmd mb-[15px] mt-[20px]">
                <span className="w-[30px] h-[1px] inline-block align-middle bg-fastblue mr-[15px]"></span>
                <span className="text-fastblue inline-block">Creative concept designs</span></div>
              <p className="w-[75%] lg:w-[95%]">Lorem ipsum dolor sit amet, consectetur adipiscing do eiusmod tempor incididunt labore et dolore ut enim ad minim veniam nostrud.</p>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="p-0 bg-darkgray">
        <Container fluid>
          <Row>
            <Col lg={6} className="p-[8.5rem] lg:p-[5.5rem] xs:px-[15px] bg-no-repeat bg-[top_-45px_left]" style={{ backgroundImage: `url(/assets/img/webp/our-process-bg-4.webp)` }}>
              <h5 className="font-serif font-medium text-white mb-16">Don't miss this amazing big events conference and opportunities!</h5>
              <Accordions
                theme="accordion-style-02"
                className=""
                animation={fadeIn}
                themeColor="dark"
                data={AccordionData}
              />
            </Col>
            <Col style={{ backgroundImage: `url(https://via.placeholder.com/1890x1345)` }} className="cover-background md:h-[550px] relative sm:h-[400px] xs:h-[300px]">
              {/* Modal Component Start */}
              <CustomModal.Wrapper
                className="absolute top-0 left-0 flex h-full w-full justify-center items-center"
                modalBtn={
                  <Buttons type="submit" className="btn-sonar border-0" themeColor="#fff" size="lg" title={<i className="text-gradient bg-gradient-to-tr from-[#b783ff] to-[#ff9393] icon-control-play" />} />
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
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden">
        <Container>
          <Clients
            grid="row-cols-1 row-cols-md-4 row-cols-lg-4 row-cols-sm-2"
            theme="client-logo-style-03"
            data={ClientData03}
            animation={fadeIn}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start*/}
      <m.section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden bg-lightgray"{...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col lg={6} sm={8} xl={5} className="text-center mb-24 md-mb-20 sm:mb-12">
              <span className="font-serif text-xmd mb-[20px] block text-fastblue font-medium">What people say</span>
              <h5 className="font-serif text-darkgray font-medium">Perfect design and code delivered for your projects</h5>
            </Col>
            <Testimonials
              carousel={true}
              carouselOption={{
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                navigation: false,
                autoplay: { delay: 4500, disableOnInteraction: false },
                pagination: { dynamicBullets: true, clickable: true },
                breakpoints: { 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } },
                keyboard: { enabled: true, onlyInViewport: true }
              }}
              className="black-move swiper-pagination-dark swiper-pagination-big pb-[70px]"
              grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-10 justify-center"
              theme='testimonials-style-02'
              data={TestimonialsData02}
            />
          </Row>
        </Container>
      </m.section>
      {/* Section End*/}

      {/* Parallax Section Start */}
      <m.div className="py-[130px] overflow-hidden relative lg:py-[95px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Parallax className="lg-no-parallax bg-center bg-cover absolute top-[-80px] left-0 w-full h-[75vh] mxl:h-[740px] sm:-top-[70px] mxl:top-0" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
        <div className="absolute top-0 left-0 w-full h-full opacity-80 bg-gradient-to-tr from-[#0039e3] to-[#8600d4]"></div>
        <Container>
          <Row className="items-center justify-center">
            <Col xl={7} md={8} xs={12} className="relative sm:text-center sm:mb-[30px]">
              <h4 className="font-serif font-semibold text-white mb-0">Gearing your company through an Innovative strategy</h4>
            </Col>
            <Col xl={5} md={4} className="relative text-right sm:text-center">
              <Buttons href="/" className="font-medium font-serif uppercase rounded-none" themeColor={["#b884fd", "#fd9395"]} size="lg" color="#fff" title="Download litho" />
            </Col>
          </Row>
        </Container>
      </m.div>
      {/* Parallax Section End */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="bg-[#262b35] text-slateblue overflow-visible" />
      {/* Footer End */}
    </div>
  )
}

export default OurProcessPage