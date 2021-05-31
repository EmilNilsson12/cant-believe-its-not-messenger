import { printMsgFromMe } from '../modules/chatMsgs/printMsgFromMe.js';
import { printMsgFromMeSameGroup } from '../modules/chatMsgs/printMsgFromMeSameGroup.js';
import { scrollLatestMsgIntoView } from '../utils/scrollLatestMsgIntoView.js';
function serverSendMeBackMyMsg(socket, chatLog) {
	socket.on('server send me back my msg', (msg) => {
		// Get the local name of sender
		let me = JSON.parse(localStorage.getItem('screenName'));

		// Get all previous divs from chat on screen
		let divsInChatLog = document.querySelectorAll('ul > div');
		console.log('divsInChatLog: ', divsInChatLog);

		// If there exists previous msgs on screen
		if (divsInChatLog.length) {
			let latestMsgGroup = divsInChatLog[divsInChatLog.length - 1];
			let iAmLatestMsgGroupOwner = latestMsgGroup.dataset.sender == me;
			if (iAmLatestMsgGroupOwner) {
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

		scrollLatestMsgIntoView();
	});
}

export { serverSendMeBackMyMsg };
