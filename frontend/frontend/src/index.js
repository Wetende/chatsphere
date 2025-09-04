import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Libraries
import { BrowserRouter } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { LazyMotion, domMax } from "framer-motion";

// css
import "./Assets/css/icons.css";
import "./Assets/css/global.css";
import "./Assets/css/pages.css";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LazyMotion features={domMax}>
    <ParallaxProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ParallaxProvider>
  </LazyMotion>
);
