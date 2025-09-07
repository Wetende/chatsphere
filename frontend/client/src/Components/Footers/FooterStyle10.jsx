import React, { memo } from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PropTypes } from "prop-types";

// Components
import FooterMenu, { Footer } from './Footer';

// Data
import FooterData from './FooterData';

const FooterStyle10 = (props) => {
    return (
        <Footer theme={props.theme} parallax={{ desktop: true, md : false }} className={`bg-no-repeat bg-cover bg-[center_center]${props.className ? ` ${props.className}` : ""}`} style={{ backgroundImage: "url(https://via.placeholder.com/1920x630)" }}>
            <Container className="py-[6%] lg:py-[7%] md:py-[50px]">
                <Row md={4} className="justify-center md:gap-y-0 sm:gap-y-[40px] xs:gap-y-[30px]">
                    <FooterMenu data={FooterData.slice(0, 4)} md={3} sm={6} titleClass="uppercase leading-[20px] text-md tracking-[1px]" />
                </Row>
            </Container>
            <Container className="pb-[6%] pt-[1%]">
                <Row>
                    <Col sm={4} className="text-start xs:flex xs:justify-center xs:mb-[20px]">
                        <Link aria-label="link" to="/">
                            <img src={props.logo} alt="logo" width="111" height="36" />
                        </Link>
                    </Col>
                    <Col sm={8} className="text-right xs:text-center">
                        <p className="mb-0">&copy; {new Date().getFullYear()} Litho is Proudly Powered by <a aria-label="themezaa" rel="noreferrer" className="text-themecolor font-sans underline underline-offset-4 font-normal text-base" href="https://www.themezaa.com/" target="_blank"> ThemeZaa</a></p>
                    </Col>
                </Row>
            </Container>
        </Footer>
    )
}

FooterStyle10.defaultProps = {
    data: FooterData,
    logo: "/assets/img/webp/logo-gradient-sky-blue-pink-white.webp"
}

FooterStyle10.propTypes = {
    className: PropTypes.string,
    logo: PropTypes.string,
}

export default memo(FooterStyle10)