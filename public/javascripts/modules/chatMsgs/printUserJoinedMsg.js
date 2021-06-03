function printUserJoinedMsg(screenName, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<div>
			<li class="chat-msg">${screenName} has joined</li>
		</div>`
	);
}

export { printUserJoinedMsg };
