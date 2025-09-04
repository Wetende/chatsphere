import React, { memo, useRef } from "react"

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom'
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { PropTypes } from "prop-types";
import { m } from 'framer-motion'

// Data
import { InfoBannerData05 } from "./InfoBannerData";

const InfoBannerStyle05 = (props) => {
    const swiperRef = useRef(null)
    return (
        <div className={`relative${props.className ? ` ${props.className}` : ""}`}>
            <div onClick={() => swiperRef.current.swiper.slidePrev()} className="swiper-button-prev -left-[70px] lg:left-[-12px] landscape:md:left-[-7px] xs:left-0" ></div>
            <Swiper
                className="h-full p-[15px]"
                ref={swiperRef}
                {...props.carouselOption}
                modules={[Pagination, Autoplay, Navigation]} >
                {
                    props.data.map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <m.div className="swiper-slide shadow-[0_0_15px_rgba(0,0,0,0.08)]" {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                                    <Link aria-label="link" to="#">
                                        <img width={263} height={216} src={item.img} className="w-full" alt="popular packages" />
                                    </Link>
                                    <div className="relative bg-white p-12 md:px-16">
                                        <div className="bg-neonorange text-sm font-medium font-serif text-white uppercase absolute -top-[15px] right-0 py-[5px] px-[20px]">{item.packageprice}</div>
                                        <span className="text-md uppercase block mb-[5px]">{item.days}</span>
                                        <Link aria-label="link" to={item.link} className="font-serif font-medium block mb-[30px] leading-[24px] text-darkgray hover:text-neonorange">{item.title}</Link>
                                        <span className="text-[#ff9c00] text-sm leading-[18px] block">
                                            <i className="fas fa-star"></i>&nbsp;
                                            <i className="fas fa-star"></i>&nbsp;
                                            <i className="fas fa-star"></i>&nbsp;
                                            <i className="fas fa-star"></i>&nbsp;
                                            <i className="fas fa-star"></i></span>
                                        <span className="text-md">{item.reviews}</span>
                                    </div>
                                </m.div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <div onClick={() => swiperRef.current.swiper.slideNext()} className="swiper-button-next -right-[70px] lg:right-[-12px] landscape:md:right-[-7px] xs:right-0"> </div>
        </div>
    )
}

InfoBannerStyle05.defaultProps = {
    data: InfoBannerData05,
    animationDelay: 0.2
}

InfoBannerStyle05.propTypes = {
    className: PropTypes.string,
    animation: PropTypes.object,
    animationDelay: PropTypes.number,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            img: PropTypes.string,
            title: PropTypes.string,
            packageprice: PropTypes.string,
            days: PropTypes.string,
            reviews: PropTypes.string,
            link: PropTypes.string,
            rating: PropTypes.number,

        })
    )
}
export default memo(InfoBannerStyle05)