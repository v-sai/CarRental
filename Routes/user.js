import express from "express";
const router = express.Router();

import checkAuth from "../middleware/check-auth.js";

import {
  deleteUser,
  getUser,
  userSignUp,
  userLogIn,
  checkToken,
} from "../controllers/user.js";

//localhost:5000 GET
router.get("/", checkAuth, getUser);
//localhost:5000 POST SIGNUP
router.post("/signup", userSignUp);

//localhost:5000 POST LOGIN
router.post("/login", userLogIn);

//localhost:5000 DELETE
router.delete("/:userId", checkAuth, deleteUser);

router.post("/checktoken", checkToken);
export default router;
