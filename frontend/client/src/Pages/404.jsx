import React, { lazy } from "react";

// Libraries
import { Col, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { m } from "framer-motion";

// Components
import Header, {
  HeaderCart,
  HeaderLanguage,
  HeaderNav,
  Menu,
  SearchBar,
} from "../Components/Header/Header";
import Buttons from '../Components/Button/Buttons'
import FooterStyle01 from "../Components/Footers/FooterStyle01";
import { fadeIn } from "../Functions/GlobalAnimations";
const SideButtons = lazy(() => import("../Components/SideButtons"))

const NotFoundPage = (props) => {
  return (
    <div style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav theme="light" expand="lg" className="py-[0px] border-b border-b-[#0000001a] lg:px-[15px] md:px-0" containerClass="sm:px-0">
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
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
            <SearchBar className="pr-0 xs:pl-[15px]" />
            <HeaderLanguage className="xs:pl-[15px]" />
            <HeaderCart className="xs:pl-[15px]" style={{ "--base-color": "#0038e3" }} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <section
        className="cover-background overflow-hidden flex items-center justify-center p-0"
        style={{ backgroundImage: `url("/assets/img/webp/404-bg.webp")` }}
      >
        <Container>
          <m.div className="row items-stretch full-screen justify-center" {...fadeIn}>
            <Col xl={6} lg={7} md={8} className="col-12 text-center flex items-center justify-center flex-col" >
              <h6 className="font-serif text-fastblue font-semibold -tracking-[1px] mb-[10px] uppercase">
                Ooops!
              </h6>
              <h1 className="font-serif text-[230px] leading-[230px] font-bold tracking-[-5px] text-darkgray mb-24 lg:text-[170px] lg:leading-[170px] md:text-[130px] md:leading-[130px] md:mb-16 sm:text-[100px] sm:leading-[100px] xs:text-[55px] xs:leading-[55px] xl:text-[200px] xl:leading-[200px]">
                404
              </h1>
              <span className="font-serif font-medium text-darkgray block mb-[20px]">
                This page could not be found!
              </span>
              <Buttons className="font-medium font-serif rounded-none uppercase mb-0" to="/" themeColor={["#556fff", "#ff798e"]} size="lg" color="#fff" title="Back to homepage" />
            </Col>
          </m.div>
        </Container>
      </section>
      {/* Section End */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
      {/* Footer End */}
    </div>
  );
};

export default NotFoundPage;
