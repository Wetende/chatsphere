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

const PageFooterData = [FooterData[0], FooterData[3]];

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

const FooterStyle12 = (props) => {
    return (
        <Footer parallax={{ desktop: true, md: false }} theme={props.theme} className={`${props.className ? ` ${props.className}` : ""}`}>
            <div className="pt-[6%] lg:pt-[8%] footer-menu xs:py-[50px]">
                <Container>
                    <Row className="justify-between md:text-start gap-y-[60px]">
                        <Col lg={{ span: 3, order: 0 }} md={6} sm={{ span: 6, order: 1 }}>
                            <Link aria-label="link" to="/" className="mb-[30px] inline-block xs:mb-[20px]">
                                <img src={props.logo} alt="logo" width="35" height="34" className="w-auto" />
                            </Link>
                            <p className="subtitle font-serif font-light w-[85%] lg:w-full md:w-[70%] sm:w-full text-[20px] leading-[36px] -tracking-[0.5px] xs:w-[90%]">We create experiences for brands companies by using creativity.</p>
                        </Col>
                        <FooterMenu className="justify-between" data={PageFooterData} lg={{ span: "auto", order: 0 }} sm={{ span: 6, order: 3 }} titleClass="uppercase traking-[2px]" />
                        <Col lg={{ span: "auto", order: 0 }} md={6} sm={{ span: 6, order: 2 }} className="instagram-col justify-end">
                            <span className="font-serif tracking-[2px] uppercase portrait:text-center landscape:text-start font-medium block text-themecolor mb-[30px] md:my-[15px] portrait:md:text-start">Follow us</span>
                            <SocialIcons theme="social-icon-style-01" className="portrait:justify-center landscape:justify-start flex portrait:md:justify-start" size="xs" iconColor={props.theme === "dark" ? "light" : "dark"} data={iconData} />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="py-[6%] xs:pt-0 xs:p-0 footer-details">
                <Container>
                    <Row>
                        <Col sm={{ span: 12, order: 2 }} md={{ span: 6, order: 1 }} xs={{ order: 2 }} className="text-start flex sm:justify-center md:text-end md:mb-4 xs:justify-start">
                            <p>&copy; {new Date().getFullYear()} Litho is Proudly Powered by <a aria-label="themezaa" rel="noreferrer" href="https://www.themezaa.com/" target="_blank" className="underline underline-offset-4 text-themecolor hover:text-basecolor">ThemeZaa</a></p>
                        </Col>
                        <Col sm={{ span: 12, order: 1 }} md={{ span: 6, order: 2 }} xs={{ order: 1 }} className="md:mb-[0.75rem] xs:mb-[15px]">
                            <ul className="flex justify-end md:justify-center xs:flex-col">
                                <li className="mr-[35px] md:mr-[20px] xl:mb-0 xs:mb-[7px]"><Link aria-label="link" to="#">Privacy policy</Link></li>
                                <li className="mr-[35px] md:mr-[20px] xl:mb-0 xs:mb-[7px]"><Link aria-label="link" to="#">Legal</Link></li>
                                <li className="md:mr-[0px] xl:mb-0"><Link aria-label="link" to="#">Terms of service</Link></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Footer>
    )
}

FooterStyle12.defaultProps = {
    data: FooterData,
    logo: "/assets/img/webp/logo.webp"
}

FooterStyle12.propTypes = {
    className: PropTypes.string,
    logo: PropTypes.string
}

export default memo(FooterStyle12)