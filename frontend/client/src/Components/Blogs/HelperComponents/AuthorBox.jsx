import React from 'react'

// Libraries
import { Link } from 'react-router-dom'
import { PropTypes } from "prop-types";
import { m } from "framer-motion";

// Components
import { fadeIn } from '../../../Functions/GlobalAnimations';
import Buttons from '../../Button/Buttons'

// Data
import { authorData } from '../BlogData'

const AuthorBox = ({ authorId, className }) => {
    const authorDetails = authorData.filter(item => item.id === authorId)[0]

    return (
        authorDetails && (
            <m.div {...fadeIn} className={`flex justify-center items-center w-full shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-[5px] p-16 sm:block${className ? ` ${className}` : ""}`}>
                <div className="w-[130px] mr-[60px] sm:mx-auto text-center">
                    <img width="" height="" src={authorDetails.img} className="rounded-full w-[110px] mx-auto" alt={authorDetails.name} />
                    <Link aria-label="link" to={`/blogs/author/${authorId}`} className="text-darkgray font-serif font-medium mt-[20px] block text-md hover:text-fastblue">{authorDetails.name}</Link>
                    <span className="text-medium block leading-[18px] sm:mb-[25px]">{authorDetails.designation}</span>
                </div>
                <div className="w-[75%] md:text-start sm:w-full sm:text-center">
                    <p className="mb-[25px]">{authorDetails.description}</p>
                    <Buttons ariaLabel="authorbox" to={`/blogs/author/${authorId}`} className="font-medium font-serif after:h-[2px] after:bg-black hover:text-black uppercase btn-link md:mb-[15px]" size="md" color="#232323" title="All author posts" />
                </div>
            </m.div>
        )
    )
}

export default AuthorBox

AuthorBox.propTypes = {
    authorId: PropTypes.number,
};