function printMsgFromMe(msg, chatLog) {
	console.log('msg: ', msg);
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<li class="msg-from-me">${msg.content}</li>`
	);
}

export { printMsgFromMe };
