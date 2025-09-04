import React, { memo } from 'react'

// Libraries
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import { PropTypes } from "prop-types";

// Data
import { TabData06 } from './TabData'


const Tab06 = (props) => {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
            <Row className="tab-style-06 justify-center">
                <Col lg={12}>
                    <Nav className="justify-center border-b border-solid">
                        {
                            props.data.map((item, i) => {
                                return (
                                    <Nav.Item key={i}>
                                        <Nav.Link eventKey={i} className="tab-title border-b-[3px] border-solid border-transparent px-[20px] mx-[20px] text-darkgray font-serif text-center m-0 font-semibold cursor-pointer md:top-0 md:py-[40px] md:pb-[22px] lg:pt-0 lg:px-[40px] lg:pb-[22px] md:pt-0 md:px-[20px] sm:py-[15px] sm:px-[20px]">
                                            {item.day && <span className="block font-serif text-center font-normal text-[#828282]">{item.day}</span>}
                                            {item.tabTitle}
                                        </Nav.Link>
                                    </Nav.Item>
                                )
                            })
                        }
                    </Nav>
                </Col>
                <Col lg={12}>
                    <Tab.Content>
                        {
                            props.data.map((item, i) => {
                                return (
                                    <Tab.Pane eventKey={i} key={i}>
                                        {
                                            item.activities.map((item, i) => {
                                                return (
                                                    <div key={i} className='panel flex justify-center items-center border-b border-solid py-[35px] px-[70px] lg:py-[20px] lg:px-[40px] lg:text-[15px] lg:font-sans md:px-[20px] sm:block'>
                                                        <div className='panel-heading lg:w-[170px] md:w-[135px] sm:w-full sm:text-center'>
                                                            {item.time && <span className='panel-time '><i className="feather-clock mr-[10px]"></i>{item.time}</span>}
                                                        </div>
                                                        <div className='feature-box-icon py-[7px] md:items-center flex sm:pt-[10px] sm:px-0 sm:pb-[7px]'>
                                                            {item.img && <img height="" width="" src={item.img} className="md:h-[70px] md:w-[70px]" alt="" />}
                                                            {
                                                                (item.title || item.content) && (
                                                                    <div className='feature-box-content'>
                                                                        {item.title && <span className="font-medium mb-[5px] text-darkgray inline-block pl-[40px] md:p-0">{item.title}</span>}
                                                                        {item.content && <p className="mb-0 w-[65%]">{item.content}</p>}
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                        {
                                                            item.author && (
                                                                <span className='panel-speaker'>
                                                                    <i className="feather-user"></i>
                                                                    {item.author}
                                                                </span>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </Tab.Pane>
                                )
                            })
                        }
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

Tab06.defaultProps = {
    data: TabData06
}

Tab06.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.exact({
            tabTitle: PropTypes.string,
            subtitle: PropTypes.string,
            title: PropTypes.string,
            img: PropTypes.string,
            content: PropTypes.string,
            buttonLink: PropTypes.string,
            buttonTitle: PropTypes.string,
            tabicons: PropTypes.string,
            day: PropTypes.string,
            activities: PropTypes.arrayOf(
                PropTypes.exact({
                    time: PropTypes.string,
                    content: PropTypes.string,
                    title: PropTypes.string,
                    img: PropTypes.string,
                    author: PropTypes.string,
                })),
            featurebox: PropTypes.arrayOf(
                PropTypes.exact({
                    content: PropTypes.string,
                    title: PropTypes.string,
                    icon: PropTypes.string,
                }))

        })
    ),
}

export default memo(Tab06)