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

const validate = url => {
	try {
		url = new URL(url).href;
		return { ok: true, url };
	} catch (err) {
		return { error: err, ok: false };
	}
};

const dom = {
	clear: () =>
		(input.value = '',
			result.textContent = '',
			result.style.color = '',
			submit.textContent = 'Shorten',
			submit.disabled = true),
	error: (err) =>
		(result.textContent = err.name + ': ' + err.message,
			result.style.color = 'red',
			submit.textContent = 'Shorten'),
	unerror: () =>
		(result.textContent = '',
			result.style.color = ''),
	result: (str) =>
		(result.textContent = str,
			result.style.color = '',
			submit.textContent = 'Copy')
};

input.addEventListener('input', () =>
	(valid => (submit.disabled = !valid.ok,
		submit.textContent = 'Shorten',
		valid.ok
			? dom.unerror()
			: dom.error(valid.error)))(validate(input.value)));

submit.addEventListener('click', () =>
	submit.textContent === 'Shorten'
		? shorten(input.value)
			.then(id => dom.result(location.href + id))
			.catch(dom.error)
		: (copy(result.textContent),
			dom.clear()));
