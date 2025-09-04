import React, { useState, useEffect, useRef, memo } from "react";

// Libraries
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { m } from "framer-motion";

// Components
import Filter from "../Portfolio/Filter";
import Pagination from "./HelperComponents/Pagination";

// Data
import { blogData } from "./BlogData";

// Filter the blog data category wise
const blogMetroData = blogData.filter((item) => item.blogType === "metro");

const BlogMetro = (props) => {
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
      <ul ref={blogWrapper} className={`grid-container ${props.grid ? ` ${props.grid}` : ""}${loading ? " loading" : ""}${props.filter === false ? "" : " mt-28 md:mt-[4.5rem] sm:mt-8"}`} >
        <li className="grid-sizer"></li>
        {props.data.map((item, i) => {
          return (
            <li key={i} className={`grid-item${item.double_col ? " grid-item-double" : ""} ${item.category.map(item => item.split(" ").join("")).toString().split(",").join(" ").toLowerCase()}`} >
              <m.div className="blog-metro"
                initial={{ opacity: 0 }}
                whileInView={!loading && { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }} >
                <div className="blog-post-image" style={style}>
                  <img className="w-full" height={353} width={353} src={item.img} alt="blog-post" />
                </div>
                <div className="post-details">
                  <Link aria-label="link" to={`/blogs/category/${[item.category[0].toString().split(" ").join("").toLowerCase()]}`} className="post-btn"> {item.category[0]}</Link>
                  <span className="post-date">
                    {item.date}
                  </span>
                  <Link aria-label="link" to={`${props.link}${[item.id]}`} className="post-title">
                    {item.title}
                  </Link>
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
          <div className="flex justify-center mt-[7.5rem] md:mt-20">
            <Pagination />
          </div>)
      }
      {/* Pagination End */}
    </div>
  );
};

BlogMetro.defaultProps = {
  filter: false,
  data: blogMetroData,
  link: "blog-types/blog-standard-post/"
}
BlogMetro.propTypes = {
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

export default memo(BlogMetro);
