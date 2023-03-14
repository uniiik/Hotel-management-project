import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `bookings`;
    navigate(path);
  };
  const crouteChange = () => {
    let path = `/bookings/create`;
    navigate(path);
  };
  const drouteChange = () => {
    let path = `/bookings/delete/:id`;
    navigate(path);
  };
  const vrouteChange = () => {
    let path = `/bookings/edit/:id`;
    navigate(path);
  };
  return (
    <div>
      <h1>Welcome to Our Hotel Booking System</h1>
      <p>
        Book a room in our hotel today and experience the best in comfort and
        luxury!
      </p>

      <button
        style={{ marginRight: "10px" }}
        color="primary"
        className="px-4"
        onClick={routeChange}
      >
        Booking page
      </button>

      <button
        style={{ marginRight: "10px" }}
        color="primary"
        className="px-4"
        onClick={crouteChange}
      >
        Create page
      </button>
      <button
        style={{ marginRight: "10px" }}
        color="primary"
        className="px-4"
        onClick={drouteChange}
      >
        Delete page
      </button>
      <button color="primary" className="px-4" onClick={vrouteChange}>
        Edit page
      </button>
    </div>
  );
};

export default HomePage;
