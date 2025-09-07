import React, { useRef } from "react";

// Libraries
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Data
import {
  TextSliderData01,
  TextSliderData02,
  TextSliderData03,
} from "../../Components/TextSlider/TextSliderData";

// Components
import TextSlider01 from "../../Components/TextSlider/TextSlider01";
import TextSlider02 from "../../Components/TextSlider/TextSlider02";
import TextSlider03 from "../../Components/TextSlider/TextSlider03";

// Function
import { fadeIn } from "../../Functions/GlobalAnimations";
import Buttons from "../../Components/Button/Buttons";

const TextSliderPage = () => {
  const swiperReff = useRef(null);
  const swiperRef1Fivereasons = useRef(null);
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">
                Text slider
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
                <li>Text slider</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section
        className=" py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]"
        {...fadeIn}
      >
        <Container fluid className="px-0">
          <Row className="mb-[5%] mx-0">
            <Col>
              <h6 className="font-serif text-darkgray text-center font-medium">
                Text slider style 01
              </h6>
            </Col>
          </Row>
          <TextSlider01
            data={TextSliderData01}
            carousalOption={{
              slidesPerView: 1,
              loop: true,
              centeredSlides: true,
              navigation: false,
              spaceBetween: 60,
              autoplay: { delay: 4500, disableOnInteraction: false },
              breakpoints: {
                991: { slidesPerView: 2 },
                767: { slidesPerView: 1 },
              },
            }}
            animation={fadeIn}
          />
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section
        className="py-[160px] border-t overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]"
        {...fadeIn}
      >
        <Container fluid className="px-0">
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[5%]">
              <h6 className="font-serif text-darkgray font-medium">
                Text slider style 02
              </h6>
            </Col>
          </Row>
          <TextSlider02
            data={TextSliderData02}
            carousalOption={{
              slidesPerView: 1,
              spaceBetween: 60,
              loop: true,
              centeredSlides: true,
              autoplay: { delay: 4500, disableOnInteraction: false },
              breakpoints: {
                991: { slidesPerView: 2 },
                767: { slidesPerView: 1 },
              },
            }}
            animation={fadeIn}
          />
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section
        className="py-[120px] lg:py-[95px] md:py-[80px] sm:py-[50px] bg-lightgray"
        {...fadeIn}
      >
        <Container fluid className="px-0">
          <h6 className="font-serif text-gray-900 text-center font-medium mb-24">
            Text Slider style 03
          </h6>
          <TextSlider03
            data={TextSliderData03}
            carousalOption={{
              spaceBetween: 30,
              slidesPerView: 1,
              autoplay: { delay: 4500, disableOnInteraction: false },
              breakpoints: { 1199: { slidesPerView: 2 } },
            }}
            animation={fadeIn}
          />
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="overflow-hidden py-[130px] lg:py-[90px] md:py-[75px] xs:py-[50px]">
        <Row className="justify-center">
          <Col md={12} className="text-center mb-[5%]">
            <h6 className="font-serif text-darkgray font-medium">
              Text slider style 04
            </h6>
          </Col>
        </Row>
        <Row className="g-0">
          <div
            className="col-xl-6 bg-cover lg:h-[600px] md:h-[500px] sm:h-[350px] relative"
            style={{
              backgroundImage: "url(https://via.placeholder.com/950x668)",
            }}
          ></div>
          <Col xl={6} className="relative p-0">
            <div className="flex absolute bottom-0 right-full z-10 lg:right-0">
              <div
                onClick={() => swiperReff.current.swiper.slidePrev()}
                className="btn-slider-next bg-[#00000080] hover:bg-[#fff]  text-[#fff] hover:text-darkgray h-[62px] transition-default w-[62px] leading-[62px] text-[18px] absolute right-0 left-auto  z-10 bottom-[63px] flex items-center justify-center cursor-pointer md:w-[70px]"
              >
                <button aria-label="swiper next link" className="text-xmd">
                  <i className="feather-arrow-left"></i>
                </button>
              </div>
              <div
                onClick={() => swiperReff.current.swiper.slideNext()}
                className="btn-slider-prev bg-[#00000080] hover:bg-[#fff]  text-[#fff] hover:text-darkgray h-[62px] transition-default w-[62px] leading-[62px] text-[18px] absolute right-0 left-auto bottom-0 z-10 flex items-center justify-center cursor-pointer md:w-[70px]"
              >
                <button aria-label="swiper prev link" className="text-xmd">
                  <i className="feather-arrow-right"></i>
                </button>
              </div>
            </div>
            <Swiper
              ref={swiperReff}
              loop={true}
              modules={[Autoplay]}
              autoHeight={false}
              className="black-move"
            >
              <SwiperSlide
                className="cover-background h-full"
                style={{
                  backgroundImage: "url(https://via.placeholder.com/950x668)",
                }}
              >
                <div className="text-center h-full">
                  <div className="flex flex-col justify-center bg-[#f7edee] py-28 px-[9.5rem] h-full w-[70%] xl:px-20 lg:w-[55%] md:p-16 xs:px-8 md:w-[65%] sm:w-[70%] xs:w-full">
                    <div>
                      <img
                        className="rounded-full mx-auto shadow-[0_0_15px_rgba(0,0,0,0.1)] w-[150px] h-[150px] border-[8px] border-white mb-[40px] xs:mb-[30px] xs:mx-auto"
                        src="https://via.placeholder.com/250x250"
                        alt=""
                        data-no-retina=""
                      />
                      <div className="font-serif text-[36px] leading-[42px] font-semibold text-darkgray mb-[30px] tracking-[-1px] xs:mb-[20px]">
                        Spa salon refresh hot round stone massage
                      </div>
                      <p className="mb-[25px]">
                        Lorem ipsum dolor amet consectetur adipiscing elit sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua enim quis nostrud exercitation ullamco.
                      </p>
                      <Buttons
                        ariaLabel="Explore more"
                        href="#"
                        className="mx-3 font-medium after:bg-black hover:text-black font-serif uppercase btn-link after:h-[1px] md:text-md"
                        color="#000"
                        title="Explore more"
                        size="xl"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="cover-background h-full"
                style={{
                  backgroundImage: "url(https://via.placeholder.com/950x668)",
                }}
              >
                <div className="text-center h-full">
                  <div className="flex flex-col justify-center bg-[#f7edee] py-28 px-[9.5rem] h-full w-[70%] xl:px-20 lg:w-[55%] md:p-16 md:w-[65%] sm:w-[70%] xs:w-full">
                    <div>
                      <img
                        className="rounded-full mx-auto shadow-[0_0_15px_rgba(0,0,0,0.1)] w-[150px] h-[150px] border-[8px] border-white mb-[40px] xs:mb-[30px] xs:mx-auto"
                        src="/assets/img/webp/spa-image-05.webp"
                        alt=""
                        data-no-retina=""
                      />
                      <div className="font-serif text-[36px] leading-[42px] font-semibold text-darkgray mb-[30px] tracking-[-1px] xs:mb-[20px]">
                        A good weekend starts with a positive attitude
                      </div>
                      <p className="mb-[25px]">
                        Lorem ipsum dolor amet consectetur adipiscing elit sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua enim quis nostrud exercitation ullamco.
                      </p>
                      <Buttons
                        href="#"
                        className="mx-3 font-medium after:bg-black hover:text-black font-serif uppercase btn-link after:h-[1px] md:text-md"
                        color="#000"
                        title="Explore more"
                        size="xl"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="cover-background h-full"
                style={{
                  backgroundImage: "url(https://via.placeholder.com/950x668)",
                }}
              >
                <div className="text-center h-full">
                  <div className="flex flex-col justify-center bg-[#f7edee] py-28 px-[9.5rem] h-full w-[70%] xl:px-20 lg:w-[55%] md:p-16 md:w-[65%] sm:w-[70%] xs:w-full">
                    <div>
                      <img
                        className="rounded-full mx-auto shadow-[0_0_15px_rgba(0,0,0,0.1)] w-[150px] h-[150px] border-[8px] border-white mb-[40px] xs:mb-[30px] xs:mx-auto"
                        src="https://via.placeholder.com/250x250"
                        alt=""
                        data-no-retina=""
                      />
                      <div className="font-serif text-[36px] leading-[42px] font-semibold text-darkgray mb-[30px] tracking-[-1px] xs:mb-[20px]">
                        Spa days are a necessity not a luxury
                      </div>
                      <p className="mb-[25px]">
                        Lorem ipsum dolor amet consectetur adipiscing elit sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua enim quis nostrud exercitation ullamco.
                      </p>
                      <Buttons
                        href="#"
                        className="mx-3 font-medium after:bg-black hover:text-black font-serif uppercase btn-link after:h-[1px] md:text-md"
                        color="#000"
                        title="Explore more"
                        size="xl"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </Col>
        </Row>
      </section>
      {/* Section End */}

      {/* Service Section Start */}
      <section className="pb-0 bg-lightgray overflow-hidden py-[130px] lg:py-[90px] md:py-[75px] xs:py-[50px]">
        <Container fluid>
          <Row className="justify-center">
            <Col md={12} className="text-center mb-[5%]">
              <h6 className="font-serif text-darkgray font-medium">
                Text slider style 05
              </h6>
            </Col>
          </Row>
          <Row>
            <m.div
              className="col-xs-12 col-xl-6 col-lg-5 cover-background pl-40 h-[650px] flex flex-col justify-center xl:pl-[15px] lg:h-[550px] md:h-[350px] xs:h-[300px]"
              style={{
                backgroundImage: `url(https://via.placeholder.com/1100x745)`,
              }}
              {...fadeIn}
            >
              <Row className="justify-center">
                <Col xl={5} sm={9} className="xs:text-center">
                  <i className="line-icon-Slippers text-[50px] mb-[35px] inline-block xs:mb-[25px]"></i>
                  <span className="font-serif font-semibold text-md text-[#c89965] block uppercase mb-[25px] tracking-[1px] xs:mb-[15px]">
                    Why choose resort
                  </span>
                  <h4 className="font-serif font-medium text-white mb-0 xs:w-[70%] mx-auto">
                    Five reasons to stay with us
                  </h4>
                </Col>
              </Row>
            </m.div>

            <m.div
              className="col-xl-6 col-lg-7 px-0 relative"
              {...{ ...fadeIn, transition: { delay: 0.6 } }}
            >
              <Swiper
                className="swiper-pagination-light h-[650px] relative heroslider lg:h-[550px] sm:h-[450px]"
                slidesPerView={1}
                loop={true}
                ref={swiperRef1Fivereasons}
                modules={[Autoplay, Keyboard]}
                keyboard={{ enabled: true, onlyInViewport: true }}
              >
                <SwiperSlide
                  className="overflow-hidden cover-background relative"
                  style={{
                    backgroundImage: `url(https://via.placeholder.com/1100x745)`,
                  }}
                >
                  <div className="flex flex-col justify-end h-full">
                    <div className="bg-white pl-24 pr-20 py-[4.5rem] w-[55%] lg:w-[75%] lg:py-[3.5rem] lg:px-16 md:w-[60%] sm:w-[75%] xs:w-[80%]">
                      <h6 className="font-serif font-medium text-[#333045] mb-[15px]">
                        Exclusive restaurants
                      </h6>
                      <p className="w-[90%] sm:w-full">
                        Lorem ipsum dolor amet consectetur adipiscing do eiusmod
                        tempor incididunt ut labore magna Ut enim minim nostrud
                        exercitation ullamco laboris nisiex ea commodo
                        consequat.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  className="overflow-hidden cover-background relative"
                  style={{
                    backgroundImage: `url(https://via.placeholder.com/1100x745)`,
                  }}
                >
                  <div className="flex flex-col justify-end h-full">
                    <div className="bg-white px-24 py-[4.5rem] w-[55%] lg:w-[75%] lg:py-[3.5rem] lg:px-16 md:w-[60%] sm:w-[75%] xs:w-[80%]">
                      <h6 className="font-serif font-medium text-[#333045] mb-[15px]">
                        Large swimming pool
                      </h6>
                      <p className="w-[90%] sm:w-full">
                        Lorem ipsum dolor amet consectetur adipiscing do eiusmod
                        tempor incididunt ut labore magna Ut enim minim nostrud
                        exercitation ullamco laboris nisiex ea commodo
                        consequat.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  className="overflow-hidden cover-background relative"
                  style={{
                    backgroundImage: `url(https://via.placeholder.com/1100x745)`,
                  }}
                >
                  <div className="flex flex-col justify-end h-full">
                    <div className="bg-white px-24 py-[4.5rem] w-[55%] lg:w-[75%] lg:py-[3.5rem] lg:px-16 md:w-[60%] sm:w-[75%] xs:w-[80%]">
                      <h6 className="font-serif font-medium text-[#333045] mb-[15px]">
                        Luxury spa massage
                      </h6>
                      <p className="w-[90%] sm:w-full">
                        Lorem ipsum dolor amet consectetur adipiscing do eiusmod
                        tempor incididunt ut labore magna Ut enim minim nostrud
                        exercitation ullamco laboris nisiex ea commodo
                        consequat.
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className="absolute bottom-0 right-full z-[1] md:right-0">
                <div
                  onClick={() =>
                    swiperRef1Fivereasons.current.swiper.slidePrev()
                  }
                  className="h-[62px] w-[62px] leading-[62px] text-lg bg-[#00000080] left-0 text-[#ffffff] transition-default flex justify-center items-center hover:bg-[#ffffff] hover:text-darkgray"
                >
                  <i className="feather-arrow-left"></i>
                </div>
                <div
                  onClick={() =>
                    swiperRef1Fivereasons.current.swiper.slideNext()
                  }
                  className="mt-[1px] h-[62px] w-[62px] leading-[62px] text-lg left-0 bg-[#00000080] text-[#ffffff] transition-default flex justify-center items-center hover:bg-[#ffffff] hover:text-darkgray"
                >
                  <i className="feather-arrow-right"></i>
                </div>
              </div>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Service Section End */}
    </>
  );
};

export default TextSliderPage;
