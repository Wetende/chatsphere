import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Parallax } from 'react-scroll-parallax';
import { Form, Formik } from 'formik';
import { Autoplay, Pagination } from "swiper/modules";
import { m, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from "swiper/react";

// Components
import { Header, HeaderNav, Menu } from "../../Components/Header/Header";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import { Input, TextArea } from '../../Components/Form/Form'
import Buttons from '../../Components/Button/Buttons'
import CustomIconWithText from '../../Components/CustomIconWithText/CustomIconWithText'
import MessageBox from '../../Components/MessageBox/MessageBox';
import { fadeIn, fadeInRight } from '../../Functions/GlobalAnimations';
import Testimonials from '../../Components/Testimonials/Testimonials'
import Team from '../../Components/Team/Team';
import { ContactFormStyle02Schema } from '../../Components/Form/FormSchema';
import SideButtons from "../../Components/SideButtons";
import InfoBannerStyle03 from "../../Components/InfoBanner/InfoBannerStyle03";
import Tab03 from '../../Components/Tab/Tab03';
import { resetForm, sendEmail } from "../../Functions/Utilities";

// Data
import { CustomIconWithTextData1 } from '../../Components/CustomIconWithText/CustomIconWithTextData';
import { TestimonialsData05 } from '../../Components/Testimonials/TestimonialsData'
import { TabData03 } from '../../Components/Tab/TabData';
import { InfoBannerData03 } from "../../Components/InfoBanner/InfoBannerData";

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

const TeamData = [
  {
    img: 'https://via.placeholder.com/315x550',
    name: 'Alexander Harvard',
    designation: 'HEAD OF CHEF',
    social_links: [
      {
        title: 'facebook',
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f"
      },
      {
        title: 'instagram',
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram"
      },
      {
        title: 'twitter',
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter"
      }
    ]
  },
  {
    img: 'https://via.placeholder.com/319x550',
    name: 'Bryan Jonhson',
    designation: 'EXECUTIVE CHEF',
    social_links: [
      {
        title: 'facebook',
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f"
      },
      {
        title: 'instagram',
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram"
      },
      {
        title: 'twitter',
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter"
      }
    ]
  },
  {
    img: 'https://via.placeholder.com/312x550',
    name: 'Jeremy Dupont',
    designation: 'ASSISTANT CHEF',
    social_links: [
      {
        title: 'facebook',
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f"
      },
      {
        title: 'instagram',
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram"
      },
      {
        title: 'twitter',
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter"
      }
    ]
  },
]

const SwiperData = [
  {
    img: "https://via.placeholder.com/1920x1017",
    title: "Morning movement",
    subtitle: "Conventional food",
  },
  {
    img: "https://via.placeholder.com/1920x1017",
    title: "Delicious cooking",
    subtitle: "Outstanding dining",
  },
  {
    img: "https://via.placeholder.com/1920x1017",
    title: "Authentic kitchen",
    subtitle: "Wonderful cuisine",
  },
]

const CafePage = (props) => {
  const swiperRef = React.useRef(null);

  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav theme="dark" expand="lg" containerClass="sm:!px-0" className="py-[0px] px-[35px] md:py-[20px] md:px-0 border-b border-[#ffffff1a]" fluid="fluid" >
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-tussock.webp' data-rjs='/assets/img/webp/logo-tussock@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-tussock.webp' data-rjs='/assets/img/webp/logo-tussock@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Col className="col-auto order-last">
            <Navbar.Toggle className="md:ml-[10px]" >
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
            </Navbar.Toggle>
          </Col>
          <Navbar.Collapse className="justify-center col-auto col-lg-8 menu-order px-lg-0">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto col-lg-2 pe-0">
            <SocialIcons theme="social-icon-style-01" size="xs" iconColor="light" className="justify-end text-right" data={SocialIconsData} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      {/* Section Start */}
      <section>
        <Swiper
          className="slider-nav-dark white-move swiper-pagination-light swiper-pagination-medium h-full md:h-[700px] sm:h-[450px]"
          modules={[Pagination, Autoplay]}
          pagination={false}
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          <div onClick={() => swiperRef.current.swiper.slidePrev()} className="btn-slider-next -translate-y-1/2 absolute top-1/2 z-[1] left-[40px] text-[40px] text-white h-[50px] w-[50px] leading-[50px] flex justify-center items-center right-inherit cursor-pointer xs:left-[15px]">
            <i className="line-icon-Arrow-OutLeft text-[50px]"></i>
          </div>
          {
            SwiperData.map((item, i) => {
              return (
                <SwiperSlide key={i} style={{ backgroundImage: `url(${item.img})` }} className="bg-no-repeat	bg-cover	overflow-hidden relative bg-center">
                  <div className="absolute h-full w-full top-0 left-0 opacity-50 bg-darkgray"></div>
                  <Container className="full-screen sm:h-[450px]">
                    <Row className="h-full justify-center md:h-[700px] sm:h-[450px]">
                      <Col xl={6} sm={7} className="text-center h-full justify-center flex-col relative flex">
                        <span className="font-serif tracking-[3px] text-xmd text-white opacity-70 uppercase block mb-[45px] sm:mb-[15px]">{item.subtitle}</span>
                        <h1 className="font-serif font-bold text-shadow-extra-large text-[100px] leading-[95px] text-white uppercase tracking-[-4px] mb-[55px] mx-auto sm:mx-0 lg:text-[90px] lg:leading-[90px] md:text-[70px] md:leading-[65px] sm:text-[45px] sm:leading-[43px] sm:tracking-[-1px] sm:mb-[30px] xs:w-[85%]">{item.title}</h1>
                        <div className="inline-block">
                          <Buttons ariaLabel="Discover more" href="#" className="btn-fill btn-fancy drop-shadow-md font-medium font-serif uppercase rounded-[2px] btn-shadow text-[15px] md:mb-[15px]" size="lg" themeColor="#cd9452" color="#fff" title="Discover more" />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </SwiperSlide>
              )
            })
          }
          <div onClick={() => swiperRef.current.swiper.slideNext()} className="btn-slider-prev absolute top-1/2 -translate-y-1/2 z-[1] right-[40px] text-[40px] text-white h-[50px] w-[50px] leading-[50px] flex justify-center items-center right-inherit cursor-pointer xs:right-[15px]">
            <i className="line-icon-Arrow-OutRight text-[50px]"></i>
          </div>
        </Swiper>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-no-repeat bg-cover overflow-hidden relative bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/1920x855)' }}>
        <Container>
          <Row className="items-center">
            <Col xl={4} lg={5} md={{ span: 6, order: 1 }} className="order-2 pr-0 xs:pr-[15px]">
              <h2 className="heading-5 font-serif text-darkgray uppercase mb-[25px]">Welcome to litho <span className="font-bold">cafe &amp; restaurant</span></h2>
              <blockquote className="border-l-[4px] border-basecolor text-xmd text-darkgray font-medium py-[2px] pl-[25px] pr-0 xs:mt-[30px] mt-[40px] mb-[30px] w-[85%] md:w-full">
                One should not attend even the end of the world without a good breakfast
              </blockquote>
              <p className="w-[90%] md:w-full mb-[35px]">Lorem ipsum is simply dummy text printing and typesetting industry. Lorem ipsum been industry standard dummy text ever since printer.</p>
              <Buttons ariaLabel="explore more" href="#" className="btn-fill btn-fancy tracking-[1px] font-medium font-serif rounded-sm uppercase md:mb-[15px]" themeColor="#cd9452" color="#fff" size="md" title="explore more" />
            </Col>
            <Col lg={7} xl={{ offset: 1 }} md={{ span: 6, order: 2 }} className="order-1 md:mb-20">
              <m.img width="661.5px" height="575.2px" src="https://via.placeholder.com/690x600" loading="lazy" alt="cafe" data-no-retina="" {...fadeIn} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <m.div className="col-md-5 text-center mb-[4.5rem]" {...fadeIn}>
              <span className="text-xmd text-basecolor uppercase font-serif font-medium tracking-[1px] block mb-[5px]">amazing services</span>
              <h2 className="heading-5 font-serif font-bold uppercase text-darkgray mb-0">Cafe amenities</h2>
            </m.div>
          </Row>
          <CustomIconWithText grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 justify-center text-center gap-y-10 landscape:md:gap-y-0" className="" theme="custom-icon-with-text01" data={CustomIconWithTextData1} animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="p-[5px] sm:pt-[50px]">
        <Container fluid>
          <Row className="justify-center">
            <Col lg={{ span: 4, order: 0 }} md={{ span: 6, order: 1 }} sm={8} className="p-[5px]">
              <m.div className="relative h-full flex items-center bg-cover bg-no-repeat overflow-hidden bg-center text-center" style={{ backgroundImage: 'url(https://via.placeholder.com/700x700)' }}  {...{ ...fadeIn, transition: { delay: 0.2 } }}>
                <div className="absolute h-full w-full top-0 left-0 bg-darkgray opacity-60"></div>
                <div className="relative z-[1] w-full py-40 lg:py-28">
                  <span className="block text-xmd text-white opacity-60 font-serif tracking-[2px] uppercase mb-[25px]">Special food</span>
                  <h2 className="font-serif text-white uppercase w-[75%] lg:w-[85%] mx-auto mb-[35px] font-light">Land of <span className="font-bold">delicious</span></h2>
                  <Buttons ariaLabel="Explore more" href="#" className="btn-fill btn-fancy tracking-[1px] drop-shadow-md	font-medium font-serif uppercase rounded-[2px] btn-shadow text-[15px] md:mb-[15px]" size="md" themeColor="#fff" color="#000" title="Explore more" />
                </div>
              </m.div>
            </Col>
            <Col lg={{ span: 4, order: 0 }} md={{ span: 6, order: 3 }} sm={8} className="p-[5px] flex">
              <m.div className="w-full flex flex-col items-center bg-cover bg-no-repeat overflow-hidden bg-center text-center py-40 lg:py-28" style={{ backgroundImage: 'url(https://via.placeholder.com/700x700)' }}  {...{ ...fadeIn, transition: { delay: 0.4 } }}>
                <h2 className="heading-3 font-serif uppercase text-white mb-0 tracking-[-1px]">Food <span className="block">voucher</span></h2>
                <h2 className="heading-3 font-serif uppercase font-semibold tracking-[-1px] mb-[40px] lg:mb-[25px] text-white">50% off</h2>
                <span className="self-center font-serif font-medium text-xmd uppercase text-white border-[1px] border-dotted border-[#ffffff66] rounded-[4px] px-[25px] py-[10px]">Foodoff</span>
              </m.div>
            </Col>
            <Col lg={{ span: 4, order: 0 }} md={{ span: 6, order: 2 }} sm={8} className="p-[5px]">
              <m.div className="relative h-full flex items-center bg-cover bg-no-repeat overflow-hidden bg-center text-center" style={{ backgroundImage: 'url(https://via.placeholder.com/700x700)' }}  {...{ ...fadeIn, transition: { delay: 0.6 } }}>
                <div className="absolute h-full w-full top-0 left-0 bg-darkgray opacity-60"></div>
                <div className="relative z-[1] w-full py-40 lg:py-28">
                  <span className="block text-xmd text-white opacity-60 font-serif tracking-[2px] uppercase mb-[25px]">Traditional food</span>
                  <h2 className="font-serif text-white uppercase w-[75%] lg:w-[85%] mx-auto mb-[35px] font-light">Tastes of  <span className="font-bold">america</span></h2>
                  <Buttons ariaLabel="Explore more" href="#" className="btn-fill btn-fancy drop-shadow-md font-medium font-serif uppercase rounded-[2px] btn-shadow text-[15px] md:mb-[15px]" size="md" themeColor="#fff" color="#000" title="Explore more" />
                </div>
              </m.div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="cafe-tab-style-03 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] cover-background overflow-hidden relative" style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1090)' }} {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col md={5} className="text-center mb-[84px] xs:mb-[70px]">
              <span className="text-xmd text-basecolor uppercase font-serif font-medium tracking-[1px] block mb-[5px]">Special menu</span>
              <h2 className="heading-5 font-serif font-bold uppercase text-darkgray mb-0">Discover menu</h2>
            </Col>
          </Row>
          <Tab03 data={TabData03} />
          <div className="text-center mt-28 lg:mt-20 md:mt-14 xs:mt-8">
            <Buttons ariaLabel="view full menu" href="#" className="btn-fill mx-auto font-medium font-serif rounded-none uppercase md:mb-[15px]" themeColor="#cd9452" color="#fff" size="lg" title="view full menu" />
          </div>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <m.div className="col-md-5 text-center mb-[4.5rem]" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
              <span className="text-xmd text-basecolor uppercase font-serif font-medium tracking-[1px] block mb-[5px]">Chef special food</span>
              <h2 className="heading-5 font-serif font-bold uppercase text-darkgray mb-0">Exclusive Food</h2>
            </m.div>
          </Row>
          <InfoBannerStyle03
            grid="row-cols-1 row-cols-lg-3 row-cols-sm-2 gap-y-10 justify-center"
            className=""
            data={InfoBannerData03}
            animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="pt-[130px] lg:pt-[90px] md:pt-[75px] sm:pt-[50px]">
        <Container fluid>
          <Row className="justify-center">
            <m.div className="col-md-5 text-center mb-[42px]" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
              <span className="text-xmd text-basecolor uppercase font-serif font-medium tracking-[1px] block mb-[5px]">Discover our chef</span>
              <h2 className="heading-5 font-serif font-bold uppercase text-darkgray mb-0">Experience chefs</h2>
            </m.div>
          </Row>
          <Row className="justify-center">
            <Col xl={9} lg={11}>
              <Team
                themeColor="dark"
                theme='team-style-03'
                className="text-white sm:justify-center"
                overlay="#cd9452cc"
                data={TeamData}
                grid="row row-cols-1 row-cols-lg-3 row-cols-sm-2 gap-y-10 justify-center"
                animation={fadeIn}
                carousel={false}
                carouselOption={{ slidesPerView: 3, spaceBetween: 30, loop: true, navigation: false, autoplay: { delay: 3000, disableOnInteraction: false }, pagination: { dynamicBullets: false, clickable: true } }} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <m.div className="col-md-5 text-center mb-[84px]" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
              <span className="text-xmd text-basecolor uppercase font-serif font-medium tracking-[1px] block mb-[5px]">EXCLUSIVE RATING</span>
              <h2 className="heading-5 font-serif font-bold uppercase text-darkgray mb-0">OUR GUESTBOOK</h2>
            </m.div>
          </Row>
          <Testimonials grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-10 justify-center" theme='testimonials-style-05' className="" data={TestimonialsData05} animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section start */}
      <m.div className="relative overflow-hidden py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] sm:px-[15px]" {...fadeIn}>
        <Parallax className="lg-no-parallax bg-cover cover-background absolute left-0 h-[130vh] top-[0] w-full" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1280)` }}></Parallax>
        <div className="absolute h-full w-full top-0 left-0 opacity-60 bg-darkgray"></div>
        <Container>
          <Row>
            <Col className="relative bg-basecolor">
              <Row>
                <m.div className="col sm:h-[350px] cover-background" style={{ backgroundImage: 'url(https://via.placeholder.com/650x850)' }} {...fadeInRight}></m.div>
                <Col md={7} className="p-28 lg:p-20 xs:p-16">
                  <h2 className="heading-5 font-serif text-darkgray font-semibold mb-[35px] md:mb-[25px]">Enjoyed the friendly service!</h2>
                  <Formik
                    initialValues={{ name: '', email: '', phone: '', comment: '' }}
                    validationSchema={ContactFormStyle02Schema}
                    onSubmit={async (values, actions) => {
                      actions.setSubmitting(true)
                      const response = await sendEmail(values)
                      response.status === "success" && resetForm(actions)
                    }}
                  >
                    {({ isSubmitting, status }) => (
                      <Form className="cafe-form">
                        <Input showErrorMsg={false} type="text" name="name" labelClass="mb-[25px]" className="pt-[15px] text-[#fff] pb-[17px] pr-[36px] w-full bg-transparent border-b border-solid border-darkgray placeholder-shown:text-black text-[16px] leading-[initial]" placeholder="Your name" />
                        <Input showErrorMsg={false} type="email" name="email" labelClass="mb-[25px]" className="pr-[36px] text-[#fff] pt-[15px] pb-[17px] w-full bg-transparent border-b border-solid border-darkgray text-[16px] leading-[initial]" placeholder="Your email address" />
                        <Input showErrorMsg={false} type="tel" name="phone" labelClass="mb-[25px]" className="pr-[36px] text-[#fff] pt-[15px] pb-[17px] w-full bg-transparent border-b border-solid border-darkgray text-[16px] leading-[initial]" placeholder="Mobile number" />
                        <TextArea className="mb-[35px] text-[#fff] py-[15px] w-full bg-transparent border-b border-solid border-darkgray text-[16px] leading-[initial] resize-none" rows="3" name="comment" placeholder="How can we help you?"></TextArea>
                        <Buttons ariaLabel="Send Message" type="submit" className={`btn-fill font-medium font-serif rounded-none uppercase md:mb-[15px]${isSubmitting ? " loading" : ""}`} themeColor="#232323" size="md" color="#fff" title="send message" />
                        <AnimatePresence>
                          {status &&
                            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="mt-[20px] relative py-[14px] px-[20px] text-md leading:[22px] rounded-none" theme="message-box01" variant="success" message="Your message has been sent successfully!" /></m.div>}
                        </AnimatePresence>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </m.div>
      {/* Section end */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-[40px] text-center">
            <m.div {...{ ...fadeIn, transition: { delay: 0.2 } }}>
              <i className="feather-map-pin text-[28px] text-basecolor mb-[25px] sm:mb-[10px] block"></i>
              <div className="text-darkgray uppercase text-md font-semibold font-serif tracking-[1px] mb-[10px]">CONTACT US</div>
              <p className="w-[75%] lg:w-full md:w-[60%] sm:w-[75%] mx-auto">401 Broadway, 24th Floor New York, NY 10013.</p>
            </m.div>
            <m.div {...{ ...fadeIn, transition: { delay: 0.4 } }}>
              <i className="feather-phone-call text-[28px] text-basecolor mb-[25px] sm:mb-[10px] block"></i>
              <div className="text-darkgray uppercase text-md font-semibold font-serif tracking-[1px] mb-[10px]">LET'S TALK</div>
              <p className="w-[70%] lg:w-full mx-auto">Phone: 1-800-222-000<br />Fax: 1-800-222-002</p>
            </m.div>
            <m.div {...{ ...fadeIn, transition: { delay: 0.6 } }}>
              <i className="feather-mail text-[28px] text-basecolor mb-[25px] sm:mb-[10px] block"></i>
              <div className="text-darkgray uppercase text-md font-semibold font-serif tracking-[1px] mb-[10px]">BOOKING INFO</div>
              <p className="w-[70%] lg:w-full mx-auto">
                <a aria-label="link for gmail" href="mailto:info@yourdomain.com" className="hover:text-basecolor">info@yourdomain.com</a><br />
                <a aria-label="link for gmail" href="mailto:hr@yourdomain.com" className="hover:text-basecolor">hr@yourdomain.com</a>
              </p>
            </m.div>
            <m.div {...{ ...fadeIn, transition: { delay: 0.8 } }}>
              <i className="feather-globe text-[28px] text-basecolor text-pink mb-[25px] sm:mb-[10px] block"></i>
              <div className="text-darkgray uppercase text-md font-semibold font-serif tracking-[1px] mb-[10px]">CAFE EVENT</div>
              <p className="w-[75%] lg:w-full md:w-[60%] sm:w-[75%] mx-auto">Lorem ipsum is simply dummy text printing</p>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Footer Start */}
      <footer className="py-[50px] border-t border-mediumgray">
        <Container>
          <Row className="items-center">
            <Col lg={{ span: 5, order: 1 }} md={{ span: 6, order: 2 }} sm={{ order: 2 }} xs={{ order: 2 }} className="sm:mb-[15px]">
              <ul className="flex text-sm font-serif text-center justify-start md:justify-start sm:justify-center xs:text-center xs:flex-col">
                <li className="nav-item mr-[35px] md:mr-[20px] xs:mr-0 xs:mb-[7px]">
                  <Link to="#" className="hover:text-basecolor">ABOUT US</Link>
                </li>
                <li className="nav-item mr-[35px] md:mr-[20px] xs:mr-0 xs:mb-[7px]">
                  <Link to="#" className="hover:text-basecolor">MENU</Link>
                </li>
                <li className="nav-item mr-[35px] md:mr-[20px] xs:mr-0 xs:mb-[7px]">
                  <Link to="#" className="hover:text-basecolor">GALLERY</Link>
                </li>
                <li className="nav-item mr-0">
                  <Link to="#" className="hover:text-basecolor">CONTACT US</Link>
                </li>
              </ul>
            </Col>
            <Col lg={{ span: 2, order: 2 }} sm={{ order: 1 }} xs={{ order: 1 }} className="order-1 text-center md:mb-[20px]">
              <Link aria-label="footer home link" to="/" className="flex justify-center">
                <img width={111} height={36} className="max-h-[36px] md:mb-[10px]" src="/assets/img/webp/logo-tussock.webp" alt="" />
              </Link>
            </Col>
            <Col lg={5} md={6} className="order-3 text-center flex justify-end sm:justify-center md:text-end">
              <p className="uppercase font-serif text-sm">© {new Date().getFullYear()} Litho is Proudly Powered by <a aria-label="link for themezaa" href="https://www.themezaa.com/" target="_blank" rel="noreferrer" className="underline underline-offset-4 font-semibold text-darkgray">ThemeZaa</a></p>
            </Col>
          </Row>
        </Container>
      </footer>
      {/* Footer End */}
    </div>
  )
}

export default CafePage