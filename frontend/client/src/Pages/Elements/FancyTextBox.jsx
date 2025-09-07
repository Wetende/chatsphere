import React from 'react'

// Libraries
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'
import FancyTextBox from '../../Components/FancyTextBox/FancyTextBox'

// Data
import { fancyTextBox01, fancyTextBox02, fancyTextBox03, fancyTextBox04, fancyTextBox05 } from '../../Components/FancyTextBox/FancyTextBoxData'

const FancyTextBoxPage = () => {
    return (
        <>
            {/* Section Start */}
            <section className="bg-darkgray py-[25px]">
                <Container>
                    <Row className="items-center justify-center mb-0">
                        <Col xl={8} lg={6}>
                            <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Fancy text box</h1>
                        </Col>
                        <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
                            <ul className="xs-text-center">
                                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                                <li>Fancy text box</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
                <Container fluid>
                    <Row>
                        <Col className="mb-[4%]">
                            <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px] ">Fancy text box style 01</h6>
                        </Col>
                    </Row>
                    <FancyTextBox
                        grid="row-cols-1 row-cols-xl-6 row-cols-md-3 row-cols-sm-2"
                        className="border-t"
                        theme="fancy-text-box-01"
                        data={fancyTextBox01}
                        animation={fadeIn} />
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="bg-lightgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
                <Container>
                    <Row>
                        <Col className="mb-[7%]">
                            <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px] ">Fancy text box style 02</h6>
                        </Col>
                    </Row>
                    <Row className="justify-center">
                        <Col xs={12} sm={8} md={12}>
                            <FancyTextBox
                                grid="justify-center row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-[30px] xs:gap-y-[15px]"
                                theme="fancy-text-box-02"
                                data={fancyTextBox02}
                                animation={fadeIn} />
                        </Col>
                    </Row>

                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
                <Container>
                    <Row>
                        <Col className="mb-[5%]">
                            <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px] ">Fancy text box style 03</h6>
                        </Col>
                    </Row>
                    <Row className="justify-center mt-12">
                        <Col xs={12} lg={12} md={8} sm={10}>
                            <FancyTextBox
                                grid="row-cols-1 row-cols-lg-2 gap-y-[15px]"
                                theme="fancy-text-box-03"
                                data={fancyTextBox03}
                                animation={fadeIn} />
                        </Col>
                    </Row>
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="bg-darkgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
                <Container>
                    <Row>
                        <Col className="mb-[7%]">
                            <h6 className="font-serif text-white text-center font-medium mb-[25px] lg:mb-[15px]">Fancy text box style 04</h6>
                        </Col>
                    </Row>
                    <FancyTextBox
                        grid="row-cols-1 row-cols-lg-2 gap-y-10 justify-center"
                        className="col-12 col-lg-4 col-md-6 col-md-9"
                        theme="fancy-text-box-04"
                        data={fancyTextBox04}
                        animation={fadeIn} />
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="bg-darkgray bg-cover bg-no-repeat relative" style={{ backgroundImage: "url(https://via.placeholder.com/1920x1000)" }} {...fadeIn}>
                <div className="absolute h-full w-full top-0 left-0 opacity-30 bg-darkgray"></div>
                <Container fluid className="px-0">
                    <FancyTextBox
                        grid="row row-cols-1 row-cols-xl-4 row-cols-sm-2 gx-0"
                        className="justify-center"
                        theme="fancy-text-box-05"
                        data={fancyTextBox05}
                        animation={fadeIn} />
                </Container>
            </m.section>
            {/* Section End */}
        </>
    )
}

export default FancyTextBoxPage