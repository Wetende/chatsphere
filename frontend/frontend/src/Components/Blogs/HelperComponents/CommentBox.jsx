import React from 'react'

// Libraries
import { Form, Formik } from "formik"
import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { m, AnimatePresence } from 'framer-motion'
import { Link as ScrollTo } from "react-scroll"

// Components
import { ContactFormStyle02Schema } from "../../Form/FormSchema"
import { Input } from '../../Form/Form'
import Buttons from '../../Button/Buttons'
import MessageBox from "../../MessageBox/MessageBox"
import { fadeIn } from '../../../Functions/GlobalAnimations'
import { resetForm } from '../../../Functions/Utilities'

const CommentBox = () => {
    return (
        <>
            <m.section {...fadeIn} className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container>
                    <Row className="justify-center">
                        <Col md={6} className="text-center mb-20">
                            <h6 className="font-serif text-darkgray font-medium">4 Comments</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={9} className="mx-auto">
                            <ul className="blog-comment">
                                <li>
                                    <div className="flex w-full md:items-start sm:block">
                                        <div className="inline-block w-[75px] sm:w-[50px] sm:mb-[10px]">
                                            <img height="" width="" src="https://via.placeholder.com/125x125" className="rounded-full w-[95%] sm:w-full" alt="" />
                                        </div>
                                        <div className="w-full pl-[25px] sm:pl-0">
                                            <Link aria-label="link" to="#" className="text-darkgray font-serif font-medium text-md hover:text-fastblue">Herman Miller</Link>
                                            <ScrollTo to="comments" offset={-100} delay={0} spy={true} smooth={true} duration={800} className="btn-reply py-[7px] px-[16px] text-spanishgray uppercase">Reply</ScrollTo>
                                            <div className="text-md text-spanishgray mb-[15px]">17 July 2020, 6:05 PM</div>
                                            <p className="w-[85%]">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the make a type specimen book.</p>
                                        </div>
                                    </div>
                                    <ul className="child-comment ml-[70px]">
                                        <li className="mt-[60px]">
                                            <div className="flex w-full md:items-start sm:block">
                                                <div className="inline-block w-[75px] sm:w-[50px] sm:mb-[10px]">
                                                    <img height="" width="" src="https://via.placeholder.com/125x125" className="rounded-full w-[95%] sm:w-full" alt="" />
                                                </div>
                                                <div className="w-full pl-[25px] sm:pl-0">
                                                    <Link aria-label="link" to="#" className="text-darkgray font-serif font-medium text-md hover:text-fastblue">Wilbur Haddock</Link>
                                                    <ScrollTo to="comments" offset={-100} delay={0} spy={true} smooth={true} duration={800} className="btn-reply py-[7px] px-[16px] text-spanishgray uppercase">Reply</ScrollTo>
                                                    <div className="text-md text-spanishgray mb-[15px">18 July 2020, 10:19 PM</div>
                                                    <p className="w-[85%]">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since.</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="mt-[60px] pb-[65px]">
                                            <div className="bg-lightgray flex w-full rounded-[5px] p-[40px] md:items-start md:p-[30px] sm:p-[20px] sm:block">
                                                <div className="w-[75px] sm:w-[50px] sm:mb-[10px]">
                                                    <img height="" width="" src="https://via.placeholder.com/125x125" className="rounded-full w-[95%] sm:w-full" alt="" />
                                                </div>
                                                <div className="w-full pl-[25px] sm:pl-0">
                                                    <Link aria-label="link" to="#" className="text-darkgray font-serif font-medium text-md hover:text-fastblue">Colene Landin</Link>
                                                    <ScrollTo to="comments" offset={-100} delay={0} spy={true} smooth={true} duration={800} className="btn-reply py-[7px] px-[16px] text-spanishgray uppercase">Reply</ScrollTo>
                                                    <div className="text-md text-spanishgray mb-[15px]">18 July 2020, 12:39 PM</div>
                                                    <p className="w-[85%]">Lorem ipsum is simply dummy text of the printing and typesetting industry. Ipsum has been the industry's standard dummy text ever since.</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                <li className="">
                                    <div className="flex w-full md:items-start  sm:block ">
                                        <div className="w-[75px] sm:w-[50px] sm:mb-[10px]">
                                            <img height="" width="" src="https://via.placeholder.com/125x125" className="rounded-full w-[95%] sm:w-full" alt="" />
                                        </div>
                                        <div className="w-full pl-[25px] sm:pl-0">
                                            <Link aria-label="link" to="#" className="text-darkgray font-serif font-medium text-md hover:text-fastblue">Jennifer Freeman</Link>
                                            <ScrollTo to="comments" offset={-100} delay={0} spy={true} smooth={true} duration={800} className="btn-reply py-[7px] px-[16px] text-spanishgray uppercase">Reply</ScrollTo>
                                            <div className="text-md text-spanishgray mb-[15px]">19 July 2020, 8:25 PM</div>
                                            <p className="w-[85%]">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the make a type specimen book.</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </m.section>
            <m.section {...fadeIn} id="comments" className="pt-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden">
                <Container>
                    <Row className="justify-center">
                        <Col lg={9} className="mb-16 sm:mb-8">
                            <h6 className="font-serif text-darkgray font-medium mb-[5px]">Write a comments</h6>
                            <div className="mb-[5px]">Your email address will not be published. Required fields are marked <span className="text-[#fb4f58]">*</span></div>
                        </Col>
                    </Row>
                    <Row className="justify-center">
                        <Col lg={9}>
                            <Formik
                                initialValues={{ name: '', email: '', comment: '' }}
                                validationSchema={ContactFormStyle02Schema}
                                onSubmit={async (values, actions) => {
                                    await new Promise((r) => setTimeout(r, 500));
                                    resetForm(actions)
                                }}>
                                {({ isSubmitting, status }) => (
                                    <Form className="row mb-[30px]">
                                        <Col md={6} sm={12} xs={12}>
                                            <Input showErrorMsg={false} label={<span className="inline-block mb-[15px]">Your name <span className="text-red-500">*</span> </span>} type="text" name="name" labelClass="mb-[25px]" className="rounded-[5px] py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Enter your name" />
                                        </Col>
                                        <Col md={6} sm={12} xs={12}>
                                            <Input showErrorMsg={false} label={<span className="inline-block mb-[15px]">Your email address <span className="text-red-500">*</span> </span>} type="email" name="email" labelClass="mb-[25px]" className="rounded-[5px] py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Enter your email" />
                                        </Col>
                                        <Col md={12} sm={12} xs={12}>
                                            <label className="mb-[15px]">Your comment</label>
                                            <textarea className="mb-[2.5rem] rounded-[4px] py-[15px] px-[20px] h-[120px] w-full bg-transparent border border-[#dfdfdf] text-md resize-none" rows="6" name="comment" placeholder="Enter your comment"></textarea>
                                        </Col>
                                        <Col>
                                            <Buttons type="submit" className={`tracking-[0.5px] btn-fill rounded-[2px] font-medium uppercase${isSubmitting ? " loading" : ""}`} themeColor="#232323" size="md" color="#fff" title="Post comment" />
                                        </Col>
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

export default CommentBox