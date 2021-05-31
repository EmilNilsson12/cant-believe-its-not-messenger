function printUserJoinedMsg(screenName, chatLog) {
	chatLog.insertAdjacentHTML('beforeend', `<li>${screenName} has joined</li>`);
}

export { printUserJoinedMsg };
