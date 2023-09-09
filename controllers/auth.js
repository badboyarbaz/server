import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(200).json({ user: savedUser, message: "User has been registered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(req.body)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Request password:", req.body.password);
    console.log("User password:", user.password);

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password or user" });
    }
    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);
    const { password, isAdmin, ...others } = user._doc;

    // Create a user object containing the email and name
    const userInfo = {
      email: user.email,
      name: user.name,
    };

    res.cookie("access_token", token, { httpOnly: true, sameSite: 'Strict', secure: true })
      .status(200)
      .json({ ...others, token , userInfo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
