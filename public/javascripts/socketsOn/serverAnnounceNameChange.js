function serverAnnounceNameChange(socket, chatLog) {
	socket.on('another user has changed their name', (nameInfo) => {
		chatLog.insertAdjacentHTML(
			'beforeend',
			`<li>The user previously known as <strong>${nameInfo.oldName}</strong> changed their name to <strong>${nameInfo.newName}</strong></li>`
		);
	});
}

export { serverAnnounceNameChange };
