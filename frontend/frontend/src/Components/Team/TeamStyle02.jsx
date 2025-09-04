import React, { memo } from 'react'

const TeamStyle02 = ({ item }) => {
    return (
        <figure>
            <div className='team-member-image'><img width="367" height="452" loading="lazy" src={item.img} alt='images' /></div>
            <figcaption>
                <div className="team-member-details">
                    <span className='title'>{item.name}</span>
                    <span className='sub-title'>{item.designation}</span>
                </div>
                {
                    item.social_links && (
                        <div className="social-icon">
                            {
                                item.social_links.map((item, i) => {
                                    return (
                                        <a aria-label="team" key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="hover:opacity-70"><i className={item.icon}></i></a>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </figcaption>
        </figure>
    )
}

export default memo(TeamStyle02)