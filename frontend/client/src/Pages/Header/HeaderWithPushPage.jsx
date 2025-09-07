import React from 'react'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'
import Buttons from '../../Components/Button/Buttons'
import FooterStyle01 from '../../Components/Footers/FooterStyle01'
import Header, { HamburgerMenu, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../../Components/Header/Header'
import IconWithText from '../../Components/IconWithText/IconWithText'
import { TiltBox } from '../../Components/FancyText/FancyText'
import { Input } from '../../Components/Form/Form'
import SocialIcons from "../../Components/SocialIcon/SocialIcons"
import MessageBox from "../../Components/MessageBox/MessageBox"
import SideButtons from "../../Components/SideButtons";
import ReactCustomScrollbar from "../../Components/ReactCustomScrollbar"
import StaticInstagram from "../../Components/Instagram/StaticInstagram"
import { resetForm, sendEmail } from "../../Functions/Utilities"

// Libraries
import * as Yup from 'yup';
import { Parallax } from "react-scroll-parallax";
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Form, Formik } from "formik"
import { AnimatePresence, m } from 'framer-motion'

// Data
const IconWithTextData = [
  {
    icon: "line-icon-Money-Bag text-[#828282] text-[40px]",
    title: "Effective strategy",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  },
  {
    icon: "line-icon-Gear-2 text-[40px] text-[#828282]",
    title: "Powerfull customize",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  },
  {
    icon: "line-icon-Talk-Man text-[40px] text-[#828282]",
    title: "Customer satisfaction",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  },
  {
    icon: "line-icon-Cursor-Click2 text-[40px] text-[#828282]",
    title: "No coding required",
    content: "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
  },
]

const SocialIconsData = [
  {
    color: "#3b5998",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "#ea4c89",
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble"
  },
  {
    color: "#00aced",
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  },
  {
    color: "#fe1f49",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram"
  },
  {
    color: "#0077b5",
    link: "https://www.linkedin.com/",
    icon: "fab fa-linkedin-in"
  },
]

const HeaderWithPushPage = (props) => {
  return (
    <>
      <div style={props.style}>

        {/* Header Start */}
        <Header className="headerwithpush-header" topSpace={{ md: true }} type="reverse-scroll">
          <HeaderNav theme="dark" fluid="fluid" expand="lg" containerClass="sm:px-0" className="py-[0px] px-[35px] border-b border-[#ffffff1a] md:pr-[15px] md:pl-0">
            <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
              <Link aria-label="header logo" className="flex items-center" to="/">
                <Navbar.Brand className="inline-block p-0 m-0">
                  <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                  <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                  <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                </Navbar.Brand>
              </Link>
            </Col>
            <Navbar.Toggle className="order-last md:ml-[25px] sm:ml-[15px]">
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
            </Navbar.Toggle>
            <Navbar.Collapse className="col-auto menu-order px-lg-0 justify-end">
              <Menu {...props} />
            </Navbar.Collapse>
            <Col className="col-auto text-end hidden-xs pe-0 font-size-0">
              <SearchBar className="xs:pl-[15px]" />
              <HeaderLanguage className="xs:pl-[15px]" />
              <span className="md:hidden pl-[17px]">
                <HamburgerMenu className="" theme="dark">
                  <Col className="flex flex-col justify-center px-[50px] py-[70px] w-[500px] h-[100vh] shadow-[0_0_20px_rgba(0,0,0,0.3)] right-0 text-center bg-white">
                    <ReactCustomScrollbar className="pl-[15px]" theme="dark">
                      <div>
                        <h1 className="mb-0 font-bold tracking-[-3px] text-darkgray tracking-[-3px] font-serif uppercase">Hello</h1>
                        <p className="text-lg text-fastblue font-serif uppercase block">Let's be friends.</p>
                        <div className="my-20 w-full">
                          <StaticInstagram />
                        </div>
                        <div className="mb-20 text-center">
                          <p className="w-[70%] mb-12 text-darkgray leading-[26px] text-lg font-serif mx-auto inline-block">Get latest update for our trusted applications</p>
                          <Formik
                            initialValues={{ email: '' }}
                            validationSchema={Yup.object().shape({ email: Yup.string().email("Invalid email.").required("Field is required."), })}
                            onSubmit={async (values, actions) => {
                              actions.setSubmitting(true)
                              const response = await sendEmail(values)
                              response.status === "success" && resetForm(actions)
                            }}
                          >
                            {({ isSubmitting, status }) => (
                              <div className="relative subscribe-style-05">
                                <Form className="relative">
                                  <Input showErrorMsg={false} type="email" name="email" className="border-[1px] medium-input rounded-[5px] border-solid border-[#dfdfdf]" placeholder="Enter your email address" />
                                  <button aria-label="Subscribe" type="submit" className={`text-xs leading-[18px] py-[12px] px-[28px] uppercase xs:text-center${isSubmitting ? " loading" : ""}`}><i className="far fa-envelope text-fastblue text-sm leading-none mr-[10px] xs:mr-0"></i>Subscribe</button>
                                </Form>
                                <AnimatePresence>
                                  {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-[25px] top-[115%] left-0 w-full"><MessageBox className="rounded-[4px] text-md py-[10px] px-[22px] z-10" theme="message-box01" variant="success" message="Your message has been sent successfully subscribed to our email list!" /></m.div>}
                                </AnimatePresence>
                              </div>
                            )}
                          </Formik>
                        </div>
                        <div className="mb-[10px] text-center">
                          <SocialIcons theme="social-icon-style-01" size="sm" iconColor="dark" data={SocialIconsData} />
                        </div>
                      </div>
                    </ReactCustomScrollbar>
                  </Col>
                </HamburgerMenu>
              </span>
            </Col>
          </HeaderNav>
        </Header>
        {/* Header End */}
        <SideButtons />
        {/* Parallax Section Start */}
        <div className="full-screen relative overflow-hidden landscape:md:h-[600px]">
          <Parallax className="lg-no-parallax bg-cover absolute top-[0px] left-0 w-full h-[100vh] bg-center md:top-[-30px] landscape:md:h-[600px]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1080)` }}></Parallax>
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)]"></div>
          <Container className="relative h-[100vh] flex items-center justify-center landscape:md:h-[600px]">
            <Row className="justify-center items-center">
              <Col className="z-0 text-center justify-center full-screen flex-col col-12 col-xl-8 col-md-10 col-lg-9 flex landscape:md:h-[600px]">
                <TiltBox>
                  <div className="relative p-[7.5rem] rounded-[6px] bg-black lg:p-[4.5rem] xs:p-[22px]">
                    <i className="line-icon-French-Fries inline-block mb-14 text-white text-[70px] leading-[80px]"></i>
                    <h1 className="mb-14 bg-center font-semibold tracking-[-4px] text-neonorange text-[100px] leading-[95px] font-serif uppercase mx-auto lg:text-[90px] lg:leading-[90px] md:text-[70px] md:leading-[65px] sm:text-[45px] sm:leading-[43px] sm:-tracking-[1px] image-mask xs:w-[90%] xs:mx-auto xxs:w-full" style={{ backgroundImage: `url(https://via.placeholder.com/1920x1080)` }}> DELICIOUS COOKING</h1>
                    <span className="font-medium tracking-[3px] text-md text-serif uppercase block">EXPERIENCE THE TASTE OF ITALY</span>
                  </div>
                </TiltBox>
              </Col>
            </Row>
          </Container>
        </div>
        {/* Parallax Section End */}

        {/* About Start */}
        <section className="py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
          <Container>
            <Row className="justify-center">
              <m.div className="flex flex-col md:mb-24 col-xl-3 col-lg-4 col-sm-7" {...fadeIn}>
                <div className="mb-[20px] md:text-center sm:mb-[10px]">
                  <span className="font-serif text-md uppercase font-medium text-[#828282]">About company</span>
                </div>
                <h5 className="alt-font text-darkgray font-semibold font-serif mb-[20px] md:text-center md:mb-[30px] xs:w-[90%] xs:mx-auto">We combine design, thinking and technical</h5>
                <div className="mt-auto mx-auto mx-lg-0">
                  <Buttons ariaLabel="link for" to="/" className="btn-fill btn-fancy rounded-none mt-[82px] tracking-[1px] font-medium font-serif uppercase md:my-0" themeColor="#232323" color="#fff" size="sm" title="Discover litho" />
                </div>
              </m.div>
              <div className="col-xl-7 col-lg-8 offset-xl-2">
                <IconWithText grid="row-cols-1 row-cols-lg-2 row-cols-sm-2 gap-y-[60px] sm:gap-y-[30px] xs:gap-y-[40px]" theme="icon-with-text-01" data={IconWithTextData} animation={fadeIn} animationDelay={0.2} />
              </div>
            </Row>
          </Container>
        </section>
        {/* About End */}
        {/* Footer Start */}
        <FooterStyle01 theme="dark" className="bg-darkgray" />
        {/* Footer End */}
      </div>
    </>
  )
}

export default HeaderWithPushPage
