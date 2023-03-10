import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

import BookRoomPage from "./pages/BookRoomPage";
import ViewBookingPage from "./pages/ViewBookingsPage";
import EditBookingPage from "./pages/EditBookingPage";
import DeleteBookingPage from "./pages/DeleteBookingPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/bookings">
          <ViewBookingPage />
        </Route>
        <Route exact path="/bookings/create">
          <BookRoomPage />
        </Route>
        <Route exact path="/bookings/edit/:id">
          <EditBookingPage />
        </Route>
        <Route exact path="/bookings/delete/:id">
          <DeleteBookingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
