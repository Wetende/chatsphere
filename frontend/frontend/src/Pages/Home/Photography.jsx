import React, { useState } from 'react'

// Libraries
import { Col, Container, Row, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Parallax } from 'react-scroll-parallax';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Keyboard, Pagination } from "swiper/modules";
import { m } from "framer-motion";

// Components
import Header, { CollapsibleMenu } from '../../Components/Header/Header'
import ReactCustomScrollbar from '../../Components/ReactCustomScrollbar'
import MouseMove from '../../Components/MouseMove';
import { fadeIn, fadeInLeft, zoomIn } from '../../Functions/GlobalAnimations'
import Buttons from '../../Components/Button/Buttons'
import Overlap from '../../Components/Overlap/Overlap'
import Clients from '../../Components/Clients/Clients'
import InteractiveBanners06 from '../../Components/InteractiveBanners/InteractiveBanners06'
import PortfolioJustifiedGallery from '../../Components/Portfolio/PortfolioJustifiedGallery'
import TestimonialsCarousel09 from '../../Components/TestimonialCarousel/TestimonialsCarousel09'
import BlogMetro from '../../Components/Blogs/BlogMetro';
import SocialIcons from '../../Components/SocialIcon/SocialIcons'
import { Footer } from '../../Components/Footers/Footer'
import SideButtons from "../../Components/SideButtons";

// Functions
import { addZeroBeforeNumber } from "../../Functions/Utilities";

// Data
import { blogData } from "../../Components/Blogs/BlogData";

const InteractiveBannersData = [
    {
        title: "wedding",
        img: "https://via.placeholder.com/600x816",
        btnTitle: "Portfolio",
        btnLink: "/portfolio/portfolio-justified-gallery",
        imgLink: "#"
    },
    {
        title: "product",
        img: "https://via.placeholder.com/600x816",
        btnTitle: "Portfolio",
        btnLink: "/portfolio/portfolio-justified-gallery",
        imgLink: "#"
    },
    {
        title: "outdoor",
        img: "https://via.placeholder.com/600x816",
        btnTitle: "Portfolio",
        btnLink: "/portfolio/portfolio-justified-gallery",
        imgLink: "#"
    }
]
const SwiperImgData = [
    {
        img: "https://via.placeholder.com/1920x1080",
        title: "PORTRAIT",
        btnName: "explore portrait",
        btnLink: "/portfolio/portfolio-justified-gallery"
    },
    {
        img: "https://via.placeholder.com/1920x1080",
        title: "NATURE",
        btnName: "explore nature",
        btnLink: "/portfolio/portfolio-justified-gallery"
    },
    {
        img: "https://via.placeholder.com/1920x1080",
        title: "WILDLIFE",
        btnName: "explore wildlife",
        btnLink: "/portfolio/portfolio-justified-gallery"
    },
]

const socialIconsData = [
    {
        color: "#fff",
        link: "https://www.facebook.com/",
        icon: "fab fa-facebook-f"
    },
    {
        color: "#fff",
        link: "https://twitter.com/",
        icon: "fab fa-twitter"
    },
    {
        color: "#fff",
        link: "https://www.linkedin.com/",
        icon: "fab fa-linkedin-in"
    },
]

const portfolioClassicData = [
    {
        title: "Photography",
        img: "https://via.placeholder.com/600x819",
        category: [""],
        subtitle: "Armchair",
        link: "#"
    },
    {
        title: "Photography",
        img: "https://via.placeholder.com/600x819",
        category: [""],
        subtitle: "Truenorth",
        link: "#"
    },
    {
        title: "Photography",
        img: "https://via.placeholder.com/600x819",
        category: [""],
        subtitle: "Educamp",
        link: "#"
    },
    {
        title: "Photography",
        img: "https://via.placeholder.com/600x819",
        category: [""],
        subtitle: "Cortifiel",
        link: "#"
    },
    {
        title: "Photography",
        img: "https://via.placeholder.com/600x819",
        category: [""],
        subtitle: "Instacuppa",
        link: "#"
    },
    {
        title: "Photography",
        img: "https://via.placeholder.com/600x819",
        category: [""],
        subtitle: "Pendant",
        link: "#"
    }
]

const clientData = [
    {
        img: "https://via.placeholder.com/225x110"
    },
    {
        img: "https://via.placeholder.com/225x110"
    },
    {
        img: "https://via.placeholder.com/225x110"
    },
    {
        img: "https://via.placeholder.com/225x110"
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
    },
]

const TestimonialsCarouselData = [
    {
        firstname: "Jemas",
        lastname: "Dossan",
        title: "Art freedom and creativity",
        content: "Lorem ipsum dolor sit amet consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet consectetur adipiscing elit.",
        img: "/assets/img/webp/home-seo-agency-quote.webp",
        thumbimg: "https://via.placeholder.com/125x125"
    },
    {
        firstname: "Jeremy",
        lastname: "Girard",
        title: "Design is not making beauty",
        content: "Lorem ipsum dolor sit amet consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet consectetur adipiscing elit.",
        img: "/assets/img/webp/home-seo-agency-quote.webp",
        thumbimg: "https://via.placeholder.com/125x125"
    },
    {
        firstname: "Colin",
        lastname: "Powell",
        title: "Design is a plan for elements",
        content: "Lorem ipsum dolor sit amet consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet consectetur adipiscing elit.",
        img: "/assets/img/webp/home-seo-agency-quote.webp",
        thumbimg: "https://via.placeholder.com/125x125",
    }
]

// Filter the blog data category wise
const blogMetroData = blogData.filter((item) => item.blogType === "metro").filter(item => item.category.includes("photography"));

const PhotographyPage = (props) => {
    const [show, setShow] = useState(false);
    const swiperRef = React.useRef(null)
    const [activeSlide, setActiveSlide] = useState(0)
    return (
        <div style={props.style}>
            <SideButtons />
            {/* Header Start */}
            <Header topSpace={{ md: true }} className="left-menu-modern-sidebar fixed top-0 left-0 z-10 md:w-full md:h-auto">
                <div className="bg-black sidebar-nav-action h-[100vh] md:h-auto w-[65px] md:w-full py-[30px] flex flex-col md:flex-row md:justify-between md:px-[30px] md:py-[15px] sm:px-[15px]">
                    <Col className="flex justify-center md:justify-start">
                        <Link aria-label="header logo" to="/">
                            <img width={30} height={35} className="max-h-[36px]" alt="" src="/assets/img/webp/symbol.webp" />
                        </Link>
                    </Col>
                    <Col className="flex items-center justify-center xs:justify-end">
                        <Navbar className="inline-block" variant="dark">
                            <Navbar.Toggle className="push-button" onClick={() => setShow(!show)}>
                                <Link aria-label="link for" to="#" onClick={(e) => e.preventDefault()} className="nav-icon">
                                    <span className="navbar-toggler-line"></span>
                                    <span className="navbar-toggler-line"></span>
                                    <span className="navbar-toggler-line"></span>
                                    <span className="navbar-toggler-line"></span>
                                </Link>
                            </Navbar.Toggle>
                            <div className={`left-menu-wrapper flex items-center w-[380px] bg-[#000] hover:bg-darkgray md:hover:bg-[#000] transition-default fixed top-[var(--header-height)] left-[65px] md:left-0 xs:w-full -z-10 h-[calc(100vh-var(--header-height))]${show ? " show" : ""}`}>
                                <div className="col-12 h-full px-[3.5rem] sm:px-4">
                                    <ReactCustomScrollbar className="pl-[15px]" theme="light" autoHide>
                                        <div >
                                            <CollapsibleMenu className="w-full mx-auto xs:px-[15px]" theme="light" />
                                        </div>
                                    </ReactCustomScrollbar>
                                </div>
                            </div>
                        </Navbar>
                    </Col>
                    <Col className="flex flex-col justify-end md:flex-row xs:hidden">
                        <SocialIcons size="xs" theme="social-icon-style-01" className="flex-col md:flex-row justify-center" iconColor="light" data={socialIconsData} />
                    </Col>
                </div>
            </Header>
            {/* Header End */}

            {/* Section Start */}
            <div className="pl-[65px] md:pl-0">
                {/* Section Start */}
                <section className="relative">
                    <Swiper
                        modules={[Autoplay, EffectFade, Keyboard, Pagination]}
                        effect="fade"
                        className="relative swiper-pagination-fractional photography-slider"
                        loop={true}
                        ref={swiperRef}
                        pagination={true}
                        keyboard={{ enabled: true, onlyInViewport: true }}
                        fadeEffect={{ crossFade: true }}
                        slidesPerView={1}
                        onSlideChange={(swiperCore) => {
                            const { realIndex } = swiperCore;
                            setActiveSlide(realIndex)
                        }}
                    >
                        <div onClick={() => swiperRef.current.swiper.slidePrev()} className="swiper-button-prev">
                            <span className="line"></span>
                            <span>{addZeroBeforeNumber(activeSlide === 0 ? SwiperImgData.length : activeSlide)}</span>
                        </div>
                        {
                            SwiperImgData.map((item, i) => {
                                return (
                                    <SwiperSlide key={i} className="relative full-screen flex flex-col items-center justify-center font-serif bg-cover bg-center xs:h-[664px]" style={{ backgroundImage: `url(${item.img})` }}>
                                        <Swiper
                                            modules={[Autoplay]}
                                            autoplay={{ delay: 0, disableOnInteraction: false }}
                                            speed={15000}
                                            loop={true}
                                            allowTouchMove={false}
                                            className="absolute top-1/2 w-full -translate-y-1/2 text-[235px] leading-[235px] tracking-[-12px] font-bold uppercase opacity-10 z-0 swiper-auto-slide lg:text-[150px] sm:text-[100px] xs:leading-[60px] xs:text-[80px]">
                                            <SwiperSlide>{item.title}</SwiperSlide>
                                            <SwiperSlide>{item.title}</SwiperSlide>
                                            <SwiperSlide>{item.title}</SwiperSlide>
                                            <SwiperSlide>{item.title}</SwiperSlide>
                                        </Swiper>
                                        <Row className="h-full">
                                            <Col className="h-full justify-center items-center flex flex-col">
                                                <m.div
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={activeSlide === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
                                                    transition={{ delay: 0.5, duration: 0.6 }}
                                                    className="relative overflow-hidden font-serif text-center text-[235px] xl:text-[210px] lg:text-[150px] lg:leading-[150px] md:text-[120px] sm:text-[110px] xs:text-[76px] xs:leading-[76px] leading-none font-bold uppercase landscape:md:text-[57px] landscape:md:leading-[57px]">
                                                    <div className="relative z-[5] flex justify-center lg:inline-block text-gradient bg-gradient-to-r from-[#0cd6a2] via-[#56de9c] to-[#c7da26]">{item.title}</div>
                                                    <MouseMove enableOnHover={true} speed={2} className="absolute top-0 text-gradient bg-transparent">
                                                        <span className="inline-block text-border text-border-width-2px text-[#728a70]">{item.title}</span>
                                                    </MouseMove>
                                                </m.div>
                                                <m.span className="inline-block uppercase tracking-[19px] text-[24px] lg:text-lg md:text-md sm:text-sm xs:text-xs xs:tracking-[10px] leading-[26px] text-white mt-[25px] landscape:md:text-[7px] landscape:md:leading-[8px] landscape:md:tracking-[7px] landscape:md:mt-0"
                                                    initial={{ opacity: 0 }}
                                                    animate={activeSlide === i ? { opacity: 1 } : { opacity: 0 }}
                                                    transition={{ delay: 1.4, duration: 0.8 }}
                                                >2022 collection</m.span>
                                                <m.div
                                                    className="absolute bottom-[80px] inline-block"
                                                    initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                                                    animate={{ clipPath: activeSlide === i ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                                                    transition={{ delay: 2, duration: 0.6 }}
                                                >
                                                    <Link aria-label="link for" to={item.btnLink} className="text-[#828282] hover:text-white text-lg inline-block text-decoration-line-bottom-medium font-serif font-normal xs:text-xmd">{item.btnName}</Link>
                                                </m.div>
                                            </Col>
                                        </Row>
                                    </SwiperSlide>)
                            })
                        }
                        <div onClick={() => swiperRef.current.swiper.slideNext()} className="swiper-button-next">
                            <span>{addZeroBeforeNumber(activeSlide === (SwiperImgData.length - 1) ? "1" : activeSlide + 2)}</span>
                            <span className="line"></span>
                        </div>
                    </Swiper>
                </section>
                {/* Section End */}

                <section className="py-[160px] cover-background overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" style={{ backgroundImage: `url('https://via.placeholder.com/1856x877')` }}>
                    <Container fluid>
                        <m.div className="row justify-end items-end mb-[200px] sm:mb-0">
                            <Col xl={3} lg={5} md={6} className="sm:mb-[30px]">
                                <h2 className="font-serif font-semibold text-basecolor mb-12 md:w-[95%]">about photographer</h2>
                                <span className="text-lg leading-[36px] inline-block w-[75%] lg:w-[90%] opacity-60 md:text-xmd xs:leading-[22px]">Hello, I am a highly organised motivated professional photographer with a wealth of experience in a range of photographic styles and services.</span>
                            </Col>
                            <m.div className="col-lg-3 col-md-6" {...fadeInLeft}>
                                <span className="w-[90px] h-[1px] bg-basecolor inline-block align-middle mr-[18px]"></span>
                                <a aria-label="gmail" href="mailto:hello@yourdomain.com" className="font-serif text-white">hello@yourdomain.com</a>
                            </m.div>
                        </m.div>
                    </Container>
                </section>
                {/* Section End */}

                {/* Section Start */}
                <section className="overflow-visible pb-[9%] px-[10rem] bg-[#060606] xl:px-0">
                    <Container>
                        <Row className="justify-center">
                            <Overlap>
                                <Col className="relative text-center">
                                    <m.img width={385} height={705} src="https://via.placeholder.com/385x705" className="mx-auto mt-[5.5rem] xs:mt-32" alt="photography" {...{ ...zoomIn, transition: { duration: 0.7 } }} />
                                </Col>
                            </Overlap>
                        </Row>
                        <Row className="justify-center">
                            <Col lg={3} className="text-center relative -top-[50px] mb-20">
                                <span className="w-[1px] h-[60px] bg-mediumgray opacity-20 inline-block mb-[30px]"></span>
                                <m.span className="font-serif text-lg uppercase tracking-[3px] block font-medium" {...fadeIn}>Expertise area</m.span>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid>
                        <Row className="justify-center">
                            <Col xs={12} lg={11} sm={8}>
                                <InteractiveBanners06 grid="row-cols-lg-3 gap-y-10 justify-center" data={InteractiveBannersData} animation={fadeIn} />
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Section End */}

                {/* Section Start */}
                <section className="py-[160px] bg-[#131313] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                    <Container>
                        <Row>
                            <m.div className="md:mb-[50px] xs:mb-[35px] col-xl-5 col-lg-6 col-md-7" {...fadeIn}>
                                <h2 className="heading-3 font-serif font-semibold text-white mb-[30px] xs:mb-8">I am always ready for a challenge.</h2>
                                <Buttons ariaLabel="link for" to="/portfolio/portfolio-justified-gallery" className="font-medium border-0 flex items-center font-serif uppercase md:mb-[15px] hover:text-white p-0 xs:mb-0" size="xl" color="#c7da26" title="Explore portfolio" icon="line-icon-Arrow-OutRight ml-[15px] text-[40px]" iconPosition="after" />
                            </m.div>
                            <m.div className="xs:mb-[35px] col-lg-3 col-sm-6 offset-xl-1" {...{ ...fadeInLeft, transition: { delay: 0.4, duration: 1, ease: "circOut" } }}>
                                <span className="text-lg inline-block mb-[15px] font-serif text-white xs:text-xmd xs:leading-[22px]">15+ Award winner</span>
                                <p className="text-lg leading-[36px] inline-block w-[90%] opacity-60 xs:text-xmd xs:leading-[22px]">Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.</p>
                            </m.div>
                            <m.div className="col-lg-3 col-sm-6" {...{ ...fadeInLeft, transition: { delay: 0.6, duration: 1, ease: "circOut" } }}>
                                <span className="text-lg inline-block mb-[15px] font-serif text-white xs:text-xmd xs:leading-[22px]">13+ Years experience</span>
                                <p className="text-lg leading-[36px] inline-block w-[90%] opacity-60 xs:text-xmd xs:leading-[22px]">Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.</p>
                            </m.div>
                        </Row>
                    </Container>
                    <Container fluid className="px-[9.5rem] xl:px-0">
                        <Row className="justify-center">
                            <Col xl={11} className="mt-[10.5rem] xs:mt-12">
                                <PortfolioJustifiedGallery filter={false} grid="grid grid-3col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={portfolioClassicData} />
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Section End */}

                {/* Section start */}
                <m.div className="relative overflow-hidden pb-[130px] lg:pb-[90px] md:pb-[100px] sm:pb-[50px] sm:px-[15px]" {...fadeIn}>
                    <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[-30px] left-0 h-[100vh] w-full" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
                    <m.div {...fadeIn}>
                        <Container>
                            <Row className="justify-center">
                                <Col lg={3} className="text-center mb-20">
                                    <span className="w-[1px] h-[65px] bg-mediumgray opacity-20 inline-block mb-[30px]"></span>
                                    <span className="font-serif text-lg uppercase tracking-[3px] relative block font-medium xs:text-xmd xs:leading-[22px]">Testimonials</span>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Row className="justify-center">
                                <Col xs={12} xl={6} lg={7} md={9} className="relative">
                                    <TestimonialsCarousel09
                                        data={TestimonialsCarouselData}
                                        carouselOption={{
                                            className: "white-move",
                                            slidesPerView: 1,
                                            loop: true,
                                            navigation: true
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </m.div>
                </m.div>
                {/* Section end */}

                {/* Section Start */}
                <section className="pb-[130px] bg-[#131313] overflow-visible lg:pb-[90px] md:pb-[75px] sm:py-[50px]">
                    <Container>
                        <Row>
                            <Overlap className="mb-[90px] sm:mb-[50px] xs:mb-12">
                                <Col className="text-center relative">
                                    <span className="font-serif font-semibold inline-block text-[11rem] leading-[11rem] text-gradient photography-bg-gradient -tracking-[7px] lg:-tracking-[1.5px] sm:text-[8rem] xs:text-[5rem]">memories</span>
                                </Col>
                            </Overlap>
                        </Row>
                        <Clients grid="row-cols-1 row-cols-md-2 row-cols-lg-4 justify-center" theme="client-logo-style-02" data={clientData} animation={fadeIn} />
                    </Container>
                </section>
                {/* Section End */}

                {/* Section Start */}
                <section className="py-[160px] border-t border-[#ffffff1a] bg-[#131313] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                    <Container>
                        <Row className="items-center">
                            <Col lg={6} sm={8} className="text-left xs:mb-[15px] xs:text-center">
                                <h2 className="heading-4 font-serif font-semibold text-white mb-0">Latest blog posts</h2>
                            </Col>
                            <Col lg={6} sm={4} className="text-right xs:text-center">
                                <Buttons ariaLabel="link for" to="/blogs/blog-metro" className="font-medium font-serif uppercase btn-link after:h-[2px] md:text-md md:mb-[15px] after:bg-[#c7da26] hover:text-basecolor hover:bg-basecolor" size="xl" color="#c7da26" title="View all post" />
                            </Col>
                        </Row>
                    </Container>
                    <Container className="p-0">
                        <BlogMetro pagination={false} grid="mt-[7.5rem] grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large xs:mt-[5.5rem]" data={blogMetroData} />
                    </Container>
                </section>
                {/* Section End */}

                {/* Footer Start */}
                <Footer className="bg-[#131313]">
                    <div className="py-[50px] border-t border-[#ffffff1a]">
                        <Container>
                            <Row>
                                <Col md={3} className="sm:mb-[20px]">
                                    <Link aria-label="link for" to="/" className="sm:flex sm:justify-center">
                                        <img className="max-h-[36px] align-middle" alt='logo' src="/assets/img/webp/logo-white.webp" width="111" height="36" />
                                    </Link>
                                </Col>
                                <Col md={6} className="flex justify-center items-center text-center sm:mb-[20px]">
                                    <p className="mb-0">© {new Date().getFullYear()} Litho is Proudly Powered by <a aria-label="footer link" rel="noreferrer" className="text-white font-medium underline underline-offset-4" href="https://www.themezaa.com/" target="_blank">ThemeZaa</a></p>
                                </Col>
                                <Col md={3} className="text-right footer-icon sm:text-center">
                                    <SocialIcons theme="social-icon-style-01" className="justify-end sm:justify-center" size="xs" iconColor="light" data={FooterIconData} />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Footer>
                {/* Footer End */}
            </div>
        </div >
    )
}

export default PhotographyPage
