import { printUserLeftMsg } from '../modules/chatMsgs/printUserLeftMsg.js';
import { removeUserFromOnlineList } from '../modules/usersList/removeUserFromOnlineList.js';
import { scrollLatestMsgIntoView } from '../utils/scrollLatestMsgIntoView.js';
function otherUserHasLeft(socket, chatLog) {
	socket.on('user has left', (screenName) => {
		printUserLeftMsg(screenName, chatLog);
		removeUserFromOnlineList(screenName);
		scrollLatestMsgIntoView();
	});
}

export { otherUserHasLeft };
