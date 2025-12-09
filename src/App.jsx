// import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { React, createContext, useContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab);
import Layout from "./components/layout";
import { Page1, About, Contact } from "./components/outlets/pages";
import AuthModels from "./components/AuthModels.jsx";

import Dashboard from "./components/admindashboard/admin.jsx";
import Moredetails from "./components/outlets/moredetail.jsx";
import { Advertisement } from "./components/advertismentcategories/advertismentcategories";

import axios from "axios";
import OTPVerification from "./components/OTPVerification/OTPVerification.jsx";

function App() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Backend se data fetch karo
    //http://localhost:5000/api/v1/roles
    axios
      .get("https://car-advertisement-backend.onrender.com/api/v1/roles")
      .then((response) => {
        console.log(response.data.getAll);
        setAds(response.data.getAll); // jo data backend se aaya usay state me set karo
      })
      .catch((error) => {
        console.error("Error fetching ads:", error);
      });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<AuthModels />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Page1 ads={ads} />} />
          <Route path="/Dashboard" element={<Dashboard ads={ads} />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/car/:id" element={<Moredetails />} />
          <Route path="/Advertisement" element={<Advertisement />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
