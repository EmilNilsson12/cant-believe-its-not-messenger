function printWelcomeMsgFromServer(screenName, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<div>
			<li>Welcome! You are user: ${screenName}</li>
		</div>`
	);
}

export { printWelcomeMsgFromServer };
