var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var currentStats = {};

// serve public folder as static resources
app.use(express.static('public'))

// default main page, displays the statistics
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// url hook to update stats, with a POST request
// secure this route as needed
app.post('/updateStats', function(req, res){

	currentStats = req.query;
	io.emit('current_stats', currentStats)

	res.status(200).send('Data updated');

});

// socket connection for realtime updates
io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('current_stats', currentStats)
});

// serve application
let _HOST = process.env.HOST || '0.0.0.0';
http.listen(3000, _HOST, function(){
  console.log('listening on *:3000');
});