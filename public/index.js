let PANVAR = 0; // sets pan range
// let synths = [];
let clientList;

let socket = io()
  socket.on('connect', function() {
  socket.emit('my event', "Connected mah boi!!!!!")
});

socket.on('server response', function(res){
  clientList = res;
  // console.log(clientList[0].note)
  console.log(clientList);

  for (let i = 0; i < clientList.length; i++){
    $('#clients').empty();
    $('#clients').append(
      `
      <a class="clientButton" onclick="function(){sendNote(${clientList[i].socketId})"}>${clientList.address}</a>
      `
    )

  }
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

function sendNote(peer){
  socket.to(peer.socketId).emit("play note", peer.note)
}
