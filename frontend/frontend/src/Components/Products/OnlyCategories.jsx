import React, { useState, useEffect, useRef, memo } from 'react'

// Libraries
import { PropTypes } from "prop-types";
import { Link } from 'react-router-dom';
import { m } from "framer-motion";

// Data
import { onlyCategoriesData } from './ProductData';

const OnlyCategories = (props) => {
    const style = { "--overlay-color": typeof (props.overlay) === "object" ? `linear-gradient(to right top, ${props.overlay.map((item, i) => item)})` : props.overlay }
    const blogWrapper = useRef();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        import("../../Functions/Utilities").then(module => {
            const grid = module.initializeIsotop(blogWrapper.current)
            grid.on('arrangeComplete', () => setLoading(false));
        })
    }, [])
    return (
        <>
            <div className="grid-wrapper">
                <ul ref={blogWrapper} className={`grid-container${props.grid ? ` ${props.grid}` : ""}${loading ? " loading" : ""}${props.className ? ` ${props.className}` : ""}`}>
                    <li className="grid-sizer"></li>
                    {
                        props.data.map((item, i) => {
                            return (
                                <li className={`grid-item${item.double_col ? " grid-item-double" : ""}`} key={i} style={style}>
                                    <m.div
                                        initial={{ opacity: 0 }}
                                        whileInView={!loading && { opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="shop-product relative overflow-hidden">
                                        <div className="shop-product-image relative">
                                            {item.title && <div className="absolute top-0 left-0 w-full h-full shop-hover"></div>}
                                            <Link aria-label="link" to={item.link}>
                                                {item.img && <img width={400} height={534} src={item.img} className="w-full h-auto align-middle" alt="" />}
                                            </Link>
                                        </div>
                                        {
                                            item.title && <div className="shop-product-content flex items-center bg-[#fff] px-[30px] py-[5px] absolute bottom-[25px] left-0 right-0 transition-default rounded-[4px] w-[calc(100%-50px)] mx-auto">
                                                <Link aria-label="onlycategories" to={item.link} className="font-serif font-medium text-darkgray leading-[18px] inline-block align-middle uppercase me-auto">{item.title}</Link>
                                                <Link aria-label="onlycategories" to={item.link}><i className="line-icon-Arrow-OutRight text-darkgray text-[50px] align-middle ml-[15px]"></i></Link>
                                            </div>
                                        }
                                    </m.div>
                                </li>
                            )
                        })}
                </ul>
            </div>
        </>
    )
}

export default memo(OnlyCategories)

OnlyCategories.defaultProps = {
    data: onlyCategoriesData,
    overlay: ["#f84e30cc", "#fe6f56cc"]
}

OnlyCategories.propTypes = {
    grid: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            img: PropTypes.string,
            double_col: PropTypes.bool,
            link: PropTypes.string,
        })
    )
}