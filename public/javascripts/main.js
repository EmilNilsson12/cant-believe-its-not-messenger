import { otherUserHasJoined } from './socketsOn/otherUserHasJoined.js';
import { otherUserHasLeft } from './socketsOn/otherUserHasLeft.js';
import { serverDistributeMsgToAllUsers } from './socketsOn/serverDistributeMsgToAllUsers.js';
import { serverSendMeBackMyMsg } from './socketsOn/serverSendMeBackMyMsg.js';

const socket = io();
console.log(socket);

let thisClient;

const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const yourNameInput = document.getElementById('your-name');

// Always receieve from server when you enter the chat
socket.on('you have joined', (newUser) => {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<li>Welcome! You are user: ${newUser.id.slice(0, 3)}</li>`
	);
	thisClient = newUser.id.slice(0, 4);

	console.log('thisClient has joined');
	console.log(thisClient);
	yourNameInput.value = thisClient;
});

// Send a msg to server
chatForm.addEventListener('submit', (e) => {
	e.preventDefault();

	let msg = chatInput.value;

	console.log('thisClient send msg');
	console.log(thisClient);

	socket.emit('user send msg to server', { content: msg, user: thisClient });

	chatInput.value = '';
});

/* --------- IO LISTENERS --------- */
// Feedback that you have joined the chat
youHaveJoined(socket, chatLog, thisClient, yourNameInput);

// Listen for other users joining
otherUserHasJoined(socket, chatLog);

// Listen for other users leaving
otherUserHasLeft(socket, chatLog);

// Listen for messages from others
serverDistributeMsgToAllUsers(socket, chatLog);

// Listen for messages from me
serverSendMeBackMyMsg(socket, chatLog);
