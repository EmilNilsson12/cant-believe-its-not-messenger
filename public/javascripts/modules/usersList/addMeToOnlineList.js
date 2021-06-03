function addMeToOnlineList(screenName, onlineList) {
	onlineList.insertAdjacentHTML(
		'afterbegin',
		`<li id="your-name">${screenName}</li>`
	);
}

export { addMeToOnlineList };
