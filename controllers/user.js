import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const getUser = async (req, res) => {
  // console.log(req.user.email);
  await User.findOne({ email: req.user.email }).then((users) => {
    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    });
    res.status(200).json(users);
  });
};
// export const checkAuthStatus = (req, res) => {
//   if (req.headers.Authorization) {
//     jwt.verify(
//       req.headers.Authorization,
//       process.env.SECRET_KEY,
//       (err, result) => {
//         if (err) {
//           console.log(err.message);
//         } else {
//           console.log(result);
//         }
//       }
//     );
//   }
// };
export const userSignUp = async (req, res) => {
  await User.find({ email: req.body.email })
    .then((user) => {
      if (user.length >= 1) {
        res.status(409).json({
          message: "Mail Already Exist",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              userName: req.body.userName,
              email: req.body.email,
              password: hash,
              isAdmin: req.body.isAdmin,
            });

            user
              .save()
              .then((result) => {
                console.log(result);

                const token = jwt.sign(
                  {
                    userName: result.userName,
                    email: result.email,
                    userId: result._id,
                    isAdmin: result.isAdmin,
                  },
                  process.env.SECRET_KEY,
                  {
                    expiresIn: "1h",
                  }
                );
                res.set({
                  Authorization: token,
                });
                // return res.status(200).json({
                //   message: "Auth successful",
                //   token: token,
                // });
                res.set({
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Credentials": true,
                });
                const newUserObject = {
                  isAdmin: user.isAdmin,
                  userName: user.userName,
                  email: user.email,
                  _id: user._id,
                };
                res.status(201).json({
                  message: "User created",
                  token: token,
                  user: newUserObject,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//Login
export const userLogIn = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      // if (user.length < 1) {
      //   return res.status(401).json({
      //     message: "Auth failed",
      //   });
      // }
      console.log(user);
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "wrong password",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.SECRET_KEY
          );
          res.set({
            Authorization: token,
          });
          res.set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          });
          const userObject = {
            isAdmin: user.isAdmin,
            userName: user.userName,
            email: user.email,
            _id: user._id,
          };
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            user: userObject,
          });
        }
        res.status(401).json({
          message: "Wrong password.",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "E-Mail or password wrong",
      });
    });
};

export const deleteUser = async (req, res) => {
  console.log("in delete");
  await User.findOneAndDelete({ _id: req.params.userId })
    .then((result) => {
      res.status(200).json({
        message: "Deleted User Successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

export const checkToken = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  // console.log(decoded);
  return res.status(200).json({
    message: "Token Valid",
    token: token,
    user: decoded,
  });
};
