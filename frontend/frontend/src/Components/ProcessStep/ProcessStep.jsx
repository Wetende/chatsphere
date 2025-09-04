import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { PropTypes } from "prop-types";

// Data
import { ProcessStepData01 } from './ProcessStepData'

// css
import "../../Assets/scss/components/_processstep.scss"

const ProcessStep = (props) => {
    return (
        <Row className={`${props.grid ? props.grid : ""}${props.className ? ` ${props.className}` : ""}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div key={i} className={`${props.theme} col process-step`} {...{ ...props.animation, transition: { delay: i * props.animationDelay,ease: [0.33,1,0.68,1], duration: 1 } }}>
                            <div className='process-step-icon-box'>
                                <span className='process-step-bfr'></span>
                                {item.icon && <div className="process-step-icon"><i className={item.icon}></i></div>}
                                {props.theme !== "process-step-style-01" && <span className="process-step-number"><span>{i + 1}</span></span>}
                                {(item.title || item.content) && (
                                    <div className="process-step-description">
                                        {item.title && <span className="process-step-heading">{item.title}</span>}
                                        {item.content && <p className="process-step-content">{item.content}</p>}
                                    </div>
                                )}
                            </div>
                        </m.div>
                    )
                })
            }
        </Row>
    )
}

ProcessStep.defaultProps = {
    data: ProcessStepData01,
    theme: 'process-step-style-01',
    animationDelay: 0.2
}

ProcessStep.propTypes = {
    grid: PropTypes.string,
    theme: PropTypes.string,
    animation:PropTypes.object,
    className: PropTypes.string,
    animationDelay: PropTypes.number,
     data: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            content: PropTypes.string,
            icon: PropTypes.string,
        })
    ),
}


export default memo(ProcessStep)