import React, { memo, useRef } from 'react'

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { PropTypes } from "prop-types";

// Data
import { TestimonialsCarouselData7 } from './TestimonialsCarouselData'

const TestimonialsCarousel07 = (props) => {
    const swiperRef = useRef(null)

    return (
        <div className={`relative ${props.className}`}>
            <Swiper
                {...props.carouselOption}
                ref={swiperRef}
                className="testimonial-carousel-style-07 swiper-default-nav-hidden "
                modules={[Navigation, Pagination, Autoplay]} >
                {
                    props.data.map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                {item.img && <img width={100} height={100} className="mb-12 mx-auto w-[120px] rounded-full justify-center xs:w-[100px]" alt="" src={item.img} />}
                                {item.content && <p className="w-[85%] mx-auto font-light mb-[25px] text-xlg lg:text-lg leading-[32px]">{item.content}</p>}
                                {(item.firstname || item.lastname) && <span className="font-serif block mt-[35px] text-xmd text-[#e6994e] uppercase">{item.firstname} {item.lastname}</span>}
                                {item.designation && <span className="font-serif text-sm uppercase tracking-[1px] block">{item.designation}</span>}
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            {
                props.carouselOption.navigation && (
                    <>
                        <button onClick={() => swiperRef.current.swiper.slidePrev()} className="testimonial-carousel-style-07-prev absolute top-1/2 -left-[105px] -translate-y-1/2 md:-left-[15px] xs:left-0 xs:!hidden swiper-button-prev"></button>
                        <button onClick={() => swiperRef.current.swiper.slideNext()} className="testimonial-carousel-style-07-next absolute top-1/2 -right-[105px] -translate-y-1/2 md:-right-[15px] xs:right-0 xs:!hidden swiper-button-next"></button>
                    </>
                )}
        </div>
    )
}
TestimonialsCarousel07.defaultProps = {
    data: TestimonialsCarouselData7
}

TestimonialsCarousel07.propTypes = {
    grid: PropTypes.string,
    theme: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            img: PropTypes.string,
            designation: PropTypes.string,
            content: PropTypes.string,
            firstname: PropTypes.string,
            lastname: PropTypes.string,
            title: PropTypes.string,
            thumbimg: PropTypes.string,
        })
    ),
}

export default memo(TestimonialsCarousel07)