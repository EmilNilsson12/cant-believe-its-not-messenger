function printMsgFromMe(msg, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<div class="msg-group msg-group-from-me" data-sender="${msg.user}">
			<li class="msg-from-me">${msg.content}</li>
		</div>`
	);
}

export { printMsgFromMe };
