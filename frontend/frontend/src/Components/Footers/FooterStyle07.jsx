import React, { memo } from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PropTypes } from "prop-types";

// Components
import FooterMenu, { Footer } from './Footer';

// Data
import FooterData from './FooterData';

const FooterStyle07 = (props) => {
    return (
        <Footer className={`${props.className ? ` ${props.className}` : ""}`} theme={props.theme}>
            <div className="py-[7%] lg:py-[8%] sm:py-[50px]">
                <Container>
                    <Row md={4} sm={3} className="justify-between md:justify-center">
                        <Col className="m-0 md:text-center sm:text-start" lg={{ offSet: 0, span: 3, order: 0 }} sm={{ span: 6, order: 5, offSet: 2 }} md={{ span: 4, offset: 0, order: 5 }} xs={{ span: 12, order: 5, offSet: 2 }}>
                            <Link to="/" className="text-slateblue mb-[15px] mt-[5px] inline-block">
                                {props.logo && <img loading="lazy" src={props.logo} alt="logo" width="111" height="36" />}
                            </Link>
                            <p className="mb-[25px] text-slateblue sm:w-[90%] md:mb-[15px] md:text-center sm:text-start">We create digital experiences for brands companies by using creativity.</p>
                            <p>© Copyright {new Date().getFullYear()} <Link to="/" className="underline underline-offset-4 text-white font-normal">Litho</Link></p>
                        </Col>
                        <FooterMenu data={FooterData.slice(0, 4)} lg={{ span: 2, offSet: 1, order: 0 }} md={{ span: 3, order: 0 }} sm={{ span: 4, offSet: 1, order: 2 }} className="xl:px-[15px] md:mb-[40px] xs:mb-[25px]" titleClass="capitalize" />
                    </Row>
                </Container>
            </div>
        </Footer>
    )
}

FooterStyle07.defaultProps = {
    data: FooterData,
    logo: "/assets/img/webp/logo-gradient-sky-blue-pink-white.webp"
}

FooterStyle07.propTypes = {
    className: PropTypes.string,
    logo: PropTypes.string,
}

export default memo(FooterStyle07)