import React, { useEffect, useState } from 'react'

// Libraries
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';

// Components
import Header, { HeaderNav, Menu } from '../../../Components/Header/Header'
import SocialIcons from '../../../Components/SocialIcon/SocialIcons'
import FooterStyle01 from '../../../Components/Footers/FooterStyle01'
import CommentBox from '../../../Components/Blogs/HelperComponents/CommentBox'
import BlogClean from '../../../Components/Blogs/BlogClean'
import Blockquote from '../../../Components/BlockQuote/Blockquote'
import Dropcaps from '../../../Components/Dropcaps/Dropcaps'
import AuthorBox from '../../../Components/Blogs/HelperComponents/AuthorBox'
import SideButtons from "../../../Components/SideButtons";
import Sidebar from '../../../Components/Blogs/HelperComponents/Sidebar';

// Data
import { authorData, blogData } from '../../../Components/Blogs/BlogData'
import { fadeIn } from '../../../Functions/GlobalAnimations';

const SocialIconsData = [
  {
    color: "#3b5998",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "#ea4c89",
    link: "https://dribbble.com/",
    icon: "fab fa-dribbble"
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
  }
]

const BlogVimeoVideoPostPage = (props) => {
  const [data, setData] = useState()

  // fetch the query param
  const param = useParams();
  const { id } = param;

  useEffect(() => {
    const getData = blogData.filter((item) => item.id === parseInt(id));
    setData(getData);
  }, [id])
  return (
    <div style={props.style}>

      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll" className="border-b border-b-[#0000001a]">
        <HeaderNav theme="white" menu="light" expand="lg" fluid="sm" containerClass="sm:px-0" className="py-[0px] md:pr-[15px] md:pl-0 md:py-[20px]">
          <Col className="col-auto col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <Navbar.Toggle className="order-last md:ml-[8px]">
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
            <span className="navbar-toggler-line"></span>
          </Navbar.Toggle>
          <Navbar.Collapse className="col-auto justify-center">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto col-lg-2 text-end pe-0 md:mr-[10px] xs:hidden">
            <SocialIcons theme="social-icon-style-01 block text-end" iconColor="dark" size="xs" data={SocialIconsData.slice(0, 3)} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {data ? (
        <>
          <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
            <Container>
              <Row className="justify-center">
                <Col lg={8} className="right-sidebar md:mb-[60px] sm:mb-[40px]">
                  <Row>
                    <Col className="blog-details-text last:mb-0 mb-24">
                      <ul className="flex mb-8 xs:block">
                        <li className="inline-block align-middle mr-[25px]"><i className="feather-calendar text-fastblue mr-[10px]"></i><span>{data[0].date}</span></li>
                        <li className="inline-block align-middle mr-[25px] capitalize"><i className="feather-folder text-fastblue mr-[10px]"></i>
                          {
                            data[0].category.map((item, i) => {
                              return (
                                <Link aria-label="link" key={i} to={`/blogs/category/${item.toString().split(" ").join("").toLowerCase()}`}>{i === data[0].category.length - 1 ? item : `${item}, `}</Link>
                              )
                            })
                          }
                        </li>
                        {
                          authorData && (
                            <li className="inline-block align-middle"><i className="feather-user text-fastblue mr-[10px]"></i>By <Link aria-label="link" to={`/blogs/author/${data[0].author}`}>{authorData.filter(author => author.id === data[0].author)[0].name}</Link></li>
                          )
                        }
                      </ul>
                      <h5 className="font-serif font-medium text-darkgray mb-[4.5rem]">{data[0].title}</h5>
                      <div className="fit-video mb-[4.5rem] w-full">
                        <iframe title="myFrame" src="https://player.vimeo.com/video/176916362?title=0&byline=0&portrait=0&autoplay=true&muted=1" width="640" height="360" allowFullScreen></iframe>
                      </div>
                      <p className="mb-[25px]">Lorem ipsum is simply dummy text of the printing and typesetting industry. lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.</p>
                      <p className="mb-[25px]">There are many variations of passages of lorem ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of lorem ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                      <Blockquote
                        className="my-[5.5rem] ml-24 sm:ml-0"
                        theme="blockquote-style-02"
                        title="Tomorrow is the most important thing in life. Comes into us at midnight very clean. It's perfect when it arrives and it puts itself in our hands. It hopes we've learned something from yesterday."
                        author="JOHN WAYNE"
                      />
                      <img width="" height="" src="https://via.placeholder.com/780x500" alt="" className="w-full rounded-[6px] mb-16" />
                      <Dropcaps theme="dropcaps-style04" content="Master design is simply dummy text of the printing and typesetting industry. lorem ipsum has been the an industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." />
                      <p className="my-[25px]">There are many variations of passages of lorem ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                    </Col>
                    <Col xs={12} className="flex items-center justify-between mb-[35px] sm:block">
                      {
                        data[0].tags && (
                          <div className="tag-cloud sm:flex sm:justify-center sm:mb-[10px] sm:flex-wrap gap-y-5">
                            {
                              data[0].tags.map((item, i) => {
                                return (
                                  <Link aria-label="links" key={i} to="/blogs/blog-grid">{item}</Link>
                                )
                              })
                            }
                          </div>
                        )
                      }
                      {
                        data[0].likes && (
                          <div className="text-center md:text-end px-0 flex justify-end sm:justify-center">
                            <Link aria-label="link" className="uppercase text-darkgray text-xs w-auto font-medium inline-block border border-mediumgray rounded pt-[5px] pb-[6px] px-[18px] leading-[20px] hover:text-black transition-default hover:shadow-[0_0_10px_rgba(23,23,23,0.10)] " to="#">
                              <i className="far fa-heart mr-2 text-[#fa5c47]">
                              </i><span>{data[0].likes} Likes</span>
                            </Link>
                          </div>
                        )
                      }
                    </Col>
                    <Col>
                      <AuthorBox authorId={data[0].author} className="mb-[45px]" />
                    </Col>
                    <SocialIcons animation={fadeIn} theme="social-icon-style-09 m-auto" className="justify-center" size="md" iconColor="dark" data={SocialIconsData} />
                  </Row>
                </Col>

                <Sidebar data={data} />
              </Row>
            </Container>
          </section>

          {/* Section Start */}
          <section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden">
            <Container>
              <Row className="justify-center">
                <Col lg={5} md={6} className="text-center mb-20">
                  <span className="font-serif font-medium uppercase inline-block">You may also like</span>
                  <h5 className="font-serif font-medium text-darkgray -tracking-[1px]">Related Posts</h5>
                </Col>
              </Row>
              <BlogClean filter={false} overlay={["#0039e3", "#4132e0", "#5e28dd", "#741bd9", "#8600d4"]} pagination="false" grid="grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large" data={blogData.slice(0, 3)} />
            </Container>
          </section>
          {/* Section End */}

          <CommentBox />

          {/* Section Start */}
          <FooterStyle01 theme="dark" className="bg-[#262b35] text-slateblue" />
          {/* Section End */}
        </>
      ) : undefined}
    </div>
  )
}

export default BlogVimeoVideoPostPage