import React, { lazy } from 'react'

// Libraries
import { Link } from 'react-router-dom';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { m } from "framer-motion";

// Components
import { fadeIn, zoomIn } from '../../Functions/GlobalAnimations';
import Buttons from '../../Components/Button/Buttons'
import InteractiveBanners02 from '../../Components/InteractiveBanners/InteractiveBanners02';
import Clients from '../../Components/Clients/Clients';
import Piechart from '../../Components/PieChart/PieChart';
import Testimonials from '../../Components/Testimonials/Testimonials';
import Tab01 from '../../Components/Tab/Tab01';
import Counter from '../../Components/Counters/Counter'
import BlogClassic from '../../Components/Blogs/BlogClassic';
import SocialIcons from '../../Components/SocialIcon/SocialIcons';
import CustomModal from '../../Components/CustomModal'
import Header, { HeaderLanguage, HeaderNav, Menu, SearchBar, Topbar } from '../../Components/Header/Header';
import FooterMenu, { Footer } from '../../Components/Footers/Footer';
import SideButtons from "../../Components/SideButtons";
import Logo from '../../Components/Logo/Logo';

// Data
import { InteractiveBannersData02 } from '../../Components/InteractiveBanners/InteractiveBannersData';
import { TabData01 } from '../../Components/Tab/TabData';
import { IconWithTextData_02 } from '../../Components/IconWithText/IconWithTextData';
import { TestimonialsData03 } from '../../Components/Testimonials/TestimonialsData';
import FooterData from '../../Components/Footers/FooterData';
import { blogData } from '../../Components/Blogs/BlogData';
import InViewPort from '../../Components/InViewPort';

const IconWithText = lazy(() => import('../../Components/IconWithText/IconWithText'))

const SwiperData = [
  {
    img: "https://via.placeholder.com/1920x900  ",
    title: "Create AI chatbots in minutes",
    subtitle: "No-code builder powered by Gemini",
  },
  {
    img: "https://via.placeholder.com/1920x900",
    title: "Train on your data",
    subtitle: "Connect documents, URLs, and websites",
  },
  {
    img: "https://via.placeholder.com/1920x900",
    title: "Embed anywhere",
    subtitle: "Beautiful chat widget with live preview",
  },
]

const PiechartData = [
  {
    percentage: 92,
    title: 'Fast bot creation',
    content: 'Average under 3 minutes from idea to deployment.'
  },
  {
    percentage: 90,
    title: 'Semantic understanding',
    content: '200+ languages with context-aware answers.'
  },
]

const ClientData = [
  {
    img: 'https://via.placeholder.com/300x86'
  },
  {
    img: 'https://via.placeholder.com/300x86'
  },
  {
    img: 'https://via.placeholder.com/300x86'
  },
  {
    img: 'https://via.placeholder.com/300x86'
  }
]

const SocialIconsData = [
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
  }
]

const IconWithTextData = [
  {
    icon: "line-icon-Money-Bag text-basecolor text-[40px]",
    title: "No-code builder",
    content:
      "Create and configure chatbots without writing code.",
  },
  {
    icon: "line-icon-Gear-2 text-basecolor text-[40px]",
    title: "Multi-source training",
    content:
      "Upload PDFs, DOCX, text or crawl websites for knowledge.",
  },
  {
    icon: "line-icon-Talk-Man text-basecolor text-[40px]",
    title: "Customizable widget",
    content:
      "Match your brand with themes and live preview.",
  },
  {
    icon: "line-icon-Cursor-Click2 text-basecolor text-[40px]",
    title: "Analytics that matter",
    content:
      "Track usage, satisfaction and response times.",
  },
];

const CounterData = [
  {
    number: {
      text: "2500",
    },
    content: "BOTS CREATED",
  },
  {
    number: {
      text: "3250",
    },
    content: "DOCUMENTS PROCESSED",
  },
  {
    number: {
      text: "2800",
    },
    content: "CONVERSATIONS HANDLED",
  },
  {
    number: {
      text: "2750",
    },
    content: "AVG. RESPONSE (MS)",
  },
]

// Filter the blog data category wise
const blogClassicdData = blogData.filter((item) => item.blogType === "classic").filter(item => item.category.includes("business"));

const HomeBusinessPage = (props) => {
  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header className="header-with-topbar" topSpace={{ desktop: true }} type="reverse-scroll">
        <Topbar className="bg-lightgray border-b home-business-topbar border-[#0000001a] sm:hidden md:px-0 header-with-topbar border-bottom px-[35px]">
          <Container fluid>
            <Row className="justify-between pl-[15px] lg:pr-[15px] items-center">
              <Col className="col-12 text-center sm:text-start col-sm-auto me-auto ps-lg-0">
                <SocialIcons theme="social-icon-style-01" size="xs" iconColor="dark" data={SocialIconsData} />
              </Col>
              <Col className="col-auto none sm:block text-end lg:px-0">
                <span className="top-bar-contact-list border-l border-inherit	py-[9px] px-[18px] text-[13px] inline-block float-left">
                  <i className="feather-phone-call text-darkgray mr-[6px] text-md relative top-[1px]"></i>  0222 8899900
                </span>
                <span className="border-l border-inherit py-[9px] pl-[18px] text-[13px] inline-block float-left border-r-0 pr-0">
                  <i className="feather-map-pin text-darkgray mr-[6px] text-md relative top-[1px]"></i> 401 Broadway, 24th Floor, San Francisco
                </span>
              </Col>
            </Row>
          </Container>
        </Topbar>
        <HeaderNav fluid="fluid" theme="light" bg="white" menu="light" className="px-[35px] py-[0px] md:px-[15px] sm:px-0" containerClass="md:px-0">
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <Logo />
              </Navbar.Brand>
            </Link>
          </Col>
          <Navbar.Toggle className="order-last md:mx-[15px]">
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="col-auto justify-end p-0">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto text-right !pr-0 pl-[15px] md:pl-0 md:pr-[15px] sm:pr-0">
            <SearchBar className="pl-[17px] xs:px-[15px]" />
            <HeaderLanguage className="pl-[17px] xs:pl-0 xs:pr-0" />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}

      {/* Section Start */}
      <section className="h-[800px] md:h-[400px] sm:h-[300px]">
        <Swiper
          className="slider-nav-dark white-move swiper-pagination-03 swiper-pagination-light swiper-pagination-large h-full"
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ dynamicBullets: false, clickable: true }}
        >
          {
            SwiperData.map((item, i) => {
              return (
                <SwiperSlide key={i} style={{ backgroundImage: `url(${item.img})` }} className="bg-no-repeat	bg-cover	overflow-hidden relative bg-center">
                  <div className="absolute h-full w-full top-0 left-0 bg-[#232323] opacity-60"></div>
                  <Container className="h-full">
                    <Row className="h-full">
                      <Col xl={6} lg={7} sm={8} xs={12} className="h-full text-white font-serif justify-center flex-col relative flex">
                        <p className="mb-[40px] font-light text-xmd opacity-70 xs:mb-[20px]">{item.subtitle}</p>
                        <h2 className="mb-[55px] font-semibold xs:mb-[35px]">{item.title}</h2>
                        <div className="inline-block">
                          <Buttons href="https://1.envato.market/AL7Oj" target="_blank" className="btn-fancy text-xs tracking-[1px] font-serif font-medium rounded-none py-[12px] mr-[30px] uppercase md:mb-[15px] sm:mb-0" themeColor="#22c55e" size="md" color="#fff" title="GET STARTED" />
                          <Buttons to="/page/our-process" size="md" className="!pt-0 px-0 pb-[2px] relative border-b-[2px] bg-transparent m-auto after:h-[2px] after:bg-white font-serif text-[13px] tracking-[0.5px] hover:text-white uppercase btn-link md:mb-[15px] mb-[15px]" color="#fff" title="HOW IT WORKS" />
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
      <section className="py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row className="justify-center">
            <m.div className="col-xl-3 col-lg-4 col-sm-7 flex flex-col md:mb-24" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
              <div className="mb-[20px] md:text-center sm:mb-[10px]">
                <span className="font-serif text-md uppercase font-medium text-kyrogreen">About KyroChat</span>
              </div>
              <h3 className="alt-font text-darkgray font-semibold mb-[20px] font-serif md:text-center md:mb-[30px] heading-5">We combine AI, retrieval, and great UX to power chatbots</h3>
              <div className="mt-auto mx-auto mx-lg-0">
                <Buttons href="/" className="font-medium font-serif uppercase bg-[#fff] hover:bg-black rounded-none md:mb-[15px] text-xxs btn-fancy xs:mb-0" color="#000" size="sm" themeColor="#000" title="Discover KyroChat" />
              </div>
            </m.div>
            <Col xl={{ span: 7, offset: 2 }} lg={8}>
              <IconWithText grid="row-cols-1 row-cols-lg-2 row-cols-sm-2 gap-y-[40px]" theme="icon-with-text-01" data={IconWithTextData} animation={fadeIn} animationDelay={0.2} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Lazy Load HTML */}
      <InViewPort>
        {/* Section Start */}
        <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:[50px] bg-[#f7f8fc] overflow-hidden">
          <Container>
            <Row className="justify-center">
              <m.div className="col-xl-5 col-lg-6 col-md-8 col-sm-7 mb-20 text-center md:mb-[60px] sm:[44px]" {...fadeIn}>
                <span className="mb-[20px] font-medium text-md font-serif uppercase inline-block text-kyrogreen">Why choose us</span>
                <h4 className="font-semibold -tracking-[1px] text-darkgray font-serif block heading-5">Build, train, and deploy AI chatbots fast</h4>
              </m.div>
            </Row>
          </Container>
          <Container>
            <InteractiveBanners02
              carousalOption={{
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: { delay: 2500, disableOnInteraction: false },
                breakpoints: { 1200: { slidesPerView: 4 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }
              }}
              data={InteractiveBannersData02}
              animation={fadeIn}
              animationDelay={0}
            />
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[130px] lg:py-[90px] home-business-piechart md:py-[75px] sm:[50px]">
          <Container>
            <Row className="justify-center md:block">
              <Col lg={5} sm={9} className="text-left flex-col items-start flex md:text-center md:my-0 md:mx-auto md:mb-[70px] md:items-center sm:mb-[65px]">
                <div className="mb-[20px]">
                  <span className="inline-block font-serif text-md font-medium uppercase text-kyrogreen">Our expertise</span>
                </div>
                <h5 className="w-[90%] mb-[20px] font-semibold text-darkgray font-serif sm:mb-[30px] xxs:w-full">We build AI chat experiences that engage the right customers</h5>
                <Buttons href="/" className="font-medium font-serif uppercase rounded-none bg-[#fff] hover:bg-black md:mb-[15px] mt-[38px] sm:my-0 sm:mx-auto" color="#000" size="sm" themeColor="#000" title="Discover KyroChat" />
              </Col>
              <Col lg={{ offset: 1 }}>
                <Piechart
                  grid="justify-center gap-y-10 row-cols-1 row-cols-sm-2"
                  className="text-left flex flex-col justify-center items-start md:text-center md:items-center"
                  theme="piechart-style-02"
                  data={PiechartData}
                  pathColor={["#22c55e", "#a7f3d0"]}
                  trailColor="#f5f5f5"
                  pathWidth={13}
                  trailWidth={13}
                  animation={fadeIn}
                />
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        <hr />
        {/* Section Start */}
        <m.section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
          <Container>
            <Tab01 data={TabData01} />
          </Container>
        </m.section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] bg-[#f7f8fc]">
          <Container>
            <Row className="justify-center">
              <m.div className="col-xl-6 col-lg-7 col-sm-8 mb-20 text-center w-[51%] xl:mb-[70px] lg:mb-[65px] md:mb-[60px] sm:mb-[55px] md:w-[68%] xs:w-full" {...fadeIn}>
                <span className="inline-block font-serif text-md uppercase mb-[20px] font-medium text-kyrogreen xs:mb-[15px]">our premium services</span>
                <h5 className="w-full mb-[20px] font-semibold text-darkgray font-serif -tracking-[1px]">KyroChat specializes in AI chatbots and innovative integrations</h5>
              </m.div>
            </Row>
            <Row className="justify-center">
              <Col lg={12} md={9} xs={12}>
                <IconWithText grid="row-cols-1 row-cols-lg-2 gap-y-10 justify-center" theme="icon-with-text-02" data={IconWithTextData_02} animation={fadeIn} animationDelay={0.2} />
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section
          className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] relative bg-cover bg-center"
          style={{ backgroundImage: `url("https://via.placeholder.com/1920x1100")` }}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-60 bg-darkslateblue"></div>
          <Container className="relative">
            <Row className="justify-center text-center">
              <Col xl={7} lg={8} md={10}>
                <div className="font-serif text-white">

                  {/* Modal Component Start */}
                  <CustomModal.Wrapper
                    modalBtn={
                      <m.span className="inline-block" {...{ ...zoomIn, transition: { type: "spring", stiffness: 200 } }}>
                        <Buttons ariaLabel="youtube video" type="submit" className="btn-sonar border-0 mx-auto mb-14" themeColor="#3452ff" color="#fff" size="lg" title={<i className="icon-control-play" />} />
                      </m.span>
                    }
                  >
                    <div className="w-[1020px] max-w-full relative rounded mx-auto">
                      <div className="fit-video">
                        <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                      </div>
                    </div>
                  </CustomModal.Wrapper>
                  {/* Modal Component End */}

                  <m.h4 className="font-semibold mb-[45px]" {...{ ...fadeIn, transition: { delay: 0.2 } }}>Build and embed AI chatbots for your website</m.h4>
                  <m.span className="uppercase tracking-[1px]" {...{ ...fadeIn, transition: { delay: 0.4 } }}>secure, fast, and customizable</m.span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[100px] lg:py-[90px] md:py-[75px]">
          <Container className="text-center">
            <Counter
              as="h4"
              theme="counter-style-02"
              grid="row-cols-1 row-cols-md-4 row-cols-sm-2 gap-y-10 items-center justify-center gap-y-10"
              className="text-black text-[70px]"
              data={CounterData}
              duration={2}
              animation={fadeIn}
            />
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="bg-[#f7f8fc] py-[130px] lg:py-[90px] md:py-[75px] sm:[50px]">
          <Container>
            <Row className="justify-center">
              <m.div className="col-xl-5 col-lg-6 col-sm-8 mb-20 text-center" {...fadeIn}>
                <span className="inline-block font-serif text-md uppercase mb-[20px] font-medium text-kyrogreen">What customers are saying</span>
                <h3 className="w-full mb-[20px] font-semibold text-darkgray font-serif heading-5">What our customers say about KyroChat</h3>
              </m.div>
            </Row>
            <Row className='sm:justify-center sm:flex'>
              <Col md={12} sm={8}>
                <Testimonials
                  grid="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-sm-8 gap-y-10 justify-center"
                  theme='testimonials-style-03'
                  data={TestimonialsData03}
                  animation={fadeIn}
                />
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        <hr />
        {/* Section Start */}
        <section className="bg-[#f7f8fc] py-[100px] lg:py-[90px] md:py-[75px]">
          <Container>
            <Row className="justify-center">
              <Col lg={11}>
                <Clients grid="row-cols-2 row-cols-lg-6 row-cols-sm-3 md:gap-10 xs:gap-y-[50px] justify-between md:justify-center" theme="client-logo-style-05" data={ClientData} animation={fadeIn} />
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
          <Container>
            <Row className="justify-center">
              <m.div className="col-xl-5 col-lg-6 col-sm-8 mb-16 text-center" {...fadeIn}>
                <span className="inline-block font-serif text-md uppercase mb-[20px] font-medium text-kyrogreen">Get the latest insights</span>
                <h4 className="w-full mb-[20px] font-semibold text-darkgray font-serif heading-5">Stay updated with the latest trends and business news</h4>
              </m.div>
            </Row>
            <Row>
              <Col>
                <BlogClassic
                  pagination={false}
                  link="/blog-types/blog-standard-post/"
                  data={blogClassicdData}
                  grid="blog-wrapper grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
                />
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

        {/* Footer Start */}
        <Footer className="bg-[#262b35] text-slateblue" theme="dark">
          <div className="py-[7%] lg:py-[8%] sm:py-[50px]">
            <Container>
              <Row className="justify-between md:justify-center sm:justify-between">
                <Col className="m-0 md:text-center sm:text-start" lg={{ offSet: 0, span: 3, order: 0 }} sm={{ span: 6, order: 5, offSet: 2 }} md={{ span: 4, offset: 0, order: 5 }} xs={{ span: 12, order: 5, offSet: 2 }}>
                  <Link to="/" className="text-slateblue mb-[15px] mt-[5px] inline-block">
                    <Logo textColor="text-white" />
                  </Link>
                  <p className="mb-[25px] text-slateblue sm:w-[90%] md:mb-[15px] md:text-center sm:text-start">KyroChat helps you create, train, and deploy AI chatbots.</p>
                  <p>© Copyright {new Date().getFullYear()} <Link to="/" className="underline underline-offset-4 text-white font-normal">KyroChat</Link></p>
                </Col>
                <FooterMenu data={FooterData.slice(0, 4)} lg={{ span: 2, offSet: 1, order: 0 }} md={{ span: 3, order: 0 }} sm={{ span: 4, offSet: 1, order: 2 }} className="xl:px-[15px] md:mb-[40px] xs:mb-[25px]" titleClass="capitalize" />
              </Row>
            </Container>
          </div>
        </Footer>
        {/* Footer End */}
      </InViewPort>
    </div>
  )
}

export default HomeBusinessPage