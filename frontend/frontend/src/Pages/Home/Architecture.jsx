import React, { useState } from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Keyboard, Navigation } from "swiper/modules";
import { m } from 'framer-motion'

// Components
import Header, { HamburgerMenu, HeaderNav } from '../../Components/Header/Header'
import ReactCustomScrollbar from '../../Components/ReactCustomScrollbar'
import SocialIcons from '../../Components/SocialIcon/SocialIcons'
import Buttons from '../../Components/Button/Buttons'
import Clients from '../../Components/Clients/Clients'
import Overlap from '../../Components/Overlap/Overlap'
import CustomModal from '../../Components/CustomModal'
import BlogMetro from '../../Components/Blogs/BlogMetro'
import InteractiveBanners15 from '../../Components/InteractiveBanners/InteractiveBanners15'
import { Footer } from '../../Components/Footers/Footer';
import SideButtons from "../../Components/SideButtons";
import { fadeIn, zoomIn } from '../../Functions/GlobalAnimations'

// Data
import { blogData } from '../../Components/Blogs/BlogData';
import { InteractiveBannersData15 } from '../../Components/InteractiveBanners/InteractiveBannersData';

const SwiperData = [
  {
    number: "01",
    img: "https://via.placeholder.com/1920x1080",
    title: "De wendell",
    subtitle: " burnette",
    btnName: "explore project",
    btnLink: "/portfolio/single-project-page-01"
  },
  {
    number: "02",
    img: "https://via.placeholder.com/1920x1080",
    title: "Be reuse",
    subtitle: "hulls forest",
    btnName: "explore project",
    btnLink: "/portfolio/single-project-page-02"
  },
  {
    number: "03",
    img: "https://via.placeholder.com/1920x1080",
    title: "Marseille",
    subtitle: "beach villa",
    btnName: "explore project",
    btnLink: "/portfolio/single-project-page-03"
  }
]

const ClientData = [
  {
    img: 'https://via.placeholder.com/232x110',
    target: "_self",
    link: '#'
  },
  {
    img: 'https://via.placeholder.com/232x110',
    target: "_self",
    link: '#'
  },
  {
    img: 'https://via.placeholder.com/232x110',
    target: "_self",
    link: '#'
  },
  {
    img: 'https://via.placeholder.com/232x110',
    target: "_self",
    link: '#'
  }
]

const selecteworkData = [
  {
    title: "Cultural centre",
    subtitle: "Landscape",
    img: "https://via.placeholder.com/818x1048",
    link: "/portfolio/single-project-page-01"
  },
  {
    title: "Aliquam gravida",
    subtitle: "Architecture",
    img: "https://via.placeholder.com/818x1048",
    link: "/portfolio/single-project-page-02"
  },
  {
    title: "Leana cagnotto",
    subtitle: "Architecture",
    img: "https://via.placeholder.com/818x1048",
    link: "/portfolio/single-project-page-03"
  },
  {
    title: "Fringila auctor",
    subtitle: "Interior",
    img: "https://via.placeholder.com/818x1048",
    link: "/portfolio/single-project-page-04"
  },
  {
    title: "Cultural centre",
    subtitle: "Landscape",
    img: "https://via.placeholder.com/818x1048",
    link: "/portfolio/single-project-page-05"
  },
  {
    title: "Aliquam gravida",
    subtitle: "Architecture",
    img: "https://via.placeholder.com/818x1048",
    link: "/portfolio/single-project-page-01"
  }
]

const FooterIconData = [
  {
    color: "#828282",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "#828282",
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble"
  },
  {
    color: "#828282",
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  },
  {
    color: "#828282",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram"
  }
]

// Filter the blog data category wise
const blogMetroData = blogData.filter((item) => item.blogType === "metro").filter(item => item.category.includes("architecture"));

const ArchitecturePage = (props) => {
  const [activeSlide, setActiveSlide] = useState(0)
  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} className="bg-[#23262d] absolute top-0 w-full">
        <HeaderNav containerClass="ps-xl-0 pr-0 lg:pr-[15px] md:px-0 h-[100px] md:h-[70px]" fluid="fluid" expand="lg" bg="[#23262d]" className="px-[90px] py-0 xl:px-[45px] lg:px-0 md:px-[15px] navbar-lg-dark sm:px-0">
          <Col className="col-auto col-sm-6 col-lg-2 mr-auto ps-lg-0">
            <Link aria-label="header logo link" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-parrot-green.webp' data-rjs='/assets/img/webp/logo-parrot-green@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-parrot-green.webp' data-rjs='/assets/img/webp/logo-parrot-green@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-parrot-green.webp' data-rjs='/assets/img/webp/logo-parrot-green@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Col className="col-auto lg:pr-[15px] md:pr-0">
            <Link aria-label="link for call" to="#" className="font-serif font-medium text-md uppercase text-white sm:inline-block align-middle mr-[15px] pr-[17px] xs:hidden">Call us +44 123 456 7890</Link>
            <HamburgerMenu theme="light" className="relative h-[100vh] w-1/2 xl:w-[60%] lg:w-[70%] md:w-[50%] sm:w-full z-[5] architecture-hamburgermenu landscape:md:h-[auto]">
              <Row className="h-full mx-0">
                <Col className="h-full col-6 bg-no-repeat bg-cover overflow-hidden relative bg-center md:hidden" style={{ backgroundImage: `url("https://via.placeholder.com/800x1500")` }}></Col>
                <Col lg={6} className="p-0 h-full flex flex-col justify-center">
                  <Row className="flex-col landscape:md:flex-row landscape:md:overflow-auto p-[5.5rem] mx-0 h-[100vh] items-center justify-center xs:p-[3rem] bg-[#23262d] ">
                    <Col xs={12} className="hamburgermenu-modern-page p-0 text-left max-h-[calc(65vh-100px)] h-[calc(100vh-150px)] xs:max-h-[calc(65vh-60px)] xs:h-[calc(100vh-60px)]">
                      <ReactCustomScrollbar autoHide>
                        <div>
                          <ul className="font-serif w-full h-full flex flex-col justify-center sm:flex sm:flex-col sm:justify-center sm:h-full">
                            <li className="py-[13px] px-0 relative sm:text-center sm:!py-[10px]"><Link className="!font-normal" aria-label="menu" to="/">home</Link></li>
                            <li className="py-[13px] px-0 relative sm:text-center sm:!py-[10px]"><Link className="!font-normal" aria-label="menu" to="/page/about-us">about</Link></li>
                            <li className="py-[13px] px-0 relative sm:text-center sm:!py-[10px]"><Link className="!font-normal" aria-label="menu" to="/page/our-services">services</Link></li>
                            <li className="py-[13px] px-0 relative sm:text-center sm:!py-[10px]"><Link className="!font-normal" aria-label="menu" to="/portfolio/portfolio-colorful-metro">portfolio</Link></li>
                            <li className="py-[13px] px-0 relative sm:text-center sm:!py-[10px]"><Link className="!font-normal" aria-label="menu" to="/home-magazine">blog</Link></li>
                            <li className="py-[13px] px-0 relative sm:text-center sm:!py-[10px]"><Link className="!font-normal" aria-label="menu" to="/page/contact-modern">contact</Link></li>
                          </ul>
                        </div>
                      </ReactCustomScrollbar>
                    </Col>
                    <Col xs={12} className="block p-0 sm:hidden">
                      <div className="hamburgermenu-modern-social-icon font-serif relative mt-[40px]">
                        <ul>
                          <li className="py-[10px] leading-none border-b border-[#ffffff26]"><a aria-label="link" target="_blank" rel="noreferrer" href="https://www.facebook.com/" className="text-white text-center rounded-full relative uppercase text-sm inline-block hover:opacity-50"><i className="fab fa-facebook-f w-[30px] text-left"></i>Facebook</a></li>
                          <li className="py-[10px] leading-none border-b border-[#ffffff26]"><a aria-label="link" target="_blank" rel="noreferrer" href="https://twitter.com/" className="text-white text-center rounded-full relative uppercase text-sm inline-block hover:opacity-50"><i className="fab fa-twitter w-[30px] text-left"></i>Twitter</a></li>
                          <li className="py-[10px] leading-none border-b border-[#ffffff26]"><a aria-label="link" target="_blank" rel="noreferrer" href="https://www.instagram.com/" className="text-white text-center rounded-full relative uppercase text-sm inline-block hover:opacity-50"><i className="fab fa-instagram w-[30px] text-left"></i>Instagram</a></li>
                          <li className="py-[10px] leading-none"><a aria-label="link" target="_blank" href="https://dribbble.com/" rel="noreferrer" className="text-white text-center rounded-full relative uppercase text-sm inline-block hover:opacity-50"><i className="fab fa-dribbble w-[30px] text-left"></i>Dribbble</a></li>
                        </ul>
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

      <div className="px-[90px] bg-[#23262d] overflow-hidden xl:px-[45px] lg:px-0">
        <div className="relative">
          {/* Section Start */}
          <section className="full-screen min-h-[-webkit-fill-available] sm:h-[760px] relative xs:h-[564px] architecture-slider-wrapper landscape:md:h-[400px]">
            <Swiper
              className="swiper-pagination-light h-full relative architecture-slider min-h-[-webkit-fill-available]"
              slidesPerView={1}
              loop={true}
              modules={[EffectFade, Navigation, Autoplay]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              navigation={true}
              effect="fade"
              onSlideChange={(swiperCore) => {
                const { realIndex } = swiperCore;
                setActiveSlide(realIndex)
              }}>
              {
                SwiperData.map((item, i) => {
                  return (
                    <SwiperSlide key={i} className="overflow-hidden h-full relative bg-cover bg-no-repeat bg-center min-h-[-webkit-fill-available]" style={{ backgroundImage: `url(${item.img})` }}>
                      <div className="absolute h-full w-full top-0 left-0 opacity-[0.01] bg-black"></div>
                      <Container fluid className="relative h-full">
                        <Row className="justify-center h-full items-center">
                          <Col xs={12} xl={7} className="flex xs:justify-center xs:text-center pl-[65px] lg:pl-[120px] md:pl-[30px]">
                            <div className="w-[144px] h-[221px] lg:w-[130px] lg:h-[198px] md:w-[165px] md:h-[255px] relative sm:hidden mr-[55px]">
                              <m.div
                                animate={activeSlide === i ? { scaleX: [0, 1], originX: ["0%", "0%"] } : { scaleX: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: "linear" }}
                                className="bg-basecolor absolute top-0 h-full w-full"></m.div>
                              <h2 className="heading-4 text-darkgray text-[85px] font-serif opacity-100 absolute top-[50px] -left-[7px] font-semibold lg:text-[75px] md:text-[87px] md:top-[70px]">0{i + 1}</h2>
                            </div>
                            <div className="flex flex-col items-start justify-center xs:items-center">
                              <h2 className="heading-5 text-white text-[67px] leading-none tracking-[-2px] font-serif font-semibold text-shadow-small lg:text-[60px] md:text-[34px] sm:text-[75px] relative mb-[15px] xs:text-[45px]">
                                {item.title}<br></br>{item.subtitle}
                                <m.span
                                  animate={activeSlide === i ? { scaleX: [0, 1, 1, 0], originX: ["0%", "0%", "100%", "100%"] } : { scaleX: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.6, ease: "linear" }}
                                  className="bg-white list-block absolute top-0 left-0 h-full w-full"></m.span>
                              </h2>
                              <div className="relative inline-block">
                                <m.div
                                  animate={activeSlide === i ? { scaleX: [0, 1, 1, 0], originX: ["0%", "0%", "100%", "100%"] } : { scaleX: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.6, ease: "linear" }}
                                  className="bg-white list-block absolute top-0 h-full w-full"></m.div>
                                <Buttons ariaLabel="link for btn" to={item.btnLink} className="font-medium font-serif uppercase btn-link after:h-[1px] text-base leading-[20px] md:text-md md:mb-[15px] after:bg-[#fff] hover:text-[#fff]" color="#fff" size="xlg" title={item.btnName} />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </section>
          {/* Section End */}

          {/* Section Start */}
          <section className="overflow-hidden sm:py-[50px] xs:pb-0">
            <Container fluid className="md:p-0">
              <Row className="justify-end">
                <Col lg={7} xl={6} md={10} className="z-[1] absolute bottom-0 right-0 bg-[#23262d] flex py-[49px] px-8 xl:px-8 lg:py-12 sm:relative sm:pt-0 architecture-overlap xs:flex-col xs:items-center xs:text-center">
                  <div className="pl-[49px] pr-[39px] py-[10px] border-r border-[#ffffff1a] xl:px-6 md:px-12 xs:p-0 xs:mb-[20px] xs:border-0">
                    <span className="font-serif font-medium text-white inline-block mb-[5px] mxl:block xs:mr-[10px] xs:mb-0">01</span>
                    <span className="font-serif text-md uppercase inline-block">Interior design</span>
                  </div>
                  <div className="pl-[49px] pr-[39px] py-[10px] border-r border-[#ffffff1a] xl:px-6 md:px-12 xs:p-0 xs:mb-[30px] xs:border-r-0">
                    <span className="font-serif font-medium text-white inline-block mb-[5px] mxl:block xs:mr-[10px] xs:mb-0">02</span>
                    <span className="font-serif text-md uppercase inline-block">Planing design</span>
                  </div>
                  <div className="pl-14 pr-36 py-[10px] xl:px-6 sm:px-12 xs:p-0">
                    <span className="font-serif font-medium text-basecolor uppercase block mb-[5px]">Experts since 1997</span>
                    <span className="font-serif text-md uppercase block w-full xs:w-[90%] xs:mx-auto">Award winning architectural company based in United kingdom</span>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          {/* Section End */}
        </div>

        {/* Section Start */}
        <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:pt-[0px] sm:py-[80px] xs:py-[50px]">
          <Container>
            <Row className="items-center justify-center md:items-start sm:text-center">
              <Col lg={4} md={6} className="md:mb-[50px]">
                <m.div className="inline-block text-center w-[300px] py-14 px-[15px] relative xs:p-[30px] xs:w-[315px]" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
                  <div className="border-r-0 border-solid	border-[10px] border-[#ffffff1a] h-full w-[67px] block absolute bottom-0 left-0 xs:left-[25px]"></div>
                  <h1 className="text-[80px] leading-[72px] mb-0 mr-[15px] font-semibold tracking-[-5px] text-basecolor font-serif inline-block align-middle">28</h1>
                  <div className="w-[40%] leading-[24px] text-white text-xmd font-serif text-left relative inline-block align-middle lg:w-[50%] sm:w-[35%]">Years experience working</div>
                  <div className="border-l-0 border-solid	border-[10px] border-[#ffffff1a] h-full w-[67px] block absolute bottom-0 right-0 xs:right-[25px]"></div>
                </m.div>
              </Col>
              <m.div className="col-lg-3 col-md-4 text-left sm:text-center" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
                <span className="mb-[20px] text-[15px] font-serif uppercase block">Since 1992</span>
                <span className="w-[85%] leading-[34px] font-medium text-white text-xlg font-serif block md:text-lg sm:w-full sm:mb-[15px]">An architectural company based in United kingdom</span>
              </m.div>
              <m.div className="col-lg-5 col-md-10 text-left sm:text-center" {...{ ...fadeIn, transition: { delay: 0.5 } }}>
                <p className="w-[85%] mb-[20px] block sm:w-full">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been standard dummy text ever since ipsum been the industry lorem ipsum has been lorem ipsums dolor.</p>
                <Buttons ariaLabel="link for About company" to="/page/about-us" className="font-medium font-serif uppercase btn-link after:h-[2px] md:text-md md:mb-[15px] sm:mb-0 after:bg-spanishgray hover:text-spanishgray" color="#939393" size="xlg" title="About company" />
              </m.div>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <m.section {...{ ...fadeIn, transition: { delay: 0.5, duration: 1.2 } }}>
          <Container fluid className="lg:px-[30px]">
            <InteractiveBanners15 data={InteractiveBannersData15} grid="row-cols-1 row-cols-xl-4 row-cols-md-2 gap-y-10" animation={fadeIn} />
          </Container>
        </m.section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
          <Container>
            <Row>
              <Col lg={5} md={9} className="md:mb-[40px] xs:mb-[30px]">
                <m.h2 className="heading-6 font-serif text-white leading-[44px] mb-0 md:leading-[34px] sm:leading-[30px] sm:w-[80%] xs:w-full" {...{ ...fadeIn, transition: { delay: 0.2 } }}>We are passionate knowing that people work, play and inhabit the spaces and places.</m.h2>
              </Col>
              <m.div className="col-12 col-lg-3 offset-lg-1 col-sm-6 xs:mb-[30px]" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
                <span className="font-serif font-medium text-white uppercase tracking-[1px] block mb-[5px]">Owner managed</span>
                <p className="w-[85%] lg:w-full md:w-[80%] sm:w-[90%] xs:w-full">Lorem ipsum is simply dummy text of the printing and lorem ipsum has been.</p>
              </m.div>
              <m.div className="col-12 col-lg-3 col-sm-6" {...{ ...fadeIn, transition: { delay: 0.5 } }}>
                <span className="font-serif font-medium text-white uppercase tracking-[1px] block mb-[5px]">Expect creativity</span>
                <p className="w-[85%] lg:w-full md:w-[80%] sm:w-[90%] xs:w-full">Lorem ipsum is simply dummy text of the printing and lorem ipsum has been.</p>
              </m.div>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <m.section className="cover-background p-0" style={{ backgroundImage: `url(https://via.placeholder.com/1920x640)` }} {...fadeIn}>
          <div className="absolute top-0 left-0 w-full h-full opacity-50 bg-darkslateblue"></div>
          <Container>
            <Row className="justify-center">
              <Col md={6} className="h-[600px] items-center flex flex-col justify-center text-center lg:h-[500px] sm:h-[400px] xs:h-[300px]">
                {/* Modal Component Start */}
                <CustomModal.Wrapper
                  modalBtn={<Buttons ariaLabel="modal button" type="submit" className="btn-sonar border-0" themeColor="#cee002" color="#232323" size="lg" title={<i className="icon-control-play" />} />
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
        </m.section>
        {/* Section End */}

        {/* Section Start */}
        <m.section className="overflow-visible pb-0 md:pt-0 sm:pt-[50px] sm:pb-0" {...{ ...fadeIn, transition: { delay: 0.8 } }}>
          <Container fluid>
            <Row className="justify-end">
              <Overlap value={80} className="col col-xl-4 col-lg-6 col-md-7 relative bg-[#23262d] md:text-start sm:text-center py-[5.5rem] px-[6.5rem] xl:px-[4.5rem] lg:p-14 sm:px-[15px] sm:py-0">
                <h2 className="heading-4 font-serif font-medium text-white mb-0 -tracking-[1px]">We are the leader in the&nbsp;
                  <span className="text-basecolor inline-block font-semibold text-decoration-line-bottom">architectural</span></h2>
              </Overlap>
            </Row>
          </Container>
        </m.section>
        {/* Section End */}

        {/* Section Start */}
        <section className="pt-[80px] pb-0 md:pt-[50px]">
          <Container>
            <Clients
              grid="row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4"
              theme="client-logo-style-02"
              data={ClientData}
              animation={fadeIn}
            />
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <m.section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
          <Container fluid>
            <Row className="justify-center">
              <Col className="text-center divider-full mb-[9.5rem] p-0 lg:mb-[5.5rem]">
                <div className="divider-border divider-light flex items-center w-full">
                  <span className="font-serif font-medium text-basecolor uppercase tracking-[1px] block px-[30px]">Selected work</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Swiper className="work-architecture-slider"
                  spaceBetween={26}
                  slidesPerView="auto"
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  loop={false}
                  modules={[Autoplay, Keyboard]}
                  keyboard={{ enabled: true, onlyInViewport: true }}
                  breakpoints={{
                    1200: { slidesPerView: 4 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 }
                  }} >
                  {
                    selecteworkData.map((item, i) => {
                      return (
                        <SwiperSlide key={i} className="architecture-portfolio-slider">
                          <div className="portfolio-box">
                            <div className="portfolio-image flex relative">
                              <Link aria-label="link for img" to={item.link}>
                                <img width={405} height={518} src={item.img} alt="slider" />
                              </Link>
                              <div className="portfolio-hover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Link aria-label="link for button" className="bg-white w-[40px] h-[40px] inline-block align-middle leading-[40px] text-center mx-[3px] z-[3] relative border-white border-[2px] rounded-full" to={item.link}><i className="ti-arrow-right inline-block text-darkgray text-center"></i></Link>
                              </div>
                            </div>
                            <div className="portfolio-caption justify-center text-center py-[30px]">
                              <Link aria-label="link for title" className="text-white font-serif uppercase font-medium" to={item.link}>{item.title}</Link>
                              <span className="block uppercase text-sm">{item.subtitle}</span>
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
        <section className="bg-[rgba(0,0,0,0.12)] relative py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden">
          <Container>
            <Row className="items-center justify-center">
              <Col lg={{ span: 5, offset: 2, order: 1 }} xs={{ order: 2 }}>
                <m.img width={458} height={258} src="https://via.placeholder.com/889x501" alt="..." {...{ ...zoomIn, transition: { duration: 0.7 } }} />
              </Col>
              <m.div className="md:mb-[50px] md:text-center col-xl-4 col-lg-5 col-md-7 offset-xl-1 order-lg-2 order-1" {...fadeIn}>
                <h2 className="heading-5 font-serif font-medium text-white lg:w-[95%] md:w-full">We have offices all round the world</h2>
                <p className="w-[80%] mb-[20px] md:w-full">Lorem ipsum is simply dummy text of the and typesetting industry lorem ipsum industry's standard text.</p>
                <Buttons ariaLabel="link for Get in touch" to="/page/contact-modern" className="font-medium font-serif uppercase btn-link after:h-[2px] md:text-md md:mb-[15px] after:bg-spanishgray hover:text-spanishgray" size="xl" color="#939393" title="Get in touch" />
              </m.div>
              <div className="top-1/2 w-auto font-serif font-semibold text-[200px] text-basecolor -tracking-[10px] -left-[50px] md:hidden md:right-0 md:-bottom-[40px] absolute opacity-20 text-start md:text-center lg:block">world</div>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="pt-[130px] lg:pt-[90px] md:pt-[75px] sm:pt-[50px]  pb-[90px] md:pb-[75px] sm:pb-[50px]">
          <Container fluid>
            <Row className="justify-center">
              <Col className="text-center divider-full mb-32 p-0 lg:mb-[5.5rem] xs:mb-14">
                <m.div className="divider-border divider-light flex items-center w-full" {...fadeIn}>
                  <span className="font-serif font-medium text-basecolor uppercase tracking-[1px] block px-[30px]">LATEST BLOGS</span>
                </m.div>
              </Col>
            </Row>
            <Row>
              <Col className="px-md-0">
                <BlogMetro pagination={false} grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={blogMetroData} />
              </Col>
            </Row>
            <Row className="mt-[80px] md:mt-[70px] sm:mt-[40px]">
              <Col className="text-center">
                <m.h2 className="heading-6 font-serif font-semibold text-white uppercase mb-0" {...fadeIn}>Are you ready to work with us? <Buttons ariaLabel="button" to="/page/contact-modern" className="font-semibold font-serif pt-0 uppercase btn-link after:h-[1px] md:text-md after:bg-[#cee002] after:!bottom-0 hover:text-white hover:!opacity-100 !text-[1.8rem] !leading-[2.5rem] hover:after:bg-white" color="#cee002" title="start a project" />
                </m.h2>
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Footer Start */}
        <Footer className="overflow-hidden" theme="light">
          <div className="py-[70px] xs:py-[50px] border-t border-[#ffffff1a]">
            <Container fluid>
              <Row className="justify-center">
                <Col md={2} className="sm:mb-[20px]">
                  <Link to="/" className="sm:flex sm:justify-center">
                    <img className="max-h-[36px] align-middle" alt='logo' src="/assets/img/webp/logo-parrot-green.webp" width={111} height={36} />
                  </Link>
                </Col>
                <Col xl={8} md={6} className="text-center flex justify-center sm:mb-[20px]">
                  <p className="font-serif uppercase text-md items-center inline-block">+1 234 567 8910 <span className="mx-[5px]">•</span> 27 Eden walk eden centre, Paris, France <span className="mx-[5px]">•</span> <a href="mailto:info@yourdomain.com">info@yourdomain.com</a></p>
                </Col>
                <Col xl={2} md="auto" className="text-right footer-icon xs:text-center">
                  <SocialIcons theme="social-icon-style-01" size="xs" iconColor="light" className="justify-end sm:justify-center" data={FooterIconData} />
                </Col>
              </Row>
            </Container>
          </div>
        </Footer>
        {/* Footer End */}
      </div>
    </div>
  )
}

export default ArchitecturePage