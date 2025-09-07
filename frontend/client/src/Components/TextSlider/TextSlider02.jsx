import React, { memo } from 'react'

// Libraries
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { PropTypes } from "prop-types";
import { Link } from 'react-router-dom'

// Data
import { TextSliderData02 } from "./TextSliderData";

const TextSlider02 = (props) => {
    return (
        <div className={props.className}>
            <Swiper
                className="text-slider-02 black-move"
                modules={[Autoplay, Pagination, Navigation]}
                {...props.carousalOption} >
                {
                    props.data.map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div className="cover-background items-start flex justify-end p-[4.5rem] lg:p-12 md:p-16 xs:p-12" style={{ backgroundImage: `url(${item.img})` }}>
                                    <div className="absolute h-full w-full top-0 left-0 overlay bg-darkgray"></div>
                                    <div className="text-wrapper flex flex-col w-[50%] bg-white box-shadow-extra-large no-transition p-[4.5rem] pt-0 slider-zoom-content z-[1] relative xl:w-[75%] xl:p-[3rem] lg:w-[80%] lg:p-[2.5rem] md:w-[55%] md:p-[4.5rem] sm:w-[60%] xs:w-full">
                                        <h3 className="heading-4 -mt-20 -mr-8 mb-10 ml-auto w-20 text-[#fff] text-center pb-4 pt-24 bg-basecolor text-[40px] leading-[3.4rem] font-medium font-serif self-end lg:w-[75px] md:mt-[-50px]">{i + 1 >= 10 ? "" : "0"}{i + 1}</h3>
                                        <h4 className="heading-5 font-serif text-darkgray text-[2.3rem] leading-[3rem] p-0 mb-[25px] -tracking-[.5px] lg:mb-[15px] md:text-[27px] sm:text-[25px]"><span className="font-semibold block mr-[5px] md:inline-block xs:block">{item.title}</span>{item.subtitle}</h4>
                                        {item.content && <p className="text-xmd mb-[25px] leading-[32px] md:mb-[20px] xs:mb-[15px]">{item.content}</p>}
                                        {(item.buttonTitle || item.buttonLink) && <Link aria-label="textslider" className="font-medium text-darkgray font-serif no-underline hover:text-[#969896] cursor-pointer" to={item.buttonLink ? item.buttonLink : "#"} >{item.buttonTitle}<i className="line-icon-Arrow-OutRight text-[40px] inline-block ml-[15px] align-middle"></i></Link>}
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}

TextSlider02.defaultProps = {
    data: TextSliderData02,
}

TextSlider02.propTypes = {
    className: PropTypes.string,
    carousalOption: PropTypes.object,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            img: PropTypes.string,
            title: PropTypes.string,
            subtitle: PropTypes.string,
            content: PropTypes.string,
            buttonTitle: PropTypes.string,
            buttonLink: PropTypes.string,
        })
    )
}
export default memo(TextSlider02)