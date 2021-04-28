import express from "express";
const router = express.Router();

import Car from "../models/car.js";
// import checkAuth from "../middleware/check-auth.js";
import upload from "../middleware/multer.js";

import {
  deleteCar,
  getAllCars,
  getCar,
  postCar,
  updateCar,
  getAllBrands,
  postBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/cars.js";
//GET BRAND
router.get("/brands", getAllBrands);
// POST BRAND
router.post("/brands", upload.single("image"), postBrand);
//PATCH BRAND
router.patch("/brands/:brandId", upload.single("image"), updateBrand);
//DELETE BRAND
router.delete("/brands/:brandId", deleteBrand);

//localhost:5000 GET
router.get("/", getAllCars);
//localhost:5000 POST
router.post("/", upload.single("image"), postCar);
//localhost:5000 GET BY ID
router.get("/:productId", getCar);
//localhost:5000 PATCH
router.patch("/:productId", updateCar);
//localhost:5000 DELETE
router.delete("/:productId", deleteCar);

export default router;
