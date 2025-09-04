import React, { memo } from "react";

// Libraries
import { m } from "framer-motion";
import Countdown, { zeroPad } from "react-countdown";
import PropTypes from "prop-types"

const CountDown = (props) => {
    return (
        <m.div className={`${props.theme} countdown flex flex-wrap ${props.className}`} {...props.animation}>
            <Countdown date={props.date} renderer={renderer} />
        </m.div>
    )
}

const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        return <span>You are good to go!</span>;
    } else {
        return (
            <>
                <div><span className="number">{zeroPad(days)}</span><span className="unit">Days</span></div>
                <div><span className="number">{zeroPad(hours)}</span><span className="unit">Hours</span></div>
                <div><span className="number">{zeroPad(minutes)}</span><span className="unit">Minutes</span></div>
                <div><span className="number">{zeroPad(seconds)}</span><span className="unit">Seconds</span></div>
            </>
        );
    }
};

CountDown.defaultProps = {
    theme: "countdown-style-01"
}

CountDown.propTypes = {
    className: PropTypes.string,
    date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    animation: PropTypes.object,
    theme: PropTypes.string
}

export default memo(CountDown)