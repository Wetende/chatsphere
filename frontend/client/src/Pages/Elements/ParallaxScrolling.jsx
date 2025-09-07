import React from "react";

// Libraries
import { Row, Col, Container } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { Parallax } from "react-scroll-parallax";

// Components
import Buttons from '../../Components/Button/Buttons'

const ParallaxScrollingPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Parallax scrolling</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Parallax scrolling</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Parallax Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[7%]">
              <h6 className="font-serif text-darkgray font-medium">Parallax scrolling style 01</h6>
            </Col>
          </Row>
          <Row className="items-center">
            <Col xl={7} lg={6} className="relative">
              <div className="relative">
                <Parallax className="lg-no-parallax w-[70%] mb-16 lg:mb-0" speed={0}> <img alt="" src="https://via.placeholder.com/800x1020" className="w-full" width="385.34" height="565.34" /></Parallax>
                <Parallax className="lg-no-parallax flex justify-center items-center w-[55%] bg-no-repeat absolute bottom-0 right-[15px] lg:ml-auto lg:!top-[130px]" speed={20}>
                  <img className="w-full" alt="" src="https://via.placeholder.com/800x820" width="317" height="477" />
                </Parallax>
              </div>
            </Col>
            <Col xl={{ span: 4, offset: 1 }} lg={{ span: 5, offset: 1 }} className="md:mt-[15%] xs:mt-[18%]">
              <span className="font-serif block mb-[30px] font-semibold tracking-[2px] text-neonorange xs:mb-[20px]">20 YEARS EXPERIENCE</span>
              <h4 className="font-serif uppercase mb-[35px] font-bold tracking-[-1px] text-[#262b35] md:mb-[35px]">We have center of fitness more than 20 years</h4>
              <p className="mb-[25px] md:mb-[20px] sm:w-[90%] sm:mb-[15px] xs:w-full">Lorem ipsum dolor amet consectetur adipiscing do eiusmod tempor incididunt abore dolore magna ut enim ad minim veniam ut exercitation ullamco commodo consequat incididunt.</p>
              <Buttons
                className="btn-fill rounded-none font-medium font-serif uppercase hover:text-black mt-[20px]"
                themeColor="#262b35"
                size="lg"
                color="#fff"
                icon="feather-arrow-right"
                iconPosition="after"
                title="discover litho"
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Parallax End */}

      {/* Parallax Start*/}
      <section className="relative h-[700px] overflow-hidden md:h-[550px] sm:h-[350px]">
        <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[-30px] left-0 h-[100vh] lg:h-[64vh] lg:top-[-75px] lg:!translate-y-0 md:h-[60vh] md:-top-[30px] sm:top-0 sm:h-[56vh] xs:h-[50vh] w-full" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1080)` }}></Parallax>
      </section>
      {/* Parallax End*/}
    </>
  );
};

export default ParallaxScrollingPage;
