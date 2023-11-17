const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const openai = require("openai");
const { fetchAllChats, saveChatMessage } = require("./model.js");

// openAi = new openai({
//   apiKey: "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",
// });
// async function main() {
//   const completion = await openAi.chat.completions.create({
//     messages: [{ role: "user", content: "Where was it played?" }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// }
// main();
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use("/", express.static("./public"));

io.on("connection", (socket) => {
  console.log(`a user @ ${socket.id} connected`);

  fetchAllChats().then((allChats) => {
    socket.emit("allChats", allChats);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message: " + msg);
    saveChatMessage(socket.id, msg);
  });
});

server.listen(process.env.PORT || 3001, () => {
  console.log("server running at port ");
});
