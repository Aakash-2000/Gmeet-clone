var express = require('express');
const {v4:uuidv4} = require("uuid");
var app = express();
var server = require('http').createServer(app);
const cors = require("cors");
var io = require("socket.io")(server, {cors: {
    origin: "http://localhost:3000",
    credentials: true
  }});


const port = 5000;
let room_id =null;
let user_id =null;
app.use(cors());

var meetid={}
app.get("/newmeetinglink", (req,res)=>{
    var id = uuidv4();
    room_id = id;
    meetid = {
        "id":id
    }
    res.json(meetid);
});


server.listen(port,function(){
    console.log("Server is listening on the port 5000");
});
io.on('connection',(socket)=>{
    console.log("connected");
    socket.on('join-room',(roomId,userId)=>{
        socket.join(roomId);
        console.log(roomId);
        console.log(userId);
        socket.to(roomId).broadcast.emit("user-connected",userId);
        socket.on('message',(message,name)=>{
            io.to(roomId).emit("createMessage", message,name);
        })
       socket.on('disconnect',()=>{
           socket.to(roomId).broadcast.emit("user-disconnected",userId)
       })
    })
});
       
    