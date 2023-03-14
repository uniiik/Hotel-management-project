import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom"; /* */

import { useParams } from "react-router-dom";
import { deleteBooking, getBookingById } from "../util/db";

const DeleteBookingPage = () => {
  const [booking, setBooking] = useState(null);
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const data = getBookingById(id);
      setBooking(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      deleteBooking(id);
      history("/bookings");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    history(-1);
  };

  if (!booking) {
    return <div>Loading...</div>;
  }

  const canDeleteBooking = new Date(booking.start) > Date.now();
  console.log(canDeleteBooking);

  const refundAmount = (() => {
    if (new Date(booking.start) - Date.now() > 48 * 60 * 60 * 1000) {
      return 1;
    } else if (new Date(booking.start) - Date.now() > 24 * 60 * 60 * 1000) {
      return 0.5;
    } else {
      return 0;
    }
  })();
  console.log(refundAmount);

  return (
    <div>
      <h1>Delete Booking</h1>
      <p>Are you sure you want to delete this booking?</p>
      <p>Booking ID: {id}</p>
      <p>Email: {booking.email}</p>
      <p>Room Number: {booking.roomNumber}</p>
      <p>Room Type: {booking.roomType}</p>
      <p>Start Time: {booking.start.toLocaleString()}</p>
      <p>End Time: {booking.end.toLocaleString()}</p>
      <p>Price: {booking.price}</p>
      <p>
        Refund Amount: {refundAmount * 100}% = {booking.price * refundAmount}
      </p>
      <button onClick={handleDelete} disabled={!canDeleteBooking}>
        Delete
      </button>
      <button onClick={handleCancel}>Cancel</button>
      {canDeleteBooking ? null : (
        <p>
          {" "}
          <b>
            Cannot delete this booking since start time has already passed{" "}
          </b>{" "}
        </p>
      )}
    </div>
  );
};

export default DeleteBookingPage;
