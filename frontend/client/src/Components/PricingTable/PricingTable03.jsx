import React, { memo } from 'react'

// Libraries
import { Col, Row } from 'react-bootstrap'

// Components
import Buttons from '../Button/Buttons'

const PriceTable03 = (props) => {
    return (
        <Row className={`pt-[7.5rem] sm:pt-[20px] pb-4 justify-center overflow-hidden ${props.className ? ` ${props.className}` : "" }${props.grid ? ` ${props.grid}` : ""}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <Col key={i} className={`${props.theme}${(item.popular && item.popular.isPopular) ? " popular" : ""} text-center rounded-md p-[0px] sm:px-[10px]`} style={(item.popular && item.popular.color) && {"--popular-bg": item.popular.color}}>
                            <div className="w-full">
                                {item.title && <h3 className="title">{item.title}</h3>}
                                {item.icon && <i className={`${item.icon} icon`}></i>}
                                {item.price && <h4 className="price">{item.price}</h4>}
                                <ul className="services-wrapper">
                                    {
                                        item.plans && item.plans.map((item, i) => {
                                            return (
                                                <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
                                            )
                                        })
                                    }
                                </ul>
                                {
                                    item.buttonLink && (
                                        (item.popular && item.popular.isPopular) ? (
                                            <Buttons ariaLabel="pricing table" to={item.buttonLink} className="btn-fill font-medium font-serif uppercase mt-[5px]" color="#ffffff" size="md" themeColor="#232323" title={item.buttonTitle} />
                                        ) : (
                                            <Buttons ariaLabel="pricing table"  to={item.buttonLink} className="font-medium font-serif uppercase bg-[#fff] hover:text-white" color="#000" size="md" themeColor="#000" title={item.buttonTitle} />
                                        )
                                    )
                                }

                            </div>
                        </Col>
                    )
                })
            }
        </Row>

    )
}

export default memo(PriceTable03)
