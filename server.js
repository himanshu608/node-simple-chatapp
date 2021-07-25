const express = require('express');
const app = express();
const httpserverr = require("http").createServer(app);
const PORT = process.env.PORT || 3000;
app.use(express.static("./public"));


httpserverr.listen(PORT,()=>{
    console.log('listening on port',PORT);
});
app.get('/',(req, res) => {
    res.sendFile("index");
})

const io = require('socket.io')(httpserverr);

io.on('connection',(socket)=>{
    console.log("connected..");
    socket.on('message-sent',(msg)=>{
        socket.broadcast.emit('message',msg);
    })
    socket.on('joined-chat',(namee)=>{
        socket.broadcast.emit('joined',namee);
    })
})
