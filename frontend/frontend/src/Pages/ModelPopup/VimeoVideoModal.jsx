import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';

// Component
import Buttons from '../../Components/Button/Buttons'
import CustomModal from '../../Components/CustomModal'
import { fadeIn } from "../../Functions/GlobalAnimations";

const VimeoVideoModal = () => {
  return (
    <>

      {/* Section Start */}
      <section className="bg-darkgray py-[25px] page-title-small p-[130px] xxs:px-0">
        <Container>
          <Row className="items-center justify-center">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-lg text-white font-medium mb-0 md:text-center">Vimeo video modal</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-sm font-serif mb-0 md:mt-[10px] md:justify-center">
              <ul className="xs:text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" className="hover:text-white">Features</Link></li>
                <li>Vimeo video</li>
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
              <h6 className="font-medium text-darkgray font-serif mb-[25px] lg:mb-[15px]">Popup with Vimeo video</h6>
            </Col>
            <Col xl={5} lg={8} md={10} className="text-center">
              <h6 className="mb-[8%] font-light lg:mb-[60px] md:mb-[45px] sm:mb-[30px]">In this example lightboxes are automatically disabled on small screen size and default behavior of link is triggered.</h6>
              {/* Modal Component Start */}
              <CustomModal.Wrapper
                modalBtn={<Buttons type="submit" className="btn-fill mx-3 font-medium font-serif rounded-[4px] uppercase" themeColor="#0038e3" color="#fff" size="md" title="Open Vimeo Video" />} >
                <div className="w-[1020px] max-w-full relative rounded mx-auto">
                  <div className="fit-video">
                    <iframe width="100%" height="100%" controls src="//player.vimeo.com/video/75976293?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
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

export default VimeoVideoModal
