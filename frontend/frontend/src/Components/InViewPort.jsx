import React, { useRef } from "react"
import { useInViewport } from "react-in-viewport"

const InViewPort = ({children, ...props}) => {
    const myRef = useRef(null)
    const { enterCount } = useInViewport(myRef, props)
    
    return (
        <div ref={myRef} className={`${enterCount === 0 ? "py-[120px]" : ""}`}>
            {( enterCount > 0 ) && children}
        </div>
    )
}

export default InViewPort