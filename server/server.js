const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {origins: '*:*' });
const {getClient, getDB, createObjectId} = require('./db');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users', );

const PORT = process.env.PORT || 8090;

app.use(express.json());

app.post('/chat', (req, res) => {
  const db = getDB();
  let data = req.body;
  console.log(data);
  db.collection('Rooms').find({room: data.room}).toArray()
    .then(result => {
      if(result.length === 0){
        db.collection('Rooms')
        .insertOne(data)
        .then(result => {
          data._id = result.insertedId
          res.status(201).send(data)
        })
        .catch(e => {
          console.log(e);
          res.status(400).send();
        });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).end()
  });
})

app.get('/chat', (req, res) => {
  const db = getDB();
  db.collection('Rooms')
    .find({})
    .toArray()
    .then(data => {
      res.send(data);
    })
    .catch(e =>{
      console.log(e)
      res.status(500).end()
    })
})

app.delete('/chat/:id', (req,res) =>{
  let roomId = req.params.id;
  console.log(roomId);
  const db=getDB();
  db.collection('Rooms')
    .remove({_id: createObjectId(roomId)})
    .then(room => {
      console.log('room deleted')
      res.status(200).send();
    })
    .catch(e => {
      console.log(e)
      res.status(500).end();
    });
    db.collection('chatting')
    .remove({_id: createObjectId(roomId)})
    .then(room => {
      console.log('chat deleted')
      res.status(200).send();
    })
    .catch(e => {
      console.log(e)
      res.status(500).end();
    });
})

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room});
    const db = getDB();
    if(error) return callback(error);
    db.collection('chatting').find({room}).toArray((err, res) => {
      if(err){
        console.error(err)
      } 
      socket.emit('oldMessages', ({ res }))
    });
    
    socket.emit('message', {user: 'admin', text: `${user.name} welcome to the room ${user.room}`});
    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`})
    
    socket.join(user.room);

    io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    const messageSent = message;
    const db = getDB();
    
    db.collection('chatting').insertOne({ room: user.room, messageSent: {name: user.name, text: messageSent}});
    io.to(user.room).emit('message', { user: user.name, text: message});
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if(user){
      io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left`});
    }
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});