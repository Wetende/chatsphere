import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Components
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../../Components/Header/Header'
import SideButtons from "../../Components/SideButtons";

const MiniVersionPage = (props) => {
  return (
    <>
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav fluid="fluid" theme="light" bg="white" menu="light" className="px-[35px] py-[0px] md:px-0" containerClass="md:pl-0 sm:px-0">
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
          <Col className="col-auto text-right pe-0 !pl-[12px]">
            <SearchBar className="xs:pl-[15px] pr-0" />
            <HeaderLanguage className="xs:pl-[15px]" />
            <HeaderCart className="xs:pl-[15px]" style={{ "--base-color": "#0038e3" }} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <section className="bg-lightgray py-[25px]">
        <Container>
          <Row className="items-center justify-center">
            <Col xl={8} lg={6} className="md:justify-center md:flex">
              <h1 className="font-serif text-darkgray font-medium mb-0 text-lg leading-[20px] text-left">Page title mini version</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end mb-0 text-sm font-serif md:justify-center md:mt-[10px]">
              <ul className="xs:text-center">
                <li><Link aria-label="link for" to="/" className="hover:text-fastblue">Home</Link></li>
                <li><Link aria-label="link for" to="#" className="hover:text-fastblue">Pages</Link></li>
                <li>Page title mini version</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section Start */}
    </>
  )
}

export default MiniVersionPage