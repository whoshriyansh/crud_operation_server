import { createError } from "../middlewares/Error.middleware.js";
import User from "../models/User.model.js";

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const getUserById = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(createError(404, "User with this ID is not Found"));
  }
  res.json(user);
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  await user.deleteOne();
  res.json({ message: "User removed" });
};

const createUser = async (req, res, next) => {
  try {
    const { name, number, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      number,
      email,
      password: hashedPassword,
    });

    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.number = req.body.number || user.number;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export { getUsers, getUserById, updateUser, deleteUser, createUser };
