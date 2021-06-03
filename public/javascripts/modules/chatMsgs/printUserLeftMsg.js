function printUserLeftMsg(newUser, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<div>
			<li class="chat-msg">${newUser.screenName} has left</li>
		</div>`
	);
}

export { printUserLeftMsg };
