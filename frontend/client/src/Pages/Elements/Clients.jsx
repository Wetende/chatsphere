import React from "react";

// Libraries
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom'

// Components
import Clients from '../../Components/Clients/Clients'
import { fadeIn } from "../../Functions/GlobalAnimations";

// Data
import {
  ClientData01,
  ClientData02,
  ClientData03,
  ClientData04,
  ClientData05,
  ClientData06,
  ClientData07,
  ClientData08,
} from "../../Components/Clients/ClientsData";

const ClientPage = () => {
  return (
    <>

      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Clients</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs leading-[22px] font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Clients</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] sm:mb-[15px]">
                Clients style 01
              </h6>
            </Col>
          </Row>
          <Clients
            grid="row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 gap-y-5"
            theme="client-logo-style-01"
            className="p-[15px]"
            data={ClientData01}
            animation={fadeIn}
          />
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray">
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] sm:mb-[15px]">
                Clients style 02
              </h6>
            </Col>
          </Row>
          <Clients
            grid="row-cols-1 row-cols-md-2 row-cols-lg-4 gap-y-5"
            theme="client-logo-style-02"
            data={ClientData02}
            animation={fadeIn}
          />
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] sm:mb-[15px]">
                Clients style 03
              </h6>
            </Col>
          </Row>
          <Clients
            grid="row-cols-1 row-cols-md-2 row-cols-lg-4"
            theme="client-logo-style-03"
            data={ClientData03}
            animation={fadeIn}
          />
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray">
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] sm:mb-[15px]">
                Clients style 04
              </h6>
            </Col>
          </Row>
          <Clients
            grid="row-cols-1 row-cols-lg-5 row-cols-md-3 row-cols-sm-2"
            theme="client-logo-style-04"
            data={ClientData04}
            animation={fadeIn}
          />
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] sm:mb-[15px]">
                Clients style 05
              </h6>
            </Col>
          </Row>
          <Clients
            grid="row row-cols-1 row-cols-lg-4 row-cols-sm-2"
            theme="client-logo-style-05"
            data={ClientData05}
            animation={fadeIn}
          />
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-darkgray text-white">
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-white text-center font-medium mb-[25px] sm:mb-[15px]">
                Clients style 06
              </h6>
            </Col>
          </Row>
          <Clients
            grid="row-cols-1 row-cols-sm-2 row-cols-md-4"
            theme="client-logo-style-06"
            data={ClientData06}
            animation={fadeIn}
          />
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] sm:mb-[15px]">
                Clients style 07
              </h6>
            </Col>
          </Row>
          <Clients
            grid="row row-cols-1 row-cols-lg-4 row-cols-sm-2"
            theme="client-logo-style-07"
            data={ClientData07}
            animation={fadeIn}
          />
        </Container>
      </section>
      <section className="bg-lightgray pt-[160px] lg:pt-[120px] md:pt-[95px] sm:pt-[80px] xs:pt-[50px]">
        <Container>
          <Row>
            <Col className="mb-[6%]">
              <h6 className="font-serif text-darkgray text-center font-medium mb-[25px] sm:mb-[15px]">
                Clients style 08
              </h6>
            </Col>
          </Row>
        </Container>
        <div className="border-t border-[#0000001a]">
          <Container>
            <Clients
              className="px-0"
              grid="row row-cols-1 row-cols-md-4 row-cols-sm-2"
              theme="client-logo-style-08"
              data={ClientData08}
              animation={fadeIn}
            />
          </Container>
        </div>
      </section>
    </>
  );
};

export default ClientPage;
