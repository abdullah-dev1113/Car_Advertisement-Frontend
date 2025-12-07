import { Outlet, Link } from "react-router-dom";
import { Header } from "./header/top.jsx";
import Footer from "./footer/bottom.jsx";
import React from "react";

import OTPVerification from "./OTPVerification/OTPVerification.jsx";
// import {Footer} from './footer/bottom.jsx';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This will render the current route component */}
        {/* <Page1/> */}
        {/* <About/> */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
