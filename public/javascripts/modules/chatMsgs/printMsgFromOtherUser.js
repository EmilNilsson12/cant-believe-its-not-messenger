function printMsgFromOtherUser(msg, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<li class="msg-from-others-li">
		<span class="msg-from-others-username">${msg.user} says:</span>
		<div class="msg-from-others-content">${msg.content}</div>
	</li>`
	);
}

export { printMsgFromOtherUser };
