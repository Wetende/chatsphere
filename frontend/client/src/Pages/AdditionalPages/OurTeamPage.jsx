import React from 'react'

// Libraries
import { Link } from 'react-router-dom'
import { Autoplay, EffectFade, Keyboard } from "swiper/modules";
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";
import { m } from "framer-motion"
import { Link as ScrollTo } from "react-scroll"

// Components
import { TiltBox } from '../../Components/FancyText/FancyText'
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import CustomModal from '../../Components/CustomModal'
import { fadeIn } from '../../Functions/GlobalAnimations';
import Team from '../../Components/Team/Team';
import InteractiveBanners05 from '../../Components/InteractiveBanners/InteractiveBanners05';
import FooterStyle01 from '../../Components/Footers/FooterStyle01';
import Buttons from '../../Components/Button/Buttons'
import SideButtons from "../../Components/SideButtons";

// Data
import { InteractiveBannersData05 } from '../../Components/InteractiveBanners/InteractiveBannersData';

const TeamData = [
  {
    img: 'https://via.placeholder.com/800x875',
    name: 'JEMMY WATSON',
    designation: 'GRAPHIC DESIGNER',
    subtitle: 'Lorem ipsum is simply dummy text of the printing typesetting industry',
    social_links: [
      {
        title: 'facebook',
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f"
      },
      {
        title: 'dribbble',
        link: "https://www.dribbble.com",
        icon: "fa-brands fa-dribbble"
      },
      {
        title: 'twitter',
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter"
      },
      {
        title: 'instagram',
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram"
      },
    ]
  },
  {
    img: 'https://via.placeholder.com/800x875',
    name: 'ANNA SETHESIA',
    designation: 'DEVELOPMENT HEAD',
    subtitle: 'Lorem ipsum is simply dummy text of the printing typesetting industry',
    social_links: [
      {
        title: 'facebook',
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f"
      },
      {
        title: 'dribbble',
        link: "https://www.dribbble.com",
        icon: "fa-brands fa-dribbble"
      },
      {
        title: 'twitter',
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter"
      },
      {
        title: 'instagram',
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram"
      },
    ]
  },
  {
    img: 'https://via.placeholder.com/800x875',
    name: 'GAIL FORCEWIND',
    designation: 'PROJECT MANAGER',
    subtitle: 'Lorem ipsum is simply dummy text of the printing typesetting industry',
    social_links: [
      {
        title: 'facebook',
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f"
      },
      {
        title: 'dribbble',
        link: "https://www.dribbble.com",
        icon: "fa-brands fa-dribbble"
      },
      {
        title: 'twitter',
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter"
      },
      {
        title: 'instagram',
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram"
      },
    ]
  },
  {
    img: 'https://via.placeholder.com/800x875',
    name: 'NICK BOCKER',
    designation: 'HEAD OF DEVELOPER',
    subtitle: 'Lorem ipsum is simply dummy text of the printing typesetting industry',
    social_links: [
      {
        title: 'facebook',
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f"
      },
      {
        title: 'dribbble',
        link: "https://www.dribbble.com",
        icon: "fa-brands fa-dribbble"
      },
      {
        title: 'twitter',
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter"
      },
      {
        title: 'instagram',
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram"
      },
    ]
  },
  {
    img: 'https://via.placeholder.com/800x875',
    name: 'MONTY FRANKLIN',
    designation: 'JUNIOR DEVELOPER',
    subtitle: 'Lorem ipsum is simply dummy text of the printing typesetting industry',
    social_links: [
      {
        title: 'facebook',
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f"
      },
      {
        title: 'dribbble',
        link: "https://www.dribbble.com",
        icon: "fa-brands fa-dribbble"
      },
      {
        title: 'twitter',
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter"
      },
      {
        title: 'instagram',
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram"
      },
    ]
  },
  {
    img: 'https://via.placeholder.com/800x875',
    name: 'BRYAN MELENDEZ',
    designation: 'PRODUCT MANAGER',
    subtitle: 'Lorem ipsum is simply dummy text of the printing typesetting industry',
    social_links: [
      {
        title: 'facebook',
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f"
      },
      {
        title: 'dribbble',
        link: "https://www.dribbble.com",
        icon: "fa-brands fa-dribbble"
      },
      {
        title: 'twitter',
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter"
      },
      {
        title: 'instagram',
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram"
      },
    ]
  },
  {
    img: 'https://via.placeholder.com/800x875',
    name: 'LAURA CHARETTE',
    designation: 'FINANCIAL MANAGER',
    subtitle: 'Lorem ipsum is simply dummy text of the printing typesetting industry',
    social_links: [
      {
        title: 'facebook',
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f"
      },
      {
        title: 'dribbble',
        link: "https://www.dribbble.com",
        icon: "fa-brands fa-dribbble"
      },
      {
        title: 'twitter',
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter"
      },
      {
        title: 'instagram',
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram"
      },
    ]
  },
  {
    img: 'https://via.placeholder.com/800x875',
    name: 'JEMAS DOSSAN',
    designation: 'PROJECT MANAGER',
    subtitle: 'Lorem ipsum is simply dummy text of the printing typesetting industry',
    social_links: [
      {
        title: 'facebook',
        link: "https://www.facebook.com",
        icon: "fab fa-facebook-f"
      },
      {
        title: 'dribbble',
        link: "https://www.dribbble.com",
        icon: "fa-brands fa-dribbble"
      },
      {
        title: 'twitter',
        link: "https://www.twitter.com",
        icon: "fa-brands fa-twitter"
      },
      {
        title: 'instagram',
        link: "https://www.instagram.com",
        icon: "fa-brands fa-instagram"
      },
    ]
  },

]

const SwiperImgData = [
  {
    img: "https://via.placeholder.com/1920x730"
  },
  {
    img: "https://via.placeholder.com/1920x730"
  },
  {
    img: "https://via.placeholder.com/1920x730"
  }
]

const TestimonialsData = [
  {
    name: 'Herman Miller',
    content: 'There are design companies and then there are user experience, design, consulting, interface design.',
    img: 'https://via.placeholder.com/125x125',
    company: "ThemeZaa Design",
    rating: 5
  },
  {
    name: 'Alexander Harvard',
    content: 'I wanted to hire the best and after looking at several other companies, I knew Jacob was the perfect guy.',
    img: 'https://via.placeholder.com/125x125',
    company: "Microsoft Corporation",
    rating: 5
  },
  {
    name: 'Lindsay Swanson',
    content: 'Absolutely amazing theme, flexible and awesome design with possibilities. It s so easy to use and to customize.',
    img: 'https://via.placeholder.com/125x125',
    company: "Envato Market",
    rating: 5
  },
  {
    name: 'Jeremy Dupont',
    content: 'Simply the great designs and best theme for WooCommerce, loading fast, customisable and easy to use.',
    img: 'https://via.placeholder.com/125x125',
    company: "Google Marketing",
    rating: 5
  }
]


const OurTeamPage = (props) => {
  const swiperRef = React.useRef(null)

  return (
    <div style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav theme="light" expand="lg" menu="light" className="py-[0px] lg:px-[15px] md:px-0" containerClass="sm:px-0">
          <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
              <Navbar.Brand className="inline-block p-0 m-0">
                <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
              </Navbar.Brand>
            </Link>
          </Col>
          <div className="col-auto hidden order-last md:block">
            <Navbar.Toggle className="md:ml-[10px] sm:ml-0">
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
            </Navbar.Toggle>
          </div>
          <Navbar.Collapse className="col-auto px-0 justify-end">
            <Menu {...props} />
          </Navbar.Collapse>
          <Col className="col-auto text-right pe-0">
            <SearchBar className="pr-0 xs:pl-[15px]" />
            <HeaderLanguage className="xs:pl-[15px]" />
            <HeaderCart className="xs:pl-[15px]" style={{ "--base-color": "#0038e3" }} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <m.section className="overflow-hidden pt-[130px] pb-[100px] lg:py-[90px] md:py-[70px] sm:py-[50px] relative bg-cover bg-center bg-no-repeat bg-fixed lg:bg-local" style={{ backgroundImage: 'url(/assets/img/webp/our-team-bg2.webp)' }} {...fadeIn}>
        <Container fluid className="text-center">
          <Row>
            <Col className="text-center mb-28 z-0 lg:mb-12 md:mb-20">
              <TiltBox>
                <div className="mb-[20px] block"><span className="font-serif font-medium text-white uppercase tracking-[1px] text-sm bg-darkgray inline-block px-[20px] py-[5px]">We are litho highly creative team</span></div>
                <span className="font-serif title cover-background font-bold text-center text-[230px] leading-[230px] -tracking-[5px] uppercase bg-darkgray lg:text-[170px] lg:leading-[170px] md:text-[130px] md:leading-[130px] sm:text-[100px] sm:leading-[100px] xs:text-[55px] xs:leading-[55px] xs:-tracking-[1px]"
                  style={{ backgroundImage: `url(https://via.placeholder.com/1920x1091)` }}>Together
                </span>
              </TiltBox>
            </Col>
            <ScrollTo to="downsection" offset={0} delay={0} spy={true} smooth={true} duration={800} className="absolute justify-center bottom-[50px] left-1/2 w-[45px] px-0 flex h-[45px] -translate-x-1/2 sm:bottom-7 box-shadow-small rounded-full cursor-pointer">
              <i className="feather-arrow-down text-lg leading-[1] text-[#e05fc4] bg-white xs:p-[10px] rounded-full flex justify-center items-center"></i>
            </ScrollTo>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <section id="downsection" className="our-team-page-team py-[130px] lg:pt-[100px] lg:pb-[95px] md:pt-[70px] md:pb-[40px] sm:py-[50px] xs:pb-[25px] switch-tabs">
        <Container fluid className="px-[7%] lg:px-[3%]">
          <Team
            themeColor="light"
            overlay={["#0039e3cc", "#4132e0cc", "#5e28ddcc", "#741bd9cc", "#8600d4cc"]}
            theme='team-style-04'
            data={TeamData}
            grid="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 justify-center"
            carousel={false}
            carouselOption={{ slidesPerView: 3, spaceBetween: 30, loop: true, navigation: true, autoplay: { delay: 3000, disableOnInteraction: true }, pagination: { dynamicBullets: true, clickable: true } }} />
        </Container>
      </section>
      {/* Section Start */}

      {/* Section start */}
      <section className="pt-0 px-[7%] xl:px-[3%] md:px-[30px] sm:px-0 xs:px-0">
        <div className="bg-gradient-to-tr from-[#f5bb8d] via-[#ffaea8] to-[#f3aaca] rounded-[5px] overflow-hidden pt-36 md:pt-[72px] sm:pt-24">
          <Container>
            <Row className="justify-center items-center">
              <m.div className="font-medium text-darkgray font-serif pb-[100px] lg:pb-[70px] ml-[97px] lg:ml-[0px] md:text-center col-xl-5 col-lg-6 col-md-7 order-lg-2" {...{ ...fadeIn, transition: { delay: 0.5 } }}>
                <span className="mb-[35px] text-lg inline-block relative whitespace-nowrap border-b border-solid border-darkgray md:text-xmd">Awesomeness and creative people</span>
                <h4 className="-tracking-[.5px] mb-[45px] xs:w-[99%]">Teamwork is the ability work together toward a <span className="font-semibold">common vision</span></h4>
                <ScrollTo to="position-open" offset={0} delay={0} spy={true} smooth={true} duration={800}>
                  <Buttons ariaLabel="button" className="font-medium font-serif uppercase hover:text-white btn-expand" size="lg" color="#fff" themeColor="#232323" title="Join the people" />
                </ScrollTo>
              </m.div>
              <Col xl={{ offset: 1, span: 5 }} lg={{ span: 6, order: 1, offset: 0 }}>
                <m.img loading="lazy" src='https://via.placeholder.com/406x506' width="406" height="506" alt="Our Team" className="mx-auto" {...fadeIn} />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* Section end */}

      {/* Section Start */}
      <m.section className="overflow-hidden py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="items-end">
            <Col className="col-12 col-xl-3 col-lg-4 relative pt-8 md:mb-16">
              <span className="font-serif font-medium text-fastblue block mb-[20px]">Loved by our team</span>
              <h6 className="font-serif font-medium text-darkgray -tracking-[.5px] mb-14 lg:w-[90%]">What our employee are saying about us?</h6>
              <div className="flex">
                <div onClick={() => swiperRef.current.swiper.slidePrev()} className="btn-slider-next rounded-full flex justify-center items-center text-black hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] bg-white right-inherit left-[65px] h-[40px] border border-mediumgray w-[40px] cursor-pointer" >
                  <button className="text-xmd"><i className="feather-arrow-left"></i></button>
                </div>
                <div onClick={() => swiperRef.current.swiper.slideNext()} className="btn-slider-prev rounded-full flex justify-center items-center text-black right-inherit h-[40px] w-[40px] hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-mediumgray ml-[10px] cursor-pointer" >
                  <button className="text-xmd"><i className="feather-arrow-right"></i></button>
                </div>
              </div>
            </Col>
            <Col className="col-12 col-lg-8 offset-xl-1">
              <Swiper
                className="black-move swiper-pagination-medium h-full min-w-[1170px] md:min-w-full"
                modules={[Autoplay]}
                ref={swiperRef}
                spaceBetween={30}
                slidesPerView={1}
                observer={true}
                observeParents={true}
                loop={true}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                }}
                keyboard={{
                  enabled: true,
                  onlyInViewport: true
                }}
                breakpoints={{ 992: { slidesPerView: 3 }, 768: { slidesPerView: 2 } }}
              >
                {
                  TestimonialsData.map((item, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="py-12 px-12 px-mb-14 bg-white border border-mediumgray rounded-[6px] md:py-8 md:px-[2.5rem]">
                          <div className="flex">
                            <div className="mr-[20px]">
                              <img loading="lazy" className="rounded-full w-[65px] h-[65px]" src={item.img} alt="avtar" />
                            </div>
                            <div className="">
                              <div className="mb-[15px] text-xxs text-[#ff9c00]">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                              </div>
                              <div className="text-darkgray text-md font-serif font-medium leading-[12px]">{item.name}</div>
                              {item.company && <span className="text-sm">{item.company}</span>}
                            </div>
                          </div>
                          <div>
                            <p className="mt-[30px]">{item.content}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="overflow-hidden rounded-[5px] relative py-0 mx-[7%] xl:mx-[3%] md:mx-[2.5rem] sm:m-0" {...fadeIn}>
        <div className="relative">
          {/* Modal Component Start */}
          <CustomModal.Wrapper
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
            modalBtn={
              <Buttons type="submit" className="btn-sonar border-0 !w-[120px] !h-[120px] sm:!w-[80px] sm:!h-[80px]" themeColor="#232323" color="#fff" size="lg" icon="icon-control-play !ml-[13px] text-[34px] lg:!ml-[10px] sm:text-[28px]" />
            } >
            <div className="w-[1020px] max-w-full relative rounded mx-auto">
              <div className="fit-video">
                <iframe width="100%" height="100%" className="shadow-[0_0_8px_rgba(0,0,0,0.06)]" controls src="https://www.youtube.com/embed/g0f_BRYJLJE?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
              </div>
            </div>
          </CustomModal.Wrapper>
          {/* Modal Component End */}

          <Swiper
            modules={[Autoplay, EffectFade, Keyboard]}
            effect="fade"
            className="relative h-[700px] md:h-[550px] sm:h-[350px]"
            loop={true}
            keyboard={{ enabled: true, onlyInViewport: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            fadeEffect={{ crossFade: true }}
            slidesPerView={1}>
            {
              SwiperImgData.map((item, i) => {
                return (
                  <SwiperSlide key={i} className="h-full">
                    <img loading="lazy" alt='contac-us' src={item.img} className="cover-background my-0 mx-auto w-full h-full object-cover" />
                  </SwiperSlide>)
              })
            }
          </Swiper>
        </div>
      </m.section>
      {/* Section End */}

      {/* Section start*/}
      <section id="position-open" className="py-[130px] lg:pt-[90px] lg:pb-[80px] md:pt-[75px] md:pb-[100px] sm:pt-[50px]">
        <Container>
          <m.div className="row justify-center" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
            <Col lg={5} sm={7} className="col-12 text-center mb-20 sm:mb-12">
              <span className="font-serif font-medium text-fastblue block mb-[15px]">Opening positions</span>
              <h5 className="font-serif font-medium text-darkgray inline-block -tracking-[.5px]">We talk a lot about hope helping and teamwork</h5>
            </Col>
          </m.div>
          <Row className="justify-center">
            <Col>
              <InteractiveBanners05
                grid="row-cols-1 justify-center gap-y-[5.5rem] xs:px-0"
                data={InteractiveBannersData05}
                animation={fadeIn}
                animationDelay={0.3}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section end */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="bg-[#262b35] text-slateblue" />
      {/* Footer End */}


    </div>
  )
}

export default OurTeamPage