import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Parallax } from "react-scroll-parallax";

// Components
import PortfolioSlider from '../../Components/Portfolio/PortfolioSlider'
// Data
import { portfolioSliderData } from '../../Components/Portfolio/PortfolioData'

const PortfolioSliderPage = (props) => {
  return (
    <div style={props.style}>
      {/* Parallax Section Start */}
      <div className="h-[450px] sm:h-[350px] overflow-hidden md:relative">
        <Parallax className="lg-no-parallax bg-cover absolute top-[0] md:top-[-66px] xs:top-[-80px] md:h-[550px] left-0 w-full h-full" translateY={[-40, 40]} style={{ backgroundImage: `url(/assets/img/webp/portfolio-bg.webp)` }}></Parallax>
        <Container className="h-full relative">
          <Row className="justify-center h-full">
            <Col xl={6} lg={6} sm={8} className="text-center flex justify-center flex-col font-serif">
              <h1 className="text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] mb-[15px] inline-block text-xmd">Portfolio horizontal slider</h1>
              <h2 className="text-darkgray font-medium -tracking-[1px] mb-0">Portfolio slider</h2>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Parallax Section End */}

      <section className="pt-0 overflow-hidden relative py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container fluid>
          <Row>
            <Col className="px-[8.5rem] xl:px-[5%] lg:px-[2%] sm:px-[15px]">
              <PortfolioSlider
                data={portfolioSliderData}
                carousalOption={{
                  spaceBetween: 26,
                  slidesPerView: 1,
                  autoplay: { delay: 3000, disableOnInteraction: false },
                  keyboard:{enabled:true,onlyInViewport:true},
                  loop: false,
                  navigation: true,
                  breakpoints: { 1200: { slidesPerView: 5 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default PortfolioSliderPage