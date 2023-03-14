import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllBooking } from "../util/db";

const ViewBookingPage = () => {
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
        </div>
      ))}
    </div>
  );
};

export default ViewBookingPage;
