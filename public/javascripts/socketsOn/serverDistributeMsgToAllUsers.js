import { printMsgFromOtherUser } from '../modules/chatMsgs/printMsgFromOtherUser.js';
function serverDistributeMsgToAllUsers(socket, chatLog) {
	socket.on('server distribute msg to all users', (msg) => {
		console.log('msg: ', msg);
		// chatLog.insertAdjacentHTML(
		// 	'beforeend',
		// 	`<li class="msg-from-others-li">
		// 		<span class="msg-from-others-username">${msg.user} says:</span>
		// 		<div class="msg-from-others-content">${msg.content}</div>
		// 	</li>`
		// );
		printMsgFromOtherUser(msg, chatLog);

		let allMsges = document.querySelectorAll('.msg-from-others-li');
		console.log('allMsges from others: ', allMsges);

		let latestMsg = allMsges[allMsges.length - 1];
		console.log('latestMsg: ', latestMsg);

		latestMsg.scrollIntoView();
	});
}

export { serverDistributeMsgToAllUsers };
