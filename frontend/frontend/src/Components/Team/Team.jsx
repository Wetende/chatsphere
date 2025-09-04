import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { m } from "framer-motion"

// Components
import TeamStyle01 from './TeamStyle01';
import TeamStyle02 from './TeamStyle02';
import TeamStyle03 from './TeamStyle03';
import TeamStyle04 from './TeamStyle04';
import TeamStyle05 from './TeamStyle05';

// Data
import { TeamData01 } from './TeamData'
import { PropTypes } from 'prop-types';

// css
import "../../Assets/scss/components/_team.scss"

const TeamSwitch = (params, item, i) => {
    switch (params.theme) {
        case "team-style-01":
            return <TeamStyle01 item={item} />
        case "team-style-02":
            return <TeamStyle02 item={item} />
        case "team-style-03":
            return <TeamStyle03 item={item} />
        case "team-style-04":
            return <TeamStyle04 item={item} />
        case "team-style-05":
            return <TeamStyle05 item={item} />
        default:
            return <TeamStyle01 item={item} />
    }
}

const Team = (props) => {
    const swiperRef = React.useRef(null)
    const style = {
        "--brand-color": typeof (props.overlay) === "object" ? `linear-gradient(to right top, ${props.overlay.map(item => item)})` : props.overlay,
    }

    return (
        props.carousel === true ? (
            <m.div className={`team-slider-wrapper relative ${props.theme} ${props.themeColor} ${props.className}`} {...props.animation} >
                <Swiper
                    slidesPerView={3}
                    className="swiper-pagination-dark pb-[50px] black-move"
                    ref={swiperRef}
                    modules={[Navigation, Pagination, Autoplay]}
                    {...props.carouselOption}>
                    {
                        props.data.map((item, i) => {
                            return (
                                <SwiperSlide style={style} key={i} className={props.theme}>
                                    {TeamSwitch(props, item, i)}
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                {
                    props.carouselOption.navigation && (
                        <div className="flex">
                            <div onClick={() => swiperRef.current.swiper.slidePrev()} className="btn-slider-next rounded-full flex justify-center items-center text-darkgray bg-white border-[1px] border-solid border-mediumgray h-[40px] w-[40px] cursor-pointer hover:shadow-xl transition-all duration-800 absolute top-[38%] left-[-90px] right-auto">
                                <i className="feather-arrow-left text-xmd"></i>
                            </div>
                            <div onClick={() => swiperRef.current.swiper.slideNext()} className="btn-slider-prev rounded-full border-[1px] border-solid border-mediumgray bg-white text-darkgray flex justify-center items-center h-[40px] w-[40px] ml-[10px] cursor-pointer hover:shadow-xl transition-all duration-800 absolute top-[38%] right-[-90px] left-auto">
                                <i className="feather-arrow-right text-xmd"></i>
                            </div>
                        </div>
                    )
                }
            </m.div>
        ) : (
            <Row className={`${props.grid ? props.grid : ""}${props.className ? ` ${props.className}` : ""}`}>
                {props.data.map((item, i) => {
                    return (
                        <m.div style={style} key={i} className={`col ${props.theme} ${props.themeColor}`} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }} >
                            {TeamSwitch(props, item, i)}
                        </m.div>
                    )
                })}
            </Row>
        )
    )
}

Team.defaultProps = {
    theme: "team-style-01",
    data: TeamData01,
    overlay: ["#556fffcc", "#b263e4cc", "#e05fc4cc", "#f767a6cc", "#ff798ecc"],
    animationDelay: 0.5,
    carouselOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { dynamicBullets: true, clickable: true },
        breakpoints: { 1200: { slidesPerView: 4 }, 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }
    }
}

Team.propTypes = {
    theme: PropTypes.string,
    themeColor: PropTypes.string,
    className: PropTypes.string,
    overlay: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.string
    ]),
    data: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            img: PropTypes.string,
            name: PropTypes.string,
            designation: PropTypes.string,
            social_links: PropTypes.arrayOf(
                PropTypes.exact({
                    title: PropTypes.string,
                    link: PropTypes.string,
                    icon: PropTypes.string,
                })
            )
        })
    ),
    carouselOption: PropTypes.object,
    animation: PropTypes.object,
    animationDelay: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ]),
}

export default memo(Team)