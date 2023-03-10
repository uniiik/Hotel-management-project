import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const [email, setEmail] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [price, setPrice] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/bookings", {
        email,
        roomNumber,
        roomType,
        start,
        end,
        price,
      });
      console.log(response);
      history.push("/bookings");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label>Room Number:</label>
          <input
            type="text"
            value={roomNumber}
            onChange={(event) => setRoomNumber(event.target.value)}
          />
        </div>
        <div>
          <label>Room Type:</label>
          <input
            type="text"
            value={roomType}
            onChange={(event) => setRoomType(event.target.value)}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(event) => setStart(event.target.value)}
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={end}
            onChange={(event) => setEnd(event.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Create;
