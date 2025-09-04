import React, { useEffect, useState } from 'react'

// Libraries
import { Formik } from 'formik';
import { Link } from 'react-router-dom'
import { Accordion, Col, Collapse, Container, Form, Navbar, Row } from 'react-bootstrap'
import { m } from 'framer-motion'

// Components
import { Header, HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from "../../Components/Header/Header";
import Buttons from '../../Components/Button/Buttons'
import FooterStyle01 from '../../Components/Footers/FooterStyle01';
import { Input } from '../../Components/Form/Form'
import { ContactFormStyle01Schema } from '../../Components/Form/FormSchema';
import { fadeIn } from "../../Functions/GlobalAnimations";
import SideButtons from "../../Components/SideButtons";
import { resetForm } from '../../Functions/Utilities';

const Checkout = (props) => {

  const [isCustomerCollapse, setIsCustomerCollapse] = useState(false)
  const [isCoupen, setIsCoupen] = useState(false)
  const [isCreateCollapse, setIsCreateCollapse] = useState(false)
  const [isShipCollapse, setIsShipCollapse] = useState(false)

  useEffect(() => {
    let label = document.querySelectorAll(".active-accordion")
    label.forEach(item => {
      item.addEventListener('click', () => {
        item.querySelector('a').click()
      })
    })
  }, [])

  return (
    <div className="checkout-page" style={props.style}>
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav fluid="fluid" theme="light" bg="white" menu="light" className="px-[35px] py-[0px] md:px-0" containerClass="sm:px-0">
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
          <Col className="col-auto text-right pe-0 !pl-[12px]">
            <SearchBar className="pr-0 xs:p-0" />
            <HeaderLanguage />
            <HeaderCart style={{ "--base-color": "#0038e3" }} />
          </Col>
        </HeaderNav>
      </Header>
      {/* Header End */}
      <SideButtons />
      {/* Section Start */}
      <section className="bg-lightgray py-[25px] page-title-small p-[130px] lg:px-0 xs:px-0">
        <Container>
          <Row className="items-center justify-center">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-lg text-black font-medium mb-0 md:text-center">Checkout</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb justify-end text-sm font-serif mb-0 md:mt-[10px] md:justify-center">
              <ul className="xs:text-center">
                <li><Link aria-label="checkout" to="/" className="hover:text-fastblue">Home</Link></li>
                <li><Link aria-label="checkout" to="#" className="hover:text-fastblue">Shop</Link></li>
                <li>Checkout</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <m.section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col>
              <div className="justify-center items-center pb-[10px] text-center">
                <i className="feather-user text-fastblue mr-[10px]"></i>
                <span className="text-darkgray font-serif">Returning customer?&nbsp;</span>
                <a className="accordion-toggle text-darkgray hover:text-darkgray" onClick={(e) => (e.preventDefault(), setIsCustomerCollapse(!isCustomerCollapse))}><span className="font-serif border-b border-black">Click here to login</span></a>
              </div>
              <Collapse in={isCustomerCollapse}>
                <div id="collapseOne">
                  <div className="w-[40%] mx-auto my-[4.5rem] text-start lg:w-[50%] sm:w-full">
                    <p className="mb-[25px]">If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the billing section.</p>
                    <Row className="mb-[10px] text-start">
                      <Formik
                        initialValues={{ name: '', email: '', phone: '', comment: '' }}
                        validationSchema={ContactFormStyle01Schema}
                        onSubmit={async (values, actions) => {
                          await new Promise((r) => setTimeout(r, 500));
                          // alert(JSON.stringify(values, null, 2));
                          actions.resetForm()
                          actions.setStatus(true)
                          setTimeout(() => actions.setStatus(false), 5000)
                        }}
                      >
                        <Form className="flex">
                          <Col className="col-6 pr-[15px]">
                            <label className="mb-[15px]">Username or email <span className="text-red-500">*</span></label>
                            <Input showErrorMsg={false} name="email" type="email" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Enter your email" labelClass="mb-[25px]" />
                          </Col>
                          <Col className="col-6  pl-[15px]">
                            <label className="mb-[15px]">Password<span className="text-red-500">*</span></label>
                            <Input showErrorMsg={false} name="password" type="password" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Entre your password" labelClass="mb-[25px]" />
                          </Col>
                        </Form>
                      </Formik>
                    </Row>
                    <span className="block w-full items-center mb-[25px]">
                      <input className="inline w-auto mb-0 mr-[10px]" type="checkbox" name="checkbox" />
                      <span>Remember me</span>
                    </span>
                    <Buttons href="add_link" className="btn-fill w-full font-medium mb-[20px] font-serif rounded-none uppercase md:mb-[15px]" themeColor="#232323" color="#fff" size="md" title="Login" />
                    <div className="text-right">
                      <Buttons href="add_link" className="text-right text-[12px] font-medium font-serif uppercase btn-link after:h-[1px] md:text-md" color="#000" title="Lost your password?" />
                    </div>
                  </div>
                </div>
              </Collapse>
            </Col>
            <Col md={12}>
              <div className="bg-transparent">
                <div className="justify-center items-center text-center">
                  <i className="feather-scissors text-fastblue mr-[10px]"></i>
                  <span className="text-darkgray font-serif">Have a coupon?&nbsp;</span>
                  <a className="accordion-toggle text-darkgray hover:text-darkgray" onClick={(e) => (e.preventDefault(), setIsCoupen(!isCoupen))}><span className="font-serif border-b border-black">Click here to enter your code</span></a>
                </div>
                <Collapse in={isCoupen}>
                  <div id="collapseTwo">
                    <div className="w-[40%] mx-auto my-[4.5rem] text-start lg:w-[50%] sm:w-full">
                      <label className="mb-[15px]">If you have a coupon code, please apply it below. <span className="text-red-500">*</span></label>
                      <Formik
                        initialValues={{ name: '', email: '', phone: '', comment: '' }}
                        validationSchema={ContactFormStyle01Schema}
                        onSubmit={async (values, actions) => {
                          await new Promise((r) => setTimeout(r, 500));
                          // alert(JSON.stringify(values, null, 2));
                          actions.resetForm()
                          actions.setStatus(true)
                          setTimeout(() => actions.setStatus(false), 5000)
                        }}
                      >
                        <Form>
                          <Input showErrorMsg={false} name="Entercoupencode" type="text" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf] mb-[25px]" placeholder="Enter coupen code" labelClass="mb-[25px]" />
                        </Form>
                      </Formik>

                      <Buttons href="add_link" className="btn-fill w-full font-medium mb-[20px] font-serif rounded-none uppercase md:mb-[15px]" themeColor="#232323" color="#fff" size="md" title="apply coupon" />
                    </div>
                  </div>
                </Collapse>
              </div>
            </Col>
          </Row>
        </Container>
      </m.section>
      {/*  Section End */}

      {/* Section Start */}
      <section className="pb-[130px] lg:pb-[90px] md:pb-[75px] sm:pb-[50px]">
        <Container>
          <Row>
            <Col lg={7} md={6} className="pr-[70px] lg:pr-[40px] md:pr-[15px]">
              <span className="font-serif text-lg md:text-xmd text-darkgray mb-[40px] inline-block font-medium sm:text-xmd">Billing details</span>
              <Formik
                initialValues={{ name: '', email: '', phone: '', comment: '' }}
                validationSchema={ContactFormStyle01Schema}
                onSubmit={async (values, actions) => {
                  await new Promise((r) => setTimeout(r, 500));
                  resetForm(actions)
                }}
              >
                <Form>
                  <Row>
                    <Col md={6}>
                      <label className="mb-[15px]">First name <span className="text-red-500">*</span></label>
                      <Input showErrorMsg={false} name="firstname" type="text" className="py-[13px] px-[15px] w-full border-[1px] text-md mb-[15px] leading-[initial] border-solid border-[#dfdfdf]" placeholder="" labelClass="mb-[10px]" />
                    </Col>
                    <Col md={6}>
                      <label className="mb-[15px]">Last name <span className="text-red-500">*</span></label>
                      <Input showErrorMsg={false} name="secondname" type="text" className="py-[13px] px-[15px] w-full border-[1px] text-md mb-[15px] leading-[initial] border-solid border-[#dfdfdf]" placeholder="" labelClass="mb-[10px]" />
                    </Col>
                    <Col className="col-12">
                      <label className="mb-[15px]">Company name (optional)</label>
                      <Input showErrorMsg={false} name="compnyname" type="text" className="py-[13px] px-[15px] w-full border-[1px] text-md mb-[15px] leading-[initial] border-solid border-[#dfdfdf]" placeholder="" labelClass="mb-[10px]" />
                    </Col>
                    <Col className="col-12">
                      <label className="mb-[15px]" htmlFor="contry">Country <span className="text-red-500">*</span></label>
                      <select name="contry" id="contry-2" className="py-[13px] px-[15px] text-[14px] border border-[#dfdfdf] w-full mb-[25px] leading-[initial]">
                        <option>Select a country</option>
                        <option value="Afganistan">Afghanistan</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Anguilla">Anguilla</option>
                        <option value="Antigua &amp; Barbuda">Antigua &amp; Barbuda</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Aruba">Aruba</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bermuda">Bermuda</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bonaire">Bonaire</option>
                        <option value="Bosnia &amp; Herzegovina">Bosnia &amp; Herzegovina</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Brazil">Brazil</option>
                        <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                        <option value="Brunei">Brunei</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Canary Islands">Canary Islands</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Cayman Islands">Cayman Islands</option>
                        <option value="Central African Republic">Central African Republic</option>
                        <option value="Chad">Chad</option>
                        <option value="Channel Islands">Channel Islands</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Christmas Island">Christmas Island</option>
                        <option value="Cocos Island">Cocos Island</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Cook Islands">Cook Islands</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Cote DIvoire">Cote DIvoire</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Curaco">Curacao</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">Dominican Republic</option>
                        <option value="East Timor">East Timor</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Falkland Islands">Falkland Islands</option>
                        <option value="Faroe Islands">Faroe Islands</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="French Guiana">French Guiana</option>
                        <option value="French Polynesia">French Polynesia</option>
                        <option value="French Southern Ter">French Southern Ter</option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Gibraltar">Gibraltar</option>
                        <option value="Great Britain">Great Britain</option>
                        <option value="Greece">Greece</option>
                        <option value="Greenland">Greenland</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Guam">Guam</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="India">India</option>
                        <option value="Iran">Iran</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Isle of Man">Isle of Man</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Korea North">Korea North</option>
                        <option value="Korea Sout">Korea South</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Laos">Laos</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libya">Libya</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macau">Macau</option>
                        <option value="Macedonia">Macedonia</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">Marshall Islands</option>
                        <option value="Martinique">Martinique</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Midway Islands">Midway Islands</option>
                        <option value="Moldova">Moldova</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Nambia">Nambia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherland Antilles">Netherland Antilles</option>
                        <option value="Netherlands">Netherlands (Holland, Europe)</option>
                        <option value="Nevis">Nevis</option>
                        <option value="New Caledonia">New Caledonia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Niue">Niue</option>
                        <option value="Norfolk Island">Norfolk Island</option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau Island">Palau Island</option>
                        <option value="Palestine">Palestine</option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">Papua New Guinea</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Phillipines">Philippines</option>
                        <option value="Pitcairn Island">Pitcairn Island</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Republic of Montenegro">Republic of Montenegro</option>
                        <option value="Republic of Serbia">Republic of Serbia</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Romania">Romania</option>
                        <option value="Russia">Russia</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="St Barthelemy">St Barthelemy</option>
                        <option value="St Eustatius">St Eustatius</option>
                        <option value="St Helena">St Helena</option>
                        <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                        <option value="St Lucia">St Lucia</option>
                        <option value="St Maarten">St Maarten</option>
                        <option value="St Pierre &amp; Miquelon">St Pierre &amp; Miquelon</option>
                        <option value="St Vincent &amp; Grenadines">St Vincent &amp; Grenadines</option>
                        <option value="Saipan">Saipan</option>
                        <option value="Samoa">Samoa</option>
                        <option value="Samoa American">Samoa American</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome &amp; Principe">Sao Tome &amp; Principe</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syria">Syria</option>
                        <option value="Tahiti">Tahiti</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Togo">Togo</option>
                        <option value="Tokelau">Tokelau</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad &amp; Tobago">Trinidad &amp; Tobago</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Turks &amp; Caicos Is">Turks &amp; Caicos Is</option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Erimates">United Arab Emirates</option>
                        <option value="United States of America">United States of America</option>
                        <option value="Uraguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Vatican City State">Vatican City State</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                        <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                        <option value="Wake Island">Wake Island</option>
                        <option value="Wallis &amp; Futana Is">Wallis &amp; Futana Is</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zaire">Zaire</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                      </select>
                    </Col>
                    <Col className="col-12 mb-[10px]">
                      <label className="mb-[15px]">Street address <span className="text-red-500">*</span></label>
                      <Input showErrorMsg={false} name="housenumber" type="text" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf] text-md mb-[15px] leading-[initial]" placeholder="House number and street name" />
                      <Input showErrorMsg={false} name="apartment" type="text" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf] text-md leading-[initial]" placeholder="Apartment,suite,unit etc. (optional)" labelClass="mb-[15px]" />
                    </Col>
                    <Col className="col-12 mb-[10px]">
                      <label className="mb-[15px]">Town / City <span className="text-red-500">*</span></label>
                      <Input showErrorMsg={false} name="town" type="text" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf] text-md leading-[initial]" placeholder="" labelClass="mb-[15px]" />
                    </Col>
                    <Col className="col-12 mb-[25px]">
                      <label className="mb-[15px]" htmlFor="state">State <span className="text-red-500">*</span></label>
                      <select name="state" id="state" className="small-input w-full border border-[#dfdfdf] leading-[initial]">
                        <option>Select a state</option>
                      </select>
                    </Col>
                    <Col className="col-12 mb-[10px]">
                      <label className="mb-[15px]">ZIP <span className="text-red-500">*</span></label>
                      <Input showErrorMsg={false} name="text" type="text" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="" labelClass="mb-[15px]" />
                    </Col>
                    <Col className="col-12 mb-[10px]">
                      <label className="mb-[15px]">Phone <span className="text-red-500">*</span></label>
                      <Input showErrorMsg={false} name="phone" type="tel" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="" labelClass="mb-[15px]" />
                    </Col>
                    <Col className="col-12 mb-[10px]">
                      <label className="mb-[15px]">Email address <span className="text-red-500">*</span></label>
                      <Input showErrorMsg={false} name="email1" type="email" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="" labelClass="mb-[15px]" />
                    </Col>
                    <Col className="col-12 md:col-12 relative checkout-accordion">
                      <p className="title mb-[2px] flex">
                        <label className="mb-[5px]">
                          <input className="inline w-auto mb-0 mr-[7px] mt-[3.5px]" type="checkbox" name="account" />
                          <a aria-label="create-account" className="accordion-toggle text-black" onClick={(e) => (e.preventDefault(), setIsCreateCollapse(!isCreateCollapse))}><span className="inline-block text-[#828282] text-decoration-none">Create an account?</span></a>
                        </label>
                      </p>
                      <Collapse in={isCreateCollapse}>
                        <div id="collapseThree">
                          <div className="pl-[25px] mb-[35px] md:pl-0">
                            <label className="mb-[15px]">Account username <span className="text-red-500">*</span></label>
                            <Input showErrorMsg={false} name="text" type="text" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Enter usename" labelClass="mb-[15px]" />
                            <label className="mb-[15px]">Create account password <span className="text-red-500">*</span></label>
                            <Input showErrorMsg={false} name="password" type="password" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Entre password" labelClass="mb-[15px]" />
                          </div>
                        </div>
                      </Collapse>
                    </Col>
                    <Col className="col-12 md:col-12 relative checkout-accordion">
                      <p className="title mb-[2px] flex">
                        <label className="mb-[5px]">
                          <input className="inline w-auto mb-0 mr-[7px] mt-[3.5px]" type="checkbox" name="account" />
                          <a aria-label="shipping" className="accordion-toggle text-black" onClick={(e) => (e.preventDefault(), setIsShipCollapse(!isShipCollapse))}><span className="inline-block text-[#828282] text-decoration-none mb-[7px]">Ship to a different address?</span></a>
                        </label>
                      </p>
                      <Collapse in={isShipCollapse}>
                        <div id="collapseFour">
                          <div className="pl-[25px] mb-[35px] md:pl-0">
                            <Row className="flex">
                              <Col md={6}>
                                <label className="mb-[15px]">First name <span className="text-red-500">*</span></label>
                                <Input showErrorMsg={false} name="firstname" type="text" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf] text-md mb-[15px] leading-[initial]" placeholder="" />
                              </Col>
                              <Col md={6}>
                                <label className="mb-[15px]">Last name <span className="text-red-500">*</span></label>
                                <Input showErrorMsg={false} name="secondname" type="text" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf] text-md mb-[15px] leading-[initial]" placeholder="" />
                              </Col>
                            </Row>
                            <Row>
                              <Col className="col-12">
                                <label className="mb-[15px]">Company name (optional)</label>
                                <Input showErrorMsg={false} name="compnyname" type="text" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf] text-md mb-[15px] leading-[initial]" placeholder="" />
                              </Col>
                              <Col className="col-12 mb-[15px]">
                                <label className="mb-[15px]" htmlFor="contry">Country <span className="text-red-500">*</span></label>
                                <select name="contry" id="contry" className="py-[13px] px-[15px] text-[14px] border border-[#dfdfdf] w-full leading-[initial]">
                                  <option>Select a Country</option>
                                  <option value="Afganistan">Afghanistan</option>
                                  <option value="Albania">Albania</option>
                                  <option value="Algeria">Algeria</option>
                                  <option value="American Samoa">American Samoa</option>
                                  <option value="Andorra">Andorra</option>
                                  <option value="Angola">Angola</option>
                                  <option value="Anguilla">Anguilla</option>
                                  <option value="Antigua &amp; Barbuda">Antigua &amp; Barbuda</option>
                                  <option value="Argentina">Argentina</option>
                                  <option value="Armenia">Armenia</option>
                                  <option value="Aruba">Aruba</option>
                                  <option value="Australia">Australia</option>
                                  <option value="Austria">Austria</option>
                                  <option value="Azerbaijan">Azerbaijan</option>
                                  <option value="Bahamas">Bahamas</option>
                                  <option value="Bahrain">Bahrain</option>
                                  <option value="Bangladesh">Bangladesh</option>
                                  <option value="Barbados">Barbados</option>
                                  <option value="Belarus">Belarus</option>
                                  <option value="Belgium">Belgium</option>
                                  <option value="Belize">Belize</option>
                                  <option value="Benin">Benin</option>
                                  <option value="Bermuda">Bermuda</option>
                                  <option value="Bhutan">Bhutan</option>
                                  <option value="Bolivia">Bolivia</option>
                                  <option value="Bonaire">Bonaire</option>
                                  <option value="Bosnia &amp; Herzegovina">Bosnia &amp; Herzegovina</option>
                                  <option value="Botswana">Botswana</option>
                                  <option value="Brazil">Brazil</option>
                                  <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                                  <option value="Brunei">Brunei</option>
                                  <option value="Bulgaria">Bulgaria</option>
                                  <option value="Burkina Faso">Burkina Faso</option>
                                  <option value="Burundi">Burundi</option>
                                  <option value="Cambodia">Cambodia</option>
                                  <option value="Cameroon">Cameroon</option>
                                  <option value="Canada">Canada</option>
                                  <option value="Canary Islands">Canary Islands</option>
                                  <option value="Cape Verde">Cape Verde</option>
                                  <option value="Cayman Islands">Cayman Islands</option>
                                  <option value="Central African Republic">Central African Republic</option>
                                  <option value="Chad">Chad</option>
                                  <option value="Channel Islands">Channel Islands</option>
                                  <option value="Chile">Chile</option>
                                  <option value="China">China</option>
                                  <option value="Christmas Island">Christmas Island</option>
                                  <option value="Cocos Island">Cocos Island</option>
                                  <option value="Colombia">Colombia</option>
                                  <option value="Comoros">Comoros</option>
                                  <option value="Congo">Congo</option>
                                  <option value="Cook Islands">Cook Islands</option>
                                  <option value="Costa Rica">Costa Rica</option>
                                  <option value="Cote DIvoire">Cote DIvoire</option>
                                  <option value="Croatia">Croatia</option>
                                  <option value="Cuba">Cuba</option>
                                  <option value="Curaco">Curacao</option>
                                  <option value="Cyprus">Cyprus</option>
                                  <option value="Czech Republic">Czech Republic</option>
                                  <option value="Denmark">Denmark</option>
                                  <option value="Djibouti">Djibouti</option>
                                  <option value="Dominica">Dominica</option>
                                  <option value="Dominican Republic">Dominican Republic</option>
                                  <option value="East Timor">East Timor</option>
                                  <option value="Ecuador">Ecuador</option>
                                  <option value="Egypt">Egypt</option>
                                  <option value="El Salvador">El Salvador</option>
                                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                                  <option value="Eritrea">Eritrea</option>
                                  <option value="Estonia">Estonia</option>
                                  <option value="Ethiopia">Ethiopia</option>
                                  <option value="Falkland Islands">Falkland Islands</option>
                                  <option value="Faroe Islands">Faroe Islands</option>
                                  <option value="Fiji">Fiji</option>
                                  <option value="Finland">Finland</option>
                                  <option value="France">France</option>
                                  <option value="French Guiana">French Guiana</option>
                                  <option value="French Polynesia">French Polynesia</option>
                                  <option value="French Southern Ter">French Southern Ter</option>
                                  <option value="Gabon">Gabon</option>
                                  <option value="Gambia">Gambia</option>
                                  <option value="Georgia">Georgia</option>
                                  <option value="Germany">Germany</option>
                                  <option value="Ghana">Ghana</option>
                                  <option value="Gibraltar">Gibraltar</option>
                                  <option value="Great Britain">Great Britain</option>
                                  <option value="Greece">Greece</option>
                                  <option value="Greenland">Greenland</option>
                                  <option value="Grenada">Grenada</option>
                                  <option value="Guadeloupe">Guadeloupe</option>
                                  <option value="Guam">Guam</option>
                                  <option value="Guatemala">Guatemala</option>
                                  <option value="Guinea">Guinea</option>
                                  <option value="Guyana">Guyana</option>
                                  <option value="Haiti">Haiti</option>
                                  <option value="Hawaii">Hawaii</option>
                                  <option value="Honduras">Honduras</option>
                                  <option value="Hong Kong">Hong Kong</option>
                                  <option value="Hungary">Hungary</option>
                                  <option value="Iceland">Iceland</option>
                                  <option value="Indonesia">Indonesia</option>
                                  <option value="India">India</option>
                                  <option value="Iran">Iran</option>
                                  <option value="Iraq">Iraq</option>
                                  <option value="Ireland">Ireland</option>
                                  <option value="Isle of Man">Isle of Man</option>
                                  <option value="Israel">Israel</option>
                                  <option value="Italy">Italy</option>
                                  <option value="Jamaica">Jamaica</option>
                                  <option value="Japan">Japan</option>
                                  <option value="Jordan">Jordan</option>
                                  <option value="Kazakhstan">Kazakhstan</option>
                                  <option value="Kenya">Kenya</option>
                                  <option value="Kiribati">Kiribati</option>
                                  <option value="Korea North">Korea North</option>
                                  <option value="Korea Sout">Korea South</option>
                                  <option value="Kuwait">Kuwait</option>
                                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                                  <option value="Laos">Laos</option>
                                  <option value="Latvia">Latvia</option>
                                  <option value="Lebanon">Lebanon</option>
                                  <option value="Lesotho">Lesotho</option>
                                  <option value="Liberia">Liberia</option>
                                  <option value="Libya">Libya</option>
                                  <option value="Liechtenstein">Liechtenstein</option>
                                  <option value="Lithuania">Lithuania</option>
                                  <option value="Luxembourg">Luxembourg</option>
                                  <option value="Macau">Macau</option>
                                  <option value="Macedonia">Macedonia</option>
                                  <option value="Madagascar">Madagascar</option>
                                  <option value="Malaysia">Malaysia</option>
                                  <option value="Malawi">Malawi</option>
                                  <option value="Maldives">Maldives</option>
                                  <option value="Mali">Mali</option>
                                  <option value="Malta">Malta</option>
                                  <option value="Marshall Islands">Marshall Islands</option>
                                  <option value="Martinique">Martinique</option>
                                  <option value="Mauritania">Mauritania</option>
                                  <option value="Mauritius">Mauritius</option>
                                  <option value="Mayotte">Mayotte</option>
                                  <option value="Mexico">Mexico</option>
                                  <option value="Midway Islands">Midway Islands</option>
                                  <option value="Moldova">Moldova</option>
                                  <option value="Monaco">Monaco</option>
                                  <option value="Mongolia">Mongolia</option>
                                  <option value="Montserrat">Montserrat</option>
                                  <option value="Morocco">Morocco</option>
                                  <option value="Mozambique">Mozambique</option>
                                  <option value="Myanmar">Myanmar</option>
                                  <option value="Nambia">Nambia</option>
                                  <option value="Nauru">Nauru</option>
                                  <option value="Nepal">Nepal</option>
                                  <option value="Netherland Antilles">Netherland Antilles</option>
                                  <option value="Netherlands">Netherlands (Holland, Europe)</option>
                                  <option value="Nevis">Nevis</option>
                                  <option value="New Caledonia">New Caledonia</option>
                                  <option value="New Zealand">New Zealand</option>
                                  <option value="Nicaragua">Nicaragua</option>
                                  <option value="Niger">Niger</option>
                                  <option value="Nigeria">Nigeria</option>
                                  <option value="Niue">Niue</option>
                                  <option value="Norfolk Island">Norfolk Island</option>
                                  <option value="Norway">Norway</option>
                                  <option value="Oman">Oman</option>
                                  <option value="Pakistan">Pakistan</option>
                                  <option value="Palau Island">Palau Island</option>
                                  <option value="Palestine">Palestine</option>
                                  <option value="Panama">Panama</option>
                                  <option value="Papua New Guinea">Papua New Guinea</option>
                                  <option value="Paraguay">Paraguay</option>
                                  <option value="Peru">Peru</option>
                                  <option value="Phillipines">Philippines</option>
                                  <option value="Pitcairn Island">Pitcairn Island</option>
                                  <option value="Poland">Poland</option>
                                  <option value="Portugal">Portugal</option>
                                  <option value="Puerto Rico">Puerto Rico</option>
                                  <option value="Qatar">Qatar</option>
                                  <option value="Republic of Montenegro">Republic of Montenegro</option>
                                  <option value="Republic of Serbia">Republic of Serbia</option>
                                  <option value="Reunion">Reunion</option>
                                  <option value="Romania">Romania</option>
                                  <option value="Russia">Russia</option>
                                  <option value="Rwanda">Rwanda</option>
                                  <option value="St Barthelemy">St Barthelemy</option>
                                  <option value="St Eustatius">St Eustatius</option>
                                  <option value="St Helena">St Helena</option>
                                  <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                                  <option value="St Lucia">St Lucia</option>
                                  <option value="St Maarten">St Maarten</option>
                                  <option value="St Pierre &amp; Miquelon">St Pierre &amp; Miquelon</option>
                                  <option value="St Vincent &amp; Grenadines">St Vincent &amp; Grenadines</option>
                                  <option value="Saipan">Saipan</option>
                                  <option value="Samoa">Samoa</option>
                                  <option value="Samoa American">Samoa American</option>
                                  <option value="San Marino">San Marino</option>
                                  <option value="Sao Tome &amp; Principe">Sao Tome &amp; Principe</option>
                                  <option value="Saudi Arabia">Saudi Arabia</option>
                                  <option value="Senegal">Senegal</option>
                                  <option value="Seychelles">Seychelles</option>
                                  <option value="Sierra Leone">Sierra Leone</option>
                                  <option value="Singapore">Singapore</option>
                                  <option value="Slovakia">Slovakia</option>
                                  <option value="Slovenia">Slovenia</option>
                                  <option value="Solomon Islands">Solomon Islands</option>
                                  <option value="Somalia">Somalia</option>
                                  <option value="South Africa">South Africa</option>
                                  <option value="Spain">Spain</option>
                                  <option value="Sri Lanka">Sri Lanka</option>
                                  <option value="Sudan">Sudan</option>
                                  <option value="Suriname">Suriname</option>
                                  <option value="Swaziland">Swaziland</option>
                                  <option value="Sweden">Sweden</option>
                                  <option value="Switzerland">Switzerland</option>
                                  <option value="Syria">Syria</option>
                                  <option value="Tahiti">Tahiti</option>
                                  <option value="Taiwan">Taiwan</option>
                                  <option value="Tajikistan">Tajikistan</option>
                                  <option value="Tanzania">Tanzania</option>
                                  <option value="Thailand">Thailand</option>
                                  <option value="Togo">Togo</option>
                                  <option value="Tokelau">Tokelau</option>
                                  <option value="Tonga">Tonga</option>
                                  <option value="Trinidad &amp; Tobago">Trinidad &amp; Tobago</option>
                                  <option value="Tunisia">Tunisia</option>
                                  <option value="Turkey">Turkey</option>
                                  <option value="Turkmenistan">Turkmenistan</option>
                                  <option value="Turks &amp; Caicos Is">Turks &amp; Caicos Is</option>
                                  <option value="Tuvalu">Tuvalu</option>
                                  <option value="Uganda">Uganda</option>
                                  <option value="United Kingdom">United Kingdom</option>
                                  <option value="Ukraine">Ukraine</option>
                                  <option value="United Arab Erimates">United Arab Emirates</option>
                                  <option value="United States of America">United States of America</option>
                                  <option value="Uraguay">Uruguay</option>
                                  <option value="Uzbekistan">Uzbekistan</option>
                                  <option value="Vanuatu">Vanuatu</option>
                                  <option value="Vatican City State">Vatican City State</option>
                                  <option value="Venezuela">Venezuela</option>
                                  <option value="Vietnam">Vietnam</option>
                                  <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                                  <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                                  <option value="Wake Island">Wake Island</option>
                                  <option value="Wallis &amp; Futana Is">Wallis &amp; Futana Is</option>
                                  <option value="Yemen">Yemen</option>
                                  <option value="Zaire">Zaire</option>
                                  <option value="Zambia">Zambia</option>
                                  <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                              </Col>
                              <Col className="col-12 mb-[10px]">
                                <label className="mb-[15px]">Street address <span className="text-red-500">*</span></label>
                                <Input showErrorMsg={false} name="housenumber" type="text" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf] mb-[15px]" placeholder="House number and street name" />
                                <Input showErrorMsg={false} name="apartment" type="text" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Apartment,suite,unit etc. (optional)" />
                              </Col>
                              <Col className="col-12 mb-[10px]">
                                <label className="mb-[15px]">Town / City <span className="text-red-500">*</span></label>
                                <Input showErrorMsg={false} name="town" type="text" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="" labelClass="mb-[10px]" />
                              </Col>
                              <Col className="col-12 mb-[10px]">
                                <label className="mb-[15px]" htmlFor="state">State <span className="text-red-500">*</span></label>
                                <select name="state" id="state-2" className="small-input w-full leading-[initial]">
                                  <option>Select a state</option>
                                </select>
                              </Col>
                              <Col className="col-12 mb-[10px]">
                                <label>ZIP <span className="text-red-500">*</span></label>
                                <Input showErrorMsg={false} name="text" type="text" className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="" labelClass="mb-[10px]" />
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Collapse>
                    </Col>
                    <Col className="col-12 mt-[15px]">
                      <label className="mb-[15px]">Order notes (optional)</label>
                      <textarea className="medium-input w-full border border-[#dfdfdf] mb-[15px]" rows="5" cols="5" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                    </Col>
                  </Row>
                </Form>
              </Formik>
            </Col>
            <Col lg={5} md={6}>
              <div className="bg-lightgray p-[45px] lg:p-[30px] sm:p-[20px]">
                <span className="font-serif text-lg md:text-xmd text-darkgray mb-[25px] inline-block font-medium">Your order</span>
                <table>
                  <thead className="border-b border-mediumgray text-darkgray">
                    <tr>
                      <th className="product-name font-medium w-[60%] py-[20px] sm:py-[15px]">Product</th>
                      <th className="product-total pr-0 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b py-[20px] sm:py-[15px] border-mediumgray">Cotton Jacket - Black × 1<span className="block w-full">Size:XL</span></td>
                      <td className="border-b border-mediumgray py-[20px] sm:py-[15px]">$25.00</td>
                    </tr>
                    <tr>
                      <td className="border-b py-[20px] sm:py-[15px] border-mediumgray">Tennis Shorts - White × 1<span className="block w-full">Size:M</span></td>
                      <td className="border-b border-mediumgray py-[20px] sm:py-[15px]">$25.00</td>
                    </tr>
                    <tr>
                      <td className="border-b py-[20px] sm:py-[15px] border-mediumgray">Cashmere Sweater × 1<span className="block w-full">Size:S</span></td>
                      <td className="border-b border-mediumgray py-[20px] sm:py-[15px]">$600.00</td>
                    </tr>
                    <tr>
                      <th className="font-medium text-darkgray border-b py-[20px] sm:py-[15px] border-mediumgray">Subtotal</th>
                      <td className="text-darkgray border-b border-mediumgray">$405.00</td>
                    </tr>
                    <tr className="shipping">
                      <th className="font-medium text-darkgray border-b border-mediumgray">Shipping</th>
                      <td data-title="Shipping" className="flex py-[20px] sm:py-[15px] justify-start md:justify-end border-b border-mediumgray">
                        <ul className="lg:float-start float-end text-start leading-9">
                          <li className="flex items-center md:mb-[15px]">
                            <input id="free_shipping" type="radio" name="shipping-option" className="block w-auto mr-[10px] mb-0" defaultChecked="checked" />
                            <label className="md-line-height-18px" htmlFor="free_shipping">Free shipping</label>
                          </li>
                          <li className="flex items-center md:mb-[15px]">
                            <input id="flat" type="radio" name="shipping-option" className="block w-auto mr-[10px] mb-0" />
                            <label className="md:leading-[18px]" htmlFor="flat">Flat: $12.00</label>
                          </li>
                          <li className="flex items-center">
                            <input id="local_pickup" type="radio" name="shipping-option" className="block w-auto mr-[10px]" />
                            <label className="md:leading-[18px]" htmlFor="local_pickup">Local pickup</label>
                          </li>
                          <li className="mt-[15px]">
                            <p className="text-start text-sm mb-0 text-[#828282]">Shipping options will be updated during checkout.</p>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr className="total-amount">
                      <th className="font-medium text-darkgray">Total</th>
                      <td className="py-[20px]">
                        <h6 className="block font-medium mb-0 text-darkgray">$405.00</h6>
                        <span className="text-sm">(Includes $19.29 tax)</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="p-[40px] bg-white box-shadow-large mt-[20px] mb-[40px] checkout-accordion lg:p-[30px] md:p-[15px]">
                  <Accordion className="checkout-accordion" defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header className='heading'>
                        <label>
                          <input className="inline w-auto mr-[10px] mb-0" type="radio" name="payment-option" />
                          <span className="inline-block">Direct bank transfer</span>
                          <a aria-label="bank-transfer" className="accordion-toggle hover:text-[#828282]" onClick={(e) => e.preventDefault()}>
                            <i className="fa fa-phone hidden" aria-hidden="true"></i>
                          </a>
                        </label>
                      </Accordion.Header>
                      <Accordion.Body className='p-0'>
                        <div className="p-[30px] text-sm bg-lightgray sm:px-[20px] sm:py-[25px]">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</div>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header className='heading'>
                        <label>
                          <input className="inline w-auto mr-[10px] mb-0" type="radio" name="payment-option" />
                          <span className="inline-block">Check payments</span>
                          <a aria-label="payments" className="accordion-toggle collapsed hover:text-[#828282]" onClick={(e) => e.preventDefault()}><i className="fa fa-phone hidden" aria-hidden="true"></i> </a>
                        </label>
                      </Accordion.Header>
                      <Accordion.Body className='p-0'>
                        <div className="p-[30px] text-sm bg-lightgray sm:px-[20px] sm:py-[25px]">Please send a check to store name, store street, store town, store state / county, store postcode.</div>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header className='heading'>
                        <label>
                          <input className="inline w-auto mr-[10px] mb-0" type="radio" name="payment-option" />
                          <span className="inline-block">Cash on delivery</span>
                          <a aria-label="cash-on-delivery" className="accordion-toggle collapsed hover:text-[#828282]" onClick={(e) => e.preventDefault()}><i className="fa fa-phone hidden" aria-hidden="true"></i> </a>
                        </label>
                      </Accordion.Header>
                      <Accordion.Body className='p-0'>
                        <div className="p-[30px] text-sm bg-lightgray sm:px-[20px] sm:py-[25px]">Pay with cash upon delivery.</div>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header className='heading'>
                        <label className="mb-[5px] flex items-center">
                          <input className="inline w-auto mr-[10px] mb-0" type="radio" name="payment-option" />
                          <span className="flex items-center">PayPal <img height="" width="" loading="lazy" src="https://via.placeholder.com/319x110" alt="" className="w-[120px] ml-[10px]" data-no-retina="" /></span>
                          <a aria-label="payments-with-paypal" className="accordion-toggle collapsed hover:text-[#828282]" onClick={(e) => e.preventDefault()}><i className="fa fa-phone hidden" aria-hidden="true"></i> </a>
                        </label>
                      </Accordion.Header>
                      <Accordion.Body className='p-0'>
                        <div className="p-[30px] text-sm bg-lightgray sm:px-[20px] sm:py-[25px]">You can pay with your credit card if you don’t have a PayPal account.</div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <p className="text-sm mb-[25px] xs:mb-[15px]">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our &nbsp;
                  <Link aria-label="privacy-policy" className="text-decoration-underline hover:text-fastblue" to="/privacy" target="_blank">privacy policy.</Link>
                </p>
                <p className="flex items-center mb-[25px] xs:mb-[15px]">
                  <input className="inline w-auto mb-0 mr-[10px]" type="checkbox" name="terms-and-condition" />
                  <span className="text-sm">I have read and agree to the website <Link aria-label="terms-condition" className="underline underline-offset-1 hover:text-fastblue" to="/shop/checkout">terms and conditions</Link><span className="text-red-500 ml-[4px] inline-block">*</span></span>
                </p>
                <Buttons ariaLabel="place-order" href="#" className="btn-fill py-[18px] px-[38px] mt-[15px] text-[15px] tracking-[1px] w-full font-medium font-serif rounded-none uppercase md:mb-[15px] xs:mb-0 xs:mt-[15px]" themeColor="#232323" color="#fff" size="xxl" title="Place order" />
              </div>
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

export default Checkout
