import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllBooking } from "../util/db";
import { useNavigate } from "react-router-dom";

const ViewBookingPage = () => {
  const navigate = useNavigate();
  const nikhil = () => {
    let path = `/`;
    navigate(path);
  };
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      // const response = await axios.get(`/api/bookings/${id}`);
      console.log(getAllBooking());
      setBooking(getAllBooking());
    } catch (error) {
      console.error(error);
    }
  };

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>View Booking</h1>
      {booking.map((booking, index) => (
        <div>
          <p>Booking ID: {index}</p>
          <p>Email: {booking.email}</p>
          <p>Room Number: {booking.roomNumber}</p>
          <p>Room Type: {booking.roomType}</p>
          <p>Start Time: {booking.start.toLocaleString()}</p>
          <p>End Time: {booking.end.toLocaleString()}</p>
          <p>Price: {booking.price}</p>
          <p>Status: {booking.status}</p>
          <button
            style={{ marginRight: "10px" }}
            color="primary"
            className="px-4"
            onClick={nikhil}
          >
            BACK
          </button>
        </div>
      ))}
    </div>
  );
};

export default ViewBookingPage;
