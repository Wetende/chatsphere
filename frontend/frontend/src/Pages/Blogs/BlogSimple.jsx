import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap';
import { Parallax } from "react-scroll-parallax";

// Components
import BlogSimple from '../../Components/Blogs/BlogSimple';

// Data
import { blogData } from '../../Components/Blogs/BlogData';

// Filter the blog data category wise
const blogSimpleData = blogData.filter((item) => item.blogType === "simple");

const BlogSimplePage = () => {
  return (
    <>
      {/* Parallax Section Start */}
      <div className="py-[80px] h-auto overflow-hidden md:relative md:py-[40px]">
        <Parallax className="lg-no-parallax bg-cover absolute -top-[100px] landscape:md:top-[-20px] left-0 w-full h-[100vh]" translateY={[-40, 40]} style={{ backgroundImage: `url(/assets/img/webp/portfolio-bg2.webp)` }}></Parallax>
        <Container className="h-full relative">
          <Row className="justify-center h-[300px] sm:h-[250px]">
            <Col xl={6} lg={6} md={8} className="text-center flex justify-center flex-col font-serif">
              <h1 className="text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] mb-[15px] inline-block text-xmd leading-[20px]">Blog simple layout</h1>
              <h2 className="text-darkgray font-medium -tracking-[1px] mb-0">Attractive articles updated daily</h2>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Parallax Section End */}

      {/* Section Start */}
      <section className="overflow-hidden relative px-[5%] pb-[130px] bg-lightgray lg:pb-[90px] lg:px-0 md:pb-[75px] sm:pb-[50px]">
        <Container fluid>
          <Row className="justify-center">
            <Col xl={12} lg={12} sm={10} className="lg:px-0">
              <BlogSimple link="/blog-types/blog-standard-post/" overlay="#374162" pagination={true} grid="grid grid-3col xl-grid-2col lg-grid-2col md-grid-1col sm-grid-1col xs-grid-1col gutter-double-extra-large" data={blogSimpleData} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}
    </>
  )
}

export default BlogSimplePage