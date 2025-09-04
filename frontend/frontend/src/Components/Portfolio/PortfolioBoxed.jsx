import React, { memo, useEffect, useRef, useState } from 'react'

// Libraries
import { PropTypes } from "prop-types";
import { m } from "framer-motion";

// Components
import Filter from './Filter';

// Data
import { portfolioBoxedData } from './PortfolioData'

// Styles
import { Link } from 'react-router-dom';

const PortfolioBoxed = (props) => {
    const portfolioWrapper = useRef()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let allImages = portfolioWrapper.current.querySelectorAll("img");

        Promise.all(Array.prototype.slice.call(allImages).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
            import("../../Functions/Utilities").then(module => {
                const grid = module.initializeIsotop(portfolioWrapper.current)
                grid.on('arrangeComplete', () => setLoading(false));
            })
        });
    }, [])

    const handleFilterChange = () => {
        portfolioWrapper.current.querySelectorAll("li").forEach(item => item.childNodes[0]?.classList.add("appear"))
    }

    return (
        <div className="grid-wrapper">
            {/* Filter Start */}
            <Filter title={props.title} filterData={props.filterData} onFilterChange={handleFilterChange} />
            {/* Filter End */}

            {/* Grid Start */}
            <ul ref={portfolioWrapper} className={`grid-container text-center${props.grid ? ` ${props.grid}` : ""}${props.className ? ` ${props.className}` : ""}${loading ? " loading" : ""}`}>
                <li className="grid-sizer"></li>
                {
                    props.data.map((item, i) => {
                        return (
                            <li key={i} className={`grid-item${item.double_col ? " grid-item-double" : ""} ${item.category ? item.category.toString().split(",").join(" ").toLowerCase() : ""}`}>
                                <Link to={item.link} target={props.target} aria-label="link">
                                    <m.div
                                        className="portfolio-boxed overflow-hidden"
                                        initial={{ opacity: 0 }}
                                        whileInView={!loading && { opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    >
                                        <div className="portfolio-image relative">
                                            {item.img && <img className="w-full" src={item.img} height={447} width={550} alt="portfolio-boxed" />}
                                            <div className="porfolio-hover absolute bg-white rounded-[3px]">
                                                <div className="flex px-[30px] py-[15px] text-left self-end items-center w-full landscape:xl:px-[20px]">
                                                    {(item.subtitle || item.title) && <div className="mr-auto">
                                                        {item.subtitle && <div className="mt-[5px] text-spanishgray text-sm font-serif uppercase">{item.subtitle}</div>}
                                                        {item.title && <div className="font-medium text-darkgray font-serif uppercase">{item.title}</div>}
                                                    </div>}
                                                    <div className="ml-auto"><i className="line-icon-Arrow-OutRight text-[32px] inline-block top-[3px] text-darkgray relative"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </m.div>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            {/* Grid End */}
        </div>
    )
}

PortfolioBoxed.defaultProps = {
        data: portfolioBoxedData,
}

PortfolioBoxed.propTypes = {
    grid: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            subtitle: PropTypes.string,
            title: PropTypes.string,
            img: PropTypes.string,
            category: PropTypes.array,
            link: PropTypes.string,
            double_col: PropTypes.bool
        })
    )
}

export default memo(PortfolioBoxed)