import React, { memo } from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PropTypes } from "prop-types";

// Components
import SocialIcons from '../SocialIcon/SocialIcons';
import FooterMenu, { Footer } from './Footer';

//Data
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
const FooterStyle06 = (props) => {
    return (
        <Footer theme={props.theme} className={`${props.className}${props.theme ? ` ${props.theme}` : ""}`}>
            <div className="py-[5%] lg:py-[8%] md:py-[50px] sm:py-[50px]">
                <Container>
                    <Row md={4} className="justify-center gap-y-10">
                        <FooterMenu data={FooterData.slice(0, 4)} md={3} sm={6} className="xl:px-[15px] md:mb-0 xs:mb-[25px] last:mb-0" titleClass="uppercase" />
                    </Row>
                </Container>
            </div>
            <div className={`py-[40px] border-t  ${props.theme === "light" ?  "border-mediumgray" : "border-[#ffffff1a]"}`}>
                <Container>
                    <Row>
                        <Col md={3} className="sm:mb-[20px]">
                            <Link aria-label="link" to="/" className="flex justify-start sm:justify-center">
                                <img src={props.logo} alt="logo" width="111" height="36" />
                            </Link>
                        </Col>
                        <Col md={6} className="flex justify-center items-center text-center sm:mb-[20px]">
                            <p className="mb-0">&copy; {new Date().getFullYear()} Litho is Proudly Powered by <a aria-label="themezaa" rel="noreferrer" className="font-sans underline underline-offset-4 font-medium text-themecolor inline-block" href="https://www.themezaa.com/" target="_blank"> ThemeZaa</a></p>
                        </Col>
                        <Col md={3} className="xs:text-center">
                            <SocialIcons size="xs" theme="social-icon-style-01" className="justify-end sm:justify-center" iconColor={props.theme === "dark" ? "light" : "dark"} data={iconData} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </Footer>
    )
}

FooterStyle06.defaultProps = {
    data: FooterData,
    logo: "/assets/img/webp/logo-white.webp"
}

FooterStyle06.propTypes = {
    className: PropTypes.string,
    logo: PropTypes.string,
}

export default memo(FooterStyle06)