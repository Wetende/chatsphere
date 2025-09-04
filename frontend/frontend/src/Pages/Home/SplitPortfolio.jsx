import React, { useEffect, useRef } from 'react'

// Libraries
import { Link } from "react-router-dom";
import { Col, Navbar, Row } from "react-bootstrap"
import { EffectFade, Pagination, Mousewheel } from "swiper/modules";

// Components
import ReactCustomScrollbar from "../../Components/ReactCustomScrollbar"
import Header, { HamburgerMenu, HeaderNav } from "../../Components/Header/Header"
import SideButtons from "../../Components/SideButtons";

// Data
const swiperData = [
  {
    title: "Redlines picture",
    link: "/portfolio/single-project-page-01/",
    subTitle: "Branding and brochure",
    img: "https://via.placeholder.com/961x1134",
    bgImg: "/assets/img/webp/home-split-portfolio-img-06.webp",
    color: "#e12837"
  },

  {
    title: "Winters clothes",
    link: "/portfolio/single-project-page-02/",
    subTitle: "Branding and brochure",
    img: "https://via.placeholder.com/961x1134",
    bgImg: "/assets/img/webp/home-split-portfolio-img-05.webp",
    color: "#bd884c"
  },

  {
    title: "Shooting glasses",
    link: "/portfolio/single-project-page-03/",
    subTitle: "Branding and brochure",
    img: "https://via.placeholder.com/961x1134",
    bgImg: "/assets/img/webp/home-split-portfolio-img-04.webp",
    color: "#fd961e"
  },
]

const SplitPortfolioPage = () => {
  const swiperRef = useRef(null)

  // Init the Swiper slider
  useEffect(() => {
    function initSwiper() {
      import("../../Functions/Utilities").then(module => {
        module.initializeSwiper(swiperRef.current, {
          modules: [Pagination, EffectFade, Mousewheel],
          direction: "vertical",
          loop: true,
          mousewheel: true,
          allowTouchMove: false,
          keyboard: { enabled: true, onlyInViewport: true },
          pagination: { el: ".swiper-pagination", clickable: true },
          effect: 'fade',
          fadeEffect: {
            crossFade: false
          },
          breakpoints: {
            992: {
              allowTouchMove: true
            }
          }
        });
      })
    }
    initSwiper()
  }, [])

  return (
    <div>
      <SideButtons />
      {/* Header Start */}
      <Header type="reverse-scroll" topSpace={{ md: true }}>
        <HeaderNav fluid="fluid" theme="light" expand="lg" containerClass="h-[120px] md:h-[70px] md:!px-[15px] px-[35px]" className="py-0">
          <Col className="col-auto col-sm-6 col-lg-2 mr-auto">
            <Link aria-label="link for" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/symbol-black.webp' data-rjs='/assets/img/webp/symbol-black@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/symbol-black.webp' data-rjs='/assets/img/webp/symbol-black@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/symbol-black.webp' data-rjs='/assets/img/webp/symbol-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Col className="col-auto pr-0 flex">
            <HamburgerMenu theme="dark" className="w-[25%] xl:w-[40%] lg:w-[45%] md:w-[50%] sm:w-full">
              <Row className="h-full mx-0">
                <Col lg={12} className="p-0">
                  <Row className="h-[100vh] p-28 xs:p-12 mx-0 items-center justify-center bg-white">
                    <Col xs={12} className="hamburgermenu-modern-page text-left h-full max-h-[calc(65vh-100px)] flex-1 px-0">
                      <ReactCustomScrollbar theme="dark" className="h-full flex justify-center" autoHide>
                        <div>
                          <ul className="font-serif w-full flex flex-col justify-center h-full">
                            <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="font-semibold" aria-label="link for" to="/">home</Link></li>
                            <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="font-semibold" aria-label="link for" to="/page/about-me">about</Link></li>
                            <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="font-semibold" aria-label="link for" to="/page/our-services">services</Link></li>
                            <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="font-semibold" aria-label="link for" to="/portfolio/portfolio-colorful-metro">portfolio</Link></li>
                            <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="font-semibold" aria-label="link for" to="/blogs/blog-grid">blog</Link></li>
                            <li className="py-[13px] px-0 relative sm:text-center xs:!py-[10px]"><Link className="font-semibold" aria-label="link for" to="/page/contact-modern">contact</Link></li>
                          </ul>
                        </div>
                      </ReactCustomScrollbar>
                    </Col>
                    <Col className="col-12 text-left none md:block sm:hidden px-0">
                      <div className="font-serif mt-[50px]">
                        <span className="mb-[10px] font-light text-xlg inline-block">Let's work together?</span>
                        <h2 className="heading-6 mb-0"><a aria-label="gmail" href="mailto:info@domain.com" className="text-darkgray border-b border-darkgray hover:text-darkgray font-medium">info@domain.com</a></h2>
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

      {/* Swiper Start */}
      <section className="split-portfolio">
        <div ref={swiperRef} className="swiper split-swiper full-screen md:h-auto vertical-swiper swiper-pagination-03 swiper-pagination-dark swiper-pagination-medium vertical-black-move">
          <div className="swiper-wrapper">
            {swiperData.map((item, i) => {
              return (
                <div key={i} className="swiper-slide h-full overflow-hidden">
                  <div className="swiper-half-l full-screen bg-no-repeat bg-left order-lg-1 order-2 xs:bg-[length:53%] xs:bg-[left_center]" style={{ backgroundImage: `url(${item.bgImg})` }}>
                    <div className="relative h-full flex flex-col justify-center w-[50%] xl:w-[70%] lg:w-[80%] my-0 mx-auto xs:w-full xs:px-[15px]">
                      <h1 className="slide-title my-0 offset-2 offset-lg-0 xs:w-[70%]">
                        <Link aria-label="link for" to={item.link} className="font-serif font-semibold text-[100px] -tracking-[4px] text-darkgray hover:text-darkgray leading-[95px] inline-block lg:text-[90px] lg:leading-[90px] sm:text-[70px] sm:leading-[65px] xs:text-[45px] xs:leading-[40px] xs:-tracking-[1px]">
                          {item.title}</Link>
                      </h1>
                      <div className="font-serif font-medium text-darkgray absolute bottom-[100px] left-0 -tracking-[0.5px] md:left-auto md:right-[50px] sm:right-[45px] sm:bottom-[30px] xs:right-[15px]">
                        <span className="inline-block align-middle font-semibold" style={{ color: item.color }}>{i <= 9 ? `0${i + 1}` : i}</span>
                        <span className="w-[35px] h-[1px] inline-block align-middle mr-[15px] ml-[23px]" style={{ backgroundColor: item.color }}></span>
                        {item.subTitle}
                      </div>
                    </div>
                  </div>
                  <div className="swiper-half-r full-screen cover-background order-lg-2 order-1" style={{ backgroundImage: `url(${item.img})` }}>
                    <Link aria-label="link for" className="top-0 absolute left-0 w-full h-full" to={item.link}></Link>
                  </div>
                </div>
              )
            })}
            {/* SwiperSlider End */}

          </div>
          <div className="swiper-pagination md:!hidden"></div>
        </div>
      </section>
      {/* Swiper End */}
    </div>
  )
}
export default SplitPortfolioPage
