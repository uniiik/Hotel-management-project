import localDb from "localstorage-db.js";

export const db = new localDb("bookings");

export function createBooking(obj) {
  db.insVal(obj);
}

export function getBookingById(id) {
  return db.get(id);
}
