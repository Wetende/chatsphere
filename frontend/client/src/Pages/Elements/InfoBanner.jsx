import React from "react";

// Libraries
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { m } from "framer-motion";

// Components
import CustomModal from '../../Components/CustomModal'
import Buttons from '../../Components/Button/Buttons'
import InfoBannerStyle05 from "../../Components/InfoBanner/InfoBannerStyle05";
import InfoBannerStyle01 from "../../Components/InfoBanner/InfoBannerStyle01";
import InfoBannerStyle03 from "../../Components/InfoBanner/InfoBannerStyle03";
import { fadeIn, fadeInRight, fadeInUp, zoomIn } from "../../Functions/GlobalAnimations";

// Data
import { InfoBannerData01, InfoBannerData03, InfoBannerData05 } from "../../Components/InfoBanner/InfoBannerData";

const InfoBannerPage = () => {
  return (
    <>
      {/* Breadcrumbs  Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Info banner</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Info banner</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Breadcrumbs End */}

      {/* Info Banner Style 01 Start */}
      <section className="bg-lightgray py-[160px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[6%]">
              <h6 className="font-serif text-darkgray text-center font-medium">Info banners style 01</h6>
            </Col>
          </Row>
          <InfoBannerStyle01 grid="row row-cols-1 row-cols-lg-3 row-cols-sm-2 gap-y-10" className="justify-center" data={InfoBannerData01} animation={fadeIn} />
        </Container>
      </section>
      {/* Info Banner Style 01 End */}

      {/* Info Banner Style 02 */}
      <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] relative bg-cover bg-center"
        style={{ backgroundImage: `url("https://via.placeholder.com/1920x1100")`, }} >
        <div className="absolute top-0 left-0 w-full h-full opacity-60 bg-darkslateblue"></div>
        <Container className="relative">
          <Row className="justify-center text-center">
            <Col xl={7} lg={8} md={10}>
              <div className="font-serif text-white">
                {/* Modal Component Start */}
                <CustomModal.Wrapper
                  modalBtn={
                    <m.div {...zoomIn}>
                      <Buttons type="submit" className="btn-sonar border-0 mx-auto mb-14" themeColor="#3452ff" y color="#fff" size="lg" title={<i className="icon-control-play" />} />
                    </m.div>} >
                  <div className="w-[1020px] max-w-full relative rounded mx-auto">
                    <div className="fit-video">
                      <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                    </div>
                  </div>
                </CustomModal.Wrapper>
                {/* Modal Component End */}
                <m.h4 {...fadeIn} className="font-semibold mb-[45px]" >
                  Beautifully simple handcrafted templates for your website
                </m.h4>
                <m.span {...fadeIn} className="uppercase tracking-[1px]">
                  unlimited power and customization
                </m.span>
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Info Banner Style 02 End */}

      {/* Info Banner Style 03 Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray">
        <Container>
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[6%]">
              <h6 className="font-serif text-darkgray text-center font-medium">Info banners style 03</h6>
            </Col>
          </Row>
          <InfoBannerStyle03
            grid="row-cols-1 row-cols-lg-3 row-cols-sm-2 sm:gap-y-[30px] justify-center"
            className=""
            data={InfoBannerData03}
            animation={fadeIn} />
        </Container>
      </section>
      {/* Info Banner Style 03 End  */}

      {/* Info Banner Style 04 Start */}
      <section className="bg-lightgray">
        <Container fluid>
          <Row>
            <m.div
              className="bg-cover bg-center md:h-[450px] xs:h-[300px] col-xl-6 col-lg-4"
              style={{ backgroundImage: `url("https://via.placeholder.com/1024x903")` }} {...fadeInRight} ></m.div>
            <Col xl={6} lg={8}>
              <Row>
                <m.div
                  className="bg-cover bg-center xs:h-[300px] order-1 col-sm-6 order-sm-1"
                  style={{ backgroundImage: `url("https://via.placeholder.com/700x617")` }} {...{ ...fadeIn, transition: { delay: 0.4 } }}></m.div>
                <m.div className="col-12 bg-[#f9f6f3] bg-no-repeat bg-[right_5px_bottom_-25px] order-2 col-sm-6 order-sm-2"
                  style={{ backgroundImage: `url("https://via.placeholder.com/140x153")` }} {...{ ...fadeIn, transition: { delay: 0.5 } }} >
                  <div className="px-28 py-32 xl:px-12 xl:py-16 md:py-24">
                    <span className="font-serif font-semibold text-darkgray text-lg mb-[20px] block md:text-xmd md:leading-[22px]"> Creativity ideas </span>
                    <p className="mb-[30px]"> Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore. </p>
                    <Buttons to="/shop/left-sidebar" className="btn-fill font-medium font-serif uppercase rounded-none" themeColor="#bf8c4c" color="#fff" size="sm" title="View collection" />
                  </div>
                </m.div>
                <m.div
                  className="col-12 bg-[#f9f6f3] bg-no-repeat bg-[right_25px_bottom_-35px] order-4 col-sm-6 order-sm-3"
                  style={{ backgroundImage: `url("https://via.placeholder.com/168x172")`, }} {...{ ...fadeIn, transition: { delay: 0.8 } }} >
                  <div className="px-28 py-32 xl:px-12 xl:py-16 md:py-24">
                    <span className="font-serif font-semibold text-darkgray text-lg mb-[20px] block md:text-xmd md:leading-[22px]"> Innovation concept </span>
                    <p className="mb-[30px]"> Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore. </p>
                    <Buttons to="/shop/left-sidebar" className="btn-fill font-medium font-serif uppercase rounded-none" themeColor="#bf8c4c" color="#fff" size="sm" title="View collection" />
                  </div>
                </m.div>
                <m.div
                  className="bg-cover bg-center xs:h-[300px] order-3 col-sm-6 order-sm-4"
                  style={{ backgroundImage: `url("https://via.placeholder.com/700x617")` }} {...{ ...fadeIn, transition: { delay: 0.7 } }} ></m.div>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Info Banner Style 04 End */}

      {/* Info Banner Style 05  Start */}
      <section className="py-[130px] overflow-hidden relative lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container className="relative px-[15px]">
          <Row className="justify-center mb-[25px]">
            <Col md={12} className="text-center">
              <h6 className="font-serif text-darkgray text-center font-medium">Info banners style 05</h6>
            </Col>
          </Row>
          <InfoBannerStyle05
            className="swiper-navigation-04 swiper-navigation-light swiper-pagination-medium"
            carouselOption={{
              slidesPerView: 1,
              spaceBetween: 30,
              observer: true,
              observeParents: true,
              keyboard: { enabled: true, onlyInViewport: true },
              loop: true,
              breakpoints: { 1200: { slidesPerView: 4 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } },
              autoplay: { delay: 3000, disableOnInteraction: false }
            }}
            data={InfoBannerData05} />
        </Container>
      </section>
      {/* Info Banner Style 05 End */}

      {/* Info Banner Style 06 Start */}
      <section className="p-[5px] sm:pt-[50px]">
        <Container fluid>
          <Row className="justify-center">
            <Col lg={{ span: 4, order: 0 }} md={{ span: 6, order: 1 }} sm={8} className="p-[5px]">
              <m.div {...fadeIn} className="relative h-full flex items-center bg-cover bg-no-repeat overflow-hidden bg-center text-center" style={{ backgroundImage: 'url(https://via.placeholder.com/700x700)' }}>
                <div className="absolute h-full w-full top-0 left-0 opacity-60 text-darkgray"></div>
                <div className="relative z-[1] w-full py-[10rem] lg:py-[7rem]">
                  <span className="block text-xmd text-white opacity-60 font-serif tracking-[2px] uppercase mb-[25px]">Special food</span>
                  <h2 className="font-serif text-white uppercase w-[75%] lg:w-[85%] mx-auto mb-[35px] font-light">Land of <span className="font-bold">delicious</span></h2>
                  <Buttons href="#" className="btn-fill btn-fancy font-medium rounded-[2px] font-serif uppercase btn-shadow text-[15px] md:mb-[15px]" size="md" themeColor="#fff" color="#000" title="Explore more" />
                </div>
              </m.div>
            </Col>
            <Col lg={{ span: 4, order: 0 }} md={{ span: 6, order: 3 }} sm={8} className="p-[5px] flex">
              <m.div {...{ ...fadeIn, transition: { delay: 0.4 } }} className="w-full flex flex-col items-center bg-cover bg-no-repeat overflow-hidden bg-center text-center py-[10rem] lg:py-[7rem]" style={{ backgroundImage: 'url(https://via.placeholder.com/700x700)' }}>
                <h3 className="font-serif uppercase text-white mb-0 tracking-[-1px]">Food <span className="block">voucher</span></h3>
                <h3 className="font-serif uppercase font-semibold tracking-[-1px] mb-[40px] lg:mb-[25px] text-white">50% off</h3>
                <span className="self-center font-serif font-medium text-xmd uppercase text-white border-[1px] border-dotted border-[#ffffff66] rounded-[4px] px-[25px] py-[10px]">Foodoff</span>
              </m.div>
            </Col>
            <Col lg={{ span: 4, order: 0 }} md={{ span: 6, order: 2 }} sm={8} className="p-[5px]">
              <m.div {...{ ...fadeIn, transition: { delay: 0.6 } }} className="relative h-full flex items-center bg-cover bg-no-repeat overflow-hidden bg-center text-center" style={{ backgroundImage: 'url(https://via.placeholder.com/700x700)' }}>
                <div className="absolute h-full w-full top-0 left-0 opacity-70 text-darkgray"></div>
                <div className="relative z-[1] w-full py-[10rem] lg:py-[7rem]">
                  <span className="block text-xmd text-white opacity-60 font-serif tracking-[2px] uppercase mb-[25px]">Traditional food</span>
                  <h2 className="font-serif text-white uppercase w-[75%] lg:w-[85%] mx-auto mb-[35px] font-light">Tastes of  <span className="font-bold">america</span></h2>
                  <Buttons href="#" className="btn-fill	btn-fancy font-medium rounded-[2px] font-serif uppercase btn-shadow text-[15px] md:mb-[15px]" size="md" themeColor="#fff" color="#000" title="Explore more" />
                </div>
              </m.div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Info Banner Style 06 End */}

      {/* Info Banner Style 07 */}
      <section className="py-[160px] lg:py-[95px] md:py-[75px]  xs:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[7%]">
              <h6 className="font-serif text-darkgray font-medium">Info banners style 07</h6>
            </Col>
          </Row>
          <Row className="gx-0">
            <m.div className="col-12 col-lg-6 bg-cover bg-center md:h-[400px]" style={{ backgroundImage: `url("https://via.placeholder.com/900x900")`, }} {...{ ...fadeIn, transition: { delay: 0.2 } }} ></m.div>
            <m.div className="col-12 p-0 col-lg-6" {...{ ...fadeIn, transition: { delay: 0.36 } }} >
              <m.div className="bg-gradient-to-tr from-[#556fff] via-[#ff77dd] to-[#f767a6] px-24 py-28 lg:py-20 lg:px-16 md:p-20 text-white text-center">
                {/* Modal Component Start */}
                <CustomModal.Wrapper
                  modalBtn={<Buttons
                    type="submit"
                    className="btn-sonar border-0 mx-auto mb-14"
                    themeColor="#fff"
                    size="lg"
                    title={<i className="icon-control-play text-gradient bg-gradient-to-tr from-[#b783ff] to-[#ff9393]" />} />} >
                  <div className="w-[1020px] max-w-full relative rounded mx-auto">
                    <div className="fit-video">
                      <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                    </div>
                  </div>
                </CustomModal.Wrapper>
                {/* Modal Component End */}

                <span className="text-xmd font-serif mb-[20px] block text-white opacity-70">
                  Powerful theme for creatives designer
                </span>
                <h5 className="font-serif text-white font-medium mb-[40px]">
                  We design brand, digital experience that engage the right
                  customers{" "}
                </h5>
                <Buttons
                  className="mx-3 font-medium font-serif hover:text-white uppercase after:h-[2px] btn-link after:bg-white"
                  size="xl"
                  color="#fff"
                  title="Get Started Now"
                />
              </m.div>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Info Banner Style 07 */}

      {/* Info Banner Style 08 Start */}
      <section className="p-0 overflow-hidden">
        <Container fluid className="px-0">
          <Row className="gx-0">
            <Col xl={6} className="p-0">
              <m.div {...fadeIn} className="flex flex-column flex-md-row h-full">
                <Col md={6} className="cover-background sm:h-[700px]" style={{ backgroundImage: `url(https://via.placeholder.com/488x778)` }}></Col>
                <Col md={6} className="bg-[#f8f4f0] flex flex-col justify-center text-start px-12 xl:px-[15px] lg:p-20 md:px-[2.5rem]">
                  <img width="" height="" src="/assets/img/webp/home-restaurant-img-transparent-05.webp" className="self-start mb-[20px]" alt="" />
                  <h4 className="font-serif font-light text-darkgray -tracking-[1px] w-[85%] mb-12 xs:w-full xs:mb-[15px]">Masterchef <span className="font-semibold">message</span></h4>
                  <span className="text-[18px] text-darkgray leading-[30px] block w-[75%] mb-[20px] xs:mb-[30px] xl:w-[80%] xs:w-full">Unique and delicious dishes from the worlds best masterchefs.</span>
                  <p className="w-[75%] xs:w-full">Lorem ipsum dolor sit amet consectetur adipiscing elit eiusmod tempor incididunt labore et dolore magna minim veniam nostrud exercitation ullamco.</p>
                  <img width="" height="" src="/assets/img/webp/home-restaurant-img-transparent-06.webp" className="self-start mt-[25px] pt-[25px] xs:mt-[10px]" alt="" />
                </Col>
              </m.div>
            </Col>
            <Col xl={6} className="p-0">
              <Row className="g-0">
                <Col xs={{ order: 1 }} sm={{ span: 6, order: 1 }} className="p-0">
                  <m.div {...fadeIn} className="text-center px-24 py-32 xl:py-24 xl:px-16 lg:px-28 sm:px-24 bg-darkgray">
                    <span className="font-serif font-medium text-[#ca943d] tracking-[1px] text-md block uppercase mb-[20px]">Best of recipes</span>
                    <h4 className="font-serif text-white mb-0"><span className="font-semibold md:block">Delicious</span> breakfast recipes</h4>
                  </m.div>
                </Col>
                <m.div {...{ ...fadeIn, transition: { delay: 0.2 } }} className="col-12 col-sm-6 order-2 cover-background xs:h-[300px]" style={{ backgroundImage: `url(https://via.placeholder.com/960x777)` }}></m.div>
                <m.div {...{ ...fadeIn, transition: { delay: 0.4 } }} className="col-12 col-sm-6 order-4 order-sm-3 px-0 cover-background xs:h-[300px]" style={{ backgroundImage: `url(https://via.placeholder.com/960x777)` }}></m.div>
                <Col xs={{ order: 2 }} sm={{ span: 6, order: 4 }}>
                  <m.div {...{ ...fadeIn, transition: { delay: 0.6 } }} className="text-center px-24 py-32 xl:py-24 xl:px-16 lg:px-28 sm:px-24">
                    <span className="font-serif font-medium text-[#ca943d] tracking-[1px] text-md block uppercase mb-[20px]">Best of foods</span>
                    <h4 className="font-serif text-darkgray mb-0"><span className="font-semibold md:block">Healthy</span> energetic burger</h4>
                  </m.div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Info Banner Style 08 End */}

      {/* Info Banner Style 09  */}
      <section className="pb-0 py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container fluid>
          <Row clasName="justify-center">
            <Col md={12} className="text-center mb-[5%]">
              <h6 className="font-serif text-darkgray font-medium">Info banners style 09</h6>
            </Col>
          </Row>
          <Row xl={4} sm={2} xs={1}>
            <m.div {...fadeInUp} className="col cover-background h-[650px] px-0 lg:m-0 md:h-[500px] xs:h-[450px]" style={{ backgroundImage: `url(https://via.placeholder.com/800x1081)` }}>
              <div className="absolute top-0 left-0 w-full h-full opacity-70 bg-darkgray"></div>
              <div className="flex flex-col h-full p-20 text-center relative z-[1] xl:px-12 lg:px-16">
                <span className="font-serif font-medium uppercase text-[#ca943d]">Loaded cheese</span>
                <h4 className="font-serif font-semibold text-white uppercase mb-0 mt-auto -tracking-[.5px]">Delicious burger</h4>
                <div className="mt-auto">
                  <Buttons ariaLabel="Book seat link" href="#" className="btn-fill btn-fancy mt-auto inline-block font-medium font-serif rounded uppercase md:mb-[15px]" themeColor="#ca943d" color="#fff" size="sm" title="Book seat now" />
                </div>
              </div>
            </m.div>
            <m.div {...fadeInUp} className="cover-background h-[650px] px-0 md:h-[500px] xs:h-[450px]" style={{ backgroundImage: `url(https://via.placeholder.com/800x1081)` }}>
              <div className="flex flex-col h-full justify-start p-24 text-center relative z-index-1 xl:px-10 lg:px-32 md:px-20">
                <h4 className="font-serif font-semibold text-darkgray uppercase mb-[15px] -tracking-[.5px]">Upcoming food events</h4>
                <p className="mb-[25px]">Lorem ipsum dolor amet consectetur do tempor incididunt labore et dolore</p>
                <div>
                  <Buttons ariaLabel="all events link" href="#" className="btn-fill btn-fancy mt-[10px] font-medium font-serif rounded uppercase md:mb-[15px]" themeColor="#ca943d" color="#fff" size="sm" title="Explore all events" />
                </div>
              </div>
            </m.div>
            <m.div {...fadeInUp} className="cover-background h-[650px] px-0 lg:m-0 md:h-[500px] xs:h-[450px]" style={{ backgroundImage: `url(https://via.placeholder.com/800x1081)` }}>
              <div className="absolute top-0 left-0 w-full h-full opacity-70 bg-darkgray"></div>
              <div className="flex flex-col h-full p-20 text-center relative z-[1] xl:px-12 lg:px-32">
                <span className="font-serif font-medium uppercase text-[#ca943d]">Barbeque lover</span>
                <h4 className="font-serif font-semibold text-white uppercase mb-0 mt-auto -tracking-[.5px]">Barbecue festival</h4>
                <Link aria-label="link Barbecue festival" to="#" className="w-[40px] h-[40px] leading-[40px] bg-[#ca943d] rounded-full self-center mt-auto">
                  <i className="fas fa-arrow-right text-sm text-white"></i>
                </Link>
              </div>
            </m.div>
            <m.div {...fadeInUp} className="cover-background h-[650px] px-0 md:h-[500px] xs:h-[450px]" style={{ backgroundImage: `url(https://via.placeholder.com/800x1081)` }}>
              <div className="flex flex-col h-full justify-start py-20 px-24 text-center relative z-[1] xl:px-12 lg:px-32">
                <span className="font-serif font-medium uppercase text-darkgray block mb-[15px]">Every saturday</span>
                <h4 className="font-serif font-semibold text-white uppercase -tracking-[.5px]">Healthy cooking night</h4>
                <Link aria-label="Healthy cooking night" to="#" className="w-[40px] h-[40px] leading-[40px] bg-white rounded-full self-center">
                  <i className="fas fa-arrow-right text-sm text-black"></i>
                </Link>
              </div>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Info Banner Style 09  End */}
    </>
  );
};

export default InfoBannerPage;
