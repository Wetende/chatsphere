import React, { useState, useRef, memo } from 'react'

// Libraries
import { Autoplay, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import { PropTypes } from "prop-types";

// Data
import { TestimonialsCarouselData6 } from './TestimonialsCarouselData';

const TestimonialsCarousel06 = (props) => {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = useRef(null)
  const swiperThumbRef = useRef(null)

  // Change the slide on thumbnail click
  const handleSlideClick = () => {
    const target = swiperThumbRef.current.swiper
    if (target.activeIndex > target.clickedIndex) {
      target.slidePrev();
    } else if (target.activeIndex < target.clickedIndex) {
      target.slideNext()
    }
  }

  const slideprev = () => {
    if (swiperRef.current.swiper.activeIndex === 0) {
      swiperRef.current.swiper.slideTo(swiperRef.current.swiper.slides.length - 1)
    } else {
      swiperRef.current.swiper.slideTo(swiperRef.current.swiper.activeIndex - 1)
    }

    swiperThumbRef.current.swiper.slidePrev()
  }

  const slidenext = () => {
    let total_length = swiperRef.current.swiper.slides.length;

    if (swiperRef.current.swiper.params.loop === true) {
      total_length = swiperRef.current.swiper.slides.length - swiperRef.current.swiper.loopedSlides * 2
    }

    if (swiperRef.current.swiper.activeIndex === total_length - 1) {
      swiperRef.current.swiper.slideTo(1)
    } else {
      swiperRef.current.swiper.slideTo(swiperRef.current.swiper.activeIndex + 1)
    }

    swiperThumbRef.current.swiper.slideNext()
  }

  return (
    <div className={props.className}>
      <Swiper
        {...props.carouselOption}
        ref={swiperThumbRef}
        onSwiper={setThumbsSwiper}
        loop={true}
        centeredSlides={true}
        allowTouchMove={false}
        spaceBetween={0}
        slidesPerView={3}
        watchSlidesProgress={true}
        modules={[Thumbs, Autoplay]}
        className="slider-review-image-thumbs px-16"
        onClick={handleSlideClick}>
        {
          TestimonialsCarouselData6.map((item, i) => {
            return (
              <SwiperSlide className="p-[10px]" key={i}>
                {item.img && <img width="" height="" className="rounded-full mx-auto" alt="" src={item.img} />}
              </SwiperSlide>
            )
          })
        }
      </Swiper>
      <Swiper
        {...props.carouselOption}
        ref={swiperRef}
        spaceBetween={0}
        allowTouchMove={false}
        loop={true}
        modules={[Thumbs, Autoplay]}
        thumbs={{ swiper: (thumbsSwiper && !thumbsSwiper.destroyed) ? thumbsSwiper : null }}
        className="mt-[7%]">
        {
          props.data.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                {item.content && <p className="mb-10 font-light text-xlg leading-[36px] md:leading-[34px] md:text-[18px]" >{item.content}</p>}
                {(item.firstname || item.lastname) && <span className="font-serif uppercase block font-medium text-xmd text-gradient bg-gradient-to-r from-[#0039e3] via-[#741bd9] to-[#8600d4]" >{item.firstname} {item.lastname}</span>}
                {item.designation && <span className="font-serif uppercase block tracking-[1px] text-md" >{item.designation}</span>}
              </SwiperSlide>
            )
          })
        }
      </Swiper>
      <button aria-label='swiper btn' onClick={slideprev} className="swiper-prev text-[50px]"><i className="line-icon-Arrow-OutLeft text-extra-light-gray text-[#b7b7b7]"></i></button>
      <button aria-label='swiper btn' onClick={slidenext} className="swiper-next text-[50px]"><i className="line-icon-Arrow-OutRight text-extra-light-gray text-[#b7b7b7]"></i></button>
    </div>
  )
}

TestimonialsCarousel06.defaultProps = {
  data: TestimonialsCarouselData6
}

TestimonialsCarousel06.propTypes = {
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

export default memo(TestimonialsCarousel06)
