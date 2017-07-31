'use strict';

const input = document.getElementById('input_url');
const submit = document.getElementById('submit_button');
const result = document.getElementById('result');

const copy = (elem => str =>
	(original => (elem.value = str,
		elem.select(),
		document.execCommand('copy'),
		elem.value = original))(elem.value))(input);

const shorten = url => fetch('/', {
	body: url,
	method: 'POST'
}).then(res => res.text()).then(val => {
	if ([
		'Invalid URL',
		'Server Error'
	].includes(val))
		throw Error(val);
	return val;
});

const dom = {
	clear: () =>
		(input.value = '',
			result.textContent = '',
			result.style.color = '',
			submit.textContent = 'Shorten'),
	error: (err) =>
		(result.textContent = err.name + ': ' + err.message,
			result.style.color = 'red',
			submit.textContent = 'Shorten'),
	result: (str) =>
		(result.textContent = str,
			result.style.color = '',
			submit.textContent = 'Copy')
};

input.addEventListener('input', () =>
	submit.disabled = input.value.trim() === '');

submit.addEventListener('click', () =>
	submit.textContent === 'Shorten'
		? shorten(input.value)
			.then(id => dom.result(location.href + id))
			.catch(dom.error)
		: (copy(result.textContent),
			dom.clear()));
