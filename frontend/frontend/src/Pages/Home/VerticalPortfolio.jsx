import React, { useState } from 'react'

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from "framer-motion";

// Components
import Header, { CollapsibleMenu, HamburgerMenu, HeaderNav } from '../../Components/Header/Header'
import ReactCustomScrollbar from "../../Components/ReactCustomScrollbar";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import SideButtons from "../../Components/SideButtons";
import { addZeroBeforeNumber } from "../../Functions/Utilities";

// Data
import { fadeIn } from "../../Functions/GlobalAnimations";

const SocialIconsData = [
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

    {
        color: "#828282",
        link: "https://www.linkedin.com/",
        icon: "fab fa-linkedin-in"
    }
]

const SwiperSlideData = [
    {
        img: "https://via.placeholder.com/1920x1134",
        title: "Leather",
        subtitle: "collection",
        link: "/portfolio/single-project-page-01/",
        content: "Branding and identity"
    },
    {
        img: "https://via.placeholder.com/1920x1134",
        title: "Shobon",
        subtitle: "london",
        link: "/portfolio/single-project-page-02/",
        content: "Photography and web"
    },
    {
        img: "https://via.placeholder.com/1920x1134",
        title: "Timelee",
        subtitle: "watches",
        link: "/portfolio/single-project-page-03/",
        content: "Branding and marketing"
    },
    {
        img: "https://via.placeholder.com/1920x1134",
        title: "Forward",
        subtitle: "collection",
        link: "/portfolio/single-project-page-04/",
        content: "Branding and identity"
    },
    {
        img: "https://via.placeholder.com/1920x1134",
        title: "Bodytite",
        subtitle: "clothes",
        link: "/portfolio/single-project-page-05/",
        content: "Branding and identity"
    }
]

const VerticalportfolioPage = () => {
    const [index, setIndex] = useState(0)

    return (
        <div className="vertical-portfolio">
            <SideButtons animation={false} />
            {/* Header Start */}
            <Header type="reverse-scroll" topSpace={{ desktop: false, md: true }}>
                <HeaderNav fluid="fluid" theme="dark" className="py-0 px-24 md:px-[3.5rem] lg:px-[4.5rem] xs:px-0 md:py-0" containerClass="h-[130px] md:h-[70px] sm:px-0">
                    <Col xl={6} lg={2} className="ps-lg-0">
                        <Link aria-label="link for" to="/">
                            <Navbar.Brand className="flex items-center">
                                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/symbol.webp' data-rjs='/assets/img/webp/symbol@2x.webp' alt='logo' />
                                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/symbol.webp' data-rjs='/assets/img/webp/symbol@2x.webp' alt='logo' />
                                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/symbol-black.webp' data-rjs='/assets/img/webp/symbol-black@2x.webp' alt='logo' />
                            </Navbar.Brand>
                        </Link>
                    </Col>
                    <Col className="col-auto text-end pe-lg-0">
                        <HamburgerMenu theme="light" className="w-[50%] lg:w-[60%] sm:w-full p-24 md:px-8 xs:px-0 bg-[#000] h-[100vh]">
                            <div className="flex flex-col items-center justify-center h-full pl-[15px] md:p-0 xs:p-0">
                                <Link aria-label="header logo" to="/" className="md:hidden">
                                    <img width={160} height={52} src="/assets/img/webp/logo-white-big.webp" alt="logo" className="md:w-[160px]" />
                                </Link>
                                <ReactCustomScrollbar theme="light" className="pl-[15px]" autoHide>
                                    <div className="my-12 px-[15px] w-[75%] lg:w-[80%] md:w-[75%] sm:w-[60%] xs:w-full">
                                        <CollapsibleMenu className="text-left items-start w-[75%] xl:w-full mx-auto" theme="light" />
                                    </div>
                                </ReactCustomScrollbar>
                                <div className="sm:hidden">
                                    <SocialIcons theme="social-icon-style-01" className="justify-center verticalportfolio-social-icon" size="sm" iconColor="light" data={SocialIconsData} />
                                </div>
                            </div>
                        </HamburgerMenu>
                    </Col>
                </HeaderNav>
            </Header>
            {/* Header End */}

            {/* Section Start */}
            <section className="w-full relative overflow-hidden vertical-portfolio">
                <Swiper
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    direction='horizontal'
                    pagination={{ clickable: true }}
                    style={{ cursor: `url(/assets/img/webp/icon-move-light.webp)` }}
                    modules={[Autoplay, Keyboard, Pagination, Mousewheel]}
                    loop={true}
                    slidesPerView={1}
                    mousewheel={true}
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    className="vertical-swiper swiper-pagination-01 swiper-pagination-light swiper-pagination-medium vertical-white-move full-screen xs:mr-0"
                    onSlideChange={function ({ realIndex }) {
                        setIndex(realIndex)
                    }}
                    breakpoints={{
                        992: {
                            direction: "vertical",
                        }
                    }} >

                    {
                        SwiperSlideData.map((item, i) => {
                            return (
                                <SwiperSlide className="cover-background" key={i} style={{ backgroundImage: `url(${item.img})` }}>
                                    <Container fluid className="px-[7.5rem] lg:px-[5.5rem] xs:px-[15px] h-full">
                                        <Row className="h-full justify-center items-center relative">
                                            <Col className="flex flex-col justify-center text-start py-36 md:py-20">
                                                <Link aria-label="link for" to={item.link} className="w-[30%] xl:w-[40%] md:w-[60%] xs:w-[80%]">
                                                    <m.h1 className="font-serif font-light text-white mb-0 md:text-[55px] xs:text-[45px]" {...{ ...fadeIn, viewport: { once: false } }}><span className="font-semibold block">{item.title}</span>{item.subtitle}</m.h1>
                                                </Link>
                                                <div className="swiper-right-content absolute right-[7px] bottom-0 w-[45%] pb-36 md:w-[60%] sm:bottom-[30px] xs:w-[70%] xs:right-[15px] landscape:md:pb-8">
                                                    <m.div className="flex items-center justify-end"  {...{ ...fadeIn, viewport: { once: false } }}>
                                                        <span className="col bg-white opacity-30 h-[1px] sm:inline-block xs:hidden"></span>
                                                        <span className="font-serif text-lg text-white pl-12 xs:pl-8 md:text-xmd md:leading-[22px]">{item.content}</span>
                                                    </m.div>
                                                </div>

                                            </Col>
                                        </Row>
                                    </Container>
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>
                <div className="text-white bottom-0 pb-36 sm:bottom-[30px] text-lg font-serif absolute z-[1] px-[7.5rem] lg:px-[5.5rem] xs:px-[15px] md:text-xmd md:leading-[22px] landscape:md:pb-8">{addZeroBeforeNumber(index + 1)} / 0{SwiperSlideData.length}</div>
            </section>
            {/* Section End */}
        </div>
    )
}

export default VerticalportfolioPage
