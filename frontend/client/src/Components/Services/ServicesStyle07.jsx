import React, { memo } from 'react'

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Keyboard, Navigation } from "swiper/modules";
import { Col, Row } from 'react-bootstrap';
import { PropTypes } from "prop-types";

// Components
import Buttons from '../Button/Buttons'

// Data
import { serviceData7 } from './ServicesData';

const ServicesStyle07 = (props) => {
    const swiperRef = React.useRef(null);
    return (
        <div className={`${props.className ? `${props.className}` : ""} relative`}>
            <div onClick={() => swiperRef.current.swiper.slidePrev()} className="btn-slider-next absolute top-1/2 left-[-85px] -translate-y-1/2  rounded-full flex justify-center items-center text-darkgray shadow-[0_0_15px_rgba(0,0,0,0.1)] bg-[#fff] right-inherit h-[40px] w-[40px] hover:bg-darkgray hover:text-[#fff] transition-default cursor-pointer xl:left-[-11px] xl:z-[2] xs:-left-[15px]" >
                <i className="feather-arrow-left text-xmd"></i>
            </div>
            <Swiper
                {...props.carouselOption}
                className="h-full black-move"
                ref={swiperRef}
                modules={[Pagination, Autoplay, Keyboard, Navigation]}
            >
                {
                    props.data.map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <Row className="m-0 h-full">
                                    <Col sm={6} className="col-12 bg-cover xs:h-[200px] bg-no-repeat overflow-hidden relative bg-center " style={{ backgroundImage: `url(${item.img})` }} ></Col>
                                    <Col sm={6} className="col-12 flex p-16 bg-white lg:p-10 xs:p-16" >
                                        <div className="self-center">
                                            <span className="font-serif font-medium uppercase text-[#262b35] mb-[10px] block"> {item.title} </span>
                                            <p className="mb-[25px] xs:mb-[15px]"> {item.content}</p>
                                            <Buttons ariaLabel="Join classes" to={item.btnLink} className="btn-fill btn-fancy font-medium font-serif rounded-none uppercase" themeColor="#262b35" color="#fff" size="xs" title={item.btnName} />
                                        </div>
                                    </Col>
                                </Row>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <div onClick={() => swiperRef.current.swiper.slideNext()} className="btn-slider-prev absolute top-1/2 right-[-85px] -translate-y-1/2 bg-[#fff] rounded-full flex justify-center items-center text-darkgray right-inherit h-[40px] w-[40px] hover:bg-darkgray hover:text-[#fff] transition-default shadow-[0_0_15px_rgba(0,0,0,0.1)] ml-[10px] cursor-pointer xl:right-[-11px] xl:z-[2] xs:-right-[15px]" >
                <i className="feather-arrow-right text-xmd"></i>
            </div>
        </div>
    )
}

ServicesStyle07.defaultProps = {
    data: serviceData7
}

ServicesStyle07.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.exact({
            img: PropTypes.string,
            content: PropTypes.string,
            title: PropTypes.string,
            btnLink: PropTypes.string,
            btnName: PropTypes.string,
        })
    ),
}

export default memo(ServicesStyle07)