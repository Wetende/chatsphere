import React, { memo } from "react";

// Libraries
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PropTypes } from "prop-types";

// Component
import Buttons from '../Button/Buttons'

// Data
import { TextSliderData01 } from "./TextSliderData";

const TextSlider01 = (props) => {
  return (
    <div className={props.className}>
      <Swiper
        className="text-slider-01 h-[550px] black-move"
        modules={[Autoplay, Pagination, Navigation]}
        {...props.carousalOption}
      >
        {props.data.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="col-lg-12 h-full" style={{ backgroundImage: `url(${item.img})` }} >
                <div className="text-slider-swiper-wrapper w-[45%] bg-white py-20 px-[5.5rem] xl:w-[55%] xl:p-12 lg:w-[70%] md:w-[50%] md:p-20 sm:w-[60%] xs:w-[95%]">
                  <div className="mb-[20px]">
                    <span className="font-serif font-medium text-basecolor inline-block align-middle">
                      {i + 1 >= 10 ? "" : "0"}
                      {i + 1}
                    </span>
                    <span className="h-[1px] w-[30px] mx-[10px] bg-mediumgray inline-block align-middle"></span>
                    {item.subtitle && (
                      <span className="font-serif font-medium text-basecolor inline-block uppercase align-middle">
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                  {item.title && (
                    <h3 className="heading-6 font-serif font-medium text-darkslateblue self-center sm:mb-[15px]">
                      {item.title}
                    </h3>
                  )}
                  {item.content && (
                    <p className="mb-10 sm:mb-[35px]">{item.content}</p>
                  )}
                  {(item.buttonTitle || item.buttonLink) && (
                    <Buttons
                      ariaLabel="textslider button"
                      className="btn-fill btn-fancy rounded-none font-medium font-serif uppercase"
                      themeColor="#232323"
                      color="#fff"
                      size="sm"
                      title={item.buttonTitle}
                      to={item.buttonLink ? item.buttonLink : "#"}
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

TextSlider01.defaultProps = {
  data: TextSliderData01,
}

TextSlider01.propTypes = {
  className: PropTypes.string,
  carousalOption: PropTypes.object,
  data: PropTypes.arrayOf(
    PropTypes.exact({
      img: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      content: PropTypes.string,
      buttonTitle: PropTypes.string,
      buttonLink: PropTypes.string,
    })
  )
}
export default memo(TextSlider01);
