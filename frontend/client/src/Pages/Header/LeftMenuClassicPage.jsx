import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Parallax } from "react-scroll-parallax";
import { m } from "framer-motion";

//Component
import { fadeIn, zoomIn } from '../../Functions/GlobalAnimations'
import ReactCustomScrollbar from "../../Components/ReactCustomScrollbar";
import Buttons from '../../Components/Button/Buttons'
import Header, { CollapsibleMenu, HamburgerMenu, HeaderNav } from "../../Components/Header/Header";
import IconWithText from '../../Components/IconWithText/IconWithText'
import PortfolioBoxed from '../../Components/Portfolio/PortfolioBoxed'
import Testimonials from '../../Components/Testimonials/Testimonials';
import FooterStyle01 from "../../Components/Footers/FooterStyle01";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import SideButtons from "../../Components/SideButtons";

// Data
import { TestimonialsData03 } from '../../Components/Testimonials/TestimonialsData';
import { portfolioBoxedData } from '../../Components/Portfolio/PortfolioData';
import CustomModal from '../../Components/CustomModal';

const IconWithTextData = [
    {
        icon: "line-icon-Money-Bag text-[#828282] text-[40px]",
        title: "Effective strategy",
        content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
    },
    {
        icon: "line-icon-Gear-2 text-[40px] text-[#828282]",
        title: "Powerfull customize",
        content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
    },
    {
        icon: "line-icon-Talk-Man text-[40px] text-[#828282]",
        title: "Customer satisfaction",
        content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
    },
    {
        icon: "line-icon-Cursor-Click2 text-[40px] text-[#828282]",
        title: "No coding required",
        content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
    },
];

const iconData = [
    {
        color: "#3b5998",
        link: "https://www.facebook.com/",
        icon: "fab fa-facebook-f"
    },
    {
        color: "#ea4c89",
        link: "https://dribbble.com/",
        icon: "fab fa-dribbble"
    },
    {
        color: "#00aced",
        link: "https://twitter.com/",
        icon: "fab fa-twitter"
    },
    {
        color: "#fe1f49",
        link: "https://www.instagram.com/",
        icon: "fab fa-instagram"
    },
]

const LeftMenuClassicPage = () => {
    return (
        <div className="pl-[290px] md:pl-0">
            <Header topSpace={{ md: true }} type="pos-left" className="w-[290px] h-[100vh] z-10 md:w-full md:h-auto">
                <div className="flex justify-between flex-col h-full bg-white border-r border-[#f3f3f3] pt-20 px-8 overflow-hidden md:pt-40 md:hidden">
                    <Col xs="auto" className="text-center leading-none">
                        <Link aria-label="header logo" to="/" className="inline-block leading-none">
                            <Navbar.Brand className="inline-block p-0 m-0">
                                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-gradient-sky-blue-pink.webp' data-rjs='/assets/img/webp/logo-gradient-sky-blue-pink@2x.webp' alt='logo' />
                                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-gradient-sky-blue-pink.webp' data-rjs='/assets/img/webp/logo-gradient-sky-blue-pink@2x.webp' alt='logo' />
                                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-gradient-sky-blue-pink.webp' data-rjs='/assets/img/webp/logo-gradient-sky-blue-pink@2x.webp' alt='logo' />
                            </Navbar.Brand>
                        </Link>
                    </Col>
                    <Col xs="auto" className="pl-[15px] max-h-[calc(100%-160px)]">
                        <ReactCustomScrollbar className="!items-start" autoHide theme="dark">
                            <div>
                                <CollapsibleMenu className="left-sidebar-menu w-full" theme="dark" />
                            </div>
                        </ReactCustomScrollbar>
                    </Col>
                    <Col xs="auto" className="mb-20">
                        <div className="my-8">
                            <SocialIcons theme="social-icon-style-01" className="text-center justify-center mb-8" size="sm" iconColor="dark" data={iconData} />
                        </div>
                        <span className="block text-center text-xs text-spanishgray">&copy; {new Date().getFullYear()} LITHO</span>
                    </Col>
                </div>
                <HeaderNav className="hidden md:flex justify-between px-[30px] sm:px-[15px] md:py-[20px]" bg="white" theme="light" containerClass="px-0">
                    <Link className="flex items-center justify-center" to="/">
                        <Navbar.Brand className="inline-block p-0 m-0">
                            <img width="111" height="36" loading="lazy" src='/assets/img/webp/logo-gradient-sky-blue-pink.webp' data-rjs='/assets/img/webp/logo-gradient-sky-blue-pink@2x.webp' alt='logo' />
                        </Navbar.Brand>
                    </Link>
                    <HamburgerMenu theme="dark" position="left" className="!w-[290px] bg-white border-t border-[#f4f4f4] flex flex-col justify-end !top-[var(--header-height)]" closeBtn={false}>
                        <div className="bg-white px-8 pb-20" style={{ height: `calc(100vh - var(--header-height))` }}>
                            <ReactCustomScrollbar autoHide className="pl-[15px] mt-[50px] !items-start">
                                <div>
                                    <CollapsibleMenu className="w-full left-sidebar-menu" theme="dark" />
                                    <div className="my-[60px]">
                                        <SocialIcons theme="social-icon-style-01" className="justify-center mb-8 text-center" size="sm" iconColor="dark" data={iconData} />
                                        <span className="block text-center text-xs text-spanishgray">&copy; {new Date().getFullYear()} LITHO</span>
                                    </div>
                                </div>
                            </ReactCustomScrollbar>
                        </div>
                    </HamburgerMenu>
                </HeaderNav>
            </Header>
            <SideButtons />
            {/* Parallax Section Start */}
            <div className="full-screen relative overflow-hidden landscape:md:h-[600px]">
                <Parallax className="lg-no-parallax bg-cover absolute top-[0px] left-0 w-full h-[100vh] md:top-[-10px] landscape:md:h-[600px]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1080)` }}></Parallax>
                <div className="absolute top-0 left-0 w-full h-full bg-darkgray opacity-30"></div>
                <Container className="relative h-full text-center landscape:md:h-[600px]">
                    <Row className="center-logo h-full items-center justify-center">
                        <Col xl={6} sm={7} className="justify-center items-center my-0 mx-auto lg:px-0">
                            <span className="mb-[35px] font-medium tracking-[2px] text-white text-xmd font-serif uppercase block sm:text-[16px] sm:mb-[15px]">
                                Created many creative concepts
                            </span>
                            <h1 className="mb-[45px] text-shadow-large font-bold text-white text-[100px] tracking-[-4px] leading-[95px] font-serif uppercase mx-auto text-shadow lg:text-[90px] lg:leading-[90px] md:text-[70px] md:leading-[65px] sm:text-[45px] sm:mb-[30px] sm:tracking-[-1px] sm:leading-[43px] xs:tracking-[-1px] xs:w-[80%]">
                                Creative elements
                            </h1>
                            <Link aria-label="home link" to="/" className="center-logo-btn text-[13px] tracking-[1px] text-sm py-[13px] px-[32px] leading-[19px] bg-[#000] inline-block text-white rounded-none uppercase w-auto font-serif font-medium bg-transparent border-2 border-transparent self-center hover:text-white">
                                Discover Tour
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Parallax Section End */}

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

            {/*Portfolio Section Start */}
            <section className="py-[130px] overflow-hidden bg-[#f7f8fc] lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container>
                    <Row className="justify-center">
                        <Col xl={5} lg={6} sm={8} className="font-serif text-center mb-20">
                            <span className="block text-md text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] via-[#e05fc4] to-[#ff798e] uppercase font-medium mb-[20px] sm:mb-[15px]">Recent portfolio</span>
                            <h5 className="text-darkgray font-semibold -tracking-[1px]">Hand crafted pixel perfect designs for your projects</h5>
                        </Col>
                    </Row>
                </Container>
                <Container fluid className="px-[6rem] lg:px-8 md:px-[2rem] xs:px-[15px]">
                    <Row>
                        <Col xs={12} className="xs:px-0">
                            <PortfolioBoxed
                                className="m-0"
                                data={portfolioBoxedData.slice(0, 8)}
                                grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large text-center"
                                />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/*Portfolio Section End */}

            {/* Info Banner Start */}
            <m.section className="relative bg-cover bg-center py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" style={{ backgroundImage: `url("https://via.placeholder.com/1920x1100")` }} {...fadeIn}>
                <div className="absolute top-0 left-0 w-full h-full opacity-60 bg-darkslateblue"></div>
                <Container className="relative">
                    <Row className="justify-center text-center">
                        <Col xl={7} lg={8} md={10}>
                            <div className="font-serif text-white">
                                <m.span className="inline-block" {...zoomIn}>
                                    {/* Modal Component Start */}
                                    <CustomModal.Wrapper
                                        modalBtn={
                                            <Buttons
                                                ariaLabel="modal link "
                                                type="submit"
                                                className="btn-sonar border-0 mx-auto mb-14"
                                                themeColor="#3452ff"
                                                color="#fff"
                                                size="lg"
                                                title={<i className="icon-control-play" />}
                                            />
                                        } >
                                        <div className="w-[1020px] max-w-full relative rounded mx-auto">
                                            <div className="fit-video">
                                                <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                                            </div>
                                        </div>
                                    </CustomModal.Wrapper>
                                    {/* Modal Component End */}
                                </m.span>
                                <m.h4 className="font-semibold mb-[45px]" {...fadeIn}>Beautifully simple handcrafted templates for your website</m.h4>
                                <m.span className="uppercase tracking-[1px]" {...fadeIn}>unlimited power and customization</m.span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </m.section>
            {/* Info Banner End */}

            {/* Section Start */}
            <section className="bg-[#f7f8fc] py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container>
                    <Row className="justify-center">
                        <Col xl={5} lg={6} sm={8} className="text-center mb-20">
                            <span className="text-center font-serif text-md inline-block font-medium text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] uppercase mb-[20px] sm:mb-[15px]"> What people are saying </span>
                            <h5 className="font-serif text-[2.3rem] justify-center text-center text-darkgray font-semibold tracking-[-1px]"> What our valuable customer are saying about us? </h5>
                        </Col>
                    </Row>
                    <Row className="justify-center">
                        <Col className="col-12 col-md-12 col-sm-8">
                            <Testimonials grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-10 justify-center" theme="testimonials-style-03" data={TestimonialsData03} animation={fadeIn} animationDelay={0.2} />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}
            {/* footer Start*/}
            <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
            {/* footer End */}
        </div>
    )
}

export default LeftMenuClassicPage
