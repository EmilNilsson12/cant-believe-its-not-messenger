import { printUserJoinedMsg } from '../modules/chatMsgs/printUserJoinedMsg.js';
function otherUserHasJoined(socket, chatLog) {
	socket.on('user has joined', (newUser) => {
		printUserJoinedMsg(newUser, chatLog);
	});
}

export { otherUserHasJoined };
