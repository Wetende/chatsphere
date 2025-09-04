import React from "react";

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AnimatePresence, m } from 'framer-motion';
import { Parallax } from "react-scroll-parallax";
import { Formik, Form } from "formik";
import { Link as ScrollTo } from "react-scroll"

// Components
import Header, { HeaderNav, Menu } from "../../Components/Header/Header";
import { fadeIn } from "../../Functions/GlobalAnimations";
import Buttons from '../../Components/Button/Buttons'
import FancyTextBox from '../../Components/FancyTextBox/FancyTextBox'
import BlogClassic from "../../Components/Blogs/BlogClassic";
import Clients from '../../Components/Clients/Clients'
import CustomModal from '../../Components/CustomModal'
import Lists from "../../Components/Lists/Lists";
import Services from "../../Components/Services/Services";
import MessageBox from "../../Components/MessageBox/MessageBox";
import TestimonialsCarousel04 from "../../Components/TestimonialCarousel/TestimonialsCarousel04";
import { Input } from '../../Components/Form/Form'
import { resetForm, sendEmail } from "../../Functions/Utilities";
import { ContactFormStyle02Schema } from "../../Components/Form/FormSchema";
import FooterStyle04 from "../../Components/Footers/FooterStyle04";
import SideButtons from "../../Components/SideButtons";

// Data
import { fancyTextBox01 } from "../../Components/FancyTextBox/FancyTextBoxData";
import { serviceData4 } from "../../Components/Services/ServicesData";
import { ClientData01 } from "../../Components/Clients/ClientsData";
import { TestimonialsCarouselData4 } from "../../Components/TestimonialCarousel/TestimonialsCarouselData";
import { blogData } from "../../Components/Blogs/BlogData";
import InViewPort from "../../Components/InViewPort";

const serviceData = [
  {
    img: "https://via.placeholder.com/720x476",
    icon: "fas fa-arrow-right",
    title: "FINANCE RESTRUCTURING",
    content:
      "Lorem ipsum consectetur adipiscing elit do eiusmod tempor incididunt.",
    link: "/page/our-story",
  },
  {
    img: "https://via.placeholder.com/720x476",
    icon: "fas fa-arrow-right",
    title: "BUSINESS PLANNING",
    content:
      "Lorem ipsum consectetur adipiscing elit do eiusmod tempor incididunt.",
    link: "/page/our-story",
  },
];

const listData = [
  {
    icon: "fas fa-check",
    title: "Healthy profits for long term",
    content:
      "Lorem ipsum consectetur adipiscing eiusmod tempor incididunt labore.",
  },
  {
    icon: "fas fa-check",
    title: "Working towards your business",
    content:
      "Lorem ipsum consectetur adipiscing eiusmod tempor incididunt labore.",
  },
];

// Filter the blog data category wise
const blogClassicData = blogData.filter((item) => item.blogType === "classic").filter(item => item.category.includes("finance"));

const FinancePages = (props) => {
  return (
    <div className="financepage" style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav
          fluid="fluid"
          theme="light"
          expand="lg"
          className="border-b border-[#0000001a] px-[35px] py-[0px] md:px-[15px] md:py-[18px] sm:px-0"
        >
          <Col sm={6} lg={2} xs="auto" className="me-auto ps-0">
            <Link aria-label="logo home" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-green-black.webp' data-rjs='/assets/img/webp/logo-green-black@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-green-black.webp' data-rjs='/assets/img/webp/logo-green-black@2.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-green-black.webp' data-rjs='/assets/img/webp/logo-green-black@2.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Navbar.Toggle className="order-last md:ml-[17px] md:px-[15px]" >
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="col-auto justify-center menu-order finance-header-menu px-lg-0 col-lg-8">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col xs="auto" lg={2} className="text-right pe-0">
            <Buttons
              to="/page/contact-classic"
              className="rounded-[4px] font-medium font-serif uppercase shadow-[0_0_30px_rgba(0,0,0,0.08)] sm:hidden"
              themeColor={["#fff", "#fff"]}
              size="xs"
              color="#212529"
              title="Get a quote"
            />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}

      {/* Parallax Section Start */}
      <div className="overflow-hidden relative">
        <Parallax
          className="lg-no-parallax bg-cover absolute top-[0px] left-0 w-full h-[100vh] md:h-[90vh] sm:h-[500px]"
          translateY={[-40, 40]}
          style={{
            backgroundImage: `url(https://via.placeholder.com/1920x1075)`,
          }}
        ></Parallax>
        <Container className="relative">
          <Row className="items-center h-[100vh] md:h-[650px] sm:h-[450px]">
            <Col lg={5} md={6} sm={8}>
              <span className="text-xmd font-serif font-medium uppercase text-[#8bb867] block mb-[35px] xs:mb-[15px]">
                Financial planning
              </span>
              <h1 className="font-serif font-bold text-[#2f2f2f] uppercase mb-[2.5rem] tracking-[-2px] sm:mb-[20px] xs:mb-[15px]">
                Talented solutions
              </h1>
              <p className="text-xmd leading-[30px] w-[73%] mb-12 lg:w-[90%] md:w-full xs:mb-[15px]">
                Transforming distribution with key capabilities in customer
                insight and analytics.
              </p>
              <ScrollTo href="#" to="call-request" offset={0} delay={0} spy={true} smooth={true} duration={800} className="cursor-pointer">
                <Buttons
                  type="submit"
                  className="btn-fill tracking-[1px] font-medium font-serif rounded-none uppercase md:mb-[15px] btn-fancy"
                  themeColor="#8bb867"
                  color="#ffffff"
                  size="lg"
                  title="Get started now"
                />
              </ScrollTo>
            </Col>
          </Row>
          <ScrollTo to="about" offset={0} delay={0} spy={true} smooth={true} duration={800} className="w-full absolute bottom-[50px] left-0 right-0 z-[1] flex justify-center items-center xs:hidden cursor-pointer">
            <i className="fas fa-arrow-down text-[#2f2f2f] bg-white shadow-[0_0_25px_rgba(0,0,0,0.08)] w-[45px] h-[45px] leading-[46px] rounded-full flex justify-center items-center"></i>
          </ScrollTo>
        </Container>
      </div>
      {/* Parallax Section End */}

      {/* Section Start */}
      <m.section {...fadeIn}>
        <Container fluid className="px-0">
          <FancyTextBox
            grid="row-cols-1 row-cols-xl-6 row-cols-md-3 row-cols-sm-2 gx-0"
            theme="fancy-text-box-01"
            data={fancyTextBox01}
            themeColor="light"
            animation={fadeIn}
          />
        </Container>
      </m.section>
      {/* Section End */}
      {/* Lazy Load HTML */}
      <InViewPort>
        {/* Section Start*/}
        <m.section
          {...{ ...fadeIn, transition: { delay: 0.3 } }}
          id="about"
          className="py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]"
        >
          <Container>
            <Row className="items-center md:justify-center">
              <Col lg={4} md={8} className="md:text-center md:mb-24">
                <span className="font-serif text-md text-[#8bb867] uppercase font-medium mb-[25px] inline-block sm:mb-[10px]">
                  About company
                </span>
                <h2 className="heading-5 font-serif text-[#2f2f2f] font-bold uppercase tracking-[-1px] w-[80%] mb-[20px] lg:w-[90%] md:w-full">
                  We provided good solutions
                </h2>
                <p className="w-[80%] mb-[35px] lg:w-full">
                  Lorem ipsum dolor consectetur adipiscing do eiusmod tempor
                  labore dolore magna ut enim ad minim veniam nostrud.
                </p>
                <Buttons
                  to="/"
                  className="btn-fancy font-medium font-serif tracking-[1px] uppercase btn-transparent rounded-none hover:text-white"
                  color="#232323"
                  size="sm"
                  themeColor="#232323"
                  title="Discover litho"
                />
              </Col>
              <Col lg={8} md={12}>
                <Services
                  grid="row-cols-1 row-cols-md-2 justify-center text-left gap-y-10 md:gap-y-[45px]"
                  theme="service-style-01"
                  data={serviceData}
                  animation={fadeIn}
                  animationDelay={0.5}
                />
              </Col>
            </Row>
          </Container>
        </m.section>
        {/* Section End */}

        {/* Section Start */}
        <m.section
          className="bg-lightgray py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]"
          {...fadeIn}
        >
          <Container>
            <Row className="justify-center">
              <m.div
                className="col col-md-7 text-center mb-20 sm:mb-12"
                {...fadeIn}
              >
                <span className="font-serif text-md text-[#8bb867] uppercase font-medium inline-block mb-[15px] sm:mb-[10px]">
                  Industries solutions
                </span>
                <h2 className="heading-5 font-serif text-[#2f2f2f] font-bold uppercase tracking-[-1px]">
                  Practice Industries
                </h2>
              </m.div>
            </Row>
            <Services
              grid="row-cols-lg-3 row-cols-sm-2 row-cols-1 gap-y-24"
              theme="service-style-04 items-center"
              data={serviceData4}
              animation={fadeIn}
            />
          </Container>
        </m.section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
          <Container>
            <Row className="items-center justify-center">
              <m.div
                className="col col-xl-4 col-lg-5 col-md-10 md:mb-20"
                {...fadeIn}
              >
                <h2 className="heading-5 font-serif text-[#2f2f2f] font-bold uppercase tracking-[-1px]">
                  What is business annual conference
                </h2>
                <blockquote className="border-l-[4px] text-darkgray font-medium border-[#8bb867] text-xmd pl-[25px] pr-0 mt-[40px] mb-[30px] lg:w-[95%]"> We work to ensure that your business prospers and brings you sufficient profit
                </blockquote>
                <p className="w-[90%] mb-[25px] md:w-full">
                  Lorem ipsum dolor sit consectetur adipiscing eiusmod tempor
                  incididunt ut labore et dolore magna ut enim ad minim veniam.
                </p>
                <Buttons
                  to="/"
                  className="font-medium mt-[10px] btn-fancy font-serif tracking-[1px] uppercase btn-transparent rounded-none hover:text-white"
                  color="#232323"
                  size="sm"
                  themeColor="#232323"
                  title="Discover litho"
                />
              </m.div>
              <m.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="col-12 col-md-10 col-lg-7 offset-xl-1"
              >
                <img
                  height=""
                  width=""
                  alt="..."
                  src="https://via.placeholder.com/800x496"
                />
              </m.div>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section
          className="bg-no-repeat bg-cover overflow-hidden relative bg-center border-mediumgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] xs:py-0 xs:border-y"
          style={{
            backgroundImage: `url('https://via.placeholder.com/1920x857')`,
          }}
        >
          <Container className="xs:px-0">
            <Row className="justify-end md:justify-center xs:gx-0">
              <m.div
                className="col col-xl-6 col-lg-7 col-md-9 col-sm-11"
                {...fadeIn}
              >
                <div className="w-full bg-white py-[6rem] px-[7rem] xs:px-[4rem] xs:py-[6rem] box-shadow-large">
                  <m.h2 className="heading-5 font-serif text-[#2f2f2f] font-bold uppercase tracking-[-1px] mb-[45px]" {...{ ...fadeIn, transition: { delay: 0.3 } }}>
                    Litho specializes in insurance policy
                  </m.h2>
                  <Lists
                    theme="list-style-07"
                    data={listData}
                    animation={fadeIn}
                    animationDelay={0.5}
                  />
                  <m.div className="mt-[20px] inline-block xs:text-center" {...{ ...fadeIn, transition: { delay: 0.7 } }}>
                    <Buttons
                      aria-label="about company"
                      to="/page/about-us"
                      className="btn-fill btn-fancy rounded-none font-medium font-serif tracking-[1px] uppercase mr-[35px] xs:mt-0 xs:mb-[20px] xs:mx-[40px]"
                      themeColor="#232323"
                      color="#fff"
                      size="sm"
                      title="About company"
                    />
                    <Buttons
                      aria-label="company button"
                      to="/"
                      className="font-medium font-serif uppercase btn-link after:h-[2px] md:text-md md:mb-[15px] after:bg-darkgray hover:text-darkgray top-[-5px]"
                      color="#232323"
                      title="Discover tour"
                      size="xl"
                    />
                  </m.div>
                </div>
              </m.div>
            </Row>
          </Container>
        </section>
        {/* Section End*/}

        {/* Section Start */}
        <section className="py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
          <Container>
            <m.div className="row items-center justify-center" {...fadeIn}>
              <Col
                xl={6}
                lg={8}
                md={7}
                sm={10}
                className="md:text-left sm:mb-[30px] sm:text-center"
              >
                <h2 className="heading-5 font-serif text-[#2f2f2f] font-bold uppercase tracking-[-1px] mb-0">
                  <strong className="font-semibold text-[#8bb867] underline">
                    25 years
                  </strong>{" "}
                  we have created websites for global brands
                </h2>
              </Col>
              <Col
                xl={{ span: 4, offset: 2 }}
                lg={4}
                md={5}
                className="text-center text-md-end"
              >
                {/* Modal Component Start */}
                <CustomModal.Wrapper
                  modalBtn={
                    <m.div
                      className="bg-[#8bb867] border-[1px] border-solid transition-default font-serif text-[14px] py-[16px] px-[40px] inline-block rounded-[4px] text-[#fff] border-[#8bb867] cursor-pointer hover:bg-transparent hover:text-[#8bb867]"
                      {...{ ...fadeIn, transition: { delay: 1 } }}
                    >
                      <i className="fa fa-arrow-right line-icon-Video-5 text-[50px] inline-block ml-0 mr-[20px] align-middle"></i>
                      <div className="inline-block align-middle font-normal text-left uppercase leading-[15px]">
                        <span className="block">Story video</span>
                        Watch
                      </div>
                    </m.div>
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
              </Col>
            </m.div>
            <Clients
              grid="mt-[7.5rem] row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 gap-y-10"
              theme="client-logo-style-01"
              data={ClientData01}
              animation={fadeIn}
            />
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="border-t border-mediumgray py-[130px] overflow-hidden bg-gradient-to-b from-[#fff] to-[#f7f7f7] lg:py-[90px] md:py-[75px] sm:py-[50px]">
          <Container>
            <m.div className="row justify-center xs:mb-12" {...fadeIn}>
              <Col md={7} className="col-12 text-center mb-16 sm:m-12 xs:m-0">
                <span className="font-serif text-md text-[#8bb867] uppercase font-medium block mb-[15px] sm:mb-[10px]">
                  Satisfied clients
                </span>
                <h2 className="heading-5 font-serif text-[#2f2f2f] font-bold uppercase tracking-[-1px]">
                  Clients testimonials
                </h2>
              </Col>
            </m.div>
            <TestimonialsCarousel04
              data={TestimonialsCarouselData4}
              className="black-move"
              carouselOption={{
                slidesPerView: 1,
                loop: true,
                breakpoints: { 768: { slidesPerView: 2 } },
                navigation: false,
                autoplay: { delay: 3000, disableOnInteraction: false },
              }}
            />
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
          <Container>
            <Row className="justify-center">
              <m.div className="col-12 col-md-7 text-center mb-16 sm:mb-8" {...fadeIn}>
                <span className="font-serif text-md text-[#8bb867] text-uppercase font-medium block mb-[15px] sm:mb-[10px]">
                  Latest articles
                </span>
                <h2 className="heading-5 font-serif text-[#2f2f2f] font-bold uppercase tracking-[-1px]">
                  Interesting articles
                </h2>
              </m.div>
            </Row>
            <BlogClassic
              pagination={false}
              grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-double-extra-large"
              data={blogClassicData}
            />
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <m.section
          id="call-request"
          className="py-[130px] bg-cover bg-no-repeat overflow-hidden relative bg-center lg:py-[90px] md:py-[75px] sm:py-[50px] xs:py-0 xs:border-y"
          style={{
            backgroundImage:
              "url('https://via.placeholder.com/1920x848')",
          }}
          {...fadeIn}
        >
          <Container className="xs:px-0">
            <m.div className="row justify-center" {...{ ...fadeIn, transition: { delay: 0.6 } }}>
              <Col xl={7} lg={8} md={10}>
                <div className="px-28 py-20 rounded-md shadow-[0_0_30px_rgba(0,0,0,0.08)] bg-white sm:p-20 xs:rounded-none xs:px-[3.5rem] xs:py-24">
                  <span className="mb-[15px] font-medium text-center	text-[#8bb867] text-md font-serif uppercase block sm:mb-[10px]">
                    Request a call back
                  </span>
                  <h2 className="heading-5 w-[80%] mb-[40px] font-bold text-center	tracking-[-1px] text-black font-serif uppercase mx-auto xs:w-full">
                    Need a consultant for your business?
                  </h2>
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
                      <Form className="mb-[30px]">
                        <Input showErrorMsg={false} type="text" name="name" labelClass="mb-[25px]" className="rounded-[5px] py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf] overflow-hidden" placeholder="Your name" />
                        <Input showErrorMsg={false} type="email" name="email" labelClass="mb-[25px]" className="rounded-[5px] py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf] overflow-hidden" placeholder="Your email address" />
                        <Buttons
                          type="submit"
                          className={`btn-fill text-sm leading-none font-medium tracking-[1px] py-[13px] px-[32px] rounded-[4px] w-full uppercase mb-[5px]${isSubmitting ? " loading" : ""}`}
                          themeColor="#8bb867"
                          color="#fff"
                          size="lg"
                          title="Request a call schedule"
                        />
                        <AnimatePresence>
                          {status && (<m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} > <MessageBox className="mt-[20px] text-center py-[10px]" theme="message-box01" variant="success" message="Your message has been sent successfully!" /> </m.div>)}
                        </AnimatePresence>
                      </Form>
                    )}
                  </Formik>
                  <p className="w-[80%] text-xs leading-6 mx-auto xs:w-full text-center"> We are committed to protecting your privacy. We will never collect information about you without your explicit consent.</p>
                </div>
              </Col>
            </m.div>
          </Container>
        </m.section>
        {/* Section End */}

        {/* Footer Start */}
        <FooterStyle04 className="finance-footer" theme="light" logo="/assets/img/webp/logo-green-black.webp" />
        {/* Footer End */}
      </InViewPort>
    </div>
  );
};

export default FinancePages;