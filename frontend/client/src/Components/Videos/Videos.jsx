import React, { memo } from 'react'
import { PropTypes } from 'prop-types';

const Videos = (props) => {
    const style = { "background": typeof (props.overlay) === "object" ? `linear-gradient(to right top, ${props.overlay.map((item, i) => item)})` : props.overlay, "opacity": props.opacity }

    return (
        <section className={`relative overflow-hidden bg-video ${props.className}`}>
            {props.overlay && <div className="overlay z-[1] absolute h-full w-full top-0 left-0" style={style}></div>}
            {props.children}
            <div className="absolute top-1/2 left-1/2 w-full h-full -translate-y-1/2 -translate-x-1/2 xl:w-[120%] lg:w-[130%] xs:w-[200%]">
                <div className="fit-video">
                    {
                        (props.src.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/) || props.src.match(/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]+)?/)) ? (
                            <iframe title="Video Player" src={props.src} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        ) : (
                            <video loop={props.loop} autoPlay='autoplay' control="control" muted poster={props.poster}>
                                <source type="video/mp4" src={props.src} />
                                <source type="video/webm" src={props.src} />
                            </video>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

Videos.defaultProps = {
    className: "",
    loop: false,
    poster: "",
    opacity: 0.5
}

Videos.propTypes = {
    className: PropTypes.string,
    loop: PropTypes.bool,
    poster: PropTypes.string,
    opacity: PropTypes.number,
    overlay: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array
    ]),
}

export default memo(Videos)