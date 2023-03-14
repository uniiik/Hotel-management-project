import React, { useState, useEffect } from "react";
/*import { useNavigate, useParams } from "react-router-dom";*/
import { useParams } from "react-router-dom"; /* */

import { useNavigate } from "react-router-dom"; /* */
// import { useNavigate } from "history"; /* */


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
      const response = await axios.get(`/api/bookings/${id}`);
      setBooking(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`/api/bookings/${id}`, formData);
      console.log(response);
      history.push(`/bookings/${id}`);
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
        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </label>
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
