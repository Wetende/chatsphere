import React, { useRef } from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { Formik, Form } from 'formik';

// Components
import { fadeIn } from '../../Functions/GlobalAnimations';
import { resetForm, sendEmail } from "../../Functions/Utilities";
import Buttons from '../../Components/Button/Buttons'
import { Checkbox, Input, TextArea } from '../../Components/Form/Form'
import { ContactFormStyle02Schema, ContactFormStyle03Schema, } from '../../Components/Form/FormSchema';
import MessageBox from '../../Components/MessageBox/MessageBox';

const ContactFormPage = () => {
  const form1 = useRef(null)
  const recaptcha = useRef()

  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Contact form</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Contact form</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <m.section className="py-[160px] lg:py-[120px] md:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row>
            <Col className='mb-[6%]'>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Contact form style 01</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col xl={5} lg={10} md={10}>
              <Formik
                initialValues={{ name: '', email: '', phone: '', comment: '', recaptcha: '' }}
                validationSchema={ContactFormStyle02Schema}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true)
                  if (values.recaptcha !== '') {
                    const response = await sendEmail(values)
                    response.status === "success" && resetForm(actions, recaptcha);
                  } else {
                    recaptcha.current.captcha.classList.add("error")
                  }
                }}
              >
                {({ isSubmitting, status, setFieldValue }) => (
                  <Form ref={form1}>
                    <Input showErrorMsg={false} name="name" type="text" className="py-[18px] px-[25px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Your name" labelClass="mb-[25px]" />
                    <Input showErrorMsg={false} name="email" type="email" className="py-[18px] px-[25px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Your email address" labelClass="mb-[25px]" />
                    <Input showErrorMsg={false} name="phone" type="tel" className="py-[18px] px-[25px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Mobile number" labelClass="mb-[25px]" />
                    <TextArea
                      className="mb-[35px] pt-[22px] px-[25px] pb-[32px] w-full border-[1px] border-solid border-[#dfdfdf] resize-none"
                      name="comment"
                      rows="5"
                      placeholder="How can we help you?"></TextArea>
                    {process.env.REACT_APP_GRECAPTCHA_API_KEY && (
                      <ReCAPTCHA
                        ref={recaptcha}
                        className="mb-[35px]"
                        sitekey={process.env.REACT_APP_GRECAPTCHA_API_KEY}
                        onChange={(response) => { setFieldValue("recaptcha", response) }}
                      />
                    )}
                    <Buttons ariaLabel="form button" type="submit" className={`font-medium font-serif rounded-none uppercase text-[11px]${isSubmitting ? " loading" : ""}`} themeColor={["#0039e3", "#8600d4"]} size="md" color="#fff" title="send message" />
                    <AnimatePresence>
                      {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="mt-[35px] py-[10px] tracking-[1px]" theme="message-box01" variant="success" message="Your message has been sent successfully!" /></m.div>}
                    </AnimatePresence>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="py-[160px] bg-cover	bg-no-repeat overflow-hidden relative bg-center lg:py-[120px] md:py-[95px] xs:py-[80px] xxs:py-[50px]" style={{ backgroundImage: "url('https://via.placeholder.com/1920x857')" }} {...fadeIn}>
        <Container className="xs:px-0">
          <Row className="justify-end md:justify-center">
            <Col xl={7} lg={7} md={9} sm={11}>
              <div className="px-[7rem] py-[5rem] rounded-md shadow-[0_0_30px_rgb(0,0,0,0.08)] bg-white sm:p-20 xs:rounded-none xs:px-[3.5rem] xs:py-[6rem]">
                <span className="mb-[15px] font-medium text-center text-[#8bb867] text-md font-serif uppercase block sm:mb-[10px]">Request a call back</span>
                <h5 className="w-[80%] mb-[40px] font-bold text-center	tracking-[-1px] text-black font-serif uppercase mx-auto xs:w-full">Need a consultant for your business?</h5>
                <Formik
                  initialValues={{ name: '', email: '' }}
                  validationSchema={ContactFormStyle02Schema}
                  onSubmit={async (values, actions) => {
                    actions.setSubmitting(true)
                    const response = await sendEmail(values)
                    response.status === "success" && resetForm(actions)
                  }}
                >
                  {({ isSubmitting, status }) => (
                    <Form className="mb-[30px]">
                      <Input showErrorMsg={false} type="text" name="name" labelClass="mb-[25px]" className="rounded-[5px] text-md py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Your name" />
                      <Input showErrorMsg={false} type="email" name="email" labelClass="mb-[25px]" className="rounded-[5px] text-md py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Your email address" />
                      <Buttons ariaLabel="form button" type="submit" className={`btn-fill text-sm leading-none font-medium tracking-[1px] py-[13px] px-[32px] rounded-[4px] w-full uppercase mb-[5px]${isSubmitting ? " loading" : ""}`} themeColor="#8bb867" color="#fff" size="lg" title="Request a call schedule" />
                      <AnimatePresence>
                        {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="mt-[20px] text-center py-[10px]" theme="message-box01" variant="success" message="Your message has been sent successfully!" /></m.div>}
                      </AnimatePresence>
                    </Form>
                  )}
                </Formik>
                <p className="w-[80%] text-xs leading-6 mx-auto xs:w-full text-center">We are committed to protecting your privacy. We will never collect information about you without your explicit consent.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[75px] sm:py-[50px] xs:py-[80px] xxs:py-[50px]"  {...fadeIn}>
        <Container>
          <Row>
            <Col className='mb-[6%]'>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Contact form style 03</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col>
              <Formik
                initialValues={{ name: '', email: '', phone: '', terms_condition: false }}
                validationSchema={ContactFormStyle03Schema}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true)
                  const response = await sendEmail(values)
                  response.status === "success" && resetForm(actions)
                }}
              >
                {({ isSubmitting, status }) => (
                  <Form>
                    <Row className="row-cols-1 row-cols-md-2">
                      <Col className="mb-16 lg:mb-[25px] sm:mb-0">
                        <Input showErrorMsg={false} type="text" name="name" className="py-[15px] px-[20px] text-md w-full border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Your name" />
                        <Input showErrorMsg={false} type="email" name="email" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="mb-[25px]" placeholder="Your email address" />
                        <Input showErrorMsg={false} type="tel" name="phone" className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]" labelClass="sm:mb-[25px]" placeholder="Mobile number" />
                      </Col>
                      <Col className="mb-16 lg:mb-[25px]">
                        <TextArea className="border-[1px] border-solid border-[#dfdfdf] w-full h-full py-[15px] px-[20px] text-md resize-none" name="comment" labelClass="h-full sm:h-[200px]" placeholder="Your message"></TextArea>
                      </Col>
                      <Col className="text-left sm:mb-[20px]">
                        <Checkbox type="checkbox" name="terms_condition" className="inline-block mt-[4px]" labelClass="flex items-start">
                          <span className="ml-[10px] text-sm w-[85%] md:w-[90%] xs:w-[85%]">I accept the terms & conditions and I understand that my data will be hold securely in accordance with the&nbsp;<Link to="/privacy" target="_blank" className="text-darkgray underline hover:text-fastblue">privacy policy</Link>.</span>
                        </Checkbox>
                      </Col>
                      <Col className="text-right sm:text-center">
                        <Buttons ariaLabel="form button" type="submit" className={`text-xs tracking-[1px] rounded-none py-[12px] px-[28px] uppercase${isSubmitting ? " loading" : ""}`} themeColor={["#556fff", "#ff798e"]} size="md" color="#fff" title="Send Message" />
                      </Col>
                    </Row>
                    <AnimatePresence>
                      {status && <Row><Col xs={12}><m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="mt-[20px] py-[10px]" theme="message-box01" variant="success" message="Your message has been sent successfully!" /></m.div></Col></Row>}
                    </AnimatePresence>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="py-[160px] bg-darkslateblue lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row>
            <Col className='mb-[6%]'>
              <h6 className="font-serif text-white text-center font-medium mb-[25px] lg:mb-[15px]">Contact form style 04</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col xl={5} lg={10} md={10} className="xs:px-[15px]">
              <Formik
                initialValues={{ name: '', email: '', phone: '' }}
                validationSchema={ContactFormStyle02Schema}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true)
                  const response = await sendEmail(values)
                  response.status === "success" && resetForm(actions)
                }}
              >
                {({ isSubmitting, status }) => (
                  <Form>
                    <Input showErrorMsg={false} type="text" name="name" labelClass="mb-[25px]" className="pt-[20px] pr-[36px] pb-[23px] w-full bg-transparent text-[#828282] border-b border-solid border-[#ffffff33] text-[16px]" placeholder="Your name" />
                    <Input showErrorMsg={false} type="email" name="email" labelClass="mb-[25px]" className="pt-[20px] pr-[36px] pb-[23px] w-full bg-transparent text-[#828282] border-b border-solid border-[#ffffff33] text-[16px]" placeholder="Your email address" />
                    <Input showErrorMsg={false} type="tel" name="phone" labelClass="mb-[25px]" className="pt-[20px] pr-[36px] pb-[23px] w-full bg-transparent text-[#828282] border-b border-solid border-[#ffffff33] text-[16px]" placeholder="Mobile number" />
                    <TextArea className="mb-[35px] py-[20px] pr-[36px] w-full bg-transparent text-[#828282] border-b border-solid border-[#ffffff33] text-[16px] resize-none" rows="6" name="comment" placeholder="How can we help you?"></TextArea>
                    <Buttons ariaLabel="form button" type="submit" className={`tracking-[0.5px] rounded-none font-medium uppercase${isSubmitting ? " loading" : ""}`} themeColor={["#556fff", "#ff798e"]} size="sm" color="#fff" title="Send Message" />
                    <AnimatePresence>
                      {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="mt-[20px] py-[10px]" theme="message-box01" variant="success" message="Your message has been sent successfully!" /></m.div>}
                    </AnimatePresence>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </m.section>

    </>
  )
}

export default ContactFormPage