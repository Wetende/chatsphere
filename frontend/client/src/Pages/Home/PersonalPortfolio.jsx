import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Parallax } from 'react-scroll-parallax'
import { m } from "framer-motion"

// Components
import { fadeIn, fadeInLeft } from '../../Functions/GlobalAnimations'
import Header, { HamburgerMenu, HeaderNav } from '../../Components/Header/Header'
import PortfolioOverlay from '../../Components/Portfolio/PortfolioOverlay'
import ProgressBar from '../../Components/Progressbar/ProgressBar'
import SocialIcons from '../../Components/SocialIcon/SocialIcons'
import { Footer } from '../../Components/Footers/Footer'
import ReactCustomScrollbar from '../../Components/ReactCustomScrollbar'
import { TextAnime } from '../../Components/FancyText/FancyText'
import SideButtons from "../../Components/SideButtons";

// Data
import { ProgressBarData01 } from '../../Components/Progressbar/ProgressBarData'

const PortfolioOverlayData = [
  {
    title: "Daimler",
    img: "https://via.placeholder.com/800x800",
    category: [""],
    subtitle: "Brochure",
    link: "/portfolio/single-project-page-01"
  },
  {
    title: "Waterlly",
    img: "https://via.placeholder.com/800x800",
    category: [""],
    subtitle: "Branding",
    link: "/portfolio/single-project-page-02"
  },
  {
    title: "Leather",
    img: "https://via.placeholder.com/800x800",
    category: [""],
    subtitle: "Photography",
    link: "/portfolio/single-project-page-03"
  },
  {
    title: "Gardner",
    img: "https://via.placeholder.com/800x800",
    category: [""],
    subtitle: "Photography",
    link: "/portfolio/single-project-page-04"
  },
  {
    title: "Manchester",
    img: "https://via.placeholder.com/800x800",
    category: [""],
    subtitle: "Photography",
    link: "/portfolio/single-project-page-05"
  },
  {
    title: "Armchair",
    img: "https://via.placeholder.com/800x800",
    category: [""],
    subtitle: "Photography",
    link: "/portfolio/single-project-page-01"
  },
  {
    title: "Truenorth",
    img: "https://via.placeholder.com/800x800",
    category: [""],
    subtitle: "Identity",
    link: "/portfolio/single-project-page-02"
  },
  {
    title: "Cortifiel",
    img: "https://via.placeholder.com/800x800",
    category: [""],
    subtitle: "Photography",
    link: "/portfolio/single-project-page-03"
  }
]

const SocialIconsData = [
  {
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble"
  },
  {
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  },
  {
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram"
  }
]

const PersonalportfolioPage = (props) => {
  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header className="absolute top-0 left-0 w-full z-10 md:bg-white header-personalportfolio">
        <HeaderNav fluid="fluid" theme="light" className="h-[100px] md:h-[70px] mr-[50px] ml-[35px] md:mx-[15px]" containerClass="md:px-0">
          <Col lg={2} sm={6} className="col-auto ps-lg-0 me-auto md:!px-0">
            <Link aria-label="link for" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/symbol-black.webp' data-rjs='/assets/img/webp/symbol-black@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/symbol-black.webp' data-rjs='/assets/img/webp/symbol-black@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/symbol-black.webp' data-rjs='/assets/img/webp/symbol-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Col className="col-auto text-end px-0">
            <HamburgerMenu theme="light" className="w-[25%] xl:w-[40%] lg:w-[45%] md:w-[50%] sm:w-full">
              <Row className="h-full mx-0">
                <Col lg={12} className="p-0">
                  <Row className="h-[100vh] p-28 xs:p-12 mx-0 items-center justify-center bg-black">
                    <Col xs={12} className="hamburgermenu-modern-page text-left h-full max-h-[calc(65vh-100px)] flex-1 px-0">
                      <ReactCustomScrollbar className="h-full flex justify-center" autoHide>
                        <div>
                          <ul className="font-serif w-full flex flex-col justify-center h-full">
                            <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/">home</Link></li>
                            <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/page/about-me">about</Link></li>
                            <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/page/our-services">services</Link></li>
                            <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/portfolio/portfolio-colorful-metro">portfolio</Link></li>
                            <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/blogs/blog-grid">blog</Link></li>
                            <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="!font-normal" aria-label="link for" to="/page/contact-modern">contact</Link></li>
                          </ul>
                        </div>
                      </ReactCustomScrollbar>
                    </Col>
                    <Col className="col-12 text-left none md:block sm:hidden px-0">
                      <div className="font-serif mt-[50px]">
                        <span className="mb-[10px] font-light text-xlg inline-block">Let's work together?</span>
                        <h2 className="heading-6 mb-0"><a aria-label="gmail" href="mailto:info@domain.com" className="text-[#ffeb04] border-b border-[#ffeb04] hover:text-white hover:border-white">info@domain.com</a></h2>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </HamburgerMenu>
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}

      {/* Parallax section start */}
      <div className="md:flex md:items-center overflow-hidden relative h-[100vh] landscape:md:h-[600px]">
        <Parallax className="lg-no-parallax bg-cover absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] sm:h-[100vh] md:h-[650px] !bg-[50%_0] lg:bg-[right_-230px_center] md:bg-right sm:top-0 sm:bg-[right_-350px_center] landscape:bg-right" translateY={[-20, 20]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1080)` }}></Parallax>
        <Container>
          <Row className="full-screen md:h-[520px] sm:h-[100vh]">
            <Col xl={5} md={5} className="relative flex flex-col justify-center">
              <h2 className="font-serif font-light -tracking-[2px] text-darkgray uppercase mb-[15px]">Hello,  i am</h2>
              <div className="font-serif cd-headline push">
                <h3 className="heading-5 mb-0 text-darkgray font-serif">
                  <TextAnime color="#232323" duration={3000} className="font-bold text-darkgray uppercase text-[100px] leading-[95px] -tracking-[5px] sm:-tracking-[.5px] lg:text-[90px] lg:leading-[90px] md:text-[70px] md:leading-[65px] sm:text-[45px] sm:leading-[43px]" animation="push" data={["Shoko", "Clever", "Award"]} />
                </h3>
                <h4 className="heading-5 mb-0 text-darkgray font-serif">
                  <TextAnime color="#232323" duration={3000} className="font-bold text-darkgray uppercase text-[100px] leading-[95px] -tracking-[5px] sm:-tracking-[.5px] lg:text-[90px] lg:leading-[90px] md:text-[70px] md:leading-[65px] sm:text-[45px] sm:leading-[43px]" animation="push" data={["miller", "human", "Winner"]} />
                </h4>
              </div>
              <div className="left-[15px] absolute bottom-[100px] sm:bottom-[50px] md:bottom-[30px] landscape:md:bottom-0">
                <SocialIcons theme="social-icon-style-12" className="justify-start" size="md" iconColor="dark" data={SocialIconsData} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Parallax section End */}

      {/* Section Start */}
      <section className="py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row className=" align-center">
            <m.div className="col-lg-5 text-darkgray md:mb-[30px] text-left" {...fadeIn}>
              <h2 className="heading-6 font-serif leading-[40px] w-[90%] mb-0 lg:w-full sm:leading-[26px] xs:text-center">A freelance creative designer with a love for minimal design, clean typography and well-written code, located in &nbsp;
                <span className="font-bold text-decoration-line-bottom-medium leading-[40px] whitespace-nowrap sm:leading-[26px]">London</span></h2>
            </m.div>
            <Col xl={{ span: 6, offset: 1 }} lg={7} md={9} className="flex items-center xs:flex-col">
              <m.div className="w-[60%] md:w-[55%] xs:w-full xs:mb-[15px]" {...{ ...fadeInLeft, transition: { delay: 0.4, duration: 0.4 } }}>
                <span className="font-serif text-[11rem] leading-[11rem] text-darkgray font-semibold -tracking-[7px] block xs:text-center md:text-[9rem]"><span className="text-[#ffeb04] font-light mr-[35px]">|</span>25<span className="text-[#ffeb04] font-light ml-[35px]">|</span></span>
              </m.div>
              <m.div className="text- w-[40%] pl-[25px] xs:w-full md:pl-0"  {...{ ...fadeInLeft, transition: { delay: 0.6, duration: 0.6 } }}>
                <h3 className="heading-5 font-serif font-medium text-darkgray mb-0 -tracking-[1px] xs:text-center">Years of big experience</h3>
              </m.div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Portfolio Section Start */}
      <section className="">
        <Container fluid className="px-0">
          <PortfolioOverlay
            overlay="#000"
            grid="portfoliooverlay-personalportfolio grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col mt-0"
            data={PortfolioOverlayData}
          />
        </Container>
      </section>
      {/* Portfolio Section End */}

      {/* Progressbar Section Start */}
      <section className="py-[160px] overflow-hidden bg-[#ffeb04] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <m.div className="row" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
            <Col className="col-lg-5 md:mb-20 sm:mb-16">
              <h2 className="heading-6 font-serif text-darkgray mb-0 leading-[40px] sm:leading-[26px]">Provide <span className="font-semibold">high quality and cost effective</span> offshore web and software development services. Wide range of web and software development services across the world.</h2>
            </Col>
            <Col lg={{ span: 6, offset: 1 }}>
              <ProgressBar theme="progressbar-style-01" data={ProgressBarData01} trailColor="transparent" height="4px" color="#232323" animation={fadeIn} />
            </Col>
          </m.div>
        </Container>
      </section>
      {/* Progressbar Section End */}

      {/* Section Start */}
      <section className="bg-[#ffeb04] py-[80px] pt-0 md:pb-0">
        <Container fluid>
          <Row className="items-center">
            <Col className="border-[1px] border-r-0 border-l-0 border-b-0 border-dotted border-darkgray sm:mb-[30px]"></Col>
            <m.div className="col-md-auto text-center px-[4.5rem] md:px-10 xs:pt-6 xs:pb-8" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
              <span className="font-serif font-light text-[70px] leading-[90px] text-darkgray -tracking-[3px] block xs:text-[50px] xs:leading-[55px]">Let's work <span className="font-semibold">together?</span></span>
            </m.div>
            <div className="col-md border-[1px] border-r-0 border-l-0 border-b-0 border-dotted border-darkgray sm:mt-[30px]"></div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Footer Start */}
      <Footer className="bg-[#ffeb04] py-20" theme="light">
        <Container>
          <Row>
            <Col lg={4} className="justify-start md:justify-center md:mb-[20px] flex items-center">
              <span className="font-serif font-semibold text-sm uppercase text-darkgray">Call us today! +1 234 567 8910</span>
            </Col>
            <Col lg={4} className="text-center md:mb-[20px]">
              <SocialIcons theme="social-icon-style-12" iconColor="dark" size="md" data={SocialIconsData} />
            </Col>
            <Col lg={4} className="text-right justify-end md:justify-center md:text-center flex items-center">
              <p className="font-serif font-semibold text-sm uppercase text-darkgray leading-[30px]">© {new Date().getFullYear()} Litho is Powered by <a aria-label="footer themezaa link" href="https://www.themezaa.com/" target="_blank" rel="noreferrer" className="underline underline-offset-4 text-darkgray hover:text-darkgray">ThemeZaa</a></p>
            </Col>
          </Row>
        </Container>
      </Footer>
      {/* Footer End */}
    </div>
  )
}

export default PersonalportfolioPage
