import React, { memo, useState } from 'react';

// Libraries
import { m } from "framer-motion";

const ScrollToTopButton = () => {

    const [visible, setVisible] = useState(false)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    });

    return (
        visible ? (
            <m.div className="scroll-top-arrow cursor-pointer bottom-[45px] right-[45px] top-auto z-[20] fixed" initial={{ opacity: 0, y: 50 }} animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} transition={{ duration: 0.5 }}>
                <div onClick={scrollToTop} className="rounded-full w-[35px] h-[35px] bg-white shadow-[0_0_20px_rgba(23,23,23,0.25)] flex justify-center items-center hover:-translate-y-[2px] hover:shadow-[0_0_30px_rgba(23,23,23,0.40)] transition-default">
                    <i className="feather-arrow-up text-[17px] text-[#828282]" />
                </div>
            </m.div>
        ) : (
            <></>
        )
    );
}

export default memo(ScrollToTopButton);
