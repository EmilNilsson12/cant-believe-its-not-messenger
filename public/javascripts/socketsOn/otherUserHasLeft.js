function otherUserHasLeft(socket, chatLog) {
	socket.on('user has left', (newUser) => {
		chatLog.insertAdjacentHTML(
			'beforeend',
			`<li>${newUser.id.slice(0, 4)} has left</li>`
		);
	});
}

export { otherUserHasLeft };
