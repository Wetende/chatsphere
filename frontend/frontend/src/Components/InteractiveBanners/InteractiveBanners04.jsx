import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap'
import { m } from 'framer-motion'
import { PropTypes } from "prop-types";

// Components
import Buttons from '../Button/Buttons'

// Data
import { InteractiveBannersData04 } from './InteractiveBannersData'



const InteractiveBanners04 = (props) => {
    const style = { "--overlay-color": typeof (props.overlay) === "object" ? `linear-gradient(to right top, ${props.overlay.map((item, i) => item)})` : props.overlay }
    return (
        <Row className={`${props.grid}${props.className ? ` ${props.className}` : ""}`} xl={3} md={6} sm={8}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div key={i} className="col-12 col-xl-3 col-md-6 col-sm-8 interactive-banners-style-04 lg:mb-[30px]" style={style} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                            <figure className="m-0">
                                {item.img && <img className="w-full" src={item.img} width={440} height={577} alt="interactive-style-4" />}
                                <div className="interactive-banners-overlay absolute bottom-0 h-full w-full"></div>
                                <figcaption>
                                    <div className="interactive-banners-content items-start px-[4.5rem] py-20 xl:p-8 lg:p-16 xs:p-20">
                                        <span className="text-extra-medium text-white opacity-60 block mb-[10px] relative z-[1]">{i + 1 >= 10 ? '' : '0'}{i + 1}</span>
                                        {item.title && <h2 className="heading-5 font-serif font-semibold text-white relative z-1">{item.title}</h2>}
                                        <span className="interactive-banners-hover-icon">
                                            <i className="line-icon-Add-Window text-white text-[50px]"></i>
                                        </span>
                                    </div>
                                    {(item.content || item.btnLink || item.btnTitle) && <div className="interactive-banners-hover-action items-end flex">
                                        <div className="px-16 py-20 lg:p-16 xl:p-12 xs:p-20">
                                            {item.content && <p className="interactive-banners-action-content w-[80%] text-white opacity-60 lg:w-[70%] xs:w-full">{item.content}</p>}
                                            {(item.btnTitle || item.btnLink) &&
                                                <Buttons ariaLabel="interactive button" to={item.btnLink} title={item.btnTitle} className="font-medium font-serif uppercase btn-link after:h-[2px] md:mb-[15px] after:bg-[#fff] hover:text-white" size="xl" color="#fff" />
                                            }
                                        </div>
                                    </div>}
                                </figcaption>
                            </figure>
                        </m.div>
                    )
                })
            }
        </Row>

    )
}


InteractiveBanners04.defaultProps = {
    data: InteractiveBannersData04,
    animationDelay: 0.2
}

InteractiveBanners04.propTypes = {
    className: PropTypes.string,
    grid: PropTypes.string,
    overlay: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array
    ]),
    animationDelay: PropTypes.number,
    animation: PropTypes.object,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            content: PropTypes.string,
            img: PropTypes.string,
            btnLink: PropTypes.string,
            btnTitle: PropTypes.string,
            icon: PropTypes.string,
            subtitle: PropTypes.string,
            imgLink: PropTypes.string,
            titleLink: PropTypes.string,
        })
    )
}

export default memo(InteractiveBanners04)