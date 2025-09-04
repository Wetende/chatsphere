import React from 'react'

// Libraries
import { m } from 'framer-motion'
import { Navbar, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Components
import Blockquote from '../../../Components/BlockQuote/Blockquote'
import Buttons from '../../../Components/Button/Buttons'
import Lists from '../../../Components/Lists/Lists'
import { fadeIn } from '../../../Functions/GlobalAnimations'
import Dropcaps from '../../../Components/Dropcaps/Dropcaps'
import SocialIcons from '../../../Components/SocialIcon/SocialIcons'
import BlogClean from '../../../Components/Blogs/BlogClean'
import Overlap from '../../../Components/Overlap/Overlap'
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../../Components/Header/Header";
import CustomModal from '../../../Components/CustomModal'
import FooterStyle01 from '../../../Components/Footers/FooterStyle01'
import SideButtons from "../../../Components/SideButtons";
import CommentBox from '../../../Components/Blogs/HelperComponents/CommentBox'

// Data
import { blogData } from '../../../Components/Blogs/BlogData'

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
    content: "Expertise to build the things that matter for you",
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

const BlogPostLayout03 = (props) => {

  return (
    <div style={props.style} >

      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav fluid="fluid" theme="light" expand="lg" bg="white" className="px-[35px] py-[0px] md:px-0" containerClass="sm:px-0">
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
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
            <HeaderCart style={{ "--base-color": "#0038e3" }} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <section className="pt-[130px] lg:pt-[90px] md:pt-[75px] sm:pt-[50px] pb-0 overflow-visible relative bg-lightgray px-[11%] lg:px-[4%]" >
        <Container fluid>
          <Row>
            <Col lg={6} className="order-2 z-10 pl-40 pb-[60px] lg:pl-12 md:pl-[15px]">
              <div className="flex flex-col justify-center h-full">
                <div className="font-serif text-fastblue uppercase font-medium mb-[30px] xs:mb-[10px]">
                  <Link aria-label="link" to="/blogs/blog-grid" className="text-fastblue hover:text-fastblue">Creative</Link><span className="mx-[10px]">&#8226;</span>
                  <Link aria-label="link" to="/blogs/blog-grid" className="text-fastblue hover:text-fastblue">Freebies</Link><span className="mx-[10px]">&#8226;</span>
                  <Link aria-label="link" to="/blogs/blog-grid" className="text-fastblue hover:text-fastblue">events</Link>
                </div>
                <h3 className="font-serif text-[3.4rem] font-medium tracking-[-1px] text-darkgray">Good design is obvious great design transparent</h3>
                <span className="font-serif block my-[15px]">By <Link aria-label="link" to="/blogs/blog-grid" className="hover:text-fastblue">Ming furry</Link> on <span>19 July 2020</span></span>
              </div>
            </Col>
            <Col lg={6} className="px-0 order-1 self-end md:mb-[60px]">
              <img width="" height="" className="rounded-lg mb-[-220px] md:mb-0" src="https://via.placeholder.com/1000x1095" alt="" />
            </Col>
            <Col lg={6} className="pl-36 whitespace-nowrap overflow-hidden right-0 text-[300px] leading-[300px] tracking-[-10px] bottom-[-110px] absolute font-serif font-semibold text-white sm:hidden">Blog</Col>
          </Row>
        </Container>
      </section >
      {/* Seaction End */}

      {/* Section Start */}
      <section className="pt-[70px] pb-[130px] lg:pb-[90px] md:pb-[75px] sm:pb-[50px] sm:pt-[50px] relative">
        <Container>
          <Row className="justify-end">
            <Col xl={5} lg={6} className="pl-[3.5rem] md:pl-[15px]">
              <p>Lorem ipsum has been the industry's standard dummy text, when an printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, <span className="font-medium text-darkgray">but also the leap into electronic typesetting</span> remaining essentially unchanged.</p>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Seaction End */}

      {/* Section Start */}
      <section className="pb-[130px] overflow-hidden lg:pb-[90px] md:pb-[75px] sm:pb-[50px] mt-[75px] lg:mt-0">
        <Container>
          <Row className="justify-center  ">
            <m.div className="col-12 col-md-6 bg-lightgray bg-no-repeat bg-right-bottom px-[90px] py-32 lg:px-[5.5rem]" style={{ backgroundImage: "url(/assets/img/webp/blog-post-layout-01-img-11.webp)" }} {...{ ...fadeIn, transition: { delay: 0.2 } }} >
              <Blockquote
                animation={fadeIn}
                theme="blockquote-style-04"
                icon="fas fa-quote-left text-basecolor"
                title="Great dress can make you remember what is beautiful about life."
                author="Jeremy dupont"
              />
            </m.div>
            <m.div className="col col-md-6 bg-cover bg-center sm:h-[450px] xs:h-[300px]" style={{ backgroundImage: "url(https://via.placeholder.com/800x594)" }} {...{ ...fadeIn, transition: { delay: 0.6 } }}></m.div>
          </Row>
          <Row className="justify-center">
            <Col md={10}>
              <m.div className="row" {...fadeIn}>
                <Col xl={12} className="mt-36 sm:mt-[50px]">
                  <h6 className="font-serif text-darkgray font-medium mb-[20px]">Fashion is what you’re offered four times a year by designers.</h6>
                  <p>Pellentesque efficitur velit vel efficitur feugiat. Cras vel purus neque in hac habitasse platea dictumst. Ut blandit fringilla porttitor. Nullam nec urna id ligula blandit tempus.  <Link aria-label="link" to="#" className="text-decoration-underline text-darkgray font-medium hover:text-[#0038e3]">There are many variations</Link> of passages of lorem ipsum available. Morbi non neque ultrices, dignissim ligula convallis, ultrices eros. Aliquam porta efficitur quam vulputate lacinia. Phasellus vel tristique ante. Mauris nec laoreet leo. Fusce ut arcu eget lacus elementum elementum et quis mi. Fusce non ligula luctus, feugiat nulla ut, suscipit nisi. Suspendisse potenti. Etiam pharetra massa in urna accumsan, a feugiat quam ultrices.</p>
                </Col>
                <Col xl={12} className="flex mt-[70px] sm:mt-[50px]">
                  <div className="border-[1px] border-dashed border-mediumgray py-[40px] px-[50px] shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-md xs:p-[30px]">Lorem ipsum dolor sit amet consectetur adipiscing elit. Pellentesque sodales nunc non augue euismod, eu rhoncus justo facilisis. Donec varius, orci in consectetur finibus, dolor dolor pellentesque turpis, quis aliquam arcu leo ac metus. Fusce vehicula suscipit elit, vitae sodales leo tempus a. Vivamus et viverra libero.</div>
                </Col>
              </m.div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Seaction End */}

      {/* Section Start */}
      <section className="pt-0 pb-[130px] lg:pb-[90px] md:pb-[75px] sm:pb-[50px]">
        <Container>
          <Row className="justify-center">
            <Col lg={10}>
              <Row className="md:justify-center">
                <m.div {...fadeIn} className="col-12 col-lg-5 col-md-6 sm:mb-[35px]">
                  <img width="" height="" src="https://via.placeholder.com/817x950" className="rounded-md" alt="" />
                </m.div>
                <m.div {...{ ...fadeIn, transition: { delay: 0.6 } }} className="col-12 col-md-6 offset-lg-1 flex flex-col justify-center">
                  <h5 className="font-serif text-darkgray font-medium">It is teamwork that makes the dream work</h5>
                  <p className="mb-[25px]">With years of experience in the website design and development industry ThemeZaa pride ourselves on creating unique, creative & quality designs that are developed upon the latest coding.</p>
                  <Lists theme="list-style-02" className="text-darkgray pt-[10px]" data={ListData02} animation={fadeIn} animationDelay={0.4} />
                </m.div>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Seaction End */}

      {/* Section Start */}
      <section className="relative h-[730px] lg:h-[670px] md:h-[530px] py-52 md:block sm:hidden" style={{ backgroundImage: "url(https://via.placeholder.com/1920x1100)" }}>
        <div className="absolute h-full w-full opacity-90 top-0 left-0 bg-gradient-to-r from-[#0039e3] to-[#741bd9] sm:bg-inherit	"></div>
        <Container>
          <Row>
            <div className="overlap-gap-section"></div>
          </Row>
        </Container>
      </section>
      {/* Seaction End */}

      {/* Section Start */}
      <section className="p-0 overflow-visible">
        <Container>
          <Overlap value={75} overlapHeight={true}>
            <m.div {...fadeIn} className="row">
              <Col md={6} className="relative flex items-center bg-center justify-center bg-cover sm:h-[400px] sm:mb-[15px]" style={{ backgroundImage: "url('https://via.placeholder.com/800x920')" }}>
                <div className="bg-darkgray"></div>
                <div className="flex items-center">
                  {/* Modal Component Start */}
                  <CustomModal.Wrapper
                    className="absolute top-0 items-center h-full right-1/2 contents md:right-0 md:justify-center md:w-full"
                    modalBtn={<Buttons type="submit" className="btn-sonar border-0 mx-auto" themeColor="#fff" y color="#5e28dd" size="lg" title={<i className="icon-control-play" />} />} >
                    <div className="w-[1020px] max-w-full relative rounded mx-auto">
                      <div className="fit-video">
                        <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                      </div>
                    </div>
                  </CustomModal.Wrapper>
                  {/* Modal Component End */}
                </div>
              </Col>
              <Col md={6} className="relative p-0">
                <img width="" height="" src="https://via.placeholder.com/800x530" alt="" />
                <div className="p-24 bg-darkgray md:p-14">
                  <h6 className="font-serif text-white font-medium">Fashion is not something that exists in dresses only</h6>
                  <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
              </Col>
            </m.div>
          </Overlap>
        </Container>
      </section>
      {/* Seaction End */}

      {/* Section Start */}
      <m.section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col md={10}>
              <Dropcaps className="mb-[15px]" theme="dropcaps-style02" content="ALorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " />
              <span className="text-darkgray font-medium">but also the leap into electronic typesetting</span> remaining essentially unchanged. Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              <p className="mt-[15px]">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of lorem ipsum is simply dummy text of the printing.</p>
            </Col>
          </Row>
        </Container>
      </m.section>
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

export default BlogPostLayout03