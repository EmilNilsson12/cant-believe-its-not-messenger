function youHaveJoined(socket, chatLog, thisClient, yourName) {
	socket.on('you have joined', (newUser) => {
		chatLog.insertAdjacentHTML(
			'beforeend',
			`<li>Welcome! You are user: ${newUser.id.slice(0, 3)}</li>`
		);
		thisClient = newUser.id.slice(0, 4);
		yourName.value = thisClient;
	});
}

export { youHaveJoined };
