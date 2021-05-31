import { scrollLatestMsgIntoView } from '../utils/scrollLatestMsgIntoView.js';
import { placeMyMsgInCorrectElement } from '../utils/placeMyMsgInCorrectElement.js';
function serverSendMeBackMyMsg(socket, chatLog) {
	socket.on('server send me back my msg', (msg) => {
		placeMyMsgInCorrectElement(msg, chatLog);

		scrollLatestMsgIntoView();
	});
}

export { serverSendMeBackMyMsg };
