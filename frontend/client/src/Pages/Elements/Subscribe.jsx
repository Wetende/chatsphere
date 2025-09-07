import React from "react";

// Libraries
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AnimatePresence, m } from 'framer-motion';
import { Form, Formik } from "formik";
import * as Yup from "yup";

// Components
import { Parallax } from "react-scroll-parallax";
import { Input } from '../../Components/Form/Form'
import MessageBox from "../../Components/MessageBox/MessageBox";
import Buttons from '../../Components/Button/Buttons'
import { fadeIn } from "../../Functions/GlobalAnimations";
import { ContactFormStyle02Schema } from "../../Components/Form/FormSchema";
import { resetForm, sendEmail } from "../../Functions/Utilities";

const SubscribePage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">
                Subscribe
              </h1>
            </Col>
            <Col
              xl={4}
              lg={6}
              className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center"
            >
              <ul className="xs-text-center">
                <li>
                  <Link
                    to="/"
                    aria-label="breadcrumb"
                    className="hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/elements/subscribe"
                    aria-label="breadcrumb"
                    onClick={(e) => e.preventDefault()}
                    className="hover:text-white"
                  >
                    Elements
                  </Link>
                </li>
                <li>Subscribe</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <m.section
        className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray overflow-hidden"
        {...fadeIn}
      >
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="text-darkgray font-medium font-serif mb-[25px] sm:mb-[15px] text-center">
                Subscribe style 01
              </h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col xl={6} md={8} lg={7} className="px-md-0">
              <h4 className="font-bold text-darkgray tracking-[-1px] mb-16 text-center font-serif">
                GET LATEST UPDATE FOR OUR TRUSTED APPLICATIONS
              </h4>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={Yup.object().shape({ email: Yup.string().email("Invalid email.").required("Field is required."), })}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true)
                  const response = await sendEmail(values)
                  response.status === "success" && resetForm(actions)
                }}
              >
                {({ isSubmitting, status }) => (
                  <div className="relative mb-16 xs:mb-8 subscribe-style-01">
                    <Form className="relative">
                      <Input
                        showErrorMsg={false}
                        type="email"
                        name="email"
                        className="border-[1px] pl-[50px] extra-large-input border-solid border-transparent"
                        placeholder="Enter your email address"
                      />
                      <button
                        aria-label="subscribe"
                        type="submit"
                        className={`text-[14px] tracking-[1px] py-[12px] px-[28px] uppercase${isSubmitting ? " loading" : ""
                          }`}
                      >
                        <i className="far fa-envelope"></i>Subscribe
                      </button>
                    </Form>
                    <AnimatePresence>
                      {status && (
                        <m.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute top-[115%] left-0 w-full"
                        >
                          <MessageBox
                            className="mt-[15px] py-[13px] px-[20px] text-md rounded-[100px] text-center"
                            theme="message-box01"
                            variant="success"
                            message="Your message has been sent successfully subscribed to our email list!"
                          />
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </Formik>
              <p className="text-center text-[#828282] leading-[24px] text-sm m-auto w-[70%] lg:w-[60%] md:w-3/4 xs:w-full">
                We are committed to protecting your privacy. We will never
                collect information about you without your explicit consent.
              </p>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section
        className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] overflow-hidden"
        {...fadeIn}
      >
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="mb-[25px] text-darkgray font-medium font-serif text-center xs:mb-[15px]">
                Subscribe style 02
              </h6>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-center">
            <Col className="text-center" lg={6} md={7} sm={12}>
              <span className="text-basecolor text-lg mb-[15px] inline-block">
                Love to work together
              </span>
              <h5 className="font-serif font-medium -tracking-[0.5px] text-darkgray inline-block mb-[60px] sm:mb-[30px] w-[99%]">
                Are you ready to work with us? Let's grow your business.
              </h5>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col md={8}>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={Yup.object().shape({ email: Yup.string().email("Invalid email.").required("Field is required.") })}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true)
                  const response = await sendEmail(values)
                  response.status === "success" && resetForm(actions)
                }}
              >
                {({ isSubmitting, status }) => (
                  <div className="relative mb-16 subscribe-style-02 w-4/5 my-0 mx-auto md:w-full">
                    <Form className="relative">
                      <Input
                        showErrorMsg={false}
                        type="email"
                        name="email"
                        className="border-[1px] medium-input border-solid border-transparent !pr-[175px] xs:!pr-[32px]"
                        placeholder="Enter your email address"
                      />
                      <button
                        aria-label="subscribe"
                        type="submit"
                        className={`text-xs py-[12px] px-[28px] uppercase${isSubmitting ? " loading" : ""
                          }`}
                      >
                        Start a project
                      </button>
                    </Form>
                    <AnimatePresence>
                      {status && (
                        <m.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute top-[115%] left-0 w-full"
                        >
                          <MessageBox
                            className="py-[5px] rounded-[100px] text-center"
                            theme="message-box01"
                            variant="success"
                            message="Your message has been sent successfully subscribed to our email list!"
                          />
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* end */}

      <m.section
        className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray overflow-hidden"
        {...fadeIn}
      >
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="text-darkgray font-medium font-serif mb-[25px] sm:mb-[15px] text-center">
                Subscribe style 03
              </h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col md={8} lg={7} className="text-center">
              <span className="block text-xmd font-serif font-medium text-basecolor mb-[20px]">
                Love to work together
              </span>
              <h4 className="font-serif font-semibold text-darkgray inline-block mb-[72px] text-center sm:mb-[33px] xs:mb-[50px]">
                Beautifully simple handcrafted templates for your website
              </h4>
            </Col>
            <Col md={8} lg={6}>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={Yup.object().shape({ email: Yup.string().email("Invalid email.").required("Field is required.") })}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true)
                  const response = await sendEmail(values)
                  response.status === "success" && resetForm(actions)
                }}
              >
                {({ isSubmitting, status }) => (
                  <div className="relative mb-16 subscribe-style-03">
                    <Form className="relative">
                      <Input
                        showErrorMsg={false}
                        type="email"
                        name="email"
                        className="large-input border-[1px] border-solid border-transparent"
                        placeholder="Your email address"
                      />
                      <button
                        aria-label="subscribe"
                        type="submit"
                        className={`text-xs tracking-[1px] py-[12px] px-[28px] uppercase${isSubmitting ? " loading" : ""
                          }`}
                      >
                        Notify Me
                      </button>
                    </Form>
                    <AnimatePresence>
                      {status && (
                        <m.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute top-[115%] left-0 w-full"
                        >
                          <MessageBox
                            className="py-[5px] rounded-[4px]"
                            theme="message-box01"
                            variant="success"
                            message="Your message has been sent successfully subscribed to our email list!"
                          />
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section
        className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] overflow-hidden"
        {...fadeIn}
      >
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="text-darkgray font-medium font-serif mb-[25px] xs:mb-[15px] text-center">
                Subscribe style 04
              </h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col md={10} lg={7} className="text-center">
              <span className="font-serif font-medium text-basecolor text-xmd uppercase mb-[20px] inline-block sm:mb-[10px]">
                Love to work together
              </span>
              <h4 className="font-serif font-semibold text-darkgray inline-block mb-[72px] text-center sm:mb-[33px]">
                Are you ready to work with us? Let's grow your business.
              </h4>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col md={9}>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={Yup.object().shape({ email: Yup.string().email("Invalid email.").required("Field is required.") })}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true)
                  const response = await sendEmail(values)
                  response.status === "success" && resetForm(actions)
                }}
              >
                {({ isSubmitting, status }) => (
                  <div className="relative mb-16 subscribe-style-04 w-4/5 my-0 mx-auto md:w-full">
                    <Form className="relative">
                      <Input
                        showErrorMsg={false}
                        type="email"
                        name="email"
                        className="border-[1px] border-solid border-transparent large-input"
                        placeholder="Enter your email address"
                      />
                      <button
                        aria-label="subscribe"
                        type="submit"
                        className={`text-xs tracking-[1px] py-[12px] px-[28px] uppercase${isSubmitting ? " loading" : ""
                          }`}
                      >
                        Subscribe Now
                      </button>
                    </Form>
                    <AnimatePresence>
                      {status && (
                        <m.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute top-[115%] left-0 w-full"
                        >
                          <MessageBox
                            className="py-[5px] rounded-[4px] text-center"
                            theme="message-box01"
                            variant="success"
                            message="Your message has been sent successfully subscribed to our email list!"
                          />
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section
        className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] relative bg-cover bg-fixed bg-center overflow-hidden lg:bg-local"
        style={{
          backgroundImage:
            "url('https://via.placeholder.com/1920x677')",
        }}
        {...fadeIn}
      >
        <div className="absolute top-0 left-0 h-full w-full bg-darkpurple2 opacity-80 z-[1]"></div>
        <Container className="relative z-[2]">
          <Row className="justify-center">
            <Col xl={5} lg={6} sm={8} className="lg:text-center md:mb-[30px]">
              <h6 className="font-serif font-medium text-white mb-0 text-left md:text-center">
                Don't miss this amazing big events conference and opportunities!
              </h6>
            </Col>
            <Col xl={{ span: 5, offset: 2 }} lg={{ span: 5, offset: 1 }} sm={9}>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={Yup.object().shape({ email: Yup.string().email("Invalid email.").required("Field is required.") })}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true)
                  const response = await sendEmail(values)
                  response.status === "success" && resetForm(actions)
                }}
              >
                {({ isSubmitting, status }) => (
                  <div className="relative subscribe-style-05">
                    <Form className="relative">
                      <Input
                        showErrorMsg={false}
                        type="email"
                        name="email"
                        className="border-[1px] border-solid border-transparent rounded-[4px] large-input"
                        placeholder="Enter your email address"
                      />
                      <button
                        aria-label="subscribe"
                        type="submit"
                        className={`text-xs py-[12px] px-[28px] uppercase font-semibold xs:text-center${isSubmitting ? " loading" : ""
                          }`}
                      >
                        <i className="far fa-envelope text-neonorange text-sm leading-none mr-[10px] xs:mr-0"></i>
                        Subscribe
                      </button>
                    </Form>
                    <AnimatePresence>
                      {status && (
                        <m.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="mt-[25px] absolute left-0 w-full"
                        >
                          <MessageBox
                            className="rounded-[4px] text-md py-[10px] px-[22px] z-10"
                            theme="message-box01"
                            variant="success"
                            message="Your message has been sent successfully subscribed to our email list!"
                          />
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section
        className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]"
        {...fadeIn}
      >
        <Container>
          <Row className="justify-center">
            <Col md={10} className="text-center mb-[6%]">
              <h6 className="text-darkgray font-medium font-serif text-center xs:mb-[15px]">
                Subscribe style 06
              </h6>
            </Col>
            <Col className="col-12">
              <div className="bg-gradient-to-tr from-[#ec606c] via-[#ee6757] to-[#eb7242] rounded-[5px] py-[55px] md:py-[40px]">
                <Row className="justify-center items-center mx-0">
                  <Col lg={2} className="md:mb-[30px] pl-0 sm:mb-[20px]">
                    <h6 className="font-serif font-medium text-white mb-0 text-right md:text-center">
                      Get your free quote today?
                    </h6>
                  </Col>
                  <Col lg={7} md={9} className="col-11 xs:px-0">
                    <Formik
                      initialValues={{ email: "" }}
                      validationSchema={Yup.object().shape({ email: Yup.string().email("Invalid email.").required("Field is required.") })}
                      onSubmit={async (values, actions) => {
                        await new Promise((r) => setTimeout(r, 500));
                        resetForm(actions)
                      }}
                    >
                      {({ isSubmitting, status }) => (
                        <div className="relative subscribe-style-06">
                          <Form className="relative">
                            <Input
                              showErrorMsg={false}
                              type="email"
                              name="email"
                              labelClass="sm:w-full pr-[30px] sm:pr-0 flex-1 sm:flex-none"
                              className="border-[1px] large-input border-solid border-transparent w-full"
                              placeholder="Enter your email address"
                            />
                            <button
                              aria-label="subscribe"
                              type="submit"
                              className={`text-xs tracking-[1px] py-[12px] px-[28px] uppercase${isSubmitting ? " loading" : ""
                                }`}
                            >
                              <i className="far fa-envelope mr-[10px]"></i>get
                              started
                            </button>
                          </Form>
                          <AnimatePresence>
                            {status && (
                              <m.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute top-[115%] left-0 w-full"
                              >
                                <MessageBox
                                  className="rounded-[4px] text-md py-[10px] px-[22px]"
                                  theme="message-box01"
                                  variant="success"
                                  message="Your message has been sent successfully subscribed to our email list!"
                                />
                              </m.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </Formik>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section
        className="bg-lightgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] overflow-hidden"
        {...fadeIn}
      >
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="mb-[25px] xs:mb-[15px] text-darkgray font-medium font-serif text-center">
                Subscribe style 07
              </h6>
            </Col>
          </Row>
          <Row className="justify-center items-center flex-col">
            <Col md={10} lg={7} className="text-center">
              <h5 className="font-light text-darkgray inline-block text-center mb-[46px]">
                Are you ready to work with us? <span className="block font-semibold bg-gradient-to-r text-gradient from-[#556fff] via-[#e05fc4] to-[#ff798e] sm:inline">
                  Let's grow your business.
                </span>
              </h5>
            </Col>
            <Col md={6} className="subscription-from w-[45%] sm:w-full">
              <Formik
                initialValues={{ email: "" }}
                validationSchema={Yup.object().shape({ email: Yup.string().email("Invalid email.").required("Field is required.") })}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true)
                  const response = await sendEmail(values)
                  response.status === "success" && resetForm(actions)
                }}
              >
                {({ isSubmitting, status }) => (
                  <div className="relative subscribe-style-07">
                    <Form className="relative">
                      <Input
                        showErrorMsg={false}
                        type="email"
                        name="email"
                        className="border-[1px] extra-large-input border-solid border-transparent"
                        placeholder="Your email address"
                      />
                      <button
                        aria-label="subscribe"
                        type="submit"
                        className={`text-xs tracking-[1px] py-[12px] px-[28px] uppercase${isSubmitting ? " loading" : ""
                          }`}
                      >
                        <i className="fa fa-arrow-right"></i>
                      </button>
                    </Form>
                    <AnimatePresence>
                      {status && (
                        <m.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="mt-[25px] absolute top-[115%] left-0 w-full"
                        >
                          <MessageBox
                            className="rounded-[4px] text-md py-[10px] px-[22px]"
                            theme="message-box01"
                            variant="success"
                            message="Your message has been sent successfully subscribed to our email list!"
                          />
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </m.section>

      {/* Section start */}
      <m.div className="relative overflow-hidden py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] sm:px-[15px]" {...fadeIn}>
        <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[-30px] left-0 h-[100vh] lg:h-[64vh] lg:top-[-75px] lg:!translate-y-0 md:h-[60vh] md:-top-[30px] sm:top-0 sm:h-[56vh] xs:h-[50vh] w-full" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
        <div className="absolute top-0 left-0 w-full h-full opacity-75 bg-gradient-to-tr from-[#0039e3] via-[#5e28dd] to-[#8600d4]"></div>
        <Container className="relative">
          <Row className="justify-center">
            <Col xl={7} lg={8} md={10} className="xs:px-0">
              <div className="text-center font-serif font-medium bg-white rounded-[6px] p-28 sm:p-20 xs:p-16">
                <span className="text-basecolor block uppercase mb-[10px]">
                  Let's get started now
                </span>
                <h6 className="inline-block text-darkgray -tracking-[1px] w-[80%] mb-14 lg:w-[85%] sm:w-[55%] xs:w-full">
                  Don't miss this amazing latest news and opportunities!
                </h6>
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={Yup.object().shape({ email: Yup.string().email("Invalid email.").required("Field is required.") })}
                  onSubmit={async (values, actions) => {
                    await new Promise((r) => setTimeout(r, 500));
                    resetForm(actions)
                  }}
                >
                  {({ isSubmitting, status }) => (
                    <div className="relative subscribe-style-08">
                      <Form className="relative">
                        <Input
                          showErrorMsg={false}
                          type="text"
                          name="name"
                          className="border-[1px] medium-input border-solid border-transparent font-sans"
                          placeholder="Your name"
                        />
                        <Input
                          showErrorMsg={false}
                          type="email"
                          name="email"
                          className="border-[1px] medium-input border-solid border-transparent font-sans"
                          placeholder="Your email address"
                        />
                        <button
                          aria-label="subscribe"
                          type="submit"
                          className={`text-xs py-[12px] px-[28px] uppercase${isSubmitting ? " loading" : ""
                            }`}
                        >
                          Subscribe Newsletter
                        </button>
                      </Form>
                      <AnimatePresence>
                        {status && (
                          <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full absolute mt-[15px]"
                          >
                            <MessageBox
                              className="rounded-[4px] text-md py-[10px] px-[22px]"
                              theme="message-box01"
                              variant="success"
                              message="Your message has been sent successfully subscribed to our email list!"
                            />
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </m.div>
      {/* Section end */}

      <m.section
        className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-darkgray overflow-hidden"
        {...fadeIn}
      >
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="text-white font-medium font-serif mb-[25px] sm:mb-[15px] text-center">
                Subscribe style 09
              </h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col md={10} lg={7} className="text-center mb-[20px]">
              <h4 className="font-serif font-semibold inline-block text-center mb-[25px] -tracking-[.5px] text-transparent bg-clip-text bg-gradient-to-r from-[#975ade] via-[#d473c0] to-[#e6686f]">
                Subscribe to newsletter
              </h4>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col md={6}>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={Yup.object().shape({ email: Yup.string().email("Invalid email.").required("Field is required.") })}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true)
                  const response = await sendEmail(values)
                  response.status === "success" && resetForm(actions)
                }}
              >
                {({ isSubmitting, status }) => (
                  <div className="relative mb-16 subscribe-style-09 my-0 mx-auto">
                    <Form className="relative">
                      <Input
                        showErrorMsg={false}
                        type="email"
                        name="email"
                        className="border-[1px] border-solid border-transparent large-input"
                        placeholder="Enter your email address"
                      />
                      <button
                        aria-label="subscribe"
                        type="submit"
                        className={`text-lg tracking-[1px] py-[12px] px-[28px] btn-gradient uppercase${isSubmitting ? " loading" : ""
                          }`}
                      >
                        <i className="far fa-envelope m-0"></i>
                      </button>
                    </Form>
                    <AnimatePresence>
                      {status && (
                        <m.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute top-[115%] left-0 w-full"
                        >
                          <MessageBox
                            className="py-[5px] rounded-[4px]"
                            theme="message-box01"
                            variant="success"
                            message="Your message has been sent successfully subscribed to our email list!"
                          />
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </m.section>

      {/* Section Start */}
      <section
        className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-cover bg-no-repeat overflow-hidden relative bg-center"
        style={{ backgroundImage: "url(https://via.placeholder.com/1920x745)" }}
      >
        <Container>
          <Row className="m-0 justify-center">
            <Col xl={10} lg={11} className="col-12 relative bg-white overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.1)]" >
              <m.div className="row" {...fadeIn}>
                <Col md={6} className="col-12 bg-no-repeat bg-cover overflow-hidden relative bg-center sm:h-[350px]"
                  style={{ backgroundImage: "url(https://via.placeholder.com/800x838)" }} ></Col>
                <Col md={6} className="col-12 p-24 lg:p-20 md:p-12 sm:20 xs:p-14" >
                  <h5 className="font-serif font-bold text-[#262b35] uppercase tracking-[-.5px] mb-[20px]">
                    GET BOOK YOUR SPA APPOINTMENT
                  </h5>
                  <p className="w-[90%] lg:w-full mb-[35px]">
                    Lorem ipsum is simply dummy text of the printing and
                    typesetting industry
                  </p>
                  <Formik
                    initialValues={{ name: "", email: "" }}
                    validationSchema={ContactFormStyle02Schema}
                    onSubmit={async (values, actions) => {
                      await new Promise((r) => setTimeout(r, 500));
                      resetForm(actions)
                    }}
                  >
                    {({ isSubmitting, status }) => (
                      <Form>
                        <Input
                          showErrorMsg={false}
                          type="text"
                          name="name"
                          labelclass="mb-[25px]"
                          className="rounded-[5px] py-[15px] px-[20px] border-[1px] border-transparent w-full bg-lightgray mb-[20px]"
                          placeholder="Your name"
                        />
                        <Input
                          showErrorMsg={false}
                          type="email"
                          name="email"
                          labelclass="mb-[30px]"
                          className="rounded-[5px] py-[15px] px-[20px] border-[1px] border-transparent w-full bg-lightgray mb-[20px]"
                          placeholder="Your email address"
                        />
                        <Buttons
                          ariaLabel="link for subscribe"
                          type="submit"
                          className={`text-sm leading-none font-serif font-medium rounded-[4px] w-full uppercase${isSubmitting ? " loading" : ""}`}
                          themeColor={["#fd7f87", "#f7aa80"]}
                          color="#fff"
                          size="lg"
                          title="Get started now"
                        />
                        <AnimatePresence>
                          {status && (
                            <m.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <MessageBox
                                className="mt-[20px] mb-0 text-md leading-[22px] py-[10px] relative"
                                theme="message-box01"
                                variant="success"
                                message="Your message has been sent successfully subscribed to our email list!"
                              />
                            </m.div>
                          )}
                        </AnimatePresence>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </m.div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SubscribePage;
