import React from 'react'

// Libraries
import { Col, Container, Row, Navbar } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";
import { m } from 'framer-motion'

// Components
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import MultiRangeSlider from "../../Components/Products/MultiRangeSlider";
import FooterStyle01 from "../../Components/Footers/FooterStyle01";
import ShopWide from "../../Components/Products/ShopWide";
import { fadeIn } from '../../Functions/GlobalAnimations';
import SideButtons from "../../Components/SideButtons";

// Data
import { shopWideData } from "../../Components/Products/ProductData";

const LeftSidebar = (props) => {
    return (
        <div style={props.style}>
            {/* Header Start */}
            <Header topSpace={{ desktop: true }} type="reverse-scroll">
                <HeaderNav theme="light" expand="lg" className="px-[30px] py-[0px] md:px-0" containerClass="sm:px-0">
                    <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
                        <Link aria-label="header logo" className="flex items-center" to="/">
                            <Navbar.Brand className="inline-block p-0 m-0">
                                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                            </Navbar.Brand>
                        </Link>
                    </Col>
                    <div className="col-auto hidden order-last md:block">
                        <Navbar.Toggle className="md:ml-[10px] sm:ml-0">
                            <span className="navbar-toggler-line"></span>
                            <span className="navbar-toggler-line"></span>
                            <span className="navbar-toggler-line"></span>
                            <span className="navbar-toggler-line"></span>
                        </Navbar.Toggle>
                    </div>
                    <Navbar.Collapse className="col-auto col-lg-8 justify-center md:!px-0">
                        <Menu {...props} />
                    </Navbar.Collapse>
                    <Col className="col-auto col-lg-2 text-right pe-0">
                        <SearchBar className="pr-0 xs:p-0" />
                        <HeaderLanguage />
                        <HeaderCart style={{ "--base-color": "#0038e3" }} />
                    </Col>
                </HeaderNav>
            </Header>
            {/* Header End */}
            <SideButtons />

            {/* Parallax Section Start */}
            <m.div className="h-[380px] sm:h-[350px] overflow-hidden" {...fadeIn}>
                <Parallax className="lg-no-parallax bg-cover absolute top-0 left-0 w-full h-full" translateY={[-40, 40]} style={{ backgroundImage: `url(/assets/img/webp/portfolio-bg.webp)` }}></Parallax>
                <Container className="h-full relative">
                    <Row className="row items-stretch justify-center h-[300px] md:h-[375px] sm:h-[350px]">
                        <Col xl={6} lg={7} md={8} xs={12} className="text-center flex justify-center flex-col">
                            <h1 className="text-xmd leading-[20px] font-serif text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] mb-[15px] inline-block">Shop left sidebar</h1>
                            <h2 className="text-darkgray mb-[0px] font-serif font-medium -tracking-[1px] xs:mb-[0px]">Every new print and color of the season</h2>
                        </Col>
                    </Row>
                </Container>
            </m.div>
            {/* Parallax Section End */}

            {/* Section Start */}
            <section className="shopping-right-left-sidebar pt-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container>
                    <Row>
                        <Col lg={9} md={8} className="pl-[55px] md:pl-[15px] sm:mb-[30px] order-md-2 order-1 sm:px-0">
                            <ShopWide filter={false} grid="grid grid-3col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large" data={shopWideData} />
                        </Col>
                        <m.aside className="col col-lg-3 col-md-4 shopping-sidebar inline-block order-md-1 order-2" {...fadeIn}>
                            <div className="border-b border-mediumgray pb-12 mb-12 relative">
                                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[20px]">Filter by category</span>
                                <ul className="list-style filter-category">
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} href="#shirt"><span className="product-cb product-category-cb"></span>Casual shirts</a><span className="item-qty">25</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} href="#bags"><span className="product-cb product-category-cb"></span>Leather bags</a><span className="item-qty">05</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} href="#shirt"><span className="product-cb product-category-cb"></span>Men's shorts</a><span className="item-qty">36</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} href="#t-shirt"><span className="product-cb product-category-cb"></span>Polo t-shirts</a><span className="item-qty">05</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} href="#skirts"><span className="product-cb product-category-cb"></span>Short skirts</a><span className="item-qty">09</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} href="#jacket"><span className="product-cb product-category-cb"></span>Winter jackets</a><span className="item-qty">12</span></li>
                                </ul>
                            </div>
                            <div className="border-b border-mediumgray pb-12 mb-12 relative">
                                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[20px]">Filter by color</span>
                                <ul className="list-style filter-color">
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#black"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#363636" }}></span>Carbon black</a><span className="item-qty">25</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#blue"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#657fa8" }}></span>Prussian blue</a><span className="item-qty">03</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#brown"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#936f5e" }}></span>Light brown</a><span className="item-qty">15</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#green"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#97a27f" }}></span>Parrot green</a><span className="item-qty">40</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#orange"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#b95b5b" }}></span>Dark orange</a><span className="item-qty">29</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#blue"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#b7b5b5" }}></span>Slate blue</a><span className="item-qty">35</span></li>
                                </ul>
                            </div>
                            <div className="border-b border-mediumgray pb-12 mb-12">
                                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[26px]">Filter by price</span>
                                <MultiRangeSlider
                                    min={0}
                                    max={4000}
                                    onChange={({ min, max }) => (`min = ${min}, max = ${max}`)}
                                />
                            </div>
                            <div className="border-b border-mediumgray pb-12 mb-12 relative">
                                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[26px]">Filter by rating</span>
                                <div>
                                    <div className="flex items-center justify-between mb-[20px]">
                                        <div className="star-rating block">
                                            <span style={{ width: "100%" }} ></span>
                                        </div>
                                        <span className="text-md text-end">19</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-[20px]">
                                        <div className="star-rating block">
                                            <span style={{ width: "80%" }} ></span>
                                        </div>
                                        <span className="text-md text-end">08</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="star-rating block">
                                            <span style={{ width: "60%" }} ></span>
                                        </div>
                                        <span className="text-md text-end">06</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[30px]">Product tags</span>
                                <div className="tag-cloud d-inline-block margin-10px-top">
                                    <Link aria-label="product-tags-link" to="#">Coats</Link>
                                    <Link aria-label="product-tags-link" to="#">Cotton</Link>
                                    <Link aria-label="product-tags-link" to="#">Dresses</Link>
                                    <Link aria-label="product-tags-link" to="#">Jackets</Link>
                                    <Link aria-label="product-tags-link" to="#">Polyester</Link>
                                </div>
                            </div>
                        </m.aside>
                    </Row>
                </Container>
            </section>
            {/* Section End */}
            {/* Footer start */}
            <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
            {/* Footer End */}
        </div>
    )
}

export default LeftSidebar
