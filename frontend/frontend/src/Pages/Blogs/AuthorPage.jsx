import React, { useEffect, useState } from "react";

// Libraries
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";

// Components
import BlogGrid from "../../Components/Blogs/BlogGrid";

// Data
import { blogData, authorData } from "../../Components/Blogs/BlogData";

const AuthorPage = (props) => {
  const { author } = useParams();
  const [data, setData] = useState(null);

  // Get the author Details
  const authorDetails = authorData.filter(
    (item) => item.id === parseInt(author)
  )[0];

  useEffect(
    () => {
      const filteredData = blogData.filter(
        (item) => item.author === parseInt(author)
      );
      setData(filteredData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div style={props.style}>
      {/* Parallax Section Start */}
      <div className="h-[450px] portrait:h-[450px] landscape:md:h-[320px] relative overflow-hidden sm:h-[300px] xxs:h-[300px] xs:portrait:h-[330px]">
        <Parallax className="bg-cover cover-background absolute -top-[100px] landscape:md:top-[-20px] left-0 w-full h-[100vh]" translateY={[-40, 40]} style={{ backgroundImage: `url(/assets/img/webp/portfolio-bg2.webp)` }} ></Parallax>
        <Container className="h-full relative">
          <Row className="justify-center h-full">
            <Col xl={6} lg={6} md={8} className="text-center flex justify-center flex-col font-serif" >
              <h1 className="text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] mb-[15px] inline-block text-xmd">
                {authorDetails && authorDetails.name}
              </h1>
              <h2 className="text-darkgray font-medium -tracking-[1px] mb-0">
                Every new print and color of the season
              </h2>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Parallax Section End */}

      {/* Section Start */}
      <section className="pt-0 relative px-[11%] overflow-hidden bg-lightgray xl:px-[2%] lg:py-[90px] md:pb-[75px] sm:pb-[50px] xs:px-0 xs:pt-[15px]">
        <Container fluid>
          <Row>
            <Col>
              {data ? (
                data.length > 0 ? (
                  <BlogGrid
                    link="/blog-types/blog-standard-post/"
                    overlay="#374162"
                    data={data}
                    pagination={true}
                    grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
                   
                  />
                ) : (
                  <div className="text-center">
                    <img
                      src="/assets/img/no-data-bro.svg"
                      className="w-[500px] mx-auto opacity-70"
                      alt="no-data"
                      width=""
                      height=""
                    />
                  </div>
                )
              ) : (
                <div className="text-center">
                  <img
                    src="/assets/img/no-data-bro.svg"
                    className="w-[500px] mx-auto opacity-70"
                    alt="no-data"
                    width=""
                    height=""
                  />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section Start */}
    </div>
  );
};

export default AuthorPage;
