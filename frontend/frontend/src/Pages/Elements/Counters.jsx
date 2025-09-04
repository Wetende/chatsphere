import React from 'react'

// Libraries
import { Container, Row, Col } from 'react-bootstrap'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'
import Counter from '../../Components/Counters/Counter'

// Data
import { CounterData01, CounterData02, CounterData03, CounterData04, CounterData05 } from '../../Components/Counters/CounterData'

const CountersPage = () => {
  return (
    <>

      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Counters</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Counters</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="bg-lightgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Counters style 01</h6>
            </Col>
          </Row>
          <Counter
            as="h5"
            theme="counter-style-01"
            grid="row-cols-1 row-cols-md-3 row-cols-sm-2 gap-y-10"
            className="text-black"
            duration={7}
            data={CounterData01}
            postfix_sign="+" />
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Counters style 02</h6>
            </Col>
          </Row>
          <Counter
            as="h3"
            theme="counter-style-02"
            grid="row-cols-1 row-cols-md-4 row-cols-sm-2 items-center justify-center md:text-center gap-y-10"
            className="text-black text-[70px] text-center"
            data={CounterData02}
            duration={2}
            animation={fadeIn}
            animationDelay={0.2}
          />
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="bg-darkgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-white text-center font-medium mb-[25px] lg:mb-[15px]">Counters style 03</h6>
            </Col>
          </Row>
          <Counter
            theme="counter-style-03"
            grid="row-cols-1 row-cols-md-4 row-cols-sm-2 items-center justify-center gap-y-10"
            className="font-serif text-white text-center md:text-start"
            data={CounterData03}
            duration={2}
            postfix_sign="+"
            animation={fadeIn}
            animationDelay={0.2}
          />
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Counters style 04</h6>
            </Col>
          </Row>
          <Counter
            theme="counter-style-04"
            grid="row-cols-1 row-cols-md-4 row-cols-sm-2 gap-y-10"
            className="text-black"
            duration={7}
            data={CounterData04}
            animation={fadeIn}
            animationDelay={0.2}
          />
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="bg-lightgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Counters style 05</h6>
            </Col>
          </Row>
          <Counter
            theme="counter-style-05"
            grid="row-cols-1 row-cols-md-3 text-center gap-y-10"
            className="text-black"
            duration={2}
            data={CounterData05}
            animation={fadeIn}
            animationDelay={0.2}
          />
        </Container>
      </m.section>
      {/* Section End */}
    </>
  )
}

export default CountersPage