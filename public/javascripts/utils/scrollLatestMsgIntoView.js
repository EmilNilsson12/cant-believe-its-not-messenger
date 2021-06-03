function scrollLatestMsgIntoView() {
	let allMsges = document.querySelectorAll('li.chat-msg');

	if (allMsges.length) {
		let latestMsg = allMsges[allMsges.length - 1];
		latestMsg.scrollIntoView();
	}
}

export { scrollLatestMsgIntoView };
