import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

const Edit = () => {
  const { id } = useParams();

  const [bookingData, setBookingData] = useState({
    email: '',
    roomNumber: '',
    roomType: '',
    startTime: '',
    endTime: '',
    price: 0,
  });

  const [roomsData, setRoomsData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetchBooking();
    fetchRooms();
  }, []);

  const fetchBooking = async () => {
    try {
      const response = await axios.get(`/api/bookings/${id}`);
      setBookingData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRooms = async () => {
    const response = await axios.get('/api/rooms');
    setRoomsData(response.data);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'roomNumber') {
      const room = roomsData.find((room) => room.roomNumber === value);
      setBookingData({
        ...bookingData,
        [name]: value,
        roomType: room.roomType,
        price: room.price,
      });
    } else {
      setBookingData({
        ...bookingData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`/api/bookings/${id}`, bookingData);
      history.push(`/bookings/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/bookings/${id}`);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const isBookingValid = () => {
    const { startTime, endTime } = bookingData;
    if (!startTime || !endTime) {
      return true;
    }

    const start = moment(startTime);
    const end = moment(endTime);

    if (end.isBefore(start)) {
      return true;
    }

    return false;
  };
  return (
    <div>
      <h1>Edit Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={bookingData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Room Number:</label>
          <select name="roomNumber" value={bookingData.roomNumber} onChange={handleInputChange} required>
            <option value="">Select a room number</option>
            {roomsData.map((room) => (
              <option key={room.roomNumber} value={room.roomNumber}>
                {room.roomNumber} ({room.roomType}) - {room.price} Rs per hour
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Start Time:</label>
          <input type="datetime-local" name="startTime" value={moment(bookingData.startTime).format('YYYY-MM-DDTHH:mm')} onChange={handleInputChange} />
        </div>
        <div>
          <label>End Time:</label>
          <input type="datetime-local" name="endTime" value={moment(bookingData.endTime).format('YYYY-MM-DDTHH:mm')} onChange={handleInputChange} />
        </div>
        <button type="submit">Save</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
            }  
