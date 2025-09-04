import React, { memo } from 'react'

// Libraries
import { m } from 'framer-motion'
import { PropTypes } from "prop-types";

// Data
import { ProgressBarData01 } from './ProgressBarData'

const ProgressBar = (props) => {

    const ProgressColor = typeof (props.color) === "object" ? `linear-gradient(to right, ${props.color.map((item) => item)})` : props.color
    const TrailColor = typeof (props.trailColor) === "object" ? `linear-gradient(to right, ${props.trailColor.map((item) => item)})` : props.trailColor

    return (
        <div className={`${props.theme}${props.className ? ` ${props.className}` :""}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <div key={i} className="progressbar-main relative" style={{ "--progress-color": ProgressColor, "--trail-color": TrailColor }}>
                            {item.title && <span className="progressbar-title font-serif text-darkgray">{item.title}</span>}
                            <div className="progressbar-wrapper">
                                <m.div {...{
                                    className: "progressbar",
                                    initial: { width: 0 },
                                    viewport: { once: true },
                                    whileInView: { width: `${item.value}%` },
                                    transition: { type: "linear", duration: 1 },
                                    style: { height: `${props.height}` },
                                }} >
                                    <span>{`${item.value}%`}</span>
                                </m.div>
                            </div>
                        </div>
                    )
                })
            }
        </div >
    )
}

ProgressBar.defaultProps = {
    height: "4px",
    theme: "progressbar-style-02",
    color: "#232323",
    trailColor: "#E9ECEF",
    data: ProgressBarData01
}

ProgressBar.propTypes = {
    theme: PropTypes.string,
    className: PropTypes.string,
    height: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            value: PropTypes.string,
        })
    ),
}

export default memo(ProgressBar)