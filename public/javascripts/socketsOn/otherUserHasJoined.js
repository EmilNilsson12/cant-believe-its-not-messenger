import { printUserJoinedMsg } from '../modules/chatMsgs/printUserJoinedMsg.js';
import { addUserToOnlineList } from '../modules/usersList/addUserToOnlineList.js';
import { scrollLatestMsgIntoView } from '../utils/scrollLatestMsgIntoView.js';
function otherUserHasJoined(socket, chatLog, onlineList) {
	socket.on('user has joined', (screenName) => {
		printUserJoinedMsg(screenName, chatLog);
		addUserToOnlineList(screenName, onlineList);
		scrollLatestMsgIntoView();
	});
}

export { otherUserHasJoined };
