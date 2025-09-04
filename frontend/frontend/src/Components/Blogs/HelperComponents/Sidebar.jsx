import React from 'react'

// Libraries
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { m } from 'framer-motion'

// Components
import StaticInstagram from '../../Instagram/StaticInstagram';
import SocialIcons from '../../SocialIcon/SocialIcons';
import { Input } from '../../Form/Form'

// Data
import { authorData } from '../BlogData';
import { fadeIn } from "../../../Functions/GlobalAnimations";
const SocialIconsData = [
    {
        color: "#3b5998",
        link: "https://www.facebook.com/",
        icon: "fab fa-facebook-f"
    },
    {
        color: "#ea4c89",
        link: "https://dribbble.com/",
        icon: "fab fa-dribbble"
    },
    {
        color: "#00aced",
        link: "https://twitter.com/",
        icon: "fab fa-twitter"
    },
    {
        color: "#fe1f49",
        link: "https://www.instagram.com/",
        icon: "fab fa-instagram"
    },

    {
        color: "#0077b5",
        link: "https://www.linkedin.com/",
        icon: "fab fa-linkedin-in"
    }
]


const Sidebar = (props) => {
    const navigate = useNavigate();

    return (
        <aside className="col-12 col-xl-3 offset-xl-1 col-lg-4 col-md-7 md:pl-[15px]">
            <div className='inline-block w-full mb-20'>
                <span className='mb-[25px] font-medium text-darkgray text-lg font-serif block'>Search posts</span>
                <div className="relative">
                    <Formik
                        initialValues={{ search: '' }}
                        validationSchema={Yup.object().shape({ search: Yup.string().required("Field is required."), })}
                        onSubmit={async (values, actions) => {
                            await new Promise((r) => setTimeout(r, 500));
                            actions.resetForm();
                            navigate("/page/search-result", { state: { search: values } });
                        }}
                    >
                        {({ isSubmitting, status }) => (
                            <div className="relative">
                                <Form className="relative">
                                    <Input showErrorMsg={false} type="text" name="search" className="border-[1px] py-[15px] px-[20px] w-full rounded-[5px] border-solidborder-transparent" placeholder="Enter your keyword..." />
                                    <button type="submit" className={`text-xs tracking-[1px] text-fastblue py-[15px] !absolute top-[8%] right-0 px-[20px] uppercase${isSubmitting ? " loading" : ""}`}><i className="feather-search"></i></button>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
            <div className='p-[38px] mb-20 rounded-[4px] border-mediumgray border text-center'>
                {
                    authorData && (
                        <>
                            <Link aria-label="link" to="#">
                                <img height="" width="" src={authorData.filter(author => author.id === props.data[0].author)[0].img} alt={authorData.filter(author => author.id === props.data[0].author)[0].name} className='mb-[5px] rounded-[50%] block mx-auto w-[100px]' />
                            </Link>
                            <Link aria-label="link" to="#" className='mt-[20px] font-medium text-darkgray text-md font-serif inline-block'>{authorData.filter(author => author.id === props.data[0].author)[0].name}</Link>
                        </>
                    )
                }
                <span className='mb-[20px] leading-[18px] text-[14px] block'>Co-founder</span>
                <p className='mb-[25px]'>Lorem ipsum is simply dummy text of the printing and industry lorem ipsum has been standard.</p>
                <SocialIcons theme="social-icon-style-01" size="xs" iconColor="dark" data={SocialIconsData.slice(0, 4)} />
            </div>
            <div className='mb-20 xs:mb-[35px]'>
                <m.span className="mb-[35px] font-medium font-serif text-darkgray text-lg block" {...fadeIn}>Categories</m.span>
                <m.ul className="pl-0" {...fadeIn}>
                    <li className='relative inline-block w-full mb-[15px] leading-[18px]'>
                        <Link aria-label="link" to="/blogs/blog-grid" className='inline-block text-left'>Entertainment</Link>
                        <span className='text-[14px] absolute top-[1px] right-0 text-right'>10</span>
                    </li>
                    <li className='relative inline-block w-full mb-[15px] leading-[18px]'>
                        <Link aria-label="link" to="/blogs/blog-grid" className='inline-block text-left'>Business</Link>
                        <span className='text-[14px] absolute top-[1px] right-0 text-right'>05</span>
                    </li>
                    <li className='relative inline-block w-full mb-[15px] leading-[18px]'>
                        <Link aria-label="link" to="/blogs/blog-grid" className='inline-block text-left'>Creative</Link>
                        <span className='text-[14px] absolute top-[1px] right-0 text-right'>03</span>
                    </li>
                    <li className='relative inline-block w-full mb-[15px] leading-[18px]'>
                        <Link aria-label="link" to="/blogs/blog-grid" className='inline-block text-left'>Lifestyle</Link>
                        <span className='text-[14px] absolute top-[1px] right-0 text-right'>02</span>
                    </li>
                    <li className='relative inline-block w-full mb-[15px] leading-[18px]'>
                        <Link aria-label="link" to="/blogs/blog-grid" className='inline-block text-left'>Fashion</Link>
                        <span className='text-[14px] absolute top-[1px] right-0 text-right'>19</span>
                    </li>
                    <li className='relative inline-block w-full leading-[18px] mb-0'>
                        <Link aria-label="link" to="/blogs/blog-grid" className='inline-block text-left'>Design</Link>
                        <span className='text-[14px] absolute top-[1px] right-0 text-right'>21</span>
                    </li>
                </m.ul>
            </div>
            <div className='mb-20 xs:mb-[35px]'>
                <span className='mb-[35px] font-medium font-serif text-darkgray text-lg block'>Recent posts</span>
                <ul>
                    <m.li className='flex mb-[45px]' {...{...fadeIn,transition:{delay:0.2}}}>
                        <figure className="h-[65px] w-[80px] m-0 shrink-0	">
                            <Link aria-label="link" to="/blogs/blog-post-layout-01"><img height="" width="" src="https://via.placeholder.com/940x940" alt="" className='rounded-[3px]' /></Link>
                        </figure>
                        <div className='leading-normal pl-[30px] relative top-[-3px] grow'>
                            <Link aria-label="link" to="/blogs/blog-post-layout-01" className='mb-[5px] sm:mb-0 font-medium text-darkgray inline-block'>Fashion is anything</Link>
                            <span className="leading-[22px] text-[14px] block">Lorem ipsum is simply as dummy text of the...</span>
                        </div>
                    </m.li>
                    <m.li className='flex mb-[45px]' {...{...fadeIn,transition:{delay:0.4}}}>
                        <figure className="h-[65px] w-[80px] m-0 shrink-0	">
                            <Link aria-label="link" to="/blogs/blog-post-layout-02">
                                <img height="" width="" src="https://via.placeholder.com/800x800" alt="" className='rounded-[3px]' />
                            </Link>
                        </figure>
                        <div className='leading-normal pl-[30px] relative top-[-3px] grow'>
                            <Link aria-label="link" to="/blogs/blog-post-layout-02" className='mb-[5px] sm:mb-0 font-medium text-darkgray inline-block'>Design transcends</Link>
                            <span className="leading-[22px] text-[14px] block">Lorem ipsum is simply as dummy text of the...</span>
                        </div>
                    </m.li>
                    <m.li className='flex mb-[45px]' {...{...fadeIn,transition:{delay:0.6}}}>
                        <figure className="h-[65px] w-[80px] m-0 shrink-0	">
                            <Link aria-label="link" to="/blogs/blog-post-layout-03">
                                <img src="https://via.placeholder.com/800x800" alt="" height="" width="" className='rounded-[3px]' />
                            </Link>
                        </figure>
                        <div className='leading-normal pl-[30px] relative top-[-3px] grow'>
                            <Link aria-label="link" to="/blogs/blog-post-layout-03" className='mb-[5px] sm:mb-0 font-medium text-darkgray inline-block'>Never give in except</Link>
                            <span className="leading-[22px] text-[14px] block">Lorem ipsum is simply as dummy text of the...</span>
                        </div>
                    </m.li>
                </ul>
            </div>
            <m.div className='visible mb-20 md:w-[90%] sm:w-full' {...fadeIn}>
                <span className='mb-[35px] font-medium font-serif text-darkgray text-lg block'>Tags cloud</span>
                <Link aria-label="tag" to="/blogs/blog-grid" className='inline-block text-center text-sm mt-0 ml-[6px] mb-[10px] mr-0 pt-[5px] px-[18px] pb-[6px] rounded-[4px] border-mediumgray border hover:text-[#828282] hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'>Development</Link>
                <Link aria-label="tag" to="/blogs/blog-grid" className='inline-block text-center text-sm mt-0 ml-[6px] mb-[10px] mr-0 pt-[5px] px-[18px] pb-[6px] rounded-[4px] border-mediumgray border hover:text-[#828282] hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'>Mountains</Link>
                <Link aria-label="tag" to="/blogs/blog-grid" className='inline-block text-center text-sm mt-0 ml-[6px] mb-[10px] mr-0 pt-[5px] px-[18px] pb-[6px] rounded-[4px] border-mediumgray border hover:text-[#828282] hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'>Lifestyle</Link>
                <Link aria-label="tag" to="/blogs/blog-grid" className='inline-block text-center text-sm mt-0 ml-[6px] mb-[10px] mr-0 pt-[5px] px-[18px] pb-[6px] rounded-[4px] border-mediumgray border hover:text-[#828282] hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'>Hotel</Link>
                <Link aria-label="tag" to="/blogs/blog-grid" className='inline-block text-center text-sm mt-0 ml-[6px] mb-[10px] mr-0 pt-[5px] px-[18px] pb-[6px] rounded-[4px] border-mediumgray border hover:text-[#828282] hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'>Event</Link>
                <Link aria-label="tag" to="/blogs/blog-grid" className='inline-block text-center text-sm mt-0 ml-[6px] mb-[10px] mr-0 pt-[5px] px-[18px] pb-[6px] rounded-[4px] border-mediumgray border hover:text-[#828282] hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'>Multimedia </Link>
                <Link aria-label="tag" to="/blogs/blog-grid" className='inline-block text-center text-sm mt-0 ml-[6px] mb-[10px] mr-0 pt-[5px] px-[18px] pb-[6px] rounded-[4px] border-mediumgray border hover:text-[#828282] hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'>Fashion</Link>
            </m.div>
            <m.div {...fadeIn}>
                <span className='mb-[35px] font-medium font-serif text-darkgray text-lg block'>Instagram</span>
                <StaticInstagram />
            </m.div>
        </aside>
    )
}

export default Sidebar