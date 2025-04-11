const Chat = require("../models/message");
const { getGroqReply } = require('../utils/GroqClient');


const fetchMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    console.log(senderId);
    console.log(receiverId);

    const messages = await Chat.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).populate("senderId", "_id name");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error in getting messages", error });
  }
};



const chatWithAi = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) return res.status(400).json({ error: 'Message is required' });

    const response = await getGroqReply(message);

    res.status(200).json({ response });
  } catch (err) {
    console.error('AI Chat Error:', err.message);
    res.status(500).json({ error: 'Something went wrong with the AI' });
  }
};


const chatController = {
  fetchMessages, chatWithAi
};

module.exports = chatController;
