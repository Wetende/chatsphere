import React from 'react'

// Libraries
import { Container, Tab, Tabs, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Components
import Team from '../../Components/Team/Team'
import { fadeIn } from '../../Functions/GlobalAnimations'

// Data
import { TeamData01, TeamData02, TeamData03, TeamData04, TeamData05 } from './../../Components/Team/TeamData'

const TeamPage = () => {

    return (
        <>
            {/* Section Start */}
            <section className="bg-darkgray py-[25px]">
                <Container>
                    <Row className="items-center justify-center mb-0">
                        <Col xl={8} lg={6}>
                            <h1 className="font-serif text-white font-medium mb-0 md:text-center text-lg">Team</h1>
                        </Col>
                        <Col xl={4} lg={6} className="breadcrumb justify-end text-xs font-serif md:mt-[10px] mb-0 md:justify-center">
                            <ul className="xs-text-center">
                                <li><Link to="/" aria-label="breadcrumb" className="hover:text-white">Home</Link></li>
                                <li><Link to="#" aria-label="breadcrumb" onClick={(e) => e.preventDefault()} className="hover:text-white">Elements</Link></li>
                                <li>Team</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            <section className="pt-[120px] lg:pt-[95px] md:pt-[80px] sm:pt-[50px] switch-tabs">
                <div className="text-center">
                    <h6 className='text-darkgray font-medium font-serif mb-16 xs:mb-20'>Team style 01</h6>
                </div>
                <Tabs defaultActiveKey="light" id="uncontrolled-tab-example" className="justify-center">
                    {/* Team style 01 ( Light ) start */}
                    <Tab eventKey="light" title="LIGHT">
                        <section className="py-20">
                            <Container>
                                <Team
                                    themeColor="dark"
                                    theme="team-style-01"
                                    className="text-white"
                                    data={TeamData01}
                                    grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 landscape:row-cols-1 landscape:row-cols-lg-4 landscape:row-cols-sm-2 landscape:justify-center gap-y-10"
                                    animation={fadeIn}
                                    animationDelay={0.2}
                                    carousel={false}
                                    overlay={["#2ed47ce6", "#e8a626e6"]}
                                    carouselOption={{
                                        slidesPerView: 1,
                                        spaceBetween: 30,
                                        loop: true,
                                        navigation: true,
                                        autoplay: { delay: 3000, disableOnInteraction: false },
                                        pagination: { dynamicBullets: true, clickable: true },
                                        breakpoints: { 1200: { slidesPerView: 3 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }
                                    }}
                                />
                            </Container>
                        </section>
                    </Tab>
                    {/* Team style 01 ( Light ) end */}

                    {/* Team style 01 ( Dark ) start */}
                    <Tab eventKey="dark" title="DARK">
                        <section className="py-20 bg-darkgray">
                            <Container>
                                <Team
                                    themeColor="light"
                                    theme='team-style-01'
                                    className="text-black"
                                    data={TeamData01}
                                    grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 landscape:row-cols-1 landscape:row-cols-lg-4 landscape:row-cols-sm-2 landscape:justify-center gap-y-10"
                                    animation={fadeIn}
                                    animationDelay={0.2}
                                    carousel={false}
                                    overlay="rgba(255,255,255,0.9)"
                                    carouselOption={{
                                        slidesPerView: 1,
                                        spaceBetween: 30,
                                        loop: true,
                                        navigation: true,
                                        autoplay: { delay: 3000, disableOnInteraction: false },
                                        pagination: { dynamicBullets: true, clickable: true },
                                        breakpoints: { 1200: { slidesPerView: 4 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }
                                    }}
                                />
                            </Container>
                        </section>
                    </Tab>
                    {/* Team style 01 ( Start ) end */}
                </Tabs>
            </section>

            {/* Team Style 02 */}
            <section className="pt-[120px] lg:pt-[95px] md:pt-[80px] sm:pt-[50px] bg-lightgray switch-tabs">
                <div className="text-center">
                    <h6 className='text-darkgray font-medium font-serif mb-16 xs:mb-20'>Team style 02</h6>
                </div>
                <Tabs defaultActiveKey="light" id="uncontrolled-tab-example" className="justify-center">
                    {/* Team style 02 ( Light ) start */}
                    <Tab eventKey="light" title="LIGHT">
                        <section className="py-20">
                            <Container>
                                <Team
                                    themeColor="dark"
                                    theme='team-style-02'
                                    className="text-white sm:justify-center"
                                    overlay={["#b783fff2", "#e37be0f2", "#fa7cc1f2", "#ff85a6f2", "#ff9393f2"]}
                                    data={TeamData02}
                                    grid="row-cols-1 row-cols-sm-2 row-cols-md-3 gap-y-10"
                                    animation={fadeIn}
                                    animationDelay={0.2}
                                    carousel={false}
                                    carouselOption={{ slidesPerView: 3, spaceBetween: 30, loop: true, navigation: false, autoplay: { delay: 3000, disableOnInteraction: false }, pagination: { dynamicBullets: false, clickable: true } }} />
                            </Container>
                        </section>
                    </Tab>
                    {/* Team style 02 ( Light ) End */}

                    {/* Team style 02 ( Dark ) Start */}
                    <Tab eventKey="dark" title="DARK">
                        <section className="py-20 bg-darkgray">
                            <Container>
                                <Team
                                    themeColor="light"
                                    theme="team-style-02"
                                    className="text-black"
                                    overlay="rgba(255,255,255,0.9)"
                                    data={TeamData02}
                                    grid="row-cols-1 row-cols-sm-2 row-cols-md-3 gap-y-10"
                                    animation={fadeIn}
                                    animationDelay={0.2}
                                    carousel={false}
                                    carouselOption={{ slidesPerView: 3, spaceBetween: 30, loop: true, navigation: true, autoplay: { delay: 3000, disableOnInteraction: false }, pagination: { dynamicBullets: true, clickable: true } }} />
                            </Container>
                        </section>
                    </Tab>
                    {/* Team style 02 ( Dark ) End */}
                </Tabs>
            </section>

            {/* Team Style 03 */}
            <section className="pt-[120px] lg:pt-[95px] md:pt-[80px] sm:pt-[50px] bg-gray-color switch-tabs">
                <div className="text-center">
                    <h6 className='text-darkgray font-medium font-serif mb-14 xs:mb-20'>Team style 03</h6>
                </div>
                <Tabs defaultActiveKey="light" id="uncontrolled-tab-example" className="justify-center">
                    {/* Team style 03 ( Light ) start */}
                    <Tab eventKey="light" title="LIGHT">
                        <section className="pt-20">
                            <Container fluid className="px-[8%]  lg:px-[15px]">
                                <Team
                                    themeColor="dark"
                                    theme="team-style-03"
                                    className="text-white"
                                    overlay={["#bf8c4ce6", "#445a58"]}
                                    data={TeamData03}
                                    grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 landscape:row-cols-1 landscape:row-cols-lg-4 landscape:row-cols-sm-2 landscape:justify-center gap-y-10"
                                    animation={fadeIn}
                                    animationDelay={0.2}
                                    carousel={false}
                                    carouselOption={{
                                        slidesPerView: 1,
                                        spaceBetween: 30,
                                        loop: true,
                                        navigation: true,
                                        autoplay: { delay: 3000, disableOnInteraction: false },
                                        pagination: { dynamicBullets: true, clickable: true },
                                        breakpoints: { 1200: { slidesPerView: 4 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }
                                    }}
                                />
                            </Container>
                        </section>
                    </Tab>
                    {/* Team style 03 ( Light ) End */}

                    {/* Team style 03 ( Light ) Start*/}
                    <Tab eventKey="dark" title="DARK">
                        <section className="pt-20 bg-darkgray">
                            <Container fluid className="px-[8%] lg:px-[15px]">
                                <Team
                                    themeColor="light"
                                    theme="team-style-03"
                                    overlay="rgba(255,255,255,0.9)"
                                    data={TeamData03}
                                    grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 landscape:row-cols-1 landscape:row-cols-lg-4 landscape:row-cols-sm-2 landscape:justify-center gap-y-10"
                                    animation={fadeIn}
                                    animationDelay={0.2}
                                    carousel={false}
                                    carouselOption={{
                                        slidesPerView: 1,
                                        spaceBetween: 30,
                                        loop: true,
                                        navigation: true,
                                        autoplay: { delay: 3000, disableOnInteraction: false },
                                        pagination: { dynamicBullets: true, clickable: true },
                                        breakpoints: { 1200: { slidesPerView: 4 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }
                                    }}
                                />
                            </Container>
                        </section>
                    </Tab>
                    {/* Team style 03 ( Light ) End */}
                </Tabs>
            </section>

            {/* Team Style 04 */}
            <section className="pt-[120px] lg:pt-[95px] md:pt-[80px] sm:pt-[50px] bg-lightgray switch-tabs">
                <div className="text-center">
                    <h6 className='text-darkgray font-medium font-serif mb-14 xs:mb-20'>Team style 04</h6>
                </div>
                <Tabs defaultActiveKey="light" id="uncontrolled-tab-example" className="justify-center">
                    {/* Team style 04 ( Light ) start */}
                    <Tab eventKey="light" title="LIGHT">
                        <section className="py-20">
                            <Container>
                                <Team
                                    themeColor="light"
                                    overlay={["#0039e3cc", "#4132e0cc", "#5e28ddcc", "#741bd9cc", "#8600d4cc"]}
                                    theme='team-style-04'
                                    data={TeamData04}
                                    grid="row-cols-1 row-cols-md-3 row-cols-sm-1 gap-y-10 justify-center"
                                    animation={fadeIn}
                                    animationDelay={0.2}
                                    carousel={false}
                                    carouselOption={{ slidesPerView: 3, spaceBetween: 30, loop: true, navigation: true, autoplay: { delay: 3000, disableOnInteraction: true }, pagination: { dynamicBullets: true, clickable: true } }} />
                            </Container>
                        </section>
                    </Tab>
                    {/* Team style 04 ( Light ) End */}

                    {/* Team style 04 (Dark) Start */}
                    <Tab eventKey="dark" title="DARK">
                        <section className="py-20 bg-darkgray">
                            <Container>
                                <Team
                                    themeColor="dark"
                                    overlay="rgba(255,255,255,0.9)"
                                    theme='team-style-04'
                                    data={TeamData04}
                                    grid="row-cols-1 row-cols-md-3 row-cols-sm-1 gap-y-10 justify-center"
                                    animation={fadeIn}
                                    animationDelay={0.2}
                                    carousel={false}
                                    carouselOption={{ slidesPerView: 3, spaceBetween: 30, loop: true, navigation: true, autoplay: { delay: 3000, disableOnInteraction: false }, pagination: { dynamicBullets: true, clickable: true } }} />
                            </Container>
                        </section>
                    </Tab>
                    {/* Team style 04 (Dark) End */}

                </Tabs>
            </section>

            {/* Team Style 05 */}
            <section className="pt-[120px] lg:pt-[95px] md:pt-[80px] sm:pt-[50px] bg-gray-color switch-tabs">
                <div className="text-center">
                    <h6 className='text-darkgray font-medium font-serif mb-14 xs:mb-20'>Team style 05</h6>
                </div>
                <Tabs defaultActiveKey="light" id="uncontrolled-tab-example" className="justify-center">
                    {/* Team style 05 ( Light ) start */}
                    <Tab eventKey="light" title="LIGHT">
                        <section className="py-20">
                            <Container>
                                <Team
                                    themeColor="light"
                                    theme="team-style-05"
                                    className="text-white"
                                    data={TeamData05}
                                    grid="row row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-center gap-y-10"
                                    animation={fadeIn}
                                    animationDelay={0.2}
                                    carousel={false}
                                    carouselOption={{
                                        slidesPerView: 1,
                                        spaceBetween: 30,
                                        loop: true,
                                        navigation: true,
                                        autoplay: { delay: 3000, disableOnInteraction: false },
                                        pagination: { dynamicBullets: true, clickable: true },
                                        breakpoints: { 1200: { slidesPerView: 4 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }
                                    }}
                                />
                            </Container>
                        </section>
                    </Tab>
                    {/* Team style 05 ( Light ) End */}

                    {/* Team style 05 (Dark) Start */}
                    <Tab eventKey="dark" title="DARK">
                        <section className="py-20 bg-lightgray">
                            <Container>
                                <Team
                                    themeColor="dark"
                                    theme="team-style-05"
                                    className="text-white"
                                    data={TeamData05}
                                    grid="row row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-center gap-y-10"
                                    animation={fadeIn}
                                    animationDelay={0.2}
                                    carousel={false}
                                    carouselOption={{
                                        slidesPerView: 1,
                                        spaceBetween: 30,
                                        loop: true,
                                        navigation: true,
                                        autoplay: { delay: 3000, disableOnInteraction: false },
                                        pagination: { dynamicBullets: true, clickable: true },
                                        breakpoints: { 1200: { slidesPerView: 4 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }
                                    }}
                                />
                            </Container>
                        </section>
                    </Tab>
                    {/* Team style 05 (Dark) End */}

                </Tabs>
            </section>

        </>
    )
}

export default TeamPage