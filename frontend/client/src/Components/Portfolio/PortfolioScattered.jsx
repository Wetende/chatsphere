import React, { memo } from 'react'

// Libraries
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { PropTypes } from "prop-types";
import { m } from "framer-motion";

// Data
import { PortfolioOverlayData } from './PortfolioData'

const PortfolioScattered = (props) => {
    return (
        <Row className={`${props.grid ? ` ${props.grid}` : ""}${props.className ? ` ${props.className}` : ""}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <Col key={i} className="xs:px-[15px]">
                            <Link aria-label="link" target={props.target} to={item.link}>
                                <m.div
                                    className="overflow-hidden portfolio-box"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                >
                                    <div className='portfolio-image inline-block relative'>
                                        {item.img && <img className="w-full" src={item.img} height={261} width={380} alt="portfolio-scattered" />}
                                    </div>
                                    <div className="portfolio-hover pt-[20px] text-left">
                                        {item.title && <h3 className="heading-6 font-serif text-darkgray text-base font-medium block m-0">{item.title}</h3>}
                                        {item.subtitle && <span className="text-spanishgray block text-md">{item.subtitle}</span>}
                                    </div>
                                </m.div>
                            </Link>
                        </Col>
                    )
                })
            }
        </Row>
    )
}

PortfolioScattered.defaultProps = {
    data: PortfolioOverlayData,
}

PortfolioScattered.propTypes = {
    grid: PropTypes.string,
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

export default memo(PortfolioScattered)