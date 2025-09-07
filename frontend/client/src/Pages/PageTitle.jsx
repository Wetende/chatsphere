import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { m } from "framer-motion";

// Components
import Buttons from '../Components/Button/Buttons'
import FooterStyle01 from '../Components/Footers/FooterStyle01';
import IconWithText from '../Components/IconWithText/IconWithText'
import Testimonials from '../Components/Testimonials/Testimonials';
import { fadeIn, zoomIn } from '../Functions/GlobalAnimations';
import CustomModal from '../Components/CustomModal'

// Data
import { TestimonialsData03 } from '../Components/Testimonials/TestimonialsData';

const IconWithTextData = [
    {
        icon: "line-icon-Money-Bag text-[#b7b7b7] text-[40px]",
        title: "Effective strategy",
        content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
    },
    {
        icon: "line-icon-Gear-2 text-[#b7b7b7] text-[40px]",
        title: "Powerfull customize",
        content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
    },
    {
        icon: "line-icon-Talk-Man text-[#b7b7b7] text-[40px]",
        title: "Customer satisfaction",
        content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
    },
    {
        icon: "line-icon-Cursor-Click2 text-[#b7b7b7] text-[40px]",
        title: "No coding required",
        content:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempor.",
    },
];

const PageTitle = () => {

    return (
        <div>
            <Outlet />
            {/* Section Start */}
            <section id="about" className="py-[160px] overflow-hidden lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
                <Container>
                    <Row className="justify-center">
                        <m.div className="flex flex-col md:mb-24 col-xl-3 col-lg-4 col-sm-7" {...fadeIn}>
                            <div className="mb-[20px] md:text-center sm:mb-[10px]">
                                <span className="font-serif text-md uppercase font-medium text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]">About company</span>
                            </div>
                            <h5 className="font-serif text-darkgray font-semibold mb-[20px] md:text-center md:mb-[30px] xs:w-[90%] xs:mx-auto">We combine design, thinking and technical</h5>
                            <div className="mt-auto mx-auto mx-lg-0">
                                <Buttons ariaLabel="home link" href="/" className="btn-fill font-medium font-serif uppercase rounded-none md:mb-[15px] xs:mb-0" themeColor="#232323" color="#fff" size="md" title="Discover litho" />
                            </div>
                        </m.div>
                        <m.div className="col-xl-7 col-lg-8 offset-xl-2" {...{ ...fadeIn, transition: { delay: 0.6 } }} >
                            <IconWithText grid="row-cols-1 row-cols-lg-2 row-cols-sm-2 gap-y-10" theme="icon-with-text-01" data={IconWithTextData} animation={fadeIn} animationDuration={0.4} animationDelay={0.2} />
                        </m.div>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Info Banner Style 02 */}
            <m.section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] relative bg-cover bg-center"
                style={{ backgroundImage: `url("https://via.placeholder.com/1920x1100")`, }} >
                <div className="absolute top-0 left-0 w-full h-full opacity-60 bg-darkslateblue"></div>
                <Container className="relative">
                    <Row className="justify-center text-center">
                        <Col xl={7} lg={8} md={10}>
                            <div className="font-serif text-white">
                                {/* Modal Component Start */}
                                <CustomModal.Wrapper
                                    modalBtn={
                                        <m.div {...zoomIn}>
                                            <Buttons type="submit" className="btn-sonar border-0 mx-auto mb-14" themeColor="#3452ff" y color="#fff" size="lg" title={<i className="icon-control-play" />} />
                                        </m.div>} >
                                    <div className="w-[1020px] max-w-full relative rounded mx-auto">
                                        <div className="fit-video">
                                            <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                                        </div>
                                    </div>
                                </CustomModal.Wrapper>
                                {/* Modal Component End */}
                                <m.h4 {...fadeIn} className="font-semibold mb-[45px]" >
                                    Beautifully simple handcrafted templates for your website
                                </m.h4>
                                <m.span {...fadeIn} className="uppercase tracking-[1px]">
                                    unlimited power and customization
                                </m.span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </m.section>
            {/* Info Banner Style 02 End */}

            {/* Section Start */}
            <section className="bg-[#f7f8fc] py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
                <Container>
                    <Row className="justify-center">
                        <Col xl={5} lg={6} sm={8} className="text-center mb-20">
                            <span className="text-center font-serif text-md inline-block font-medium text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] uppercase mb-[20px] sm:mb-[15px]"> What people are saying </span>
                            <h5 className="font-serif text-[2.3rem] justify-center text-center text-darkgray font-semibold -tracking-[1px]"> What our valuable customer are saying about us? </h5>
                        </Col>
                    </Row>
                    <Row className="justify-center">
                        <Col className="col-12 col-md-12 col-sm-8">
                            <Testimonials animationDelay={0.2} grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-10 justify-center" theme="testimonials-style-03" data={TestimonialsData03} animation={fadeIn} />
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            {/* Footer Start */}
            <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
            {/* Footer End   */}

        </div>
    )
}

export default PageTitle
