URL Shortener
=============

Hello there!

This is TheDevs' simple URL shortener!

Information
------------

POST to this URL with a URL of your choice as a request body to create a shortened link.

The server will respond with the ID.

Navigating to https://devs.sh/ID with the given ID will redirect you to the link provided.

Code examples
-------------

### cURL

	curl -d "https://example.com/" https://devs.sh/
	D

### Clientside JavaScript

	fetch('https://devs.sh/', {
		body: 'https://example.com/',
		method: 'POST'
	})
		.then(res =>
			res.text())
		.then(id =>
			console.log(id));

### Node.js

	axios.post('https://devs.sh/',
		"https://example.com/")
		.then(id =>
			console.log(id));

Shortening "https://example.com/" your link will be: https://devs.sh/D
