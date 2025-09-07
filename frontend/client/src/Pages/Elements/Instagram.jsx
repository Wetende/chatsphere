import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'
import Instagram from '../../Components/Instagram/Instagram'


const InstagramPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Instagram</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Instagram</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[7%]">
              <h6 className="font-serif text-darkgray font-medium">Instagram style 01</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col md={12}>
              <Instagram carousel={true}
                carouselOption={{
                  loop: true,
                  slidesPerView: 2,
                  spaceBetween: 15,
                  autoplay: { "delay": 3500, "disableOnInteraction": false },
                  keyboard: { "enabled": true, "onlyInViewport": true },
                  breakpoints: { 1200: { slidesPerView: 6 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 3 } }
                }}
                total_posts={8} title="#instagram decor" grid="" animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
          <h6 className="font-serif text-gray-900 text-center font-medium mb-24">Instagram style 02</h6>
          <Row className="justify-center">
            <Col md={8} className="xs:px-0">
              <Instagram total_posts={6} grid="grid grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
    </>
  )
}

export default InstagramPage