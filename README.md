# unnamed-socket-app

This repo contains an app that lets multiple users chat using socket.io.
The app mimics the behaviour you would expect from a group-chat in Facebook Messenger.

## Main features
1. Sending multiple messages without interruption styles them in a way that shows they are related
2. Name changes are announced in the chat and next to the users name in the "Users currently online" list as they happen
3. Userlist is updated dynamically when other users connect and disconnect

## Other features
1. Your screenname and a session-id are stored in localStorage so your latest screenname will be remembered
2. Chatmessages and namechanges are stored in the chatlog, so any late arrival will get the full history of the chat

## Shortcomings
The chatlog is only stored on the free version of heroku so the log is lost due to the server shutting off after a certain amount of inactivity. There is no databaseconnection in this app.
