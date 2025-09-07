import React, { memo } from 'react'

// Component
import { Col, Row } from 'react-bootstrap'
import Buttons from '../Button/Buttons'
import { m } from "framer-motion"
import { PropTypes } from "prop-types";

// Data
import RotateBoxData from './RotateBoxData'

// css
import "../../Assets/scss/components/_rotatebox.scss"

const RotateBox = (props) => {
    return (
        <>
            <Row className={`${props.grid}${props.className ? ` ${props.className}` : ""}`}>
                {
                    props.data.map((item, i) => {
                        return (
                            <Col key={i}>
                                <m.div
                                    className="rm-rotate-box text-center"
                                    initial={{ opacity: 0, transform: "perspective(400px) rotateY(90deg)" }}
                                    whileInView={{ opacity: 1, transform: "perspective(400px) rotateY(0deg)" }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 100, duration: 1 }}
                                >
                                    <div className="flipper to-left">
                                        <div className="thumb-wrap">
                                            <div className="card-side front overflow-hidden rounded-[4px] h-[490px] lg:h-[450px]" style={{ backgroundImage: `url(${item.img})` }}>
                                                <div className="absolute top-0 left-0 w-full h-full opacity-70 overlay-rotatebox"></div>
                                                <div className="content-wrap px-[15px]">
                                                    <span className="text-white text-lg tracking-[1px] uppercase font-serif inline-block font-medium mb-[10px]">{item.title}</span>
                                                    <span className="text-white opacity-60 text-md uppercase tracking-[.5px] font-serif block">{item.subtitle}</span>
                                                </div>
                                            </div>
                                            <div className="card-side back rounded-[4px] overflow-hidden">
                                                <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-[#fb7f87] via-[#fc8a82] to-[#f7aa80]"></div>
                                                <div className="content-wrap p-[60px] lg:px-[30px] md:px-[40px] xs:p-[30px]">
                                                    <i className={`${item.icon} text-[50px] text-white mb-[35px] inline-block`}></i>
                                                    <span className="text-white text-xmd tracking-[1px] font-medium uppercase font-serif block mb-[10px]">{item.title}</span>
                                                    <p className="text-white opacity-70 mb-[25px]">{item.content}</p>
                                                    <Buttons ariaLabel="pricing table" href={item.btnLink} className="font-medium text-darkgray hover:text-darkgray font-serif after:bg-black uppercase btn-link after:h-[1px] md:text-md" color="#232323" size="xl" title={item.btnTitle} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </m.div>
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}

RotateBox.defaultProps = {
    data: RotateBoxData,
}

RotateBox.propTypes = {
    className: PropTypes.string,
    grid: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            img: PropTypes.string,
            title: PropTypes.string,
            subtitle: PropTypes.string,
            content: PropTypes.string,
            btnTitle: PropTypes.string,
            btnLink: PropTypes.string,
            icon: PropTypes.string,
        })
    )
}

export default memo(RotateBox)
