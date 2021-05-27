function printUserLeftMsg(newUser, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<li>${newUser.screenName} has left</li>`
	);
}

export { printUserLeftMsg };
