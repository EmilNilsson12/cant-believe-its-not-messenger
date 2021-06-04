import { printWelcomeMsgFromServer } from './modules/chatMsgs/printWelcomeMsgFromServer.js';
import { printMyNameChanged } from './modules/chatMsgs/printMyNameChanged.js';
import { printUserChangedName } from './modules/chatMsgs/printUserChangedName.js';

import { addMeToOnlineList } from './modules/usersList/addMeToOnlineList.js';
import { addUserToOnlineList } from './modules/usersList/addUserToOnlineList.js';
import { updateMyName } from './modules/usersList/updateMyName.js';

import { otherUserHasJoined } from './socketsOn/otherUserHasJoined.js';
import { otherUserHasLeft } from './socketsOn/otherUserHasLeft.js';
import { serverDistributeMsgToAllUsers } from './socketsOn/serverDistributeMsgToAllUsers.js';
import { serverSendMeBackMyMsg } from './socketsOn/serverSendMeBackMyMsg.js';
import { serverAnnounceNameChange } from './socketsOn/serverAnnounceNameChange.js';

import { sanitize } from './utils/sanitizeInput.js';
import { scrollLatestMsgIntoView } from './utils/scrollLatestMsgIntoView.js';
import { placeMyMsgInCorrectElement } from './utils/placeMyMsgInCorrectElement.js';
import { placeOtheUsersMsgInCorrectElement } from './utils/placeOtheUsersMsgInCorrectElement.js';

const socket = io();
console.log(socket);

let thisClientLocalName;
let thisClientCookie;

const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

const onlineList = document.getElementById('users-currently-online');

// Fill chat history with chat log
socket.on('server sends serverChatLog', (chatHistory) => {
	for (let msg of chatHistory) {
		if (msg.user == 'bot') {
			console.log(msg);
			printUserChangedName(msg, chatLog);
		} else if (msg.usersCookie == thisClientCookie) {
			placeMyMsgInCorrectElement(msg, chatLog);
		} else {
			placeOtheUsersMsgInCorrectElement(msg, chatLog);
		}
	}
	// Welcomes user after eventual msg from log has been rendered
	printWelcomeMsgFromServer(thisClientLocalName, chatLog);
	scrollLatestMsgIntoView();
});

// Fill chat history with chat log
socket.on('server sends currentUsers', (users) => {
	for (let user of users) {
		if (user.screenName == thisClientLocalName) {
			addMeToOnlineList(user.screenName, onlineList);
		} else {
			addUserToOnlineList(user.screenName, onlineList);
		}
	}
});

// Always receieve from server when you enter the chat
socket.on('you have joined', (user) => {
	let cookie = localStorage.getItem('cookie');
	if (cookie == null) {
		localStorage.setItem('cookie', JSON.stringify(user.cookie));
		localStorage.setItem('screenName', JSON.stringify(user.screenName));
	} else {
		socket.emit('user returns', {
			currentId: socket.id,
			prevCookie: JSON.parse(localStorage.getItem('cookie')),
			screenName: JSON.parse(localStorage.getItem('screenName')),
		});
	}
	// Set local var
	thisClientCookie = JSON.parse(localStorage.getItem('cookie'));
	thisClientLocalName = JSON.parse(localStorage.getItem('screenName'));

	// Add value to inputfield
	yourNameInput.value = JSON.parse(localStorage.getItem('screenName'));

	// Tell server to broadcast that I've joined
	socket.emit('user joins', thisClientLocalName);
});

// Send a msg to server
chatForm.addEventListener('submit', (e) => {
	e.preventDefault();

	let msg = chatInput.value;

	// Prevents user from writing HTML as msg - XSS
	msg = sanitize(msg);

	socket.emit('user send msg to server', {
		content: msg,
		user: thisClientLocalName,
		usersCookie: thisClientCookie,
	});
	chatInput.focus();
	chatInput.value = '';
});

const yourNameForm = document.getElementById('form-change-name');
const yourNameInput = document.getElementById('your-name-input');

// Change screenName
yourNameForm.addEventListener('submit', changeName);
yourNameInput.addEventListener('blur', changeName);

function changeName(e) {
	e.preventDefault();

	// Save old name
	let oldName = thisClientLocalName;

	// Get new name
	let newName = yourNameInput.value;

	// Only update name if its different from previous name
	if (newName != thisClientLocalName && newName != '') {
		// Change my name locally
		thisClientLocalName = newName;
		localStorage.setItem('screenName', JSON.stringify(thisClientLocalName));

		// Local feedback that the name is changed
		printMyNameChanged(newName, chatLog);
		updateMyName({ oldName, newName }, onlineList);
		scrollLatestMsgIntoView();

		// Send new name to server
		socket.emit('user change their name', {
			newName: newName,
			userId: socket.id,
		});

		yourNameInput.blur();
	}
}

/* --------- IO LISTENERS --------- */

// Listen for other users joining
otherUserHasJoined(socket, chatLog, onlineList);

// Listen for other users leaving
otherUserHasLeft(socket, chatLog, onlineList);

// Listen for other user changes name
serverAnnounceNameChange(socket, chatLog, onlineList);

// Listen for messages from me
serverSendMeBackMyMsg(socket, chatLog, thisClientLocalName);

// Listen for messages from others
serverDistributeMsgToAllUsers(socket, chatLog);
