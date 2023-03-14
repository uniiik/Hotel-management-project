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
      <h1>HOTEL SCALER</h1>
      <p>Welcome to Hotel Admin Booking Page</p>

      <button
        style={{ marginRight: "10px" }}
        color="primary"
        className="px-4"
        onClick={routeChange}
      >
        VIEW page
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
