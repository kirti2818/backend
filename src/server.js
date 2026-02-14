require('dotenv').config();
const express = require('express');
const http = require("http");

const app = express();
const { Server } = require("socket.io");
const jwt = require('jsonwebtoken')
const cookie = require("cookie");
const { add_socket } = require('./services/socket.service');

const cors = require('cors')
const cookieParser = require('cookie-parser')
const connect = require('../src/dbConfig')
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://frontend-pi-self-1zzn0lclxw.vercel.app'],
  credentials: true,
}
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))


const allRoutes = require('./routes/index');
const { deleteSocketController } = require('./controller/socket.controller');
app.use("/api", allRoutes);

// create server and socket connection
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

io.use((socket, next) => {
  try {
    const cookies = socket.handshake.headers.cookie;
    if (!cookies) {
      return next(new Error("No cookies found"));
    }

    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.token;

    if (!token) {
      return next(new Error("No token found"));
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error(err.message));
  }
});
const onlineUsers = new Map();
io.on("connection", async (socket) => {
  try {
    console.log("User connected:", socket.id, socket.user.id);

    // add socket of user.
    const socket_added = await add_socket({ user_id: socket.user.id, socket_id: socket.id })
    onlineUsers.set(socket.user.id, socket_added?.socketId)

    console.log("User joined chat", socket.id, socket_added.message);

    console.log("Online Users:", onlineUsers);


    socket.onAny((event, ...args) => {
      console.log("🔥 Event received:", event, args);
    });

    socket.onAnyOutgoing((event, ...args) => {
      console.log("🚀 Event sent:", event, args);
    })

    socket.on("send_message", (data) => {
      const receiverSocketId = onlineUsers.get(data.to);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive_message", {
          from: socket.user.id,
          content: data.content
        });
      } else {
        console.log("User not online");
      }
    });


    socket.on("disconnect", async (reason) => {
      console.log("User disconnected:", socket.id, reason);
      // if (reason !== 'transport close') {
        await deleteSocketController({ user_id: socket.user.id })
        onlineUsers.delete(socket.user.id)
      // }

    });

  } catch (error) {
    console.log(error.message, "SOOOO");


  }
});

app.get('/', (req, res) => {
  return res.send("Hello server started...")
})

server.listen(PORT, async () => {
  try {
    await connect()
    console.log(`Server is running on ${PORT}`)
    console.log(`Connected to DB ${process.env.MONGODB_URL}`)
  } catch (error) {
    console.log(`Connection Failed ${error.message}`)
  }
})
