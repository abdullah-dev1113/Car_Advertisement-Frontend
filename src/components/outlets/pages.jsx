import { Col, Row, Carousel, Button } from "react-bootstrap";
import React from "react";
import { useAuth } from "../authcontext";
import car1 from "../image/car1.jpg";
import { useNavigate } from "react-router-dom";
import "./pages.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import suv from "../image/suv.jpg";
import Moun_Car from "../image/Moun_Car.jpeg";
import hybrid from "../image/hybrid.webp";
import roma from "../image/Roma.jpg";
import car from "../image/Car.Avif";
import X5 from "../image/X5.jpg";
import electric from "../image/electric.png";

import carpic2 from "../image/car picture2 .jpg";

import carpic4 from "../image/car picture4.jpg";
import carpic5 from "../image/car picture5.jpg";
import sedan from "../image/sedan.jpg";
import yaris from "../image/yaris.jpeg";

import slider from "../image/slider.jpeg";
import car_image from "../image/car_image.jpg";

import kia from "../image/kia.jpg";
import PostAdForm from "../modals/post advesitment";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function Page1() {
  const { user, setUser } = useAuth();

  const [ads, setAds] = useState([]); // 🔐 store ads

  const addAd = (newAd) => {
    setAds([...ads, newAd]); // 📦 new ad add karo
  };

  const Navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [cityArea, setCityArea] = useState("");
  const [allAds, setAllAds] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const [openDescription, setOpenDescription] = useState(null);

  // Fetch all ads on mount
  useEffect(() => {
    fetchAllAds();
  }, []);

  const fetchAllAds = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/v1/task");
      const sortedAds = res.data.found.sort(
        (a, b) => new Date(b.createdOn) - new Date(a.createdOn)
      );
      setAllAds(sortedAds); // used for categories & latest postings
    } catch (err) {
      console.error(err);
      setError("Failed to fetch ads.");
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (keyword || categoryFilter || cityArea) {
        setSearchMode(true);
        handleSearch();
      } else {
        setSearchMode(false);
        setSearchResults([]); // empty results when no search
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [keyword, categoryFilter, cityArea]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get("http://localhost:5000/api/v1/task/search", {
        params: { keyword, category: categoryFilter, cityArea },
      });

      const sortedResults = (res.data.found || [])
        .filter((ad) => ad.createdOn)
        .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));

      setSearchResults(sortedResults);
    } catch (err) {
      console.error(err);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Static category images
  const categoriesImages = {
    Sedan: sedan,
    BMW: X5,
    Crossover: car,
    "Yaris Cross": yaris,
    Electric: electric,
    SUV: suv,
    Hybrid: hybrid,
    Ferrari: roma,
  };

  const latestPostings = allAds; // simply use allAds sorted by createdOn

  return (
    <>
      {/* Carousel */}
      <div className="box-1">
        <Carousel>
          {[Moun_Car, slider].map((img, idx) => (
            <Carousel.Item key={idx}>
              <img className="img" src={img} alt={`Banner ${idx}`} />
              <Carousel.Caption className="caption">
                <h1>Shift Into Gear:</h1>
                <h2>Your Destination for Car Excellence</h2>
                <p>Drive Your Dream: Find Your Perfect Car Today</p>
                <div className="main-btn">
                  <Button
                    variant="primary"
                    style={{
                      padding: "10px 20px",
                      marginRight: "-75px",
                      fontSize: "15px",
                    }}
                    href="#search"
                  >
                    <FontAwesomeIcon icon={faSearch} className="me-2" />
                    Search a Car
                  </Button>

                  {user && (
                    <div>
                      <PostAdForm
                        onNewAd={(newAd) => setAds((prev) => [...prev, newAd])}
                        onSubmit={addAd}
                        ads={ads}
                      />
                    </div>
                  )}
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Search Bar */}
        <div className="main mt-3" id="search">
          <input
            type="text"
            className="input"
            placeholder="Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Select Category</option>
            {[...new Set(allAds.map((ad) => ad.Category))].map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            className="form-select"
            value={cityArea}
            onChange={(e) => setCityArea(e.target.value)}
          >
            <option value="">Select City Area</option>
            {[...new Set(allAds.map((ad) => ad.cityArea))].map((area, idx) => (
              <option key={idx} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Loading / Error */}
      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" variant="success" />
        </div>
      )}
      {error && <p className="text-center text-danger mt-3">{error}</p>}
      {/* Ads */}
      {searchMode && searchResults.length > 0 && (
        <Row className="m-4 g-4">
          {searchResults.map((ad) => (
            <Col key={ad._id} md={4} sm={6} xs={12}>
              <div className="clean-card">
                {/* Image */}
                <div className="clean-img-box">
                  <img
                    src={ad.image || car_image}
                    className="clean-img"
                    alt={ad.Title}
                  />
                </div>

                {/* Body */}
                <div className="clean-body">
                  <h5 className="clean-title">{ad.Title}</h5>
                  <p className="clean-price">Rs {ad.Price}</p>
                  <p className="clean-loc">📍 {ad.cityArea}</p>

                  {/* BUTTON */}
                  <button
                    className="clean-btn"
                    onClick={() =>
                      setOpenDescription(
                        openDescription === ad._id ? null : ad._id
                      )
                    }
                  >
                    {openDescription === ad._id
                      ? "Hide Details"
                      : "View Details"}
                  </button>

                  {/* Description */}
                  {openDescription === ad._id && (
                    <p className="clean-desc">
                      {ad.Description || "No description available."}
                    </p>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
      {/* Categories */}
      <h1 style={{ color: "green", textAlign: "center", margin: "20px" }}>
        Explore by Categories
      </h1>
      <div className="cards mt-4">
        <Row className="d-flex">
          <Col className="Col-3">
            <div className="box">
              <img className="image" src={sedan} alt="" />
              <div className="text">
                <h5>Sedan</h5>
                <p style={{ color: "green" }}>14 Cars</p>
              </div>
            </div>
          </Col>
          <Col className="Col-3">
            <div className="box">
              <img className="image" src={X5} alt="" />
              <div className="text">
                <h5>BMW</h5>
                <p style={{ color: "green" }}>11 Cars</p>
              </div>
            </div>
          </Col>

          <Col className="Col-3">
            <div className="box">
              <img className="image" src={car} alt="" />
              <div className="text">
                <h5>Crossover</h5>
                <p style={{ color: "green" }}>11 Cars</p>
              </div>
            </div>
          </Col>
          <Col className="Col-3">
            <div className="box">
              <img className="image" src={yaris} alt="" />
              <div className="text">
                <h5>Yaris Cross</h5>
                <p style={{ color: "green" }}>10 Cars</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row
        className="mt-5"
        style={{
          marginLeft: "35px",
          // marginBottom: "140px",
        }}
      >
        <Col className="Col-3">
          <div className="box">
            <img className="image" src={electric} alt="" />
            <div className="text">
              <h5>Electric</h5>
              <p style={{ color: "green" }}>12 Cars</p>
            </div>
          </div>
        </Col>
        <Col className="Col-3">
          <div className="box">
            <img className="image" src={suv} alt="" />
            <div className="text">
              <h5>SUV</h5>
              <p style={{ color: "green" }}>1 Cars</p>
            </div>
          </div>
        </Col>
        <Col className="Col-3">
          <div className="box">
            <img className="image" src={hybrid} alt="" />
            <div className="text">
              <h5>Hybrid</h5>
              <p style={{ color: "green" }}>12 Cars</p>
            </div>
          </div>
        </Col>
        <Col className="Col-3">
          <div className="box">
            <img className="image" src={roma} alt="" />
            <div className="text">
              <h5>Ferrari</h5>
              <p style={{ color: "green" }}>11 Cars</p>
            </div>
          </div>
        </Col>
      </Row>
      {/* Latest Posting */}
      <h1 className="text-center text-success mt-4">Latest Posting</h1>
      <Row className="m-4">
        {allAds.slice(0, 4).map((ad) => (
          <Col key={ad._id} md={6} className="mb-4">
            <div className="container-2">
              <img
                className="lastest-pic"
                src={ad.image || car_image}
                alt={ad.Title || "N/A"}
              />
              <div className="text">
                <h5>{ad.Title}</h5>
                <p>{ad.Description || "No description available."}</p>
                <Button
                  variant="success"
                  onClick={() => Navigate(`/car/${ad._id}`)}
                >
                  More Details
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export function About() {
  return (
    <>
      <div className="banner">
        <img src={car_image} alt="Contact Banner" className="banner-image" />
        <div className="banner-overlay">
          <h1>About Us</h1>
        </div>
      </div>
      <h2 style={{ color: "green", textAlign: "center", margin: "20px" }}>
        About Us{" "}
      </h2>
      <div className="about-container">
        {/* Image Section */}
        <div className="image-section">
          <img src={carpic4} alt="Car 1" />
          <img src={carpic2} alt="Car 2" />
          <img src={carpic5} alt="Car 3" />
          <img src={car1} alt="Car 4" />
        </div>

        {/* Text Section */}
        <div className="text-section">
          <h1>
            PakClassified is a comprehensive online platform where users can
            browse, buy, sell, and compare cars
          </h1>
          <p>
            Welcome to PakClassified, your premier destination for all things
            automotive in Pakistan. Our platform offers a seamless experience
            for users looking to browse, buy, sell, and compare cars. Whether
            you're a car enthusiast or a first-time buyer, we ensure a smooth
            and hassle-free experience.
          </p>

          {/* Features List */}
          <ul>
            <li>✔ Customer Support</li>
            <li>✔ Technical Assistance</li>
            <li>✔ Feedback and Suggestions</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export function Contact() {
  return (
    <>
      <div className="banner">
        <img src={yaris} alt="Contact Banner" className="banner-image" />
        <div className="banner-overlay">
          <h1>Contact</h1>
        </div>
      </div>
      <div className="container py-5">
        <h2 className="text-center mb-4">Contact For Any Query</h2>

        <div className="row">
          {/* Contact Information */}
          <div className="col-md-4 text-center">
            <div className="p-3 border rounded bg-light">
              <i className="fas fa-map-marker-alt fa-2x mb-2"></i>
              <p>Gulberg III, Lahore</p>
            </div>
          </div>

          <div className="col-md-4 text-center">
            <div className="p-3 border rounded bg-light">
              <i className="fas fa-envelope fa-2x mb-2"></i>
              <p>evs@gmail.com</p>
            </div>
          </div>

          <div className="col-md-4 text-center">
            <div className="p-3 border rounded bg-light">
              <i className="fas fa-phone fa-2x mb-2"></i>
              <p>0300 1 387 387</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="row mt-4">
          <div className="col-md-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.1635210886366!2d74.33457157398033!3d31.492188848536685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919043fb52276b5%3A0x2682e1fa63fcd065!2sEVS%20Training%20Institute%20Lahore!5e0!3m2!1sen!2s!4v1741035375323!5m2!1sen!2s"
              width="100%"
              height="350px"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Form */}
          <div className="col-md-6">
            <div className="p-4 border rounded bg-light">
              <form>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="col">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    required
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Leave a message here"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
