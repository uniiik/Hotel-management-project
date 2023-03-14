import React, { useState, useEffect } from "react";
/*import { useParams } from "react-router-dom";*/
import { getAllBooking } from "../util/db";
import { useNavigate } from "react-router-dom";

const ViewBookingPage = () => {
  const navigate = useNavigate();
  const nikhil = () => {
    let path = `/`;
    navigate(path);
  };
  const nikhiledit = () => {
    let path = `/bookings/edit/:id`;
    navigate(path);
  };
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
      <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>ID</th>
            <th style={{ border: "1px solid black" }}>Email</th>
            <th style={{ border: "1px solid black" }}>Room Number</th>
            <th style={{ border: "1px solid black" }}>Room Type</th>
            <th style={{ border: "1px solid black" }}>Start Time</th>
            <th style={{ border: "1px solid black" }}>End Time</th>
            <th style={{ border: "1px solid black" }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((booking, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black" }}>{index}</td>
              <td style={{ border: "1px solid black" }}>{booking.email}</td>
              <td style={{ border: "1px solid black" }}>
                {booking.roomNumber}
              </td>
              <td style={{ border: "1px solid black" }}>{booking.roomType}</td>
              <td style={{ border: "1px solid black" }}>
                {booking.start.toLocaleString()}
              </td>
              <td style={{ border: "1px solid black" }}>
                {booking.end.toLocaleString()}
              </td>
              <td style={{ border: "1px solid black" }}>{booking.price}</td>
              <a href={`/bookings/edit/${index}`}>
                <button
                  style={{ marginRight: "10px" }}
                  color="primary"
                  className="px-4"
                >
                  EDIT
                </button>
              </a>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        style={{ marginRight: "10px" }}
        color="primary"
        className="px-4"
        onClick={nikhil}
      >
        BACK
      </button>
    </div>
  );
};

export default ViewBookingPage;
