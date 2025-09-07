import React from "react";

// Libraries
import { Col, Container, Row } from 'react-bootstrap';
import { PropTypes } from "prop-types";

const Filter = (props) => {

    const handleFilterChange = () => {
        props.onFilterChange && props.onFilterChange()
    }

    return (
        (props.title || props.filterData) && (
            <Container className="mb-24 md:mb-[4.5rem] sm:mb-8">
                <Row className={`${props.title ? "justify-between" : "justify-center"} items-center md:justify-center md:items-center md:text-center md:flex-col`}>
                    {
                        props.title && (
                            <Col xs="auto" className="md:mb-[30px]"><h3 className="heading-4 font-serif m-0 p-0 font-semibold text-darkgray tracking-[-1px]">{props.title}</h3></Col>
                        )
                    }
                    <Col xs="auto">
                        {
                            props.filterData && (
                                <ul className="filter-menu items-center justify-center flex flex-wrap uppercase">
                                    {
                                        props.filterData.map((item, i) => {
                                            return (
                                                <li key={i} className={`px-[20px]${i === 0 ? " active" : ""}`}><span data-filter={item.key} onClick={handleFilterChange}>{item.title}</span></li>
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
    )
}

export default Filter

Filter.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    filterData: PropTypes.arrayOf(
        PropTypes.exact({
            key: PropTypes.string,
            title: PropTypes.string,
        })
    ),
}