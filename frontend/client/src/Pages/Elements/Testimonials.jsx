import React from 'react'

// Libraries
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'
import Testimonials from '../../Components/Testimonials/Testimonials'

// Data
import { TestimonialsData01, TestimonialsData02, TestimonialsData03, TestimonialsData04, TestimonialsData05 } from '../../Components/Testimonials/TestimonialsData'

const TestimonialsPage = (props) => {
    return (
        <>
            {/* Section Start */}
            <section className="bg-darkgray py-[25px]">
                <Container>
                    <Row className="items-center justify-center mb-0">
                        <Col xl={8} lg={6}>
                            <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Testimonials</h1>
                        </Col>
                        <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
                            <ul className="xs-text-center">
                                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                                <li>Testimonials</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Light Start */}
            <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center mb-[8%]">
                            <h6 className="font-serif text-darkgray font-medium">Testimonials style 01</h6>
                        </Col>
                    </Row>
                    <Row className="justify-center">
                        <Col xs={12} sm={8} md={12}>
                            <Testimonials
                                grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-[50px] justify-center"
                                theme="testimonials-style-01"
                                className="sm:px-0"
                                data={TestimonialsData01}
                                animation={fadeIn}
                                animationDelay={0.2} />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section Light End */}

            {/* Section Start */}
            <section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <h6 className="font-serif text-gray-900 text-center font-medium mb-24">Testimonials style 02</h6>
                <Container>
                    <Row className="justify-center">
                        <Col sm={12}>
                            <Testimonials
                                grid="row-cols-1 row-cols-md-2 row-cols-lg-3 justify-center gap-y-[30px]"
                                theme='testimonials-style-02'
                                className=""
                                data={TestimonialsData02}
                                animation={fadeIn}
                                animationDelay={0.2} />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="bg-lightgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] border-t">
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center mb-[6%]">
                            <h6 className="font-serif text-darkgray font-medium">Testimonials style 03</h6>
                        </Col>
                    </Row>
                    <Row className="justify-center">
                        <Col xs={12} sm={8} md={12}>
                            <Testimonials
                                grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-[30px] justify-center"
                                theme='testimonials-style-03'
                                className="sm:px-0"
                                data={TestimonialsData03}
                                animation={fadeIn}
                                animationDelay={0.3} />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center mb-[6%]">
                            <h6 className="font-serif text-darkgray font-medium">Testimonials style 04</h6>
                        </Col>
                    </Row>
                    <Row className="justify-center">
                        <Col xs={12} sm={8} md={12}>
                            <Testimonials
                                grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-[30px] justify-center"
                                theme='testimonials-style-04'
                                className="sm:px-0"
                                data={TestimonialsData04}
                                animation={fadeIn}
                                animationDelay={0.2} />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="bg-lightgray py-[160px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center mb-[6%]">
                            <h6 className="font-serif text-darkgray font-medium">Testimonials style 05</h6>
                        </Col>
                    </Row>
                    <Row className="justify-center">
                        <Col sm={12}>
                            <Testimonials
                                grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-[30px] justify-center"
                                theme='testimonials-style-05'
                                className=""
                                data={TestimonialsData05}
                                animation={fadeIn}
                                animationDelay={0.2} />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}
        </>
    )
}

export default TestimonialsPage