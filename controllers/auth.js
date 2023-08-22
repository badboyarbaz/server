import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from  "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser).send("User has been registered");
  } catch (err) {
    throw err;
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Invalid password or user" });
    }
    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);
    const { password, isAdmin, ...others } = user._doc;
    res.cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...others, });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ message: err.message });
    }}
};
