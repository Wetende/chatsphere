import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Parallax } from "react-scroll-parallax";
import { m } from 'framer-motion'

// Components
import Header, { HeaderNav, Menu, SearchBar, Topbar } from '../../Components/Header/Header'
import { fadeIn, fadeInLeft, zoomIn } from '../../Functions/GlobalAnimations'
import Lists from '../../Components/Lists/Lists'
import Accordions from '../../Components/Accordion/Accordion'
import BlogClean from '../../Components/Blogs/BlogClean'
import TextBox from '../../Components/TextBox/TextBox'
import CustomModal from '../../Components/CustomModal'
import Buttons from '../../Components/Button/Buttons'
import Team from '../../Components/Team/Team'
import Counter from '../../Components/Counters/Counter'
import FooterStyle03 from '../../Components/Footers/FooterStyle03'
import SideButtons from "../../Components/SideButtons";
import Tab07 from '../../Components/Tab/Tab07';

// Data
import { CounterData02 } from '../../Components/Counters/CounterData'
import { TabData07 } from '../../Components/Tab/TabData';
import { TeamData03 } from '../../Components/Team/TeamData'
import { TextBoxData01 } from '../../Components/TextBox/TextBoxData'
import { blogData } from "../../Components/Blogs/BlogData";
import InViewPort from '../../Components/InViewPort';

const listData = [
    {
        icon: "fas fa-check",
        content: "Let's collaborate make an impact in the business",
    },
    {
        icon: "fas fa-check",
        content: "A satisfied customer is the best business starts",
    },
    {
        icon: "fas fa-check",
        content: "Expertise to build the things that matter for you",
    },
]

const AccordionData = [
    {
        title: "Strategy and planning",
        content: "Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been."
    },
    {
        title: "Finance and restructuring",
        content: "Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been."
    },
    {
        title: "Operations and efficiency",
        content: "Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been."
    },
]

// Filter the blog data category wise
const blogCleanData = blogData.filter((item) => item.blogType === "clean").filter(item => item.category.includes("consulting"));

const ConsultingPage = (props) => {
    return (
        <div style={props.style}>
            <SideButtons />
            {/* Header Start */}
            <Header topSpace={{ md: true }} type="reverse-scroll border-b border-[#ffffff1a]">
                <Topbar className="header-with-topbar bg-white border-bottom pl-[35px] pr-[50px] sm:hidden lg:pr-[50px] md:pl-[15px] md:pr-[30px]">
                    <Container fluid>
                        <Row className="flex items-center justify-between">
                            <Col sm="auto">
                                <p className="text-md">Good business consulting!&nbsp;
                                    <Link to="/page/contact-simple" className="text-darkgray font-medium underline hover:text-[#bf8c4c]">Get started now?</Link>
                                </p>
                            </Col>
                            <Col sm="auto" className="!pr-0">
                                <div className="flex text-sm leading-[30px]">
                                    <span className="flex items-center border-l py-[9px] px-[18px]">
                                        <i className="feather-phone-call mr-[10px] text-md text-darkgray"></i> 0222 8899900
                                    </span>
                                    <span className="flex items-center border-l py-[9px] pl-[18px]">
                                        <i className="feather-map-pin mr-[10px] text-md text-darkgray"></i> 401 Broadway, New York, USA
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Topbar>
                <HeaderNav fluid="fluid" theme="dark" expand="lg" className="py-[0px] px-[35px] lg:pr-[35px] md:px-0 md:py-[20px] ">
                    <Col className="col-6 col-lg-2 me-auto ps-lg-0 ps-0 ps-md-3">
                        <Link aria-label="header home link" className="flex items-center" to="/">
                            <Navbar.Brand className="inline-block p-0 m-0">
                                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-yellow-ochre.webp' data-rjs='/assets/img/webp/logo-yellow-ochre@2x.webp' alt='logo' />
                                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-yellow-ochre.webp' data-rjs='/assets/img/webp/logo-yellow-ochre@2x.webp' alt='logo' />
                            </Navbar.Brand>
                        </Link>
                    </Col>
                    <Navbar.Toggle className="order-last md:mx-[20px] sm:ml-[15px] sm:mr-0">
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse className="col-auto menu-order px-lg-0 justify-end">
                        <Menu {...props} />
                    </Navbar.Collapse>
                    <Col className="col-auto text-end pe-0 pl-[15px] font-size-0">
                        <SearchBar />
                    </Col>
                </HeaderNav>
            </Header>
            {/* Header End */}

            {/* Hero Section Start */}
            <section className="cover-background" style={{ backgroundImage: `url('https://via.placeholder.com/1920x1080')` }}>
                <div className="absolute h-full w-full opacity-20 top-0 left-0 bg-darkslateblue"></div>
                <Container className="relative">
                    <Row className="items-center h-[100vh] md:h-[800px] sm:h-[500px]">
                        <Col xl={5} lg={6} md={7} sm={10} className="font-serif font-medium">
                            <h2 className=" text-white leading-[65px] tracking-[-1px] mb-[65px] sm:leading-[50px] sm:mb-[25px]">We provide reliable business consulting help</h2>
                            <div className="text-md uppercase tracking-[2px] flex">
                                <span className="w-[40px] h-[1px] bg-[#bf8c4c] self-center mr-[25px]"></span>
                                <span className="text-[#bf8c4c]">Solution for your business</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="flex flex-row justify-end w-[750px] absolute right-0 bottom-0 z-[1] sm:relative sm:w-full">
                    <Row className="items-center justify-end mx-0 w-full">
                        <Col sm={9} className="items-center flex bg-[#bf8c4c] h-full py-12 px-20 xs:px-12">
                            <h3 className="heading-5 font-serif text-white font-light m-0">Are you ready to grow your <span className="font-semibold">business successfully?</span></h3>
                        </Col>
                        <Col xs={3} className="p-0 h-full lg:hidden">
                            <Link aria-label="link contact classic" to="/page/contact-classic" className="text-center flex items-center justify-center bg-[#f9f6f3] h-full">
                                <i className="line-icon-Arrow-OutRight text-[60px] text-[#bf8c4c]"></i>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </section>
            {/* Hero Section End */}

            {/* About section Start */}
            <section className="py-[160px] overflow-hidden cover-background lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" style={{ backgroundImage: `url('/assets/img/webp/home-consulting-about-bg.webp')` }}>
                <Container>
                    <Row className="items-center justify-center">
                        <m.div className="col-lg-6 col-md-10 md:mb-20 consulting-about" {...fadeIn}>
                            <h2 className="heading-4 font-serif font-medium text-darkgray tracking-[-1px] mb-16 w-[80%] lg:w-[90%] md:mb-12 xs:mb-16 xs:w-full">We provide solutions to <span className="text-[#bf8c4c] font-semibold text-decoration-line-bottom-thick">grow your business</span></h2>
                            <p className="w-[70%] mb-[40px] lg:w-[90%] md:mb-[45px] xs:mb-[25px]">Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor incididunt ut labore et dolore magna ut enim ad minim veniam nostrud exercitation.</p>
                            <Lists theme="list-style-02" data={listData} />
                            <div className="mt-[50px] md:mt-[25px] xs:mt-[35px] landscape:md:mt-[40px]">
                                <Buttons to="/page/about-us" className="mr-[35px] btn-fill btn-fancy rounded-none font-medium font-serif uppercase md:mb-[15px] xs:mb-0" themeColor="#232323" color="#fff" size="sm" title="About company" />
                                <Buttons to="/page/what-we-offer" className="font-medium pt-0 font-serif uppercase btn-link after:h-[2px] md:text-md md:mb-[15px] after:bg-darkgray hover:text-darkgray xs:mb-0" size="xl" color="#232323" title="Discover tour" />
                            </div>
                        </m.div>
                        <m.div className="col-lg-5 offset-lg-1 col-md-10" {...fadeIn}>
                            <div className="relative">
                                <div className="bg-darkslateblue absolute h-full w-full top-0 left-0 opacity-20"></div>
                                <img className="w-full" alt="" src="https://via.placeholder.com/457x607" width="457.5px" height="607.66px" />

                                {/* Modal Component Start */}
                                <CustomModal.Wrapper
                                    className="absolute top-0 items-center flex h-full left-[-50px] md:right-0 md:justify-center md:w-full md:left-0"
                                    modalBtn={<Buttons ariaLabel="modal button" type="submit" className="btn-sonar border-0 shadow-[0_0_15px_rgba(0,0,0,0.1)]" themeColor="#fff" color="#bf8c4c" size="xxl" title={<i className="feather-play text-[35px]" />} />} >
                                    <div className="w-[1020px] max-w-full relative rounded mx-auto">
                                        <div className="fit-video">
                                            <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                                        </div>
                                    </div>
                                </CustomModal.Wrapper>
                                {/* Modal Component End */}
                            </div>
                        </m.div>
                    </Row>
                </Container>
            </section>
            {/* About section End */}

            {/* Lazy Load HTML */}
            <InViewPort>
                {/* Section Start */}
                <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]" >
                    <Container>
                        <m.div className="row justify-center" {...fadeIn}>
                            <Col xl={6} lg={7} sm={8} className="text-center font-medium mb-12 font-serif xs:mb-0">
                                <span className="text-[#bf8c4c] uppercase block mb-[15px]">Thoughtful experiences</span>
                                <h2 className="heading-5 text-darkgray inline-block">A business consulting company that can produce anything</h2>
                            </Col>
                        </m.div>
                        <TextBox grid="row-cols-1 row-cols-md-3 row-cols-sm-2 justify-center gap-y-10" theme="text-box-style-01" data={TextBoxData01} animation={fadeIn} ani />
                    </Container>
                </section>
                {/* Section End */}

                {/* Tab Section Start */}
                <section className="py-[160px] pt-0 border-t border-lightgray overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                    <Tab07 data={TabData07} />
                </section>
                {/* Tab Section End */}

                {/* Section Start */}
                <section className="overflow-hidden bg-[#f9f6f3] md:py-[75px] sm:py-[50px]">
                    <Container>
                        <Row className="justify-center">
                            <Col xl={5} lg={6} md={10} className="flex flex-col justify-center md:py-0 md:mb-20">
                                <h2 className="heading-5 font-serif font-medium text-darkgray tracking-[-1px] mb-[4.5rem] w-[75%] md:mb-16 md:w-full">We provide solutions to grow your business</h2>
                                <Accordions theme="accordion-style-03" animation={fadeIn} data={AccordionData} className="consulting-accordion" />
                                <p className="mt-12">Looking for someone in particular?
                                    <Link aria-label="link contatc classic" to="/page/contact-classic" className="text-darkgray font-medium underline underline-offset-4 hover:text-[#BF8C4C] ml-[5px]">Get in touch</Link>
                                </p>
                            </Col>
                            <Col xl={{ offset: 1 }} lg={6} md={10}>
                                <m.div className="mr-[-30vw] relative md:mr-0" {...fadeInLeft}>
                                    <img className="w-full" src="https://via.placeholder.com/944x805" alt="contatc" width={944} height={805} />
                                </m.div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Section End */}

                {/* Section Start */}
                <m.section className="bg-gradient-to-b from-[#fff] via-[#fdfdfd] to-[#f7f7f7] overflow-hidden pt-[130px] lg:pt-[90px] md:pt-[75px] sm:pt-[50px]" {...fadeIn}>
                    <Container>
                        <Row className="justify-center">
                            <Col lg={7} sm={8} className="text-center font-serif mb-24 md:mb-12">
                                <span className="block mb-[15px]"><i className="line-icon-Business-ManWoman text-[50px] opacity-[.45]"></i></span>
                                <div className="text-[100px] leading-[95px] text-gradient bg-gradient-to-r from-[#bf8c4c] to-[#445a58] font-bold uppercase tracking-[-7px] xl:tracking-[-4px] lg:text-[90px] md:text-[70px] md:leading-[65px] sm:text-[45px] sm:leading-[43px]">Teamwork</div>
                                <span className="inline-block text-darkgray text-lg uppercase font-medium tracking-[1px] mb-[20px] mt-[10px] md:text-xmd">was more accepted 40 years ago</span>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid className="px-[8%] lg:px-[15px]">
                        <Team
                            themeColor="dark"
                            overlay={["#bf8c4ce6", "#445a58"]}
                            theme='team-style-03'
                            data={TeamData03}
                            grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-10"
                            animation={fadeIn}
                            animationDelay={0.3}
                            carousel={false} />
                    </Container>
                </m.section>
                {/* Section End */}

                {/* Section Start */}
                <section className="py-[130px] overflow-hidden lg:py-[90px]">
                    <Container>
                        <Counter
                            theme="counter-style-02"
                            grid="row row-cols-1 row-cols-md-4 row-cols-sm-2 items-center justify-center text-center gap-y-10"
                            className="heading-4 text-black font-serif"
                            as="h2"
                            data={CounterData02}
                            duration={2}
                        />
                    </Container>
                </section>
                {/* Section End */}

                {/* Section Start */}
                <div className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] md:flex md:items-center overflow-hidden relative">
                    <Parallax className="lg-no-parallax bg-cover absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] xs:bg-[center_center]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
                    <div className="absolute h-full w-full opacity-80 top-0 left-0 bg-gradient-to-tr from-[#bf8c4c] to-[#445a58]"></div>
                    <Container className="relative">
                        <Row className="justify-center">
                            <Col xl={7} lg={8} sm={10} className="text-center text-white font-serif">
                                {/* Modal Component Start */}
                                <CustomModal.Wrapper
                                    modalBtn={
                                        <m.div className="flex items-center justify-center" {...{ ...zoomIn, transition: { duration: 0.6 } }}>
                                            <Buttons ariaLabel="modal button" type="submit" className="btn-sonar border-0 mb-[3.5rem]" themeColor="#fff" color="#bf8c4c" size="lg" title={<i className="icon-control-play" />} />
                                        </m.div>
                                    } >
                                    <div className="w-[1020px] max-w-full relative rounded mx-auto">
                                        <div className="fit-video">
                                            <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                                        </div>
                                    </div>
                                </CustomModal.Wrapper>
                                {/* Modal Component End */}
                                <m.div {...fadeIn}>
                                    <h2 className="heading-4 font-semibold mb-[45px] sm:mb-[25px]">Get inspired by ideas and insights to help you get business</h2>
                                    <span className="uppercase tracking-[2px]">Unlimited power and customization</span>
                                </m.div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* Section End */}

                {/* Section Start */}
                <section className="py-[130px] overflow-hidden consulting-blogclean bg-[#f9f6f3] lg:py-[90px] md:py-[75px] sm:py-[50px]">
                    <Container>
                        <Row className="justify-center">
                            <Col xl={6} lg={7} sm={8} className="text-center mb-16 font-serif font-medium">
                                <span className="text-[#bf8c4c] uppercase inline-block mb-[15px]">Latest Stories</span>
                                <h2 className="heading-5 text-darkgray inline-block tracking-[-.5px]">A business consulting company that can produce anything</h2>
                            </Col>
                        </Row>
                        <BlogClean overlay={["#bf8c4c", "#445a58"]} filter={false} pagination="false" grid="grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={blogCleanData.slice(0, 3)} />
                    </Container>
                </section>
                {/* Section End */}

                {/* Footer Start */}
                <FooterStyle03 theme="dark" className="text-[#828282] bg-darkgray consulting-footer" />
                {/* Footer End */}
            </InViewPort>
        </div>
    )
}

export default ConsultingPage