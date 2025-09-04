import React, { memo, useRef } from 'react'

// Libraries
import { PropTypes } from "prop-types"
import Progressbar from 'react-js-progressbar';
import { Col, Row } from 'react-bootstrap';
import { useInView, m } from 'framer-motion'

// Data
import { PiechartData2 } from './PieChartData';

const Piechart = ({animation, ...props}) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    
    return (
        <Row className={props.grid}>
            {
                props.data.map((item, i) => {
                    return (
                        <Col key={i} ref={ref}>
                            <m.div className={`${props.theme}${props.className ? ` ${props.className}` : ""}`} {...{ ...animation, transition: { delay: ((i / 2) * 0.36) * props.animationDelay } }}>
                                <Progressbar
                                    key={i}
                                    animation={{ duration: 1500, delay: 0.2, ease: 'linear', animateOnMount: true, animateOnInputChange: true }}
                                    viewport={{ once: true }}
                                    input={isInView && item.percentage}
                                    textStyle={{ fill: '#232323', fontWeight: 500, fontSize: 52, letterSpacing: '-1px' }}
                                    pathShadow="none"
                                    {...props}
                                />
                                {(item.title || item.content) && (
                                    <div className="piechart-vertical">{item.title && <span className="title font-medium font-serif">{item.title}</span>} {item.content && <p>{item.content}</p>}</div>
                                )}
                            </m.div>
                        </Col>
                    )
                })
            }
        </Row>
    )
}

Piechart.defaultProps = {
    theme: "piechart-style-01",
    animationDelay: 1,
    data: PiechartData2,
    trailColor:"#f5f5f5"
}

Piechart.propTypes = {
    className: PropTypes.string,
    animation: PropTypes.object,
    theme: PropTypes.string,
    animationDelay: PropTypes.number,
    grid: PropTypes.string,
}

export default memo(Piechart)