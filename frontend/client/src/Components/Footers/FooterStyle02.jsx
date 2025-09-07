import React, { memo } from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PropTypes } from "prop-types";

// components
import SocialIcons from '../SocialIcon/SocialIcons'
import FooterMenu, { Footer } from './Footer';

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

const FooterStyle02 = (props) => {
    return (
        <Footer theme={props.theme} className={`${props.className ? ` ${props.className}` : ""}`}>
            <div className="py-[5%] lg:py-[8%] md:pb-0 xs:py-[8%]">
                <Container>
                    <Row className="md:text-start justify-start">
                        <Col lg={{ span: 3, order: 0 }} md={5} sm={{ span: 6, order: 1 }} className="md:mb-[50px] xs:mb-[25px]">
                            <Link aria-label="link" to="/" className="mb-[20px] block">
                                <img alt="logo" src={props.logo} width="111" height="36" />
                            </Link>
                            <p className="w-[80%] mb-[20px] xs:w-full">We create digital experiences for brands and companies by using technology.</p>
                            <SocialIcons theme="social-icon-style-01" className="justify-start" size="xs" iconColor={props.theme === "dark" ? "light" : "dark"} data={iconData} />
                        </Col>
                        <FooterMenu className="xl:px-[15px] md:mb-[40px] xs:mb-[25px]" data={FooterData.slice(0, 3)} lg={{ span: 2, order: 0 }} sm={{ span: 4, order: 3 }} titleClass="capitalize" />
                        <Col lg={{ span: 3, order: 0 }} md={5} sm={{ span: 6, order: 2 }}>
                            <span className="font-serif font-medium block text-themecolor mb-[30px] md:mb-[15px]">Latest blog</span>
                            <ul>
                                <li className="flex mb-[25px]">
                                    <Link aria-label="link" to="/blogs/blog-post-layout-01" className="w-[75px] mr-[30px] shrink-0">
                                        <img src="https://via.placeholder.com/800x560" alt="footer" width={75} height={53} />
                                    </Link>
                                    <div>
                                        <Link aria-label="link" to="/blogs/blog-post-layout-01">I think really important to design with...</Link>
                                    </div>
                                </li>
                                <li className="flex">
                                    <Link aria-label="link" to="/blogs/blog-post-layout-02" className="w-[75px] mr-[30px] shrink-0">
                                        <img src="https://via.placeholder.com/800x560" alt="footer" width={75} height={53} />
                                    </Link>
                                    <div>
                                        <Link aria-label="link" to="/blogs/blog-post-layout-02">Recognizing the need is the primary...</Link>
                                    </div>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="footer-bottom py-[35px] border-t border-[#ffffff1a]">
                <Container>
                    <Row>
                        <Col md={6} className="md:mb-[0.75rem] xs:mb-[15px]">
                            <ul className="flex sm:justify-center md:justify-start xs:flex-col">
                                <li className="mr-[35px] md:mr-[20px] xl:mb-0 xs:mb-[7px]"><Link aria-label="link" to="#">Privacy policy</Link></li>
                                <li className="mr-[35px] md:mr-[20px] xl:mb-0 xs:mb-[7px]"><Link aria-label="link" to="#">Legal notice</Link></li>
                                <li className="xl:mb-0"><Link aria-label="link" to="#">Terms of service</Link></li>
                            </ul>
                        </Col>
                        <Col md={6} className="text-right sm:text-center xs:text-left">
                            <span className="inline-block">&copy; {new Date().getFullYear()} Litho is Proudly Powered by <a aria-label="themezaa" rel="noreferrer" href="https://www.themezaa.com/" target="_blank" className="text-themecolor underline underline-offset-4"> ThemeZaa</a></span>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Footer>
    )
}

FooterStyle02.defaultProps = {
    data: FooterData,
    logo: "/assets/img/webp/logo-white.webp"
}

FooterStyle02.propTypes = {
    className: PropTypes.string,
    logo: PropTypes.string,
}

export default memo(FooterStyle02)