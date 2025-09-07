import React from 'react'

// Libraries
import { Col, Container, Row } from "react-bootstrap";
import { AnimatePresence, m } from 'framer-motion'
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";

// Components
import { Input } from '../../Components/Form/Form'
import MessageBox from '../../Components/MessageBox/MessageBox';
import SocialIcons from "../../Components/SocialIcon/SocialIcons";
import SideButtons from "../../Components/SideButtons";
import { resetForm, sendEmail } from "../../Functions/Utilities";
import { fadeIn, fadeInRight, fadeInUp } from "../../Functions/GlobalAnimations";

// Data
const SocialIconsData = [
  {
    color: "#fff",
    link: "https://www.facebook.com/",
    icon: "fab fa-facebook-f"
  },
  {
    color: "#fff",
    link: "https://twitter.com/",
    icon: "fab fa-twitter"
  },
  {
    color: "#fff",
    link: "https://www.linkedin.com/",
    icon: "fab fa-linkedin-in"
  },
]

const svgBlobPathOne = {
  start: {
    d: "M138.92693095104482 7.887601015213008 C130.0407614796366 0.6655671559049301 105.13678445383023 -1.2260778499372722 93.7743371190718 0.19398253765942286 C76.52241300875639 2.350100257469652 40.023151182921666 14.04251273454984 30.201541438200067 28.388721681590567 C10.929171317896984 56.539448073378175 5.421327056359363 135.9255509123166 23.750443112357786 164.69934369402995 C36.10831588698061 184.09923561208046 85.88737110256994 198.9053742554075 108.87830870886877 199.60509843612436 C120.72782965338001 199.96573602632483 143.93733531547028 190.9447273920637 153.76602988682228 184.3161552148183 C165.64958043864942 176.30176714091004 188.83304277321565 155.05521249269236 191.24196528625475 140.92558821448853 C197.24828213435504 105.695314139614 166.66107689901452 30.427902743611956 138.92693095104482 7.887601015213008Z"
  },
  end: {
    d: "M194.76732932737994 68.07581963219864 C189.05627796873216 51.77985662149475 167.0258172972712 21.75354369785732 151.4679479462077 14.26173354792823 C128.44842704297372 3.176804342145724 72.9449769977162 4.213918563635485 49.271123416791795 13.822386430084805 C38.10673987398935 18.3536563457765 20.73865835855422 37.046140886691774 14.85298618261804 47.55969071427434 C7.014769294710606 61.56106240931041 -2.1176631181070182 94.29278328157122 0.5135567806981669 110.1216409525646 C4.10466705483331 131.7249943765561 26.001266281120085 177.30258909599334 46.65534701535798 184.58337896979597 C83.61983902143294 197.6137676155591 171.8407907572352 164.5091843459407 194.54933887167263 132.56412932859737 C203.890351553269 119.42373996827612 200.09950300207345 83.29068980454957 194.76732932737994 68.07581963219864Z"
  }
}


const svgBlobPathTwo = {
  start: {
    d: "M130.26147932508917 4.688705448634252 C117.63442447607751 -3.1698304608736 84.4759056617675 -1.4108427818293219 70.7712946074514 4.366936778770906 C48.41016296862879 13.794252068685026 11.888574138141472 51.50145393879939 3.378199239985449 74.2273862813247 C-1.9953849565611046 88.5768964203011 -0.6670560808164234 121.89062841465648 6.490214357666744 135.43896145663535 C18.875716720390454 158.8840600238427 64.45706460398668 198.55151157557756 90.95225601331838 199.589850530822 C121.65677069332263 200.79315165824443 186.20259530225906 162.76339137380688 194.3506855995131 133.13530031404323 C203.86673575595648 98.53303275456364 160.7296767483216 23.650801235141994 130.26147932508917 4.688705448634252Z"
  },
  end: {
    d: "M191.8191746196319 60.3863764322229 C171.80412763367613 30.02120401833544 90.4623226509454 2.073084503589257 55.11710936183459 10.638228934501953 C38.04184735204352 14.776047657315967 14.047842611168942 45.972306295189846 7.404237395786453 62.23725714749884 C0.7799906562875147 78.45481435605362 -3.244913273088775 117.01732784183048 5.353389850271483 132.2803219805086 C21.657492842675737 161.2220125488936 87.79832919037327 199.69819198232986 120.96095982959523 197.77851585610253 C141.31190872993136 196.60046604530606 177.05772746141432 167.57600136280618 186.79422210320485 149.66651799250224 C197.47181144472052 130.02596810445323 204.12232975231825 79.0517049273779 191.8191746196319 60.3863764322229Z"
  }
}

const MaintenancePage = () => {
  return (
    <div>
      <SideButtons animation={false} />
      <section className="overflow-hidden relative px-[130px] lg:px-[0px]" style={{ backgroundImage: "linear-gradient(to right top,#0039e3,#4132e0,#5e28dd,#741bd9,#8600d4)" }}>
        {/* Big Circle */}
        <m.svg
          xmlns="http://www.w3.org/2000/svg"
          height="1200"
          width="1200"
          viewBox="0 0 250 250"
          id="blobSvg"
          className="absolute -top-[90px] left-[40%]"
          initial="start"
          animate="end"
          transition={{
            duration: 10,
            ease: "easeOut",
            repeat: Infinity,
          }} >
          <defs>
            <linearGradient id="gradient-one" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#4A22DB" }}></stop>
              <stop offset="100%" style={{ stopColor: "#4A22DB" }}></stop>
            </linearGradient>
          </defs>
          <m.path
            variants={svgBlobPathOne}
            transition={{
              duration: 8,
              yoyo: Infinity,
              repeat: Infinity
            }}
            fill="url(#gradient-one)"></m.path>
        </m.svg>
        {/* Big Circle End */}

        {/* Small Circle Start */}
        <m.svg
          xmlns="http://www.w3.org/2000/svg"
          height="500"
          width="500"
          viewBox="0 0 400 400"
          id="blobSvg"
          className="absolute -top-[10%] -left-[50px] opacity-80 md:bottom"
          initial="start"
          animate="end"
          transition={{
            times: [1, 6, 2, 2, 6, 2, 2, 6],
            duration: 10,
            ease: "easeOut",
            repeat: Infinity,
          }} >
          <defs>
            <linearGradient id="gradient-two" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#4722DB" }}></stop>
              <stop offset="100%" style={{ stopColor: "#4722DB" }}></stop>
            </linearGradient>
          </defs>
          <m.path
            variants={svgBlobPathTwo}
            transition={{
              duration: 2,
              yoyo: Infinity,
              repeat: Infinity
            }}
            fill="url(#gradient-two)"></m.path>
        </m.svg>

        {/* Small Circle End */}
        <Container fluid className="relative">
          <Row className="items-center h-[100vh] landscape:md:h-auto sm:items-start xs:h-auto mxl:justify-center">
            <Col md={6} xs={12} className="text-[#fff] font-serif flex flex-col justify-between items-start sm:items-center sm:text-center sm:px-[100px] sm:pt-[50px] sm:pb-0 sm:h-auto xs:px-[20px] h-full py-[90px]">
              <Link aria-label="homepage" to="/" className="inline-block mb-14 sm:flex sm:justify-center xs:mb-[110px]">
                <m.img
                  loading="lazy"
                  alt="logo"
                  src="/assets/img/webp/logo-white.webp"
                  height="36"
                  width="111"
                  {...fadeInRight}
                />
              </Link>
              <div className="w-[60%] xl:w-[85%] lg:w-full">
                <m.h6 {...{ ...fadeInUp, transition: { delay: 0.4, duration: 0.6, ease: "easeOut" } }} className="text-[40px] mb-[30px] font-semibold -tracking-[1px] leading-[46px] lg:tracking-normal md:text-[28px] md:leading-[30px] sm:text-[35px] sm:leading-[41px] sm:mb-[20px]">The website is in maintenance mode.</m.h6>
                <m.span {...{ ...fadeInUp, transition: { delay: 0.6, duration: 0.6, ease: "easeOut" } }} className="text-xmd mb-[60px] inline-block opacity-70 sm:mb-[25px]">We have almost done all the technical improvements and will be back very soon. Thank you for your patience!</m.span>
                <m.div {...{ ...fadeInUp, transition: { delay: 0.8, duration: 0.6, ease: "easeOut" } }}>
                  {/* Form Start */}
                  <Formik
                    initialValues={{ email: '' }}
                    validationSchema={Yup.object().shape({ email: Yup.string().email("Invalid email.").required("Field is required."), })}
                    onSubmit={async (values, actions) => {
                      actions.setSubmitting(true)
                      const response = await sendEmail(values)
                      response.status === "success" && resetForm(actions)
                    }}
                  >
                    {({ isSubmitting, status }) => (
                      <div className="relative mb-16 subscribe-style-03">
                        <Form className="relative">
                          <Input showErrorMsg={false} type="email" name="email" className="border-[1px] border-solid pt-[18px] pr-[145px] pb-[19px] pl-[25px] border-transparent text-darkgray" placeholder="Your email address" />
                          <button type="submit" className={`text-xs tracking-[1px] py-[12px] px-[28px] uppercase !text-fastblue hover:!text-darkgray${isSubmitting ? " loading" : ""}`}>Notify Me</button>
                        </Form>
                        <AnimatePresence>
                          {status && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-[115%] left-0 w-full"><MessageBox className="py-[5px] rounded-[4px]" theme="message-box01" variant="success" message="Your message has been sent successfully subscribed to our email list!" /></m.div>}
                        </AnimatePresence>
                      </div>
                    )}
                  </Formik>
                  {/* Form End */}
                </m.div>
              </div>
              <m.div {...{ ...fadeIn, transition: { delay: 1, duration: 0.6, ease: "circOut" } }}>
                <SocialIcons
                  theme="social-icon-style-01"
                  className="justify-start sm:justify-center"
                  size="sm"
                  iconColor="light"
                  data={SocialIconsData}
                />
              </m.div>
            </Col>
            <Col className="relative h-[750px] max-w-[750px] xl:w-[600px] xl:h-[600px] md:w-[450px] md:h-[450px] sm:scale-75 sm:bottom-0 xs:h-[350px]">
              <m.img
                loading="lazy"
                width="830"
                height="439.45"
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                src="https://via.placeholder.com/950x503"
                alt="maintenance"
                initial={{ opacity: 0, x: "-50%", y: 50 }}
                animate={{ opacity: 1, x: "-50%", y: 0 }}
                transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
              />
              <m.div
                className="absolute left-[20%] bottom-[40%] xl:bottom-[30%] xl:left-[10%] md:bottom-[15%] xs:left-0"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
              >
                <m.img
                  loading="lazy"
                  width="170"
                  height="339"
                  className="xl:scale-75 md:scale-50 max-w-[inherit]"
                  src="https://via.placeholder.com/173x343"
                  alt="plant"
                />
              </m.div>
              <div className="absolute top-[100px] left-1/2 -translate-x-1/2 flex items-start xl:scale-75 sm:top-0">
                <m.img
                  className=""
                  loading="lazy"
                  src="https://via.placeholder.com/474x530"
                  alt="big-screen"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: [0, 5, 0] }}
                  transition={{ delay: 2, y: { repeat: Infinity, duration: 2 } }}
                />
                <m.img
                  loading="lazy"
                  className="relative right-[140px]"
                  src="https://via.placeholder.com/236x266"
                  alt="small-screen"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: [0, 10, 0] }}
                  transition={{ delay: 2, y: { repeat: Infinity, duration: 2.5 } }}
                />
              </div>
              <div className="absolute bottom-[0px] left-1/2 -translate-x-1/2 flex items-center md:bottom-[-20px]">
                <m.img
                  loading="lazy"
                  width="387"
                  height="235"
                  src="https://via.placeholder.com/410x249"
                  alt="small-base"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 1.5 }}
                />
                <m.div
                  className="relative bottom-[-40px] right-[90px]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: [0, 15, 0] }}
                  transition={{ delay: 1.8, y: { repeat: Infinity, duration: 2 } }}
                >
                  <img
                    loading="lazy"
                    width="110"
                    height="80"
                    className="xl:scale-75 md:scale-50 max-w-[inherit]"
                    src="https://via.placeholder.com/108x79"
                    alt="right-icon"
                  />
                </m.div>
                <m.div
                  className="relative bottom-[40px] right-[450px] xl:right-[370px] md:right-[320px] md:bottom-[30px] sm:right-[380px] xs:right-[320px]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: [0, 15, 0], x: [0, 15, 0] }}
                  transition={{ delay: 1.8, x: { repeat: Infinity, duration: 2 }, y: { repeat: Infinity, duration: 2 } }}
                >
                  <m.img
                    loading="lazy"
                    width="110"
                    height="80"
                    className="xl:scale-75 md:scale-50 max-w-[inherit]"
                    src="https://via.placeholder.com/110x80"
                    alt="left-icon"
                  />
                </m.div>
              </div>
              <div className="absolute bottom-[30%] right-[7%] flex items-start xl:bottom-[20%] xl:right-0 xl:scale-50 md:bottom-[10%]">
                <m.img
                  loading="lazy"
                  className="relative top-[70px] left-[100px]"
                  src="https://via.placeholder.com/109x93"
                  alt="laptop"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: [0, 15, 0] }}
                  transition={{ delay: 1.8, y: { repeat: Infinity, duration: 2.5 } }}
                />
                <m.img
                  loading="lazy"
                  src="https://via.placeholder.com/189x397"
                  alt="user"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: [0, 15, 0] }}
                  transition={{ delay: 1.8, y: { repeat: Infinity, duration: 2 } }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}
    </div>
  )
}

export default MaintenancePage