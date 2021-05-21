const socket = io();
console.log(socket);

let thisClient;

const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

chatForm.addEventListener('submit', (e) => {
	e.preventDefault();

	let msg = chatInput.value;

	socket.emit('user send msg to server', { content: msg, user: thisClient });

	chatInput.value = '';
});

// Feedback that you have joined the chat
socket.on('you have joined', (newUser) => {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<li>Welcome! You are user: ${newUser.id.slice(0, 3)}</li>`
	);
	thisClient = newUser.id.slice(0, 3);
});

// Listen for other users joining
socket.on('user has joined', (newUser) => {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<li>${newUser.id.slice(0, 3)} has joined</li>`
	);
});

// Listen for other users leaving
socket.on('user has left', (newUser) => {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<li>${newUser.id.slice(0, 3)} has left</li>`
	);
});

socket.on('server distribute msg to all users', (msg) => {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<li class="msg-from-others"><span class="msg-user">${msg.user} says:</span><span class="msg-content">${msg.content}</span></li>`
	);

	let allMsges = document.querySelectorAll('.msg-from-others');
	console.log('allMsges from others: ', allMsges);

	let latestMsg = allMsges[allMsges.length - 1];
	console.log('latestMsg: ', latestMsg);

	latestMsg.scrollIntoView();
});

socket.on('server send me back my msg', (msg) => {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<li class="msg-from-me">${msg.content}</li>`
	);

	let allMsges = document.querySelectorAll('.msg-from-me');
	console.log('allMsges from myself: ', allMsges);

	let latestMsg = allMsges[allMsges.length - 1];
	console.log('latestMsg: ', latestMsg);

	latestMsg.scrollIntoView();
});
