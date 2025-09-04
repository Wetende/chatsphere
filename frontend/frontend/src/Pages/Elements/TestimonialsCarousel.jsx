import React from "react";

// Libraries
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { m } from "framer-motion";

// Components
import { fadeIn } from "../../Functions/GlobalAnimations";
import TestimonialsCarousel01 from "../../Components/TestimonialCarousel/TestimonialsCarousel01";
import TestimonialsCarousel02 from "../../Components/TestimonialCarousel/TestimonialsCarousel02";
import TestimonialsCarousel03 from "../../Components/TestimonialCarousel/TestimonialsCarousel03";
import TestimonialsCarousel04 from "../../Components/TestimonialCarousel/TestimonialsCarousel04";
import TestimonialsCarousel05 from "../../Components/TestimonialCarousel/TestimonialsCarousel05";
import TestimonialsCarousel06 from "../../Components/TestimonialCarousel/TestimonialsCarousel06";
import TestimonialsCarousel07 from "../../Components/TestimonialCarousel/TestimonialsCarousel07";
import TestimonialsCarousel08 from "../../Components/TestimonialCarousel/TestimonialsCarousel08";
import TestimonialsCarousel09 from "../../Components/TestimonialCarousel/TestimonialsCarousel09";

// Data
import {
    TestimonialsCarouselData1,
    TestimonialsCarouselData2,
    TestimonialsCarouselData3,
    TestimonialsCarouselData4,
    TestimonialsCarouselData5,
    TestimonialsCarouselData6,
    TestimonialsCarouselData7,
    TestimonialsCarouselData8,
    TestimonialsCarouselData9,
} from "../../Components/TestimonialCarousel/TestimonialsCarouselData";

const TestimonialsCarouselPage = () => {
    return (
        <>
            {/* Section Start */}
            <section className="bg-darkgray py-[25px]">
                <Container>
                    <Row className="items-center justify-center mb-0">
                        <Col xl={8} lg={6}>
                            <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Testimonials carousel</h1>
                        </Col>
                        <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
                            <ul className="xs-text-center">
                                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                                <li>Testimonials carousel</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-no-repeat bg-center" style={{ backgroundImage: `url(${"https://via.placeholder.com/1920x507"})`, }} {...fadeIn} >
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center mb-[6%]">
                            <h6 className="font-serif text-darkgray font-medium">Testimonials carousel style 01</h6>
                        </Col>
                    </Row>
                    <Row className="row-cols-lg-2 justify-center">
                        <Col>
                            <TestimonialsCarousel01
                                data={TestimonialsCarouselData1}
                                className="swiper-navigation-04 swiper-navigation-light swiper-pagination-dark swiper-pagination-big black-move"
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
            <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
                <h6 className="font-serif text-gray-900 text-center font-medium mb-24 xs:mb-16"> Testimonials carousel style 02 </h6>
                <Container>
                    <Row>
                        <TestimonialsCarousel02
                            className="slider-nav-style-01 slider-nav-dark black-move"
                            title="Proud"
                            subtitle="stories"
                            data={TestimonialsCarouselData2}
                            carouselOption={{
                                slidesPerView: 1,
                                loop: true,
                                navigation: true,
                                autoplay: { delay: 2500, disableOnInteraction: false },
                            }}
                        />
                    </Row>
                </Container>
            </m.section>
            <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-cover" style={{ backgroundImage: `url(${"/assets/img/webp/home-creative-agency-testimonials-bg.webp"})`, }} {...fadeIn} >
                <h6 className="font-serif text-white text-center font-medium mb-24 xs:mb-16">
                    Testimonials Carousel style 03
                </h6>
                <Container>
                    <Row className="justify-center">
                        <Col xl={6} md={9}>
                            <TestimonialsCarousel03
                                data={TestimonialsCarouselData3}
                                className="white-move"
                                carouselOption={{
                                    slidesPerView: 1,
                                    loop: true,
                                    navigation: false,
                                    autoplay: { delay: 2500, disableOnInteraction: false },
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </m.section>
            <m.section className="py-[160px] bg-lightgray lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] " {...fadeIn} >
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center mb-[6%]">
                            <h6 className="font-serif text-darkgray font-medium">Testimonials carousel style 04</h6>
                        </Col>
                    </Row>
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
                </Container>
            </m.section>
            <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
                <h6 className="font-serif text-gray-900 text-center font-medium mb-24 xs:mb-16"> Testimonials Carousel style 05 </h6>
                <Container>
                    <Row className="justify-center">
                        <Col xs={12} xl={7} lg={7} md={9}>
                            <TestimonialsCarousel05
                                data={TestimonialsCarouselData5}
                                className="black-move"
                                carouselOption={{
                                    slidesPerView: 1,
                                    loop: true,
                                    navigation: false,
                                    autoplay: { delay: 2500, disableOnInteraction: false },
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </m.section>
            <m.section className="py-40 lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray testimonial-carousel-style-06" {...fadeIn} >
                <Container>
                    <h6 className="font-serif text-gray-900 text-center font-medium mb-24 xs:mb-16"> Testimonials carousel style 06 </h6>
                    <Row className="justify-center text-center relative">
                        <Col xl={6} lg={7} md={9}>
                            <TestimonialsCarousel06
                                data={TestimonialsCarouselData6}
                                className=""
                            />
                        </Col>
                    </Row>
                </Container>
            </m.section>
            <m.section className="testimonial-carousel-style-07 py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] cover-background" style={{ backgroundImage: `url(${"https://via.placeholder.com/1920x983"})`, }} {...fadeIn} >
                <Container>
                    <Row className="justify-center text-center items-center">
                        <Col xl={6} lg={7} md={9} className="relative">
                            <TestimonialsCarousel07
                                data={TestimonialsCarouselData7}
                                className="slider-nav-style-01 swiper-navigation-02 swiper-navigation-light white-move"
                                carouselOption={{
                                    slidesPerView: 1,
                                    loop: true,
                                    navigation: true,
                                    autoplay: { delay: 2500, disableOnInteraction: false },
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </m.section>
            <m.section className="py-[160px] font-serif text-center testimonial-carousel-style-08 lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn} >
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center mb-[6%]">
                            <h6 className="font-serif text-darkgray font-medium">Testimonials carousel style 08</h6>
                        </Col>
                    </Row>
                    <Row className="justify-center items-center text-center">
                        <Col lg={10} className="px-40 sm:px-28 xs:px-24 relative items-center" >
                            <TestimonialsCarousel08
                                data={TestimonialsCarouselData8}
                                className="black-move"
                                carouselOption={{
                                    slidesPerView: 1,
                                    loop: true,
                                    navigation: true,
                                    autoplay: { delay: 2500, disableOnInteraction: false },
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </m.section>
            <m.section style={{ backgroundImage: `url(${"https://via.placeholder.com/1920x850"})`, backgroundPosition: "center center" }} className="cover-background py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-no-repeat" {...fadeIn} >
                <Container>
                    <h6 className="font-serif text-gray-900 text-center font-medium mb-[7%]"> Testimonials Carousel style 09 </h6>
                    <Row className="justify-center">
                        <Col xl={6} lg={7} md={8} className="relative">
                            <TestimonialsCarousel09
                                data={TestimonialsCarouselData9}
                                carouselOption={{
                                    slidesPerView: 1,
                                    loop: true,
                                    navigation: true,
                                    className: "black-move"
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </m.section>
        </>
    );
};

export default TestimonialsCarouselPage;
