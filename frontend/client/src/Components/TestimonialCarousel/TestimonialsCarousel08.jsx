import React, { memo, useRef } from 'react'

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { PropTypes } from "prop-types";

// Data
import { TestimonialsCarouselData8 } from './TestimonialsCarouselData'

const TestimonialsCarousel08 = (props) => {
    const swiperRef = useRef(null)

    return (
        <div className={props.className}>
            <Swiper
                className="testimonial-carousel-style-08"
                {...props.carouselOption}
                ref={swiperRef}
                modules={[Pagination, Autoplay]}>
                {
                    props.data.map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div className="w-100">
                                    {item.img && <img width="70px" height="49.14px" className="mx-auto w-20 mb-[50px]" alt="" src={item.img} />}
                                    {item.content && <p className="w-[90%] mb-[40px] text-lg leading-[36px] mx-auto xs:w-full xs:leading-[30px] xs:text-xmd">{item.content}</p>}
                                    {(item.firstname || item.lastname) && <span className="font-serif uppercase block font-medium text-[#ea9d8d]">{item.firstname} {item.lastname}</span>}
                                    {item.designation && <span className="font-serif text-sm uppercase block">{item.designation}</span>}
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            {
                props.carouselOption.navigation && (
                    <>
                        <button onClick={() => swiperRef.current.swiper.slidePrev()} className="text-[#333045] text-sm leading-[40px] font-semibold w-auto absolute top-1/2 left-[10px] -translate-y-1/2 border-r border-solid border-mediumgray pr-12 py-7 hover:opacity-70 sm:pr-[8px]">PREV</button>
                        <button onClick={() => swiperRef.current.swiper.slideNext()} className="text-[#333045] text-sm leading-[40px] font-semibold w-auto absolute top-1/2 right-[10px] -translate-y-1/2 border-l border-solid border-mediumgray pl-12 py-7 hover:opacity-70 sm:pl-[8px]">NEXT</button>
                    </>
                )
            }
        </div>
    )
}

TestimonialsCarousel08.defaulProps = {
    data: TestimonialsCarouselData8
}

TestimonialsCarousel08.propTypes = {
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

export default memo(TestimonialsCarousel08)