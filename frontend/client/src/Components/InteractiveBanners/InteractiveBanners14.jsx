import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap'
import { m } from "framer-motion"
import { PropTypes } from "prop-types";

//Components
import Buttons from '../Button/Buttons'

// Data
import { InteractiveBannersData14 } from './InteractiveBannersData'

const InteractiveBanners14 = (props) => {
    return (
        <Row className={`${props.grid} ${props.className}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div key={i} className="col interactive-banners-style-14" {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                            <figure className="mb-0">
                                <img src={item.img} className="w-full" alt="packages" width={360} height={396} />
                                <figcaption>
                                    <div className="hover-content align-items-center flex flex-column h-100 text-center last-paragraph-no-margin">
                                        <div className="font-serif text-md text-white opacity-60 uppercase mb-[10px]">{item.subtitle}</div>
                                        <h2 className="heading-6 font-serif font-medium text-white w-1/2">{item.title}</h2>
                                        <div className="hover-show-content">
                                            <p className="hover-content-detail mb-[25px] mx-auto leading-[26px] lg:w-[80%] md:w-[60%] xs:w-[70%]">{item.content}</p>
                                            <Buttons ariaLabel="interactive button" href={item.btnLink} className="btn-fill btn-fancy font-medium font-serif rounded-none uppercase" themeColor="#c89965" color="#fff" size="xs" title={item.btnTitle} />
                                        </div>
                                    </div>
                                    <div className="hover-action-btn text-center">
                                        <span className="w-[40px] h-[40px] leading-[44px] inline-block bg-yellow-ochre rounded-full">
                                            <i className="feather-arrow-right text-[#333045] text-lg"></i>
                                        </span>
                                    </div>
                                    <div className="opacity-medium bg-[#333045] -z-[1]"></div>
                                    <div className="overlayer-box bg-[#333045] -z-[1]"></div>
                                </figcaption>
                            </figure>
                        </m.div>
                    )
                })
            }
        </Row>
    )
}


InteractiveBanners14.defaultProps = {
    data: InteractiveBannersData14,
    animationDelay: 0.2
}

InteractiveBanners14.propTypes = {
    className: PropTypes.string,
    grid: PropTypes.string,
    animationDelay: PropTypes.number,
    animation: PropTypes.object,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            img: PropTypes.string,
            title: PropTypes.string,
            subtitle: PropTypes.string,
            content: PropTypes.string,
            btnTitle: PropTypes.string,
            btnLink: PropTypes.string,
        })
    )
}

export default memo(InteractiveBanners14)
