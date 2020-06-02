const express = require('express');
const socketio = require('socket.io');
const http= require('http');
const PORT = process.env.PORT || 5000 ;
const app = express();
app.use(express.json())

const server= http.createServer(app);

const io =socketio(server);


app.get('/' , (req,res)=>{
    res.send('Backend  is running');
});


io.on('connection', (socket)=>{
    console.log('we have a new connection!!!');

    socket.on('disconnect', ()=>{
        console.log('User left !!!!! ')
    })
});
server.listen(PORT,() => console.log(`Server is running on Port ${PORT}`));
