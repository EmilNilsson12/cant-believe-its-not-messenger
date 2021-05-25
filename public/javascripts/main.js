import { youHaveJoined } from './socketsOn/youHaveJoined.js';
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
const yourName = document.getElementById('your-name');

chatForm.addEventListener('submit', (e) => {
	e.preventDefault();

	let msg = chatInput.value;

	socket.emit('user send msg to server', { content: msg, user: thisClient });

	chatInput.value = '';
});

// Feedback that you have joined the chat
youHaveJoined(socket, chatLog, thisClient, yourName);

// Listen for other users joining
otherUserHasJoined(socket, chatLog);

// Listen for other users leaving
otherUserHasLeft(socket, chatLog);

// Listen for messages from others
serverDistributeMsgToAllUsers(socket, chatLog);

// Listen for messages from me
serverSendMeBackMyMsg(socket, chatLog);
