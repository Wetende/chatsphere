import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { PropTypes } from "prop-types";

// Data
import { CustomIconWithTextData1 } from './CustomIconWithTextData'

const CustomIconWithText = (props) => {
    return (
        <Row className={props.grid}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div className="col landscape:md:!px-0" key={i} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                            <div className={`${props.theme} ${props.className}`}>
                                {item.img ? (
                                    <img width="" height="" className="inline-block items-center justify-center mb-[30px]" src={item.img} alt="featurebox" />
                                ) : (
                                    <div className="feature-box-icon">
                                        {item.icon && <i className={item.icon}></i>}
                                        {
                                            props.theme === "custom-icon-with-text02" && (
                                                <span className="feature-box-svg-shap drop-shadow">
                                                    <svg width="100" viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M86.2,51.4C58.6,97.5,-53.4,96.5,-81.8,49.9C-110.3,3.3,-55.1,-88.8,0.9,-88.3C56.9,-87.8,113.7,5.3,86.2,51.4Z"></path></svg>
                                                </span>
                                            )
                                        }
                                    </div>
                                )}

                                <div className="feature-box-content">
                                    {item.title && <h3 className="heading-6 title font-medium text-base font-serif text-darkgray mb-[10px]">{item.title}</h3>}
                                    {item.content && <p className="text-base text-center">{item.content}</p>}
                                </div>
                            </div>
                        </m.div>
                    )
                })
            }
        </Row>

    )
}
CustomIconWithText.defaultProps = {
    data: CustomIconWithTextData1,
    theme: "custom-icon-with-text01",
    animationDelay: 0.2,
}

CustomIconWithText.propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            img: PropTypes.string,
            icon: PropTypes.string,
            title: PropTypes.string,
            content: PropTypes.string
        })
    ),
    animation: PropTypes.object,
    animationDelay: PropTypes.number,
    theme: PropTypes.string,
    grid: PropTypes.string,
}

export default memo(CustomIconWithText);