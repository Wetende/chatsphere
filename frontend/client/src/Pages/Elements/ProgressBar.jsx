
import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

// Components
import ProgressBar from '../../Components/Progressbar/ProgressBar'

// Data
import { ProgressBarData01, ProgressBarData02 } from '../../Components/Progressbar/ProgressBarData'

const ProgressBarPage = () => {
  return (
    <>

      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Progress bar</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Progress bar</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <m.section className="lg:px-0 py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <h6 className="font-serif text-darkgray text-center font-medium mb-[85px] md:mb-[50px]">Progress bar style 01</h6>
          <Row className='justify-center'>
            <Col lg={6}>
              <ProgressBar
                theme="progressbar-style-01"
                className=""
                trailColor="#fff"
                data={ProgressBarData01}
                height="4px"
                color="#232323" />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[120px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px] bg-lightgray lg:px-0 md:px-0 sm:px-0 xs:px-0">
        <Container>
          <h6 className="font-serif text-darkgray text-center font-medium mb-[94px] md:mb-[50px]">Progress bar style 02</h6>
          <Row className="justify-center">
            <Col lg={6}>
              <ProgressBar
                theme="progressbar-style-02"
                className=""
                trailColor="#f7f7f7"
                height="8px"
                data={ProgressBarData02}
                color={["#2ed47c", "#e8bf47"]} />
            </Col>
          </Row>
        </Container>
      </m.section>
    </>
  )
}

export default ProgressBarPage