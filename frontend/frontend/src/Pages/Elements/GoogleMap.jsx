import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'

// Component
import GoogleMap from '../../Components/GoogleMap/GoogleMap'
import { fadeIn } from '../../Functions/GlobalAnimations'

const GoogleMapPage = () => {
  return (
    <>

      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Google map</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Google map</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <m.section className="py-[160px] lg:py-[140px] lg:px-0 md:py-[95px] md:px-0 sm:py-[80px] sm:px-0 xs:py-[50px] xs:px-[15px]" {...fadeIn}>
        <Container>
          <Row>
            <Col className='mb-[6%]'>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Google map style 01</h6>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="xs:px-0">
              <GoogleMap
                className="w-full h-[500px]"
                location="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8404599049227!2d144.95373931590427!3d-37.81720574201434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sin!4v1653971982572!5m2!1sen!2sin"
              />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] bg-darkgray lg:py-[140px] lg:px-0 md:py-[95px] md:px-0 sm:py-[80px] sm:px-0 xs:py-[50px] xs:px-[15px]" {...fadeIn}>
        <Container>
          <Row>
            <Col className='mb-[6%]'>
              <h6 className="font-serif text-center font-medium text-[#fff] mb-[25px] lg:mb-[15px]">Google map style 02</h6>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="xs:px-0">
              <GoogleMap
                className="invert grayscale"
                location="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8404599049227!2d144.95373931590427!3d-37.81720574201434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sin!4v1653971982572!5m2!1sen!2sin"
              />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[140px] lg:px-0 md:py-[95px] md:px-0 sm:py-[80px] sm:px-0 xs:py-[50px] xs:px-[15px]" {...fadeIn}>
        <Container>
          <Row>
            <Col className='mb-[6%]'>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Google map style 03</h6>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="xs:px-0">
              <GoogleMap
                className="grayscale"
                location="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8404599049227!2d144.95373931590427!3d-37.81720574201434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sin!4v1653971982572!5m2!1sen!2sin"
              />
            </Col>
          </Row>
        </Container>
      </m.section>
    </>
  )
}

export default GoogleMapPage