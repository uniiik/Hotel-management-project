import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewBookingPage = () => {
  const [booking, setBooking] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const response = await axios.get(`/api/bookings/${id}`);
      setBooking(response.data);
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
      <p>Booking ID: {booking.id}</p>
      <p>Email: {booking.email}</p>
      <p>Room Number: {booking.roomNumber}</p>
      <p>Room Type: {booking.roomType}</p>
      <p>Start Time: {booking.start.toLocaleString()}</p>
      <p>End Time: {booking.end.toLocaleString()}</p>
      <p>Price: {booking.price}</p>
      <p>Status: {booking.status}</p>
    </div>
  );
};

export default ViewBookingPage;
