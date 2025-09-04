import React, { memo } from 'react'

// Libraries
import { Figure, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { PropTypes } from "prop-types";

// Data
import { InteractiveBannersData05 } from './InteractiveBannersData'


const InteractiveBanners05 = (props) => {
    return (
        <Row className={`${props.grid}${props.className ? ` ${props.className}` : ""}`} lg={3} md={2}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div key={i} className="col interactive-banners-style-05" {...{ ...props.animation, transition: { delay: i * props.animationDelay } }} >
                            <Figure className="relative m-0">
                                <div className="interactive-banners-image relative overflow-hidden rounded-[6px] bg-darkgray">
                                    {item.img && <img width="" height="" alt="" src={item.img} />}
                                    <div className="interactive-banners-details absolute top-0 left-0 w-full h-full items-center justify-center flex-col flex">
                                        {(item.btnTitle || item.btnLink) && <Link aria-label="link" className="no-underline h-[100px] w-[100px] p-[20px] rounded-full bg-[#fff] items-center justify-center flex-col flex" to={item.btnLink}>
                                            <i className={`${item.icon} mb-[10px] text-basecolor text-lg block`}></i>
                                            <span className="button-name w-full leading-[14px] font-medium font-serif text-darkgray text-sm uppercase text-center">{item.btnTitle}</span>
                                        </Link>}
                                    </div>
                                </div>
                                <figcaption className="text-center">
                                    <div className="bg-white inline-block rounded-[4px] py-[3%] px-[20px] w-[76%] shadow-[0_0_20px_rgba(0,0,0,0.08)] font-serif font-medium uppercase">
                                        <span className="text-darkgray uppercase text-md">{item.title}</span>
                                        <span className="font-serif text-xs block mb-[5px]">{item.subtitle}</span>
                                    </div>
                                </figcaption>
                            </Figure>
                        </m.div>
                    )
                })
            }
        </Row>

    )
}

InteractiveBanners05.defaultProps = {
    data: InteractiveBannersData05,
    animationDelay: 0.2
}

InteractiveBanners05.propTypes = {
    className: PropTypes.string,
    grid: PropTypes.string,
    animation: PropTypes.object,
    animationDelay: PropTypes.number,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            btnLink: PropTypes.string,
            img: PropTypes.string,
            subtitle: PropTypes.string,
            icon: PropTypes.string,
            btnTitle: PropTypes.string,
            imgLink: PropTypes.string,
            titleLink: PropTypes.string,
            content: PropTypes.string,
        })
    )
}

export default memo(InteractiveBanners05)