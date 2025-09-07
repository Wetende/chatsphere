import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Form, Formik } from "formik"
import { AnimatePresence, m } from 'framer-motion'
import * as Yup from 'yup';

// Components
import Header from "../../Components/Header/Header";
import CountDown from '../../Components/Countdown/Countdown'
import { Input } from '../../Components/Form/Form'
import MessageBox from "../../Components/MessageBox/MessageBox"
import SocialIcons from "../../Components/SocialIcon/SocialIcons"
import { fadeIn, fadeInDown, fadeInUp, rotateInDown } from "../../Functions/GlobalAnimations"
import SideButtons from "../../Components/SideButtons";
import { resetForm, sendEmail } from '../../Functions/Utilities'

// Data
const SocialIconsData = [
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
  },
  {
    color: "#0038e3",
    link: "https://www.linkedin.com/",
    icon: "fab fa-linkedin-in"
  }
]

const ComingSoonPage = () => {
  return (
    <>
      <SideButtons animation={false} />
      <Header topSpace={{ desktop: false }} type="reverse-scroll"></Header>
      <div className="h-[100vh] md:landscape:h-auto flex flex-col">
        <section className="p-[0px] md:landscape:py-[50px] overflow-hidden bg-[#f5f5f5] flex-1 flex items-center justify-center relative">
          <Row className="justify-center relative z-10">
            <Col xs={12} className="mb-[30px] text-center xs:mb-[15px]">
              <Link aria-label="homepage" to="/" className="inline-block">
                <m.img
                  {...{ ...fadeInDown, transition: { ease: "easeOut", duration: 0.5 } }}
                  height="36" width="111"
                  alt="logo"
                  loading="lazy"
                  src="/assets/img/webp/logo-fast-blue-black-big@2x.webp"
                  className="w-[142px] xs:w-[100px] inline-block"
                />
              </Link>
            </Col>
            <Col xs={12} className="text-center">
              <m.h1 {...{ ...fadeInDown, transition: { delay: 1, ease: "easeOut", duration: 0.5 } }} className="inline-block font-serif text-gradient bg-gradient-to-r from-[#b783ff] to-[#ff85a6] font-semibold pb-[10px] xl:text-[50px] xl:leading-none xs:text-[38px]">We are <br />launching soon</m.h1>
              <m.p {...{ ...fadeInDown, transition: { delay: 1.7, ease: "easeOut", duration: 0.5 } }} className="text-xmd w-2/5 mx-auto mb-[30px] xl:text-xs xs:w-[90%]">We're currently working hard on this page. Subscribe our newsletter to get update when it'll be live.</m.p>
            </Col>
            <Col xs={5}>
              <CountDown
                theme="countdown-style-01"
                className="text-darkgray justify-between font-serif font-semibold text-[47px]"
                date="2023-04-29T15:02:03"
                animation={{ ...fadeIn, transition: { duration: 0.5, delay: 2 } }}
              />
            </Col>
          </Row>

          {/* Elements */}
          <div className="h-full w-full min-w-[1500px] absolute bottom-0 left-1/2 -translate-x-1/2">
            <m.img
              {...{ ...rotateInDown, transition: { delay: 3.5, ease: "easeOut", duration: 0.5 } }}
              alt="stick"
              src="https://via.placeholder.com/207x199"
              className="absolute top-1/4 left-[20%] max-w-[200px] w-[10%]"
            />
            <m.img
              {...{ ...rotateInDown, transition: { delay: 2.7, ease: "easeOut", duration: 0.5 } }}
              alt="coffee-cup"
              src="https://via.placeholder.com/154x156"
              className="absolute top-1/4 right-[20%]"
            />
            <m.img
              {...{ ...rotateInDown, transition: { delay: 2.5, ease: "easeOut", duration: 0.5 } }}
              alt="envelope"
              src="https://via.placeholder.com/234x211"
              className="absolute top-[calc(25%+100px)] right-[15%]"
            />
            <m.img
              {...{ ...fadeInUp, transition: { delay: 3, ease: "easeOut", duration: 0.5 } }}
              alt="plant"
              src="https://via.placeholder.com/293x240"
              className="absolute bottom-[100px] left-[calc(15%-220px)] max-w-[300px] w-[15%]"
            />
            <m.img
              {...{ ...fadeInUp, transition: { delay: 3, ease: "easeOut", duration: 0.5 } }}
              alt="alphabate"
              src="https://via.placeholder.com/400x400"
              className="absolute bottom-[100px] left-[15%] max-w-[200px] w-[10%]"
              width="200"
              height="200"
            />
            <m.img
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.5, ease: "easeOut" }}
              alt="brush"
              src="https://via.placeholder.com/285x286"
              className="absolute -bottom-[160px] right-[calc(50%-650px)]"
            />
          </div>

          {/* Big Coming Soon Text */}
          <h2 className="text-white text-shadow-medium text-[150px] leading-none font-serif font-bold absolute -bottom-[60px] left-1/2 -translate-x-1/2 w-max uppercase mb-0 xl:text-[120px] md:bottom-[-50px] xs:text-[50px] xs:-bottom-[15px]">
            <m.span
              className="inline-block"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: "0" }}
              transition={{ delay: 1, ease: "easeOut", duration: 1 }}>
              Coming Soon
            </m.span>
          </h2>
        </section>
        <section className="comingsoon-subscribe mxl:h-[350px] py-[50px] h-[230px] xl:h-[150px] xl:py-[25px] lg:h-[250px] xs:h-[200px]">
          <Container>
            <Row className="justify-center">
              <Col lg={5} md={7}>
                {/* Newsletter Form Start */}
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
                    <m.div {...{ ...fadeInUp, transition: { duration: 0.5, delay: 2.5, ease: "easeOut" } }} className="relative subscribe-style-07 mb-[30px] z-10">
                      <Form className="relative font-serif">
                        <Input showErrorMsg={false} type="email" name="email" className="border-[1px] large-input border-solid border-transparent" placeholder="Your email address" />
                        <button type="submit" className={`!text-xs py-[12px] px-[28px] font-medium uppercase${isSubmitting ? " loading" : ""}`}>Notify Me</button>
                      </Form>
                      <AnimatePresence>
                        {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-[115%] left-0 w-full"><MessageBox className="rounded-[4px] text-md py-[10px] px-[22px]" theme="message-box01" variant="success" message="Your message has been sent successfully subscribed to our email list!" /></m.div>}
                      </AnimatePresence>
                    </m.div>
                  )}
                </Formik>
                {/* Newsletter Form End */}
                {/* Social Icon Start */}
                <SocialIcons
                  theme="social-icon-style-01"
                  size="xs"
                  iconColor="dark"
                  data={SocialIconsData}
                  animation={{ ...fadeInUp, transition: { duration: 0.5, delay: 2 } }}
                />
                {/* Social Icon End */}
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  )
}

export default ComingSoonPage