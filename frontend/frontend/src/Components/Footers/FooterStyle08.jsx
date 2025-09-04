import React, { memo } from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PropTypes } from "prop-types";

// Components
import SocialIcons from '../SocialIcon/SocialIcons'
import FooterMenu, { Footer } from './Footer'

// Data
import FooterData from './FooterData'
const iconData = [
    {
        color: "#828282",
        link: "https://www.facebook.com/",
        icon: "fab fa-facebook-f"
    },
    {
        color: "#828282",
        link: "https://dribbble.com/",
        icon: "fab fa-dribbble"
    },
    {
        color: "#828282",
        link: "https://twitter.com/",
        icon: "fab fa-twitter"
    },
    {
        color: "#828282",
        link: "https://www.instagram.com/",
        icon: "fab fa-instagram"
    },

]

const FooterStyle08 = (props) => {
    return (
        <Footer className={`${props.className ? ` ${props.className}` : ""}`} theme={props.theme}>
            <div className="py-[5%] lg:py-[8%] sm:py-[50px]">
                <Container>
                    <Row className="justify-between md:justify-start">
                        <Col lg={{ span: 3, order: 0 }} md={5} sm={{ span: 6, order: 1 }} className="md:mb-[50px] xs:mb-[25px]">
                            <Link aria-label="link" to="/" className="mb-[30px] block">
                                <img src={props.logo} alt="logo" width="111" height="36" />
                            </Link>
                            <p className="w-[95%] lg:w-full mb-[25px]">Lorem ipsum is simply dummy text of the printing and industry lorem ipsum has been the industry.</p>
                            <SocialIcons theme="social-icon-style-01" className="justify-start" size="xs" iconColor={props.theme === "dark" ? "light" : "dark"} data={iconData} />
                        </Col>
                        <FooterMenu data={FooterData.slice(0, 3)} lg={{ span: "auto"}} md={{ span: 3 }} sm={6} xs={{order:2}} className="md:mb-[40px] xs:mb-[25px]" titleClass="capitalize" />
                        <Col lg={{ span: "auto", offset: 0 }} md={{ span: "auto", offset: 2 }} sm={{ order: 3 }} xs={{span:12,order:3}} className="lg:text-start">
                            <span className="mb-[30px] font-medium text-themecolor font-serif block sm:hidden">Download for free</span>
                            <div className="flex flex-col sm:flex-row xs:text-center xs:block justify-between">
                                <Link aria-label="link" className="inline-block mb-[15px] sm:mb-0 xs:mb-[15px]" to="#"><img className="w-full" width={223} height={71} src="/assets/img/webp/application-img-11.webp" alt='' /></Link>
                                <Link aria-label="link" className="inline-block" to="#"><img className="w-full" width={223} height={71} src="/assets/img/webp/application-img-12.webp" alt='' /></Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="p-[35px] border-t border-[#ffffff1a] xs:py-[35px] xs:px-0">
                <Container>
                    <Row>
                        <Col md={6} className="md:mb-[0.75rem] xs:mb-[15px] xs:items-center sm:mb-[15px]">
                            <ul className="flex md:justify-start sm:justify-center xs:text-center xs:flex-col">
                                <li className="mr-[35px] md:mr-[20px] xl:mb-0 xs:mb-[7px] xs:mr-0"><Link aria-label="link" to="/page/about-us">About us</Link></li>
                                <li className="mr-[35px] md:mr-[20px] xl:mb-0 xs:mb-[7px] xs:mr-0"><Link aria-label="link" to="/page/our-services">Our services</Link></li>
                                <li className="mr-[35px] md:mr-[20px] xl:mb-0 xs:mb-[7px] xs:mr-0"><Link aria-label="link" to="/page/our-team">Team</Link></li>
                                <li className="mr-[35px] md:mr-[0px] xl:mb-0 xs:mr-0"><Link aria-label="link" to="/page/contact-classic">Contact us</Link></li>
                            </ul>
                        </Col>
                        <Col md={6} className="justify-end flex sm:justify-center text-center md:text-end">
                            <p>&copy; {new Date().getFullYear()} Litho is Proudly Powered by <a aria-label="themezaa" target="_blank" rel="noreferrer" href="https://www.themezaa.com/" className="underline underline-offset-4 text-themecolor">ThemeZaa</a></p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Footer>
    )
}

FooterStyle08.defaultProps = {
    data: FooterData,
    logo: "/assets/img/webp/logo-white.webp"
}

FooterStyle08.propTypes = {
    className: PropTypes.string,
    logo: PropTypes.string,

}

export default memo(FooterStyle08)