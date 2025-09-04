import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from "framer-motion"
import { PropTypes } from "prop-types";

//Data
import { InteractiveBannersData09 } from './InteractiveBannersData'

const InteractiveBanners09 = (props) => {
    return (
        <Row className={`${props.grid}${props.className ? ` ${props.className}` : ""}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div key={i} className="col interactive-banners-style-09 text-center" {...{ ...props.animation, transition: { delay: i * props.animationDelay, ease: props.animationTransition, duration: props.animationDuration } }}>
                            <div className="interactive-banners-content flex rounded-t-md flex-col items-center overflow-hidden py-16 bg-white shadow-[0_0_30px_rgba(0,0,0,0.08)] relative">
                                <img width={132} height={132} src={item.img} className="scale mb-[35px] rounded-full w-1/2" alt="trips" />
                                <span className="font-serif text-darkgray block font-medium leading-[22px]">{item.title}</span>
                                <span className="block">{item.subtitle}</span>
                                <div className="tour-button">
                                    <Link aria-label="link" to={item.btnLink} className="btn-fill absolute bottom-0 left-0 right-0 px-[26px] leading-[25px] pb-[10px] pt-[15px] font-medium text-xs font-serif uppercase bg-darkgray block text-white">{item.btnTitle}</Link>
                                </div>
                            </div>
                        </m.div>
                    )
                })
            }
        </Row>
    )
}

InteractiveBanners09.defaultProps = {
    data: InteractiveBannersData09,
    animationDuration: 0.4
}

InteractiveBanners09.propTypes = {
    className: PropTypes.string,
    grid: PropTypes.string,
    animationDelay: PropTypes.number,
    animation: PropTypes.object,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            subtitle: PropTypes.string,
            title: PropTypes.string,
            img: PropTypes.string,
            btnTitle: PropTypes.string,
            imgLink: PropTypes.string,
            btnLink: PropTypes.string
        })
    )
}

export default memo(InteractiveBanners09)
