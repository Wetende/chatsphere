import React from 'react'

// Components
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import { fadeIn } from '../../Functions/GlobalAnimations'
import Buttons from '../../Components/Button/Buttons'
import Clients from '../../Components/Clients/Clients'
import FancyTextBox from '../../Components/FancyTextBox/FancyTextBox'
import Team from '../../Components/Team/Team'
import FooterStyle01 from '../../Components/Footers/FooterStyle01'
import IconWithText from '../../Components/IconWithText/IconWithText'
import Lists from '../../Components/Lists/Lists'
import Counter from '../../Components/Counters/Counter'
import Overlap from '../../Components/Overlap/Overlap'
import CustomModal from '../../Components/CustomModal'
import SideButtons from "../../Components/SideButtons";

// Libraries
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Col, Container, Row, Navbar } from 'react-bootstrap'
import { Parallax } from 'react-scroll-parallax'
import { Swiper, SwiperSlide } from "swiper/react";
import { m } from 'framer-motion'
import { Link as ScrollTo } from "react-scroll"

// Data
import { ClientData01 } from "../../Components/Clients/ClientsData";
import { fancyTextBox04 } from '../../Components/FancyTextBox/FancyTextBoxData';
import { TeamData04 } from '../../Components/Team/TeamData';

const TestimonialsCarouselData = [
  {
    img: "https://via.placeholder.com/800x622",
    title: "Unlimited power customization",
    number: "01",
    content: "Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt elit.",
  },
  {
    img: "https://via.placeholder.com/800x622",
    title: "Powerful creatives designer",
    number: "02",
    content: "Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt elit.",
  },
  {
    img: "https://via.placeholder.com/800x622",
    title: "Advanced customization options",
    number: "03",
    content: "Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt elit.",
  },
]

const ListData = [
  {
    icon: "feather-arrow-right-circle",
    content: "Beautiful and easy to understand animations"
  },
  {
    icon: "feather-arrow-right-circle",
    content: "Theme advantages are pixel perfect design",
  },
  {
    icon: "feather-arrow-right-circle",
    content: "Find more creative ideas for your projects",
  },
]

const CounterData05 = [
  {
    number: {
      text: "1227",
      class: "text-fastblue"
    },
    title: "Winning awards",
    content: "For creative design",
  },
  {
    number: {
      text: "1947",
      class: "text-fastblue"
    },
    title: "Working hours",
    content: "Desperate for work",
  },
  {
    number: {
      text: "1587",
      class: "text-fastblue"
    },
    title: "Happy clients",
    content: "We love clients",
  },
]
const IconWithTextData = [
  {
    icon: "line-icon-Navigation-LeftWindow text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]",
    title: "Powerfull theme options",
    content: "Lorem ipsum is simply dummy text of the printing typesetting lorem ipsum been text. Adipiscing eiusmod tempor incididunt magna.",
  },
  {
    icon: "line-icon-Cursor-Click2 text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]",
    title: "Unlimited layouts and styles",
    content: "Lorem ipsum is simply dummy text of the printing typesetting lorem ipsum been text. Adipiscing eiusmod tempor incididunt magna.",
  },
  {
    icon: "line-icon-Archery-2 text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]",
    title: "Developing an effective strategy",
    content: "Lorem ipsum is simply dummy text of the printing typesetting lorem ipsum been text. Adipiscing eiusmod tempor incididunt magna.",
  },
  {
    icon: "line-icon-Female text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]",
    title: "Automated testing and support",
    content: "Lorem ipsum is simply dummy text of the printing typesetting lorem ipsum been text. Adipiscing eiusmod tempor incididunt magna.",
  },
]
const AboutUsPage = (props) => {

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
      <div className="h-[660px] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] flex items-center overflow-hidden relative">
        <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[0px] left-0 w-full h-[100vh]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
        <div className="absolute h-full w-full opacity-50 top-0 left-0 bg-darkgray"></div>
        <Container>
          <Row className="items-center justify-center">
            <Col md={8} xl={6} lg={7} sm={9} className="relative text-center">
              <h1 className="inline-block text-white opacity-60 mb-[20px] text-xmd leading-[20px] -tracking-[.5px] font-serif">About our company</h1>
              <h2 className="font-serif text-white -tracking-[1px] text-[3.9rem] font-medium mb-0 sm:-tracking-[1px]">we are a creative design studio</h2>
            </Col>
            <ScrollTo to="about" offset={0} delay={0} spy={true} smooth={true} duration={800} className="absolute bottom-[50px] left-1/2 w-auto inline-block p-0 -translate-x-1/2 sm:bottom-7 xs:bottom-[4.5rem] cursor-pointer">
              <i className="ti-arrow-down text-lg leading-[1] text-white bg-[#000000b3] p-[15px] xs:p-[10px] rounded-full flex justify-center items-center"></i>
            </ScrollTo>
          </Row>
        </Container>
      </div>
      {/* Parallax Scrolling End */}

      {/* Section Start */}
      <section id="about" className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="font-serif">
            <Col lg={4} className="pe-lg-0 flex md:mb-[30px]">
              <div className="w-full md:h-[700px] sm:h-[550px] xs:h-[450px] cover-background" style={{ backgroundImage: "url('https://via.placeholder.com/800x1000') " }}></div>
            </Col>
            <Col lg={4} md={6} className="ps-lg-0 flex items-center sm:mb-[30px]">
              <div className="justify-center h-full w-full flex flex-col items-start bg-fastblue px-[5.5rem] lg:px-[3rem] md:p-16">
                <span className="text-xlg lg:text-lg lg:leading-[26px] font-medium text-white mb-[20px] block">We started this company 10 years ago out of a desire to design and build amazing things.</span>
                <p className="text-white font-sans opacity-70 mb-[20px] xs:mb-[15px]">Lorem ipsum is simply dummy text of the printing and typeing industry. Lorem ipsum has been the industry's standard dummy text ever since text.</p>
                <Buttons href="/page/our-services" className="font-medium font-serif uppercase btn-link after:h-[2px] md:text-md md:mb-[15px] after:bg-[#fff] hover:text-[#fff]" color="#fff" title="Company overview" />
              </div>
            </Col>
            <Col lg={4} md={6} className="flex flex-col pr-0">
              <img src="https://via.placeholder.com/800x600" alt="about us" className="sm:w-full" />
              <div className="bg-white px-[3.5rem] py-[3rem] h-full lg:p-8 sm:p-16">
                <span className="text-darkgray font-medium mb-[10px] block">About digital agency</span>
                <p className="font-sans">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] xs:py-[50px]">
        <Container>
          <Row className="items-center justify-center">
            <Col xl={7} lg={8} md={7} sm={10} className="text-left sm:text-center sm:mb-[30px]">
              <h5 className="font-serif text-darkgray font-medium mb-0"><strong className="text-basecolor underline underline-offset-auto font-semibold">25 years</strong> we have created websites for global brands. Our success story.</h5>
            </Col>
            <Col xl={{ span: 3, offset: 2 }} lg={4} md={5} className="sm:text-center text-right">
              {/* Modal Component Start */}
              <CustomModal.Wrapper
                className="inline-block"
                modalBtn={
                  <span className="cursor-pointer font-serif inline-block py-[19px] px-[44px] text-white rounded about-us-bg-gradient">
                    <i className="fa fa-arrow-right line-icon-Video-5 text-[50px] inline-block ml-0 mr-[15px] align-middle"></i>
                    <div className="inline-block text-start text-md align-middle uppercase font-medium">
                      <span className="opacity-60 text-md block leading-[15px]">Story video</span>Watch</div></span>
                } >
                <div className="w-[1020px] max-w-full relative rounded mx-auto">
                  <div className="fit-video">
                    <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                  </div>
                </div>
              </CustomModal.Wrapper>
              {/* Modal Component End */}
            </Col>
            <Col className="mt-[8.5rem] sm:mt-20">
              <Clients
                grid="row-cols-1 row-cols-lg-4 row-cols-md-4 row-cols-sm-2 gap-y-10"
                theme="client-logo-style-01"
                data={ClientData01}
                animation={fadeIn}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] xs:py-[50px]">
        <Container>
          <Row className="justify-center flex">
            <m.div className="text-center mb-20 md:mb-12 col-lg-6 col-sm-8" {...fadeIn}>
              <span className="text-xmd mb-[15px] font-serif block w-full">Browse amazing social media features</span>
              <h5 className="font-serif text-darkgray font-medium mb-8 sm:w-full">We offer a full range of digital marketing services!</h5>
            </m.div>
            <Col xs={12} md={9} lg={12}>
              <IconWithText
                grid="row-cols-1 row-cols-md-1 row-cols-lg-2 gap-y-[15px]"
                theme="icon-with-text-02 about-us-icon-with-text"
                data={IconWithTextData}
                animation={fadeIn}
                animationDelay={0.1}
              />
            </Col>
          </Row>
        </Container>
      </section >
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[130px] lg:py-[90px] md:py-[75px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="items-center">
            <Col lg={6} className="p-0 md:mb-[50px] border-white border-[12px] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)]">
              <div className="relative">
                <Swiper
                  className="white-move swiper-pagination-medium h-full swiper-navigation-01 swiper-navigation-light"
                  modules={[Navigation]}
                  spaceBetween={30}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  navigation={true}>
                  {
                    TestimonialsCarouselData.map((item, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <div className="h-full shadow-lg bg-[#fff]">
                            <img src={item.img} alt="business" className="w-full" width="531" height="413" />
                          </div>
                        </SwiperSlide>
                      )
                    })
                  }
                </Swiper>
              </div>
            </Col>
            <Col lg={{ span: 5, offset: 1 }} >
              <h5 className="font-serif text-darkgray font-medium">It is teamwork that makes the dream work.</h5>
              <p>With years of experience in the website design and development industry ThemeZaa pride ourselves on creating unique, creative &amp; quality designs that are developed upon the latest coding.</p>
              <Lists theme="list-style-02" data={ListData} className="mb-12 mt-8 text-darkgray font-serif" animation={fadeIn} />
              <Buttons href="/page/contact-modern" className="btn-fill font-medium font-serif rounded-[4px] uppercase md:mb-[15px]" themeColor="#0038e3" color="#fff" size="md" title="Get Started Now" />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] xs:py-[50px]">
        <Container>
          <FancyTextBox
            grid="row-cols-1 row-cols-lg-2 gap-y-10 justify-center"
            themeColor="col-12 col-lg-4 col-md-6 col-md-9"
            theme="fancy-text-box-04"
            data={fancyTextBox04}
            animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-[#262b35] pt-[130px] pb-[140px] lg:pt-[90px] lg:pb-[195px] md:pt-[75px] sm:py-[50px] xs:py-0">
        <Container className="xs:px-0">
          <Row className="gx-0">
            <m.div
              className="col-12 col-lg-6 bg-cover bg-center md:h-[400px]"
              style={{ backgroundImage: `url("https://via.placeholder.com/900x900")` }}
              {...{ ...fadeIn, transition: { delay: 0.2 } }}
            ></m.div>
            <m.div
              className="col-12 p-0 col-lg-6"
              {...{ ...fadeIn, transition: { delay: 0.36 } }}
            >
              <m.div className="bg-gradient-to-tr from-[#556fff] via-[#ff77dd] to-[#ff798e] px-24 py-28 lg:py-20 lg:px-16 md:p-20 text-white text-center">
                {/* Modal Component Start */}
                <CustomModal.Wrapper
                  modalBtn={<Buttons type="submit" className="btn-sonar border-0 mx-auto mb-14 xs:mb-[50px]" themeColor="#fff" size="lg" title={<i className="icon-control-play text-gradient bg-gradient-to-tr from-[#b783ff] to-[#ff9393]" />} />}
                >
                  <div className="w-[1020px] max-w-full relative rounded mx-auto">
                    <div className="fit-video">
                      <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                    </div>
                  </div>
                </CustomModal.Wrapper>
                {/* Modal Component End */}
                <span className="text-xmd font-serif mb-[20px] block text-white opacity-70">
                  Powerful theme for creatives designer
                </span>
                <h5 className="font-serif text-white font-medium mb-[40px] xs:mb-[20px]">
                  We design brand, digital experience that engage the right
                  customers{" "}
                </h5>
                <Buttons
                  to="/page/contact-simple"
                  className="mx-3 font-medium font-serif uppercase btn-link after:h-[2px] md:text-md md:mb-[15px] after:bg-[#fff] hover:text-white"
                  color="#fff"
                  size="xl"
                  title="Get Started Now" />
              </m.div>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="pb-[130px] lg:pb-[90px] md:pb-[75px] xs:pb-[50px]">
        <Container fluid="md" className="sm:px-0">
          <Row className="lg:mx-[15px]">
            <Overlap className="bg-white p-16 shadow-[0_0_15px_rgba(0,0,0,0.1)] mb-[130px] md:mb-[80px] sm:shadow-none sm:border-b sm:mb-[50px]">
              <Counter
                theme="counter-style-05"
                grid="row-cols-1 row-cols-md-3 text-center gap-y-10"
                className="text-black"
                duration={2}
                data={CounterData05}
              />
            </Overlap>
          </Row>
        </Container>
        <Container>
          <Row className="justify-center">
            <m.div className="col-md-6 font-serif text-center mb-[4.5rem] sm:mb-12" {...fadeIn}>
              <span className="text-xmd">The designer team</span>
              <h5 className="text-darkgray font-medium">Creative people</h5>
            </m.div>
          </Row>
          <Team
            themeColor="light"
            overlay={["#b783fffa", "#e37be0fa", "#fa7cc1fa", "#ff85a6fa", "#ff9393fa"]}
            theme='team-style-04'
            data={TeamData04}
            grid="row-cols-1 row-cols-md-3 row-cols-sm-1"
            animation={fadeIn}
            animationDelay={0.3}
            carousel={false}
            className="team-about-us"
            carouselOption={{ slidesPerView: 3, spaceBetween: 30, loop: true, navigation: true, autoplay: { delay: 3000, disableOnInteraction: true }, pagination: { dynamicBullets: true, clickable: true } }} />
          <div className="bg-[#ededed] mb-24 mt-12 w-full h-[1px]"></div>
          <Row className="items-center justify-center">
            <Col xl={7} md={8} sm={10} className="text-start md:text-center sm:mb-[30px]">
              <h6 className="font-serif text-darkgray font-medium mb-0 md:w-[90%] sm:w-full sm:text-center"><strong className="font-semibold underline underline-offset-2">Creative thinkers,</strong> clever developer and marketing superheroes apply for work with us.</h6>
            </Col>
            <Col xl={5} md={4} className="text-center md:text-end flex justify-end sm:justify-center">
              <Buttons to="/page/contact-classic" className="font-medium rounded-[4px] font-serif uppercase hover:text-white bg-transparent btn-slide-right" size="lg" color="#0038e3" themeColor="#0038e3" title="JOIN THE TEAM" />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Footer start */}
      <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
      {/* Footer end */}
    </div>
  )
}

export default AboutUsPage