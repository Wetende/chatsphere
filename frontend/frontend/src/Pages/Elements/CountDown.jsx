import React from "react";

// Libraries
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Components
import CountDown from "../../Components/Countdown/Countdown";
import { fadeIn } from "../../Functions/GlobalAnimations";
const CountDownPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">
                Countdown
              </h1>
            </Col>
            <Col
              xl={4}
              lg={6}
              className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center"
            >
              <ul className="xs-text-center">
                <li>
                  <Link
                    to="/"
                    aria-label="breadcrumb"
                    className="hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    aria-label="breadcrumb"
                    onClick={(e) => e.preventDefault()}
                    className="hover:text-white"
                  >
                    Elements
                  </Link>
                </li>
                <li>Countdown</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <section className="bg-darkgray py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-white text-center font-medium mb-[25px] lg:mb-[15px]">
                Countdown style 01
              </h6>
            </Col>
          </Row>
          <Row className="justify-center mb-[40px]">
            <Col xs={12} lg={6} md={9} xl={5}>
              <CountDown
                theme="countdown-style-01"
                className="text-white font-semibold font-serif justify-between"
                date="2025-04-29T15:02:03"
                animation={fadeIn}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] lg:mb-[15px]">
                Countdown style 02
              </h6>
            </Col>
          </Row>
          <CountDown
            theme="countdown-style-02"
            className="text-darkgray font-serif justify-center mb-[40px] xs:mb-0"
            date="2025-04-18T04:30:40"
            animation={fadeIn}
          />
        </Container>
      </section>
      <section className="bg-darkslateblue py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-white text-center font-medium mb-[25px] lg:mb-[15px]">
                Countdown style 03
              </h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col xs={12} lg={6} md={9} xl={5}>
              <CountDown
                theme="countdown-style-03"
                className="text-white justify-between font-serif font-semibold"
                date="2025-04-29T15:02:03"
                animation={fadeIn}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CountDownPage;
