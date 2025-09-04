import React, { memo } from 'react'

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Keyboard } from "swiper/modules";
import { PropTypes } from "prop-types";

const Instagram02 = (props) => {
    return (
        <div className="relative">
            <Swiper
                slidesPerView={4}
                modules={[Navigation, Pagination, Autoplay, Keyboard]}
                className={`${props.className} instagram-posts`}
                {...props.carouselOption}>
                {
                    props.data && props.data.slice(0, props.total_posts).map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <figure className="relative overflow-hidden mb-0 rounded-[3px]">
                                    <a aria-label="instagram" href={item.permalink} target="_blank" rel="noreferrer">
                                        <img src={item.media_url} alt="" width="180" height="180" />
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </figure>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            {props.title && <div className="instagram-title whitespace-nowrap font-serif absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 py-[15px] px-9 bg-white text-darkgray rounded-[2px] font-medium text-md tracking-[1px] uppercase">{props.title}</div>}
        </div>
    )
}

Instagram02.defaultProps = {
    total_posts: 8
}

Instagram02.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    total_posts: PropTypes.number,
    grid: PropTypes.string,
    carousel: PropTypes.bool,
    carouselOption: PropTypes.object
}

export default memo(Instagram02)