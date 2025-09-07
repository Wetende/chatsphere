import React from "react";

// Libraries
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// Components
import { fadeIn } from "../../Functions/GlobalAnimations";
import Clients from "../../Components/Clients/Clients";

// Data
import { ClientData01 } from "../../Components/Clients/ClientsData";

const ClientCarouselPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">
                Client carousel
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
                <li>Client carousel</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <section className="py-40 overflow-hidden">
        <Container>
          <Row>
            <Col className="relative">
              <Clients
                theme="client-logo-style-03"
                className="swiper-navigation-04 swiper-navigation-light"
                data={ClientData01}
                animation={fadeIn}
                carousel={true}
                carouselOption={{
                  slidesPerView: 1,
                  loop: true,
                  spaceBetween: 20,
                  autoplay: { delay: 3000, disableOnInteraction: false },
                  navigation: true,
                  breakpoints: {
                    1200: { slidesPerView: 4 },
                    992: { slidesPerView: 3 },
                    768: { slidesPerView: 3 },
                  },
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ClientCarouselPage;
