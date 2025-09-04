import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';

// Component
import Buttons from '../../Components/Button/Buttons'
import CustomModal from '../../Components/CustomModal'
import { Input } from '../../Components/Form/Form'
import { ContactFormStyle02Schema } from '../../Components/Form/FormSchema';
import MessageBox from '../../Components/MessageBox/MessageBox';
import { fadeIn } from "../../Functions/GlobalAnimations";
import { resetForm, sendEmail } from "../../Functions/Utilities";

const ContactFormModal = () => {
  return (
    <>
      {/* Section Start */}
      <m.section className="bg-darkgray py-[25px] page-title-small p-[130px] xxs:px-0" {...fadeIn}>
        <Container>
          <Row className="items-center justify-center">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-lg text-white font-medium mb-0 md:text-center">Contact form modal</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-sm font-serif mb-0 md:mt-[10px] md:justify-center">
              <ul className="xs:text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" className="hover:text-white">Features</Link></li>
                <li>Contact form</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col md={12} className="text-center">
              <h6 className="font-medium text-darkgray font-serif mb-[25px] lg:mb-[15px]">Contact form modal</h6>
            </Col>
            <Col xl={4} lg={8} md={10} className="text-center">
              <h6 className="mb-[8%] font-light lg:mb-[60px] md:mb-[45px] sm:mb-[30px]">We would love to hear about start your new project.</h6>
              {/* Modal Component Start */}
              <CustomModal.Wrapper
                modalBtn={<Buttons type="submit" className="btn-fill font-medium rounded font-serif uppercase md:mb-[15px] xs:mb-0" themeColor="#0038e3" color="#fff" size="md" title="Start New Projects" />} >
                <div className="w-[640px] sm:w-full p-[15%] xs:p-[6%] relative bg-white rounded mx-auto">
                  <div className="mx-auto px-0 rounded-[6px] sm:px-[2.5rem]">
                    <h6 className="text-darkgray font-medium mb-[35px] xs:text-left xs:mb-[15px]">Looking for a excellent business idea?</h6>
                    <Formik
                      initialValues={{ name: '', email: '', phone: '', comment: '' }}
                      validationSchema={ContactFormStyle02Schema}
                      onSubmit={async (values, actions) => {
                        actions.setSubmitting(true)
                        const response = await sendEmail(values)
                        response.status === "success" && resetForm(actions)
                      }}
                    >
                      {({ isSubmitting, status }) => (
                        <Form className="text-left">
                          <Input showErrorMsg={false} name="name" type="text" className="py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Your name" labelClass="mb-[25px] xs:mb-[10px]" />
                          <Input showErrorMsg={false} name="email" type="email" className="py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Your email address" labelClass="mb-[25px] xs:mb-[10px]" />
                          <Input showErrorMsg={false} name="phone" type="tel" className="py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Mobile number" labelClass="mb-[25px] xs:mb-[10px]" />
                          <textarea
                            className="mb-[25px] py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf] resize-none xs:mb-[10px]"
                            name="comment"
                            rows="5"
                            placeholder="How can we help you?"></textarea>
                          <Buttons type="submit" className={`font-medium font-serif rounded-none uppercase text-[11px]${isSubmitting ? " loading" : ""}`} themeColor={["#556fff", "#ff798e"]} size="md" color="#fff" title="send message" />
                          <AnimatePresence>
                            {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="mt-[35px] py-[10px]" theme="message-box01" variant="success" message="Your message has been sent successfully!" /></m.div>}
                          </AnimatePresence>
                        </Form>
                      )}
                    </Formik>

                  </div>
                </div>
              </CustomModal.Wrapper>
              {/* Modal Component End */}
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

    </>
  )
}

export default ContactFormModal
