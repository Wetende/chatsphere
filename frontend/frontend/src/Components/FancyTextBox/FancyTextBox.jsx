import React, { memo } from 'react'

// Libraries
import { Col, Row } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { PropTypes } from "prop-types";
import { m } from 'framer-motion'

// Components
import { addZeroBeforeNumber } from "../../Functions/Utilities";

// Data
import { fancyTextBox01 } from './FancyTextBoxData'

// css
import "../../Assets/scss/components/_fancytextbox.scss"

const FancyTextBoxSwitch = (params, item, i) => {
    switch (params.theme) {
        case "fancy-text-box-01":
            return (
                <div className="text-box-content">
                    <div className="text-box">
                        {item.icon.class && <i className={item.icon.class}></i>}
                        {item.title && <span>{item.title}</span>}
                    </div>
                    <div className="text-box-hover">
                        {item.title && <span className="inline-block text-darkgray">{item.title}</span>}
                        {item.description && <p>{item.description}</p>}
                    </div>
                </div>
            )
        case "fancy-text-box-02":
            return (
                <div className="text-box-content">
                    <div className="text-box-wrapper">
                        {item.icon.class && <i className={item.icon.class}></i>}
                        <div className="text-box">
                            {item.title && <span>{item.title}</span>}
                            {(item.link || item.linkTitle) && <a aria-label="fancytextbox" href={item.link}><u>{item.linkTitle}</u></a>}
                        </div>
                        {item.description && <p>{item.description}</p>}
                    </div>
                </div>
            )
        case "fancy-text-box-03":
            return (
                <div className="text-box-content">
                    <div className="text-box font-serif flex justify-center items-center">
                        {item.icon && (
                            <h2 className={`heading-4 fancy-text-icon${item.icon.class ? ` ${item.icon.class}` : ""}`}>{item.icon.text}</h2>
                        )}
                        <div className="fancy-box-wrapper">
                            {item.title && <span className="font-medium text-darkgray">{item.title}</span>}
                            {item.description && <p>{item.description}</p>}
                        </div>
                    </div>
                </div>
            )
        case "fancy-text-box-04":
            return (
                <div className="text-box-content h-full p-16 bg-[#fff] relative shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden lg:p-[2.5rem] md:p-16">
                    <div className="feature-box-icon text-[40px] inline-block mr-[20px]">
                        {item.icon.class && <i className={item.icon.class}></i>}
                    </div>
                    <div className="feature-box-content inline-block leading-[22px]">
                        <div className="text-darkgray font-serif text-base font-medium leading-[20px]">{item.title}</div>
                        <span className="text-sm font-serif">{item.subTitle}</span>
                    </div>
                    <div className="bg-[#ededed] mt-[25px] w-full h-[1px]"></div>
                    {item.description && <p className="mt-[25px]">{item.description}</p>}
                    <h3 className="font-serif opacity-20 font-medium -tracking-[2px] absolute -bottom-[10px] sm:-bottom-[15px] right-[50px] m-0 h-[3.4rem]">{addZeroBeforeNumber(i+1)}</h3>
                </div>
            )
        case "fancy-text-box-05":
            return (
                <Col className="fancy-box-item divide-x divide-[#ffffff33] lg:divide-y z-[3]">
                    <div className="bg-banner-image bg-cover overflow-hidden bg-center relative z-0" style={{ backgroundImage: `url(${item.hoverImg})` }}>
                        <div className="opacity-very-light opacity-30 absolute top-0 left-0 w-full h-full bg-black"></div>
                    </div>
                    <div className="fancy-text-box relative overflow-hidden h-[800px] xl:h-[500px] xs:h-[250px] z-[3]">
                        <div className="fancy-text-content px-[5rem] py-[4.5rem] xl:px-[2rem] xl:py-[1.5rem] lg:p-16">
                            <h3 className="heading-6 font-serif font-semibold text-[#fff] uppercase w-[85%] xl:w-full lg:w-3/5 md:w-[80%]">{item.title}</h3>
                            <div className="fancy-text-box-bottom justify-center">
                                <div className="flex">
                                    <p className="m-0 self-center w-[75%] text-[#fff] opacity-60">{item.description}</p>
                                    {item.link && <span className="self-center text-center ml-auto">
                                        <Link aria-label="link" to={item.link} className="inline-flex justify-center items-center leading-10 rounded-full bg-darkgray h-[40px] w-[40px]">
                                            <i className="feather-arrow-right text-[#fff]"></i></Link>
                                    </span>}
                                </div>
                            </div>
                            <div className="feature-box-overlay bg-[#c3964e] transition-default"></div>
                        </div>
                    </div>
                </Col>
            )
        default:
            return (
                <div className="text-box-content">
                    <div className="text-box">
                        {item.icon && <i className={item.icon}></i>}
                        {item.title && <span>{item.title}</span>}
                    </div>
                    <div className="text-box-hover">
                        {item.title && <span>{item.title}</span>}
                        {item.description && <p>{item.description}</p>}
                    </div>
                </div>
            )
    }
}

const FancyTextBox = (props) => {
    return (
        <Row className={`${props.theme}${props.grid ? ` ${props.grid}` : ""}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div className={`col${props.themeColor ? ` ${props.themeColor}` : ""}${props.className ? ` ${props.className}` : ""}`} key={i} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                            {FancyTextBoxSwitch(props, item, i)}
                        </m.div>
                    )
                })}
        </Row>
    )
}

FancyTextBox.defaultProps = {
    data: fancyTextBox01,
    theme: "fancy-text-box-01",
    animationDelay: 0.2,
}

FancyTextBox.propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            icon: PropTypes.object,
            title: PropTypes.string,
            description: PropTypes.string,
            linkTitle: PropTypes.string,
            link: PropTypes.string,
            subTitle: PropTypes.string,
            backgroundText: PropTypes.string,
            hoverImg: PropTypes.string,
        })
    ),
    animation: PropTypes.object,
    animationDelay: PropTypes.number,
    theme: PropTypes.string,
    themeColor: PropTypes.string,
    grid: PropTypes.string,
}
export default memo(FancyTextBox)