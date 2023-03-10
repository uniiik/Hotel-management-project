import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const Delete = () => {
  const [booking, setBooking] = useState(null);
  const { id } = useParams();
  const history = useHistory();

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

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/bookings/${id}`);

      console.log(response);
      history.push("/bookings");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  if (!booking) {
    return <div>Loading...</div>;
  }

  const refundAmount =
    booking.status === "CANCELLED"
      ? "0"
      : booking.start.getTime() - Date.now() > 48 * 60 * 60 * 1000
      ? booking.price
      : booking.start.getTime() - Date.now() > 24 * 60 * 60 * 1000
      ? Math.floor(booking.price / 2)
      : 0;

  return (
    <div>
      <h1>Delete Booking</h1>
      <p>Are you sure you want to delete this booking?</p>
      <p>Booking ID: {booking.id}</p>
      <p>Email: {booking.email}</p>
      <p>Room Number: {booking.roomNumber}</p>
      <p>Room Type: {booking.roomType}</p>
      <p>Start Time: {booking.start.toLocaleString()}</p>
      <p>End Time: {booking.end.toLocaleString()}</p>
      <p>Price: {booking.price}</p>
      <p>Refund Amount: {refundAmount}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default Delete;
