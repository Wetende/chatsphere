import React, { memo } from 'react'

// Library
import { m } from 'framer-motion'
import { PropTypes } from "prop-types";

const Dropcaps = (props) => {
    return (
        <m.div className={`${props.theme} ${props.className} contents`} {...props.animation}>
            <p className="contents"><span className="text-basecolor">{props.content && props.content.charAt(0)}</span>{props.content && props.content.slice(1)}</p>
        </m.div>
    )
}

Dropcaps.defaultProps = {
    theme: 'dropcaps-style01'
}

Dropcaps.propTypes = {
    theme: PropTypes.string,
    className: PropTypes.string,
    content: PropTypes.string,
    animation: PropTypes.object,
}

export default memo(Dropcaps)