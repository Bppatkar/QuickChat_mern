import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import cloudinary from '../lib/cloudinary.js';

// middleware to protect routes
export const protectRoutes = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'User not found' });
  }
};

// controller to check if user is authenticated
export const checkAuth = (req, res) => {
  res.json({ message: 'User is authenticated', success: true, user: req.user });
};

// Controller to update user profile details
export const updateProfile = async (req, res) => {
  const { profilePic, fullName, bio } = req.body;
  const userId = req.user._id;

  try {
    let updateUser;
    if (!profilePic) {
      updateUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      updateUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: upload.secure_url, bio, fullName },
        { new: true }
      );
    }

    res.status(200).json({
      message: 'User profile updated successfully',
      success: true,
      user: updateUser,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error updating profile', success: false });
  }
};

