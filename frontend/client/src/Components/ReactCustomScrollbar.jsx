import React, { memo, useEffect } from 'react'

// Libraries
import { Scrollbar } from 'smooth-scrollbar-react';

const ReactCustomScrollbar = ({ theme, children, className, ...props }) => {
    useEffect(() => {
        let scrollbar = document.querySelectorAll(".smooth-scrollbar");
        const getScrollbarPos = () => {
            scrollbar.forEach(item => {
                setTimeout(() => {
                    let content = item.querySelector(".scroll-content");
                    if (content !== null && content.clientHeight > item.clientHeight) {
                        item.classList.add("scrollbar-appear");
                    }

                    if (content !== null && content.clientHeight < item.clientHeight) {
                        item.classList.remove("scrollbar-appear");
                    }
                }, 500);
            })
        }
        getScrollbarPos();
        window.addEventListener('resize', getScrollbarPos)
        document.querySelectorAll(".accordion-button").forEach(item => {
            item.addEventListener('click', getScrollbarPos);
        });

        let el = document.querySelectorAll(".navbar-nav > .nav-item");

        if (typeof(el) != 'undefined' && el != null) {
            el.forEach(item => {
                let icon = item.querySelector(".fa");

                if ( typeof(icon) != 'undefined' && icon != null ) {
                    icon.addEventListener('click', getScrollbarPos);
                }
            });
        }
    }, [])

    return (
        <Scrollbar
            {...props}
            className={`smooth-scrollbar ${theme}${className ? ` ${className}` : ""}`}
            plugins={{
                overscroll: {
                    effect: 'bounce',
                }
            }}
        >
            {children}
        </Scrollbar>
    )
}

ReactCustomScrollbar.defaultProps = {
    theme: "light"

}

export default memo(ReactCustomScrollbar)