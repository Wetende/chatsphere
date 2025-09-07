import React, { lazy } from 'react'

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { AnimatePresence, m } from 'framer-motion'
import { Link } from "react-router-dom";
import { Parallax } from 'react-scroll-parallax';
import { Form, Formik } from 'formik';
import { Link as ScrollTo } from "react-scroll"

// Component
import { fadeIn, zoomIn } from '../../Functions/GlobalAnimations';
import SocialIcons from '../../Components/SocialIcon/SocialIcons';
import { Header, HeaderNav, Menu } from "../../Components/Header/Header";
import Lists from '../../Components/Lists/Lists';
import Team from '../../Components/Team/Team';
import Testimonials from '../../Components/Testimonials/Testimonials';
import Buttons from '../../Components/Button/Buttons'
import { ContactFormStyle02Schema } from '../../Components/Form/FormSchema';
import { Input, TextArea } from '../../Components/Form/Form'
import MessageBox from '../../Components/MessageBox/MessageBox';
import CustomModal from '../../Components/CustomModal'
import SideButtons from "../../Components/SideButtons";
import { resetForm, sendEmail } from "../../Functions/Utilities";

// Data
import { TestimonialsData04 } from '../../Components/Testimonials/TestimonialsData';

const IconWithText = lazy(() => import('../../Components/IconWithText/IconWithText'))

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

const IconWithTextData = [
  {
    icon: "line-icon-Timer icon-medium text-[#00b8b8] text-[40px]",
    title: "24 Hours service",
    content: "Lorem ipsum dolor conctetur adipiscing eiusmod tempor",
  },
  {
    icon: "line-icon-Doctor icon-medium text-[#00b8b8] text-[40px]",
    title: "Qualified doctors",
    content: "Lorem ipsum dolor conctetur adipiscing eiusmod tempor",
  },
  {
    icon: "line-icon-Coin icon-medium text-[#00b8b8] text-[40px]",
    title: "Affordable prices",
    content: "Lorem ipsum dolor conctetur adipiscing eiusmod tempor",
  },
]

const ListData = [
  {
    icon: "fas fa-check",
    title: "Advanced technology dental care",
    content: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    icon: "fas fa-check",
    title: "Our best qualified dentist team",
    content: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    icon: "fas fa-check",
    title: "Emergency dental care services",
    content: "Lorem ipsum dolor sit amet consectetur",
  }
]

const IconWithTextData01 = [
  {
    img: "/assets/img/home-dentist-icon-02.svg",
    title: "Alignment specialist",
    content: "Lorem ipsum dolor sit consectetur adipiscing incididunt ut labore"
  },
  {
    img: "/assets/img/home-dentist-icon-03.svg",
    title: "Root canal specialist",
    content: "Lorem ipsum dolor sit consectetur adipiscing incididunt ut labore"
  },
  {
    img: "/assets/img/home-dentist-icon-04.svg",
    title: "Cosmetic dentistry",
    content: "Lorem ipsum dolor sit consectetur adipiscing incididunt ut labore"
  },
  {
    img: "/assets/img/home-dentist-icon-05.svg",
    title: "Oral hygiene experts",
    content: "Lorem ipsum dolor sit consectetur adipiscing incididunt ut labore"
  },
  {
    img: "/assets/img/home-dentist-icon-06.svg",
    title: "Live dental advisory",
    content: "Lorem ipsum dolor sit consectetur adipiscing incididunt ut labore"
  },
  {
    img: "/assets/img/home-dentist-icon-07.svg",
    title: "Cavity inspection",
    content: "Lorem ipsum dolor sit consectetur adipiscing incididunt ut labore"
  }
]

const TeamData = [
  {
    img: 'https://via.placeholder.com/800x1002',
    name: 'Alexander Harvard',
    designation: 'Dental surgeon',
    social_links: [
      {
        color: "#828282",
        title: 'facebook',
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f"
      },
      {
        title: 'twitter',
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter"
      },
      {
        title: 'instagram',
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram"
      }
    ]
  },
  {
    img: 'https://via.placeholder.com/800x1002',
    name: 'Bryan Jonhson',
    designation: 'Cosmetic surgeon',
    social_links: [
      {
        title: 'facebook',
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f"
      },
      {
        title: 'twitter',
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter"
      },
      {
        title: 'instagram',
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram"
      }
    ]
  },
  {
    img: 'https://via.placeholder.com/800x1002',
    name: 'Jeremy Dupont',
    designation: 'General doctor',
    social_links: [
      {
        title: 'facebook',
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f"
      },
      {
        title: 'twitter',
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter"
      },
      {
        title: 'instagram',
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram"
      }
    ]
  }
]

const DentistPage = (props) => {

  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav theme="light" expand="lg" containerClass="sm:!px-0" className="py-[0px] px-[35px] md:pr-[15px] md:pl-0 md:py-[20px] border-b border-[#0000001a]" fluid="fluid" >
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Navbar.Toggle className="order-last md:ml-[25px] sm:ml-[17px]" >
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="justify-center col-auto col-lg-8 menu-order px-lg-0">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto col-lg-2 pe-0">
            <SocialIcons theme="social-icon-style-01" size="xs" iconColor="dark" className="justify-end" data={SocialIconsData} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}

      {/* Parallax Start*/}

      <div className="full-screen md:flex md:items-center overflow-hidden relative sm:h-[500px]">
        <Parallax className="lg-no-parallax bg-cover absolute top-[0px] left-0 w-full h-[100vh]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
        <Container fluid className="relative">
          <Row className="h-[100vh] items-center">
            <Col xl={5} lg={{ span: 6, offset: 1 }} md={8} sm={10} className="h-full flex flex-col justify-center md:pl-[35px] xs:pl-[15px]">
              <h1 className="font-serif text-darkgray z-[1] font-semibold tracking-[-2px] w-[80%] xl:w-full mb-[12%] sm:mb-[30px] xs:w-full">We make your smile shine like the sun</h1>
              <div className="inline-block z-[1]">
                <span className="inline-block">
                  <ScrollTo href='#' to="appointment" offset={0} delay={0} spy={true} smooth={true} duration={800}>
                    <Buttons type="submit" ariaLabel="scrollTo" className="btn-fill btn-fancy mr-[35px] tracking-[1px] font-medium font-serif rounded-[4px] uppercase md:mb-[15px]" themeColor="#00b8b8" color="#fff" size="lg" title="Book online" />
                  </ScrollTo>
                </span>
                <span className="font-serif text-xmd text-darkgray inline-block align-middle uppercase border-b border-black font-semibold">Call now 123 456 7890</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Parallax End*/}

      {/* Section Start */}
      <section className="py-[80px] border-b border-mediumgray md:py-[40px]">
        <Container>
          <IconWithText grid="row row-cols-1 row-cols-lg-3 row-cols-sm-2 gap-y-10 justify-center" className="bg-[#fff] dentist-icon-with-text" theme="icon-with-text-01" data={IconWithTextData} animation={fadeIn} animationDelay={0.1} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row className="items-center justify-center">
            <Col xl={6} lg={5} md={10} className="md:mb-20">
              <div className="relative w-[95%] md:w-full">
                <img width="535.8px" height="628.22px" className="rounded-[10px]" src="https://via.placeholder.com/800x938" alt="" data-no-retina="" />
                {/* Modal Component Start */}
                <CustomModal.Wrapper
                  className="absolute top-0 items-center flex h-full right-[-50px] md:right-0 md:justify-center md:w-full"
                  modalBtn={<Buttons ariaLabel="modal btn" type="submit" className="btn-sonar border-0 shadow-[0_0_15px_rgba(0,0,0,0.1)]" themeColor="#fff" color="#00b8b8" size="xl" title={<i className="feather-play text-[35px]" />} />}
                >
                  <div className="w-[1020px] max-w-full relative rounded mx-auto">
                    <div className="fit-video">
                      <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                    </div>
                  </div>
                </CustomModal.Wrapper>
                {/* Modal Component End */}
              </div>
            </Col>
            <Col xl={5} lg={{ span: 6, offset: 1 }} className="md:text-center">
              <img width={95} height={50} className="mb-[50px] rounded-[10px] md:mx-auto" src="/assets/img/home-dentist-icon-01.svg" alt="dentist" />
              <h2 className="heading-3 font-serif font-normal text-darkgray -tracking-[1px] mb-[35px]">The first dental clinic that practices <span className="font-semibold">nontoxic dentistry</span></h2>
              <p className="w-[90%] inline-block mb-[45px] md:w-full">Lorem ipsum dolor sit amet consectetur adipiscing eiusmod tempor incididunt ut labore et dolore magna ut enim ad minim veniam nostrud exercitation.</p>
              <Buttons ariaLabel="About clinic" href="#" className="btn-fill font-medium font-serif tracking-[1px] rounded-[4px] uppercase md:mb-[15px]" themeColor="#00b8b8" color="#fff" size="lg" title="About clinic" />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}


      {/* Section Start */}
      <section id="services" className="bg-[#f0f9f9] py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col xl={6} lg={7} md={8} sm={10} className="text-center mb-24 sm:mb-14">
              <span className="font-serif font-medium text-[#00b8b8] uppercase block mb-[20px] tracking-[1px]">Dental services</span>
              <h2 className="heading-4 font-serif font-semibold text-darkgray tracking-[-1px]">Committed to excellence dental health services</h2>
            </Col>
          </Row>
          <IconWithText className="dentist-iconwithtext" grid="row row-cols-1 row-cols-lg-3 row-cols-sm-2 gap-y-[30px]" theme="icon-with-text-10" data={IconWithTextData01} animation={fadeIn} animationDelay={0.1} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col xl={6} lg={7} md={8} sm={10} className="text-center mb-24 sm:mb-14">
              <span className="font-serif font-medium text-[#00b8b8] uppercase block mb-[20px] tracking-[1px]">OUR SPECIALISTS</span>
              <h2 className="heading-4 font-serif font-semibold text-darkgray tracking-[-1px]">Meet our highly experts qualified doctor team</h2>
            </Col>
          </Row>
          <Team
            themeColor="dark"
            theme="team-style-02"
            className="text-white"
            data={TeamData}
            grid="row row-cols-1 row-cols-sm-2 row-cols-md-3 justify-center gap-y-10"
            animation={fadeIn}
            carousel={false}
            overlay="#00b8b8cc"
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
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section id="appointment">
        <Container fluid>
          <Row>
            <m.div className="col-12 col-lg-6 bg-[#f0f9f9] pl-40 py-16 flex flex-col justify-center xl:pl-[15px] md:p-[66px] xs:px-[15px]" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
              <Row className="justify-center">
                <Col xl={7} md={11} sm={10}>
                  <h2 className="heading-4 font-serif font-semibold tracking-[-1px] text-darkgray mb-20">Why choose us our dental care?</h2>
                  <Lists className="dentist-list" theme="list-style-07 list-style-07>li" data={ListData} animation={fadeIn} />
                  <ScrollTo href='#' to="services" offset={0} delay={0} spy={true} smooth={true} duration={800}>
                    <Buttons type="submit" ariaLabel="services" className="btn-fill btn-fancy font-medium font-serif rounded-[4px] tracking-[1px] uppercase mt-[40px] md:mb-[15px]" themeColor="#00b8b8" color="#fff" size="lg" title="DENTAL SERVICES" />
                  </ScrollTo>
                </Col>
              </Row>
            </m.div>
            <m.div className="col-12 col-lg-6 bg-[#00b8b8] p-40 xl:p-32 lg:p-24 xs:px-[15px]"  {...{ ...fadeIn, transition: { delay: 0.3 } }}>
              <h2 className="heading-3 font-serif text-white font-semibold mb-20 md:mb-[25px]"> <span className="underline underline-offset-[11px] decoration-2 xs:underline-offset-[5px]">Hassle free</span> appointment</h2>
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
                  <Form className="dentist-form">
                    <Input showErrorMsg={false} type="text" name="name" labelClass="mb-[25px]" className="pt-[20px] text-white pr-[36px] pb-[23px] w-full bg-transparent border-b border-solid border-[#ffffff33] text-[16px]" placeholder="Your name" />
                    <Input showErrorMsg={false} type="email" name="email" labelClass="mb-[25px]" className="pt-[20px] text-white pr-[36px] pb-[23px] w-full bg-transparent border-b border-solid border-[#ffffff33] text-[16px]" placeholder="Your email address" />
                    <Input showErrorMsg={false} type="tel" name="phone" labelClass="mb-[25px]" className="pt-[20px] text-white pr-[36px] pb-[23px] w-full bg-transparent border-b border-solid border-[#ffffff33] text-[16px]" placeholder="Mobile number" />
                    <TextArea className="mb-[45px] text-white py-[20px] pr-[36px] w-full bg-transparent border-b border-solid border-[#ffffff33] text-[16px] resize-none" rows="4" name="comment" placeholder="How can we help you?"></TextArea>
                    <Buttons ariaLabel="Book appointment" type="submit" className={`btn-fill font-medium font-serif rounded-[4px] tracking-[1px] uppercase md:mb-[15px] xs:mb-0${isSubmitting ? " loading" : ""}`} themeColor="#fff" color="#000" size="lg" title="Book appointment" />
                    <AnimatePresence>
                      {status && <m.div className="mt-[20px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="relative m-0 rounded-none py-[13px] px-[20px] text-md leading-[22px]" theme="message-box01" variant="success" message="Your message has been sent successfully!" /></m.div>}
                    </AnimatePresence>
                  </Form>
                )}
              </Formik>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col xl={6} lg={7} md={8} sm={10} className="text-center mb-24 sm:mb-14">
              <span className="font-serif font-medium text-[#00b8b8] uppercase block mb-[20px] tracking-[1px]">PATIENT TESTIMONIALS</span>
              <h2 className="heading-4 font-serif font-semibold text-darkgray tracking-[-1px]">Explore our very satisfied clients testimonials</h2>
            </Col>
          </Row>
          <Testimonials grid="row-cols-1 row-cols-md-2 row-cols-lg-3 justify-center mb-36 md:gap-y-[30px] sm:mb-20 xs:mb-10" theme='testimonials-style-04' className="col-sm-8" data={TestimonialsData04} animation={fadeIn} />
          <Row className="justify-center">
            <Col md={8} className="text-center">
              <m.img width={713} height={75} className="mx-auto" src="https://via.placeholder.com/713x75" alt="" {...{ ...zoomIn, transition: { duration: 0.7 } }} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="pt-[80px] md:pt-[40px] bg-[#f0f9f9]">
        <Container>
          <Row className="row-cols-1 row-cols-lg-4 row-cols-sm-2">
            <Col className="text-center md:mb-[40px]">
              <i className="feather-phone-call text-[28px] text-basecolor mb-[30px] sm:mb-[10px] block"></i>
              <div className="text-darkgray text-[15px] font-medium font-serif mb-[10px]">For appointment</div>
              <p className="w-[70%] lg:w-full mx-auto">Phone: 1-800-222-000<br />Fax: 1-800-222-002</p>
            </Col>
            <Col className="text-center md:mb-[40px]">
              <i className="feather-map-pin text-[28px] text-basecolor mb-[30px] sm:mb-[10px] block"></i>
              <div className="text-darkgray text-[15px] font-medium font-serif mb-[10px]">Clinic location</div>
              <p className="w-[75%] lg:w-full md:w-[60%] sm:w-[75%] mx-auto">401 Broadway, 24th Floor New York, NY 10013.</p>
            </Col>
            <Col className="text-center xs:mb-[40px]">
              <i className="feather-mail text-[28px] text-basecolor mb-[30px] sm:mb-[10px] block"></i>
              <div className="text-darkgray text-[15px] font-medium font-serif mb-[10px]">Patient services</div>
              <p className="w-[70%] lg:w-full mx-auto">
                <a aria-label="mail" href="mailto:info@yourdomain.com" className="hover:text-basecolor">info@yourdomain.com</a><br />
                <a aria-label="mail" href="mailto:hr@yourdomain.com" className="hover:text-basecolor">hr@yourdomain.com</a>
              </p>
            </Col>
            <Col className="text-center xs:mb-[40px]">
              <i className="feather-clock text-[28px] text-basecolor text-pink mb-[30px] sm:mb-[10px] block"></i>
              <div className="text-darkgray text-[15px] font-medium font-serif mb-[10px]">Available 24 hours</div>
              <p className="w-[75%] lg:w-full md:w-[60%] sm:w-[75%] mx-auto xs:w-full">Lorem ipsum is simply dummy text printing</p>
            </Col>
          </Row>
          <Row className="items-center">
            <Col className="col-12 border-t border-[#0000001a] mt-[80px] md:mt-[40px] xs:m-0"></Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}


      {/* Footer Start */}
      <footer className="bg-[#f0f9f9] py-[50px]">
        <Container>
          <Row className="items-center">
            <Col className="col-12 text-center">
              <p>© {new Date().getFullYear()} Litho is Proudly Powered by <a aria-label="themezaa" href="https://www.themezaa.com/" target="_blank" rel="noreferrer" className="underline underline-offset-4 text-darkgray">ThemeZaa</a></p>
            </Col>
          </Row>
        </Container>
      </footer>
      {/* Footer End */}
    </div>
  )
}

export default DentistPage