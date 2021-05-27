function welcomeUserInChat(newUser, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<li>Welcome! You are user: ${newUser.screenName}</li>`
	);
}

export { welcomeUserInChat };
