import React from 'react'

// Libraries
import { Container, Row, Col } from 'react-bootstrap'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

// Component
import { fadeIn, fadeInLeft } from '../../Functions/GlobalAnimations'
import Blockquote from '../../Components/BlockQuote/Blockquote'

const BlockquotePage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Blockquote</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Blockquote</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
          <Row className='mb-[6%]'>
            <Col>
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Blockquote style 01</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col md={8} lg={6} xl={5} className="p-0">
              <Blockquote
                className="bg-gradient-to-tr from-[#0039e3] via-[#5e28dd] to-[#8600d4] font-medium"
                theme="blockquote-style-01"
                title="Architecture tends to consume everything else it has become one's entire life."
                icon="ti-quote-left"
                author="- ARNE JACOBSEN"
              />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section Start */}
      <m.section className="py-[130px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] overflow-hidden" {...fadeIn}>
        <Container>
        <Row className='mb-[6%]'>
            <Col>
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Blockquote style 02</h6>
            </Col>
          </Row>
          <Row>
            <Col lg={11} xs={12}>
              <Row className="items-center">
                <m.div className="col-12 col-md-6 xs:mb-[30px]" {...fadeIn}>
                  <img height="" width="" src="https://via.placeholder.com/840x766" alt="" />
                </m.div>
                <m.div className="col-12 col-md-6 col-xl-5 offset-xl-1" {...fadeInLeft}>
                  <Blockquote
                    className="xs:my-0"
                    theme="blockquote-style-02"
                    title="Tomorrow is the most important thing in life comes into us at midnight very clean. It's perfect when it arrives and it puts itself in our hands."
                    author="SHOKO MUGIKURA"
                  />
                </m.div>
              </Row>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
          <Row className='mb-[6%]'>
            <Col>
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Blockquote style 03</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col xl={5} lg={6} md={8} sm={10}>
              <Blockquote
                theme="blockquote-style-03"
                icon="ti-quote-left text-[#ff6437]"
                title="A shoe that is too large is apt to trip one and when too small to pinch the feet so it is with those whose fortune does not suit them."
                author="JAMES NICHOLS"
              />
            </Col>
          </Row>
        </Container>
      </m.section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row className='mb-[6%]'>
            <Col>
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Blockquote style 04</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <m.div className="col-12 col-md-6 bg-lightgray bg-no-repeat bg-right-bottom px-[90px] py-32 lg:px-[5.5rem]" style={{ backgroundImage: "url(/assets/img/webp/blog-post-layout-01-img-11.webp)" }} {...{ ...fadeIn, transition: { delay: 0.1 } }}
            >
              <Blockquote
                theme="blockquote-style-04"
                icon="fas fa-quote-left text-basecolor"
                title="Great dress can make you remember what is beautiful about life."
                author="Jeremy dupont"
              />
            </m.div>
            <m.div className="col col-md-6 bg-cover bg-center sm:h-[450px] xs:h-[300px]" style={{ backgroundImage: "url(https://via.placeholder.com/800x594)" }} {...{ ...fadeIn, transition: { delay: 0.3 } }}></m.div>
          </Row>
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray">
        <Container>
          <Row className='mb-[6%]'>
            <Col>
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Blockquote style 05</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <m.div className="col col-lg-8 col-md-9" >
              <Blockquote
                className="bg-darkgray rounded-[6px] py-24 px-28 sm:px-[33px] sm:py-[33px]"
                theme="blockquote-style-05"
                icon="ti-quote-left text-neonorange"
                title="Thousands of candles can be lighted from a single candle and the life of the candle will not be shortened. Happiness never decreases by being shared."
                author="Jeremy dupont"
              />
            </m.div>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default BlockquotePage