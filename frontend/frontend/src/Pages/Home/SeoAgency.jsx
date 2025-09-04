import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Parallax } from "react-scroll-parallax";

// Components
import Header, { HeaderNav, Menu } from '../../Components/Header/Header'
import { fadeIn, fadeInLeft, zoomIn } from '../../Functions/GlobalAnimations'
import Buttons from '../../Components/Button/Buttons'
import CustomModal from '../../Components/CustomModal'
import Clients from '../../Components/Clients/Clients'
import { Input } from '../../Components/Form/Form'
import MessageBox from '../../Components/MessageBox/MessageBox';
import IconWithText from '../../Components/IconWithText/IconWithText'
import PricingTable01 from '../../Components/PricingTable/PricingTable01'
import FooterStyle06 from '../../Components/Footers/FooterStyle06';
import { resetForm, sendEmail } from "../../Functions/Utilities";
import ProcessStep from '../../Components/ProcessStep/ProcessStep'
import SocialIcons from '../../Components/SocialIcon/SocialIcons'
import TestimonialsCarousel09 from '../../Components/TestimonialCarousel/TestimonialsCarousel09'
import Overlap from '../../Components/Overlap/Overlap'
import SideButtons from "../../Components/SideButtons";
import InViewPort from "../../Components/InViewPort";

// Data
import { ClientData05 } from '../../Components/Clients/ClientsData'
import { pricingTable01 } from '../../Components/PricingTable/PricingTableData'
import { ProcessStepData04 } from '../../Components/ProcessStep/ProcessStepData'
import { TestimonialsCarouselData9 } from '../../Components/TestimonialCarousel/TestimonialsCarouselData'
import { IconWithTextData_09 } from '../../Components/IconWithText/IconWithTextData'

const SocialIconsData = [
  {
    color: "#828282",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "#828282",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram"
  },
  {
    color: "#828282",
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  }
]

const IconWithTextData = [
  {
    icon: "line-icon-Sand-watch2 text-[40px] text-gradient bg-gradient-to-r from-[#ec606c] via-[#ee6362] via-[#ee6757] vai-[#ed6c4d] to-[#eb7242]",
    title: "Scientific website optimization",
    content: "Lorem ipsum dolor amet consectetur adipiscing elit sed do eiusmod tempor incididunt.",
  },
  {
    icon: "line-icon-Money-Bag text-[40px] text-gradient bg-gradient-to-r from-[#ec606c] via-[#ee6362] via-[#ee6757] vai-[#ed6c4d] to-[#eb7242]",
    title: "Generating increased revenue",
    content: "Lorem ipsum dolor amet consectetur adipiscing elit sed do eiusmod tempor incididunt.",
  },
  {
    icon: "line-icon-Male text-[40px] text-gradient bg-gradient-to-r from-[#ec606c] via-[#ee6362] via-[#ee6757] vai-[#ed6c4d] to-[#eb7242]",
    title: "Rapid interaction with clients",
    content: "Lorem ipsum dolor amet consectetur adipiscing elit sed do eiusmod tempor incididunt.",
  },
]

const SeoAgencyPage = (props) => {
  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav theme="light" expand="lg" className="py-[0px] px-[35px] lg:px-[15px] md:px-[15px] md:py-[20px] sm:px-0">
          <Col lg={2} sm={6} xs={"auto"} className="mr-auto ps-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-gradient-magenta-orange.webp' data-rjs='/assets/img/webp/logo-gradient-magenta-orange@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-gradient-magenta-orange.webp' data-rjs='/assets/img/webp/logo-gradient-magenta-orange@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-gradient-magenta-orange.webp' data-rjs='/assets/img/webp/logo-gradient-magenta-orange@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Navbar.Toggle className="order-last md:ml-[17px] md:px-[15px] sm:px-0">
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="justify-center col-auto col-lg-8">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col lg={2} xs={"auto"} className="justify-end pe-0 flex items-center">
            <SocialIcons theme="social-icon-style-01 block text-end" iconColor="dark" size="xs" data={SocialIconsData} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}

      {/* Section Start */}
      <section className="py-[160px] overflow-hidden cover-background sm:py-[80px]" style={{ backgroundImage: `url('/assets/img/webp/home-seo-agency-bg-01.webp')` }}>
        <Container>
          <Row className="items-center h-[720px] lg:h-[500px] sm:h-[550px] xs:h-[750px] overflow-hidden">
            <Col xl={5} md={6} className="sm:mb-[40px] overflow-hidden">
              <h2 className="heading-5 font-serif font-semibold text-[#374162] uppercase mb-[5px]">Receive your free</h2>
              <h1 className="font-serif font-bold uppercase text-gradient bg-gradient-to-r from-[#ec606c] via-[#ee6757] to-[#eb7242] mb-[25px] tracking-[-1px]">Seo report</h1>
              <p className="w-[90%] text-lg mb-[45px] leading-[30px] xs:text-xmd">Start working with an company that can provide everything you need to generate awareness.</p>
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
                  <div className="relative subscribe-style-05 mt-[20px] mb-[30px]">
                    <Form className="relative w-[95%] rounded-md">
                      <Input showErrorMsg={false} type="email" name="email" className="overflow-hidden rounded-md border-[1px] large-input border-solid border-transparent shadow-[0_0_30px_rgba(0,0,0,0.08)]" placeholder="Enter your email address" />
                      <button aria-label="subscribe button" type="submit" className={`text-xs tracking-[1px] py-[12px] px-[28px] -bottom-[2px] !border-0 uppercase xs:text-center${isSubmitting ? " loading" : ""}`}><i className="far fa-envelope text-neonorange text-lg leading-none xs:mr-0"></i></button>
                    </Form>
                    <AnimatePresence>
                      {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute !z-[1] mt-[25px]"><MessageBox className="rounded-[4px] text-md py-[10px] px-[20px] w-[95%]" theme="message-box01" variant="success" message="Your message has been sent successfully subscribed to our email list!" /></m.div>}
                    </AnimatePresence>
                  </div>
                )}
              </Formik>
              <Buttons ariaLabel="link for pricing-packages" to="/page/pricing-packages" className="mr-[38px] rounded-[4px] font-medium font-serif uppercase md:mb-[15px]" themeColor={["#ec606c", "#eb7242"]} size="xl" color="#fff" title="Get started now" />
              {/* Modal Component Start */}
              <CustomModal.Wrapper className="inline-block"
                modalBtn={<Buttons ariaLabel="link for modal button" type="submit" className="font-medium font-serif xs:!p-0 uppercase btn-link after:h-[2px] md:text-md md:mb-[15px] after:bg-[#374162] hover:text-darkgray" color="#374162" size="xl" title="See live demo" />} >
                <div className="w-[1020px] max-w-full relative rounded mx-auto">
                  <div className="fit-video">
                    <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                  </div>
                </div>
              </CustomModal.Wrapper>
              {/* Modal Component End */}
            </Col>
            <Col xl={7} md={6} className="text-right">
              <img width="583px" height="608px" className="inline-block" src="https://via.placeholder.com/583x608" alt="" />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="pt-[25px] pb-[8%] border-b border-[#ededed] overflow-hidden sm:pt-[50px] sm:pb-32">
        <Container>
          <Row className="justify-center xs:mb-16">
            <Col lg={5} sm={7} className="text-center font-serif mb-[60px] md:mb-[35px] sm:mb-16 xs:mb-0">
              <span className="font-semibold uppercase text-gradient bg-gradient-to-r from-[#ec606c] via-[#ee6362] to-[#eb7242] block tracking-[1px] mb-[20px] sm:mb-[10px]">Simple process to start</span>
              <h2 className="heading-5 mx-auto font-medium text-[#374162] w-[90%] xs:w-full">Get tips and tricks about how to grow your results!</h2>
            </Col>
          </Row>
          <ProcessStep grid="row-cols-1 row-cols-sm-2 row-cols-lg-4 gap-y-20" theme="process-step-style-04" data={ProcessStepData04} animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Lazy Load HTML */}
      <InViewPort>
        {/* Section Start */}
        <section className="py-[130px] overflow-hidden lg:py-[90px] sm:py-[50px]">
          <Container>
            <Row className="items-center justify-center">
              <Col md={6} xs={10} className="text-center sm:mb-[30px]">
                <m.img width="446px" height="509px" className="md:pr-[30px] mx-auto" src="https://via.placeholder.com/446x509" alt="" {...{ ...fadeIn, transition: { delay: 0.2 } }} />
              </Col>
              <m.div className="col-10 col-xl-4 col-lg-5 offset-lg-1 col-md-6 ps-lg-0 text-left md:text-start sm:text-center" {...fadeIn}>
                <span className="font-serif font-semibold text-gradient bg-gradient-to-r from-[#ec606c] via-[#ee6362] to-[#eb7242] tracking-[1px] inline-block uppercase mb-[20px] sm:mb-[10px]">Experience to optimize website</span>
                <h2 className="heading-5 font-serif font-medium text-[#374162]">Are you frustrated with your SEO results?</h2>
                <p className="mb-[40px]">Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor incididunt ut labore et dolore magna ut enim ad minim veniam nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <Buttons ariaLabel="link for experience" to="/home-seo-agency" className="rounded-[4px] font-medium font-serif uppercase hover:text-darkgray btn-slide-filling-right bg-gradient-to-r from-[#374162] to-[#374162]" size="lg" color="#fff" themeColor="#fff" title="DISCOVER LITHO" />
              </m.div>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="h-[550px] lg:h-[500px] sm:h-auto py-[130px] overflow-hidden cover-background lg:py-[90px] sm:py-[50px]" style={{ backgroundImage: `url(/assets/img/webp/home-seo-agency-bg-02.webp)` }}>
          <Container>
            <Row className="items-center justify-between">
              <m.div className="col-xl-3 col-lg-4 text-left md:text-center md:mb-[40px]" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
                <span className="font-serif font-medium text-[#374162] tracking-[1px] inline-block uppercase mb-[10px]">Boost website speed?</span>
                <h2 className="heading-4 font-serif font-semibold text-gradient bg-gradient-to-r from-[#ec606c] via-[#ee6362] to-[#eb7242] mb-0">How can we help you?</h2>
              </m.div>
              <Col lg={8} className="text-center">
                <IconWithText grid="row-cols-1 row-cols-md-4 row-cols-sm-2 items-center" theme="icon-with-text-09" data={IconWithTextData_09} animation={zoomIn} animationTransition="circOut" animationDuration={0.5} animationDelay={0.1} />
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[130px] overflow-hidden lg:py-[90px] md:pb-[120px] sm:pt-0 sm:py-[50px] lg:pt-[20px]">
          <Container>
            <Row className="items-center justify-center mb-[90px] md:mb-0">
              <Col lg={6} md={10} className="text-left md:mb-[30px]">
                <m.img width="548px" height="471px" src="https://via.placeholder.com/548x471" alt="" {...fadeIn} />
              </Col>
              <Col lg={{ span: 5, offset: 1 }} md={10} className="seoagency-iconwithtext">
                <IconWithText grid="row-cols-1 row-cols-lg-1" theme="icon-with-text-01 m-0 py-[40px] border-b border-mediumgray last-of-type:border-0" data={IconWithTextData} animation={fadeInLeft} animationDelay={0.2} />
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="overflow-visible pb-[100px] cover-background sm:py-[50px]" style={{ backgroundImage: `url('https://via.placeholder.com/1920x850')` }}>
          <Container>
            <Row>
              <Overlap>
                <m.div className="bg-gradient-to-tr from-[#ec606c] via-[#ee6757] to-[#eb7242] rounded-[5px] py-[55px] md:p-[40px]" {...fadeIn}>
                  <Row className="justify-center items-center">
                    <Col lg={2} className="md:mb-[30px]">
                      <h2 className="heading-6 font-serif font-medium text-white mb-0 text-right md:text-center">Get your free quote today?</h2>
                    </Col>
                    <Col lg={7} sm={10} xs={12}>
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
                          <div className="relative subscribe-style-06">
                            <Form className="relative">
                              <Input showErrorMsg={false} type="email" name="email" labelClass="sm:w-full pr-[30px] sm:pr-0 flex-1 sm:flex-none" className="overflow-hidden border-[1px] large-input border-solid border-transparent w-full" placeholder="Enter your email address" />
                              <button aria-label="link for subscribe" type="submit" className={`text-xs tracking-[1px] py-[12px] px-[28px] uppercase${isSubmitting ? " loading" : ""}`}><i className="far fa-envelope mr-[10px]"></i>get started</button>
                            </Form>
                            <AnimatePresence>
                              {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-[115%] left-0 w-full"><MessageBox className="rounded-[4px] text-md py-[10px] px-[22px]" theme="message-box01" variant="success" message="Your message has been sent successfully subscribed to our email list!" /></m.div>}
                            </AnimatePresence>
                          </div>
                        )}
                      </Formik>
                    </Col>
                  </Row>
                </m.div>
              </Overlap>
            </Row>
            <Row className="justify-center mt-40">
              <Col xl={6} lg={7} md={8} className="relative">
                <TestimonialsCarousel09
                  data={TestimonialsCarouselData9}
                  animation={fadeIn}
                  carouselOption={{
                    slidesPerView: 1,
                    loop: true,
                    navigation: true
                  }}
                />
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start*/}
        <m.section className="py-[130px] overflow-hidden lg:py-[75px] sm:py-[50px]" {...fadeIn}>
          <Container>
            <Row className="justify-center">
              <Col xl={5} sm={7} lg={6} className="text-center font-serif mb-[7.5rem] md:mb-8 sm:mb-0">
                <span className=" font-semibold text-gradient bg-gradient-to-r from-[#ec606c] via-[#ee6362] to-[#eb7242] tracking-[1px] inline-block uppercase mb-[20px] sm:mb-[10px]">Affordable pricing plans</span>
                <h2 className="heading-5 font-medium text-[#374162]">Choose one of our plans get access to plugins for free</h2>
              </Col>
            </Row>
            <Row className="justify-center">
              <Col xs={12} md={8} lg={12}>
                <PricingTable01 grid="row-cols-1 row-cols-lg-3 justify-center items-center" theme='pricing-table-style-01' data={pricingTable01} themeColor="dark" />
              </Col>
            </Row>
            <Clients grid="row-cols-1 row-cols-lg-4 row-cols-md-2 row-cols-sm-2 mt-36 lg:mt-20 md:mt-0 xs:mt-8" theme="client-logo-style-05" data={ClientData05} animation={fadeIn} />
          </Container>
        </m.section>
        {/* Section End*/}

        {/* Section Start */}
        <m.section className="py-[100px] relative bg-cover bg-fixed bg-center overflow-hidden md:py-[95px] sm:py-[80px] xs:py-[50px]"{...fadeIn}>
          <Parallax className="lg-no-parallax bg-cover absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] xs:bg-center" translateY={[-80, 80]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
          <div className="absolute top-0 left-0 h-full w-full bg-[#374162] opacity-[.75]"></div>
          <Container>
            <Row className="justify-center items-center">
              <Col xl={7} md={8} sm={10} className="relative text-left sm:mb-[30px] sm:text-center">
                <h2 className="heading-4 font-serif font-semibold text-white mb-0">Gearing your company through an innovative strategy</h2>
              </Col>
              <Col xl={5} md={4} className="text-center text-md-end">
                <Buttons ariaLabel="link for company" to="/" className="rounded-[4px] font-medium font-serif uppercase hover:text-white btn-slide-filling-right bg-gradient-to-r from-[#fff] to-[#fff] text-darkgray" size="xl" color="#000" themeColor="#374162" title="DISCOVER LITHO" />
              </Col>
            </Row>
          </Container>
        </m.section>
        {/* Section End */}

        {/* Section Start */}
        <FooterStyle06 theme="light" className="bg-white text-[#828282] seo-agency-footer_06" logo="/assets/img/webp/logo-gradient-magenta-orange.webp" />
        {/* Section End */}
      </InViewPort>
    </div>
  )
}

export default SeoAgencyPage
