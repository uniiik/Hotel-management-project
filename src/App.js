import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import BookRoomPage from "./pages/BookRoomPage";
import ViewBookingPage from "./pages/ViewBookingsPage";
import EditBookingPage from "./pages/EditBookingPage";
import DeleteBookingPage from "./pages/DeleteBookingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/bookings" element={<ViewBookingPage />} />
        <Route path="/bookings/create" element={<BookRoomPage />} />
        {/* <BookRoomPage /> */}
        {/* </Route> */}
        <Route exact path="/bookings/edit/:id" element={<EditBookingPage />} />
        {/* <EditBookingPage />
        </Route> */}
        <Route
          exact
          path="/bookings/delete/:id"
          element={<DeleteBookingPage />}
        />
        {/* <DeleteBookingPage />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
