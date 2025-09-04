import React, { useState, useEffect, useRef, memo } from "react";

// Libraries
import { Link } from "react-router-dom";
import { m } from 'framer-motion'
import { PropTypes } from "prop-types";

// Components
import Pagination from "./HelperComponents/Pagination";
import Filter from "../Portfolio/Filter";

// Data
import { blogData } from "./BlogData";

// Filter the blog data category wise
const blogCleanData = blogData.filter((item) => item.blogType === "clean");

const BlogClean = (props) => {
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
      <ul ref={blogWrapper} className={`blog-clean grid-container text-center${props.grid ? ` ${props.grid}` : ""}${loading ? " loading" : ""}${props.filter === false ? "" : " mt-28 md:mt-[4.5rem] sm:mt-8"}`}>
        <li className="grid-sizer"></li>
        {props.data.map((item, i) => {
          return (
            <li key={i} className={`grid-item${item.double_col ? " grid-item-double" : ""} ${item.category.map(item => item.split(" ").join("")).toString().split(",").join(" ").toLowerCase()}`} >
              <m.div className="blog-post rounded-[6px] overflow-hidden" style={style}
                initial={{ opacity: 0 }}
                whileInView={!loading && { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }} >
                <div className="blog-post-img relative overflow-hidden" style={style}>
                  <Link aria-label="link" to={`${props.link}${[item.id]}`} className="">
                    <img className="w-full" height={280} width={350} src={item.img} alt="blog-clean" />
                    <div className="blog-rounded-icon bg-white">
                      <i className="feather-arrow-right text-darkgray text-lg"></i>
                    </div>
                  </Link>
                </div>
                <div className="post-details p-[30px] sm:px-[25px] bg-white">
                  <span className="text-md uppercase"> {item.date} </span>
                  <Link aria-label="link" to={`${props.link}${[item.id]}`} className="font-medium text-darkgray font-serif block" > {item.title} </Link>
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

BlogClean.defaultProps = {
  data: blogCleanData,
  link: "/blog-types/blog-standard-post/"
};

BlogClean.propTypes = {
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

export default memo(BlogClean);
