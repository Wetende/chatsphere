import React, { memo } from 'react'

// Libraries
import { Col, Row } from 'react-bootstrap'

// Components
import Buttons from '../Button/Buttons'

// Data
import { pricingTable02 } from './PricingTableData'


const PricingTable02 = (props) => {
    return (
        <Row className={`${props.grid} ${props.className}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <Col key={i} className={`${props.theme}${item.popular ? " popular" : ""} text-center justify-center`} style={(item.popular && item.popular.color) && {"--popular-bg": item.popular.color}}>
                            <div className="pricing-wrapper">
                                {(item.popular && item.popular.isPopular) && <span className='top-head hidden uppercase'>Popular</span>}
                                {item.icon && <i className={`${item.icon} text-[50px] text-[#ffcc2e] inline-block`}></i>}
                                {item.title && <h3 className="font-semibold mt-[5px] text-xmd uppercase font-serif text-[#262b35] mb-[40px] tracking-normal">{item.title}</h3>}
                                {item.price && <h4 className="price-wrap text-[#262b35] mb-0 font-semibold tracking-[-2px] font-serif">{item.price}</h4>}
                                {item.term && <div className='mb-[30px] uppercase font-medium tracking-[1px] text-sm text-[#828282] font-serif'>{item.term}</div>}
                                <ul className="mb-[40px] pl-0 mx-0 list-none">
                                    {
                                        item.plans && item.plans.map((item, i) => {
                                            return (
                                                <li key={i} className='text-[#828282] mb-[10px] last:mb-0' dangerouslySetInnerHTML={{ __html: item }}></li>
                                            )
                                        })
                                    }
                                </ul>
                                {
                                    item.buttonLink && (
                                        (item.popular && item.popular.isPopular) ? (
                                            <Buttons ariaLabel="pricing table" to={item.buttonLink} className="btn-fancy font-medium font-serif btn-fill rounded-none uppercase hover:text-black tracking-[0.5px]" color="#ffffff" size="sm" themeColor="#232323" title={item.buttonTitle} />
                                        ) : (
                                            <Buttons ariaLabel="pricing table" to={item.buttonLink} className="btn-fancy font-medium font-serif uppercase btn-transparent rounded-none hover:text-white border-[#dbdbdb]" color="#232323" size="sm" themeColor="#232323" title={item.buttonTitle} />
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

PricingTable02.defaultProps = {
    data: pricingTable02
}

export default memo(PricingTable02)