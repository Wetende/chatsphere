import React, { lazy } from 'react'

// Libraries
import { Link } from 'react-router-dom';
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Parallax } from 'react-scroll-parallax'
import { m } from "framer-motion";

// Components
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../../Components/Header/Header';
import Services from '../../Components/Services/Services';
import CustomModal from '../../Components/CustomModal'
import Buttons from '../../Components/Button/Buttons'
import TextBox from '../../Components/TextBox/TextBox';
import { fadeIn } from '../../Functions/GlobalAnimations';
import Overlap from '../../Components/Overlap/Overlap';
import Testimonials from '../../Components/Testimonials/Testimonials';
import Clients from '../../Components/Clients/Clients';
import FooterStyle01 from '../../Components/Footers/FooterStyle01';
import Videos from "../../Components/Videos/Videos";
import SideButtons from "../../Components/SideButtons";

// Data
import { TextBoxData02 } from '../../Components/TextBox/TextBoxData';
import { TestimonialsData01 } from '../../Components/Testimonials/TestimonialsData';

const IconWithText = lazy(() => import('../../Components/IconWithText/IconWithText'))

const IconWithTextData_01 = [
  {
    icon: "line-icon-Life-Safer text-[35px]",
    title: "Daily training workshops",
    content: "Lorem ipsum is a simply text the printing industry typeing industry dummy book."
  },
  {
    icon: "line-icon-Paper-Plane text-[35px]",
    title: "Make ideas happen",
    content: "Lorem ipsum is a simply text the printing industry typeing industry dummy book."
  },
  {
    icon: "line-icon-Shield text-[35px]",
    title: "Strengthen your skills",
    content: "Lorem ipsum is a simply text the printing industry typeing industry dummy book."
  },
]
const IconWithTextData_02 = [
  {
    icon: "line-icon-Crown",
    title: "Cutting edge solutions",
    content: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum is simply dummy text printing and typesetting."
  },
  {
    icon: "line-icon-Cube-Molecule",
    title: "Fresh technology trends ",
    content: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum is simply dummy text printing and typesetting."
  },
  {
    icon: "line-icon-Sand-watch2",
    title: "Fresh technology trends",
    content: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum is simply dummy text printing and typesetting."
  },
  {
    icon: "line-icon-Gear-2",
    title: "Advanced customization options",
    content: "Lorem ipsum is simply dummy text of the printing typesetting lorem ipsum been text."
  },
]

const serviceData = [
  {
    img: "https://via.placeholder.com/800x560",
    title: "Real time analytics",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    img: "https://via.placeholder.com/800x560",
    title: "Google advertising",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  },
  {
    img: "https://via.placeholder.com/800x560",
    title: "Pixel perfect design",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  }
]

const ClientData = [
  {
    img: 'https://via.placeholder.com/225x110',
    target: "_self",
    link: '#'
  },

  {
    img: 'https://via.placeholder.com/225x110',
    target: "_self",
    link: '#'
  },
  {
    img: 'https://via.placeholder.com/225x110',
    target: "_self",
    link: '#'
  },
  {
    img: 'https://via.placeholder.com/225x110',
    target: "_self",
    link: '#'
  },
]
const WhoWeArePage = (props) => {
  return (
    <div className="who-we-are" style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav fluid="fluid" theme="dark" expand="lg" className="px-[35px] py-[0px] md:px-0" containerClass="sm:px-0">
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
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
      {/* Background video section start */}
      <section className="pb-0 h-[700px] md:h-[550px] sm:h-[350px] relative overflow-hidden">
        <Videos
          className="py-[160px] pb-0 xl:py-[120px] md:py-[95px] sm:py-[80px] xs:py-0 h-[700px] md:h-[550px] sm:h-[350px]"
          src="/assets/video/video.mp4"
          loop={true}
          poster="https://via.placeholder.com/1920x1080"
          overlay={["#0039e3", "#4132e0", "#4132e0", "#741bd9", "#8600d4"]}
          opacity="0.8">
          <Container className="h-full">
            <Row className="items-end justify-center h-full">
              <Col xl={6} lg={7} md={10} className="relative z-[2] text-center">
                <span className="mb-[5px] font-serif text-white opacity-60 block xs:mb-[15px]">we are a creative design studio</span>
                <h1 className="text-white font-serif font-medium text-[42px] leading-[49px] mb-20 sm:mb-12 sm:text-[30px] sm:leading-[40px] xs:text-[30px] xs:leading-[40px]">Unleash your creativity and build website </h1>
                <span className="w-[1px] h-[80px] inline-block bg-white mb-20 sm:mb-12 sm:h-[50px]"></span>
              </Col>
            </Row>
          </Container>
        </Videos>
        {/* Background video section end */}
      </section>
      {/* Background video section end */}

      {/* Section Start */}
      <m.section className="pt-[130px] lg:pt-[90px] md:pt-[75px] xs:pt-[50px] overflow-hidden" {...fadeIn}>
        <Container>
          <Row className="items-center">
            <Col xl={5} lg={6} className="pb-12 lg:pb-28 sm:pb-[50px]">
              <div className="text-xmd mb-[20px] font-serif">Browse amazing social media features</div>
              <h5 className="font-serif text-darkgray font-medium mb-[5.5rem]">We offer a full range of digital marketing services!</h5>
              <Row>
                <Col>
                  <div className="flex">
                    <div className="mr-[35px]">
                      <i className="line-icon-Idea-5 text-[50px] text-fastblue"></i>
                    </div>
                    <div className="feature-box-content ">
                      <span className="text-darkgray block mb-[10px] font-serif font-medium">Daily workshops</span>
                      <p className="w-[95%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                  </div>
                </Col>
                <Col className="col-12"><div className="h-[1px] bg-[#ededed] my-[40px] w-full xs:my-[30px]"></div></Col>
                <Col>
                  <div className="flex">
                    <div className="mr-[35px]">
                      <i className="line-icon-Medal-2 text-[50px] text-fastblue"></i>
                    </div>
                    <div className="feature-box-content ">
                      <span className="text-darkgray block mb-[10px] font-serif font-medium">Unlimited layouts and styles</span>
                      <p className="w-[95%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={6} xl={{ offset: 1 }} className="align-self-end text-center text-xl-start">
              <img className="md:mx-auto" loading="lazy" src="https://via.placeholder.com/504x666" width="504" height="666" alt="who-we-are" />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] bg-lightgray md:py-[90px] sm:py-[75px] xs:py-[50px] overflow-hidden">
        <Container>
          <Services grid="row-cols-1 row-cols-lg-3 row-cols-md-2 gap-y-10 justify-center" theme='service-style-03' data={serviceData} animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="px-[25px] py-[130px] overflow-hidden lg:py-[90px] sm:py-[70px] sm:pb-0 xs:py-[50px] xs:px-0">
        <Container>
          <Row className="items-center justify-center">
            <Col lg={4} sm={8} className="text-center text-lg-start md:mb-[50px]">
              <h6 className="font-serif w-[80%] text-darkgray font-medium mb-[20px] lg:w-[90%] md:w-full md:mb-[10px]">We create digital ideas that are bigger, bolder, braver and better.</h6>
              <Buttons ariaLabel="button" to="/page/our-services/" className="text- font-medium font-serif uppercase btn-link after:h-[2px] md:text-md after:bg-fastblue hover:opacity-70" size="md" color="#0038e3" title="Business solutions" />
            </Col>
            <TextBox
              grid="row-cols-1 row-cols-md-2 col-lg-8"
              theme="text-box-style-02 flex-wrap lg:px-0"
              className="sm:mb-[30px] xs:last:mb-0"
              data={TextBoxData02.slice(0, 2)}
              animation={fadeIn} />
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section style={{ background: `url(https://via.placeholder.com/1903x342)` }} className="bg-bottom bg-no-repeat" {...fadeIn}>
        <Container>
          <Row>
            <Col className="text-center">
              <img className="my-0 mx-auto" loading="lazy" src="https://via.placeholder.com/839x418" width="839" height="418" alt="inner-page-header" />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Parallax Scrolling Start */}
      <div className="py-[130px] lg:py-[90px] md:py-[75px] xs:py-[50px] overflow-hidden relative">
        <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1200)` }}></Parallax>
        <div className="absolute h-full w-full opacity-80 top-0 left-0" style={{ backgroundImage: "linear-gradient(to right top,#0039e3,#4132e0,#5e28dd,#741bd9,#8600d4)" }}></div>
        <Container>
          <Row className="justify-center">
            <Col lg={7} sm={9} className="relative text-center mb-[4.5rem]">
              <div className="text-xmd text-white mb-[20px] opacity-60 font-serif">Helping you to increase your site traffic</div>
              <h5 className="font-serif text-white font-medium mb-10 sm:mb-[30px]">We are expert in search engine and social media optimization</h5>
              <Buttons to="/page/contact-modern" className="mx-3 font-medium font-serif uppercase hover:text-darkgray rounded-[50px] bg-transparent btn-slide-right" size="md" color="#fff" themeColor="#fff" title="Increase traffic" />
            </Col>
          </Row>
          <Row className="justify-center">
            <IconWithText
              grid="gap-y-10"
              theme="icon-with-text-01 col-12 col-lg-4 col-md-6 col-sm-9 lg:px-0"
              className="relative"
              data={IconWithTextData_01}
              animation={fadeIn}
              animationDelay={0.1} />
          </Row>
        </Container>
      </div>
      {/* Parallax Scrolling End */}

      {/* Section Start */}
      <section className="pt-[130px] lg:pt-[90px] md:pt-[75px] sm:py-[50px]" {...fadeIn}>
        <Container fluid>
          <Row className="justify-center">
            <Col>
              <img loading="lazy" className="mx-auto" src="https://via.placeholder.com/1490x550" alt="who-we-are" width="1490" height="550" />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section>
        <Container className="xs:px-0">
          <m.div className="row justify-center sm:mx-0"  {...fadeIn}>
            <Overlap value={50}>
              <Col lg={12} className="shadow-[0_0_20px_rgba(0,0,0,0.08)] bg-white items-center justify-center p-24 md:p-12 mx-auto">
                <Row className="items-center justify-center lg:mx-0 xs:px-0 xs:text-center">
                  <Col xl={7} lg={5} md={6} className="md:mb-[50px] sm:mx-[40px] flex justify-center xs:my-[40px]">
                    <div className="inline-block text-center w-[300px] py-14 px-[15px] relative">
                      <div className="border-r-0 border-solid	border-[10px] border-basecolor h-full w-[67px] block absolute bottom-0 left-0"></div>
                      <h1 className="text-[80px] leading-[72px] mb-0 mr-[15px] font-semibold tracking-[-5px] text-darkgray font-serif inline-block align-middle xs:!my-[30px]">28</h1>
                      <div className="w-[40%] leading-[20px] font-medium text-darkgray text-xmd font-serif text-left relative inline-block align-middle sm:w-[35%]">
                        Years experience working
                      </div>
                      <div className="border-l-0 border-solid	border-[10px] border-basecolor h-full w-[67px] block absolute bottom-0 right-0"></div>
                    </div>
                  </Col>
                  <Col xl={5} md={6} sm={11} className="sm:mx-[20px] xs:mx-0 xs:px-0">
                    <span className="font-serif block mb-[15px]">Powerful theme for designer</span>
                    <h5 className="font-serif text-darkgray font-medium mb-[30px] sm:mb-[20px]">
                      <span className="font-semibold">Become a partner</span> of our good company</h5>
                    <p className="mb-[40px] sm:mb-[30px]">Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum is simply dummy text printing and typesetting.</p>
                    <Buttons to="/page/contact-simple" className="btn-fill font-medium font-serif rounded-none uppercase md:mb-[15px]" themeColor="#232323" color="#fff" size="sm" title="Become a partner" />
                  </Col>
                </Row>
              </Col>
            </Overlap>
          </m.div>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[80px] sm:py-[50px] overflow-hidden">
        <Container>
          <Row className="justify-center">
            <Col lg={11} xs={9} className="lg:px-0">
              <IconWithText
                grid="row-cols-1 row-cols-lg-2 gap-y-[30px]"
                theme="icon-with-text-02 who-we-are-icon-with-text-02"
                className=""
                data={IconWithTextData_02}
                animation={fadeIn}
                animationDelay={0.2} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section start */}
      <m.div className="relative overflow-hidden py-[140px] lg:py-[90px] md:py-[75px] sm:py-[50px] sm:px-[15px]" {...fadeIn}>
        <Parallax className="lg-no-parallax bg-cover cover-background absolute top-[-30px] left-0 h-[100vh] lg:h-[64vh] lg:top-[-75px] lg:!translate-y-0 md:h-[60vh] md:-top-[30px] sm:top-0 sm:h-[56vh] xs:h-[50vh] w-full" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1060)` }}></Parallax>
        <div className="top-0 left-0 w-full h-full absolute opacity-75 bg-[#262b35]"></div>
        <Container>
          <Row className="items-center justify-center">
            <Col xl={{ offset: 4, span: 2 }} lg={{ span: 4, offset: 2 }} md={{ order: 2, span: 3, offset: 1 }} className="text-center md:text-start sm:mb-[30px]">
              {/* Modal Component Start */}
              <CustomModal.Wrapper
                modalBtn={
                  <>
                    <Buttons type="submit" className="btn-sonar mx-auto border-0 shadow-[0_0_15px_rgba(0,0,0,0.1)] btn-custom-class who-we-are-bg-color" color="#fff" size="xl" title={<i className="icon-control-play text-[36px] xs:text-[28px]" />} />
                    <span className="relative font-serif text-white uppercase font-medium mt-[15px] leading-[30px] block w-full text-center">Watch a video</span>
                  </>
                } >
                <div className="w-[1020px] max-w-full relative rounded mx-auto">
                  <div className="fit-video">
                    <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                  </div>
                </div>
              </CustomModal.Wrapper>
              {/* Modal Component End */}
            </Col>
            <Col lg={6} md={{ span: 8, order: 1 }} className="relative xs:text-center landscape:md:text-center xs:px-0">
              <span className="text-lg font-serif mb-[25px] block text-white opacity-60 md:text-xmd md:leading-[22px]">Powerful theme for creatives designer</span>
              <h4 className="font-serif text-white font-medium mb-[30px]">we design brand, digital experience that engage the right customers</h4>
              <Buttons href="/page/contact-classic" className="mt-[15px] font-medium rounded-[50px] font-serif uppercase hover:text-darkgray bg-transparent btn-slide-right" size="md" color="#fff" themeColor="#fff" title="Get Started Now" />
            </Col>
          </Row>
        </Container>
      </m.div>
      {/* Section end */}

      {/*Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] xs:py-[50px]">
        <Container>
          <Row className="row justify-center">
            <Col md={6} className="text-center mb-20">
              <span className="font-serif mb-[10px] block uppercase text-md font-medium">What our people say</span>
              <h5 className="font-serif text-darkgray font-medium -tracking-1px">Unique Testimonials</h5>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col xs={12} sm={8} md={12}>
              <Testimonials
                grid="row-cols-1 row-cols-md-2 row-cols-lg-3 justify-center gap-y-[30px] mb-24"
                theme="testimonials-style-01"
                className=""
                data={TestimonialsData01}
                animation={fadeIn} />
            </Col>
          </Row>
          <Clients
            grid="row-cols-1 row-cols-md-2 row-cols-sm-2 row-cols-lg-4"
            theme="client-logo-style-02"
            data={ClientData}
            animation={fadeIn}
          />
        </Container>
      </section>
      {/*Section End */}

      {/* Section start */}
      <m.section className="bg-no-repeat bg-cover overflow-hidden relative visible bg-center py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" style={{ backgroundImage: `url(https://via.placeholder.com/1920x802)` }} {...fadeIn}>
        <Container>
          <Row>
            <Col xl={6} lg={7} className="text-white font-serif">
              <span className="mb-6 inline-block opacity-60">We are a london based creative design studio</span>
              <h3 className="mb-[40px] font-medium">Let's work together to build something great</h3>
              <Buttons className="font-medium relative font-serif uppercase btn-expand" size="lg" color="#fff" themeColor="#03103D" href="mailto:info@yourdomain.com" title="info@yourdomain.com" />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="bg-[#262b35] text-slateblue overflow-visible" />
      {/* Footer End */}
    </div>
  )
}

export default WhoWeArePage