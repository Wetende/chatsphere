import React from 'react'

// Libraries
import { Container, Row, Col } from 'react-bootstrap'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

// Component
import { fadeIn, fadeInLeft } from '../../Functions/GlobalAnimations'
import ProcessStep from '../../Components/ProcessStep/ProcessStep'

// Data
import { ProcessStepData01, ProcessStepData02, ProcessStepData03, ProcessStepData04, ProcessStepData05, ProcessStepData06 } from '../../Components/ProcessStep/ProcessStepData'

const ProcessStepPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Process steps</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Process steps</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray">
        <h6 className="font-serif text-darkgray text-center font-medium mb-[107px]">Process steps style 01</h6>
        <Container>
          <ProcessStep grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-[50px]" theme='process-step-style-01' className="" data={ProcessStepData01} animation={fadeIn} />
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] overflow-hidden">
        <h6 className="font-serif text-black text-center font-medium mb-28">Process steps style 02</h6>
        <Container>
          <Row className="items-center justify-center">
            <Col xl={5} lg={6} md={9}>
              <span className="font-serif font-semibold text-gradient bg-gradient-to-r from-[#0039e3] via-[#5e28dd] to-[#8600d4] uppercase inline-block mb-[15px]">Business process</span>
              <h4 className="font-serif font-semibold text-darkgray block -tracking-[1px] mb-20 lg:text-[37px] lg:mb-[80px] md:text-[34px] md:mb-[75px] sm:text-[31px]">Understand and apply the business process</h4>
              <ProcessStep grid="row-cols-1" theme='process-step-style-02' className="" data={ProcessStepData02} animation={fadeIn} />
            </Col>
            <m.div className="offset-xl-1 col-lg-6" {...fadeInLeft}>
              <div className="-mr-[30vw] relative md:mr-0" >
                <img width="" height="" src="/assets/img/webp/home-startup-business-process.webp" className="overflow-hidden" alt="" data-no-retina="" />
              </div>
            </m.div>
          </Row>
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray">
        <h6 className="font-serif text-gray-900 text-center font-medium mb-24">Process steps style 03</h6>
        <Container>
          <ProcessStep grid="row-cols-1 row-cols-sm-2 row-cols-lg-4 gap-y-10" className="" theme="process-step-style-03" data={ProcessStepData03} animation={fadeIn} />
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[8%]">
              <h6 className="font-serif text-darkgray font-medium">Process steps style 04</h6>
            </Col>
          </Row>
          <ProcessStep grid="row-cols-1 row-cols-sm-2 row-cols-lg-4 gap-y-[5rem]" theme="process-step-style-04" className="" data={ProcessStepData04} animation={fadeIn} />
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-gradient-to-tr from-[#0039e3] via-[#5e28dd] to-[#8600d4]">
        <Container className="text-white text-center">
          <Row className=" justify-center">
            <Col md={12} className="text-center mb-[4%]">
              <h6 className="font-serif text-white font-medium">Process steps style 05</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col md={12} sm={8} className="md:px-0">
              <ProcessStep theme="process-step-style-05 md:px-0 sm:mb-8" className="overflow-hidden sm:inline-block text-center text-[#fff]" data={ProcessStepData05} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container className="text-center overflow-hidden">
          <Row className=" justify-center">
            <Col md={12} className="text-center mb-[7%]">
              <h6 className="font-serif text-darkgray font-medium">Process steps style 06</h6>
            </Col>
          </Row>
          <m.div className="row justify-center" {...fadeInLeft}>
            <Col>
              <ProcessStep className="xs:block items-center mx-auto justify-center text-center sm:text-start" grid="col-xl-10 gap-y-10" theme="process-step-style-06" data={ProcessStepData06} />
            </Col>
          </m.div>
        </Container>
      </section>
    </>
  )
}

export default ProcessStepPage