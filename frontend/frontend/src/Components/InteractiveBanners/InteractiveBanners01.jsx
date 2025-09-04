import React, { memo } from 'react'

// Libraries
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { PropTypes } from "prop-types";

// Data
import { InteractiveBannersData01 } from './InteractiveBannersData'

const InteractiveBanners01 = (props) => {
    return (
        <Row className={`g-0 ${props.grid}${props.className ? ` ${props.className}` : ""}`} xl={4} sm={2}>
            {
                props.data.map((item, i) => {
                    return (
                        <Col key={i} className="interactivebanners-style-01 border-y border-r border-mediumgray relative z-0 overflow-hidden">
                            <m.div className="py-24 px-[5.5rem] xl:px-14 xl:py-12 lg:px-[6.5rem] lg:py-24" {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                                {item.subtitle && <span className="block font-serif text-md text-basecolor tracking-[2px] mb-[25px] font-medium uppercase">{item.subtitle}</span>}
                                {item.title && <h3 className="heading-6 font-serif font-semibold w-[70%] mb-[20px] xl:w-full"> {item.title}</h3>}
                                {(item.icon || item.btnLink) && <Link aria-label="link" className="no-underline text-[#b7b7b7] text-[40px]" to={item.btnLink ? item.btnLink : "#"}><i className={item.icon}></i></Link>}
                                {item.img && <div className="interactive-banners-image bg-no-repeat bg-cover overflow-hidden bg-center absolute" style={{ backgroundImage: `url(${item.img})` }}></div>}
                            </m.div>
                        </Col>
                    )
                })
            }
        </Row>

    )
}

InteractiveBanners01.defaultProps = {
    data: InteractiveBannersData01,
    animationDelay: 0.2
}

InteractiveBanners01.propTypes = {
    grid: PropTypes.string,
    className: PropTypes.string,
    animationDelay: PropTypes.number,
    animation: PropTypes.object,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            btnLink: PropTypes.string,
            img: PropTypes.string,
            subtitle: PropTypes.string,
            icon: PropTypes.string,
        })
    )
}

export default memo(InteractiveBanners01)