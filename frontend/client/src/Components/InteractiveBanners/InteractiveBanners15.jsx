import React, { memo } from 'react'

// Libraries
import { Row } from 'react-bootstrap'
import { m } from "framer-motion"
import { PropTypes } from "prop-types";

// Components
import Buttons from '../Button/Buttons'

// Data
import { InteractiveBannersData15 } from '../../Components/InteractiveBanners/InteractiveBannersData';

const InteractiveBanners15 = (props) => {
    return (
        <Row className={`${props.grid ? `${props.grid}` : ""}${props.className ? `${props.className}` : ""}`}>
            {
                props.data.map((item, i) => {
                    return (
                        <m.div key={i} className="col interactive-banners-style-15" {...{ ...props.animation, transition: { delay: i * props.animationDelay } }}>
                            <figure className="m-0">
                                <img className="w-full" width={402} height={559} src={item.img} alt="interactive banners" />
                                <div className="absolute w-full h-full top-0 left-0 opacity-20 bg-black"></div>
                                <figcaption>
                                    <div className="interactive-banners-content p-16">
                                        <h2 className="heading-6 font-serif font-medium text-white w-[55%] relative z-[1] xl:w-[80%] lg:w-[50%] xs:w-[60%]">{item.title}</h2>
                                        <span className="interactive-banners-hover-icon w-[40px] h-[40px] leading-[44px] text-center inline-block bg-white rounded-full">
                                            <i className="feather-arrow-right text-darkgray text-lg"></i>
                                        </span>
                                    </div>
                                    <div className="interactive-banners-hover-action items-end flex bg-transparent-gradiant-white-black">
                                        <div className="p-16">
                                            <p className="interactive-banners-action-content min-h-[75px] w-[85%] md:w-[95%]">{item.content}</p>
                                            <Buttons ariaLabel="interactive button" to={item.btnLink} className="p-0 font-medium font-serif uppercase btn-link after:h-[2px] md:text-md md:mb-[15px] after:bg-transparent hover:text-[#fff]" icon="feather-arrow-right" iconPosition="after" color="#cee002" title={item.btnTitle} />
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                        </m.div>
                    )
                })
            }
        </Row>
    )
}

InteractiveBannersData15.defaultProps = {
    data: InteractiveBannersData15,
    animationDelay: 0.2
}

InteractiveBannersData15.propTypes = {
    className: PropTypes.string,
    grid: PropTypes.string,
    animationDelay: PropTypes.number,
    animation: PropTypes.object,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            img: PropTypes.string,
            title: PropTypes.string,
            content: PropTypes.string,
            btnTitle: PropTypes.string,
            btnLink: PropTypes.string,
        })
    )
}
export default memo(InteractiveBanners15)
