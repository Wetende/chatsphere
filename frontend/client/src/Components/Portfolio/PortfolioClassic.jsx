import React, { memo, useEffect, useRef, useState } from 'react'

// Libraries
import Lightbox from 'react-18-image-lightbox';
import { Link } from 'react-router-dom';
import { PropTypes } from "prop-types";
import { m } from "framer-motion";

// Components
import Filter from './Filter';

// Data
import { portfolioClassicData } from './PortfolioData';

const PortfolioClassic = (props) => {
    const portfolioWrapper = useRef()
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0)

    useEffect(() => {
        let allImages = portfolioWrapper.current.querySelectorAll("img");

        Promise.all(Array.prototype.slice.call(allImages).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
            import("../../Functions/Utilities").then(module => {
                const grid = module.initializeIsotop(portfolioWrapper.current)
                grid.on('arrangeComplete', () => setLoading(false));
            })
        });
    }, [])

    const handleClick = (i) => {
        setIsOpen(true)
        setPhotoIndex(i)
    }

    const style = {
        "--overlay-color": typeof (props.overlay) === "object" ? `linear-gradient(to right top, ${props.overlay})` : props.overlay
    }

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
                            <li
                                key={i}
                                className={`grid-item p-[15px]${item.double_col ? " grid-item-double" : ""} ${item.category.toString().split(",").join(" ").toLowerCase()}`}>
                                <m.div
                                    initial={{ opacity: 0 }}
                                    whileInView={!loading && { opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="portfolio-classic">
                                    <div className="portfolio-image" style={style}>
                                        {item.img && <img className="w-full" src={item.img} height={440} width={540} alt="portfolio-classic" />}
                                        <div className="portfolio-icon">
                                            <div onClick={() => handleClick(i)} ><i className="fas fa-search"></i> </div>
                                            <Link to={item.link} target={props.target} aria-label="link"> <i className="fas fa-link"></i></Link>
                                        </div>
                                    </div>
                                    {
                                        (item.title || item.subtitle) && (
                                            <div className="portfolio-caption">
                                                {item.title && <Link aria-label="link" to={item.link}><span>{item.title}</span></Link>}
                                                {item.subtitle && <span className="text-md block mb-[1%]">{item.subtitle}</span>}
                                            </div>
                                        )
                                    }
                                </m.div>
                            </li>
                        )
                    })
                }
            </ul>
            {/* Grid End */}

            {isOpen && (
                <Lightbox
                    mainSrc={props.data[photoIndex].img}
                    onCloseRequest={() => setIsOpen(false)}
                    nextSrc={props.data[(photoIndex + 1) % props.data.length].img}
                    prevSrc={props.data[(photoIndex + props.data.length - 1) % props.data.length].img}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + props.data.length - 1) % props.data.length)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % props.data.length)
                    }
                />
            )}
        </div>
    )
}

PortfolioClassic.defaultProps = {
        data: portfolioClassicData,
}

PortfolioClassic.propTypes = {
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

export default memo(PortfolioClassic)