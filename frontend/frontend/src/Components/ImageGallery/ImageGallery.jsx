import React, { useEffect, useState, useRef, memo } from 'react'

// Libraries
import { Col } from 'react-bootstrap';
import Isotope from "isotope-layout";
import Lightbox from 'react-18-image-lightbox';
import { m } from 'framer-motion';
import { PropTypes } from "prop-types";

// Components
import ImageGallery01 from './ImageGallery01';
import ImageGallery02 from './ImageGallery02';
import ImageGallery03 from './ImageGallery03';

// Data
import { imageGalleryData01 } from '../../Components/ImageGallery/ImageGalleryData'

const ImageGallerySwitch = (params, item, i) => {
    switch (params.theme) {
        case "image-gallery-01":
            return <ImageGallery01 data={item} />
        case "image-gallery-02":
            return <ImageGallery02 data={item} />
        case "image-gallery-03":
            return <ImageGallery03 data={item} />
        default: {
            return <ImageGallery01 data={item} />
        }
    }
}

const ImageGallery = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0)
    const BgColor = (props.overlay && typeof (props.overlay) === "object") ? `linear-gradient(to top right, ${props.overlay.map((item, i) => item)})` : props.overlay
    const imageGallery = useRef();
    const imageGalleryWrapper = useRef();

    const handleClick = (i) => {
        setIsOpen(true)
        setPhotoIndex(i)
        // handleOpenEvent()
    }

    useEffect(() => {
        imageGallery.current = new Isotope(imageGalleryWrapper.current, {
            itemSelector: ".grid-item",
            layoutMode: "masonry",
            percentPosition: true,
            stagger: 0,
            masonry: {
                columnWidth: ".grid-sizer",
            },
        });

        setTimeout(() => {
            imageGallery.current.arrange({ filter: `*` });
        }, 1000);
    }, []);

    return (
        <>
            {isOpen && (
                <Lightbox
                    imageCaption={`${props.data[photoIndex].title}... ${photoIndex + 1} of ${props.data.length}`}
                    mainSrc={props.data[photoIndex].src}
                    onCloseRequest={() => setIsOpen(false)}
                    nextSrc={props.data[(photoIndex + 1) % props.data.length].src}
                    prevSrc={props.data[(photoIndex + props.data.length - 1) % props.data.length].src}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + props.data.length - 1) % props.data.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % props.data.length)}
                />
            )}
            <Col>
                <ul ref={imageGalleryWrapper} className={`${props.theme} ${props.className ? `${props.className}` : ""}grid-container ${props.grid ? `${props.grid}` : ""}`}>
                    <li className="grid-sizer"></li>
                    {
                        props.data.map((item, i) => {
                            return (
                                <m.li key={i} {...{ ...props.animation, transition: { delay: i * props.animationDelay } }} className={`grid-item${item.double_col ? " grid-item-double" : ""}`} >
                                    <div className="image-box" style={{ background: props.theme === "image-gallery-03" ? (props.overlay[i] && props.overlay[i]) : BgColor }} onClick={() => handleClick(i)}>
                                        {ImageGallerySwitch(props, item, i)}
                                    </div>
                                </m.li>
                            )
                        })
                    }
                </ul>
            </Col>
        </>
    )
}

ImageGallery.defaultProps = {
    data: imageGalleryData01,
    animationDelay: 0.2
}

ImageGallery.propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            src: PropTypes.string,
            double_col: PropTypes.bool
        })
    ),
    animation: PropTypes.object,
    animationDelay: PropTypes.number,
    theme: PropTypes.string,
    grid: PropTypes.string,
    overlay: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
}

export default memo(ImageGallery)