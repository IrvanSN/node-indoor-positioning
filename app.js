const http = require('http');
const {Server} = require('socket.io')
const {readFileSync} = require("fs");

let data = require('/Users/irvansn/Documents/itts/JARINGAN_NIRKABEL/node-indoor-positioning/data/mac.json')
let users = []

const server = http.createServer();
const io = new Server(server, {})

io.on('connection', (socket) => {
  console.log(`a user connected, ${socket.id}`);

  socket.on('login', (name) => {
    users.push({id: socket.id, name})
    console.log('login', users)
    socket.emit('successfulLogin', true)
  })

  socket.on('disconnect', () => {
    console.log(`a user disconnected, ${socket.id}`);
    users = users.filter(user => user.id !== socket.id)
    console.log('disconnect', users)
  });
});

server.listen(4000, () => {
  console.log('Socket.io server listening on port 4000');
});
