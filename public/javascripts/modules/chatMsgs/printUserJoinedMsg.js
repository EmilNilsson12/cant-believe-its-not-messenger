function printUserJoinedMsg(newUser, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<li>${newUser.screenName} has joined</li>`
	);
}

export { printUserJoinedMsg };
