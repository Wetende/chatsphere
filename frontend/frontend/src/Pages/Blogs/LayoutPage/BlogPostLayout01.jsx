import React from 'react'

// Libraries
import { m } from 'framer-motion';
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

// Components
import Dropcaps from '../../../Components/Dropcaps/Dropcaps';
import Blockquote from '../../../Components/BlockQuote/Blockquote'
import { TiltBox } from '../../../Components/FancyText/FancyText'
import Overlap from '../../../Components/Overlap/Overlap';
import { fadeIn } from '../../../Functions/GlobalAnimations';
import Lists from '../../../Components/Lists/Lists';
import SocialIcons from '../../../Components/SocialIcon/SocialIcons';
import Buttons from '../../../Components/Button/Buttons';
import BlogClean from '../../../Components/Blogs/BlogClean';
import Header, { HeaderNav, Menu } from '../../../Components/Header/Header';
import FooterStyle01 from '../../../Components/Footers/FooterStyle01';
import SideButtons from "../../../Components/SideButtons";
import CommentBox from '../../../Components/Blogs/HelperComponents/CommentBox';

// Data
import { blogData } from '../../../Components/Blogs/BlogData';

const SocialIconsHeaderData = [
  {
    color: "#828282",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f",
  },
  {
    color: "#828282",
    link: "https://www.instagram.com/",
    icon: "fab fa-instagram"
  },
  {
    color: "#828282",
    link: "https://twitter.com/",
    icon: "fab fa-twitter",
  },
];

const ListData02 = [
  {
    icon: "feather-arrow-right-circle",
    content: "Beautiful and easy to understand animations",
  },
  {
    icon: "feather-arrow-right-circle",
    content: "Theme advantages are pixel perfect design",
  },
  {
    icon: "feather-arrow-right-circle",
    content: "Theme advantages are pixel perfect design",
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

// Filter the blog data category wise
const blogCleanData = blogData.filter((item) => item.blogType === "clean");

const BlogPostLayout01 = (props) => {
  return (
    <div style={props.style}>

      {/* Header Start */}
      <Header topSpace={{ md: true }} type="reverse-scroll" theme="light" bg="light" menu="light">
        <HeaderNav fluid="fluid" theme="dark" menu="light" expand="lg" containerClass="sm:px-0" className="py-[0px] px-[35px] md:py-[18px] md:px-0">
          <Col sm={6} lg={2} className="col-auto me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-black.webp' data-rjs='/assets/img/webp/logo-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <div className="order-last px-[15px] md:ml-[10px] sm:ml-0 hidden md:block">
            <Navbar.Toggle className="ml-[10px]">
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
            <SocialIcons
              theme="social-icon-style-01"
              size="xs"
              iconColor="light"
              data={SocialIconsHeaderData}
              className="justify-end"
            />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <section className="h-[700px] sm:h-[400px] xs:h-[300px] cover-background" style={{ backgroundImage: "url(https://via.placeholder.com/1920x730)" }}></section>
      {/* Section End */}

      {/* Section Start */}
      <section className="pb-0 sm:py-[50px] xs:overflow-hidden">
        <Container className="xs:p-0">
          <Row className="justify-center z-10">
            <Overlap className="!px-0">
              <TiltBox className="p-0">
                <Col lg={10} className="font-serif text-center bg-[#ca7741] text-white py-[7rem] px-[15px] relative mx-auto" style={{ backgroundImage: "url('/assets/img/webp/blog-post-layout-02-img-pattern.webp')" }}>
                  <div className="w-[1px] h-[90px] bg-white mx-auto absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="uppercase text-md font-medium mb-[25px] font-serif">
                    <div className='text-white bg-black'></div>
                    <Link aria-label="link" to="/blogs/blog-grid" className="text-white inline-block">Creative</Link>
                    <span className="mx-[20px] w-[1px] h-[10px] bg-white inline-block"></span>
                    <Link aria-label="link" to="/blogs/blog-grid" className="inline-block text-white">Freebies</Link>
                    <span className="mx-[20px] w-[1px] h-[10px] bg-white inline-block"></span>
                    <Link aria-label="link" to="/blogs/blog-grid" className="inline-block text-white">Events</Link></div>
                  <h3 className="font-semibold w-1/2 mx-auto md:w-[70%] xs:w-[90%]">we are a creative pottery studio</h3>
                  <div className="inline-block text-[#ffffffb3]  mt-[5px]">By <Link aria-label="link" to="/blogs/blog-grid" className="inline-block text-[#e6dfdf] hover:text-[#fff] cursor-pointer">Shane smith </Link> on <span className="inline-block text-[#e6dfdf]">26 November 2019 </span> </div>
                </Col>
              </TiltBox>
            </Overlap>
          </Row>
        </Container>
      </section>
      {/* Seaction End */}

      {/* Section Start */}
      <section className="py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row className="row justify-center">
            <Col lg={10} className="px-0">
              <Row className="items-center">
                <m.div {...fadeIn} className="col-12 col-md-6 sm:mb-[30px] sm:px-[30px]">
                  <img width="" height="" src="https://via.placeholder.com/800x917" alt="" />
                </m.div>
                <m.div {...{ ...fadeIn, transition: { delay: 0.6 } }} className="col-12 col-lg-5 offset-lg-1 col-md-6 sm:px-[30px]">
                  <span className="text-[#ca7741] font-serif uppercase font-medium mb-[25px] sm:mb-[15px] block xs:mb-base">The decorative arts</span>
                  <h5 className="font-serif text-darkgray mb-[35px] font-medium xs:mb-[25px]">Pottery is the process and the products of <span className="font-semibold">forming vessels</span></h5>
                  <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries but also the leap into electronic typesetting remaining essentially unchanged.</p>
                </m.div>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Seaction End */}

      {/* Section Start */}
      <section className="bg-[#ca7741] py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px] mx-auto h-[700px] lg:h-[635px] md:h-[571px] sm:h-auto" style={{ backgroundImage: "url('/assets/img/webp/blog-post-layout-02-img-pattern.webp')" }}>
        <Container>
          <m.div {...fadeIn} className="row justify-center">
            <Col xl={7} lg={8} md={10} className="text-center">
              <span className="font-serif block text-white text-uppercase font-medium mb-[25px]">These artists are masters at pottery</span>
              <h5 className="font-serif font-medium text-white inline-block w-[90%] mb-[7%] sm:mb-[10px]">Pottery, one of the oldest and most widespread of the decorative arts</h5>
            </Col>
          </m.div>
        </Container>
      </section>
      {/* Seaction End */}

      {/* Section Start */}
      <section className="md:pt-0 xs:overflow-hidden pb-0 sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col className="col-12 col-md-10 px-0">
              <Overlap>
                <Row className="gap-y-5">
                  <m.div {...fadeIn} className="col-12 col-md-6 sm:mb-base xs:px-[30px]">
                    <img width="" height="" src="https://via.placeholder.com/800x600" alt="" />
                    <div className="p-[63px] lg:p-[58px] bg-darkgray md:p-[3rem]">
                      <h6 className="font-serif text-xlg lg:text-lg lg:leading-[24px] md:leading-[26px] text-white">Architecture tends to everything else has become enjoying life</h6>
                      <p>Lorem ipsum has been the industry's standard dummy text ever since when an unknown printer the  took of  the galley of type and scram bled it to make on type in specimen book.</p>
                    </div>
                  </m.div>
                  <m.div {...{ ...fadeIn, transition: { delay: 0.6 } }} className="col-12 col-md-6 flex xs:px-[30px]">
                    <div className="cover-background w-full sm:h-[450px]" style={{ backgroundImage: "url('https://via.placeholder.com/800x1100')" }}></div>
                  </m.div>
                </Row>
              </Overlap>
            </Col>
          </Row>

        </Container>
      </section>
      {/* Seaction End */}

      {/* Section Start */}
      <m.section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col xs={12} md={10}>
              <Dropcaps theme="dropcaps-style04" content="Mlorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has suvived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." />
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Seaction End */}

      {/* Section Start */}
      <section>
        <Container fluid>
          <Row>
            <m.div {...fadeIn} className="col-12 col-xl-4 col-md-6 order-md-2 order-xl-1 text-white flex px-0 justify-center">
              <Blockquote
                className="bg-[#ca7741] p-[8.5rem] xl:p-[5.5rem] md:p-[4.5rem] font-light flex flex-col justify-center"
                theme="blockquote-style-01"
                title="Architecture tends to consume everything else it has become one's entire life."
                icon="ti-quote-left"
                author="- ARNE JACOBSEN"
              />
            </m.div>
            <m.div {...{ ...fadeIn, transition: { delay: 0.6 } }} className="col-12 col-xl-4 order-md-1 order-xl-2 bg-cover bg-center lg:h-[500px]" style={{ backgroundImage: "url('https://via.placeholder.com/800x800')" }}></m.div>
            <m.div {...{ ...fadeIn, transition: { delay: 0.8 } }} className="col-12 col-xl-4 col-md-6 order-md-3 bg-darkgray p-[8.5rem] xl:p-[5.5rem] md:p-[4.5rem]">
              <h5 className="font-serif text-white">Pottery is one of the most relaxing things you can watch!</h5>
              <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been standard dummy text ever since. Lorem ipsum has been book on industry lorem ipsum has been.</p>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Seaction End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="justify-center">
            <Col lg={10}>
              <m.div {...fadeIn} className="row">
                <Col md={6}>
                  <h6 className="font-serif text-darkgray w-[80%] font-medium lg:w-[90%] md:w-full">You have to be in tune with the clay and react to what state it’s in to work with it</h6>
                </Col>
                <Col md={6}>
                  <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been standard dummy text ever since. Lorem ipsum been the industry consectetur eiusmod tempor. Lorem ipsum been the industry tempor.</p>
                </Col>
              </m.div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Seaction End */}

      {/* Section Start */}
      <section className="cover-background py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" style={{ backgroundImage: "url('https://via.placeholder.com/1920x1100')" }}>
        <Container>
          <Row className="justify-center">
            <m.div className="col-sn-10 col-11" {...fadeIn}>
              <Row className="justify-center flex landscape:lg:justify-center">
                <Col xl={7} lg={8} className="p-24 bg-white drop-shadow-2xl shadow-darkgray xs:p-[3rem]">
                  <h5 className="font-serif text-darkgray font-medium">To create, one must first question everything</h5>
                  <p className="mb-[25px]">With years of experience in the website design and development industry ThemeZaa pride ourselves on creating unique, creative & quality designs that are developed upon the latest coding.</p>
                  <Lists theme="list-style-02" className="text-darkgray" data={ListData02} animation={fadeIn} animationDelay={0.3} />
                </Col>
              </Row>
            </m.div>
          </Row>
        </Container>
      </section>
      {/* Seaction End */}

      {/* Section Start */}
      <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="row justify-center">
            <Col xl={10} lg={11}>
              <Row>
                <m.div {...fadeIn} className="col-12 col-md-6 mb-[4.5rem] sm:mb-[8.5rem]">
                  <div className="cover-background h-[450px] flex items-end px-[30px] overflow-visible xs:px-[15px]" style={{ backgroundImage: "url('https://via.placeholder.com/800x750')" }}>
                    <div className="text-center bg-white px-[45px] py-[55px] bottom-[-50px] relative shadow-[0_0_20px_rgba(0,0,0,0.08)] lg:px-[35px] xs:px-5 xs:py-[35px]">
                      <span className="text-xmd text-darkgray font-serif mb-[5px] font-medium inline-block">The great building must begin</span>
                      <p>Lorem ipsum is simply dummy text of the printing and typesetting industry</p>
                    </div>
                  </div>
                </m.div>
                <m.div {...{ ...fadeIn, transition: { delay: 0.6 } }} className="col-12 col-md-6 mb-[4.5rem]">
                  <div className="cover-background h-[450px] flex items-end px-[30px] overflow-visible xs:px-[15px]" style={{ backgroundImage: "url('https://via.placeholder.com/800x750')" }}>
                    <div className="text-center bg-white px-[45px] py-[55px] bottom-[-50px] relative shadow-[0_0_20px_rgba(0,0,0,0.08)] lg:px-[35px] xs:px-5 xs:py-[35px]">
                      <span className="text-xmd text-darkgray font-serif mb-[5px] font-medium inline-block">There are no rules of architecture</span>
                      <p>Lorem ipsum is simply dummy text of the on printing and typesetting industry</p>
                    </div>
                  </div>
                </m.div>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Seaction End */}

      {/* Section Start */}
      <m.section {...fadeIn} className="pb-[130px] overflow-hidden lg:pb-[90px] md:pb-[75px] sm:pb-[50px]">
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
            <Col className="col-12 col-lg-10 text-center justify-center mx-auto">
              <SocialIcons animation={fadeIn} theme="social-icon-style-09" className="mt-auto justify-center" size="md" iconColor="dark" data={SocialIconsData} />
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

export default BlogPostLayout01