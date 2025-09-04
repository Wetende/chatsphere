import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Component
import { fadeIn, fadeInLeft, zoomIn } from '../../Functions/GlobalAnimations'
import Buttons from '../../Components/Button/Buttons'
import IconWithText from '../../Components/IconWithText/IconWithText'
import CustomModal from '../../Components/CustomModal'


//Data
import { IconWithTextData_01, IconWithTextData_02, IconWithTextData_03, IconWithTextData_04, IconWithTextData_05, IconWithTextData_06, IconWithTextData_07, IconWithTextData_08, IconWithTextData_09, IconWithTextData_10, IconWithTextData_11 } from '../../Components/IconWithText/IconWithTextData'


const IconWithTextPage = () => {
  return (
    <>

      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Icon with text</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Icon with text</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[7%]">
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Icon with text style 01</h6>
            </Col>
          </Row>
          <IconWithText
            grid="row-cols-1 row-cols-lg-3 row-cols-sm-2 gap-y-[60px] sm:gap-y-[30px] xs:gap-y-[40px]"
            theme="icon-with-text-01"
            data={IconWithTextData_01}
            animation={fadeIn}
            animationDelay={0.1}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Icon with text style 02</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col xs={12} lg={12} md={9}>
              <IconWithText
                grid="row-cols-1 row-cols-lg-2 gap-y-[30px] xs:gap-y-[15px]"
                theme="icon-with-text-02"
                data={IconWithTextData_02}
                animation={fadeIn}
                animationDelay={0.2}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[7%]">
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Icon with text style 03</h6>
            </Col>
          </Row>
          <IconWithText
            grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 text-center gap-y-10"
            theme="icon-with-text-03"
            data={IconWithTextData_03}
            animation={fadeIn}
            animationDelay={0.2}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Icon with text style 04</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col xs={12} sm={8} md={12}>
              <IconWithText
                grid="row-cols-1 row-cols-lg-3 row-cols-md-2 justify-center md:mb-[30px] gap-y-10"
                theme="icon-with-text-04"
                data={IconWithTextData_04}
                animation={fadeIn}
                animationDelay={0.2}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[7%]">
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Icon with text style 05</h6>
            </Col>
          </Row>
          <IconWithText
            grid="row-cols-1 row-cols-lg-5 row-cols-md-3 row-cols-sm-2 justify-center gap-y-10"
            theme="icon-with-text-05"
            className="text-center md:mb-[50px]"
            data={IconWithTextData_05}
            animation={fadeIn}
            animationDelay={0.2}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[7%]">
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Icon with text style 06</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col xs={12} sm={8} md={12}>
              <IconWithText
                grid="row-cols-1 row-cols-lg-3 row-cols-md-2 row-col-sm-8 justify-center gap-y-10"
                theme="icon-with-text-06"
                data={IconWithTextData_06}
                animation={fadeIn}
                animationDelay={0.2}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-white py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[7%]">
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Icon with text style 07</h6>
            </Col>
          </Row>
          <IconWithText
            grid="row-cols-1 row-cols-lg-3 row-cols-sm-2 justify-center gap-y-10"
            theme="icon-with-text-07"
            data={IconWithTextData_07}
            animation={fadeIn}
            animationDelay={0.2}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[7%]">
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Icon with text style 08</h6>
            </Col>
          </Row>
          <Row className="items-center justify-center">
            <Col lg={6} className="relative">
              <img width="" height="" className="mx-auto" src='https://via.placeholder.com/476x652' alt="" />
              <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center">
                {/* Modal Component Start */}
                <CustomModal.Wrapper
                  className="items-center flex h-full justify-center w-full"
                  modalBtn={<Buttons className="btn-sonar border-0 shadow-[0_0_15px_rgba(0,0,0,0.1)]" type="submit" themeColor="#fff" color="#232323" size="lg" title={<i className="icon-control-play" />} />} >
                  <div className="w-[1020px] max-w-full relative rounded mx-auto">
                    <div className="fit-video">
                      <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                    </div>
                  </div>
                </CustomModal.Wrapper>
                {/* Modal Component End */}
              </div>
            </Col>
            <Col xl={4} lg={{ span: 5, offset: 1 }} md={7}>
              <IconWithText
                grid="flex-col gap-y-[60px]"
                theme="icon-with-text-08"
                data={IconWithTextData_08}
                animation={fadeInLeft}
                animationDelay={0.2}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-white py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[7%]">
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Icon with text style 09</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col xl={8} lg={9}>
              <IconWithText
                grid="row-cols-1 row-cols-lg-4 row-cols-md-4 row-cols-sm-2 gap-y-10"
                theme="icon-with-text-09"
                data={IconWithTextData_09}
                animation={zoomIn}
                animationDelay={0.2}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[7%]">
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Icon with text style 10</h6>
            </Col>
          </Row>
          <IconWithText
            grid="row-cols-1 row-cols-lg-3 row-cols-sm-2"
            theme="icon-with-text-10"
            data={IconWithTextData_10}
            animation={fadeIn}
            animationDelay={0.2}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-darkgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[7%]">
              <h6 className="font-serif text-lightgray text-center font-medium mb-[25px] lg:mb-[15px]">Icon with text style 11</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col xs={12} sm={8} md={12}>
              <IconWithText
                grid="row-cols-1 row-cols-lg-3 row-cols-md-2 row-cols-sm-1"
                theme="icon-with-text-11"
                className="md:mb-[30px] xs:mb-[15px]"
                data={IconWithTextData_11}
                animation={fadeIn}
                animationDelay={0.2}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}
    </>
  )
}

export default IconWithTextPage