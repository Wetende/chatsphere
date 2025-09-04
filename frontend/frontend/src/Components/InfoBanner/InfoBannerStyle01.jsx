import React, { memo } from 'react'

// Libraries
import {  Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from "framer-motion"
import { PropTypes } from "prop-types";

// Data
import { InfoBannerData01 } from './InfoBannerData'

const InfoBannerStyle01 = (props) => {
    return (
        <Row className={`${props.className ? ` ${props.className}` : ""}${props.grid ? ` ${props.grid}` : ""}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div key={i} className="col" {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                            <Link aria-label="link" to={item.btnLink}><img className="w-full" width={360} height={279} src={item.img} alt="feature specials" /></Link>
                            <div className="relative bg-white box-shadow-small p-14">
                                <div className="bg-[#333045] text-small font-serif text-white uppercase absolute font-medium text-sm -top-[15px] right-0 py-[5px] px-[20px]">{item.price}</div>
                                <span className="font-serif font-medium text-xmd text-darkgray block mb-[10px]">{item.title}</span>
                                <p className="mb-[25px]">{item.content}</p>
                                <div className="w-full h-[1px] bg-[#ededed] mb-[20px] inline-block"></div>
                                <Link aria-label="link" className="font-serif font-semibold text-sm text-[#333045] hover:text-basecolor uppercase flex items-center" to={item.btnLink}>{item.btnName}<i className="feather-arrow-right text-lg ms-auto"></i></Link>
                            </div>
                        </m.div>
                    )
                })
            }
        </Row>
    )
}

InfoBannerStyle01.defaultProps = {
    data: InfoBannerData01,
    animationDelay:0.2
}

InfoBannerStyle01.propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            img:PropTypes.string,
            title:PropTypes.string,
            content:PropTypes.string,
            price:PropTypes.string,
            btnName:PropTypes.string,
            btnLink:PropTypes.string,
        })
    ),
    animation: PropTypes.object,
    animationDelay: PropTypes.number,
}


export default memo(InfoBannerStyle01)
