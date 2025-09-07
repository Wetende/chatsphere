import React, { memo, useEffect, useRef, useState } from 'react'

// Libraries
import { PropTypes } from "prop-types";
import { m } from "framer-motion";
import { Link } from 'react-router-dom';

// Components
import Filter from './Filter';

// Data
import { portfolioBorderedData } from './PortfolioData'

const PortfolioBordered = (props) => {
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

    const style = { "--overlay-color": typeof (props.overlay) === "object" ? `linear-gradient(to right top, ${props.overlay.map((item, i) => item)})` : props.overlay }

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
                            <li key={i} className={`grid-item${item.double_col ? " grid-item-double" : ""} ${item.category.toString().split(",").join(" ").toLowerCase()}`}>
                                <Link aria-label="link" target={props.target} to={item.link}>
                                    <m.div
                                        className="portfolio-bordered"
                                        initial={{ opacity: 0 }}
                                        whileInView={!loading && { opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    >
                                        <div className="portfolio-image" style={style}>
                                            {item.img && <img className="w-full" src={item.img} height={470} width={550} alt="portfolio-bordered" />}
                                            <div className="portfolio-border-hover">
                                                <div className="scale block font-serif">
                                                    <div className="text-darkgray font-medium">{item.title}</div>
                                                    <div className="text-spanishgray text-sm uppercase">{item.subtitle}</div>
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

PortfolioBordered.defaultProps = {
    data: portfolioBorderedData,
}

PortfolioBordered.propTypes = {
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

export default memo(PortfolioBordered)