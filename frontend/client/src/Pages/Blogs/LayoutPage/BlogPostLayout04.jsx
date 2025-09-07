import React from 'react'

// Libraries
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { m } from "framer-motion";

// Components
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../../Components/Header/Header";
import Buttons from '../../../Components/Button/Buttons';
import SocialIcons from '../../../Components/SocialIcon/SocialIcons';
import BlogClean from '../../../Components/Blogs/BlogClean';
import { TiltBox } from '../../../Components/FancyText/FancyText'
import FooterStyle01 from '../../../Components/Footers/FooterStyle01';
import Overlap from '../../../Components/Overlap/Overlap'
import SideButtons from "../../../Components/SideButtons";
import { fadeIn, fadeInLeft, fadeInRight } from "../../../Functions/GlobalAnimations";
import CommentBox from '../../../Components/Blogs/HelperComponents/CommentBox';

// Data
import { blogData } from '../../../Components/Blogs/BlogData';

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
  },
]

// Filter the blog data category wise
const blogCleanData = blogData.filter((item) => item.blogType === "clean");

const BlogPostLayout04 = (props) => {
  return (
    <div style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ desktop: false, md: true }} type="reverse-scroll">
        <HeaderNav fluid="fluid" theme="dark" className="px-[35px] py-[0px] md:px-0" containerClass="sm:px-0">
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
            <SearchBar className="xs:pl-[15px] pr-0" />
            <HeaderLanguage className="xs:pl-[15px]" />
            <HeaderCart className="xs:pl-[15px]" style={{ "--base-color": "#0038e3" }} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <section style={{ backgroundImage: "url(/assets/img/webp/blog-post-layout-05-img-12.webp)" }} className="py-[130px] h-[607px] overflow-hidden lg:py-[90px] sm:py-[50px] lg:h-[490px] sm:h-[400px] xs:h-auto">
        <Container>
          <Row>
            <Col lg={6} xl={{ offset: 1 }} md={6} className="flex justify-center flex-col pt-[6.5rem] sm:pt-16 xs:pt-0">
              <div className='inline-block uppercase mb-[25px] text-white leading-[22px]'>
                <Link aria-label="link" to="/blogs/blog-grid" className='text-white font-serif'>nature</Link>
                <span className="opacity-50">&nbsp;&nbsp;on&nbsp;&nbsp;</span>
                <span className='text-white font-serif'>23 November 2019</span>
              </div>
              <h3 className='font-serif text-white w-[90%] sm:mb-0 font-medium xs:mb-[25px] lg:w-[95%]'>Creativity is nothing but a mind set free</h3>
            </Col>
            <Col md={3} className="justify-center flex-col pt-[65px] md:pt-[66px] sm:hidden">
              <span className='h-[1px] opacity-50 bg-white w-full inline-block align-middle mt-[7.4rem] lg:mt-36'></span>
            </Col>
            <Col xl={2} md={3} className="flex justify-center items-start flex-col pt-[65px] sm:py-16 xs:px-0 xs:py-0">
              <Link aria-label="link" to="/blogs/blog-grid" className='ml-[15px] font-medium text-white font-serif'>By Colene landin</Link>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className='visible py-0 '>
        <Container fluid>
          <Row className='mt-[-100px] z-0 relative items-center justify-end lg:mt-[-80px] md:mt-[-60px] sm:mt-0'>
            <Col className='left-[-50px] block absolute p-0'>
              <span className='opacity-10 font-bold tracking-[-7px] text-darkgray text-[200px] leading-[200px] font-serif lg:text-[160px] md:text-[120px] sm:hidden'>business</span>
            </Col>
            <Col md={9} className='relative px-0'>
              <img width="" height="" src="https://via.placeholder.com/1500x850" alt="" className='w-full' />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className='py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]'>
        <Container>
          <m.div className="row" {...fadeIn}>
            <Col lg={{ span: 9, offset: 1 }} className=''>
              <h5 className='font-medium text-darkgray font-serif'>The ones who are crazy enough to think they can change the world, are the ones that do</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit. In molestie elit quis risus mattis ornare pellentesque quam lacus rhoncus non leo non iaculis posuere felis. Nulla accumsan facilisis arcu vel sagittis. Donec tincidunt quam vel tellus cursus interdum. Maecenas nulla tellus viverra a pharetra quis convallis et lorem. Vestibulum ornare tincidunt scelerisque.</p>
            </Col>
          </m.div>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className='p-0 overflow-hidden'>
        <Container fluid className='px-[30px] sm:px-[15px]'>
          <Row>
            <m.div className='col-12 col-xl-3 col-md-6 pt-[40px] lg:px-[15px] sm:pt-0 sm:mb-[15px]' {...{ ...fadeIn, transition: { delay: 0.2 } }}>
              <img width="" height="" src="https://via.placeholder.com/800x980" alt="" />
            </m.div>
            <m.div className='col-12 col-xl-3 col-md-6 lg:px-[15px] sm:mb-[15px]' {...{ ...fadeIn, transition: { delay: 0.4 } }}>
              <img width="" height="" src="https://via.placeholder.com/800x980" alt="" />
            </m.div>
            <m.div className='col-12 col-xl-3 col-md-6 pt-[40px] lg:px-[15px] sm:pt-0 sm:mb-[15px]' {...{ ...fadeIn, transition: { delay: 0.6 } }}>
              <div className='p-24 bg-darkgray text-white h-full flex items-start flex-col justify-center xl:p-8 lg:p-24 md:p-16'>
                <h6 className='font-serif w-full'>All progress takes place outside the comfort zone</h6>
                <p className='opacity-60 w-full mb-[35px]'>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the when an unknown printer.</p>
                <Buttons href="#" className="font-medium font-serif uppercase rounded-none md:mb-[15px] bg-darkgray hover:text-black" color="#fff" size="sm" themeColor="#fff" title="read more" />
              </div>
            </m.div>
            <m.div className='col-12 col-xl-3 col-md-6 lg:px-[15px]' {...{ ...fadeIn, transition: { delay: 0.8 } }}>
              <img width="" height="" src="https://via.placeholder.com/800x980" alt="" />
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className='py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]'>
        <Container>
          <m.div className='row xl:justify-center' {...fadeIn}>
            <Col lg={{ span: 9, offset: 1 }}>
              <h5 className='font-serif font-medium text-darkgray'>Success is not the key to happiness. Happiness is the key to success. If you love what you are doing you will be successful</h5>
              <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries but also the leap into electronic typesetting remaining essentially unchanged. It was popularised in the with the release of letraset sheets containing lorem ipsum passages and more recently with desktop. Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
            </Col>
          </m.div>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className='pt-[420px] pb-[255px] overflow-hidden lg:pt-[300px] md:pt-[200px] md:block sm:hidden' style={{ backgroundImage: "url(/assets/img/webp/blog-post-layout-05-img-12.webp)" }}></section>
      {/* Section End */}

      {/* Section Start */}
      <section>
        <Container>
          <Row className='items-end relative'>
            <Overlap className="mb-24 sm:mb-[15px] px-[15px] col-12 col-lg-5 offset-lg-1 col-md-6 overflow-hidden">
              <m.div {...fadeInRight}>
                <TiltBox>
                  <h1 className='text-center text-black font-sans font-semibold mb-0 -tracking-[4px]'>01</h1>
                  <div className='mx-auto w-[1px] h-[110px] bg-black relative top-[25px]'></div>
                  <img width="" height="" src="https://via.placeholder.com/800x990" alt='' />
                </TiltBox>
              </m.div>
            </Overlap>
            <Overlap className="col-lg-5 col-md-6 px-[15px] mb-24 overflow-hidden">
              <m.div {...fadeInLeft}>
                <TiltBox>
                  <div className='text-start p-[6.5rem] bg-darkgray flex items-start flex-col justify-center lg:p-[52px] sm:py-16 sm:px-28 xs:p-16'>
                    <h6 className='font-serif text-white w-[90%]'>Success is not the key to happiness. Happiness is the key to success. If you love what you are doing you will successful.</h6>
                    <span className='font-serif uppercase -tracking-[1px] font-medium'>Albert schweitzer</span>
                  </div>
                  <div className='mx-auto w-[1px] h-[110px] bg-black relative top-[-25px]'></div>
                  <h2 className='text-center text-black font-sans font-semibold tracking-[-4px] mb-0'>02</h2>
                </TiltBox>
              </m.div>
            </Overlap>
          </Row>
          <Row>
            <m.div className='col-12 col-lg-5 col-md-6 offset-lg-1 sm:mb-[15px]' {...{ ...fadeIn, transition: { delay: 0.2 } }}>
              <span className='font-serif block font-medium text-darkgray mb-[10px]'>Innovation work collaboration</span>
              <p className='w-[85%] md:w-full'>Lorem ipsum is simply dummy text of the printing typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled.</p>
            </m.div>
            <m.div className='col-12 col-lg-5 col-md-6' {...{ ...fadeIn, transition: { delay: 0.4 } }}>
              <span className='font-serif block font-medium text-darkgray mb-[10px]'>Just look like and feels like</span>
              <p className='w-[85%] md:w-full'>Lorem ipsum is simply dummy text of the printing typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley of type and scrambled.</p>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <m.div className="row" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
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
          </m.div>
          <m.div className="row" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
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
          </m.div>
          <m.div className="row" {...{ ...fadeIn, transition: { delay: 0.6 } }}>
            <Col className="col-12 justify-center text-center elements-social social-icon-style-09 mx-auto">
              <SocialIcons theme="social-icon-style-09" className="mt-auto justify-center" size="md" iconColor="dark" data={SocialIconsData} animation={fadeIn} animationDelay={0.3} />
            </Col>
          </m.div>
        </Container>
      </section>
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

export default BlogPostLayout04