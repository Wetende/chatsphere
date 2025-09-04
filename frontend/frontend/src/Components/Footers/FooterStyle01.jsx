import React, { memo } from 'react'

// Libraries
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { PropTypes } from "prop-types";

// Components
import SocialIcons from '../SocialIcon/SocialIcons';
import FooterMenu, { Footer } from './Footer';
import StaticInstagram from '../Instagram/StaticInstagram';

// Data
import FooterData from './FooterData';

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

const FooterStyle01 = (props) => {
    return (
        <Footer theme={props.theme} className={`${props.className ? ` ${props.className}` : ""}`}>
            <div className="py-[5%] lg:py-[95px] md:py-[50px]">
                <Container>
                    <Row>
                        <FooterMenu data={FooterData.slice(0, 2)} lg={3} sm={6} className="xl:px-[15px] md:mb-[40px] xs:mb-[25px]" titleClass="capitalize" />
                        <Col lg={3} sm={6} className="xs:mb-[25px]">
                            <span className="mb-[20px] font-serif block font-medium text-themecolor xs:mb-[10px]">Get in touch</span>
                            <p className="w-[85%] mb-[15px]">27 Eden walk eden centre, Orchard view, Paris, France</p>
                            <div><i className="feather-phone-call text-sm mr-[10px] text-themecolor"></i>+1 234 567 8910</div>
                            <div><i className="feather-mail text-sm mr-[10px] text-themecolor"></i><a aria-label="mail" href="mailTo:info@yourdomain.com">info@yourdomain.com</a></div>
                        </Col>
                        <Col lg={3} sm={6}>
                            <span className="mb-[20px] font-medium font-serif text-themecolor block xs:mb-[20px]">Follow us on Instagram</span>
                            <div className="w-full inline-block">
                                <StaticInstagram total_posts={3} />
                                <a aria-label="link" rel="noreferrer" href="https://www.instagram.com/" target="_blank" className="flex justify-start text-slateblue font-medium text-xs font-serif uppercase mt-[20px] items-center hover:text-white">
                                    <i className="fab fa-instagram text-lg mr-[10px] text-gradient bg-gradient-to-r from-[#ff85a6] to-[#b783ff]"></i>
                                    <span className="inline-block hover:text-white">Follow instagram</span>
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="py-[40px] border-t border-[#ffffff1a]">
                <Container>
                    <Row>
                        <Col md={3} className="sm:mb-[20px]">
                            <Link aria-label="homepage" to="/" className="sm:flex sm:justify-center">
                                <img alt="logo" src={props.logo} width="111" height="36" />
                            </Link>
                        </Col>
                        <Col md={6} className="flex justify-center items-center text-center sm:mb-[20px]">
                            <p className="mb-0">&copy; {new Date().getFullYear()} Litho is Proudly Powered by <a aria-label="themezaa" rel="noreferrer" href="https://www.themezaa.com/" className="hover:text-white" target="_blank"> ThemeZaa</a></p>
                        </Col>
                        <Col md={3} className="text-right sm:text-center">
                            <SocialIcons size="xs" theme="social-icon-style-01" className="justify-end sm:justify-center" iconColor={props.theme === "dark" ? "light" : "dark"} data={iconData} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </Footer>
    )
}

FooterStyle01.defaultProps = {
    data: FooterData,
    className: "bg-darkgray text-[#828282]",
    logo: "/assets/img/webp/logo-white.webp",
    theme: "light"
}

FooterStyle01.propTypes = {
    className: PropTypes.string,
    logo: PropTypes.string,
}

export default memo(FooterStyle01)
