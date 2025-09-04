import React, { memo } from 'react'

// Libraries
import { Col, Nav, Row, Tab } from "react-bootstrap"
import { PropTypes } from "prop-types";

// Components
import Accordions from '../Accordion/Accordion'

// Data
import { TabData05 } from './TabData'

const Tab05 = (props) => {
    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
                <Row className="tab-style-05 justify-center">
                    <Col lg={12} className="text-center">
                        <Nav className="mb-[78px] md:mb-20 xs:mx-[15px] items-center justify-center font-medium uppercase">
                            {
                                props.data.map((item, i) => {
                                    return (
                                        <Nav.Item key={i} className="">
                                            <Nav.Link className="text-center" eventKey={i}>
                                                {item.tabTitle}
                                            </Nav.Link>
                                        </Nav.Item>
                                    )
                                })
                            }
                        </Nav>
                    </Col>
                    <Col>
                        <Tab.Content>
                            {
                                props.data.map((item, i) => {
                                    return (
                                        <Tab.Pane eventKey={i} key={i}>
                                            <Row className="justify-center">
                                                <Col lg={10} className='md:px-0'>
                                                    <Accordions
                                                        theme="accordion-style-05"
                                                        className=""
                                                        themeColor="light"
                                                        data={item.activities}
                                                    />
                                                </Col>
                                            </Row>
                                        </Tab.Pane>
                                    )
                                })
                            }
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

Tab05.defaultProps = {
    data: TabData05
}

Tab05.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.exact({
            tabTitle: PropTypes.string,
            tabicons: PropTypes.string,
            activities: PropTypes.arrayOf(
                PropTypes.exact({
                    accordionid: PropTypes.string,
                    accordionhref: PropTypes.string,
                    time: PropTypes.string,
                    title: PropTypes.string,
                    content: PropTypes.string,
                    author: PropTypes.string,
                })),
        })
    ),
}

export default memo(Tab05)
