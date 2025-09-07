import React, { memo } from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PropTypes } from "prop-types";
import { m, AnimatePresence } from 'framer-motion';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

// Components
import MessageBox from '../MessageBox/MessageBox';
import { Input } from '../Form/Form'
import SocialIcons from '../SocialIcon/SocialIcons'
import FooterMenu, { Footer } from './Footer';
import { resetForm, sendEmail } from '../../Functions/Utilities';

// Data
import FooterData from './FooterData'

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

const FooterStyle03 = (props) => {
    return (
        <Footer theme={props.theme} className={`${props.className ? ` ${props.className}` : ""} footer-style-03`}>
            <div className="py-[6%] lg:py-[8%] md:py-[50px] md:pb-0 xs:py-[50px]">
                <Container>
                    <Row className="justify-between md:justify-start">
                        <Col lg={{ span: 3, order: 0 }} sm={{ span: 6, order: 1 }} className="md:mb-[40px] xs:mb-[25px]">
                            <span className="font-serif font-medium block text-themecolor mb-[20px] xs:mb-[10px]">About company</span>
                            <p className="md:w-9/12 xs:w-full">Lorem ipsum dolor amet consectetur adipiscing elit do eiusmod tempor incididunt ut labore et dolore enim ad minim nostrud.</p>
                        </Col>
                        <FooterMenu data={FooterData.slice(0, 2)} lg={{ span: 2, order: 0 }} md={6} sm={{ span: 6, order: 2 }} className="xl:px-[15px] md:mb-[40px] xs:mb-[25px]" titleClass="capitalize leading-[20px] mb-[25px]" />
                        <Col xl={{ span: 3 }} lg={{ span: 4, order: 0, }} sm={{ span: 6, order: 3 }} md={5}>
                            <span className="font-serif font-medium block text-themecolor mb-[20px] xs:mb-[10px]">Subscribe to newsletter</span>
                            <p className="mb-[25px] md:mb-[20px]">Enter your email address for receiving valuable newsletters.</p>
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
                                    <>
                                        <Form className="w-full relative flex rounded-[0.25rem] overflow-hidden">
                                            <Input showErrorMsg={false} type="email" name="email" labelClass="w-full" className="border-[1px] border-solid border-transparent py-[13px] pl-[15px] pr-[15px] w-full" placeholder="Enter your email address" />
                                            <button aria-label="subscribe" type="submit" className={`text-lg tracking-[1px] py-[8px] px-[18px] btn-gradient uppercase${isSubmitting ? " loading" : ""}`} >
                                                <i className="feather-mail text-lg m-0"></i>
                                            </button>
                                        </Form>
                                        <AnimatePresence>
                                            {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-[20px] w-full text relative"><MessageBox className="absolute py-[13px] px-[20px] text-md leading-[20px] rounded-[4px]" theme="message-box01" variant="success" message="Your message has been sent successfully subscribed to our email list!" /></m.div>}
                                        </AnimatePresence>
                                    </>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="py-[35px] border-t border-[#ffffff1a]">
                <Container>
                    <Row>
                        <Col md={3} className="sm:mb-[20px]">
                            <Link aria-label="link" to="/" className="sm:flex sm:justify-center">
                                <img src={props.logo} alt="logo" width="111" height="36" />
                            </Link>
                        </Col>
                        <Col md={6} className="flex justify-center sm:mb-[20px]">
                            <p className="mb-0 xs:text-center">&copy; {new Date().getFullYear()} Litho is Proudly Powered by <a aria-label="themezaa" className="text-themecolor underline underline-offset-4" rel="noreferrer" target="_blank" href="https://www.themezaa.com/">ThemeZaa</a></p>
                        </Col>
                        <Col md={3}>
                            <SocialIcons size="xs" theme="social-icon-style-01" className="felx justify-end md:justify-center" iconColor={props.theme === "dark" ? "light" : "dark"} data={iconData} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </Footer>
    )
}

FooterStyle03.defaultProps = {
    data: FooterData,
    logo: "/assets/img/webp/logo-white.webp"
}

FooterStyle03.propTypes = {
    className: PropTypes.string,
    logo: PropTypes.string,
}

export default memo(FooterStyle03)
