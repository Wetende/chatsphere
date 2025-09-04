import React, { useRef } from 'react'

// Libraries
import { Col, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Autoplay, Pagination } from "swiper/modules";

// Components
import Header, { HamburgerMenu, HeaderNav } from '../../Components/Header/Header'
import SocialIcons from '../../Components/SocialIcon/SocialIcons';
import { TiltBox } from '../../Components/FancyText/FancyText'
import ReactCustomScrollbar from '../../Components/ReactCustomScrollbar';
import SideButtons from "../../Components/SideButtons";

// Data
const SocialIconData = [
    {
        color: "#000",
        link: "https://www.facebook.com/",
        icon: "fab fa-facebook-f"
    },
    {
        color: "#000",
        link: "https://www.instagram.com/",
        icon: "fab fa-instagram"
    },
    {
        color: "#000",
        link: "https://twitter.com/",
        icon: "fab fa-twitter"
    }
]

const SwiperData = [
    {
        img: "https://via.placeholder.com/693x722",
        title: "farmland",
        link: "/portfolio/single-project-page-01",
        subtitle: "wonderful place"
    },
    {
        img: "https://via.placeholder.com/693x722",
        title: "biolator",
        link: "/portfolio/single-project-page-02",
        subtitle: "create brand"
    },
    {
        img: "https://via.placeholder.com/693x722",
        title: "celebrate",
        link: "/portfolio/single-project-page-03",
        subtitle: "good morning"
    },
    {
        img: "https://via.placeholder.com/693x722",
        title: "gardner",
        link: "/portfolio/single-project-page-04",
        subtitle: "everything good"
    },
    {
        img: "https://via.placeholder.com/693x722",
        title: "aparthotel",
        link: "/portfolio/single-project-page-05",
        subtitle: "good suggestions"
    },
    {
        img: "https://via.placeholder.com/693x722",
        title: "truenorth",
        link: "/portfolio/single-project-page-01",
        subtitle: "true celebrations"
    },
    {
        img: "https://via.placeholder.com/693x722",
        title: "lightology",
        link: "/portfolio/single-project-page-02",
        subtitle: "energy formula"
    },
]

const CreativeportfolioPage = () => {
    const swiperRef = useRef(null)

    return (
        <>
            <SideButtons animation={false} />
            {/* Header Start */}
            <Header className="py-0">
                <HeaderNav fluid="fluid" theme="light" bg="white" menu="dark" className="px-[35px] h-[100px] xs:h-[80px] py-0 md:px-0">
                    <Col className="col-12 lg:mx-auto flex items-center justify-between md:py-[15px] xs:!px-0">
                        <Col className="col-auto col-sm-4 p-0 flex border-0 xs:hidden">
                            <SocialIcons theme="social-icon-style-12" size="xs" iconColor="dark" data={SocialIconData} />
                        </Col>
                        <Col className="col-auto col-sm-4 flex justify-center xs:!px-0">
                            <Link aria-label="link for" to="/" className='flex'>
                                <Navbar.Brand className="inline-block p-0 m-0">
                                    <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                                    <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                                    <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                                </Navbar.Brand>
                            </Link>
                        </Col>
                        <Col className="col-auto col-sm-4 pe-lg-0 justify-end flex creativeportfolio-humburger-menu md:!px-0">
                            <HamburgerMenu theme="light" className="w-[25%] xl:w-[40%] lg:w-[45%] md:w-[50%] sm:w-full">
                                <Row className="h-full mx-0">
                                    <Col lg={12} className="p-0">
                                        <Row className="h-[100vh] p-28 xs:p-12 mx-0 items-center justify-center bg-darkgray">
                                            <Col xs={12} className="hamburgermenu-modern-page text-left h-full max-h-[calc(65vh-100px)] flex-1 px-0">
                                                <ReactCustomScrollbar theme="light" className="h-full flex justify-center" autoHide>
                                                    <div>
                                                        <ul className="font-serif w-full flex flex-col justify-center h-full">
                                                            <li className="py-[13px] px-0 relative sm:text-center"><Link className="font-semibold" aria-label="link for" to="/">home</Link></li>
                                                            <li className="py-[13px] px-0 relative sm:text-center"><Link className="font-semibold" aria-label="link for" to="/page/about-me">about</Link></li>
                                                            <li className="py-[13px] px-0 relative sm:text-center"><Link className="font-semibold" aria-label="link for" to="/page/our-services">services</Link></li>
                                                            <li className="py-[13px] px-0 relative sm:text-center"><Link className="font-semibold" aria-label="link for" to="/portfolio/portfolio-colorful-metro">portfolio</Link></li>
                                                            <li className="py-[13px] px-0 relative sm:text-center"><Link className="font-semibold" aria-label="link for" to="/blogs/blog-grid">blog</Link></li>
                                                            <li className="py-[13px] px-0 relative sm:text-center"><Link className="font-semibold" aria-label="link for" to="/page/contact-modern">contact</Link></li>
                                                        </ul>
                                                    </div>
                                                </ReactCustomScrollbar>
                                            </Col>
                                            <Col className="col-12 text-left none md:block sm:hidden px-0">
                                                <div className="font-serif mt-[50px]">
                                                    <span className="mb-[10px] font-light text-xlg inline-block">Let's work together?</span>
                                                    <h2 className="heading-6 mb-0"><a aria-label="gmail" href="mailto:info@domain.com" className="text-white border-b border-white hover:text-darkgray font-medium">info@domain.com</a></h2>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </HamburgerMenu>
                        </Col>
                    </Col>
                </HeaderNav>
            </Header>
            {/* Header End */}

            {/* Section Start */}
            <section className="overflow-hidden h-[85vh] landscape:md:h-auto p-0 relative flex justify-center items-center">
                <Swiper
                    className="creative-portfolio-slider black-move swiper-pagination-dark swiper-pagination-big pb-[30px]"
                    slidesPerView="auto"
                    speed={1500}
                    ref={swiperRef}
                    modules={[Mousewheel, Autoplay, Pagination]}
                    pagination={false}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    mousewheel={{ invert: true }}>

                    {
                        SwiperData.map((item, i) => {
                            return (
                                <SwiperSlide key={i} className="w-[30%] lg:w-[35%] md:w-full">
                                    <TiltBox>
                                        <Link aria-label="link for" to={item.link} className="overflow-visible">
                                            <img width={576} height={600} alt="" className="mb-12 mx-auto sm:mb-8" src={item.img} />
                                            <h2 className="relative inline-block justify-center font-serif font-semibold text-darkgray -tracking-[1px] mb-[5px]"> {item.title}</h2>
                                            <div className="bottom-text text-lg text-center text-spanishgray font-sans">{item.subtitle}</div>
                                        </Link>
                                    </TiltBox>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>

                {/* Slider Navigation */}
                {/* <div onClick={() => swiperRef.current.swiper.slidePrev()} className="flex absolute z-[1] top-1/2 left-[25px] btn-slider-next rounded-full justify-center items-center text-white bg-[#17171780] h-[40px] w-[40px] cursor-pointer" >
                        <button aria-label="swiper next" className="text-xmd"><i className="feather-arrow-left"></i></button>
                    </div>
                <div onClick={() => swiperRef.current.swiper.slideNext()} className="flex btn-slider-prev absolute top-1/2 right-[25px] z-[1] rounded-full justify-center items-center h-[40px] w-[40px] ml-[10px] cursor-pointer text-white bg-[#17171780]" >
                    <button aria-label="swiper prev" className="text-xmd"><i className="feather-arrow-right"></i></button>
                </div> */}

            </section>
            {/* Section End */}

        </>
    )
}

export default CreativeportfolioPage