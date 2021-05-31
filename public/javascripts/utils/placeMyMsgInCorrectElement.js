import { printMsgFromMe } from '../modules/chatMsgs/printMsgFromMe.js';
import { printMsgFromMeSameGroup } from '../modules/chatMsgs/printMsgFromMeSameGroup.js';
function placeMyMsgInCorrectElement(msg, chatLog) {
	let divsInChatLog = document.querySelectorAll('ul > div');

	// If there exists previous msgs on screen
	if (divsInChatLog.length) {
		let latestMsgGroup = divsInChatLog[divsInChatLog.length - 1];
		let islatestMsgGroupOwner = latestMsgGroup.dataset.sender == msg.user;

		if (islatestMsgGroupOwner) {
			// If latest msg was from me
			printMsgFromMeSameGroup(msg, latestMsgGroup);
		}

		// If I am not owner of latest group
		else {
			printMsgFromMe(msg, chatLog);
		}
	}
	// If there DOES NOT exist previous msgs on screen
	else {
		printMsgFromMe(msg, chatLog);
	}
}

export { placeMyMsgInCorrectElement };
