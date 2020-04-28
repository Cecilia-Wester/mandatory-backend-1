const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 8090;


let users = [
  {name: 'Cecilia'}
]

app.get('/', (req, res) => {
  res.send(users);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join', ({users})
  .then ((response) => {
    console.log(response);
  })
  .catch (() => {
    console.log
  }));
  socket.on('disconnect', () => {
    console.log('User has disconnected')
  })
});

http.listen(8090, () => {
  console.log('listening on 8090');
});