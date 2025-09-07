import React, { useState, useEffect, useRef, memo } from 'react'

// Libraries
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { m } from "framer-motion";

// Components
import Filter from "../Portfolio/Filter";

// Data
import { shopWideData } from './ProductData';

const ShopWide = (props) => {
    const shopWrapper = useRef();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        import("../../Functions/Utilities").then(module => {
            const grid = module.initializeIsotop(shopWrapper.current)
            grid.on('arrangeComplete', () => setLoading(false));
        })
    }, [])

    const handleFilterChange = () => {
        shopWrapper.current.querySelectorAll("li").forEach(item => item.childNodes[0]?.classList.add("appear"))
    }


    return (
        <>
            <div className="grid-wrapper">
                {/* Filter Start */}
                <Filter title={props.title} filterData={props.filterData} onFilterChange={handleFilterChange} />
                {/* Filter End */}

                <ul ref={shopWrapper} className={`grid-container${props.grid ? ` ${props.grid}` : ""}${loading ? " loading" : ""}${props.className ? ` ${props.className}` : ""}${props.filter === false ? "" : " mt-28 md:mt-[4.5rem] sm:mt-8"}`}>

                    <li className="grid-sizer"></li>
                    {
                        props.data.map((item, i) => {
                            return (
                                <li className={`grid-item${item.double_col ? " grid-item-double" : ""} ${item.category.map(item => item.split(" ").join("")).toString().split(",").join(" ").toLowerCase()}`} key={i}>
                                    <m.div
                                        initial={{ opacity: 0 }}
                                        whileInView={!loading && { opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6, ease: "easeOut" }}
                                        className="product-box relative overflow-hidden w-full mb-[45px] xs:mb-0">
                                        <div className="product-image relative overflow-hidden rounded-md">
                                            <Link aria-label="link" to="/shop/single-product/">
                                                {item.img && <img width={600} height={765} className="default-image w-full" src={item.img} alt="" />}
                                                {item.hoverImg && <img width={600} height={765} className="hover-img w-full" src={item.hoverImg} alt="" />}
                                            </Link>
                                            {item.badge &&
                                                item.badge.map((item, i) => {
                                                    return item.title && <span key={i} style={{ backgroundColor: item.color }} className="absolute top-[25px] left-[25px] text-[10px] font-semibold text-[#fff] leading-[11px] font-sans text-center uppercase block py-[5px] px-[8px] rounded-sm">{item.title}</span>
                                                })
                                            }
                                            <div className="product-overlay absolute top-0 left-0 w-full h-full"></div>
                                            <div className="product-hover-bottom absolute bottom-0 w-full left-0 transition-default py-[35px] text-center">
                                                <OverlayTrigger overlay={(props) => (<Tooltip className="text-xxs font-serif" {...props}>ADD TO CART</Tooltip>)} placement="top"><Link aria-label="shopwide" to="#" rel="noreferrer" className="product-link-icon move-top-bottom relative rounded-full bg-[#fff] text-darkgray inline-block text-center transition-default m-[5px] h-[40px] w-[40px] leading-[42px]">
                                                    <i className="feather-shopping-cart m-0 text-base "></i>
                                                </Link></OverlayTrigger>
                                                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>QUICK SHOP</Tooltip>)} placement="top"><Link aria-label="shopwide" to="#" rel="noreferrer" className="product-link-icon move-top-bottom relative rounded-full bg-[#fff] text-darkgray inline-block text-center transition-default m-[5px] h-[40px] w-[40px] leading-[42px]">
                                                    <i className="feather-zoom-in m-0 text-base"></i>
                                                </Link></OverlayTrigger>
                                                <OverlayTrigger overlay={(props) => (<Tooltip {...props}>ADD TO WISHLIST</Tooltip>)} placement="top"><Link aria-label="shopwide" to="#" rel="noreferrer" className="product-link-icon move-top-bottom relative rounded-full bg-[#fff] text-darkgray inline-block text-center transition-default m-[5px] h-[40px] w-[40px] leading-[42px]">
                                                    <i className="feather-heart m-0 text-base"></i>
                                                </Link></OverlayTrigger>
                                            </div>

                                        </div>
                                        <div className="product-footer text-center pt-[25px] xs:pt-[10px]">
                                            <Link aria-label="link" to="/shop/single-product" className="text-darkgray hover:text-black font-medium inline-block">{item.title}</Link>
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

export default memo(ShopWide)

ShopWide.defaultProps = {
    data: shopWideData,
    animationDuration: 0.2,
    animationDelay: 0.2
}

ShopWide.propTypes = {
    grid: PropTypes.string,
    animationDelay: PropTypes.number,
    animationDuration: PropTypes.number,
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
