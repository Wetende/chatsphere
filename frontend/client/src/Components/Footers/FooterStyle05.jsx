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
import SocialIcons from '../SocialIcon/SocialIcons';
import { Input } from '../Form/Form'
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

const FooterMenuData = [FooterData[0], FooterData[1], FooterData[3]]

const FooterStyle05 = (props) => {
    return (
        <Footer className={`footer-style-05${props.className ? ` ${props.className}` : ""}`} theme={props.theme}>
            <div className="py-[40px] border-b border-[#ffffff1a]">
                <Container>
                    <Row className="justify-between items-center sm:justify-center">
                        <Col className="col-12 col-md-3 text-center text-md-start sm:mb-[20px] sm:justify-center sm:flex sm:p-0">
                            <Link aria-label="link" to="/">
                                <img src={props.logo} alt="logo" width="111" height="36" />
                            </Link>
                        </Col>
                        <Col className="col-12 col-md-6 text-center sm:mb-[20px]">
                            <p className="font-serif font-medium block align-middle uppercase xs:pl-0">ARE YOU READY TO WORK WITH US? <Link aria-label="themezaa" to="/page/contact-classic" className="underline underline-offset-[6px] text-themecolor font-serif font-medium text-sm inline-block uppercase ml-[5px]">START A PROJECT</Link></p>
                        </Col>
                        <Col className="col-12 col-md-3">
                            <SocialIcons size="xs" className="justify-end sm:!text-center sm:!justify-center" theme="social-icon-style-01" iconColor={props.theme === "dark" ? "light" : "dark"} data={iconData} />
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row lg={4} sm={3} xs={1} className="py-[95px] md:py-[50px] justify-center md:gap-y-[50px] sm:gap-y-[40px] xs:gap-y-[30px]">
                    <FooterMenu data={FooterMenuData} className="" titleClass="capitalize !mb-[20px]" />
                    <Col lg={3} sm={8} className="xs:pb-0 md:text-center xs:text-left">
                        <span className="font-serif font-medium block text-themecolor mb-[28px]">Subscribe to newsletter</span>
                        <Formik
                            initialValues={{ email: "" }}
                            validationSchema={Yup.object().shape({ email: Yup.string().email("Invalid email.").required("Field is required.") })}
                            onSubmit={async (values, actions) => {
                                actions.setSubmitting(true)
                                const response = await sendEmail(values)
                                response.status === "success" && resetForm(actions)
                            }} ss
                        >
                            {({ isSubmitting, status }) => (
                                <div className="relative my-[30px] subscribe-style-09 mx-auto">
                                    <Form className="relative">
                                        <Input showErrorMsg={false} type="email" name="email" labelClass="w-full" className="border-[1px] border-solid border-mediumgray py-[13px] pl-[15px] pr-[60px] w-full small-input placeholder-[#A6A6A6]" placeholder="Enter your email address" />
                                        <button aria-label="subscribe" type="submit" className={`text-lg tracking-[1px] py-[12px] px-[28px] btn-gradient uppercase${isSubmitting ? " loading" : ""}`} >
                                            <i className="feather-mail text-lg m-0"></i>
                                        </button>
                                    </Form>
                                    <AnimatePresence>
                                        {status && (
                                            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-[115%] left-0 w-full" >
                                                <MessageBox className="py-[5px] rounded-[4px]" theme="message-box01" variant="success" message="Your message has been sent successfully subscribed to our email list!" />
                                            </m.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </Formik>
                        <p>&copy; Copyright {new Date().getFullYear()} <Link aria-label="link" to="/" className="underline underline-offset-4 text-themecolor font-normal">Litho</Link></p>
                    </Col>
                </Row>
            </Container>
        </Footer>
    )
}

FooterStyle05.defaultProps = {
    data: FooterData,
    logo: "/assets/img/webp/logo-white.webp"
}

FooterStyle05.propTypes = {
    className: PropTypes.string,
    logo: PropTypes.string,
}

export default memo(FooterStyle05)