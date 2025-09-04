import React, { memo } from 'react'

// Libraries
import { Col, Row, Tab, Tabs } from 'react-bootstrap'

// Components
import PricingTable03 from '../PricingTable/PricingTable03'

// Data
import { pricingTable03MonthData, pricingTable03YearData } from '../PricingTable/PricingTableData'

const Tab04 = () => {
  return (
    <>
      <Row className="justify-center">
        <Col xs={12} xl={10} lg={11} className='switch-tab'>
          <Tabs className="md:mb-[90px] sm:mb-[20px]"
            defaultActiveKey="monthly">
            <Tab eventKey="monthly" title="MONTHLY">
              <PricingTable03 grid="row row-cols-1 gap-y-10 row-cols-md-3 items-center" theme="pricing-table-style-03" className="" data={pricingTable03MonthData} />
            </Tab>
            <Tab eventKey="yearly" title="YEARLY">
              <PricingTable03 grid="row row-cols-1 row-cols-md-3 gap-y-10 items-center" theme="pricing-table-style-03" className="" data={pricingTable03YearData} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  )
}

export default memo(Tab04)