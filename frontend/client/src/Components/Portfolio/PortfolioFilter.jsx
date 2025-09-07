import React, { memo } from "react";

// Libraries
import { Col, Container, Row } from 'react-bootstrap';
import { PropTypes } from "prop-types";

const PortfolioFilter = (props) => {
    return (
        <Container>
            <Row className={`${props.title ? "justify-between" : "justify-center"} items-center md:justify-center md:items-center md:text-center md:flex-col`}>
                {
                    props.title && (
                        <Col xs="auto" className="md:mb-[30px]"><h4 className="font-serif m-0 p-0 font-semibold text-darkgray tracking-[-1px]">{props.title}</h4></Col>
                    )
                }
                <Col xs="auto">
                    {
                        props.filterData && (
                            <ul className="filter-menu items-center justify-center flex flex-wrap uppercase gap-y-5">
                                {
                                    props.filterData.map((item, i) => {
                                        return (
                                            <li key={i} className={`px-[20px]${i === 0 ? " active" : ""}`}><span data-filter={item.key}>{item.title}</span></li>
                                        )
                                    })
                                }
                            </ul>
                        )
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default memo(PortfolioFilter)

PortfolioFilter.propTypes = {
    filterData: PropTypes.arrayOf(
        PropTypes.exact({
            key: PropTypes.string,
            title: PropTypes.string,
        })
    ),
}