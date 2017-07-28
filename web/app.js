'use strict';

const input = document.getElementById('input_url');
const submit = document.getElementById('submit_url');

submit.addEventListener('click', () =>
	fetch('/', {
		body: input.value,
		method: 'POST'
	})
		.then(res => res.text())
		.then(val => {
			if ([
				'Invalid URL',
				'Server Error'
			].includes(val))
				throw Error(val);
		})
		.then(val => prompt('Ctrl+C', location.href + val))
		.catch(err => alert(err.name + ': ' + err.message)));
