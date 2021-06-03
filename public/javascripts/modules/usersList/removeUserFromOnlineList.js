function removeUserFromOnlineList(screenName) {
	let onlineUsers = Array.from(
		document.querySelectorAll('#users-currently-online li')
	);

	// Find <li>
	let userToBeRemoved = onlineUsers.find((li) => li.textContent == screenName);

	// Remove <li>
	userToBeRemoved.remove();
}

export { removeUserFromOnlineList };
