function serverSendMeBackMyMsg(socket, chatLog) {
	socket.on('server send me back my msg', (msg) => {
		chatLog.insertAdjacentHTML(
			'beforeend',
			`<li class="msg-from-me">${msg.content}</li>`
		);

		let allMsges = document.querySelectorAll('.msg-from-me');
		console.log('allMsges from myself: ', allMsges);

		let latestMsg = allMsges[allMsges.length - 1];
		console.log('latestMsg: ', latestMsg);

		latestMsg.scrollIntoView();
	});
}

export { serverSendMeBackMyMsg };
