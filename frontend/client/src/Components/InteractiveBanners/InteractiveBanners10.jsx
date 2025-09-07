import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap'
import { m } from "framer-motion"
import { PropTypes } from "prop-types";

// Components
import Buttons from '../Button/Buttons'

// Data
import { InteractiveBannersData10 } from './InteractiveBannersData'

const InteractiveBanners10 = (props) => {
    return (
        <Row className={`${props.grid}${props.className ? ` ${props.className}` : ""}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div key={i} className="col interactive-banners-style-10 text-center" {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                            <div className="interactive-banners-box">
                                <div className="interactive-banners-box-image">
                                    <img className="w-full" width={406} height={560} src={item.img} alt="" />
                                    <div className="interactive-banners-text-overlay bg-slate-blue"></div>
                                    <div className="overlay opacity-extra-medium bg-gradient-dark-slate-blue-transparent"></div>
                                </div>
                                <div className="interactive-banners-text-content px-[5rem] xl:px-[3.5rem]">
                                    <h3 className="heading-6 font-serif font-medium text-white uppercase mb-[5px]">{item.title}</h3>
                                    <span className="font-serif text-md text-white opacity-70 uppercase tracking-[1px] block">{item.subtitle}</span>
                                    <Buttons ariaLabel="interactive button" to={item.btnLink} className="btn-fill btn-fancy font-medium font-serif rounded-none uppercase md:mb-[15px]" themeColor="#ff7a56" color="#fff" size="md" title="Explore more" />
                                </div>
                            </div>
                        </m.div>
                    )
                })
            }
        </Row>
    )
}

InteractiveBanners10.defaultProps = {
    data: InteractiveBannersData10,
    animationDelay: 0.2
}

InteractiveBanners10.propTypes = {
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
            btnLink:PropTypes.string
        })
    )
}

export default memo(InteractiveBanners10)