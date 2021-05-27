function scrollLatestMsgIntoView() {
	let allMsges = document.querySelectorAll('li');
	let latestMsg = allMsges[allMsges.length - 1];
	latestMsg.scrollIntoView();
}

export { scrollLatestMsgIntoView };
