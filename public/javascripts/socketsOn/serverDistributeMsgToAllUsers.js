import { scrollLatestMsgIntoView } from '../utils/scrollLatestMsgIntoView.js';
import { placeOtheUsersMsgInCorrectElement } from '../utils/placeOtheUsersMsgInCorrectElement.js';
function serverDistributeMsgToAllUsers(socket, chatLog) {
	socket.on('server distribute msg to all users', (msg) => {
		placeOtheUsersMsgInCorrectElement(msg, chatLog);

		scrollLatestMsgIntoView();
	});
}

export { serverDistributeMsgToAllUsers };
