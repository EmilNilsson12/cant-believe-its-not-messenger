function updateMyName(nameInfo) {
	// Desctructure nameInfo
	const { newName, oldName } = nameInfo;

	// Find my <span>
	let mySpans = Array.from(
		document.querySelectorAll('#your-name .currentName')
	);

	// Find <span> with user the changed name
	let latestName = mySpans.find((span) => span.textContent == oldName);

	// Update <span>
	latestName.parentNode.innerHTML = `<s>${oldName}</s> <span class="currentName">${newName}</span>`;
}

export { updateMyName };
