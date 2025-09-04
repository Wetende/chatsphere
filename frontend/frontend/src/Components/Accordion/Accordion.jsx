import React, { memo } from 'react'

// Libraries
import { Accordion } from 'react-bootstrap'
import { m } from "framer-motion"
import { PropTypes } from "prop-types";

// Data
import {AccordionData} from './AccordionData'

// css
import "../../Assets/scss/components/_accordion.scss"

const Accordions = (props) => {

    return (
        <div className={`${props.theme} ${props.themeColor}${props.className ? ` ${props.className}` : ""}`}>
            <Accordion defaultActiveKey={0}>
                {
                    props.data.map((item, key) => {
                        return (
                            <m.div className={`accordion-item-wrapper`}
                                key={key}
                                {...{ ...props.animation, transition: { delay: key * props.animationDelay } }}
                            >
                                <Accordion.Item key={key} eventKey={key}>
                                    {item.title && 
                                        <Accordion.Header>
                                            { item.time && <span className="panel-time">{item.time}</span>}
                                            { item.title && <span className="panel-title">{item.title}</span>}
                                            { item.author && <span className="panel-speaker">{item.author}</span>}
                                        </Accordion.Header>
                                    }
                                    {item.content && <Accordion.Body> {item.content} </Accordion.Body>}
                                </Accordion.Item>
                            </m.div>
                        )
                    })
                }
            </Accordion>
        </div>
    )
}

Accordions.defaultProps = {
    data: AccordionData,
    animationDelay: 0.2,
    theme: "accordion-style-01",
    themeColor: "light"
}

Accordion.propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            content: PropTypes.string
        })
    ),
    animation: PropTypes.object,
    animationDelay: PropTypes.number,
    theme: PropTypes.string,
    themeColor: PropTypes.string,
}

export default memo(Accordions)