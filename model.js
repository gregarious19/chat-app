const mongoose = require("mongoose");
console.log(password);
// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

// Define a chat schema
const chatSchema = new mongoose.Schema({
  sender: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

// Create a Chat model based on the schema
const Chat = mongoose.model("Chat", chatSchema);

// Arrow function to store a new chat message
const saveChatMessage = async (sender, message) => {
  try {
    const newChat = new Chat({ sender, message });
    const savedChat = await newChat.save();
    console.log("Chat message saved:", savedChat);
  } catch (error) {
    console.error("Error saving chat message:", error.message);
  }
};

// Arrow function to fetch all chat messages
const fetchAllChats = async () => {
  try {
    const allChats = await Chat.find().sort({ timestamp: "asc" });
    console.log("All chat messages:", allChats);
    return allChats;
  } catch (error) {
    console.error("Error fetching chat messages:", error.message);
    return [];
  }
};

module.exports = { fetchAllChats, saveChatMessage };
