function otherUserHasJoined(socket, chatLog) {
	socket.on('user has joined', (newUser) => {
		chatLog.insertAdjacentHTML(
			'beforeend',
			`<li>${newUser.id.slice(0, 4)} has joined</li>`
		);
	});
}

export { otherUserHasJoined };
