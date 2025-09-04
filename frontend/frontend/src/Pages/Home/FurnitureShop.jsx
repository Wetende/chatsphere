import React from "react";

// Libraries
import { AnimatePresence, m } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Functions
import { resetForm, sendEmail } from "../../Functions/Utilities";

// Components
import {
  Header,
  HeaderCart,
  HeaderLanguage,
  HeaderNav,
  Menu,
  SearchBar,
} from "../../Components/Header/Header";
import Buttons from "../../Components/Button/Buttons";
import ProductBox from "../../Components/Products/ProductBox";
import { fadeIn } from "../../Functions/GlobalAnimations";
import BlogClassic from "../../Components/Blogs/BlogClassic";
import Instagram from "../../Components/Instagram/Instagram";
import Overlap from "../../Components/Overlap/Overlap";
import MessageBox from "../../Components/MessageBox/MessageBox";
import FooterMenu, { Footer } from "../../Components/Footers/Footer";
import { Input } from "../../Components/Form/Form";
import CustomModal from "../../Components/CustomModal";
import SideButtons from "../../Components/SideButtons";

// Data
import { blogData } from "../../Components/Blogs/BlogData";
import FooterData from "../../Components/Footers/FooterData";

const swiperData = [
  {
    titleOne: "Ormond",
    titleTwo: "armchair",
    subTitle: "furniture design",
    img: "https://via.placeholder.com/529x594",
    bgImg: "/assets/img/webp/shop-slide-01.webp",
    price: "$89",
    circleColor:
      "linear-gradient(rgb(255, 219, 214) 0%, rgb(255, 229, 225) 100%)",
  },
  {
    titleOne: "Rockland",
    titleTwo: "ceramic",
    subTitle: "tabletop design",
    img: "https://via.placeholder.com/500x555",
    bgImg: "/assets/img/webp/shop-slide-02.webp",
    price: "$89",
    circleColor:
      "linear-gradient(rgb(255, 238, 221) 0%, rgb(255, 244, 231) 100%)",
  },
  {
    titleOne: "Wooden",
    titleTwo: "lithology",
    subTitle: "Decoration design",
    img: "https://via.placeholder.com/500x555",
    bgImg: "/assets/img/webp/shop-slide-03.webp",
    price: "$89",
    circleColor:
      "linear-gradient(rgb(255, 231, 217) 0%, rgb(254, 236, 225) 100%)",
  },
];

const productCategory = [
  {
    titleOne: "Morden",
    titleTwo: "chair",
    tag: "Innovative",
    img: "https://via.placeholder.com/600x610",
    link: "/shop/shop-wide/",
  },
  {
    titleOne: "Classic",
    titleTwo: "sofaset",
    tag: "Trending",
    img: "https://via.placeholder.com/600x610",
    link: "/shop/shop-wide/",
  },
  {
    titleOne: "Wooden",
    titleTwo: "stools",
    tag: "Designer",
    img: "https://via.placeholder.com/600x610",
    link: "/shop/shop-wide/",
  },
];

const BlogClassicData = blogData
  .filter((item) => item.blogType === "classic")
  .filter((item) => item.category.includes("furnitureshop"));

const FurnitureShopPage = (props) => {
  const swiperRef = React.useRef(null);
  const isDesktop = window.innerWidth > 768; // Animation stop at 768

  const handleClose = () => {
    let newsletter_modal = document.querySelector("#subscribe-popup"),
      newsletter_checkbox = newsletter_modal.querySelector("#newsletter-off");

    import("../../Functions/Utilities").then((module) => {
      if (module.getCookie("litho-promo-popup") !== "shown") {
        if (newsletter_checkbox.checked) {
          document.cookie = "litho-promo-popup=shown";
        }
      }
    });
  };

  const FooterMenuData = [
    FooterData[5],
    FooterData[0],
    FooterData[4],
    FooterData[6],
  ];

  return (
    <div style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll">
        <HeaderNav
          fluid="fluid"
          theme="light"
          className="py-[0px] px-[35px] md:px-[15px] sm:px-0"
        >
          <Col className="me-auto !pl-0" lg="auto">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img
                  className="default-logo"
                  width="111"
                  height="36"
                  loading="lazy"
                  src="/assets/img/webp/logo-black.webp"
                  data-rjs="/assets/img/webp/logo-black.webp"
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
          <Navbar.Collapse className="col-auto justify-end px-0">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto text-right !px-0">
            <SearchBar />
            <HeaderLanguage />
            <HeaderCart />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      {/* Section Start */}
      <section className="furniture-shop flex items-center justify-center overflow-hidden">
        <Swiper
          ref={swiperRef}
          pagination={{ clickable: true }}
          keyboard={true}
          allowTouchMove={false}
          loop={true}
          modules={[Pagination, Mousewheel, Keyboard]}
          className="full-screen swiper-pagination-02 swiper-pagination-dark swiper-pagination-big xs:h-[664px] landscape:md:h-auto"
        >
          <div
            onClick={() => swiperRef.current.swiper.slidePrev()}
            className="btn-slider-next absolute top-1/2 z-[1] left-[64px] text-[40px] text-darkgray h-[50px] w-[50px] leading-[50px] flex justify-center items-center right-inherit cursor-pointer opacity-60 hover:opacity-100 transition-default xs:hidden"
          >
            <button aria-label="swiper next btn" className="text-xmd">
              <i className="line-icon-Arrow-OutLeft text-[40px]"></i>
            </button>
          </div>
          {swiperData.map((item, i) => {
            return (
              <SwiperSlide
                key={i}
                className="bg-center bg-cover bg-no-repeat z-20 h-full overflow-hidden flex items-center transition-default"
                style={{ backgroundImage: `url(${item.bgImg})` }}
              >
                <m.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ ease: "easeIn", duration: 0.5 }}
                >
                  <m.div
                    className="big-circle sm:top-[65%] sm:right-1/2 sm:left-[-50%]"
                    style={{ background: item.circleColor }}
                    animate={{
                      x: [1, -6, -9, -9, -6, 6, 9, 9, 1],
                      y: [1, 6, 9, 9, -6, -9, -9, -6, 1],
                    }}
                    transition={{
                      times: [1, 6, 2, 2, 6, 2, 2, 6],
                      duration: 10,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  ></m.div>
                </m.div>
                <Container className="relative">
                  <Row className="items-center font-serif sm:justify-center">
                    <Col
                      xl={6}
                      lg={6}
                      md={6}
                      sm={12}
                      className="text-darkgray sm:text-center"
                    >
                      <m.span
                        className="uppercase tracking-[2px] leading-[17px] text-base pt-[10px] pb-[40px] px-[20px] opacity-70 text-darkgray inline-block font-medium md:text-sm sm:mt-[70px] sm:pb-[15px] xs:text-xxs"
                        initial={{
                          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                        }}
                        whileInView={{
                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                        }}
                        transition={{
                          delay: 0.3,
                          duration: 0.8,
                          ease: "easeInOut",
                        }}
                      >
                        {" "}
                        {item.subTitle}
                      </m.span>
                      <m.h2
                        className="heading-6 leading-[90px] text-[100px] font-normal lg:text-[80px] px-[20px] pb-[30px] -tracking-[3px] lg:leading-none md:text-[60px] xs:text-[40px] sm:text-center"
                        initial={{
                          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                        }}
                        whileInView={{
                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                        }}
                        transition={{
                          delay: 1.2,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                      >
                        <strong className="font-semibold block">
                          {item.titleOne}
                        </strong>
                        {item.titleTwo}
                      </m.h2>
                      <m.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                          delay: 1.4,
                        }}
                      >
                        <Buttons
                          ariaLabel="shop wide"
                          to="/shop/shop-wide/"
                          className="font-medium text-[8px] mx-3 uppercase rounded-none shadow-[0_0_15px_rgba(0,0,0,0.1)] bg-[#fff] hover:bg-white hover:text-white border-none"
                          color="#000"
                          size="lg"
                          themeColor="#000"
                          title="Discover Now"
                        />
                      </m.div>
                    </Col>
                    <Col sm={6} className="relative">
                      <m.img
                        className="mx-auto mt-[80px] sm:h-full md:p-8 xs:p-28"
                        src={item.img}
                        alt=""
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 2.1 }}
                      />
                      <div className="small-circle">
                        <m.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ ease: "easeIn", delay: 1.9 }}
                        >
                          <m.div
                            className="element-one inline-block"
                            animate={{
                              x: [1, -6, -9, -9, -6, 6, 9, 9, 1],
                              y: [1, 6, 9, 9, -6, -9, -9, -6, 1],
                            }}
                            transition={{
                              times: [1, 6, 2, 2, 6, 2, 2, 6],
                              duration: 10,
                              repeat: Infinity,
                            }}
                          ></m.div>
                        </m.div>
                        <m.div
                          className="element-two top-[40px] right-[20px] text-white bg-[#F06F42] justify-center items-center text-center flex-col flex w-[120px] h-[120px] rounded-full absolute lg:w-[90px] lg:h-[90px] sm:w-[80px] sm:h-[80px] xs:h-[60px] xs:w-[60px]"
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 50,
                            ease: "circOut",
                            duration: 1.8,
                            delay: 2.3,
                          }}
                        >
                          <m.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 2.5 }}
                            className="text-xmd uppercase block lg:text-sm sm:text-xs xs:text-[10px]"
                          >
                            Only
                          </m.div>
                          <m.span
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 2.8 }}
                            className="text-[37px] font-normal lg:text-[33px] sm:text-[27px] xs:text-[22px]"
                          >
                            {item.price}
                          </m.span>
                        </m.div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </SwiperSlide>
            );
          })}
          <div
            onClick={() => swiperRef.current.swiper.slideNext()}
            className="btn-slider-prev absolute top-1/2 z-[1] right-[64px] text-[40px] text-darkgray h-[50px] w-[50px] leading-[50px] flex justify-center items-center right-inherit cursor-pointer opacity-60 hover:opacity-100 transition-default xs:hidden"
          >
            <button aria-label="swiper prev btn" className="text-xmd">
              <i className="line-icon-Arrow-OutRight text-[40px]"></i>
            </button>
          </div>
        </Swiper>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="px-[8.5rem] py-[170px] overflow-hidden xl:px-0 lg:py-[90px] xs:px-0">
        <Container fluid>
          <Row className="justify-center gap-y-[40px]">
            {productCategory.map((item, i) => {
              return (
                <Col
                  key={i}
                  xl={4}
                  md={6}
                  sm={10}
                  className="shop-category font-serif"
                >
                  <div className="shop-product items-center flex px-[30px] xs:px-0">
                    <div className="shop-product-image text-center flex justify-center items-center -mr-[25px] w-full relative">
                      <m.img
                        src={item.img}
                        alt="..."
                        initial={isDesktop && { scale: 0.6, opacity: 0 }}
                        whileInView={isDesktop && { scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "circOut",
                          delay: i * 0.3,
                          duration: 0.5,
                        }}
                      />
                      <Link
                        aria-label="link for"
                        to={item.link}
                        className="leading-[65px] rounded-full bg-darkgray h-[65px] w-[65px] absolute inline-flex justify-center items-center"
                      >
                        <i className="feather-arrow-right text-white text-[21px]"></i>
                      </Link>
                    </div>
                    <div className="shop-product-overlay relative font-medium">
                      <span className="mb-[10px] inline-block uppercase tracking-[1px] text-basecolor xs:mb-[5px]">
                        {item.tag}
                      </span>
                      <h2 className="heading-4 text-darkgray font-normal mb-0 -tracking-[1px] leading-[40px] sm:leading-[30px]">
                        {item.titleOne}{" "}
                        <span className="font-semibold">{item.titleTwo}</span>
                      </h2>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="text-center px-[8.5rem] py-[130px] border-t border-mediumgray xl:px-12 lg:py-[120px] md:py-[95px] md:px-0 sm:py-[80px] xs:py-[50px] xs:px-0">
        <Container>
          <m.div {...fadeIn} className="row justify-center">
            <Col md={6} className="text-center mb-[5.5rem] md:mb-12">
              <span className="font-serif font-medium text-basecolor uppercase tracking-[1px] block mb-[5px]">
                Living interior
              </span>
              <h2 className="heading-4 font-serif font-semibold text-darkgray mb-0 -tracking-[1px]">
                New products
              </h2>
            </Col>
          </m.div>
        </Container>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <ProductBox grid="grid grid-5col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large gap-y-5" />
            </Col>
            <Col className="text-center mt-12">
              <Buttons
                aria-label="left-sidebar"
                to="/shop/left-sidebar"
                className="mx-3 font-medium font-serif tracking-[.5px] btn-fancy uppercase rounded-none md:mb-[15px] bg-[#fff] hover:text-white"
                color="#000"
                size="md"
                themeColor="#000"
                title="More collection"
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="p-0">
        <Container fluid>
          <Row lg={2} xs={1}>
            <m.div
              className="col bg-[#fff9f6] py-20 px-[8%] xl:px-[6%] lg:px-[3%] md:px-[8%]"
              {...fadeIn}
            >
              <Row className="items-center">
                <Col sm={7} className="xs:mb-[30px]">
                  <Link aria-label="link for" to="/shop/single-product/">
                    <img
                      width={365}
                      height={390}
                      className="w-full"
                      src="https://via.placeholder.com/600x640"
                      alt="classic shop"
                    />
                  </Link>
                </Col>
                <Col
                  sm={5}
                  className="pl-[10%] xl:pl-[3%] md:pl-[9%] xs:pl-[15px]"
                >
                  <span className="font-serif font-medium text-basecolor block mb-[15px] uppercase">
                    <span className="w-[10px] h-[1px] bg-basecolor inline-block align-middle mr-[5px]"></span>{" "}
                    Flat 50% off
                  </span>
                  <h2 className="heading-4 font-serif text-darkgray -tracking-[1px] mb-[30px] font-normal">
                    Wooden <span className="font-semibold">armchair</span>
                  </h2>
                  <Buttons
                    ariaLabel="single-product"
                    to="/shop/single-product/"
                    className="btn-fill btn-fancy drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]	font-medium font-serif rounded-none uppercase btn-shadow text-[11px] md:mb-[15px]"
                    size="sm"
                    themeColor="#fff"
                    color="#000"
                    title="Discover now"
                  />{" "}
                </Col>
              </Row>
            </m.div>
            <m.div
              className="col bg-[#f7edee] py-20 px-[8%] xl:px-[6%] lg:px-[3%] md:px-[8%]"
              {...{ ...fadeIn, transition: { delay: 0.5 } }}
            >
              <Row className="items-center">
                <Col sm={7} className="xs:mb-[30px]">
                  <Link aria-label="link for" to="/shop/single-product/">
                    <img
                      width={365}
                      height={390}
                      className="w-full"
                      src="https://via.placeholder.com/600x640"
                      alt="classic-shop"
                    />
                  </Link>
                </Col>
                <Col
                  sm={5}
                  className="pl-[10%] xl:pl-[3%] md:pl-[9%] xs:pl-[15px]"
                >
                  <span className="font-serif font-medium text-basecolor block mb-[15px] uppercase">
                    <span className="w-[10px] h-[1px] bg-basecolor inline-block align-middle mr-[5px]"></span>{" "}
                    Flat 40% off
                  </span>
                  <h3 className="heading-4 font-serif text-darkgray -tracking-[1px] mb-[30px] font-normal">
                    Modern <span className="font-semibold">retro stool</span>
                  </h3>
                  <Buttons
                    ariaLabel="single-product"
                    to="/shop/single-product/"
                    className="btn-fill btn-fancy drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]	font-medium font-serif rounded-none uppercase btn-shadow text-[11px] md:mb-[15px]"
                    size="sm"
                    themeColor="#fff"
                    color="#000"
                    title="Discover now"
                  />
                </Col>
              </Row>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section
        className="px-[8.5rem] py-[130px] xl:px-12 lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] xs:px-0 text-center"
        {...fadeIn}
      >
        <Container>
          <Row className="justify-center">
            <Col md={6} className="text-center mb-[5.5rem] md:mb-12">
              <span className="font-serif font-medium text-basecolor uppercase tracking-[1px] block mb-[5px]">
                Updated Blog
              </span>
              <h2 className="heading-4 font-serif font-semibold text-darkgray mb-0 -tracking-[1px]">
                Latest blogs
              </h2>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col className="px-0">
              <BlogClassic
                pagination={false}
                grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large text-start justify-center"
                data={BlogClassicData}
              />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="border-t border-mediumgray py-20">
        <Container>
          <Row lg={4} sm={2} xs={1} className="text-center justify-center">
            <Col>
              <Link aria-label="link for" to="#">
                <m.img
                  alt=""
                  className="inline-block"
                  src="https://via.placeholder.com/225x110"
                  {...{ ...fadeIn, transition: { delay: 0.3 } }}
                />
              </Link>
            </Col>
            <Col>
              <Link aria-label="link for" to="#">
                <m.img
                  alt=""
                  className="inline-block"
                  src="https://via.placeholder.com/225x110"
                  {...{ ...fadeIn, transition: { delay: 0.5 } }}
                />
              </Link>
            </Col>
            <Col>
              <Link aria-label="link for" to="#">
                <m.img
                  alt=""
                  className="inline-block"
                  src="https://via.placeholder.com/225x110"
                  {...{ ...fadeIn, transition: { delay: 0.7 } }}
                />
              </Link>
            </Col>
            <Col>
              <Link aria-label="link for" to="#">
                <m.img
                  alt=""
                  className="inline-block"
                  src="https://via.placeholder.com/225x110"
                  {...{ ...fadeIn, transition: { delay: 0.9 } }}
                />
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="z-[1] relative sm:pb-[50px]">
        <Container>
          <Row className="justify-center">
            <m.div className="col-md-12 col" {...fadeIn}>
              <Instagram
                carousel={true}
                carouselOption={{
                  loop: true,
                  slidesPerView: 2,
                  spaceBetween: 15,
                  autoplay: { delay: 3500, disableOnInteraction: false },
                  keyboard: { enabled: true, onlyInViewport: true },
                  breakpoints: {
                    1200: { slidesPerView: 6 },
                    992: { slidesPerView: 4 },
                    768: { slidesPerView: 3 },
                  },
                }}
                total_posts={8}
                title="#instagram decor"
                grid=""
              />
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Modal Component Start */}
      <CustomModal.Wrapper
        closeBtnIn={true}
        closeBtnOuter={false}
        defaultOpen={true}
        className="subscribe-newsletter-modal"
      >
        <div
          className="text-left relative landscape:md:mt-[100px]"
          id="subscribe-popup"
        >
          <Container>
            <Row className="justify-center">
              <Col lg={11} md={10} className="relative">
                <div
                  onClick={handleClose}
                  className="absolute top-0 right-0 z-10"
                >
                  <CustomModal.Close className="close-btn text-white">
                    <button
                      title="Close (Esc)"
                      type="button"
                      className="border-none text-[30px] w-[44px] h-[44px]"
                    >
                      ×
                    </button>
                  </CustomModal.Close>
                </div>
                <Row className="justify-center">
                  <Col
                    className="p-24 lg:p-16 xs:p-[3rem] bg-white overflow-hidden"
                    sm={{ span: 7, order: 1 }}
                    xs={{ span: 12, order: 2 }}
                  >
                    <span className="text-xlg font-medium text-darkgray block mb-[10px]">
                      Subscribe to newsletter
                    </span>
                    <p className="mb-[30px] xs:mb-[20px]">
                      Subscribe to our newsletters and don't miss new arrivals
                      the latest updates and our latest promotions.
                    </p>
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
                          <Form className="relative mb-[25px]">
                            <Input
                              showErrorMsg={false}
                              type="email"
                              name="email"
                              className="!pr-[70px] border-[1px] medium-input border-solid border-[#dfdfdf]"
                              placeholder="Enter your email address"
                            />
                            <button
                              aria-label="subscibe btn"
                              type="submit"
                              className={`!border-0 text-xs tracking-[1px] !px-[18px] uppercase xs:text-center${
                                isSubmitting ? " loading" : ""
                              }`}
                            >
                              <i className="far fa-envelope text-darkgray text-sm leading-none xs:mr-0"></i>
                            </button>
                            <AnimatePresence>
                              {status && (
                                <m.div
                                  className="relative z-[1]"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                >
                                  <MessageBox
                                    className="absolute mt-[10px] py-[10px] text-md"
                                    theme="message-box01"
                                    variant="success"
                                    message="Your message has been sent successfully!"
                                  />
                                </m.div>
                              )}
                            </AnimatePresence>
                          </Form>
                        </div>
                      )}
                    </Formik>
                    <label
                      htmlFor="newsletter-off"
                      className="text-sm checkbox-with-label"
                    >
                      <input type="checkbox" id="newsletter-off" />
                      <span className="inline-block align-middle w-[15px] h-[15px] mr-[10px] border border-[#d9d9d9] rounded-none relative"></span>
                      Don't show this popup again
                    </label>
                  </Col>
                  <Col
                    sm={{ span: 5, order: 2 }}
                    xs={{ span: 12, order: 1 }}
                    className="bg-cover cover-background xs:h-[150px]"
                    style={{
                      backgroundImage: `url('https://via.placeholder.com/600x802')`,
                    }}
                  ></Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </CustomModal.Wrapper>
      {/* Modal Component End */}

      {/* Footer Start */}
      <Overlap value={15}>
        <Footer className="bg-darkgray">
          <div className="pt-[177px] lg:pt-[221px] md:pt-[220px] sm:pt-[50px] pb-[118px] md:pb-[80px] sm:pb-[50px]">
            <Container>
              <Row className="justify-between md:justify-center">
                <FooterMenu
                  data={FooterMenuData}
                  className="col-12 col-lg col-sm-4 md:mb-[40px] col-xs-8 col-md-3 xs:mb-[25px]"
                  titleClass="capitalize"
                />
                <Col className="col col-lg-3 col-sm-6 col-md-3 col-sm-6 offset-sm-2 offset-md-0 order-5 col-xs-12 order-lg-0 md:text-center sm:text-start lg:text-start">
                  <span className="font-serif font-medium block text-themecolor mb-[20px] xs:mb-[10px]">
                    Subscribe to newsletter
                  </span>
                  <p className="mb-[25px] md:mb-[20px]">
                    Enter your email address for receiving valuable newsletters.
                  </p>
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
                            className="border-[1px] !pr-[70px] border-solid rounded-[3px] border-transparent medium-input"
                            placeholder="Enter your email address"
                          />
                          <button
                            aria-label="subscribe"
                            type="submit"
                            className={`text-xs tracking-[1px] border-0 !px-[18px] uppercase xs:text-center${
                              isSubmitting ? " loading" : ""
                            }`}
                          >
                            <i className="far fa-envelope text-[#000] text-sm leading-none"></i>
                          </button>
                        </Form>
                        <AnimatePresence>
                          {status && (
                            <m.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="mt-[25px] absolute top-[115%] left-0 w-full"
                            >
                              <MessageBox
                                className="rounded-[4px] text-md py-[10px] px-[22px] z-10"
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
          </div>
          <Container>
            <Row className="pb-[40px]">
              <div className="h-[1px] mb-[40px] bg-[#ffffff2e]"></div>
              <Col className="col-12 col-lg-4 text-center lg:text-start md:mb-[20px]">
                <Link
                  aria-label="link"
                  to="/"
                  className="sm:flex sm:justify-center"
                >
                  <img
                    src="/assets/img/webp/logo-white.webp"
                    alt="logo"
                    width="111"
                    height="36"
                    className="md:mx-auto"
                  />
                </Link>
              </Col>
              <Col className="col-12 col-lg-4 col-md-6 flex justify-center items-center text-center md:text-start lg:text-center sm:mb-[20px]">
                <p className="mb-0 xs:text-center">
                  &copy; {new Date().getFullYear()} Litho is Proudly Powered by{" "}
                  <a
                    aria-label="themezaa"
                    className="text-decoration-line-bottom"
                    rel="noreferrer"
                    target="_blank"
                    href="https://www.themezaa.com/"
                  >
                    ThemeZaa
                  </a>
                </p>
              </Col>
              <Col className="col-12 col-lg-4 col-md-6 flex items-center text-center md:text-end">
                <img
                  src="/assets/img/footer-payment-icon.png"
                  className="ml-auto mr-0 sm:mx-auto"
                  alt="footer-payment"
                  width=""
                  height=""
                />
              </Col>
            </Row>
          </Container>
        </Footer>
      </Overlap>
      {/* Footer End */}
    </div>
  );
};

export default FurnitureShopPage;
