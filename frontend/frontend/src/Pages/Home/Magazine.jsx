import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react'
import { m } from "framer-motion";

// Components
import Header, { HeaderLanguage, HeaderNav, Menu, SearchBar, Topbar } from '../../Components/Header/Header'
import SocialIcons from '../../Components/SocialIcon/SocialIcons'
import BlogMetro from '../../Components/Blogs/BlogMetro';
import BlogGrid from '../../Components/Blogs/BlogGrid';
import BlogCategory from "../../Components/Blogs/BlogCategory";
import Instagram from '../../Components/Instagram/Instagram';
import FooterStyle02 from '../../Components/Footers/FooterStyle02'
import SideButtons from "../../Components/SideButtons";
import { fadeIn } from '../../Functions/GlobalAnimations';

// Data
import { blogData } from '../../Components/Blogs/BlogData';
import HeaderData from '../../Components/Header/HeaderData';

const SocialIconsData = [
  {
    color: "#fff",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f text-white",
  },
  {
    color: "#fff",
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble"
  },
  {
    color: "#fff",
    link: "https://twitter.com/",
    icon: "fab fa-twitter text-white",
  },
  {
    color: "#fff",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram"
  }
]

const BlogCategoryData = [
  {
    category: "FOODS",
    img: "https://via.placeholder.com/800x614",

  },
  {
    category: "SUMMER",
    img: "https://via.placeholder.com/800x614",

  },
  {
    category: "LIFESTYLE",
    img: "https://via.placeholder.com/800x614",

  },
  {
    category: "FASHION",
    img: "https://via.placeholder.com/800x614",

  },
]

const blogMetroData = blogData.filter((item) => item.blogType === "metro");

const MagazinePage = (props) => {
  const swiperRef = React.useRef(null)
  return (
    <div style={props.style}>
      <SideButtons />

      {/* Header Start */}
      <Header className="header-with-topbar" topSpace={{ desktop: true }} type="reverse-scroll">
        <Topbar className="bg-darkgray text-white sm:hidden md:px-[15px]">
          <Container fluid="lg">
            <Row className="items-center justify-center">
              <Col className="col-12 col-md-3 header-social-icon d-none d-md-inline-block border-0">
                <SocialIcons theme="social-icon-style-01" className="justify-start" size="xs" iconColor="light" data={SocialIconsData}
                />
              </Col>
              <Col className="col-12 col-md-6 text-center px-md-0 sm-padding-5px-tb line-height-normal">
                <span className="text-sm font-serif uppercase -tracking-[0.5px] inline-block">
                  Free delivery on orders over £120. Don't miss discount.
                </span>
              </Col>
              <Col className="col-auto col-md-3 text-right">
                <SearchBar className="!py-[7px] text-white" />
                <HeaderLanguage className="!py-[7px] pl-[20px] text-white" />
              </Col>
            </Row>
          </Container>
        </Topbar>
        <HeaderNav bg="white" theme="light" containerClass="!px-0" className="py-[0px] md:py-[18px] md:px-[15px] sm:px-0">
          <Col lg={6} xs={"auto"} className="px-lg-0 position-absolute left-0 right-0 mx-lg-auto text-center md:!relative mr-auto">
            <Link aria-label="header logo" className="inline-block relative z-10" to="/">
              <Navbar.Brand className="inline-block p-0 m-0 align-middle">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-yellow-ochre.webp' data-rjs='/assets/img/webp/logo-yellow-ochre@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-yellow-ochre.webp' data-rjs='/assets/img/webp/logo-yellow-ochre@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-yellow-ochre.webp' data-rjs='/assets/img/webp/logo-yellow-ochre@2x.webp' alt='logo' />
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
            <div className="flex justify-between md:hidden col-lg-8 col-xl-8 mx-auto !pl-[25px] !pr-[12px] lg:!pl-[15px] lg:!pr-0">
              <Menu data={HeaderData.slice(0, Math.floor(HeaderData.length / 2))} />
              <Menu data={HeaderData.slice(Math.floor(HeaderData.length / 2), (HeaderData.length - 1))} />
            </div>
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}

      {/* Section Start */}
      <section className="bg-[#f8f4f0] overflow-hidden py-[100px] lg:py-[60px] md:py-[60px] sm:py-[50px] px-[90px] lg:px-[40px] xs:px-0">
        <Container fluid>
          <Row>
            <Col xl={6} className="lg:mb-[10px] py-[10px] px-[10px] font-serif xs:px-[15px] p-[10px] lg:px-[25px] sm:px-[15px]">
              <Swiper ref={swiperRef} className="white-move swiper-pagination-light h-full relative lg:h-[500px] xs:h-[300px]"
                modules={[Keyboard]}
                keyboard={{ enabled: true, onlyInViewport: true }}
                loop={true} >
                <SwiperSlide className="overflow-hidden cover-background relative" style={{ backgroundImage: `url(https://via.placeholder.com/1000x710)` }}>
                  <div className="flex items-center bg-[#000000b3] absolute left-0 bottom-0 w-full py-[55px] xl:py-[20px] lg:py-[55px] md:py-[40px] xs:py-[30px] px-[60px] xl:px-[50px] xs:pl-[30px] xs:pr-[50px] xs:flex-col xs:items-start">
                    <Link aria-label="link for" to="/blogs/blog-grid" className="uppercase ps-0 pr-8 mr-8 border-r border-[#ffffff33] text-[#c89965] tracking-[2px] text-md font-medium tracking-2px font-serif md:border-0 md:mb-[10px] hover:text-white xs:mb-[5px]">Lifestyle</Link>
                    <h2 className="heading-6 m-0">
                      <Link aria-label="link for" to="/blogs/blog-post-layout-01/" className="text-white font-light"> Things to know before dyeing your hair</Link>
                    </h2>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="overflow-hidden cover-background relative" style={{ backgroundImage: `url(https://via.placeholder.com/1000x710)` }}>
                  <div className="flex items-center bg-[#000000b3] absolute left-0 bottom-0 w-full py-[55px] xl:py-[20px] lg:py-[55px] md:py-[40px] xs:py-[30px] px-[60px] xl:px-[50px] xs:pl-[30px] xs:pr-[50px] xs:flex-col xs:items-start">
                    <Link aria-label="link for" to="blogs/blog-grid" className="col-auto uppercase ps-0 pr-8 mr-8 border-r border-[#ffffff33] text-[#c89965] tracking-[2px] text-md font-medium tracking-2px font-serif md:border-0 md:mb-[10px] hover:text-white xs:mb-[5px]">Fashion</Link>
                    <h2 className="heading-6 m-0">
                      <Link aria-label="link for" to="/blogs/blog-post-layout-02/" className="text-white font-300"> Simplicity is the ultimate sophistication</Link>
                    </h2>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="overflow-hidden cover-background relative" style={{ backgroundImage: `url(https://via.placeholder.com/1000x710)` }}>
                  <div className="flex items-center bg-[#000000b3] absolute left-0 bottom-0 w-full py-[55px] xl:py-[20px] lg:py-[55px] md:py-[40px] xs:py-[30px] px-[60px] xl:px-[50px] xs:pl-[30px] xs:pr-[50px] xs:flex-col xs:items-start">
                    <Link aria-label="link for" to="/blogs/blog-grid" className="col-auto uppercase ps-0 pr-8 mr-8 border-r border-[#ffffff33] text-[#c89965] tracking-[2px] text-md font-medium tracking-2px font-serif md:border-0 md:mb-[10px] hover:text-white xs:mb-[5px]">Wildlife</Link>
                    <h2 className="heading-6 m-0">
                      <Link aria-label="link for" to="/blogs/blog-post-layout-03/" className="text-white font-300">The best comfort food will always be greens</Link>
                    </h2>
                  </div>
                </SwiperSlide>
                <div className="h-[140px] absolute w-full bottom-0 md:h-[110px] xs:h-[115px]">
                  <div onClick={() => swiperRef.current.swiper.slideNext()} className="bg-black text-white absolute border-0 top-0 right-0 z-[1] h-1/2 text-[20px] w-[50px] flex justify-center text-center items-center">
                    <i className="feather-arrow-right"></i>
                  </div>
                  <div onClick={() => swiperRef.current.swiper.slidePrev()} className="bg-black text-white absolute bottom-0 border-0 right-0 text-[20px] w-[50px] flex h-1/2 text-center justify-center items-center z-[1]">
                    <i className="feather-arrow-left"></i>
                  </div>
                </div>
              </Swiper>
            </Col>
            <Col xl={6} className="lg:px-[15px] sm:px-[5px] xs:px-0">
              <BlogMetro overlay="#374162" grid="grid grid-2col xl-grid-2col lg-grid-2col md-grid-2col sm-grid-2col xs-grid-1col gutter-large" data={blogMetroData.slice(-2)} link="/blog-types/blog-standard-post/" />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] px-[90px] lg:px-[30px] xs:px-[15px]">
        <Container>
          <Row className="justify-center">
            <Col lg={6} className="text-center mb-10 sm:mb-6">
              <h2 className="heading-5 font-serif font-semibold text-darkgray mb-[5px]">Popular category</h2>
              <p className="mb-[25px]">Explore our blog for insightful articles</p>
            </Col>
          </Row>
        </Container>
        <Container fluid className="lg:px-0">
          <BlogCategory grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={BlogCategoryData} animation={fadeIn} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] bg-[#f8f4f0] px-[75px] xl:px-[30px] lg:px-[15px] sm:px-0">
        <Container>
          <Row className="justify-center">
            <Col lg={6} className="text-center mb-10 sm:mb-6">
              <h2 className="heading-5 font-serif font-semibold text-darkgray mb-[5px]">Latest article</h2>
              <p className="mb-[25px]">Explore our blog for insightful articles</p>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <BlogGrid overlay="#374162" pagination={false} className="magazine-blog-grid" grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={blogData.slice(0, 10)} />
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Instagram carousel={true}
            carouselOption={{
              loop: true,
              slidesPerView: 2,
              spaceBetween: 15,
              autoplay: { "delay": 3500, "disableOnInteraction": false },
              keyboard: { "enabled": true, "onlyInViewport": true },
              breakpoints: { 1200: { slidesPerView: 6 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 3 } }
            }}
            total_posts={8} title="#instagram decor" grid="" />
        </Container>
      </m.section>
      {/* Section End */}

      {/* Footer Start */}
      <FooterStyle02 className="text-[#828282] bg-darkgray" theme="dark" />
    </div>
  )
}

export default MagazinePage