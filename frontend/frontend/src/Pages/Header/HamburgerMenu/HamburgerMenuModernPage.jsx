import React from 'react'

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Pagination } from "swiper/modules";
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { m } from "framer-motion";

// Components
import Header, { HamburgerMenu, HeaderNav } from '../../../Components/Header/Header';
import PortfolioColorful from '../../../Components/Portfolio/PortfolioColorful';
import FooterStyle01 from '../../../Components/Footers/FooterStyle01';
import ReactCustomScrollbar from '../../../Components/ReactCustomScrollbar';
import { TextAnime } from '../../../Components/FancyText/FancyText'
import { fadeIn } from "../../../Functions/GlobalAnimations";
import SideButtons from "../../../Components/SideButtons";

// Data
const sliderData = [
    {
        img: "https://via.placeholder.com/1920x1160",
        title: "Black",
        subtitle: "shade",
        link: "/portfolio/single-project-page-01"
    },
    {
        img: "https://via.placeholder.com/1920x1160",
        title: "Browne",
        subtitle: "coffee",
        link: "/portfolio/single-project-page-02"
    },
    {
        img: "https://via.placeholder.com/1920x1160",
        title: "Nature",
        subtitle: "travel",
        link: "/portfolio/single-project-page-03"
    },
];

const data = [
    {
        icon: "feather-life-buoy",
        title: "Digital branding"
    },
    {
        icon: "feather-briefcase",
        title: "BRAND STRATEGY"
    },
    {
        icon: "feather-globe",
        title: "WEBSITE DESIGNING"
    },
    {
        icon: "feather-shopping-bag",
        title: "ECOMMERCE TOOL"
    }
]

const portfolioColorfulData = [
    {
        title: "Mongolish",
        img: "https://via.placeholder.com/1000x817",
        category: [""],
        subtitle: "Branding",
        link: "/portfolio/single-project-page-01",
        double_col: true
    },
    {
        title: "Masscoating",
        img: "https://via.placeholder.com/800x653",
        category: [""],
        subtitle: "Photography",
        link: "/portfolio/single-project-page-02"
    },
    {
        title: "Cortifiel",
        img: "https://via.placeholder.com/800x653",
        category: [""],
        subtitle: "Brochure",
        link: "/portfolio/single-project-page-03"
    },
    {
        title: "Everyday",
        img: "https://via.placeholder.com/1000x817",
        category: [""],
        subtitle: "Brochure",
        link: "/portfolio/single-project-page-04",
        double_col: true
    },
    {
        title: "Scandinavian",
        img: "https://via.placeholder.com/800x653",
        category: [""],
        subtitle: "Branding",
        link: "/portfolio/single-project-page-05"
    },
    {
        title: "The Simplest",
        img: "https://via.placeholder.com/800x653",
        category: [""],
        subtitle: "Website",
        link: "/portfolio/single-project-page-01"
    }
]

const HamburgerMenuModernPage = (props) => {
    return (
        <div style={props.style}>
            {/* Header Start */}
            <Header topSpace={{ md: true }} className="absolute top-0 left-0 w-full z-10 md:py-0">
                <HeaderNav fluid="fluid" theme="dark" expand="lg" containerClass="sm:px-0" className="px-[35px] md:px-0 h-[100px] md:h-[70px]">
                    <Col className="col-auto col-sm-6 col-lg-2 mr-auto ps-lg-0">
                        <Link aria-label="link for" to="/" className="flex items-center">
                            <Navbar.Brand className="inline-block p-0 m-0">
                                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                            </Navbar.Brand>
                        </Link>
                    </Col>
                    <Col className="col-auto pr-0 flex">
                        <HamburgerMenu theme="light" className="h-[100vh] w-[50vw] xl:w-[60vw] lg:w-[70vw] md:w-[50vw] sm:w-[100vw]">
                            <Row className="h-full mx-0">
                                <Col className="col-6 bg-no-repeat bg-cover overflow-hidden relative bg-center md:hidden" style={{ backgroundImage: `url("https://via.placeholder.com/800x1200")` }}></Col>
                                <Col lg={6} className="p-0">
                                    <Row className="h-full flex-col p-[5.5rem] landscape:md:py-[2.5rem] landscape:md:h-[100vh] mx-0 items-center justify-around xs:p-[3rem] bg-black">
                                        <Col xs={12} className="hamburgermenu-modern-page landscape:md:mt-0 text-left h-auto px-0 max-h-[calc(65vh-100px)] xs:max-h-[calc(100vh-60px)]">
                                            <ReactCustomScrollbar className="h-full" autoHide>
                                                <div>
                                                    <ul>
                                                        <li className="py-[13px] px-0 relative sm:text-center"><Link aria-label="link for" to="/">home</Link></li>
                                                        <li className="py-[13px] px-0 relative sm:text-center"><Link aria-label="link for" to="/page/about-us">about</Link></li>
                                                        <li className="py-[13px] px-0 relative sm:text-center"><Link aria-label="link for" to="/page/our-services">services</Link></li>
                                                        <li className="py-[13px] px-0 relative sm:text-center"><Link aria-label="link for" to="/portfolio/portfolio-colorful-metro">portfolio</Link></li>
                                                        <li className="py-[13px] px-0 relative sm:text-center"><Link aria-label="link for" to="/blogs/blog-grid">blog</Link></li>
                                                        <li className="py-[13px] px-0 relative sm:text-center"><Link aria-label="link for" to="/page/contact-modern">contact</Link></li>
                                                    </ul>
                                                </div>
                                            </ReactCustomScrollbar>
                                        </Col>
                                        <Col xs={12} className="block sm:hidden px-0">
                                            <div className="hamburgermenu-modern-social-icon font-serif relative mt-[50px] landscape:md:mt-0">
                                                <ul>
                                                    <li className="py-[10px] border-b border-[#ffffff26]"><a aria-label="link for" target="_blank" rel="noreferrer" href="https://www.facebook.com/" className="text-[#3b5998] text-center rounded-full relative inline-block hover:text-white"><i className="fab fa-facebook-f w-[30px]"></i>Facebook</a></li>
                                                    <li className="py-[10px] border-b border-[#ffffff26]"><a aria-label="link for" target="_blank" rel="noreferrer" href="https://twitter.com/" className="text-[#00aced] text-center rounded-full relative inline-block hover:text-white"><i className="fab fa-twitter w-[30px]"></i>Twitter</a></li>
                                                    <li className="py-[10px] border-b border-[#ffffff26]"><a aria-label="link for" target="_blank" rel="noreferrer" href="https://www.instagram.com/" className="text-[#fe1f49] text-center rounded-full relative inline-block hover:text-white"><i className="fab fa-instagram w-[30px]"></i>Instagram</a></li>
                                                    <li className="py-[10px]"><a aria-label="link for" target="_blank" href="https://dribbble.com/" rel="noreferrer" className="text-[#ea4c89] text-center rounded-full relative inline-block hover:text-white"><i className="fab fa-dribbble w-[30px]"></i>Dribbble</a></li>
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
            <SideButtons />
            {/* Section Start */}
            <section className="p-0 overflow-hidden HamburgerMenuModernPage-vertical-swiper">
                <Swiper
                    autoplay={{ delay: 4500, disableOnInteraction: false }}
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    modules={[Autoplay, Pagination, Keyboard]}
                    loop={false}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    direction="horizontal"
                    breakpoints={{
                        992: {
                            direction: "vertical"
                        }
                    }}
                    className="full-screen swiper-pagination-01 swiper-pagination-light swiper-pagination-medium vertical-white-move landscape:md:h-[600px]">
                    {sliderData && sliderData.map((item, i) => {
                        return (
                            <SwiperSlide key={i} className="bg-no-repeat bg-cover relative overflow-hidden bg-center" style={{ backgroundImage: `url(${item.img})` }} >
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,rgba(16,16,16,0),#101010)]"></div>
                                <Container className="h-full landscape:md:h-[600px]">
                                    <Row className="block justify-center h-full">
                                        <Col md={7} sm={6} xs={10} className="relative flex flex-column justify-center text-start py-[7rem] h-full" >
                                            <h1 className='font-serif font-light text-[130px] lg:text-[110px] md:text-[90px] sm:text-[50px] text-white leading-[120px] lg:leading-[100px] md:leading-[85px] sm:leading-[50px] tracking-[-6px] sm:tracking-[-0.5px]'>
                                                <span className='font-semibold block'>{item.title}</span>{item.subtitle}
                                            </h1>
                                            <Link aria-label="link for" to={item.link} className="left-[15px] bottom-[100px] z-[100] absolute text-left" >
                                                <span className="flex items-center text-center hover:text-[#828282]">
                                                    <span className="w-[50px] h-[50px] text-lg relative flex justify-center items-center rounded-[50%] mr-[25px] border-[2px] border-[#ffffff1a]">
                                                        <i className="fas fa-arrow-right flex items-center justify-center text-xmd leading-normal ml-0 text-white"></i>
                                                    </span>
                                                    <span className="font-medium text-xmd font-serif uppercase inline-block align-middle text-white">
                                                        Watch projects
                                                    </span>
                                                </span>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Container>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section id="about" className="py-[160px] bg-darkgray overflow-hidden lg:py-[120px] md:py-[90px] sm:py-[80px] xs:py-[50px]">
                <Container>
                    <Row>
                        <Col xl={4} lg={5} md={6}>
                            <m.h4 className="font-serif font-semibold text-white -tracking-[1px] sm:text-center xxs:mb-[45px]" {...fadeIn}>
                                <span className="block p-0 sm:text-center tracking-[-1px]">A creative agency specialized in web</span>
                                <TextAnime duration={3000} color="#fff" className="rotate-text text-left sm:text-center font-semibold my-0 mx-auto" animation="slide" data={["strategy creation", "customize tools", "generated revenue"]} />
                            </m.h4>
                        </Col>
                        <m.div className="sm:text-center col-xl-5 col-md-6 offset-xl-2 offset-lg-1" {...{ ...fadeIn, transition: { delay: 0.5 } }}>
                            <span className="font-serif font-semibold text-white uppercase block mb-[15px]">About litho web agency</span>
                            <p className="text-xmd w-[95%] leading-[36px] md:w-full">With years of experience in the website design and development industry pride ourselves on creating unique, creative and quality designs that are developed upon the latest modern coding and developing techniques.</p>
                        </m.div>
                    </Row>
                    <Row className="row-cols-1 row-cols-lg-4 row-cols-sm-2 mt-36 justify-center md:mt-24 landscape:md:mt-12 xs:mt-[65px] gap-y-10">
                        {
                            data.map((item, i) => {
                                return (
                                    <m.div key={i} {...{ ...fadeIn, transition: { delay: 0.2 * i } }}>
                                        <div className="flex justify-center items-center h-full">
                                            <i className={`${item.icon} align-middle text-[28px] text-white mr-[15px]`}></i>
                                            <span className="font-serif font-semibold uppercase">{item.title}</span>
                                        </div>
                                    </m.div>
                                )
                            })
                        }
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="bg-darkgray">
                <Container fluid>
                    <Row>
                        <Col className="sm:px-0">
                            <PortfolioColorful
                                className="m-0"
                                overlay="#232323e6"
                                grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
                                data={portfolioColorfulData}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}
            {/* Footer Start */}
            <FooterStyle01 className="bg-darkgray text-[#828282]" theme="dark" />
            {/* Footer End */}
        </div>
    )
}

export default HamburgerMenuModernPage