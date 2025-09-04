import React, { memo } from 'react'

// Data
import { InfoBannerData03 } from "./InfoBannerData"

// Libraries
import { Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { PropTypes } from "prop-types";

const InfoBannerStyle03 = (props) => {
    return (
        <Row className={props.grid}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div className="col" key={i} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                            <div className={`info-banner-style01 text-center${props.className}`}>
                                {item.img ? (
                                    <img width={281} height={217} className="inline-block xxs:mb-0" src={item.img} alt="featurebox" />
                                ) : (
                                    <div className="feature-box-icon">
                                        {item.icon && <i className={item.icon}></i>}
                                    </div>
                                )}

                                <div className="feature-box-content">
                                    {item.title && <h3 className="heading-6 title font-medium tracking-normal text-xmd font-serif text-darkgray mb-[10px]">{item.title}</h3>}
                                    {item.content && <p className="w-[75%] lg:w-[85%] mx-auto">{item.content}</p>}
                                    {item.price && <span className="text-basecolor mt-[15px] font-sans font-medium text-uppercase block">{item.price}</span>}
                                </div>
                            </div>
                        </m.div>
                    )
                })
            }
        </Row>

    )
}
InfoBannerStyle03.defaultProps = {
    data: InfoBannerData03,
    animationDelay: 0.2
}
InfoBannerStyle03.propTypes = {
    className: PropTypes.string,
    animation: PropTypes.object,
    animationDelay: PropTypes.number,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            img: PropTypes.string,
            title: PropTypes.string,
            content: PropTypes.string,
            price: PropTypes.string,
        })
    )
}
export default memo(InfoBannerStyle03);