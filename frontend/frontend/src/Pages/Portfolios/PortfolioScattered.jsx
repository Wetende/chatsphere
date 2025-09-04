import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Parallax } from "react-scroll-parallax";

// Components
import PortfolioScattered from '../../Components/Portfolio/PortfolioScattered'

// Data
import { portfolioScatteredData } from '../../Components/Portfolio/PortfolioData'

const PortfolioScatteredPage = (props) => {
    return (
        <div style={props.style}>
            {/* Parallax Section Start */}
            <div className="h-[450px] sm:h-[350px] overflow-hidden md:relative">
                <Parallax className="lg-no-parallax bg-cover absolute top-[0] md:top-[-66px] xs:top-[-80px] md:h-[550px] left-0 w-full h-full" translateY={[-40, 40]} style={{ backgroundImage: `url(/assets/img/webp/portfolio-bg.webp)` }}></Parallax>
                <Container className="h-full relative flex justify-center items-center">
                    <Row className="justify-center h-full w-full xs:h-[70%]">
                        <Col xl={6} lg={6} sm={8} className="text-center flex justify-center flex-col font-serif w-full">
                            <h1 className="text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] mb-[15px] inline-block text-xmd">Portfolio scattered masonry column</h1>
                            <h2 className="text-darkgray font-medium -tracking-[1px] mb-0">Portfolio scattered</h2>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Parallax Section End */}

            <section className="pt-0 px-[7%] pb-[130px] lg:pb-[90px] md:pb-[75px] sm:pb-[50px] relative md:px-[3%] sm:px-0 lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container fluid>
                    <PortfolioScattered grid="row row-cols-1 row-cols-xl-4 row-cols-lg-2 row-cols-md-2 portfolio-scattered" data={portfolioScatteredData} />
                </Container>
            </section>
        </div>
    )
}

export default PortfolioScatteredPage