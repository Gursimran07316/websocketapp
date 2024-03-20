const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const cors = require("cors");

app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  } });

io.on("connection", (socket) => {
  // ...
  console.log(`User Connected: ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

httpServer.listen(4000,()=> console.log('server running..'));