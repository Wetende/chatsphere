import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap'
import { m } from "framer-motion"
import { PropTypes } from "prop-types";

// Components
import Buttons from '../Button/Buttons'

// Data
import { InteractiveBannersData12 } from './InteractiveBannersData'

const InteractiveBanners12 = (props) => {
    return (
        <>
            <Row className={`${props.grid}${props.className ? ` ${props.className}` : ""}`}>
                {
                    props.data.map((item, i) => {
                        return (
                            <m.div key={i} className="col-lg-4 col-md-6 col-sm-8" {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                                <div className="interactive-banners-style-12">
                                    <div className="interactive-banners-image relative">
                                        <img width={360} height={500} src={item.img} alt="" />
                                        <div className="overlay-bg"></div>
                                        <a aria-label="link"  href="#demo" className="section-link rounded-full w-[35px] h-[35px] leading-[32px] text-center text-white border-[2px]  border-white absolute bottom-[50px] right-[45px] z-[1] lg:right-[30px] xs:bottom-[25px]">
                                            <i className={item.icon}></i>
                                        </a>
                                    </div>
                                    <div className="interactive-banners-content p-14 lg:px-[2.5rem] xs:p-16 landscape:lg:!px-10">
                                        <div className="overlayer-box bottom-[0px] top-auto opacity-90 bg-darkgray"></div>
                                        <div className="table h-full w-full mb-0">
                                            <div className="table-cell align-bottom pr-0">
                                                <span className="text-white block text-xlg mb-[15px] font-serif font-medium landscape:lg:text-lg landscape:md:mt-[15px]">{item.title}</span>
                                                <p className="interactive-banners-content-text mb-[25px] text-[#828282]">{item.content}</p>
                                                <Buttons ariaLabel="interactive button" to={item.btnLink} className="btn-fill font-medium font-serif rounded-none uppercase" themeColor="#BF8C4C" color="#fff" size="sm" title="view more" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        )
                    })
                }
            </Row>
        </>
    )
}

InteractiveBanners12.defaultProps = {
    data: InteractiveBannersData12,
    animationDelay: 0.2
}

InteractiveBanners12.propTypes = {
    className: PropTypes.string,
    grid: PropTypes.string,
    animationDelay: PropTypes.number,
    animation: PropTypes.object,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            content: PropTypes.string,
            title: PropTypes.string,
            img: PropTypes.string,
            btnTitle: PropTypes.string,
            btnLink: PropTypes.string,
            icon: PropTypes.string,

        })
    )
}
export default memo(InteractiveBanners12)