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
let serverChatLog = [];

let totalClients = 0;
let totalClientsEver = 0;
io.on('connection', (socket) => {
	// Create new user
	const newUser = {
		id: socket.id,
		cookie: 'Guest_' + socket.id,
		screenName: socket.id.slice(0, 4),
	};

	users.push(newUser);

	console.log('--------------------CURRENT users ONLINE--------------------');
	console.table(users);
	console.log('------------------------------------------------------------');

	/* ------------ USER CONNECTS ---------- */
	console.log('New client connected: ', socket.id);
	totalClients++;
	totalClientsEver++;
	console.log('Total clients connected: ', totalClients);

	/* ------------------------------------------- */
	/* ------------------------------------------- */
	/* ----------- SOCKET.EMIT FUNCTIONS --------- */
	/* ------------------------------------------- */
	/* ------------------------------------------- */

	/* ------------ EMIT TO USER AFTER ADDED TO USERS ARRAY ---------- */
	socket.emit('you have joined', newUser);

	/* ------------ SEND CHAT HISTORY TO NEWLY CONNECTED USER ---------- */
	socket.emit('server sends serverChatLog', serverChatLog);

	/* ------------------------------------------- */
	/* ------------------------------------------- */
	/* ------------ SOCKET.ON FUNCTIONS ---------- */
	/* ------------------------------------------- */
	/* ------------------------------------------- */

	/* ------------ CONFIGURE RETURN USER ---------- */
	socket.on('user returns', (returnUser) => {
		// Update array of visitors to match the users local settings
		let theReturnUserOldInfo = users.find(
			(user) => user.id == returnUser.currentId
		);

		// Update user in users array
		theReturnUserOldInfo.screenName = returnUser.screenName;
		theReturnUserOldInfo.cookie = returnUser.prevCookie;

		console.table(users);
	});

	/* ------------ BROADCAST NEW USER TO ALL ---------- */
	socket.on('user joins', (user) => {
		socket.broadcast.emit('user has joined', user);
	});

	/* ------------ USER DISCONNECTS ---------- */
	socket.on('disconnect', () => {
		console.log('Client left: ', socket.id);
		totalClients--;
		console.log('Total clients connected: ', totalClients);

		users = users.filter((userDetails) => userDetails.id != socket.id);

		console.log(users);
		socket.broadcast.emit('user has left', newUser);
	});

	/* ------------ A USER SENDS A CHAT-MSG ---------- */
	socket.on('user send msg to server', (msgInfo) => {
		// Save msginfo in serverChatLog
		serverChatLog.push(msgInfo);
		console.log(serverChatLog);

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
