import React, { useRef, useState } from "react";

// Libraries
import { Link } from "react-router-dom";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Autoplay } from "swiper/modules";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax } from "react-scroll-parallax";
import { AnimatePresence, m } from "framer-motion";

// Components
import Header, {
  HeaderCart,
  HeaderLanguage,
  HeaderNav,
  Menu,
  SearchBar,
} from "../../Components/Header/Header";
import { fadeIn } from "../../Functions/GlobalAnimations";
import BlogClean from "../../Components/Blogs/BlogClean";
import BlogStandard from "../../Components/Blogs/BlogStandard";
import BlogGrid from "../../Components/Blogs/BlogGrid";
import MessageBox from "../../Components/MessageBox/MessageBox";
import { Input } from "../../Components/Form/Form";
import FooterStyle01 from "../../Components/Footers/FooterStyle01";
import SideButtons from "../../Components/SideButtons";
import { resetForm, sendEmail } from "../../Functions/Utilities";

// Data
import { blogData } from "../../Components/Blogs/BlogData";

const TestimonialsCarouselData = [
  {
    img: "https://via.placeholder.com/1368x801",
    title:
      "Design is not just what it looks like and feels like. Design is how it works",
    date: "08 January 2020",
    authorname: "By Wilbur Haddock",
    link: "/blogs/blog-post-layout-01",
  },
  {
    img: "https://via.placeholder.com/1368x801",
    title: "Delay always breeds danger and to protract a great design is often",
    date: "08 January 2020",
    authorname: "By Wilbur Haddock",
    link: "/blogs/blog-post-layout-01",
  },
  {
    img: "https://via.placeholder.com/1368x801",
    title: "Complexity is one of the great problems in environmental design",
    date: "08 January 2020",
    authorname: "By Wilbur Haddock",
    link: "/blogs/blog-post-layout-01",
  },
  {
    img: "https://via.placeholder.com/1368x801",
    title:
      "Design is not just what it looks like and feels like. Design is how it works",
    date: "08 January 2020",
    authorname: "By Wilbur Haddock",
    link: "/blogs/blog-post-layout-01",
  },
  {
    img: "https://via.placeholder.com/1368x801",
    title: "Delay always breeds danger and to protract a great design is often",
    date: "08 January 2020",
    authorname: "By Wilbur Haddock",
    link: "/blogs/blog-post-layout-01",
  },
  {
    img: "https://via.placeholder.com/1368x801",
    title: "Complexity is one of the great problems in environmental design",
    date: "08 January 2020",
    authorname: "By Wilbur Haddock",
    link: "/blogs/blog-post-layout-01",
  },
];

// Filter the blog data category wise
const blogCleanData = blogData.filter((item) => item.blogType === "clean");

const LatestNewsPage = (props) => {
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav
          fluid="fluid"
          theme="light"
          bg="white"
          menu="light"
          className="px-[35px] py-[0px] md:px-0"
          containerClass="sm:px-0"
        >
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img
                  className="default-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-fast-blue-black.webp"
                  data-rjs="/assets/img/webp/logo-fast-blue-black@2x.webp"
                  alt="logo"
                />
                <img
                  className="alt-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-fast-blue-black.webp"
                  data-rjs="/assets/img/webp/logo-fast-blue-black@2x.webp"
                  alt="logo"
                />
                <img
                  className="mobile-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-fast-blue-black.webp"
                  data-rjs="/assets/img/webp/logo-fast-blue-black@2x.webp"
                  alt="logo"
                />
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
          <Navbar.Collapse className="col-auto px-0 justify-center">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto col-lg-2 text-end pe-0">
            <SearchBar className="pr-0" />
            <HeaderLanguage />
            <HeaderCart />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <section className="py-0 relative latestnews-swiper">
        <Swiper
          ref={swiperRef}
          slidesPerView="auto"
          spaceBetween={20}
          speed={1000}
          pagination={{ clickable: true }}
          onSlideChange={(swiperCore) => {
            const { realIndex } = swiperCore;
            setActiveSlide(realIndex);
          }}
          loop={true}
          modules={[Autoplay]}
          // autoplay={{ delay: 2000, disableOnInteraction: false }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          centeredSlides={true}
          className="relative swiper-default-nav-hidden"
        >
          {TestimonialsCarouselData.map((item, i) => {
            return (
              <SwiperSlide key={i} className="w-[55%] md:w-full">
                <m.div
                  className="relative overflow-hidden py-[130px] h-[700px] md:h-[484px] sm:h-[690px] xs:h-[528px;] bg-no-repeat  bg-cover bg-[center_center] flex justify-center"
                  {...fadeIn}
                >
                  <Parallax
                    className="lg-no-parallax bg-cover cover-background absolute top-[-30px] left-0 h-[100vh] lg:h-[64vh] lg:top-[-75px] lg:!translate-y-0 md:h-[60vh] md:-top-[30px] sm:top-0 sm:h-[56vh] xs:h-[50vh] w-full"
                    translateY={[-40, 40]}
                    style={{ backgroundImage: `url(${item.img})` }}
                  ></Parallax>
                  <m.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: activeSlide === i ? 1 : 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-[200px] px-[180px] absolute xl:px-[50px] lg:px-[15px] lg:mt-[160px] md:px-[150px] md:mt-0 sm:px-[80px] sm:mt-[225px] sm:mx-0 sm:mb-[20px] xs:px-[15px] xs:mt-[185px] xs:mb-[15px]"
                  >
                    <div className="text-center pt-[50px] px-[45px] py-[30px] sm:pt-[40px] bg-gradient-to-r from-[#0039e3] via-[#5e28dd] to-[#8600d4] xs:px-[25px] xxs:pt-[20px]">
                      <m.div
                        initial={{ opacity: 0, y: "30%" }}
                        whileInView={{
                          opacity: activeSlide === i ? 1 : 0,
                          y: activeSlide === i ? "0" : "30%",
                        }}
                        transition={{ delay: 0.9 }}
                        className="mb-[20px] lg:mb-0"
                      >
                        <Link
                          aria-label="author-name"
                          to="#"
                          className="uppercase text-center mb-[20px] md:mb-0 sm:mb-[20px] xs:mb-[13px] py-[5px] px-[15px] text-[10px] inline-block leading-[20px] bg-black text-white font-serif"
                        >
                          {item.authorname}
                        </Link>
                      </m.div>
                      {item.link && (
                        <m.div
                          href={props.link}
                          initial={{ opacity: 0, y: "30%" }}
                          whileInView={{
                            opacity: activeSlide === i ? 1 : 0,
                            y: activeSlide === i ? "0" : "30%",
                          }}
                          transition={{ delay: 1 }}
                          className="text-white text-[26px] max-w-[530px] leading-[34px] mx-[40px] font-serif px-[5px] pb-[10px] text-center lg:text-[25px] lg:leading-[33px] xs:text-[16px] xs:leading-[21px] md:mx-[75px] sm:mx-0"
                        >
                          <Link className="hover:text-white" to={item.link}>
                            {item.title}
                          </Link>
                        </m.div>
                      )}
                      <m.div
                        initial={{ opacity: 0, y: "30%" }}
                        whileInView={{
                          opacity: activeSlide === i ? 0.2 : 0,
                          y: activeSlide === i ? "0" : "30%",
                        }}
                        transition={{ delay: 1.1 }}
                        className="h-[1px] bg-white opacity-20 my-[20px] mx-[80px] xs:m-[13px]"
                      ></m.div>
                      <m.div
                        initial={{ opacity: 0, y: "30%" }}
                        whileInView={{
                          opacity: activeSlide === i ? 1 : 0,
                          y: activeSlide === i ? "0" : "30%",
                        }}
                        transition={{ delay: 1.3 }}
                        className="p-[5px] text-[14px] xs:text-[11px] xs:leading-[16px] leading-[20px] text-white"
                      >
                        <Link
                          aria-label="blog-category"
                          to="/blogs/blog-grid"
                          className="font-serif hover:text-white"
                        >
                          Business conference
                        </Link>
                        <span className="mx-[10px]">•</span>
                        <Link
                          aria-label="date"
                          to="/blogs/blog-grid"
                          className="font-serif hover:text-white"
                        >
                          {item.date}
                        </Link>
                      </m.div>
                    </div>
                  </m.div>
                </m.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {
          <div className="swiper-navigation-01 swiper-navigation-light">
            <div
              onClick={() => swiperRef.current.swiper.slidePrev()}
              className="left-[40px] w-[60px] h-[60px] swiper-button-prev xs:left-[10px] !z-[1]"
            ></div>
            <div
              onClick={() => swiperRef.current.swiper.slideNext()}
              className="right-[40px] w-[60px] h-[60px] swiper-button-next xs:right-[10px] !z-[1]"
            ></div>
          </div>
        }
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray mt-[20px] py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col lg={6} className="text-center mb-16 sm:mb-12">
              <span className="font-serif font-medium text-fastblue block mb-[5px] uppercase">
                Most popular news
              </span>
              <h6 className="font-serif font-semibold text-darkgray uppercase">
                Popular highlights
              </h6>
            </Col>
          </Row>
        </Container>
        <Container fluid className="px-[7%] xl:px-[2%] lg:px-[3%] sm:px-[15px]">
          <Row>
            <Col className="sm:px-0">
              <BlogClean
                filter={false}
                overlay={[
                  "#0039e3",
                  "#4132e0",
                  "#5e28dd",
                  "#741bd9",
                  "#8600d4",
                ]}
                grid="grid grid-5col xl-grid-5col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
                data={blogCleanData.slice(0, 5)}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section
        className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]"
        {...fadeIn}
      >
        <Container>
          <Row className="justify-center">
            <Col lg={6} className="text-center mb-16 sm:mb-12">
              <span className="font-serif font-medium text-fastblue block mb-[5px] uppercase">
                PUBLISH WHAT YOU THINK
              </span>
              <h6 className="font-serif font-semibold text-darkgray uppercase">
                MOST POPULAR TOPICS
              </h6>
            </Col>
          </Row>
          <Row>
            <Col lg={8} className="md:mb-[60px] sm:mb-[40px] pr-[50px] md:pr-0">
              <BlogStandard data={blogData.slice(0, 1)} />
            </Col>
            <Col lg={4}>
              <ul>
                <li>
                  <div className="flex border-b border-[#ededed] pb-[30px]">
                    <figure className="shrink-0 h-auto w-[140px] mb-0 mt-0 mx-0">
                      <Link aria-label="blog" to="/blogs/blog-post-layout-03">
                        <img
                          loading="lazy"
                          src="https://via.placeholder.com/480x300"
                          width="140"
                          height="87.5"
                          alt="news"
                          data-no-retina=""
                        />
                      </Link>
                    </figure>
                    <div className="leading-normal pl-[30px] relative top-[-1px]">
                      <Link
                        aria-label="blog-date"
                        to="/blogs/blog-classic"
                        className="text-xs font-serif block mb-[5px]"
                      >
                        11 February 2019
                      </Link>
                      <Link
                        aria-label="description"
                        to="/blogs/blog-post-layout-03"
                        className="font-serif font-medium text-darkgray mb-[5px] block leading-[22px]"
                      >
                        Tools i use to learn, work and travel...
                      </Link>
                      <span aria-label="author" className="text-xs font-serif">
                        By{" "}
                        <Link aria-label="author" to="/blogs/blog-classic">
                          Stefano Shane
                        </Link>
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex border-b border-[#ededed] py-[30px]">
                    <figure className="shrink-0 h-auto w-[140px] mb-0 mt-0 mx-0">
                      <Link aria-label="blog" to="/blogs/blog-post-layout-03">
                        <img
                          loading="lazy"
                          src="https://via.placeholder.com/480x300"
                          width="140"
                          height="87.5"
                          alt="blog"
                          data-no-retina=""
                        />
                      </Link>
                    </figure>
                    <div className="leading-normal pl-[30px] relative top-[-1px]">
                      <Link
                        aria-label="blog-date"
                        to="/blogs/blog-classic"
                        className="text-xs font-serif block mb-[5px]"
                      >
                        15 February 2019
                      </Link>
                      <Link
                        aria-label="description"
                        to="/blogs/blog-post-layout-03"
                        className="font-serif font-medium text-darkgray mb-[5px] block leading-[22px]"
                      >
                        Without good design it’s easy to miss the mark...
                      </Link>
                      <span className="text-xs font-serif">
                        By{" "}
                        <Link aria-label="author" to="/blogs/blog-classic">
                          Stefano Shane
                        </Link>
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex border-b border-[#ededed] py-[30px]">
                    <figure className="shrink-0 h-auto w-[140px] mb-0 mt-0 mx-0">
                      <Link aria-label="blog" to="/blogs/blog-post-layout-03">
                        <img
                          loading="lazy"
                          src="https://via.placeholder.com/480x300"
                          width="140"
                          height="87.5"
                          alt="news"
                          data-no-retina=""
                        />
                      </Link>
                    </figure>
                    <div className="leading-normal pl-[30px] relative top-[-1px]">
                      <Link
                        aria-label="blog-date"
                        to="/blogs/blog-classic"
                        className="text-xs font-serif block mb-[5px]"
                      >
                        15 February 2019
                      </Link>
                      <Link
                        aria-label="description"
                        to="/blogs/blog-post-layout-03"
                        className="font-serif font-medium text-darkgray mb-[5px] block leading-[22px]"
                      >
                        Everybody can be great because anybody can...
                      </Link>
                      <span className="text-xs font-serif">
                        By{" "}
                        <Link aria-label="author" to="/blogs/blog-classic">
                          Eugene Mehl
                        </Link>
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex border-b border-[#ededed] py-[30px]">
                    <figure className="shrink-0 h-auto w-[140px] mb-0 mt-0 mx-0">
                      <Link aria-label="blog" to="/blogs/blog-post-layout-03">
                        <img
                          loading="lazy"
                          src="https://via.placeholder.com/480x300"
                          width="140"
                          height="87.5"
                          alt="blog"
                          data-no-retina=""
                        />
                      </Link>
                    </figure>
                    <div className="leading-normal pl-[30px] relative top-[-1px]">
                      <Link
                        aria-label="date"
                        to="/blogs/blog-classic"
                        className="text-xs font-serif block mb-[5px]"
                      >
                        23 January 2019
                      </Link>
                      <Link
                        aria-label="description"
                        to="/blogs/blog-post-layout-03"
                        className="font-serif font-medium text-darkgray mb-[5px] block leading-[22px]"
                      >
                        Styles come and go design is a language...
                      </Link>
                      <span className="text-xs font-serif">
                        By{" "}
                        <Link aria-label="author" to="/blogs/blog-classic">
                          Daysi Moss
                        </Link>
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex border-b border-[#ededed] py-[30px]">
                    <figure className="shrink-0 h-auto w-[140px] mb-0 mt-0 mx-0">
                      <Link
                        aria-label="homepage"
                        to="/blogs/blog-post-layout-03"
                      >
                        <img
                          loading="lazy"
                          src="https://via.placeholder.com/480x300"
                          width="140"
                          height="87.5"
                          alt="blog"
                          data-no-retina=""
                        />
                      </Link>
                    </figure>
                    <div className="leading-normal pl-[30px] relative top-[-1px]">
                      <Link
                        aria-label="homepage"
                        to="/blogs/blog-classic"
                        className="text-xs font-serif block mb-[5px]"
                      >
                        18 January 2019
                      </Link>
                      <Link
                        aria-label="description"
                        to="/blogs/blog-post-layout-03"
                        className="font-serif font-medium text-darkgray mb-[5px] block leading-[22px]"
                      >
                        Design is inherently optimistic power...
                      </Link>
                      <span className="text-xs font-serif">
                        By{" "}
                        <Link aria-label="author" to="/blogs/blog-classic">
                          Ming Furry
                        </Link>
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex py-[30px] lg:pb-0">
                    <figure className="shrink-0 h-auto w-[140px] mb-0 mt-0 mx-0">
                      <Link aria-label="blog" to="/blogs/blog-post-layout-03">
                        <img
                          loading="lazy"
                          src="https://via.placeholder.com/480x300"
                          width="140"
                          height="87.5"
                          alt="blog"
                          data-no-retina=""
                        />
                      </Link>
                    </figure>
                    <div className="leading-normal pl-[30px] relative top-[-1px]">
                      <Link
                        aria-label="date"
                        to="/blogs/blog-classic"
                        className="text-xs font-serif block mb-[5px]"
                      >
                        19 December 2019
                      </Link>
                      <Link
                        taria-label="description"
                        to="/blogs/blog-post-layout-03"
                        className="font-serif font-medium text-darkgray mb-[5px] block leading-[22px]"
                      >
                        Alone we can do so little together we can do...
                      </Link>
                      <span className="text-xs font-serif">
                        By{" "}
                        <Link aria-label="author" to="/blogs/blog-classic">
                          Marleen Shorter
                        </Link>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col lg={6} className="text-center mb-16 sm:mb-12">
              <span className="font-serif font-medium text-fastblue block mb-[5px] uppercase">
                RECENT BLOGS POSTS
              </span>
              <h6 className="font-serif font-semibold text-darkgray uppercase">
                RECENT ADDED NEWS
              </h6>
            </Col>
          </Row>
          <Row>
            <Col className="px-0">
              <BlogGrid
                overlay="#374162"
                grid="grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
                data={blogData.slice(0, 6)}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Parallax Scrolling Start */}
      <div className="flex items-center overflow-hidden relative py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Parallax
          className="lg-no-parallax bg-cover cover-background absolute left-0 w-full h-[100vh] lg:h-[92vh] md:h-[70vh] lg:!translate-y-0"
          translateY={[-40, 40]}
          style={{
            backgroundImage: `url(https://via.placeholder.com/1920x1100)`,
          }}
        ></Parallax>
        <div className="absolute top-0 left-0 w-full h-full opacity-75 bg-gradient-to-tr from-[#0039e3] via-[#5e28dd] to-[#8600d4]"></div>
        <Container className="relative">
          <Row className="justify-center">
            <Col xl={7} lg={8} md={10}>
              <div className="text-center font-serif font-medium bg-white rounded-[6px] p-28 sm:p-20 xs:p-16">
                <span className="text-basecolor block uppercase mb-[10px]">
                  Let's get started now
                </span>
                <h6 className="inline-block text-darkgray -tracking-[1px] w-[80%] mb-14 lg:w-[85%] sm:w-[55%] xs:w-full">
                  Don't miss this amazing latest news and opportunities!
                </h6>
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
                    <div className="relative subscribe-style-08">
                      <Form className="relative">
                        <Input
                          showErrorMsg={false}
                          type="text"
                          name="name"
                          className="border-[1px] medium-input border-solid border-transparent"
                          placeholder="Your name"
                        />
                        <Input
                          showErrorMsg={false}
                          type="email"
                          name="email"
                          className="border-[1px] medium-input border-solid border-transparent"
                          placeholder="Your email address"
                        />
                        <button
                          type="submit"
                          className={`text-xs tracking-[1px] py-[12px] px-[28px] uppercase${
                            isSubmitting ? " loading" : ""
                          }`}
                        >
                          Subscribe Newsletter
                        </button>
                      </Form>
                      <AnimatePresence>
                        {status && (
                          <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full mt-[15px]"
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
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Parallax Scrolling End */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
      {/* Footer End */}
    </div>
  );
};

export default LatestNewsPage;
