import React, { memo } from 'react'

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination, Keyboard } from "swiper/modules";
import { Row } from 'react-bootstrap';
import { PropTypes } from "prop-types";

// Data
import { TestimonialsCarouselData4 } from './TestimonialsCarouselData';

const TestimonialsCarousel04 = (props) => {
  const swiperRef = React.useRef(null)
  return (
    <div className={`relative ${props.className}`}>
      <Swiper
        ref={swiperRef}
        {...props.carouselOption}
        effect={"coverflow"}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 100,
          depth: 150,
          modifier: 1.5,
          slideShadows: true
        }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        modules={[EffectCoverflow, Pagination, Autoplay, Keyboard]}
        className="py-32 testimonial-carousel-style-04">
        <Row>
          {
            props.data.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className="bg-white justify-center relative px-20 pb-[4.5rem] pt-32 md:px-[3rem]">
                    {item.img && <img width="" height="" className="mx-auto w-[150px] border-white border-8 rounded-full absolute top-0 left-1/2 shadow-[0_0_60px_rgba(0,0,0,17%)] -translate-x-1/2 -translate-y-1/2 xs:w-[100px] xs:shadow-[0_0_20px_rgba(0,0,0,0.08)]" alt="" src={item.img} />}
                    <div>
                      {item.title && <span className="mb-[10px] font-medium text-black text-xmd text-center block">{item.title}</span>}
                      {item.content && <p className="text-center">{item.content}</p>}
                    </div>
                    {(item.firstname || item.lastname) && <div className="testimonials-author text-center text-md uppercase font-medium">{item.firstname} {item.lastname}</div>}
                    {item.designation && <div className="text-center leading-[20px] text-[14px]">{item.designation}</div>}
                  </div>
                </SwiperSlide>
              )
            })
          }
        </Row>
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
    </div>
  )
}

TestimonialsCarousel04.defaultProps = {
  data: TestimonialsCarouselData4
}

TestimonialsCarousel04.propTypes = {
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

export default memo(TestimonialsCarousel04)
