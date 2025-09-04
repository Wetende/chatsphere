import React from 'react'
// Libaries
import { Col, Container, Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'

//Components
import { fadeIn } from '../../Functions/GlobalAnimations'

const ColumnsPage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Columns</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Columns</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs;py-[50px]" {...fadeIn}>
        <Container>
          <Row>
            <Col className="mb-[4%]">              
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Full width</h6>
            </Col>
          </Row>
          <Row>
            <Col className="justify-center">
              <Col>
                <div className="bg-lightgray p-[40px] sm:p-[30px]">
                  <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem ipsum.</p>
                </div>
              </Col>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs;py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
        <Row>
            <Col className="mb-[4%]">              
              <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">One half</h6>
            </Col>
          </Row>
          <Row>
            <Col className="justify-center">
              <div className="row">
                <Col lg={6} className="lg:px-[15px] md:mb-[15px]">
                  <div className="bg-white drop-shadow-[0_0_15px_rgb(0,0,0,0.08)] p-[40px] sm:p-[30px]">
                    <h5 className="text-dark lg:mb-[15px]">1/2</h5>
                    <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  </div>
                </Col>
                <Col lg={6} className="lg:px-[15px] ">
                  <div className="bg-white drop-shadow-[0_0_15px_rgb(0,0,0,0.08)] p-[40px] sm:p-[30px]">
                    <h5 className="text-dark lg:mb-[15px]">1/2</h5>
                    <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  </div>
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs;py-[50px]" {...fadeIn}>
        <Container>
        <Row>
            <Col className="mb-[4%]">              
            <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">One third</h6>
            </Col>
          </Row>
          <Row>
            <Col lg={4} className="px-[15px] md:mb-[15px]">
              <div className="bg-lightgray p-[40px] sm:p-[30px]">
                <h5 className="text-dark lg:mb-[15px]">1/3</h5>
                <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text a galley of scrambled it to make a type specimen book.</p>
              </div>
            </Col>

            <Col lg={4} className="px-[15px] md:mb-[15px]">
              <div className="bg-lightgray p-[40px] sm:p-[30px]">
                <h5 className="text-dark lg:mb-[15px]">1/3</h5>
                <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text a galley of scrambled it to make a type specimen book.</p>
              </div>
            </Col>

            <Col lg={4} className="px-[15px] md:mb-[15px]">
              <div className="bg-lightgray p-[40px] sm:p-[30px]">
                <h5 className="text-dark lg:mb-[15px]">1/3</h5>
                <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text a galley of scrambled it to make a type specimen book.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs;py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
        <Row>
            <Col className="mb-[4%]">              
            <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">One fourth</h6>
            </Col>
          </Row>
          <Row>
            <Col lg={3} className="drop-shadow-[0_0_15px_rgb(0,0,0,0.08)] px-[15px] md:mb-[15px]">
              <div className="bg-white p-[40px] sm:p-[30px]">
                <h5 className="text-dark lg:mb-[15px] ">1/4</h5>
                <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy galley of scrambled make a type specimen book.</p>
              </div>
            </Col>

            <Col lg={3} className="drop-shadow-[0_0_15px_rgb(0,0,0,0.08)] px-[15px] md:mb-[15px]">
              <div className="bg-white p-[40px] sm:p-[30px]">
                <h5 className="text-dark lg:mb-[15px]">1/4</h5>
                <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy galley of scrambled make a type specimen book.</p>
              </div>
            </Col>

            <Col lg={3} className="drop-shadow-[0_0_15px_rgb(0,0,0,0.08)] px-[15px] md:mb-[15px]">
              <div className="bg-white p-[40px] sm:p-[30px]">
                <h5 className="text-dark lg:mb-[15px]">1/4</h5>
                <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy galley of scrambled make a type specimen book.</p>
              </div>
            </Col>

            <Col lg={3} className="drop-shadow-lg px-[15px] md:mb-[15px]">
              <div className="bg-white p-[40px] sm:p-[30px]">
                <h5 className="text-dark lg:mb-[15px]">1/4</h5>
                <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy galley of scrambled make a type specimen book.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs;py-[50px]" {...fadeIn}>
        <Container>
        <Row>
            <Col className="mb-[4%]">              
            <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">One third / Two third</h6>
            </Col>
          </Row>
          <Row>
            <Col lg={4} className="px-[15px] md:mb-[15px]">
              <div className="bg-lightgray p-[40px] sm:p-[30px]">
                <h5 className="text-darkgray lg:mb-[15px]">1/3</h5>
                <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text a galley of scrambled it to make a type specimen book.</p>
              </div>
            </Col>
            <Col lg={8} className="px-[15px] md:mb-[15px]">
              <div className="bg-lightgray p-[40px] sm:p-[30px]">
                <h5 className="text-darkgray lg:mb-[15px]">2/3</h5>
                <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>

      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs;py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
        <Row>
            <Col className="mb-[4%]">              
            <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Third fourth / One fourth</h6>
            </Col>
          </Row>
          <Row>            
              <Col lg={9} className="drop-shadow-[0_0_15px_rgb(0,0,0,0.08)] px-[15px] md:mb-[15px] ">
                <div className="bg-white p-[40px] sm:p-[30px]">
                  <h5 className="text-darkgray md:mb-[15px]">3/4</h5>
                  <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
              </Col>
              <Col lg={3} className="px-[15px] drop-shadow-[0_0_15px_rgb(0,0,0,0.08)]">
                <div className="bg-white p-[40px] sm:p-[30px]">
                  <h5 className="text-darkgray md:mb-[15px]">1/4</h5>
                  <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been a galley of specimen book.</p>
                </div>
              </Col>
            </Row>          
        </Container>
      </m.section>

      <m.section className="py-40" {...fadeIn}>
        <Container>
        <Row>
            <Col className="mb-[4%]">              
            <h6 className="font-serif text-dark text-center font-medium mb-[25px] lg:mb-[15px]">Grid structure</h6>
            </Col>
          </Row>
          <Row>
            <Col className="justify-center">
              <div className="row show-grid mb-4 text-center ">
                <div className="col-12 col-lg-1 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-1</div>
                <div className="col-12 col-lg-1 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-1</div>
                <div className="col-12 col-lg-1 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-1</div>
                <div className="col-12 col-lg-1 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-1</div>
                <div className="col-12 col-lg-1 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-1</div>
                <div className="col-12 col-lg-1 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-1</div>
                <div className="col-12 col-lg-1 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-1</div>
                <div className="col-12 col-lg-1 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-1</div>
                <div className="col-12 col-lg-1 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-1</div>
                <div className="col-12 col-lg-1 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-1</div>
                <div className="col-12 col-lg-1 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-1</div>
                <div className="col-12 col-lg-1 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-1</div>
              </div>

              <div className="row show-grid mb-4 text-center">
                <div className="col-12 col-lg-2 bg-lightgray border py-[10px] md:mb-[15px] ">.col-lg-2</div>
                <div className="col-12 col-lg-2 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-2</div>
                <div className="col-12 col-lg-2 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-2</div>
                <div className="col-12 col-lg-2 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-2</div>
                <div className="col-12 col-lg-2 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-2</div>
                <div className="col-12 col-lg-2 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-2</div>
              </div>

              <div className="row show-grid mb-4 text-center">
                <div className="col-12 col-lg-3 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-3</div>
                <div className="col-12 col-lg-3 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-3</div>
                <div className="col-12 col-lg-3 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-3</div>
                <div className="col-12 col-lg-3 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-3</div>
              </div>

              <div className="row show-grid mb-4 text-center">
                <div className="col-12 col-lg-4 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-4</div>
                <div className="col-12 col-lg-4 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-4</div>
                <div className="col-12 col-lg-4 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-4</div>
              </div>

              <div className="row show-grid mb-4 text-center">
                <div className="col-12 col-lg-5 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-5</div>
                <div className="col-12 col-lg-5 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-5</div>
                <div className="col-12 col-lg-2 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-2</div>
              </div>

              <div className="row show-grid mb-4 text-center">
                <div className="col-12 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-6</div>
                <div className="col-12 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-6</div>
              </div>

              <div className="row show-grid mb-4 text-center">
                <div className="col-12 col-lg-1 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-1</div>
                <div className="col-12 col-lg-11 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-11</div>
              </div>

              <div className="row show-grid mb-4 text-center">
                <div className="col-12 col-lg-2 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-2</div>
                <div className="col-12 col-lg-10 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-10</div>
              </div>

              <div className="row show-grid mb-4 text-center">
                <div className="col-12 col-lg-3 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-3</div>
                <div className="col-12 col-lg-9 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-9</div>
              </div>

              <div className="row show-grid mb-4 text-center">
                <div className="col-12 col-lg-4 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-4</div>
                <div className="col-12 col-lg-8 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-8</div>
              </div>

              <div className="row show-grid mb-4 text-center">
                <div className="col-12 col-lg-5 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-5</div>
                <div className="col-12 col-lg-7 bg-lightgray border py-[10px] md:mb-[15px]">.col-lg-7</div>
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>

    </>
  )
}

export default ColumnsPage