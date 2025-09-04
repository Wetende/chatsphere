import React, { Suspense, useEffect, useRef } from 'react'

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Keyboard } from "swiper/modules";
import { Parallax } from "react-scroll-parallax";
import { m } from "framer-motion";
import { Link as ScrollTo } from "react-scroll"

// Components
import { Header, HeaderNav } from "../Components/Header/Header";
import Buttons from '../Components/Button/Buttons'
import PortfolioSwitchImg from '../Components/Portfolio/PortfolioSwitchImg';
import Overlap from '../Components/Overlap/Overlap';
import { fadeIn, fadeInLeft, zoomIn } from "../Functions/GlobalAnimations";

// Data
import { ElementsData, FeaturesData, IconWithTextData_01, LandingData, SwiperImgData, TestimonialsData } from './LandingData';
import { landingPageFilterData } from '../Components/Portfolio/PortfolioData';

const Footer = React.lazy(
    () => import('../Components/Footers/Footer').then(module => ({ default: module.Footer }))
);

const LandingPage = (props) => {
    const swiperRef = useRef(null)

    useEffect(() => {
        let links = document.querySelectorAll(".section-link");

        links.forEach(item => {
            item.addEventListener("click", () => {
                document.querySelector(".navbar-toggler:not(.collapsed)")?.click()
            })
        })
    }, [])

    return (
        <>
            {/* Header Start */}
            <Header topSpace={{ md: true }} className="absolute w-full top-0 z-[15]">
                <HeaderNav theme="light" fluid="fluid" expand="lg" className="h-[120px] items-center md:h-[80px] xs:h-auto px-[50px] md:px-0 md:py-[15px]">
                    <Col xs="auto" className="mr-auto ps-lg-0 py-0 !pr-[35px] md:border-white relative sm:!px-0">
                        <Link aria-label="header logo" className="flex items-center after:content-[' '] after:h-[28px] after:absolute after:right-0 after:w-[1px] after:bg-[#72717159] md:after:hidden" to="/">
                            <Navbar.Brand className="inline-block p-0 m-0 px-[15px]">
                                <img loading="lazy" src="/assets/img/webp/logo-gradient-sky-blue-dark-pink.webp" data-rjs="/assets/img/webp/logo-gradient-sky-blue-dark-pink@2x.webp" width={124} height={36} alt="litho" />
                            </Navbar.Brand>
                        </Link>
                    </Col>
                    <Navbar.Toggle className="order-last md:mx-[17px] sm:mr-0">
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse xs="auto" className="pl-[15px]">
                        <ul className="navbar-nav font-serif uppercase">
                            <li className="nav-item">
                                <ScrollTo to="demos" offset={0} delay={0} spy={true} smooth={true} duration={800} className="nav-link section-link cursor-pointer">Demos</ScrollTo>
                            </li>
                            <li className="nav-item">
                                <ScrollTo to="features" offset={0} delay={0} spy={true} smooth={true} duration={800} className="nav-link section-link cursor-pointer">Features</ScrollTo>
                            </li>
                            <li className="nav-item">
                                <a href="https://lithoreact.themezaa.com/documentation/" aria-label="documentation" target="_blank" rel="noreferrer" className="nav-link">Documentation</a>
                            </li>
                        </ul>
                    </Navbar.Collapse>
                    <Col xs="auto" className="text-right pr-0 items-center md:!px-0 xs:hidden">
                        <Buttons href="https://1.envato.market/rQEmZd" target="_blank" className="font-medium font-serif uppercase rounded-[2px]" themeColor={["#556fff", "#ff798e"]} size="lg" color="#fff" title="Purchase litho" />
                    </Col>
                </HeaderNav>
            </Header>
            {/* Header End */}

            {/* Main Section Start */}
            <div className="bg-white">
                {/* Parallax Section Start */}
                <section className='relative md:overflow-hidden'>
                    <div className="w-[870px]  right-0 top-0 cover-background absolute z-[1] xl:w-[800px] lg:w-[620px] md:w-[60%] md:right-[-90px] xs:right-0 xs:top-[-50px]">
                        <img width="870" height="1116" className='w-full' src="/assets/img/webp/litho-landing-page-img-01.webp" alt="" />
                    </div>
                    <div className="relative md:flex md:items-center overflow-hidden sm:h-auto" >
                        <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[0px] left-0 w-full h-full sm:h-[600px] sm:top-[-60px]" translateY={[-40, 40]} style={{ backgroundImage: "url(/assets/img/webp/litho-landing-page-banner-img-01.webp)" }}></Parallax>
                        <Container className="relative z-[2]">
                            <Row>
                                <Col xl={6} lg={7} md={10} className="flex flex-col justify-center items-start full-screen relative z-[1] lg:h-[700px] sm:h-[500px]">
                                    <div className="font-serif text-lg font-semibold uppercase mb-[40px] flex sm:mb-[25px]">
                                        <span className="flex-shrink-0 w-[30px] h-[1px] bg-fastblue opacity-70 align-self-center mr-[15px]"></span>
                                        <div className="flex-grow-1">
                                            <span className="bg-gradient-to-l from-[#556fff] via-[#e05fc4] to-[#ff798e] text-gradient -tracking-[.5px]">Truly Handcrafted</span>
                                        </div>
                                    </div>
                                    <h1 className="heading-2 font-serif text-darkgray -tracking-[2px] font-semibold mb-[10px] sm:mb-[5px]">Create anything</h1>
                                    <h2 className="heading-3 font-serif text-darkgray -tracking-[2px] mb-[30px] sm:mb-[25px]">that you can imagine</h2>
                                    <span className="text-xlg leading-[36px] w-[80%] xs:w-full mb-[20px] lg:text-lg">Let your creativity shine and start building your website today and impress your visitors.</span>
                                    <ScrollTo to="demos" offset={0} delay={0} spy={true} smooth={true} duration={800} className="absolute bottom-[100px] sm:bottom-[50px]">
                                        <span className="inline-flex flex-row items-center justify-center z-[5] cursor-pointer">
                                            <Buttons
                                                type="submit"
                                                className="btn-sonar border-0 mr-[15px] shadow-[0_0_35px_rgba(40,42,54,0.18)]"
                                                themeColor="#232323"
                                                Color="#232323"
                                                size="md"
                                                ariaLabel="Explore demos"
                                                title={<i className="fas fa-sharp fa-arrow-right text-[20px] ms-1 text-white" />}
                                            />
                                            <span className="video-icon-text font-serif text-lg text-darkgray -tracking-[.5px] uppercase inline-block align-middle font-medium">
                                                <span className="font-bold">Explore</span> Demos</span>
                                        </span>
                                    </ScrollTo>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </section>
                {/* Parallax Section End */}

                {/*Counter Section Start */}
                <section className="relative border-bottom border-mediumgray pb-[130px] lg:pb-[95px] md:pb-[75px] sm:py-[50px] z-[1]">
                    <Container fluid>
                        <Row>
                            <Overlap className="z-[1] sm:hidden px-0">
                                <img loading="lazy" width={213} height={338} className="w-[auto] md:w-[20%]" src="/assets/img/webp/litho-landing-page-img-02.webp" alt="" />
                            </Overlap>
                        </Row>
                    </Container>
                    <Container>
                        <Row className="row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-10">
                            {
                                IconWithTextData_01.map((item, i) => {
                                    return (
                                        <m.div key={i} className="col flex items-center" {...{ ...fadeIn, transition: { delay: i * 0.2 } }}>
                                            <img className="mr-[20px] lg:w-[65px]" width={74} height={74} alt="" src={item.img} />
                                            <div className="feature-box-content">
                                                <span className="font-medium text-lg text-darkgray inline-block font-serif w-[80%] leading-[28px] lg:text-xmd lg:w-full md:w-[90%]">{item.title}</span>
                                            </div>
                                        </m.div>
                                    )
                                })
                            }
                        </Row>
                    </Container>
                </section>
                {/*Counter Section End */}

                {/*Demos Section Start */}
                <section id="demos" className="relative demo-filter-color py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                    <Container fluid className="px-[7%] xl:px-[4%] lg:px-[2%] sm:px-[15px]">
                        <m.div className="row justify-center" {...fadeIn}>
                            <Col xs={10} lg={3} sm={6} className="font-serif text-center mb-12 md:mb-12">
                                <span className="font-semibold text-xmd text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] uppercase inline-block -tracking-[.5px] mb-[15px] sm:mb-[10px]">TRULY MULTIPURPOSE</span>
                                <h3 className="heading-4 font-medium text-darkgray -tracking-[2px] xs:-tracking-[.5px]">37+ stunning and unique demos</h3>
                            </Col>
                        </m.div>
                        <Row>
                            <Col className="xs:px-0">
                                <PortfolioSwitchImg
                                    className="demo-filter"
                                    target="_blank"
                                    filterData={landingPageFilterData}
                                    grid="grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-triple-extra-large text-center"
                                    data={LandingData}
                                />
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/*Demos Section End */}

                {/*pre-built inner pages Section Start*/}
                <section className="bg-white py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[75px] xs:py-[50px]">
                    <Container>
                        <m.div className="row items-center justify-center" {...fadeIn}>
                            <Col xl={4} lg={5} md={8} className="md:mb-20 md:text-center">
                                <span className="font-serif font-semibold text-xmd tracking-[-.5px] text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] uppercase inline-block sm:-tracking-[.5px] mb-[25px] sm:mb-[15px]">Powerful minimal designs</span>
                                <h4 className="font-serif font-medium text-darkgray inline-block -tracking-[2px] xs:-tracking-[.5px] mb-16 lg:w-[95%]">Perfect pre-built inner pages</h4>
                                <span className="text-lg font-medium text-darkgray block mb-[20px]">225+ Readymade template blocks</span>
                                <p className="text-xmd leading-[32px] w-[95%] mb-0">Choose the most suitable template from the great collection of beautiful templates.</p>
                                <span className="w-full h-[1px] bg-mediumgray block my-10"></span>
                                <span className="text-lg font-medium text-darkgray block mb-[20px]">20+ premium in-built inner pages</span>
                                <p className="text-xmd leading-[32px] w-[95%] mb-0">Create your website in minutes by using readymade inner pages and save time.</p>
                                <ScrollTo to="templates" offset={0} delay={0} spy={true} smooth={true} duration={1200}>
                                    <Buttons type="submit" className="mt-[4.5rem] btn-fill font-medium font-serif tracking-[1px] rounded-none uppercase md:mb-[15px]" themeColor="#232323" color="#fff" size="lg" title="Explore Now" />
                                </ScrollTo>
                            </Col>
                            <Col lg={7} xl={{ offset: 1 }}>
                                <Swiper
                                    className="-mr-[30vw] md:mr-0"
                                    modules={[Autoplay, EffectFade, Keyboard]}
                                    effect="fade"
                                    loop={true}
                                    keyboard={{ enabled: true, onlyInViewport: true }}
                                    autoplay={{ delay: 1000, disableOnInteraction: false }}
                                    slidesPerView={1}>
                                    {
                                        SwiperImgData.slice(0, 5).map((item, i) => {
                                            return (
                                                <SwiperSlide key={i} className="h-full">
                                                    <img width="1230" height="740" alt='' src={item.img} />
                                                </SwiperSlide>)
                                        })
                                    }
                                </Swiper>
                            </Col>
                        </m.div>
                    </Container>

                </section>
                {/*pre-built inner pages Section End*/}

                {/* Features Section Start */}
                <section className="bg-white border-b pt-0 lg:pt-[95px] md:pt-[75px] sm:pt-[50px] pb-[160px] lg:pb-[120px] md:pb-[95px] sm:pb-[75px] xs:pb-[50px]">
                    <Container fluid>
                        <m.div className="row justify-center" {...fadeIn}>
                            <Col xl={3} lg={5} sm={6} className="font-serif text-center mb-[80px] md:mb-12">
                                <span className="font-semibold text-xmd text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] uppercase inline-block -tracking-[.5px] mb-[20px] sm:mb-[10px]">Powerful minimal designs</span>
                                <h4 className="font-medium text-darkgray -tracking-[2px] xs:-tracking-[.5px] mb-0">The lighter and faster litho react template</h4>
                            </Col>
                            <Col className="col-12 p-0">
                                <img loading="lazy" width="" height="" className="w-full" alt="" src="/assets/img/webp/litho-react-landing-page-img-01.webp" />
                            </Col>
                        </m.div>
                    </Container>
                </section>
                {/* Features Section End */}

                {/* portfolio Section Start */}
                <section className="bg-white pt-[130px] lg:pt-[95px] md:pt-[75px] sm:pt-[50px]">
                    <Container>
                        <Row className="justify-center">
                            <Col lg={6} className="text-center font-serif mb-28 md:mb-20">
                                <h4 className="-tracking-[2px] xs:-tracking-[.5px] mb-0">Everything for a</h4>
                                <h4 className="heading-1 font-semibold block text-darkgray -tracking-[3px] xs:-tracking-[.5px] xs:mb-0">great portfolio</h4>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid>
                        <Row>
                            <Col className="p-0">
                                <img loading="lazy" width="" height="" className="w-full" src="/assets/img/webp/litho-landing-page-portfolio-01.webp" alt="" />
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* portfolio Section End */}

                {/* Section Start */}
                <section className="bg-[#f4f5f9] py-[130px] lg:py-[95px] md:py-[75px] sm:py-[50px] feturebox-section overflow-hidden">
                    <Container>
                        <Row lg={4} xs={1} sm={2}>
                            <m.div className="col md:mb-[30px]" {...{ ...fadeInLeft, transition: { delay: 0.2, ease: "easeOut", duration: 0.2 } }}>
                                <div className="flex items-center justify-center md:justify-start">
                                    <div className="icon-wrapper flex-[0_0_auto] flex justify-center items-center relative overflow-hidden bg-white w-[85px] h-[85px] rounded-full shadow-[0_0_30px_rgba(0,0,0,0.08)] mr-[25px] lg:w-[70px] lg:h-[70px] lg:mr-[15px] xs:w-[60px] xs:h-[60px] hover:shadow-[0_0_35px_rgba(40,42,54,0.18)] transition-default">
                                        <i className="feather-grid text-[28px]"></i>
                                    </div>
                                    <div>
                                        <span className="font-medium text-lg block text-darkgray leading-[26px] w-[80%] lg:w-full">Adjustable column</span>
                                    </div>
                                </div>
                            </m.div>
                            <m.div className="col md:mb-[30px]" {...{ ...fadeInLeft, transition: { delay: 0.4, ease: "easeOut", duration: 0.4 } }}>
                                <div className="flex items-center justify-center md:justify-start">
                                    <div className="icon-wrapper flex-[0_0_auto] flex justify-center items-center relative overflow-hidden bg-white w-[85px] h-[85px] rounded-full shadow-[0_0_30px_rgba(0,0,0,0.08)] mr-[25px] lg:w-[70px] lg:h-[70px] lg:mr-[15px] xs:w-[60px] xs:h-[60px] hover:shadow-[0_0_35px_rgba(40,42,54,0.18)] transition-default">
                                        <i className="feather-thumbs-up text-[28px]"></i>
                                    </div>
                                    <div>
                                        <span className="font-medium text-lg block text-darkgray leading-[26px] w-[80%] lg:w-full">Attractive hover styles</span>
                                    </div>
                                </div>
                            </m.div>
                            <m.div className="col xs:mb-[30px]" {...{ ...fadeInLeft, transition: { delay: 0.6, ease: "easeOut", duration: 0.6 } }}>
                                <div className="flex items-center justify-center md:justify-start">
                                    <div className="icon-wrapper flex-[0_0_auto] flex justify-center items-center relative overflow-hidden bg-white w-[85px] h-[85px] rounded-full shadow-[0_0_30px_rgba(0,0,0,0.08)] mr-[25px] lg:w-[70px] lg:h-[70px] lg:mr-[15px] xs:w-[60px] xs:h-[60px] hover:shadow-[0_0_35px_rgba(40,42,54,0.18)] transition-default">
                                        <i className="feather-layout text-[28px]"></i>
                                    </div>
                                    <div>
                                        <span className="font-medium text-lg block text-darkgray leading-[26px] w-[80%] lg:w-full">Advanced single project</span>
                                    </div>
                                </div>
                            </m.div>
                            <m.div className="col" {...{ ...fadeInLeft, transition: { delay: 0.8, ease: "easeOut", duration: 0.8 } }}>
                                <div className="flex items-center justify-center md:justify-start">
                                    <div className="icon-wrapper flex-[0_0_auto] flex justify-center items-center relative overflow-hidden bg-white w-[85px] h-[85px] rounded-full shadow-[0_0_30px_rgba(0,0,0,0.08)] mr-[25px] lg:w-[70px] lg:h-[70px] lg:mr-[15px] xs:w-[60px] xs:h-[60px] hover:shadow-[0_0_35px_rgba(40,42,54,0.18)] transition-default">
                                        <i className="feather-edit text-[28px]"></i>
                                    </div>
                                    <div>
                                        <span className="font-medium text-lg block text-darkgray leading-[26px] w-[80%] lg:w-full">Custom content blocks</span>
                                    </div>
                                </div>
                            </m.div>
                        </Row>
                    </Container>
                </section>
                {/* Section Edn */}

                {/* single project page section start */}
                <section className="bg-[#f4f5f9] overflow-hidden pt-0 py-[160px] lg:py-[120px] md:py-[95px] sm:py-[75px] xs:py-[50px]">
                    <Container fluid className="px-[0px] sm:px-[15px]">
                        <m.div {...fadeInLeft}>
                            <Swiper
                                className="move-black"
                                modules={[Autoplay, Keyboard]}
                                spaceBetween={40}
                                loop={true}
                                centeredSlides={true}
                                keyboard={{ enabled: true, onlyInViewport: true }}
                                autoplay={{ delay: 3500, disableOnInteraction: false }}
                                slidesPerView="auto">
                                {
                                    SwiperImgData.slice(5, 10).map((item, i) => {
                                        return (
                                            <SwiperSlide key={i} className="w-[auto] lg:w-[40%] md:w-[60%] xs:w-full">
                                                <a rel="noreferrer" aria-label="link" href={item.link ? item.link : "#"} target="_blank">
                                                    <img loading="lazy" width="684" height="642" className="rounded-[6px] shadow-[0_0_20px_rgba(0,0,0,0.08)]" alt='Portfolio images' src={item.img} />
                                                </a>
                                            </SwiperSlide>)
                                    })
                                }
                            </Swiper>
                        </m.div>
                    </Container>
                </section>
                {/* single project page section end */}

                {/*pre-built inner pages Section Start*/}
                <section className="bg-gradiant-to-b from-[#f4f5f9] to-transparent overflow-hidden pt-[90px] lg:pt-[75px] xs:pt-[50px]">
                    <Container>
                        <m.div className="row items-center justify-center" {...fadeIn}>
                            <Col xl={4} lg={5} md={8} className="md:mb-20 md:text-center">
                                <span className="font-serif font-semibold text-xmd tracking-[-.5px] text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] uppercase inline-block sm:-tracking-[.5px] mb-[20px] sm:mb-[15px]">FRAMER MOTION FOR ANIMATION</span>
                                <h5 className="heading-4 font-serif font-medium text-darkgray inline-block -tracking-[2px] xs:-tracking-[.5px] mb-[40px] lg:w-[95%]">Production ready animation library for react.</h5>
                                <p className="text-xmd leading-[32px]">Framer Motion is a simple yet powerful, an open source, production-ready library for React that's designed for all creative developers with amazing animations and interactions.</p>
                                <Buttons target="_blank" href="/animation" className="mt-16 btn-fill font-medium font-serif tracking-[1px] rounded-none uppercase md:mb-[15px]" themeColor="#232323" color="#fff" size="lg" title="DISCOVER MORE" />
                            </Col>
                            <Col lg={7} xl={{ offset: 1 }}>
                                <div className="-mr-[30vw] md:mr-0">
                                    <img loading="lazy" width="1200" height="800" alt="framer-motion" className="ml-auto" src="/assets/img/webp/litho-react-landing-page-img-03.webp" />
                                </div>
                            </Col>
                        </m.div>
                    </Container>
                </section>
                {/*pre-built inner pages Section End*/}

                {/* Features Section Start */}
                <section className="bg-white pt-[80px] lg:pt-[95px] md:pt-[75px] sm:pt-[50px] pb-[160px] lg:pb-[120px] sm:pb-[75px] xs:pb-[50px]">
                    <Container>
                        <m.div className="row justify-center" {...fadeIn}>
                            <Col xl={4} lg={5} sm={6} className="font-serif text-center mb-20 md:mb-12">
                                <span className="font-semibold text-xmd text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] uppercase inline-block -tracking-[.5px] mb-[15px] sm:mb-[10px]">Core Features</span>
                                <h5 className="heading-4 font-medium text-darkgray -tracking-[2px] xs:-tracking-[.5px]">Get access to exclusive features</h5>
                            </Col>
                        </m.div>
                        <Row className="row-cols-1 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 gap-y-[25px] justify-center landing-custom-iconwithtext">
                            {
                                FeaturesData.map((item, i) => {
                                    return (
                                        <Col key={i} className="custom-icon-with-text01">
                                            <m.div className="justify-center text-center" {...{ ...fadeIn, transition: { delay: i * 0.2 } }}>
                                                {item.img && <img loading="lazy" width="" height="" className="inline-block items-center justify-center mb-[30px]" src={item.img} alt="featurebox" />}
                                                <div className="feature-box-content flex justify-center items-center">
                                                    {item.title && <h6 className="title w-[100px] text-darkgray mb-[5px] xs:w-full">{item.title}</h6>}
                                                    {item.content && <p className="text-xmd text-center">{item.content}</p>}
                                                </div>
                                            </m.div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Container>
                </section>
                {/* Features Section End */}

                {/* Blog and News Section Start */}
                <section className="bg-white border-mediumgray border-t xs:border-t-0 sm:pt-[50px] xs:pt-0">
                    <Container>
                        <Overlap className="flex justify-center items-center">
                            <Link aria-label="features" to="#">
                                <m.img loading="lazy" width="" height="" src="/assets/img/webp/litho-landing-page-img-04.webp" alt="" {...zoomIn} />
                            </Link>
                        </Overlap>
                        <m.div className="row justify-center mt-[90px] xs:mt-12" {...fadeIn}>
                            <Col lg={4} sm={6} className="font-serif text-center mb-[7.5rem] lg:mb-20 md:mb-12">
                                <span className="font-semibold text-xmd text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] uppercase inline-block -tracking-[.5px] mb-[15px] sm:mb-[10px]">Blogging Experience</span>
                                <h6 className="heading-4 font-medium text-darkgray -tracking-[2px] xs:-tracking-[.5px]">Perfect choice for blog and news</h6>
                            </Col>
                        </m.div>
                    </Container>
                    <Container fluid>
                        <Row>
                            <Col className="p-0">
                                <img loading="lazy" width="" height="" className="w-100" src="/assets/img/webp/litho-landing-page-blog-01.webp" alt="" />
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Blog and News Section End */}

                {/* Section Start */}
                <section className="py-[40px] bg-[#f4f5f9] pb-0">
                    <Container>
                        <Row>
                            <m.div className="col text-center" {...fadeIn}>
                                <h2 className="font-serif font-semibold relative text-[#abadb7] uppercase -tracking-[2px]">Create stunning <span className="border-b-[3px] border-darkgray relative text-darkgray font-bold inline-block">blog today!</span></h2>
                            </m.div>
                        </Row>
                    </Container>
                </section>
                {/* Section End */}

                {/* Blog Post Layout Section Start */}
                <section className="bg-[#f4f5f9] overflow-hidden pt-[130px] lg:pt-[95px] md:pt-[75px] sm:pt-[50px] pb-[160px] lg:pb-[120px] md:pb-[95px] sm:pb-[75px] xs:pb-[50px]">
                    <Container fluid className="px-[0px] xs:px-[15px]">
                        <m.div {...fadeInLeft}>
                            <Swiper
                                className="move-black"
                                modules={[Autoplay, Keyboard]}
                                spaceBetween={40}
                                loop={true}
                                centeredSlides={true}
                                keyboard={{ enabled: true, onlyInViewport: true }}
                                autoplay={{ delay: 3500, disableOnInteraction: false }}
                                slidesPerView="auto">
                                {
                                    SwiperImgData.slice(10, 15).map((item, i) => {
                                        return (
                                            <SwiperSlide key={i} className="w-[auto] lg:w-[40%] md:w-[60%] xs:w-full">
                                                <a rel="noreferrer" aria-label="link" href={item.href ? item.href : "#"} target="_blank">
                                                    <img loading="lazy" width="683" height="640" className="rounded-[6px] shadow-[0_0_20px_rgba(0,0,0,0.08)]" alt='blog images' src={item.img} />
                                                </a>
                                            </SwiperSlide>)
                                    })
                                }
                            </Swiper>
                        </m.div>
                    </Container>
                </section>
                {/* Blog Post Layout Section End */}

                {/* Overlap Section Start */}
                <Overlap>
                    <Col className="text-center sm:hidden">
                        <m.span className="font-serif font-semibold inline-block text-[200px] leading-[200px] text-darkgray -tracking-[5px] lg:text-[160px] lg:leading-[160px] md:text-[120px] md:leading-[120px] sm:text-[90px] sm:leading-[90px] xs:text-[50px] xs:leading-[50px]" {...{ ...zoomIn, transition: { delay: 0.6, duration: 0.8 } }}>ecommerce</m.span>
                    </Col>
                </Overlap>
                {/* Overlap Section Edn */}

                {/* Section Start */}
                <section className="bg-white overflow-hidden py-[130px] lg:py-[95px] md:py-[75px] sm:py-[50px]">
                    <Container>
                        <Row className="items-center justify-center">
                            <Col lg={4} md={8} className="md:mb-20 md:text-center">
                                <m.div {...{ ...fadeIn, transition: { delay: 0.4 } }}>
                                    <span className="font-serif font-semibold text-xmd text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] uppercase inline-block -tracking-[.5px] mb-[20px] sm:mb-[10px]">eCommerce ready</span>
                                    <h2 className="heading-4 font-serif font-medium text-darkgray -tracking-[2px] xs:-tracking-[.5px] w-[95%] mb-[3.5rem] lg:w-full sm:mb-10">Compatible for any eCommerce platform</h2>
                                    <p className="text-xmd leading-[32px] w-[90%] mb-0 lg:w-full">Present your products online by grabbing public attention and boost revenue with Litho. Kick start your eCommerce site using modern looking eCommerce designs.</p>
                                    <Buttons target="_blank" to="/home-fashion-shop" className="mt-16 btn-fill tracking-[1px] font-medium font-serif rounded-none uppercase md:mb-[15px]" themeColor="#232323" color="#fff" size="lg" title="Discover demo" />
                                </m.div>
                            </Col>
                            <Col lg={8}>
                                <m.div className="-mr-[30vw]" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
                                    <img loading="lazy" width="" height="" src="/assets/img/webp/litho-landing-page-img-05.webp" alt="" />
                                </m.div>
                            </Col>
                        </Row>
                        <Row lg={4} sm={2} xs={1} className="mt-36 mb-8">
                            <m.div className="col text-center flex flex-col justify-center items-center md:mb-20" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
                                <div><img loading="lazy" width="" height="" className="mb-[35px] rounded-full border-[10px] border-white shadow-lg xs:mb-[20px]" src="/assets/img/webp/litho-landing-page-img-06.webp" alt="" /></div>
                                <span className="text-lg leading-[26px] font-medium text-darkgray inline-block w-[35%] lg:w-[45%] md:w-full">Appealing hover style</span>
                            </m.div>
                            <m.div className="col text-center flex flex-col justify-center items-center md:mb-20" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
                                <div><img loading="lazy" width="" height="" className="mb-[35px] rounded-full border-[10px] border-white shadow-lg xs:mb-[20px]" src="/assets/img/webp/litho-landing-page-img-07.webp" alt="" /></div>
                                <span className="text-lg leading-[26px] font-medium text-darkgray inline-block w-[35%] lg:w-[45%] md:w-full">Detailed filtering</span>
                            </m.div>
                            <m.div className="col text-center flex flex-col justify-center items-center xs:mb-20" {...{ ...fadeIn, transition: { delay: 0.6 } }}>
                                <div><img loading="lazy" width="" height="" className="mb-[35px] rounded-full border-[10px] border-white shadow-lg xs:mb-[20px]" src="/assets/img/webp/litho-landing-page-img-08.webp" alt="" /></div>
                                <span className="text-lg leading-[26px] font-medium text-darkgray inline-block w-[35%] lg:w-[45%] md:w-full">Modern mini cart</span>
                            </m.div>
                            <m.div className="col text-center flex flex-col justify-center items-center" {...{ ...fadeIn, transition: { delay: 0.8 } }}>
                                <div><img loading="lazy" width="" height="" className="mb-[35px] rounded-full border-[10px] border-white shadow-lg xs:mb-[20px]" src="/assets/img/webp/litho-landing-page-img-09.webp" alt="" /></div>
                                <span className="text-lg leading-[26px] font-medium text-darkgray inline-block w-[35%] lg:w-[45%] md:w-full">Attractive gallery</span>
                            </m.div>
                        </Row>
                    </Container>
                </section>
                {/* Section End */}

                {/* section Start */}
                <m.section className="bg-darkgray py-[55px] lg:py-[95px] md:py-[75px] sm:py-[50px] bg-no-repeat bg-[bottom_240px_right_-10px] md:bg-right-bottom" style={{ backgroundImage: `url(/assets/img/webp/litho-react-landing-page-img-05.webp)` }} {...fadeIn}>
                    <Container fluid>
                        <Row className="items-center justify-center">
                            <Col xs="auto" className="-ml-[12vw] md:ml-0">
                                <img loading="lazy" width="" height="" className="xl:w-[700px] lg:w-[500px] md:mx-auto" src="/assets/img/webp/litho-react-landing-page-img-04.webp" alt="" />
                            </Col>
                            <Col xxl={3} lg={4} sm={8} xs={11} className="md:text-center pl-[35px] xl:pl-[10px]">
                                <span className="font-serif font-semibold text-xmd text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] uppercase inline-block -tracking-[.5px] mb-[20px] sm:mb-[10px]">react router for easy routing</span>
                                <h2 className="heading-4 font-serif font-medium text-lightgray -tracking-[2px] xs:-tracking-[.5px] mb-[2rem] w-[84%] lg:w-full sm:mb-10">React router is a standard library for routing in react.</h2>
                                <p className="text-xmd leading-[32px] w-[90%] mb-0 lg:w-full">React Router is the most widely used React routing library. It provides a powerful and flexible routing solution for React applications, allowing developers to manage client-side routing in a declarative and efficient way.</p>
                                <Buttons to="/home-seo-agency" target="_blank" className="mt-12 btn-fill tracking-[1px] font-medium font-serif rounded-none uppercase md:mb-[15px]" themeColor="#fff" color="#232323" size="lg" title="Discover more" />
                            </Col>
                        </Row>
                    </Container>
                </m.section>
                {/* section End */}

                {/* section Start */}
                <m.section className="relative pt-[190px] pb-[240px] overflow-hidden xl:bg-[length:900px] lg:py-[130px] lg:bg-[length:700px] md:bg-top md:bg-contain md:pb-[95px] md:pt-[60%] sm:pb-[50px] bg-gradient-to-b from-[#f4f5f9] to-transparent" {...fadeIn}>
                    <div className="absolute top-0 left-0 h-full w-full bg-[right_-40px_center] bg-no-repeat xl:bg-[length:900px] lg:bg-[length:700px] md:bg-top md:bg-contain" style={{ backgroundImage: "url(/assets/img/webp/litho-react-landing-page-img-06.webp)" }}></div>
                    <Container className="relative">
                        <Row className="items-center justify-start md:justify-center">
                            <Col lg={5} md={8} className="md:text-center">
                                <span className="font-serif font-semibold text-xmd text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] uppercase inline-block -tracking-[.5px] mb-[20px] sm:mb-[10px]">formik for form validation</span>
                                <h2 className="heading-4 font-serif font-medium text-darkgray -tracking-[2px] xs:-tracking-[.5px] w-[95%] mb-8 lg:w-full sm:mb-10">Formik is third party react form library.</h2>
                                <p className="text-xmd leading-[32px] w-[90%] mb-0 lg:w-full">Formik is the world's most popular open source form library for React. It comes with battle-tested solutions for input validation, formatting, masking, arrays, and error handling.</p>
                                <Buttons to="/elements/contact-form" target="_blank" className="mt-12 btn-fill tracking-[1px] font-medium font-serif rounded-none uppercase" themeColor="#232323" color="#fff" size="lg" title="Discover more" />
                            </Col>
                        </Row>
                    </Container>
                </m.section>
                {/* section End */}

                {/* Features Section Start*/}
                <section id="features" className="bg-[#f4f5f9] py-[130px] lg:py-[95px] md:py-[75px] sm:py-[50px]">
                    <Container>
                        <m.div className="row justify-center" {...fadeIn}>
                            <Col lg={5} sm={6} className="font-serif text-center mb-12 md:mb-12">
                                <span className="font-semibold text-xmd text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] uppercase inline-block -tracking-[.5px] mb-[15px] sm:mb-[10px]">ELEMENTS AND FEATURES</span>
                                <h2 className="heading-4 font-medium text-darkgray -tracking-[2px] xs:-tracking-[.5px]">Power up your pages with these elements</h2>
                            </Col>
                        </m.div>
                        <Row className="row row-cols-1 row-cols-xl-6 row-cols-lg-5 row-cols-sm-3 justify-center">
                            {
                                ElementsData.map((item, i) => {
                                    return (
                                        <Col key={i} className="mb-[30px] xs:mb-[15px] features-elements">
                                            <m.div className="feature-box feature-box-shadow overflow-hidden py-12 bg-white rounded-[4px] flex flex-col justify-center items-center" {...fadeIn}>
                                                <div className="feature-box-icon">
                                                    <i className={`${item.icon} text-[32px] text-[#abadb7] inline-block mb-[25px]`}></i>
                                                </div>
                                                <div className="feature-box-content">
                                                    <span className="text-xmd font-medium block text-darkgray">{item.title}</span>
                                                </div>
                                                <div className="feature-box-overlay"></div>
                                            </m.div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Container>
                </section>
                {/* Features Section End*/}

                {/* Outstanding Section Start */}
                <section id="templates" className="bg-[#e1e2e9] overflow-hidden pb-0 py-[130px] lg:py-[95px] md:py-[75px] sm:py-[50px]">
                    <Container>
                        <m.div className="row justify-center" {...fadeIn}>
                            <Col xl={6} lg={7} sm={9} className="font-serif text-center mb-4 md:mb-12 sm:mb-0">
                                <span className="font-semibold text-xmd text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] uppercase inline-block -tracking-[.5px] mb-[15px] sm:mb-[10px]">OUTSTANDING TEMPLATE LIBRARY</span>
                                <h2 className="heading-4 font-medium text-darkgray -tracking-[2px] xs:-tracking-[.5px]">Handcrafted and pixel perfect templates for your website</h2>
                            </Col>
                        </m.div>
                    </Container>
                    <Container fluid className="px-0">
                        <m.div className="row px-[0px] xs:px-[15px]" {...fadeIn}>
                            <Col>
                                <Swiper
                                    className="black-move"
                                    modules={[Autoplay, Keyboard]}
                                    loop={true}
                                    spaceBetween={0}
                                    keyboard={{ enabled: true, onlyInViewport: true }}
                                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                                    slidesPerView="auto">
                                    {
                                        SwiperImgData.slice(15, 22).map((item, i) => {
                                            return (
                                                <SwiperSlide key={i} className="w-[auto] lg:w-[40%] md:w-[60%] xs:w-full">
                                                    <img width="670" height="1786" loading="lazy" alt='slider images' src={item.img} />
                                                </SwiperSlide>)
                                        })
                                    }
                                </Swiper>
                            </Col>
                        </m.div>

                    </Container>
                </section>
                {/* Outstanding Section End */}

                {/* Testimonials Section Start */}
                <section className="bg-white overflow-hidden py-[160px] lg:py-[120px] md:py-[95px] sm:py-[75px] xs:py-[50px] relative">
                    <img width="290" height="261" className="absolute -left-[70px] bottom-[150px] lg:top-[80px] lg:w-[20%] md:hidden" src="/assets/img/webp/litho-landing-page-img-13.webp" alt="" />
                    <Container>
                        <Row className="justify-center">
                            <Col lg={8} className="col-12 text-center mb-20 md:mb-10">
                                <m.h2 className="font-serif text-darkgray -tracking-[2px] mb-0" {...fadeIn}>
                                    <span className="font-semibold">45,000+</span> Trusted customers
                                </m.h2>
                            </Col>
                        </Row>
                        <Row className="row justify-center">
                            <m.div className="col relative md:mb-12 md:text-center col-xl-4 col-lg-5 col-md-10" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
                                <h2 className="heading-4 font-serif font-medium text-darkgray -tracking-[2px] xs:-tracking-[.5px] mb-8 md:mb-4 lg:w-[90%] md:w-full">Thousands of <span className="font-semibold inline-block">happy customers</span></h2>
                                <h3 className="heading-6 font-light mb-[40px] -tracking-[.5px] xs:mb-[25px]">
                                    <span className="block md:inline-block">Trusted and experienced &nbsp;</span>
                                    <span className="font-medium text-decoration-line-bottom relative before:bg-[#89af44] text-[#89af44] inline-block">Power elite author</span>
                                </h3>
                                <div className="flex">
                                    <div onClick={() => swiperRef.current.swiper.slidePrev()} className="btn-slider-prev rounded-full border-[1px] border-mediumgray flex justify-center items-center text-black bg-white right-inherit left-[65px] h-[40px] w-[40px] cursor-pointer md:hidden hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:bg-white hover:border-transparent transition-default" >
                                        <button className="text-xmd" aria-label="slider previous"><i className="fa fa-arrow-left text-spanishgray text-md"></i></button>
                                    </div>
                                    <div onClick={() => swiperRef.current.swiper.slideNext()} className="btn-slider-next rounded-full flex justify-center border-[1px] border-mediumgray items-center text-black right-inherit h-[40px] w-[40px] ml-[10px] cursor-pointer md:hidden hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:bg-white hover:border-transparent transition-default">
                                        <button className="text-xmd" aria-label="slider next"><i className="fa fa-arrow-right text-spanishgray text-md"></i></button>
                                    </div>
                                </div>
                            </m.div>
                            <m.div className="px-[0px] xs:px-[15px] col-lg-7 offset-xl-1" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
                                <Swiper
                                    ref={swiperRef}
                                    className="min-w-[1170px] black-move md:min-w-0 md:mr-0"
                                    modules={[Autoplay, Keyboard]}
                                    spaceBetween={30}
                                    loop={true}
                                    keyboard={{ enabled: true, onlyInViewport: true }}
                                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                                    slidesPerView={1}
                                    breakpoints={{ 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }} >
                                    {
                                        TestimonialsData.map((item, i) => {
                                            return (
                                                <SwiperSlide key={i}>
                                                    <div className="feature-box feature-box-left-icon-middle py-12 px-[3.5rem] bg-white border border-mediumgray rounded-[6px] ">
                                                        <div className="flex justify-start align-middle items-center">
                                                            <div className="feature-box-icon mr-[20px]">
                                                                <img loading="lazy" width="" height="" className="rounded-full w-[65px] h-[65px]" src={item.img} alt="Jeremy Girard" />
                                                            </div>
                                                            <div className="testimonials-style-04 feature-box-content">
                                                                <span className="star-rating !text-[13px]">
                                                                    <span className="star-rating !text-[13px]" style={{ width: (`${item.rating}` * 20) + '%' }} ></span>
                                                                </span>
                                                                <div className="text-darkgray text-xmd font-serif font-medium">{item.name}</div>
                                                            </div>
                                                        </div>
                                                        <p className="mt-[30px]">{item.content}</p>
                                                    </div>
                                                </SwiperSlide>)
                                        })
                                    }
                                </Swiper>
                            </m.div>
                        </Row>
                    </Container>
                </section>
                {/* Testimonials Section End */}

                {/* Section Start */}
                <section className="bg-[#141414] py-[130px] lg:py-[95px] md:py-[75px] sm:py-[50px]">
                    <Container>
                        <Row xs={1} lg={3} sm={2} className="justify-center md:gap-y-[5rem] xs:gap-y-[6rem]">
                            <m.div className="col text-center" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
                                <i className="line-icon-Business-Man text-[50px] mb-[30px] inline-block"></i>
                                <span className="font-serif text-lg text-white block mb-[5px] md:text-xmd md:leading-[22px]">How can we help you?</span>
                                <a aria-label="themezaa" href="https://www.themezaa.com/support/" target="_blank" rel="noreferrer" className="font-serif font-medium uppercase text-decoration-line-bottom hover:text-spanishgray">Get support now</a>
                            </m.div>
                            <m.div className="col text-center" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
                                <i className="line-icon-Address-Book text-[50px] mb-[30px] inline-block"></i>
                                <span className="font-serif font-medium text-lg text-white block mb-[5px] md:text-xmd md:leading-[22px]">Detailed documentation</span>
                                <a aria-label="themezaa" href="https://lithoreact.themezaa.com/documentation/" target="_blank" rel="noreferrer" className="font-serif font-medium uppercase text-decoration-line-bottom hover:text-spanishgray">Online documentation</a>
                            </m.div>
                            <m.div className="col text-center" {...{ ...fadeIn, transition: { delay: 0.6 } }}>
                                <i className="line-icon-Vector-5 text-[50px] mb-[30px] inline-block"></i>
                                <span className="font-serif font-medium text-large text-white block mb-[5px] md:text-xmd md:leading-[22px]">Looking for customization?</span>
                                <a aria-label="themezaa" href="https://www.themezaa.com/theme-customization/" target="_blank" rel="noreferrer" className="font-serif font-medium uppercase text-decoration-line-bottom hover:text-spanishgray">Describe your project</a>
                            </m.div>
                        </Row>
                    </Container>
                </section>
                {/* Section End */}
            </div>
            {/* Main Section End */}

            {/* Footer Start */}
            <Suspense fallback={<div>Loading...</div>}>
                <Footer parallax={{ desktop: true, lg: false }} className="bg-[center_top] py-40 md:py-28" style={{ backgroundImage: "url(/assets/img/litho-landing-page-bg-img-01.jpg)" }}>
                    <Container>
                        <Row>
                            <Col className="text-center">
                                <span className="font-serif font-semibold text-[70px] leading-[80px] text-white -tracking-[2px] block mb-20 shadow-lg md:mb-20 xs:-tracking-[.5px] md:text-[54px] md:leading-[64px] xs:text-[35px] xs:leading-[42px] ">Create innovative website today. Purchase Litho template now! </span>
                                <Buttons href="https://1.envato.market/rQEmZd" target="_blank" className="btn-fancy font-medium mb-32 tracking-[1px] font-serif uppercase rounded-[2px] lg:mb-[44px]" themeColor={["#556fff", "#ff798e"]} size="xl" color="#fff" title="Purchase template" />
                                <div className="flex justify-center items-center text-center mt-[20px] xs:block">
                                    <span className="font-serif block sm:inline-block align-middle mr-[15px] xs:mr-0">Powered By</span>
                                    <a aria-label="themezaa" href="https://www.themezaa.com/" target="_blank" rel="noreferrer">
                                        <img loading="lazy" src="/assets/img/webp/themezaa-logo.webp" data-rjs="/assets/img/webp/themezaa-logo@2x.webp" className="mx-auto" width="227" height="51" alt="themezaa" />
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Footer>
            </Suspense>
            {/* Footer End */}
        </>
    )
}

export default LandingPage