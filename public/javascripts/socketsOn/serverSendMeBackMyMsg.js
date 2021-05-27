import { printMsgFromMe } from '../modules/chatMsgs/printMsgFromMe.js';
import { scrollLatestMsgIntoView } from '../utils/scrollLatestMsgIntoView.js';
function serverSendMeBackMyMsg(socket, chatLog) {
	socket.on('server send me back my msg', (msg) => {
		printMsgFromMe(msg, chatLog);
		scrollLatestMsgIntoView();
	});
}

export { serverSendMeBackMyMsg };
