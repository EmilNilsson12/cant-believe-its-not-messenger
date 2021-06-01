import { printMsgFromMe } from '../modules/chatMsgs/printMsgFromMe.js';
import { printMsgFromMeSameGroup } from '../modules/chatMsgs/printMsgFromMeSameGroup.js';
function placeMyMsgInCorrectElement(msg, chatLog) {
	let divsInChatLog = document.querySelectorAll('ul > div');

	let latestMsgGroup = divsInChatLog[divsInChatLog.length - 1];
	let islatestMsgGroupOwner =
		latestMsgGroup.dataset.sender == msg.user || false;

	// If there exists previous msgs on screen
	// and I was the one who sent it
	if (divsInChatLog.length && islatestMsgGroupOwner) {
		printMsgFromMeSameGroup(msg, latestMsgGroup);
	}
	// If there DOES NOT exist previous msgs on screen
	// or if the latest msg wasnt sent by me
	else {
		printMsgFromMe(msg, chatLog);
	}
}

export { placeMyMsgInCorrectElement };
