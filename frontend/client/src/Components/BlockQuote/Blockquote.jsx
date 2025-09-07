import React, { memo } from 'react'

// Libraries
import { PropTypes } from "prop-types";
import { m } from "framer-motion";

// css
import "../../Assets/scss/components/_blockquote.scss"

const Blockquote = (props) => {
    return (
        <m.blockquote className={`${props.theme}${props.className ? ` ${props.className}` : ""}`} {...props.animation}>
            {props.icon && <i className={props.icon}></i>}
            {props.title && <h6>{props.title}</h6>}
            {props.author && <span className="text-basecolor">{props.author}</span>}
        </m.blockquote>
    )
}

Blockquote.defaultProps = {
    author: "",
    theme: "blockquote-style-01",
    title: "",
    icon: ""
}

Blockquote.propTypes = {
    className: PropTypes.string,
    author: PropTypes.string,
    theme: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
    animation: PropTypes.object
}

export default memo(Blockquote)