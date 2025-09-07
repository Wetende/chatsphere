import React, { memo } from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PropTypes } from "prop-types";
import { m, AnimatePresence } from 'framer-motion';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

// Components
import SocialIcons from '../SocialIcon/SocialIcons'
import { Footer } from './Footer'
import { Input } from '../Form/Form'
import MessageBox from '../MessageBox/MessageBox';
import { resetForm, sendEmail } from '../../Functions/Utilities';

// Data
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

const FooterStyle09 = (props) => {
    return (
        <Footer className={`footer-style-09${props.className ? ` ${props.className}` : ""}`} theme={props.theme}>
            <Container className="py-[6%] xs:py-[13%]">
                <Row className="items-center">
                    <Col className="md:text-center last:m-0 md:mt-[25px]" lg={{ span: 3, order: 1 }} md={{ span: 12, order: 3 }} xs={{ span: 12, order: 3 }}>
                        <Link aria-label="link" to="/">
                            <img src={props.logo} alt="logo" width="111" height="36" className="mb-[15px] md:mx-auto md:mt-0" />
                        </Link>
                        <p>&copy; Copyright {new Date().getFullYear()} <Link aria-label="link" to="/" rel="noreferrer" className="underline underline-offset-4 font-medium hover:text-themecolor">Litho</Link></p>
                    </Col>
                    <Col lg={{ order: 2 }} md={{ span: 6, order: 1 }} xs={{ span: 12, order: 1 }} className="text-center items-center flex flex-col md:items-start sm:mb-[50px] sm:items-center xs:mb-[30px]">
                        <span className="mb-[25px] block sm:w-full md:text-start md:w-4/5 sm:text-center leading-[18px]">
                            <span className="text-themecolor">Newsletter sign-up. &nbsp;</span>
                            Get monthly updates and resources.
                        </span>
                        <div className="form w-[75%] justify-center md:justify-start xs:w-full">
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
                                        <Form className="relative">
                                            <Input showErrorMsg={false} type="email" name="email" className="border-[1px] small-input border-solid border-[rgba(255,255,255,0.2)] placeholder-[#A6A6A6] rounded-none	bg-transparent py-[13px] px-[15px] text-md m-0 w-full xs:py-[13px] xs:px-[15px]" placeholder="Enter your email address" />
                                            <button type="submit" className={`text-xs tracking-[1px] py-[12px] px-[28px] top-1/2 translate-y-2/4 uppercase xs:text-center dark${isSubmitting ? " loading" : ""}`}>
                                                <i className="far fa-envelope text-lg leading-none m-0 mr-[10px] text-basecolor xs:mr-0"></i></button>
                                        </Form>
                                        <AnimatePresence>
                                            {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-[115%] left-0 w-full"><MessageBox className="rounded-[4px] text-md py-[10px] px-[22px]" theme="message-box01" variant="success" message="Your message has been sent successfully subscribed to our email list!" /></m.div>}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </Formik>
                        </div>
                    </Col>
                    <Col className="text-center md:text-right mb-[10px]" lg={{ span: 3, order: 3 }} md={{ span: 6, order: 2 }} xs={{ span: 12, order: 2 }} >
                        <span className="mb-[15px] block text-right sm:text-center leading-[18px]">Connect with social</span>
                        <SocialIcons theme="social-icon-style-01" className="justify-end sm:justify-center" size="xs" iconColor={props.theme === "dark" ? "light" : "dark"} data={iconData} />
                    </Col>
                </Row>
            </Container>
        </Footer>
    )
}

FooterStyle09.defaultProps = {
    logo: "/assets/img/webp/logo-gradient-sky-blue-pink-white.webp"
}

FooterStyle09.propTypes = {
    className: PropTypes.string,
    logo: PropTypes.string,
}


export default memo(FooterStyle09)