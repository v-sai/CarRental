import Car from "../models/car.js";
import Brand from "../models/brand.js";

import mongoose from "mongoose";

//GET CARS
export const getAllCars = async (req, res) => {
  await Car.find()
    .then((docs) => {
      res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      });
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
      });
    });
};

//POST CAR
export const postCar = async (req, res, next) => {
  const car = new Car({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    modelName: req.body.modelName,
    ac: req.body.ac,
    airBags: req.body.airBags,
    cdPlayer: req.body.cdPlayer,
    powerSteering: req.body.powerSteering,
    noOfSeats: req.body.noOfSeats,
    price: req.body.price,
    carStatus: req.body.carStatus,
    bookCount: req.body.bookCount,
    image1: "uploads\\" + req.file.filename,
    expenses: req.body.expenses,
    fuelProvided: req.body.fuelProvided,
    fuelType: req.body.fuelType,
  });
  await car
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Car added successfully",
        newCar: {
          result,
          request: {
            type: "GET",
            url: "http://localhost:5000/cars/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// GET CAR
export const getCar = async (req, res) => {
  const id = req.params.productId;
  await Car.findById(id)
    .then((doc) => {
      if (doc) {
        console.log(doc);
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "Oop's Didn't find what you are looking",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

//PATCH
export const updateCar = async (req, res) => {
  const id = req.params.productId;
  res.json("Update method is writing. wait and try again later");
  // await Car.updateOne(
  //   { _id: id },
  //   {
  //     $set: {
  //       name: req.body.name,
  //       type: req.body.type,
  //       price: req.body.price,
  //       carStatus: req.body.carStatus,
  //       bookCount: req.body.bookCount,
  //       image: "uploads\\" + req.file.filename,
  //     },
  //   }
  // )
  //   .then((result) => {
  //     res.status(200).json({
  //       message: "Car updated",
  //       request: {
  //         type: "GET",
  //         url: "http://localhost:5000/cars/" + id,
  //       },
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err,
  //     });
  //   });
};

export const deleteCar = async (req, res) => {
  const id = req.params.productId;
  await Car.deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json({ message: "Car deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//GET BRANDS
export const getAllBrands = (req, res) => {
  Brand.find()
    .then((brand) => {
      res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      });
      res.status(200).json(brand);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// //POST BRANDS
export const postBrand = (req, res, next) => {
  const brand = new Brand({
    brand: req.body.brandName,
    logo: "uploads\\" + req.file.filename,
  });

  brand
    .save()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//PATCH BRANDS
export const updateBrand = async (req, res) => {
  const id = req.params.brandId;
  await Brand.update(
    { _id: id },
    {
      $set: {
        brand: req.body.brandName,
        logo: "uploads\\" + req.file.filename,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Brand updated",
        request: {
          type: "GET",
          url: "http://localhost:5000/cars/brands" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//DELETE BRAND
export const deleteBrand = async (req, res) => {
  const id = req.params.brandId;
  await Brand.deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json({ message: "Brand deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
