import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { m } from "framer-motion"

// Components
import { fadeIn, fadeInLeft, zoomIn } from '../../Functions/GlobalAnimations'
import InteractiveBanners01 from '../../Components/InteractiveBanners/InteractiveBanners01'
import InteractiveBanners02 from '../../Components/InteractiveBanners/InteractiveBanners02'
import InteractiveBanners03 from '../../Components/InteractiveBanners/InteractiveBanners03'
import InteractiveBanners04 from '../../Components/InteractiveBanners/InteractiveBanners04'
import InteractiveBanners05 from '../../Components/InteractiveBanners/InteractiveBanners05'
import InteractiveBanners06 from '../../Components/InteractiveBanners/InteractiveBanners06'
import InteractiveBanners07 from '../../Components/InteractiveBanners/InteractiveBanners07'
import InteractiveBanners08 from '../../Components/InteractiveBanners/InteractiveBanners08'
import InteractiveBanners09 from '../../Components/InteractiveBanners/InteractiveBanners09'
import InteractiveBanners10 from '../../Components/InteractiveBanners/InteractiveBanners10'
import InteractiveBanners11 from "../../Components/InteractiveBanners/InteractiveBanners11"
import InteractiveBanners12 from '../../Components/InteractiveBanners/InteractiveBanners12'
import InteractiveBanners13 from '../../Components/InteractiveBanners/InteractiveBanners13'
import InteractiveBanners14 from '../../Components/InteractiveBanners/InteractiveBanners14'
import InteractiveBanners15 from '../../Components/InteractiveBanners/InteractiveBanners15'

// Data
import { InteractiveBannersData01, InteractiveBannersData02, InteractiveBannersData03, InteractiveBannersData04, InteractiveBannersData05, InteractiveBannersData06, InteractiveBannersData07, InteractiveBannersData08, InteractiveBannersData09, InteractiveBannersData10, InteractiveBannersData12, InteractiveBannersData13, InteractiveBannersData14, InteractiveBannersData15 } from '../../Components/InteractiveBanners/InteractiveBannersData'

const InteractiveBannersPage = (props) => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Interactive banners</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Interactive banners</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] overflow-hidden">
        <Container fluid className="px-0">
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[5%]">
              <h6 className="font-serif text-darkgray font-medium">Interactive banners style 01</h6>
            </Col>
          </Row>
          <InteractiveBanners01 grid="row-cols-1" className="" data={InteractiveBannersData01} animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] overflow-hidden bg-lightgray">
        <Container>
          <h6 className="font-serif text-gray-900 text-center font-medium mb-[91px] xl:mb-[105px] lg:mb-[74px] md:mb-[65px] sm:mb-[53px] xs:mb-[46px] xxs:mb-[40px]">Interactive banners style 02</h6>
          <InteractiveBanners02
            carousalOption={{
              slidesPerView: 1,
              spaceBetween: 30,
              loop: true,
              keybord: { enable: true, onlyInViewport: true },
              autoplay: { delay: 3500, disableOnInteraction: false },
              breakpoints: { 1200: { slidesPerView: 4 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }
            }}
            data={InteractiveBannersData02} className="" animation={fadeIn}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <h6 className="font-serif text-gray-900 text-center font-medium mb-[91px] xl:mb-[105px] lg:mb-[74px] md:mb-[65px] sm:mb-[53px] xs:mb-[46px] xxs:mb-[40px]">Interactive banners style 03</h6>
          <InteractiveBanners03
            grid="row-cols-1 gap-y-10"
            overlay={["#2ed47ce6", "#e8a626e6"]}
            data={InteractiveBannersData03}
            animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray">
        <Container fluid className="px-[30px] xs:px-[15px]">
          <h6 className="font-serif text-gray-900 text-center font-medium mb-[91px] xl:mb-[105px] lg:mb-[74px] md:mb-[65px] sm:mb-[53px] xs:mb-[46px] xxs:mb-[40px]">Interactive banners style 04</h6>
          <InteractiveBanners04
            grid="row-cols-12 gap-y-10 sm:justify-center"
            overlay={["#0039e3cc", "#4132e0cc", "#5e28ddcc", "#741bd9cc", "#8600d4cc"]}
            data={InteractiveBannersData04}
            animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <h6 className="font-serif text-darkgray text-center font-medium mb-[91px] xl:mb-[105px] lg:mb-[74px] md:mb-[65px] sm:mb-[53px] xs:mb-[46px] xxs:mb-[40px]">Interactive banners style 05</h6>
          <InteractiveBanners05
            grid="row-cols-1 gap-y-[50px] justify-center"
            data={InteractiveBannersData05}
            animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] px-32 lg:px-16 xl:px-[0px] lg:py-[90px] md:py-[75px] sm:py-[50px] md:px-0 bg-black">
        <Container fluid>
          <h6 className="font-serif text-white text-center font-medium mb-[91px] xl:mb-[105px] lg:mb-[74px] md:mb-[65px] sm:mb-[53px] xs:mb-[46px] xxs:mb-[40px]">Interactive banners style 06</h6>
          <Row className="justify-center">
            <Col sm={8} md={12}>
              <InteractiveBanners06
                grid="row-cols-lg-3 gap-y-10 justify-center"
                className=""
                data={InteractiveBannersData06}
                animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-white">
        <Container>
          <h6 className="font-serif text-darkgray text-center font-medium mb-[91px] xl:mb-[105px] lg:mb-[74px] md:mb-[65px] sm:mb-[53px] xs:mb-[46px] xxs:mb-[40px]">Interactive banners style 07</h6>
          <InteractiveBanners07 data={InteractiveBannersData07} grid="text-center row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-[2.2rem] md:px-0" className="" animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray overflow-hidden">
        <Container>
          <h6 className="font-serif text-darkgray text-center font-medium mb-[91px] xl:mb-[105px] lg:mb-[74px] md:mb-[65px] sm:mb-[53px] xs:mb-[46px] xxs:mb-[40px]">Interactive banners style 08</h6>
          <InteractiveBanners08
            grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-10 justify-center"
            data={InteractiveBannersData08}
            animation={fadeInLeft} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-white">
        <Container>
          <h6 className="font-serif text-darkgray text-center font-medium mb-[91px] xl:mb-[105px] lg:mb-[74px] md:mb-[65px] sm:mb-[53px] xs:mb-[46px] xxs:mb-[40px]">Interactive banners style 09</h6>
          <InteractiveBanners09
            data={InteractiveBannersData09}
            grid="row-cols-1 row-cols-md-2 row-cols-sm-2 row-cols-lg-4 gap-y-[30px] xs:gap-y-[15px] justify-center"
            animation={zoomIn}
            animationDelay={0.1}
            animationDuration={0.6}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-mediumgray">
        <Container fluid className="px-[5%] lg:px-[4%]">
          <h6 className="font-serif text-darkgray text-center font-medium mb-[91px] xl:mb-[105px] lg:mb-[74px] md:mb-[65px] sm:mb-[53px] xs:mb-[46px] xxs:mb-[40px]">Interactive banners style 10</h6>
          <InteractiveBanners10 grid="row row-cols-1 row-cols-xl-4 row-cols-sm-2 lg:gap-y-10" data={InteractiveBannersData10} animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[160px] xs:py-[50px] lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <h6 className="font-serif text-darkgray text-center font-medium mb-[91px] xl:mb-[105px] lg:mb-[74px] md:mb-[65px] sm:mb-[53px] xs:mb-[46px] xxs:mb-[40px]">Interactive banners style 11</h6>
          <InteractiveBanners11 />
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-mediumgray">
        <Container>
          <h6 className="font-serif text-darkgray text-center font-medium mb-[91px] xl:mb-[105px] lg:mb-[74px] md:mb-[65px] sm:mb-[53px] xs:mb-[46px] xxs:mb-[40px]">Interactive banners style 12</h6>
          <InteractiveBanners12 grid="gap-y-10" className="justify-center" data={InteractiveBannersData12} animation={fadeIn} animationDelay={0.4} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <h6 className="font-serif text-darkgray text-center font-medium mb-[91px] xl:mb-[105px] lg:mb-[74px] md:mb-[65px] sm:mb-[53px] xs:mb-[46px] xxs:mb-[40px]">Interactive banners style 13</h6>
          <InteractiveBanners13 grid="row row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-10 items-center"
            data={InteractiveBannersData13}
            animation={zoomIn}
            animationTransition={[0, 0.55, 0.45, 1]}
            animationDuration={0.6}
            animationDelay={0.2}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] overflow-hidden bg-lightgray">
        <Container>
          <h6 className="font-serif text-darkgray text-center font-medium mb-[91px] xl:mb-[105px] lg:mb-[74px] md:mb-[65px] sm:mb-[53px] xs:mb-[46px] xxs:mb-[40px]">Interactive banners style 14</h6>
          <InteractiveBanners14 grid="row-cols-1 row-cols-lg-3 row-cols-md-2 gap-y-10" className="justify-center" data={InteractiveBannersData14} animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-[#23262d] py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <h6 className="font-serif text-white text-center font-medium mb-[91px] xl:mb-[105px] lg:mb-[74px] md:mb-[65px] sm:mb-[53px] xs:mb-[46px] xxs:mb-[40px]">Interactive banners style 15</h6>
        <Container fluid className="xs:px-0">
          <InteractiveBanners15 data={InteractiveBannersData15} grid="row-cols-1 row-cols-xl-4 row-cols-md-2 gap-y-10 mx-[4%] md:mx-0" animation={fadeIn} animationDelay={0.3} />
        </Container>
      </section>
      {/* Section End */}
    </>
  )
}

export default InteractiveBannersPage