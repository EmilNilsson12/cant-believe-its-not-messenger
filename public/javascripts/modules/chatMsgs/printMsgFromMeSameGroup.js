function printMsgFromMeSameGroup(msg, msgGroup) {
	msgGroup.insertAdjacentHTML(
		'beforeend',
		`<li class="msg-from-me chat-msg">${msg.content}</li>`
	);
}

export { printMsgFromMeSameGroup };
