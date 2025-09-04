import React, { lazy } from 'react'

// Libraries
import { Col, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

// Components
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../Components/Header/Header'
import FooterStyle01 from '../Components/Footers/FooterStyle01'
const SideButtons = lazy(() => import("../Components/SideButtons"))

const ElementPage = (props) => {
    return (
        <div style={props.style}>
            {/* Header Start */}
            <Header topSpace={{ desktop: true }} type="reverse-scroll">
                <HeaderNav fluid="fluid" theme="light" bg="white" menu="light" containerClass="sm:px-0" className="px-[35px] py-[0px] md:pr-[15px] md:pl-0">
                    <Col className="col-5 col-lg-2 me-auto ps-md-0">
                        <Link aria-label="header logo" className="flex items-center" to="/">
                            <Navbar.Brand className="inline-block p-0 m-0">
                                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                            </Navbar.Brand>
                        </Link>
                    </Col>
                    <Navbar.Toggle className="order-last md:ml-[25px] sm:ml-[17px]">
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                        <span className="navbar-toggler-line"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse collapseonselect="true" className="col-auto menu-order justify-end px-0">
                        <Menu {...props} />
                    </Navbar.Collapse>
                    <Col className="col-auto text-end hidden-xs pe-0 font-size-0 !pl-[12px]">
                        <SearchBar className="xs:pl-[15px]" />
                        <HeaderLanguage className="xs:pl-[15px]" />
                        <HeaderCart className="xs:pl-[15px]" />
                    </Col>
                </HeaderNav>
            </Header>
            {/* Header End */}
            <SideButtons />
            <Outlet />

            {/*  Footer Start */}
            <FooterStyle01 theme="dark" className="bg-[#262b35] text-slateblue" />
            {/*  Footer End */}
        </div>
    )
}

export default ElementPage