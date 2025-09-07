import React, { memo } from 'react'

// Libraries
import { Badge, Col, Nav, Row, Tab } from 'react-bootstrap'
import { PropTypes } from "prop-types";

// Data
import { TabData03 } from './TabData'

const Tab03 = (props) => {
  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
        <Row className="tab-style-03 justify-center">
          <Col lg={12} className="text-center">
            <Nav className="justify-center mb-[75px] sm:block md:mb-8">
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
                      <Row xs={2}>
                        {
                          item.activities.map((item, i) => {
                            return (
                              <Col key={i} lg={6} xs={12} className="tab-item">
                                <div className="border-b border-[#0000001a] flex py-[28px] md:items-center">
                                  <img height={73} width={73} className="rounded-full mr-[25px] xs:w-[40px] xs:mr-[20px]" src={item.img} alt="" data-no-retina="" />
                                  <div className="w-[70%] lg:w-[65%] xs:w-[60%] xs:mr-[10px]">
                                    <span className="font-medium text-xmd text-darkgray leading-[28px]">{item.title}{item.badge && <Badge style={{ backgroundColor: item.badge.color }} bg={`[${item.badge.color}]`} className="inline-block align-middle py-[2px] px-[9px] text-[10px] leading-[15px] text-white uppercase ml-[10px] rounded-[1px] font-medium">{item.badge.title}</Badge>}</span>
                                    <p>{item.content}</p>
                                  </div>
                                  <div className="font-medium text-xmd text-darkgray flex items-center">{item.price}</div>
                                </div>
                              </Col>
                            )
                          })
                        }
                      </Row>

                    </Tab.Pane>
                  )
                })
              }
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  )
}

Tab03.defaultProps = {
  data: TabData03
}

Tab03.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.exact({
      tabTitle: PropTypes.string,
      day: PropTypes.string,
      tabicons: PropTypes.string,
      activities: PropTypes.arrayOf(
        PropTypes.exact({
          time: PropTypes.string,
          price: PropTypes.string,
          img: PropTypes.string,
          title: PropTypes.string,
          content: PropTypes.string,
          author: PropTypes.string,
          badge: PropTypes.exact(
            {
              title: PropTypes.string,
              color: PropTypes.string,
            })
        }))
    })
  ),
}

export default memo(Tab03)