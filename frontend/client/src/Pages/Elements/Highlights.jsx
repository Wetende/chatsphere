import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'

const HighlightsPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Highlights</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Highlights</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
        <Row>
          <Col className="mb-[4%]">
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Primary</h6>
          </Col>
        </Row>
          <Row className="justify-center">
            <Col className="col-12 md:p-0" md={10} lg={8} xl={6}>
              <p>Ferri reque integre mea ut, eu eos vide errem noluisse. Putent laoreet et ius. Vel utroque dissentias ut <mark className="bg-primary text-white">nam ad soleat alterum maluisset, cu est copiosae intellegat inciderint</mark> Nam ei eirmod consequuntur, quod nostrum consectetuer usu ut. Vim veniam singulis senserit an, sumo consul mentitum duo ea. Copiosae antiopam ius ea, meis explicari reformidans vix cu.Ut possit patrioque prodesset est, vivendum concludaturque conclusionemque eam in.</p>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
          <Row>
          <Col className="mb-[4%]">
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Success</h6>
          </Col>
        </Row>
          <Row className="justify-center">
            <Col className="col-12 md:p-0" md={10} lg={8} xl={6}>
              <p>Ferri reque integre mea ut, eu eos vide errem noluisse. <mark className="bg-success text-white">Putent laoreet et ius. Vel utroque dissentias ut nam ad soleat alterum maluisset</mark> cu est copiosae intellegat inciderint Nam ei eirmod consequuntur, quod nostrum consectetuer usu ut. Vim veniam singulis senserit an, sumo consul mentitum duo ea. Copiosae antiopam ius ea, meis explicari reformidans vix cu.Ut possit patrioque prodesset est, vivendum concludaturque conclusionemque eam in.</p>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row>
          <Col className="mb-[4%]">
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Warning</h6>
          </Col>
        </Row>
          <Row className="justify-center">
            <Col className="col-12 md:p-0" md={10} lg={8} xl={6}>
              <p>Ferri reque integre mea ut, eu eos vide errem noluisse. Putent laoreet et ius. Vel utroque dissentias ut nam ad soleat alterum maluisset, cu est copiosae intellegat <mark className="bg-warning text-white">inciderint Nam ei eirmod consequuntur, quod nostrum consectetuer usu ut.</mark> Vim veniam singulis senserit an, sumo consul mentitum duo ea. Copiosae antiopam ius ea, meis explicari reformidans vix cu.Ut possit patrioque prodesset est, vivendum concludaturque conclusionemque eam in.</p>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
          <Row>
          <Col className="mb-[4%]">
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Danger</h6>
          </Col>
        </Row>
          <Row className="justify-center">
            <Col className="col-12 md:p-0" md={10} lg={8} xl={6}>
              <p>Ferri reque integre mea ut, eu eos vide errem noluisse. Putent laoreet et ius. Vel utroque dissentias ut, <mark className="bg-danger text-white">nam ad soleat alterum maluisset, cu est copiosae intellegat inciderint</mark> Nam ei eirmod consequuntur, quod nostrum consectetuer usu ut. Vim veniam singulis senserit an, sumo consul mentitum duo ea. Copiosae antiopam ius ea, meis explicari reformidans vix cu.Ut possit patrioque prodesset est, vivendum concludaturque conclusionemque eam in.</p>
            </Col>
          </Row>
        </Container>
      </m.section>

    </>
  )
}

export default HighlightsPage