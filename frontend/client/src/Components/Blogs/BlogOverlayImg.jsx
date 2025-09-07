import React, { useState, useEffect, useRef, memo } from "react";

// Libraries
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { m } from 'framer-motion';

// Components
import Pagination from "./HelperComponents/Pagination";
import Filter from "../Portfolio/Filter";

// Data
import { blogData } from "./BlogData";

// Filter the blog data category wise
const blogOverlayImgData = blogData.filter((item) => item.blogType === "overlayImage");

const BlogOverlayImg = (props) => {
  const blogWrapper = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("../../Functions/Utilities").then(module => {
      const grid = module.initializeIsotop(blogWrapper.current)
      grid.on('arrangeComplete', () => setLoading(false));
    })
  }, [])

  const style = { "--overlay-color": typeof (props.overlay) === "object" ? `linear-gradient(0deg, ${props.overlay.map((item, i) => item)})` : props.overlay }

  const handleFilterChange = () => {
    blogWrapper.current.querySelectorAll("li").forEach(item => item.childNodes[0]?.classList.add("appear"))
  }

  return (
    <div className="grid-wrapper">
      {/* Filter Start */}
      <Filter title={props.title} filterData={props.filterData} onFilterChange={handleFilterChange} />
      {/* Filter End */}

      {/* Grid Start */}
      <ul ref={blogWrapper} className={`grid-container${props.grid ? ` ${props.grid}` : ""}${loading ? " loading" : ""}${props.filter === false ? "" : " mt-28 md:mt-[4.5rem] sm:mt-8"}`} >
        <li className="grid-sizer"></li>
        {props.data.map((item, i) => {
          return (
            <li key={i} className={`grid-item${item.double_col ? " grid-item-double" : ""} md:p-[10px] ${item.category.map(item => item.split(" ").join("")).toString().split(",").join(" ").toLowerCase()}`} >
              <m.div className="blog-overlay bg-[#fff] rounded-[5px] box-shadow-medium"
                initial={{ opacity: 0 }}
                whileInView={!loading && { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }} >
                <div className="blog-post-image" style={style}>
                  <div className="h-full w-full bg-no-repeat bg-cover bg-center blog-post-bg" style={{ backgroundImage: `url(${item.img})`, }} ></div>
                  <div className="blog-overlay-img h-full w-full absolute top-0 left-0"></div>
                </div>
                <div className="blog-details">
                  <Link aria-label="link" to={`/blogs/category/${[item.category[0].toString().split(" ").join("").toLowerCase()]}`} className="blog-category font-serif mb-[80px] inline-block lg:mb-[84px] md:mb-[78px] xs:mb-[70px]">
                    {item.category[0]}
                  </Link>
                  <span className="blog-date font-serif font-medium text-[13px] uppercase block mb-[-15px] text-[#828282]">
                    {item.date}
                  </span>
                  <Link aria-label="link" to={`${props.link}${[item.id]}`} className="blog-title font-serif font-semibold text-lg text-darkslateblue uppercase block mb-[15px] w-[95%] xl:w-full md:text-xmd" >
                    {item.title}
                  </Link>
                  <Link to="#" className="blog-read" >continue reading</Link>
                </div>
              </m.div>
            </li>
          );
        })}
      </ul>
      {/* Grid Start */}

      {/* Pagination Start */}
      {
        props.pagination === true && (
          <div className="flex justify-center mt-[7.5rem] md:mt-20">
            <Pagination />
          </div>)
      }
      {/* Pagination End */}
    </div>
  );
};

BlogOverlayImg.defaultProps = {
  filter: false,
  data: blogOverlayImgData,
  link: "/blog-types/blog-standard-post/"
};

BlogOverlayImg.propTypes = {
  pagination: PropTypes.bool,
  title: PropTypes.string,
  grid: PropTypes.string,
  link: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      category: PropTypes.array,
      tags: PropTypes.array,
      blogType: PropTypes.string,
      img: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
      author: PropTypes.number,
      likes: PropTypes.number,
      comments: PropTypes.number,
      date: PropTypes.string,
      double_col: PropTypes.bool
    })
  ),
};

export default memo(BlogOverlayImg);
