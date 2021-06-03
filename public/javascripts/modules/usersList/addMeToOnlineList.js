function addMeToOnlineList(screenName, onlineList) {
	onlineList.insertAdjacentHTML(
		'afterbegin',
		`<li id="your-name"><span class="currentName">${screenName}</span></li>`
	);
}

export { addMeToOnlineList };
