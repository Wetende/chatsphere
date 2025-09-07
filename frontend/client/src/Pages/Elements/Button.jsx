import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import Buttons from '../../Components/Button/Buttons'
import { m } from "framer-motion"
import { Link } from 'react-router-dom'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'

const ButtonPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Buttons</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Buttons</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] xs:px-0" {...fadeIn}>
        <h6 className="font-serif text-darkgray text-center font-medium mb-[83px] xs:mb-[10%] xs:text-[20px]">Button sizes</h6>
        <Container>
          <Row className="justify-center">
            <Col className="text-center md:flex md:flex-col md:items-center gap-y-10">
              <Buttons ariaLabel="button" href="#" className="btn-fill mr-[10px] font-medium font-serif rounded-none uppercase" themeColor="#0038e3" color="#fff" size="xl" title="Button extra large" />
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] font-medium font-serif rounded-none uppercase" themeColor="#0038e3" color="#fff" size="lg" title="Button large" />
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] font-medium font-serif rounded-none uppercase" themeColor="#0038e3" color="#fff" size="md" title="Button medium" />
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] font-medium font-serif rounded-none uppercase" themeColor="#0038e3" color="#fff" size="sm" title="Button small" />
              <Buttons ariaLabel="button" href="#" className="btn-fill ml-[10px] font-medium font-serif rounded-none uppercase" themeColor="#0038e3" color="#fff" size="xs" title="very small" />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] border-t xs:py-[50px] xs:px-0" {...fadeIn}>
        <h6 className="font-serif text-darkgray text-center font-medium mb-[83px] xs:mb-[10%] xs:text-[20px]">Button shapes</h6>
        <Container>
          <Row className="justify-center">
            <Col className="text-center md:flex md:flex-col md:items-center gap-y-10">
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] font-medium font-serif rounded-none uppercase" themeColor="#232323" color="#fff" size="lg" title="Button default" />
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] font-medium font-serif uppercase rounded" themeColor="#232323" color="#fff" size="lg" title="Button round edges" />
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] font-medium font-serif uppercase rounded-sm" themeColor="#232323" color="#fff" size="lg" title="Small rounded edges" />
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] font-medium font-serif uppercase rounded-[50px]" themeColor="#232323" color="#fff" size="lg" title="Button rounded" />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] border-t bg-gradient-to-tr from-[#f5bb8d] via-[#feb399] to-[#f3aaca] xs:py-[50px] xs:px-0" {...fadeIn}>
        <h6 className="font-serif text-darkgray text-center font-medium mb-[83px] xs:mb-[10%] xs:text-[20px]">Flat background</h6>
        <Container>
          <Row className="justify-center">
            <Col className="text-center md:flex md:flex-col md:items-center gap-y-10">
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] font-medium font-serif rounded-none uppercase" themeColor="#0038e3" color="#fff" size="lg" title="Button base color" />
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] font-medium font-serif rounded-none uppercase" themeColor="#000" color="#fff" size="lg" title="Button black" />
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] font-medium font-serif rounded-none uppercase" themeColor="#232323" color="#fff" size="lg" title="Button dark gray" />
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] font-medium font-serif rounded-none uppercase" themeColor="#fff" color="#232323" size="lg" title="Button white" />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] xs:px-0" {...fadeIn}>
        <h6 className="font-serif text-darkgray text-center font-medium mb-[83px] xs:mb-[10%] xs:text-[20px]">Only border</h6>
        <Container>
          <Row className="justify-center">
            <Col className="text-center md:flex md:flex-col md:items-center gap-y-10">
              <Buttons ariaLabel="button" href="#" className="mr-[10px] font-medium font-serif uppercase rounded-none bg-[#fff] md:m-0" color="#000" size="xl" themeColor="#dbdbdb" title="Border light color" />
              <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium font-serif uppercase rounded-none bg-[#fff] hover:text-white md:m-0" color="#0038e3" size="xl" themeColor="#0038e3" title="Border base color" />
              <Buttons ariaLabel="button" href="#" className="ml-[10px] font-medium font-serif uppercase rounded-[50px] bg-[#fff] hover:text-white md:m-0" color="#000" size="xl" themeColor="#000" title="Border black color" />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] bg-darkslateblue xs:py-[50px] xs:px-0" {...fadeIn}>
        <h6 className="font-serif text-white text-center font-medium mb-[83px] xs:mb-[10%] xs:text-[20px]">Gradient button</h6>
        <Container>
          <Row className="justify-center">
            <Col className="text-center md:flex md:flex-col md:items-center gap-y-10">
              <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium font-serif uppercase rounded-none lg:mb-[15px] landscape:lg:mb-[15px]" themeColor={["#e42564", "#fa6259"]} size="md" color="#fff" title="Gradient button" />
              <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium font-serif uppercase rounded-none lg:mb-[15px] landscape:lg:mb-[15px]" themeColor={["#502970", "#f34259"]} size="md" color="#fff" title="Gradient button" />
              <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium font-serif uppercase rounded-none lg:mb-[15px] landscape:lg:mb-[15px]" themeColor={["#556fff", "#ff798e"]} size="md" color="#fff" title="Gradient button" />
              <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium font-serif uppercase rounded-none lg:mb-[15px] landscape:lg:mb-[15px]" themeColor={["#36c1e1", "#feb95b"]} size="md" color="#fff" title="Gradient button" />
              <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium font-serif uppercase rounded-none lg:mb-[15px] landscape:lg:mb-[15px]" themeColor={["#0039e3", "#8600d4"]} size="md" color="#fff" title="Gradient button" />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] bg-lightgray xs:py-[50px] xs:px-0" {...fadeIn}>
        <h6 className="font-serif text-darkgray text-center font-medium mb-[83px] xs:mb-[10%] xs:text-[20px]">With icon</h6>
        <Container>
          <Row className="justify-center">
            <Col className="text-center md:flex md:flex-col md:items-center gap-y-10">
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] rounded-none font-medium font-serif uppercase" themeColor="#0038e3" size="lg" color="#fff" icon="fas fa-arrow-left" iconPosition="before" title="Back to blog" />
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] rounded-none font-medium font-serif uppercase" themeColor="#232323" size="lg" color="#fff" icon="feather-shopping-cart" iconPosition="after" title="Checkout now" />
              <Buttons ariaLabel="button" href="#" className="mx-[10px] rounded-none font-medium font-serif uppercase btn-gradient" themeColor={["#556fff", "#ff798e"]} size="lg" color="#fff" icon="fab fa-instagram" iconPosition="before" title="Instagram" />
              <Buttons ariaLabel="button" href="#" className="mx-[10px] rounded-none font-medium font-serif uppercase bg-[#fff] hover:text-white" themeColor="#000" size="lg" color="#000" icon="fas fa-arrow-right right-icon" iconPosition="after" title="Explore litho" />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] xs:px-0" {...fadeIn}>
        <h6 className="font-serif text-darkgray text-center font-medium mb-[83px] xs:mb-[10%] xs:text-[20px]">Action button</h6>
        <Container>
          <Row>
            <Col className="text-center flex flex-wrap justify-center gap-y-10">
              <Link to="#" className="mx-[10px] border-[2px] border-[#0D6EFD] hover:border-[#004dc0] rounded-none font-medium font-serif uppercase lg:mb-[15px] text-white bg-[#0D6EFD] hover:bg-[#0044aa] primary px-[32px] py-[12px] text-sm shadow-none">Primary Button</Link>
              <Link to="#" className="mx-[10px] border-[2px] border-[#198754] hover:border-[#075f36] rounded-none font-medium font-serif uppercase lg:mb-[15px] text-white bg-[#198754] hover:bg-[#075f36] success px-[32px] py-[12px] text-sm shadow-none">Success Button</Link>
              <Link to="#" className="mx-[10px] border-[2px] border-[#0ab7da] hover:border-[#08c5eb] rounded-none font-medium font-serif uppercase lg:mb-[15px] text-black bg-[#0ab7da] hover:bg-[#08c5eb] info px-[32px] py-[12px] text-sm shadow-none">Info Button</Link>
              <Link to="#" className="mx-[10px] border-[2px] border-[#dfab11] hover:border-[#f0b609] rounded-none font-medium font-serif uppercase lg:mb-[15px] text-black bg-[#dfab11] hover:bg-[#f0b609] warning px-[32px] py-[12px] text-sm shadow-none">Warning Button</Link>
              <Link to="#" className="mx-[10px] border-[2px] border-[#DC3545] hover:border-[#ac1221] rounded-none font-medium font-serif uppercase lg:mb-[15px] text-white bg-[#DC3545] hover:bg-[#ac1221] danger px-[32px] py-[12px] text-sm shadow-none">Danger Button</Link>
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] bg-darkslateblue xs:py-[50px] xs:px-0" {...fadeIn}>
        <h6 className="font-serif text-white text-center font-medium mb-[83px] xs:mb-[10%] xs:text-[20px]">Slide filling</h6>
        <Container>
          <Row className="justify-center">
            <Col lg={12} className="text-center">
              <div className="md:flex md:flex-col md:items-center">
                <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium rounded-none font-serif uppercase hover:text-darkgray mb-[20px] bg-transparent btn-slide-up" size="lg" color="#fff" themeColor="#fff" title="slide up" />
                <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium rounded-none font-serif uppercase hover:text-darkgray mb-[20px] bg-transparent btn-slide-down" size="lg" color="#fff" themeColor="#fff" title="slide down" />
                <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium rounded-none font-serif uppercase hover:text-darkgray mb-[20px] bg-transparent btn-slide-left" size="lg" color="#fff" themeColor="#fff" title="slide left" />
                <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium rounded-none font-serif uppercase hover:text-darkgray mb-[20px] bg-transparent btn-slide-right" size="lg" color="#fff" themeColor="#fff" title="slide right" />
              </div>
            </Col>
            <Col lg={12} className="text-center md:flex md:flex-col md:items-center gap-y-10">
              <div className="mt-[50px] md:flex md:flex-col md:items-center">
                <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium rounded-none font-serif uppercase hover:text-white btn-slide-filling-up mb-[20px] bg-gradient-to-r from-[#556fff] via-[#ff798e] to-[#556fff]" size="lg" color="#fff" themeColor="#232323" title="slide up" />
                <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium rounded-none font-serif uppercase hover:text-white btn-slide-filling-down mb-[20px] bg-gradient-to-r from-[#556fff] via-[#ff798e] to-[#556fff]" size="lg" color="#fff" themeColor="#232323" title="slide down" />
                <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium rounded-none font-serif uppercase hover:text-white btn-slide-filling-left mb-[20px] bg-gradient-to-r from-[#556fff] via-[#ff798e] to-[#556fff]" size="lg" color="#fff" themeColor="#232323" title="slide left" />
                <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium rounded-none font-serif uppercase hover:text-white btn-slide-filling-right mb-[20px] bg-gradient-to-r from-[#556fff] via-[#ff798e] to-[#556fff]" size="lg" color="#fff" themeColor="#232323" title="slide right" />
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] xs:px-0" {...fadeIn}>
        <h6 className="font-serif text-darkgray text-center font-medium mb-[83px] xs:mb-[10%] xs:text-[20px]">Expanded animation</h6>
        <Container>
          <Row className="justify-center">
            <Col className="text-center md:flex md:flex-col md:items-center gap-y-10">
              <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium font-serif uppercase hover:text-white btn-expand rounded" size="xl" color="#232323" themeColor="#27ae60" to="/" title="Expanded button" />
              <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium font-serif uppercase hover:text-darkgray btn-expand" size="xl" color="#232323" themeColor="#cee002" to="/elements/accordions" title="Expanded button" />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] bg-darkgray xs:py-[50px] xs:px-0" {...fadeIn}>
        <h6 className="font-serif text-white text-center font-medium mb-[83px] xs:mb-[10%] xs:text-[20px]">Text link</h6>
        <Container>
          <Row className="justify-center">
            <Col className="text-center md:flex md:flex-col md:items-center gap-y-10">
              <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium font-serif uppercase btn-link after:bg-gradient-to-tr after:from-[#b783ff] after:to-[#e37be0] after:h-[2px] !text-md" size="lg" color={["#b783ff", "#e37be0"]} title="Only Gradient" />
              <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium font-serif uppercase btn-link after:h-[2px] md:text-md after:bg-[#fff] hover:text-white !text-md" color="#fff" title="With underline" />
              <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium font-serif uppercase btn-link after:h-[1px] md:text-md after:bg-[#828282] hover:text-[#828282] !text-md" color="#939393" title="With thin underline" />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] xs:px-0" {...fadeIn}>
        <h6 className="font-serif text-darkgray text-center font-medium mb-[83px] xs:mb-[10%] xs:text-[20px]">Fancy button</h6>
        <Container>
          <Row className="justify-center">
            <Col className="text-center md:flex md:flex-col md:items-center gap-y-10">
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] rounded-none font-medium font-serif uppercase btn-fancy" size="lg" color="#ffffff" themeColor="#232323" title="Button black" />
              <Buttons ariaLabel="button" href="#" className="mx-[10px] rounded-none font-medium font-serif uppercase bg-[#fff] hover:text-white" size="lg" color="#232323" themeColor="#232323" title="Border black" />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] bg-lightgray xs:py-[50px] xs:px-0" {...fadeIn}>
        <h6 className="font-serif text-darkgray text-center font-medium mb-[83px] xs:mb-[10%] xs:text-[20px]">Drop shadow with button</h6>
        <Container>
          <Row className="justify-center">
            <Col className="text-center md:flex md:flex-col md:items-center gap-y-10">
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] shadow-[0_0_15px_rgba(0,0,0,0.10)] font-medium btn-fancy font-serif uppercase rounded-[50px] btn-shadow text-[15px]" size="xl" themeColor="#fff" color="#000" title="Button white" />
              <Buttons ariaLabel="button" href="#" className="btn-fill mx-[10px] btn-fancy font-medium font-serif uppercase rounded-none btn-shadow" size="xl" themeColor="#232323" color="#fff" title="button black" />
            </Col>
          </Row>
        </Container>
      </m.section>
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] xs:px-0" {...fadeIn}>
        <h6 className="font-serif text-darkgray text-center font-medium mb-[83px] xs:mb-[10%] xs:text-[20px]">Flat shadow with button</h6>
        <Container>
          <Row className="justify-center">
            <Col className="text-center">
              <Buttons ariaLabel="button" href="#" className="mx-[10px] font-medium font-serif rounded-none uppercase btn-flat" size="xl" themeColor="#232323" color="#fff" title="Flat shadow button" onClick={(e) => {e.preventDefault();}} />
            </Col>
          </Row>
        </Container>
      </m.section>
    </>
  )
}

export default ButtonPage
