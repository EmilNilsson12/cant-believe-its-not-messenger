import { printMsgFromOtherUserSameGroup } from '../modules/chatMsgs/printMsgFromOtherUserSameGroup.js';
import { printMsgFromOtherUser } from '../modules/chatMsgs/printMsgFromOtherUser.js';
function placeOtheUsersMsgInCorrectElement(msg, chatLog) {
	let divsInChatLog = document.querySelectorAll('ul > div');

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
}

export { placeOtheUsersMsgInCorrectElement };
