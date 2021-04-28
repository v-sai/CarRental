import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  }, //unique:true, match : email regex
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});
const user = mongoose.model("User", userSchema);
export default user;
