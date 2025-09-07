import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimatePresence, m } from 'framer-motion'
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Parallax } from "react-scroll-parallax";

// Component
import Header, { HamburgerMenu, HeaderNav, Menu, SearchBar } from '../../Components/Header/Header'
import Buttons from '../../Components/Button/Buttons'
import ProgressBar from '../../Components/Progressbar/ProgressBar';
import Counter from '../../Components/Counters/Counter'
import ProcessStep from '../../Components/ProcessStep/ProcessStep';
import TextSlider02 from '../../Components/TextSlider/TextSlider02';
import Clients from '../../Components/Clients/Clients';
import Testimonials from '../../Components/Testimonials/Testimonials';
import BlogGrid from '../../Components/Blogs/BlogGrid';
import SocialIcons from '../../Components/SocialIcon/SocialIcons';
import { resetForm, sendEmail } from "../../Functions/Utilities";
import MessageBox from '../../Components/MessageBox/MessageBox';
import { fadeIn, fadeInRight, fadeInLeft } from '../../Functions/GlobalAnimations';
import { Footer } from '../../Components/Footers/Footer';
import { Input } from '../../Components/Form/Form'
import SideButtons from "../../Components/SideButtons";
import ReactCustomScrollbar from "../../Components/ReactCustomScrollbar";
import StaticInstagram from '../../Components/Instagram/StaticInstagram';

// Data
import { blogData } from "../../Components/Blogs/BlogData";
import { TestimonialsData03 } from '../../Components/Testimonials/TestimonialsData';
import { CounterData04 } from '../../Components/Counters/CounterData';
import { ProcessStepData06 } from '../../Components/ProcessStep/ProcessStepData';
import InViewPort from '../../Components/InViewPort';

const SwiperData = [
  {
    img: " https://via.placeholder.com/1920x950 ",
    title: "Global ",
    titlebold: "agency making",
    titlelast: " a world of difference",
  },
  {
    img: "https://via.placeholder.com/1920x950",
    title: "Constantly thinking of ",
    titlebold: "new and effective",
    titlelast: " ways",
  },
  {
    img: "https://via.placeholder.com/1920x950",
    title: "Superlative services with ",
    titlebold: "highly technology",
    titlelast: "",
  },
]

const ClientData = [
  {
    img: 'https://via.placeholder.com/232x110'
  },
  {
    img: 'https://via.placeholder.com/232x110'
  },
  {
    img: 'https://via.placeholder.com/232x110'
  },
  {
    img: 'https://via.placeholder.com/232x110'
  },
  {
    img: 'https://via.placeholder.com/232x110'
  },
  {
    img: 'https://via.placeholder.com/232x110'
  },
  {
    img: 'https://via.placeholder.com/232x110'
  },
  {
    img: 'https://via.placeholder.com/232x110'
  },
]

const SocialIconsData = [
  {
    color: "#3b5998",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "#ea4c89",
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble"
  },
  {
    color: "#00aced",
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  },
  {
    color: "#fe1f49",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram"
  },
  {
    color: "#0077b5",
    link: "https://www.linkedin.com/",
    icon: "fab fa-linkedin-in"
  },
]

const ProgressBarData = [
  {
    title: "STRATEGIC MARKETING",
    value: "80",
  },
  {
    title: "DIGITAL DELIVERY",
    value: "95",
  },
  {
    title: "GLOBAL COMMUNICATIONS",
    value: "75",
  },
]

const TextSliderData = [
  {
    img: "https://via.placeholder.com/1050x614",
    title: 'Business',
    subtitle: ' transformation',
    content: 'Lorem ipsum dolor consectetur adipiscing mod tempor incididunt labore dolore magna ut veniam.',
    buttonTitle: "Learn more",
    buttonLink: "/page/what-we-offer/"
  },
  {
    img: "https://via.placeholder.com/1050x614",
    title: "Strategic",
    subtitle: "communication",
    content: "Lorem ipsum dolor consectetur adipiscing mod tempor incididunt labore dolore magna ut veniam.",
    buttonTitle: "Learn more",
    buttonLink: "/page/what-we-offer/"
  },
  {
    img: "https://via.placeholder.com/1050x614",
    title: "Competitors",
    subtitle: " research",
    content: "Lorem ipsum dolor consectetur adipiscing mod tempor incididunt labore dolore magna ut veniam.",
    buttonTitle: "Learn more",
    buttonLink: "/page/what-we-offer/"
  },
  {
    img: "https://via.placeholder.com/1050x614",
    title: "Consumer",
    subtitle: " research",
    content: "Lorem ipsum dolor consectetur adipiscing mod tempor incididunt labore dolore magna ut veniam.",
    buttonTitle: "Learn more",
    buttonLink: "/page/what-we-offer/"
  },
]

// Filter the blog data category wise
const blogGridData = blogData.filter((item) => item.blogType === "grid");

const MarketingAgencyPage = (props) => {
  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav fluid="fluid" theme="dark" expand="lg" className="px-[35px] py-[0px]  md:pl-0 md:pr-[15px] md:py-[20px] sm:pr-0">
          <Col className="col-auto col-sm-6 col-lg-2 mr-auto ps-lg-0 sm:!pl-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Navbar.Toggle className="order-last md:ml-[25px] sm:ml-[17px]">
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="col-auto justify-end pr-[15px]">
            <Menu {...props} />
          </Navbar.Collapse>
          <SearchBar />
          <div className="md:hidden pl-[17px]">
            <HamburgerMenu className="" theme="dark">
              <Col className="flex flex-col justify-center px-[50px] py-[70px] w-[500px] h-[100vh] shadow-[0_0_20px_rgba(0,0,0,0.3)] right-0 text-center bg-white">
                <ReactCustomScrollbar theme="dark">
                  <div>
                    <h1 className="mb-0 font-bold tracking-[-3px] text-darkgray tracking-[-3px] font-serif uppercase">Hello</h1>
                    <p className="text-lg font-serif uppercase block">Let's be friends.</p>
                    <div className="my-20 w-full">
                      <StaticInstagram />
                    </div>
                    <div className="mb-20 text-center">
                      <p className="w-[70%] mb-12 text-darkgray leading-[26px] text-lg font-serif mx-auto inline-block">Get latest update for our trusted applications</p>
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
                          <div className="relative subscribe-style-05">
                            <Form className="relative">
                              <Input showErrorMsg={false} type="email" name="email" className="border-[1px] medium-input rounded-[5px] border-solid border-[#dfdfdf]" placeholder="Enter your email address" />
                              <button aria-label="Subscribe" type="submit" className={`text-xs leading-[18px] py-[12px] px-[28px] tracking-normal uppercase xs:text-center${isSubmitting ? " loading" : ""}`}><i className="far fa-envelope text-darkgray text-sm leading-none mr-[10px] xs:mr-0"></i>Subscribe</button>
                            </Form>
                            <AnimatePresence>
                              {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-[25px] top-[115%] left-0 w-full"><MessageBox className="rounded-[4px] text-md py-[10px] px-[22px] z-10" theme="message-box01" variant="success" message="Your message has been sent successfully subscribed to our email list!" /></m.div>}
                            </AnimatePresence>
                          </div>
                        )}
                      </Formik>
                    </div>
                    <div className="mb-[10px] text-center">
                      <SocialIcons theme="social-icon-style-05" size="sm" iconColor="dark" data={SocialIconsData} />
                    </div>
                  </div>
                </ReactCustomScrollbar>
              </Col>
            </HamburgerMenu>
          </div>
        </HeaderNav>
      </Header>
      {/* Header End */}

      {/* Section Start */}
      <section className="h-[900px] lg:h-[720px] md:h-[750px] sm:h-[500px]">
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ dynamicBullets: false, clickable: true }}
          className="white-move swiper-pagination-light h-full swiper-pagination-03 swiper-pagination-medium  swiper-pagination-light swiper-pagination-big"
        >
          {
            SwiperData.map((item, i) => {
              return (
                <SwiperSlide key={i} style={{ backgroundImage: `url(${item.img})` }} className="cover-background overflow-hidden relative">
                  <div className="absolute h-full w-full opacity-40 top-0 left-0 bg-gradient-to-r from-[#232323] via-[#232323] to-[#232323]"></div>
                  <Container className="h-full  text-center justify-center">
                    <Row className="h-full w-[70%] md:w-full my-0 mx-auto">
                      <Col className="h-full justify-center flex-col relative flex">
                        <h2 className="font-serif font-light text-white mb-16">{item.title}<span className="font-semibold">{item.titlebold}</span>{item.titlelast}</h2>
                        <div className="inline-block xs:grid xs:justify-center">
                          <Buttons to="/page/our-services" className="mr-[20px] btn-fancy tracking-[1px] btn-fill rounded-none font-medium font-serif uppercase btn-fancy md:mb-[15px] sm:mb-0 xs:block xs:w-full xs:mx-0" size="md" color="#000" themeColor="#f4d956" title="Explore services" />
                          <Buttons to="/" className="btn-fancy tracking-[1px] rounded-none font-medium font-serif uppercase btn-transparent hover:text-black xs:block xs:w-fit xs:mx-0" themeColor="#fff" size="md" color="#fff" icon="fas fa-arrow-right right-icon" iconPosition="after" title="Discover litho" />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[100px] text-left overflow-hidden md:py-[85px] sm:py-[60px]">
        <Container>
          <Row className="items-center">
            <Col lg={3} className="md:mb-[40px] xs:text-center">
              <m.h2 className="heading-5 font-semibold -tracking-[1px] text-darkgray font-serif mb-0" {...fadeIn}>Why choose?</m.h2>
            </Col>
            <Col lg={9}>
              <ProcessStep className="xs:block items-center mx-auto justify-center text-center sm:text-start" grid="col-xl-10 gap-y-10" theme="process-step-style-06" data={ProcessStepData06} animation={fadeInLeft} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <InViewPort>
        {/* Section Start */}
        <section className="py-[80px] overflow-visible bg-[#969896] pb-0 relative md:py-[40px]">
          <Container>
            <Row className="items-center justify-center">
              <div className="relative bottom-[-50px] z-[1] col-lg-6 col-md-10">
                <Parallax className="lg-no-parallax flex justify-center h-full items-center w-full bg-no-repeat absolute bottom-0 right-[-20px] xs:right-0 lg:!top-[30px]" speed={20}>
                  <m.div className="marketing-agency-parallx" {...{ ...fadeInRight, transition: { duration: 0.8 } }}>
                    <span className="text-overlap-style-04 font-serif font-semibold -tracking-[3px] xs:text-[55px]">marketing</span>
                  </m.div>
                </Parallax>
                <Parallax speed={0}>
                  <m.img className="lg:w-[80%]" width={444} height={642} src="https://via.placeholder.com/800x1158" alt="" {...{ ...fadeInRight, transition: { ease: [0.25, 1, 0.5, 1], duration: 1 } }} />
                </Parallax>
              </div>
              <m.div className="mb-[80px] xs:mb-20 md:mt-[100px] col-xl-4 col-lg-5 col-md-10 offset-xl-1" {...fadeIn}>
                <h2 className="heading-5 font-medium font-serif text-white">We provide true <span className="font-semibold">effective marketing solutions</span> for business</h2>
                <p className="text-[#fff] text-xmd leading-[32px] w-[95%] mb-[25px] opacity-60">Lorem ipsum dolor amet consectetur adipiscing eiusmod tempor incididunt labore dolore magna ut enim veniam nostrud exercitation.</p>
                <Link to="/page/about-us" className="mt-[15px] text-[#fff] text-xmd font-serif hover:text-[#fff]">More about us
                  <i className="line-icon-Arrow-OutRight text-[40px] inline-block ml-[15px] align-middle"></i>
                </Link>
              </m.div>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <m.section className="overflow-visible block p-0 relative" {...fadeIn}>
          <div className="right-0 bottom-[-50px] font-semibold tracking-[-10px] leading-[200px] text-[#fff] text-[200px] font-serif absolute lg:text-[160px] lg:leading-[160px] md:hidden">business</div>
        </m.section>
        {/* Section End */}

        {/* Section Start */}
        <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
          <Container>
            <Row>
              <Col lg={5} md={6} className="mt-32 md:mt-0 sm:mb-[30px]">
                <h2 className="heading-5 font-medium font-serif text-darkgray w-[90%] mb-[30px]  lg:w-full sm:mb-[15px]">We design <span className="font-semibold">brand, digital experience</span> that engage the right customers</h2>
                <Link to="/page/what-we-offer/" className="mt-[15px] text-[#969896] text-xmd font-serif hover:text-[#969896]">More services
                  <i className="line-icon-Arrow-OutRight text-[40px] inline-block ml-[15px] align-middle"></i>
                </Link>
              </Col>
              <Col lg={{ offset: 1 }} md={6} className="mb-[30px] mt-[108px] md:mt-0">
                <ProgressBar theme="progressbar-style-01 marketing-agency-progressbar" trailColor="transparent" data={ProgressBarData} height="8px" color="#f4d956" animation={fadeIn} />
              </Col>
            </Row>
            <Counter theme="counter-style-04 marketing-agency-counter" grid="row-cols-1 row-cols-md-4 row-cols-sm-2 gap-y-10 mt-[118px] sm:mt-[60px]" className="text-black" duration={2} data={CounterData04} />
          </Container>
        </m.section>
        {/* Section End */}

        {/* Section Start */}
        <m.section {...fadeIn}>
          <Container fluid className="px-0">
            <TextSlider02
              data={TextSliderData}
              carousalOption={{
                slidesPerView: 1,
                spaceBetween: 60,
                loop: true,
                centeredSlides: true,
                autoplay: { delay: 4500, disableOnInteraction: false },
                breakpoints: { 992: { slidesPerView: 2 }, 767: { slidesPerView: 1 } }
              }} />
          </Container>
        </m.section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] ">
          <Container>
            <Clients className="col-10 col-md-3 col-sm-6" grid="row-cols-1 row-cols-sm-2 row-cols-md-4 justify-center" theme="client-logo-style-06 light" data={ClientData} animation={fadeIn} />
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="bg-no-repeat bg-cover	overflow-hidden relative bg-center md:pt-[75px] xs:pt-[50px]" style={{ backgroundImage: "url(/assets/img/webp/home-marketing-agency-bg-img-05.webp)" }}>
          <Container>
            <Row className="items-center justify-center">
              <Col xl={{ span: 4, offset: 1 }} lg={{ span: 5, order: 2 }} md={8} className="md:text-center">
                <m.div  {...{ ...fadeIn, transition: { delay: 0.5, duration: 0.6 } }}>
                  <img src="/assets/img/webp/home-marketing-agency-img-02.webp" alt="" className="mb-[20px] md:mt-0 md:mx-auto" />
                  <div>
                    <h4 className="font-serif font-light text-darkgray tracking-[-1px] w-[65%] mb-12 md:w-full" >President's
                      <span className="font-semibold"> message</span>
                    </h4>
                    <span className="mb-[20px] text-lg leading-[30px] text-[#fff] w-[86%] block xs:w-full xs:text-xmd xs:leading-[22px] md:text-center md:mx-auto">Diamonds are nothing more than chunks of coal that stuck to their jobs.</span>
                    <p className="text-[#fff] opacity-60	w-[85%] md:w-full mb-[50px] xs:mb-[15px]">Lorem ipsum dolor sit amet consectetur adipiscing elit eiusmod tempor incididunt labore et dolore magna minim veniam nostrud exercitation ullamco.</p>
                    <img src="/assets/img/webp/home-restaurant-img-transparent-06.webp" alt="" className="md:my-0 md:mx-auto" />
                  </div>
                </m.div>
              </Col>
              <Col xs={10} lg={{ span: 7, order: 1 }}>
                <div className="relative">
                  <m.img className="ml-auto" width="597px" height="781px" src="https://via.placeholder.com/597x781" alt="" {...{ ...fadeIn, transition: { duration: 1 } }} />
                  <m.div className="marketingagency-quote absolute left-[10px] bottom-[160px] rounded-[4px] py-[40px] px-[45px] bg-[#f4d956] text-left w-[50%] before: xs:p-[15px] sm:text-lg xs:w-[70%] xs:bottom-[50px]" {...{ ...fadeIn, transition: { delay: 0.8 }, duration: 0.6 }}>
                    <span className="leading-[32px] -tracking-[.5px] text-darkgray text-xlg font-serif block sm:text-lg">Teamwork is the ability to work together toward a common vision.</span>
                  </m.div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <m.section className="bg-gradient-to-b from-[#fff] to-[#f0f2f0] pt-[130px] overflow-hidden lg:pt-[90px] md:pt-[75px] sm:pt-[50px]" {...fadeIn}>
          <Container>
            <Row className="justify-center text-center">
              <Col lg={4} className="mb-16 text-center">
                <span className="mb-[5px] text-[#969896] font-serif uppercase block tracking-[1px]">Testimonials</span>
                <h2 className="heading-5 font-semibold text-darkgray font-serif">Customer reviews</h2>
              </Col>
            </Row>
            <Row className="justify-center">
              <Col md={12} sm={8}>
                <Testimonials className="marketing-agency-testimonials" grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-10 justify-center" theme='testimonials-style-03' data={TestimonialsData03} animation={fadeIn} />
              </Col>
            </Row>
          </Container>
        </m.section>
        {/* Section End */}

        {/* Section Start */}
        <section className="bg-[#f0f2f0] py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
          <Container>
            <Row className="justify-center text-center">
              <Col className="mb-[56px]">
                <span className="mb-[5px] text-[#969896] tracking-[1px] font-serif uppercase block">Latest blog</span>
                <h2 className="heading-5 font-semibold text-darkgray font-serif">Popular articles</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <BlogGrid grid="blog-wrapper grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={blogGridData.slice(1, 4)} />
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[80px] overflow-hidden md:py-[40px]">
          <Container>
            <Row className="md:justify-center">
              <Col lg={7} sm={10} className="md:mt-12 md:mb-12 md:text-center">
                <m.h2 className="heading-3 font-semibold text-darkgray font-serif mb-0" {...{ ...fadeIn, transition: { delay: 0.2 } }}>Let's talk about how we can transform your business!</m.h2>
              </Col>
              <m.div className="col-lg-5 pl-24 lg:pl-[15px] md:mb-12 md:text-center" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
                <span className="mt-[7px] text-darkgray text-xmd font-serif block">Get in touch with our team</span>
                <h3 className="heading-4 text-[#f4d956] font-semibold font-serif mb-0 mt-[5px]">
                  <a aria-label="mail" href="mailto:info@domain.com" className="text-decoration-line-bottom-thick hover:opacity-50 hover:text-[#828282]" >info@domain.com</a>
                </h3>
              </m.div>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Footer Start */}
        <Footer className="py-[50px] border-t border-mediumgray items-center" theme="light">
          <Container>
            <Row className="md:justify-between items-center">
              <Col className="col-12 col-xl-5 col-md-6 order-2 order-xl-1 sm:mb-[15px] xs:flex xs:justify-center xs:text-center">
                <ul className="flex justify-start  sm:justify-center text-left text-sm font-serif xs:flex-col xs:text-center">
                  <li className="mr-[35px] md:mr-[15px] xs:mb-[7px]"><Link className="text-[#828282] hover:opacity-70 hover:text-[#828282] uppercase" to="/page/about-us">About us</Link></li>
                  <li className="mr-[35px] md:mr-[15px] xs:mb-[7px]"><Link className="text-[#828282] hover:opacity-70 hover:text-[#828282] uppercase" to="/page/our-services">Our Services</Link></li>
                  <li className="mr-[35px] md:mr-[15px] xs:mb-[7px]"><Link className="text-[#828282] hover:opacity-70 hover:text-[#828282] uppercase" to="/page/latest-news">News</Link></li>
                  <li className="mr-[35px] md:mr-[15px] xs:mb-[7px]"><Link className="text-[#828282] hover:opacity-70 hover:text-[#828282] uppercase" to="/page/contact-classic">Contact us</Link></li>
                </ul>
              </Col>
              <Col xl={{ span: 2, order: 2 }} xs={{ span: 12, order: 1 }} className="text-center lg:mb-[30px]">
                <Link to="/">
                  <img src="/assets/img/webp/logo-black.webp" className="my-0 mx-auto" alt="logo" width="111" height="36" />
                </Link>
              </Col>
              <Col xl={5} md={6} xs={{ span: 12, order: 3 }} className="text-right">
                <p className="mb-0 uppercase text-sm  sm:text-center">© {new Date().getFullYear()} Litho is Proudly Powered by <a rel="noreferrer" href="https://www.themezaa.com/" className="text-black underline underline-offset-4 font-medium hover:opacity-50" target="_blank"> ThemeZaa</a></p>
              </Col>
            </Row>
          </Container>
        </Footer>
        {/* Footer End */}
      </InViewPort>
    </div>
  )
}

export default MarketingAgencyPage
