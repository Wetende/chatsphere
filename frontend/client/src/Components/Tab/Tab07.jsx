import React, { memo } from 'react'

// Libraries
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import { PropTypes } from "prop-types";


// Components
import IconWithText from '../IconWithText/IconWithText'
import Buttons from '../Button/Buttons'

// Data
import { TabData07 } from './TabData'

const Tab07 = (props) => {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
            <Row className="tab-style-07">
                <Col lg={12} className="p-0 xs:!px-[15px]">
                    <Nav className="justify-center uppercase font-serif font-medium text-center cursor-pointer border-b border-t border-solid border-mediumgray mb-40 md:flex-nowrap md:mb-[72px] sm:mb-[66px] sm:border-b-0">
                        {
                            props.data.map((item, i) => {
                                return (
                                    <Nav.Item key={i}>
                                        <Nav.Link className="block text-darkgray border-b-[3px] border-solid border-transparent py-[30px] px-[40px] mb-0" eventKey={i} key={i}>{item.tabTitle}</Nav.Link>
                                    </Nav.Item>
                                )
                            })
                        }
                    </Nav>
                </Col>
                <Col lg={12} className="p-0 xs:!px-[15px]">
                    <Container>
                        <Col>
                            <Tab.Content>
                                {
                                    props.data.map((item, i) => {
                                        return (
                                            <Tab.Pane eventKey={i} key={i}>
                                                <Row className="items-center">
                                                    <Col key={i} md={6} className='tab-data items-center landscape:px-[15px]'>
                                                        <div className="relative md:mb-[30px]">
                                                            {item.img && <img height={481} width={456} className="w-full ml-auto" src={item.img} alt="tab" />}
                                                            {item.subtitle && <div className="bg-gradient-to-tr from-[#bf8c4c] to-[#445a58] text-white font-serif text-xlg w-[300px] absolute top-[60px] left-[-15px] py-12 px-14 lg:text-lg md:w-[250px] md:p-[24px] md:left-[-15px] md:leading-[26px]">{item.subtitle}</div>}
                                                        </div>
                                                    </Col>
                                                    <Col className="content landscape:px-[15px]" lg={{ span: 5, offset: 1 }} md={6}>
                                                        {item.title && <h2 className="heading-5 font-serif font-medium text-darkgray mb-16 lg:mb-[59px] md:mb-[48px] sm:mb-[44px]">{item.title}</h2>}
                                                        <IconWithText grid="row-cols-1 justify-center gap-5 sm:gap-3" theme="icon-with-text-01" data={item.featurebox} />
                                                        {(item.buttonLink || item.buttonTitle) &&
                                                            <Buttons ariaLabel="tab button" to={item.buttonLink} className="font-medium font-serif uppercase btn-link after:h-[2px] mt-20 lg:mt-[3.5rem] md:mb-0 md:text-md after:bg-darkgray hover:text-darkgray" size="xl" color="#232323" title={item.buttonTitle} />}
                                                    </Col>
                                                </Row>
                                            </Tab.Pane>
                                        )
                                    })
                                }
                            </Tab.Content>
                        </Col>
                    </Container>
                </Col>
            </Row>
        </Tab.Container>
    )
}

Tab07.defaultProps = {
    data: TabData07
}

Tab07.propTypes = {
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


export default memo(Tab07)