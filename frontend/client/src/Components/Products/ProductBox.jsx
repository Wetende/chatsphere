import React, { useState, useEffect, useRef, memo } from 'react'

// Libraries
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { m } from "framer-motion";

// Components
import Filter from "../Portfolio/Filter";

// Data
import { productData } from './ProductData';

const ProductBox = (props) => {
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
        <>
            <div className="grid-wrapper">
                {/* Filter Start */}
                <Filter title={props.title} filterData={props.filterData} onFilterChange={handleFilterChange} />
                {/* Filter End */}
                <ul ref={blogWrapper} className={`grid-container${props.grid ? ` ${props.grid}` : ""}${loading ? " loading" : ""}${props.className ? ` ${props.className}` : ""}`}>
                    <li className="grid-sizer"></li>
                    {
                        props.data.map((item, i) => {
                            return (
                                <li className={`grid-item${item.double_col ? " grid-item-double" : ""} ${item.category.map(item => item.split(" ").join("")).toString().split(",").join(" ").toLowerCase()}`} key={i}>
                                    <m.div
                                        initial={{ opacity: 0 }}
                                        whileInView={!loading && { opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2, duration: 0.5, ease: "easeOut" }}
                                        className="product-box mb-[45px] relative overflow-hidden w-full lg:mb-[25px] xs:mb-0">
                                        <div className="product-image relative overflow-hidden">
                                            <Link aria-label="link" to="/shop/single-product/">
                                                {item.img && <img width={297} height={379} className="default-image w-full" src={item.img} alt="product-box" />}
                                                {item.hoverImg && <img width={297} height={379} className="hover-img w-full" src={item.hoverImg} alt="product-box" />}
                                            </Link>
                                            {item.badge &&
                                                item.badge.map((item, i) => {
                                                    return item.title && <span key={i} style={{ backgroundColor: item.color }} className="absolute top-[25px] left-[25px] text-[10px] text-semibold text-[#fff] leading-[11px] font-sans text-center uppercase block py-[5px] px-2 rounded-sm">{item.title}</span>
                                                })
                                            }
                                            <div className="product-hover-details">
                                                <Link aria-label="productbox" to="#" className="font-serif text-[#fff] text-sm font-medium uppercase">
                                                    <i className="feather-shopping-bag mr-[10px]"></i>Add to cart
                                                </Link>
                                            </div>
                                            <div className="product-hover-right absolute top-0 right-0 transition-default py-[20px] pr-[15px] w-[65px] transition-default">
                                                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>QUICK SHOP</Tooltip>)} placement="left"><Link aria-label="productbox" to="#" className="product-link-icon move-top-bottom relative rounded-full bg-[#fff] text-darkgray inline-block text-center transition-default m-[5px] h-[40px] w-[40px] leading-[45px]">
                                                    <i className="feather-zoom-in m-0 text-base"></i>
                                                </Link></OverlayTrigger>
                                                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>ADD TO WISHLIST</Tooltip>)} placement="left"><Link aria-label="productbox" to="#" className="product-link-icon move-top-bottom relative rounded-full bg-[#fff] text-darkgray inline-block text-center transition-default m-[5px] h-[40px] w-[40px] leading-[45px]">
                                                    <i className="feather-heart m-0 text-base"></i>
                                                </Link></OverlayTrigger>
                                            </div>
                                        </div>
                                        <div className="product-footer text-center pt-[25px] xs:pt-[10px]">
                                            <Link aria-label="link" to="/shop/single-product/" className="text-darkgray hover:text-black font-medium inline-block">{item.title}</Link>
                                            {
                                                (item.price || item.oldPrice) && <div className="product-price text-md">
                                                    {item.oldPrice && <span className="line-through mr-2">{item.oldPrice}</span>}
                                                    {item.price && <span>{item.price}</span>}
                                                </div>
                                            }
                                        </div>
                                    </m.div>
                                </li>
                            )
                        })}
                </ul>
            </div>
        </>
    )
}

export default memo(ProductBox)

ProductBox.defaultProps = {
    data: productData,
}

ProductBox.propTypes = {
    grid: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            oldPrice: PropTypes.string,
            price: PropTypes.string,
            title: PropTypes.string,
            img: PropTypes.string,
            hoverImg: PropTypes.string,
            category: PropTypes.array,
            badge: PropTypes.arrayOf(
                PropTypes.exact({
                    title: PropTypes.string,
                    color: PropTypes.string
                }))
        })
    )
}
