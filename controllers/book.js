import mongoose from "mongoose";

import Book from "../models/book.js";
import Car from "../models/car.js";

//GET Bookings
export const getAllBookings = async (req, res) => {
  await Book.find()
    .populate("car", "_id name quantity")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(error);
    });
};

export const getAllUserBookings = async (req, res) => {
  const email = req.params.email;
  await Book.find({ email: email })
    .then((bookings) => {
      res.json(bookings);
    })
    .catch((err) => console.log(err));
};

//POST Bookings
export const postBooking = async (req, res) => {
  const id = req.body.carId;
  await Car.find({ _id: id }).then((car) => {
    if (!car) {
      res.json("car not found");
    }

    const book = new Book({
      _id: mongoose.Types.ObjectId(),
      carId: req.body.carId,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      pickDate: req.body.pickDate,
      pickTime: req.body.pickTime,
      pickUpAddress: req.body.pickUpAddress,
      droppingDate: req.body.droppingDate,
      droppingTime: req.body.droppingTime,
    });

    console.log(req.body);

    book
      .save()
      .then((item) => res.json(item))
      .catch((err) => res.json(err));
  });
  // .then((result) => {
  //   console.log(result);
  //   res.status(201).json({
  //     message: "New Boking Stored",
  //     createdBooking: result,
  //     request: {
  //       type: "GET",
  //       url: "http://localhost:3000/book/" + result._id,
  //     },
  //   });
  // })
  // .catch((err) => {
  //   console.log(err);
  //   res.status(500).json({
  //     error: err,
  //   });
  // })
  // .catch((err) => {
  //   console.log(err);
  //   res.status(500).json({
  //     error: err,
  //   });
  // });
};
//GET FIND Booking
export const findOneBooking = async (req, res) => {
  const id = req.params.bookingId;
  Book.findById(id)
    .select("_id quantity car")
    .then((book) => {
      if (!book) {
        return res.status(404).json({
          message: "Booking not found",
        });
      }
      res.status(200).json({
        _id: book._id,
        car: book.car,
        quantity: book.quantity,
        request: {
          type: "GET",
          url: "http://localhost:5000/book",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

//DELETE Booking
export const deleteBooking = async (req, res) => {
  const id = req.params.bookingId;
  Book.deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json({
        message: "Booking deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

//   Car.findById(req.body.carId)
//     .then((car) => {
//       console.log(car);
//       if (!car) {
//         return res.status(404).json({
//           message: "car not found",
//         });
//       }
//       const book = new Book({
//         _id: mongoose.Types.ObjectId(),
//         car: req.body.carId,
//         fname: req.body.fname,
//         lname: req.body.lname,
//         email: req.body.email,
//         // contactNumber: req.body.contactNumber,
//         pickDate: req.body.pickDate,
//         pickTime: req.body.pickTime,
//         pickUpAddress: req.body.pickUpAddress,
//         approxReturnDate: req.body.approxReturnDate,
//         approxReturnTime: req.body.approxReturnTime,
//         driverRequired: req.body.driverRequired,
//         drivingLicence: req.body.drivingLicence,
//         KYCProof: req.body.KYCProof,
//       });
//       return book.save();
//     })
//     .then((result) => {
//       console.log(result);
//       res.status(201).json({
//         message: "New Boking Stored",
//         createdBooking: result,
//         request: {
//           type: "GET",
//           url: "http://localhost:3000/book/" + result._id,
//         },
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
