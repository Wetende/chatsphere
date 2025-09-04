import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'
import MessageBox from '../../Components/MessageBox/MessageBox'

const MessageBoxPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Message box</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Message box</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <h6 className="font-serif text-gray-900 text-center font-medium mb-24 xl:mb-[95px] lg:mb-[85px] md:mb-[58px] sm:mb-[47px] xs:mb-[49px] xxs:mb-[43px]">Message box style 01</h6>
        <Container>
          <Row className="justify-center">
            <Col lg={7} md={9} className="px-md-0">
              <MessageBox className="relative mb-[35px]" theme="message-box01" variant="success" message={<><strong>Success!</strong><span> Indicates a successful or positive action.</span></>} dismissible={true} />
              <MessageBox className="relative mb-[35px]" theme="message-box01" variant="info" message={<><strong>Info!</strong><span> Indicates a neutral informative change or action.</span></>} dismissible={true} />
              <MessageBox className="relative mb-[35px]" theme="message-box01" variant="warning" message={<><strong>Warning!</strong><span> Indicates a warning that might need attention.</span></>} dismissible={true} />
              <MessageBox className="relative" theme="message-box01" variant="danger" message={<><strong>Danger!</strong><span> Indicates a dangerous or potentially negative action.</span></>} dismissible={true} />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <h6 className="font-serif text-gray-900 text-center font-medium mb-24 xl:mb-[95px] lg:mb-[85px] md:mb-[58px] sm:mb-[47px] xs:mb-[49px] xxs:mb-[43px]">Message box style 02</h6>
        <Container>
          <Row className="justify-center">
            <Col lg={7} md={9} className="px-md-0">
              <MessageBox className="mb-[35px]" theme="message-box02" variant="success" message={<><strong>Success!</strong><span> Indicates a successful or positive action.</span></>} dismissible={true} />
              <MessageBox className="mb-[35px]" theme="message-box02" variant="info" message={<><strong>Info!</strong><span> Indicates a neutral informative change or action.</span></>} dismissible={true} />
              <MessageBox className="mb-[35px]" theme="message-box02" variant="warning" message={<><strong>Warning!</strong><span> Indicates a warning that might need attention.</span></>} dismissible={true} />
              <MessageBox theme="message-box02" variant="danger" message={<><strong>Danger!</strong><span> Indicates a dangerous or potentially negative action.</span></>} dismissible={true} />
            </Col>
          </Row>
        </Container>
      </m.section>
    </>
  )
}

export default MessageBoxPage