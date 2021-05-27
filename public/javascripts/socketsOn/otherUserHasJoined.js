import { printUserJoinedMsg } from '../modules/chatMsgs/printUserJoinedMsg.js';
import { scrollLatestMsgIntoView } from '../utils/scrollLatestMsgIntoView.js';
function otherUserHasJoined(socket, chatLog) {
	socket.on('user has joined', (newUser) => {
		printUserJoinedMsg(newUser, chatLog);
		scrollLatestMsgIntoView();
	});
}

export { otherUserHasJoined };
