import React from 'react'

// Libraries
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Component
import Team from '../../Components/Team/Team'
import { fadeIn } from '../../Functions/GlobalAnimations'

// Data
import { TeamData01 } from '../../Components/Team/TeamData'

const TeamCarouselPage = () => {
  return (
    <>

      {/* Section Start */}
      <section className="bg-darkgray py-[25px]">
        <Container>
          <Row className="items-center justify-center mb-0">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Team carousel</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
              <ul className="xs-text-center">
                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                <li>Team carousel</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Team
            themeColor="dark"
            theme='team-style-01'
            color={["#556fffcc", "#b263e4cc", "#e05fc4cc", "#f767a6cc", "#ff798ecc"]}
            data={TeamData01}
            animation={fadeIn}
            carousel={true}
            carouselOption={{ slidesPerView: 1, spaceBetween: 30, loop: true, navigation: false, autoplay: { delay: 3000, disableOnInteraction: false }, pagination: { dynamicBullets: true, clickable: true }, breakpoints: { 1200: { slidesPerView: 4 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } } }} />
        </Container>
      </section>
    </>
  )
}

export default TeamCarouselPage