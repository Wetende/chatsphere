import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { m } from "framer-motion";
import { Link } from "react-router-dom";


// Components
import Header, { HeaderNav, Menu } from '../../../Components/Header/Header';
import ImageGallery from '../../../Components/ImageGallery/ImageGallery';
import SocialIcons from '../../../Components/SocialIcon/SocialIcons';
import BlogClean from '../../../Components/Blogs/BlogClean';
import { blogData } from '../../../Components/Blogs/BlogData';
import Buttons from '../../../Components/Button/Buttons';
import { TiltBox } from '../../../Components/FancyText/FancyText'
import FooterStyle01 from '../../../Components/Footers/FooterStyle01';

import CustomModal from '../../../Components/CustomModal'
import SideButtons from "../../../Components/SideButtons";
import { fadeIn } from '../../../Functions/GlobalAnimations';
import CommentBox from '../../../Components/Blogs/HelperComponents/CommentBox';

// Data
const ImagesGalleryData = [
  {
    src: "https://via.placeholder.com/800x1060",
    title: "Lightbox gallery image title"
  },
  {
    src: "https://via.placeholder.com/800x1060",
    title: "Lightbox gallery image title"
  },
  {
    src: "https://via.placeholder.com/800x1060",
    title: "Lightbox gallery image title"
  },
]

const SocialIconsData = [
  {
    color: "#3b5998",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "#00aced",
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  },
  {
    color: "#fe1f49",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram"
  },
  {
    color: "#0077b5",
    link: "https://www.linkedin.com/",
    icon: "fab fa-linkedin-in"
  },
  {
    color: "#1769ff",
    link: "https://www.behance.net/",
    icon: "fab fa-behance"
  }
]

const SocialIconsHeaderData = [
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

// Filter the blog data category wise
const blogCleanData = blogData.filter((item) => item.blogType === "clean");

const BlogPostLayout05 = (props) => {
  return (
    <div style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ desktop: false, md: true }} type="reverse-scroll" theme="light" bg="light" menu="light">
        <HeaderNav fluid="fluid" theme="dark" expand="lg" containerClass="sm:px-0" className="py-[0px] px-[35px] md:py-[18px] md:px-0">
          <Col sm={6} lg={2} className="col-auto me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <div className="order-last px-[15px] md:ml-[17px] sm:ml-[10px] hidden md:block">
            <Navbar.Toggle>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
            </Navbar.Toggle>
          </div>
          <Navbar.Collapse className="col-auto col-lg-8 justify-center">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto col-lg-2 text-end pe-0">
            <SocialIcons data={SocialIconsHeaderData} theme="light" size="xs" iconColor='black' />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Stat */}
      <section className="cover-background py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]" style={{ backgroundImage: "url(https://via.placeholder.com/1920x900)" }}>
        <div className="absolute top-0 left-0 w-full h-full opacity-60 bg-darkgray"></div>
        <Container>
          <Row>
            <Col lg={8} md={10} className="relative h-[600px] flex justify-end flex-col sm:h-[400px]">
              <h2 className="font-serif text-white font-medium mb-[5.5rem] w-[85%] lg:w-full">Nature always wears the colors of the spirit</h2>
              <ul>
                <li className="inline-block mr-[50px] xs:block xs:mb-[10px] xs:mr-0">
                  <span className="text-white opacity-50 block">Author name</span>
                  <Link aria-label="link" to="/blogs/blog-grid" className="text-white font-serif">Colene landin</Link>
                </li>
                <li className="inline-block mr-[50px] xs:block xs:mb-[10px] xs:mr-0">
                  <span className="text-white opacity-50 block">Publication date</span>
                  <span className="text-white font-serif">9 October 2020</span>
                </li>
                <li className="inline-block mr-[50px] xs:block xs:mr-0">
                  <span className="text-white opacity-50 block">Categories</span>
                  <Link aria-label="link" to="/blogs/blog-grid" className="text-white font-serif">Latest fashion</Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col md={7} className="sm:mb-[30px]">
              <h6 className="text-darkgray font-medium">We finished our first sensor sweep of the neutral zone. You did exactly what you had to do. You considered all your options you tried every alternative</h6>
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. Morbi eu ipsum orci pellentesque et vulputate odio sed finibus nibh. Etiam sit amet dictum nibh at pharetra quam aliquam luctus suscipit erat eget dignissim. In bibendum felis id justo venenatis rhoncus suspendisse potenti duis et gravida purus, laoreet maximus nibh. Maecenas malesuada ac risus rutrum gravida. Phasellus nec mi luctus, egestas magna eget, consequat sem.</p>
            </Col>
            <Col lg={{ span: 4, offset: 1 }} md={5}>
              <div className="items-start h-full justify-center flex flex-col p-[4.5rem] bg-neonorange bg-no-repeat bg-right-bottom lg:p-12" style={{ backgroundImage: "url(/assets/img/webp/blog-post-layout-01-img-11.webp)" }}>
                <i className="fas fa-quote-left text-white text-[32px] mb-[30px]"></i>
                <h6 className="text-darkgray -tracking-[0.5px] w-full">Style is a way to say who you are without having to speak</h6>
                <span className="font-serif uppercase text-md text-white">Rachel Landin</span>
              </div>
            </Col>

          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="overflow-hidden">
        <Container className="px-0">
          <Row>
            <ImageGallery animation={fadeIn} grid="grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large text-center" theme="image-gallery-01 flex" data={ImagesGalleryData} overlay="#232323" className="" />
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Secrion Start */}
      <m.section {...{ ...fadeIn, transition: { delay: 0.2 } }} className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col md={10}>
              <h6 className="text-darkgray font-medium">What's my style is not your style, and I don’t see how you can define it. It’s something that expresses who you are in your own way.</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id massa ac orci aliquet dictum scelerisque vel turpis. Nunc quis fermentum ipsum. Proin finibus arcu id condimentum dapibus. Aliquam erat volutpat. Proin quis metus viverra, sodales leo vitae, ullamcorper risus. In justo tellus, vulputate et sem non, tristique interdum libero. Fusce blandit mattis mauris ac aliquam. Donec mauris lacus tempor non dui commodo bibendum efficitur nibh ut elit dui auctor id tortor quis bibendum tempor orci mauris sed commodo lacus.</p>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Secrion End */}

      {/* Section Start */}
      <m.section {...{ ...fadeIn, transition: { delay: 0.2 } }} className="pt-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center z-index-0 relative">
            <Col>
              <TiltBox>
                <div className="relative cover-background h-[700px] md:h-[550px] sm:h-[350px]" style={{ backgroundImage: 'url(https://via.placeholder.com/1350x900)' }}>
                  <div className="absolute top-0 left-0 h-full w-full opacity-30 bg-darkgray"></div>
                </div>
              </TiltBox>
            </Col>
            <div className="absolute top-1/2 left-1/2 w-auto h-auto z-[5] -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
              {/* Modal Component Start */}
              <CustomModal.Wrapper
                className="absolute top-0 items-center h-full right-1/2 contents md:right-0 md:justify-center md:w-full"
                modalBtn={<Buttons type="submit" className="btn-sonar border-0 mx-auto" themeColor="#fff" color="#232323" size="lg" title={<i className="icon-control-play" />} />} >
                <div className="w-[1020px] max-w-full relative rounded mx-auto">
                  <div className="fit-video">
                    <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                  </div>
                </div>
              </CustomModal.Wrapper>
              {/* Modal Component End */}
            </div>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="pt-0 py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center items-center">
            <m.div {...fadeIn} className="col-12 col-sm-2 col-lg-1 sm:text-end xs:mb-[10px] xs:text-start">
              <i className="fas fa-quote-left text-neonorange text-[32px] mr-[30px]"></i>
            </m.div>
            <m.div {...{ ...fadeIn, transition: { delay: 0.5 } }} className="col-12 col-xl-7 col-lg-8 col-md-9 col-sm-10 border-l border-mediumgray xs:border-0">
              <h6 className="font-serif font-medium text-darkgray ml-[30px] mb-0 leading-[40px] xs:ml-0 xs:leading-[30px]">What's my style is not your style, and I don’t see how you can define it. It’s something that expresses who you are in your own way.</h6>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section>
        <Container>
          <m.div {...fadeIn} className="row justify-center">
            <Col xs={12} className="mb-20 xs:mb-[15px]">
              <img width="" height="" src="https://via.placeholder.com/1350x900" alt="" />
            </Col>
            <Col xs={12}>
              <img width="" height="" src="https://via.placeholder.com/1350x900" alt="" />
            </Col>
          </m.div>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section {...fadeIn} className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row>
            <Col lg={10} className="flex flex-wrap items-center mx-auto mb-[35px] sm:block">
              <Col md={9} className="md:text-start sm:mb-[10px] xs:text-center px-0 sm:justify-center">
                <div className="tag-cloud flex flex-wrap sm:justify-center gap-y-5">
                  <Link aria-label="tag" className="!mr-[8px] mb-[10px]" to="/blogs/blog-grid">Development</Link>
                  <Link aria-label="tag" className="!mr-[8px] mb-[10px]" to="/blogs/blog-grid">Events</Link>
                  <Link aria-label="tag" className="!mr-[8px] mb-[10px]" to="/blogs/blog-grid">Media</Link>
                  <Link aria-label="tag" className="!mr-[8px] mb-[10px]" to="/blogs/blog-grid">Mountains</Link>
                </div>
              </Col>
              <Col md={3} className="text-center md:text-end px-0 flex justify-end sm:justify-center">
                <Link aria-label="link" className="uppercase text-darkgray text-xs w-auto font-medium inline-block border border-mediumgray rounded pt-[5px] pb-[6px] px-[18px] mb-[10px] leading-[20px] hover:text-black hover:shadow-[0_0_10px_rgba(23,23,23,0.10)] transition-default" to="#">
                  <i className="far fa-heart mr-2 text-[#fa5c47]">
                  </i><span>05 Likes</span>
                </Link>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col lg={10} className="mx-auto mb-[60px] md:mb-[30px] ">
              <div className="flex items-center w-full bg-white rounded-[5px] p-16 sm:block shadow-[0_0_15px_rgba(0,0,0,0.1)]">
                <div className="w-[130px] mr-[60px] sm:mx-auto text-center">
                  <img width="" height="" src="https://via.placeholder.com/125x125" className="rounded-full w-[110px] mx-auto" alt="" />
                  <Link aria-label="link" to="/blogs/blog-grid" className="text-darkgray font-serif font-medium mt-[20px] inline-block text-md hover:text-fastblue">Colene Landin</Link>
                  <span className="text-md block leading-[18px] sm:mb-[15px]">Co-founder</span>
                </div>
                <div className="w-[75%] md:text-start sm:w-full sm:text-center">
                  <p className="mb-[25px]">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  <Buttons to="/blogs/blog-grid" className="font-medium font-serif after:bg-black after:h-[2px] pt-0 hover:text-black uppercase btn-link md:mb-[15px]" color="#232323" size="lg" title="All author posts" />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="col-12 col-lg-10 justify-center text-center mx-auto">
              <SocialIcons theme="social-icon-style-09" className="mt-auto justify-center" size="md" iconColor="dark" data={SocialIconsData} animation={fadeIn} animationDelay={0.3} />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden">
        <Container className="sm:px-0">
          <Row className="justify-center">
            <Col lg={5} md={6} className="text-center mb-20">
              <span className="font-serif font-medium uppercase inline-block">You may also like</span>
              <h5 className="font-serif font-medium text-darkgray -tracking-[1px]">Related posts</h5>
            </Col>
          </Row>
          <BlogClean filter={false} overlay={["#0039e3", "#4132e0", "#5e28dd", "#741bd9", "#8600d4"]} pagination="false" grid="grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={blogCleanData.slice(0, 3)} />
        </Container>
      </section>
      {/* Section End */}

      <CommentBox />

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
      {/* Footer End */}
    </div>
  )
}

export default BlogPostLayout05