import React, { memo } from 'react'
// Data
import { TextBoxData01 } from './TextBoxData'

// Libraries
import { Col, Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { PropTypes } from 'prop-types';

// css
import "../../Assets/scss/components/_textbox.scss"

const TextBox = (props) => {
    return (
        <Row className= {`${props.grid} ${props.theme} ${props.className}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <Col className={`feature-box${props.className ? ` ${props.className} ` : "" }`} key={i}>
                            <m.div className="feature-box-content" {...{...props.animation,transition:{delay : i * props.animationDelay}}}>
                                {
                                    (props.theme === "text-box-style-01") ?
                                        <>
                                            <h2>{item.number}</h2>
                                            <span>{item.title}</span>
                                        </> :
                                        <>
                                            <span >{item.title}</span>

                                            <div className="feature-box-number"><span></span>{item.number}</div>
                                        </>
                                }
                                <p>{item.description}</p>
                            </m.div>
                        </Col>
                    )
                }
                )
            }

        </Row>)
}

TextBox.defaultProps = {
    data: TextBoxData01,
    theme: "text-box-style-01",
    animationDelay:0.3
}

TextBox.propTypes = {
    className: PropTypes.string,
    theme: PropTypes.string,
    animation: PropTypes.object,
    animationDelay: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ]),
    grid: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            number: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
        })
    ),
}

export default memo(TextBox)