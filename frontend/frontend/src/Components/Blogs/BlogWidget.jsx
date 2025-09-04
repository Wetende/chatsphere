import React, { useState, useEffect, useRef, memo } from 'react'

// Libraries
import { Link } from 'react-router-dom';
import { PropTypes } from "prop-types";
import { m } from 'framer-motion';

// Components
import Pagination from './HelperComponents/Pagination';
import Filter from "../Portfolio/Filter";

// Data
import { blogData, authorData } from './BlogData';

// Filter the blog data category wise
const blogWidgetData = blogData.filter((item) => item.blogType === "widget");

const BlogWidget = (props) => {
  const blogWrapper = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("../../Functions/Utilities").then(module => {
      const grid = module.initializeIsotop(blogWrapper.current)
      grid.on('arrangeComplete', () => setLoading(false));
    })
  }, [])

  const handleFilterChange = () => {
    blogWrapper.current.querySelectorAll("li").forEach(item => item.childNodes[0]?.classList.add("appear"))
  }

  return (
    <div className="grid-wrapper">
      {/* Filter Start */}
      <Filter title={props.title} filterData={props.filterData} onFilterChange={handleFilterChange} />
      {/* Filter End */}

      {/* Grid Start */}
      <ul ref={blogWrapper} className={`blog-widget grid-container ${props.grid ? ` ${props.grid}` : ""}${loading ? " loading" : ""}${props.filter === false ? "" : " mt-28 md:mt-[4.5rem] sm:mt-8"}`}>
        <li className="grid-sizer"></li>
        {
          props.data.map((item, i) => {
            return (
              <li key={i} className={`grid-item${item.double_col ? " grid-item-double" : ""} ${item.category.map(item => item.split(" ").join("")).toString().split(",").join(" ").toLowerCase()}`}>
                <m.div className="blog-widget-content bg-white flex p-[30px] xs:p-[15px] rounded-[4px]"
                  initial={{ opacity: 0 }}
                  whileInView={!loading && { opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }} >
                  <figure className="shrink-0 h-auto w-[140px] mb-0 xs:w-[100px]">
                    <Link aria-label="link" to={`${props.link}${[item.id]}`}>
                      <img height={88} width={140} src={item.img} alt="blog-widget" />
                    </Link>
                  </figure>
                  <div className="leading-normal pl-[30px] xs:pl-[15px] relative top-[-1px] grow">
                    <span className="mb-[5px] text-xs font-serif block">{item.date}</span>
                    <Link aria-label="link" to={`${props.link}${[item.id]}`} className="mb-0 leading-[22px] font-medium text-darkgray font-serif block">{item.title}</Link>
                    <span className="text-xs font-serif">By <Link aria-label="link" to={`/blogs/author/${item.author}`} >{authorData.filter(author => author.id === item.author)[0].name}</Link></span>
                  </div>
                </m.div>
              </li>
            )
          })
        }
      </ul>
      {/* Grid Start */}

      {/* Pagination Start */}
      {
        props.pagination === true && (
          <div className="flex justify-center mt-[7.5rem] md:mt-20">
            <Pagination />
          </div>)
      }
      {/* Pagination Emd */}
    </div>
  )
}

BlogWidget.defaultProps = {
  filter: false,
  data: blogWidgetData,
  link: "/blog-types/blog-standard-post/"
}

BlogWidget.propTypes = {
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
}

export default memo(BlogWidget)