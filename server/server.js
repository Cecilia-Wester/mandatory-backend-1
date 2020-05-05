const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const {getClient, getDB, createObjectId} = require('./db');

const router = require('./router');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users', );

const PORT = process.env.PORT || 8090;

app.use(express.json);

// app.post('/rooms',(req, res) => {
//   const db = getDB;
//   let data = req.body;
//   console.log(data)
//   if(validate(data) === false){
//     db.collection('chatting')
//     .insertOne(data)
//     .then(result => {
//       data._id =result.insertedId;
//       res.status(201).send(data);
//     })
//     .catch(e => {
//       console.error(e);
//       res.status(500).end();
//     });
//   }
// });

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room});
    const db = getDB();
    if(error) return callback(error);
    db.collection('chatting').find({room}).toArray((err, res) => {
      if(err){
        console.error(err)
      } 
      console.log(res)
      //res.map((messagesSent) => {
      //   console.log(messagesSent);

      // });
      // console.log(name);
      socket.emit('oldMessages', ({ res }))
    });
    
    setTimeout(() => {
      socket.emit('message', {user: 'admin', text: `${user.name} welcome to the room ${user.room}`});
      socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`})
    }, 200);
    socket.join(user.room);

    io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    console.log(message)
    const user = getUser(socket.id);
    console.log(user)
    // const name = user.name;
    const messageSent = message;
    // const room = user.room
    //console.log(name, room, messageSent)
    const db = getDB();
    // db.chatting.insertOne({ room: room, messageSent: {name: name, text: messageSent}});
    db.collection('chatting').insertOne({ room: user.room, messageSent: {name: user.name, text: messageSent}});
    io.to(user.room).emit('message', { user: user.name, text: message});
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})
    callback();
  });


  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user){
      io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left`})
    }
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});