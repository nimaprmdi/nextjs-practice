import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: String,
  age: Number,
  email: String,
});

const User = models.User || model("User", userSchema);

export default User;
