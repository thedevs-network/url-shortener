'use strict';

const input = document.getElementById('input_url');
const submit = document.getElementById('submit_url');
const modal = document.getElementById('show_url');
const close = document.getElementById('close_dialog');
const copyBtn = new Clipboard('#copy_url');

function showShortenedURL(value) {
	const modalChild = modal.firstChild;
	modalChild.innerHTML = `
		${location.href + value}
	`;
	modal.classList.add('visible');
}

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
			return val;
		})
		.then(val => showShortenedURL(val))
		.catch(err => alert(err.name + ': ' + err.message)));

close.addEventListener('click', () => {
	modal.classList.remove('visible');
});
