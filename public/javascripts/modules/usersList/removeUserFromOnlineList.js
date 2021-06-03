function removeUserFromOnlineList(screenName) {
	let onlineUsers = Array.from(document.querySelectorAll('.currentName'));

	// Find user that left <span>
	let userToBeRemoved = onlineUsers.find((li) => li.textContent == screenName);

	// Remove <li> which contained <span>
	userToBeRemoved.parentNode.remove();
}

export { removeUserFromOnlineList };
