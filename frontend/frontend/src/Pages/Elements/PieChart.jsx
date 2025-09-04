import React from 'react'

// Libraries
import { Row, Col, Container } from 'react-bootstrap'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

// Data
import { PiechartData1, PiechartData2 } from '../../Components/PieChart/PieChartData'

// Component
import Piechart from '../../Components/PieChart/PieChart'
import { fadeIn } from '../../Functions/GlobalAnimations'

const PieChartPage = () => {
    return (
        <>
            {/* Section Start */}
            <section className="bg-darkgray py-[25px]">
                <Container>
                    <Row className="items-center justify-center mb-0">
                        <Col xl={8} lg={6}>
                            <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Pie charts</h1>
                        </Col>
                        <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
                            <ul className="xs-text-center">
                                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                                <li>Pie charts</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
                <Container>
                    <Row>
                        <Col className="mb-[7%]">
                            <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Pie charts style 01</h6>
                        </Col>
                    </Row>
                    <Piechart
                        className="text-center font-serif"
                        grid="row-cols-1 row-cols-md-3 row-cols-sm-2 justify-center gap-y-10"
                        theme="piechart-style-01"
                        data={PiechartData1}
                        pathColor={['#be85f5', '#fc9297']}
                        trailColor="#f5f5f5"
                        pathWidth={7}
                        trailWidth={7}
                        textStyle={{ fontSize: "32px", fill: "#232323", }}
                    />
                </Container>
            </m.section>
            {/* Section End */}

            {/* Section Start*/}
            <m.section className="bg-gray-100 py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                <Container>
                    <Row>
                        <Col className="mb-[6%]">
                            <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Pie charts style 02</h6>
                        </Col>
                    </Row>
                    <Piechart
                        grid="row row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-center gap-y-10"
                        className="text-center flex justify-center flex-col items-center"
                        theme="piechart-style-02"
                        data={PiechartData2}
                        trailColor="#f5f5f5"
                        pathColor={['#5d6ff9', '#f77993']}
                        pathWidth={12}
                        trailWidth={12}
                        textStyle={{ fill: '#232323', fontWeight: 500, fontSize: 45, letterSpacing: '-1px' }}
                    />
                </Container>
            </m.section>
            {/* Section End */}

        </>
    )
}

export default PieChartPage
