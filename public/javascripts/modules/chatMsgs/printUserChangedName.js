function printUserChangedName(nameInfo, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<div>
			<li class="chat-msg">The user previously known as <strong>${nameInfo.oldName}</strong> changed their name to <strong>${nameInfo.newName}</strong></li>
		</div>`
	);
}

export { printUserChangedName };
