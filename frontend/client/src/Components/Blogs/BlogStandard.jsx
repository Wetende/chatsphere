import React, { memo } from 'react'

//Libraries
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PropTypes } from "prop-types";
import { m } from "framer-motion";

// Components
import Buttons from '../Button/Buttons'
import Pagination from './HelperComponents/Pagination';

//Data
import { authorData, blogData } from './BlogData';

// Filter the blog data category wise
const blogStandardData = blogData.filter((item) => item.blogType === "standard");

const BlogStandard = (props) => {
    return (
        <>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div className="visible overflow-hidden mb-[4.5rem] rounded-[6px] border-mediumgray border text-center p-0" key={i} {...{ ...props.animation, transition: { delay: (i * 0.36) * props.animationDelay } }}>
                            <div className='blog-image'>
                                {item.img && <Link aria-label="" to={`${props.link}${[item.id]}`}><img height="" width="" src={item.img} alt="" /></Link>}
                            </div>
                            <div className="blog-text inline-block w-full">
                                <div className='w-[90%] p-[5.5rem] relative lg:p-16 xs:px-[20px] xs:py-[40px] mx-auto lg:w-full'>
                                    <div className='blog-details-overlap font-serif absolute left-1/2 top-0 pt-[6px] px-[20px] pb-[5px] whitespace-nowrap rounded-[4px] bg-fastblue font-medium text-white text-sm uppercase'>
                                        {item.date && <span to="#" className="text-white">{item.date}</span>}
                                        <span className="mx-[5px]">•</span>
                                        {item.category && <Link aria-label="link" to={`/blogs/category/${[item.category[0].toString().split(" ").join("").toLowerCase()]}`} className="text-white">{item.category[0]}</Link>}
                                    </div>
                                    {item.title && <h6 className="font-medium font-serif">
                                        <Link aria-label="link" to={`${props.link}${[item.id]}`} className="text-darkgray">{item.title}</Link>
                                    </h6>}
                                    {item.content && <p className='mb-[25px]'>{item.content}</p>}
                                    <Buttons to={`${props.link}${[item.id]}`} className="mx-3 font-medium rounded-[4px] font-serif uppercase hover:text-[#fff] bg-transparent btn-slide-up md:mb-[15px]" size="sm" color="#232323" themeColor="#232323" title="continue Reading" />
                                </div>
                                <Row className="author row-cols-1 border-[#dbdbdb] border-t text-[#828282] text-xxs font-serif uppercase">
                                    <Col className="col-sm blog-hover-btn py-[20px] border-r xs:border-b">
                                        <Link aria-label="link" to={`/blogs/author/${item.author}`} className='relative pl-[19px]'>
                                            <i className="far fa-user blog-icon"></i>
                                            <i className="far fa-user blog-icon-hover"></i>
                                            {authorData.filter(author => author.id === item.author)[0].name}
                                        </Link>
                                    </Col>
                                    <Col className="col-sm blog-hover-btn py-[20px] border-r xs:border-b">
                                        <Link aria-label="link" to="#" className='relative pl-[19px]'>
                                            <i className="far fa-heart blog-icon"></i>
                                            <i className="far fa-heart blog-icon-hover"></i>
                                            {item.likes} like post
                                        </Link>
                                    </Col>
                                    <Col className="col-sm blog-hover-btn py-[20px] border-r xs:border-b">
                                        <Link aria-label="link" to="#" className='relative pl-[19px]'>
                                            <i className="far fa-comment blog-icon"></i>
                                            <i className="far fa-comment blog-icon-hover"></i>
                                            {item.comments} COMMENT
                                        </Link>
                                    </Col>
                                </Row>
                            </div>
                        </m.div>

                    )
                })
            }
            {props.pagination === true && (
                <div className="flex justify-center mt-[7.5rem] md:mt-20">
                    <Pagination />
                </div>
            )}
        </>
    )
}


BlogStandard.defaultProps = {
    data: blogStandardData,
    link: "/blog-types/blog-standard-post/"
};

BlogStandard.propTypes = {
    grid: PropTypes.string,
    animation: PropTypes.object,
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

export default memo(BlogStandard)