import React from "react";

// Libraries
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Pagination } from "swiper/modules";

//Component
import LeftMenuModern from "../../Components/Header/LeftMenuModern";
import InteractiveBanners06 from "../../Components/InteractiveBanners/InteractiveBanners06";
import FooterStyle01 from "../../Components/Footers/FooterStyle01";
import { fadeIn } from "../../Functions/GlobalAnimations";
import SideButtons from "../../Components/SideButtons";

// Data
import { InteractiveBannersData06 } from "../../Components/InteractiveBanners/InteractiveBannersData";

const sliderData = [
    {
        img: "https://via.placeholder.com/1920x1160",
        title: "Black",
        subtitle: "shade",
        link: "/portfolio/single-project-page-01"
    },
    {
        img: "https://via.placeholder.com/1920x1160",
        title: "Browne",
        subtitle: "coffee",
        link: "/portfolio/single-project-page-02"
    },
    {
        img: "https://via.placeholder.com/1920x1160",
        title: "Nature",
        subtitle: "travel",
        link: "/portfolio/single-project-page-03"
    }
]

const LeftMenuModernPage = (props) => {
    return (
        <div style={props.style}>
            <LeftMenuModern />
            <SideButtons />
            <div className="pl-[65px] md:pl-0">
                {/* Section Start */}
                <section className="p-0 overflow-hidden">
                    <Swiper
                        autoplay={{ delay: 4500, disableOnInteraction: false }}
                        keyboard={{ enabled: true, onlyInViewport: true }}
                        modules={[Autoplay, Pagination, Keyboard]}
                        loop={false}
                        iOSEdgeSwipeThreshold={200}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        direction="horizontal"
                        breakpoints={{
                            992: {
                                direction: "vertical"
                            }
                        }}
                        className="full-screen swiper-pagination-01 swiper-pagination-light swiper-pagination-medium vertical-white-move landscape:md:h-[600px]">
                        {sliderData && sliderData.map((item, i) => {
                            return (
                                <SwiperSlide key={i} className="bg-no-repeat bg-cover relative overflow-hidden bg-center" style={{ backgroundImage: `url(${item.img})` }} >
                                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,rgba(16,16,16,0),#101010)]"></div>
                                    <Container className="h-full landscape:md:h-[600px]">
                                        <Row className="block justify-center h-full">
                                            <Col md={7} sm={6} xs={10} className="relative flex flex-column justify-center text-start py-[7rem] h-full" >
                                                <h1 className='font-serif font-light text-[130px] lg:text-[110px] md:text-[90px] sm:text-[50px] text-white leading-[120px] lg:leading-[100px] md:leading-[85px] sm:leading-[50px] tracking-[-6px] sm:tracking-[-0.5px]'>
                                                    <span className='font-semibold block'>{item.title}</span>{item.subtitle}
                                                </h1>
                                                <Link aria-label="link for" to={item.link} className="left-[15px] bottom-[100px] z-[100] absolute text-left" >
                                                    <span className="flex items-center text-center hover:text-[#828282]">
                                                        <span className="w-[50px] h-[50px] text-lg relative flex justify-center items-center rounded-[50%] mr-[25px] border-[2px] border-[#ffffff1a]">
                                                            <i className="fas fa-arrow-right flex items-center justify-center text-xmd leading-normal ml-0 text-white"></i>
                                                        </span>
                                                        <span className="font-medium text-xmd font-serif uppercase inline-block align-middle text-white">
                                                            Watch projects
                                                        </span>
                                                    </span>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Container>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </section>
                {/* Section End */}

                {/* Intrectivebanners Start */}
                <section className="bg-[#000] px-[10rem] py-[9%] xl:px-0">
                    <Container fluid>
                        <Row className="justify-center">
                            <Col lg={11} md={12} sm={8} xs={12}>
                                <InteractiveBanners06 grid="row-cols-lg-3 gap-y-10 justify-center" data={InteractiveBannersData06} animation={fadeIn} />
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Intrectivebanners End */}

                {/* footer Start*/}
                <FooterStyle01 theme="dark" className="text-[#828282] bg-black" />
                {/* footer End */}
            </div>
        </div>
    );
};

export default LeftMenuModernPage;
