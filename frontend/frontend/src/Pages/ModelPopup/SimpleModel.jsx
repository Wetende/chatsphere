import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from "framer-motion"

// Components
import Buttons from '../../Components/Button/Buttons'
import CustomModal from '../../Components/CustomModal'
import { fadeIn } from "../../Functions/GlobalAnimations"

const SimpleModel = () => {
    // Simple modal popup
    return (
        <>
            {/* Page Title Section Start */}
            <m.section className="bg-darkgray py-[25px] page-title-small p-[130px] xxs:px-0" {...fadeIn}>
                <Container>
                    <Row className="items-center justify-center">
                        <Col xl={8} lg={6}>
                            <h1 className="font-serif text-lg text-white font-medium mb-0 md:text-center">Simple modal</h1>
                        </Col>
                        <Col xl={4} lg={6} className="breadcrumb justify-end text-sm font-serif mb-0 md:mt-[10px] md:justify-center">
                            <ul className="xs:text-center">
                                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                                <li><Link to="#" aria-label="breadcrumb" className="hover:text-white">Features</Link></li>
                                <li>Simple modal</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </m.section>
            {/* Page Title Section End */}

            {/* Section Start */}
            <m.section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center">
                            <h6 className="font-serif text-darkgray font-medium">Simple modal popup</h6>
                        </Col>
                        <Col lg={8} xl={4} md={10} xs={12} className="text-center flex-col">
                            <h6 className="font-light mb-[8%] sm:mb-[30px]">A modal popup disables the usual ways to close popups.</h6>
                            {/* Modal Component Start */}
                            <CustomModal.Wrapper
                                modalBtn={<Buttons type="submit" className="btn-fill font-medium rounded font-serif uppercase md:mb-[15px] xs:mb-0" themeColor="#0038e3" color="#fff" size="md" title="Open Modal" />}
                                closeBtnOuter={false}
                            >
                                <div className="w-[500px] sm:w-full justify-center">
                                    <div className="p-[4.5rem] relative bg-white rounded sm:px-10">
                                        <div className="mx-auto text-center modal-popup-main rounded-[6px] sm:px-[2.5rem] xs:px-0">
                                            <CustomModal.Close className="absolute top-[5px] right-[5px]"><button className="border-none text-black text-[30px] w-[44px] h-[44px] flex items-center justify-center hover:text-[#333]">×</button></CustomModal.Close>
                                            <span className="text-darkgray uppercase font-serif text-xlg font-semibold mb-[15px] block md:text-lg md:leading-[26px]">Simple Modal Popup</span>
                                            <p className="mb-[25px] text-[#828282] xs:mb-[15px]">Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been the industry's standard dummy text ever.</p>
                                            <CustomModal.Close><Buttons type="submit" className="font-medium font-serif uppercase rounded-none md:mb-[15px] bg-[#fff] hover:text-[#fff]" color="#000" size="md" themeColor="#232323" title="Dismiss" /></CustomModal.Close>
                                        </div>
                                    </div>
                                </div>
                            </CustomModal.Wrapper>
                            {/* Modal Component End */}
                        </Col>
                    </Row>
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="py-[130px] overflow-hidden bg-lightgray md:py-[75px] sm:py-[50px]" {...fadeIn}>
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center">
                            <h6 className="font-serif text-darkgray font-medium">Dialog with css animation</h6>
                        </Col>
                        <Col lg={8} xl={6} md={10} xs={12} className="text-center flex-col">
                            <h6 className="font-light mb-[8%] sm:mb-[30px]">Animations are added with simple CSS transitions, you can make them look however you wish.</h6>

                            {/* Modal Component Start */}
                            <CustomModal.Wrapper
                                animation="fade-zoom"
                                closeBtnOuter={false}
                                modalBtn={<Buttons type="submit" className="btn-fill font-medium rounded font-serif uppercase md:mb-[15px]" themeColor="#0038e3" color="#fff" size="md" title="Open with fade-zoom animation" />}
                            >
                                <div className="w-[500px] sm:w-full justify-center">
                                    <div className="p-[4.5rem] relative bg-white rounded sm:px-10">
                                        <div className="mx-auto text-center rounded-[6px] sm:px-[2.5rem] xs:px-0">
                                            <CustomModal.Close className="absolute top-[5px] right-[5px]"><button className="border-none text-black text-[30px] w-[44px] h-[44px] flex items-center justify-center hover:text-[#333]">×</button></CustomModal.Close>
                                            <span className="text-darkgray uppercase font-serif text-xlg font-semibold mb-[15px] block md:text-lg md:leading-[26px]">OPEN WITH FADE-ZOOM ANIMATION </span>
                                            <p className="mb-[25px] text-[#828282] xs:px-[15px]">Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been the industry's standard dummy text ever.</p>
                                            <CustomModal.Close><Buttons type="submit" className="font-medium font-serif uppercase rounded-none md:mb-[15px] bg-[#fff] hover:text-[#fff]" color="#000" size="md" themeColor="#232323" title="Dismiss" /></CustomModal.Close>
                                        </div>
                                    </div>
                                </div>
                            </CustomModal.Wrapper>
                            {/* Modal Component End */}
                        </Col>
                    </Row>
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="py-[130px] overflow-hidden md:py-[75px] sm:py-[50px]" {...fadeIn}>
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center">
                            <h6 className="font-serif text-darkgray font-medium">Dialog with css animation</h6>
                        </Col>
                        <Col lg={8} xl={6} md={10} xs={12} className="text-center flex-col">
                            <h6 className="font-light mb-[8%] sm:mb-[30px]">Animations are added with simple CSS transitions, you can make them look however you wish.</h6>

                            {/* Modal Component Start */}
                            <CustomModal.Wrapper
                                animation="rotate-zoom"
                                closeBtnOuter={false}
                                modalBtn={<Buttons type="submit" className="btn-fill font-medium rounded font-serif uppercase md:mb-[15px]" themeColor="#0038e3" color="#fff" size="md" title="Open with fade-zoom animation" />}
                            >
                                <div className="w-[500px] sm:w-full p-[4.5rem] relative bg-white rounded mx-auto sm:px-10">
                                    <div className="mx-auto text-center rounded-[6px] sm:px-[2.5rem] xs:px-0">
                                        <CustomModal.Close className="absolute top-[5px] right-[5px]"><button className="border-none text-black text-[30px] w-[44px] h-[44px] flex items-center justify-center hover:text-[#333]">×</button></CustomModal.Close>
                                        <span className="text-darkgray uppercase font-serif text-xlg font-semibold mb-[15px] block md:text-lg md:leading-[26px]">OPEN WITH FADE-ZOOM ANIMATION </span>
                                        <p className="mb-[25px] text-[#828282] xs:px-[15px]">Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been the industry's standard dummy text ever.</p>
                                        <CustomModal.Close><Buttons type="submit" className="font-medium font-serif uppercase rounded-none md:mb-[15px] bg-[#fff] hover:text-[#fff]" color="#000" size="md" themeColor="#232323" title="Dismiss" /></CustomModal.Close>
                                    </div>
                                </div>
                            </CustomModal.Wrapper>
                            {/* Modal Component End */}
                        </Col>
                    </Row>
                </Container>
            </m.section>
            {/* Section End */}
        </>
    )
}

export default SimpleModel