var express = require('express')
const { message } = require('statuses')

var app = express()

var http = require('http').createServer(app)

var io = require('socket.io')(http)


app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/public/board.html");
})

app.get('/admin',(req,res)=>{
    res.sendFile(__dirname+"/public/admin.html");
})

// new connection rrequest come Receive

io.on("connection",(socket)=>{
    console.log('new conection estavlished');
    socket.on('disconnect',()=>{
        console.log('connection closed');
    })
    socket.on('message',(message)=>{
        io.emit('boardContent',message)
    })
})

// emit transfer

http.listen(4000,()=>{
    console.log('connected server at 4000');
})