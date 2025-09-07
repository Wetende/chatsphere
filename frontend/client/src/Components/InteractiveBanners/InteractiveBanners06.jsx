import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { PropTypes } from "prop-types";

// Components
import Buttons from '../Button/Buttons'

// Data
import { InteractiveBannersData06 } from './InteractiveBannersData'

const InteractiveBanners06 = (props) => {
    return (
        <Row className={`${props.grid}${props.className ? ` ${props.className}` : ""}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div key={i} className="col-12 col-xl-4 col-md-6 col-sm-8 col-lg-6 interactive-banners-style-06 relative flex sm:w-full" {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                            <div className="interactivebanners-image relative left-0 w-[75%] xs:w-[80%]">
                                {(item.img || item.btnLink) && <Link aria-label="link" className="text-[#828282] no-underline" to={item.imgLink}><img width={335} height={456} className="max-w-full h-auto align-middle" alt="" src={item.img} /></Link>}
                            </div>
                            <div className="interactivebanners-content absolute top-0 right-0 h-full w-[35%] flex flex-col justify-center">
                                {item.title && <h2 className="font-semibold text-[#fff] -mb-[30px] p-0 -tracking-[0.5px] text-[55px] font-serif leading-[4.2rem] w-[128px] lg:text-[50px] md:text-[46px] xs:w-[85%]">{item.title}</h2>}
                                {(item.btnTitle || item.btnLink) && <Buttons ariaLabel="interactive button" className="font-medium font-serif uppercase btn-link lg:text-[14px] lg:mx-0" size="xl" to={item.btnLink} title={item.btnTitle} />}
                            </div>
                        </m.div>
                    )
                })
            }
        </Row>

    )
}


InteractiveBanners06.defaultProps = {
    data: InteractiveBannersData06,
    animationDelay: 0.2
}

InteractiveBanners06.propTypes = {
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

export default memo(InteractiveBanners06)