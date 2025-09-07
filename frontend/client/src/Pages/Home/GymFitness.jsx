import React, { useEffect, useRef, useState } from "react";

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimatePresence, m } from 'framer-motion';
import { fadeIn, fadeInLeft, zoomIn } from "../../Functions/GlobalAnimations";
import { Formik, Form } from "formik";
import { Parallax } from "react-scroll-parallax";
import { Link as ScrollTo } from "react-scroll"

// Components
import { Header, HeaderNav, Menu } from "../../Components/Header/Header";
import Buttons from '../../Components/Button/Buttons'
import CustomModal from '../../Components/CustomModal'
import Counter from '../../Components/Counters/Counter'
import Overlap from "../../Components/Overlap/Overlap";
import { ContactFormStyle02Schema } from "../../Components/Form/FormSchema";
import { Input } from '../../Components/Form/Form'
import Tab05 from "../../Components/Tab/Tab05";
import MessageBox from "../../Components/MessageBox/MessageBox";
import PricingTable03 from '../../Components/PricingTable/PricingTable03'
import FooterStyle03 from "../../Components/Footers/FooterStyle03";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import InteractiveBanners10 from "../../Components/InteractiveBanners/InteractiveBanners10";
import Team from "../../Components/Team/Team";
import { Autoplay } from "swiper/modules";
import { resetForm, sendEmail } from "../../Functions/Utilities";
import SideButtons from "../../Components/SideButtons";

// Data
import { TeamData05 } from "../../Components/Team/TeamData";
import { TabData05 } from "../../Components/Tab/TabData";

const pricingTableData = [
  {
    title: "MONTHLY PLAN",
    subtitle: "Basic features",
    price: "$29",
    term: "monthly",
    plans: [
      `No swimming pool`,
      `Canteen optional`,
      `Towels not included`,
      `No personal trainer`
    ],
    buttonTitle: "Choose plan",
    buttonLink: "/page/pricing-packages",

  },
  {
    title: "YEARLY PLAN",
    subtitle: "MOST POPULAR",
    price: "$89",
    term: "monthly",
    plans: [
      `Swimming pool`,
      `Canteen optional`,
      `Towels included`,
      `Personal trainer`
    ],
    buttonTitle: "Choose plan",
    buttonLink: "/page/pricing-packages",
    popular: {
      isPopular: true
    }
  }
]

const SocialIconsData = [
  {
    color: "#828282",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "#828282",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram"
  },
  {
    color: "#828282",
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  },
];

const CounterData = [
  {
    number: {
      text: "2530",
    },
    content: "HOURS EXERCISE",
  },
  {
    number: {
      text: "3220",
    },
    content: "PHOTO CAPTURE",
  },
  {
    number: {
      text: "2800",
    },
    content: "TELEPHONIC TALK",
  },
  {
    number: {
      text: "3420",
    },
    content: "TRAINING PEOPLE",
  },
]

const GymFitnessPage = (props) => {
  const swiperRef = React.useRef(null);
  const videoRef = useRef();
  const [isVideoplay, setIsVideoPlay] = useState(false);

  useEffect(() => {
    if (isVideoplay === true) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoplay])

  const handleVideoPlay = () => {
    setIsVideoPlay(!isVideoplay)
  }

  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav theme="dark" expand="lg" className="py-[0px] px-[35px] md:px-0 md:py-[20px]" fluid="fluid" containerClass="sm:p-0">
          <Col className="col-5 col-lg-2 ps-lg-0 me-auto me-lg-0">
            <Link aria-label="header home link" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-neon-orange.webp' data-rjs='/assets/img/webp/logo-neon-orange@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-neon-orange-gray.webp' data-rjs='/assets/img/webp/logo-neon-orange-gray@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Navbar.Toggle className="md:mr-[15px]" >
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="col-auto col-lg-8 justify-center gymfitness-header-menu">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto col-lg-2 text-end hidden-xs px-lg-0 sm:pr-[15px] xs:!text-center">
            <SocialIcons theme="social-icon-style-01" size="xs" iconColor="light" className="justify-end" data={SocialIconsData} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}

      {/* Section Start */}
      <section className="cover-background overflow-hidden">
        <div className="absolute h-full w-full top-0 left-0 opacity-60 bg-[#262b35]"></div>
        <video ref={videoRef} className="w-auto h-auto min-h-full min-w-full absolute top-0 z-[-3] bg-cover object-cover" poster="https://via.placeholder.com/1920x1080" muted="">
          <source src="/assets/video/video2.mp4" type="video/mp4" />
          <source src="/assets/video/video2.webm" type="video/webm" />
        </video>
        <Container className="full-screen text-center justify-center px-0 landscape:md:h-[600px]">
          <Row className="h-full my-0 mx-auto justify-center">
            <Col lg={6} md={8} sm={8} xs={8} className="col-11 h-full justify-center text-center flex-col relative flex" >
              <Buttons
                ariaLabel="link for video"
                onClick={handleVideoPlay}
                className="btn-sonar border-0 mb-14 mx-auto"
                themeColor="#262b35"
                color="#ff6437"
                size="lg"
                title={
                  <div className="video-icon-wrapper">
                    <m.div initial={{ y: 0 }} animate={isVideoplay ? { y: -30 } : { y: 0 }} className="flex flex-col relative z-10">
                      <m.i initial={{ opacity: 1 }} animate={isVideoplay ? { opacity: 0 } : { opacity: 1 }} className="icon-control-play ms-1" />
                      <m.i initial={{ opacity: 1 }} animate={isVideoplay ? { opacity: 1 } : { opacity: 0 }} className="icon-control-pause ms-0" />
                    </m.div>
                  </div>
                }
              />
              <h1 className="font-serif font-bold text-[100px] leading-[95px] text-white text-shadow-extra-large uppercase tracking-[-3px] mb-[55px] lg:text-[90px] lg:leading-[90px] md:text-[70px] md:leading-[65px] md:tracking-[-2px] sm:text-[45px] sm:leading-[43px] sm:tracking-[-1px] xs:mb-[30px] xs:w-[90%] xs:mx-auto">
                Crossfit exercises
              </h1>
              <ScrollTo href="#" to="start" offset={0} delay={0} spy={true} smooth={true} duration={800}>
                <Buttons type="submit" ariaLabel="link for start" className="btn-fancy btn-fill font-medium font-serif rounded-[4px] tracking-[1px] uppercase" themeColor="#ff7a56" color="#fff" size="lg" title="Get started now" />
              </ScrollTo>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Parallax Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden">
        <Container>
          <Row className="items-center">
            <Col xl={7} lg={6} className="relative">
              <m.div className="relative" {...fadeIn}>
                <Parallax className="lg-no-parallax w-[70%] mb-16" speed={0}> <img alt="" src="https://via.placeholder.com/800x1020" className="w-full" width="385.34" height="565.34" /></Parallax>
                <Parallax className="lg-no-parallax flex justify-center items-center w-[55%] bg-no-repeat absolute bottom-0 right-[15px] lg:ml-auto lg:!top-[130px]" speed={20}>
                  <img className="w-full" alt="" src="https://via.placeholder.com/800x820" width="317" height="477" />
                </Parallax>
              </m.div>
            </Col>
            <m.div className="md:mt-[5%] col-xl-4 col-lg-5 offset-xl-1 offset-lg-1" {...fadeInLeft}>
              <span className="font-serif block mb-[30px] font-semibold tracking-[2px] uppercase text-basecolor xs:mb-[20px]"> 20 years experience </span>
              <h2 className="heading-4 font-serif uppercase mb-10 font-bold tracking-[-1px] text-[#262b35] md:mb-[35px]"> We have center of fitness more than 20 years </h2>
              <p className="mb-[25px] md:mb-[20px] sm:w-[90%] sm:mb-[15px] xs:w-full"> Lorem ipsum dolor amet consectetur adipiscing do eiusmod tempor incididunt abore dolore magna ut enim ad minim veniam utexercitation ullamco commodo consequat incididunt. </p>
              <Buttons ariaLabel="discover litho" className="btn-fill rounded-none font-medium font-serif uppercase hover:text-black mt-[20px]" themeColor="#262b35" size="lg" color="#fff" icon="feather-arrow-right" iconPosition="after" title="discover litho" />
            </m.div>
          </Row>
          <Row lg={4} sm={2} className="row-cols-1 md:gap-y-10 items-center mt-40 md:mt-28">
            <Col>
              <m.div className="flex items-center" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
                <h3 className="heading-6 mr-[25px] font-serif text-basecolor mb-0">01</h3>
                <div className="flex-1 font-serif font-semibold text-md text-[#262b35] uppercase inline-block">
                  <span className="w-[90%] block xs:w-[70%]">
                    Largest network of gyms and fitness
                  </span>
                </div>
              </m.div>
            </Col>
            <Col>
              <m.div className="flex items-center" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
                <h3 className="heading-6 mr-[25px] font-serif text-basecolor mb-0">02</h3>
                <div className="flex-1 font-serif font-semibold text-md text-[#262b35] uppercase inline-block">
                  <span className="w-[90%] block xs:w-[70%]">
                    FRIENDLY EXPERT HIGH LEVEL PERSONAL TRAINERS
                  </span>
                </div>
              </m.div>
            </Col>
            <Col>
              <m.div className="flex items-center" {...{ ...fadeIn, transition: { delay: 0.6 } }}>
                <h3 className="heading-6 mr-[25px] font-serif text-basecolor mb-0">03</h3>
                <div className="flex-1 font-serif font-semibold text-md text-[#262b35] uppercase inline-block">
                  <span className="w-[90%] block xs:w-[70%]">
                    2020 GYM OF THE YEAR AWARD WINNING GYM
                  </span>
                </div>
              </m.div>
            </Col>
            <Col>
              <m.div className="flex items-center" {...{ ...fadeIn, transition: { delay: 0.8 } }}>
                <h3 className="heading-6 mr-[25px] font-serif text-basecolor mb-0">04</h3>
                <div className="flex-1 font-serif font-semibold text-md text-[#262b35] uppercase inline-block">
                  <span className="w-[90%] block xs:w-[70%]">
                    FLEXIBILITY TO GYM ACCESS PRIME CONTROL
                  </span>
                </div>
              </m.div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Parallax End */}

      {/* Section Start */}
      <m.section className="bg-lightgray overflow-hidden py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center text-center">
            <Col md={6} className="col-12 text-center mb-20 md:mb-16">
              <span className="font-serif font-semibold text-basecolor uppercase tracking-[1px] block mb-[5px]"> The fitness classes </span>
              <h2 className="heading-5 font-serif font-bold text-[#262b35] tracking-[-1px] uppercase"> Personal workout </h2>
            </Col>
          </Row>
        </Container>
        <Container fluid className="px-[5%] xl:px-[2%] lg:px-[4%]">
          <InteractiveBanners10 grid="row-cols-1 row-cols-xl-4 row-cols-sm-2 lg:gap-y-10" animation={fadeIn} />
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="items-center justify-center">
            <Col lg={5} sm={9} className="col-12 text-left md:mb-[40px] md:text-center">
              <m.h2 className="heading-4 font-serif font-bold text-[#262b35] uppercase tracking-[-1px]" {...{ ...fadeIn, transition: { delay: 0.4 } }}> We believe that fitness is not simply a daily activity </m.h2>
            </Col>
            <Col lg={3} md={5} className="col-10 sm:mb-[30px] text-center md:text-start" >
              <m.img width={250} height={238} src="https://via.placeholder.com/270x257" className="w-[95%]" alt="Healthy diet" data-no-retina="" {...{ ...zoomIn, transition: { delay: 0.6, duration: 0.6 } }} />
            </Col>
            <m.div className="col-10 col-lg-4 col-md-7 col-sm-8 text-left sm:text-center" {...{ ...fadeIn, transition: { delay: 1 } }}>
              <span className="font-serif font-semibold text-lg text-[#262b35] uppercase block mb-[15px]"> Healthy diet planning </span>
              <p className="w-[85%] mb-[22px] sm:w-full"> Lorem ipsum dolor amet consectetur adipiscing do eiusmod tempor incididunt abore dolore magna ut enim. </p>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section Start */}

      {/* Section Start */}
      <section className=" bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center text-center">
            <Col md={6} className="col-12 text-center mb-20 md:mb-16">
              <span className="font-serif font-semibold text-basecolor uppercase tracking-[1px] block mb-[5px]"> THE FITNESS CLASSES </span>
              <h2 className="heading-5 font-serif font-bold text-[#262b35] tracking-[-1px] uppercase"> FITNESS CLASSES </h2>
            </Col>
          </Row>
          <m.div className="row justify-center" {...fadeIn}>
            <Col md={9} lg={12} className="col-12 relative mb-36 md:mb-24 xs:px-[15px]" >
              <div onClick={() => swiperRef.current.swiper.slidePrev()} className="btn-slider-next absolute top-1/2 left-[-70px] -translate-y-1/2  rounded-full flex justify-center items-center text-darkgray shadow-[0_0_15px_rgba(0,0,0,0.1)] bg-[#fff] right-inherit h-[40px] w-[40px] hover:bg-darkgray hover:text-[#fff] transition-default cursor-pointer xl:left-[-11px] xl:z-[2] xs:left-0" >
                <i className="feather-arrow-left text-xmd"></i>
              </div>
              <Swiper
                className="black-move swiper-pagination-medium h-full"
                ref={swiperRef}
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                observer={true}
                observeParents={true}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                keyboard={{ enabled: true, onlyInViewport: true }}
                breakpoints={{ 992: { slidesPerView: 2 } }}
              >
                <>
                  <SwiperSlide>
                    <Row className="m-0 h-full">
                      <Col sm={6} className="col-12 bg-cover xs:h-[200px] bg-no-repeat overflow-hidden relative bg-center " style={{ backgroundImage: "url(https://via.placeholder.com/600x625)", }} ></Col>
                      <Col sm={6} className="col-12 flex p-[3.9rem] bg-white lg:p-10 xs:p-16" >
                        <div className="self-center">
                          <span className="font-serif font-medium uppercase text-[#262b35] mb-[10px] block"> Cardio </span>
                          <p className="mb-[25px]"> Lorem ipsum dolor amet consectetur adipiscing eiusmod tempor. </p>
                          <Buttons ariaLabel="Join classes" to="#" className="btn-fill btn-fancy font-medium font-serif rounded-none uppercase" themeColor="#262b35" color="#fff" size="xs" title="Join classes" />
                        </div>
                      </Col>
                    </Row>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Row className="m-0 h-full">
                      <Col sm={6} className="col-12 bg-cover xs:h-[200px] bg-no-repeat overflow-hidden relative bg-center " style={{ backgroundImage: "url(https://via.placeholder.com/600x625)", }} ></Col>
                      <Col sm={6} className="col-12 flex p-[3.9rem] bg-white lg:p-10 xs:p-16" >
                        <div className="self-center">
                          <span className="font-serif font-medium uppercase text-[#262b35] mb-[10px] block"> Crossfit </span>
                          <p className="mb-[25px]"> Lorem ipsum dolor amet consectetur adipiscing eiusmod tempor. </p>
                          <Buttons ariaLabel="link for Join classes" to="#" className="btn-fancy btn-fill font-medium font-serif rounded-none uppercase" themeColor="#262b35" color="#fff" size="xs" title="Join classes" />
                        </div>
                      </Col>
                    </Row>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Row className="m-0 h-full">
                      <Col sm={6} className="col-12 bg-cover xs:h-[200px] bg-no-repeat overflow-hidden relative bg-center " style={{ backgroundImage: "url(https://via.placeholder.com/600x625)", }} ></Col>
                      <Col sm={6} className="col-12 flex p-[3.9rem] bg-white lg:p-10 xs:p-16" >
                        <div className="self-center">
                          <span className="font-serif font-medium uppercase text-[#262b35] mb-[10px] block"> Sculpturing </span>
                          <p className="mb-[25px]"> Lorem ipsum dolor amet consectetur adipiscing eiusmod tempor. </p>
                          <Buttons ariaLabel="Join classes" to="#" className="btn-fill btn-fancy font-medium font-serif rounded-none uppercase" themeColor="#262b35" color="#fff" size="xs" title="Join classes" />
                        </div>
                      </Col>
                    </Row>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Row className="m-0 h-full">
                      <Col sm={6} className="col-12 bg-cover xs:h-[200px] bg-no-repeat overflow-hidden relative bg-center " style={{ backgroundImage: "url(https://via.placeholder.com/600x625)", }} ></Col>
                      <Col sm={6} className="col-12 flex p-[3.9rem] bg-white lg:p-10 xs:p-16" >
                        <div className="self-center">
                          <span className="font-serif font-medium uppercase text-[#262b35] mb-[10px] block"> Cycling </span>
                          <p className="mb-[25px]"> Lorem ipsum dolor amet consectetur adipiscing eiusmod tempor. </p>
                          <Buttons ariaLabel="Join classes" to="#" className="btn-fill btn-fancy font-medium font-serif rounded-none uppercase" themeColor="#000" color="#fff" size="xs" title="Join classes" />
                        </div>
                      </Col>
                    </Row>
                  </SwiperSlide>
                </>
              </Swiper>
              <div onClick={() => swiperRef.current.swiper.slideNext()} className="btn-slider-prev absolute top-1/2 right-[-70px] -translate-y-1/2 bg-[#fff] rounded-full flex justify-center items-center text-darkgray right-inherit h-[40px] w-[40px] hover:bg-darkgray hover:text-[#fff] transition-default shadow-[0_0_15px_rgba(0,0,0,0.1)] ml-[10px] cursor-pointer xl:right-[-11px] xl:z-[2] xs:right-0" >
                <i className="feather-arrow-right text-xmd"></i> </div>
            </Col>
          </m.div>
          <m.div {...fadeIn}>
            <Counter
              as="h4"
              theme="counter-style-02"
              grid="row-cols-1 row-cols-md-4 row-cols-sm-2 gap-y-10 items-center justify-center md:text-center"
              className="text-black text-[70px] flex flex-col items-center"
              data={CounterData}
              height={50}
              duration={2}
            />
          </m.div>
        </Container>
      </section>
      {/* Section End */}

      {/* Section start */}
      <m.div id="start" className="relative overflow-hidden py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] sm:px-[15px]" {...fadeIn}>
        <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[-30px] left-0 h-[100vh] w-full" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
        <div className="absolute h-full w-full top-0 left-0 opacity-60 bg-[#262b35]"></div>
        <Container>
          <m.div className="row justify-center mb-40" {...{ ...zoomIn, transition: { duration: 0.7 } }}>
            <Col xl={6} lg={7} sm={8} className="col-12 relative text-center xs:my-[40px]">
              {/* Modal Component Start */}
              <CustomModal.Wrapper
                modalBtn={<Buttons ariaLabel="link for modal" type="submit" className="btn-sonar border-0 mx-auto mb-14" themeColor="#ff7a56" y color="#fff" size="lg" title={<i className="icon-control-play" />} />} >
                <div className="w-[1020px] max-w-full relative rounded mx-auto">
                  <div className="fit-video">
                    <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                  </div>
                </div>
              </CustomModal.Wrapper>
              {/* Modal Component End */}
              <h2 className="heading-1 font-serif font-bold text-white uppercase tracking-[-2px] mb-0">Looking for a perfect body</h2>
            </Col>
          </m.div>
        </Container>
      </m.div>
      {/* Section end */}

      {/* Section Start */}
      <section className="bg-lightgray pb-[130px] lg:pb-[90px] md:pb-[75px] sm:py-[50px]">
        <m.div className="container" {...{ ...fadeIn, transition: { delay: 0.5 } }}>
          <Overlap value={10}>
            <Row className="justify-center xs:mx-0">
              <Col xl={10} lg={11} className="col-12 relative bg-white rounded-[6px] box-shadow-extra-large">
                <Row>
                  <Col md={6} className="col-12 bg-no-repeat bg-cover overflow-hidden relative bg-center sm:h-[350px]" style={{ backgroundImage: "url(https://via.placeholder.com/800x840)" }} ></Col>
                  <Col md={6} className="col-12 p-[84px] p-mb-24 lg:p-[74px] md:p-16 xs:p-mb-14 overflow-hidden" >
                    <h2 className="heading-5 font-serif font-bold text-[#262b35] uppercase tracking-[-1px] w-[95%]">Get 7 days free full access pass</h2>
                    <p className="w-[90%] lg:w-full mb-[40px]">Our personal trainers are on hand to assist you with your training and inductions.</p>
                    <Formik
                      initialValues={{ name: "", email: "" }}
                      validationSchema={ContactFormStyle02Schema}
                      onSubmit={async (values, actions) => {
                        actions.setSubmitting(true)
                        const response = await sendEmail(values)
                        response.status === "success" && resetForm(actions)
                      }}
                    >
                      {({ isSubmitting, status }) => (
                        <Form>
                          <Input showErrorMsg={false} type="text" name="name" labelclass="mb-[25px]" className="rounded-[5px] py-[15px] px-[20px] w-full border-[1px] border-transparent bg-lightgray mb-[20px]" placeholder="Your name" />
                          <Input showErrorMsg={false} type="email" name="email" labelclass="mb-[25px]" className="rounded-[5px] py-[15px] px-[20px] w-full border-[1px] border-transparent bg-lightgray mb-[20px]" placeholder="Your email address" />
                          <Buttons ariaLabel="link for subscribe" type="submit" className={`btn-fill text-sm leading-none font-medium py-[13px] px-[32px] hover:border-neonorange rounded-[4px] w-full uppercase${isSubmitting ? " loading" : ""}`} themeColor="#ff7a56" color="#fff" size="lg" title="Get started now" />
                          <AnimatePresence>
                            {status && (
                              <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
                                <MessageBox className="mt-[20px] relative py-[13px] px-[20px] text-md leading-[22px]" theme="message-box01" variant="success" message="Your message has been sent successfully!" />
                              </m.div>
                            )}
                          </AnimatePresence>
                        </Form>
                      )}
                    </Formik>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="mt-32 md:mt-28">
                <Tab05 data={TabData05} />
              </Col>
            </Row>
          </Overlap>
          {/* Tab Style Pending */}
        </m.div>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row className="items-center justify-center">
            <m.div className="col-12 text-left md:mb-[5.5rem] md:text-center col-xl-4 col-lg-5 col-sm-8" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
              <span className="font-serif font-semibold text-basecolor uppercase tracking-[1px] block mb-[30px] xs:mb-[15px]">Pricing plans</span>
              <h2 className="heading-4 font-serif font-bold text-[#262b35] tracking-[-1px] uppercase">Flexible and predictable pricing plans</h2>
              <p className="w-[80%] md:w-full mb-[40px]">Lorem ipsum dolor consectetur adipiscing do eiusmod tempor incididunt abore.</p>
              <Buttons ariaLabel="link for Pricing plans" to="/page/pricing-packages" className="btn-fill btn-fancy tracking-[1px] font-medium font-serif rounded-none uppercase md:mb-[15px]" themeColor="#262b35" color="#fff" size="lg" title="Pricing plans" />
            </m.div>
            <m.div className="gym-fitness-pricing-table switch-tab col-12 col-lg-7 offset-xl-1 px-lg-0 md:pl-[25px] md:pr-[35px] sm:px-[15px]" {...{ ...fadeIn, transition: { delay: 0.6 } }}>
              <PricingTable03 grid="row-cols-1 row-cols-md-2 justify-center gap-y-10 gx-0 items-center pr-[25px] pt-0 pb-[20px] md:px-[25px]" theme='pricing-table-style-03' data={pricingTableData} />
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center text-center">
            <Col md={6} className="col-12 text-center mb-20 md:mb-16">
              <span className="font-serif font-semibold text-basecolor uppercase tracking-[1px] block mb-[5px]">
                MEET OUR TRAINERS
              </span>
              <h5 className="font-serif font-bold text-[#262b35] tracking-[-1px] uppercase">
                EXPERT TRAINERS
              </h5>
            </Col>
          </Row>
          <Team
            themeColor="dark"
            theme="team-style-05"
            className="text-white"
            data={TeamData05}
            grid="row row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-center gap-y-10"
            animation={fadeIn}
            carousel={false}
            carouselOption={{
              slidesPerView: 1,
              spaceBetween: 30,
              loop: true,
              navigation: true,
              autoplay: { delay: 3000, disableOnInteraction: false },
              pagination: { dynamicBullets: true, clickable: true },
              breakpoints: { 1200: { slidesPerView: 4 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }
            }}
          />
        </Container>
      </m.section>
      {/* Section End */}

      {/* Footer Start */}
      <FooterStyle03 theme="dark" className="bg-[#262b35] text-slateblue gym-fitness-footer" />
      {/* Footer End */}
    </div>
  );
};

export default GymFitnessPage;
