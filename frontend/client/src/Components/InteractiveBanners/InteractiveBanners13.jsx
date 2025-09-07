import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from "framer-motion"
import { PropTypes } from "prop-types";

// Data
import { InteractiveBannersData13 } from './InteractiveBannersData'

const InteractiveBanners13 = (props) => {
    return (
        <>
            <Row className={`${props.grid} ${props.className}`}>
                {
                    props.data.map((item, i) => {
                        return (
                            <m.div key={i} className="text-center will-change-transform" {...{ ...props.animation, transition: { delay: i * props.animationDelay, ease: props.animationTransition, duration: props.animationDuration } }}>
                                <div className="interactive-banners-style-13">
                                    <Link aria-label="link" to="/shop/shop-wide" className="text-dark-golden-yellow-hover">
                                        <img width="" height="" className="block pb-[30px]" src={item.img} alt="" data-no-retina="" />
                                        <span className="interactive-banners-text font-serif font-medium inline-block">{item.title}</span>
                                        <i className={` ${item.icon} text-[40px] interactive-banners-icon align-middle ml-[10px]`}></i>
                                    </Link>
                                </div>
                            </m.div>
                        )
                    })
                }
            </Row>
        </>
    )
}

InteractiveBanners13.defaultProps = {
    data: InteractiveBannersData13,
    animationDelay: 0.2
}

InteractiveBanners13.propTypes = {
    className: PropTypes.string,
    grid: PropTypes.string,
    animationDelay: PropTypes.number,
    animation: PropTypes.object,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            img: PropTypes.string,
            icon: PropTypes.string,
        })
    )
}

export default memo(InteractiveBanners13)