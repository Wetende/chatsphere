import React, { memo } from 'react'

// Libraries
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import { PropTypes } from "prop-types";

// Components
import Buttons from '../Button/Buttons'
import CustomModal from '../../Components/CustomModal'

// Data
import { TabData02 } from './TabData';


const Tab02 = (props) => {

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
            <Row className="tab-style-02 justify-center">
                <Col lg={12}>
                    <Nav className="justify-center mb-24 sm:mb-12">
                        {
                            props.data.map((item, i) => {
                                return (
                                    <Nav.Item key={i} className="mx-[20px] px-[20px] md:px-[8px] sm:mx-0 sm:mb-[15px] sm:px-0 sm:w-full sm:text-center">
                                        <Nav.Link className="text-center" eventKey={i}>
                                            {item.tabicons && <i className={`${item.tabicons} text-[28px] mb-[10px] block`}></i>}
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
                                    <Tab.Pane key={i} className="tab-style" eventKey={i}>
                                        <Row className="justify-center items-center">
                                            <Col lg={4} md={12} className="md:mb-24 sm:mb-16">
                                                {item.img && <img height="" width="" src={item.img} alt="" />}
                                            </Col>
                                            <Col lg={4} md={6} className="pl-16 lg:pl-8 md:mb-[25px] md:px-[15px] sm:mb-[30px]">
                                                {item.title && <h6 className="font-serif font-medium text-darkgray w-[95%] md:w-full md:mb-[15px]">{item.title}</h6>}
                                                <div className="flex items-center">
                                                    {/* Modal Component Start */}
                                                    <CustomModal.Wrapper
                                                        modalBtn={
                                                            <span className="inline-flex flex-row items-center justify-center cursor-pointer">
                                                                <Buttons ariaLabel="tab button" type="submit" size="sm" className="btn-sonar" themeColor={["#b783ff", "#ff9393"]} color="#fff" title={<i className="icon-control-play !ml-[5px]" />} />
                                                                <span className="font-medium font-serif text-md text-darkgray uppercase border-b border-solid border-darkgray no-underline ml-4 hover:text-darkgray">{item.buttonTitle}</span>
                                                            </span>
                                                        } >
                                                        <div className="w-[1020px] max-w-full relative rounded mx-auto">
                                                            <div className="fit-video">
                                                                <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                                                            </div>
                                                        </div>

                                                    </CustomModal.Wrapper>
                                                    {/* Modal Component End */}
                                                </div>
                                            </Col>
                                            <Col lg={4} md={6}>
                                                {item.subtitle && <span className="font-serif font-medium text-xmd block text-darkgray mb-[20px]">{item.subtitle}</span>}
                                                {item.content && <p>{item.content}</p>}
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
    )
}

Tab02.defaultProps = {
    data: TabData02
}

Tab02.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.exact({
            tabTitle: PropTypes.string,
            tabicons: PropTypes.string,
            subtitle: PropTypes.string,
            img: PropTypes.string,
            title: PropTypes.string,
            content: PropTypes.string,
            buttonTitle: PropTypes.string,
            buttonLink: PropTypes.string,
        })
    ),
}


export default memo(Tab02)