import React, { memo } from "react";

// Libraries
import { Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { m } from "framer-motion";
import { PropTypes } from "prop-types";
import { Autoplay, Pagination } from "swiper/modules";

// Components
import { fadeIn, fadeInLeft } from "../../Functions/GlobalAnimations";

// Data
import { TestimonialsCarouselData2 } from "./TestimonialsCarouselData";

const TestimonialsCarousel02 = (props) => {
    const swiperRef = React.useRef(null)

    return (
        <>
            <Col lg={5} md={4} className="sm:pb-20">
                <m.div className={`testimonial-carousel-style-02${props.className ? ` ${props.className}` : ""}`}  {...fadeIn}>
                    <h1 className="font-serif inline-block font-semibold tracking-[-2px] mb-20 whitespace-pre sm:flex sm:flex-col xs:flex-row">
                        <span> {props.title}</span>&nbsp;{props.subtitle}
                    </h1>
                    {
                        props.carouselOption.navigation && (
                            <div className="flex">
                                <div onClick={() => swiperRef.current.swiper.slidePrev()} className="btn-slider-next rounded-full flex justify-center items-center transition-default text-black bg-white right-inherit left-[65px] h-[40px] w-[40px] cursor-pointer" >
                                    <i className="feather-arrow-left text-xmd"></i>
                                </div>
                                <div onClick={() => swiperRef.current.swiper.slideNext()} className="btn-slider-prev rounded-full flex justify-center items-center transition-default right-inherit h-[40px] w-[40px] ml-[10px] cursor-pointer" >
                                    <i className="feather-arrow-right text-xmd"></i>
                                </div>
                            </div>
                        )
                    }
                </m.div>
            </Col>
            <m.div className="col-12 offset-lg-0 col-lg-6 col-xl-5 col-md-8 relative" {...fadeInLeft}>
                <Swiper
                    {...props.carouselOption}
                    ref={swiperRef}
                    className={`testimonial-carousel-style-02${props.className ? ` ${props.className}` : ""}`}
                    modules={[Pagination, Autoplay]}
                >
                    {props.data.map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div>
                                    {item.content && <span className="font-serif block mb-12 -tracking-[.5px] text-lg leading-[38px] md:text-xmd md:leading-[32px]"> {item.content} </span>}
                                    <div className="flex items-center">
                                        {item.img && <img width="" height="" className="h-[85px] w-[85px] rounded-full mr-[25px]" src={item.img} alt="" />}
                                        <div className="feature-box-content">
                                            {(item.firstname || item.lastname) && <div className="text-darkgray text-lg font-serif leading-[20px] text-gradient bg-gradient-to-r from-[#5cc088] to-[#dda556] uppercase inline-block xs:text-xmd"><span className="font-semibold">{item.firstname}</span> {item.lastname}</div>}
                                            {item.designation && <span className="font-serif text-md block uppercase mt-[5px]"> {item.designation}</span>}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </m.div>
        </>
    );
};

TestimonialsCarousel02.defaultProps = {
    data: TestimonialsCarouselData2
}

TestimonialsCarousel02.propTypes = {
    grid: PropTypes.string,
    theme: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            img: PropTypes.string,
            designation: PropTypes.string,
            content: PropTypes.string,
            firstname: PropTypes.string,
            lastname: PropTypes.string,
            title: PropTypes.string,
            thumbimg: PropTypes.string,
        })
    ),
}

export default memo(TestimonialsCarousel02);
