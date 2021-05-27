import { printUserLeftMsg } from '../modules/chatMsgs/printUserLeftMsg.js';
import { scrollLatestMsgIntoView } from '../utils/scrollLatestMsgIntoView.js';
function otherUserHasLeft(socket, chatLog) {
	socket.on('user has left', (newUser) => {
		printUserLeftMsg(newUser, chatLog);
		scrollLatestMsgIntoView();
	});
}

export { otherUserHasLeft };
