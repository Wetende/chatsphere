import React, { memo, useRef } from 'react'

// data
import { TestimonialsData01 } from './TestimonialsData';

// Library
import { m } from 'framer-motion';
import { PropTypes } from "prop-types";
import { Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";

// css
import "../../Assets/scss/components/_testimonials.scss"

const renderSwitch = (props, item, i) => {
    switch (props.theme) {
        case "testimonials-style-01":
            return (
                <div className={`${props.theme} bg-lightgray relative`}>
                    <i className="ti-quote-left absolute -top-[25px] left-[50px] inline-block text-[50px] z-10"></i>
                    <p className="text-xmd w-[75%] mb-0 lg:w-[85%] md:w-[80%]">{item.content}</p>
                    <div className="author border-t border-mediumgray flex items-center mt-10 pt-10">
                        {item.img && <img width="" height="" className="rounded-circle w-[60px] h-[60px] mr-[19px]" alt="" src={item.img} />}
                        <div className="inline-block align-middle">
                            {item.name && <span className="font-serif text-md font-medium leading-[20px] text-darkgray block uppercase">{item.name}</span>}
                            {item.designation && <span className="block text-sm uppercase">{item.designation}</span>}
                        </div>
                    </div>
                </div>
            );
        case "testimonials-style-02":
            return (
                <div className={`${props.theme} `}>
                    {item.img && <img width="" height="" className="w-full h-auto" src={item.img} alt="" />}
                    <div className="bg-white p-[49px] text-center relative">
                        <div className="testimonials-rounded-icon absolute -top-[40px] left-1/2 text-[28px] h-[75px] w-[75px] leading-[71px] overflow-hidden bg-white rounded-full flex items-center justify-center">
                            <i className="fa fa-quote-left"></i>
                        </div>
                        {item.content && <p className="mb-7">{item.content}</p>}
                        {item.name && <span className="font-serif font-medium text-center text-darkgray block">{item.name}</span>}
                        {item.designation && <span className="block font-serif text-sm font-medium">{item.designation}</span>}
                    </div>
                </div>
            );
        case "testimonials-style-03":
            return (
                <div className={`${props.theme}`}>
                    <div className="testimonials-bubble py-8 px-12 lg:px-8 relative bg-white mb-[35px] rounded">
                        {item.content && <p className="mb-0">{item.content}</p>}
                    </div>
                    <div className="px-[20px] flex items-center">
                        {item.img && <img width="" height="" className="rounded-circle w-[60px] h-[60px] mr-[19px]" src={item.img} alt="" />}
                        <div className="inline-block align-middle">
                            {item.name && <span className="font-serif text-md font-medium leading-[24px] text-darkgray block">{item.name}</span>}
                            {item.designation && <span className="block text-sm">{item.designation}</span>}
                        </div>
                    </div>
                </div>
            )
        case "testimonials-style-04":
            return (
                <div className={`${props.theme}`}>
                    <div className="testimonials-bubble relative rounded-[5px] py-[30px] px-[40px] bg-white mb-[35px]">
                        {item.content && <p className="mb-0">{item.content}</p>}
                    </div>
                    <div className="items-center px-[20px] flex">
                        {item.img && <img width="" height="" className="rounded-circle w-[60px] h-[60px] mr-[15px]" src={item.img} alt="" />}
                        <div className="items-center">
                            {item.name && <span className="font-serif text-md leading-[16px] font-medium text-darkgray block">{item.name}</span>}
                            {item.rating && <div className="star-rating">
                                <span style={{ width: (`${item.rating}` * 20) + '%' }} ></span>
                            </div>}
                        </div>
                    </div>
                </div>
            )
        case "testimonials-style-05":
            return (
                <div className={`${props.theme} bg-white py-[3rem] px-[3.5rem] rounded-lg lg:p-10`} >
                    <div className="items-center flex flex-wrap">
                        {item && <img width="" height="" className="rounded-circle w-[60px] h-[60px] mr-[20px]" alt="" src={item.img} />}
                        <div>
                            {item.rating && <div className="star-rating">
                                <span style={{ width: (`${item.rating}` * 20) + '%' }} ></span>
                            </div>}
                            {item.name && <span className="font-serif text-md leading-5 font-medium text-gray-900 block">{item.name}</span>}
                            {item.company && <span className="text-sm">{item.company}</span>}
                        </div>
                        <div className="testimonials-bubble relative bg-white mt-[25px]">
                            {item.content && <p className="mb-0">{item.content}</p>}
                        </div>
                    </div>
                </div>
            )
        default:
            return (
                <div className={`${props.theme} bg-lightgray relative`}>
                    <i className="ti-quote-left"></i>
                    <p className="text-xmd w-75 mb-0">{item.content}</p>
                    <div className="author border-t border-mediumgray flex items-center mt-10 pt-10">
                        {item.img && <img width="" height="" className="rounded-circle w-[60px] h-[60px] mr-[16px]" alt="" src={item.img} />}
                        <div>
                            {item.name && <span className="font-serif text-md font-medium text-darkgray block">{item.name}</span>}
                            {item.designation && <span className="text-sm">{item.designation}</span>}
                        </div>
                    </div>
                </div>
            );
    }
}

const Testimonials = (props) => {
    const swiperRef = useRef(null)

    return (
        props.carousel === true ? (
            <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, Autoplay, Keyboard]}
                className={`testimonials-swiper${props.className ? ` ${props.className}` : ""}`}
                {...props.carouselOption}
            >
                {
                    props.data.map((item, i) => {
                        return (
                            <SwiperSlide key={i} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}> {renderSwitch(props, item, i)}</SwiperSlide>
                        )
                    })
                }
            </Swiper>
        ) : (
            <Row className={props.grid}>
                {
                    props.data.map((item, i) => {
                        return (
                            <m.div className={`col flex justify-center${props.className ? ` ${props.className}` : ""}`} key={i} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}> {renderSwitch(props, item, i)}</m.div>
                        )
                    })
                }
            </Row>
        )
    );
};

Testimonials.defaultProps = {
    data: TestimonialsData01,
    animationDelay: 0.5,
    theme: "testimonials-style-01",
    carouselOption: {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 20,
        autoplay: { delay: 3000, disableOnInteraction: false },
        navigation: true,
        breakpoints: { 1200: { slidesPerView: 4 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 3 } }
    }
}

Testimonials.propTypes = {
    className: PropTypes.string,
    theme: PropTypes.string,
    grid: PropTypes.string,
    animation: PropTypes.object,
    animationDelay: PropTypes.number,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            content: PropTypes.string,
            img: PropTypes.string,
            name: PropTypes.string,
            designation: PropTypes.string,
            rating: PropTypes.number,
            company: PropTypes.string
        })
    ),
}


export default memo(Testimonials)
