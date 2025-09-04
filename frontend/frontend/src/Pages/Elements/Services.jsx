import React from 'react'

// Libraries
import { Container, Row, Col } from 'react-bootstrap'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'
import Services from '../../Components/Services/Services'
import ServicesStyle07 from '../../Components/Services/ServicesStyle07'

// Data
import { serviceData1, serviceData2, serviceData3, serviceData4, serviceData5, serviceData6, serviceData7 } from '../../Components/Services/ServicesData'

const ServicesPage = () => {
    return (
        <>
            {/* Section Start */}
            <section className="bg-darkgray py-[25px]">
                <Container>
                    <Row className="items-center justify-center mb-0">
                        <Col xl={8} lg={6}>
                            <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Services</h1>
                        </Col>
                        <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
                            <ul className="xs-text-center">
                                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                                <li>Services</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center mb-[6%]">
                            <h6 className="font-serif text-darkgray font-medium">Services style 01</h6>
                        </Col>
                    </Row>
                    <Services grid="row-cols-1 row-cols-lg-3 row-cols-sm-2 gap-y-10 justify-center text-center" theme='service-style-01' className="" data={serviceData1} animation={fadeIn} />
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="bg-lightgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center mb-[7%]">
                            <h6 className="font-serif text-darkgray font-medium">Services style 02</h6>
                        </Col>
                    </Row>
                    <Services grid="row-cols-1 row-cols-lg-3 row-cols-md-2 gap-y-10 justify-center" theme='service-style-02' className="" data={serviceData2} animation={fadeIn} />
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="bg-darkgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center mb-[7%]">
                            <h6 className="font-serif text-white font-medium">Services style 03</h6>
                        </Col>
                    </Row>
                    <Services grid="row-cols-1 row-cols-lg-3 row-cols-md-2 gap-y-10 justify-center" theme='service-style-03' className="" data={serviceData3} animation={fadeIn} />
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:pt-[50px] xs:pb-0" {...fadeIn}>
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center mb-[6%]">
                            <h6 className="font-serif text-darkgray font-medium">Services style 04</h6>
                        </Col>
                    </Row>
                    <Services grid="row-cols-1 row-cols-lg-3 row-cols-sm-2 gap-y-24 md:gap-y-[4rem] justify-center" theme='service-style-04' className="" data={serviceData4} animation={fadeIn} />
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="bg-lightgray border-t py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center mb-[7%]">
                            <h6 className="font-serif text-darkgray font-medium">Services style 05</h6>
                        </Col>
                    </Row>
                    <Row className="justify-center">
                        <Col lg={12} md={11} xs={12} className="md:px-0">
                            <Services grid="row-cols-lg-3 row-cols-1 md:my-0 md:mx-auto gap-y-10 justify-center" theme='service-style-05' className="col-md-10" data={serviceData5} animation={fadeIn} />
                        </Col>
                    </Row>
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center mb-[5%]">
                            <h6 className="font-serif text-darkgray font-medium">Services style 06</h6>
                        </Col>
                    </Row>
                    <Row className="justify-center">
                        <Col lg={12} md={11} xs={12} className="md:px-0">
                            <Services grid="row row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-[40px] justify-center" theme='service-style-06' data={serviceData6} animation={fadeIn} />
                        </Col>
                    </Row>
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="bg-darkslateblue py-[160px] relative overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                <Container>
                    <Row className="justify-center">
                        <Col md={12} className="text-center mb-[7%]">
                            <h6 className="font-serif text-white font-medium">Services style 07</h6>
                        </Col>
                    </Row>
                    <Row className="justify-center">
                        <Col lg={12} md={9} xs={12} className="md:px-0 xs:!px-[15px]">
                            <ServicesStyle07
                                className=""
                                data={serviceData7}
                                carouselOption={{
                                    spaceBetween: 30,
                                    slidesPerView: 1,
                                    observer: true,
                                    observeParents: true,
                                    loop: true,
                                    autoplay: { delay: 3000, disableOnInteraction: false },
                                    keyboard: { enabled: true, onlyInViewport: true },
                                    breakpoints: { 992: { slidesPerView: 2 } }
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </m.section>
            {/* Section End */}
        </>
    )
}


export default ServicesPage