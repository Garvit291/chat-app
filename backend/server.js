const express = require('express');
const socketio = require('socket.io');
const http= require('http');
const PORT = process.env.PORT || 5000 ;
const app = express();
app.use(express.json())
const {addUser,removeUser,getUser,getUsersInRoom} =require('./Users')

const server= http.createServer(app);

const io =socketio(server);




app.get('/' , (req,res)=>{
    res.send('Backend  is running');
});


io.on('connection', (socket)=>{
    console.log('we have a new connection!!!');

    socket.on('join',({name,room},callback)=>{
        const {error,user}=addUser({id:socket.id,name,room});


        if(error) return callback(error);
        console.log(user)
        socket.join(user.room);
        

        socket.emit('message',{user:'admin' , text:`${user.name} Welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message',{user:'admin', text:`${user.name} has joined the room`})

        callback();

    })

    socket.on('sendMessage',(message,callback)=>{
        console.log(socket.id)
        const user=getUser(socket.id);
        console.log(user)
        console.log(message);
        io.to(user.room).emit('message',{user:user.name,text:message});
        callback();
    })

    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id);
        console.log('User left !!!!! ')
    })
});
server.listen(PORT,() => console.log(`Server is running on Port ${PORT}`));
