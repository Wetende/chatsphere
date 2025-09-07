import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import {ReactTyped} from 'react-typed';
import { Link } from 'react-router-dom'

// Components
import { TiltBox, TextAnime } from '../../Components/FancyText/FancyText'
import { fadeIn } from '../../Functions/GlobalAnimations'

const FancyTextPage = () => {
    return (
        <>
            {/* Section Start */}
            <section className="bg-darkgray py-[25px]">
                <Container>
                    <Row className="items-center justify-center mb-0">
                        <Col xl={8} lg={6}>
                            <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Fancy text</h1>
                        </Col>
                        <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
                            <ul className="xs-text-center">
                                <li><Link to="/" aria-label="link" className="hover:text-white">Home</Link></li>
                                <li><Link to="#" aria-label="link" className="hover:text-white">Elements</Link></li>
                                <li>Fancy text</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] border-b border-solid" {...fadeIn}>
                <Container>
                    <Row>
                        <Col className="mb-[6%]">
                            <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Fancy text style 01</h6>
                        </Col>
                    </Row>
                    <Row className="row-cols-1 justify-center">
                        <Col xl={8} lg={10} className="text-center">
                            <div className="w-[40px] h-[2px] bg-gradient-to-tr from-[#ff6557] via-[#ff4271] to-[#ff367c] transform rotate-90 my-[30px] inline-block"></div>
                            <h3 className="font-serif font-medium text-darkgray -tracking-[1px]">We focus on creative and <span className="text-gradient bg-gradient-to-tr from-[#ff6052] to-[#ff367c] font-semibold">strategically</span> driven <span className="text-gradient bg-gradient-to-tr from-[#ff6557] to-[#ff367c] font-semibold">innovative</span></h3>
                        </Col>
                    </Row>
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="overflow-hidden py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
                <Container fluid>
                    <Row>
                        <Col className="mb-[4%]">
                            <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Fancy text style 02</h6>
                        </Col>
                    </Row>
                    <TiltBox>
                        <span className="font-serif title cover-background font-bold text-center text-[230px] -tracking-[5px] uppercase bg-darkgray lg:text-[170px] lg:leading-[170px] md:text-[130px] md:leading-[130px] sm:text-[100px] sm:leading-[100px] xs:text-[55px] xs:leading-[55px] xs:-tracking-[1px] leading-none"
                            style={{ backgroundImage: `url(https://via.placeholder.com/1920x1091)` }}>Together
                        </span>
                    </TiltBox>
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
                <Container>
                    <Row>
                        <Col className="mb-[5%]">
                            <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Fancy text style 03</h6>
                        </Col>
                    </Row>
                    <Row className="justify-center">
                        <Col className="text-center">
                            <h2 className="text-darkgray font-light">we <span className="inline-block font-semibold border-b-2 border-fastblue">create</span> the trend</h2>
                        </Col>
                    </Row>
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <section className="py-[160px] lg:py-[120px] md:py-[95px] xs:py-[50px] overflow-hidden">
                <Container className="">
                    <Row className="justify-center">
                        <Row>
                            <Col className="mb-[9%] text-center">
                                <h6 className="font-medium text-darkgray font-serif mb-[25px] lg:mb-[15px]">Fancy text style 04</h6>
                            </Col>
                        </Row>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <h1 className="mb-[7%] font-serif">
                                <span className="text-darkgray mr-[18px] xs:mr-0">We create the</span>
                                <TextAnime duration={3000} className="font-semibold xxs:text-center" color="#232323" animation="rotate" data={["perfect", "design", "code", "delivered"]} />
                            </h1>
                            <h2 className="mb-[7%] font-serif">
                                <span className="text-darkgray mr-[18px]">We create the</span>
                                <ReactTyped
                                    className="font-semibold text-darkgray text-left w-[260px] inline-block leading-[22px]"
                                    strings={["perfect", "design", "code", "delivered"]}
                                    typeSpeed={150}
                                    backSpeed={100}
                                    loop
                                    showCursor
                                    cursorChar="|"
                                />
                            </h2>
                            <h3 className="mb-[7%] font-serif">
                                <span className="text-darkgray mr-[16px]">We create the</span>
                                <TextAnime duration={3000} charSpeed={1000} className="font-semibold xxs:text-center" color="#232323" animation="flip" data={["perfect", "design", "code", "delivered"]} />
                            </h3>
                            <h4 className="mb-[7%] font-serif">
                                <span className="text-darkgray mr-[16px]">We create the</span>
                                <TextAnime duration={3000} className="font-semibold xxs:text-center" lineColor="#5971ff" color="#232323" animation="loading-bar" data={["perfect", "design", "code", "delivered"]} />
                            </h4>
                            <h5 className="mb-[7%] font-serif">
                                <span className="text-darkgray mr-[16px]">We create the</span>
                                <TextAnime duration={3000} className="font-semibold xxs:text-center" color="#232323" animation="slide" data={["perfect", "design", "code", "delivered"]} />
                            </h5>
                            <h6 className="mb-[7%] font-serif">
                                <span className="text-darkgray mr-[14px]">We create the</span>
                                <TextAnime duration={3000} className="font-semibold xxs:text-center" color="#232323" animation="zoom" data={["perfect", "design", "code", "delivered"]} />
                            </h6>
                            <h6 className="mb-[7%] font-serif xxs:flex xxs:justify-center">
                                <span className="text-darkgray mr-[10px]">We create the</span>
                                <TextAnime duration={3000} className="font-semibold" animation="push" color="#232323" data={["perfect", "design", "code", "delivered"]} />
                            </h6>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}
        </>
    )
}

export default FancyTextPage