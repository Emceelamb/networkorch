const express = require('express'),
      app     = express()
      server  = require('http').createServer(app),
      io      = require('socket.io')(server),
      path    = require('path');

const PORT = process.env.PORT || 8000;

let clientList = [];

const noteList = ['E3', 'C4', 'F3', 'C6']

app.use(express.static('public'));

io.on('connection', (socket)=>{


  console.log('Connection was made!');

  // Get IP Address of socket conn
  let address = socket.handshake.address;
  address=address.split(':')[3];


  // Init Client obj
  let client = {
    "address"  : address,
    "socketId" : socket.id,
  }

  let note = {
    //"note"   : noteList[clientList.indexOf(address)],
    "note"   : noteList[clientList.length],
    "length" : "8n"
  }

  client["note"] = note;

  // Add Client to list
  clientList.push(client);
  clientList = [...new Set(clientList)];

  io.emit('server response', clientList);
  //io.emit('server response', `${clientList}`);
  console.log(`We have a client: ${socket.id}`);

  // Send IP addr to client
  io.to(`${socket.id}`).emit('send ip', address)

  // Send note to client
  io.to(`${socket.id}`).emit('play note', note)
  });

io.on('disconnect', () =>{

clientList = [...new Set(clientList)];
  let index = clientList.indexOf(socket.handshake.address);
  console.log(clientList, index, "haha");

  if(index > -1){
    clientList.splice(index, 1);
    io.emit('server response', `${clientList}`);
    
  }
  console.log(`${socket.id} disconnected.`)
});


app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname +'/index.html'));
});

server.listen(PORT, ()=>{
  console.log(`Server is up! Listening on port ${PORT}.`)
});

var globalTimer = 0;
function setLoop(timer){
  
  //console.log(globalTimer, timer % clientList.length );
  let index = timer % clientList.length 

  //console.log(clientList[index].socketId, clientList[index].note)
  io.to(clientList[index].socketId).emit('play note',  clientList[index].note)
  globalTimer++;
}

setInterval(function(){{setLoop(globalTimer)}}, 1000)

