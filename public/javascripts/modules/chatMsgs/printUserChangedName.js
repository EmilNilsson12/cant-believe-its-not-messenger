function printUserChangedName(nameInfo, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<li>The user previously known as <strong>${nameInfo.oldName}</strong> changed their name to <strong>${nameInfo.newName}</strong></li>`
	);
}

export { printUserChangedName };
