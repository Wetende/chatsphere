import React, { Suspense, useEffect, useState, lazy } from "react";

// Libraries
import { Routes, Route, useLocation } from "react-router-dom";
import retina from "retinajs";
import { AnimatePresence } from "framer-motion";

// Context
import GlobalContext from "./Context/Context";

// Components
import ScrollToTopButton from "./Components/ScrollToTop";

// Home
import HomeStartupPage from "./Pages/Home/Startup/Startup";
const HomeBusinessPage = lazy(() => import("./Pages/Home/Business"));
const CorporatePage = lazy(() => import("./Pages/Home/Corporate"));
const FinancePage = lazy(() => import("./Pages/Home/Finance"));
const ApplicationPage = lazy(() => import("./Pages/Home/Application"));
const ConsultingPage = lazy(() => import("./Pages/Home/Consulting"));
const DigitalagencyPage = lazy(() => import("./Pages/Home/DigitalAgency"));
const MarketingAgencyPage = lazy(() => import("./Pages/Home/MarketingAgency"));
const EventsConferencePage = lazy(() =>
  import("./Pages/Home/EventsConference")
);
const SeoAgencyPage = lazy(() => import("./Pages/Home/SeoAgency"));
const DesignagencyPage = lazy(() => import("./Pages/Home/DesignAgency"));
const WebagencyPage = lazy(() => import("./Pages/Home/WebAgency"));
const CreativeAgencyPage = lazy(() => import("./Pages/Home/CreativeAgency"));
const BrandingagencyPage = lazy(() => import("./Pages/Home/BrandingAgency"));
const PhotographyPage = lazy(() => import("./Pages/Home/Photography"));
const PersonalportfolioPage = lazy(() =>
  import("./Pages/Home/PersonalPortfolio")
);
const InteractiveportfolioPage = lazy(() =>
  import("./Pages/Home/InteractivePortfolio")
);
const CreativeportfolioPage = lazy(() =>
  import("./Pages/Home/CreativePortfolio")
);
const VerticalportfolioPage = lazy(() =>
  import("./Pages/Home/VerticalPortfolio")
);
const SplitPortfolioPage = lazy(() => import("./Pages/Home/SplitPortfolio"));
const ArchitecturePage = lazy(() => import("./Pages/Home/Architecture"));
const HotelResortPage = lazy(() => import("./Pages/Home/HotelResort"));
const TravelAgencyPage = lazy(() => import("./Pages/Home/TravelAgency"));
const YogaMeditationPage = lazy(() => import("./Pages/Home/YogaMeditation"));
const RestaurantPage = lazy(() => import("./Pages/Home/Restaurant"));
const GymFitnessPage = lazy(() => import("./Pages/Home/GymFitness"));
const SpaSalonPage = lazy(() => import("./Pages/Home/Spasalon"));
const CafePage = lazy(() => import("./Pages/Home/Cafe"));
const HomeDecorPage = lazy(() => import("./Pages/Home/Decor"));
const DentistPage = lazy(() => import("./Pages/Home/Dentist"));
const InteriorDesignPage = lazy(() => import("./Pages/Home/InteriorDesign"));
const FurnitureShopPage = lazy(() => import("./Pages/Home/FurnitureShop"));
const FashionShopPage = lazy(() => import("./Pages/Home/FashionShop"));
const LifestyleBlogPage = lazy(() => import("./Pages/Home/LifestyleBlog"));
const ClassicBlogPage = lazy(() => import("./Pages/Home/ClassicBlog"));
const MagazinePage = lazy(() => import("./Pages/Home/Magazine"));

// Pages
const LandingPage = lazy(() => import("./Pages/Landing"));
const AccordionPage = lazy(() => import("./Pages/Elements/Accordion"));
const ButtonPage = lazy(() => import("./Pages/Elements/Button"));
const TeamPage = lazy(() => import("./Pages/Elements/Team"));
const TeamCarouselPage = lazy(() => import("./Pages/Elements/TeamCarousel"));
const ClientPage = lazy(() => import("./Pages/Elements/Clients"));
const ClientCarouselPage = lazy(() =>
  import("./Pages/Elements/ClientCarousel")
);
const SubscribePage = lazy(() => import("./Pages/Elements/Subscribe"));
const CallToActionPage = lazy(() => import("./Pages/Elements/CallToAction"));
const TabPage = lazy(() => import("./Pages/Elements/Tab"));
const GoogleMapPage = lazy(() => import("./Pages/Elements/GoogleMap"));
const ContactFormPage = lazy(() => import("./Pages/Elements/ContactForm"));
const ImageGalleryPage = lazy(() => import("./Pages/Elements/ImageGallery"));
const ProgressBarPage = lazy(() => import("./Pages/Elements/ProgressBar"));
const IconWithTextPage = lazy(() => import("./Pages/Elements/IconWithText"));
const OverLineIconBoxPage = lazy(() =>
  import("./Pages/Elements/OverLineIconBox")
);
const CustomIconWithTextPage = lazy(() =>
  import("./Pages/Elements/CustomIconWithText")
);
const CountersPage = lazy(() => import("./Pages/Elements/Counters"));
const CountDownPage = lazy(() => import("./Pages/Elements/CountDown"));
const PieChartPage = lazy(() => import("./Pages/Elements/PieChart"));
const FancyTextBoxPage = lazy(() => import("./Pages/Elements/FancyTextBox"));
const TextBoxPage = lazy(() => import("./Pages/Elements/TextBox"));
const FancyTextPage = lazy(() => import("./Pages/Elements/FancyText"));
const TestimonialsPage = lazy(() => import("./Pages/Elements/Testimonials"));
const TestimonialsCarouselPage = lazy(() =>
  import("./Pages/Elements/TestimonialsCarousel")
);
const VideoPage = lazy(() => import("./Pages/Elements/Video"));
const InteractiveBannersPage = lazy(() =>
  import("./Pages/Elements/InteractiveBanners")
);
const ServicesPage = lazy(() => import("./Pages/Elements/Services"));
const InfoBannerPage = lazy(() => import("./Pages/Elements/InfoBanner"));
const RotateBoxPage = lazy(() => import("./Pages/Elements/RotateBox"));
const ProcessStepPage = lazy(() => import("./Pages/Elements/ProcessStep"));
const InstagramPage = lazy(() => import("./Pages/Elements/Instagram"));
const ParallaxScrollingPage = lazy(() =>
  import("./Pages/Elements/ParallaxScrolling")
);
const TextSliderPage = lazy(() => import("./Pages/Elements/TextSlider"));
const HeadingPage = lazy(() => import("./Pages/Elements/Heading"));
const DropCapsPage = lazy(() => import("./Pages/Elements/DropCaps"));
const ColumnsPage = lazy(() => import("./Pages/Elements/Columns"));
const BlockquotePage = lazy(() => import("./Pages/Elements/Blockquote"));
const HighlightsPage = lazy(() => import("./Pages/Elements/Highlights"));
const MessageBoxPage = lazy(() => import("./Pages/Elements/MessageBox"));
const SocialIconsPage = lazy(() => import("./Pages/Elements/SocialIcons"));
const ListsPage = lazy(() => import("./Pages/Elements/Lists"));
const SeparatorsPage = lazy(() => import("./Pages/Elements/Separators"));
const PricingTablePage = lazy(() => import("./Pages/Elements/PricingTable"));
const ElementPage = lazy(() => import("./Pages/Elements"));

const PortfolioPage = lazy(() => import("./Pages/Portfolios"));
const PortfolioClassicTwoColPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioClassic/PortfolioClassicTwoColumn")
);
const PortfolioClassicThreeColPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioClassic/PortfolioClassicThreeColumn")
);
const PortfolioClassicFourColPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioClassic/PortfolioClassicFourColumn")
);
const PortfolioClassicMasonryPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioClassic/portfolioClassicMasonry")
);
const PortfolioClassicMetroPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioClassic/PortfolioClassicMetro")
);

const PortfolioBorderedTwoColPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioBordered/PortfolioBorderedTwoColumn")
);
const PortfolioBorderedThreeColPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioBordered/PortfolioBorderedThreeColumn")
);
const PortfolioBorderedFourColPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioBordered/PortfolioBorderedFourColumn")
);
const PortfolioBorderedMasonryPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioBordered/PortfolioBorderedMasonry")
);
const PortfolioBorderedMetroPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioBordered/PortfolioBorderedMetro")
);

const PortfolioBoxedTwoColPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioBoxed/PortfolioBoxedTwoColumn")
);
const PortfolioBoxedThreeColPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioBoxed/PortfolioBoxedThreeColumn")
);
const PortfolioBoxedFourColPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioBoxed/PortfolioBoxedFourColumn")
);
const PortfolioBoxedMasonryPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioBoxed/PortfolioBoxedMasonry")
);
const PortfolioBoxedMetroPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioBoxed/PortfolioBoxedMetro")
);

const PortfolioColorfulTwoColPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioColorful/PortfolioColorfulTwoColumn")
);
const PortfolioColorfulThreeColPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioColorful/PortfolioColorfulThreeColumn")
);
const PortfolioColorfulFourColPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioColorful/PortfolioColorfulFourColumn")
);
const PortfolioColorfulMasonryPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioColorful/PortfolioColorfulMasonry")
);
const PortfolioColorfulMetroPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioColorful/PortfolioColorfulMetro")
);

const PortfolioOverlayTwoColPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioOverlay/PortfolioOverlayTwoColumn")
);
const PortfolioOverlayThreeColPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioOverlay/PortfolioOverlayThreeColumn")
);
const PortfolioOverlayFourColPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioOverlay/PortfolioOverlayFourColumn")
);
const PortfolioOverlayMetroPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioOverlay/PortfolioOverlayMetro")
);
const PortfolioOverlayMasonryPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioOverlay/PortfolioOverlayMasonry")
);
const PortfolioSwitchImgTwoColPage = lazy(() =>
  import(
    "./Pages/Portfolios/PortfolioSwitchImage/PortfolioSwitchImageTwoColumn"
  )
);
const PortfolioSwitchImgThreeColPage = lazy(() =>
  import(
    "./Pages/Portfolios/PortfolioSwitchImage/PortfolioSwitchImageThreeColumn"
  )
);
const PortfolioSwitchImgFourColPage = lazy(() =>
  import(
    "./Pages/Portfolios/PortfolioSwitchImage/PortfolioSwitchImageFourColumn"
  )
);
const PortfolioSwitchImgMasonryPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioSwitchImage/PortfolioSwitchImageMasonry")
);
const PortfolioSwitchImgMetroPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioSwitchImage/PortfolioSwitchImageMetro")
);
const PortfolioScatteredPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioScattered")
);
const PortfolioJustifiedGalleryPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioJustifiedGallery")
);
const PortfolioSliderPage = lazy(() =>
  import("./Pages/Portfolios/PortfolioSlider")
);
const SingleProjectPage01 = lazy(() =>
  import("./Pages/Portfolios/SingleProjectPage01")
);
const SingleProjectPage02 = lazy(() =>
  import("./Pages/Portfolios/SingleProjectPage02")
);
const SingleProjectPage03 = lazy(() =>
  import("./Pages/Portfolios/SingleProjectPage03")
);
const SingleProjectPage04 = lazy(() =>
  import("./Pages/Portfolios/SingleProjectPage04")
);
const SingleProjectPage05 = lazy(() =>
  import("./Pages/Portfolios/SingleProjectPage05")
);

// Header
const TransparentHeaderPage = lazy(() =>
  import("./Pages/Header/TransparentHeaderPage")
);
const WhiteHeaderPage = lazy(() => import("./Pages/Header/WhiteHeaderPage"));
const DarkHeaderPage = lazy(() => import("./Pages/Header/DarkHeaderPage"));
const HeaderwithTopbarPage = lazy(() =>
  import("./Pages/Header/HeaderwithTopbarPage")
);
const HeaderWithPushPage = lazy(() =>
  import("./Pages/Header/HeaderWithPushPage")
);
const CenterNavigationPage = lazy(() =>
  import("./Pages/Header/CenterNavigationPage")
);
const CenterLogoPage = lazy(() => import("./Pages/Header/CenterLogoPage"));
const TopLogoPage = lazy(() => import("./Pages/Header/TopLogoPage"));
const OnePageNavigationPage = lazy(() =>
  import("./Pages/Header/OnePageNavigationPage")
);
const LeftMenuClassicPage = lazy(() =>
  import("./Pages/Header/LeftMenuClassicPage")
);
const LeftMenuModernPage = lazy(() =>
  import("./Pages/Header/LeftMenuModernPage")
);
const HeaderAlwaysFixedPage = lazy(() =>
  import("./Pages/Header/HeaderTypes/HeaderAlwaysFixedPage")
);
const HeaderResponsiveSticky = lazy(() =>
  import("./Pages/Header/HeaderTypes/HeaderResponsiveSticky")
);
const HeaderDisableFixed = lazy(() =>
  import("./Pages/Header/HeaderTypes/HeaderDisableFixed")
);
const HeaderReverseScroll = lazy(() =>
  import("./Pages/Header/HeaderTypes/HeaderReverseScroll")
);
const MobileMenuClassicPage = lazy(() =>
  import("./Pages/Header/MobileMenu/MobileMenuClassicPage")
);
const MobileMenuModernPage = lazy(() =>
  import("./Pages/Header/MobileMenu/MobileMenuModernPage")
);
const MobileMenuFullScreen = lazy(() =>
  import("./Pages/Header/MobileMenu/MobileMenuFullScreen")
);
const HamburgerMenuPage = lazy(() =>
  import("./Pages/Header/HamburgerMenu/HamburgerMenuPage")
);
const HamburgerMenuModernPage = lazy(() =>
  import("./Pages/Header/HamburgerMenu/HamburgerMenuModernPage")
);
const HamburgerMenuHalfPage = lazy(() =>
  import("./Pages/Header/HamburgerMenu/HamburgerMenuHalfPage")
);

// Footer
const FooterStyle01Page = lazy(() =>
  import("./Pages/Footer/FooterStyle01Page")
);
const FooterStyle02Page = lazy(() =>
  import("./Pages/Footer/FooterStyle02Page")
);
const FooterStyle03Page = lazy(() =>
  import("./Pages/Footer/FooterStyle03Page")
);
const FooterStyle04Page = lazy(() =>
  import("./Pages/Footer/FooterStyle04Page")
);
const FooterStyle05Page = lazy(() =>
  import("./Pages/Footer/FooterStyle05Page")
);
const FooterStyle06Page = lazy(() =>
  import("./Pages/Footer/FooterStyle06Page")
);
const FooterStyle07Page = lazy(() =>
  import("./Pages/Footer/FooterStyle07Page")
);
const FooterStyle08Page = lazy(() =>
  import("./Pages/Footer/FooterStyle08Page")
);
const FooterStyle09Page = lazy(() =>
  import("./Pages/Footer/FooterStyle09Page")
);
const FooterStyle10Page = lazy(() =>
  import("./Pages/Footer/FooterStyle10Page")
);
const FooterStyle11Page = lazy(() =>
  import("./Pages/Footer/FooterStyle11Page")
);
const FooterStyle12Page = lazy(() =>
  import("./Pages/Footer/FooterStyle12Page")
);

// Model-Popup
const ModalPopupPage = lazy(() => import("./Pages/ModalPopup"));
const SimpleModel = lazy(() => import("./Pages/ModelPopup/SimpleModel"));
const ContactFormModal = lazy(() =>
  import("./Pages/ModelPopup/ContactFormModal")
);
const SubscriptionModal = lazy(() =>
  import("./Pages/ModelPopup/SubscriptionModal")
);
const VimeoVideoModal = lazy(() =>
  import("./Pages/ModelPopup/VimeoVideoModal")
);
const YouTubeVideoModal = lazy(() =>
  import("./Pages/ModelPopup/YouTubeVideoModal")
);
const GoogleMapModal = lazy(() => import("./Pages/ModelPopup/GoogleMapModal"));

// Icon Packs
const IconsMindLinePage = lazy(() => import("./Pages/Icons/IconsMindIconPage"));
const IconsMindSolidPage = lazy(() =>
  import("./Pages/Icons/IconsMindSolidPage")
);
const FontAwesomeIconPage = lazy(() =>
  import("./Pages/Icons/FontAwesomeIconPage")
);
const FeatherIconPage = lazy(() => import("./Pages/Icons/FeatherIconPage"));
const EtLineIconPage = lazy(() => import("./Pages/Icons/EtLineIconPage"));
const SimplelineIconPage = lazy(() =>
  import("./Pages/Icons/SimplelineIconPage")
);
const ThemifyIconPage = lazy(() => import("./Pages/Icons/ThemifyIconPage"));
const AnimationPage = lazy(() => import("./Pages/Animation"));

// Page-Title
const LeftAlignmentPage = lazy(() =>
  import("./Pages/PageTitle/LeftAlignmentPage")
);
const RightAlignmentPage = lazy(() =>
  import("./Pages/PageTitle/RightAlignmentPage")
);
const CenterAlignmentPage = lazy(() =>
  import("./Pages/PageTitle/CenterAlignmentPage")
);
const ColorfulStylePage = lazy(() =>
  import("./Pages/PageTitle/ColorfulStylePage")
);
const ParallaxBackground = lazy(() =>
  import("./Pages/PageTitle/ParallaxBackground")
);
const SeparateBreadcrumbsPage = lazy(() =>
  import("./Pages/PageTitle/SeparateBreadcrumbsPage")
);
const GalleryBackgroundPage = lazy(() =>
  import("./Pages/PageTitle/GalleryBackgroundPage")
);
const BackgroundVideoPage = lazy(() =>
  import("./Pages/PageTitle/BackgroundVideoPage")
);
const MiniVersionPage = lazy(() => import("./Pages/PageTitle/MiniVersionPage"));
const BigTypographyPage = lazy(() =>
  import("./Pages/PageTitle/BigTypographyPage")
);
const PageTitle = lazy(() => import("./Pages/PageTitle"));

// About Pages
const AboutMePage = lazy(() => import("./Pages/About/AboutMePage"));
const AboutUsPage = lazy(() => import("./Pages/About/AboutUsPage"));
const OurStoryPage = lazy(() => import("./Pages/About/OurStoryPage"));
const WhoWeArePage = lazy(() => import("./Pages/About/WhoWeArePage"));

// Services Pages
const OurServicesPage = lazy(() => import("./Pages/Services/OurServicesPage"));
const WhatWeOfferPage = lazy(() => import("./Pages/Services/WhatWeOfferPage"));
const OurProcessPage = lazy(() => import("./Pages/Services/OurProcessPage"));

// Contact Pages
const ContactUsSimplePage = lazy(() =>
  import("./Pages/Contact/ContactUsSimplePage")
);
const ContactUsClassicPage = lazy(() =>
  import("./Pages/Contact/ContactUsClassicPage")
);
const ContactUsModernPage = lazy(() =>
  import("./Pages/Contact/ContactUsModernPage")
);

// Additional Pages
const LatestNewsPage = lazy(() =>
  import("./Pages/AdditionalPages/LatestNewsPage")
);
const OurTeamPage = lazy(() => import("./Pages/AdditionalPages/OurTeamPage"));
const FreelancerPage = lazy(() => import("./Pages/Home/Freelancer"));
const PricingPackagesPage = lazy(() =>
  import("./Pages/AdditionalPages/PricingPackagesPage")
);
const NotFoundPage = lazy(() => import("./Pages/404"));
const MaintenancePage = lazy(() =>
  import("./Pages/AdditionalPages/MaintenancePage")
);
const ComingSoonPage = lazy(() =>
  import("./Pages/AdditionalPages/ComingSoonPage")
);
const ComingSoonV2Page = lazy(() =>
  import("./Pages/AdditionalPages/ComingSoonV2Page")
);
const FaqSPage = lazy(() => import("./Pages/AdditionalPages/FaqSPage"));
const SearchResultPage = lazy(() =>
  import("./Pages/AdditionalPages/SearchResultPage")
);

// Shop Pages
const ShopWidePage = lazy(() => import("./Pages/Shop/ShopWide"));
const HomeBlogMetroPage = lazy(() => import("./Pages/Home/BlogMetro"));
const ShoppingCart = lazy(() => import("./Pages/Shop/ShoppingCart"));
const Checkout = lazy(() => import("./Pages/Shop/Checkout"));
const LoginRegister = lazy(() => import("./Pages/Shop/LoginRegister"));
const SingleProduct = lazy(() => import("./Pages/Shop/SingleProduct"));
const OnlyCategoriesPage = lazy(() => import("./Pages/Shop/OnlyCategories"));
const RightSidebar = lazy(() => import("./Pages/Shop/RightSidebar"));
const LeftSidebar = lazy(() => import("./Pages/Shop/LeftSideBar"));
const Footer = lazy(() => import("./Pages/Footer"));
const Privacy = lazy(() => import("./Pages/Privacy"));

// Blogs
const BlogPage = lazy(() => import("./Pages/Blogs"));
const BlogGridPage = lazy(() => import("./Pages/Blogs/BlogGrid"));
const BlogMasonryPage = lazy(() => import("./Pages/Blogs/BlogMasonry"));
const BlogClassicPage = lazy(() => import("./Pages/Blogs/BlogClassic"));
const BlogSimplePage = lazy(() => import("./Pages/Blogs/BlogSimple"));
const BlogSideImPage = lazy(() => import("./Pages/Blogs/BlogSideImg"));
const BlogMetroPage = lazy(() => import("./Pages/Blogs/BlogMetro"));
const BlogModernPage = lazy(() => import("./Pages/Blogs/BlogModern"));
const BlogCleanPage = lazy(() => import("./Pages/Blogs/BlogClean"));
const BlogWidgetPage = lazy(() => import("./Pages/Blogs/BlogWidget"));
const BlogOverlayImgPage = lazy(() => import("./Pages/Blogs/BlogOverlayImg"));
const BlogStandardPage = lazy(() => import("./Pages/Blogs/BlogStandard"));
const CategoryPage = lazy(() => import("./Pages/Blogs/CategoryPage"));
const AuthorPage = lazy(() => import("./Pages/Blogs/AuthorPage"));

const BlogPostLayout01 = lazy(() =>
  import("./Pages/Blogs/LayoutPage/BlogPostLayout01")
);
const BlogPostLayout02 = lazy(() =>
  import("./Pages/Blogs/LayoutPage/BlogPostLayout02")
);
const BlogPostLayout03 = lazy(() =>
  import("./Pages/Blogs/LayoutPage/BlogPostLayout03")
);
const BlogPostLayout04 = lazy(() =>
  import("./Pages/Blogs/LayoutPage/BlogPostLayout04")
);
const BlogPostLayout05 = lazy(() =>
  import("./Pages/Blogs/LayoutPage/BlogPostLayout05")
);

// Blogs Types
const BlogGalleryPostPage = lazy(() =>
  import("./Pages/Blogs/PostTypes/BlogGalleryPostPage")
);
const BlogStandardPostPage = lazy(() =>
  import("./Pages/Blogs/PostTypes/BlogStandardPostPage")
);
const BlogSliderPostPage = lazy(() =>
  import("./Pages/Blogs/PostTypes/BlogSliderPostPage")
);
const BlogHtml5VideoPostPage = lazy(() =>
  import("./Pages/Blogs/PostTypes/BlogHtml5VideoPostPage")
);
const BlogYoutubeVideoPostPage = lazy(() =>
  import("./Pages/Blogs/PostTypes/BlogYoutubeVideoPostPage")
);
const BlogVimeoVideoPostPage = lazy(() =>
  import("./Pages/Blogs/PostTypes/BlogVimeoVideoPostPage")
);
const BlogAudioPostPage = lazy(() =>
  import("./Pages/Blogs/PostTypes/BlogAudioPostPage")
);
const BlogBlockquotePostPage = lazy(() =>
  import("./Pages/Blogs/PostTypes/BlogBlockquotePostPage")
);
const BlogFullWidthPost = lazy(() =>
  import("./Pages/Blogs/PostTypes/BlogFullWidthPost")
);

function App() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customModal, setCustomModal] = useState({
    el: null,
    isOpen: false,
  });
  const location = useLocation();

  // RetinaJS
  useEffect(() => {
    window.addEventListener("load", retina(document.querySelectorAll("img")));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      import("./Functions/Utilities").then((module) => {
        module.SetHeaderMenuPos();
        module.setDocumentFullHeight();
      });
    }, 1000);
  }, [location]);

  useEffect(() => {
    if (isModalOpen === true) {
      document.querySelector("body").classList.add("overflow-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }, [isModalOpen]);

  // Get the current location and set the window to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    setFooterHeight(0);
    setCustomModal({
      ...customModal,
      el: null,
      isOpen: false,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <GlobalContext.Provider
      value={{
        headerHeight,
        setHeaderHeight,
        footerHeight,
        setFooterHeight,
        isModalOpen,
        setIsModalOpen,
        customModal,
        setCustomModal,
      }}
    >
      <div className="App" style={{ "--header-height": `${headerHeight}px` }}>
        {
          <main style={{ marginTop: headerHeight, marginBottom: footerHeight }}>
            <ScrollToTopButton />
            <AnimatePresence mode="wait">
              <Suspense fallback={<></>}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />

                  {/* Headers */}
                  <Route path="headers">
                    <Route
                      path="transparent-header"
                      element={
                        <TransparentHeaderPage
                          style={{ "--base-color": "#0038e3" }}
                        />
                      }
                    />
                    <Route path="white-header" element={<WhiteHeaderPage />} />
                    <Route path="dark-header" element={<DarkHeaderPage />} />
                    <Route
                      path="header-with-top-bar"
                      element={
                        <HeaderwithTopbarPage
                          style={{ "--base-color": "#828282" }}
                        />
                      }
                    />
                    <Route
                      path="header-with-push"
                      element={
                        <HeaderWithPushPage
                          style={{ "--base-color": "#828282" }}
                        />
                      }
                    />
                    <Route
                      path="center-navigation"
                      element={<CenterNavigationPage />}
                    />{" "}
                    <Route path="center-logo" element={<CenterLogoPage />} />
                    <Route path="top-logo" element={<TopLogoPage />} />
                    <Route
                      path="one-page-navigation"
                      element={
                        <OnePageNavigationPage
                          style={{ "--base-color": "#f4d956" }}
                        />
                      }
                    />
                    <Route
                      path="header-always-fixed"
                      element={<HeaderAlwaysFixedPage />}
                    />{" "}
                    <Route
                      path="header-disable-fixed"
                      element={<HeaderDisableFixed />}
                    />
                    <Route
                      path="header-reverse-scroll"
                      element={<HeaderReverseScroll />}
                    />{" "}
                    <Route
                      path="header-responsive-sticky"
                      element={
                        <HeaderResponsiveSticky
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="left-menu-classic"
                      element={<LeftMenuClassicPage />}
                    />{" "}
                    <Route
                      path="left-menu-modern"
                      element={
                        <LeftMenuModernPage
                          style={{ "--base-color": "#c7da26" }}
                        />
                      }
                    />
                    <Route
                      path="mobile-menu-classic"
                      element={<MobileMenuClassicPage />}
                    />{" "}
                    <Route
                      path="mobile-menu-modern"
                      element={<MobileMenuModernPage />}
                    />
                    <Route
                      path="mobile-menu-full-screen"
                      element={<MobileMenuFullScreen />}
                    />{" "}
                    <Route
                      path="hamburger-menu"
                      element={<HamburgerMenuPage />}
                    />
                    <Route
                      path="hamburger-menu-modern"
                      element={
                        <HamburgerMenuModernPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="hamburger-menu-half"
                      element={
                        <HamburgerMenuHalfPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                  </Route>

                  {/* Footers */}
                  <Route
                    path="footers"
                    element={<Footer style={{ "--base-color": "#0038e3" }} />}
                  >
                    <Route
                      path="footer-style-01"
                      element={
                        <FooterStyle01Page
                          style={{ "--base-color": "#0038e3" }}
                        />
                      }
                    />
                    <Route
                      path="footer-style-02"
                      element={
                        <FooterStyle02Page
                          style={{ "--base-color": "#0038e3" }}
                        />
                      }
                    />
                    <Route
                      path="footer-style-03"
                      element={
                        <FooterStyle03Page
                          style={{ "--base-color": "#0038e3" }}
                        />
                      }
                    />
                    <Route
                      path="footer-style-04"
                      element={
                        <FooterStyle04Page
                          style={{ "--base-color": "#0038e3" }}
                        />
                      }
                    />
                    <Route
                      path="footer-style-05"
                      element={
                        <FooterStyle05Page
                          style={{ "--base-color": "#0038e3" }}
                        />
                      }
                    />
                    <Route
                      path="footer-style-06"
                      element={
                        <FooterStyle06Page
                          style={{ "--base-color": "#0038e3" }}
                        />
                      }
                    />
                    <Route
                      path="footer-style-07"
                      element={
                        <FooterStyle07Page
                          style={{ "--base-color": "#0038e3" }}
                        />
                      }
                    />
                    <Route
                      path="footer-style-08"
                      element={
                        <FooterStyle08Page
                          style={{ "--base-color": "#0038e3" }}
                        />
                      }
                    />
                    <Route
                      path="footer-style-09"
                      element={
                        <FooterStyle09Page style={{ "--base-color": "#fff" }} />
                      }
                    />
                    <Route
                      path="footer-style-10"
                      element={
                        <FooterStyle10Page
                          style={{ "--base-color": "#0038e3" }}
                        />
                      }
                    />
                    <Route
                      path="footer-style-10"
                      element={
                        <FooterStyle10Page
                          style={{ "--base-color": "#0038e3" }}
                        />
                      }
                    />
                    <Route
                      path="footer-style-11"
                      element={
                        <FooterStyle11Page
                          style={{ "--base-color": "#0038e3" }}
                        />
                      }
                    />
                    <Route
                      path="footer-style-12"
                      element={
                        <FooterStyle12Page
                          style={{ "--base-color": "#0038e3" }}
                        />
                      }
                    />
                  </Route>

                  {/* Home Corporate*/}
                  <Route
                    path="/home-startup"
                    element={
                      <HomeStartupPage style={{ "--base-color": "#27ae60" }} />
                    }
                  />
                  <Route
                    path="/home-business"
                    element={
                      <HomeBusinessPage style={{ "--base-color": "#3452ff" }} />
                    }
                  />
                  <Route
                    path="/home-corporate"
                    element={
                      <CorporatePage style={{ "--base-color": "#2ed47c" }} />
                    }
                  />
                  <Route
                    path="/home-finance"
                    element={
                      <FinancePage style={{ "--base-color": "#8bb867" }} />
                    }
                  />
                  <Route
                    path="/home-application"
                    element={
                      <ApplicationPage style={{ "--base-color": "#502e95" }} />
                    }
                  />
                  <Route
                    path="/home-consulting"
                    element={
                      <ConsultingPage style={{ "--base-color": "#bf8c4c" }} />
                    }
                  />
                  <Route
                    path="/home-digital-agency"
                    element={
                      <DigitalagencyPage
                        style={{ "--base-color": "#e6994e" }}
                      />
                    }
                  />
                  <Route
                    path="/home-seo-agency"
                    element={
                      <SeoAgencyPage style={{ "--base-color": "#374162" }} />
                    }
                  />
                  <Route
                    path="/home-events-conference"
                    element={
                      <EventsConferencePage
                        style={{ "--base-color": "#ff7a56" }}
                      />
                    }
                  />
                  <Route
                    path="/home-marketing-agency"
                    element={
                      <MarketingAgencyPage
                        style={{ "--base-color": "#f4d956" }}
                      />
                    }
                  />

                  {/* Home Specialized */}
                  <Route path="/home-restaurant" element={<RestaurantPage />} />
                  <Route
                    path="/home-architecture"
                    element={
                      <ArchitecturePage style={{ "--base-color": "#cee002" }} />
                    }
                  />
                  <Route
                    path="/home-hotel-resort"
                    element={
                      <HotelResortPage style={{ "--base-color": "#c89965" }} />
                    }
                  />
                  <Route
                    path="/home-travel-agency"
                    element={
                      <TravelAgencyPage style={{ "--base-color": "#ff7a56" }} />
                    }
                  />
                  <Route
                    path="/home-yoga-meditation"
                    element={
                      <YogaMeditationPage
                        style={{ "--base-color": "#EA9D8D" }}
                      />
                    }
                  />
                  <Route
                    path="/home-gym-fitness"
                    element={
                      <GymFitnessPage style={{ "--base-color": "#ff7a56" }} />
                    }
                  />
                  <Route
                    path="/home-spa-salon"
                    element={
                      <SpaSalonPage style={{ "--base-color": "#ec606c" }} />
                    }
                  />
                  <Route
                    path="/home-cafe"
                    element={<CafePage style={{ "--base-color": "#cd9452" }} />}
                  />
                  <Route
                    path="/home-decor"
                    element={
                      <HomeDecorPage style={{ "--base-color": "#bf8c4c" }} />
                    }
                  />
                  <Route
                    path="/home-dentist"
                    element={
                      <DentistPage style={{ "--base-color": "#00b8b8" }} />
                    }
                  />
                  <Route
                    path="/home-interior-design"
                    element={
                      <InteriorDesignPage
                        style={{ "--base-color": "#c3964e" }}
                      />
                    }
                  />

                  {/* Home Specialized */}
                  <Route
                    path="/home-design-agency"
                    element={
                      <DesignagencyPage style={{ "--base-color": "#ffcc2e" }} />
                    }
                  />
                  <Route
                    path="/home-web-agency"
                    element={
                      <WebagencyPage style={{ "--base-color": "#ffcc2e" }} />
                    }
                  />
                  <Route
                    path="/home-creative-agency"
                    element={
                      <CreativeAgencyPage
                        style={{ "--base-color": "#cc754c" }}
                      />
                    }
                  />
                  <Route
                    path="/home-branding-agency"
                    element={
                      <BrandingagencyPage
                        style={{ "--base-color": "#cc754c" }}
                      />
                    }
                  />
                  <Route
                    path="/home-photography"
                    element={
                      <PhotographyPage style={{ "--base-color": "#c7da26" }} />
                    }
                  />
                  <Route
                    path="/home-personal-portfolio"
                    element={
                      <PersonalportfolioPage
                        style={{ "--base-color": "#ffeb04" }}
                      />
                    }
                  />
                  <Route
                    path="/home-interactive-portfolio"
                    element={
                      <InteractiveportfolioPage
                        style={{ "--base-color": "#ffeb04" }}
                      />
                    }
                  />
                  <Route
                    path="/home-creative-portfolio"
                    element={<CreativeportfolioPage />}
                  />
                  <Route
                    path="/home-vertical-portfolio"
                    element={<VerticalportfolioPage />}
                  />
                  <Route
                    path="/home-split-portfolio"
                    element={<SplitPortfolioPage />}
                  />
                  <Route path="/home-freelancer" element={<FreelancerPage />} />

                  {/* Home Other */}
                  <Route
                    path="/home-furniture-shop"
                    element={
                      <FurnitureShopPage
                        style={{ "--base-color": "#ff6437" }}
                      />
                    }
                  />
                  <Route
                    path="/home-fashion-shop"
                    element={
                      <FashionShopPage style={{ "--base-color": "#000" }} />
                    }
                  />
                  <Route
                    path="/home-magazine"
                    element={
                      <MagazinePage style={{ "--base-color": "#c89965" }} />
                    }
                  />
                  <Route
                    path="/home-lifestyle-blog"
                    element={
                      <LifestyleBlogPage
                        style={{ "--base-color": "#FE7A56" }}
                      />
                    }
                  />
                  <Route
                    path="/home-classic-blog"
                    element={<ClassicBlogPage />}
                  />
                  <Route
                    path="/home-blog-metro"
                    element={
                      <HomeBlogMetroPage
                        style={{ "--base-color": "#0038e3" }}
                      />
                    }
                  />

                  {/* Elements */}
                  <Route
                    path="elements"
                    element={
                      <ElementPage style={{ "--base-color": "#0038e3" }} />
                    }
                  >
                    <Route path="accordions" element={<AccordionPage />} />
                    <Route path="buttons" element={<ButtonPage />} />
                    <Route path="teams" element={<TeamPage />} />
                    <Route
                      path="team-carousel"
                      element={<TeamCarouselPage />}
                    />
                    <Route path="clients" element={<ClientPage />} />
                    <Route
                      path="client-carousel"
                      element={<ClientCarouselPage />}
                    />{" "}
                    <Route path="subscribe" element={<SubscribePage />} />
                    <Route
                      path="call-to-action"
                      element={<CallToActionPage />}
                    />
                    <Route path="tab" element={<TabPage />} />
                    <Route path="google-map" element={<GoogleMapPage />} />
                    <Route path="contact-form" element={<ContactFormPage />} />
                    <Route
                      path="image-gallery"
                      element={<ImageGalleryPage />}
                    />
                    <Route path="progress-bar" element={<ProgressBarPage />} />
                    <Route
                      path="icon-with-text"
                      element={<IconWithTextPage />}
                    />
                    <Route
                      path="overline-icon-box"
                      element={<OverLineIconBoxPage />}
                    />{" "}
                    <Route
                      path="custom-icon-with-text"
                      element={<CustomIconWithTextPage />}
                    />
                    <Route path="counters" element={<CountersPage />} />
                    <Route path="countdown" element={<CountDownPage />} />
                    <Route path="pie-chart" element={<PieChartPage />} />
                    <Route
                      path="fancy-text-box"
                      element={<FancyTextBoxPage />}
                    />
                    <Route path="text-box" element={<TextBoxPage />} />
                    <Route path="team" element={<TeamPage />} />
                    <Route path="fancy-text" element={<FancyTextPage />} />
                    <Route path="testimonials" element={<TestimonialsPage />} />
                    <Route
                      path="testimonials-carousel"
                      element={<TestimonialsCarouselPage />}
                    />{" "}
                    <Route path="video" element={<VideoPage />} />
                    <Route
                      path="interactive-banners"
                      element={<InteractiveBannersPage />}
                    />{" "}
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="info-banner" element={<InfoBannerPage />} />
                    <Route path="rotate-box" element={<RotateBoxPage />} />
                    <Route path="process-step" element={<ProcessStepPage />} />
                    <Route path="instagram" element={<InstagramPage />} />
                    <Route
                      path="parallax-scrolling"
                      element={<ParallaxScrollingPage />}
                    />{" "}
                    <Route path="text-slider" element={<TextSliderPage />} />
                    <Route path="heading" element={<HeadingPage />} />
                    <Route path="dropcaps" element={<DropCapsPage />} />
                    <Route path="columns" element={<ColumnsPage />} />
                    <Route path="blockquote" element={<BlockquotePage />} />
                    <Route path="highlights" element={<HighlightsPage />} />
                    <Route path="message-box" element={<MessageBoxPage />} />
                    <Route path="social-icons" element={<SocialIconsPage />} />
                    <Route path="lists" element={<ListsPage />} />
                    <Route path="separators" element={<SeparatorsPage />} />
                    <Route
                      path="pricing-table"
                      element={<PricingTablePage />}
                    />
                  </Route>

                  {/* Portfolios */}
                  <Route
                    path="portfolio"
                    element={
                      <PortfolioPage style={{ "--base-color": "#0038e3" }} />
                    }
                  >
                    <Route
                      path="portfolio-classic-two-column"
                      element={
                        <PortfolioClassicTwoColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-classic-three-column"
                      element={
                        <PortfolioClassicThreeColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-classic-four-column"
                      element={
                        <PortfolioClassicFourColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-classic-masonry"
                      element={
                        <PortfolioClassicMasonryPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-classic-metro"
                      element={
                        <PortfolioClassicMetroPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-boxed-two-column"
                      element={
                        <PortfolioBoxedTwoColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-boxed-three-column"
                      element={
                        <PortfolioBoxedThreeColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-boxed-four-column"
                      element={
                        <PortfolioBoxedFourColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-boxed-masonry"
                      element={
                        <PortfolioBoxedMasonryPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-boxed-metro"
                      element={
                        <PortfolioBoxedMetroPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-colorful-two-column"
                      element={
                        <PortfolioColorfulTwoColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-colorful-three-column"
                      element={
                        <PortfolioColorfulThreeColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-colorful-four-column"
                      element={
                        <PortfolioColorfulFourColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-colorful-masonry"
                      element={
                        <PortfolioColorfulMasonryPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-colorful-metro"
                      element={
                        <PortfolioColorfulMetroPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-bordered-two-column"
                      element={
                        <PortfolioBorderedTwoColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-bordered-three-column"
                      element={
                        <PortfolioBorderedThreeColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-bordered-four-column"
                      element={
                        <PortfolioBorderedFourColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-bordered-masonry"
                      element={
                        <PortfolioBorderedMasonryPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-bordered-metro"
                      element={
                        <PortfolioBorderedMetroPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-overlay-two-column"
                      element={
                        <PortfolioOverlayTwoColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-overlay-three-column"
                      element={
                        <PortfolioOverlayThreeColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-overlay-four-column"
                      element={
                        <PortfolioOverlayFourColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-overlay-masonry"
                      element={
                        <PortfolioOverlayMasonryPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-overlay-metro"
                      element={
                        <PortfolioOverlayMetroPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-switch-image-two-column"
                      element={
                        <PortfolioSwitchImgTwoColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-switch-image-three-column"
                      element={
                        <PortfolioSwitchImgThreeColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-switch-image-four-column"
                      element={
                        <PortfolioSwitchImgFourColPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-switch-image-masonry"
                      element={
                        <PortfolioSwitchImgMasonryPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-switch-image-metro"
                      element={
                        <PortfolioSwitchImgMetroPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-scattered"
                      element={
                        <PortfolioScatteredPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-justified-gallery"
                      element={
                        <PortfolioJustifiedGalleryPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                    <Route
                      path="portfolio-slider"
                      element={
                        <PortfolioSliderPage
                          style={{ "--base-color": "#fff" }}
                        />
                      }
                    />
                  </Route>

                  {/* SingleProjectPage*/}
                  <Route
                    path="/portfolio/single-project-page-01"
                    element={
                      <SingleProjectPage01
                        style={{ "--base-color": "#0038e3" }}
                      />
                    }
                  />
                  <Route
                    path="/portfolio/single-project-page-02"
                    element={
                      <SingleProjectPage02
                        style={{ "--base-color": "#0038e3" }}
                      />
                    }
                  />
                  <Route
                    path="/portfolio/single-project-page-03"
                    element={
                      <SingleProjectPage03
                        style={{ "--base-color": "#0038e3" }}
                      />
                    }
                  />
                  <Route
                    path="/portfolio/single-project-page-04"
                    element={
                      <SingleProjectPage04
                        style={{ "--base-color": "#fd961e" }}
                      />
                    }
                  />
                  <Route
                    path="/portfolio/single-project-page-05"
                    element={
                      <SingleProjectPage05
                        style={{ "--base-color": "#0038e3" }}
                      />
                    }
                  />

                  {/* Blogs */}
                  <Route
                    path="blogs"
                    element={<BlogPage style={{ "--base-color": "#0038e3" }} />}
                  >
                    <Route
                      path="blog-grid"
                      element={
                        <BlogGridPage style={{ "--base-color": "#0038e3" }} />
                      }
                    />
                    <Route
                      path="blog-masonry"
                      element={
                        <BlogMasonryPage
                          style={{ "--base-color": "#0038e3" }}
                        />
                      }
                    />
                    <Route path="blog-classic" element={<BlogClassicPage />} />
                    <Route path="blog-simple" element={<BlogSimplePage />} />
                    <Route
                      path="blog-side-image"
                      element={<BlogSideImPage />}
                    />
                    <Route path="blog-metro" element={<BlogMetroPage />} />
                    <Route
                      path="blog-overlay-image"
                      element={<BlogOverlayImgPage />}
                    />{" "}
                    <Route
                      path="blog-modern"
                      element={
                        <BlogModernPage style={{ "--base-color": "#0038e3" }} />
                      }
                    />
                    <Route path="blog-clean" element={<BlogCleanPage />} />
                    <Route path="blog-widget" element={<BlogWidgetPage />} />
                    <Route
                      path="blog-standard"
                      element={<BlogStandardPage />}
                    />
                    <Route path="category">
                      <Route path=":category" element={<CategoryPage />} />
                    </Route>
                    <Route path="author">
                      <Route path=":author" element={<AuthorPage />} />
                    </Route>
                  </Route>

                  {/* Blogs Types */}
                  <Route path="blog-types">
                    <Route path="blog-standard-post">
                      <Route
                        path=":id"
                        element={
                          <BlogStandardPostPage
                            style={{ "--base-color": "#0038e3" }}
                          />
                        }
                      />
                    </Route>
                    <Route path="blog-gallery-post">
                      <Route
                        path=":id"
                        element={
                          <BlogGalleryPostPage
                            style={{ "--base-color": "#0038e3" }}
                          />
                        }
                      />
                    </Route>
                    <Route path="blog-slider-post">
                      <Route
                        path=":id"
                        element={
                          <BlogSliderPostPage
                            style={{ "--base-color": "#0038e3" }}
                          />
                        }
                      />
                    </Route>
                    <Route path="blog-html5-video-post">
                      <Route
                        path=":id"
                        element={
                          <BlogHtml5VideoPostPage
                            style={{ "--base-color": "#0038e3" }}
                          />
                        }
                      />
                    </Route>
                    <Route path="blog-youtube-video-post">
                      <Route
                        path=":id"
                        element={
                          <BlogYoutubeVideoPostPage
                            style={{ "--base-color": "#0038e3" }}
                          />
                        }
                      />
                    </Route>
                    <Route path="blog-vimeo-video-post">
                      <Route
                        path=":id"
                        element={
                          <BlogVimeoVideoPostPage
                            style={{ "--base-color": "#0038e3" }}
                          />
                        }
                      />
                    </Route>
                    <Route path="blog-audio-post">
                      <Route
                        path=":id"
                        element={
                          <BlogAudioPostPage
                            style={{ "--base-color": "#0038e3" }}
                          />
                        }
                      />
                    </Route>
                    <Route path="blog-blockquote-post">
                      <Route
                        path=":id"
                        element={
                          <BlogBlockquotePostPage
                            style={{ "--base-color": "#0038e3" }}
                          />
                        }
                      />
                    </Route>
                    <Route path="blog-full-width-post">
                      <Route
                        path=":id"
                        element={
                          <BlogFullWidthPost
                            style={{ "--base-color": "#0038e3" }}
                          />
                        }
                      />
                    </Route>
                  </Route>

                  {/* Model-Popup */}
                  <Route path="model-popup" element={<ModalPopupPage />}>
                    <Route path="simple-modal" element={<SimpleModel />} />
                    <Route
                      path="subscription"
                      element={<SubscriptionModal />}
                    />
                    <Route path="contact-form" element={<ContactFormModal />} />
                    <Route
                      path="youtube-video"
                      element={<YouTubeVideoModal />}
                    />
                    <Route path="vimeo-video" element={<VimeoVideoModal />} />
                    <Route path="Google-map" element={<GoogleMapModal />} />
                  </Route>

                  {/* Icon Packs */}
                  <Route path="iconsmindline" element={<IconsMindLinePage />} />
                  <Route
                    path="iconsmindsolid"
                    element={<IconsMindSolidPage />}
                  />
                  <Route path="ETlineicon" element={<EtLineIconPage />} />
                  <Route path="fontawesome" element={<FontAwesomeIconPage />} />
                  <Route path="feather" element={<FeatherIconPage />} />
                  <Route path="simple-line" element={<SimplelineIconPage />} />
                  <Route path="themify" element={<ThemifyIconPage />} />
                  <Route path="animation" element={<AnimationPage />} />

                  {/* Page-Title */}
                  <Route path="page-title" element={<PageTitle />}>
                    <Route
                      path="left-alignment"
                      element={<LeftAlignmentPage />}
                    />{" "}
                    <Route
                      path="right-alignment"
                      element={<RightAlignmentPage />}
                    />
                    <Route
                      path="center-alignment"
                      element={<CenterAlignmentPage />}
                    />{" "}
                    <Route
                      path="colorful-style"
                      element={<ColorfulStylePage />}
                    />
                    <Route
                      path="big-typography"
                      element={<BigTypographyPage />}
                    />{" "}
                    <Route
                      path="parallax-background"
                      element={<ParallaxBackground />}
                    />
                    <Route
                      path="separate-breadcrumbs"
                      element={<SeparateBreadcrumbsPage />}
                    />{" "}
                    <Route
                      path="gallery-background"
                      element={<GalleryBackgroundPage />}
                    />
                    <Route
                      path="background-video"
                      element={<BackgroundVideoPage />}
                    />{" "}
                    <Route path="mini-version" element={<MiniVersionPage />} />
                  </Route>

                  {/* PostLayout */}
                  <Route
                    path="/blogs/blog-post-layout-01"
                    element={
                      <BlogPostLayout01 style={{ "--base-color": "#ca7741" }} />
                    }
                  />
                  <Route
                    path="/blogs/blog-post-layout-02"
                    element={
                      <BlogPostLayout02 style={{ "--base-color": "#c3964e" }} />
                    }
                  />
                  <Route
                    path="/blogs/blog-post-layout-03"
                    element={<BlogPostLayout03 />}
                  />
                  <Route
                    path="/blogs/blog-post-layout-04"
                    element={<BlogPostLayout04 />}
                  />
                  <Route
                    path="/blogs/blog-post-layout-05"
                    element={<BlogPostLayout05 />}
                  />

                  {/*About Pages */}
                  <Route
                    path="/page/about-me"
                    element={
                      <AboutMePage style={{ "--base-color": "#0038e3" }} />
                    }
                  />
                  <Route
                    path="/page/about-us"
                    element={
                      <AboutUsPage style={{ "--base-color": "#0038e3" }} />
                    }
                  />
                  <Route
                    path="/page/our-story"
                    element={
                      <OurStoryPage style={{ "--base-color": "#0038e3" }} />
                    }
                  />
                  <Route
                    path="/page/who-we-are"
                    element={
                      <WhoWeArePage style={{ "--base-color": "#0038e3" }} />
                    }
                  />

                  {/* Services Pages */}
                  <Route
                    path="/page/our-services"
                    element={
                      <OurServicesPage style={{ "--base-color": "#0038e3" }} />
                    }
                  />
                  <Route
                    path="/page/what-we-offer"
                    element={
                      <WhatWeOfferPage style={{ "--base-color": "#0038e3" }} />
                    }
                  />
                  <Route
                    path="/page/our-process"
                    element={
                      <OurProcessPage style={{ "--base-color": "#0038e3" }} />
                    }
                  />

                  {/* Contact Pages */}
                  <Route
                    path="/page/contact-simple"
                    element={
                      <ContactUsSimplePage
                        style={{ "--base-color": "#0038e3" }}
                      />
                    }
                  />
                  <Route
                    path="/page/contact-classic"
                    element={
                      <ContactUsClassicPage
                        style={{ "--base-color": "#0038e3" }}
                      />
                    }
                  />
                  <Route
                    path="/page/contact-modern"
                    element={
                      <ContactUsModernPage
                        style={{ "--base-color": "#0038e3" }}
                      />
                    }
                  />

                  {/* Additional Pages */}
                  <Route
                    path="/page/our-team"
                    element={
                      <OurTeamPage style={{ "--base-color": "#0038e3" }} />
                    }
                  />
                  <Route
                    path="/page/latest-news"
                    element={
                      <LatestNewsPage style={{ "--base-color": "#0038e3" }} />
                    }
                  />
                  <Route
                    path="/page/pricing-packages"
                    element={
                      <PricingPackagesPage
                        style={{ "--base-color": "#0038e3" }}
                      />
                    }
                  />
                  <Route
                    path="/page/error-404"
                    element={
                      <NotFoundPage style={{ "--base-color": "#0038e3" }} />
                    }
                  />
                  <Route
                    path="/page/maintenance"
                    element={<MaintenancePage />}
                  />
                  <Route
                    path="/page/coming-soon"
                    element={<ComingSoonPage />}
                  />
                  <Route
                    path="/page/coming-soon-V2"
                    element={<ComingSoonV2Page />}
                  />
                  <Route
                    path="/page/faq-s"
                    element={<FaqSPage style={{ "--base-color": "#0038e3" }} />}
                  />
                  <Route
                    path="/page/search-result"
                    element={
                      <SearchResultPage style={{ "--base-color": "#0038e3" }} />
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                  <Route
                    path="/privacy"
                    element={<Privacy style={{ "--base-color": "#0038e3" }} />}
                  />

                  {/* Shop Pages */}
                  <Route path="shop">
                    <Route path="shop-wide" element={<ShopWidePage />} />
                    <Route path="left-sidebar" element={<LeftSidebar />} />
                    <Route path="right-sidebar" element={<RightSidebar />} />
                    <Route
                      path="only-categories"
                      element={<OnlyCategoriesPage />}
                    />{" "}
                    <Route path="single-product" element={<SingleProduct />} />
                    <Route
                      path="shopping-cart"
                      element={
                        <ShoppingCart style={{ "--base-color": "#0038e3" }} />
                      }
                    />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="login-register" element={<LoginRegister />} />
                  </Route>
                </Routes>
              </Suspense>
            </AnimatePresence>
          </main>
        }
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
