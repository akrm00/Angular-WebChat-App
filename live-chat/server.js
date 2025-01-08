const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer();
const io = socketIO(server,{cors : {origin : "*",methods : ["GET","POST"]}});

app.use(cors());

const PORT = 3000;

let connectedUsers = new Map();

io.on("connection",(socket)=>{
    console.log("New user connected");

    socket.on("join",(user)=>{
        console.log(`${user} has joined the chat`);
        connectedUsers.set(socket.id, user);
        socket.broadcast.emit("newUser",`${user} has joined the chat`);
    })

   socket.on("sendMessage",(message)=>{
    io.emit("receiveMessage",message);
   })

   socket.on("disconnect", () => {
    const username = connectedUsers.get(socket.id);
    if (username) {
        console.log(`${username} has left the chat`);
        socket.broadcast.emit("userLeft", `${username} has left the chat`);
        connectedUsers.delete(socket.id);
    }
    });
   
});

server.listen(PORT, ()=> {console.log(`Server listen on localhost:${PORT}`)})



    

