function printUserLeftMsg(screenName, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<div>
			<li class="chat-msg bot">${screenName} has left</li>
		</div>`
	);
}

export { printUserLeftMsg };
