function printMsgFromMeSameGroup(msg, msgGroup) {
	msgGroup.insertAdjacentHTML(
		'beforeend',
		`<li class="msg-from-me">${msg.content}</li>`
	);
}

export { printMsgFromMeSameGroup };
