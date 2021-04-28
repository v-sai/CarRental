import express from "express";
const router = express.Router();

import Cars from "../models/car.js";

router.get("/", (req, res) => {
  Cars.find()
    // .select("name price expense fuel")
    .sort("bookCount")
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
export default router;
