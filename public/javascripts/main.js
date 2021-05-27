import { welcomeUserInChat } from './modules/welcomeMsgFromServer.js';
import { changeMyName } from './modules/feedbackNameChange.js';

import { otherUserHasJoined } from './socketsOn/otherUserHasJoined.js';
import { otherUserHasLeft } from './socketsOn/otherUserHasLeft.js';
import { serverDistributeMsgToAllUsers } from './socketsOn/serverDistributeMsgToAllUsers.js';
import { serverSendMeBackMyMsg } from './socketsOn/serverSendMeBackMyMsg.js';
import { serverAnnounceNameChange } from './socketsOn/serverAnnounceNameChange.js';

const socket = io();
console.log(socket);

let thisClientLocalName;

const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

const yourNameForm = document.getElementById('form-change-name');
const yourNameInput = document.getElementById('your-name');

// Always receieve from server when you enter the chat
socket.on('you have joined', (newUser) => {
	welcomeUserInChat(newUser, chatLog);

	// Set localname of client to first 4 chars of socket.id
	thisClientLocalName = newUser.screenName;

	// Add value to inputfield
	yourNameInput.value = thisClientLocalName;
});

// Send a msg to server
chatForm.addEventListener('submit', (e) => {
	e.preventDefault();

	let msg = chatInput.value;

	socket.emit('user send msg to server', {
		content: msg,
		user: thisClientLocalName,
	});

	chatInput.value = '';
});

// Change screenName
yourNameForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// Get new name
	let newName = yourNameInput.value;

	// Change my name locally
	thisClientLocalName = newName;

	// Local feedback that the name is changed
	changeMyName(newName, chatLog);

	// Send new name to server
	socket.emit('user change their name', {
		newName: newName,
		userId: socket.id,
	});
});

/* --------- IO LISTENERS --------- */

// Listen for other users joining
otherUserHasJoined(socket, chatLog);

// Listen for other users leaving
otherUserHasLeft(socket, chatLog);

// Listen for messages from others
serverDistributeMsgToAllUsers(socket, chatLog);

// Listen for messages from me
serverSendMeBackMyMsg(socket, chatLog);

// Listen for other user changes name
serverAnnounceNameChange(socket, chatLog);
