function printUserLeftMsg(newUser, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<div>
			<li>${newUser.screenName} has left</li>
		</div>`
	);
}

export { printUserLeftMsg };
