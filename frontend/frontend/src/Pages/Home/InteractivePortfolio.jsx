import React, { useState } from 'react'

// Librarie
import { Link } from 'react-router-dom'
import { Col, Navbar, Row } from 'react-bootstrap';

// Components
import Header, { HamburgerMenu, HeaderNav } from '../../Components/Header/Header';
import ReactCustomScrollbar from '../../Components/ReactCustomScrollbar';
import SideButtons from "../../Components/SideButtons";


// Data
const InteractiveportfolioPageData = [
  {
    number: "01",
    title: "Northtrue",
    img: "https://via.placeholder.com/1920x1132",
    link: "/portfolio/single-project-page-01",
  },
  {
    number: "02",
    title: "Biolator",
    img: "https://via.placeholder.com/1920x1132",
    link: "/portfolio/single-project-page-02",
  },
  {
    number: "03",
    title: "Chairness",
    img: "https://via.placeholder.com/1920x1132",
    link: "/portfolio/single-project-page-03",
  },
  {
    number: "04",
    title: "Manchester",
    img: "https://via.placeholder.com/1920x1132",
    link: "/portfolio/single-project-page-04",
  },
  {
    number: "05",
    title: "Gardner",
    img: "https://via.placeholder.com/1920x1132",
    link: "/portfolio/single-project-page-05",
  },
]

const InteractiveportfolioPage = () => {
  const [isHover, setHover] = useState(0);

  const handleMouseEnter = (e, index) => {
    setHover(index)
  }
  return (
    <>
      <SideButtons animation={false} />
      {/* Header Start */}
      <Header topSpace={{ md: true }} className="absolute top-0 left-0 w-full z-10 flex items-center md:py-0">
        <HeaderNav fluid="fluid" theme="dark" expand="lg" containerClass="sm:px-0" className="px-[35px] h-[140px] lg:h-[100px] md:h-[70px] md:px-0 md:py-[17px] py-0 w-full">
          <Col className="col-auto col-sm-6 col-lg-2 mr-auto ps-lg-0">
            <Link aria-label="link for" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/symbol.webp' data-rjs='/assets/img/webp/symbol@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/symbol.webp' data-rjs='/assets/img/webp/symbol@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/symbol-black.webp' data-rjs='/assets/img/webp/symbol-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Col className="col-auto pe-lg-0">
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
                        <h2 className="heading-6 mb-0"><a aria-label="gmail" href="mailto:info@domain.com" className="text-[#fff] border-b border-[#fff] hover:text-white hover:border-white">info@domain.com</a></h2>
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

      {/* Section Start */}
      <section className="home-interactive-portfolio">
        <div className="fullscreen-hover-box full-screen">
          <ul className="fullscreen-hover-list light landscape:md:mb-[60px]">
            {
              InteractiveportfolioPageData.map((item, i) => {
                return (
                  <li key={i} onMouseEnter={e => handleMouseEnter(e, i)} className={`hover-list-item${isHover === i ? " active" : ""}`}>
                    <Link aria-label="link for" to={item.link} className="">
                      <h2 className="heading-6 interactive-number">{item.number}</h2>
                      <span className="interactive-line"></span>
                      <span className="interactive-title interactive_title" data-link-text={item.title}>{item.title}</span>
                      <i className="line-icon-Arrow-OutRight interactive-icon"></i>
                    </Link>
                    <div className="fullscreen-hover-image" style={{ backgroundImage: `url(${item.img})` }}></div>
                  </li>
                )
              })
            }
          </ul>
          <div className="text-center w-full absolute left-0 bottom-[70px] opacity-70 lg:bottom-[25px]">© Copyright {new Date().getFullYear()}  <Link aria-label="link for" to="/" className="border-b border-[#828282] hover:text-white">Litho</Link></div>
        </div>
      </section>
      {/* Section End */}
    </>
  )
}

export default InteractiveportfolioPage