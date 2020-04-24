const express=require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let users = [
  {name: 'Cecilia'}
]

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(8090, () => {
  console.log('listening on *:8090');
});