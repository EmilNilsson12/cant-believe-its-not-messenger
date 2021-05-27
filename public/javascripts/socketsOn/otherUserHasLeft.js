import { printUserLeftMsg } from '../modules/chatMsgs/printUserLeftMsg.js';
function otherUserHasLeft(socket, chatLog) {
	socket.on('user has left', (newUser) => {
		printUserLeftMsg(newUser, chatLog);
	});
}

export { otherUserHasLeft };
