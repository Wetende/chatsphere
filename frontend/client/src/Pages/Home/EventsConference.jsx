import React from "react";

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { AnimatePresence, m } from "framer-motion";
import { Link } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link as ScrollTo } from "react-scroll";

// Components
import Header, { HeaderNav, Menu } from "../../Components/Header/Header";
import { fadeIn, pulse } from "../../Functions/GlobalAnimations";
import Accordions from "../../Components/Accordion/Accordion";
import BlogClassic from "../../Components/Blogs/BlogClassic";
import Buttons from "../../Components/Button/Buttons";
import Clients from "../../Components/Clients/Clients";
import CustomModal from "../../Components/CustomModal";
import CountDown from "../../Components/Countdown/Countdown";
import { Input } from "../../Components/Form/Form";
import MessageBox from "../../Components/MessageBox/MessageBox";
import Overlap from "../../Components/Overlap/Overlap";
import Counter from "../../Components/Counters/Counter";
import OverLineIconBox from "../../Components/OverlineIconBox/OverLineIconBox";
import PricingTable03 from "../../Components/PricingTable/PricingTable03";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import Tab06 from "../../Components/Tab/Tab06";
import { resetForm, sendEmail } from "../../Functions/Utilities";
import Team from "../../Components/Team/Team";
import Testimonials from "../../Components/Testimonials/Testimonials";
import { Footer } from "../../Components/Footers/Footer";
import SideButtons from "../../Components/SideButtons";
import InViewPort from "../../Components/InViewPort";

// Data
import { TestimonialsData03 } from "../../Components/Testimonials/TestimonialsData";
import { TabData06 } from "../../Components/Tab/TabData";
import { blogData } from "../../Components/Blogs/BlogData";

const SocialIconsData = [
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
];

const CounterData = [
  {
    number: {
      text: "35",
    },
    title: "VISIONARY SPEAKERS",
  },
  {
    number: {
      text: "32",
    },
    title: "INTERNATIONAL SPONSORS",
  },
  {
    number: {
      text: "25",
    },
    title: "WORKSHOPS WE OFFER",
  },
];

const accordionData = [
  {
    title: "What do you mean by item and end product?",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry ipsum has been the industry's standard dummy text ever when.",
  },
  {
    title: "What are some examples of products?",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry ipsum has been the industry's standard dummy text ever when.",
  },
  {
    title: "Am i allowed to modify that i purchased?",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry ipsum has been the industry's standard dummy text ever when.",
  },
];

const clientData = [
  {
    img: "https://via.placeholder.com/150x43",
  },
  {
    img: "https://via.placeholder.com/150x43",
  },
  {
    img: "https://via.placeholder.com/150x43",
  },
  {
    img: "https://via.placeholder.com/150x43",
  },
];

const TeamData = [
  {
    img: "https://via.placeholder.com/525x639",
    name: "Alexander Smith",
    designation: "Founder",
    social_links: [
      {
        title: "facebook",
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f",
      },
      {
        title: "instagram",
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram",
      },
      {
        title: "twitter",
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter",
      },
    ],
  },
  {
    img: "https://via.placeholder.com/525x639",
    name: "Bryan Lura",
    designation: "Manager",
    social_links: [
      {
        title: "facebook",
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f",
      },
      {
        title: "instagram",
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram",
      },
      {
        title: "twitter",
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter",
      },
    ],
  },
  {
    img: "https://via.placeholder.com/525x639",
    name: "Jemmy Watson",
    designation: "Executive",
    social_links: [
      {
        title: "facebook",
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f",
      },
      {
        title: "instagram",
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram",
      },
      {
        title: "twitter",
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter",
      },
    ],
  },
  {
    img: "https://via.placeholder.com/525x639",
    name: "Betty Dupont",
    designation: "Faculty",
    social_links: [
      {
        title: "facebook",
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f",
      },
      {
        title: "instagram",
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram",
      },
      {
        title: "twitter",
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter",
      },
    ],
  },
  {
    img: "https://via.placeholder.com/525x639",
    name: "Alexander Dev",
    designation: "Engineer",
    social_links: [
      {
        title: "facebook",
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f",
      },
      {
        title: "instagram",
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram",
      },
      {
        title: "twitter",
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter",
      },
    ],
  },
  {
    img: "https://via.placeholder.com/525x639",
    name: "Bryan Jonhson",
    designation: "Coordinator",
    social_links: [
      {
        title: "facebook",
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f",
      },
      {
        title: "instagram",
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram",
      },
      {
        title: "twitter",
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter",
      },
    ],
  },
  {
    img: "https://via.placeholder.com/525x639",
    name: "Jeremy Dupont",
    designation: "Designer",
    social_links: [
      {
        title: "facebook",
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f",
      },
      {
        title: "instagram",
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram",
      },
      {
        title: "twitter",
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter",
      },
    ],
  },
  {
    img: "https://via.placeholder.com/525x639",
    name: "Jhon Harvard",
    designation: "Manager",
    social_links: [
      {
        title: "facebook",
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f",
      },
      {
        title: "instagram",
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram",
      },
      {
        title: "twitter",
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter",
      },
    ],
  },
];

const PriceData = [
  {
    icon: "line-icon-Boy",
    title: "PERSONAL PLAN",
    subtitle: "Basic features",
    price: "$19",
    plans: [
      ` Featured speakers`,
      `Mentor sessions and workshops`,
      `Trade shows and exhibitions`,
      `Networking meet ups`,
    ],
    buttonTitle: "Register now",
    buttonLink: "/page/pricing-packages",
  },
  {
    icon: "line-icon-Business-ManWoman",
    title: "BUSINESS PLAN",
    subtitle: "MOST POPULAR",
    price: "$89",
    plans: [
      `Personalized schedule`,
      `Access to exhibition floor`,
      `Featured speakers`,
      `Opening and closing parties`,
    ],
    buttonTitle: "Register now",
    buttonLink: "/page/pricing-packages",
    popular: {
      isPopular: true,
    },
  },
];

// Filter the blog data category wise
const blogClassicData = blogData
  .filter((item) => item.blogType === "classic")
  .filter((item) => item.category.includes("conference"));

const EventsConferencePage = (props) => {
  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header Start*/}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav
          fluid="fluid"
          theme="dark"
          expand="lg"
          className="py-[0px] px-[35px] md:px-[15px] md:py-[20px] sm:px-0"
        >
          <Col lg={2} sm={6} xs={"auto"} className="mr-auto ps-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img
                  className="default-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-white.webp"
                  data-rjs="/assets/img/webp/logo-white@2x.webp"
                  alt="logo"
                />
                <img
                  className="alt-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-neon-orange.webp"
                  data-rjs="/assets/img/webp/logo-neon-orange@2x.webp"
                  alt="logo"
                />
                <img
                  className="mobile-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-neon-orange.webp"
                  data-rjs="/assets/img/webp/logo-neon-orange@2x.webp"
                  alt="logo"
                />
              </Navbar.Brand>
            </Link>
          </Col>
          <Navbar.Toggle className="order-last md:ml-[25px] sm:ml-[17px]">
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="justify-center col-auto col-lg-8">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col
            lg={2}
            xs={"auto"}
            className="justify-end pe-0 flex items-center"
          >
            <SocialIcons
              theme="social-icon-style-01"
              size="xs"
              iconColor="light"
              data={SocialIconsData}
            />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}

      {/* Parallax Scrolling Start */}
      <div className="md:flex md:items-center overflow-hidden relative landscape:md:h-[600px]">
        <Parallax
          className="lg-no-parallax bg-cover absolute w-full h-[100vh]"
          translateY={[-40, 40]}
          style={{
            backgroundImage: `url(https://via.placeholder.com/1920x1080)`,
          }}
        ></Parallax>
        <div className="absolute h-full w-full opacity-60 top-0 left-0 bg-darkpurple2"></div>
        <Container className="relative">
          <Row className="justify-center">
            <Col
              lg={10}
              md={11}
              xl={9}
              className="flex flex-col justify-center full-screen text-center px-10 xs:px-[15px]"
            >
              <div className="bg-[#241526e6] rounded-[6px] p-[6.5rem] lg:p-5rem] md:p-[4.5rem] sm:px-8">
                <p className="font-serif font-medium uppercase tracking-[3px] text-neonorange mb-[40px] sm:w-full sm:mb-[25px]">
                  The Biggest annual event
                </p>
                <h1 className="font-serif font-semibold -tracking-[3px] text-white mb-14 sm:mb-[20px] xs:-tracking-[.5px] xs:text-[28px] xs:leading-[38px]">
                  Digital business conference event
                </h1>
                <div className="flex flex-row justify-center border-y border-[#ffffff1a] text-center py-[15px] mb-16 xs:block">
                  <div className="mr-[25px] xs:mr-0 sm:mr-[15px]">
                    <i className="feather-calendar text-white mr-[14px]"></i>
                    <span className="text-md text-white font-serif font-medium uppercase inline-block">
                      20 july 2020, wednesday
                    </span>
                  </div>
                  <div>
                    <i className="feather-map-pin text-white mr-[14px]"></i>
                    <span className="text-md text-white font-serif font-medium uppercase inline-block">
                      Broadway, new york, 10013
                    </span>
                  </div>
                </div>
                <ScrollTo
                  href="#"
                  to="ticket-packages"
                  offset={0}
                  delay={0}
                  spy={true}
                  smooth={true}
                  duration={800}
                >
                  <Buttons
                    type="submit"
                    className="btn-fill btn-fancy font-medium font-serif tracking-[1px] rounded-[2px] uppercase md:mb-[15px]"
                    themeColor="#ff7a56"
                    color="#fff"
                    size="lg"
                    title="Register Now"
                  />
                </ScrollTo>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Parallax Scrolling End */}

      {/* Section Start */}
      <section className="py-[160px] overflow-hidden lg:py-[120px] md:pb-[160px] sm:py-[80px]">
        <Container>
          <Row className="items-center mb-[100px] sm:mb-0">
            <m.div
              className="sm:mb-20 col-lg-5 col-md-8 order-lg-1 order-md-2"
              {...{ ...fadeIn, transition: { delay: 0.2 } }}
            >
              <h2 className="heading-4 font-serif font-semibold text-[#262b35] tracking-[-1px] mb-[30px] sm:mb-[20px]">
                What is business annual conference
              </h2>
              <p className="w-[80%] lg:w-full">
                Lorem ipsum dolor amet consectetur adipiscing elit eiusmod
                tempor incididunt labore et dolore magna enim minim veniam
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo.
              </p>
              <blockquote className="w-[80%] border-l-[5px] border-neonorange text-darkgray font-medium text-xmd pl-[30px] md:w-full pr-0 leading-[26px] mb-0 mt-[40px] lg:w-full xs:pl-[20px]">
                I like the quiet life sometimes. I also love a bustling press
                conference sometimes as well.
                <span className="font-serif font-medium text-md text-neonorange uppercase tracking-[1px] block mt-[20px]">
                  fredric martin
                </span>
              </blockquote>
            </m.div>
            <m.div
              className="md:mb-20 col-lg-4 order-lg-2 order-md-1"
              {...{ ...fadeIn, transition: { delay: 0.5 } }}
            >
              <img
                width={360}
                height={443}
                src="https://via.placeholder.com/720x886"
                alt=""
                className="rounded-[6px] w-full"
              />
            </m.div>
            <m.div
              className="eventsconference-counter col-lg-2 col-md-3 order-md-3 offset-md-1"
              {...{ ...fadeIn, transition: { delay: 0.8 } }}
            >
              <Counter
                theme="counter-style-03"
                grid="row-cols-1 gap-y-[25px]"
                as="h3"
                className="heading-4 text-darkgray sm:justify-center font-serif text-left xs:text-center"
                data={CounterData}
                duration={2}
                postfix_sign="+"
              />
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Lazy Load HTML */}
      <InViewPort>
        {/* Section Start */}
        <section className="overflow-visible pb-[160px] bg-lightgray lg:pb-[120px] md:pb-[95px] sm:py-[80px]">
          <Container>
            <Row>
              <Col>
                <Overlap className="container">
                  <m.div
                    {...pulse}
                    className="row items-center justify-center relative bg-neonorange rounded-[6px] py-[4.5rem] px-16 sm:px-0"
                  >
                    <m.div className="col-12 col-xl-3 lg:mb-[40px] lg:text-center px-0">
                      <span className="text-xmd font-serif text-darkgray">
                        Seats are filling up fast!
                      </span>
                      <h2 className="heading-6 font-serif font-semibold text-darkgray tracking-[-.5px] m-0">
                        Not yet registered?
                      </h2>
                    </m.div>
                    <m.div className="col-xs-10 col-sm-12 col-xl-6 col-md-auto text-center px-0 xl:text-end md:mb-[30px] xs:mb-[15px] eventsconference-coundown">
                      <CountDown
                        theme="countdown-style-02 font-serif"
                        className="text-white font-semibold justify-center"
                        date="2025/5/13 12:00:00"
                      />
                    </m.div>
                    <m.div className="col-12 col-lg-3 text-right md:text-center px-0">
                      <ScrollTo
                        href="#"
                        to="ticket-packages"
                        offset={0}
                        delay={0}
                        spy={true}
                        smooth={true}
                        duration={800}
                      >
                        <Buttons
                          type="submit"
                          className="btn-fill font-medium btn-fancy font-serif rounded-[4px] tracking-[1px] uppercase"
                          themeColor="#232323"
                          color="#fff"
                          size="md"
                          title="Book seat now"
                        />
                      </ScrollTo>
                    </m.div>
                  </m.div>
                </Overlap>
              </Col>
            </Row>
            <Row className="justify-center">
              <m.div
                className="text-center mt-[8.5rem] mb-[5.5rem] md:mb-[4.5rem] md:mt-28 col-xl-7 col-lg-8 col-md-9"
                {...fadeIn}
              >
                <span className="font-serif font-medium text-md text-neonorange uppercase tracking-[1px] block mb-[25px]">
                  Why attend conference
                </span>
                <h2 className="heading-4 font-serif font-semibold text-[#262b35] tracking-[-1px]">
                  What is the main goal of the all event organizer management
                </h2>
              </m.div>
            </Row>
            <OverLineIconBox
              grid="row-cols-1 row-cols-lg-3 row-cols-sm-2 justify-center gap-y-10"
              className="border-0 rounded-[6px]"
              animation={fadeIn}
            />
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="p-0 overflow-hidden eventsconference-accordion">
          <Container fluid>
            <Row>
              <m.div
                {...{ ...fadeIn, transition: { delay: 0.2 } }}
                className="cover-background md:h-[550px] sm:h-[400px] xs:h-[300px] col-xl-6 col-lg-5"
                style={{
                  backgroundImage: `url('https://via.placeholder.com/1000x771')`,
                }}
              ></m.div>
              <m.div
                {...{ ...fadeIn, transition: { delay: 0.3 } }}
                className="py-[9.5rem] px-[10.5rem] bg-darkpurple2 xl:p-20 md:p-28 xs:px-12 col-xl-6 col-lg-7"
              >
                <span className="font-serif font-medium text-md text-neonorange uppercase tracking-[1px] block mb-[30px] xs:mb-[20px]">
                  Don't miss this amazing conference
                </span>
                <h2 className="heading-4 font-serif font-medium text-white mb-[5.5rem] lg:mb-[4.5rem] tracking-[-1px] w-[90%] xl:w-full xs:mb-14">
                  Don’t miss out on the fun and join the business community!
                </h2>
                <Accordions
                  data={accordionData}
                  theme="accordion-style-04"
                  className=""
                  animation={fadeIn}
                  themeColor="dark"
                />
              </m.div>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
          <Container>
            <Clients
              grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-[50px]"
              theme="client-logo-style-05"
              data={clientData}
              animation={fadeIn}
            />
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="bg-lightgray py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
          <Container>
            <m.div
              {...{ ...fadeIn, transition: { delay: 0.2 } }}
              className="row justify-center"
            >
              <Col
                lg={6}
                md={8}
                sm={9}
                className="text-center mb-[108px] md:mb-16"
              >
                <h2 className="heading-4 font-serif font-semibold text-[#262b35] tracking-[-1px] mb-[15px]">
                  Event schedule
                </h2>
                <p className="w-[75%] mx-auto lg:w-[95%] sm:w-full xs:mb-[15px]">
                  Lorem ipsum dolor amet consectetur eiusmod tempor incididunt
                  labore magna nostrud exercitation.
                </p>
              </Col>
            </m.div>
            <m.div
              className="eventsconference-tab"
              {...{ ...fadeIn, transition: { delay: 0.4 } }}
            >
              <Tab06 data={TabData06} />
            </m.div>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
          <Container>
            <Row className="justify-center">
              <m.div
                className="text-center mb-24 md:mb-16 col-lg-6 col-md-8 col-sm-9"
                {...fadeIn}
              >
                <h2 className="heading-4 font-serif font-semibold text-[#262b35] tracking-[-1px] mb-[15px]">
                  Meet our speakers
                </h2>
                <p className="w-[75%] mx-auto lg:w-[95%] sm:w-full">
                  Lorem ipsum dolor amet consectetur eiusmod tempor incididunt
                  labore magna nostrud exercitation.
                </p>
              </m.div>
            </Row>
            <Team
              className="eventsconference-team"
              themeColor="dark"
              overlay={[
                "#2b0859e6",
                "#4a1856e6",
                "#7f3558e6",
                "#c85c57e6",
                "#ff7a56e6",
              ]}
              theme="team-style-03 mb-[30px]"
              data={TeamData}
              grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-1"
              animation={fadeIn}
              animationDelay={0.1}
              carousel={false}
            />
            <Row className="mt-[7%]">
              <Col className="text-center">
                <m.span
                  className="text-xlg font-serif text-darkgray -tracking-[.5px] xs:text-lg"
                  {...fadeIn}
                >
                  Year's biggest business conference with{" "}
                  <span className="-tracking-[.5px] inline-block font-semibold">
                    most renowned keynote speakers of present day
                  </span>
                </m.span>
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <div className="py-[160px] md:flex md:items-center overflow-hidden relative lg:pb-[120px] md:py-[95px] sm:py-[80px]">
          <Parallax
            className="lg-no-parallax bg-cover absolute left-0 w-full h-[100vh] top-0"
            translateY={[-40, 40]}
            style={{
              backgroundImage: `url(https://via.placeholder.com/1920x1285)`,
            }}
          ></Parallax>
          <div className="absolute h-full w-full opacity-60 top-0 left-0 bg-gradient-to-tr from-[#2f0959] via-[#5c2359] to-[#fd7956]"></div>
          <Container>
            <m.div
              className="row justify-center"
              {...{ ...fadeIn, transition: { delay: 0.4 } }}
            >
              <Col lg={7} sm={9} className="relative text-center">
                {/* Modal Component Start */}
                <CustomModal.Wrapper
                  modalBtn={
                    <span className="inline-flex flex-row items-center justify-center">
                      <Buttons
                        ariaLabel="modal button"
                        type="submit"
                        className="btn-sonar mx-auto border-0 mr-[15px] mb-14"
                        themeColor="#ff7a56"
                        color="#fff"
                        size="lg"
                        title={<i className="icon-control-play text-[26px]" />}
                      />
                    </span>
                  }
                >
                  <div className="w-[1020px] max-w-full relative rounded mx-auto">
                    <div className="fit-video">
                      <iframe
                        width="100%"
                        height="100%"
                        className="shadow-[0_0_8px_rgba(0,0,0,0.06)]"
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
                <h2 className="font-serif text-white font-semibold mb-12">
                  Welcome to digital business conference
                </h2>
                <p className="text-white font-medium font-serif uppercase tracking-[3px]">
                  The biggest annual event
                </p>
              </Col>
            </m.div>
          </Container>
        </div>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[130px] overflow-hidden bg-lightgray lg:py-[90px] md:py-[75px] sm:py-[50px]">
          <Container>
            <Row className="justify-center">
              <Col
                lg={6}
                md={8}
                sm={9}
                className="text-center mb-[95px] md:mb-16"
              >
                <h2 className="heading-4 font-serif font-semibold text-[#262b35] tracking-[-1px] mb-[15px]">
                  Loved by our delegates
                </h2>
                <p className="w-[75%] mx-auto lg:w-[95%] sm:w-full">
                  Lorem ipsum dolor amet consectetur eiusmod tempor incididunt
                  labore magna nostrud exercitation.
                </p>
              </Col>
            </Row>
            <Row className="justify-center">
              <Col md={12} sm={8}>
                <Testimonials
                  grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-[30px] justify-center eventsconference-testimonials"
                  theme="testimonials-style-03"
                  data={TestimonialsData03}
                  animation={fadeIn}
                />
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section
          id="ticket-packages"
          className="pricingtable-eventsconference py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]"
        >
          <Container>
            <m.div className="row items-center justify-center" {...fadeIn}>
              <Col lg={4} md={8} className="md:text-center md:mb-24">
                <span className="font-serif font-medium text-md text-neonorange uppercase tracking-[1px] block mb-[25px]">
                  Ticket packages
                </span>
                <h2 className="heading-4 font-serif font-semibold text-[#262b35] tracking-[-1px] mb-[30px] xs:w-full">
                  Flexible and predictable pricing plans
                </h2>
                <p className="w-[85%] mb-[40px] md:w-full xs:mb-[25px]">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit do
                  eiusmod tempor incididunt ut labore et dolore magna ut enim.
                </p>
                <Buttons
                  to="/page/pricing-packages"
                  className="btn-fill btn-fancy font-medium font-serif rounded-[4px] uppercase md:mb-[15px] mb-0"
                  themeColor="#232323"
                  color="#fff"
                  size="md"
                  title="Pricing plans"
                />
              </Col>
              <Col lg={{ span: 7, offset: 1 }} className="switch-tab">
                <PricingTable03
                  className="lg:pt-6 xs:pt-0"
                  grid="row-cols-1 row-cols-md-2 justify-center gap-y-10 gx-0 items-center pr-[25px] md:px-[25px] xs:px-0"
                  theme="pricing-table-style-03"
                  data={PriceData}
                />
              </Col>
            </m.div>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[130px] overflow-hidden border-t border-mediumgray lg:py-[90px] md:py-[75px] sm:py-[50px]">
          <Container>
            <Row className="justify-center">
              <Col lg={6} md={8} sm={9} className="text-center mb-24 md:mb-12">
                <h2 className="heading-4 font-serif font-semibold text-[#262b35] tracking-[-1px] mb-[15px]">
                  From the news
                </h2>
                <p className="w-[75%] mx-auto lg:w-[95%] sm:w-full">
                  Lorem ipsum dolor amet consectetur eiusmod tempor incididunt
                  labore magna nostrud exercitation.
                </p>
              </Col>
            </Row>
            <div className="eventesconference-blog">
              <BlogClassic
                pagination={false}
                grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-double-extra-large"
                data={blogClassicData.slice(0, 4)}
              />
            </div>
          </Container>
        </section>
        {/* Section End */}

        <m.section
          className="py-[100px] md:py-[75px] sm:py-[50px] relative bg-cover bg-fixed bg-center lg:bg-local"
          style={{
            backgroundImage:
              "url('https://via.placeholder.com/1920x677')",
          }}
          {...fadeIn}
        >
          <div className="absolute top-0 left-0 h-full w-full bg-darkpurple2 opacity-80 z-[1]"></div>
          <Container className="relative z-[2]">
            <Row className="justify-center items-center">
              <Col
                xl={5}
                lg={6}
                sm={8}
                className="lg:text-center md:mb-[30px] "
              >
                <h2 className="heading-6 font-serif font-medium text-white mb-0 text-left md:text-center">
                  Don't miss this amazing big events conference and
                  opportunities!
                </h2>
              </Col>
              <Col
                xl={{ span: 5, offset: 2 }}
                lg={{ span: 5, offset: 1 }}
                sm={9}
              >
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email("Invalid email.")
                      .required("Field is required."),
                  })}
                  onSubmit={async (values, actions) => {
                    actions.setSubmitting(true);
                    const response = await sendEmail(values);
                    response.status === "success" && resetForm(actions);
                  }}
                >
                  {({ isSubmitting, status }) => (
                    <div className="relative subscribe-style-05">
                      <Form className="relative">
                        <Input
                          showErrorMsg={false}
                          type="email"
                          name="email"
                          className="border-[1px] large-input border-solid rounded-[4px] border-transparent"
                          placeholder="Enter your email address"
                        />
                        <button
                          type="submit"
                          className={`text-xs py-[12px] px-[28px] !font-semibold !leading-[18px] uppercase xs:flex xs:justify-center xs:items-center xs:text-center${
                            isSubmitting ? " loading" : ""
                          }`}
                        >
                          <i className="far fa-envelope text-neonorange text-sm leading-none mr-[10px] xs:mr-0"></i>
                          Subscribe
                        </button>
                      </Form>
                      <AnimatePresence>
                        {status && (
                          <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-[115%] left-0 w-full"
                          >
                            <MessageBox
                              className="rounded-[4px] text-md py-[10px] px-[22px]"
                              theme="message-box01"
                              variant="success"
                              message="Your message has been sent successfully subscribed to our email list!"
                            />
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </Formik>
              </Col>
            </Row>
          </Container>
        </m.section>

        {/* Section Start */}
        <m.section
          className="bg-darkpurple2 py-[80px] md:py-[40px]"
          {...fadeIn}
        >
          <Container>
            <Row className="row-cols-1 row-cols-lg-4 row-cols-sm-2 md:gap-y-10 text-center">
              <m.div
                {...{ ...fadeIn, transition: { delay: 0.6 } }}
                className="col"
              >
                <i className="feather-map-pin text-[28px] text-basecolor mb-[25px] sm:mb-[10px] block"></i>
                <div className="text-white uppercase text-md font-medium font-serif tracking-[1px] mb-[10px]">
                  EVENT VENUES
                </div>
                <p className="w-[75%] lg:w-full md:w-[60%] sm:w-[75%] mx-auto text-[#fff] opacity-40">
                  401 Broadway, 24th Floor New York, NY 10013.
                </p>
              </m.div>
              <m.div
                {...{ ...fadeIn, transition: { delay: 0.8 } }}
                className="col"
              >
                <i className="feather-phone-call text-[28px] text-basecolor mb-[25px] sm:mb-[10px] block"></i>
                <div className="text-white uppercase text-md font-medium font-serif tracking-[1px] mb-[10px]">
                  Let's Talk
                </div>
                <p className="w-[70%] lg:w-full mx-auto text-[#fff] opacity-40">
                  Phone: 1-800-222-000
                  <br />
                  Fax: 1-800-222-002
                </p>
              </m.div>
              <m.div
                {...{ ...fadeIn, transition: { delay: 1 } }}
                className="col"
              >
                <i className="feather-mail text-[28px] text-basecolor mb-[25px] sm:mb-[10px] block"></i>
                <div className="text-white uppercase text-md font-medium font-serif tracking-[1px] mb-[10px] sm:mb-0">
                  Tickets info
                </div>
                <p className="w-[70%] lg:w-full mx-auto">
                  <a
                    aria-label="mail"
                    href="mailto:info@yourdomain.com"
                    className="hover:text-white text-[#fff] opacity-40"
                  >
                    info@yourdomain.com
                  </a>
                  <br />
                  <a
                    aria-label="mail"
                    href="mailto:hr@yourdomain.com"
                    className="hover:text-white text-[#fff] opacity-40"
                  >
                    hr@yourdomain.com
                  </a>
                </p>
              </m.div>
              <m.div
                {...{ ...fadeIn, transition: { delay: 1.2 } }}
                className="col"
              >
                <i className="feather-globe text-[28px] text-basecolor text-pink mb-[25px] sm:mb-[10px] block"></i>
                <div className="text-white uppercase text-md font-medium font-serif tracking-[1px] mb-[10px]">
                  Event details
                </div>
                <p className="w-[75%] lg:w-full md:w-[60%] sm:w-[75%] mx-auto text-[#fff] opacity-40">
                  Lorem ipsum is simply dummy text printing
                </p>
              </m.div>
            </Row>
          </Container>
        </m.section>
        {/* Section End */}

        {/* Footer Start */}
        <m.div {...{ ...fadeIn, transition: { delay: 0.3 } }}>
          <Footer className="text-[#ffffff66] py-[50px] border-[#ffffff1a] border-t bg-darkpurple2 items-center">
            <Container>
              <Row className="justify-between items-center">
                <Col
                  lg={{ span: 5, order: 1 }}
                  md={{ span: 6, order: 2 }}
                  xs={{ span: 12, order: 2 }}
                  className="sm:mb-[15px] sm:items-center"
                >
                  <ul className="flex xs:flex-col xs:text-center sm:justify-center">
                    <li className="mr-[35px] xs:m-0 xs:mb-[7px]">
                      <Link className="hover:text-white" to="/page/about-us">
                        About event
                      </Link>
                    </li>
                    <li className="mr-[35px] xs:m-0 xs:mb-[7px]">
                      <Link className="hover:text-white" to="/page/our-team">
                        Speaker
                      </Link>
                    </li>
                    <li className="mr-[35px] xs:m-0 xs:mb-[7px]">
                      <Link
                        className="hover:text-white"
                        to="/blogs/blog-classic"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/page/contact-classic"
                        className="hover:text-white xs:m-0 xs:mb-[7px]"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col
                  lg={{ span: 2, order: 2 }}
                  md={{ span: 12, oreder: 1 }}
                  xs={{ span: 12, order: 1 }}
                  className="sm:mb-[20px] flex justify-center md:mb-[15px]"
                >
                  <Link to="/">
                    <img
                      src="/assets/img/webp/logo-white.webp"
                      alt="logo"
                      width="111"
                      height="36"
                    />
                  </Link>
                </Col>
                <Col
                  lg={{ span: 5, order: 3 }}
                  md={{ span: 6, order: 2 }}
                  xs={{ span: 12, order: 3 }}
                  className="text-right sm:mb-[20px]"
                >
                  <p className="mb-0 sm:text-center">
                    © {new Date().getFullYear()} Litho is Proudly Powered by{" "}
                    <a
                      aria-label="themezaa"
                      rel="noreferrer"
                      href="https://www.themezaa.com/"
                      className="text-white underline underline-offset-4"
                      target="_blank"
                    >
                      {" "}
                      ThemeZaa
                    </a>
                  </p>
                </Col>
              </Row>
            </Container>
          </Footer>
        </m.div>
        {/* Footer End */}
      </InViewPort>
    </div>
  );
};

export default EventsConferencePage;
