import React, { memo } from "react";
import { Link } from "react-router-dom";

// Libraries
import { PropTypes } from "prop-types";
import { m } from "framer-motion";
import Pagination from "./HelperComponents/Pagination";

// Data
import { blogData, authorData } from "./BlogData";

// Filter the blog data category wise
const blogSideImageData = blogData.filter((item) => item.blogType === "sideImage");

const BlogSideImage = (props) => {
  return (
    <div>
      {
        props.data.map((item, i) => {
          return (
            <m.div key={i} className={`blog-sideimage`} {...props.animation}>
              <div className="blog-post-image">
                <Link aria-label="link" to={`${props.link}${[item.id]}`}>
                  <img height="" width="" alt="" src={item.img} />
                </Link>
              </div>
              <div className="post-details">
                <span className="blog-post-date"> {item.date} </span>
                <Link aria-label="link" to={`${props.link}${[item.id]}`} className="blg-post-title"> {item.title} </Link>
                <p>{item.content}</p>
                <div className="blog-author">
                  <img height="" width="" className="blog-author-img" src={authorData.filter(author => author.id === item.author)[0].img} alt={authorData.filter(author => author.id === item.author)[0].name} />
                  <span>
                    <span> By
                      <Link aria-label="link" to={`/blogs/author/${item.author}`} className="blog-author-name"> {authorData.filter(author => author.id === item.author)[0].name} </Link>
                    </span>
                    <span className="inline-block"> IN
                      <Link aria-label="link" to={`/blogs/category/${[item.category[0].toString().split(" ").join("").toLowerCase()]}`} className="blog-author-catagory text-darkgray ml-[4px]" >
                        {item.category[0]}
                      </Link>
                    </span>
                  </span>
                </div>
              </div>
            </m.div>
          );
        })
      }
      {props.pagination === true && (
        <div className="flex justify-center mt-[7.5rem] md:mt-20">
          <Pagination />
        </div>
      )}
    </div>
  );
};

BlogSideImage.defaultProps = {
  data: blogSideImageData,
  link: "/blog-types/blog-standard-post/"
};

BlogSideImage.propTypes = {
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
      double_col:PropTypes.bool
    })
  ),
};

export default memo(BlogSideImage);
