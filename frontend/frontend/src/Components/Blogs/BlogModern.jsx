import React, { useState, useEffect, useRef, memo } from "react";

// Libraries
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { m } from "framer-motion";

// Components
import Pagination from "./HelperComponents/Pagination";
import Filter from "../Portfolio/Filter";

// Data
import { blogData } from "./BlogData";

// Filter the blog data category wise
const blogModernData = blogData.filter((item) => item.blogType === "modern");

const BlogModern = (props) => {
  const blogWrapper = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("../../Functions/Utilities").then(module => {
      const grid = module.initializeIsotop(blogWrapper.current)
      grid.on('arrangeComplete', () => setLoading(false));
    })
  }, [])

  const style = { "--overlay-color": typeof (props.overlay) === "object" ? `linear-gradient(to right top, ${props.overlay.map((item, i) => item)})` : props.overlay }

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
              <m.div className="blog-modern relative"
                initial={{ opacity: 0 }}
                whileInView={!loading && { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }} >
                <div className="blog-modern-image" style={style}>
                  <Link aria-label="link" to="#" className="text-[#828282]">
                    <img height="" width="" src={item.img} className="w-full h-full" alt="" />
                  </Link>
                </div>
                <div className="blog-details absolute bg-white text-center">
                  <Link aria-label="link" to={`/blogs/category/${[item.category[0].toString().split(" ").join("").toLowerCase()]}`}
                    className="blog-category text-basecolor text-md font-medium inline-block mb-base tracking-[1px] mb-[15px] uppercase">{item.category[0]}
                  </Link>
                  <Link aria-label="link" to={`${props.link}${[item.id]}`} className="blog-title font-serif text-lg text-darkgray leading-[26px] inline-block mb-[20px] md:text-xmd xs:block xs:mb-[15px]" >
                    {item.title}
                  </Link>
                  <span className="blog-date font-serif text-[12px] text-[#828282] uppercase tracking-[1px] block hover:text-[#828282]" >
                    {item.date}
                  </span>
                </div>
              </m.div>
            </li>
          );
        })}
      </ul>
      {/* Grid End */}

      {/* Pagination Start */}
      {
        props.pagination === true && (
          <div className="flex justify-center mt-[7.5rem] lg:mt-20 md:mt-[0px]">
            <Pagination />
          </div>)
      }
      {/* Pagination End */}
    </div>
  );
};

BlogModern.defaultProps = {
  filter: false,
  data: blogModernData,
  link: "/blog-types/blog-standard-post/"
};

BlogModern.propTypes = {
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

export default memo(BlogModern);
