import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { m } from "framer-motion";
import { Link } from 'react-router-dom'
import { SwiperSlide, Swiper } from 'swiper/react';
import { Parallax } from 'react-scroll-parallax'
import { Keyboard } from "swiper/modules";
import { Link as ScrollTo } from "react-scroll"

// Components
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import Buttons from '../../Components/Button/Buttons'
import Services from '../../Components/Services/Services';
import CustomModal from '../../Components/CustomModal'
import CustomIconWithText from '../../Components/CustomIconWithText/CustomIconWithText'
import { fadeIn } from '../../Functions/GlobalAnimations';
import PricingTable04 from '../../Components/PricingTable/PricingTable04';
import Testimonials from '../../Components/Testimonials/Testimonials';
import Clients from '../../Components/Clients/Clients';
import FooterStyle01 from '../../Components/Footers/FooterStyle01';
import Overlap from '../../Components/Overlap/Overlap';
import SideButtons from "../../Components/SideButtons";

// Data
import { TestimonialsData02 } from '../../Components/Testimonials/TestimonialsData';
import { CustomIconWithTextData2 } from '../../Components/CustomIconWithText/CustomIconWithTextData';
import { serviceData5 } from '../../Components/Services/ServicesData';
import { pricingTable04 } from '../../Components/PricingTable/PricingTableData';

const swiperData = [
  {
    img: "https://via.placeholder.com/800x548",
    title: "Brand identity",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
  },
  {
    img: "https://via.placeholder.com/800x548",
    title: "Exposure strategy",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
  },
  {
    img: "https://via.placeholder.com/800x548",
    title: "Multilingual portals",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
  }
]

const ClientData = [
  {
    img: "https://via.placeholder.com/120x60",
    link: "#"
  },
  {
    img: "https://via.placeholder.com/120x60",
    link: "#"
  },
  {
    img: "https://via.placeholder.com/120x60",
    link: "#"
  },
  {
    img: "https://via.placeholder.com/120x60",
    link: "#"
  },
  {
    img: "https://via.placeholder.com/120x60",
    link: "#"
  },
  {
    img: "https://via.placeholder.com/120x60",
    link: "#"
  }
]

const OurServicesPage = (props) => {
  const swiperRef = React.useRef(null)
  return (
    <div style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav fluid="fluid" theme="light" bg="white" menu="light" className="px-[35px] py-[0px] md:px-0" containerClass="sm:px-0">
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
            <SearchBar className="pr-0" />
            <HeaderLanguage />
            <HeaderCart />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <section className="bg-lightgray py-[42px] sm:py-[30px]">
        <Container>
          <Row className="items-center justify-center">
            <Col xl={8} lg={6} className="text-center font-serif flex items-center md:justify-center sm:block">
              <h1 className="text-lg text-darkgray font-medium mb-0 inline-block">Our services</h1>
              <span className="pl-[25px] ml-[30px] relative -top-[1px] text-[14px] leading-[25px] block md:inline-block sm:p-0 sm:m-0 sm:mt-[5px] before:absolute before:border-l-[2px] before:border-darkgray before:h-[12px] sm:before:border-0 before:top-[7px] before:left-[-2px] sm:block">Professional multi-purpose template</span>
            </Col>
            <Col xl={4} lg={6} className="text-center breadcrumb text-sm font-serif md:mt-[15px] justify-end md:justify-center mb-0">
              <ul>
                <li><Link aria-label="link" to="/">Home</Link></li>
                <li><Link aria-label="link" to="#" onClick={(e) => e.preventDefault()}>Pages</Link></li>
                <li>Our services</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] overflow-hidden lg:py-[90px] sm:py-[75px] xs:py-[50px]">
        <Container>
          <Row className="items-center justify-center">
            <Col lg={5} md={9} className="mb-[10px] md:mb-28">
              <span className="font-serif mb-[20px] text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] inline-block uppercase font-medium tracking-[1px]">Experience agency</span>
              <h4 className="font-serif font-semibold text-darkgray w-[95%]">We help our clients build value digital web solutions</h4>
              <p className="w-[80%] mb-[25px] lg:w-[95%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua printing typesetting.</p>
              <ScrollTo to="services" offset={0} delay={0} spy={true} smooth={true} duration={800}>
                <Buttons className="btn-fill mt-[15px] font-medium font-serif uppercase rounded md:mb-[15px]" icon="feather-arrow-right" iconPosition="after" themeColor="#232323" color="#fff" size="md" title="Our services" />
              </ScrollTo>
            </Col>
            <Col lg={7} md={9} xs={12} className="px-[55px] md:pr-[50px] md:pl-[5px]">
              <m.figure className="image-back-offset-shadow w-100">
                <m.img
                  className="rounded-[6px] w-auto h-auto"
                  src="https://via.placeholder.com/800x610"
                  alt="our-services"
                  width="572.5"
                  height="436.53"
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

      {/* Section Start */}
      <section className="bg-lightgray z-[1] relative py-[130px] lg:py-[90px] sm:py-[75px] xs:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col md={6} className="font-serif justify-center flex flex-col items-center mb-20 sm:mb-12">
              <span className="mb-[10px] inline-block uppercase font-medium text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] tracking-[1px]">Unlimited Possibilities</span>
              <h5 className="text-darkgray font-semibold -tracking-[1px]">Research Strategy</h5>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={12} md={10} xs={12} className="xs:px-0">
              <Services grid="row-cols-lg-3 row-cols-1 md:my-0 md:mx-auto gap-y-[15px]" theme='service-style-05' className="" data={serviceData5} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section id="services" className="relative py-[130px] lg:py-[90px] sm:py-[75px] xs:py-[50px]" {...fadeIn}>
        <Parallax className="lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[100vh]" translateY={[-50, 50]} style={{ backgroundImage: `url(/assets/img/webp/our-services-17.webp)` }}></Parallax>
        <Container>
          <Row>
            <Col xl={7} lg={8} md={12} className="md:mb-[40px]">
              <Row>
                <Col className="relative mb-12 lg:mb-[40px] sm:mb-[7.5rem] xs:mb-[4.5rem]">
                  <span className="font-serif mb-[20px] text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] inline-block uppercase font-medium tracking-[1px]">What we offer services</span>
                  <h5 className="font-serif font-semibold text-darkgray">Litho theme lets you easily create websites in a matter of minutes.</h5>
                  <p className="w-[80%] mb-[4.5rem] md:w-full">Lorem Ipsum is simply dummy text of the printing and typesetting industry ipsum has been the industry's standard dummy text when an unknown a galley of type and scrambled it to make a type book.</p>
                  <div className="flex">
                    <div onClick={() => swiperRef.current.swiper.slidePrev()} className="btn-slider-next transition-default rounded-full flex justify-center items-center text-black bg-transparent border-[1px] border-mediumgray right-inherit left-[65px] h-[40px] w-[40px] cursor-pointer hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:border-white hover:bg-white">
                      <button className="text-xmd leading-none"><i className="feather-arrow-left"></i></button>
                    </div>
                    <div onClick={() => swiperRef.current.swiper.slideNext()} className="btn-slider-prev transition-default rounded-full flex justify-center items-center text-black right-inherit border-[1px] border-mediumgray h-[40px] w-[40px] ml-[10px] cursor-pointer hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:border-white hover:bg-white" >
                      <button className="text-xmd leading-none"><i className="feather-arrow-right"></i></button>
                    </div>
                  </div>
                </Col>
                <Col>
                  <Swiper
                    ref={swiperRef}
                    effect="slide"
                    modules={[Keyboard]}
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    slidesPerView={1} loop={true}>
                    {
                      swiperData.map((item, i) => {
                        return (
                          <SwiperSlide key={i}>
                            <div className="border border-mediumgray rounded-[4px] overflow-hidden mr-[5px] xs:mr-0">
                              <Row className="g-0 row-cols-1 row-cols-sm-2">
                                <Col className="cover-background xs:h-[250px]" style={{ backgroundImage: `url(${item.img})` }}>
                                </Col>
                                <Col>
                                  <div className="p-16 lg:p-12">
                                    <span className="font-serif text-darkgray font-medium inline-block mb-[15px] text-xmd">{item.title}</span>
                                    <p className="mb-[25px]">{item.content}</p>
                                    <Buttons href="/page/about-us" className="btn-fill font-medium font-serif uppercase rounded md:mb-[15px]" themeColor="#232323" color="#fff" size="xs" title="read more" />
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </SwiperSlide>
                        )
                      })
                    }
                  </Swiper>
                </Col>
              </Row>
            </Col>
            <Col lg={4} md={12} xl={{ offset: 1 }}>
              <div className="sticky top-0">
                <div className="ourservice-list relative bg-gradient-to-bl from-[#741bd9] to-[#0039e3] w-full overflow-hidden rounded-[4px] p-16 lg:p-12 md:p-16">
                  <i className="line-icon-Cursor-Click2 text-[11rem] leading-[11rem]  text-darkgray opacity-20 absolute -top-[20px] -left-[30px]"></i>
                  <h6 className="font-serif font-medium text-white mb-[35px] sm:mb-[15px] relative z-[1]">Custom and bespoke services</h6>
                  <ul className="list-style-03 font-serif">
                    <li className="border-[#ffffff33] text-white !py-[10px] px-0 border-b mb-0">Brand identity</li>
                    <li className="border-[#ffffff33] text-white !py-[10px] px-0 border-b mb-0">Exposure strategy</li>
                    <li className="border-[#ffffff33] text-white !py-[10px] px-0 border-b mb-0">E-commerce website</li>
                    <li className="border-[#ffffff33] text-white !py-[10px] px-0 border-b mb-0">Multilingual portals</li>
                    <li className="border-[#ffffff33] text-white !py-[10px] px-0 border-b mb-0 pb-0">Packaging design</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="text-center relative grid-rows-3 grid-cols-2 py-[130px] opacity-[1] overflow-hidden bg-lightgray lg:py-[90px] sm:py-[75px] xs:py-[50px]" >
        <Container>
          <CustomIconWithText
            grid="row-cols-1 row-cols-lg-3 row-cols-sm-2"
            theme="custom-icon-with-text02"
            data={CustomIconWithTextData2}
            animationDelay={0.3}
            animation={fadeIn} />
        </Container>
      </section >
      {/* Section End */}

      {/* Section Start */}
      <m.section className="ourservice-pricingtable py-[130px] lg:py-[90px] sm:py-[75px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col md={6} className="font-serif text-center mb-20 sm:mb-12">
              <span className="mb-[10px] inline-block uppercase font-medium text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] tracking-[1px]">Simple Pricing</span>
              <h5 className="text-darkgray font-semibold -tracking-[1px]">Amazing Package</h5>
            </Col>
          </Row>
          <PricingTable04 grid="row-cols-1 row-cols-lg-3 gap-y-[30px] justify-center items-center" theme="pricing-table-style-04 col-12 col-lg-4 col-md-7" className="" data={pricingTable04} />
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[130px] pb-[190px] lg:pt-[90px] md:pb-[100px] sm:py-[75px] xs:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col md={6} className="text-center font-serif mb-20 sm:mb-12">
              <span className="mb-[10px] inline-block uppercase font-medium text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] tracking-[1px]">What people say</span>
              <h5 className="text-darkgray font-semibold -tracking-[1px]">Client Testimonials</h5>
            </Col>
          </Row>
          <Testimonials
            grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-10 justify-center mb-36 lg:mb-28 "
            theme='testimonials-style-02'
            data={TestimonialsData02}
            animation={fadeIn} />

          <Clients
            grid="row-cols-1 row-cols-lg-6 row-cols-md-3 row-cols-sm-2 gap-y-10 md:mt-12"
            theme="client-logo-style-04"
            data={ClientData}
            animation={fadeIn}
            className=""
          />
        </Container>
      </section>
      {/* Section End */}

      <m.section className="bg-[#262b35] sm:bg-lightgray" {...fadeIn}>
        <Container className="sm:pb-[50px]">
          <Row className="xs:mx-0">
            <Overlap className="relative bg-white rounded-[5px] px-[0px] py-[65px] md:p-[40px] xs:px-[20px] flex sm:flex sm:justify-center sm:items-center sm:flex-col">
              <Col lg={{ span: 5, offset: 1 }} md={7} sm={8} className="text-start sm:mb-[20px]">
                <h5 className="font-serif font-medium text-darkgray w-[95%] mb-0 lg:w-full sm:text-center">Litho is meant to simplify the website building.</h5>
              </Col>
              <Col lg={{ span: 4, offset: 2 }} md={5} sm={8} className="ourservice-start-your-project text-center flex items-center md:text-start sm:justify-center">
                {/* Modal Component Start */}
                <CustomModal.Wrapper
                  modalBtn={
                    <span className="inline-flex flex-row items-center justify-center">
                      <Buttons type="submit" className="mr-[20px] btn-sonar border-0" themeColor={["#e37be0", "#fa7cc1", "#ff85a6", "#ff9393"]} color="#fff" size="md" title={<i className="icon-control-play" />} />
                      <Buttons type="submit" className="font-semibold font-serif p-0 uppercase text-xmd btn-link after:h-[1px] md:text-md mb-0 after:bg-darkgray" size="xlg" color="#232323" title="Start your project" />
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
            </Overlap>
          </Row>
        </Container>
        {/* footer Start */}
        <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
        {/* footer End */}
      </m.section>
    </div >
  )
}

export default OurServicesPage