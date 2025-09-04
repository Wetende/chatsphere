import React from 'react'

// Libraries
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'

// Component
import { fadeIn } from '../../Functions/GlobalAnimations'
import SocialIcons from '../../Components/SocialIcon/SocialIcons'

// Data
import { SocialIconsData01, SocialIconsData02, SocialIconsData03, SocialIconsData04, SocialIconsData05, SocialIconsData06, SocialIconsData07, SocialIconsData08, SocialIconsData09, SocialIconsData10, SocialIconsData11, SocialIconsData12 } from '../../Components/SocialIcon/SocialIconsData'

const SocialIconsPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Social icon</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Social icon</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container className="px-[15px]">
          <Row className='mb-[5%]'>
            <Col>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Social icon style 01</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={12} md={10} sm={12}>
              <SocialIcons theme="social-icon-style-01" className="justify-center text-center" size="lg" iconColor="dark" data={SocialIconsData01} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-[#262b35]" {...fadeIn}>
        <Container className="px-[15px]">
          <Row className='mb-[5%]'>
            <Col>
              <h6 className="font-serif text-white text-center font-medium mb-[25px] lg:mb-[15px]">Social icon style 02</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={12} md={10} sm={12}>
              <SocialIcons theme="social-icon-style-02" className="justify-center text-center" iconColor="light" data={SocialIconsData02} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container className="px-[15px]">
          <Row className='mb-[5%]'>
            <Col>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Social icon style 03</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={12} md={10} sm={12}>
              <SocialIcons theme="social-icon-style-03" className="justify-center text-center" iconColor="light" data={SocialIconsData03} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <Container className="px-[15px]">
          <Row className='mb-[5%]'>
            <Col>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Social icon style 04</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={12} md={10} sm={12}>
              <SocialIcons theme="social-icon-style-04" className="justify-center text-center" iconColor="light" data={SocialIconsData04} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] " {...fadeIn}>
        <Container className="px-[15px]">
          <Row className='mb-[5%]'>
            <Col>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Social icon style 05</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={12} md={10} sm={12}>
              <SocialIcons theme="social-icon-style-05" className="justify-center text-center" iconColor="dark" data={SocialIconsData05} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <Container className="px-[15px]">
          <Row className='mb-[5%]'>
            <Col>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Social icon style 06</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={12} md={10} sm={12}>
              <SocialIcons theme="social-icon-style-06" className="justify-center text-center" iconColor="dark" data={SocialIconsData06} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-black" {...fadeIn}>
        <Container className="px-[15px]">
          <Row className='mb-[5%]'>
            <Col>
              <h6 className="font-serif text-white text-center font-medium mb-[25px] lg:mb-[15px]">Social icon style 07</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={12} md={10} sm={12}>
              <SocialIcons theme="social-icon-style-07" className="justify-center text-center" iconColor="light" data={SocialIconsData07} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <Container className="px-[15px]">
          <Row className='mb-[5%]'>
            <Col>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Social icon style 08</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={12} sm={12}>
              <SocialIcons theme="social-icon-style-08" className="justify-center text-center" data={SocialIconsData08} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] " {...fadeIn}>
        <Container className="px-[15px]">
          <Row className='mb-[5%]'>
            <Col>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Social icon style 09</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={12} md={10} sm={12}>
              <SocialIcons theme="social-icon-style-09" className="justify-center text-center" iconColor="dark" data={SocialIconsData09} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-black" {...fadeIn}>
        <Container className="px-[15px]">
          <Row className='mb-[5%]'>
            <Col>
              <h6 className="font-serif text-white text-center font-medium mb-[25px] lg:mb-[15px]">Social icon style 10</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={12} md={10} sm={12}>
              <SocialIcons theme="social-icon-style-10" className="justify-center text-center" iconColor="light" animation={fadeIn} data={SocialIconsData10} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray" {...fadeIn}>
        <Container className='text-center'>
          <Row className='mb-[5%]'>
            <Col>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Social icon style 11</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={12} md={10} sm={12}>
              <SocialIcons theme="social-icon-style-11" className="justify-center text-center" data={SocialIconsData11} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] " {...fadeIn}>
        <Container className="px-[15px]">
          <Row className='mb-[5%]'>
            <Col>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Social icon style 12</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col lg={12} md={10} sm={12}>
              <SocialIcons theme="social-icon-style-12" className="justify-center text-center" data={SocialIconsData12} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}
    </>
  )
}

export default SocialIconsPage