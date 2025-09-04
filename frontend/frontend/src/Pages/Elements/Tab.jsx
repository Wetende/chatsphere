import React from 'react'

// Libraries
import { Col, Container, Row, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'
import Tab01 from '../../Components/Tab/Tab01'
import Tab02 from '../../Components/Tab/Tab02'
import Tab03 from '../../Components/Tab/Tab03'
import Tab04 from '../../Components/Tab/Tab04'

// Data
import { TabData01, TabData02, TabData03, TabData07, TabData05, TabData06 } from '../../Components/Tab/TabData'
import Tab05 from '../../Components/Tab/Tab05'
import Tab06 from "../../Components/Tab/Tab06"
import Tab07 from '../../Components/Tab/Tab07'

const TabPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Tab</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Tab</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <m.section className="py-[160px] bg-white lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]"  {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[6%]">
              <h6 className="font-serif text-darkgray font-medium">Tab style 01</h6>
            </Col>
          </Row>
          <Tab01 data={TabData01} />
        </Container>
      </m.section>

      <m.section className="py-[160px] bg-lightgray lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]"  {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[6%]">
              <h6 className="font-serif text-darkgray font-medium">Tab style 02</h6>
            </Col>
          </Row>
          <Tab02 data={TabData02} />
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] md:px-0 sm:px-0 xs:px-0"  {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[7%]">
              <h6 className="font-serif text-darkgray font-medium mb-[25px] lg:mb-[15px]">Tab style 03</h6>
            </Col>
          </Row>
          <Tab03 data={TabData03} />
        </Container>
      </m.section>

      <m.section className="bg-lightgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] md:px-0 sm:px-0 ] xs:px-0"  {...fadeIn}>
        <Container className='switch-tab'>
          <h6 className="font-serif text-gray-900 text-center font-medium mb-[95px] md:mb-[44px] md:text-[22px] sm:text-[20px]">Tab style 04</h6>
          <Tab04/>         
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] md:px-0 sm:px-0 xs:px-0"  {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[6%]">
              <h6 className="font-serif text-darkgray font-medium">Tab style 05</h6>
            </Col>
          </Row>
          <Tab05 data={TabData05} />
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] md:px-0 sm:px-0 xs:px-0 bg-lightgray"  {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[6%]">
              <h6 className="font-serif text-darkgray font-medium">Tab style 06</h6>
            </Col>
          </Row>
          <Tab06 data={TabData06} />
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] md:px-0 sm:px-0 xs:px-0"  {...fadeIn}>
        <Container fluid>
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[6%]">
              <h6 className="font-serif text-darkgray font-medium">Tab style 07</h6>
            </Col>
          </Row>
          <Tab07 data={TabData07} />
        </Container>
      </m.section>   
    </>
  )
}

export default TabPage