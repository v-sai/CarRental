import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    // required: true,
  },
  fname: {
    type: String,
    //  required: true
  },
  lname: { type: String },
  email: {
    type: String,
    //  required: true
  },
  contactNumber: {
    type: Number,
    // required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  pickDate: { type: String },
  pickTime: { type: String },
  // approxReturnDate: {
  //   type: String,
  //   required: true,
  // },
  // approxReturnTime: {
  //   type: String,
  //   required: true,
  // },
  pickUpAddress: {
    type: String,
    // required: true,
  },
  droppingDate: {
    type: String,
    // required: true,
  },
  droppingTime: {
    type: String,
    // required: true,
  },

  // driverRequired: {
  //   type: Boolean,
  //   default: Date.now,
  // },
  // drivingLicence: {
  //   type: String,
  // },
  // KYCProof: {
  //   type: String,
  //   required: true,
  // },
});
const book = mongoose.model("Book", bookSchema);
export default book;
