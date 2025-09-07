import React from 'react'

// Libraries
import { Col, Container, Row, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom";

// Components
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../../Components/Header/Header';
import FooterStyle01 from '../../Components/Footers/FooterStyle01';
import SideButtons from "../../Components/SideButtons";

// Data
import { FeatherIconData } from "./IconData"

const FeatherIconPage = (props) => {
  return (
    <>
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav fluid="fluid" theme="light" bg="white" menu="light" className="px-[35px] py-[0px] md:px-0" containerClass="sm:px-0">
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
          <Navbar.Collapse className="col-auto px-0 justify-end">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto text-right pe-0">
            <SearchBar className="xs:pl-[15px] pr-0" />
            <HeaderLanguage className="xs:pl-[15px]" />
            <HeaderCart className="xs:pl-[15px]" style={{ "--base-color": "#0038e3" }} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Feather icon</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" className="hover:text-white">Features</Link></li>
                <li> Feather icon</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] px-[7%] lg:px-[4%] md:px-[15px] xs:px-0">
        <Container fluid>
          <Row xl={4} lg={3} sm={2} xs={1} className="gap-y-10 justify-center">
            {
              FeatherIconData.map((item, i) => {
                return (
                  <Col key={i}>
                    <div className="rounded-[4px] h-full p-[30px] bg-white shadow-[0_0_20px_rgba(0, 0, 0, 0.05)] hover:translate-y-[-3px] hover:shadow-[0_0_20px_rgba(0, 0, 0, 0.5)] transition-default">
                      <i className={`mr-[20px] ${item} text-[40px] align-middle text-fastblue`}></i>
                      <span>{item}</span>
                    </div>
                  </Col>
                )
              })
            }
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
    </>
  )
}

export default FeatherIconPage