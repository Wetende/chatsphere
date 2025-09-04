import React from 'react'
// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { m } from "framer-motion"
import { Link } from 'react-router-dom'

// Components
import Buttons from '../../Components/Button/Buttons'
import { Parallax } from "react-scroll-parallax";
import { fadeIn } from '../../Functions/GlobalAnimations'

const CallToActionPage = () => {
  return (
    <>

      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Call to action</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Call to action</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] overflow-hidden" {...fadeIn}>
        <Container>
          <Row className="justify-center text-center font-serif font-medium text-darkgray">
            <Col xl={7} lg={8} md={10}>
              <span className="tracking-[2px] uppercase opacity-50 block mb-[30px] md:mb-[20px]">yoga enhances your life</span>
              <h2 className="-tracking-[2px] mb-[50px] md:mb-[40px] xs:w-[98%] xs:mx-auto">Yoga is the journey of the self through the self</h2>
              <Buttons ariaLabel="button link" href="#" className="font-medium font-serif tracking-[1px] uppercase rounded-sm !leading-[1.7]" themeColor={["#fe8182", "#f8a380"]} size="lg" color="#fff" title="Discover classes" />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section end */}

      {/* Section start */}
      <m.section className="pt-0 pb-[10%] px-[10%] xl:px-[3%] md:px-[30px] sm:px-0 xs:px-0" {...fadeIn}>
        <div className="bg-gradient-to-tr from-[#f5bb8d] via-[#ffaea8] to-[#f3aaca] rounded-[5px] overflow-hidden pt-[126px] md:pt-[72px]">
          <Container>
            <Row className="justify-center items-center">
              <Col xl={5} lg={{ span: 6, order: 2 }} className="font-medium text-darkgray font-serif pb-[100px] ml-[97px] lg:ml-[0px] md:text-center md:pb-24">
                <span className="mb-[35px] text-lg -tracking-[.5px] inline-block relative whitespace-nowrap border-b border-solid border-darkgray md:text-xmd">Awesomeness and creative people</span>
                <h4 className="-tracking-[1px] mb-[45px] xs:w-[99%]">Teamwork is the ability work together toward a <span className="font-semibold">common vision</span></h4>
                <Buttons ariaLabel="button link" href="#" className="font-medium font-serif uppercase btn-expand" size="lg" color="#fff" themeColor="#232323" title="Join the people" />
              </Col>
              <Col xl={{ offset: 1, span: 5 }} lg={{ span: 5, order: 1 }} className="p-[0px] xs:px-[15px]">
                <img width="" height="" src='https://via.placeholder.com/406x506' alt="Our Team" className="md:mx-auto" />
              </Col>
            </Row>
          </Container>
        </div>
      </m.section>
      {/* Section end */}

      {/* Section start */}
      <m.div className="relative overflow-hidden py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] sm:px-[15px]" {...fadeIn}>
        <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[-30px] left-0 h-[100vh] lg:h-[64vh] lg:top-[-75px] lg:!translate-y-0 md:h-[60vh] md:-top-[30px] sm:top-0 sm:h-[56vh] xs:h-[50vh] w-full" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
        <div className="left-0 top-0 h-full w-full absolute bg-darkslateblue opacity-75"></div>
        <Container className="relative">
          <Row className="justify-center items-center">
            <Col xl={7} md={8} sm={10} className="md:mb-[30px] sm:mb-[30px]">
              <h4 className="font-serif font-semibold text-white mb-0 sm:text-center">Gearing your company through an Innovative strategy</h4>
            </Col>
            <Col xl={5} md={4} className="md:flex md:justify-center text-end">
              <Buttons ariaLabel="button" to="/" className="font-medium font-serif uppercase rounded-none lg:mb-[15px] landscape:lg:mb-[15px]" themeColor={["#2ed47c", "#e8a626"]} size="lg" color="#fff" title="Download litho" />
            </Col>
          </Row>
        </Container>
      </m.div>
      {/* Section end */ }

  {/* Section start */ }
  <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
    <Container>
      <Row className='justify-center text-center'>
        <Col lg={8}>
          <h2 className="font-serif font-light mb-16 -tracking-[2px] text-darkgray">Global <span className="font-semibold">agency making</span> a world of difference</h2>
          <div className="flex justify-center xxs:flex-col xxs:items-center">
            <Buttons ariaLabel="button link" to="/page/our-services" className="font-medium font-serif tracking-[1px] uppercase rounded-none mr-6 mb-[15px] xxs:mx-0" themeColor={["#556fff", "#ff798e"]} size="lg" color="#fff" title="Explore services" />
            <Buttons ariaLabel="button link" to="/" className="font-medium font-serif uppercase tracking-[1px] hover:text-darkgray btn-transparent btn-fancy mb-[15px] !leading-[18px]" size="lg" color="#000" themeColor={["#556fff", "#ff798e"]} title="Discover Litho" />
          </div>
        </Col>
      </Row>
    </Container>
  </m.section>
  {/* Section end */ }

  {/* Section start */ }
  <m.section className="bg-no-repeat bg-cover overflow-hidden relative visible bg-center py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" style={{ backgroundImage: `url(https://via.placeholder.com/1920x802)` }} {...fadeIn}>
    <Container>
      <Row>
        <Col xl={6} lg={7} className="text-white font-serif">
          <span className="mb-6 inline-block opacity-60">We are a london based creative design studio</span>
          <h3 className="mb-[40px] font-medium">Let's work together to build something great</h3>
          <Buttons ariaLabel="button link" href="mailTo:info@yourdomain.com" className="font-medium font-serif uppercase hover:text-white btn-expand" size="lg" color="#ffffff" themeColor="rgba(0,0,0,0.7)" title="info@yourdomain.com" />
        </Col>
      </Row>
    </Container>
  </m.section>
  {/* Section end */ }
    </>
  )
}

export default CallToActionPage