import React, { memo } from 'react'

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { PropTypes } from "prop-types";

// Data
import { TestimonialsCarouselData3 } from './TestimonialsCarouselData';

const TestimonialsCarousel03 = (props) => {
    const swiperRef = React.useRef(null)
    return (
        <div className={`relative ${props.className}`}>
            <Swiper className="testimonial-carousel-style-03"
                {...props.carouselOption}
                ref={swiperRef}
                modules={[Pagination, Autoplay]}>
                {
                    props.data.map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                {item.content && <h6 className="font-serif text-center mb-14 leading-[44px] sm:leading-[34px]">{item.content}</h6>}
                                {(item.firstname || item.lastname) && <h6 className="name font-serif text-center mb-[5px] font-light"><span className="font-semibold">{item.firstname}</span> {item.lastname}</h6>}
                                {item.designation && <span className="text-center block">{item.designation}</span>}
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            {
                props.carouselOption.navigation && (
                    <div className="flex">
                        <div onClick={() => swiperRef.current.swiper.slidePrev()} className="btn-slider-next rounded-full flex justify-center items-center text-darkgray bg-white border-[1px] border-solid border-mediumgray h-[40px] w-[40px] cursor-pointer hover:shadow-xl transition-all duration-800 absolute top-[38%] left-[-90px] right-auto">
                            <i className="feather-arrow-left text-xmd"></i>
                        </div>
                        <div onClick={() => swiperRef.current.swiper.slideNext()} className="btn-slider-prev rounded-full border-[1px] border-solid border-mediumgray bg-white text-darkgray flex justify-center items-center h-[40px] w-[40px] ml-[10px] cursor-pointer hover:shadow-xl transition-all duration-800 absolute top-[38%] right-[-90px] left-auto">
                            <i className="feather-arrow-right text-xmd"></i>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

TestimonialsCarousel03.defaultProps = {
    data: TestimonialsCarouselData3
}

TestimonialsCarousel03.propTypes = {
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

export default memo(TestimonialsCarousel03)
