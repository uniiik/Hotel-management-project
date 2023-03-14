import React, { useState, useEffect } from "react";
/*import { useNavigate, useParams } from "react-router-dom";*/
import { useParams } from "react-router-dom"; /* */

import { useNavigate } from "react-router-dom"; /* */
// import { useNavigate } from "history"; /* */

import { getBookingById, updateBooking } from "../util/db";
import { getPrice } from "../util/util";

const EditBookingPage = () => {
  const [booking, setBooking] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    roomNumber: "",
    roomType: "",
    start: "",
    end: "",
    price: "",
    status: "",
  });

  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const data = getBookingById(id);
      console.log(data);
      setBooking(data);
      setFormData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    const { name, value } = event.target;
    if (name == "roomType" || name == "start" || name == "end") {
      setFormData((prevState) => ({
        ...prevState,
        ["price"]: getPrice(
          name == "roomType" ? value : formData.roomType,
          formData.start,
          formData.end
        ),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      updateBooking(id, formData);
      history(`/bookings`);
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

  return (
    <div>
      <h1>Edit Booking</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Room Number:
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Room Type:
          <input
            type="text"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Start Time:
          <input
            type="datetime-local"
            name="start"
            value={formData.start}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          End Time:
          <input
            type="datetime-local"
            name="end"
            value={formData.end}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <br />

        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditBookingPage;
