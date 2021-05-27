function otherUserHasJoined(socket, chatLog) {
	socket.on('user has joined', (newUser) => {
		chatLog.insertAdjacentHTML(
			'beforeend',
			`<li>${newUser.screenName} has joined</li>`
		);
	});
}

export { otherUserHasJoined };
