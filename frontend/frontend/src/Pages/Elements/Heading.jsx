import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'

const HeadingPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Heading</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Heading</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col className="col-12 col-lg-8" >
              <h1 className="font-serif text-dark font-semibold lg:mb-[15px]">Heading <span className='text-coolgray'>(H1)</span></h1>
              <p>Ferri reque integre mea ut, eu eos vide errem noluisse. Putent laoreet et ius. Vel utroque dissentias ut, nam ad soleat alterum maluisset, cu est copiosae intellegat inciderint. Nam ei eirmod consequuntur, quod nostrum consectetuer usu ut. Vim veniam singulis senserit an, sumo consul mentitum duo ea.</p>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="pb-[160px] lg:pb-[120px] md:pb-[95px] sm:pb-[80px] xs:pb-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col className="col-12 col-lg-8">
              <h2 className="font-serif text-dark font-semibold lg:mb-[15px]">Heading <span className='text-coolgray'>(H2)</span></h2>
              <p>Ferri reque integre mea ut, eu eos vide errem noluisse. Putent laoreet et ius. Vel utroque dissentias ut, nam ad soleat alterum maluisset, cu est copiosae intellegat inciderint. Nam ei eirmod consequuntur, quod nostrum consectetuer usu ut. Vim veniam singulis senserit an, sumo consul mentitum duo ea.</p>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="pb-[160px] lg:pb-[120px] md:pb-[95px] sm:pb-[80px] xs:pb-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col className="col-12 col-lg-8">
              <h3 className="font-serif text-dark font-semibold lg:mb-[15px]">Heading <span className='text-coolgray'>(H3)</span></h3>
              <p>Ferri reque integre mea ut, eu eos vide errem noluisse. Putent laoreet et ius. Vel utroque dissentias ut, nam ad soleat alterum maluisset, cu est copiosae intellegat inciderint. Nam ei eirmod consequuntur, quod nostrum consectetuer usu ut. Vim veniam singulis senserit an, sumo consul mentitum duo ea.</p>
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="pb-[160px] lg:pb-[120px] md:pb-[95px] sm:pb-[80px] xs:pb-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col className="col-12 col-lg-8">
              <h4 className="font-serif text-dark font-semibold lg:mb-[15px]">Heading <span className='text-coolgray'>(H4)</span></h4>
              <p>Ferri reque integre mea ut, eu eos vide errem noluisse. Putent laoreet et ius. Vel utroque dissentias ut, nam ad soleat alterum maluisset, cu est copiosae intellegat inciderint. Nam ei eirmod consequuntur, quod nostrum consectetuer usu ut. Vim veniam singulis senserit an, sumo consul mentitum duo ea.</p>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="pb-[160px] lg:pb-[120px] md:pb-[95px] sm:pb-[80px] xs:pb-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col className="col-12 col-lg-8">
              <h5 className="font-serif text-dark font-semibold lg:mb-[15px]">Heading <span className='text-coolgray'>(H5)</span></h5>
              <p>Ferri reque integre mea ut, eu eos vide errem noluisse. Putent laoreet et ius. Vel utroque dissentias ut, nam ad soleat alterum maluisset, cu est copiosae intellegat inciderint. Nam ei eirmod consequuntur, quod nostrum consectetuer usu ut. Vim veniam singulis senserit an, sumo consul mentitum duo ea.</p>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="pb-[160px] lg:pb-[120px] md:pb-[95px] sm:pb-[80px] xs:pb-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col className="col-12 col-lg-8">
              <h6 className="font-serif text-dark font-semibold lg:mb-[15px]">Heading <span className='text-coolgray'>(H6)</span></h6>
              <p>Ferri reque integre mea ut, eu eos vide errem noluisse. Putent laoreet et ius. Vel utroque dissentias ut, nam ad soleat alterum maluisset, cu est copiosae intellegat inciderint. Nam ei eirmod consequuntur, quod nostrum consectetuer usu ut. Vim veniam singulis senserit an, sumo consul mentitum duo ea.</p>
            </Col>
          </Row>
        </Container>
      </m.section>
    </>
  )
}

export default HeadingPage