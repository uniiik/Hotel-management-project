import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import { useParams } from "react-router-dom"; /* */
import { getPrice } from "../util/util";
import { createBooking } from "../util/db";

const BookRoomPage = () => {
  const navigate = useNavigate();
  const nikhil = () => {
    let path = `/`;
    navigate(path);
  };
  const [booking, setBooking] = useState({
    email: "",
    roomNumber: "",
    roomType: "",
    start: "",
    end: "",
    price: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBooking((prevState) => ({ ...prevState, [name]: value }));
    if (name == "roomType" || name == "start" || name == "end") {
      setBooking((prevState) => ({
        ...prevState,
        ["price"]: getPrice(
          name == "roomType" ? value : booking.roomType,
          booking.start,
          booking.end
        ),
      }));
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // const response = await axios.post("/api/bookings", booking);
      // console.log(response);
      createBooking(booking);
      navigate("/bookings");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Book a Room</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={booking.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="roomNumber">Room Number:</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={booking.roomNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="roomType">Room Type:</label>
          <select
            id="roomType"
            name="roomType"
            value={booking.roomType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a room type</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div>
          <label htmlFor="start">Start Time:</label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            value={booking.start}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="end">End Time:</label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            value={booking.end}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={booking.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="submit"
          style={{ marginRight: "10px" }}
          color="primary"
          className="px-4"
        >
          Book
        </button>
        <button
          style={{ marginRight: "10px" }}
          color="primary"
          className="px-4"
          onClick={nikhil}
        >
          BACK
        </button>
      </form>
    </div>
  );
};

export default BookRoomPage;
