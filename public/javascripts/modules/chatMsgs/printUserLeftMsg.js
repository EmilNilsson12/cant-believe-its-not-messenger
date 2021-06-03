function printUserLeftMsg(screenName, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<div>
			<li class="chat-msg">${screenName} has left</li>
		</div>`
	);
}

export { printUserLeftMsg };
