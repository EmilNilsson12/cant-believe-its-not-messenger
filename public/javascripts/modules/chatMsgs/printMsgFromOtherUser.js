function printMsgFromOtherUser(msg, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<div class="msg-group msg-group-from-others" data-sender="${msg.user}">
			<li class="msg-from-others-li">
			<span class="msg-from-others-username">${msg.user} says:</span>
			<div class="msg-from-others-content">${msg.content}</div>
			</li>
		</div>`
	);
}

export { printMsgFromOtherUser };
