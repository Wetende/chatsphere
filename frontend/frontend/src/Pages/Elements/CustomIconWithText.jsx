import React from 'react'

// Libraries
import { Container, Row, Col } from 'react-bootstrap'
import { fadeIn } from '../../Functions/GlobalAnimations'
import { Link } from 'react-router-dom'

// Components
import CustomIconWithText from '../../Components/CustomIconWithText/CustomIconWithText'

// Data
import { CustomIconWithTextData1, CustomIconWithTextData2 } from '../../Components/CustomIconWithText/CustomIconWithTextData'

const CustomIconWithTextPage = () => {
    return (
        <>

            {/* Section Start */}
            <section className="bg-darkgray py-[25px]">
                <Container>
                    <Row className="items-center justify-center mb-0">
                        <Col xl={8} lg={6}>
                            <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Custom icon with text</h1>
                        </Col>
                        <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
                            <ul className="xs-text-center">
                                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                                <li>Custom icon with text</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Section Start */}
            <section className="bg-lightgray text-center py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                <Container>
                <Row>
                    <Col className="mb-[6%]">
                    <h6 className="font-medium text-darkgray mb-[25px] lg:mb-[15px] font-serif xs:text-[20px]">Custom icon with text style 01</h6>
                    </Col>
                </Row>
                    <CustomIconWithText
                        grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 justify-center gap-y-10"
                        className=""
                        theme="custom-icon-with-text01"
                        data={CustomIconWithTextData1}
                        animation={fadeIn} />
                </Container>
            </section>
            {/* Section Edn */}

            {/* Section Start */}
            <section className="bg-lightgray border-t border-solid border-mediumgray text-center grid-rows-3 grid-cols-2 py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                <Container>
                <Row>
                    <Col className="mb-[4%]">
                    <h6 className="font-medium text-darkgray mb-[25px] lg:mb-[15px] font-serif xs:text-[20px]">Custom icon with text style 02</h6>
                    </Col>
                </Row>
                    <CustomIconWithText
                        grid="row-cols-1 row-cols-lg-3 row-cols-sm-2"
                        theme="custom-icon-with-text02"
                        data={CustomIconWithTextData2}
                        animation={fadeIn} />
                </Container>
            </section>
            {/* Section End */}
        </>
    )
}

export default CustomIconWithTextPage