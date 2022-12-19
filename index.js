//node server which will handle socket io connections
const io = require ('socket.io')(8000)
const users = {};
io.on('connection',socket=>{
    //drops message for all the users in the chat when a new user joins the chat
    socket.on('new-user-joined',name=>{
        console.log("new user ",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    //To send message to all user in the chat
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message,name:users[socket.id]})
    });
    //drops message for all the users in the chat when a user leaves the chat
    socket.on('disconnect',message=>{
      socket.broadcast.emit('left',users[socket.id]);
      delete users[socket.id];
    })
})
