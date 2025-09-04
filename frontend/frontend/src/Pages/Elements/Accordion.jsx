import React from 'react'

// Libraries
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import { m } from "framer-motion"
import { Link } from 'react-router-dom'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'
import Accordions from '../../Components/Accordion/Accordion'

// Data
import  {AccordionData, AccordionData02, AccordionData05 } from '../../Components/Accordion/AccordionData'

const AccordionPage = () => {

    return (
        <>
            {/* Section Start */}
            <section className="bg-darkgray py-[25px]">
                <Container>
                    <Row className="items-center justify-center mb-0">
                        <Col xl={8} lg={6}>
                            <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Accordions</h1>
                        </Col>
                        <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
                            <ul className="xs-text-center">
                                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                                <li>Accordions</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            <section className="pt-20 switch-tabs">
                <Col className="text-center">
                    <h6 className="font-serif text-gray-900 text-center font-medium mb-[5%]">Accordions style 01</h6>
                </Col>
                <Tabs
                    defaultActiveKey="light"
                    id="uncontrolled-tab-example"
                    className="justify-center"
                >
                    {/* Accordion style 01 ( Light ) start */}
                    <Tab eventKey="light" title="LIGHT">
                        <m.section className="py-20 bg-lightgray">
                            <Container>
                                <Row className="justify-center">
                                    <Col lg={6} md={10}>
                                        <Accordions
                                            theme="accordion-style-01"
                                            className=""
                                            themeColor="light"
                                            animation={fadeIn}
                                            data={AccordionData}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </m.section>
                    </Tab>
                    {/* Accordion style 01 ( Light ) end */}
                    {/* Accordion style 01 ( Dark ) start */}
                    <Tab eventKey="dark" title="DARK">
                        <m.section className="py-20 bg-darkgray">
                            <Container>
                                <Row className="justify-center">
                                    <Col lg={6} md={10}>
                                        <Accordions
                                            theme="accordion-style-01"
                                            className=""
                                            animation={fadeIn}
                                            themeColor="dark"
                                            data={AccordionData}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </m.section>
                    </Tab>
                    {/* Accordion style 01 ( Start ) end */}
                </Tabs>
            </section>

            <section className="pt-20 switch-tabs">
                <Col className="text-center">
                    <h6 className="font-serif text-darkgray text-center font-medium mb-[5%]">Accordions style 02</h6>
                </Col>
                <Tabs
                    defaultActiveKey="light"
                    id="uncontrolled-tab-example"
                    className="justify-center"
                >
                    {/* Accordion style 02 ( Light ) start */}
                    <Tab eventKey="light" title="LIGHT">
                        <m.section className="py-20 bg-lightgray">
                            <Container>
                                <Row className="justify-center">
                                    <Col lg={6} md={10}>
                                        <Accordions
                                            theme="accordion-style-02"
                                            className=""
                                            animation={fadeIn}
                                            themeColor="light"
                                            data={AccordionData02}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </m.section>
                    </Tab>
                    {/* Accordion style 02 ( Light ) end */}
                    {/* Accordion style 02 ( Dark ) start */}
                    <Tab eventKey="dark" title="DARK">
                        <m.section className="py-20 bg-darkgray">
                            <Container>
                                <Row className="justify-center">
                                    <Col lg={6} md={10}>
                                        <Accordions
                                            theme="accordion-style-02"
                                            className=""
                                            animation={fadeIn}
                                            themeColor="dark"
                                            data={AccordionData02}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </m.section>
                    </Tab>
                    {/* Accordion style 02 ( Dark ) end */}
                </Tabs>
            </section>

            <section className="pt-20 switch-tabs">
                <Col className="text-center">
                    <h6 className="font-serif text-darkgray text-center font-medium mb-[5%]">Accordions style 03</h6>
                </Col>
                <Tabs
                    defaultActiveKey="light"
                    id="uncontrolled-tab-example"
                    className="justify-center"
                >
                    {/* Accordion style 03 ( Light ) start */}
                    <Tab eventKey="light" title="LIGHT">
                        <m.section className="py-20 bg-lightgray">
                            <Container>
                                <Row className="justify-center">
                                    <Col lg={6} md={10}>
                                        <Accordions theme="accordion-style-03" className="" animation={fadeIn} />
                                    </Col>
                                </Row>
                            </Container>
                        </m.section>
                    </Tab>
                    {/* Accordion style 03 ( Light ) end */}
                    {/* Accordion style 03 ( Dark ) start */}
                    <Tab eventKey="dark" title="DARK">
                        <m.section className="py-20 bg-darkgray">
                            <Container>
                                <Row className="justify-center">
                                    <Col lg={6} md={10}>
                                        <Accordions theme="accordion-style-03" className="" animation={fadeIn} themeColor="dark" />
                                    </Col>
                                </Row>
                            </Container>
                        </m.section>
                    </Tab>
                    {/* Accordion style 03 ( Dark ) end */}
                </Tabs>
            </section>

            <section className="pt-20 switch-tabs">
                <Col className="text-center">
                    <h6 className="font-serif text-darkgray text-center font-medium mb-[5%]">Accordions style 04</h6>
                </Col>
                <Tabs
                    defaultActiveKey="light"
                    id="uncontrolled-tab-example"
                    className="justify-center"
                >
                    {/* Accordion style 04 ( Light ) start */}
                    <Tab eventKey="light" title="LIGHT">
                        <m.section className="py-20 bg-lightgray">
                            <Container>
                                <Row className="justify-center">
                                    <Col lg={6} md={10}>
                                        <Accordions theme="accordion-style-04" className="" animation={fadeIn} themeColor="light" />
                                    </Col>
                                </Row>
                            </Container>
                        </m.section>
                    </Tab>
                    {/* Accordion style 04 ( Light ) end */}
                    {/* Accordion style 04 ( Dark ) start */}
                    <Tab eventKey="dark" title="DARK">
                        <m.section className="py-20 bg-darkpurple2">
                            <Container>
                                <Row className="justify-center">
                                    <Col lg={6} md={10}>
                                        <Accordions theme="accordion-style-04" className="" animation={fadeIn} themeColor="dark" />
                                    </Col>
                                </Row>
                            </Container>
                        </m.section>
                    </Tab>
                    {/* Accordion style 04 ( Start ) end */}
                </Tabs>
            </section>


            {/* Accordion style 05 ( Start ) end */}
            <section className="pt-20 switch-tabs">
                <Col className="text-center">
                    <h6 className="font-serif text-darkgray text-center font-medium mb-[5%]">Accordions style 05</h6>
                </Col>
                <Tabs
                    defaultActiveKey="light"
                    id="uncontrolled-tab-example"
                    className="justify-center"
                >
                    {/* Accordion style 05 ( Light ) start */}
                    <Tab eventKey="light" title="LIGHT">
                        <m.section className="py-20 bg-lightgray">
                            <Container>
                                <Row className="justify-center">
                                    <Col lg={10} className="px-0">
                                        <Accordions
                                            theme="accordion-style-05"
                                            className=""
                                            animation={fadeIn}
                                            themeColor="light"
                                            data={AccordionData05}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </m.section>
                    </Tab>
                    {/* Accordion style 05 ( Light ) end */}
                    {/* Accordion style 05 ( Dark ) start */}
                    <Tab eventKey="dark" title="DARK">
                        <m.section className="py-20 bg-darkgray">
                            <Container>
                                <Row className="justify-center">
                                    <Col lg={10} className="px-0">
                                        <Accordions
                                            theme="accordion-style-05"
                                            className=""
                                            animation={fadeIn}
                                            themeColor="dark"
                                            data={AccordionData05}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </m.section>
                    </Tab>
                    {/* Accordion style 05 ( Dark ) end */}
                </Tabs>
            </section>
        </>
    )
}

export default AccordionPage