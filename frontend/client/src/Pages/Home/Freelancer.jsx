import React from "react";

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { Formik, Form } from "formik";
import { Link as ScrollTo } from "react-scroll";

// Components
import Header, {
  CollapsibleMenu,
  HamburgerMenu,
  HeaderNav,
} from "../../Components/Header/Header";
import ReactCustomScrollbar from "../../Components/ReactCustomScrollbar";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import Overlap from "../../Components/Overlap/Overlap";
import { Input, TextArea } from "../../Components/Form/Form";
import { ContactFormStyle02Schema } from "../../Components/Form/FormSchema";
import MessageBox from "../../Components/MessageBox/MessageBox";
import TestimonialsCarousel02 from "../../Components/TestimonialCarousel/TestimonialsCarousel02";
import FancyTextBox from "../../Components/FancyTextBox/FancyTextBox";
import Buttons from "../../Components/Button/Buttons";
import PortfolioSwitchImg from "../../Components/Portfolio/PortfolioSwitchImg";
import IconWithText from "../../Components/IconWithText/IconWithText";
import Clients from "../../Components/Clients/Clients";
import SideButtons from "../../Components/SideButtons";
import { fadeIn, fadeInLeft, zoomIn } from "../../Functions/GlobalAnimations";
import { resetForm, sendEmail } from "../../Functions/Utilities";
import { TiltBox } from "../../Components/FancyText/FancyText";

// Data
import { TestimonialsCarouselData2 } from "../../Components/TestimonialCarousel/TestimonialsCarouselData";
import { portfolioSwitchImgMetroData } from "../../Components/Portfolio/PortfolioData";
import { ClientData02 } from "../../Components/Clients/ClientsData";

const SocialIconDataForm = [
  {
    color: "#828282",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f",
  },
  {
    color: "#828282",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram",
  },
  {
    color: "#828282",
    link: "https://twitter.com/",
    icon: "fab fa-twitter",
  },
  {
    color: "#828282",
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble",
  },
  {
    color: "#828282",
    link: "https://www.linkedin.com/",
    icon: "fab fa-linkedin-in",
  },
];

const IconWithTextData = [
  {
    icon: "line-icon-Archery-2 !text-[50px]",
    title: "BRANDING",
    content: "Lorem ipsum dolor consectetur adipiscing eiusmod tempor.",
  },
  {
    icon: "line-icon-Cursor-Click2 !text-[50px]",
    title: "WEB DESIGN",
    content: "Lorem ipsum dolor consectet eiusmod tempor incididunt.",
  },
  {
    icon: "line-icon-Video-Len2 !text-[50px]",
    title: "PHOTOGRAPHY",
    content: "Lorem ipsum dolor consectet eiusmod tempor incididunt.",
  },
];

const fancyTextBoxData = [
  {
    icon: {
      text: "2010",
      class: "text-darkgray",
    },
    title: "Winning design award",
    description: "in awwwards.com",
  },
  {
    icon: {
      text: "2018",
      class: "text-darkgray",
    },
    title: "Nominee for best jury",
    description: "in apple developer",
  },
  {
    icon: {
      text: "2019",
      class: "text-darkgray",
    },
    title: "Select creative designer",
    description: "for apple designing",
  },
  {
    icon: {
      text: "2020",
      class: "text-darkgray",
    },
    title: "Winning photography",
    description: "award in new york",
  },
];

const FreelancerPage = (props) => {
  return (
    <div className="freelancer-page" style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header
        topSpace={{ md: true }}
        className="absolute top-0 left-0 w-full z-10 py-0 md:py-0"
      >
        <HeaderNav
          fluid="fluid"
          theme="light"
          expand="lg"
          containerClass="h-[100px] md:h-[70px] sm:px-0"
          className="px-[35px] py-0 md:px-0"
        >
          <Col className="col-5 col-lg-2 me-auto me-auto ps-lg-0">
            <Link aria-label="link for" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img
                  className="default-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-black.webp"
                  data-rjs="/assets/img/webp/logo-black@2x.webp"
                  alt="logo"
                />
                <img
                  className="alt-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-black.webp"
                  data-rjs="/assets/img/webp/logo-black@2x.webp"
                  alt="logo"
                />
                <img
                  className="mobile-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-black.webp"
                  data-rjs="/assets/img/webp/logo-black@2x.webp"
                  alt="logo"
                />
              </Navbar.Brand>
            </Link>
          </Col>
          <Col className="col-auto text-end px-[15px]">
            <a
              aria-label="gmail"
              href="mailto:brian@domain.com"
              className="font-serif font-medium text-xmd pr-[17px] text-darkgray hover:text-darkgray align-middle none sm:inline-block xs:hidden"
            >
              brian@domain.com
            </a>
            <HamburgerMenu
              theme="light"
              className="w-[50%] lg:w-[60%] sm:w-full p-24 md:px-8 xs:px-0 bg-darkgray h-[100vh]"
            >
              <div className="flex flex-col items-center justify-center h-full px-[15px] md:p-0 xs:p-0">
                <Link aria-label="header logo" to="/" className="md:hidden">
                  <img
                    width={180}
                    height={58}
                    src="/assets/img/webp/logo-peacock-blue-crome-yellow.webp"
                    alt="logo"
                    className="md:w-[160px]"
                  />
                </Link>
                <ReactCustomScrollbar
                  theme="light"
                  className="pl-[15px]"
                  autoHide
                >
                  <div className="my-12 px-[15px] w-[75%] lg:w-[80%] md:w-[75%] sm:w-[60%] xs:w-full">
                    <CollapsibleMenu
                      className="text-left items-start w-[75%] xl:w-full mx-auto"
                      theme="light"
                    />
                  </div>
                </ReactCustomScrollbar>
                <div className="sm:hidden">
                  <SocialIcons
                    theme="social-icon-style-01"
                    className="justify-center"
                    size="sm"
                    iconColor="light"
                    data={SocialIconDataForm}
                  />
                </div>
              </div>
            </HamburgerMenu>
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}

      {/* Section start */}
      <section
        className="bg-cover relative p-0 overflow-visible bg-center"
        style={{
          backgroundImage:
            "url(/assets/img/webp/home-freelancer-bg-img-01.webp)",
        }}
      >
        <Container>
          <Row className="h-[100vh] md:h-[650px] sm:h-[550px] xs:h-[450px]">
            <Col md={5} sm={7} className="flex flex-col py-32">
              <h2 className="heading-1 font-serif font-semibold text-[11rem] text-darkgray -tracking-[10px] leading-[140px] mt-auto mb-0 sm:-tracking-[5px] md:text-[108px] md:leading-[90px] sm:text-[99px] sm:leading-[80px]">
                Brian
                <span className="block text-border-width-2px text-stroke-fill-transparent text-[#fff] text-[130px] -tracking-[6px] lg:text-[110px] md:text-[90px] sm:text-[66px] sm:-tracking-[0.5px]">
                  miller
                </span>
              </h2>
              <div className="flex font-serif font-medium text-xmd text-darkgray mt-auto">
                <span className="flex-shrink-0 h-[2px] w-[20px] bg-darkgray self-center mr-[15px]"></span>
                <div className="flex-grow-1 -tracking-[0.5px]">
                  Award winner freelancer
                </div>
              </div>
            </Col>
            <ScrollTo
              to="expertise"
              offset={0}
              delay={0}
              spy={true}
              smooth={true}
              duration={800}
              className="absolute -translate-x-1/2 w-[90px] h-[90px] xs:text-[25px] rounded-full bg-white flex items-center justify-center bottom-[-45px] left-1/2 box-shadow-small xs:w-[60px] xs:h-[60px] xs:-bottom-[30px] cursor-pointer"
            >
              <i className="ti-mouse text-darkgray font-normal text-[32px] xs:text-[25px]"></i>
            </ScrollTo>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section
        className="big-section py-[170px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] overflow-hidden bg-no-repeat bg-[top_110px_left]"
        style={{
          backgroundImage: "url(/assets/img/home-freelancer-bg-img-01.png)",
        }}
      >
        <Container>
          <Row className="items-center justify-center z-0 relative font-sans">
            <m.div
              className="col-12 col-lg-4 col-md-7 text-left font-sans md:text-center md:mb-[30px] sm:mb-0 xs:mt-[30px]"
              {...fadeIn}
            >
              <span className="font-semibold font-serif text-darkgray text-lg uppercase block mb-[20px] md:text-xmd">
                About brian miller
              </span>
              <p className="text-lg leading-[38px] md:text-xmd md:leading-[22px]">
                I am a designer and frontend developer from Newyork, USA. I hold
                a master degree of web design from the world university.
              </p>
            </m.div>
            <div className="col-12 col-lg-4 offset-lg-1 col-md-6 col-sm-4 col-xs-6">
              <TiltBox>
                <m.div
                  className="text-right bg-no-repeat sm:text-left py-12 lg:py-20 md:py-25 sm:py-0 xs:text-center sm:!bg-none"
                  style={{
                    backgroundImage:
                      "url(/assets/img/webp/home-freelancer-img-05.webp)",
                  }}
                  {...{
                    ...zoomIn,
                    transition: { ease: "circOut", duration: 1, delay: 0.2 },
                  }}
                >
                  <span
                    className="cover-background text-[200px] leading-[200px] font-serif font-semibold uppercase lg:text-[160px] md:text-[120px] sm:text-[90px] xs:leading-[1] xs:text-[50px] bg-clip-text text-stroke-fill-transparent tracking-[-10px] md:tracking-[-5px] xs:tracking-[-0.5px]"
                    style={{
                      backgroundImage: `url(https://via.placeholder.com/421x289)`,
                    }}
                  >
                    20
                  </span>
                </m.div>
              </TiltBox>
            </div>
            <m.div
              className="col-12 col-lg-3 col-md-4 col-sm-4 col-xs-6 text-start font-serif sm:text-start"
              {...{
                ...fadeInLeft,
                transition: { ease: "circOut", delay: 0.4, duration: 1 },
              }}
            >
              <h2 className="heading-5 font-light text-darkgray uppercase w-[90%] mb-0 ml-[15px] xs:ml-0 sm:w-full xs:text-center">
                Years of <span className="font-bold">experience</span>
              </h2>
            </m.div>
          </Row>
          <m.div
            className="row row-cols-1 row-cols-md-4 row-cols-sm-2 mt-28 sm:mt-0 font-serif flex md:justify-center xs:block"
            {...fadeIn}
          >
            <m.div
              className="col font-medium sm:mb-[30px] xs:text-center"
              {...{ ...fadeIn, transition: { delay: 0.3 } }}
            >
              <span className="tracking-[1px] block uppercase xs:text-center">
                Expertise
              </span>
              <span className="text-darkgray block xs:text-center">
                Designing and web
              </span>
            </m.div>
            <m.div
              className="col sm:mb-[30px] xs:text-center font-medium"
              {...{ ...fadeIn, transition: { delay: 0.5 } }}
            >
              <span className="tracking-[1px] block uppercase xs:text-center">
                Born in
              </span>
              <span className="text-darkgray block xs:text-center">
                Newyork, USA
              </span>
            </m.div>
            <m.div
              className="col xs:mb-[30px] font-medium xs:text-center"
              {...{ ...fadeIn, transition: { delay: 0.7 } }}
            >
              <span className="tracking-[1px] block uppercase xs:text-center">
                Date of birth
              </span>
              <span className="text-darkgray block xs:text-center">
                26 December 1984
              </span>
            </m.div>
            <m.div
              className="col font-medium xs:text-center"
              {...{ ...fadeIn, transition: { delay: 0.9 } }}
            >
              <span className="tracking-[1px] block uppercase xs:text-center">
                Education
              </span>
              <span className="text-darkgray block xs:text-center">
                Master of design
              </span>
            </m.div>
          </m.div>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="relative pt-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container fluid className="xs:px-0">
          <PortfolioSwitchImg
            className="freelancer-portfolioswitchimg"
            grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large text-center m-0"
            data={portfolioSwitchImgMetroData.slice(0, 6)}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section
        id="expertise"
        className="freelancer-iconwithtext pb-0 bg-gradient-to-b from-[#fff] to-[#f7f7f7] overflow-hidden"
      >
        <Container>
          <Row className="justify-center">
            <Col
              xs={{ order: 2 }}
              xl={8}
              lg={{ span: 7, order: 0 }}
              className="flex self-end text-center"
            >
              <m.img
                width={662}
                height={822}
                className="relative -left-[45px] w-full md:left-0"
                src="https://via.placeholder.com/662x822"
                alt="expertise"
                {...fadeIn}
              />
            </Col>
            <Col
              xs={{ order: 1 }}
              xl={4}
              lg={{ span: 5, order: 0 }}
              md={10}
              className="pb-36 xs:pb-24"
            >
              <m.h2
                className="heading-1 font-serif font-semibold text-darkgray mb-24 -tracking-[2px]"
                {...fadeIn}
              >
                <span className="text-border-width-2px text-stroke-fill-transparent text-darkgray opacity-30 block">
                  Amazing
                </span>
                <span className=""> expertise</span>
              </m.h2>
              <div>
                <IconWithText
                  grid="flex-col gap-y-16"
                  theme="icon-with-text-08 xs:px-0"
                  data={IconWithTextData}
                  animationDelay={0.2}
                  animationDuration={1}
                  animation={fadeInLeft}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <Overlap value={50} className="flex justify-end sm:hidden">
        <img
          src="/assets/img/webp/home-freelancer-img-03.webp"
          alt="freelancer"
          width="177"
          height="248"
        />
      </Overlap>
      <m.section
        className="pb-[240px] lg:pt-0 lg:pb-[95px] overflow-hidden md:py-[75px] sm:py-[50px]"
        {...fadeIn}
      >
        <Container>
          <div className="row lg:mb-[130px] sm:mb-0">
            <TestimonialsCarousel02
              className="slider-nav-style-01 slider-nav-dark black-move"
              title="Proud"
              subtitle="stories"
              data={TestimonialsCarouselData2}
              carouselOption={{
                slidesPerView: 1,
                loop: true,
                navigation: true,
                autoplay: { delay: 2500, disableOnInteraction: false },
              }}
            />
          </div>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray overflow-visible pb-[160px] lg:pb-[120px] md:pb-[95px] sm:py-[50px] xs:pb-[50px]">
        <Container>
          <Row className="mb-[150px] lg:mb-[90px] md:mb-0">
            <Overlap className="text-center overflow-hidden">
              <m.div
                initial={{
                  opacity: 0,
                  transform: "perspective(400px) rotateX(120deg)",
                }}
                whileInView={{
                  opacity: 1,
                  transform: "perspective(400px) rotateX(0deg)",
                }}
                viewport={{ once: true }}
                transition={{
                  opacity: { ease: "circOut" },
                  transform: { type: "spring", stiffness: 200, duration: 2 },
                }}
              >
                <span className="font-serif font-semibold bg-gradient-to-r from-[#5cc088] to-[#dda556] bg-clip-text text-stroke-fill-transparent text-[11rem] md:text-[108px] leading-[11rem] lg:text-[143px] sm:text-20 -tracking-[10px] sm:hidden">
                  achievement
                </span>
              </m.div>
            </Overlap>
          </Row>
          <Row className="justify-center my-12 sm:mt-0">
            <FancyTextBox
              className="xs:px-0"
              grid="row-cols-1 row-cols-lg-2"
              themeColor="col-12 col-lg-6 col-md-8 col-sm-10 mb-[30px] xs:mb-[15px] md:gap-x-[15px]"
              theme="fancy-text-box-03"
              data={fancyTextBoxData}
              animation={fadeIn}
            />
          </Row>
          <Clients
            grid="row-cols-1 row-cols-md-2 row-cols-sm-2 row-cols-lg-4 mt-32 xs:mt-24"
            theme="client-logo-style-02"
            data={ClientData02}
            animation={fadeIn}
          />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section
        className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/img/webp/home-freelancer-img-06.webp)",
        }}
        {...fadeIn}
      >
        <Container>
          <Row className="justify-center relative">
            <m.div
              className="flex flex-col md:mb-[50px] col-lg-5 col-md-8"
              {...fadeIn}
            >
              <h1 className="font-serif font-semibold text-darkgray -tracking-[2px] flex flex-col md:mb-20">
                <span className="text-border text-border-color-black text-border-width-2px opacity-30">
                  Start
                </span>{" "}
                projects?
              </h1>
              <div className="freelancer-social-icon mt-auto">
                <span className="font-serif font-semibold text-xmd text-darkgray uppercase block mb-[25px]">
                  Contact info
                </span>
                <p className="mb-0 font-sans w-[50%]">
                  401 Broadway, 24th Floor, &nbsp; Orchard View, London, UK
                </p>
                <p className="font-sans">
                  <span className="font-medium text-darkgray">Tel:</span> 123
                  456 7890{" "}
                </p>
                <p className="font-sans mb-[25px]">
                  <span className="font-medium text-darkgray">Email:</span>
                  <a
                    aria-label="gamil"
                    href="mailto:brian@domain.com"
                    className="hover:text-darkgray"
                  >
                    {" "}
                    brian@domain.com
                  </a>
                </p>
                <SocialIcons
                  theme="social-icon-style-01"
                  size="md"
                  iconColor="dark"
                  className="justify-start"
                  data={SocialIconDataForm.slice(0, 4)}
                />
              </div>
            </m.div>
            <m.div
              className="col-lg-6 col-md-8 offset-lg-1 overflow-hidden"
              {...{ ...fadeIn, transition: { delay: 0.5 } }}
            >
              <h2 className="heading-5 font-serif font-semibold text-darkgray mb-20 -tracking-[1px]">
                Let's get in touch with us
              </h2>
              <Formik
                initialValues={{ name: "", email: "", phone: "", comment: "" }}
                validationSchema={ContactFormStyle02Schema}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true);
                  actions.resetForm();
                  const response = await sendEmail(values);
                  response.status === "success" && resetForm(actions);
                }}
              >
                {({ isSubmitting, status }) => (
                  <Form>
                    <Input
                      showErrorMsg={false}
                      type="text"
                      name="name"
                      labelClass="mb-[15px]"
                      className="pt-[18px] pb-[19px] w-full bg-transparent border-b border-solid border-[#ededed]"
                      placeholder="Your name"
                    />
                    <Input
                      showErrorMsg={false}
                      type="email"
                      name="email"
                      labelClass="mb-[15px]"
                      className="pt-[18px] pb-[19px] w-full bg-transparent border-b border-solid border-[#ededed]"
                      placeholder="Your email address"
                    />
                    <Input
                      showErrorMsg={false}
                      type="tel"
                      name="phone"
                      labelClass="mb-[15px]"
                      className="pt-[18px] pb-[19px] w-full bg-transparent border-b border-solid border-[#ededed]"
                      placeholder="Mobile number"
                    />
                    <TextArea
                      className="mb-[35px] py-[20px] pr-[36px] w-full bg-transparent border-b border-solid border-[#ededed] resize-none text-[#a6aabe]"
                      rows="6"
                      name="comment"
                      placeholder="How can we help you?"
                    ></TextArea>
                    <Buttons
                      ariaLabel="Send Message"
                      type="submit"
                      className={`tracking-[1px] btn-fancy rounded-none font-medium uppercase${
                        isSubmitting ? " loading" : ""
                      }`}
                      themeColor={["#5cc088", "#e7a965", "#5cc088"]}
                      size="md"
                      color="#fff"
                      title="Send Message"
                    />
                    <AnimatePresence>
                      {status && (
                        <m.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <MessageBox
                            className="mt-[20px] py-[10px]"
                            theme="message-box01"
                            variant="success"
                            message="Your message has been sent successfully!"
                          />
                        </m.div>
                      )}
                    </AnimatePresence>
                  </Form>
                )}
              </Formik>
            </m.div>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/*Custom Footer Start */}
      <footer className="py-[50px] border-t border-[#ededed]">
        <Container>
          <Row className="items-center">
            <Col lg={5} md={6} className="sm:mb-[15px] md:order-2">
              <ul className="flex xs:flex-col sm:text-center sm:justify-center gap-x-[35px] md:gap-x-[20px] gap-y-[7px]">
                <li>
                  <Link
                    aria-label="link for"
                    to="/about-us"
                    className="hover:text-darkgray"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="link for"
                    to="/our-services"
                    className="hover:text-darkgray"
                  >
                    Our services
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="link for"
                    to="/portfolio-switch-image-four-column"
                    className="hover:text-darkgray"
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="link for"
                    to="/contact-us-classic"
                    className="hover:text-darkgray"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </Col>
            <Col
              lg={2}
              md={12}
              className="md:order-1 text-center md:mb-[20px] flex justify-center items-center"
            >
              <Link aria-label="link for" to="/" className="footer-logo">
                <img
                  src="/assets/img/webp/logo-black.webp"
                  alt=""
                  width="111"
                  height="36"
                />
              </Link>
            </Col>
            <Col lg={5} md={6} className="md:order-2 text-right sm:text-center">
              <p>
                © {new Date().getFullYear()} Litho is Proudly Powered by{" "}
                <a
                  aria-label="footer themezaa"
                  href="https://www.themezaa.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 text-darkgray hover:text-darkgray font-medium"
                >
                  ThemeZaa
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
      {/* Footer End */}
    </div>
  );
};

export default FreelancerPage;
