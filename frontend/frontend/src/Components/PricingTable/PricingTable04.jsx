import React, { memo } from 'react'

// Libraries
import { Col, Row } from 'react-bootstrap'

// Components
import Buttons from '../Button/Buttons'

// Data
import { pricingTable04 } from './PricingTableData'

const PricingTable04 = (props) => {
    return (
        <Row className={`${props.grid}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <Col key={i} className={`${props.theme}${props.className ? ` ${props.className}` :""}${(item.popular && item.popular.isPopular) ? " popular" : ""} flex text-center justify-center rounded-md`} style={(item.popular && item.popular.color) && { "--popular-bg": item.popular.color }}>
                            <div className="pricing-wrapper">
                                {item.subtitle && <div className="pricing-sub-head text-md text-[14px] font-serif">{item.subtitle}</div>}
                                {item.title && <div className="pricing-head font-medium text-[18px] uppercase font-serif md:text-xmd">{item.title}</div>}
                                {item.price && <h3 className="price-wrap font-medium font-serif mb-[8px]">{item.price}</h3>}
                                {item.term && <div className='pricing-terms'>{item.term}</div>}
                                <span className='plans-wrapper block'>
                                    <ul className="py-12 pl-0 m-0 list-none">
                                        {
                                            item.plans && item.plans.map((item, i) => {
                                                return (
                                                    <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </span>
                                {
                                    item.buttonLink && (
                                        item.popular ? (
                                            <Buttons ariaLabel="pricing table" to={item.buttonLink} aria-label="price page link" className="font-serif btn-fancy btn-fill rounded-none font-medium uppercase" themeColor="#fff" color="#232323" size="md" title={item.buttonTitle} />
                                        ) : (
                                            <Buttons ariaLabel="pricing table" to={item.buttonLink} aria-label="price page link" className="font-medium btn-fancy btn-fill rounded-none font-serif uppercase" themeColor="#232323" color="#fff" size="sm" title={item.buttonTitle} />
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


PricingTable04.defaultProps = {
    data: pricingTable04
}


export default memo(PricingTable04)