function welcomeUserInChat(newUser, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<li>Welcome! You are user: ${newUser.id.slice(0, 3)}</li>`
	);
}

export { welcomeUser };
