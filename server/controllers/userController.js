// signup a new user
import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;
  try {
    if (!fullName || !email || !password || !bio) {
      return res
        .status(400)
        .json({ message: 'Please enter all the fields', success: false });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User already exists', success: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(newUser._id);

    return res.status(201).json({
      message: 'User created successfully',
      success: true,
      token,
      userData: newUser,
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, message: 'Failed to create account' });
  }
};

// controller to login a user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Please enter all the fields', success: false });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: 'User does not exist', success: false });
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: 'Invalid credentials', success: false });
    }
    const token = generateToken(existingUser._id);
    return res.status(200).json({
      message: 'User logged in successfully',
      success: true,
      token,
      userData: existingUser,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

