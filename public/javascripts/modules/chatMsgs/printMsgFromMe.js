function printMsgFromMe(msg, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<div class="msg-group msg-group-from-me" data-sender="${msg.user}">
			<li class="msg-from-me chat-msg">${msg.content}</li>
		</div>`
	);
}

export { printMsgFromMe };
