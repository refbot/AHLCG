console.log('app.js');
var express = require('express');
var app = express();
var serv = require('http').Server(app);

var player = require('./server/player.js');
var g = require('./server/game.js');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + 'client'));

serv.listen(2000);
console.log('Server started');

var SOCKET_LIST = {};

var io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket) {
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    console.log('socket connection:' + socket.id);

    socket.on('happy', function(socket) {
      console.log('happy received');
    })

    var test_player = new player.Player('Chris');

    var game = new g.Game(test_player);

    // console.log(test_player);

    socket.emit('gameData', {
      'player': test_player.name ,
      // 'game': game,
      // 'player': test_player
    });

});
