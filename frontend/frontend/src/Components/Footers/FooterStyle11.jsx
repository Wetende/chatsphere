import React, { memo } from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'

// Components
import SocialIcons from '../SocialIcon/SocialIcons'
import { Footer } from './Footer'

//Data
const SocialIconData = [
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
        color: "#007bb6",
        link: "https://www.linkedin.com/",
        icon: "fab fa-linkedin-in"
    },
    {
        color: "#fe1f49",
        link: "https://www.instagram.com/",
        icon: "fab fa-instagram"
    },
    {
        color: "#1769ff",
        link: "https://www.behance.net/",
        icon: "fab fa-behance"
    }
]

const FooterStyle11 = (props) => {
    return (
        <Footer theme={props.theme} parallax={{ desktop: true, lg: false }} className={`${props.className ? ` ${props.className}` : ""} footer-style-11`}>
            <Container>
                <Row className="flex justify-center">
                    <Col lg={8} className="text-center">
                        <div className="mb-[3.5rem]">
                            <SocialIcons theme="social-icon-style-10 justify-center" className="mb-8 w-full" size="lg" iconColor="light" data={SocialIconData} />
                        </div>
                        <h4 className="font-serif -tracking-[2px] text-slateblue font-light mb-[10px] block">New creative ideas send us an email</h4>
                        <h4 className="font-serif font-semibold mb-28 text-[2.85rem] leading-[3.4rem]">
                            <a aria-label="mail" rel="noreferrer" className="border-none md:mb-[15px] no-underline text-gradient bg-gradient-to-r from-[#5065da] via-[#c557ad] to-[#e66176]" href="mailto:info@domain.com">info@domain.com</a>
                        </h4>
                        <p className="mb-0 uppercase text-sm">&copy; {new Date().getFullYear()} Litho is Proudly Powered by <a aria-label="themezaa" rel="noreferrer" className="text-themecolor font-serif underline underline-offset-[6px] font-medium text-sm inline-block" href="https://www.themezaa.com/" target="_blank"> ThemeZaa</a></p>
                    </Col>
                </Row>
            </Container>
        </Footer>
    )
}

export default memo(FooterStyle11)
