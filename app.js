var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

let totalClients = 0;
io.on('connection', (socket) => {
	// Create new user
	const newUser = {
		id: socket.id,
		name: 'Guest ' + totalClients,
	};

	/* ------------ USER CONNECTS ---------- */
	console.log('New client connected: ', socket.id);
	totalClients++;
	console.log('Total clients connected: ', totalClients);

	/* ------------ BROADCAST NEW USER TO ALL ---------- */
	socket.broadcast.emit('user has joined', newUser);

	/* ------------ WELCOME NEW USER TO ALL ---------- */
	socket.emit('you have joined', newUser);

	/* ------------ USER DISCONNECTS ---------- */
	socket.on('disconnect', () => {
		console.log('Client left: ', socket.id);
		totalClients--;
		console.log('Total clients connected: ', totalClients);
		socket.broadcast.emit('user has left', newUser);
	});

	/* ------------ A USER SENDS A CHAT-MSG ---------- */
	socket.on('user send msg to server', (msgInfo) => {
		socket.broadcast.emit('server distribute msg to all users', msgInfo);
		socket.emit('server send me back my msg', msgInfo);
	});
});

// app.post('/chatmsg', (req, res) => {
// 	console.log(req.body);
// 	// res.send(req.body);

// 	io.emit('msg from user', req.body.msg);
// });

module.exports = {
	app,
	server,
};
