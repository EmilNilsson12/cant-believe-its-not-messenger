function printUserJoinedMsg(screenName, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`
		<div>
			<li>${screenName} has joined</li>
		</div>`
	);
}

export { printUserJoinedMsg };
