function printWelcomeMsgFromServer(screenName, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<li>Welcome! You are user: ${screenName}</li>`
	);
}

export { printWelcomeMsgFromServer };
