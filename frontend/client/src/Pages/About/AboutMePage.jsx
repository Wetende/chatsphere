import React from 'react'

// Libraries
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { Col, Container, Row, Navbar } from 'react-bootstrap'
import { Form, Formik } from 'formik';
import { AnimatePresence, m } from 'framer-motion'

// Components
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import IconWithText from '../../Components/IconWithText/IconWithText'
import SocialIcons from '../../Components/SocialIcon/SocialIcons'
import ProgressBar from '../../Components/Progressbar/ProgressBar'
import Overlap from '../../Components/Overlap/Overlap'
import Tab02 from '../../Components/Tab/Tab02'
import PortfolioOverlay from '../../Components/Portfolio/PortfolioOverlay'
import Clients from '../../Components/Clients/Clients'
import Blockquote from '../../Components/BlockQuote/Blockquote'
import { Input } from '../../Components/Form/Form'
import MessageBox from '../../Components/MessageBox/MessageBox';
import FooterStyle01 from '../../Components/Footers/FooterStyle01'
import Buttons from '../../Components/Button/Buttons'
import SideButtons from "../../Components/SideButtons";
import { fadeIn } from '../../Functions/GlobalAnimations'
import Counter from '../../Components/Counters/Counter'
import { resetForm, sendEmail } from '../../Functions/Utilities';


// Data
import { FilterData } from '../../Components/Portfolio/PortfolioData';
const iconData = [
  {
    color: "rgba(255,255,255,0.5)",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "rgba(255,255,255,0.5)",
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  },
  {
    color: "rgba(255,255,255,0.5)",
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble"
  },

  {
    color: "rgba(255,255,255,0.5)",
    link: "https://www.pinterest.com/",
    icon: "fab fa-pinterest-p"
  },
  {
    color: "rgba(255,255,255,0.5)",
    link: "https://www.linkedin.com/",
    icon: "fab fa-linkedin-in"
  },
]

const iconData1 = [
  {
    color: "#0038e3",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "#0038e3",
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble"
  },
  {
    color: "#0038e3",
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  },
  {
    color: "#0038e3",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram"
  },
  {
    color: "#0038e3",
    link: "https://www.linkedin.com/",
    icon: "fab fa-linkedin-in"
  },
]

const IconWithTextData = [
  {
    icon: "line-icon-Air-Balloon text-fastblue text-[40px]",
    title: "Logo Design",
    content: "Lorem ipsum is simply dummy text of the printing typesetting lorem ipsum been text",
  },
  {
    icon: "line-icon-Archery-2 text-fastblue text-[40px]",
    title: "Social Marketing",
    content: "Lorem ipsum is simply dummy text of the printing typesetting lorem ipsum been text",
  },
  {
    icon: "line-icon-Knight text-fastblue text-[40px]",
    title: "Graphics Design",
    content: "Lorem ipsum is simply dummy text of the printing typesetting lorem ipsum been text",
  },
]

const ProgressBarData = [
  {
    title: "Pixel perfect design",
    value: "90",
  },
  {
    title: "Web development",
    value: "94",
  },
  {
    title: "Graphic design",
    value: "95",
  },
  {
    title: "Typography",
    value: "86",
  },
]

const TabData = [
  {
    tabTitle: 'Development',
    tabicons: "ti-light-bulb",
    subtitle: 'Transform your ideas. We know that good design means good business.',
    img: 'https://via.placeholder.com/800x550',
    title: 'We are idea driven, working with a strong focus on design and user experience.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud exercitation ullamco laboris.',
    buttonTitle: "watch a projects",
    buttonLink: "#"
  },
  {
    tabTitle: 'Performance',
    tabicons: "ti-timer",
    img: 'https://via.placeholder.com/800x550',
    title: 'We are idea driven, working with a strong focus on design and user experience.',
    subtitle: 'Transform your ideas. We know that good design means good business.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud exercitation ullamco laboris.',
    buttonTitle: "watch a projects",
    buttonLink: "#"
  },
  {
    tabTitle: 'Analytics',
    tabicons: "ti-pie-chart",
    img: 'https://via.placeholder.com/800x550',
    title: 'We are idea driven, working with a strong focus on design and user experience.',
    subtitle: 'Transform your ideas. We know that good design means good business.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud exercitation ullamco laboris.',
    buttonTitle: "watch a projects",
    buttonLink: "#"
  },
  {
    tabTitle: 'Concept',
    tabicons: "ti-crown",
    img: 'https://via.placeholder.com/800x550',
    title: 'We are idea driven, working with a strong focus on design and user experience.',
    subtitle: 'Transform your ideas. We know that good design means good business.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud exercitation ullamco laboris.',
    buttonTitle: "watch a projects",
    buttonLink: "#"
  },
]

const PortfolioOverlayData = [
  {
    title: "Daimler Financial",
    img: "https://via.placeholder.com/800x650",
    category: [""],
    subtitle: "Brochure",
    link: "/portfolio/single-project-page-01"
  },
  {
    title: "Waterlly Lake",
    img: "https://via.placeholder.com/800x650",
    category: ["branding"],
    subtitle: "Branding",
    link: "/portfolio/single-project-page-02"
  },
  {
    title: "Bill Gardner",
    img: "https://via.placeholder.com/800x650",
    category: ["branding", "graphics"],
    subtitle: "Photography",
    link: "/portfolio/single-project-page-03"
  },
  {
    title: "Jeremy Dupont",
    img: "https://via.placeholder.com/800x650",
    category: ["logos", "photography"],
    subtitle: "Photography",
    link: "/portfolio/single-project-page-04"
  },
  {
    title: "Armchair Mojo",
    img: "https://via.placeholder.com/800x650",
    category: ["Photography", "branding"],
    subtitle: "Photography",
    link: "/portfolio/single-project-page-05"
  },
  {
    title: "The Manchester",
    img: "https://via.placeholder.com/800x650",
    category: ["graphics", "branding"],
    subtitle: "Photography",
    link: "/portfolio/single-project-page-01"
  },
  {
    title: "Everyday Needs",
    img: "https://via.placeholder.com/800x650",
    category: ["logos", "graphics"],
    subtitle: "Identity",
    link: "/portfolio/single-project-page-02"
  },
  {
    title: "Mass Productions",
    img: "https://via.placeholder.com/800x650",
    category: ["logos", "photography"],
    subtitle: "Branding",
    link: "/portfolio/single-project-page-03"
  },
  {
    title: "Mass Productions",
    img: "https://via.placeholder.com/800x650",
    category: ["logos", "photography"],
    subtitle: "Photography",
    link: "/portfolio/single-project-page-04"
  },
  {
    title: "Truenorth Web",
    img: "https://via.placeholder.com/800x650",
    category: ["logos", "photography"],
    subtitle: "Identity",
    link: "/portfolio/single-project-page-05"
  },
  {
    title: "The Simplest",
    img: "https://via.placeholder.com/800x650",
    category: ["graphics", "branding"],
    subtitle: "Identity",
    link: "/portfolio/single-project-page-01"
  },
  {
    title: "Designblast Design",
    img: "https://via.placeholder.com/800x650",
    category: ["graphics"],
    subtitle: "Branding",
    link: "/portfolio/single-project-page-02"
  }
]

const fancyTextBox = [
  {
    icon: { text: "2013" },
    title: "Winning award",
    description: "for creative design",
  },
  {
    icon: { text: "2014" },
    title: "Nominee for jury",
    description: "in awwwards.com",
  },
  {
    icon: { text: "2018" },
    title: "Creative designer",
    description: "in apple design",
  }
]

const ClientData = [
  {
    img: 'https://via.placeholder.com/232x110',
    target: "_blank",
    link: 'https://business.adobe.com/products/magento/magento-commerce.html'
  },
  {
    img: 'https://via.placeholder.com/232x110',
    target: "_blank",
    link: 'https://www.awwwards.com/'
  },
  {
    img: 'https://via.placeholder.com/232x110',
    target: "_blank",
    link: 'https://colorlib.com/'
  },
  {
    img: 'https://via.placeholder.com/232x110',
    target: "_blank",
    link: 'https://www.pingdom.com/'
  }
]

const AboutMePage = (props) => {
  return (
    <div style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav fluid="fluid" theme="dark" expand="lg" className="px-[35px] py-[0px] md:px-0">
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0 xs:px-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <div className="col-auto hidden order-last md:block">
            <Navbar.Toggle className="md:ml-[10px] sm:ml-0">
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
            </Navbar.Toggle>
          </div>
          <Navbar.Collapse className="col-auto px-0 justify-end">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto text-right pe-0">
            <SearchBar className="pr-0" />
            <HeaderLanguage />
            <HeaderCart />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <section className="p-0 bg-cover bg-center relative" style={{ backgroundImage: "url('https://via.placeholder.com/1903x800')" }}>
        <Container className="relative h-[800px] md:h-[600px] sm:h-[400px]">
          <Row className="items-center h-full md:pb-40 sm:pb-0">
            <Col lg={{ span: 6, offset: 6 }} sm={{ span: 7, offset: 5 }}>
              <h2 className="font-serif text-white -tracking-[1px] mb-[40px] xs:mb-[25px] font-medium xs:text-center">I'm <span className="text-decoration-line-bottom-thick">brian wilson</span></h2>
              <p className="w-3/4 md:w-full xs:w-4/5 font-serif text-white leading-[30px] opacity-70 font-light text-xmd mb-10 block xs:mx-auto xs:text-center">I'm a UI/UX designer and front end developer from victoria, australia. I hold a master degree of web design from the world university.</p>
              <div className="text-left xs:text-center">
                <SocialIcons size="sm" theme="social-icon-style-01" className="justify-start xs:justify-center" iconColor="light" data={iconData} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="justify-center flex sm:box-shadow-none sm:border-b sm:border-mediumgray">
        <Container>
          <Row>
            <Overlap className="sm:mt-0">
              <IconWithText
                grid="row-cols-1 row-cols-md-3 gap-y-[30px] text-center bg-white relative p-16 shadow-[0_0_15px_rgba(0,0,0,0.1)] sm:shadow-none md:justify-center sm:border-b"
                className="about-me-icon-with-text px-[10px]"
                theme="icon-with-text-03"
                data={IconWithTextData}
                animation={fadeIn} />
            </Overlap>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[130px] lg:py-[90px] md:py-[75px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="items-center">
            <Col lg={{ span: 4, offset: 1 }} className="md:mb-20">
              <span className="font-serif text-basecolor flex items-center mb-[15px]">
                <span className="h-[1px] inline-block bg-basecolor w-[10%] mr-[15px]"></span>
                Accomplished skills
              </span>
              <h5 className="text-darkgray font-medium font-serif block mb-[25px]">We are the agency behind the design</h5>
              <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since.</p>
            </Col>
            <Col lg={{ span: 5, offset: 1 }} className="mb-[30px]">
              <ProgressBar
                theme="progressbar-style-01 about-me-progressbar"
                data={ProgressBarData}
                height="4px"
                color="#0038e3"
                trailColor="#E9ECEF"
                className="text-sm"
              />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] xs:py-[50px]"{...fadeIn}>
        <Container>
          <Row>
            <Col>
              <Tab02 data={TabData} className="about-me-page-tab" />
            </Col>
          </Row>
        </Container>
      </m.section>

      {/* Section Start */}
      <section className="pt-[130px] lg:pt-[90px] md:pt-[75px] xs:pt-[50px] overflow-hidden">
        <Container fluid className="xs:px-0">
          <Row>
            <Col>
              <PortfolioOverlay
                title={<span className="font-serif text-darkgray heading-6 font-medium mb-0">Recent work</span>}
                overlay={["#556fff", "#b263e4", "#e05fc4", "#f767a6", "#ff798e"]}
                grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large"
                filterData={FilterData}
                className="about-me-portfolio-overlay"
                data={PortfolioOverlayData.slice(0, 8)}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[130px] lg:py-[90px] md:py-[75px]-tb sm:py-[40px]" {...fadeIn}>
        <Container>
          <Row className="items-center justify-center">
            <Col md={2} className="text-center md:text-start sm:mb-[10px] md:inline-block sm:hidden">
              <span className="w-full h-[1px] inline-block align-middle bg-basecolor"></span>
            </Col>
            <Col lg={7} md={6} sm={8} className="text-left sm:text-center sm:mb-[30px]">
              <span className="text-xlg font-serif text-darkgray lg:text-lg md:leading-[26px]">We create digital ideas that are <span className="font-semibold">bigger, braver and better.</span></span>
            </Col>
            <Col lg={3} md={4} className="sm:justify-center sm:flex">
              <Buttons ariaLabel="button" to="/portfolio/portfolio-colorful-masonry" className="mx-[10px] rounded-none font-medium font-serif uppercase bg-[#fff] hover:text-white" themeColor="#000" size="lg" color="#000" icon="fas fa-arrow-right right-icon" iconPosition="after" title="Explore litho" />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] bg-lightgray" {...fadeIn}>
        <Container>
          <Row className="items-center justify-center about-me-counter">
            <Col lg={5} md={8} sm={10} className="md:mb-[5.5rem]">
              <Row xs={1} className="gap-y-10 fancy-text-box-03">
                {
                  fancyTextBox.map((item, i) => {
                    return (
                      <Col key={i}>
                        <div className="text-box-content">
                          <div className="text-box flex justify-center items-center">
                            {item.icon && (
                              <Counter
                                as="h4"
                                theme="counter-style-01"
                                className="text-center md:text-start text-fastblue heading-4 mb-0 w-[110px] xs:w-full"
                                data={[
                                  {
                                    number: {
                                      text: `${item.icon.text}`
                                    },
                                  }
                                ]}
                                duration={3}
                                animation={fadeIn}
                              />
                            )}
                            <div className="fancy-box-wrapper">
                              {item.title && <span className="font-serif font-medium text-darkgray">{item.title}</span>}
                              {item.description && <p>{item.description}</p>}
                            </div>
                          </div>
                        </div>
                      </Col>
                    )
                  })
                }
              </Row>
            </Col>
            <Col lg={7} xl={{ span: 6, offset: 1 }} className="text-center md:text-start">
              <Row>
                <Col md={{ span: 9, offset: 3 }} >
                  <h5 className="font-serif mb-12 font-medium text-darkgray lg:text-start sm:text-center xs:w-full xs:m-[0_auto] xs:mb-12">A smiling story <span className="font-semibold  underline underline-offset-8">about me</span></h5>
                </Col>
              </Row>
              <Row className="text-right">
                <Col md={3} className="font-serif text-darkgray sm:text-center xs:mb-[5px]">about me</Col>
                <Col md={9} className="mb-[2.5rem] text-left sm:text-center">Hi there, I am a Brian Wilson creative developer and designer, I enjoy building beautiful and thoughtful experiences. I like to mix code surprising visuals and pleasing interactions.
                  <div className="w-full h-[1px] bg-darkgray mt-[2.5rem] opacity-10"></div>
                </Col>
                <Col md={3} className="font-serif text-darkgray sm:text-center xs:mb-[5px]">current job</Col>
                <Col md={9} className=" mb-[2.5rem] text-left sm:text-center">Currently working with good people and pushing <a aria-label="envoto" className="text-darkgray underline" rel="noreferrer" href="https://envato.com" target="_blank">envato studio</a> in beautiful King Street, Melbourne, Australia.
                  <div className="w-full h-[1px] bg-darkgray mt-[2.5rem] opacity-10"></div>

                </Col>
                <Col md={3} className="font-serif text-darkgray sm:text-center xs:mb-[5px]">expertise</Col>
                <Col md={9} className="text-left sm:text-center">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since.</Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Container className="mt-[110px] md:mt-[5.5rem]">
          <Row className="items-center justify-center">
            <Col sm="auto" className="text-center sm:mb-[10px]">
              <span className="font-serif">On social networks</span>
            </Col>
            <Col sm="auto" className="text-center">
              <SocialIcons size="sm" theme="social-icon-style-06" className="justify-start sm:justify-center" iconColor="dark" data={iconData1} animation={fadeIn} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[100px] md:py-[75px]-tb sm:py-[40px]">
        <Container>
          <Row>
            <Col>
              <Clients
                carousel={true}
                carouselOption={{
                  slidesPerView: 1,
                  loop: true,
                  spaceBetween: 20,
                  autoplay: { delay: 3000, disableOnInteraction: false },
                  navigation: false,
                  breakpoints: { 1200: { slidesPerView: 4 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 3 } }
                }}
                grid="row row-cols-1 row-cols-lg-4 row-cols-sm-2"
                theme="client-logo-style-03"
                data={ClientData}
                animation={fadeIn}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section Start */}
      <m.section className="overflow-hidden" {...fadeIn}>
        <Container fluid>
          <Row >
            <Col xl={{ span: 3, order: 1 }} lg={{ span: 5, order: 2 }} xs={{ order: 1 }} className="about-me-blockquote bg-gradient-to-tr from-[#0039e3] via-[#5e28dd] to-[#8600d4]">
              <Blockquote
                className="h-full font-medium flex flex-col justify-center"
                theme="blockquote-style-01"
                title="Architecture tends to consume everything else it has become one's entire life."
                icon="ti-quote-left"
                author="- ARNE JACOBSEN"
              />
            </Col>
            <Col xl={{ span: 5, order: 2 }} lg={{ span: 12, order: 1 }} xs={{ order: 2 }} className="cover-background lg:h-[500px] sm:h-[300px] bg-cover" style={{ backgroundImage: "url('https://via.placeholder.com/960x700')" }}></Col>
            <Col xl={4} lg={7} xs={{ order: 3 }} className="bg-darkgray p-28 xl:p-12 lg:p-24">
              <Row className="justify-center">
                <Col className="col-md mb-8 sm:mb-12">
                  <h6 className="font-serif text-white">Our digital marketing and business education journey!</h6>
                </Col>
              </Row>
              <Row md={2} className="sm:block">
                <Col className="mb-12">
                  <div className="font-serif text-white mb-[5px] flex">
                    <span className="w-[10px] h-[1px] bg-white self-center relative -top-[1px] mr-[10px] shrink-0"></span>
                    <div className="grow-1">University of design</div></div>
                  <p className="md:w-[70%] xs:w-full">Lorem ipsum is simply dummy text the printing industry.</p>
                </Col>
                <Col className="mb-[3.5rem]">
                  <div className="font-serif text-white mb-[5px] flex">
                    <span className="w-[10px] h-[1px] bg-white self-center relative -top-[1px] mr-[10px] shrink-0"></span>
                    <div className="grow-1">Design university</div></div>
                  <p className="md:w-[70%] xs:w-full">Lorem ipsum is simply dummy text the printing industry.</p>
                </Col>
                <Col className="sm:mb-[3.5rem]">
                  <div className="font-serif text-white mb-[5px] flex">
                    <span className="w-[10px] h-[1px] bg-white self-center relative -top-[1px] mr-[10px] shrink-0"></span>
                    <div className="grow-1">Master of branding</div></div>
                  <p className="md:w-[70%] xs:w-full">Lorem ipsum is simply dummy text the printing industry.</p>
                </Col>
                <Col>
                  <div className="font-serif text-white mb-[5px] flex">
                    <span className="w-[10px] h-[1px] bg-white self-center relative -top-[1px] mr-[10px] shrink-0"></span>
                    <div className="grow-1">UK design institute</div></div>
                  <p className="md:w-[70%] xs:w-full">Lorem ipsum is simply dummy text the printing industry.</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="about-me-subscribe py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col className="text-center" md={7} lg={6} xs={12}>
              <span className="text-basecolor text-lg mb-[15px] md:text-xmd inline-block">Love to work together</span>
              <h5 className="font-serif font-medium -tracking-[0.5px] text-darkgray inline-block mb-[60px] sm:mb-[30px]">Are you ready to work with us? Let's grow your business.</h5>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col md={8} className="flex justify-center">
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
                  <div className="relative subscribe-style-02 w-4/5 md:w-full">
                    <Form className="relative">
                      <Input showErrorMsg={false} type="email" name="email" className="border-[1px] medium-input border-solid border-transparent !pr-[175px] xs:!pr-[32px]" placeholder="Enter your email address" />
                      <button type="submit" className={`text-xs tracking-[1px] py-[12px] px-[28px] uppercase${isSubmitting ? " loading" : ""}`}>Start a project</button>
                    </Form>
                    <AnimatePresence>
                      {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-[115%] left-0 w-full"><MessageBox className="py-[5px] rounded-[100px] text-center z-[1]" theme="message-box01" variant="success" message="Your message has been sent successfully subscribed to our email list!" /></m.div>}
                    </AnimatePresence>
                  </div>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="bg-[#262b35] text-slateblue" />
      {/* Footer End */}
    </div>

  )
}

export default AboutMePage