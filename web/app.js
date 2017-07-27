'use strict';

const url = document.getElementById('url');
const shorten = document.getElementById('shorten');

shorten.addEventListener('click', () =>
	fetch('/', {
		body: url.value,
		method: 'POST'
	})
		.then(res => res.text())
		.then(val => prompt('Ctrl+C', val))
		.catch(err => alert(err.name + ': ' + err.message)));
