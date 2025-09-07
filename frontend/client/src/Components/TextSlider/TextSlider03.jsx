import React, { memo } from 'react'

// Libraries
import { Col } from 'react-bootstrap'
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { m } from "framer-motion"
import { PropTypes } from "prop-types";

// Data
import { TextSliderData03 } from "./TextSliderData";

const TextSlider03 = (props) => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={30}
      modules={[Autoplay, Pagination, Navigation]}
      className={`px-[20%] sm:px-0 black-move text-slider-03${props.className ? ` ${props.className}` : ""}`}
      {...props.carousalOption}>
      {
        props.data.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <m.div className="row m-0 shadow-[0_0_30px_rgba(0,0,0,0.08)]" {...props.animation}>
                <Col sm={6} className="flex bg-no-repeat bg-cover bg-center xs:h-[200px]" style={{ backgroundImage: `url(${item.img})` }}></Col>
                <Col sm={6} className="py-16 px-12 bg-white xl:px-4 lg:px-[39px] lg:py-[52px]">
                  <div className="justify-center">
                    {item.icon && <div className="h-[100px] w-[100px] mb-[30px] bg-[#f8f4f0] rounded-full mx-auto justify-center items-center flex"> <i className={`${item.icon} block text-[40px] text-[#ca943d] items-center`}></i> </div>}
                    {item.title && <span className="uppercase font-serif block mb-[5px] font-semibold text-black text-center">{item.title}</span>}
                    {item.content && <p className="text-center">{item.content}</p>}
                  </div>
                </Col>
              </m.div>
            </SwiperSlide>
          )
        })
      }
    </Swiper>
  )
}

TextSlider03.defaultProps = {
  data: TextSliderData03,
}

TextSlider03.propTypes = {
  className: PropTypes.string,
  carousalOption: PropTypes.object,
  data: PropTypes.arrayOf(
    PropTypes.exact({
      icon: PropTypes.string,
      img: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      content: PropTypes.string,
      btnTitle: PropTypes.string,
      btnLink: PropTypes.string,
    })
  )
}

export default memo(TextSlider03)