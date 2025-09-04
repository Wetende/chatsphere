import React, { useState, useEffect, useRef, memo } from 'react'

// Libraries
import { m } from "framer-motion";
import { useLocation } from "react-router-dom";

// Components
import ReactCustomScrollbar from "./ReactCustomScrollbar";
import Buttons from './Button/Buttons'
import PortfolioSwitchImg from "./Portfolio/PortfolioSwitchImg";
import { fadeIn } from "../Functions/GlobalAnimations";
import useOnClickOutside from "../Functions/UseOnClickOutside";

// Data
import { LandingDemoData } from "../Pages/LandingData";

const SideButtons = memo((props) => {
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(false)
    const ref = useRef(null);
    useOnClickOutside(ref, () => setShow(false));
    const location = useLocation()

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const scrolled = document.documentElement.scrollTop;
            if (scrolled > 100) {
                setVisible(true)
            }
        });
    }, [])

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                setShow(false)
            }
        }

        if (show === true) {
            document.querySelector('body').classList.add("overflow-hidden");
        } else {
            document.querySelector('body').classList.remove("overflow-hidden");
        }

        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [show])

    useEffect(() => {
        setVisible(false)
        if (props.animation === false) {
            setVisible(true)
        }
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [location])

    return (
        <m.div className={`${show ? "block h-[100vh] left-0 overflow-hidden fixed top-0 w-full z-[16]" : "fixed z-[16]"}`} initial={{ opacity: 0, visibility: "hidden" }} animate={visible ? { opacity: 1, visibility: "visible" } : { opacity: 0, visibility: "hidden" }} transition={{ duration: 0.5 }}>
            <section className={`all-demo-btn-section z-10 lg:hidden${show ? " show" : ""}`} ref={ref}>
                <div className="all-demo bottom-[230px] bg-white lg:hidden shadow-[0_0_15px_rgba(0,0,0,0.15)]" onClick={() => setShow(!show)}>
                    <div className="theme-wrapper text-darkgray text-[14px] uppercase  flex items-center" onClick={() => setShow(false)}>
                        {
                            show === true ? (
                                <i className="feather-x text-[24px]"></i>
                            ) : <>
                                <i className="feather-layers align-middle text-[21px] mr-[10px]"></i>
                                <span className="font-semibold">37+&nbsp;</span>demos
                            </>
                        }
                    </div>
                </div>
                {
                    show && (
                        <>
                            <div className={`h-full w-full flex items-center justify-center overflow-y-hidden px-[25px] py-[40px] bg-white top-0 right-0 fixed${show === true ? " shadow-[0_0_45px_rgba(0,0,0,0.25)]" : ""}`}>
                                <ReactCustomScrollbar className="unique-demos" theme="dark">
                                    <div className="w-[95%] relative" style={{ maxHeight: `calc(100vh - 80px)` }}>
                                        <div className="text-center">
                                            <span className="font-serif font-semibold text-xmd text-gradient bg-gradient-to-r from-[#556fff] to-[#e65f9a] uppercase -tracking-[.5px] inline-block mb-[5px]">
                                                Truly multipurpose
                                            </span>
                                            <h2 className="heading-5 font-serif font-semibold text-darkgray -tracking-[1px] flex justify-center px-[20%] mb-[30px]">
                                                37+ Unique demos
                                            </h2>
                                        </div>
                                        <PortfolioSwitchImg grid="grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large text-center h-[760px] bg-white" data={LandingDemoData} />
                                        <m.div className="flex justify-center" {...fadeIn}>
                                            <Buttons to="/" target="_blank" className="btn-fill font-medium btn-fancy mt-[45px] font-serif rounded-none uppercase" themeColor="#232323" color="#fff" size="lg" title="View all 37+ demos" />
                                        </m.div>
                                    </div>
                                </ReactCustomScrollbar>
                            </div>
                        </>
                    )
                }
                <div className="all-demo bottom-[160px] bg-darkgray text-white lg:hidden shadow-[0_0_15px_rgba(0,0,0,0.15)]">
                    <a rel="noreferrer" href="https://1.envato.market/rQEmZd" target="_blank" className="flex items-center hover:text-white">
                        <i className={`feather-shopping-bag align-middle text-[21px] mr-[10px]${show === true ? " mx-auto" : ""}`}></i>
                        {show !== true && <span className="leading-[23px] uppercase text-[14px] inline-block">Buy now</span>}
                    </a>
                </div>
            </section>
        </m.div>
    )
})

export default memo(SideButtons)