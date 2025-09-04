import React, { lazy } from 'react'

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Parallax } from 'react-scroll-parallax';
import { m } from "framer-motion";
import { Link as ScrollTo } from "react-scroll"

// Components
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import { fadeIn, fadeInLeft } from '../../Functions/GlobalAnimations';
import { TextAnime } from '../../Components/FancyText/FancyText';
import Piechart from '../../Components/PieChart/PieChart'
import Buttons from '../../Components/Button/Buttons'
import Tab01 from '../../Components/Tab/Tab01'
import Counter from '../../Components/Counters/Counter'
import Lists from '../../Components/Lists/Lists';
import Team from '../../Components/Team/Team';
import Overlap from '../../Components/Overlap/Overlap';
import FooterStyle01 from '../../Components/Footers/FooterStyle01';
import CustomModal from '../../Components/CustomModal'
import SideButtons from "../../Components/SideButtons";
// Data
import { CounterData01 } from '../../Components/Counters/CounterData';
import { ListData01 } from '../../Components/Lists/ListsData';
import { PiechartData1 } from '../../Components/PieChart/PieChartData';
import { TeamData02 } from '../../Components/Team/TeamData';

const IconWithText = lazy(() => import('../../Components/IconWithText/IconWithText'))

const TabData = [
  {
    tabTitle: '01. PLANNING',
    subtitle: 'Unlimited power customization',
    title: 'We offer a full range of digital marketing services',
    img: 'https://via.placeholder.com/800x717',
    content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor incididunt ut labore et dolore magna ut enim ad minim veniam nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    buttonTitle: "Discover Litho",
    buttonLink: "#"
  },
  {
    tabTitle: '02. RESEARCH',
    subtitle: 'Powerful theme for creative designer',
    title: 'We are expert in search engine and social media',
    img: 'https://via.placeholder.com/800x717',
    content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor incididunt ut labore et dolore magna ut enim ad minim veniam nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    buttonTitle: "Discover Litho",
    buttonLink: "#",
  },
  {
    tabTitle: '03. TARGET',
    subtitle: ' Unlimited power customization',
    title: 'We created digital ideas that are bigger and bolder',
    img: 'https://via.placeholder.com/800x717',
    content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor incididunt ut labore et dolore magna ut enim ad minim veniam nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    buttonTitle: "Discover Litho",
    buttonLink: "#"
  },
  {
    tabTitle: '04. CAMPAIGN',
    subtitle: 'Browse amazing social media features',
    title: 'Litho is meant to simplify the website building',
    img: 'https://via.placeholder.com/800x717',
    content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor incididunt ut labore et dolore magna ut enim ad minim veniam nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    buttonTitle: "Discover Litho",
    buttonLink: "#"
  }
]

const IconWithTextData = [
  {
    title: "Powerfull Theme Options ",
    content: "Lorem ipsum is simply text of the printing and typesetting industry lorem ipsum has standard text",
    icon: "line-icon-Navigation-LeftWindow text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] via[#f767a6] to-[#ff798e]"
  },
  {
    title: "No coding required ",
    content: "Lorem ipsum is simply text of the printing and typesetting industry lorem ipsum has standard text",
    icon: "line-icon-Cursor-Click2 text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] via[#f767a6] to-[#ff798e]"
  },
  {
    title: "Easy to customize ",
    content: "Lorem ipsum is simply text of the printing and typesetting industry lorem ipsum has standard text",
    icon: "line-icon-Like-2 text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] via[#f767a6] to-[#ff798e]"
  },
  {
    title: "Customer satisfaction ",
    content: "Lorem ipsum is simply text of the printing and typesetting industry lorem ipsum has standard text",
    icon: "line-icon-Talk-Man text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] via[#f767a6] to-[#ff798e]"
  },
  {
    title: "Huge icon collection ",
    content: "Lorem ipsum is simply text of the printing and typesetting industry lorem ipsum has standard text",
    icon: "line-icon-Heart text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] via[#f767a6] to-[#ff798e]"
  },
  {
    title: "Advanced customization",
    content: "Lorem ipsum is simply text of the printing and typesetting industry lorem ipsum has standard text",
    icon: "line-icon-Gear-2 text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] via[#f767a6] to-[#ff798e]"
  },
]

const WhatWeOfferPage = (props) => {

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
      <div className="h-[660px] lg:h-[580px] md:h-[550px] sm:h-[500px] xs:h-[380px] overflow-hidden relative">
        <Parallax className="lg-no-parallax h-[100vh] w-full bg-cover bg-top cover-background absolute top-[0px] left-0 lg:h-[700px] lg:-top-[100px] md:h-[650px] sm:h-[550px] xs:h-[420px] xs:-top-[70px]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
        <div className="absolute h-full w-full opacity-50 top-0 left-0 bg-darkgray"></div>
        <Container className="h-full relative xs:px-[15px]">
          <Row className="justify-center h-full">
            <Col xl={6} lg={7} md={8} className="relative font-serif text-center text-white flex justify-center flex-col">
              <h1 className="opacity-60 mb-[20px] text-xmd leading-[20px]">What we offers</h1>
              <h2 className="font-medium -tracking-[1px] mb-0">we are a creative design studio</h2>
            </Col>
            <ScrollTo to="about" offset={0} delay={0} spy={true} smooth={true} duration={800} className="absolute bottom-[50px] left-1/2 w-auto inline-block -translate-x-1/2 cursor-pointer">
              <i className="ti-arrow-down text-lg leading-none text-white bg-[rgba(0,0,0,0.7)] p-[15px] xs:p-[10px] rounded-full flex justify-center items-center"></i>
            </ScrollTo>
          </Row>
        </Container>
      </div>
      {/* Parallax Scrolling End */}

      {/* Section Start */}
      <m.section id="about" className="py-[130px] lg:py-[95px] md:py-[75px] sm:py-[50px] overflow-hidden" {...fadeIn}>
        <Container>
          <Row className="items-center">
            <Col md={6} className="relative sm:mb-[30px]">
              <img src="https://via.placeholder.com/800x553" className="rounded-[5px] w-full" height="564" width="390" alt="what-we-offers" />
              {/* Modal Component Start */}
              <CustomModal.Wrapper
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                modalBtn={<Buttons type="submit" className="btn-sonar border-0" themeColor={["#b27cfd", "#ff9393"]} color="#fff" size="lg" title={<i className="icon-control-play" />} />} >
                <div className="w-[1020px] max-w-full relative rounded mx-auto">
                  <div className="fit-video">
                    <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                  </div>
                </div>
              </CustomModal.Wrapper>
              {/* Modal Component End */}

            </Col>
            <Col lg={{ span: 5, offset: 1 }} md={6} >
              <h5 className="font-serif font-medium text-darkgray w-[90%]">Litho is meant to simplify the website building</h5>
              <p className="w-[85%] mb-[25px] lg:w-[90%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit do eiusmod tempor incididunt ut labore et dolore magna Ut enim ad minim veniam, nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <div className="mt-[15px] sm:mt-0 inline-block">
                <Buttons to="/page/who-we-are" className="mr-[24px] font-medium rounded-none font-serif uppercase hover:text-darkgray btn-slide-filling-right bg-gradient-to-r from-darkgray to-darkgray sm:mr-[20px] xs:mr-[8px]" size="md" color="#fff" themeColor="#fff" title="Discover Litho" />
                <Buttons to="/page/about-us" className="font-medium rounded-none font-serif uppercase hover:text-white bg-transparent btn-slide-right" size="md" color="#232323" themeColor="#232323" title="Read more" />
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[95px] md:py-[75px] sm:py-[50px] xs:px-[15px] bg-lightgray">
        <Container>
          <IconWithText
            grid="row-cols-1 row-cols-lg-3 row-cols-sm-2"
            theme="icon-with-text-10"
            data={IconWithTextData}
            animation={fadeIn}
            animationDelay={0.1} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[130px] lg:py-[95px] md:py-[75px] sm:py-[50px] overflow-hidden" {...fadeIn}>
        <Container>
          <Row className="items-center">
            <Col md={5} className="sm:mb-[30px]">
              <h5 className="font-serif font-medium text-darkgray mb-0">We design brand, digital experience that engaged the right customers</h5>
            </Col>
            <Col lg={{ span: 6, offset: 1 }} md={7}>
              <Counter
                as="h5"
                theme="counter-style-01"
                grid="row-cols-1 row-cols-md-2 row-cols-sm-2 gap-y-10"
                className="text-black"
                duration={7}
                data={CounterData01.slice(0, 2)}
                postfix_sign="+" />
            </Col>
            <Col>
              <div className="w-full h-[1px] bg-mediumgray mt-28 mb-32 sm:my-20"></div>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={11}>
              <Tab01 data={TabData} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[95px] md:py-[75px] sm:py-[50px] bg-lightgray overflow-hidden">
        <Container>
          <Row className="items-center">
            <m.div className="md:mb-[50px] sm:mb-[30px] col-xl-4 col-lg-6 offset-xl-2 order-lg-2" {...{ ...fadeInLeft, transition: { delay: 0.5, ease: "circOut", duration: 0.6 } }}>
              <div className="-mr-[30vw] md:mr-0">
                <img src="/assets/img/webp/what-we-offers-03.webp" className="shadow-md rounded-[5px] overflow-hidden w-full" height="945" width="605.17" alt="what-we-offers" />
              </div>
            </m.div>
            <m.div className="pr-[5%] sm:pr-[15px] col-xl-5 col-lg-6 order-lg-1" {...fadeIn}>
              <h5 className="font-serif font-medium text-darkgray leading-[40px] mb-[40px]">
                <span className="initial p-0">We design brand, digital experience that engage the </span>
                <TextAnime duration={3000} color={["#b783ff", "#fa7cc1", "#ff9393"]} lineColor="#5971ff" className="text-left fancy-border-bottom !font-semibold text-darkgray" animation="slide" data={["right customers", "premium customers", "superior customers"]} />
              </h5>
              <p className="mb-[25px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit do eiusmod tempor incididunt ut labore et dolore magna Ut enim ad minim veniam, nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <Lists theme="list-style-01" className="" data={ListData01} animation={fadeIn} />
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[95px] md:py-[75px] sm:py-[50px] overflow-hidden">
        <Container>
          <Piechart
            className="text-center"
            grid="row-cols-1 row-cols-md-3 row-cols-sm-2 justify-center gap-y-10"
            theme="piechart-style-01"
            data={PiechartData1}
            pathColor={['#be85f5', '#fc9297']}
            trailColor="#f5f5f5"
            pathWidth={7}
            trailWidth={7}
            textStyle={{ fontSize: "32px", fill: "#232323" }}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Parallax Scrolling Start */}
      <div className="h-[600px] md:h-[450px] sm:h-[350px] bg-top overflow-hidden relative">
        <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh]" translateY={[-50, 50]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
      </div>
      {/* Parallax Scrolling End */}

      {/* Section Start */}
      <m.section className="pb-[130px] lg:pb-[95px] md:pb-[75px] sm:py-[50px]" {...fadeIn}>
        <Container className="mb-[130px] lg:mb-[95px] md:mb-[75px] sm:mb-[50px]">
          <Overlap className="relative shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-[5px] bg-white py-[60px] md:p-[40px] xs:px-[20px]">
            <Row className="g-0 sm:justify-center">
              <Col lg={{ span: 5, offset: 1 }} md={7} sm={10} className="text-start sm:mb-[20px]">
                <h6 className="font-serif font-medium text-darkgray w-[70%] sm:text-center mb-0 lg:w-full">Litho is meant to simplify the website building</h6>
              </Col>
              <Col lg={{ span: 4, offset: 2 }} md={5} sm={8} className="text-center flex justify-center items-center md:text-start">

                {/* Modal Component Start */}
                <CustomModal.Wrapper
                  modalBtn={
                    <div className="flex items-center">
                      <Buttons type="submit" className="mr-[20px] btn-sonar border-0 inline-block" themeColor={["#b27cfd", "#ff9393"]} color="#fff" size="md" title={<i className="icon-control-play" />} />
                      <span className="font-serif text-darkgray text-xmd font-medium text-decoration-line-bottom cursor-pointer hover:text-fastblue">Discover collection</span>
                    </div>
                  }
                >
                  <div className="w-[1020px] max-w-full relative rounded mx-auto">
                    <div className="fit-video">
                      <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                    </div>
                  </div>
                </CustomModal.Wrapper>
                {/* Modal Component End */}
              </Col>
            </Row>
          </Overlap>
        </Container>
        <Container>
          <Row className="justify-center">
            <Col md={6} className="text-center mb-20">
              <span className="font-serif mb-[5px] inline-block uppercase font-medium text-spanishgray">Meet our team</span>
              <h5 className="font-serif text-darkgray font-medium">Creative People</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <Team
                themeColor="dark"
                theme='team-style-02'
                className="text-white sm:justify-center"
                overlay={["#b783fff2", "#e37be0f2", "#fa7cc1f2", "#ff85a6f2", "#ff9393f2"]}
                data={TeamData02}
                grid="row-cols-1 row-cols-sm-2 row-cols-md-3 gap-y-10"
                animation={fadeIn}
                carousel={false}
                carouselOption={{ slidesPerView: 3, spaceBetween: 30, loop: true, navigation: false, autoplay: { delay: 3000, disableOnInteraction: false }, pagination: { dynamicBullets: false, clickable: true } }} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <FooterStyle01 theme="dark" className="bg-[#262b35] text-slateblue overflow-visible" />
      {/* Section End */}
    </div>
  )
}

export default WhatWeOfferPage