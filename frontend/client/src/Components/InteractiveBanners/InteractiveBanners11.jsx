import React, { memo } from 'react'

// Libraries
import { Row } from "react-bootstrap"
import { m } from "framer-motion"

// Components
import { fadeIn } from "../../Functions/GlobalAnimations"

const InteractiveBanners11 = () => {
  return (
    <>
      <Row className="row-cols-1 row-cols-lg-3 row-cols-md-2 gap-y-10 justify-center" {...{...fadeIn,transition:{delay:.3}}}>
        <m.div className="col text-center interactive-banners-style-11">
          <figure className="rounded-[6px] overflow-hidden relative">
            <img width="" height="" src="https://via.placeholder.com/720x515" alt="" />
            <figcaption>
              <div className="opacity-70 top-0 left-0 absolute w-full h-full bg-darkgray"></div>
              <div className="flex flex-col items-center justify-center h-full">
                <a aria-label="link" href="/elements/interactive-banners" rel="noreferrer" className="bg-[#ca943d] z-[1] p-6 text-xmd leading-[20px] rounded-full w-[110px] h-[110px] uppercase font-serif text-white flex flex-col justify-center">Only<span className="font-semibold text-darkgray -tracking-[1px]">$30.00</span></a>
              </div>
            </figcaption>
          </figure>
          <div className="text-center mt-[40px] sm:mt-[20px]">
            <span className="text-darkgray font-medium font-serif block text-golden-hover uppercase">PERFECT KENTUCKY</span>
            <span className="text-spanishgray uppercase inline-block text-sm">TOMATOES <span className="text-xxs inline-block mx-[10px]">◍</span> PARMESAN <span className="text-xxs leading-none inline-block align-middle mx-[10px]">◍</span> Basil</span>
          </div>
        </m.div>
        <m.div className="col text-center interactive-banners-style-11" {...{...fadeIn,transition:{delay:.6}}}>
          <figure className="rounded-[6px] overflow-hidden relative">
            <img width="" height="" src="https://via.placeholder.com/720x515" alt="" />
            <figcaption>
              <div className="opacity-70 top-0 left-0 absolute w-full h-full bg-darkgray"></div>
              <div className="flex flex-col items-center justify-center h-full">
                <a aria-label="link" href="/elements/interactive-banners" rel="noreferrer" className="bg-[#ca943d] z-[1] p-6 text-xmd leading-[20px] rounded-full w-[110px] h-[110px] uppercase font-serif text-white flex flex-col justify-center">Only<span className="font-semibold text-darkgray -tracking-[1px]">$30.00</span></a>
              </div>
            </figcaption>
          </figure>
          <div className="text-center mt-[40px] sm:mt-[20px]">
            <span className="text-darkgray font-medium font-serif block text-golden-hover uppercase">HOT CHICKEN BREAST</span>
            <span className="text-spanishgray uppercase inline-block text-sm">CAPSICUM <span className="text-xxs inline-block mx-[10px]">◍</span> PANEER <span className="text-xxs leading-none inline-block align-middle mx-[10px]">◍</span> CHEESE</span>
          </div>
        </m.div>
        <m.div className="col text-center interactive-banners-style-11" {...{...fadeIn,transition:{delay:.9}}}>
          <figure className="rounded-[6px] overflow-hidden relative">
            <img width="" height="" src="https://via.placeholder.com/720x515" alt="" />
            <figcaption>
              <div className="opacity-70 top-0 left-0 absolute w-full h-full bg-darkgray"></div>
              <div className="flex flex-col items-center justify-center h-full">
                <a aria-label="link" href="/elements/interactive-banners" rel="noreferrer" className="bg-[#ca943d] z-[1] p-6 text-xmd leading-[20px] rounded-full w-[110px] h-[110px] uppercase font-serif text-white flex flex-col justify-center">Only<span className="font-semibold text-darkgray -tracking-[1px]">$30.00</span></a>
              </div>
            </figcaption>
          </figure>
          <div className="text-center mt-[40px] sm:mt-[20px]">
            <span className="text-darkgray font-medium font-serif block text-golden-hover uppercase">CHILLY CHEESE STEAK</span>
            <span className="text-spanishgray uppercase inline-block text-sm">MUSHROOM <span className="text-xxs inline-block mx-[10px]">◍</span> CUCUMBER <span className="text-xxs leading-none inline-block align-middle mx-[10px]">◍</span> Basil</span>
          </div>
        </m.div>
      </Row>
    </>
  )
}

export default memo(InteractiveBanners11)