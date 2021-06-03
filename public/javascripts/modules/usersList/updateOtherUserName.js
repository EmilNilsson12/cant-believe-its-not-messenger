function updateOtherUserName(nameInfo) {
	// Desctructure nameInfo
	const { newName, oldName } = nameInfo;

	// Get all <span> of users currentName
	let onlineUsers = Array.from(document.querySelectorAll('.currentName'));

	// Find <span> with user the changed name
	let userLi = onlineUsers.find((span) => span.textContent == oldName);

	// Update <span>
	userLi.parentNode.innerHTML = `<s>${oldName}</s> <span class="currentName">${newName}</span>`;
}

export { updateOtherUserName };
