import React from "react";
// Librarie
import { Col, Container, Row } from 'react-bootstrap'
import { Parallax } from "react-scroll-parallax";

// Component
import PortfolioOverlay from '../../../Components/Portfolio/PortfolioOverlay'

// Data
import { FilterData, portfolioOverlayMetroData } from '../../../Components/Portfolio/PortfolioData'

const portfolioOverlayMetroPage = (props) => {
  return (
    <div style={props.style}>
      {/* Parallax Section Start */}
      <div className="py-[80px] h-auto overflow-hidden md:relative md:py-[40px]">
        <Parallax className="lg-no-parallax absolute top-[0] w-full h-full bg-no-repeat lg:bg-cover" translateY={[-40, 40]} style={{ backgroundImage: `url(/assets/img/webp/portfolio-bg.webp)` }}></Parallax>
        <Container className="h-full relative">
          <Row className="justify-center h-[300px] sm:h-[250px]">
            <Col xl={6} lg={6} sm={8} className="text-center flex justify-center flex-col font-serif">
              <h1 className="text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] mb-[15px] inline-block text-xmd leading-[20px]">Portfolio overlay metro column</h1>
              <h2 className="text-darkgray font-medium -tracking-[1px] mb-0">Portfolio overlay</h2>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Parallax Section End */}

      <section className="relative pt-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container fluid>
          <Row>
            <Col xs={12} className="xs:px-0">
              <PortfolioOverlay
                overlay={["#556fff", "#b263e4", "#e05fc4", "#f767a6", "#ff798e"]}
                grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large"
                filterData={FilterData}
                data={portfolioOverlayMetroData}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default portfolioOverlayMetroPage