import React, { useRef, useEffect } from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from "framer-motion";
import { Link as ScrollTo } from "react-scroll"

// Components
import Header, { HeaderNav, Menu } from '../../Components/Header/Header'
import MouseMove from '../../Components/MouseMove';
import { fadeIn, zoomIn } from '../../Functions/GlobalAnimations'
import { TextAnime } from '../../Components/FancyText/FancyText'
import BlogClassic from '../../Components/Blogs/BlogClassic'
import Buttons from '../../Components/Button/Buttons'
import Clients from '../../Components/Clients/Clients'
import PortfolioScattered from '../../Components/Portfolio/PortfolioScattered'
import ProcessStep from '../../Components/ProcessStep/ProcessStep'
import SocialIcons from '../../Components/SocialIcon/SocialIcons'
import TestimonialsCarousel01 from '../../Components/TestimonialCarousel/TestimonialsCarousel01'
import { Footer } from '../../Components/Footers/Footer'
import SideButtons from "../../Components/SideButtons";

// Data
import { blogData } from '../../Components/Blogs/BlogData'
import { ClientData02 } from '../../Components/Clients/ClientsData'
import { portfolioScatteredData } from '../../Components/Portfolio/PortfolioData'
import { ProcessStepData03 } from '../../Components/ProcessStep/ProcessStepData'
import { TestimonialsCarouselData1 } from '../../Components/TestimonialCarousel/TestimonialsCarouselData'

const FooterSocialIconData = [
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
        color: "#007bb6",
        link: "https://www.linkedin.com/",
        icon: "fab fa-linkedin-in"
    },
    {
        color: "#fe1f49",
        link: "https://www.instagram.com/",
        icon: "fab fa-instagram"
    },
    {
        color: "#1769ff",
        link: "https://www.behance.net/",
        icon: "fab fa-behance"
    }
]
const HeaderSocialIconsData = [
    {
        color: "#828282",
        link: "https://www.facebook.com/",
        icon: "fab fa-facebook-f"
    },
    {
        color: "#828282",
        link: "https://www.instagram.com/",
        icon: "fab fa-instagram"
    },
    {
        color: "#828282",
        link: "https://twitter.com/",
        icon: "fab fa-twitter"
    }
]

// Filter the blog data category wise
const blogClassicData = blogData.filter((item) => item.blogType === "classic").filter(item => item.category.includes("brandingagency"));

const BrandingagencyPage = (props) => {

    const splitword = useRef(null)

    useEffect(() => {
        let text = splitword.current,
            splitted_text = text.innerHTML.split("");

        const split_text_html = splitted_text.map((item, i) => {
            return `<span>${item}</span>`
        });

        text.innerHTML = split_text_html.join("");

        setTimeout(() => {
            text.querySelectorAll("span").forEach(item => item.classList.add("active"));
        }, 4800);
    }, [])

    return (
        <>
            <SideButtons />
            {/* Header Start */}
            <Header topSpace={{ md: true }} type="reverse-scroll">
                <HeaderNav fluid="fluid" theme="light" expand="lg" containerClass="px-0" className="py-[0px] px-[50px] md:px-[15px] md:py-[20px] sm:px-0">
                    <Col className="col-5 col-lg-2 ps-lg-0 me-auto me-lg-0 ">
                        <Link aria-label="header logo" className="flex items-center" to="/">
                            <Navbar.Brand className="inline-block p-0 m-0">
                                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                            </Navbar.Brand>
                        </Link>
                    </Col>
                    <Navbar.Toggle className="md:ml-[17px]">
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse className="col-auto justify-center col-lg-8 md:p-0">
                        <Menu {...props} />
                    </Navbar.Collapse>
                    <Col className="col-auto col-lg-2 text-end hidden-xs px-lg-0 md:!pl-[30px]">
                        <SocialIcons theme="social-icon-style-01" className="justify-end" size="xs" iconColor="dark" data={HeaderSocialIconsData} />
                    </Col>
                </HeaderNav>
            </Header>
            {/* Header End */}

            <div className="bg-white">
                {/* Section Start */}
                <section className="h-[100vh] md:h-[700px] sm:h-[400px] relative bg-center bg-[#f3f3f3] overflow-hidden bg-cover flex justify-center items-end py-[130px]" style={{ backgroundImage: `url('/assets/img/webp/home-branding-agency-bg-img-03.webp')` }}>
                    <MouseMove speed={1} className="h-full w-full flex justify-center items-center left-0 top-0 absolute z-[3]">
                        <m.div ref={splitword} className='random-char-fadein font-serif text-[200px] relative font-semibold leading-[250px] -tracking-[12px] text-darkgray md:text-[145px] md:leading-[145px] md:-tracking-[4px] sm:text-[108px] sm:leading-[108px] xs:-tracking-[3px] xs:text-[84px] xs:leading-[74px] xxs:text-[58px] xxs:leading-[43px]'>branding</m.div>
                    </MouseMove>
                    <svg className="drawing-animation absolute top-0 left-0 w-full h-full" width="100%" height="100%" viewBox="0 0 6400 1050" style={{ transform: "scale(1.5)" }}>
                        <defs>
                            <linearGradient id="gradiant" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#4b065b"></stop>
                                <stop offset="20%" stopColor="#4b065b"></stop>
                                <stop offset="40%" stopColor="#ff5751"></stop>
                                <stop offset="60%" stopColor="#de3486"></stop>
                                <stop offset="80%" stopColor="#480095"></stop>
                                <stop offset="100%" stopColor="#380075"></stop>
                            </linearGradient>
                        </defs>
                        <g style={{ transform: "translateX(443px)" }}>
                            <path fill="none" stroke="url(#gradiant)" d="M-11,418c118-76,269-119,416-120,540-3,719,538,1180,682,385,120,973,0,877-510-29-155-127-293-259-375-247-154-575-73-710,134-147,225-24,525,203,644,170,88,390,88,575,12C2775,675,3164,9,3693,170c330,99,425,481,199,728-177,192-506,187-627-45-145-280,78-542,354-564,226-17,344,112,465,231,92,89,203,150,320,176,218,49,365-35,522-132" />
                        </g>
                    </svg>
                    <m.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4, duration: 1 }} className="text-xlg font-serif text-darkgray inline-block relative -tracking-[1px] leading-[25px] md:text-[17px] sm:text-lg xs:text-sm xs:absolute xs:bottom-[80px]">we are a creative branding agency</m.span>
                    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4, duration: 1 }}>
                        <ScrollTo to="down-section" offset={0} delay={0} spy={true} smooth={true} duration={800} className="inline-block absolute left-1/2 bottom-[50px] z-[5] -translate-x-1/2 cursor-pointer">
                            <i className="ti-mouse text-[28px] text-darkgray up-down-ani"></i>
                        </ScrollTo>
                    </m.div>
                </section>
                {/* Section End */}

                {/* Section Start */}
                <section id="down-section" className="overflow-hidden bg-white p-0">
                    <Container fluid>
                        <Row>
                            <Col lg={2} md={4} className="flex flex-col justify-center border-r border-[#f5f5f5] p-0 sm:h-[400px]">
                                <m.div className="w-full content-box-image cover-background overflow-visible relative sm:h-full md:h-[300px] md:w-full" {...fadeIn} style={{ backgroundImage: "url(https://via.placeholder.com/645x638)" }}>
                                    <m.div className="justify-center items-center h-[130px] w-[130px] -right-[70px] -top-[70px] flex rounded-[50%] bg-white absolute box-shadow-extra-large sm:top-0 sm:right-0 md:w-[100px] md:h-[100px] md:-right-[50px] md:-top-[50px] xs:hidden" {...{ ...zoomIn, transition: { duration: 0.7, delay: 0.5 } }}>
                                        <h1 className="font-serif font-semibold text-darkgray mb-0 uppercase text-gradient bg-gradient-to-r from-[#b93c90] via-[#a92a96] to-[#951a9d]">B</h1>
                                    </m.div>
                                </m.div>
                            </Col>
                            <m.div className="flex flex-col justify-center border-b-[8px]  border-[#b93c90] xl:px-[5%] px-[8%] py-[12%] lg:py-[8%] lg:px-[7%] md:p-[10%] xs:border-0 col-xl-4 col-lg-6 col-md-8" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
                                <span className="font-serif font-medium text-spanishgray uppercase block mb-[30px]">About agency</span>
                                <h2 className="heading-4 font-serif font-semibold text-darkgray -tracking-[2px] mb-12">Provide branding solutions to grow your business</h2>
                                <p className="w-[90%] mb-[25px] xl:w-full xs:mb-[15px]">Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor incididunt labore et dolore magnaut enim ad minim veniam nostrud exercitation ullamco eiusmod tempor incididunt enim.</p>
                                <div className="mt-[25px]">
                                    <Buttons ariaLabel="about-us" to="/page/about-us" className="btn-fill btn-fancy font-medium font-serif uppercase rounded-none btn-shadow" size="md" themeColor="#000" color="#fff" title="About agency" />
                                </div>
                            </m.div>
                            <Col lg={2} md={6} className="flex flex-col justify-center border-[1px] !border-t-0 !border-b-0 border-[#f5f5f5] p-0 sm:h-[400px] sm:border-0 md:h-[600px] md:justify-end">
                                <m.div className="content-box-image cover-background md:h-[300px] sm:h-full" style={{ backgroundImage: "url(https://via.placeholder.com/639x638)" }} {...fadeIn}></m.div>
                            </Col>
                            <Col lg={2} md={6} className="flex flex-col justify-start border-r border-[#f5f5f5] p-0 sm:h-[400px] md:h-[600px]">
                                <m.div className="content-box-image cover-background md:h-[300px] sm:h-full" style={{ backgroundImage: "url(https://via.placeholder.com/638x638)" }} {...{ ...fadeIn, transition: { delay: 0.5 } }}></m.div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Section End */}

                {/* Section Start */}
                <section className="py-[160px] overflow-hidden bg-lightgray lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                    <Container>
                        <Row className="justify-center">
                            <Col md={6} className="font-serif text-center mb-[5.5rem] lg:mb-24 sm:mb-20">
                                <span className="font-medium text-spanishgray uppercase block mb-[10px] tracking-[1px]">Project planning</span>
                                <h2 className="heading-4 font-semibold text-darkgray -tracking-[2px] mb-0">Designed for you</h2>
                            </Col>
                            <ProcessStep grid="row-cols-1 row-cols-sm-2 row-cols-lg-4 gap-y-10" theme="process-step-style-03" data={ProcessStepData03} animation={fadeIn} animationDelay={0.3} />
                            <Col className="text-center mt-32 lg:mt-24 sm:mt-16">
                                <Buttons ariaLabel="contact-simple" to="/page/contact-simple" className="btn-fill btn-fancy shadow-[0_0_15px_rgba(0,0,0,0.08)] font-medium font-serif uppercase rounded-none btn-shadow text-[15px] md:mb-[15px]" size="lg" themeColor="#fff" color="#000" title="Start a project" />
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Section End */}

                {/* Section Start */}
                <m.section className="pt-[160px] overflow-hidden bg-white lg:pt-[120px] md:pt-[95px] sm:pt-[80px] xs:pt-[50px]" {...fadeIn}>
                    <Container>
                        <Row className="justify-center">
                            <Col md={6} className="font-serif text-center mb-36 lg:mb-24 sm:mb-20">
                                <span className="font-medium text-spanishgray uppercase block mb-[10px] tracking-[1px]">RECENT PROJECTS</span>
                                <h2 className="heading-4 font-semibold text-darkgray -tracking-[2px] mb-0">Select portfolio</h2>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="px-[7%] md:px-[3%] brandingagency-portfolioscattered sm:px-[15px]" fluid>
                        <PortfolioScattered
                            grid="row row-cols-1 row-cols-xl-4 row-cols-lg-2 row-cols-md-2 portfolio-scattered"
                            data={portfolioScatteredData.slice(0, 8)}
                        />
                    </Container>
                </m.section>
                {/* Section End */}

                {/* Section Start */}
                <section className="py-[160px] bg-center bg-no-repeat bg-white lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" style={{ backgroundImage: `url('/assets/img/webp/home-branding-agency-bg-img-01.webp')` }}>
                    <Container>
                        <Row className="justify-center items-center flex">
                            <m.div className="col-md-12 text-center" {...{ ...fadeIn, transition: { duration: 0.5, delay: 0.4 } }}>
                                <h2 className="heading-5 font-serif font-light mb-[20px] text-darkgray -tracking-[1px] md:mb-0">We help our clients to build</h2>
                                <TextAnime duration={3000} color="#232323" className="text-darkgray font-serif -tracking-[5px] text-center leading-[170px] text-[130px] font-semibold lg:text-[110px] lg:leading-[140px] md:text-[90px] md:leading-[110px] sm:text-[50px] sm:leading-[65px] sm:-tracking-[3px]" animation="slide" data={["branding", "marketing", "design"]} />
                            </m.div>
                        </Row>
                    </Container>
                </section>
                {/* Section End */}

                {/* Section Start */}
                <m.section className="bg-white bg-no-repeat bg-center" style={{ backgroundImage: `url(${"https://via.placeholder.com/1920x507"})` }} {...fadeIn}>
                    <Container>
                        <Row className="row-cols-lg-2 justify-center">
                            <Col>
                                <TestimonialsCarousel01
                                    data={TestimonialsCarouselData1}
                                    className="brandinga-agency-testimonials swiper-navigation-04 swiper-navigation-light swiper-pagination-dark swiper-pagination-big black-move"
                                    carouselOption={{
                                        slidesPerView: 1,
                                        loop: true,
                                        navigation: false,
                                        autoplay: { delay: 4500, disableOnInteraction: false },
                                        pagination: { dynamicBullets: false, clickable: true },
                                        keyboard: { enabled: true, onlyInViewport: true },
                                    }}
                                />
                            </Col>
                        </Row>
                    </Container>
                </m.section>
                {/* Section End */}

                {/* Section Start */}
                <section className="py-[200px] bg-white overflow-hidden lg:py-[160px] md:py-[110px] sm:py-[50px]">
                    <Container>
                        <Clients grid="row-cols-1 row-cols-md-2 row-cols-sm-2 row-cols-lg-4" theme="client-logo-style-02" data={ClientData02} animation={fadeIn} />
                    </Container>
                </section>
                {/* Section End */}

                {/* Section Start */}
                <section className="py-[130px] pt-0 overflow-hidden bg-white lg:py-[90px] md:py-[75px] sm:py-[50px]">
                    <Container className="xs:px-0">
                        <Row className="justify-center">
                            <Col md={6} className="font-serif text-center mb-[7.5rem] lg:mb-24 sm:mb-20 xs:mb-12">
                                <span className="font-medium text-spanishgray uppercase block mb-[10px] tracking-[1px]">LATEST ARTICLES </span>
                                <h2 className="heading-4 font-semibold text-darkgray -tracking-[2px] mb-0">Attractive articles</h2>
                            </Col>
                        </Row>
                        <Row className="justify-center">
                            <Col className="px-sm-0">
                                <BlogClassic pagination={false} grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={blogClassicData} />
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Section End */}
            </div>

            {/* Footer Start */}
            <Footer theme="light" topSpace={true} parallax={{ desktop: true, md: false }} className="bg-darkgray py-[10.5rem] md:py-[8.5rem]">
                <Container>
                    <Row className="flex justify-center">
                        <Col lg={8} className="text-center brandinga-agency-social-icon">
                            <SocialIcons theme="social-icon-style-10 justify-center" className="mb-[3.5rem] w-full" size="lg" iconColor="light" data={FooterSocialIconData} />
                            <h2 className="heading-4 font-serif text-[#828282] font-light mb-[10px] block -tracking-[2px]">New creative ideas send us an email</h2>
                            <h3 className="heading-4 font-serif font-semibold mb-28">
                                <a aria-label="gamil" href="mailto:info@domain.com" className="text-white text-decoration-line-bottom" target="_blank" rel="noreferrer">info@domain.com</a>
                            </h3>
                            <p className="mb-0 uppercase font-serif text-sm">© {new Date().getFullYear()} Litho is Proudly Powered by <a aria-label="ThemeZaa link" rel="noreferrer" className="text-white font-serif underline underline-offset-4 font-normal text-sm inline-block" href="https://www.themezaa.com/" target="_blank"> ThemeZaa</a></p>
                        </Col>
                    </Row>
                </Container>
            </Footer>
            {/* Footer End */}
        </>
    )
}

export default BrandingagencyPage;