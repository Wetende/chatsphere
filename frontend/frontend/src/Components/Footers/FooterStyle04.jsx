import React, { memo } from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PropTypes } from "prop-types";
import { m, AnimatePresence } from 'framer-motion';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

// Components
import MessageBox from '../MessageBox/MessageBox';
import { Input } from '../Form/Form'
import SocialIcons from '../SocialIcon/SocialIcons';
import FooterMenu, { Footer } from './Footer';
import { resetForm, sendEmail } from '../../Functions/Utilities';

// Data
import FooterData from './FooterData';

const iconData = [
    {
        color: "#828282",
        link: "https://www.facebook.com/",
        icon: "fab fa-facebook-f"
    },
    {
        color: "#828282",
        link: "https://dribbble.com/",
        icon: "fab fa-dribbble"
    },
    {
        color: "#828282",
        link: "https://twitter.com/",
        icon: "fab fa-twitter"
    },
    {
        color: "#828282",
        link: "https://www.instagram.com/",
        icon: "fab fa-instagram"
    },
]

const FooterStyle04 = (props) => {
    return (
        <Footer topSpace={false} theme={props.theme} className={`footer-style-04${props.className ? ` ${props.className}` : ""}`}>
            <div className="py-[6%] lg:py-[8%] md:py-[50px]">
                <Container>
                    <Row className="justify-between md:justify-start">
                        <Col lg={{ span: 3, order: 0 }} sm={{ span: 6, order: 1 }} className="md:mb-[40px] xs:mb-[25px]">
                            <Link aria-label="link" to="/" className="mb-[25px] block">
                                <img src={props.logo} alt="logo" width="111" height="36" />
                            </Link>
                            <p className="w-full md:w-[80%] mb-[30px] xs:w-11/12">Lorem ipsum dolor amet consectetur adipiscing elit do eiusmod tempor incididunt ut labore et dolore.</p>
                            <SocialIcons theme="social-icon-style-01" className="justify-start" size="xs" iconColor={props.theme === "dark" ? "light" : "dark"} data={iconData} />
                        </Col>
                        <FooterMenu data={FooterData.slice(0, 2)} lg={{ span: 2, order: 0 }} sm={{ span: 6, order: 2 }} className="xs:mb-[25px]" titleClass="capitalize" />
                        <Col xl={{ span: 3 }} lg={{ span: 4, order: 0 }} sm={{ span: 6, order: 3 }} md={5}>
                            <span className="font-serif font-medium block text-themecolor mb-[20px] xs:mb-[10px]">Subscribe to newsletter</span>
                            <p className="mb-[25px] md:mb-[20px]">Enter your email address for receiving valuable newsletters.</p>
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
                                    <div className="relative mb-[25px] subscribe-style-09 mx-auto">
                                        <Form className="relative">
                                            <Input showErrorMsg={false} type="email" name="email" labelClass="w-full" className="border-[1px] border-solid border-mediumgray py-[13px] pl-[15px] pr-[60px] w-full small-input placeholder-[#A6A6A6]" placeholder="Enter your email address" />
                                            <button aria-label="subscribe" type="submit" className={`text-lg tracking-[1px] py-[12px] px-[28px] btn-gradient uppercase${isSubmitting ? " loading" : ""}`} >
                                                <i className="feather-mail text-lg m-0"></i>
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
                            <p>&copy; Copyright {new Date().getFullYear()} <Link aria-label="link" to="/" className="underline underline-offset-4 text-themecolor font-medium hover:text-basecolor">Litho</Link></p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Footer >
    )
}

FooterStyle04.defaultProps = {
    data: FooterData,
    logo: "/assets/img/webp/logo-fast-blue-black.webp"
}

FooterStyle04.propTypes = {
    className: PropTypes.string,
    logo: PropTypes.string,
}

export default memo(FooterStyle04)