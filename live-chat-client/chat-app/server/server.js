const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

app.use(cors());

const PORT = 3000;

let users = [];

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("join", (user) => {
        console.log(`${user} has joined the chat`);
        socket.broadcast.emit("newUser", `${user} has joined the chat`);
    });

    socket.on("sendMessage", (message) => {
        io.emit("receiveMessage", message);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`);
});