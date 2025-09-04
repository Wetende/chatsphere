import React from 'react'

// Libraries
import { Col, Container, Navbar, Row, Tab, Tabs } from 'react-bootstrap'
import { Autoplay } from "swiper/modules";
import { Link } from 'react-router-dom'
import { Parallax } from 'react-scroll-parallax'
import { Swiper, SwiperSlide } from "swiper/react";
import { m } from "framer-motion";

// Components
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../../Components/Header/Header'
import IconWithText from '../../Components/IconWithText/IconWithText'
import Accordions from '../../Components/Accordion/Accordion'
import FooterStyle01 from "../../Components/Footers/FooterStyle01";
import PricingTable01 from "../../Components/PricingTable/PricingTable01"
import SideButtons from "../../Components/SideButtons";
import { fadeIn } from '../../Functions/GlobalAnimations'

// Data
import { pricingTable03MonthData, pricingTable03YearData } from '../../Components/PricingTable/PricingTableData'


const IconWithTextData = [
  {
    icon: "line-icon-Shield text-gradient bg-gradient-to-r from-[#0039e3] via-[#5e28dd] via-[#741bd9] to-[#8600d4] text-[40px]",
    title: "Secure payments",
    content: "Lorem ipsum is simply dummy text of the printing typesetting",
  },
  {
    icon: "line-icon-Money-Bag text-gradient bg-gradient-to-r from-[#0039e3] via-[#5e28dd] via-[#741bd9] to-[#8600d4] text-[40px]",
    title: "Money back guarantee",
    content: "Lorem ipsum is simply dummy text of the printing typesetting",
  },
  {
    icon: "line-icon-Scale text-gradient bg-gradient-to-r from-[#0039e3] via-[#5e28dd] via-[#741bd9] to-[#8600d4] text-[40px]",
    title: "No hidden costs",
    content: "Lorem ipsum is simply dummy text of the printing typesetting",
  },
  {
    icon: "line-icon-Talk-Man text-gradient bg-gradient-to-r from-[#0039e3] via-[#5e28dd] via-[#741bd9] to-[#8600d4] text-[40px]",
    title: "Customer satisfaction",
    content: "Lorem ipsum is simply dummy text of the printing typesetting",
  }
]

const AccordionData = [
  {
    title: "What does royalty free mean?",
    content: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an took."
  },
  {
    title: "What do you mean by item and end product?",
    content: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an took."
  },
  {
    title: "What are some examples of permitted end products?",
    content: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an took."
  },
  {
    title: "Am i allowed to modify the item that i purchased?",
    content: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an took."
  },
  {
    title: "I'm not sure if my use is covered. what should i do?",
    content: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an took."
  }
]

const TestimonialsData = [
  {
    name: 'Herman Miller',
    content: 'There are design companies and then there are user experience, design, consulting, interface design.',
    img: 'https://via.placeholder.com/125x125',
    company: "ThemeZaa Design",
    rating: 5
  },
  {
    name: 'Alexander Harvard',
    content: 'I wanted to hire the best and after looking at several other companies, I knew Jacob was the perfect guy.',
    img: 'https://via.placeholder.com/125x125',
    company: "Microsoft Corporation",
    rating: 5
  },
  {
    name: 'Lindsay Swanson',
    content: 'Absolutely amazing theme, flexible and awesome design with possibilities. It s so easy to use and to customize.',
    img: 'https://via.placeholder.com/125x125',
    company: "Envato Market",
    rating: 5
  },
  {
    name: 'Jeremy Dupont',
    content: 'Simply the great designs and best theme for WooCommerce, loading fast, customisable and easy to use.',
    img: 'https://via.placeholder.com/125x125',
    company: "Google Marketing",
    rating: 5
  }
]

const PricingPackagesPage = (props) => {
  const swiperRef = React.useRef(null)

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
      {/* Parallax section End */}
      <m.div className="md:flex md:items-center overflow-hidden relative py-[80px] md:py-[40px]" {...fadeIn}>
        <Parallax className="lg-no-parallax cover-background absolute top-[0px] left-0 w-full h-[100vh]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
        <div className="absolute h-full w-full opacity-50 top-0 left-0 bg-darkgray"></div>
        <Container>
          <Row className="justify-center items-center h-[400px] xs:h-[280px]">
            <Col xl={6} lg={7} md={10} className="relative text-center text-white font-serif">
              <span className="opacity-60 mb-[5px] block xs:leading-[20px]">Unlimited customization possibilities</span>
              <h1 className="font-medium -tracking-[.5px] text-[42px] leading-[49px] mb-[10px] sm:text-[30px] sm:leading-[40px]">Pricing packages</h1>
            </Col>
          </Row>
        </Container>
      </m.div>
      {/* Parallax section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <IconWithText
            grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 text-center gap-y-[30px]"
            theme="icon-with-text-03"
            data={IconWithTextData}
            animation={fadeIn}
            animationDelay={0.2} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="pricingtable-pricingpackages py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] bg-lightgray" {...fadeIn}>
        <Container className='switch-tab'>
          <Row className="justify-center">
            <Col xl={5} lg={6} sm={7} className="text-center mb-14">
              <h5 className="font-serif font-medium text-darkgray">Choose one of our plans get access to plugins for free</h5>
            </Col>
          </Row>
          <Tabs className="mb-[105px] md:mb-[50px] sm:mb-[20px]"
            defaultActiveKey="monthly">
            <Tab eventKey="monthly" title="MONTHLY">
              <Row className="justify-center">
                <PricingTable01 grid="row-cols-1 row-cols-lg-3 justify-center items-center" theme="pricing-table-style-01 col-12 col-lg-4 col-md-8" className="" data={pricingTable03MonthData} themeColor="dark" />
              </Row>
            </Tab>
            <Tab eventKey="yearly" title="YEARLY">
              <Row className="justify-center">
                <PricingTable01 grid="row-cols-1 row-cols-lg-3 justify-center items-center" theme="pricing-table-style-01 col-12 col-lg-4 col-md-8" className="" data={pricingTable03YearData} themeColor="dark" />
              </Row>
            </Tab>
          </Tabs>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="overflow-hidden py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="items-end">
            <Col className="col-12 col-xl-3 col-lg-4 relative pt-8 md:mb-16">
              <span className="font-serif font-medium text-fastblue block mb-[20px] lg:mb-[15px]">Loved by our customers</span>
              <h6 className="font-serif font-medium text-darkgray -tracking-[.5px] mb-14 lg:w-[90%]">What our clients are saying about us?</h6>
              <div className="flex">
                <div onClick={() => swiperRef.current.swiper.slidePrev()} className="btn-slider-next rounded-full flex justify-center items-center text-black hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] bg-white right-inherit border border-mediumgray left-[65px] h-[40px] w-[40px] cursor-pointer" >
                  <button className="text-xmd"><i className="feather-arrow-left"></i></button>
                </div>
                <div onClick={() => swiperRef.current.swiper.slideNext()} className="btn-slider-prev rounded-full flex justify-center items-center text-black right-inherit h-[40px] w-[40px] hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-mediumgray ml-[10px] cursor-pointer" >
                  <button className="text-xmd"><i className="feather-arrow-right"></i></button>
                </div>
              </div>
            </Col>
            <Col className="col-12 col-lg-8 offset-xl-1">
              <Swiper
                className="black-move swiper-pagination-medium h-full min-w-[1170px] md:min-w-full"
                modules={[Autoplay]}
                ref={swiperRef}
                spaceBetween={30}
                slidesPerView={1}
                observer={true}
                observeParents={true}
                loop={true}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                }}
                keyboard={{
                  enabled: true,
                  onlyInViewport: true
                }}
                breakpoints={{ 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }}
              >
                {
                  TestimonialsData.map((item, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="py-12 px-12 px-mb-14 bg-white border border-mediumgray rounded-[6px] md:py-12 md:px-14">
                          <div className="flex">
                            <div className="mr-[20px]">
                              <img loading="lazy" className="rounded-full w-[65px] h-[65px]" src={item.img} alt="avtar" />
                            </div>
                            <div className="">
                              <div className="mb-[15px] text-xxs text-[#ff9c00]">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                              </div>
                              <div className="text-darkgray text-md font-serif font-medium leading-[12px]">{item.name}</div>
                              {item.company && <span className="text-sm">{item.company}</span>}
                            </div>
                          </div>
                          <div>
                            <p className="mt-[30px]">{item.content}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col lg={6} className="font-serif text-center mb-[6.5rem] md:mb-[5.5rem] sm:mb-12">
              <h5 className="font-medium text-darkgray mb-[15px] -tracking-[1px]">Frequently asked questions</h5>
              <span className="font-medium">Need something else? <Link aria-label="contact" to="/page/contact-classic" className="text-fastblue font-meidum text-decoration-line-bottom">Contact us</Link></span>
            </Col>
          </Row>
          <Row>
            <Col lg={4} md={5} className="sm:mb-[30px] text-center">
              <div className="feature-box bg-fastblue rounded-[8px] p-12 mb-[30px]">
                <div className="feature-box-icon">
                  <i className="line-icon-Mail-Read block text-[40px] text-white mb-[25px]"></i>
                </div>
                <div className="feature-box-content ">
                  <span className="text-white text-xmd block font-serif font-medium">How can we help you?</span>
                  <a aria-label="email" href="mailto:info@yourdomain.com" className="text-white font-serif text-decoration-line-bottom">Send us an email</a>
                </div>
              </div>
              <div className="feature-box bg-white rounded-[8px] p-12">
                <div className="feature-box-icon">
                  <i className="line-icon-Phone-2 block text-[40px] text-fastblue mb-[25px]"></i>
                </div>
                <div className="feature-box-content">
                  <span className="text-darkgray text-xmd block font-serif font-medium">Feel free to get in touch?</span>
                  <Link aria-label="call" to="#" className="font-serif text-decoration-line-bottom">Give us a call today</Link>
                </div>
              </div>
            </Col>
            <Col lg={{ offset: 1 }} md={7}>
              <Accordions
                theme="accordion-style-02"
                className=""
                animation={fadeIn}
                themeColor="light"
                data={AccordionData}
              />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
      {/* Footer End */}
    </div >
  )
}

export default PricingPackagesPage