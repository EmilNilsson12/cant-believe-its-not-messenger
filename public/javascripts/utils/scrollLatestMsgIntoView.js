function scrollLatestMsgIntoView() {
	let allMsges = document.querySelectorAll('li');
	console.log(allMsges);
	let latestMsg = allMsges[allMsges.length - 1];
	console.log(latestMsg);
	latestMsg.scrollIntoView();
}

export { scrollLatestMsgIntoView };
