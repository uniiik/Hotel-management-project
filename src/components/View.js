import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchBooking();
  }, []);
  /*
  Uses the useEffect hook to fetch the booking details when the component is mounted.
  The fetchBooking function is called when the component is mounted because an empty dependency array ([]) is passed as the second argument to useEffect.
  */

  const fetchBooking = async () => {
    try {
      const response = await axios.get(`/api/bookings/${id}`);
      setBooking(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    history.push(`/bookings/${id}/edit`);
  };

  const handleDelete = () => {
    history.push(`/bookings/${id}/delete`);
  };

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Booking Details</h1>
      <p>Booking ID: {booking.id}</p>
      <p>Email: {booking.email}</p>
      <p>Room Number: {booking.roomNumber}</p>
      <p>Room Type: {booking.roomType}</p>
      <p>Start Time: {new Date(booking.startTime).toLocaleString()}</p>
      <p>End Time: {new Date(booking.endTime).toLocaleString()}</p>
      <p>Price: {booking.price} Rs</p>
      <p>Status: {booking.status}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default View;
