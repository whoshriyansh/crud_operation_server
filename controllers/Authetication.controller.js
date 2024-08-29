import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../middlewares/Error.middleware.js";

export const AdminRegister = async (req, res, next) => {
  try {
    const { name, email, number, password } = req.body;

    // Check if the admin already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        createError(400, "Admin already registered with this email ID")
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin
    const newUser = new User({
      name,
      email,
      number,
      password: hashedPassword,
    });

    // Save the admin to the database
    await newUser.save();

    res.status(201).json({
      message: "Admin registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        number: newUser.number,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const AdminLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(createError(400, "No Admin associated with this email ID"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(404, "Wrong Password"));
    }

    const generateToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
    };

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      number: user.number,
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};
