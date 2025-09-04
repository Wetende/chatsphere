import React, { memo, useEffect, useRef, useState } from 'react'

// Libraries
import { PropTypes } from "prop-types";

// Components
import Instagram02 from './Instagram02';

const Instagram = (props) => {
    const instaWrapper = useRef(null);
    const [loading, setLoading] = useState(true);

    // Fetch the data from the api & store it in the state
    const [instaFeed, setInstaFeed] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const url = await fetch(`https://graph.instagram.com/me/media?fields=id,media_url,timestamp,permalink&access_token=${process.env.REACT_APP_INSTA_API_KEY}`);
            const res = await url.json()
            const data = await res.data;
            setInstaFeed(data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if ( instaFeed !== null ) {
            if ( instaWrapper.current !== null ) {
                import("../../Functions/Utilities").then(module => {
                    const grid = module.initializeIsotop(instaWrapper.current);
                    grid.on('arrangeComplete', () => setLoading(false));
                })
            }
        }
    }, [instaFeed])

    return (
        props.carousel !== true ? (
            <div className="grid-wrapper">
                <ul ref={instaWrapper} className={`grid-container${props.grid ? ` ${props.grid}` : ""}${loading ? " loading" : ""} instagram-posts`}>
                    <li className="grid-sizer"></li>
                    {
                        instaFeed && instaFeed.slice(0, props.total_posts).map((item, i) => {
                            return (
                                <li key={i} className="grid-item">
                                    <figure className="relative overflow-hidden rounded-[3px]">
                                        <a aria-label="instagram" href={item.permalink} target="_blank" rel="noreferrer">
                                            <img className="w-full" src={item.media_url} alt="" width={179} height={179} />
                                            <span className="insta-counts">
                                                <i className="fab fa-instagram"></i>
                                            </span>
                                        </a>
                                    </figure>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        ) : (
            <Instagram02 data={instaFeed} {...props} />
        )
    )
}

Instagram.defaultProps = {
    theme: "instagram-style-01",
    total_posts: 6,
}

Instagram.propTypes = {
    className: PropTypes.string,
    total_posts: PropTypes.number,
    grid: PropTypes.string,
    carousel: PropTypes.bool,
    carouselOption: PropTypes.object
}

export default memo(Instagram)