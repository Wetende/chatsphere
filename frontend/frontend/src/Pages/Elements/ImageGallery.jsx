import React from 'react'

// Libraries
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Components
import { fadeIn } from '../../Functions/GlobalAnimations'
import ImageGallery from '../../Components/ImageGallery/ImageGallery'

// Data
import { imageGalleryData01, imageGalleryData02, imageGalleryData03 } from '../../Components/ImageGallery/ImageGalleryData'

const ImageGalleryPage = () => {
  return (
    <>

      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Image gallery</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Image gallery</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <section className="border-bottom border-color-extra-light-gray px-[10%] lg:px-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container fluid>
          <Row>
            <Col className="mb-[6%]">
            <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Image gallery style 01</h6>
            </Col>
            </Row>
            <Row>
            <ImageGallery theme="image-gallery-01" data={imageGalleryData01} overlay={["#556fff", "#b263e4", "#e05fc4", "#f767a6", "#ff798e"]} className="" animation={fadeIn} />
          </Row>
        </Container>
      </section>

      <section className="bg-lightgray border-bottom border-color-extra-light-gray px-[10%] lg:px-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container fluid>
          <Row>
            <Col className="mb-[6%]">
            <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Image gallery style 02</h6>
            </Col>
            </Row>
            <Row>
            <ImageGallery theme="image-gallery-02" grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large" data={imageGalleryData02} overlay={["#36c1e1", "#28ccc0", "#74cf8e", "#bac962", "#feb95b"]} animation={fadeIn} />
          </Row>
        </Container>
      </section>

      <section className="bg-lightgray px-[6%] py-[130px] lg:px-0 lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container fluid>
          <Row>
            <Col className="mb-[6%]">
            <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Image gallery style 03</h6>
            </Col>
            </Row>
            <Row>
            <ImageGallery grid="grid grid-4col xl-grid-4col lg-grid-4col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large text-center" theme="image-gallery-03" data={imageGalleryData03} overlay={["#58bc4b", "#d9a026", "#813ea9", "#82bc13", "#214bdf", "#e28e1a", "#04c05c", "#e52d8c"]} animation={fadeIn} />
          </Row>
        </Container>
      </section>
    </>
  )
}

export default ImageGalleryPage