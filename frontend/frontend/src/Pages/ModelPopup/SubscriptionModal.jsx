import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Components
import Buttons from '../../Components/Button/Buttons'
import { Input } from '../../Components/Form/Form'
import CustomModal from '../../Components/CustomModal'
import MessageBox from '../../Components/MessageBox/MessageBox';

// Functions
import { resetForm, sendEmail } from '../../Functions/Utilities';
import { fadeIn } from "../../Functions/GlobalAnimations";

const SubscriptionModal = () => {

  const handleClose = () => {
    let newsletter_modal = document.querySelector("#subscribe-popup"),
      newsletter_checkbox = newsletter_modal.querySelector("#newsletter-off");

    import("../../Functions/Utilities").then(module => {
      if (module.getCookie("litho-promo-popup") !== 'shown') {
        if (newsletter_checkbox.checked) {
          document.cookie = "litho-promo-popup=shown";
        }
      }
    })
  }

  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px] page-title-small p-[130px] xxs:px-0">
        <Container>
          <Row className="items-center justify-center">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-lg text-white font-medium mb-0 md:text-center">Subscription modal</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-sm font-serif mb-0 md:mt-[10px] md:justify-center">
              <ul className="xs:text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" className="hover:text-white">Features</Link></li>
                <li>Subscription</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[130px] lg:py-[95px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col md={12} className="text-center">
              <h6 className="font-serif text-darkgray font-medium">Auto open subscription modal</h6>
            </Col>
            <Col xl={5} lg={8} md={10} className="text-center">
              <h6 className="font-light mb-[8%] sm:mb-[30px]">This is a simple subscription form and it will be showed after the pre-defined delay once the pages is loaded.</h6>
              {/* Modal Component Start */}
              <CustomModal.Wrapper
                defaultOpen={true}
                closeBtnIn={true}
                className="subscribe-newsletter-modal"
                modalBtn={<Buttons type="submit" className="btn-fill font-medium font-serif uppercase md:mb-[15px] rounded-[4px]" themeColor="#0038e3" color="#fff" size="md" title="Show modal again" />}
                closeBtnOuter={false}
              >
                <div className="bg-white text-left relative overflow-hidden" id="subscribe-popup">
                  <div onClick={handleClose} className="absolute top-0 right-0 z-10">
                    <CustomModal.Close className="close-btn text-white"><button title="Close (Esc)" type="button" className="border-none text-[30px] w-[44px] h-[44px]">×</button></CustomModal.Close>
                  </div>
                  <Row className="justify-center">
                    <Col className="p-24 lg:p-16 xs:p-[3rem]" sm={{ span: 7, order: 1 }} xs={{ span: 12, order: 2 }}>
                      <span className="text-xlg font-medium text-darkgray block mb-[10px]">Subscribe to newsletter</span>
                      <p className="mb-[30px] xs:mb-[20px]">Subscribe to our newsletters and don't miss new arrivals the latest updates and our latest promotions.</p>
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
                            <Form className="relative mb-[25px]">
                              <Input showErrorMsg={false} type="email" name="email" className="border-[1px] medium-input border-solid border-[#dfdfdf]" placeholder="Enter your email address" />
                              <button type="submit" className={`text-xs tracking-[1px] py-[12px] px-[28px] uppercase xs:text-center${isSubmitting ? " loading" : ""}`}><i className="far fa-envelope text-darkgray text-sm leading-none xs:mr-0"></i></button>
                            </Form>
                            <AnimatePresence>
                              {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-[25px] absolute top-[115%] left-0 w-full"><MessageBox className="rounded-[4px] text-md py-[10px] px-[22px] z-10" theme="message-box01" variant="success" message="Your message has been sent successfully subscribed to our email list!" /></m.div>}
                            </AnimatePresence>
                          </div>
                        )}
                      </Formik>
                      <label htmlFor="newsletter-off" className="text-sm checkbox-with-label">
                        <input type="checkbox" id="newsletter-off" />
                        <span className="inline-block align-middle w-[15px] h-[15px] mr-[10px] border border-[#d9d9d9] rounded-none relative"></span>Don't show this popup again
                      </label>
                    </Col>
                    <Col sm={{ span: 5, order: 2 }} xs={{ span: 12, order: 1 }} className="bg-cover cover-background xs:h-[150px]" style={{ backgroundImage: `url('https://via.placeholder.com/600x802')` }}>
                    </Col>
                  </Row>
                </div>
              </CustomModal.Wrapper>
              {/* Modal Component End */}
            </Col>
          </Row>
        </Container>
      </m.section>
    </>
  )
}

export default SubscriptionModal