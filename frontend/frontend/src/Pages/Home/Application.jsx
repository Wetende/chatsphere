import React from 'react'

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Autoplay, Keyboard } from "swiper/modules";
import { Link } from 'react-router-dom'
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { AnimatePresence, m } from 'framer-motion';
import { Link as ScrollTo } from "react-scroll"

// Components
import Header, { HeaderNav, Menu, MobileMenu } from '../../Components/Header/Header'
import Buttons from '../../Components/Button/Buttons'
import { TiltBox } from '../../Components/FancyText/FancyText'
import IconWithText from '../../Components/IconWithText/IconWithText'
import PricingTable04 from '../../Components/PricingTable/PricingTable04';
import CustomModal from '../../Components/CustomModal'
import FooterStyle08 from '../../Components/Footers/FooterStyle08';
import TestimonialsCarousel04 from '../../Components/TestimonialCarousel/TestimonialsCarousel04';
import MessageBox from '../../Components/MessageBox/MessageBox';
import { Input } from '../../Components/Form/Form'
import SideButtons from "../../Components/SideButtons";
import { fadeIn, fadeInRight, fadeInLeft, zoomIn } from "../../Functions/GlobalAnimations";

// Data
import { TestimonialsCarouselData4 } from '../../Components/TestimonialCarousel/TestimonialsCarouselData';

// function
import { resetForm, sendEmail } from "../../Functions/Utilities";
import InViewPort from '../../Components/InViewPort';

const IconWithTextData = [
    {
        icon: "line-icon-Favorite-Window text-gradient bg-gradient-to-r from-[#975ade] via-[#af63d2] to-[#e6686f] text-[40px]",
        title: "Premium dashboard",
        content: "Lorem ipsum consectetur dolor eiusmod tempor incididunt",
    },
    {
        icon: "line-icon-Talk-Man text-gradient bg-gradient-to-r from-[#975ade] via-[#af63d2] to-[#e6686f] text-[40px]",
        title: "Millions of users",
        content: "Lorem ipsum consectetur dolor eiusmod tempor incididunt",
    },
    {
        icon: "line-icon-Gear-2 text-gradient bg-gradient-to-r from-[#975ade] via-[#af63d2] to-[#e6686f] text-[40px]",
        title: "Easy to customize",
        content: "Lorem ipsum consectetur dolor eiusmod tempor incididunt",
    },
    {
        icon: "line-icon-Sound text-gradient bg-gradient-to-r from-[#975ade] via-[#af63d2] to-[#e6686f] text-[40px]",
        title: "Higher quality sound",
        content: "Lorem ipsum consectetur dolor eiusmod tempor incididunt",
    },
    {
        icon: "line-icon-Download-fromCloud text-gradient bg-gradient-to-r from-[#975ade] via-[#af63d2] to-[#e6686f] text-[40px]",
        title: "Offline listening",
        content: "Lorem ipsum consectetur dolor eiusmod tempor incididunt",
    },
    {
        icon: "line-icon-Archery-2 text-gradient bg-gradient-to-r from-[#975ade] via-[#af63d2] to-[#e6686f] text-[40px]",
        title: "Amazing performance",
        content: "Lorem ipsum consectetur dolor eiusmod tempor incididunt",
    },
]

const FeaturesData = [
    {
        icon: "line-icon-Navigation-LeftWindow text-basecolor text-[40px] text-gradient bg-gradient-to-r from-[#975ade] via-[#af63d2] to-[#e6686f]",
        title: "Amazing layouts",
        content: "Lorem ipsum is simply dummy text the printing typesetting",
    },
    {
        icon: "line-icon-Cursor-Click2 text-basecolor text-[40px] text-gradient bg-gradient-to-r from-[#975ade] via-[#af63d2] to-[#e6686f]",
        title: "No coding required",
        content: "Lorem ipsum is simply dummy text the printing typesetting",
    },
    {
        icon: "line-icon-Gear-2 text- text-[40px] text-gradient bg-gradient-to-r from-[#975ade] via-[#af63d2] to-[#e6686f]",
        title: "Easy to customize",
        content: "Lorem ipsum is simply dummy text the printing typesetting",
    },
    {
        icon: "line-icon-Talk-Man text-basecolor text-[40px] text-gradient bg-gradient-to-r from-[#975ade] via-[#af63d2] to-[#e6686f]",
        title: "Customer satisfaction",
        content: "Lorem ipsum is simply dummy text the printing typesetting",
    }
]

const TestimonialsCarouselData = [
    {
        img: "https://via.placeholder.com/353x681"
    },
    {
        img: "https://via.placeholder.com/353x681"
    },
    {
        img: "https://via.placeholder.com/353x681"
    },
    {
        img: "https://via.placeholder.com/353x681"
    },
    {
        img: "https://via.placeholder.com/353x681"
    },
    {
        img: "https://via.placeholder.com/353x681"
    }
]

const pricingTable04 = [
    {
        title: "BASIC PLAN",
        subtitle: "Core features",
        price: "$29",
        term: "PER YEAR",
        plans: [
            "Pixel perfect design", "Personal applications", "Step by step support"
        ],
        buttonTitle: "Choose Package",
        buttonLink: "/page/pricing-packages",
    },
    {
        title: "STANDARD PLAN",
        subtitle: "Most popular",
        price: "$39",
        term: "PER YEAR",
        plans: [
            "Pixel perfect design", "Personal applications", "Responsive app layout", "Step by step support"

        ],
        buttonTitle: "Choose Package",
        buttonLink: "/page/pricing-packages",
        popular: {
            isPopular: true,
            color: "#502e95"
        }
    },
    {
        title: "PREMIUM PLAN",
        subtitle: "Huge features",
        price: "$49",
        term: "PER YEAR",
        plans: [
            "Pixel perfect design", "Personal applications", "Step by step support"

        ],
        buttonTitle: "Choose Package",
        buttonLink: "/page/pricing-packages",
    }
]

const ApplicationPage = (props) => {
    const swiperRef = React.useRef(null)

    return (
        <div style={props.style}>
            <SideButtons />
            {/* Header Start */}
            <Header topSpace={{ md: true }} type="reverse-scroll">
                <HeaderNav fluid="fluid" theme="dark" menu="light" className="application-header px-[35px] py-[0px] pr-[50px] md:px-0 md:py-[18px] sm:px-0 xs:py-[15px]" containerClass="sm:px-0">
                    <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
                        <Link aria-label="header logo" className="flex items-center" to="/">
                            <Navbar.Brand className="inline-block p-0 m-0">
                                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-gradient-light-purple-light-red.webp' data-rjs='/assets/img/webp/logo-gradient-light-purple-light-red@2x.webp' alt='logo' />
                                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-gradient-light-purple-light-red.webp' data-rjs='/assets/img/webp/logo-gradient-light-purple-light-red@2x.webp' alt='logo' />
                            </Navbar.Brand>
                        </Link>
                    </Col>
                    <Menu className="col-auto md:hidden" {...props} />
                    <MobileMenu className="order-last d-lg-none" type="modern" {...props} />
                    <Col className="col-auto text-end pe-0 font-size-0 pl-[15px] sm:hidden">
                        <ScrollTo href='#' to="download" offset={0} delay={0} spy={true} smooth={true} duration={800} className="nav-link section-link">
                            <Buttons type="submit" aria-label="download section" className="rounded-[2px] -mr-[15px] md:mr-0 font-medium font-serif uppercase md:mb-0" themeColor={["#b884fd", "#fd9395"]} size="xs" color="#fff" title="Download Now" />
                        </ScrollTo>
                    </Col>
                </HeaderNav>
            </Header>
            {/* Header End */}

            {/* Section Start */}
            <section className="bg-cover bg-no-repeat overflow-visible bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/1920x1038')" }}>
                <Container>
                    <Row className="justify-center sm:text-center">
                        <Col lg={6} xl={5} md={7} sm={8} className="h-[100vh] flex flex-col items-start justify-center pb-40 pt-24 lg:pt-40 lg:pb-32 md:pt-24 md:pb-40 sm:h-auto sm:pb-20 md:h-[650px]">
                            <span className="font-serif font-semibold text-md leading-[24px] tracking-[1px] text-gradient bg-gradient-to-r from-[#975ade] to-[#ff798e] border-b border-gradient-light-purple-light-red inline-block uppercase mb-[45px] sm:mt-0 sm:mx-auto sm:mb-[35px]">Sale anything online</span>
                            <h1 className="font-serif text-white font-bold tracking-[-3px] uppercase mb-10">Powerful ecommerce</h1>
                            <p className="text-lg leading-[30px] text-white opacity-60 mb-[25px] font-light w-[85%] sm:w-full md:text-xmd sm:mb-[15px] xs:leading-[22px]">Get the app and sign-up to create an account Sale your favorite products and more.</p>
                            <ScrollTo href='#' to="download" offset={0} delay={0} spy={true} smooth={true} duration={800} className="sm:contents">
                                <Buttons type="submit" aria-label="download section down" className="font-medium btn-fancy font-serif uppercase tracking-[1px] btn-gradient mt-6 md:mb-[15px] rounded-[2px] sm:my-0 sm:mt-[16px] sm:mx-auto" themeColor={["#b884fd", "#fd9395"]} size="lg" color="#fff" icon="fas fa-arrow-right" iconPosition="after" title="Download Now" />
                            </ScrollTo>
                        </Col>
                        <Col xl={{ offset: 1 }} lg={6} md={5} className="z-0 text-left self-end md:self-center">
                            <TiltBox className="bottom-[-95px] lg:-bottom-[65px]">
                                <img alt="" src="https://via.placeholder.com/889x1644" height={1026} width={555} />
                            </TiltBox>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End*/}

            {/* Lazy Load HTML */}
            <InViewPort>
                {/* Section Start */}
                <m.section id="about" className="border-b border-mediumgray py-[130px] lg:py-[90px] sm:pb-[50px] md:pt-0 sm:pt-[50px]" {...fadeIn}>
                    <Container>
                        <Row className="justify-center">
                            <Col lg={6} sm={8} className="text-center mb-24 md:mb-16 sm:mb-8 mt-14">
                                <span className="font-serif font-medium text-md text-gradient bg-gradient-to-r from-[#975ade] via-[#e05fc4] to-[#ff798e] tracking-[.5px] uppercase inline-block mb-[20px] sm:mb-[10px]">Amazing ultimate application features</span>
                                <h2 className="heading-4 font-serif font-light text-darkgray tracking-[-1px]">A great features for your application interface</h2>
                            </Col>
                            <IconWithText grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 text-center md:gap-y-[15px]" theme="icon-with-text-03" data={FeaturesData} animation={fadeIn} animationDelay={0.3} />
                        </Row>
                    </Container>
                </m.section>
                {/* Section End */}

                {/* Section Start */}
                <section className="cover-background py-[130px] relative cover-background lg:py-[90px] md:py-[75px] sm:py-[50px]" style={{ backgroundImage: `url(/assets/img/webp/application-banner-img-02.webp)` }}>
                    <Container>
                        <Row className="items-center justify-center">
                            <Col xs={10} lg={5} xl={4} className="md:mb-[70px] sm:mb-[50px] sm:text-center">
                                <m.h2 className="heading-5 font-serif font-light text-[#262b35] -tracking-[1px] mb-16 md:text-center" {...{ ...fadeIn, transition: { delay: 0.2 } }}>Intuitive dashboard visually rich experience</m.h2>
                                <div className="row flex-col items-start md:text-center">
                                    <m.div className="col" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
                                        <span className="font-serif font-medium text-[#262b35] block mb-[10px]">Flexible customization application</span>
                                        <p className="w-[90%] inline-block xs:w-full">Lorem ipsum dolor amet consectetur adipiscing do eiusmod tempor incididunt magna.</p>
                                    </m.div>
                                    <m.div className="col" {...{ ...fadeIn, transition: { delay: 0.6 } }}><div className="h-[1px] w-full bg-mediumgray my-[40px] xs:my-[30px]"></div></m.div>
                                    <m.div className="col" {...{ ...fadeIn, transition: { delay: 0.7 } }}>
                                        <span className="font-serif font-medium text-[#262b35] block mb-[10px]">Easiest way to control resources</span>
                                        <p className="w-[90%] inline-block xs:w-full">Lorem ipsum dolor amet consectetur adipiscing do eiusmod tempor incididunt magna.</p>
                                    </m.div>
                                    <m.div className="col mt-[4.5rem] flex md:justify-center" {...{ ...fadeIn, transition: { delay: 1 } }}>
                                        {/* Modal Component Start */}
                                        <CustomModal.Wrapper
                                            modalBtn={
                                                <span className="inline-flex flex-row items-center justify-center">
                                                    <Buttons ariaLabel="modal button" type="submit" className="btn-sonar border-0 mr-[15px]" themeColor={["#bb85f9", "#fb9398"]} color="#fff" size="md" title={<i className="icon-control-play text-lg" />} />
                                                    <span className="relative font-semibold text-darkgray text-base font-serif uppercase inline-block align-middle border-b cursor-pointer border-darkgray"> How it works </span>
                                                </span>
                                            } >
                                            <div className="w-[1020px] max-w-full relative rounded mx-auto">
                                                <div className="fit-video">
                                                    <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                                                </div>
                                            </div>
                                        </CustomModal.Wrapper>
                                        {/* Modal Component End */}
                                    </m.div>
                                </div>
                            </Col>
                            <m.div className="col-xl-5 col-lg-6 offset-xl-3 offset-lg-1" {...fadeInLeft}>
                                <div className="mr-[-30vw] md:mr-0" >
                                    <img src="https://via.placeholder.com/947x680" alt="" height={680} width={947} />
                                </div>
                            </m.div>
                        </Row>
                    </Container>
                </section>
                {/* section End */}

                {/* Section Start */}
                <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
                    <Container>
                        <m.div className="row justify-center" {...fadeIn}>
                            <Col lg={5} sm={6} xl={4} className="text-center mb-16">
                                <span className="font-serif font-medium text-md text-gradient bg-gradient-to-r from-[#975ade] via-[#e05fc4] to-[#ff798e] tracking-[.5px] uppercase inline-block mb-[20px] sm:mb-[10px]">Amazing features</span>
                                <h2 className="heading-5 font-serif font-light text-darkgray tracking-[-1px] mx-auto mx-sm-0 xs:w-[80%]">Advanced set of tools for your application</h2>
                            </Col>
                        </m.div>
                        <Row className="items-center justify-between">
                            <Col lg={3} md={4} className="text-center md:text-end sm:mb-[30px]">
                                <IconWithText grid="row-cols-1 row-cols-sm-2 row-cols-md-1 gap-y-[5rem] text-right sm:justify-center sm:text-center" theme="icon-with-text-03" data={IconWithTextData.slice(0, 3)} className="application-iconwithtext" animation={fadeInRight} animationDelay={0.2} />
                            </Col>
                            <Col md={4} className="px-lg-0 sm:mb-[20px]">
                                <m.img width={390} height={726} alt="mobile" src="https://via.placeholder.com/889x1654" className="w-full" {...{ ...zoomIn, transition: { duration: 0.7 } }} />
                            </Col>
                            <Col lg={3} md={4}>
                                <IconWithText grid="row-cols-1 row-cols-sm-2 row-cols-md-1 gap-y-[5rem] text-left sm:justify-center sm:text-center" theme="icon-with-text-03" data={IconWithTextData.slice(3, 6)} className="application-iconwithtext" animation={fadeInLeft} animationDelay={0.2} />
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Section End */}

                {/* Section Start */}
                <m.section id="download" className="py-[160px] cover-background lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" style={{ backgroundImage: `url("https://via.placeholder.com/1920x388")` }} {...fadeIn}>
                    <Container>
                        <Row className="items-center">
                            <Col lg={5} md={6} className="col-12 text-left font-serif uppercase sm:mb-[30px] sm:text-center">
                                <span className="font-medium text-md text-gradient bg-gradient-to-r from-[#975ade] via-[#e05fc4] to-[#ff798e] tracking-[.5px] inline-block mb-[15px] sm:mb-[10px]">Get the application download</span>
                                <h2 className="heading-4 font-semibold text-white -tracking-[1px] mb-0">Get just for $1.00</h2>
                            </Col>
                            <Col lg={{ offset: 1 }} md={6} className="flex sm:justify-center ps-lg-0">
                                <a rel="noreferrer" aria-label="link app store" className="inline-block mr-[30px] md:mr-[10px] sm:mr-[15px] xs:mr-[10px]" target="_blank" href="https://www.apple.com/app-store/"><img src="/assets/img/webp/application-img-11.webp" alt='app-store' width="249" height="80" /></a>
                                <a rel="noreferrer" aria-label="link apple store" className="inline-block md:ml-[10px] sm:ml-0" target="_blank" href="https://play.google.com/store/games?pli=1"><img src="/assets/img/webp/application-img-12.webp" alt='app-store' width="249" height="80" /></a>
                            </Col>
                        </Row>
                    </Container>
                </m.section>
                {/* Section End */}

                {/* Section Start */}
                <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
                    <Container>
                        <Row className="items-center xs:justify-center">
                            <Col md={12} xl={4} lg={5} className="col-11 pb-28 sm:pb-24 xs:pt-0 relative">
                                <span className="font-serif font-medium text-md text-gradient bg-gradient-to-r from-[#975ade] via-[#e05fc4] to-[#ff798e] tracking-[.5px] uppercase inline-block mb-[25px] sm:mb-[15px]">Mobile experience</span>
                                <h2 className="heading-5 font-serif font-light text-[#262b35] tracking-[-.5px] mb-[30px] md:mb-[15px]">We enhance visual display and promote</h2>
                                <p className="w-3/4 mb-[60px] sm:w-full md:mb-[25px]">Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt ut labore ut enim ad minim veniam nostrud.</p>
                                <div className="flex swiper-navigation-03 swiper-navigation-light relative">
                                    <div onClick={() => swiperRef.current.swiper.slidePrev()} className="swiper-button-prev relative"></div>
                                    <div onClick={() => swiperRef.current.swiper.slideNext()} className="swiper-button-next ml-[10px] relative"></div>
                                </div>
                            </Col>
                            <m.div lg={7} xl={{ offset: 1 }} className="col-lg-7 offset-xl-1" {...fadeInLeft}>
                                <div className="min-w-[1170px] md:min-w-full">
                                    <Swiper
                                        ref={swiperRef}
                                        spaceBetween={30}
                                        slidesPerView={1}
                                        breakpoints={{ 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }}
                                        observer={true}
                                        observeParents={true}
                                        keyboard={{ enabled: true, onlyInViewport: true }}
                                        loop={true}
                                        modules={[Autoplay, Keyboard]}
                                        autoplay={{
                                            delay: 3000,
                                            disableOnInteraction: false
                                        }}>
                                        {
                                            TestimonialsCarouselData.map((item, i) => {
                                                return (
                                                    <SwiperSlide key={i}>
                                                        <img src={item.img} alt="screenshots" height="681" width="353" className="w-full sm:mx-auto" />
                                                    </SwiperSlide>
                                                )
                                            })
                                        }
                                    </Swiper>
                                </div>
                            </m.div>
                        </Row>
                    </Container>
                </section>
                {/* Section End */}

                {/* Section Start */}
                <m.section className="py-[130px] overflow-hidden bg-gradient-to-b from-[#f7f7f7] via-[#fbfbfb] to-[#fff] lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
                    <Container>
                        <Row className="justify-center">
                            <Col sm={6} xl={5} className="text-center mb-[5.5rem] md:mb-16">
                                <span className="font-serif font-medium text-md text-gradient bg-gradient-to-r from-[#975ade] via-[#e05fc4] to-[#ff798e] tracking-[.5px] uppercase inline-block mb-[20px] sm:mb-[10px]">PREDICTABLE PRICING</span>
                                <h2 className="heading-5 font-serif font-light text-darkgray mx-auto sm:mx-0 xs:-tracking-[1px] xs:w-[80%]">We have tailored pricing plans for everyone</h2>
                            </Col>
                        </Row>
                        <PricingTable04 grid="row-cols-1 row-cols-lg-3 justify-center items-center gap-y-10" theme='pricing-table-style-04' className="col-12 col-lg-4 col-md-8" data={pricingTable04} />
                    </Container>
                </m.section>
                {/* Section End */}

                {/* Section Start */}
                <m.section className="bg-gradient-to-b from-[#fff] via-[#fbfbfb] to-[#f7f7f7] border-t border-mediumgray py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
                    <Container>
                        <Row className="justify-center">
                            <Col md={6} xl={5} className="text-center mb-12 sm:mb-4">
                                <span className="font-serif font-medium text-md text-gradient bg-gradient-to-r from-[#975ade] via-[#e05fc4] to-[#ff798e] tracking-[.5px] uppercase inline-block mb-[20px] sm:mb-[10px]">SATISFIED CLIENTS</span>
                                <h2 className="heading-5 font-serif w-[90%] md:w-full font-light text-darkgray -tracking-[1px] mx-auto xs:w-[80%]">Loved by 1000 of most valuable customers</h2>
                            </Col>
                            <TestimonialsCarousel04
                                data={TestimonialsCarouselData4}
                                className="black-move"
                                carouselOption={{
                                    slidesPerView: 1,
                                    loop: true,
                                    breakpoints: { 768: { slidesPerView: 2 } },
                                    navigation: false,
                                    autoplay: { delay: 3000, disableOnInteraction: false }
                                }}
                            />
                        </Row>
                    </Container>
                </m.section>
                {/* Section End */}

                {/* Section Start */}
                <m.section className="pt-0 py-[130px] overflow-hidden bg-lightgray md:py-[75px] sm:py-[50px]" {...fadeIn}>
                    <Container>
                        <Row className="justify-center">
                            <Col xl={6} md={8} lg={7} className="px-md-0">
                                <h2 className="heading-4 font-bold text-[#502e95] tracking-[-1px] mb-16 text-center font-serif">GET LATEST UPDATE FOR OUR TRUSTED APPLICATIONS</h2>
                                <Formik
                                    initialValues={{ email: "" }}
                                    validationSchema={Yup.object().shape({ email: Yup.string().email("Invalid email.").required("Field is required."), })}
                                    onSubmit={async (values, actions) => {
                                        actions.setSubmitting(true)
                                        const response = await sendEmail(values)
                                        response.status === "success" && resetForm(actions)
                                    }}
                                >
                                    {({ isSubmitting, status }) => (
                                        <div className="relative mb-16 xs:mb-8 subscribe-style-01">
                                            <Form className="relative">
                                                <Input showErrorMsg={false} type="email" name="email" className="border-[1px] extra-large-input border-solid border-transparent" placeholder="Enter your email address" />
                                                <button aria-label="subscribe button" type="submit" className={`text-[14px] tracking-[1px] py-[12px] px-[28px] uppercase xs:!mt-[65px] xs:!mx-auto${isSubmitting ? " loading" : ""}`}>
                                                    <i className="far fa-envelope"></i>Subscribe
                                                </button>
                                            </Form>
                                            <AnimatePresence>
                                                {status &&
                                                    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-[115%] left-0 w-full">
                                                        <MessageBox className="py-[5px] rounded-[100px] text-center text-md" theme="message-box01" variant="success" message="Your message has been sent successfully subscribed to our email list!" />
                                                    </m.div>}
                                            </AnimatePresence>
                                        </div>
                                    )}
                                </Formik>
                                <p className="text-center w-[65%] text-sm m-auto md:w-[75%] xs:w-full xs:!mt-[70px]">We are committed to protecting your privacy. We will never collect information about you without your explicit consent.</p>
                            </Col>
                        </Row>
                    </Container>
                </m.section>
                {/* Section End */}

                {/* Footer Start */}
                <FooterStyle08 className="bg-[#3a285e] text-[#ffffff80]" theme="dark" />
                {/* Footer End */}
            </InViewPort>
        </div>
    )
}

export default ApplicationPage
