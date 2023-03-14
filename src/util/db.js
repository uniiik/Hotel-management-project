import localDb from "localstorage-db.js";

export const db = new localDb("bookings");

export function createBooking(obj) {
  db.insVal(obj);
}
export function getAllBooking() {
  return db.get();
}

export function getBookingById(id) {
  return db.get(parseInt(id));
}

export function updateBooking(id, diff) {
  console.log("received:", diff);
  db.mainDb[parseInt(id)] = diff;
  db.save();
  console.log("updated", getBookingById(id));
}

export function deleteBooking(id) {
  db.del(parseInt(id));
}
