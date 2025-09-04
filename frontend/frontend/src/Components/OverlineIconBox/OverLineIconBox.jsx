import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { PropTypes } from "prop-types";

// Data
import { OverLineData } from './OverLineIconBoxData'

const OverLineIconBox = (props) => {
    return (
        <Row className={`${props.grid}${props.className ? ` ${props.className}` : ""}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div className="col sm:flex" key={i} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                            <div className={`${props.className ? props.className : ""} overline-icon-box bg-white`}>
                                {item.icon && (<div className="feature-box-icon"> <i className={item.icon}></i></div>)}
                                <div className="feature-box-content">
                                    {item.title && <span>{item.title}</span>}
                                    {item.content && <p>{item.content}</p>}
                                </div>
                            </div>
                        </m.div>
                    )
                })
            }
        </Row>

    )
}

OverLineIconBox.defaultProps = {
    data: OverLineData,
    animationDelay: 0.3
}

OverLineIconBox.propTypes = {
    className: PropTypes.string,
    grid: PropTypes.string,
    animation: PropTypes.object,
    animationDelay: PropTypes.number,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            content: PropTypes.string,
            icon: PropTypes.string,
        })
    ),
}

export default memo(OverLineIconBox)