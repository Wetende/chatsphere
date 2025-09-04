import React, { memo } from 'react'

// Libraries
import { Col, Row } from 'react-bootstrap'

// Components
import Buttons from '../../Components/Button/Buttons'

// Data
import { pricingTable01 } from '../../Components/PricingTable/PricingTableData'


const PricingTable01 = (props) => {
    return (
        <Row className={`${props.grid} ${props.className}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <Col key={i} className={`${props.theme}${(item.popular && item.popular.isPopular) ? " popular" : ""} ${props.themeColor} flex text-center justify-center rounded-md`} style={(item.popular && item.popular.color) && {"--popular-bg": item.popular.color}}>
                            <div className="pricing-wrapper">
                                {(item.popular && item.popular.isPopular) && <span className="top-head hidden">Popular</span>}
                                {item.title && <div className="pricing-head font-medium text-xlg uppercase font-serif">{item.title}</div>}
                                {item.subtitle && <div className="pricing-sub-head text-sm uppercase mb-[40px]">{item.subtitle}</div>}
                                {item.price && <h3 className="heading-4 price-wrap mb-[5px] -tracking-[1px]">{item.price}</h3>}
                                {item.term && <div className="text-md">{item.term}</div>}
                                <span className="plans-wrapper block">
                                    <ul className="pl-0 m-0 list-none py-[30px]">
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
                                        (item.popular && item.popular.isPopular) ? (
                                            <Buttons ariaLabel="pricing table" to={item.buttonLink} className="font-serif font-medium mt-[15px] uppercase rounded-[4px] hover:text-white" size="md" color="#fff" themeColor={["#e42564", "#fa6259"]} title={item.buttonTitle} />
                                        ) : (
                                            <Buttons ariaLabel="pricing table" to={item.buttonLink} className="font-serif font-medium mt-[15px] uppercase rounded-[4px] btn-transparent hover:text-white" size="sm" color="#262b35" themeColor="#262b35" title={item.buttonTitle} />
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

PricingTable01.defaultProps = {
    data: pricingTable01
}

export default memo(PricingTable01)