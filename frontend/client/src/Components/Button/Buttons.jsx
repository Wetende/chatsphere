import React, { memo } from 'react'

// Libraries
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import PropTypes from "prop-types"

// css
import "../../Assets/scss/components/_button.scss"

const Buttons = (props) => {
  const color1 = props.themeColor && props.themeColor[0];
  const color2 = props.themeColor && props.themeColor[1];
  const textcolor1 = props.color && props.color[0];
  const textcolor2 = props.color && props.color[1];
  const style = {
    "--gradient-color": typeof (props.themeColor) === "object" ? `linear-gradient(45deg, ${color1}, ${color2}, ${color1})` : props.themeColor,
    "--brand-color": typeof (props.themeColor) === "object" ? `linear-gradient(to right, ${color1}, ${color2}, ${color1})` : props.themeColor,
    "--text-color": typeof (props.color) === "object" ? `linear-gradient(to right, ${textcolor1}, ${textcolor2}, ${textcolor1})` : props.color,
  }
  return (
    (props.href || props.type === "submit") ? (
      <Button
        as={props.href ? "a" : (props.type === "submit" ? "button" : "a")}
        type={props.type === "submit" ? "submit" : undefined}
        style={style}
        className={`border-[2px] border-solid btn-${props.size}${props.className ? ' ' + props.className : ''}${typeof (props.themeColor) === "object" ? " btn-gradient" : ""}${typeof (props.color) === "object" ? " text-gradient" : ""}`}
        href={props.href}
        onClick={props.onClick}
        disabled={props.disabled}
        variant="secondary"
        aria-label={props.ariaLabel}
        target={props.target}
      >
        <ButtonInner {...props} />
      </Button>
    ) : (
      <Link
        style={style}
        target={props.target}
        className={`btn border-[2px] border-solid btn-${props.size}${props.className ? ' ' + props.className : ''}${typeof (props.themeColor) === "object" ? " btn-gradient" : ""}${typeof (props.color) === "object" ? " text-gradient" : ""} `}
        to={props.to ? props.to : "#"}
        onClick={props.onClick}
        aria-label={props.ariaLabel}>
        <ButtonInner {...props} />
      </Link>
    )
  )
}

const ButtonInner = (props) => {
  return (
    <>
      {(props.icon && props.iconPosition !== "after") && <i className={`${props.icon} left-icon`}></i>}
      {props.title}
      {(props.icon && props.iconPosition === "after") && <i className={`${props.icon} right-icon`}></i>}
      {(props.theme === "btn-link-gradient") && <span></span>}
    </>
  )
}

Buttons.defaultProps = {
  size: "lg",
  style: "primary"
}

Buttons.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  href: PropTypes.string,
  to: PropTypes.string,
  size: PropTypes.string,
  themeColor: PropTypes.oneOfType([ PropTypes.string, PropTypes.array, ]),
  color: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
  title: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  onClick: PropTypes.func,
}

export default memo(Buttons)