import { printWelcomeMsgFromServer } from './modules/chatMsgs/printWelcomeMsgFromServer.js';
import { printMyNameChanged } from './modules/chatMsgs/printMyNameChanged.js';
import { printMsgFromMe } from './modules/chatMsgs/printMsgFromMe.js';
import { printMsgFromOtherUser } from './modules/chatMsgs/printMsgFromOtherUser.js';

import { otherUserHasJoined } from './socketsOn/otherUserHasJoined.js';
import { otherUserHasLeft } from './socketsOn/otherUserHasLeft.js';
import { serverDistributeMsgToAllUsers } from './socketsOn/serverDistributeMsgToAllUsers.js';
import { serverSendMeBackMyMsg } from './socketsOn/serverSendMeBackMyMsg.js';
import { serverAnnounceNameChange } from './socketsOn/serverAnnounceNameChange.js';

import { sanitize } from './utils/sanitizeInput.js';
import { scrollLatestMsgIntoView } from './utils/scrollLatestMsgIntoView.js';

const socket = io();
console.log(socket);

let thisClientLocalName;

const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

// Fill chat history with chat log
socket.on('server sends serverChatLog', (chatHistory) => {
	for (let msg of chatHistory) {
		if (msg.user == thisClientLocalName) {
			printMsgFromMe(msg, chatLog);
		} else {
			printMsgFromOtherUser(msg, chatLog);
		}
	}
	scrollLatestMsgIntoView();
});

// Always receieve from server when you enter the chat
socket.on('you have joined', (user) => {
	// Set localname of client to first 4 chars of socket.id
	thisClientLocalName =
		JSON.parse(localStorage.getItem('screenName')) || user.screenName;

	// Add value to inputfield
	yourNameInput.value =
		JSON.parse(localStorage.getItem('screenName')) || thisClientLocalName;

	let cookie = localStorage.getItem('cookie');
	if (cookie == null) {
		localStorage.setItem('cookie', JSON.stringify(user.cookie));
		localStorage.setItem('screenName', JSON.stringify(thisClientLocalName));
	} else {
		socket.emit('user have visited before', {
			prevCookie: JSON.parse(localStorage.getItem('cookie')),
			currentId: socket.id,
			screenName: JSON.parse(localStorage.getItem('screenName')),
		});
		user.screenName = JSON.parse(localStorage.getItem('screenName'));
	}

	console.log('user: ', user);
	console.log('cookie: ', cookie);
	printWelcomeMsgFromServer(user, chatLog);

	socket.emit('user joins', user);
});

// Send a msg to server
chatForm.addEventListener('submit', (e) => {
	e.preventDefault();

	let msg = chatInput.value;

	console.log('thisClientLocalName: ', thisClientLocalName);

	// Prevents user from writing HTML as msg - XSS
	msg = sanitize(msg);

	socket.emit('user send msg to server', {
		content: msg,
		user: thisClientLocalName,
	});

	chatInput.value = '';
});

const yourNameForm = document.getElementById('form-change-name');
const yourNameInput = document.getElementById('your-name-input');

// Change screenName
yourNameForm.addEventListener('submit', changeName);
yourNameInput.addEventListener('blur', changeName);

function changeName(e) {
	e.preventDefault();

	// Get new name
	let newName = yourNameInput.value;

	// Only update name if its different from previous name
	if (newName != thisClientLocalName) {
		// Change my name locally
		thisClientLocalName = newName;
		localStorage.setItem('screenName', JSON.stringify(thisClientLocalName));

		// Local feedback that the name is changed
		printMyNameChanged(newName, chatLog);
		scrollLatestMsgIntoView();

		// Send new name to server
		socket.emit('user change their name', {
			newName: newName,
			userId: socket.id,
		});
	}
}

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
