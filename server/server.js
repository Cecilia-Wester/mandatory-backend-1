const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'chat';
const client = new MongoClient(url)

const router = require('./router');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users', );

const PORT = process.env.PORT || 8090;

app.use(express.json);

const insertDocuments = (db, callback) => {
  const collection = db.collection('documents');

  collection.insertOne([{name: user.room, messages: [{username: user.name, text: message}]}], (err,result) => {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log('Inserted 1 document inro the collection')
    callback(result)
    
  });
}
client.connect((err) => {
  assert.equal(null, err);
  
  console.log('Connected successfully to db server');

  const db = client.db(dbName);
  insertDocuments(db, () => {
    client.close();
  });
  
});

app.get('/', (req, res) => {
  res.send('hello');
});

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room});

    if(error) return callback(error);

    socket.emit('message', {user: 'admin', text: `${user.name} welcome to the room ${user.room}`});
    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`})

    socket.join(user.room);

    io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

    callback();
  });


  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
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