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

input.addEventListener('input', () =>
	submit.disabled = input.value.trim() === '');

submit.addEventListener('click', () =>
	submit.textContent === 'Shorten'
		? shorten(input.value).then(id =>
			(result.textContent = location.href + id,
				result.style.color = '',
				submit.textContent = 'Copy'))
			.catch(err =>
				(result.textContent = err.name + ': ' + err.message,
					result.style.color = 'red'))
		: (copy(result.textContent),
			input.value = '',
			result.textContent = '',
			submit.textContent = 'Shorten'));
