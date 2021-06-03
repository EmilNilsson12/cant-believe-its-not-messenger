function printMsgFromOtherUserSameGroup(msg, msgGroup) {
	msgGroup.insertAdjacentHTML(
		'beforeend',
		`<li class="msg-from-others-li chat-msg">
			<div class="msg-from-others-content">${msg.content}</div>
		</li>`
	);
}

export { printMsgFromOtherUserSameGroup };
