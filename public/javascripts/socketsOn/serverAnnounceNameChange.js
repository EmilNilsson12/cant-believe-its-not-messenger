import { printUserChangedName } from '../modules/chatMsgs/printUserChangedName.js';
function serverAnnounceNameChange(socket, chatLog) {
	socket.on('another user has changed their name', (nameInfo) => {
		printUserChangedName(nameInfo, chatLog);
	});
}

export { serverAnnounceNameChange };
