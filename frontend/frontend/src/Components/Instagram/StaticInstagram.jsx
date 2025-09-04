import React, { memo, useEffect, useRef, useState } from 'react'

// Data
const instaData = [
    {
        link: "https://www.instagram.com/p/CSMapatMNo8/",
        img: "https://via.placeholder.com/112x112",
    },
    {
        link: "https://www.instagram.com/p/CSMapatMNo8/",
        img: "https://via.placeholder.com/112x112",
    },
    {
        link: "https://www.instagram.com/p/CSMapatMNo8/",
        img: "https://via.placeholder.com/112x112",
    },
    {
        link: "https://www.instagram.com/p/CSMapatMNo8/",
        img: "https://via.placeholder.com/112x112",
    },
    {
        link: "https://www.instagram.com/p/CSMapatMNo8/",
        img: "https://via.placeholder.com/112x112",
    },
    {
        link: "https://www.instagram.com/p/CSMapatMNo8/",
        img: "https://via.placeholder.com/112x112",
    }
]

const StaticInstagram = (props) => {
    const instaWrapper = useRef();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        import("../../Functions/Utilities").then(module => {
            const grid = module.initializeIsotop(instaWrapper.current);
            grid.on('arrangeComplete', () => setLoading(false));
        })
    }, [])

    return (
        <div className="grid-wrapper mt-[10px]">
            <ul ref={instaWrapper} className={`instagram-posts grid-container grid grid-3col mx-[-5px] gutter-small${loading ? " loading" : ""}`}>
                <li className="grid-sizer"></li>
                {
                    props.data.slice(0, props.total_posts).map((item, i) => {
                        return (
                            <li key={i} className="grid-item rounded">
                                <figure className="relative overflow-hidden rounded-[3px]">
                                    <a href={item.link} target="_blank" aria-label="instagram image" rel="noreferrer">
                                        <img height="112px" width="112px" alt="instagram-img" className="w-full rounded-[3px]" src={item.img} />
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </figure>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

StaticInstagram.defaultProps = {
    data: instaData,
    total_posts: 6
}

export default memo(StaticInstagram)