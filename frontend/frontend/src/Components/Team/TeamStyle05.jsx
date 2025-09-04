import React, { memo } from 'react'

const TeamStyle05 = ({ item }) => {
    return (
        <figure className="rounded-[6px] shadow-[0_0_20px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="team-member-image">
                <img width="370" height="460" alt="" loading="lazy" src={item.img} />
            </div>
            <figcaption className="bg-[#fff] py-[40px] text-center lg:py-[30px] relative">
                <div className="team-title text-base font-medium font-serif text-[#262b35] text-uppercase">{item.name}</div>
                <span className="sub-title text-sm font-sans uppercase block mb-[20px] text-[#828282] lg:mb-[10px]">{item.designation}</span>
                {
                    item.social_links && (
                        <div className="social-icon font-sans text-[#262b35] text-[15px]">
                            {
                                item.social_links.map((item, i) => {
                                    return (
                                        <a aria-label="team" key={i} href={item.link} rel="noreferrer" target="_blank" className="mx-[15px]"><i className={item.icon}></i></a>
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

export default memo(TeamStyle05)