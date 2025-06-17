import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios } = useContext(AuthContext);

  // function to get all users for sidebar
  const getUsers = async () => {
    try {
      const { data } = await axios.get('/api/messages/users');
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  // function to get messages for a specific user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  // function to send message to selected user
  const sendMessage = async (messageData) => {
    if (!selectedUser?._id) {
      toast.error('Cannot send message: Recipient not identified.');
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );
      if (data.success) {
        setMessages((prev) =>
          Array.isArray(prev) ? [...prev, data.newMessage] : [data.newMessage]
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  // function to subscribe to message for selected user
  const subscribeToMessage = async () => {
    if (!socket) return;
    socket.on('newMessage', (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: prev[newMessage.senderId]
            ? prev[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  // function to unsubscribe from messages
  const unsubscribeFromMessage = () => {
    if (socket) {
      socket.off('newMessage');
    }
  };
  useEffect(() => {
    subscribeToMessage();
    return () => unsubscribeFromMessage();
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    setSelectedUser,
    getMessages,
    sendMessage,
    unseenMessages,
    setUnseenMessages,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
