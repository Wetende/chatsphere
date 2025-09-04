import React, { memo } from "react";

// Libraries
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { PropTypes } from "prop-types";

// Components
import Buttons from "../Button/Buttons";

// Data
import { InteractiveBannersData07 } from "./InteractiveBannersData";

const InteractiveBanners07 = (props) => {
  return (
    <Row
      className={`${props.grid}${props.className ? ` ${props.className}` : ""}`}
    >
      {props.data.map((item, i) => {
        return (
          <m.div
            key={i}
            className="col interactive-banners-style-07"
            {...{
              ...props.animation,
              transition: { delay: i * props.animationDelay },
            }}
          >
            <div className="interactive-banners-image">
              <img
                width={263}
                height={263}
                src={item.img}
                className="rounded-[6px]"
                alt="destinations"
              />
              <div className="interactive-banners-hover">
                <div className="d-table h-full w-full">
                  <div className="d-table-cell align-bottom py-[3.5rem] xs:py-[6.5rem]">
                    <Link
                      aria-label="link"
                      to="#"
                      className="rounded-full bg-neonorange interactive-banners-icon"
                    >
                      <i className="feather-arrow-right text-darkgray border-none"></i>
                    </Link>
                    <div className="font-medium font-serif text-white text-lg text-center interactive-banners-title">
                      {item.country}
                    </div>
                    <div className="font-medium leading-normal font-serif uppercase interactive-banners-sub-title text-md">
                      <Buttons
                        ariaLabel="interactive button"
                        href="#"
                        className="font-medium p-0 text-decoration-line-bottom font-serif uppercase btn-link md:mb-[15px] hover:text-white after:bg-[#fff]"
                        size="xl"
                        color="#fff"
                        title="Explore tours"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        );
      })}
    </Row>
  );
};

InteractiveBanners07.defaultProps = {
  data: InteractiveBannersData07,
  animationDelay: 0.2,
};

InteractiveBanners07.propTypes = {
  className: PropTypes.string,
  grid: PropTypes.string,
  animationDelay: PropTypes.number,
  animation: PropTypes.object,
  data: PropTypes.arrayOf(
    PropTypes.exact({
      country: PropTypes.string,
      btnLink: PropTypes.string,
      img: PropTypes.string,
      btnTitle: PropTypes.string,
      imgLink: PropTypes.string,
    })
  ),
};

export default memo(InteractiveBanners07);
