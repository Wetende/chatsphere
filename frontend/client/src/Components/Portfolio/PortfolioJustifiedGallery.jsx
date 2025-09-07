import React, { memo, useEffect, useRef, useState } from 'react'

// Libraries
import Lightbox from 'react-18-image-lightbox';
import { PropTypes } from "prop-types";
import { m } from "framer-motion";

// Components
import Filter from './Filter';

// Data
import { portfolioClassicData } from './PortfolioData';

const PortfolioJustifiedGallery = (props) => {
  const portfolioWrapper = useRef()
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0)
  const portfolioCaption = useRef(props.data.map(() => React.createRef()))

  useEffect(() => {
    let allImages = portfolioWrapper.current.querySelectorAll("img");

    Promise.all(Array.prototype.slice.call(allImages).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
      import("../../Functions/Utilities").then(module => {
        const grid = module.initializeIsotop(portfolioWrapper.current)
        grid.on('arrangeComplete', () => setLoading(false));
      })
    });
  }, [])

  // Image hover caption
  function showImgContent(e) {
    const x = e.clientX;
    const y = e.clientY;

    document.querySelectorAll(".portfolio-caption-wrapper").forEach(item => {
      let el = item.querySelector(".portfolio-caption");
      el.style.transform = `translate3d(${x + 10}px, ${y + 10}px, 0)`;

      if (x + el.clientWidth > item.clientWidth + item.offsetLeft) {
        el.style.transform = `translate3d(${x - el.clientWidth}px, ${y + 10}px, 0)`;
      }
      return undefined
    })
  }

  document.addEventListener('mousemove', showImgContent);

  const handleClick = (i) => {
    setIsOpen(true)
    setPhotoIndex(i)
  }

  const handleFilterChange = () => {
    portfolioWrapper.current.querySelectorAll("li").forEach(item => item.childNodes[0]?.classList.add("appear"))
  }

  return (
    <div className="grid-wrapper">
      {/* Filter Start */}
      <Filter title={props.title} filterData={props.filterData} onFilterChange={handleFilterChange} />
      {/* Filter End */}

      {/* Grid Start */}
      <ul ref={portfolioWrapper} className={`grid-container text-center ${props.filter === false ? "mt-0" : "mt-24 md:mt-[4.5rem] sm:mt-8"}${props.grid ? ` ${props.grid}` : ""}${props.className ? ` ${props.className}` : ""}`}>
        <li className="grid-sizer"></li>
        {
          props.data.map((item, i) => {
            return (
              <li key={i} ref={portfolioCaption.current[i]} className={`grid-item portfolio-caption-wrapper${item.double_col ? " grid-item-double" : ""} ${item.category.toString().split(",").join(" ").toLowerCase()}`}>
                <m.div className="portfolio-justified cursor-pointer" onClick={() => handleClick(i)}
                  initial={{ opacity: 0 }} whileInView={!loading && { opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.2 }} >
                  <div className="portfolio-image">
                    {item.img && <img src={item.img} height={614} width={450} alt="portfolio-justified" className="w-full" />}
                    {
                      (item.title || item.subtitle) && (
                        <div className="portfolio-caption m-0 bg-[#fff] text-inherit pt-[15px] px-[25px] pb-[12px] whitespace-nowrap z-[1] shadow-xl text-start">
                          {item.title && <span className='block text-md font-light'>{item.title}</span>}
                          {item.subtitle && <span className='block font-medium text-darkgray text-md font-serif uppercase'>{item.subtitle}</span>}
                        </div>
                      )
                    }
                  </div>
                </m.div>
              </li>
            )
          })
        }
      </ul>
      {/* Grid End */}

      {isOpen && (
        <Lightbox
          imageCaption={`${props.data[photoIndex].subtitle}... ${photoIndex + 1} of ${props.data.length}`}
          mainSrc={props.data[photoIndex].img}
          onCloseRequest={() => setIsOpen(false)}
          nextSrc={props.data[(photoIndex + 1) % props.data.length].img}
          prevSrc={props.data[(photoIndex + props.data.length - 1) % props.data.length].img}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + props.data.length - 1) % props.data.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % props.data.length)
          }
        />
      )}
    </div>
  )
}

PortfolioJustifiedGallery.defaultProps = {
  data: portfolioClassicData,
  animationDelay: 0.3
}

PortfolioJustifiedGallery.propTypes = {
  grid: PropTypes.string,
  animationDelay: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.exact({
      subtitle: PropTypes.string,
      title: PropTypes.string,
      img: PropTypes.string,
      category: PropTypes.array,
      link: PropTypes.string,
      double_col: PropTypes.bool
    })
  )
}

export default memo(PortfolioJustifiedGallery)