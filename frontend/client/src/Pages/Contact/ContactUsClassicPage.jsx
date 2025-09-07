import React, { useRef } from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-scroll-parallax';
import { AnimatePresence, m } from 'framer-motion'
import { Form, Formik } from 'formik';

// Components
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import { fancyTextBox02 } from '../../Components/FancyTextBox/FancyTextBoxData';
import SocialIcons from '../../Components/SocialIcon/SocialIcons';
import FancyTextBox from '../../Components/FancyTextBox/FancyTextBox';
import { ContactFormStyle03Schema } from '../../Components/Form/FormSchema';
import { Checkbox, Input, TextArea } from '../../Components/Form/Form'
import { fadeIn } from '../../Functions/GlobalAnimations';
import MessageBox from '../../Components/MessageBox/MessageBox';
import Buttons from '../../Components/Button/Buttons'
import FooterStyle01 from '../../Components/Footers/FooterStyle01';
import GoogleMap from '../../Components/GoogleMap/GoogleMap';
import { resetForm, sendEmail } from '../../Functions/Utilities';
import SideButtons from "../../Components/SideButtons";

//Data
const SocialIconsData = [
  {
    color: "#3b5998",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
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
    color: "#007bb6",
    link: "https://www.linkedin.com/",
    icon: "fab fa-linkedin-in"
  },
]


const ContactUsClassicPage = (props) => {
  const form = useRef(null)
  return (
    <div style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav theme="dark" expand="lg" className="py-[0px] lg:px-[15px] md:px-0" containerClass="sm:px-0">
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
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
      {/* Parallax Scrolling Start */}
      <m.div className="md:flex md:items-center overflow-hidden relative md:h-[465px] sm:h-[350px] xs:h-[357px]" {...fadeIn}>
        <Parallax className="lg-no-parallax bg-cover cover-background absolute left-0 h-[120vh] top-[60px] lg:h-[64vh] lg:top-[-46px] lg:!translate-y-0 md:h-[60vh] md:-top-[30px] sm:top-[-44px] sm:h-[49vh] xs:top-0 xs:h-[40vh] w-full" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
        <div className="absolute h-full w-full opacity-75 top-0 left-0 bg-gradient-to-tr from-[#0039e3] via-[#5e28dd] to-[#8600d4]"></div>
        <Container className="h-full relative">
          <Row className="justify-center h-full">
            <Col xl={6} lg={7} md={10} className="text-center flex h-[560px] lg:h-[480px] md:h-[450px] sm:h-[350px] justify-center flex-col font-serif">
              <span className="inline-block opacity-60 mb-[5px] text-white">Unlimited customization possibilities</span>
              <h1 className="text-white text-[42px] leading-[49px] sm:text-[30px] sm:leading-10 font-medium mb-0">Contact us classic</h1>
            </Col>
          </Row>
        </Container>
      </m.div>
      {/* Parallax Scrolling End */}

      {/* Section Start */}
      <m.section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="sm:justify-center">
            <Col xs={12} sm={8} md={12}>
              <FancyTextBox
                grid="justify-center row-cols-1 row-cols-md-2 row-cols-lg-3 md:gap-y-[30px] xs:gap-y-[15px]"
                theme="fancy-text-box-02"
                data={fancyTextBox02}
                animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col xl={6} lg={7} className="text-center mb-[4.5rem] md:mb-12">
              <span className="font-serif mb-[5px] -tracking-[.5px] text-xmd block">Fill out the form and we'll be in touch soon!</span>
              <h4 className="font-serif font-semibold text-darkgray">How we can help you?</h4>
            </Col>
            <Col className="col-xl-10 col-sm-12 col-xs-12">
              <Formik
                initialValues={{ name: '', email: '', phone: '', comment: '', terms_condition: false }}
                validationSchema={ContactFormStyle03Schema}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true)
                  const response = await sendEmail(values)
                  response.status === "success" && resetForm(actions)
                }}
              >
                {({ isSubmitting, status }) => (
                  <Form ref={form}>
                    <Row className="row-cols-1 row-cols-md-2">
                      <Col className="mb-16 sm:mb-[25px]">
                        <Input showErrorMsg={false} type="text" name="name" className="py-[15px] px-[20px] text-md w-full border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Your name" />
                        <Input showErrorMsg={false} type="email" name="email" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Your email address" />
                        <Input showErrorMsg={false} type="tel" name="phone" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" placeholder="Mobile number" />
                      </Col>
                      <Col className="mb-16 sm:mb-[20px]">
                        <TextArea className="border-[1px] border-solid border-[#dfdfdf] w-full py-[15px] px-[20px] text-md h-[210px] resize-none" rows="6" name="comment" placeholder="Your message"></TextArea>
                      </Col>
                      <Col className="text-left sm:mb-[20px]">
                        <Checkbox type="checkbox" name="terms_condition" className="inline-block mt-[4px]" labelClass="flex items-start">
                          <span className="ml-[10px] text-sm inline-block w-[85%]">I accept the terms & conditions and I understand that my data will be hold securely in accordance with the<Link aria-label="checkbox" to="/privacy" target="_blank" className="text-darkgray underline hover:text-fastblue"> privacy policy</Link>.</span>
                        </Checkbox>
                      </Col>
                      <Col className="text-right sm:text-center">
                        <Buttons type="submit" className={`text-xs tracking-[1px] rounded-none py-[12px] px-[28px] uppercase${isSubmitting ? " loading" : ""}`} themeColor={["#b884fd", "#fe73a8", "b884fd"]} size="md" color="#fff" title="Send Message" />
                      </Col>
                    </Row>
                    <AnimatePresence>
                      {status && <Row><Col xs={12}><div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="mt-[20px] py-[10px]" theme="message-box01" variant="success" message="Your message has been sent successfully!" /></div></Col></Row>}
                    </AnimatePresence>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] relative z-1 fancy-box-background overflow-hidden cover-background" style={{ backgroundImage: 'url(https://via.placeholder.com/1929x807)' }}>
        <div className="-z-[1] opacity-50 absolute h-full w-full  top-0 left-0 bg-gradient-to-tr from-[#556fff] via-[#b263e4] to-[#ff798e]"></div>
        <Container>
          <Row className="justify-center">
            <Col lg={7} md={9} className="col-12 text-center mb-[108px] lg:mb-[90px] sm:mb-14">
              <span className="font-serif text-white text-xmd opacity-80 block mb-[5px]">Fill out the form and we’ll be in touch soon!</span>
              <h4 className="font-serif font-semibold text-white mb-0">Litho offices round the world</h4>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={4} md={6} sm={8} className="col-12 fancy-box-item md:mb-[30px] xs:mb-[15px]">
              <div className="bg-banner-image cover-background" style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1100)' }}>
                <div className="opacity-medium -z-[1] absolute h-full w-full opacity-70 top-0 left-0 bg-gradient-to-tr from-[#556fff] via-[#b263e4] to-[#ff798e]"></div>
              </div>
              <div className="relative feature-box-main px-16 py-12 rounded-[5px] overflow-hidden lg:px-12">
                <div className="flex items-center">
                  <img width="16" height="16" loading="lazy" src="/assets/img/webp/contact-us-img-flag-01.webp" className="w-[35px] block feature-box-icon mr-[15px]" alt='UK' />
                  <span className="feature-box-content font-serif block font-medium transition-default text-darkgray">UK - London</span>
                </div>
                <div className="bg-mediumgray inline-block mt-[20px] mb-[9px] w-full h-[1px]"></div>
                <p className="mb-[20px] w-[85%] lg:w-full sm:w-[75%] xs:w-[85%]">401 Broadway, 24th Floor Orchard View, London, UK</p>
                <span className="block font-medium mt-[10px] transition-default text-darkgray leading-[20px] w-full">Phone: 123 456 7890</span>
                <a aria-label="mail" href="mailto:info@yourdomain.com" className="text-fastblue underline">info@yourdomain.com</a>
              </div>
            </Col>
            <Col lg={4} md={6} sm={8} className="col-12 fancy-box-item md:mb-[30px] xs:mb-[15px]">
              <div className="bg-banner-image cover-background" style={{ backgroundImage: 'url(https://via.placeholder.com/1920x805)' }}>
                <div className="opacity-medium -z-[1] absolute h-full w-full opacity-70 top-0 left-0 bg-gradient-to-tr from-[#556fff] via-[#b263e4] to-[#ff798e]"></div>
              </div>
              <div className="relative feature-box-main px-16 py-12 rounded-[5px] overflow-hidden lg:px-12">
                <div className="flex items-center">
                  <img width="16" height="16" loading="lazy" src="/assets/img/webp/contact-us-img-flag-02.webp" className="w-[35px] block feature-box-icon mr-[15px]" alt='Paris' />
                  <span className="feature-box-content font-serif block font-medium transition-default text-darkgray">France - Paris</span>
                </div>
                <div className="bg-mediumgray inline-block mt-[20px] mb-[9px] w-full h-[1px]"></div>
                <p className="mb-[20px] w-[85%] lg:w-full sm:w-[75%] xs:w-[85%]">27 Eden Walk Eden Centre Orchard View, Paris, France</p>
                <span className="block font-medium mt-[10px] transition-default text-darkgray leading-[20px] w-full">Phone: 123 456 7890</span>
                <a aria-label="mail" href="mailto:info@yourdomain.com" className="text-fastblue underline">info@yourdomain.com</a>
              </div>
            </Col>
            <Col lg={4} md={6} sm={8} className="col-12 fancy-box-item md:mb-[30px] xs:mb-[15px]">
              <div className="bg-banner-image cover-background" style={{ backgroundImage: 'url(https://via.placeholder.com/1920x805)' }}>
                <div className="opacity-medium -z-[1] absolute h-full w-full opacity-70 top-0 left-0 bg-gradient-to-tr from-[#556fff] via-[#b263e4] to-[#ff798e]"></div>
              </div>
              <div className="relative feature-box-main px-16 py-12 rounded-[5px] overflow-hidden lg:px-12">
                <div className="feature-box-icon mr-[15px] flex items-center">
                  <img width="16" height="16" loading="lazy" src="/assets/img/webp/contact-us-img-flag-03.webp" className="w-[35px] block mr-[15px]" alt='Canada' />
                  <span className="feature-box-content font-serif block font-medium transition-default text-darkgray">Canada - Toronto</span>
                </div>
                <div className="bg-mediumgray inline-block mt-[20px] mb-[9px] w-full h-[1px]"></div>
                <p className="mb-[20px] w-[85%] lg:w-full sm:w-[75%] xs:w-[85%]">523 North Stockport Road Canal Bridge, Toronto, Canada</p>
                <span className="block font-medium mt-[10px] transition-default text-darkgray leading-[20px] w-full">Phone: 123 456 7890</span>
                <a aria-label="mail" href="mailto:info@yourdomain.com" className="text-fastblue underline">info@yourdomain.com</a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[100px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center items-center">
            <Col xs={12} xl={3} lg={4} md={5} sm={6} className="lg:flex lg:justify-end xs:mb-[20px] xs:justify-center">
              <span className="font-serif font-medium text-xlg text-darkgray inline-block -tracking-[.5px] lg:text-lg">Connect with social media</span>
            </Col>
            <Col xs={12} md={2} className="block sm:hidden">
              <span className="w-full h-[1px] inline-block bg-mediumgray"></span>
            </Col>
            <Col xs={12} xl={3} lg={4} md={5} sm={6}>
              <SocialIcons theme="social-icon-style-01" className="justify-left xs:justify-center xs:text-center" size="sm" iconColor="dark" data={SocialIconsData} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section Start */}

      {/* Section Start */}
      <section>
        <GoogleMap
          className="grayscale h-[600px] p-0 md:h-[450px] xs:h-[300px]"
          location="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.843821917424!2d144.956054!3d-37.817127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sin!4v1427947693651"
        />
      </section>
      {/* Section End */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="bg-[#262b35] text-slateblue" />
      {/* Footer End */}
    </div>
  )
}

export default ContactUsClassicPage