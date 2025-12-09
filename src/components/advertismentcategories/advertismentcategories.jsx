import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Advertisement() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      //http://localhost:5000/api/v1/task

      try {
        const res = await fetch(
          "https://car-advertisement-backend.onrender.com/api/v1/task"
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setCars(data.found || []);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div
          className="spinner-border text-success"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (cars.length === 0)
    return <p className="text-center mt-5">No advertisements found.</p>;

  return (
    <div className="container mt-4">
      {cars.map((car) => (
        <div className="card mb-3" key={car._id}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={car.image || "/default-car.jpg"}
                alt={car.Title || "Car"}
                className="img-fluid rounded-start"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title text-success">{car.Title}</h5>
                <p className="card-text">
                  {car.Description?.substring(0, 100) + "..." ||
                    "No description available."}
                </p>
                <button
                  className="btn btn-success"
                  onClick={() => navigate(`/car/${car._id}`)}
                >
                  More Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
