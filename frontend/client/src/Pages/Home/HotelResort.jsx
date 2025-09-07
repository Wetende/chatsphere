import React, { lazy, useRef, useState } from 'react'

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimatePresence, m } from 'framer-motion'
import { Parallax } from "react-scroll-parallax";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// Components
import Header, { HeaderLanguage, HeaderNav, Menu, SearchBar, Topbar } from '../../Components/Header/Header';
import Buttons from '../../Components/Button/Buttons'
import Lists from '../../Components/Lists/Lists';
import Testimonials from '../../Components/Testimonials/Testimonials';
import { Input } from '../../Components/Form/Form'
import MessageBox from '../../Components/MessageBox/MessageBox';
import SocialIcons from '../../Components/SocialIcon/SocialIcons';
import Clients from '../../Components/Clients/Clients';
import CustomModal from '../../Components/CustomModal'
import FooterMenu, { Footer } from '../../Components/Footers/Footer';
import { fadeIn, zoomIn } from '../../Functions/GlobalAnimations';
import InfoBannerStyle01 from '../../Components/InfoBanner/InfoBannerStyle01';
import Overlap from '../../Components/Overlap/Overlap';
import InteractiveBanners14 from '../../Components/InteractiveBanners/InteractiveBanners14';
import SideButtons from "../../Components/SideButtons";
import { resetForm, sendEmail } from "../../Functions/Utilities";

// Data
import { ListData03 } from '../../Components/Lists/ListsData';
import FooterData from '../../Components/Footers/FooterData';
import { ClientData08 } from '../../Components/Clients/ClientsData';

const IconWithText = lazy(() => import('../../Components/IconWithText/IconWithText'))

const IconWithTextData = [
  {
    icon: "line-icon-King-2 text-[#c89965] text-[40px]",
    title: "Exclusive chefs",
    content: "Lorem ipsum dolor amet adipiscing eiusmod",
  },
  {
    icon: "line-icon-Car-3 text-[#c89965] text-[40px]",
    title: "Pick up & drop",
    content: "Lorem ipsum dolor amet adipiscing eiusmod",
  },
  {
    icon: "line-icon-Juice text-[#c89965] text-[40px]",
    title: "Welcome drink",
    content: "Lorem ipsum dolor amet adipiscing eiusmod",
  },
  {
    icon: "line-icon-Swimming text-[#c89965] text-[40px]",
    title: "Swimming pool",
    content: "Lorem ipsum dolor amet adipiscing eiusmod",
  },
]

const iconData = [
  {
    color: "#fff",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "#fff",
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble"
  },
  {
    color: "#fff",
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  },
  {
    color: "#fff",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram"
  }
]

const swiperData = [
  {
    bgimg: "https://via.placeholder.com/1920x1080",
    img: "/assets/img/webp/slider-typography-01.webp"
  },
  {
    bgimg: "https://via.placeholder.com/1920x1080",
    img: "/assets/img/webp/slider-typography-02.webp"
  },
  {
    bgimg: "https://via.placeholder.com/1920x1080",
    img: "/assets/img/webp/slider-typography-03.webp"
  }
]

const infoData = [
  {
    img: "https://via.placeholder.com/600x465",
    title: "Classic double toom",
    content: "Lorem ipsum dolor amet consectetur adipiscing do eiusmod tempor",
    price: "FROM $100 PER NIGHT",
    btnName: "Booking Now ",
    btnLink: "#"
  },
  {
    img: "https://via.placeholder.com/600x465",
    title: "One bedroom suite",
    content: "Lorem ipsum dolor amet consectetur adipiscing do eiusmod tempor",
    price: "FROM $150 PER NIGHT",
    btnName: "Booking Now ",
    btnLink: "#"
  },
  {
    img: "https://via.placeholder.com/600x465",
    title: "Empire state suite",
    content: "Lorem ipsum dolor amet consectetur adipiscing do eiusmod tempor",
    price: "FROM $200 PER NIGHT",
    btnName: "Booking Now ",
    btnLink: "#"
  }
]

const TestimonialsData = [
  {
    name: 'Herman Miller',
    content: 'Simply superb resort. Management and staff deserve special appreciation and thanks for hospitality.',
    img: 'https://via.placeholder.com/125x125',
    company: "Switzerland",
    rating: 5
  },
  {
    name: 'Loretta Smith',
    content: 'We are back home now and feel that it is only right to write to you to express our warmest gratitude.',
    img: 'https://via.placeholder.com/125x125',
    company: "Microsoft Corporation",
    rating: 5
  },
  {
    name: 'Jeremy Girard',
    content: 'Wonderful place to live for holidays. Can’t believe can have such beautiful environment to spend peaceful.',
    img: 'https://via.placeholder.com/125x125',
    company: "Envato Market",
    rating: 5
  }
]

const HotelResortPage = (props) => {
  const swiperRef1Fivereasons = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header className="header-with-topbar" topSpace={{ desktop: true, xs: false }} type="reverse-scroll">
        <Topbar className="bg-[#c89965] text-white py-[5px] sm:hidden">
          <Container fluid="lg">
            <Row className="items-center justify-center px-[15px]">
              <Col className="col-12 col-md-3 header-social-icon me-auto ps-lg-0 border-0">
                <span className="font-serif text-sm uppercase font-medium">Call: 1-800-222-000</span>
              </Col>
              <Col className="col-12 col-md-6 text-center px-md-0 sm-padding-5px-tb line-height-normal">
                <span className="text-sm font-serif font-medium inline-block">ENJOY SPECIALS PACKAGES AND RESORT OFFERS</span>
              </Col>
              <Col className="col-12 col-md-3 text-end pe-lg-0">
                <div className="header-search-icon search-form-wrapper">
                  <Link to="#" className="font-serif text-sm uppercase font-medium hover:text-[#ffffff99]">
                    <i className="feather-calendar mr-[5px]"></i>Book your stay</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </Topbar>
        <HeaderNav theme="light" bg="light" menu="dark" className="py-[0px] md:px-[15px] sm:px-0">
          <Col xs="auto" className="me-auto ps-0">
            <Link aria-label="header logo link" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-yellow-ochre.webp' data-rjs='/assets/img/webp/logo-yellow-ochre@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-yellow-ochre.webp' data-rjs='/assets/img/webp/logo-yellow-ochre@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-yellow-ochre.webp' data-rjs='/assets/img/webp/logo-yellow-ochre@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Navbar.Toggle className="order-last md:ml-[25px] sm:ml-[17px]">
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse xs="auto" className="menu-order px-lg-0 justify-center mr-[42px]">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col xs="auto" className="text-end pe-0 font-size-0">
            <SearchBar />
            <HeaderLanguage />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}

      {/* Section Start */}
      <section className="overflow-hidden full-screen sm:h-[450px]">
        <Swiper
          className="swiper-pagination-02 swiper-pagination-light swiper-pagination-medium h-full relative hotel-resort-slider"
          modules={[Autoplay, EffectFade, Keyboard, Navigation, Pagination]}
          effect="fade"
          navigation={true}
          pagination={{ clickable: true }}
          allowTouchMove={false}
          loop={true}
          keyboard={{ enabled: true, onlyInViewport: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          onSlideChange={(swiperCore) => {
            const { realIndex } = swiperCore;
            setActiveSlide(realIndex)
          }}
        >
          {
            swiperData.map((item, i) => {
              return (
                <SwiperSlide key={i} className="overflow-hidden relative">
                  <m.div className="bg-img bg-no-repeat bg-center bg-cover absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `url(${item.bgimg})` }}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: activeSlide === i ? 1 : 1.2 }}
                    transition={{ duration: 20 }}
                  >
                  </m.div>
                  <div className="absolute h-full w-full top-0 left-0 opacity-30 bg-black"></div>
                  <AnimatePresence>
                    <Container className="text-center justify-center h-full">
                      <Row className="h-full w-[70%] mb-[12px] mx-auto">
                        <Col className="h-full justify-center flex-col relative flex items-center">
                          <div className="relative inline-block mt-[30px]">
                            <m.div
                              animate={activeSlide === i ? { scaleX: [0, 1, 1, 0], originX: ["0%", "0%", "100%", "100%"] } : { scaleX: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="bg-white list-block absolute top-0 h-full w-full"></m.div>
                            <img width="586px" height="276px" className="w-auto" src={item.img} alt="" />
                          </div>
                          <m.div
                            initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                            animate={{ clipPath: activeSlide === i ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
                            transition={{ delay: 1.5, duration: 0.6 }}
                            animation={{ ease: "easeIn" }}
                            className="inline-block">
                            <Buttons ariaLabel="packge book link" href="#" className="bg-darkgray text-[#fff] hover:bg-white hover:text-darkgray hover:border-transparent border-transparent mt-[10px] btn-fancy font-medium font-serif rounded-none uppercase btn-fancy md:mb-[15px]" themeColor="#232323" color="#fff" size="md" title="booking now" />
                          </m.div>
                        </Col>
                      </Row>
                    </Container>
                  </AnimatePresence>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </section>
      {/* Section End */}

      {/* About Section Start */}
      <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="mb-36 md:mb-16 sm:mb-20">
            <m.div className="col-lg-4 col-md-7 md:mb-[60px] sm:mb-[20px]" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
              <i className="line-icon-Plates text-[40px] mb-[35px] inline-block"></i>
              <span className="font-serif font-semibold text-md text-[#c89965] uppercase block mb-[20px] tracking-[1px]">About luxury resorts</span>
              <h2 className="heading-5 font-serif font-medium text-[#333045] mb-0">Relax at the luxury resorts around the entire world</h2>
            </m.div>
            <m.div className="col-lg-5 col-xl-4 col-md-6 md:mb-[30px] sm:mb-[50px]" {...fadeIn}>
              <span className="font-serif font-medium text-darkgray block mb-[25px] lg:w-[95%] sm:w-full sm:mb-[15px]">Our hotel has been present for over 20 years. We make the best for all our customers.</span>
              <p className="lg:w-[95%] sm:mb-[15px] mb-[20px]">Lorem ipsum dolor sit amet consectetur adipiscing eiusmod tempor incididunt labore dolore magna minim veniam nostrud exercitation ullamco.</p>
              <Buttons aria-label="link for about" href="#" className="font-serif uppercase btn-link after:h-[1px] leading-[28px] font-semibold md:text-md md:mb-[15px] after:bg-darkgray hover:text-darkgray" color="#232323" title="Explore resort" />
            </m.div>
            <m.div className="col-lg-3 col-md-6 offset-xl-1" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
              <Lists theme="list-style-03" data={ListData03} animation={fadeIn} />
            </m.div>
          </Row>
          <InteractiveBanners14 animation={fadeIn} grid="row-cols-1 row-cols-lg-3 row-cols-md-2 gx-4 gap-y-10" className="justify-center" />
        </Container>
      </section>
      {/* About Section End */}

      {/* Service Section Start */}
      <section className="py-0 overflow-hidden">
        <Container fluid>
          <Row>
            <m.div className="col-xs-12 col-xl-6 col-lg-5 cover-background pl-40 h-[650px] flex flex-col justify-center xl:pl-[15px] lg:h-[550px] md:h-[350px] xs:h-[300px]" style={{ backgroundImage: `url(https://via.placeholder.com/1100x745)` }} {...fadeIn}>
              <Row className="justify-center">
                <Col xl={5} sm={9} className="xs:text-center">
                  <i className="line-icon-Slippers text-[50px] mb-[35px] inline-block xs:mb-[25px]"></i>
                  <span className="font-serif font-semibold text-md text-[#c89965] block uppercase mb-[25px] tracking-[1px] xs:mb-[15px]">Why choose resort</span>
                  <h2 className="heading-4 font-serif font-medium text-white mb-0 xs:w-[70%] mx-auto">Five reasons to stay with us</h2>
                </Col>
              </Row>
            </m.div>

            <m.div className="col-xl-6 col-lg-7 px-0 relative" {...{ ...fadeIn, transition: { delay: 0.6 } }}>
              <Swiper
                className="swiper-pagination-light h-full relative heroslider lg:h-[550px] sm:h-[450px]"
                slidesPerView={1}
                loop={true}
                ref={swiperRef1Fivereasons}
                modules={[Autoplay, Keyboard]}
                keyboard={{ enabled: true, onlyInViewport: true }} >
                <SwiperSlide className="overflow-hidden cover-background relative" style={{ backgroundImage: `url(https://via.placeholder.com/1100x745)` }}>
                  <div className="flex flex-col justify-end h-full" >
                    <div className="bg-white pl-24 pr-20 py-[4.5rem] w-[55%] lg:w-[75%] lg:py-[3.5rem] lg:px-16 md:w-[60%] sm:w-[75%] xs:w-[80%]">
                      <h3 className="heading-6 font-serif font-medium text-[#333045] mb-[15px]">Exclusive restaurants</h3>
                      <p className="w-[89%] sm:w-full">Lorem ipsum dolor amet consectetur adipiscing do eiusmod tempor incididunt ut labore magna Ut enim minim nostrud exercitation ullamco laboris nisiex ea commodo consequat.</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="overflow-hidden cover-background relative" style={{ backgroundImage: `url(https://via.placeholder.com/1100x745)` }}>
                  <div className="flex flex-col justify-end h-full" >
                    <div className="bg-white px-24 py-[4.5rem] w-[55%] lg:w-[75%] lg:py-[3.5rem] lg:px-16 md:w-[60%] sm:w-[75%] xs:w-[80%]">
                      <h3 className="heading-6 font-serif font-medium text-[#333045] mb-[15px]">Large swimming pool</h3>
                      <p className="w-[89%] sm:w-full">Lorem ipsum dolor amet consectetur adipiscing do eiusmod tempor incididunt ut labore magna Ut enim minim nostrud exercitation ullamco laboris nisiex ea commodo consequat.</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="overflow-hidden cover-background relative" style={{ backgroundImage: `url(https://via.placeholder.com/1100x745)` }}>
                  <div className="flex flex-col justify-end h-full" >
                    <div className="bg-white px-24 py-[4.5rem] w-[55%] lg:w-[75%] lg:py-[3.5rem] lg:px-16 md:w-[60%] sm:w-[75%] xs:w-[80%]">
                      <h3 className="heading-6 font-serif font-medium text-[#333045] mb-[15px]">Luxury spa massage</h3>
                      <p className="w-[89%] sm:w-full">Lorem ipsum dolor amet consectetur adipiscing do eiusmod tempor incididunt ut labore magna Ut enim minim nostrud exercitation ullamco laboris nisiex ea commodo consequat.</p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className="absolute bottom-0 right-full z-[1] md:right-0">
                <div onClick={() => swiperRef1Fivereasons.current.swiper.slidePrev()} className="h-[62px] w-[62px] leading-[62px] text-lg bg-[#00000080] left-0 text-[#ffffff] transition-default flex justify-center items-center hover:bg-[#ffffff] hover:text-darkgray">
                  <i className="feather-arrow-left"></i>
                </div>
                <div onClick={() => swiperRef1Fivereasons.current.swiper.slideNext()} className="mt-[1px] h-[62px] w-[62px] leading-[62px] text-lg left-0 bg-[#00000080] text-[#ffffff] transition-default flex justify-center items-center hover:bg-[#ffffff] hover:text-darkgray">
                  <i className="feather-arrow-right"></i>
                </div>
              </div>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Service Section End */}

      {/* Section Start */}
      <section className="py-[130px] bg-[#f8f2eb] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <IconWithText
            grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 text-center"
            theme="icon-with-text-03 xs:py-[2rem] xs:px-[4rem]"
            data={IconWithTextData}
            animation={fadeIn}
            animationDelay={0.2} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-[#eee7de] py-[130px] pb-0 lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <m.div className="row justify-center" {...fadeIn}>
            <Col lg={7} md={8} xl={6} className="text-center mb-36 lg:mb-[7.5rem]">
              <span className="font-serif font-semibold text-[#c89965] uppercase text-md tracking-[1px] mb-[25px] block">A holiday to Remember, Limited rooms available!</span>
              <h2 className="heading-5 font-serif font-medium text-[#333045] -tracking-[1px] w-[95%] inline-block mb-[45px] xs:w-full">We offers the perfect setting for rare moments of romance</h2>
              <Buttons aria-label="link for holiday" href="#" className="btn-fill font-medium font-serif rounded-none uppercase" themeColor="#333045" color="#fff" size="md" title="booking now" />
            </Col>
          </m.div>
        </Container>
        <div className="border-t border-[#0000001a] hotelresort-client">
          <Container>
            <Clients
              grid="row row-cols-1 row-cols-md-4 row-cols-sm-2"
              theme="client-logo-style-08"
              data={ClientData08}
              animation={fadeIn}
              animationDelay={0.3}
            />
          </Container>
        </div>
      </section>
      {/* Section End */}

      {/* Feature Section Start */}
      <section className="bg-[#f8f2eb] py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col md={6} lg={5} className="text-center mb-16 md:mb-12">
              <span className="font-serif font-semibold text-md text-[#c89965] uppercase tracking-[1px] block mb-[10px]">Exclusive offers</span>
              <h2 className="heading-5 font-serif font-medium text-[#333045] -tracking-[1px]">Featured specials</h2>
            </Col>
          </Row>
          <InfoBannerStyle01 animation={fadeIn} grid="row row-cols-1 row-cols-lg-3 gap-y-10" className="justify-center" data={infoData} />
        </Container>
      </section>
      {/* Feature Section End */}

      {/* Parallax Section Start */}
      <div className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] md:flex md:items-center overflow-hidden relative">
        <Parallax className="lg-no-parallax bg-cover absolute top-[0] left-0 w-full h-[100vh] lg:h-[90vh] lg:bg-right lg:top-[-100px] md:top-[-40px] md:h-[85vh]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
        <div className="absolute top-0 left-0 w-full h-full bg-[#333045] opacity-50"></div>
        <Container className="h-full mb-[70px] lg:mb-[60px] md:mb-[90px] sm:mb-0">
          <Row className="justify-center h-full items-center text-center">
            <Col md={6} className="text-center z-[1]">
              {/* Modal Component Start */}
              <CustomModal.Wrapper
                modalBtn={
                  <m.span className="inline-block" {...{ ...zoomIn, transition: { type: "spring", stiffness: 150, duration: 0.7 } }}> <Buttons ariaLabel="link for modal" type="submit" className="btn-sonar mx-auto mb-[55px] border-0 shadow-[0_0_15px_rgba(0,0,0,0.1)]" themeColor="#333045" color="#fff" size="lg" title={<i className="icon-control-play" />} /></m.span>
                } >
                <div className="w-[1020px] max-w-full relative rounded mx-auto">
                  <div className="fit-video">
                    <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                  </div>
                </div>
              </CustomModal.Wrapper>
              {/* Modal Component End */}
              <m.h2 {...{ ...fadeIn, transition: { delay: 0.6 } }} className="heading-6 font-serif font-medium text-white uppercase -tracking-[1px] mb-0">Relax and enjoy your</m.h2>
              <m.img {...{ ...fadeIn, transition: { delay: 0.8 } }} width="555px" height="225px" src="/assets/img/webp/hotel-resort-img-20.webp" alt="" />
            </Col>
          </Row>
        </Container>
      </div>
      {/* Parallax Section End */}

      {/* Testimonial Section Start */}
      <section className="pb-[130px] bg-[#f8f2eb] lg:pb-[90px] md:pb-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center items-center">
            <Overlap>
              <Col className="relative lg:text-center">
                <m.div className="bg-[#c89965] rounded-[6px] flex justify-between items-center md:flex-col py-[40px] px-28 lg-px-20 xs:px-10" {...fadeIn}>
                  <h2 className="heading-6 font-serif font-medium text-[#333045] -tracking-[1px] mb-[0px] w-[45%] lg:w-1/2 md:w-full md:mb-[30px] xs:mb-[20px] text-left md:text-center">Sign up for exclusive hotel offers</h2>
                  <Formik
                    initialValues={{ email: '' }}
                    validationSchema={Yup.object().shape({ email: Yup.string().email("Invalid email.").required("Field is required."), })}
                    onSubmit={async (values, actions) => {
                      actions.setSubmitting(true)
                      const response = await sendEmail(values)
                      response.status === "success" && resetForm(actions)
                    }}
                  >
                    {({ isSubmitting, status }) => (
                      <div className="relative subscribe-style-05 w-[55%] md:w-full">
                        <Form className="relative">
                          <Input showErrorMsg={false} type="email" name="email" className="border-[1px] large-input rounded border-solid border-transparent bg-[#f8f2eb]" placeholder="Enter your email address" />
                          <button aria-label="link for subscribe" type="submit" className={`text-xs py-[12px] !font-semibold px-[28px] uppercase xs:text-center${isSubmitting ? " loading" : ""}`}><i className="far fa-envelope text-[#c89965] text-sm leading-none mr-[10px] xs:mr-0"></i>Subscribe</button>
                        </Form>
                        <AnimatePresence>
                          {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-[115%] left-0 w-full"><MessageBox className="rounded-[4px] text-md py-[10px] px-[22px]" theme="message-box01" variant="success" message="Your message has been sent successfully subscribed to our email list!" /></m.div>}
                        </AnimatePresence>
                      </div>
                    )}
                  </Formik>
                </m.div>
              </Col>
            </Overlap>
          </Row>
          <Row className="justify-center">
            <m.div className="col-lg-5 col-ms-6 text-center mb-16 mt-[4.5rem] sm:mt-24 md:mb-12" {...fadeIn}>
              <span className="font-serif font-semibold text-medium text-[#c89965] text-md uppercase tracking-[1px] block mb-[10px]">Exclusive rating</span>
              <h3 className="heading-5 font-serif font-medium text-[#333045] -tracking-[1px]">What customer say</h3>
            </m.div>
          </Row>
          <Testimonials
            grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-10 justify-center"
            theme='testimonials-style-05'
            data={TestimonialsData}
            animation={fadeIn} />
        </Container>
      </section>
      {/* Testimonial Section End */}

      {/* footer Start */}
      <Footer theme="dark" className="hotelresort-footer bg-[#333045] text-[#ffffff66]">
        <div className="py-[5%] lg:py-[8%] md:py-[50px]">
          <Container>
            <Row>
              <Col xs={12} lg={{ order: 0, span: 3 }} sm={{ order: 1, span: 6 }} className="md:mb-[40px] xs:mb-[25px]">
                <span className="font-serif font-medium block text-white mb-[20px] mt-[5px] text-md uppercase tracking-[1px] xs:mb-[10px]">About company</span>
                <p>Lorem ipsum dolor amet consectetur adipiscing do tempor incididunt labore magna ut enim minim exercitation laboris nisiex ea commodo.</p>
              </Col>
              <FooterMenu data={FooterData.slice(0, 1)} xs={12} lg={{ order: 0, span: 2 }} sm={{ order: 2, span: 5, offset: 1 }} className=" md:mb-[40px] xs:mb-[25px]" titleClass="uppercase text-md" />
              <Col lg={{ span: 3, order: 0, offset: 0 }} sm={{ span: 5, offset: 1, order: 4 }} className="xs:mb-[25px]">
                <span className="mb-[20px] font-serif text-md block uppercase font-medium tracking-[1px] text-white xs:mb-[10px]">Get in touch</span>
                <p className="w-[84%] mb-[15px]">27 Eden walk eden centre, Orchard view, Paris, France</p>
                <div>+1 234 567 8910</div>
                <div><a aria-label="link for gmail" className="hover:!text-[#c89965]" href="mailto:info@yourdomain.com">info@yourdomain.com</a></div>
              </Col>
              <Col lg={{ span: 3, order: 0 }} sm={{ span: 6, order: 3 }}>
                <span className="font-medium font-serif text-white block uppercase tracking-[1px] text-md mb-[35px]">Follow us on Instagram</span>
                <div className="w-full inline-block">
                  <ul className="instagram-posts flex">
                    <li className="grid-item rounded p-[5px] mb-[5px]">
                      <figure className="relative overflow-hidden rounded-[3px]">
                        <a href="https://www.instagram.com/p/CSMapatMNo8/" target="_blank" aria-label="instagram image" rel="noreferrer">
                          <img height="80px" width="80px" alt="instagram-img" className="w-full rounded-[3px]" src="https://via.placeholder.com/80x80" />
                          <i className="fab fa-instagram"></i>
                        </a>
                      </figure>
                    </li>

                    <li className="grid-item rounded p-[5px] mb-[5px]">
                      <figure className="relative overflow-hidden rounded-[3px]">
                        <a href="https://www.instagram.com/p/CSMapatMNo8/" target="_blank" aria-label="instagram image" rel="noreferrer">
                          <img height="80px" width="80px" alt="instagram-img" className="w-full rounded-[3px]" src="https://via.placeholder.com/80x80" />
                          <i className="fab fa-instagram"></i>
                        </a>
                      </figure>
                    </li>

                    <li className="grid-item rounded p-[5px] mb-[5px]">
                      <figure className="relative overflow-hidden rounded-[3px]">
                        <a href="https://www.instagram.com/p/CSMapatMNo8/" target="_blank" aria-label="instagram image" rel="noreferrer">
                          <img height="80px" width="80px" alt="instagram-img" className="w-full rounded-[3px]" src="https://via.placeholder.com/80x80" />
                          <i className="fab fa-instagram"></i>
                        </a>
                      </figure>
                    </li>
                  </ul>
                  <a aria-label="link about company" rel="noreferrer" href="https://www.instagram.com/" target="_blank" className="flex text-slateblue font-medium text-xs font-serif uppercase mt-[40px] items-center hover:text-white xs:!text-start">
                    <i className="fab fa-instagram text-lg mr-[10px] text-[#c89965]"></i>
                    <span className="inline-block text-[#c89965] hover:text-[#c89965]">Follow instagram</span>
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="py-[40px] border-t border-[#ffffff1a]">
          <Container>
            <Row>
              <Col md={3} className="sm:mb-[20px]">
                <Link aria-label="footer home link" to="/" className="sm:flex sm:justify-center">
                  <img alt="logo" src="/assets/img/webp/logo-white.webp" width="111" height="36" />
                </Link>
              </Col>
              <Col md={6} className="flex justify-center items-center text-center sm:mb-[20px]">
                <p className="mb-0">&copy; {new Date().getFullYear()} Litho is Proudly Powered by <a aria-label="footer link themezaa" rel="noreferrer" href="https://www.themezaa.com/" className="text-decoration-line-bottom hover:!text-[#c89965]" target="_blank"> ThemeZaa</a></p>
              </Col>
              <Col md={3} className="text-right xs:text-center">
                <SocialIcons size="xs" theme="social-icon-style-12" className="justify-end sm:justify-center" iconColor="light" data={iconData} />
              </Col>
            </Row>
          </Container>
        </div>
      </Footer>
      {/* footer End */}
    </div>
  )
}

export default HotelResortPage