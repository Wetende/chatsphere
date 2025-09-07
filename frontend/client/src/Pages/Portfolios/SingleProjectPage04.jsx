import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import { m } from 'framer-motion';
import { Autoplay, EffectFade, Keyboard } from "swiper/modules";

// Components
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../../Components/Header/Header'
import Buttons from '../../Components/Button/Buttons'
import ImageGallery from '../../Components/ImageGallery/ImageGallery'
import Clients from '../../Components/Clients/Clients'
import CustomModal from '../../Components/CustomModal'
import { fadeIn, zoomIn } from '../../Functions/GlobalAnimations';
import FooterStyle01 from '../../Components/Footers/FooterStyle01';
import Overlap from '../../Components/Overlap/Overlap';
import SideButtons from "../../Components/SideButtons";

// Data

const ImagesGalleryData = [
    {
        src: "https://via.placeholder.com/1200x630",
        title: "Lightbox gallery image title",
        double_col: true
    },
    {
        src: "https://via.placeholder.com/600x600",
        title: "Lightbox gallery image title",
    },
    {
        src: "https://via.placeholder.com/600x600",
        title: "Lightbox gallery image title",
    },
    {
        src: "https://via.placeholder.com/600x600",
        title: "Lightbox gallery image title",
    },
    {
        src: "https://via.placeholder.com/600x600",
        title: "Lightbox gallery image title",
    },
    {
        src: "https://via.placeholder.com/600x600",
        title: "Lightbox gallery image title",
    },
]

const ClientData = [
    {
        img: "https://via.placeholder.com/130x130",
        link: "#"
    },
    {
        img: "https://via.placeholder.com/130x130",
        link: "#"
    },
    {
        img: "https://via.placeholder.com/130x130",
        link: "#"
    }
]

const SwiperImgData = [
    {
        img: "https://via.placeholder.com/1235x670"
    },
    {
        img: "https://via.placeholder.com/1235x670"
    },
    {
        img: "https://via.placeholder.com/1235x670"
    }
]

const SingleProjectPage04 = (props) => {
    return (
        <div style={props.style}>
            {/* Header Start */}
            <Header topSpace={{ desktop: true }} type="reverse-scroll">
                <HeaderNav fluid="fluid" theme="light" bg="white" menu="light" className="px-[35px] py-[0px] md:px-0" containerClass="sm:px-0">
                    <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
                        <Link aria-label="header logo" className="flex items-center" to="/">
                            <Navbar.Brand className="inline-block p-0 m-0">
                                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                            </Navbar.Brand>
                        </Link>
                    </Col>
                    <div className="col-auto hidden order-last md:block">
                        <Navbar.Toggle className="md:ml-[10px] sm:ml-0">
                            <span className="navbar-toggler-line"></span>
                            <span className="navbar-toggler-line"></span>
                            <span className="navbar-toggler-line"></span>
                            <span className="navbar-toggler-line"></span>
                        </Navbar.Toggle>
                    </div>
                    <Navbar.Collapse className="col-auto pe-0 justify-end">
                        <Menu {...props} />
                    </Navbar.Collapse>
                    <Col className="col-auto text-right pe-0">
                        <SearchBar className="pr-0 xs:p-0" />
                        <HeaderLanguage />
                        <HeaderCart style={{ "--base-color": "#0038e3" }} />
                    </Col>
                </HeaderNav>
            </Header>
            {/* Header End */}
            <SideButtons />
            {/* Section Start */}
            <section className="py-[130px] h-[700px] sm:h-[400px] cover-background lg:py-[90px] md:py-[75px] sm:py-[50px]" style={{ backgroundImage: "url(https://via.placeholder.com/1920x700)" }}></section>
            {/* Section End */}

            {/* Section Start */}
            <section className="py-[130px] overflow-hidden px-[16%] xl:px-[10%] lg:py-[90px] lg:px-[6%] md:py-[75px] sm:py-[50px] xs:px-[0]">
                <Container fluid>
                    <m.div {...fadeIn} className="row text-left xs:text-center">
                        <Col lg={2} sm={4} className="font-serif xs:mb-[15px]">
                            <span className=" text-sm uppercase block">Year</span>
                            <span className="font-medium text-darkgray">January 2020</span>
                        </Col>
                        <Col lg={2} sm={4} className="font-serif xs:mb-[15px]">
                            <span className="text-sm uppercase block">Our role</span>
                            <span className="font-medium text-darkgray">Product design</span>
                        </Col>
                        <Col lg={2} sm={4} className="font-serif">
                            <span className="text-sm uppercase block">Industry</span>
                            <span className="font-medium text-darkgray">Food and drink</span>
                        </Col>
                        <Col xl={{ span: 5, offset: 1 }} lg={6} className="md:mt-[30px]">
                            <p>Simply oj is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. when an unknown printer took a galley.</p>
                        </Col>
                    </m.div>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="py-0">
                <Container fluid className="px-0">
                    <Row className="row-cols-1 row-cols-md-3 text-center g-0">
                        <m.div {...fadeIn} className="col sm:mb-[30px]"><img height="" width="" src="https://via.placeholder.com/640x685" className="w-100" alt="" /></m.div>
                        <m.div {...{ ...fadeIn, transition: { delay: 0.5 } }} className="col sm:mb-[30px]"><img height="" width="" src="https://via.placeholder.com/640x685" className="w-100" alt="" /></m.div>
                        <m.div {...{ ...fadeIn, transition: { delay: 0.6 } }} className="col"><img height="" width="" src="https://via.placeholder.com/640x685" className="w-100" alt="" /></m.div>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="pt-[130px] pb-[400px] overflow-hidden lg:pt-[90px] lg:pb-[320px] md:pt-[75px] md:pb-[310px] sm:py-[50px]">
                <Container>
                    <Row>
                        <Col lg={6} sm={12} className="text-start md:mb-[20px] sm:text-center">
                            <div className="flex font-serif mb-[15px]">
                                <span className="align-self-center w-[30px] h-[1px] bg-[#fd961e] mr-[10px] md:inline-block sm:hidden"></span>
                                <div className="flex-grow-1 text-[#fd961e] font-medium sm:text-center">Fresh fruit juice</div>
                            </div>
                            <h4 className="font-serif font-medium text-darkgray mb-0 w-[90%] md:w-full sm:text-center xs:w-full">A wonderful mix of food style and music</h4>
                        </Col>
                        <Col lg={6} className="text-start">
                            <p className="w-[95%] lg:w-full sm:text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae lorem ligula. Fusce at mauris sit amet ligula tristique fringilla. Suspendisse sagittis nunc ante, sit amet aliquet turpis tristique. Nullam ultrices felis sit amet consectetur sodales. Phasellus nunc elit, porta quis iaculis.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start*/}
            <section className="bg-lightgray pb-[130px] lg:pb-[90px] md:pb-[75px] sm:py-[50px]">
                <Container>
                    <Row>
                        <Overlap value={22} className="px-0">
                            <ImageGallery
                                grid="grid grid-2col xl-grid-2col lg-grid-2col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large text-center"
                                theme="image-gallery-02"
                                data={ImagesGalleryData.slice(0, 3)}
                                overlay="#232323"
                            />
                        </Overlap>
                    </Row>
                </Container>
            </section>
            {/* Section Start*/}

            {/* Section Start */}
            <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container>
                    <Row className="items-center justify-center">
                        <Col lg={4} sm={7} className="md:mb-16">
                            <h5 className="font-serif font-medium text-darkgray mb-0 text-center text-lg-start">Bright, balanced blend creates a new standard</h5>
                        </Col>
                        <Col xl={{ span: 6, offset: 1 }} lg={8}>
                            <Clients grid="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 justify-center items-center flex" theme="client-logo-style-02" data={ClientData} />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="bg-[#fafafa] overflow-hidden md:pb-[75px] sm:pb-[50px]">
                <Container fluid>
                    <Row className="justify-center text-center items-center">
                        <Col lg={8} sm={11} className="px-0 md:mb-24 xs:!px-[15px]">
                            <Swiper
                                modules={[Autoplay, EffectFade, Keyboard]}
                                effect="fade"
                                loop={true}
                                keyboard={{ enabled: true, onlyInViewport: true }}
                                autoplay={{ delay: 1000, disableOnInteraction: false }}
                                slidesPerView={1}>
                                {
                                    SwiperImgData.map((item, i) => {
                                        return (
                                            <SwiperSlide key={i} className="h-full">
                                                <img height="" width="" className="w-full" alt='' src={item.img} />
                                            </SwiperSlide>)
                                    })
                                }
                            </Swiper>
                        </Col>
                        <Col lg={4} md={7} sm={10} className="p-24 xl:p-12 lg:p-8 md:py-0 text-center text-lg-start">
                            <img height="" width="" src="https://via.placeholder.com/144x122" alt="" className="inline-block w-[25%] sm:w-[20%] mb-[50px] lg:mb-[15px]" />
                            <h3 className="font-serif text-darkgray font-semibold w-[90%] xl:w-full">Only the natural stuff period</h3>
                            <span className="font-serif block w-[85%] xl:w-full">Lorem ipsum dolor sit amet, consectetur adipiscing elit donec vitae lorem ligula fusce at mauris sit.</span>
                        </Col>
                    </Row>
                </Container>

            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container fluid>
                    <Row className="items-center justify-center">
                        <Col lg={{ span: 4, order: 0 }} xs={{ order: 2 }} sm={5} className="px-[9%] lg:text-start md:text-center xl:px-[3%] md:px-[15px] xs:mb-[30px]">
                            <i className="line-icon-Martini-Glass icon-large text-[#fd961e] block text-[50px] mb-[35px] sm:mb-[20px]"></i>
                            <h6 className="font-serif text-darkgray font-semibold -tracking-[.5px] mb-[20px] xs:mb-[10px]">I love the smell of juice boxes in morning</h6>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.</p>
                        </Col>
                        <m.div {...{ ...zoomIn, transition: { duration: 0.5 } }} className="col-12 col-lg-4 col-md-8 col-sm-9 order-1 order-lg-0 px-lg-0 md:mb-20">
                            <img height="" width="" className="mx-auto" src="https://via.placeholder.com/650x650" alt="" />
                        </m.div>
                        <Col lg={{ span: 4, order: 2 }} xs={{ order: 2 }} sm={5} className="px-[9%] lg:text-start md:text-center xl:px-[3%] md:px-[15px]">
                            <i className="line-icon-Glass-Water icon-large text-[#fd961e] text-[50px] mb-[35px] block sm:mb-[20px]"></i>
                            <h6 className="font-serif text-darkgray font-semibold -tracking-[.5px] mb-[20px] xs:mb-[10px]"> We could make orange juice in the orange</h6>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="relative bg-cover bg-center" style={{ backgroundImage: `url("https://via.placeholder.com/1920x605")` }} >
                <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[#fd961e]"></div>
                <Container className="relative">
                    <Row className="justify-center h-[700px] text-center md:h-[550px] sm:h-[350px]">
                        <Col xl={7} lg={8} md={10} className="justify-center items-center flex">
                            <div className="font-serif text-white">
                                {/* Modal Component Start */}
                                <CustomModal.Wrapper
                                    modalBtn={
                                        <Buttons
                                            type="submit"
                                            className="btn-sonar border-0 mx-auto"
                                            themeColor="#fff"
                                            color="#232323"
                                            size="lg"
                                            title={<i className="icon-control-play" />} />
                                    } >
                                    <div className="w-[1020px] max-w-full relative rounded mx-auto">
                                        <div className="fit-video">
                                            <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                                        </div>
                                    </div>
                                </CustomModal.Wrapper>
                                {/* Modal Component End */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="relative py-[200px] overflow-hidden lg:py-[160px] md:py-[110px] sm:py-[50px]">
                <div className="font-serif text-[230px] leading-[230px] text-center text-[#ededed] top-1/2 -translate-y-1/2 font-thin uppercase absolute w-full lg:text-[170px] lg:leading-[170px] md:text-[130px] md:leading-[130px] sm:text-[100px] sm:leading-[100px] xs:text-[55px] xs:leading-[55px]">Simply juice</div>
                <Container>
                    <m.div {...fadeIn} className="row justify-center">
                        <Col xs={10} md={6} className="col-10 col-md-6 relative text-center">
                            <img height="" width="" src="https://via.placeholder.com/570x200" alt="" />
                        </Col>
                    </m.div>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="py-[200px] cover-background lg:py-[160px] md:py-[110px] sm:py-[50px]" style={{ backgroundImage: "url(https://via.placeholder.com/1920x647)" }}>
                <Container>
                    <Row className="row-cols-1 row-cols-md-4 row-cols-sm-2">
                        <m.div {...fadeIn} className="col relative text-center sm:mb-[30px]">
                            <img height="" width="" className="inline-block" src="https://via.placeholder.com/220x225" alt="" />
                            <span className="font-serif text-darkgray uppercase font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Carrot</span>
                        </m.div>
                        <m.div {...{ ...fadeIn, transition: { delay: 0.6 } }} className="col relative text-center sm:mb-[30px]">
                            <img height="" width="" className="inline-block" src="https://via.placeholder.com/220x225" alt="" />
                            <span className="font-serif text-darkgray uppercase font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Orange</span>
                        </m.div>
                        <m.div {...{ ...fadeIn, transition: { delay: 0.8 } }} className="col relative text-center xs:mb-[30px]">
                            <img height="" width="" className="inline-block" src="https://via.placeholder.com/220x225" alt="" />
                            <span className="font-serif text-darkgray uppercase font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Apple</span>
                        </m.div>
                        <m.div {...{ ...fadeIn, transition: { delay: 0.9 } }} className="col relative text-center">
                            <img height="" width="" className="inline-block" src="https://via.placeholder.com/220x225" alt="" />
                            <span className="font-serif text-darkgray uppercase font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Lemon</span>
                        </m.div>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container>
                    <Row className="justify-center">
                        <Col xl={5} lg={6} sm={8} className="text-center mb-20 lg:mb-16">
                            <span className="font-serif text-[#fd961e] font-medium block mb-[15px] sm:mb-[5px]">Other creative work for brands</span>
                            <h5 className="font-serif text-darkgray font-medium">Perfect design and code delivered for your projects</h5>
                        </Col>
                    </Row>
                </Container>
                <Container fluid className="px-[9%] lg:px-[3%] sm:px-0">
                    <Row className="gx-0 !-mx-[15px] sm:!mx-0">
                        <ImageGallery grid="grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large text-center" theme="image-gallery-01 flex" data={ImagesGalleryData.slice(3, 6)} overlay="#fd961e" animation={fadeIn} />
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="relative z-[1] bg-lightgray p-0 overflow-hidden">
                <Container fluid className="px-0">
                    <Row sm={2} className="row-cols-1 justify-center xs:text-center gx-0">
                        <Col className="relative">
                            <Link
                                to="/portfolio/single-project-page-03"
                                className="portfolio_btn h-full px-28 py-16 justify-between items-center flex xl:p-12 md:inline-flex"
                            >
                                <div
                                    className="portfolio_img absolute top-0 left-0 h-full w-full -z-[1] duration-150	bg-no-repeat bg-cover overflow-hidden bg-center"
                                    style={{
                                        backgroundImage:
                                            "url(https://via.placeholder.com/955x185)",
                                    }}
                                ></div>
                                <div className="btn_icon font-medium text-darkgray font-serif mr-uto uppercase">
                                    <i className="line-icon-Arrow-OutLeft duration-100	text-[40px] inline-block mr-[20px] align-middle	"></i>
                                    <span className="text-sm inline-block md:hidden">Prev project</span>
                                </div>
                                <span className="portfolio_disc font-medium text-darkgray text-xlg font-serif block lg:text-[18px] lg:leading-[26px] md:text-left">
                                    Model photography
                                </span>
                            </Link>
                        </Col>
                        <Col className="relative md:flex md:justify-end xs:block">
                            <Link
                                to="/portfolio/single-project-page-05"
                                className="portfolio_btn h-full px-28 py-16 justify-between items-center flex xl:p-12 md:inline-flex"
                            >
                                <span className="portfolio_disc font-medium text-darkgray text-xlg font-serif block lg:text-[18px] lg:leading-[26px] md:text-right">
                                    Daimler financial
                                </span>
                                <div
                                    className="portfolio_img absolute top-0 left-0 h-full w-full -z-[1] duration-150	bg-no-repeat bg-cover overflow-hidden bg-center"
                                    style={{
                                        backgroundImage:
                                            "url(https://via.placeholder.com/955x185)",
                                    }}
                                ></div>
                                <div className="btn_icon font-medium text-darkgray font-serif mr-uto uppercase">
                                    <span className="text-sm inline-block md:hidden">Next project </span>
                                    <i className="line-icon-Arrow-OutRight duration-100	text-[40px] inline-block ml-[20px] align-middle	"></i>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Footer Start */}
            <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
            {/* Footer End */}
        </div >
    )
}

export default SingleProjectPage04
