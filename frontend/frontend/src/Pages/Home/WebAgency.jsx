import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { Link as ScrollTo } from "react-scroll"

// Components
import Header, { HamburgerMenu, HeaderNav, Menu, Topbar } from '../../Components/Header/Header'
import SocialIcons from '../../Components/SocialIcon/SocialIcons'
import Buttons from '../../Components/Button/Buttons'
import Clients from '../../Components/Clients/Clients'
import { fadeIn, fadeInRight, fadeInLeft } from '../../Functions/GlobalAnimations'
import { TextAnime } from '../../Components/FancyText/FancyText'
import InteractiveBanners04 from '../../Components/InteractiveBanners/InteractiveBanners04'
import ProcessStep from '../../Components/ProcessStep/ProcessStep'
import CustomModal from '../../Components/CustomModal'
import { Input } from '../../Components/Form/Form'
import ReactCustomScrollbar from "../../Components/ReactCustomScrollbar"
import MessageBox from '../../Components/MessageBox/MessageBox';
import PortfolioClassic from '../../Components/Portfolio/PortfolioClassic'
import Team from '../../Components/Team/Team'
import Counter from '../../Components/Counters/Counter'
import TestimonialsCarousel06 from '../../Components/TestimonialCarousel/TestimonialsCarousel06'
import BlogClassic from '../../Components/Blogs/BlogClassic'
import StaticInstagram from "../../Components/Instagram/StaticInstagram"
import { resetForm, sendEmail } from "../../Functions/Utilities"
import FooterStyle05 from '../../Components/Footers/FooterStyle05'
import SideButtons from "../../Components/SideButtons";

// Data
import { TestimonialsCarouselData6 } from '../../Components/TestimonialCarousel/TestimonialsCarouselData'
import { TeamData01 } from '../../Components/Team/TeamData'
import { CounterData02 } from '../../Components/Counters/CounterData'
import { InteractiveBannersData04 } from '../../Components/InteractiveBanners/InteractiveBannersData'
import { blogData } from "../../Components/Blogs/BlogData"

const SocialIconsData = [
    {
        color: "#3b5998",
        link: "https://www.facebook.com/",
        icon: "fab fa-facebook-f"
    },
    {
        color: "#fe1f49",
        link: "https://www.instagram.com/",
        icon: "fab fa-instagram"
    },
    {
        color: "#00aced",
        link: "https://twitter.com/",
        icon: "fab fa-twitter"
    },
    {
        color: "#ea4c89",
        link: "https://dribbble.com/",
        icon: "fab fa-dribbble"
    },
    {
        color: "#0077b5",
        link: "https://www.linkedin.com/",
        icon: "fab fa-linkedin-in"
    },
]

const ClientData = [
    {
        img: "https://via.placeholder.com/232x110"
    },
    {
        img: "https://via.placeholder.com/232x110"
    },
    {
        img: "https://via.placeholder.com/232x110"
    },
    {
        img: "https://via.placeholder.com/232x110"
    }
]

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

const ProcessStepData = [
    {
        title: "Project research",
        content: "Lorem ipsum amet consectetur do eiusmod tempor incididunt",
    },
    {
        title: "Sketches and design",
        content: "Lorem ipsum amet consectetur do eiusmod tempor incididunt",
    },
    {
        title: "Seleted concept",
        content: "Lorem ipsum amet consectetur do eiusmod tempor incididunt",
    }
]

const portfolioClassicData = [
    {
        title: "Magazine Cover",
        img: "https://via.placeholder.com/800x650",
        category: [""],
        subtitle: "Photography",
        link: "/portfolio/single-project-page-01"
    },
    {
        title: "Daimler Financial",
        img: "https://via.placeholder.com/800x650",
        category: ["logos"],
        subtitle: "Identity",
        link: "/portfolio/single-project-page-02"
    },
    {
        title: "Daimler Financial",
        img: "https://via.placeholder.com/800x650",
        category: ["branding", "photography"],
        subtitle: "Branding",
        link: "/portfolio/single-project-page-03"
    },
    {
        title: "Potato Oslands",
        img: "https://via.placeholder.com/800x650",
        category: ["branding"],
        subtitle: "Branding",
        link: "/portfolio/single-project-page-04"
    },
    {
        title: "Jeremy Dupont",
        img: "https://via.placeholder.com/800x650",
        category: ["logos"],
        subtitle: "Brochure",
        link: "/portfolio/single-project-page-05"
    },
    {
        title: "Skoda Corporate",
        img: "https://via.placeholder.com/800x650",
        category: ["photography"],
        subtitle: "Photography",
        link: "/portfolio/single-project-page-01"
    },
    {
        title: "Bill Gardner",
        img: "https://via.placeholder.com/800x650",
        category: ["photography"],
        subtitle: "Branding",
        link: "/portfolio/single-project-page-02"
    },
    {
        title: "The Aparthotel",
        img: "https://via.placeholder.com/800x650",
        category: ["logos"],
        subtitle: "Development",
        link: "/portfolio/single-project-page-03"
    }
]

const blogClassicData = blogData.filter((item) => item.blogType === "classic").filter(item => item.category.includes("webagency"));

const WebagencyPage = (props) => {
    return (
        <div>
            <SideButtons />
            {/* Header Start */}
            <Header className="header-with-topbar" topSpace={{ md: true }} type="reverse-scroll">
                <Topbar className="bg-[#1e1e1ecc] px-[30px] md:px-[15px] sm:hidden">
                    <Container fluid>
                        <Row>
                            <Col xs="auto" className="text-center items-center flex sm:text-start mr-auto pl-0">
                                <SocialIcons theme="social-icon-style-01" iconColor="light" size="xs" data={SocialIconsData.slice(0, 4)} />
                            </Col>
                            <Col xs="auto" className="py-[3px] text-sm">
                                <span className="py-[9px] px-[18px] inline-block">
                                    <i className="feather-phone-call text-white mr-[5px] text-md relative top-[3px]"></i>  0222 88999
                                </span>
                                <span className="py-[9px] pl-[18px] pr-[7px] md:pr-0 inline-block">
                                    <i className="feather-map-pin text-white mr-[6px] text-md relative top-[1px]"></i> 401 Broadway, New York, USA
                                </span>
                            </Col>
                        </Row>
                    </Container>
                </Topbar>
                <HeaderNav theme="dark" expand="lg" fluid="fluid" className="py-[0px] border-b border-[#ffffff1a] px-[35px] md:px-[15px] md:py-[20px] sm:px-0" containerClass="md:pl-0">
                    <Col className="col-6 col-lg-2 me-auto ps-lg-0 px-[15px]">
                        <Link aria-label="header logo" className="flex items-center" to="/">
                            <Navbar.Brand className="inline-block p-0 m-0">
                                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white.webp' alt='logo' />
                                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black.webp' alt='logo' />
                                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black.webp' alt='logo' />
                            </Navbar.Brand>
                        </Link>
                    </Col>
                    <Navbar.Toggle className="order-last md:ml-[17px]">
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse className="col-auto justify-center col-lg-8 menu-order px-0">
                        <Menu {...props} />
                    </Navbar.Collapse>
                    <Col className="col-auto col-lg-2 text-end pe-0 font-size-0">
                        <div className="md:hidden">
                            <HamburgerMenu className="" theme="dark">
                                <Col className="flex flex-col justify-center px-[50px] py-[70px] w-[500px] h-[100vh] shadow-[0_0_20px_rgba(0,0,0,0.3)] right-0 text-center bg-white">
                                    <ReactCustomScrollbar className="pl-[15px]" theme="dark">
                                        <div>
                                            <h1 className="mb-0 font-bold tracking-[-3px] text-darkgray tracking-[-3px] font-serif uppercase">Hello</h1>
                                            <p className="text-lg text-[#0038e2] font-serif uppercase block">Let's be friends.</p>
                                            <div className="my-20 w-full">
                                                <StaticInstagram />
                                            </div>
                                            <div className="mb-20 text-center">
                                                <p className="w-[70%] mb-12 text-darkgray leading-[26px] text-lg font-serif mx-auto inline-block">Get latest update for our trusted applications</p>
                                                <Formik
                                                    initialValues={{ email: '' }}
                                                    validationSchema={Yup.object().shape({ email: Yup.string().email("Invalid email.").required("Field is required."), })}
                                                    onSubmit={async (values, actions) => {
                                                        actions.setSubmitting(true)
                                                        const response = await sendEmail(values)
                                                        response.status === "success" && resetForm(actions)
                                                    }}
                                                >
                                                    {({ isSubmitting, status }) => (
                                                        <div className="relative subscribe-style-05">
                                                            <Form className="relative">
                                                                <Input showErrorMsg={false} type="email" name="email" className="border-[1px] medium-input rounded-[5px] border-solid border-[#dfdfdf]" placeholder="Enter your email address" />
                                                                <button aria-label="Subscribe" type="submit" className={`text-xs leading-[18px] py-[12px] px-[28px] uppercase xs:text-center${isSubmitting ? " loading" : ""}`}><i className="far fa-envelope text-fastblue text-sm leading-none mr-[10px] xs:mr-0"></i>Subscribe</button>
                                                            </Form>
                                                            <AnimatePresence>
                                                                {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-[25px] top-[115%] left-0 w-full"><MessageBox className="rounded-[4px] text-md py-[10px] px-[22px] z-10" theme="message-box01" variant="success" message="Your message has been sent successfully subscribed to our email list!" /></m.div>}
                                                            </AnimatePresence>
                                                        </div>
                                                    )}
                                                </Formik>
                                            </div>
                                            <div className="mb-[10px] text-center">
                                                <SocialIcons theme="social-icon-style-01" size="sm" iconColor="dark" data={SocialIconsData} />
                                            </div>
                                        </div>
                                    </ReactCustomScrollbar>
                                </Col>
                            </HamburgerMenu>
                        </div>
                    </Col>
                </HeaderNav>
            </Header>
            {/* Header End */}

            {/* Section Start */}
            <section className="p-0 cover-background" style={{ backgroundImage: `url('https://via.placeholder.com/1920x1100')` }}>
                <div className="absolute h-full w-full opacity-50 top-0 left-0 bg-darkslateblue"></div>
                <Container>
                    <Row className="items-stretch justify-center full-screen md:h-[650px] sm:h-[450px]">
                        <Col xl={6} lg={7} sm={8} className="relative page-title-extra-small text-center flex justify-center flex-col">
                            {/* Modal Component Start */}
                            <CustomModal.Wrapper
                                modalBtn={
                                    <Buttons ariaLabel="modal btn" type="submit" className="mx-auto mb-[40px] btn-sonar border-0" themeColor="#0038e3" color="#fff" size="lg" title={<i className="icon-control-play !ml-[8px]" />} />
                                } >
                                <div className="w-[1020px] max-w-full relative rounded mx-auto">
                                    <div className="fit-video">
                                        <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                                    </div>
                                </div>
                            </CustomModal.Wrapper>
                            {/* Modal Component End */}
                            <h2 className="text-white font-serif font-semibold -tracking-[1px] sm:leading-[45px] xs:leading-[45px] mb-0 text-shadow-extra-large">Hand crafted pixel perfect designs</h2>
                            <ScrollTo to="about" offset={0} delay={0} spy={true} smooth={true} duration={800} className="absolute bottom-[50px] left-1/2 -translate-x-1/2 cursor-pointer">
                                <i className="ti-mouse text-[28px] text-white up-down-ani"></i>
                            </ScrollTo>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="py-[100px] bg-gradient-to-b from-[#fff] via-[#fdfdfd] to-[#f7f7f7] overflow-hidden md:py-[75px] sm:py-[50px]">
                <Container>
                    <Clients grid="row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4" theme="client-logo-style-02" data={ClientData} animation={fadeIn} />
                </Container>
            </section>
            {/* Section End*/}

            {/* Section Start */}
            <section id="about" className="py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                <Container>
                    <Row>
                        <m.div className="col-xl-4 col-lg-5 col-md-6 xs:mb-[30px]" {...fadeIn}>
                            <h2 className="heading-4 font-serif font-semibold text-darkgray -tracking-[1px] sm:text-center">
                                <span className="block p-0 sm:text-center -tracking-[1px] mb-[10px] sm:mb-0">A creative agency specialized in web</span>
                                <TextAnime duration={3000} className="font-normal animated-text xs:text-center" animation="slide" data={["generated revenue", "customize tools", "strategy creation"]} />
                            </h2>
                        </m.div>
                        <m.div className="sm:text-center col-md-6 offset-xl-2 offset-lg-1" {...{ ...fadeIn, transition: { delay: 0.5 } }}>
                            <span className="font-serif font-semibold text-darkgray uppercase block mb-[15px]">About litho web agency</span>
                            <p className="text-xmd w-[75%] leading-[36px] md:w-full">With years of experience in the website design and development industry pride ourselves on creating unique, creative and quality designs that are developed upon the latest modern coding and developing techniques.</p>
                        </m.div>
                    </Row>
                    <Row className="row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-[40px] mt-36 justify-center md:mt-20">
                        {
                            data.map((item, i) => {
                                return (
                                    <Col key={i}>
                                        <m.div className="flex justify-center items-center h-full" {...{ ...fadeIn, transition: { delay: 0.2 * i } }}>
                                            <i className={`${item.icon} align-middle text-[28px] text-darkgray mr-[15px]`}></i>
                                            <span className="font-serif font-medium uppercase">{item.title}</span>
                                        </m.div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="lg:px-[20px] xs:px-0">
                <Container fluid className="px-[30px] xs:px-[15px]">
                    <InteractiveBanners04 grid="row-cols-12 gap-y-10 px-[15px] px-0 sm:justify-center" overlay={["#0039e3cc", "#4132e0cc", "#5e28ddcc", "#741bd9cc", "#8600d4cc"]} data={InteractiveBannersData04} animation={fadeIn} />
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="py-[130px] bg-white lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden">
                <Container>
                    <Row className="items-center justify-center">
                        <m.div className="col-12 col-xl-5 col-lg-6 col-md-9" {...fadeIn}>
                            <span className="font-serif font-semibold text-gradient bg-gradient-to-r from-[#0039e3] via-[#741bd9] to-[#8600d4] uppercase inline-block mb-[15px]">Business process</span>
                            <h2 className="heading-4 font-serif font-semibold text-darkgray block -tracking-[1px] mb-20 lg:mb-[80px] md:mb-[75px] xs:mb-20">Understand and apply the business process</h2>
                            <ProcessStep grid="row-cols-1" theme='process-step-style-02' data={ProcessStepData} animation={fadeIn} />
                        </m.div>
                        <m.div className="offset-xl-1 col-lg-6" {...fadeInLeft}>
                            <div className="-mr-[30vw] relative md:mr-0" >
                                <img width={1131} height={713} src="/assets/img/webp/home-web-agency-img-05.webp" className="overflow-hidden w-full" alt="processe" />
                            </div>
                        </m.div>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="py-[130px] overflow-hidden bg-[#f7f8fc] lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container>
                    <m.div className="row justify-center">
                        <Col xl={4} lg={5} md={7} sm={9} className="text-center">
                            <h2 className="heading-4 font-serif font-semibold text-darkgray -tracling-[1px] mb-[20px] sm:mb-[10px]">Recent work</h2>
                            <p className="mb-[25px]">Lorem ipsum dolor sit amet consectetur adipiscing eiusmod tempor incididunt ut labore magna</p>
                        </Col>
                    </m.div>
                </Container>
                <Container fluid className="px-24 md:px-8 xs:px-0">
                    <PortfolioClassic
                        overlay={["#0039e3", "#4132e0", "#5e28dd", "#741bd9", "#8600d4"]}
                        grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
                        data={portfolioClassicData} />
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container>
                    <m.div className="row justify-center">
                        <Col xl={4} lg={5} md={7} sm={9} className="text-center mb-24 md:mb-16">
                            <h2 className="heading-4 font-serif font-semibold text-darkgray -tracking-[1px] mb-[20px] sm:mb-[10px]">Professional team</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing eiusmod tempor incididunt ut labore magna</p>
                        </Col>
                    </m.div>
                    <Team themeColor="dark" theme='team-style-01' data={TeamData01} grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-[15px]" animation={fadeIn} animationDelay={0.2} carousel={false} overlay={["#0039e3cc", "#4132e0cc", "#5e28ddcc", "#741bd9cc", "#8600d4cc"]} />
                    <Row>
                        <Col className="text-center mt-[6.5rem] lg:mt-20">
                            <span className="font-serif font-medium text-xmd text-darkgray -tracking-[.5px]">Are you ready to work with us? <Link aria-label="our-team" className="font-semibold text-fastblue text-decoration-line-bottom" to="/page/our-team">Apply now</Link></span>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="bg-darkgray overflow-hidden">
                <Container fluid>
                    <Row>
                        <m.div className="col-lg-6 cover-background md:h-[550px] sm:h-[400px] xs:h-[300px]" {...fadeInRight} style={{ backgroundImage: `url('https://via.placeholder.com/1021x682')` }}></m.div>
                        <m.div className="col-lg-6 py-[119px] px-[147px] xl:p-[7.5rem] lg:p-[4.5rem] md:p-[5.5rem] xs:px-20" {...fadeIn}>
                            <span className="font-serif text-[#828282] font-medium text-xmd uppercase -tracking-[.5px] block mb-[25px]">Pixel perfect designs</span>
                            <h2 className="heading-4 font-serif font-semibold text-white -tracking-[1px] w-[65%] mb-10 xl:w-full">Innovative solutions to boost your projects</h2>
                            <p className="w-[60%] text-[#828282] mb-[25px] xl:w-full">Lorem ipsum dolor sit amet consectetur adipiscing elitdo eiusmod tempor incididunt ut labore dolore magna utenim minim veniam nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <Buttons ariaLabel="our-services" to="/page/our-services" className="btn-fill mt-[20px] font-medium font-serif tracking-[1px] rounded-none uppercase" themeColor="#fff" color="#232323" size="lg" title="View services" />
                        </m.div>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
                <Container>
                    <Counter theme="counter-style-02" as="h3" grid="row-cols-1 row-cols-md-4 row-cols-sm-2 items-center justify-center sm:gap-y-10" className="text-black text-[70px] text-center" data={CounterData02} duration={2} />
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="py-[160px] bg-lightgray testimonial-carousel-style-06 lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
                <Container>
                    <Row className="justify-center text-center relative">
                        <Col xl={6} lg={7} md={9}>
                            <TestimonialsCarousel06
                                carouselOption={{
                                    slidesPerView: 1,
                                    loop: true,
                                    navigation: false,
                                    autoplay: { delay: 4500, disableOnInteraction: false },
                                    pagination: { dynamicBullets: false, clickable: true },
                                    keyboard: { enabled: true, onlyInViewport: true },
                                }}
                                data={TestimonialsCarouselData6} />
                        </Col>
                    </Row>
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container className="xs:px-0">
                    <Row className="justify-center">
                        <Col xl={4} lg={5} md={7} sm={9} className="text-center mb-[70px] md:mb-20 xs:mb-12">
                            <h2 className="heading-4 font-serif font-semibold text-darkgray -tracking-[1px] mb-[20px] sm:mb-[10px]">Latest news</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing eiusmod tempor incididunt ut labore magna</p>
                        </Col>
                    </Row>
                    <Row className="justify-center">
                        <BlogClassic grid="blog-classic blog-wrapper grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={blogClassicData} />
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Footer Start */}
            <FooterStyle05 theme="dark" className="bg-[#262b35] text-slateblue" />
            {/* Footer End */}

        </div>
    )
}

export default WebagencyPage
