import { printUserChangedName } from '../modules/chatMsgs/printUserChangedName.js';
import { updateOtherUserName } from '../modules/usersList/updateOtherUserName.js';
import { scrollLatestMsgIntoView } from '../utils/scrollLatestMsgIntoView.js';
function serverAnnounceNameChange(socket, chatLog, onlineList) {
	socket.on('another user has changed their name', (nameInfo) => {
		printUserChangedName(nameInfo, chatLog);
		updateOtherUserName(nameInfo, onlineList);
		scrollLatestMsgIntoView();
	});
}

export { serverAnnounceNameChange };
