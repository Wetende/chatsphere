import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";
import { LazyMotion, domMax, m } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StartupPageBannerSlider = () => {
    const [activeSlide, setActiveSlide] = useState(0)
    const swiperData = [
        {
            img: "https://via.placeholder.com/1920x1100",
            title: "Start your online business today",
            subTitle: "The best way to promote your business"
        },
        {
            img: "https://via.placeholder.com/1920x1100",
            title: "Combine thinking and technical",
            subTitle: "The best way to promote your business"
        },
        {
            img: "https://via.placeholder.com/1920x1100",
            title: "Delivering creative digital products",
            subTitle: "The best way to promote your business"
        },
    ]

    return (
        <section className="bg-darkgray home-startup-swiper">
            <LazyMotion strict features={domMax}>
                <Swiper
                    effect="fade"
                    slidesPerView={1}
                    spaceBetween={0}
                    loop={true}
                    navigation={true}
                    pagination={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    fadeEffect={{ crossFade: true }}
                    modules={[Pagination, Navigation, EffectFade, Autoplay]}
                    onSlideChange={(swiperCore) => {
                        const { realIndex } = swiperCore;
                        setActiveSlide(realIndex)
                    }}
                    breakpoints={{ 767: { pagination: false } }}
                    className="startup swiper-navigation-04 swiper-navigation-light swiper-pagination-03 swiper-pagination-light swiper-pagination-medium sm-nav-hidden">
                    {swiperData.map((item, i) => {
                        return (
                            <SwiperSlide key={i} className="overflow-hidden">
                                <m.div initial={{ scale: 1.2 }} animate={{ scale: activeSlide === i ? 1 : 1.2 }} transition={{ duration: 1.7, ease: "easeInOut" }} style={{ backgroundImage: `url(${item.img})` }} className="overflow-hidden absolute h-full w-full top-0 left-0 cover-background"> </m.div>
                                <m.div className="opacity-50 absolute h-full w-full top-0 left-0 bg-darkgray"></m.div>
                                <Container className="text-center">
                                    <Row className="full-screen items-center justify-center md:landscape:h-[500px]">
                                        <Col xs={12} lg={7} md={10} className="justify-center items-center my-0 mx-auto relative flex flex-col">
                                            <m.h1 initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }} animate={{ clipPath: activeSlide === i ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }} transition={{ duration: 0.5, delay: 0.5, ease: "easeIn" }} className="font-serif font-semibold pb-[10px] text-[70px] tracking-[-2px] text-white mb-[35px] lg:text-[55px] lg:leading-[60px] xs:text-[35px] xs:leading-[40px] xs:mb-[20px]">{item.title}</m.h1>
                                            <m.span initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }} animate={{ clipPath: activeSlide === i ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }} transition={{ duration: 0.5, delay: 0.8, ease: "easeIn" }} className="font-serif block text-[19px] leading-[28px] mb-[35px] font-light text-white xs:text-base xs:mb-[20px]">{item.subTitle}</m.span>
                                            <m.div initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }} animate={{ clipPath: activeSlide === i ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }} transition={{ duration: 0.5, delay: 0.9, ease: "easeIn" }}>
                                                <Link aria-label="started now" to="/page/contact-classic" className="uppercase startup-link font-medium">
                                                    Get started now
                                                    <div>
                                                        <i className="fas fa-play"></i>
                                                    </div>
                                                </Link>
                                            </m.div>
                                        </Col>
                                    </Row>
                                </Container>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </LazyMotion>
        </section>
    )
}

export default StartupPageBannerSlider