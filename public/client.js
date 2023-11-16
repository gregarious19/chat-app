const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messageElement = document.querySelector(".msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  console.log(msg);
  item = document.createElement("ul");
  item.textContent = msg;
  messageElement.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("allChats", (chats) => {
  console.log(chats);

  chats.map(({ message }) => {
    item = document.createElement("ul");

    item.textContent = message;
    messageElement.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
});
