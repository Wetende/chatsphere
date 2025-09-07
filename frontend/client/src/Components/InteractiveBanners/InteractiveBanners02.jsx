import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { m } from 'framer-motion'
import PropTypes from "prop-types"

// Components
import Buttons from '../Button/Buttons'

// Data
import { InteractiveBannersData02 } from './InteractiveBannersData'

const InteractiveBanners02 = (props) => {
    const swiperRef = React.useRef(null)
    return (
        <Row className={`interactivebanners-style-02 -mr-[30vw] md:mr-[-15px] sm:contents ${props.className}`}>
            <Swiper className="white-move" modules={[Autoplay, Pagination, Navigation]} {...props.carousalOption} ref={swiperRef} >
                {
                    props.data.map((item, i) => {
                        return (
                            <SwiperSlide key={i} className="my-swiper">
                                <m.div className="interactivebanners-main" {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                                    <div className="relative overflow-hidden overlay-bg">
                                        {item.img && <img height="235" width="210" className="interactiveanners-img" src={item.img} alt="interactive banners" />}
                                    </div>
                                    <div className="fancy-text-content px-[55px] xs:px-[30px] xxs:px-[30px]">
                                        {item.subtitle && <span className="interactivebanners-subtitle px-[15px] py-[5px] mb-[20px] rounded-[2px] text-white text-xxs font-serif uppercase leading-4 tracking-[1px] inline-block">{item.subtitle}</span>}
                                        {item.title && <div className="interactivebanners-title mb-[10px] text-white text-xlg font-serif lg:text-[18px]">{item.title}</div>}
                                        {(item.btnTitle && item.btnLink) && <Buttons ariaLabel="interactive button" to={item.btnLink} title={item.btnTitle} className="btn-fill btn-fancy rounded-[3px] mt-[15px] font-medium font-serif uppercase md:mb-[15px]" themeColor="#fff" color="#232323" size="xs" />}
                                    </div>
                                </m.div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </Row>
    )
}

InteractiveBanners02.defaultProps = {
    data: InteractiveBannersData02,
    animationDelay: 0.2
}

InteractiveBanners02.propTypes = {
    className: PropTypes.string,
    animationDelay: PropTypes.number,
    animation: PropTypes.object,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            subtitle: PropTypes.string,
            title: PropTypes.string,
            img: PropTypes.string,
            btnTitle: PropTypes.string,
            btnLink: PropTypes.string,
        })
    )
}

export default memo(InteractiveBanners02)