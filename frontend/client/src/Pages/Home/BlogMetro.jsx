import React from 'react'

// Libraries
import { Navbar, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// Component
import Header, { HeaderCart, HeaderNav, Menu, MobileMenu, SearchBar } from "../../Components/Header/Header";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import BlogMetro from '../../Components/Blogs/BlogMetro';
import SideButtons from "../../Components/SideButtons";
import FooterStyle01 from '../../Components/Footers/FooterStyle01';

// Data
import { blogData } from '../../Components/Blogs/BlogData';

const SocialIconData = [
  {
    color: "#0038e3",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "#0038e3",
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble"
  },
  {
    color: "#0038e3",
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  },
  {
    color: "#0038e3",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram"
  }
]

// Filter the blog data category wise
const blogMetroData = blogData.filter((item) => item.blogType === "metro");

const HomeBlogMetroPage = (props) => {
  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} className="toplogo-header absolute top-0 left-0 w-full z-10">
        <HeaderNav
          fluid="fluid"
          theme="light"
          bg="white"
          expand="lg"
          className="px-0 py-0"
          containerClass="flex-col px-[105px] xl:px-[65px] lg:px-[20px] md:px-[15px] sm:px-0 xs:flex-row xs:!flex-wrap-[inherit]"
        >
          <div className="border-b md:border-0 bg-white py-[8px] md:py-[9px] w-full">
            <Col className="col-12 col-sm-12 col-lg-8 lg:mx-auto text-center flex items-center justify-between mx-auto md:!pl-0 sm:!px-0">
              <MobileMenu className="order-first d-lg-none flex items-center" type="full" {...props} />
              <Col className="header-social-icon text-start d-lg-flex d-none ms-0 me-auto me-lg-0 border-0 p-0">
                <div className="md:hidden">
                  <SocialIcons
                    theme="social-icon-style-01"
                    size="xs"
                    iconColor="dark"
                    className="justify-start"
                    data={SocialIconData}
                  />
                </div>
              </Col>
              <Col className="navbar-brand mx-auto px-0">
                <Link aria-label="header logo" className="flex justify-center" to="/">
                  <Navbar.Brand className="inline-block py-0 m-0">
                    <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                    <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                    <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                  </Navbar.Brand>
                </Link>
              </Col>
              <Col className="flex items-center justify-end ms-auto p-0 md:flex-initial">
                <SearchBar className="py-[9px] sm:pl-[15px] text-black pl-0" />
                <HeaderCart className="py-[9px] sm:pl-[15px] text-black" style={{ "--base-color": "#0038e3" }} />
              </Col>
            </Col>
          </div>
          <Menu className="md:hidden" {...props} />
        </HeaderNav>
      </Header>
      {/* Header End */}

      {/* Section Start */}
      <section className="relative pt-0 py-[130px] px-[90px] xl:px-[45px] lg:px-0 lg:py-[90px] md:py-[75px] sm:py-[50px] z-0">
        <Container fluid>
          <Row className="justify-center">
            <Col className="px-[9px] sm:px-0">
              <BlogMetro pagination={false} overlay="#1f232c" grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large" data={blogMetroData.slice(0, 10)} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section Start */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="bg-[#262b35] text-slateblue" />
      {/* Footer End */}
    </div>
  )
}

export default HomeBlogMetroPage