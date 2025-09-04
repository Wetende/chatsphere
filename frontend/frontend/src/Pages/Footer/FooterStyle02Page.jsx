import React from 'react'

// Libraries
import { Col, Container,  Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { m } from "framer-motion";

// Components
import FooterStyle02 from "../../Components/Footers/FooterStyle02";
import { fadeIn } from "../../Functions/GlobalAnimations";
import IconWithText from '../../Components/IconWithText/IconWithText'
import SideButtons from "../../Components/SideButtons";
import Testimonials from "../../Components/Testimonials/Testimonials";

// Data
import { TestimonialsData03 } from "../../Components/Testimonials/TestimonialsData";
import { IconWithTextData_03 } from "../../Components/IconWithText/IconWithTextData";


const FooterStyle02Page = (props) => {
    return (
        <div style={props.style}>
            <SideButtons />
            {/* Section Start */}
            <section className="bg-darkgray py-[25px]">
                <Container>
                    <Row className="items-center justify-center mb-0">
                        <Col xl={8} lg={6}>
                            <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Footer style 02</h1>
                        </Col>
                        <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
                            <ul className="xs-text-center">
                                <li><Link to="/" aria-label="footer breadcrumb" className="hover:text-white">Home</Link></li>
                                <li><Link to="#" aria-label="footer breadcrumb" className="hover:text-white">Features</Link></li>
                                <li>Footer</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}
            {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] bg-white">
        <Container>
          <IconWithText grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-5" theme="icon-with-text-03 text-center" data={IconWithTextData_03} animation={fadeIn} animationDelay={0} />
        </Container>
      </section>
      {/* Section End */}
      {/* Section Start */}
      <section className="bg-[#f7f8fc] py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
          <m.div className="text-center mb-20 col-xl-5 col-lg-6 col-sm-8" {...fadeIn}>
              <span className="text-center font-serif text-md inline-block font-medium text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] uppercase mb-[20px] sm:mb-[15px]"> What people are saying </span>
              <h5 className="font-serif text-[2.3rem] justify-center text-center text-darkgray font-semibold -tracking-[1px]"> What our valuable customer are saying about us? </h5>
            </m.div>
          </Row>
          <Row className="justify-center">
            <Col className="col-12 col-md-12 col-sm-8">
              <Testimonials grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-10 justify-center" theme="testimonials-style-03" data={TestimonialsData03} animation={fadeIn} animationDelay={0.3} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}
            <FooterStyle02 className="text-slateblue bg-[#262b35]" theme="dark" />
        </div>
    )
}


export default FooterStyle02Page
