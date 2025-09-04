import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { m } from 'framer-motion';
import { Link } from 'react-router-dom'
import { Parallax } from "react-scroll-parallax";

// Components
import Header, { HeaderNav, Menu, MobileMenu } from '../../Components/Header/Header'
import InteractiveBanners01 from '../../Components/InteractiveBanners/InteractiveBanners01'
import SocialIcons from '../../Components/SocialIcon/SocialIcons'
import { fadeIn } from '../../Functions/GlobalAnimations'
import Buttons from '../../Components/Button/Buttons'
import Counter from '../../Components/Counters/Counter'
import PortfolioColorful from '../../Components/Portfolio/PortfolioColorful';
import FooterStyle12 from '../../Components/Footers/FooterStyle12';
import TestimonialsCarousel07 from '../../Components/TestimonialCarousel/TestimonialsCarousel07';
import Clients from '../../Components/Clients/Clients';
import BlogOverlayImg from '../../Components/Blogs/BlogOverlayImg';
import SideButtons from "../../Components/SideButtons";

// Data
import { InteractiveBannersData01 } from '../../Components/InteractiveBanners/InteractiveBannersData'
import { TestimonialsCarouselData7 } from '../../Components/TestimonialCarousel/TestimonialsCarouselData';
import { CounterData03 } from '../../Components/Counters/CounterData'
import { portfolioColorfulData } from '../../Components/Portfolio/PortfolioData';
import { blogData } from "../../Components/Blogs/BlogData";
import InViewPort from '../../Components/InViewPort';

const SocialIconsData = [
    {
        color: "#ffffff99",
        link: "https://www.facebook.com/",
        icon: "fab fa-facebook-f"
    },
    {
        color: "#ffffff99",
        link: "https://www.instagram.com/",
        icon: "fab fa-instagram"
    },
    {
        color: "#ffffff99",
        link: "https://twitter.com/",
        icon: "fab fa-twitter"
    }
]

const clientdata = [
    {
        img: 'https://via.placeholder.com/232x110'
    },
    {
        img: 'https://via.placeholder.com/232x110'
    },
    {
        img: 'https://via.placeholder.com/232x110'
    },
    {
        img: 'https://via.placeholder.com/232x110'
    },
]

// Filter the blog data category wise
const blogOverlayImgData = blogData.filter((item) => item.blogType === "overlayImage");

const DigitalagencyPage = (props) => {
    return (
        <div style={props.style}>
            <SideButtons />
            <div className="bg-white">

                {/* Header Start */}
                <Header topSpace={{ md: true }} type="reverse-scroll">
                    <HeaderNav fluid="fluid" theme="dark" expand="lg" className="digital-agency-header py-[0px] px-[35px] md:px-[15px] md:py-[20px] sm:px-0" containerClass="md:pr-0">
                        <Col lg={2} sm={6} xs={"auto"} className="mr-auto ps-0">
                            <Link aria-label="header logo" className="flex items-center" to="/">
                                <Navbar.Brand className="inline-block p-0 m-0">
                                    <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                                    <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-brownish-orange-green.webp' data-rjs='/assets/img/webp/logo-brownish-orange-green@2x.webp' alt='logo' />
                                    <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-brownish-orange-green.webp' data-rjs='/assets/img/webp/logo-brownish-orange-green@2x.webp' alt='logo' />
                                </Navbar.Brand>
                            </Link>
                        </Col>
                        <Menu className="justify-center col-auto col-lg-8 md:hidden" {...props} />
                        <MobileMenu className="order-last d-lg-none" type="full" {...props} />
                        <Col lg={2} xs={"auto"} className="justify-end pe-0 flex items-center">
                            <SocialIcons theme="social-icon-style-01 block text-center" iconColor="light" size="xs" data={SocialIconsData} />
                        </Col>
                    </HeaderNav>
                </Header>
                {/* Header End */}

                {/* Parallax Scrolling Start */}
                <div className="full-screen md:h-[600px] sm:h-[350px] md:flex md:items-center overflow-hidden relative bg-white">
                    <Parallax className="lg-no-parallax bg-cover absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] sm:h-[70vh]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1080)` }}></Parallax>
                    <div className="absolute top-0 left-0 h-full w-full opacity-30 bg-gradient-to-b from-[transparent] to-[#1f232c]"></div>
                    <Container className="relative md:h-full">
                        <Row className="h-[100vh] md:h-full">
                            <Col className="flex flex-col">
                                <h1 className="font-serif font-semibold text-white text-[130px] leading-[120px] w-[50%] mt-auto mb-0 tracking-[-5px] lg:text-[110px] lg:leading-[100px] md:text-[90px] md:leading-[85px] sm:text-[50px] sm:leading-[50px] sm:-tracking-[.5px] xs:w-[70%] xs:text-[60px] xs:leading-[65px]">Digital agency</h1>
                                <div className="flex flex-row items-center mt-auto mb-[7.5rem]">
                                    <span className="bg-[#e6994e] w-[50%] h-[1px] mr-36 md:w-[40%] sm:mr-8 sm:w-[50px] xs:mr-8"></span>
                                    <span className="font-serif text-lg text-[#e6994e] xs:text-xmd">Over 30 years of experience</span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* Parallax Scrolling End */}

                {/* Section Start */}
                <section className="py-[160px] overflow-hidden relative lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                    <Container>
                        <Row className="items-center justify-center">
                            <Col xl={5} md={6} xs={11} className="sm:mb-[30px]">
                                <m.h2  {...{ ...fadeIn, transition: { delay: 0.2 } }} className="heading-4 font-serif font-semibold text-darkgray mb-0">We are creative digital agency working for huge brands</m.h2>
                            </Col>
                            <Col xl={{ span: 5, offset: 1 }} md={6} xs={11}>
                                <m.p  {...{ ...fadeIn, transition: { delay: 0.3 } }} className="text-lg mb-[25px] leading-[38px] md:text-xmd">Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor incididunt ut labore et dolore magna ut enim ad minim veniam nostrud exercitation.</m.p>
                                <m.div  {...{ ...fadeIn, transition: { delay: 0.4 } }}><Buttons ariaLabel="button link for our services page" to="/page/our-services" className="font-medium font-serif uppercase btn-link after:h-[2px] md:text-md md:mb-[15px] after:bg-darkgray hover:text-darkgray" size="xl" color="#232323" title="Explore services" /></m.div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Section End */}

                {/* Lazy Load HTML */}
                <InViewPort>
                    {/* Section Start */}
                    <section className="overflow-hidden relative">
                        <InteractiveBanners01 grid="row-cols-1" data={InteractiveBannersData01} animation={fadeIn} />
                    </section>
                    {/* Section End */}

                    {/* Section Start */}
                    <section className="py-[160px] overflow-hidden relative lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                        <Container>
                            <div className="row items-center">
                                <m.div className="col-12 col-lg-3 col-md-4 col-sm-6 xs:mb-[40px] xs:px-[40px]" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
                                    <span className="font-serif font-semibold text-xlg text-darkgray tracking-[-.5px] block mb-[15px] lg:text-lg">Different thinking</span>
                                    <p className="text-lg leading-[38px] xs:w-[90%] md:text-xmd">Lorem ipsum consectetur adipiscing elit do eiusmod tempor incididunt.</p>
                                </m.div>
                                <m.div {...{ ...fadeIn, transition: { delay: 0.4 } }} className="xs:px-[40px] col-lg-3 offset-xl-1 col-md-4 col-sm-6">
                                    <span className="font-serif font-semibold text-xlg text-darkgray -tracking-[.5px] block mb-[15px] lg:text-lg">Digital talents</span>
                                    <p className="text-lg leading-[38px] xs:w-[90%] md:text-xmd">Lorem ipsum consectetur adipiscing elit do eiusmod tempor incididunt.</p>
                                </m.div>
                                <m.div className="col-md-4 offset-xl-1"{...{ ...fadeIn, transition: { delay: 0.6 } }}>
                                    <div className="-mr-[50vw]">
                                        <span className="font-serif font-semibold text-darkgray opacity-[.1] text-[300px] tracking-[-10px] leading-[100px] lg:text-[200px] md:text-[150px] sm:hidden break-normal">creative</span>
                                    </div>
                                </m.div>
                            </div>
                        </Container>
                    </section>
                    {/* Section End */}

                    {/* Section Start */}
                    <m.section className="overflow-visible p-0 relative" {...fadeIn}>
                        <Container fluid>
                            <Row>
                                <div className="left-0 top-0 absolute z-[1] p-0 w-[auto] -translate-y-1/2 lg:w-[250px] -translate-x-1/2 sm:hidden">
                                    <img width={400} height={400} alt="top" src="https://via.placeholder.com/400x400" />
                                </div>
                                <Col xl={7} lg={6} className="cover-background md:h-[500px] sm:h-[350px]" style={{ backgroundImage: `url('https://via.placeholder.com/1139x782')` }}></Col>
                                <Col xl={5} lg={6} className="bg-darkgray py-40 px-[9%] xl:p-[6%] lg:p-[6%] md:p-[10%] sm:py-[15%] sm:px-[10%]">
                                    <m.span {...fadeIn} className="font-serif font-medium text-[#e6994e] tracking-[2px] uppercase block mb-[35px]">Let's work together</m.span>
                                    <m.h2 {...{ ...fadeIn, transition: { delay: 0.4 } }} className="heading-4 font-serif font-semibold text-white -tracking-[.5px] mb-12 w-[90%] sm:w-full">Digital technology and marketing for leading brands</m.h2>
                                    <m.p {...{ ...fadeIn, transition: { delay: 0.6 } }} className="text-lg leading-[38px] mb-[42px] w-[90%] lg:w-full md:w-[80%] sm:w-full md:text-xmd">Lorem ipsum dolor amet consectetur nostrud eiusmod tempor incididunt et dolore enim minim veniam nostrud exercitation laboris nisi ut aliquip ex ea commodo incididunt.</m.p>
                                    <m.div {...{ ...fadeIn, transition: { delay: 0.8 } }}><Buttons ariaLabel="link for conatct modern page" to="/page/contact-modern" className="font-medium font-serif uppercase btn-link after:h-[2px] md:text-md md:mb-[15px] after:bg-white hover:text-white tracking-[1px]" size="xl" color="#fff" title="Start new projects" /></m.div>
                                </Col>
                            </Row>
                        </Container>
                    </m.section>
                    {/* Section End */}

                    {/* Section Start */}
                    <m.section className="pt-[100px] pb-0 py-[130px] overflow-hidden xs:py-[50px]" {...fadeIn}>
                        <Container>
                            <Row sm={2} xs={1} className="items-center">
                                <Col className="xs:text-center xs:mb-[10px]">
                                    <h2 className="heading-4 font-serif font-semibold text-darkgray mb-0">Selected work</h2>
                                </Col>
                                <Col className="text-right xs:text-center">
                                    <Buttons ariaLabel="link for portfolio" to="/portfolio/portfolio-colorful-four-column" className="font-medium font-serif uppercase btn-link after:h-[2px] !text-md md:mb-[15px] after:bg-black hover:text-darkgray xs:mb-[2px]" color="#000" title="Explore portfolio" />
                                </Col>
                            </Row>
                        </Container>
                    </m.section>
                    {/* Section End */}

                    {/* Section Start */}
                    <m.section className="overflow-hidden" {...fadeIn}>
                        <Row>
                            <Col className="mt-32 xs:mt-[5.5rem]">
                                <PortfolioColorful
                                    overlay={["#58BC4BE6", "#D9A026E6", "#813EA9E6", "#82BC13E6", "#214BDFE6", "#E28E1AE6", "#04C05CE6", "#E52D8CE6", "#029BD3E6", "#E77345E6", "#0575C4E6", "#E2731AE6", "#9FB012E6", "#13C7B8E6", "#E8074CE6"]}
                                    carousel={true}
                                    data={portfolioColorfulData}
                                    carouselOption={{
                                        slidesPerView: 1,
                                        spaceBetween: 25,
                                        loop: true,
                                        breakpoints: { 576: { slidesPerView: 1.5 }, 992: { slidesPerView: 2 }, 1200: { slidesPerView: 2.5 }, 1400: { slidesPerView: 3 }, 1600: { slidesPerView: 4 } },
                                        autoplay: { delay: 3000, disableOnInteraction: false }
                                    }}
                                />
                            </Col>
                        </Row>
                    </m.section>
                    {/* Section Start */}

                    {/* Section Start */}
                    <m.section className="py-[130px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
                        <Container>
                            <Counter
                                theme="counter-style-03"
                                grid="items-center justify-center sm:gap-y-10"
                                className="font-serif offset-lg-1 col-lg-2 col-md-3 col-sm-6 col-xs-1 text-darkgray text-left sm:text-center"
                                data={CounterData03}
                                duration={2}
                                postfix_sign="+"
                            />
                        </Container>
                    </m.section>
                    {/* Section End */}

                    {/* Section Start */}
                    <section className="digital-agency-testimonial-carousel pt-[160px] pb-[130px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" style={{ backgroundImage: `url(${"https://via.placeholder.com/1920x983"})`, }}>
                        <Container>
                            <m.div className="row justify-center text-center items-center" {...fadeIn}>
                                <Col xl={6} lg={7} md={9} className="relative">
                                    <TestimonialsCarousel07
                                        data={TestimonialsCarouselData7}
                                        className="swiper-navigation-02 swiper-navigation-light white-move"
                                        carouselOption={{
                                            slidesPerView: 1,
                                            loop: true,
                                            navigation: true,
                                            autoplay: { delay: 19000, disableOnInteraction: false },
                                        }}
                                    />
                                </Col>
                            </m.div>
                            <Clients grid="row row-cols-1 row-cols-lg-4 row-cols-sm-2 mt-[8.5rem] client-logo-style-07 lg:mt-20 xs:mt-[30px]" theme="client-logo-style-07" data={clientdata} animation={fadeIn} />
                        </Container>
                    </section>
                    {/* Section End */}

                    {/* Section Start */}
                    <section className="bg-lightgray py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
                        <Container>
                            <Row sm={2} xs={1} className="items-center">
                                <Col className="text-left xs:mb-[10px]">
                                    <h2 className="heading-4 xs:text-center font-serif font-semibold text-darkgray mb-0">Latest stories</h2>
                                </Col>
                                <div className="text-right xs:text-center">
                                    <Buttons ariaLabel="link for blog overlay" to="/blogs/blog-overlay-image" className="font-medium font-serif uppercase btn-link after:h-[2px] !text-md md:mb-[15px] after:bg-black hover:text-darkgray" color="#000" title="All stories" />
                                </div>
                            </Row>
                            <Row>
                                <Col className="mt-20 px-0">
                                    <BlogOverlayImg overlay={["#232323", "rgba(35,35,35,0)"]} pagination={false} grid="grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={blogOverlayImgData.slice(0, 3)} />
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    {/* Section End */}
                </InViewPort>
            </div>

            {/* Footer Start */}
            <FooterStyle12 className="footer-digitalagency text-[#828282] bg-white" theme="light" logo="/assets/img/webp/logo-light-brownish-orange-black.webp" />
            {/* Footer End */}
        </div>
    )
}

export default DigitalagencyPage
