import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FooterStyle01 from "../Components/Footers/FooterStyle01"

// Components
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../Components/Header/Header'
import Lists from "../Components/Lists/Lists"

// Data

const ListData = [
    {
        content: "This policy applies where we are acting as a data controller with respect to the personal data.",
    },
    {
        content: "By using our website and agreeing to this policy, you consent to our use of cookies in accordance.",
    },
    {
        content: "Our website incorporates privacy controls which affect how we will process your personal data.",
    },
    {
        content: "Theme advantages are pixel perfect design clear code delivered.",
    },
]

const Privacy = (props) => {
  return (
    <div style={props.style}>
          {/* Header Start */}
          <Header topSpace={{ desktop: true }} type="reverse-scroll">
                <HeaderNav fluid="fluid" theme="light" bg="white" menu="light" containerClassName="sm:px-0" className="px-[35px] py-[0px] md:pr-[15px] md:pl-0">
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
             {/* Section Start */}
      <section className="bg-lightgray py-[40px] sm:py-[30px]">
        <Container>
          <Row className="xs:text-center">
            <Col xl={8} lg={6} className="flex md:justify-center md:mb-[15px] sm:block sm:text-center">
              <h1 className="text-lg text-darkgray font-medium mb-0 font-serif inline-block">Privacy policy</h1>
              <span className="font-serif text-md relative pl-[25px] ml-[25px] block sm:mt-[5px] sm:p-0 before:absolute before:bg-darkgray before:content-[''] before:h-[12px] before:top-[4px] before:w-[2px] before:left-0 sm:before:hidden sm:ml-0">Professional multi-purpose template</span>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end px-[15px] text-sm font-serif m-0 md:justify-center">
              <ul>
                <li><Link aria-label="link for" to="/">Home</Link></li>
                <li><Link aria-label="link for" to="#">Pages</Link></li>
                <li>Privacy policy</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}
      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
            <Container>
                <Row className="items-center justify-center">
                    <Col lg={9} md={12} className="col-12">
                        <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">General information</h6>
                        <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry’s standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electronic typesetting, essentially unchanged.</p>
                        <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">Lorem ipsum has been the industry’s standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <p className="mb-0">&nbsp;</p>
                        <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">Policy introduction</h6>
                        <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">It has survived not only five centuries, but also the leap electronic typesetting, essentially unchanged. Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry’s standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <Lists theme="list-style-06" data={ListData} animationDelay={0} />
                        <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">Lorem ipsum has been the industry’s standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <p className="mb-0">&nbsp;</p>
                        <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">Providing your personal data to others</h6>
                        <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry’s standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>
                        <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">Lorem ipsum has been the industry’s standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <p className="mb-0">&nbsp;</p>
                        <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">Personally Identifiable Information</h6>
                        <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release.</p>
                    </Col>
                </Row>
            </Container>
        </section>
        {/* Section End */}

        {/* Footer start  */}
        <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
                {/* Footer end */}
    </div>
  )
}

export default Privacy