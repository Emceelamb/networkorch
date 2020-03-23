let PANVAR = 0; // sets pan range
// let synths = [];
let clientList = [];

let socket = io()
  socket.on('connect', function() {
  socket.emit('my event', "Connected mah boi!!!!!")
  // function sendNote(client){
  //   socket.broadcast.to(client).emit("play note", peer.note)
  // } 

});

socket.on('server response', function(res){
  clientList = res;
  // console.log(clientList[0].note)
  console.log(clientList, clientList.length);
  console.log(res)

  $('#clients').empty();
  clientList.forEach((client)=>{

    $('#clients').append(
      `
      <button type="button" class="clientButton" onclick="sendNote('${client.socketId}')">${client.address}</button>
      `
    )  
  })
    // for (let i = 0; i < clientList.length; i++){

  //   console.log(clientList[i], i)
  //   $('#clients').append(
  //     `
  //     <button type="button" class="clientButton" onclick="sendNote(${clientList[i]})">${clientList[i].address}</button>
  //     `
  //   )

  // $('#peers').empty();
  // let ips = res.split(",")
  // ips.forEach((ip)=>{
  //   ipAdd= ip.split(":");
  //   $('#peers').append(
  //     `
  //     <li class="peerIp">${ipAdd[3]}</li>
  //     `
  //   )
  // })
});

socket.on('send ip', (res)=>{
  $('#ipAddr').html(res);
  let synth = new Tone.Synth().toDestination();
  // synth.triggerAttackRelease(res.note, res.length);
});

let num = 0;
socket.on('play note', (res)=>{
  // console.log(res);
  let synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(res.note, res.length);

})

function sendNote(client){
  console.log(clientList[0])
  console.log(socket, "@")
  console.log(client)
  // io.sockets.socket("play note", clientList[0].note);
  socket.broadcast.to(client).emit('play note', "j")
  // socket.broadcast.to(client).emit("play note", peer.note)
} 
