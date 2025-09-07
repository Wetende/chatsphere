import React, { useEffect } from "react";

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik, Form } from 'formik';
import { AnimatePresence, m } from 'framer-motion';
import { Link as ScrollTo } from "react-scroll"

// Component
import { fadeIn } from "../../Functions/GlobalAnimations";
import { Header, HeaderNav } from "../../Components/Header/Header";
import InteractiveBanners04 from "../../Components/InteractiveBanners/InteractiveBanners04";
import PortfolioColorful from "../../Components/Portfolio/PortfolioColorful";
import TestimonialsCarousel03 from "../../Components/TestimonialCarousel/TestimonialsCarousel03";
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import FancyTextBox from '../../Components/FancyTextBox/FancyTextBox'
import CustomModal from '../../Components/CustomModal'
import Buttons from '../../Components/Button/Buttons'
import { Input, TextArea } from '../../Components/Form/Form'
import { TextAnime } from '../../Components/FancyText/FancyText'
import { ContactFormStyle02Schema } from "../../Components/Form/FormSchema";
import MessageBox from "../../Components/MessageBox/MessageBox";
import { resetForm, sendEmail } from "../../Functions/Utilities";
import SideButtons from "../../Components/SideButtons";

// Data
import { fancyTextBox02 } from "../../Components/FancyTextBox/FancyTextBoxData";
import { TestimonialsCarouselData3 } from "../../Components/TestimonialCarousel/TestimonialsCarouselData";
const data = [
  {
    icon: "feather-life-buoy",
    title: "Digital branding",
  },
  {
    icon: "feather-briefcase",
    title: "BRAND STRATEGY",
  },
  {
    icon: "feather-globe",
    title: "WEBSITE DESIGNING",
  },
  {
    icon: "feather-shopping-bag",
    title: "ECOMMERCE TOOL",
  },
];

const InteractiveBannersData = [
  {
    title: "Website design",
    content:
      "Lorem ipsum dolor consectetur adipiscing elit do eiusmod tempor incididunt ut labore dolore",
    img: "https://via.placeholder.com/464x610",
    icon: "line-icon-Add-Window",
  },
  {
    title: "eCommerce experience",
    content:
      "Lorem ipsum dolor consectetur adipiscing elit do eiusmod tempor incididunt ut labore dolore",
    img: "https://via.placeholder.com/464x610",
    icon: "line-icon-Add-Bag",
  },
  {
    title: "Digital platform",
    content:
      "Lorem ipsum dolor consectetur adipiscing elit do eiusmod tempor incididunt ut labore dolore",
    img: "https://via.placeholder.com/464x610",
    icon: "line-icon-Android-Store",
  },
  {
    title: "Interface design",
    content:
      "Lorem ipsum dolor consectetur adipiscing elit do eiusmod tempor incididunt ut labore dolore",
    img: "https://via.placeholder.com/464x610",
    icon: "line-icon-Cursor-Click2",
  },
];

const portfolioColorfulData = [
  {
    title: "Mongolish",
    img: "https://via.placeholder.com/1000x817",
    category: [""],
    subtitle: "Branding",
    link: "/portfolio/single-project-page-01",
    double_col: true,
  },
  {
    title: "Masscoating",
    img: "https://via.placeholder.com/800x653",
    category: [""],
    subtitle: "Photography",
    link: "/portfolio/single-project-page-02",
  },
  {
    title: "Cortifiel",
    img: "https://via.placeholder.com/800x653",
    category: [""],
    subtitle: "Brochure",
    link: "/portfolio/single-project-page-03",
  },
  {
    title: "Everyday",
    img: "https://via.placeholder.com/1000x817",
    category: [""],
    subtitle: "Brochure",
    link: "/portfolio/single-project-page-04",
    double_col: true,
  },
  {
    title: "Scandinavian",
    img: "https://via.placeholder.com/800x653",
    category: [""],
    subtitle: "Branding",
    link: "/portfolio/single-project-page-05",
  },
  {
    title: "The Simplest",
    img: "https://via.placeholder.com/800x653",
    category: [""],
    subtitle: "Website",
    link: "/portfolio/single-project-page-01",
  },
];

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

const OnePageNavigationPage = (props) => {
  
  useEffect(() => {
    let links = document.querySelectorAll(".inner-link");

    links.forEach(item => {
      item.addEventListener("click", () => {
        document.querySelector(".navbar-toggler:not(.collapsed)")?.click()
      })
    })
  }, [])

  return (
    <div style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ desktop: false, md: true }} type="always-fixed" className="one-page-navigation border-b border-[#ffffff1a]">
        <HeaderNav theme="dark" fluid="lg" containerClass="sm:px-0" className="py-[0px]">
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center my-[20px] md:my-[18px] mx-0 ml-[10px]" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-gray.webp' data-rjs='/assets/img/webp/logo-gray@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Col lg={{ order: 2 }} xs={{ order: 3 }} className="md:contents">
            <Navbar.Toggle className="order-last md:ml-[17px] sm:ml-0 md:px-[25px] md:mr-4">
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
            </Navbar.Toggle>
            <Navbar.Collapse className="col-auto col-lg-8 px-lg-0 mx-auto justify-center">
              <ul className="navbar-nav alt-font text-white">
                <li className="nav-item">
                  <ScrollTo to="home" offset={80} delay={0} spy={true} smooth={true} duration={800} className="inner-link nav-link">Home</ScrollTo>
                </li>
                <li className="nav-item">
                  <ScrollTo to="about" offset={80} delay={0} spy={true} smooth={true} duration={800} className="inner-link nav-link">About</ScrollTo>
                </li>
                <li className="nav-item">
                  <ScrollTo to="services" offset={80} delay={0} spy={true} smooth={true} duration={800} className="inner-link nav-link">services</ScrollTo>
                </li>
                <li className="nav-item">
                  <ScrollTo to="portfolio" offset={80} delay={0} spy={true} smooth={true} duration={800} className="inner-link nav-link">Portfolio</ScrollTo>
                </li>
                <li className="nav-item">
                  <ScrollTo to="testimonials" offset={80} delay={0} spy={true} smooth={true} duration={800} className="inner-link nav-link">Testimonials</ScrollTo>
                </li>
                <li className="nav-item">
                  <ScrollTo to="contact" offset={80} delay={0} spy={true} smooth={true} duration={800} className="inner-link nav-link">Contact</ScrollTo>
                </li>
              </ul>
            </Navbar.Collapse>
          </Col>
          <Col lg={{ order: 3 }} xs={{ order: 2 }} className="col-auto col-lg-2 text-end pe-0 font-size-0 !pl-[90px] lg:!pl-[50px] md:!pl-0 md:mr-4">
            <SocialIcons theme="social-icon-style-01" size="xs" className="justify-end" iconColor="light" data={SocialIconsData} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <section style={{ backgroundImage: `url(https://via.placeholder.com/1920x1080)` }} id="home" className="relative h-[100vh] landscape:md:h-[650px] landscape:sm:h-[450px] md:h-[650px] sm:h-[450px] bg-cover">
        <div className="top-0 left-0 absolute w-full h-full bg-darkgray opacity-[0.75]"></div>
        <Container className="relative landscape:h-full">
          <Row className="h-[100vh] items-stretch justify-center md:items-center landscape:h-full md:h-[650px] sm:h-[450px]">
            <Col className="justify-center items-center my-0 mx-auto text-center flex-col flex relative">
              {/* Modal Component Start */}
              <CustomModal.Wrapper
                modalBtn={<Buttons ariaLabel="modal btn" type="submit" className="btn-sonar border-0 mb-[40px]" themeColor="#f4d956" color="#000" size="lg" title={<i className="icon-control-play" />} />} >
                <div className="w-[1020px] max-w-full relative rounded mx-auto">
                  <div className="fit-video">
                    <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                  </div>
                </div>
              </CustomModal.Wrapper>
              {/* Modal Component End */}
              <h1 className="font-bold text-shadow text-shadow-large tracking-[-4px] text-[130px] leading-[120px] font-serif uppercase text-white lg:text-[110px] md:text-[90px] md:leading-[85px] sm:text-[50px] sm:leading-[50px]">
                Awesome
                <br />
                designs
              </h1>
            </Col>
          </Row>
          <ScrollTo to="about" offset={80} delay={0} spy={true} smooth={true} duration={800} className="absolute bottom-[50px] left-1/2">
            <i className="ti-mouse icon-small text-white up-down-ani text-[28px] inline-block"></i>
          </ScrollTo>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section id="about" className="py-[160px] bg-darkgray overflow-hidden lg:pb-0 lg:pt-[120px] md:pt-[90px] sm:py-[80px] xs:pt-[50px]">
        <Container>
          <Row>
            <Col xl={4} lg={5} md={6}>
              <m.h4 className="font-serif font-semibold text-white -tracking-[1px] sm:text-center xxs:mb-[45px]" {...fadeIn}>
                <span className="block p-0 sm:text-center tracking-[-1px]">A creative agency specialized in web</span>
                <TextAnime duration={3000} color="#F4D956" className="rotate-text text-left sm:text-center font-semibold my-0 mx-auto" animation="slide" data={["strategy creation", "customize tools", "generated revenue"]} />
              </m.h4>
            </Col>
            <m.div className="sm:text-center col-xl-5 col-md-6 offset-xl-2 offset-lg-1" {...{ ...fadeIn, transition: { delay: 0.5 } }}>
              <span className="font-serif font-semibold text-white uppercase block mb-[15px]">About litho web agency</span>
              <p className="text-xmd w-[95%] leading-[36px] md:w-full">With years of experience in the website design and development industry pride ourselves on creating unique, creative and quality designs that are developed upon the latest modern coding and developing techniques.</p>
            </m.div>
          </Row>
          <Row className="row-cols-1 row-cols-lg-4 row-cols-sm-2 mt-36 justify-center md:mt-24 landscape:md:mt-12 xs:mt-[65px] gap-y-10">
            {
              data.map((item, i) => {
                return (
                  <m.div key={i} {...{ ...fadeIn, transition: { delay: 0.2 * i } }}>
                    <div className="flex justify-center items-center h-full">
                      <i className={`${item.icon} align-middle text-[28px] text-white mr-[15px]`}></i>
                      <span className="font-serif font-semibold uppercase">{item.title}</span>
                    </div>
                  </m.div>
                )
              })
            }
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section id="services" className="lg:pt-[120px] md:pt-[95px] sm:pt-0 sm:pb-[75px] xs:pb-[50px] bg-darkgray">
        <Container fluid>
          <Row>
            <Col>
              <InteractiveBanners04
                grid="sm:justify-center gap-y-10"
                data={InteractiveBannersData}
                animation={fadeIn}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section id="portfolio" className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] bg-darkgray">
        <Container>
          <Row className="justify-center">
            <Col className="text-center mb-36 md:mb-28 sm:mb-20" md={6}>
              <span className="mb-[10px] font-medium tracking-[1px] text-basecolor font-serif uppercase block">Recent projects</span>
              <h4 className="font-semibold tracking-[1px] text-white font-serif mb-0">Selected portfolio</h4>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col className="sm:px-0">
              <PortfolioColorful
                className="m-0"
                overlay="#232323e6"
                grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
                data={portfolioColorfulData}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section id="testimonials" className="py-[200px] lg:py-[160px] md:py-[110px] sm:py-[50px] bg-darkgray" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col xl={7} md={10}>
              <TestimonialsCarousel03
                className="white-move"
                data={TestimonialsCarouselData3}
                carouselOption={{
                  slidesPerView: 1,
                  loop: true,
                  navigation: false,
                  autoplay: { delay: 2500, disableOnInteraction: false },
                }}
              />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section id="contact" className="bg-darkgray py-[160px] lg:py-[120px] md:py-[95px] border-t border-[#ffffff1a] sm:py-[80px] xs:pt-[50px] xs:pb-0">
        <Container>
          <div className="OnePageNavigationPage-fancytext-box">
            <Row className="justify-center">
              <Col xs={12} sm={8} md={12}>
                <FancyTextBox
                  grid="row-cols-1 row-cols-lg-3 row-cols-md-2 justify-center"
                  theme="fancy-text-box-02"
                  data={fancyTextBox02}
                  img="https://via.placeholder.com/1920x1091"
                  themeColor="dark"
                  animation={fadeIn}
                />
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="xs:py-[50px] pb-[130px] lg:pb-[90px] md:pb-[75px] sm:pb-[50px] bg-darkgray">
        <Container>
          <Row className="justify-center">
            <Col lg={10}>
              <Row className="justify-center">
                <Col className="mb-[4.5rem] text-center">
                  <span className="mb-[5px] tracking-[-0.5px] text-xmd font-serif block">
                    Fill out the form and we’ll be in touch soon!
                  </span>
                  <h4 className="font-semibold text-white font-serif ">
                    How we can help you?
                  </h4>
                </Col>
              </Row>
              <Row className="justify-center">
                <Col>
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
                      <Form>
                        <Row className="flex row-cols-1 row-cols-md-2 relative">
                          <Col className="mb-16">
                            <Input showErrorMsg={false} type="text" name="name" labelClass="mb-[25px]" className="py-[15px] px-[20px] pl-0 text-md bg-white w-full bg-transparent border-b border-solid border-[#ffffff33] border-t-0 border-l-0 border-r-0" placeholder="Your name" />
                            <Input showErrorMsg={false} type="email" name="email" labelClass="mb-[25px]" className="py-[15px] px-[20px] pl-0 bg-white text-md w-full bg-transparent border-b border-solid border-[#ffffff33] border-t-0 border-l-0 border-r-0" placeholder="Your email address" />
                            <Input showErrorMsg={false} type="tel" name="phone" labelClass="mb-[25px]" className="mb-0 py-[15px] px-[20px] pl-0 bg-white w-full text-md bg-transparent border-b border-solid border-[#ffffff33] border-t-0 border-l-0 border-r-0" placeholder="Your mobile" />
                          </Col>
                          <Col className="mb-16">
                            <TextArea
                              className=" border-b border-solid border-[#ffffff33] w-full bg-white h-[206px] py-[15px] pl-0 px-[20px] text-md border-t-0 border-l-0 border-r-0 bg-transparent"
                              rows="6"
                              name="comment"
                              placeholder="Your message"
                            ></TextArea>
                          </Col>
                          <Col className="text-left sm:mb-[20px] flex">
                            <span className="w-[85%] text-sm inline-block text-left lg:w-full sm:text-center">
                              We are committed to protecting your privacy. We will never
                              collect information about you without your explicit
                              consent.
                            </span>
                          </Col>
                          <Col className="text-right sm:text-center justify-end flex items-center sm:justify-center mb-[0px]">
                            <Buttons ariaLabel="link fors" type="submit" className={`tracking-[0.5px] btn-fancy rounded-none btn-fill font-medium uppercase${isSubmitting ? " loading" : ""}`} themeColor="#fff" size="md" color="#232323" title="SEND MESSAGE" />
                          </Col>
                          <Col xl={12}>
                            <AnimatePresence>
                              {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="mt-5" theme="message-box01" variant="success" message="Your message has been sent successfully!" /></m.div>}
                            </AnimatePresence>
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Footer Start */}
      <footer className="bg-darkgray text-[#828282] py-[50px] border-t border-[#ffffff1a]">
        <Container>
          <Row className="items-center">
            <Col lg={{ span: 5, order: 1 }} md={{ span: 6, order: 2 }} sm={{ order: 2 }} xs={{ order: 2 }} className="lg:px-0 sm:mb-[15px]">
              <ul className="flex lg:justify-center md:justify-start sm:justify-center xs:text-center xs:flex-col">
                <li className="nav-item mr-[35px] md:mr-[20px] xs:mb-[7px] mb-0">
                  <ScrollTo to="about" offset={80} delay={0} spy={true} smooth={true} duration={800} className="nav-link text-[#828282]">About</ScrollTo>
                </li>
                <li className="nav-item mr-[35px] md:mr-[20px] xs:mb-[7px] mb-0">
                  <ScrollTo to="services" offset={80} delay={0} spy={true} smooth={true} duration={800} className="nav-link text-[#828282]">Services</ScrollTo>
                </li>
                <li className="nav-item mr-[35px] md:mr-[20px] xs:mb-[7px] mb-0">
                  <ScrollTo to="portfolio" offset={80} delay={0} spy={true} smooth={true} duration={800} className="nav-link text-[#828282]">Portfolio</ScrollTo>
                </li>
                <li className="nav-item mr-[35px] md:mr-[20px] xs:mb-[7px] mb-0">
                  <ScrollTo to="testimonials" offset={80} delay={0} spy={true} smooth={true} duration={800} className="nav-link text-[#828282]">Testimonials</ScrollTo>
                </li>
              </ul>
            </Col>
            <Col lg={{ span: 2, order: 2 }} sm={{ order: 1 }} xs={{ order: 1 }} className="order-1 text-center md:mb-[20px]">
              <Link aria-label="footer home link" to="/" className="flex justify-center">
                <img height="" width="" className="max-h-[36px] md:mb-[10px]" src="/assets/img/webp/logo-white@2x.webp" alt="" />
              </Link>
            </Col>
            <Col lg={5} md={6} className="order-3 text-center md:text-end">
              <p className="text-right sm:text-center">© {new Date().getFullYear()} Litho is Proudly Powered by <a aria-label="themezaa" href="https://www.themezaa.com/" target="_blank" rel="noreferrer" className="underline underline-offset-4 text-white">ThemeZaa</a></p>
            </Col>
          </Row>
        </Container>
      </footer>
      {/* Footer End */}
    </div>
  );
};

export default OnePageNavigationPage;
