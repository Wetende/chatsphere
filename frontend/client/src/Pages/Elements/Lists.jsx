import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

// Component
import { fadeIn } from '../../Functions/GlobalAnimations'
import Lists from '../../Components/Lists/Lists'

// Data
import { ListData01, ListData02, ListData03, ListData04, ListData05, ListData06, ListData07, ListData08 } from '../../Components/Lists/ListsData'

const ListsPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Lists</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Lists</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
          <Row>
            <Col className='mb-[5%]'>
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Lists style 01</h6>
            </Col>
          </Row>
          <Row className='justify-center'>
            <Col xl={5} lg={6} md={8}>
              <Lists theme="list-style-01" className="" data={ListData01} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row>
            <Col className='mb-[5%]'>
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Lists style 02</h6>
            </Col>
          </Row>
          <Row className='justify-center'>
            <Col xl={5} lg={6} md={8}>
              <Lists theme="list-style-02" data={ListData02} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
          <Row>
            <Col className='mb-[5%]'>
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Lists style 03</h6>
            </Col>
          </Row>
          <Row className='justify-center'>
            <Col xl={5} lg={6} md={8}>
              <Lists theme="list-style-03" data={ListData03} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row>
            <Col className='mb-[5%]'>
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Lists style 04</h6>
            </Col>
          </Row>
          <Row className='justify-center'>
            <Col xl={5} lg={6} md={8}>
              <Lists theme="list-style-04" data={ListData04} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
          <Row>
            <Col className='mb-[5%]'>
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Lists style 05</h6>
            </Col>
          </Row>
          <Row className='justify-center'>
            <Col xl={5} lg={6} md={8}>
              <Lists theme="list-style-05" data={ListData05} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row>
            <Col className='mb-[5%]'>
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Lists style 06</h6>
            </Col>
          </Row>
          <Row className='justify-center'>
            <Col xl={5} lg={6} md={8}>
              <Lists theme="list-style-06" data={ListData06} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
          <Row>
            <Col className='mb-[5%]'>
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Lists style 07</h6>
            </Col>
          </Row>
          <Row className='justify-center'>
            <Col xl={5} lg={6} md={8}>
              <Lists theme="list-style-07" data={ListData07} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row>
            <Col className='mb-[5%]'>
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Lists style 08</h6>
            </Col>
          </Row>
          <Row className='justify-center'>
            <Col xl={5} lg={6} md={8}>
              <Lists theme="list-style-08" data={ListData08} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
    </>
  )
}

export default ListsPage