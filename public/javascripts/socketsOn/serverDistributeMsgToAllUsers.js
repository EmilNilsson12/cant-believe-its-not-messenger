import { printMsgFromOtherUser } from '../modules/chatMsgs/printMsgFromOtherUser.js';
import { printMsgFromOtherUserSameGroup } from '../modules/chatMsgs/printMsgFromOtherUserSameGroup.js';
import { scrollLatestMsgIntoView } from '../utils/scrollLatestMsgIntoView.js';
function serverDistributeMsgToAllUsers(socket, chatLog) {
	socket.on('server distribute msg to all users', (msg) => {
		console.log('msg:', msg);
		// Get all previous divs from chat on screen
		let divsInChatLog = document.querySelectorAll('ul > div');
		console.log('divsInChatLog: ', divsInChatLog);

		// If there exists previous msgs on screen
		if (divsInChatLog.length) {
			let latestMsgGroup = divsInChatLog[divsInChatLog.length - 1];
			let islatestMsgGroupOwner = latestMsgGroup.dataset.sender == msg.user;
			if (islatestMsgGroupOwner) {
				// If latest msg was from me
				printMsgFromOtherUserSameGroup(msg, latestMsgGroup);
			}
			// If I am not owner of latest group
			else {
				printMsgFromOtherUser(msg, chatLog);
			}
		}
		// If there DOES NOT exist previous msgs on screen
		else {
			printMsgFromOtherUser(msg, chatLog);
		}

		scrollLatestMsgIntoView();
	});
}

export { serverDistributeMsgToAllUsers };
