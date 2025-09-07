import { Tab } from 'bootstrap'
import React from 'react'

// Libraries
import { Col, Container, Row, Tabs } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Components
import PricingTable01 from '../../Components/PricingTable/PricingTable01'
import PricingTable02 from '../../Components/PricingTable/PricingTable02'
import PricingTable03 from '../../Components/PricingTable/PricingTable03'
import PricingTable04 from '../../Components/PricingTable/PricingTable04'

// Data
import { pricingTable01, pricingTable02, pricingTable03MonthData, pricingTable03YearData, pricingTable04 } from '../../Components/PricingTable/PricingTableData'

const PricingTablePage = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Pricing table</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Pricing table</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className='mb-[7%]'>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Pricing table style 01</h6>
            </Col>
          </Row>
          <PricingTable01 grid="row-cols-1 row-cols-lg-3 gap-y-10 justify-center items-center" theme="pricing-table-style-01 col-12 col-lg-4 col-md-8" className="" data={pricingTable01} themeColor="dark" />
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray">
        <Container className="px-[7%] md:px-[15px]">
          <Row>
            <Col className='mb-[7%]'>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Pricing table style 02</h6>
            </Col>
          </Row>
          <PricingTable02 grid="row-cols-1 row-cols-md-3 gap-y-[30px] sm:mx-0 justify-center items-center" theme="pricing-table-style-02" className="" data={pricingTable02} />
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row>
            <Col className='mb-[7%]'>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Pricing table style 03</h6>
            </Col>
          </Row>
          <Row className="justify-center">
            <Col xs={12} xl={10} lg={11} className='switch-tab'>
              <Tabs defaultActiveKey="monthly">
                <Tab eventKey="monthly" title="MONTHLY">
                  <PricingTable03 grid="row row-cols-1 gap-y-10 row-cols-md-3 items-center" theme="pricing-table-style-03" className="" data={pricingTable03MonthData} />
                </Tab>
                <Tab eventKey="yearly" title="YEARLY">
                    <PricingTable03 grid="row row-cols-1 row-cols-md-3 gap-y-10 items-center" theme="pricing-table-style-03" className="" data={pricingTable03YearData} />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] bg-lightgray">
        <Container>
          <Row>
            <Col className='mb-[7%]'>
              <h6 className="font-serif text-gray-900 text-center font-medium mb-[25px] lg:mb-[15px]">Pricing table style 04</h6>
            </Col>
          </Row>
          <PricingTable04 grid="row-cols-1 row-cols-lg-3 gap-y-[30px] justify-center items-center" theme="pricing-table-style-04 col-12 col-lg-4 col-md-8" className="" data={pricingTable04} />
        </Container>
      </section>
    </>
  )
}

export default PricingTablePage