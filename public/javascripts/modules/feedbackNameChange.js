function changeMyName(newName, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<li>You have successfully changed your name to: <strong>${newName}</strong></li>`
	);
}

export { changeMyName };
