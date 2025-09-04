import React from 'react'
// Libraries
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Components
import OverLineIconBox from '../../Components/OverlineIconBox/OverLineIconBox'
import { fadeIn } from '../../Functions/GlobalAnimations'

// Data
import { OverLineData } from '../../Components/OverlineIconBox/OverLineIconBoxData'

const OverLineIconBoxPage = () => {

    return (
        <>
            {/* Section Start */}
            <section className="bg-darkgray py-[25px]">
                <Container>
                    <Row className="items-center justify-center mb-0">
                        <Col xl={8} lg={6}>
                            <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Overline icon box</h1>
                        </Col>
                        <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
                            <ul className="xs-text-center">
                                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                                <li>Overline icon box</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            <section className="bg-lightgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                <Container>
                    <OverLineIconBox
                        grid="row-cols-1 row-cols-lg-3 row-cols-sm-2 justify-center gap-y-10"
                        data={OverLineData}
                        className=""
                        animation={fadeIn} />
                </Container>
            </section>
        </>
    )
}

export default OverLineIconBoxPage