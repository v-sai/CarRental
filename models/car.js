import mongoose from "mongoose";

const carsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  modelName: {
    type: String,
  },
  ac: {
    type: Boolean,
    required: true,
  },
  airBags: Boolean,
  cdPlayer: Boolean,
  powerSteering: Boolean,
  noOfSeats: Number,
  price: {
    type: Number,
    required: true,
  },
  carStatus: {
    type: Boolean,
    required: true,
  },
  bookCount: {
    type: Number,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },
  // image2: {
  //   type: String,
  //   // required: true,
  // },
  // image3: {
  //   type: String,
  //   // required: true,
  // },
  expenses: {
    type: Number,
    required: true,
  },
  fuelProvided: {
    type: Number,
    required: true,
  },
  fuelType: {
    type: String,
  },
});
const car = mongoose.model("Car", carsSchema);
export default car;
