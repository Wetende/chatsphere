import React, { memo } from 'react'

//Libraries
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { PropTypes } from "prop-types";

// Components
import Buttons from '../Button/Buttons'

// Data
import { InteractiveBannersData03 } from './InteractiveBannersData'

const InteractiveBanners03 = (props) => {
    const style = { "--overlay-color": typeof (props.overlay) === "object" ? `linear-gradient(to right top, ${props.overlay.map((item, i) => item)})` : props.overlay }
    return (
        <Row className={`${props.grid ? props.grid : ""}${props.className ? ` ${props.className}` : ""}`} lg={4} sm={2}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div key={i} className="col" {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                            <div className="interactivebanners-style-03 g-0 relative overflow-hidden rounder-[6px]" style={style}>
                                {item.imgLink && (
                                    <Link aria-label="link" to={item.imgLink}>
                                        <div className="interactivebanners-box-image relative overflow-hidden">
                                            {item.img && <img width={263} height={302} className="interactivebanners-img w-full relative overflow-hidden" src={item.img} alt="interactivebanners" />}
                                            <div className="interactivebanners-btn border-2 border-transparent flex justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[44px] w-[44px] leading-10 p-0 z-[1] rounded-full text-center text-black">
                                                {item.icon && <i className={`${item.icon} flex items-center`}></i>}
                                            </div>
                                            <div className="interactivebanners-box-hover absolute h-full w-full top-0 left-0"></div>
                                        </div>
                                    </Link>
                                )}
                                <div className="interactivebanners-box-content bg-white text-center p-[35px] relative lg:p-[35px] xs:p-[25px]">
                                    {item.title && <Link aria-label="link" className="interactivebanners-title font-medium text-darkgray font-serif text-md uppercase no-underline" to={item.titleLink}>{item.title}</Link>}
                                    {item.btnTitle && <div className="content-hover-effect">
                                        {item.subtitle && <span className="interactivebanners-subtitle absolute left-0 right-0 h-full w-full transition-default">{item.subtitle}</span>}
                                        {(item.btnTitle || item.btnLink) &&
                                            <Buttons ariaLabel="interactive button" className="interactivebanners-box-sub-title relative p-0 font-medium font-serif uppercase after:h-[1px] after:bg-[#2ed47c] btn-link" to={item.btnLink ? item.btnLink : "#"} color="#2ed47c" size="lg" title={item.btnTitle} />
                                        }
                                    </div>
                                    }
                                </div>
                            </div>
                        </m.div>
                    )
                })
            }
        </Row>
    )
}

InteractiveBanners03.defaultProps = {
    data: InteractiveBannersData03,
    animationDelay: 0.2
}

InteractiveBanners03.propTypes = {
    className: PropTypes.string,
    grid: PropTypes.string,
    overlay: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array
    ]),
    animation: PropTypes.object,
    animationDelay: PropTypes.number,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            subtitle: PropTypes.string,
            img: PropTypes.string,
            imgLink: PropTypes.string,
            btnTitle: PropTypes.string,
            btnLink: PropTypes.string,
            titleLink: PropTypes.string,
            icon: PropTypes.string,
        })
    )
}

export default memo(InteractiveBanners03)
