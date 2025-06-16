import Message from '../models/Message.js';
import User from '../models/User.js';

// get all users except the logged in user

export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      '-password'
    );

    // count number of message not seen
    const unseenMessages = {};
    const promises = filteredUsers.map(async (user) => {
      const message = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });
      if (message.length > 0) {
        unseenMessages[user._id] = message.length;
      }
    });
    await Promise.all(promises);

    res
      .status(200)
      .json({ success: true, users: filteredUsers, unseenMessages });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: 'Error getting users for sidebar', success: false });
  }
};


// get all messages for selected users
