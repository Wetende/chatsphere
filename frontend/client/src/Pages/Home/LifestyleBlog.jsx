import React from 'react'

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { m } from "framer-motion";
import { AnimatePresence } from "framer-motion";

// Components
import { Input } from '../../Components/Form/Form'
import Buttons from '../../Components/Button/Buttons'
import BlogCategory from "../../Components/Blogs/BlogCategory";
import FooterStyle07 from "../../Components/Footers/FooterStyle07"
import BlogMasonry from "../../Components/Blogs/BlogMasonry";
import MessageBox from "../../Components/MessageBox/MessageBox";
import Header, { HeaderNav, Menu } from "../../Components/Header/Header";
import Overlap from "../../Components/Overlap/Overlap";
import SideButtons from "../../Components/SideButtons";
import { fadeIn } from "../../Functions/GlobalAnimations";
import { resetForm, sendEmail } from "../../Functions/Utilities";

// Data
import HeaderData from "../../Components/Header/HeaderData";
import { authorData, BlogCategoryData, blogData } from "../../Components/Blogs/BlogData";

const swiperData = [
  {
    title: "Love can bring back the smile and fashion",
    subTitle: "Winter fashion",
    bgImage: "https://via.placeholder.com/1920x1005",
    link: "/blogs/blog-post-layout-01"
  },
  {
    title: "Fashion and interior are one and the same",
    subTitle: "Winter fashion",
    bgImage: "https://via.placeholder.com/1920x1005",
    link: "/blogs/blog-post-layout-02"
  },
  {
    title: "Reason and judgment are the qualities",
    subTitle: "Winter fashion",
    bgImage: "https://via.placeholder.com/1920x1005",
    link: "/blogs/blog-post-layout-03"
  }
]


// Filter the blog data category wise
const swiperData02 = blogData.filter((item) => item.blogType === "lifestyle");
const blogMasonryData = blogData.filter((item) => item.blogType === "masonry");

const LifestyleBlogPage = (props) => {
  const swiperRef = React.useRef(null);

  return (
    <div className="" style={props.style}>
      <SideButtons />
      {/* Header Start */}
      <Header className="header-with-topbar" topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav bg="white" theme="light" containerClass="!px-0" className="py-[0px] md:py-[18px] md:px-[15px] sm:px-0">
          <Col lg={6} xs={"auto"} className="px-lg-0 position-absolute left-0 right-0 mx-lg-auto text-center md:!relative mr-auto">
            <Link aria-label="header logo" className="inline-block" to="/">
              <Navbar.Brand className="inline-block align-middle p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-neon-orange.webp' data-rjs='/assets/img/webp/logo-neon-orange@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-neon-orange.webp' data-rjs='/assets/img/webp/logo-neon-orange@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-neon-orange.webp' data-rjs='/assets/img/webp/logo-neon-orange@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Col className="md:flex md:justify-end md:px-[15px]">
            <Navbar.Toggle className="order-last md:ml-[17px]">
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
            </Navbar.Toggle>
            <div className="hidden md:block">
              <Navbar.Collapse className="col-auto justify-center">
                <Menu {...props} />
              </Navbar.Collapse>
            </div>
            <div className="flex justify-between md:hidden col-lg-9 col-xl-8 mx-auto">
              <Menu data={HeaderData.slice(0, Math.floor(HeaderData.length / 2))} />
              <Menu data={HeaderData.slice(Math.floor(HeaderData.length / 2), (HeaderData.length - 1))} />
            </div>
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}

      <div className="px-[90px] xl:px-[45px] lg:px-0">
        {/* Section Start */}
        <section className="bg-[#fff]">
          <Swiper
            loop={true}
            slidesPerView={1}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            keyboard={{ enabled: true, onlyInViewport: true }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="h-[800px] lg:h-[600px] md:h-[650px] sm:h-[500px] black-move swiper-pagination-02 swiper-pagination-light swiper-pagination-medium">
            {swiperData.map((item, i) => {
              return (
                <SwiperSlide key={i} className="cover-background overflow-hidden" style={{ backgroundImage: `url(${item.bgImage})` }}>
                  <Container fluid className="h-full relative">
                    <div className="h-full justify-start sm:justify-center flex">
                      <div className="absolute self-center bg-[#fff] text-left w-[30%] lg:w-2/5 sm:w-[70%] xs:w-[85%] py-[5.5rem] xl:px-[4rem] lg:px-[2.5rem] lg:py-[3.5rem] xs:p-14 ml-32 md:ml-24 px-28 sm:ml-0 xs:text-center">
                        <Link aria-label="link for" to="/blogs/blog-masonry/" className="font-serif font-meidum text-darkgray hover:text-darkgray text-md tracking-[2px] uppercase inline-block relative mb-[25px] xs:mb-5">
                          <span className="absolute left-0 bottom-[2px] top-[12px] w-full h:[5px] bg-[#ffd7c4]"></span><span className="relative text-start font-medium">{item.subTitle}</span></Link>
                        <h2 className="heading-4 font-serif text-darkgray mb-[35px] -tracking-[2px] w-[99%]">
                          <Link aria-label="link for" to={item.link} className="text-darkgray font-medium hover:text-black xs:-tracking-[2px]">{item.title}</Link></h2>
                        <Buttons ariaLabel="link for" to={item.link} className="font-medium font-serif rounded-none uppercase btn-flat" size="md" themeColor="#232323" color="#fff" title="Continue Reading" />
                      </div>
                    </div>
                  </Container>
                </SwiperSlide>
              )
            })
            }
          </Swiper>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] bg-cover overflow-hidden relative bg-center bg-[#fff]" style={{ backgroundImage: "url(/assets/img/webp/our-team-bg2.webp" }}>
          <Row className="justify-center">
            <Col xs={12} sm={6} className="text-center mb-16 xs:mb-0">
              <span className="w-[2px] h-[35px] bg-basecolor inline-block mb-[5px]"></span>
              <h2 className="heading-5 font-serif -tracking-[1px] text-darkgray font-medium">Popular categories</h2>
            </Col>
          </Row>
          <Row>
            <Col className="px-xl-0 ">
              <BlogCategory grid="grid grid-5col xl-grid-5col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={BlogCategoryData} animation={fadeIn} link="/blog-types/blog-standard-post/" />
            </Col>
          </Row>
        </section>
        {/* Section End */}

        {/* Section Start */}
        <section className="pb-[130px] lg:pb-[90px] md:pb-[75px] sm:pb-[50px] bg-[#fff]">
          <Container>
            <Row className="items-center">
              <Col xs={12} md={12} className="relative px-[9%] sm:px-[10%]">
                <div
                  onClick={() => swiperRef.current.swiper.slidePrev()} className="btn-slider-next absolute top-1/2 z-[1] left-[0px] -translate-y-1/2 text-[40px] text-darkgray h-[50px] w-[50px] leading-[50px] flex justify-center items-center right-inherit cursor-pointer">
                  <button aria-label="swiper next" className="text-xmd">
                    <i className="line-icon-Arrow-OutLeft text-[40px] text-[#b7b7b7]"></i>
                  </button>
                </div>
                <Swiper
                  ref={swiperRef}
                  slidesPerView={1}
                  loop={true}
                  spaceBetween={30}
                  autoplay={{ delay: 4500, disableOnInteraction: "false" }}
                  breakpoints={{ 768: { slidesPerView: 2 }, 1199: { slidesPerView: 3 } }}
                  keyboard={{ enabled: "true", onlyInViewport: "true" }}
                  modules={[Pagination]}
                  className="mySwiper black-move"
                >
                  {swiperData02.map((item, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="feature-box px-[10px] flex items-center">
                          <div className="feature-box-icon mr-[25px]" style={{ flex: "0 0 auto" }}>
                            <Link aria-label="link for" to={`/blog-types/blog-standard-post/${item.id}`}>
                              <img alt="feature-box" width={90} height={90} src={item.img} className="rounded-full w-[90px] h-[90px] sm:w-[70px] sm:h-[70px]" />
                            </Link>
                          </div>
                          <div className="feature-box-content flex-1">
                            <span className="font-serif text-sm block mb-[5px] uppercase font-medium">By <Link aria-label="link for" to={`/blogs/author/${item.author}`} className="text-[#878787] hover:text-neonorange">{authorData.filter(author => author.id === item.author)[0].name}</Link></span>
                            <Link aria-label="link for" to={`/blog-types/blog-standard-post/${item.id}`} className="font-serif font-medium text-xmd text-darkgray inline-block leading-[26px] text-basecolor hover:text-neonorange">{item.title}</Link>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  })
                  }
                </Swiper>
                <div
                  onClick={() => swiperRef.current.swiper.slideNext()} className="btn-slider-prev absolute top-1/2 z-[1] right-[0px] -translate-y-1/2 text-[40px] text-darkgray h-[50px] w-[50px] leading-[50px] flex justify-center items-center  right-inherit cursor-pointer">
                  <button aria-label="swiper prev" className="text-xmd">
                    <i className="line-icon-Arrow-OutRight text-[40px] text-[#b7b7b7]"></i>
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* Section End */}

      </div>
      {/* Section Start */}
      <section className="py-[130px] pb-[210px] lg:py-[90px] md:pt-[75px] md:pb-[150px] sm:py-[50px] sm:pb-0 bg-lightgray relative bg-center px-[90px] xl:px-[25px] lg:px-[10px] md:px-0" >
        <Container fluid>
          <Row className="justify-center">
            <div className="text-center mb-16">
              <span className="w-[2px] h-[35px] bg-basecolor inline-block mb-[5px]"></span>
              <h2 className="heading-5 font-serif -tracking-[1px] text-darkgray font-medium">Most readable blogs</h2>
            </div>
            <Col className="lg:mb-32 md:mb-12 sm:mb-0">
              <BlogMasonry grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-double-extra-large" data={blogMasonryData.slice(0, 12)} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-darkgray sm:pt-[50px] sm:bg-lightgray">
        <Container className="sm:mb-[50px]">
          <Overlap className="row justify-center items-center mx-0 bg-neonorange rounded-[6px] py-[55px] md:p-10 relative xs:px-[20px] xs:py-[40px]">
            <Col lg={5} className="md:mb-[30px] xs:px-0">
              <h2 className="heading-6 font-serif text-[2.3rem] font-light text-white mb-0 text-start md:text-center w-11/12 md:w-full"><span className="font-semibold">Join our newsletter</span> and get 15% sale discount</h2>
            </Col>
            <Col lg={5} className="xs:px-0">
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
                  <div className="relative subscribe-style-05">
                    <Form className="relative">
                      <Input showErrorMsg={false} type="email" name="email" className="border-[1px] large-input border-solid border-transparent rounded" placeholder="Enter your email address" />
                      <button aria-label="subscribe" type="submit" className={`text-lg tracking-[1px] py-[12px] px-[28px] uppercase xs:text-center${isSubmitting ? " loading" : ""}`}><i className="far fa-envelope text-neonorange text-lg leading-none xs:mr-0"></i></button>
                    </Form>
                    <AnimatePresence>
                      {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-[115%] left-0 w-full"><MessageBox className="rounded-[4px] text-md py-[10px] mb-0 z-[1] px-[22px]" theme="message-box01" variant="success" message="Your message has been sent successfully subscribed to our email list!" /></m.div>}
                    </AnimatePresence>
                  </div>
                )}
              </Formik>
            </Col>
          </Overlap>
        </Container>
        {/* Footer Start */}
        <FooterStyle07 className="text-[#828282] bg-darkgray lifestyleblog-footer" logo="/assets/img/webp/logo-white.webp" theme="dark" />
        {/* Footer End */}
      </section>
      {/* Section End */}

    </div>
  )
}

export default LifestyleBlogPage