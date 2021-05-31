function scrollLatestMsgIntoView() {
	let allMsges = document.querySelectorAll('li');

	if (allMsges.length) {
		let latestMsg = allMsges[allMsges.length - 1];
		latestMsg.scrollIntoView();
	}
}

export { scrollLatestMsgIntoView };
