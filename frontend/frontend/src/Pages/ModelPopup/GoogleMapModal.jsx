import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';

// Component
import Buttons from '../../Components/Button/Buttons'
import GoogleMap from '../../Components/GoogleMap/GoogleMap'
import CustomModal from '../../Components/CustomModal'
import { fadeIn } from "../../Functions/GlobalAnimations";

const GoogleMapModal = () => {
  return (
    <>

      {/* Section Start */}
      <section className="bg-darkgray py-[25px] page-title-small p-[130px] xxs:px-0">
        <Container>
          <Row className="items-center justify-center">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-lg text-white font-medium mb-0 md:text-center">Google map modal</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-sm font-serif mb-0 md:mt-[10px] md:justify-center">
              <ul className="xs:text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" className="hover:text-white">Features</Link></li>
                <li>Google map</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <m.section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col md={12} className="text-center">
              <h6 className="font-medium text-darkgray font-serif mb-[25px] lg:mb-[15px]">Popup with Google map</h6>
            </Col>
            <Col xl={5} lg={8} md={10} className="text-center">
              <h6 className="mb-[8%] font-light lg:mb-[60px] md:mb-[45px] sm:mb-[30px]">In this example lightboxes are automatically disabled on small screen size and default behavior of link is triggered.</h6>
              {/* Modal Component Start */}
              <CustomModal.Wrapper
                modalBtn={<Buttons type="submit" className="btn-fill mx-3 font-medium font-serif rounded-[4px] uppercase" themeColor="#0038e3" color="#fff" size="md" title="Open Google Map" />} >
                <div className="w-[1020px] max-w-full relative rounded mx-auto">
                  <div className="fit-video">
                    <GoogleMap className="absolute top-0 left-0 w-full h-full"
                      location="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.840108181589!2d144.95373631531888!3d-37.8172139797519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sin!4v1597672202024!5m2!1sen!2sin"
                    />
                  </div>
                </div>
              </CustomModal.Wrapper>
              {/* Modal Component End */}
            </Col>
          </Row>
        </Container>
      </m.section>





    </>
  )
}

export default GoogleMapModal
