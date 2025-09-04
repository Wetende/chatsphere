import React, { useState } from "react";

// Libraries
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRef } from "react";

// Components
import useOnClickOutside from "../../Functions/UseOnClickOutside";
import Buttons from "../../Components/Button/Buttons";
import CountDown from "../../Components/Countdown/Countdown";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import { Input } from "../../Components/Form/Form";
import MessageBox from "../../Components/MessageBox/MessageBox";
import SideButtons from "../../Components/SideButtons";
import { fadeIn } from "../../Functions/GlobalAnimations";
import { resetForm, sendEmail } from "../../Functions/Utilities";

// Data
const SocialIconsData = [
  {
    color: "#0038e3",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f",
  },
  {
    color: "#0038e3",
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble",
  },
  {
    color: "#0038e3",
    link: "https://twitter.com/",
    icon: "fab fa-twitter",
  },
  {
    color: "#0038e3",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram",
  },
  {
    color: "#0038e3",
    link: "https://www.linkedin.com/",
    icon: "fab fa-linkedin-in",
  },
];

const ComingSoonV2Page = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef();

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  useOnClickOutside(ref, closeModal);

  return (
    <>
      <SideButtons animation={false} />
      <div className="coming-soon-v2">
        {/* Section Start */}
        <section
          className="cover-background"
          style={{
            backgroundImage: `url(https://via.placeholder.com/1920x1080)`,
          }}
        >
          <Container fluid>
            <Row>
              <Col
                sm={12}
                className="h-[100vh] p-[100px] xl:p-[50px] sm:py-[20px] sm:px-[35px] landscape:md:h-auto"
              >
                <div className="flex h-full justify-between flex-col items-start sm:text-center sm:items-center">
                  <Link
                    aria-label="homepage"
                    className="inline-block mr-0 landscape:md:mb-[30px]"
                    to="/"
                  >
                    <m.img
                      src="/assets/img/webp/logo-white-big.webp"
                      className="xl:w-[100px] sm:w-full"
                      height="52"
                      width="160"
                      loading="lazy"
                      alt="logo"
                      {...fadeIn}
                    />
                  </Link>
                  <div className="xs:text-center">
                    <m.h1
                      className="font-serif text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] font-semibold mb-[10px] inline-block xl:text-[4rem] xl:leading-none"
                      {...{ ...fadeIn, transition: { delay: 0.3 } }}
                    >
                      Hello Guys!
                    </m.h1>
                    <m.h3
                      className="font-serif block text-white xl:text-xlg xl:mb-[20px]"
                      {...{ ...fadeIn, transition: { delay: 0.5 } }}
                    >
                      We're coming soon...
                    </m.h3>
                    <m.p
                      className="text-xmd text-white leading-[28px] font-light mb-[50px] xl:mb-[20px] w-[450px] sm:w-full"
                      {...{
                        ...fadeIn,
                        whileInView: { opacity: 0.5 },
                        transition: { delay: 0.7 },
                      }}
                    >
                      We're currently working hard on this page. Subscribe our
                      newsletter to get update when it'll be live.
                    </m.p>
                    <m.div {...{ ...fadeIn, transition: { delay: 1 } }}>
                      <CountDown
                        theme="countdown-style-03"
                        className="text-white font-semibold !text-[47px] mb-[40px] xl:mb-[20px] row-cols-2 row-cols-sm-4"
                        date="2025-12-14T15:12:03"
                        animation={fadeIn}
                      />
                    </m.div>
                    <m.div {...{ ...fadeIn, transition: { delay: 1.2 } }}>
                      <Buttons
                        onClick={openModal}
                        className="btn-fill drop-shadow-md font-medium font-serif uppercase rounded-[50px] btn-shadow text-[15px] md:mb-[15px]"
                        size="md"
                        themeColor="#fff"
                        color="#000"
                        title="notify me"
                      />
                    </m.div>
                  </div>
                  <m.div {...{ ...fadeIn, transition: { delay: 1.4 } }}>
                    <SocialIcons
                      size="sm"
                      theme="social-icon-style-06"
                      className="justify-center text-center"
                      iconColor="light"
                      data={SocialIconsData}
                    />
                  </m.div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className={`${modalOpen ? `notify-me` : ""}`}>
          <m.div
            className="fixed left-0 top-0 w-full h-full"
            initial={{ translateY: "100%" }}
            animate={{ translateY: modalOpen ? "0%" : "100%" }}
            transition={{ ease: "easeIn", duration: 0.3 }}
          >
            <Button
              onClick={closeModal}
              className={`btn-close fixed top-[30px] right-[30px] text-[30px] bg-transparent text-white ${
                !modalOpen ? `hidden` : "inline-block"
              }`}
              title="Close (Esc)"
            >
              {" "}
              ×{" "}
            </Button>
            <m.div className="fixed bottom-0 w-full bg-[#fff]" ref={ref}>
              <Container className="pt-[100px] md:py-[30px]">
                <Row className="items-center justify-center sm:text-center gap-x-[15px] gap-y-10">
                  <Col md={4} className="sm:mb-10 md:inline-block sm:hidden">
                    <img
                      src="https://via.placeholder.com/352x359"
                      alt="coming-soon"
                      width="352"
                      height="359"
                    />
                  </Col>
                  <Col
                    md={7}
                    lg={{ span: 6, offset: 1 }}
                    className="pb-20 md:pb-[30px] sm:pb-0"
                  >
                    <h4 className="font-serif text-darkgray font-semibold mb-[15px]">
                      Let's get started now
                    </h4>
                    <p className="text-spanishgray mb-[42px] sm:mb-[33px]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ipsum is simply dummy.
                    </p>
                    <Formik
                      initialValues={{ email: "" }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string()
                          .email("Invalid email.")
                          .required("Field is required."),
                      })}
                      onSubmit={async (values, actions) => {
                        actions.setSubmitting(true);
                        const response = await sendEmail(values);
                        response.status === "success" && resetForm(actions);
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
                              type="submit"
                              className={`text-xs tracking-[1px] py-[12px] px-[28px] uppercase${
                                isSubmitting ? " loading" : ""
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
                                className="mt-[25px] top-[115%] left-0 w-full"
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
            </m.div>
          </m.div>
        </section>
        {/* Section End */}
      </div>
    </>
  );
};

export default ComingSoonV2Page;
