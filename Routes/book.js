import express, { request } from "express";
const router = express.Router();

import checkAuth from "../middleware/check-auth.js";
import upload from "../middleware/multer.js";

import {
  getAllBookings,
  postBooking,
  findOneBooking,
  deleteBooking,
  getAllUserBookings,
} from "../controllers/book.js";

//localhost:5000 GET
router.get("/book", getAllBookings);
router.get("/bookings/:email", getAllUserBookings);

//localhost:5000 POST
// const cpUpload = upload.fields([
//   { name: "licence", maxCount: 1 },
//   { name: "proof", maxCount: 1 },
// ]);
router.post("/book", postBooking);

//localhost:5000 GET BY ID
router.get("/book/:bookingId", findOneBooking);

//localhost:5000 DELETE
router.delete("/book/:bookingId", deleteBooking);

export default router;
