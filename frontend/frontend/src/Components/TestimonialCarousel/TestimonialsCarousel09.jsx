import React, { memo, useRef } from 'react'

// Libraries
import { Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { PropTypes } from "prop-types";

// Data
import { TestimonialsCarouselData9 } from './TestimonialsCarouselData';

const TestimonialsCarousel09 = (props) => {
  const swiperRef = useRef(null);

  const paginations = TestimonialsCarouselData9.map((item) => item.thumbimg)

  const customPagination = (index, className) => {
    return `<span class="${className}" style="background-image: url(${paginations[index]})"></span>`
  }

  return (
    <div className={props.className}>
      <Swiper
        {...props.carouselOption}
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true, renderBullet: customPagination }}
        className="testimonial-carousel-style-09 pb-40 xs:pb-28"
      >
        <Col xl={6} lg={7} md={8}>
          {
            props.data.map((item, i) => {
              return (
                <SwiperSlide key={i} className="text-center">
                  <i className="fa fa-quote-left text-basecolor text-[30px] mb-[30px]"></i>
                  {item.title && <span className="font-serif mb-[20px] font-medium text-xlg block text-basecolor">{item.title}</span>}
                  {item.content && <p className="mb-[20px] mx-auto w-[85%] leading-[32px] text-xmd xs:leading-[22px] xs:w-full">{item.content}</p>}
                  <span className="uppercase block font-serif font-medium tracking-[1px] text-basecolor">{item.firstname} {item.lastname}</span>
                </SwiperSlide>
              )
            })
          }
        </Col>
      </Swiper>
      {
        props.carouselOption.navigation && (
          <>
            <button onClick={() => swiperRef.current.swiper.slidePrev()} className='swiper-button-next-nav absolute bottom-[20px] left-[15px] leading-none z-10 xs:bottom-0 xs:left-[15px]'><i className="line-icon-Arrow-OutLeft text-[40px] leading-none text-[#b7b7b7]"></i></button>
            <button onClick={() => swiperRef.current.swiper.slideNext()} className='swiper-button-next-nav absolute bottom-[20px] right-[15px] leading-none z-10 xs:bottom-0 xs:right-[15px]'><i className="line-icon-Arrow-OutRight text-[40px] leading-none text-[#b7b7b7]"></i></button>
          </>
        )
      }
    </div>
  )
}

TestimonialsCarousel09.defaultProps = {
  data: TestimonialsCarouselData9
}

TestimonialsCarousel09.propTypes = {
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

export default memo(TestimonialsCarousel09)