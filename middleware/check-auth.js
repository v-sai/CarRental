import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    // console.log();
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Please Login, you don't have access",
    });
  }
};

export default checkAuth;
