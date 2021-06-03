function addUserToOnlineList(screenName, onlineList) {
	onlineList.insertAdjacentHTML('beforeend', `<li>${screenName}</li>`);
}

export { addUserToOnlineList };
