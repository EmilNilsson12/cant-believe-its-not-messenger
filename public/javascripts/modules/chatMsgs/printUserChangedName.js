function printUserChangedName(nameInfo, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<div>
			<li class="chat-msg bot">The user previously known as <strong>${nameInfo.oldName}</strong> changed their name to <strong>${nameInfo.newName}</strong></li>
		</div>`
	);
}

export { printUserChangedName };
