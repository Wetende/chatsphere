import React, { useState } from 'react'

// Libraries
import { useEffect } from "react";
import { Col, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom'

// Components
import ReactCustomScrollbar from "../ReactCustomScrollbar";
import SocialIcons from '../SocialIcon/SocialIcons'
import Header, { CollapsibleMenu } from './Header';

const socialIconsData = [
    {
        color: "#828282",
        link: "https://www.facebook.com/",
        icon: "fab fa-facebook-f"
    },
    {
        color: "#828282",
        link: "https://twitter.com/",
        icon: "fab fa-twitter"
    },
    {
        color: "#828282",
        link: "https://www.linkedin.com/",
        icon: "fab fa-linkedin-in"
    },
]

const LeftMenuModern = () => {

    const [show, setShow] = useState(false);

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

    return (
        <>
            {/* Header Start */}
            <Header topSpace={{ md: true }} className="left-menu-modern-sidebar fixed top-0 left-0 z-10 md:w-full md:h-auto">
                <div className="bg-black sidebar-nav-action h-[100vh] md:h-auto w-[65px] md:w-full py-[30px] flex flex-col md:flex-row md:justify-between md:px-[30px] md:py-[15px] sm:px-[15px]">
                    <Col className="flex justify-center md:justify-start">
                        <Link aria-label="header logo" to="/">
                            <img width={30} height={35} className="max-h-[36px]" alt="" src="/assets/img/webp/symbol.webp" />
                        </Link>
                    </Col>
                    <Col className="flex items-center justify-center xs:justify-end">
                        <Navbar className="inline-block" variant="dark">
                            <Navbar.Toggle className="push-button" onClick={() => setShow(!show)}>
                                <Link aria-label="link for" to="#" onClick={(e) => e.preventDefault()} className="nav-icon">
                                    <span className="navbar-toggler-line"></span>
                                    <span className="navbar-toggler-line"></span>
                                    <span className="navbar-toggler-line"></span>
                                    <span className="navbar-toggler-line"></span>
                                </Link>
                            </Navbar.Toggle>
                            <div className={`left-menu-wrapper flex items-center w-[380px] bg-[#000] hover:bg-darkgray md:hover:bg-[#000] transition-default fixed top-[var(--header-height)] left-[65px] md:left-0 xs:w-full -z-10 h-[calc(100vh-var(--header-height))]${show ? " show" : ""}`}>
                                <div className="col-12 h-full px-[3.5rem] sm:px-4">
                                    <ReactCustomScrollbar className="pl-[15px] pb-[50px]" theme="light" autoHide>
                                        <div>
                                            <CollapsibleMenu className="w-full mx-auto xs:px-0" theme="light" />
                                        </div>
                                    </ReactCustomScrollbar>
                                </div>
                            </div>
                        </Navbar>
                    </Col>
                    <Col className="flex flex-col justify-end md:flex-row xs:hidden">
                        <SocialIcons size="xs" theme="social-icon-style-01" className="flex-col md:flex-row justify-center text-center" iconColor="light" data={socialIconsData} />
                    </Col>
                </div>
            </Header>
            {/* Header End */}
        </>

    )
}

export default LeftMenuModern
