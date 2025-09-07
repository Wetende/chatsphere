import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from "framer-motion"
import { PropTypes } from "prop-types";

// Data
import { InteractiveBannersData08 } from './InteractiveBannersData'

const InteractiveBanners08 = (props) => {
    return (
        <Row className={`${props.grid}${props.className ? ` ${props.className}` : ""}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div key={i} className="col interactive-banners-style-08" {...{ ...props.animation, transition: { delay: i * props.animationDelay,ease: [0.25, 1, 0.5, 1], duration: 1.2 } }}>
                            <div className="interactive-banners-image">
                                <Link aria-label="link" to="#" className="relative inline-block">
                                    <img width={398} height={309} src={item.img} className="scale w-full" alt="hotels" />
                                    <div className="absolute top-0 left-0 w-full h-full opacity-80 overlay-banner"></div>
                                    <span className="category-name block font-medium rounded-[2px] text-xs absolute top-[40px] left-[50px] leading-[14px] uppercase py-[8px] px-[15px]">{item.country}</span>
                                    <div className="font-serif category-content justify-center absolute bottom-0 left-0 px-[50px] pt-[20px] pb-[40px] w-full">
                                        <div className="flex">
                                            <span className="m-0 text-white text-lg uppercase font-medium w-1/2 -tracking-[.5px] xl:w-[80%]">{item.title}</span>
                                            <span className="align-self-center text-center ms-auto interactive-banners-icon">
                                                <span className="inline-block leading-[40px] rounded-full bg-white w-[40px] h-[40px]">
                                                    <i className="feather-arrow-right text-darkgray"></i>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </m.div>
                    )
                })
            }
        </Row>
    )
}

InteractiveBanners08.defaultProps = {
    data: InteractiveBannersData08,
    animationDelay: 0.2
}

InteractiveBanners08.propTypes = {
    className: PropTypes.string,
    grid: PropTypes.string,
    animationDelay: PropTypes.number,
    animation: PropTypes.object,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            img: PropTypes.string,
            title: PropTypes.string,
            country: PropTypes.string,
            btnTitle: PropTypes.string,
            imgLink: PropTypes.string,
            btnLink:PropTypes.string
        })
    )
}

export default memo(InteractiveBanners08)
