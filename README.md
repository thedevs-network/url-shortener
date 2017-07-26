URL Shortener
=============

Hello there!

This is TheDevs' simple URL shortener!

Information
------------

POST to this URL with a URL of your choice as a
request body to create a shortened link.

The server will respond will the ID.

Navigating to https://devs.link/ID with the given ID will redirect you to
the link provided.

Code examples
-------------

### curl

	curl -d "https://example.com/" https://devs.link
	D

Your link is now: https://devs.link/D
