import { printUserChangedName } from '../modules/chatMsgs/printUserChangedName.js';
import { scrollLatestMsgIntoView } from '../utils/scrollLatestMsgIntoView.js';
function serverAnnounceNameChange(socket, chatLog) {
	socket.on('another user has changed their name', (nameInfo) => {
		printUserChangedName(nameInfo, chatLog);
		scrollLatestMsgIntoView();
	});
}

export { serverAnnounceNameChange };
