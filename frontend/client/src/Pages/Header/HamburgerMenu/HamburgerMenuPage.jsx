import React from "react"

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Parallax } from "react-scroll-parallax"
import { m } from "framer-motion";

// Components
import Header, { CollapsibleMenu, HamburgerMenu, HeaderNav } from "../../../Components/Header/Header"
import ReactCustomScrollbar from "../../../Components/ReactCustomScrollbar"
import FooterStyle01 from "../../../Components/Footers/FooterStyle01"
import CustomModal from "../../../Components/CustomModal";
import SocialIcons from "../../../Components/SocialIcon/SocialIcons"
import IconWithText from '../../../Components/IconWithText/IconWithText'
import Buttons from '../../../Components/Button/Buttons'
import { fadeIn } from "../../../Functions/GlobalAnimations"
import BlogClassic from "../../../Components/Blogs/BlogClassic"
import SideButtons from "../../../Components/SideButtons";
import PortfolioSwitchImg from '../../../Components/Portfolio/PortfolioSwitchImg'

// Data
import { portfolioSwitchImgData } from '../../../Components/Portfolio/PortfolioData'
import { blogData } from "../../../Components/Blogs/BlogData"

const SocialIconsData = [
    {
        color: "#828282",
        link: "https://www.facebook.com/",
        icon: "fab fa-facebook-f",
    },
    {
        color: "#828282",
        link: "https://www.instagram.com/",
        icon: "fab fa-instagram",
    },
    {
        color: "#828282",
        link: "https://twitter.com/",
        icon: "fab fa-twitter",
    }
];

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

const HamburgerMenuPage = (props) => {
    return (
        <div style={props.style}>
            {/* Header Start */}
            <Header topSpace={{ md: true }} className="absolute top-0 left-0 w-full z-10 md:py-0">
                <HeaderNav fluid="fluid" theme="dark" expand="lg" containerClass="sm:px-0" className="px-[35px] h-[100px] md:h-[70px] md:px-0">
                    <Col className="col-auto col-sm-6 col-lg-2 mr-auto ps-lg-0">
                        <Link aria-label="link for home" className="flex items-center" to="/">
                            <Navbar.Brand className="inline-block p-0 m-0">
                                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                            </Navbar.Brand>
                        </Link>
                    </Col>
                    <Col className="col-auto pr-0 flex">
                        <SocialIcons
                            theme="social-icon-style-01"
                            size="xs"
                            iconColor="light"
                            className="justify-start"
                            data={SocialIconsData}
                        />
                        <span className="block ml-[17px]">
                            <HamburgerMenu theme="light" className="w-[100vw]">
                                <div className="w-full h-[100vh] right-0 bg-black">
                                    <Row lg={2} xs={1} className="h-full g-0 landscape:md:h-[100vh]">
                                        <Col className="p-14 flex flex-col justify-center h-[100vh] md:py-[50px] xs:px-7">
                                            <ReactCustomScrollbar autoHide>
                                                <div className="mx-auto w-[63%] xs:w-[90%]">
                                                    <CollapsibleMenu className="w-full my-auto" theme="light" />
                                                </div>
                                            </ReactCustomScrollbar>
                                        </Col>
                                        <Col className="bg-cover bg-center md:hidden" style={{ backgroundImage: `url(https://via.placeholder.com/1200x1200)` }}>
                                            <div className="flex flex-col items-center justify-center h-full p-20 text-center xs:px-0">
                                                <h5 className="font-serif mx-auto w-[300px] text-white tracking-[-1px] block mt-8">we are a creative <span className="font-semibold">design studio</span></h5>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </HamburgerMenu>
                        </span>
                    </Col>
                </HeaderNav>
            </Header>
            {/* Header End */}
            <SideButtons />
            {/* Parallax Scrolling Start */}
            <div className="full-screen landscape:md:h-[600px] md:flex md:items-center overflow-hidden relative">
                <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] landscape:md:h-[600px]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1080)` }}></Parallax>
                <Container className="relative h-full">
                    <Row className="justify-center h-full">
                        <Col lg={8} md={9} sm={10} xs={12} className="flex text-center flex-col justify-center py-32">
                            <span className="font-serif tracking-[5px] text-white uppercase font-medium mb-[35px] block sm:text-">
                                London based highly
                            </span>
                            <h1 className="font-serif font-bold text-[130px] text-white text-shadow-double-large uppercase mb-0 leading-[120px] tracking-[-4px]  lg:text-[110px] lg:leading-[100px] md:text-[90px] md:leading-[85px] sm:text-[50px] sm:leading-[50px] sm:tracking-[-0.5px]">
                                <span className="text-border text-border-width-2px fill-transparent block">
                                    creative
                                </span>
                                agency
                            </h1>
                        </Col>
                    </Row>

                    {/* Modal Component Start */}
                    <CustomModal.Wrapper
                        modalBtn={
                            <div className="cursor-pointer text-center absolute bottom-[50px] left-1/2 -translate-x-1/2 flex justify-center sm:bottom-[30px]">
                                <span className="w-[120px]  text-[34px] flex justify-center items-center">
                                    <i className="line-icon-Video-5 text-[50px] text-white p-[15px] xs:p-[10px] rounded w-full bottom-[50px]"></i>
                                </span>
                            </div>
                        } >
                        <div className="w-[1020px] max-w-full relative rounded mx-auto">
                            <div className="fit-video">
                                <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                            </div>
                        </div>
                    </CustomModal.Wrapper>
                    {/* Modal Component End */}
                </Container>
            </div>
            {/* Parallax Scrolling End */}

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

            {/* Portfolio Start */}
            <section className="bg-[#f7f8fc] py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container>
                    <Row className="justify-center">
                        <Col xl={5} lg={6} md={8} className="font-serif text-center mb-[95px] md:mb-[75px]">
                            <span className="text-md font-serif font-medium uppercase inline-block text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] mb-[20px]">recent portfolio</span>
                            <h5 className="text-darkgray font-semibold font-serif -tracking-[1px] mb-0">Hand crafted pixel perfect designs for your projects</h5>
                        </Col>
                    </Row>
                </Container>
                <Container fluid className="px-[6rem] md:px-[2rem] xs:px-[15px]">
                    <PortfolioSwitchImg
                        grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large text-center m-0"
                        data={portfolioSwitchImgData.slice(0, 8)}
                    />
                </Container>
            </section>
            {/* Portfolio End */}

            {/* Blog Start */}
            <m.section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
                <Container>
                    <Row className="justify-center">
                        <Col xl={5} lg={6} md={8} className="mb-[82px] text-center sm:mb-[20px]" >
                            <span className="font-serif font-medium text-md uppercase inline-block text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] mb-[20px]">get the latest insights</span>
                            <h5 className="font-serif font-semibold text-darkgray -tracking-[1px] mb-0">Stay updated with the latest trends and business news</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-0">
                            <BlogClassic pagination={false} grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={blogData.slice(0, 4)} />
                        </Col>
                    </Row>
                </Container>
            </m.section>
            {/* Blog End */}

            {/* Footer Start */}
            <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
            {/* Footer End */}
        </div>
    )
}

export default HamburgerMenuPage