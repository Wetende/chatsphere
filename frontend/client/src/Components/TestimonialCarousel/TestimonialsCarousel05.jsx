import React, { memo } from 'react'

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { PropTypes } from "prop-types";

// Data
import { TestimonialsCarouselData5 } from './TestimonialsCarouselData';

const TestimonialsCarousel05 = (props) => {
    const swiperRef = React.useRef(null)
    return (
        <div className={`relative ${props.className}`}>
            <Swiper
                {...props.carouselOption}
                className="testimonial-carousel-style-05 black-move"
                ref={swiperRef}
                modules={[Navigation, Pagination, Autoplay]} >
                {
                    props.data.map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div className="flex items-center">
                                    {item.img && <img width="" height="" className="mr-[50px] h-[180px] w-[180px] sm:w-[150px] sm:h-[150px] xs:w-[80px] xs:h-[80px] xs:mr-[15px] rounded-full" src={item.img} alt="" />}
                                    <div>
                                        {item.content && <p className="w-[85%] inline-block mb-[25px] md:w-full">{item.content}</p>}
                                        {(item.firstname || item.lastname) && <div className="font-semibold uppercase leading-5 font-serif text-darkgray">{item.firstname} {item.lastname}</div>}
                                        {item.designation && <span className="text-sm uppercase font-serif">{item.designation}</span>}
                                    </div>
                                </div>
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

TestimonialsCarousel05.defaultProps = {
    data: TestimonialsCarouselData5
}

TestimonialsCarousel05.propTypes = {
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

export default memo(TestimonialsCarousel05)