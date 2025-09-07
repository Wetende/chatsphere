import React from 'react'

// Components
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import FooterStyle01 from "../../Components/Footers/FooterStyle01";
import OnlyCategories from '../../Components/Products/OnlyCategories';
import { fadeIn } from '../../Functions/GlobalAnimations';
import SideButtons from "../../Components/SideButtons";

// Libraries
import { Col, Container, Row, Navbar } from 'react-bootstrap'
import { Parallax } from "react-scroll-parallax";
import { Link } from "react-router-dom";
import { m } from 'framer-motion'

// Data
import { onlyCategoriesData } from '../../Components/Products/ProductData'

const OnlyCategoriesPage = (props) => {
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
      <m.div className="overflow-hidden pb-[80px] md:py-[40px]" {...fadeIn}>
        <Parallax className="lg-no-parallax bg-cover absolute top-0 left-0 w-full h-full" translateY={[-40, 40]} style={{ backgroundImage: `url(/assets/img/webp/portfolio-bg.webp)` }}></Parallax>
        <Container className="h-full relative">
          <Row className="justify-center h-[300px] sm:h-[250px] m-0 items-stretch w-full">
            <Col xl={6} lg={7} md={9} className="text-center flex justify-center flex-col font-serif xs:px-0">
              <h1 className="text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] mb-[15px] leading-[20px] inline-block text-xmd">Shop by categories</h1>
              <h2 className="text-darkgray font-medium -tracking-[1px] mb-0">Shop categories</h2>
            </Col>
          </Row>
        </Container>
      </m.div>
      {/* Parallax Section End */}

      {/* Section Start*/}
      <section className="bg-[#fff] relative pt-0 py-[130px] px-[5%] xl:px-[1%] md:px-0 lg:py-[90px] md:py-[75px] sm:py-[50px] xs:px-0">
        <Container fluid>
          <Row>
            <Col className="sm:px-0">
              <OnlyCategories overlay="transparent" grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={onlyCategoriesData} />
            </Col>
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

export default OnlyCategoriesPage