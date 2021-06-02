function printWelcomeMsgFromServer(screenName, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<div>
			<li>Welcome! You are user: <strong>${screenName}</strong></li>
		</div>`
	);
}

export { printWelcomeMsgFromServer };
