import React from 'react'

// Libraries
import { Row, Col, Container, Dropdown, Navbar } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard } from "swiper/modules";
import { Link } from 'react-router-dom';
import { m } from "framer-motion";

// Components
import Header, { HeaderCart, HeaderNav, Menu, SearchBar, Topbar } from '../../Components/Header/Header';
import FooterStyle01 from '../../Components/Footers/FooterStyle01'
import PortfolioBoxed from '../../Components/Portfolio/PortfolioBoxed'
import Buttons from '../../Components/Button/Buttons'
import IconWithText from '../../Components/IconWithText/IconWithText'
import { fadeIn } from '../../Functions/GlobalAnimations'
import SocialIcons from '../../Components/SocialIcon/SocialIcons';
import SideButtons from "../../Components/SideButtons";

// Data
import { portfolioBoxedData } from "../../Components/Portfolio/PortfolioData"

const IconWithTextData = [
    {
        icon: "line-icon-Money-Bag text-[#828282] text-[40px]",
        title: "Effective strategy",
        content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
    },
    {
        icon: "line-icon-Gear-2 text-[40px] text-[#828282]",
        title: "Powerfull customize",
        content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
    },
    {
        icon: "line-icon-Talk-Man text-[40px] text-[#828282]",
        title: "Customer satisfaction",
        content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
    },
    {
        icon: "line-icon-Cursor-Click2 text-[40px] text-[#828282]",
        title: "No coding required",
        content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
    },
]

const swiperData = [
    {
        img: "https://via.placeholder.com/1920x1080",
        title: "<h2 class='font-serif text-shadow-double-large lg:w-[70%] sm:w-full lg:mx-auto font-light text-white mb-16'>Global <span class='font-semibold'>agency making</span> a world of difference</h2>"
    },
    {
        img: "https://via.placeholder.com/1920x950",
        title: "<h2 class='font-serif text-shadow-double-large lg:w-[70%] sm:w-full lg:mx-auto font-light text-white mb-16'>Constantly thinking of <span class='font-semibold'>new and effective</span> ways</h2>"
    },
    {
        img: "https://via.placeholder.com/1920x950",
        title: "<h2 class='font-serif text-shadow-double-large lg:w-[70%] sm:w-full lg:mx-auto font-light text-white mb-16'>Superlative services with <span class='font-semibold'>highly technology</span></h2>"
    }
]

const SocialIconsData = [
    {
        color: "#0038e3",
        link: "https://www.facebook.com/",
        icon: "fab fa-facebook-f"
    },
    {
        color: "#0038e3",
        link: "https://twitter.com/",
        icon: "fab fa-twitter"
    },
    {
        color: "#0038e3",
        link: "https://www.linkedin.com/",
        icon: "fab fa-linkedin-in"
    },
    {
        color: "#0038e3",
        link: "https://www.youtube.com/",
        icon: "fab fa-youtube"
    }
]

const HeaderwithTopbarPage = (props) => {
    const swiperRef = React.useRef(null)
    return (
        <div style={props.style}>

            {/* Header start */}
            <Header className="header-with-topbar" topSpace={{ desktop: true }} type="reverse-scroll">
                <Topbar className="bg-lightgray border-b border-[#0000001a] sm:hidden md:px-[15px]">
                    <Container fluid="lg">
                        <Row>
                            <Col className="col-12 col-sm-auto text-center items-center flex text-sm-start me-auto">
                                <SocialIcons theme="social-icon-style-01" size="xs" iconColor="dark" data={SocialIconsData} />
                            </Col>
                            <Col className="col-auto flex xs:hidden text-right">
                                <div className="top-bar-contact flex">
                                    <span className="border-l border-[#0000001a] flex py-[13px] px-[18px] text-sm justify-center items-center">
                                        <i className="feather-phone-call mr-[8px] text-md relative text-fastblue"></i> 1-800-222-000
                                    </span>
                                    <span className="border-l border-[#0000001a] py-[13px] px-[18px] text-sm flex justify-center items-center">
                                        <i className="far fa-envelope mr-[8px] text-md relative text-fastblue"></i>
                                        <a aria-label="mail" href="mailto:info@yourdomain.com" className="hover:text-darkgray">info@yourdomain.com</a>
                                    </span>
                                    <span className="border-l border-[#0000001a] py-[13px] px-[18px] flex md:pr-0 text-sm justify-center items-center sm:hidden">
                                        <i className="far fa-clock mr-[8px] text-md relative text-fastblue"></i>
                                        Mon - Fri: 10:00 - 22:00
                                    </span>
                                </div>
                                <div className="header-language pl-0 text-[17px] align-middle inline-block md:hidden landscape:md:hidden">
                                    <Dropdown className="border-l border-r border-solid border-[#0000001a] h-full text-[#828282]">
                                        <Dropdown.Toggle className="rounded-none uppercase w-auto h-full font-normal text-xs leading-[11px] border-[0px] m-0 dropdown-toggle after:none sm-w-100 items-center flex px-[18px] py-[14px] bg-transparent" id="dropdown-basic">
                                            <span className="icon-country w-[16px] h-[16px] inline-block my-0 mr-[10px] ml-0"><img height={16} width={16} src="/assets/img/webp/usa.webp" alt="" /></span>EN <span className="caret"></span> <i className="fas fa-angle-down top-[-1px] ml-[5px] align-middle relative after:content-[' ']"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item className="dropdown-items bg-transparent hover:bg-transparent border-0 m-0 flex items-center justify-start" href="#/action-1">
                                                <span className="icon-country w-[16px] h-[16px] inline-block my-0 mr-[10px] ml-[5px]"><img height={16} width={16} src="/assets/img/webp/usa.webp" alt="" /></span>English
                                            </Dropdown.Item>
                                            <Dropdown.Item className="dropdown-items bg-transparent hover:bg-transparent border-0 m-0 flex items-center justify-start" href="#/action-2">
                                                <span className="icon-country w-[16px] h-[16px] inline-block my-0 mr-[10px] ml-[5px]"><img height={16} width={16} src="/assets/img/webp/england.webp" alt="" /></span>England
                                            </Dropdown.Item>
                                            <Dropdown.Item className="dropdown-items bg-transparent hover:bg-transparent border-0 m-0 flex items-center justify-start" href="#/action-3">
                                                <span className="icon-country w-[16px] h-[16px] inline-block my-0 mr-[10px] ml-[5px]"><img height={16} width={16} src="/assets/img/webp/france.webp" alt="" /></span>France
                                            </Dropdown.Item>
                                            <Dropdown.Item className="dropdown-items bg-transparent hover:bg-transparent border-0 m-0 flex items-center justify-start" href="#/action-4">
                                                <span className="icon-country w-[16px] h-[16px] inline-block my-0 mr-[10px] ml-[5px]"><img height={16} width={16} src="/assets/img/webp/russian.webp" alt="" /></span>Russian
                                            </Dropdown.Item>
                                            <Dropdown.Item className="dropdown-items bg-transparent hover:bg-transparent border-0 m-0 flex items-center justify-start" href="#/action-5">
                                                <span className="icon-country w-[16px] h-[16px] inline-block my-0 mr-[10px] ml-[5px]"><img height={16} width={16} src="/assets/img/webp/spain.webp" alt="" /></span>Spain
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Topbar>
                {/* Header Start */}
                <HeaderNav theme="light" bg="white" expand="lg" containerClass="sm:px-0" className="py-[0px] md:px-0">
                    <Col className="col-6 col-lg-2 me-auto ps-lg-0">
                        <Link aria-label="header logo" className="flex items-center" to="/">
                            <Navbar.Brand className="inline-block p-0 m-0">
                                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                            </Navbar.Brand>
                        </Link>
                    </Col>
                    <Navbar.Toggle className="order-last md:px-[25px] md:ml-[12px] sm:ml-0">
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse className="col-auto col-lg-8 menu-order px-lg-0 justify-center">
                        <Menu {...props} />
                    </Navbar.Collapse>
                    <Col className="col-auto col-lg-2 text-end pe-0 font-size-0">
                        <SearchBar className="xs:pl-[15px]" />
                        <HeaderCart className="xs:pl-[15px]" style={{ "--base-color": "#0038e3" }} />
                    </Col>
                </HeaderNav>
                {/* Header End */}
            </Header>
            {/* Header End */}
            <SideButtons />
            {/* Section Start */}
            <section className="p-0 overflow-hidden landscape:md:h-[600px] relative">
                <Swiper
                    ref={swiperRef}
                    style={{ cursor: `url(/assets/img/webp/icon-move-light.webp)` }}
                    modules={[Autoplay, Keyboard]}
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    loop={true}
                    slidesPerView={1}
                    className="white-move">
                    {
                        swiperData.map((item, i) => {
                            return (
                                <SwiperSlide key={i} className="bg-no-repeat bg-cover relative overflow-hidden bg-center" style={{ backgroundImage: `url(${item.img})` }}>
                                    <div className="absolute h-full w-full opacity-[0.5] top-0 left-0 bg-darkgray"></div>
                                    <Container className="full-screen">
                                        <Row className="justify-center h-full">
                                            <Col xl={8} className="relative flex flex-col justify-center text-center h-full px-[0px] xs:px-[15px] landscape:md:h-[600px]">
                                                <div dangerouslySetInnerHTML={{ __html: item.title }}></div>
                                                <div className="font-medium flex justify-center font-serif uppercase xs:block">
                                                    <div className="xs:mb-[15px]">
                                                        <Buttons ariaLabel="our-services" to="/page/our-services" className="btn-fill btn-fancy font-medium tracking-[1px] rounded-none mr-[10px] xs:mr-0" themeColor="#fff" color="#232323" size="md" title="Explore services" />
                                                    </div>
                                                    <div>
                                                        <Buttons ariaLabel="home link" to="/" className="mx-[10px] font-medium btn-fancy tracking-[1px] rounded-none btn-transparent hover:text-black" themeColor="#fff" size="md" color="#fff" icon="fas fa-arrow-right right-icon" iconPosition="after" title="Discover litho" />
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
                {
                    <>
                        <div onClick={() => swiperRef.current.swiper.slidePrev()} className="absolute top-1/2 left-[40px] z-[1] -translate-y-1/2 cursor-pointer slider-navigation-style-07 swiper-button-previous-nav xs:left-[20px]">
                            <i className="line-icon-Arrow-OutLeft text-[40px] text-white flex justify-center items-center rounded-full h-[50px] w-[50px] text-center sm:h-[40px] sm:w-[40px] "></i>
                        </div>
                        <div onClick={() => swiperRef.current.swiper.slideNext()} className="absolute top-1/2 right-[40px] z-[1] -translate-y-1/2 cursor-pointer slider-navigation-style-07 swiper-button-next-nav  xs:right-[20px]">
                            <i className="line-icon-Arrow-OutRight text-[40px] text-white flex justify-center items-center rounded-full h-[50px] w-[50px] text-center sm:h-[40px] sm:w-[40px]"></i>
                        </div>
                    </>
                }
            </section>
            {/* Section End */}

            {/* About Start */}
            <section className="py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                <Container>
                    <Row className="justify-center">
                        <m.div className="flex flex-col md:mb-24 col-xl-3 col-lg-4 col-sm-7" {...fadeIn}>
                            <div className="mb-[20px] md:text-center sm:mb-[10px]">
                                <span className="font-serif text-md uppercase font-medium text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]">About company</span>
                            </div>
                            <h5 className="alt-font text-darkgray font-semibold font-serif mb-[20px] md:text-center md:mb-[30px] xs:w-[90%] xs:mx-auto">We combine design, thinking and technical</h5>
                            <div className="mt-auto mx-auto mx-lg-0">
                                <Buttons ariaLabel="link for" to="/" className="btn-fill btn-fancy rounded-none mt-[82px] tracking-[1px] font-medium font-serif uppercase md:my-0" themeColor="#232323" color="#fff" size="sm" title="Discover litho" />
                            </div>
                        </m.div>
                        <div className="col-xl-7 col-lg-8 offset-xl-2">
                            <IconWithText grid="row-cols-1 row-cols-lg-2 row-cols-sm-2 gap-y-[60px] sm:gap-y-[30px] xs:gap-y-[40px]" theme="icon-with-text-01" data={IconWithTextData} animation={fadeIn} animationDelay={0.2} />
                        </div>
                    </Row>
                </Container>
            </section>
            {/* About End */}
            {/* Section Start */}
            <section className="py-[130px] overflow-hidden bg-[#f7f8fc] lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container>
                    <Row className="justify-center">
                        <Col xl={5} lg={6} sm={8} className="text-center font-serif mb-20">
                            <span className="block justify-center text-md text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] via-[#e05fc4] to-[#ff798e] uppercase font-medium mb-[20px] sm:mb-[15px]">Recent portfolio</span>
                            <h5 className="text-darkgray text-center font-semibold tracking-[-1px]">Hand crafted pixel perfect designs for your projects</h5>
                        </Col>
                    </Row>
                </Container>
                <Container fluid className="px-[6rem] md:px-[2rem] xs:px-[15px]">
                    <Row>
                        <Col className="sm:px-0">
                            <PortfolioBoxed
                                className="m-0"
                                data={portfolioBoxedData.slice(0, 8)}
                                grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large text-center"
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Footer Start */}
            <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
            {/* Footer End */}
        </div>
    )
}

export default HeaderwithTopbarPage
