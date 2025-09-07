import React, { memo, useRef } from 'react'

// Libraries
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Link } from 'react-router-dom'
import { PropTypes } from "prop-types";
import { m } from "framer-motion";

// Components
import { fadeIn } from '../../Functions/GlobalAnimations';

// Data
import { portfolioSliderData } from './PortfolioData'

const PortfolioSlider = (props) => {
  const style = { "--overlay-color": typeof (props.overlay) === "object" ? `linear-gradient(to right top, ${props.overlay.map((item, i) => item)})` : props.overlay }

  const swiperRef = useRef(null)

  return (
    <>
      <Swiper
        className={`portfolio-swiper-slider${props.className ? ` ${props.className}` : ""}`}
        ref={swiperRef}
        modules={[Autoplay, Pagination, Keyboard, Navigation]}
        navigation={true}
        {...props.carousalOption}>
        {
          props.data.map((item, i) => {
            return (
              <SwiperSlide key={i} className="portfolio-slider">
                <m.div {...fadeIn}>
                  <div className="portfolio-image flex relative" style={style}>
                    <Link aria-label="link" to={item.link}>
                      <img src={item.img} height="" width="" alt="" />
                    </Link>
                    <div className="portfolio-hover absolute w-full h-full left-0 top-0 items-center justify-center flex">
                      <div className="portfolio-icon leading-[50px] inline-block text-center mx-[5px] align-middle">
                        <Link aria-label="link" className="bg-white w-[40px] h-[40px] inline-block align-middle leading-[40px] text-center mx-[3px] relative z-[3] border-white border-[2px] rounded-full" to={item.link}><i className="ti-arrow-right inline-block text-darkgray text-center"></i></Link>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-caption justify-center text-center py-[30px]">
                    <Link aria-label="link" className="text-darkgray font-serif font-medium uppercase" to={item.link}>{item.title}</Link>
                    <span className="block text-sm uppercase">{item.subtitle}</span>
                  </div>
                </m.div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  )
}

PortfolioSlider.defaultProps = {
  data: portfolioSliderData,
}

PortfolioSlider.propTypes = {
  className: PropTypes.string,
  grid: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.exact({
      subtitle: PropTypes.string,
      title: PropTypes.string,
      img: PropTypes.string,
      link: PropTypes.string,
    })
  )
}

export default memo(PortfolioSlider)