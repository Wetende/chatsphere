import React, { useState } from 'react'

// Libraries
import { Col, Container, Nav, Navbar, Row, Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Form, Formik } from 'formik';
import { m, AnimatePresence } from 'framer-motion';
import { Navigation, Thumbs } from "swiper/modules";
import Lightbox from 'react-18-image-lightbox';

// Components
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from '../../Components/Header/Header'
import Buttons from '../../Components/Button/Buttons'
import SocialIcons from '../../Components/SocialIcon/SocialIcons';
import Lists from '../../Components/Lists/Lists';
import { fadeIn } from '../../Functions/GlobalAnimations';
import { Input } from '../../Components/Form/Form'
import { ContactFormStyle02Schema } from '../../Components/Form/FormSchema';
import MessageBox from '../../Components/MessageBox/MessageBox';
import ShopWide from '../../Components/Products/ShopWide';
import CustomModal from '../../Components/CustomModal';
import FooterStyle01 from "../../Components/Footers/FooterStyle01";
import { resetForm } from "../../Functions/Utilities";
import SideButtons from "../../Components/SideButtons";

// Data
import { shopWideData } from '../../Components/Products/ProductData';

const swiperData = [
  {
    img: "https://via.placeholder.com/600x765"
  },
  {
    img: "https://via.placeholder.com/600x765"
  },
  {
    img: "https://via.placeholder.com/600x765"
  },
  {
    img: "https://via.placeholder.com/600x765"
  },
  {
    img: "https://via.placeholder.com/600x765"
  },
  {
    img: "https://via.placeholder.com/600x765"
  }
]

const SocialIconsData = [
  {
    color: "#3b5998",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "#00aced",
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  },
  {
    color: "#0077b5",
    link: "https://www.linkedin.com/",
    icon: "fab fa-linkedin-in"
  },
  {
    color: "#ff0084",
    link: "https://www.pinterest.com/",
    icon: "fab fa-pinterest-p"
  }
]

const ListData = [
  {
    content: "Made from soft yet durable 100% organic cotton twill"
  },
  {
    content: "Front and back yoke seams allow a full range of motion"
  },
  {
    content: "Comfortable nylon-bound elastic cuffs seal in warmth"
  },
  {
    content: "Hem adjusts by pulling cord in handwarmer pockets"
  },
  {
    content: "Interior storm flap and zipper garage at chin for comfort"
  }
]

const SingleProduct = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0)
  const swiperRef = React.useRef(null)
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  import("../../Functions/Utilities").then(module => {
    module.InputField(1);
  })

  const handleClick = (i) => {
    setIsOpen(true)
    setPhotoIndex(i)
  }

  return (
    <div className="single-product" style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav fluid="fluid" theme="light" bg="white" menu="light" className="px-[35px] py-[0px] md:px-0 border-b border-b-[#0000001a]" containerClass="sm:px-0">
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
            <SearchBar className="pr-0 xs:p-0" />
            <HeaderLanguage />
            <HeaderCart style={{ "--base-color": "#0038e3" }} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] overflow-hidden">
        <Container>
          <Row>
            <Col className="col-12 flex flex-column flex-lg-row align-items-md-center" >
              <div className="w-[60%] md:w-full">
                <Row>
                  <Col lg={{ span: 9, order: 2 }} className="relative product-image md:mb-[10px] px-lg-0">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                      }}
                      spaceBetween={10}
                      navigation={true}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[Navigation, Thumbs]}
                      className="mySwiper2 w-full product-images-box">
                      {
                        swiperData.map((item, i) => {
                          return (
                            <SwiperSlide key={i} onClick={() => handleClick(i)}>
                              <img src={item.img} alt="products" width="512" height="652.8" className="w-full" />
                            </SwiperSlide>
                          )
                        })
                      }
                    </Swiper>

                    {isOpen && (
                      <Lightbox
                        imageCaption={`${photoIndex + 1} of ${swiperData.length}`}
                        mainSrc={swiperData[photoIndex].img}
                        onCloseRequest={() => setIsOpen(false)}
                        nextSrc={swiperData[(photoIndex + 1) % swiperData.length]}
                        prevSrc={swiperData[(photoIndex + swiperData.length - 1) % swiperData.length]}
                        onMovePrevRequest={() =>
                          setPhotoIndex((photoIndex + swiperData.length - 1) % swiperData.length)
                        }
                        onMoveNextRequest={() =>
                          setPhotoIndex((photoIndex + 1) % swiperData.length)
                        }
                        reactModalProps={{ contentLabel: "Example Modal" }}
                      />
                    )}
                  </Col>
                  <Col lg={{ order: 1, span: 3 }} className="relative single-product-thumb flex justify-center md:mb-[50px] sm:mb-[40px]">
                    <Swiper
                      ref={swiperRef}
                      direction="horizontal"
                      onSwiper={setThumbsSwiper}
                      spaceBetween={15}
                      slidesPerView={3.2}
                      modules={[Navigation, Thumbs]}
                      navigation={{ el: ".swiper-thumb-next-prev" }}
                      className="mySwiper overflow-hidden absolute h-full pb-[40px] md:pb-0 md:relative"
                      breakpoints={{
                        992: {
                          direction: "vertical"
                        }
                      }}
                    >
                      {
                        swiperData.map((item, i) => {
                          return (
                            <SwiperSlide className="overflow-hidden" key={i}>
                              <img loading="lazy" src={item.img} alt="products" width="" height="" className="w-full" />
                            </SwiperSlide>
                          )
                        })
                      }
                    </Swiper>
                    {/* <div className="swiper-thumb-next-prev text-center"> */}
                    {/* <div className="swiper-thumb-prev" onClick={() => swiperRef.current.swiper.slidePrev()}>
                        <i className="fa fa-chevron-up"></i>
                      </div>
                      <div className="swiper-thumb-next" onClick={() => swiperRef.current.swiper.slideNext()}>
                        <i className="fa fa-chevron-down"></i>
                      </div> */}
                    {/* </div> */}
                  </Col>
                </Row>
              </div>
              <div className="w-[40%] md:w-full product-summary pl-28 lg:pl-20 md:pl-0">
                <div className="breadcrumb text-sm p-0">
                  <ul>
                    <li><Link aria-label="homepage-link" to="/">Home</Link></li>
                    <li><Link aria-label="shop-link" to="/shop/shop-wide">Shop</Link></li>
                    <li>Men hooded</li>
                  </ul>
                </div>
                <div className="flex items-center my-14 md:my-6">
                  <div className="flex-grow">
                    <div className="text-darkgray font-medium text-xlg font-serif mb-[5px]">Men hooded</div>
                    <span className="text-xmd">
                      <del className="mr-[8px]">$480.00</del>
                      £50.00</span>
                  </div>
                  <div className="text-end leading-[30px]">
                    <div><Link to="#" className="tracking-[3px]" aria-label="product-rating">
                      <i className="fas fa-star text-xxs text-[#ff9c00]"></i>
                      <i className="fas fa-star text-xxs text-[#ff9c00]"></i>
                      <i className="fas fa-star text-xxs text-[#ff9c00]"></i>
                      <i className="fas fa-star text-xxs text-[#ff9c00]"></i>
                      <i className="fas fa-star text-xxs text-[#ff9c00]"></i></Link>
                    </div>
                    <span className="text-sm"><span className="text-darkgray">SKU: </span>8552635</span>
                  </div>
                </div>
                <p>Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been the standard dummy text typesetting industry.</p>
                <div className="mt-16">
                  <div className="mb-[20px] flex items-center">
                    <label className="text-darkgray text-xs font-medium font-serif uppercase w-[60px] mr-[3px]">color</label>
                    <ul className="font-serif flex shop-color">
                      <li>
                        <input className="hidden" type="radio" id="color-1" value="1" name="color" defaultChecked />
                        <label htmlFor="color-1"><span className="after:text-white after:z-[12] after:text-[500px]" style={{ backgroundColor: "#363636" }}></span></label>
                      </li>
                      <li>
                        <input className="hidden" type="radio" id="color-2" value="2" name="color" />
                        <label htmlFor="color-2"><span style={{ backgroundColor: "#657fa8" }}></span></label>
                      </li>
                      <li>
                        <input className="hidden" type="radio" id="color-3" value="3" name="color" />
                        <label htmlFor="color-3"><span style={{ backgroundColor: "#936f5e" }}></span></label>
                      </li>
                      <li>
                        <input className="hidden" type="radio" id="color-4" value="4" name="color" />
                        <label htmlFor="color-4"><span style={{ backgroundColor: "#97a27f" }}></span></label>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-16 flex items-center">
                    <label className="text-darkgray text-xs font-medium font-serif uppercase w-[60px] mr-[3px]">Size</label>
                    <ul className="text-xs flex shop-size">
                      <li>
                        <input className="d-none" type="radio" id="size-1" value="1" name="size" defaultChecked />
                        <label htmlFor="size-1"><span>S</span></label>
                      </li>
                      <li>
                        <input className="d-none" type="radio" id="size-2" value="2" name="size" />
                        <label htmlFor="size-2"><span>M</span></label>
                      </li>
                      <li>
                        <input className="d-none" type="radio" id="size-3" value="3" name="size" />
                        <label htmlFor="size-3"><span>L</span></label>
                      </li>
                    </ul>
                    <CustomModal.Wrapper
                      closeBtnIn={true}
                      closeBtnOuter={false}
                      className="size-chart"
                      modalBtn={<label className="uppercase font-serif text-xs text-decoration-line-bottom">Size Guide</label>}
                    >
                      <div className="relative w-full mx-auto bg-white p-20 xl:w-[70%] md:w-[80%] md:p-16 xs:w-[95%] xs:p-12 size-chart-popup">
                        <CustomModal.Close className="close-btn absolute top-0 right-0 text-[#333]">
                          <button title="Close (Esc)" type="button" className="border-none text-[30px] font-light w-[44px] h-[44px]">×</button>
                        </CustomModal.Close>
                        <div className="table-style-01">
                          <table>
                            <tbody>
                              <tr className="font-serif bg-darkgray font-medium text-white">
                                <th>SIZE</th>
                                <th>S</th>
                                <th>M</th>
                                <th>L</th>
                                <th>XL</th>
                                <th>XXL</th>
                                <th>2XL</th>
                                <th>3XL</th>
                              </tr>
                              <tr>
                                <td>Collar</td>
                                <td>14</td>
                                <td>15</td>
                                <td>16</td>
                                <td>17</td>
                                <td>18</td>
                                <td>19</td>
                                <td>20</td>
                              </tr>
                              <tr className="bg-lightgray">
                                <td>Shoulder</td>
                                <td>16</td>
                                <td>17</td>
                                <td>18</td>
                                <td>19</td>
                                <td>20</td>
                                <td>21</td>
                                <td>22</td>
                              </tr>
                              <tr>
                                <td>Chest, waist, hips</td>
                                <td>28-29</td>
                                <td>30-31</td>
                                <td>32-33</td>
                                <td>34-35</td>
                                <td>36-37</td>
                                <td>38-39</td>
                                <td>40-41</td>
                              </tr>
                              <tr className="bg-lightgray">
                                <td>Cuff</td>
                                <td>9</td>
                                <td>9.5</td>
                                <td>10</td>
                                <td>10.5</td>
                                <td>11</td>
                                <td>11.5</td>
                                <td>12</td>
                              </tr>
                              <tr>
                                <td>Short-sleeve length</td>
                                <td>10</td>
                                <td>10.5</td>
                                <td>11</td>
                                <td>11.5</td>
                                <td>12</td>
                                <td>12.5</td>
                                <td>13</td>
                              </tr>
                              <tr className="bg-lightgray">
                                <td>Long-sleeve length</td>
                                <td>23</td>
                                <td>23.5</td>
                                <td>24</td>
                                <td>24.5</td>
                                <td>25</td>
                                <td>25.5</td>
                                <td>26</td>
                              </tr>
                              <tr>
                                <td>Arm Hole</td>
                                <td>22</td>
                                <td>22.5</td>
                                <td>32</td>
                                <td>23.5</td>
                                <td>24</td>
                                <td>24.5</td>
                                <td>25</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </CustomModal.Wrapper>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="mr-[20px] quantity">
                      <input type="button" defaultValue="-" className="qty-minus qty-btn" />
                      <input className="input-text qty-text" type="" name="quantity" />
                      <input type="button" defaultValue="+" className="qty-plus qty-btn" />
                    </div>
                    <Buttons ariaLabel="add-to-cart" onClick={e => e.preventDefault()} className="btn-fill font-medium font-serif rounded-none uppercase" themeColor="#232323" color="#fff" size="md" title="add to cart" />
                    <div className="mt-[25px] w-full">
                      <Link aria-label="add-to-wishlist" onClick={e => e.preventDefault()} to="#" className="uppercase text-xs font-serif mr-[25px] font-medium"><i className="feather-heart align-middle mr-[5px]"></i>Add to wishlist</Link>
                      <Link to="#" onClick={e => e.preventDefault()} aria-label="add-to-compare" className="uppercase text-xs font-serif mr-[20px] font-medium "><i className="feather-shuffle align-middle mr-[5px]"></i>Add to compare</Link>
                    </div>
                  </div>
                  <div className="flex font-serif mt-16 items-center">
                    <div className="flex-grow">
                      <span className="uppercase text-xs font-medium text-darkgray block">Tags:
                        <Link to="#" aria-label="product" className="font-normal text-[#828282] ml-[5px]">Lather bag</Link>
                      </span>
                    </div>
                    <SocialIcons theme="social-icon-style-01" className="justify-center" size="xs" iconColor="dark" data={SocialIconsData} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="border-mediumgray pt-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container fluid>
          <Row>
            <Col>
              <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
                <Row className="tab-style-07">
                  <Col lg={12} className="p-0">
                    <Nav className="justify-center uppercase font-serif font-medium text-center cursor-pointer border-b border-t border-solid border-mediumgray mb-36 md:flex-nowrap md:mb-[72px] sm:mb-[66px] sm:border-b-0 xs:mb-[35px]">
                      <Nav.Item>
                        <Nav.Link className="block text-darkgray border-b-[3px] border-solid border-transparent py-[30px] px-[40px] mb-0" eventKey={0} >Description</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className="block text-darkgray border-b-[3px] border-solid border-transparent py-[30px] px-[40px] mb-0" eventKey={1} >Additional information</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link className="block text-darkgray border-b-[3px] border-solid border-transparent py-[30px] px-[40px] mb-0" eventKey={2} >Reviews (2)</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col lg={12} className="p-0">
                    <Container>
                      <Col>
                        <Tab.Content>
                          <Tab.Pane eventKey={0} >
                            <Row className="items-center">
                              <Col xl={5} lg={6} className="md:mb-[50px]">
                                <p className="mb-[25px]">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the ‘s standard dummy text. Lorem ipsum has been the industry’s standard dummy text ever since. Lorem ipsum is simply dummy text. Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
                                <Lists theme="list-style-04" data={ListData} animation={fadeIn} />
                              </Col>
                              <Col lg={6} xl={{ offset: 1 }}>
                                <img loading="lazy" width="564" height="564" src="https://via.placeholder.com/800x800" alt="products" />
                              </Col>
                            </Row>
                          </Tab.Pane>
                          <Tab.Pane eventKey={1}>
                            <Row className="tems-center">
                              <Col>
                                <table className="w-full">
                                  <tbody>
                                    <tr className="border-b border-[#e8e8e8] py-[10px] px-[15px]">
                                      <th className="text-darkgray font-medium w-[150px] px-[15px]">Color</th>
                                      <td className="py-[10px] px-[15px]">Black, Blue, Brown, Red, Silver</td>
                                    </tr>
                                    <tr className="bg-lightgray border-b border-[#e8e8e8] py-[10px] px-[15px]">
                                      <th className="text-darkgray font-medium w-[150px] px-[15px]">Size</th>
                                      <td className="py-[10px] px-[15px]">L, M, S, XL</td>
                                    </tr>
                                    <tr className="border-b border-[#e8e8e8] ">
                                      <th className="text-darkgray font-medium w-[150px] px-[15px]">Style/Type</th>
                                      <td className="py-[10px] px-[15px]">Sports, Formal</td>
                                    </tr>
                                    <tr className="bg-lightgray border-b border-[#e8e8e8] ">
                                      <th className="text-darkgray font-medium w-[150px] px-[15px]">Lining</th>
                                      <td className="py-[10px] px-[15px]">100% polyester taffeta with a DWR finish</td>
                                    </tr>
                                    <tr>
                                      <th className="text-darkgray font-medium w-[150px] px-[15px]">Material</th>
                                      <td className="py-[10px] px-[15px]">Lather, Cotton, Silk</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </Col>
                            </Row>
                          </Tab.Pane>
                          <Tab.Pane eventKey={2}>
                            <Row className="justify-center mb-[5.5rem]">
                              <Col xs={12} lg={10}>
                                <div className="flex w-full md:items-start sm:block">
                                  <div className="w-[75px] sm:w-[50px] sm:mb-[10px]">
                                    <img src="https://via.placeholder.com/125x125" width="" height="" className="rounded-full w-[95%] sm:w-full" alt="" />
                                  </div>
                                  <div className="w-full pl-[25px] sm:pl-0">
                                    <Link to="/shop/single-product" aria-label='button' className="text-darkgray hover:text-fastblue font-serif font-medium text-md">Herman Miller</Link>
                                    <span className="text-[#fd961e] text-xs float-end tracking-[2px]">
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                    </span>
                                    <div className="text-md text-spanishgray mb-[15px]">17 July 2020, 6:05 PM</div>
                                    <p className="w-[85%]">Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the make a type specimen book.</p>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <Row className="justify-center">
                              <Col lg={10} className="mb-16">
                                <h6 className="font-serif text-darkgray font-medium mb-[5px]">Add a review</h6>
                                <div className="mb-[5px]">Your email address will not be published. Required fields are marked
                                  <span className="text-[#fb4f58]">*</span></div>
                              </Col>
                            </Row>
                            <Row className="justify-center">
                              <Col lg={10}>
                                <Formik
                                  initialValues={{ name: '', email: '' }}
                                  validationSchema={ContactFormStyle02Schema}
                                  onSubmit={async (values, actions) => {
                                    await new Promise((r) => setTimeout(r, 500));
                                    resetForm(actions)
                                  }}>
                                  {({ isSubmitting, status }) => (
                                    <Form className="row mb-[30px]">
                                      <Col md={6} sm={12} xs={12}>
                                        <Input showErrorMsg={false} label={<span className="inline-block mb-[15px]">Your name <span className="text-[#fb4f58]">*</span> </span>} type="text" name="name" labelClass="mb-[25px]" className="rounded-[5px] py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Enter your name" />
                                      </Col>
                                      <Col md={6} sm={12} xs={12}>
                                        <Input showErrorMsg={false} label={<span className="inline-block mb-[15px]">Your email address <span className="text-[#fb4f58]">*</span> </span>} type="email" name="email" labelClass="mb-[25px]" className="rounded-[5px] py-[15px] px-[20px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Enter your email" />
                                      </Col>
                                      <Col sm={12} xs={12} className="mb-[30px]">
                                        <label className="mb-[15px]">Your rating <span className="text-[#fb4f58]">*</span></label>
                                        <span className="text-[#fd961e] text-xs block">
                                          <i className="far fa-star"></i>
                                          <i className="far fa-star"></i>
                                          <i className="far fa-star"></i>
                                          <i className="far fa-star"></i>
                                          <i className="far fa-star"></i>
                                        </span>
                                      </Col>
                                      <Col md={12} sm={12} xs={12}>
                                        <label className="mb-[15px]">Your comment</label>
                                        <textarea className="mb-[2.5rem] rounded-[4px] py-[15px] px-[20px] h-[120px] w-full bg-transparent border border-[#dfdfdf] text-md resize-none" rows="6" name="comment" placeholder="Enter your comment"></textarea>
                                      </Col>
                                      <Col>
                                        <Buttons type="submit" className={`tracking-[0.5px] btn-fill rounded-[2px] font-medium uppercase${isSubmitting ? " loading" : ""}`} themeColor="#232323" size="md" color="#fff" title="submit" />
                                      </Col>
                                      <AnimatePresence>
                                        {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="mt-[20px] text-center py-[10px]" theme="message-box01" variant="success" message="Your message has been sent successfully!" /></m.div>}
                                      </AnimatePresence>
                                    </Form>
                                  )}
                                </Formik>
                              </Col>
                            </Row>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Container>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="border-t border-mediumgray py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="row justify-center">
            <Col lg={5} md={6} className="font-serif font-medium text-center mb-16 sm:mb-8">
              <span className="uppercase inline-block mb-[5px]">You may also like</span>
              <h5 className="text-darkgray -tracking-[.5px]">Related products</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="xs:px-0">
              <ShopWide filter={false} grid="grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large text-center" data={shopWideData.slice(0, 4)} />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Footer Start */}
      <FooterStyle01 theme="dark" className="text-slateblue bg-[#262b35]" />
      {/* Footer End */}
    </div>
  )
}

export default SingleProduct