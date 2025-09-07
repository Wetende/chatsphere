import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'

const SeparatorsPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Seperators</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Seperators</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col xl={6} lg={8} md={10}>
              <div className="h-px mb-[60px] bg-[#cfcfcf]"></div>
              <div className="h-[2px] my-[60px] bg-[#cfcfcf]"></div>
              <div className="h-[3px] my-[60px] bg-[#cfcfcf]"></div>
              <div className="h-[5px] my-[60px] bg-[#cfcfcf]"></div>
              <div className="h-[6px] mt-[60px] bg-[#cfcfcf]"></div>
            </Col>
          </Row>
        </Container>
      </m.section>
    </>
  )
}

export default SeparatorsPage