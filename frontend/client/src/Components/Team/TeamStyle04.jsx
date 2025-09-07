import React, { memo } from 'react'

const TeamStyle04 = ({ item }) => {
    return (
        <figure>
            <div className='team-member-image'>
                <img width="370" height="450" loading="lazy" src={item.img} alt='images' />
                <div className='team-member-details'>
                    {item.title &&<span className='quote'>{item.title}</span>}
                    {item.subtitle &&<span className="text-center text-white opacity-70 w-[70%] md:w-full">{item.subtitle}</span>}
                    {
                        item.social_links && (
                            <div className="social-icon">
                          {
                                item.social_links.map((item, i) => {
                                    return (
                                        <a aria-label="team" key={i} href={item.link} target="_blank" rel="noopener noreferrer"><i className={item.icon}></i></a>
                                    )
                                })
                            }
                            </div>
                        )
                    }
                </div>
            </div>
            <figcaption>
                <div className='title-bottom'>
                    <span className='title' >{item.name}</span>
                    <span className='sub-title'>{item.designation}</span>
                </div>
            </figcaption>
        </figure>
    )
}

export default memo(TeamStyle04)