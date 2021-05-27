import { printMsgFromOtherUser } from '../modules/chatMsgs/printMsgFromOtherUser.js';
import { scrollLatestMsgIntoView } from '../utils/scrollLatestMsgIntoView.js';
function serverDistributeMsgToAllUsers(socket, chatLog) {
	socket.on('server distribute msg to all users', (msg) => {
		printMsgFromOtherUser(msg, chatLog);
		scrollLatestMsgIntoView();
	});
}

export { serverDistributeMsgToAllUsers };
