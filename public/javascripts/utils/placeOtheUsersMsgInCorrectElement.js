import { printMsgFromOtherUserSameGroup } from '../modules/chatMsgs/printMsgFromOtherUserSameGroup.js';
import { printMsgFromOtherUser } from '../modules/chatMsgs/printMsgFromOtherUser.js';
function placeOtheUsersMsgInCorrectElement(msg, chatLog) {
	let divsInChatLog = document.querySelectorAll('ul > div');

	let latestMsgGroup = divsInChatLog[divsInChatLog.length - 1];
	let islatestMsgGroupOwner =
		latestMsgGroup.dataset.sender == msg.user || false;

	// If latest msg was from the same user
	// add the new message inside the same group of msgs
	if (divsInChatLog.length && islatestMsgGroupOwner) {
		printMsgFromOtherUserSameGroup(msg, latestMsgGroup);
	}
	// If there DOES NOT exist previous msgs on screen
	// or if the new msg has a different owner than the latest
	else {
		printMsgFromOtherUser(msg, chatLog);
	}
}

export { placeOtheUsersMsgInCorrectElement };
