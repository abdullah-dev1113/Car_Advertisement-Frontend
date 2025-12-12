import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./moredetails.css";

export default function Moredetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        //http://localhost:5000/api/v1/task/${id}
        const res = await fetch(
          `https://car-advertisement-backend.onrender.com/api/v1/task/${id}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setCar(data.found);
      } catch (err) {
        console.error("Failed to fetch car:", err);
        setCar(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!car) return <p>Car not found</p>;

  return (
    <>
      {/* Banner */}
      <div className="banner">
        <img
          src={car.image || ""}
          alt={car.Title || "Car"}
          className="banner-image"
        />
        <div className="banner-overlay">
          <h1>Car Details</h1>
        </div>
      </div>

      {/* Car Details */}
      <div className="car-ad-container">
        <div className="car-ad-1">
          <div className="car-header">
            <img
              src={car.image || ""}
              alt={car.Title || "Car"}
              className="car-image"
            />
            <div className="car-header-text">
              <h2>{car.Title || "No Title"}</h2>
              <p>
                📍 {car.cityArea || "Unknown"} | 💰 {car.Price || "N/A"}
              </p>
            </div>
          </div>

          <div className="car-description">
            <h3>Description</h3>
            <p>{car.Description || "No description available."}</p>
          </div>

          <div className="features">
            <h3>Features</h3>
            <ul>
              {(car.Features || []).length > 0 ? (
                car.Features.map((f, idx) => <li key={idx}>✔ {f}</li>)
              ) : (
                <li>No features listed</li>
              )}
            </ul>
          </div>
        </div>

        {/* Advertisement Summary */}
        <div className="car-ad-2">
          <div className="advertisement-summary">
            <h3>Advertisement Summary</h3>
            <p>✔ Posted by: {car.CreatedBy?.name || "N/A"}</p>
            <p>
              ✔ Date:{" "}
              {car.createdOn
                ? new Date(car.createdOn).toLocaleDateString()
                : "N/A"}
            </p>
            <p>✔ City: {car.cityArea || "N/A"}</p>
            <p>✔ Price: {car.Price || "N/A"}</p>
            <p>✔ Contact: {car.CreatedBy?.contact || "N/A"}</p>
            <p>✔ Status: {car.Status?.name || "N/A"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
