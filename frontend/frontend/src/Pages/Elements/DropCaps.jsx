import React from 'react'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'
import Dropcaps from '../../Components/Dropcaps/Dropcaps'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

const DropCapsPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Dropcaps</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Dropcaps</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
         <Row>
          <Col className='mb-[4%]'>
          <h6 className="font-serif text-center text-gray-900 font-medium mb-[25px] lg:[15px]">Dropcaps style 01</h6>
          </Col>
          </Row>
          <Row className="justify-center">
            <Col xl={6} lg={8} md={10} >
              <Dropcaps theme="dropcaps-style01" content="MLoremipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Lorem ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Simply dummy text of the printing and typesetting industry." />
            </Col>
          </Row>
        </Container>
      </m.section>


      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
         <Row>
          <Col className='mb-[4%]'>
          <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:[15px]">Dropcaps style 02</h6>
          </Col>
          </Row>
          <Row className="justify-center">
            <Col xl={6} lg={8} md={10} >
              <Dropcaps theme="dropcaps-style02" content="MLoremipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Lorem ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Simply dummy text of the printing and typesetting industry." />
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
         <Row>
          <Col className='mb-[4%]'>
          <h6 className="font-serif text-center text-gray-900 font-medium mb-[25px] lg:[15px]">Dropcaps style 03</h6>
          </Col>
          </Row>
          <Row className="justify-center">
            <Col xl={6} lg={8} md={10} >
              <Dropcaps theme="dropcaps-style03" content="MLoremipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Lorem ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Simply dummy text of the printing and typesetting industry." />
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-darkgray" {...fadeIn}>
        <Container>
         <Row>
          <Col className='mb-[4%]'>
          <h6 className="font-serif text-white text-center font-medium mb-[25px] lg:[15px]">Dropcaps style 04</h6>
          </Col>
          </Row>
          <Row className="justify-center">
            <Col xl={6} lg={8} md={10} >
              <Dropcaps theme="dropcaps-style04" content="MLoremipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Lorem ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Simply dummy text of the printing and typesetting industry." />
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
         <Row>
          <Col className='mb-[4%]'>
          <h6 className="font-serif text-center text-gray-900 font-medium mb-[25px] lg:[15px]">Dropcaps style 05</h6>
          </Col>
          </Row>
          <Row className="justify-center">
            <Col xl={6} lg={8} md={10} >
              <Dropcaps theme="dropcaps-style05" content="MLoremipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Lorem ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Simply dummy text of the printing and typesetting industry." />
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
         <Row>
          <Col className='mb-[4%]'>
          <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:[15px]">Dropcaps style 06</h6>
          </Col>
          </Row>
          <Row className="justify-center">
            <Col xl={6} lg={8} md={10} >
              <Dropcaps theme="dropcaps-style06" content="MLoremipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Lorem ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Simply dummy text of the printing and typesetting industry." />
            </Col>
          </Row>
        </Container>
      </m.section>

    </>)
}

export default DropCapsPage
