
// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// export function getReceiverSocket(userId) {
//     return userSocketMap[userId];
// }
// //used to store online users
// const userSocketMap = {};//{userId: socketId}

// io.on("connection", (socket) => {
//   console.log(" A user connected:", socket.id);

// const userId = socket.handshake.query.userId;
// if (userId) userSocketMap[userId] = socket.id;


// //io.emit() is used to send events to all the connected clients

//   io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   socket.on("disconnect", () => {
//     console.log(" A user disconnected:", socket.id);
//   });
// });

// export { io, app, server };


import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Used to store online users
const userSocketMap = {}; // { userId: socketId }

// Export this to find a user's socket
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("✅ A user connected:", socket.id, `(userId: ${userId})`);

  if (userId) {
    userSocketMap[userId] = socket.id;

    // Emit updated list of online users to all clients
    io.emit("onlineUsers", Object.keys(userSocketMap));
  }

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);

    // Remove user from map
    for (const [uid, sid] of Object.entries(userSocketMap)) {
      if (sid === socket.id) {
        delete userSocketMap[uid];
        break;
      }
    }

    // Emit updated list of online users to all clients
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
