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

let users = [];

let totalClients = 0;
let totalClientsEver = 0;
io.on('connection', (socket) => {
	// Create new user

	/* ------------ USER CONNECTS ---------- */
	console.log('New client connected: ', socket.id);
	totalClients++;
	totalClientsEver++;
	console.log('Total clients connected: ', totalClients);

	const newUser = {
		id: socket.id,
		name: 'Guest ' + totalClientsEver,
		screenName: socket.id.slice(0, 4),
	};

	users.push(newUser);
	console.log(users);

	/* ------------ BROADCAST NEW USER TO ALL ---------- */
	socket.broadcast.emit('user has joined', newUser);

	/* ------------ WELCOME NEW USER TO ALL ---------- */
	socket.emit('you have joined', newUser);

	/* ------------ USER DISCONNECTS ---------- */
	socket.on('disconnect', () => {
		console.log('Client left: ', socket.id);
		totalClients--;
		console.log('Total clients connected: ', totalClients);

		console.log(users);
		users = users.filter((userDetails) => userDetails.id != socket.id);
		console.log(users);

		socket.broadcast.emit('user has left', newUser);
	});

	/* ------------ A USER SENDS A CHAT-MSG ---------- */
	socket.on('user send msg to server', (msgInfo) => {
		socket.broadcast.emit('server distribute msg to all users', msgInfo);
		socket.emit('server send me back my msg', msgInfo);
	});

	/* ------------ A user changes their name ---------- */
	socket.on('user change their name', (userInfo) => {
		const { newName, userId } = userInfo;

		console.log('User ' + userId + ' wants a new name');

		// Save old name for broadcasting
		let oldName = users.find((user) => user.id == userId).screenName;

		// Overwrite old name in users array
		users.find((user) => user.id == userId).screenName = newName;

		// Emit the change to all other users
		socket.broadcast.emit('another user has changed their name', {
			oldName,
			newName,
		});

		// // Send feedback to the user
		// socket.emit('you have changed your name', newName);
	});
});

module.exports = {
	app,
	server,
};
