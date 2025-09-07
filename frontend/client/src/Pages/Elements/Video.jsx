import React from 'react'

// Libraries
import { Container, Col, Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

// Component
import { fadeIn } from '../../Functions/GlobalAnimations'
import Videos from '../../Components/Videos/Videos'
import Buttons from '../../Components/Button/Buttons'
import CustomModal from "../../Components/CustomModal"

const VideoPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Video</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Video</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Video iframe section start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[6%]">
              <h6 className="font-serif text-darkgray font-medium">Video iframe</h6>
            </Col>
          </Row>
          <Row className='row-cols-2 justify-center sm:block'>
            <Col className="px-[15px] sm:w-full sm:mb-[30px]">
              <div className="fit-video">
                <iframe title="vimeo-player" src="https://player.vimeo.com/video/176916362?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=true&amp;muted=1" frameBorder="0" allowFullScreen></iframe>
              </div>
            </Col>
            <Col className="px-[15px] sm:w-full sm:mb-[30px]">
              <div className="fit-video">
                <iframe src="https://www.youtube.com/embed/sU3FkzUKHXU?autoplay=1&mute=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Video iframe section end */}

      {/* Background video section start */}
      <section>
        <Videos
          className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]"
          src="/assets/video/video.mp4"
          loop={true}
          poster="https://via.placeholder.com/1920x1080"
          overlay={["#0039e3", "#4132e0", "#4132e0", "#741bd9", "#8600d4"]}
          opacity="0.8"
        >
          <Container>
            <Row className="justify-center">
              <Col lg={8} xl={7} md={10} xs={12} className="text-center z-[1] relative pt-[5%] pb-[5%]">
                <h3 className="mb-[35px] font-semibold font-serif text-white">Background video</h3>
                <p className="w-[80%] mb-[45px] opacity-70 leading-[32px] text-lg font-serif text-white mx-auto lg:mt-0 lg:mx-[75px] lg:mb-[45px] md:text-xmd md:leading-[22px] xs:leading-[22px] sm:w-full">Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore.</p>
                <Buttons href="#" className="btn-fill mx-3 drop-shadow-md	font-medium font-serif uppercase rounded-[50px] text-[15px] md:mb-[15px] xs:mb-0" size="lg" themeColor="#fff" color="#000" title="Get Started Now" />
              </Col>
            </Row>
          </Container>
        </Videos>
      </section>
      {/* Background video section end */}

      {/* Popup video section start */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-no-repeat bg-left-bottom" style={{ backgroundImage: `url('https://via.placeholder.com/1075x517')` }} {...fadeIn}>
        <Container>
          <h6 className="font-serif text-gray-900 text-center font-medium mb-24">Popup video</h6>
          <Row className='justify-center'>
            <Col lg={8} className='relative'>
              <img width="" height="" className="w-full h-auto align-middle" src='https://via.placeholder.com/850x653' alt="" />
              <span className="absolute top-0 left-0 w-full h-full justify-center items-center flex z-0">

                {/* Modal Component Start */}
                <CustomModal.Wrapper
                  modalBtn={
                    <Buttons type="submit" className="btn-sonar border-0 shadow-[0_0_15px_rgba(0,0,0,0.1)]" themeColor="#fff" color="#ff7a56" size="lg" title={<i className="icon-control-play" />} />
                  }
                >
                  <div className="w-[1020px] max-w-full relative rounded mx-auto">
                    <div className="fit-video">
                      <iframe
                        width="100%"
                        height="100%"
                        controls
                        src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </CustomModal.Wrapper>
                {/* Modal Component End */}
              </span>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Popup video section end */}

      {/* Background youtube video start */}
      <section>
        <Videos
          className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]"
          src="https://www.youtube.com/embed/sU3FkzUKHXU?rel=0&amp;showinfo=0&amp;background=1&amp;autoplay=1&amp;loop=1&amp;mute=1&amp;playlist=sU3FkzUKHXU"
          loop={true}
          poster="https://via.placeholder.com/1920x1080"
          overlay={["#0039e3", "#4132e0", "#4132e0", "#741bd9", "#8600d4"]}
          opacity="0.8"
        >
          <Container>
            <Row className="justify-center">
              <Col lg={8} xl={7} md={10} xs={12} className="text-center z-[1] relative pt-[5%] pb-[5%]">
                <h3 className="mb-[35px] font-semibold font-serif text-white">Background youtube video</h3>
                <p className="w-[80%] mb-[45px] opacity-70 leading-[32px] text-lg font-serif text-white mx-auto lg:mt-0 lg:mx-[75px] lg:mb-[45px] md:text-xmd sm:w-full xs:leading-[22px]">Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore.</p>
                <Buttons href="#" className="btn-fill mx-3 drop-shadow-md	font-medium font-serif uppercase rounded-[50px] text-[15px] md:mb-[15px] xs:mb-0" size="lg" themeColor="#fff" color="#000" title="Get Started Now" />
              </Col>
            </Row>
          </Container>
        </Videos>
      </section>
      {/* Background youtube video end */}

    </>
  )
}

export default VideoPage