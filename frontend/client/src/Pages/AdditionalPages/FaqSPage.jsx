import { Formik, Form } from 'formik'
import React from 'react'

// Libraries
import * as Yup from 'yup';
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Parallax } from 'react-scroll-parallax'
import { m } from "framer-motion";

// Components
import FooterStyle01 from '../../Components/Footers/FooterStyle01';
import { Input } from '../../Components/Form/Form'
import Accordions from '../../Components/Accordion/Accordion'
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../../Components/Header/Header'
import SideButtons from "../../Components/SideButtons";
import Buttons from '../../Components/Button/Buttons'
import { fadeIn } from '../../Functions/GlobalAnimations'

// Data
const listData = [
  {
    title: "Getting started",
    content: [
      "Do I need a regular license or an extended license",
      "Any plugins that bundled with the theme I bought?",
      "Buyers guide to youtube content notices?"
    ]
  },
  {
    title: "Web and desktop",
    content: [
      "Purchasing supported and unsupported items",
      "I haven't received a response from the author",
      "Item installation guide & help documentation"
    ]
  },
  {
    title: "Market help center",
    content: [
      "Guidelines for Item comments and ratings",
      "Skrill has been reinstated as a payment option",
      "How do add or change my billing details?"
    ]
  },
  {
    title: "Buying and item support",
    content: [
      "Do I need a regular license or an extended license?",
      "I’m making a video - which license do I need?",
      "I’m making a logo. What license do I need?"
    ]
  },
  {
    title: "Tax and compliance",
    content: [
      "I’m making a logo. What license do I need?",
      "Theme is missing the style.css stylesheet error",
      "Buyer’s guide to performing rights organizations"
    ]
  },
  {
    title: "Account settings",
    content: [
      "Will I ever have to pay any fees like renewals?",
      "Skrill has been reinstated as a payment option",
      "Guidelines for item comments and ratings"
    ]
  }
]

const FaqSPage = (props) => {
  const navigate = useNavigate()

  return (
    <div style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav theme="dark" expand="lg" className="py-[0px] lg:px-[15px] md:px-0">
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0 xs:!px-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <div className="col-auto hidden order-last md:block xs:!pr-0">
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
      {/* Parallax section End */}
      <div className="md:flex md:items-center overflow-hidden relative py-[80px]">
        <Parallax className="lg-no-parallax bg-cover cover-background w-full h-[100vh] absolute top-[0px] left-0 xl:h-[700px] xl:-top-[90px] xs:h-[480px]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
        <div className="absolute top-0 left-0 w-full h-full opacity-75 bg-darkgray"></div>
        <Container>
          <Row className="justify-center items-center h-[400px] md:h-[320px] xs:h-[200px]">
            <Col lg={7} md={9} className="relative flex flex-col justify-center items-center">
              <div className="text-center mb-[40px]">
                <h1 className="text-[42px] leading-[49px] font-serif text-white font-medium mb-0 sm:text-[30px] sm:leading-[40px]">How can we help you?</h1>
              </div>
              <div className="relative w-full">
                <Formik
                  initialValues={{ search: '' }}
                  validationSchema={Yup.object().shape({ search: Yup.string().required("Field is required.") })}
                  onSubmit={async (values, actions) => {
                    await new Promise((r) => setTimeout(r, 500));
                    actions.resetForm()
                    navigate('/blogs/blog-grid', { state: { search: values } })
                  }}
                >
                  {({ isSubmitting, status }) => (
                    <div className="relative subscribe-style-05">
                      <Form className="relative">
                        <Input showErrorMsg={false} type="text" name="search" className="border-[1px] large-input border-solid border-transparent rounded-[4px]" placeholder="Type keywords to find answers" />
                        <button type="submit" className={`text-xs py-[12px] !font-semibold px-[28px] uppercase xs:text-center${isSubmitting ? " loading" : ""}`}><i className="fas fa-search text-fastblue text-xs leading-none mr-[10px] xs:mr-0"></i>search</button>
                      </Form>
                    </div>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Parallax section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container fluid className="px-[12%] xl:px-[10%] lg:px-[3%]">
          <Row>
            <Col className="col-12 text-center mb-28">
              <span className="block font-serif mb-[5px]">Most common questions</span>
              <h5 className="font-serif text-darkgray font-semibold mb-0">Frequently asked questions</h5>
            </Col>
          </Row>
          <Row className="gap-y-[30px]">
            {listData.map((item, i) => {
              return (
                <m.div className="col-12 col-lg-4 col-sm-6" key={i} {...fadeIn}>
                  <div className="faqs-page-list bg-white rounded box-shadow-small p-16 lg:p-12 h-full">
                    <span className="font-serif text-xmd text-darkgray font-medium block mb-[15px]">{item.title}</span>
                    <ul className="p-0 list-style text-start mb-[15px]">
                      {item.content && item.content.map((item, i) => {
                        return (
                          <li key={i}><Link to="#" className="hover:text-fastblue">{item}</Link></li>
                        )
                      })}
                    </ul>
                    <Buttons ariaLabel="Agency info" href="#" className="font-medium font-serif uppercase btn-link !tracking-[.5px] after:h-[2px] after:bg-fastblue hover:text-fastblue" size="md" color="#0038e3" title="See all articles" />
                  </div>
                </m.div>
              )
            })}
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="items-center justify-center">
            <Col className="col-12 text-center mb-28">
              <m.span {...fadeIn} className="block font-serif mb-[5px]">No helpful answer?</m.span>
              <m.h5 {...{ ...fadeIn, transition: { delay: 0.2 } }} className="font-serif text-darkgray font-semibold mb-0">Here are some options</m.h5>
            </Col>
          </Row>
          <Row className="justify-center gap-y-[30px]">
            <Col lg={6} md={9}>
              <m.div {...{ ...fadeIn, transition: { delay: 0.4 } }} className="rounded-[4px] bg-fastblue overflow-hidden p-16 flex">
                <div className="mr-[35px]">
                  <i className="line-icon-Hipster-Headphones text-[60px] text-white"></i>
                </div>
                <div className="pl-[15px]">
                  <span className="font-serif text-xmd font-medium mb-[10px] block text-white">Help desk support</span>
                  <p className="text-white opacity-60 w-[90%] lg:w-full mb-[20px]">Lorem ipsum is simply dummy text of the and typesetting industry lorem ipsum.</p>
                  <Buttons ariaLabel="faq" href="#" className="font-medium font-serif uppercase btn-link !tracking-[.5px] after:h-[2px] after:bg-[#fff] hover:opacity-70 hover:text-white" size="xl" color="#fff" title="Browse topics" />
                </div>
              </m.div>
            </Col>
            <Col lg={6} md={9}>
              <m.div {...{ ...fadeIn, transition: { delay: 0.6 } }} className="rounded-[4px] bg-[#27ae60] overflow-hidden p-16 flex">
                <div className="mr-[35px]">
                  <i className="line-icon-MaleFemale text-[60px] text-white"></i>
                </div>
                <div className="pl-[15px]">
                  <span className="font-serif text-xmd font-medium mb-[10px] block text-white">Live chat support</span>
                  <p className="text-white opacity-60 w-[90%] lg:w-full mb-[20px]">Lorem ipsum is simply dummy text of the and typesetting industry lorem ipsum.</p>
                  <Buttons ariaLabel="faq" href="#" className="font-medium font-serif uppercase btn-link !tracking-[.5px] after:h-[2px] after:bg-[#fff] hover:opacity-70 hover:text-white" size="xl" color="#fff" title="customer care" />
                </div>
              </m.div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="items-center justify-center">
            <Col className="col-12 text-center mb-28">
              <m.span {...fadeIn} className="block font-serif mb-[5px]">Most common questions</m.span>
              <m.h5 {...{ ...fadeIn, transition: { delay: 0.2 } }} className="font-serif text-darkgray font-semibold mb-0">Most popular topics</m.h5>
            </Col>
            <Col lg={6} className="col-12 md:mb-[50px] sm:mb-[30px]">
              <Accordions theme="accordion-style-03" className="" animation={fadeIn} />
            </Col>
            <Col lg={6}>
              <Accordions theme="accordion-style-03" className="" animation={fadeIn} />
            </Col>
            <Col className="col-12 text-center mt-20">
              <Buttons ariaLabel="faq" href="#" className="mx-3 font-medium font-serif uppercase rounded-none lg:mb-[15px]" themeColor={["#556fff", "#ff798e"]} size="lg" color="#fff" title="Browse all topics" />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
      {/* Footer End */}
    </div>
  )
}

export default FaqSPage