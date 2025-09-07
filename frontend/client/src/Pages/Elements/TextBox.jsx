import React from 'react'
// Libraries
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'
import TextBox from '../../Components/TextBox/TextBox'

// Data
import { TextBoxData01, TextBoxData02 } from '../../Components/TextBox/TextBoxData'

const TextBoxPage = () => {
  return (
    <>

      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Text box</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Text box</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Text box style 01</h6>
            </Col>
          </Row>
          <TextBox
            className=""
            grid="row-cols-1 row-cols-md-3 row-cols-sm-2 justify-center gap-y-10"
            theme="text-box-style-01"
            data={TextBoxData01}
            animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] border-t lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[8%]">
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">Text box style 02</h6>
            </Col>
          </Row>
          <TextBox
            className=""
            grid="row-cols-1 row-cols-lg-3 row-cols-md-2 justify-center gap-y-10"
            theme="text-box-style-02 flex-wrap"
            data={TextBoxData02}
            animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-darkgray py-[160px] border-t lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[9%]">
              <h6 className="font-serif text-[#fff] text-center font-medium mb-[25px] lg:mb-[15px]">Text box style 03</h6>
            </Col>
          </Row>
          <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-1 items-center md:mt-0 gap-y-[40px]">
            <Col>
              <m.div className="flex items-center" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
                <h6 className="mr-[25px] font-serif text-basecolor mb-0">01</h6>
                <div className="flex-1 font-serif font-medium text-md text-spanishgray uppercase inline-block">
                  <span className="w-[90%] block xs:w-[70%]">
                    Largest network of gyms and fitness
                  </span>
                </div>
              </m.div>
            </Col>
            <Col>
              <m.div className="flex items-center" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
                <h6 className="mr-[25px] font-serif text-basecolor mb-0">02</h6>
                <div className="flex-1 font-serif font-medium text-md text-spanishgray uppercase inline-block">
                  <span className="w-[90%] block xs:w-[70%]">
                    FRIENDLY EXPERT HIGH LEVEL PERSONAL TRAINERS
                  </span>
                </div>
              </m.div>
            </Col>
            <Col>
              <m.div className="flex items-center" {...{ ...fadeIn, transition: { delay: 0.6 } }}>
                <h6 className="mr-[25px] font-serif text-basecolor mb-0">03</h6>
                <div className="flex-1 font-serif font-medium text-md text-spanishgray uppercase inline-block">
                  <span className="w-[90%] block xs:w-[70%]">
                    2020 GYM OF THE YEAR AWARD WINNING GYM
                  </span>
                </div>
              </m.div>
            </Col>
            <Col>
              <m.div className="flex items-center" {...{ ...fadeIn, transition: { delay: 0.8 } }}>
                <h6 className="mr-[25px] font-serif text-basecolor mb-0">04</h6>
                <div className="flex-1 font-serif font-medium text-md text-spanishgray uppercase inline-block">
                  <span className="w-[90%] block xs:w-[70%]">
                    FLEXIBILITY TO GYM ACCESS PRIME CONTROL
                  </span>
                </div>
              </m.div>
            </Col>
          </div>
        </Container>
      </section>
      {/* Section End */}
    </>
  )
}

export default TextBoxPage