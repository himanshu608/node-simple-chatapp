const express = require('express');
const app = express();
const Msg = require('./models/messages');
const httpserverr = require("http").createServer(app);
const PORT = process.env.PORT || 3000;
app.use(express.static("./public"));
const fs = require('fs');
const mongoose = require('mongoose');
const dbUri = "mongodb+srv://net-ninja123:netninja123@nodedb.tnd4e.mongodb.net/message-db?retryWrites=true&w=majority"

mongoose.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true  }).then(() => {
    console.log("connected to db");
}).catch(err => console.log(err));
httpserverr.listen(PORT,()=>{
    console.log('listening on port',PORT);
});
app.get('/',(req, res) => {
    res.sendFile("index");
})

const io = require('socket.io')(httpserverr);

io.on('connection',(socket)=>{
    console.log("connected..");
    Msg.find().then(result=>{
        socket.emit('db-messages',result);
    })
    socket.on('message-sent',(msg)=>{
        const Message = new Msg({user: msg.user,message: msg.message});
        Message.save().then(()=>{
            console.log("message saved to db");
        }).catch(err=>{
            console.log(err);
        });
        socket.broadcast.emit('message',msg);
        
    })
    socket.on('joined-chat',(namee)=>{
        socket.broadcast.emit('joined',namee);
    })
})
