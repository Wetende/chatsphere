import React, { memo } from "react";

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { PropTypes } from "prop-types";

// Data
import { TestimonialsCarouselData1 } from "./TestimonialsCarouselData";

const TestimonialsCarousel01 = (props) => {
  const swiperRef = React.useRef(null)
  return (
    <div className={`relative ${props.className}`}>
      <Swiper
        {...props.carouselOption}
        ref={swiperRef}
        modules={[Pagination, Autoplay]}
        className="testimonial-carousel-style-01">
        {props.data.map((item, i) => {
          return (
            <SwiperSlide key={i} className="text-center">
              {item.img && <img width={131} height={131} className="mx-auto mb-[3.5rem] rounded-full overflow-hidden" src={item.img} alt="" />}
              {item.content && <span className="w-[95%] leading-[40px] font-serif font-light text-xlg mb-[49px] inline-block tracking-[-.5px] text-center lg:text-lg md:leading-[26px] md:w-[70%] lg:mb-[3.5rem] xs:w-[95%]"> {item.content} </span>}
              {(item.firstname || item.lastname) && <h3 className="heading-6 text-center font-serif text-[25px] leading-[35px] font-light m-0 xs:text-[19.8px]">
                <span className="font-semibold">{item.firstname}</span>{" "} {item.lastname} </h3>}
              {item.designation && <span className="text-center uppercase block mb-[3.5rem] font-serif"> {item.designation} </span>}
            </SwiperSlide>
          );
        })}
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
  );
};

TestimonialsCarousel01.defaultProps = {
  data: TestimonialsCarouselData1
}

TestimonialsCarousel01.propTypes = {
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

export default memo(TestimonialsCarousel01);
