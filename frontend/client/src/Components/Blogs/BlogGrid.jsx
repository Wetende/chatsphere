import React, { useState, useEffect, useRef, memo } from "react";

// Libraries
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { m } from "framer-motion";

// Components
import Pagination from "./HelperComponents/Pagination";
import Filter from "../Portfolio/Filter";

// Data
import { authorData, blogData } from "./BlogData";

// Filter the blog data category wise
const blogGridData = blogData.filter((item) => item.blogType === "grid");

const BlogGrid = (props) => {
  const blogWrapper = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("../../Functions/Utilities").then(module => {
      const grid = module.initializeIsotop(blogWrapper.current)
      grid.on('arrangeComplete', () => setLoading(false));
    })
  }, [])

  const style = {
    "--overlay-color": typeof (props.overlay) === "object" ? `linear-gradient(to right top, ${props.overlay.map((item, i) => item)})` : props.overlay
  }

  const handleFilterChange = () => {
    blogWrapper.current.querySelectorAll("li").forEach(item => item.childNodes[0]?.classList.add("appear"))
  }

  return (
    <div className="grid-wrapper">
      {/* Filter Start */}
      <Filter title={props.title} filterData={props.filterData} onFilterChange={handleFilterChange} />
      {/* Filter End */}

      {/* Grid Start */}
      <ul ref={blogWrapper} className={`grid-container${props.grid ? ` ${props.grid}` : ""}${loading ? " loading" : ""}${props.filter === false ? "" : " mt-28 md:mt-[4.5rem] sm:mt-8"}`}>
        <li className="grid-sizer"></li>
        {props.data.map((item, i) => {
          return (
            <li className={`grid-item${item.double_col ? " grid-item-double" : ""} ${item.category.map(item => item.split(" ").join("")).toString().split(",").join(" ").toLowerCase()}`} key={i} >
              <m.div className="blog-grid rounded-[5px] overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={!loading && { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <div className="blog-post relative overflow-hidden" style={style}>
                  {(item.link || item.img) && (
                    <Link aria-label="link" to={`${props.link}${[item.id]}`}>
                      <img height={245} width={350} src={item.img} alt="blog" />
                    </Link>
                  )}
                  {(item.link || item.category) && (
                    <Link aria-label="link"
                      to={`/blogs/category/${[item.category[0].toString().split(" ").join("").toLowerCase()]}`}
                      className="blog-grid-catagory bg-[#171717bf] font-serif text-white text-xxs uppercase px-[13px] py-[6px] rounded-[2px] absolute top-[23px] right-[23px]">
                      {item.category[0]}
                    </Link>
                  )}
                </div>
                <div className="px-12 py-10 bg-white sm:px-8 xs:px-12">
                  {item.date && (<span className="mb-[10px] text-sm font-serif inline-block" > {item.date} </span>)}
                  {(item.link || item.title) && (<Link aria-label="link" to={`${props.link}${[item.id]}`} className="font-serif mb-[15px] text-xmd block font-medium text-darkgray hover:text-basecolor" > {item.title} </Link>)}
                  {item.content && (<p className="mb-[25px] md:mb-[20px] sm:mb-[15px]"> {item.content} </p>)}
                  <div className="flex items-center">
                    {
                      authorData.filter(author => author.id === item.author) && (
                        <>
                          <img width={30} height={30} className="w-[30px] rounded-full mr-[10px]" src={authorData.filter(author => author.id === item.author)[0].img} alt={authorData.filter(author => author.id === item.author)[0].name} />
                          <span className="font-serif text-sm mr-auto">
                            By <Link aria-label="link" to={`/blogs/author/${item.author}`} className="hover:text-basecolor">{authorData.filter(author => author.id === item.author)[0].name}</Link>
                          </span>
                        </>
                      )}
                    {(item.link || item.likes) && (<Link aria-label="link" to="#" className="items-center flex justify-center text-xs font-serif hover:text-basecolor" >
                      <i className="far fa-heart mr-[4px]"></i>
                      <span className="text-xs font-serif">{item.likes}</span>
                    </Link>
                    )}
                  </div>
                </div>
              </m.div>
            </li>
          );
        })}
      </ul>
      {/* Grid End */}

      {/* Pagination Start */}
      {props.pagination === true && (
        <div className="flex justify-center mt-[7.5rem] md:mt-20">
          <Pagination />
        </div>
      )}
      {/* Pagination End  */}
    </div>
  );
};

BlogGrid.defaultProps = {
  filter: false,
  data: blogGridData,
  link: "/blog-types/blog-standard-post/"
};

BlogGrid.propTypes = {
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

export default memo(BlogGrid);