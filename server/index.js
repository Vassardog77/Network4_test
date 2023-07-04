import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import { Server } from 'socket.io'   //importing socket.io
import http from 'http'
import { createServer } from 'http';
import * as dotenv from 'dotenv'
dotenv.config()
mongoose.set('strictQuery', true);

import webhookRoutes from './routes/webhookRoutes.js'
import postRoutes2 from './routes/posts.js'
import loginRoutes from './routes/loginRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import pageRoutes from './routes/pageRoutes.js'
import emailRoutes from './routes/emailRoutes.js'
import calendarRoutes from './routes/calendarRoutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/user.js'
import profileRoutes from './routes/profileRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import likeRoutes from './routes/likesRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'

import { saveMessage } from './controllers/chatControllers.js'

const app = express()

const server = createServer(app);    //setting server

const io = new Server(server, {     //linking socket.io to server
    cors: {
        origin: "*", //if stuff doesn't work maybe set orgin * (used to be "https://localhost:3000","https://aaazzz.xyz")
        methods: ["GET", "POST"],
    }, 
})

const CONNECTION_URL = process.env.CONNECTION_URL   //setting connection url
const PORT = process.env.PORT|| 5000; //setting port used to be process.env.PORT|| 5000
console.log(PORT+"working")

io.on("connection", (socket) => {//socket.io chat capability
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      saveMessage(data)
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/webhook', webhookRoutes)
app.use('/posts', postRoutes2)
app.use('/login', loginRoutes)
app.use('/messages', messageRoutes)
app.use('/pages', pageRoutes)
app.use('/email', emailRoutes)
app.use('/calendar', calendarRoutes)
app.use('/analytics', analyticsRoutes)
app.use('/post', postRoutes)
app.use('/api/user', userRoutes)
app.use('/profiles', profileRoutes)
app.use('/chats', chatRoutes)
app.use('/comment', commentRoutes)
app.use('/like', likeRoutes)
app.use('/notification', notificationRoutes)

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()  => server.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
    .catch((error) => console.log(error.message));
    
