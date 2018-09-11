var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http,{path:"/tasks"});
var port = process.env.PORT || 3001;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    socket.on('add_task', function(msg){
        let message = JSON.parse(msg);
        console.log("add",message)
        console.log("modify_msg_" + message.man)
        io.emit("modify_msg_" + message.man , JSON.stringify({
            type : "add" ,
            data : message
        }));
    });
    socket.on("del_task" , function(msg){
        let message = JSON.parse(msg);
        console.log("del",message)
        console.log("modify_msg_" + message.man)
        io.emit("modify_msg_" + message.man , JSON.stringify({
            type:"delete" ,
            id : message.id
        }))
    })
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});


