function addUserToOnlineList(screenName, onlineList) {
	onlineList.insertAdjacentHTML(
		'beforeend',
		`<li><span class="currentName">${screenName}</span></li>`
	);
}

export { addUserToOnlineList };
