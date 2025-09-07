import React from 'react'

// Libraries
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Components
import RotateBox from '../../Components/RotateBox/RotateBox'
import { fadeIn } from '../../Functions/GlobalAnimations'

// Data
import RotateBoxData from "../../Components/RotateBox/RotateBoxData"

const RotateBoxPage = () => {
    return (
        <>
            {/* Section Start */}
            <section className="bg-darkgray py-[25px]">
                <Container>
                    <Row className="items-center justify-center mb-0">
                        <Col xl={8} lg={6}>
                            <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Rotate box</h1>
                        </Col>
                        <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
                            <ul className="xs-text-center">
                                <li><Link aria-label="breadcrumb" to="/" className="hover:text-white">Home</Link></li>
                                <li><Link aria-label="breadcrumb" to="#" className="hover:text-white">Elements</Link></li>
                                <li>Rotate box</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                <Container>
                    <Row className="justify-center">
                        <Col xs={12} sm={8} md={12}> 
                            <RotateBox data={RotateBoxData} grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-10 justify-center" animation={fadeIn} />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default RotateBoxPage
