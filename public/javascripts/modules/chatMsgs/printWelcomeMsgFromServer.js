function printWelcomeMsgFromServer(screenName, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<div>
			<li class="chat-msg bot">Welcome! You are user: <strong>${screenName}</strong></li>
		</div>`
	);
}

export { printWelcomeMsgFromServer };
